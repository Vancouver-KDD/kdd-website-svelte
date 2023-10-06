import {handleKofiWebhook} from '$lib/server/actions'
import {json} from '@sveltejs/kit'

export async function POST({request}) {
  const data = await request.json()
  await handleKofiWebhook(data)
  return json({status: 'success'})
}
