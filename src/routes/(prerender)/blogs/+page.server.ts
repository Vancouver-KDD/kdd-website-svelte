import {getLatestBlogs} from '$lib/api/airtable'
import type {PageServerLoad} from './$types'

export const load = (async () => {
  const blogs = await getLatestBlogs({limit: 100})
  return {blogs}
}) satisfies PageServerLoad
