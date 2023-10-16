import {getLatestEvents} from '$lib/actions/airtable'

export const load = async () => {
  const events = getLatestEvents({limit: 10})
  return {events}
}
