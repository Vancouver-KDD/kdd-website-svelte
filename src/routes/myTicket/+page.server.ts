import {fetchTicket} from '$lib/actions/firebase-action'
import type {PageServerLoad} from './$types'
import {getEvent} from '$lib/actions/airtable'
import {refundTicket} from '$lib/server/actions'

export const config = {
  isr: false,
}

export const load = (async ({url}) => {
  // Get ticket data
  const ticketId = url.searchParams.get('ticketId')

  if (!ticketId) {
    console.error('Ticket ID is null')
    return {error: 'Ticket ID is null'}
  }

  console.log('Fetching ticket data...')
  const reservedTicket = await fetchTicket(ticketId)
  console.log('Reserved ticket:', reservedTicket)

  // Remove non-serializable property
  delete reservedTicket?.createdAt

  // Get event data
  const eventId = reservedTicket?.eventId
  if (eventId) {
    const data = await getEvent(eventId)
    return {event: data, reservedTicket}
  }
  return {event: null, reservedTicket}
}) satisfies PageServerLoad

export const actions = {
  default: async ({url}) => {
    const ticketId = url.searchParams.get('ticketId')
    if (!ticketId) {
      console.error('Ticket ID is null')
      return {error: 'Ticket ID is null'}
    }

    console.log(`Cancelling ticket ${ticketId}...`)
    await refundTicket(ticketId)
    console.log('Ticket cancelled')

    return {
      status: 'success',
      message: `Ticket ${ticketId} has been cancelled.`,
    }
  },
}
