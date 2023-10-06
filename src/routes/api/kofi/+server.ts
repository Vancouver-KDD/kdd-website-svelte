import {handleKofiWebhook} from '$lib/server/actions'
import {json} from '@sveltejs/kit'

export async function POST({request}) {
  const responseJson = await request.json()
  console.log({responseJson})
  await handleKofiWebhook(responseJson.data)
  return json({status: 'success'})
}
