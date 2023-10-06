import {db} from '$lib/server/firebaseAdmin'

type TicketData = {
  id: string
  name: string
  eventId: string
  email: string
  status: 'unpaid' | 'free'
  formData: string // JSON string
}

export async function createTicket(data: TicketData) {
  // 1. Check if data.id (TicketId) does not already exist
  if ((await db.doc(`Tickets/${data.id}`).get()).exists) {
    throw new Error('Ticket with given ID already exists')
  }

  // 2. Cancel any unpaid tickets for the same event
  const sameEventsSnap = await db
    .collection('Tickets')
    .where('eventId', '==', data.eventId)
    .where('email', '==', data.email)
    .where('status', '==', 'unpaid')
    .get()
  const batch = db.batch()
  for (const doc of sameEventsSnap.docs) {
    batch.update(doc.ref, {
      status: 'cancelled',
    })
  }
  await batch.commit()

  // 3. Create New Ticket
  await db.doc(`Tickets/${data.id}`).set({
    ...data,
    createdAt: new Date(),
  })
  return true
}

export async function cancelTicket(ticketId: string) {
  const ticketData = (await db.doc(`Tickets/${ticketId}`).get()).data() as DB.Ticket
  if (ticketData.status === 'cancelled') {
    throw new Error('Ticket already cancelled')
  }

  await db.doc(`Tickets/${ticketId}`).update({
    status: 'cancelled',
  } satisfies Partial<DB.Ticket>)

  return true
}

// type EmailParams = {
//   to: string
//   subject: string
// } & (
//   | {
//       templateId: string
//       templateData: unknown
//     }
//   | {html: string}
//   | {text: string}
// )

// export async function sendEmail(params: EmailParams) {
// const {to, subject} = params
// await db.collection('Email').add({
//   to,
//   subject,
// })
// return true
// }
