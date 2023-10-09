import admin, {type ServiceAccount} from 'firebase-admin'
import {env} from '$env/dynamic/private'

const serviceAccount = {
  clientEmail: env.FIREABSE_ADMIN_CLIENT_EMAIL,
  projectId: env.FIREABSE_ADMIN_PROJECT_ID,
  privateKey: env.FIREABSE_ADMIN_PRIVATE_KEY,
} as ServiceAccount

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vancouver-kdd-default-rtdb.firebaseio.com',
})

export const db = app.firestore()
