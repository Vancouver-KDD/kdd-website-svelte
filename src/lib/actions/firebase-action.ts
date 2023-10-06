import {collection, getDocs} from 'firebase/firestore'
import {db} from '$lib/firebase'

export async function fetchTickets(): Promise<App.Ticket[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tickets'))
    const tickets: App.Ticket[] = querySnapshot.docs.map((doc) => {
      return {
        ticketId: doc.id,
        eventId: doc.data().eventId,
        eventName: doc.data().eventName,
        timeStamp: doc.data().timeStamp,
        firstTime: doc.data().firstTime,
        email: doc.data().email,
        name: doc.data().name,
        occupation: doc.data().occupation,
        work: doc.data().work,
        location: doc.data().location,
        message: doc.data().message,
      }
    })
    return tickets
  } catch (error) {
    console.error(error)
    return []
  }
}
