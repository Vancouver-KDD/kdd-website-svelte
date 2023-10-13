import {db} from '$lib/firebase'
import {collection, onSnapshot, orderBy, query, where, Query, doc} from 'firebase/firestore'
import type {DocumentData, DocumentReference} from 'firebase/firestore'
import {derived, writable, type Readable, readable} from 'svelte/store'
import {BROWSER} from 'esm-env'

function handleQuerySnapshot<T extends DocumentData>(
  q: Query,
  set: (value: Map<string, T>) => void
) {
  return BROWSER
    ? onSnapshot(
        q,
        (snap) => {
          const data = new Map<string, T>()
          for (const doc of snap.docs) {
            data.set(doc.id, {...(doc.data() as T), id: doc.id})
          }
          set(data)
        },
        (error) => {
          console.error(error.message)
          set(new Map<string, T>())
        }
      )
    : () => {}
}
// function getStoreFromQuery<T extends DocumentData>(q: Query) {
//   return readable<Map<string, T> | undefined>(undefined, (set) => handleQuerySnapshot<T>(q, set))
// }

function deriveStoreFromQuery<V, T extends DocumentData>(
  stores: Parameters<typeof derived>[0],
  getQuery: (value: V) => Query
) {
  return derived(stores, ($stores, set) =>
    handleQuerySnapshot<T>(getQuery($stores), set)
  ) as Readable<Map<string, T>>
}

function handleDocSnapshot<T extends DocumentData>(
  ref: DocumentReference,
  set: (value: T | null) => void
) {
  return BROWSER
    ? onSnapshot(
        ref,
        (snap) => set((snap.data() ?? null) as T | null),
        (error) => {
          console.error(error.message)
          set(null)
        }
      )
    : () => {}
}
function getStoreFromDocRef<T extends DocumentData>(ref: DocumentReference) {
  return readable<T | undefined | null>(undefined, (set) => handleDocSnapshot<T>(ref, set))
}

export const selectedEventId = writable<string>()
export const ticketValue = deriveStoreFromQuery<string, DB.Ticket>(
  selectedEventId,
  ($selectedEventId) =>
    query(
      collection(db, 'Tickets'),
      where('eventId', '==', $selectedEventId),
      orderBy('createdAt', 'desc')
    )
)
export const selectedTicket = {
  // State
  value: ticketValue,
  // Actions
}
export const cancelledTickets = derived(ticketValue, ($ticketValue) =>
  [...$ticketValue.values()].filter((ticket) => ticket.status === 'cancelled')
)
export const activeTickets = derived(ticketValue, ($ticketValue) =>
  [...$ticketValue.values()].filter((ticket) => ticket.status !== 'cancelled')
)

export function createEventAnalyticsStore(eventId: string) {
  return getStoreFromDocRef<DB.EventAnalytics>(doc(db, `EventsAnalytics/${eventId}`))
}
