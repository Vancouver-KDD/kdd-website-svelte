import Airtable from 'airtable'
import {AIRTABLE_KDD_BASE} from '$env/static/private'
import {fail} from '@sveltejs/kit'
import AirtableError from 'airtable/lib/airtable_error'

export const actions = {
  default: async (event) => {
    const data = await event.request.formData()
    const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN_ADMIN}).base(AIRTABLE_KDD_BASE)
    return new Promise((resolve) => {
      base('Subscribers').create(
        [
          {
            fields: {
              CreatedAt: new Date().toISOString(),
              Name: data.get('name')?.toString(),
              Email: data.get('email')?.toString(),
            },
          },
        ],
        function (err) {
          if (err) {
            console.error(err)
            if (err instanceof AirtableError || err instanceof Error) {
              resolve(fail(400, {status: 'failed', message: err.message}))
            } else {
              resolve(fail(400, {status: 'failed', message: 'Failed'}))
            }
          } else {
            resolve({
              status: 'success',
            })
          }
        }
      )
    })
  },
}
