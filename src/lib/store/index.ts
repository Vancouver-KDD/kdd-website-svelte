import {db} from '$lib/firebase'
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'
import {readable} from 'svelte/store'

export function getTicketsStore(eventId: string) {
  const store = readable<DB.Ticket[]>([], (set) => {
    onSnapshot(
      query(
        collection(db, 'Tickets'),
        where('eventId', '==', eventId),
        orderBy('createdAt', 'desc')
      ),
      (querySnapshot) => {
        const tickets: DB.Ticket[] = []
        for (const doc of querySnapshot.docs) {
          tickets.push(doc.data() as DB.Ticket)
        }
        set(tickets)
      }
    )
  })
  return store
}
