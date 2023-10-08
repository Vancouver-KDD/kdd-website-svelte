import {getLatestEvents} from '$lib/actions/airtable'
import type {PageServerLoad, Actions} from './$types'
import {db} from '$lib/server/firebaseAdmin'
import {createTicket} from '$lib/server/actions'

export const load = (async () => {
  const events = getLatestEvents({limit: 100})
  return {events}
}) satisfies PageServerLoad

export const actions = {
  default: async ({request}) => {
    const formData = await request.formData()
    const userData: {[key: string]: string} = {}

    for (const [key, value] of formData.entries()) {
      userData[key] = value.toString()
    }

    const ticketData = {
      id: db.collection('Tickets').doc().id,
      eventId: userData.eventId,
      eventName: userData.eventName,
      price: userData.price,
      createdAt: userData.createdAt,
      firstTime: userData.firstTime,
      name: userData.name,
      email: userData.email,
      occupation: userData.occupation,
      work: userData.work,
      location: userData.location,
      message: userData.message,
    }

    await createTicket(ticketData)

    return {
      status: 200,
      body: {message: 'Ticket created successfully'},
    }
  },
} satisfies Actions
