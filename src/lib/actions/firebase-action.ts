import {collection, getDocs} from 'firebase/firestore'
import {db} from '$lib/firebase'

export async function fetchTickets(): Promise<DB.Ticket[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tickets'))
    const tickets: DB.Ticket[] = querySnapshot.docs.map((doc) => doc.data() as DB.Ticket)
    return tickets
  } catch (error) {
    console.error(error)
    return []
  }
}
