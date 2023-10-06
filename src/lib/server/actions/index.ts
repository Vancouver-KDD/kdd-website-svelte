// import {db} from '$lib/server/firebaseAdmin'

type TicketData = {
  id: string
  name: string
  eventId: string
  email: string
  formData: string // JSON string
}

export function createTicket(data: TicketData) {
  // db.doc(`Tickets/${data.id}`).doc({
  //   ...data,
  // })
  console.log(data)
}
