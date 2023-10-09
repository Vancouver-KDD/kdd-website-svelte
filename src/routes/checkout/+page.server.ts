import {getEvent} from '$lib/actions/airtable'
import type {PageServerLoad, Actions} from './$types'
import {createTicket} from '$lib/server/actions'
import {error, redirect} from '@sveltejs/kit'

export const load = (async ({url}) => {
  const eventId = url.searchParams.get('eventId')
  if (eventId) {
    const data = await getEvent(eventId)
    return {event: data}
  }
  return {event: null}
}) satisfies PageServerLoad

export const actions = {
  default: async ({request}) => {
    const formData = await request.formData()
    const eventId = formData.get('eventId') as string
    if (!eventId) {
      throw error(400, 'Invalid eventId')
    }

    const airtableEventData = await getEvent(eventId)

    const userData: {[key: string]: string} = {}

    for (const [key, value] of formData.entries()) {
      userData[key] = value.toString()
    }

    const isFree = userData.isFreeApplicable === 'Yes' || airtableEventData.price === '0.00'

    const ticketData = {
      eventName: airtableEventData.title,
      price: airtableEventData.price,
      id: userData.id,
      eventId,
      firstTime: userData.firstTime,
      name: userData.name,
      email: userData.email,
      occupation: userData.occupation,
      work: userData.work,
      location: userData.location,
      message: userData.message,
      status: isFree ? 'free' : 'unpaid',
    } satisfies Omit<DB.Ticket, 'createdAt'>

    await createTicket(ticketData)

    if (ticketData.status === 'unpaid') {
      throw redirect(300, `/checkout/payment?eventId=${eventId}&ticketId=${userData.id}`)
    } else if (ticketData.status === 'free') {
      throw redirect(300, `/events`)
    }
  },
} satisfies Actions
