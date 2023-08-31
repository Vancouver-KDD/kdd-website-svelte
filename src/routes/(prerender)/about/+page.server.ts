import {getOrganizers} from '$lib/api/airtable'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const organizers = getOrganizers()
  return {organizers}
}) satisfies PageServerLoad
