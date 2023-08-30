import {getContributors} from '$lib/api/airtable'
import type {LayoutServerLoad} from './$types'

export const load = getContributors satisfies LayoutServerLoad
