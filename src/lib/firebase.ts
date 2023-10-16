import {firebaseConfig} from '$lib/firebaseConfig'
import {getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const apps = getApps()
const app = apps[0] ? apps[0] : initializeApp(firebaseConfig)
const db = getFirestore(app)

const firebaseAuth = getAuth(app)

export {db, app, firebaseAuth}
