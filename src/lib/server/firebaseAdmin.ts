import admin from 'firebase-admin'
import {env} from '$env/dynamic/private'

const serviceAccount = {
  type: env.FIREABSE_ADMIN_TYPE,
  project_id: env.FIREABSE_ADMIN_PROJECT_ID,
  private_key_id: env.FIREABSE_ADMIN_PRIVATE_KEY_ID,
  private_key: env.FIREABSE_ADMIN_PRIVATE_KEY,
  client_email: env.FIREABSE_ADMIN_CLIENT_EMAIL,
  client_id: env.FIREABSE_ADMIN_CLIENT_ID,
  auth_uri: env.FIREABSE_ADMIN_AUTH_URI,
  token_uri: env.FIREABSE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: env.FIREABSE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: env.FIREABSE_ADMIN_CLIENT_X509_CERT_URL,
  universe_domain: env.FIREABSE_ADMIN_UNIVERSE_DOMAIN,
} as admin.ServiceAccount

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vancouver-kdd-default-rtdb.firebaseio.com',
})

export const db = app.firestore()
