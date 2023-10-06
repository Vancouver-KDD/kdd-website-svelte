import {handleKofiWebhook} from '$lib/server/actions'
import {json} from '@sveltejs/kit'

export async function POST({request}) {
  const formData = await request.formData()
  console.log({formData})
  const webhookJson = Object.fromEntries(formData.entries()) as unknown as App.KoFiWebhookData
  await handleKofiWebhook(webhookJson)
  return json({status: 'success'})
}
