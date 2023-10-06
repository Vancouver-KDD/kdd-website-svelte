import {getLatestEvents, getStats, getSponsors, getPhotos} from '$lib/actions/airtable'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const event = (await getLatestEvents({limit: 1}))?.[0]
  const stats = getStats()
  const sponsors = getSponsors()
  const photos = getPhotos({limit: 20})
  return {event, stats, sponsors, photos}
}) satisfies PageServerLoad
