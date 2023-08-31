import {getPhotos} from '$lib/api/airtable'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const photos = getPhotos({limit: 100})
  return {photos}
}) satisfies PageServerLoad
