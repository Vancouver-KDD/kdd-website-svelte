import {getLatestEvents} from '$lib/api/airtable'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const events = getLatestEvents({limit: 100})
  return {events}
}) satisfies PageServerLoad
