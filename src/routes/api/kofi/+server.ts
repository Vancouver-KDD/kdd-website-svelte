import {handleKofiWebhook} from '$lib/server/actions'
import {error, json} from '@sveltejs/kit'
import {env} from '$env/dynamic/private'

export async function POST({request}) {
  const formData = await request.formData()
  const webhookJsonString = formData.get('data')?.toString()
  if (!webhookJsonString) {
    throw error(400, 'Invalid formData, missing "data"')
  }
  const webhookJson = JSON.parse(webhookJsonString) as App.KoFiWebhookData

  if (webhookJson.verification_token !== env.KOFI_VERIFICATION_TOKEN) {
    throw error(400, 'Invalid verification_token')
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {verification_token, ...rest} = webhookJson

  await handleKofiWebhook(rest)
  return json({status: 'success'})
}
