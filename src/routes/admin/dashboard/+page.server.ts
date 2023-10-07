import {getLatestEvents} from '$lib/actions/airtable'

export const load = async () => {
  const events = getLatestEvents({limit: 5})
  return {events}
}
