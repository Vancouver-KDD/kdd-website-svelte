import {fetchTickets} from '$lib/actions/firebase-action'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const tickets = fetchTickets()
  return {tickets}
}) satisfies PageServerLoad
