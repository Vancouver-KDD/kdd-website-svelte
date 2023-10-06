import {getOrganizers} from '$lib/actions/airtable'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const organizers = getOrganizers()
  return {organizers}
}) satisfies PageServerLoad
