import {getEvent} from '$lib/actions/airtable'
import {db} from '$lib/server/firebaseAdmin.js'
import {createTicket} from '$lib/server/actions'
import {error, redirect} from '@sveltejs/kit'

export const load = async ({params}) => {
  const eventId = params.eventId

  console.log({eventId})
  if (eventId) {
    const data = await getEvent(eventId)
    console.log('data', data)
    return {event: data}
  }
  return {event: null}
}

export const actions = {
  default: async ({request}) => {
    console.log('checkout page.server.ts is this cached? ' + new Date().valueOf())

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
    const ticketId = db.collection('Tickets').doc().id
    const ticketData = {
      eventName: airtableEventData.title,
      price: airtableEventData.price,
      id: ticketId,
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
      throw redirect(300, `/payment?eventId=${eventId}&ticketId=${ticketData.id}`)
    } else if (ticketData.status === 'free') {
      throw redirect(300, `/myTicket?ticketId=${ticketData.id}`)
    }
  },
}
