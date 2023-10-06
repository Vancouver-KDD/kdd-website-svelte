import {handleKofiWebhook} from '$lib/server/actions'
import {json} from '@sveltejs/kit'

export async function POST({request}) {
  const formData = await request.formData()
  console.log({formData})
  const webhookJsonString = formData.get('data')?.toString()
  console.log({webhookJsonString})
  if (!webhookJsonString) {
    throw new Error('Invalid formData, missing "data"')
  }
  const webhookJson = JSON.parse(webhookJsonString) as App.KoFiWebhookData
  console.log({webhookJson})

  await handleKofiWebhook(webhookJson)
  return json({status: 'success'})
}
