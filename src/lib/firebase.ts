import {firebaseConfig} from '$lib/firebaseConfig'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Auth
const firebaseAuth = getAuth(app)

export {app, firebaseAuth}
