import {getContributors} from '$lib/actions/airtable'
import type {LayoutServerLoad} from './$types'

export const load = getContributors satisfies LayoutServerLoad
