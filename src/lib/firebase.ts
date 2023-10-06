import {firebaseConfig} from '$lib/firebaseConfig'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const firebaseAuth = getAuth(app)

export {db, app, firebaseAuth}
