import {firebaseConfig} from '$lib/firebaseConfig'
import {initializeApp} from 'firebase/app'
import {Firestore, getFirestore, collection, addDoc} from 'firebase/firestore'

let firebaseApp
let db: Firestore

if (!firebaseApp) {
  firebaseApp = initializeApp(firebaseConfig)
}

// Initialize Firestore
db = getFirestore()

interface FormData {
  name: string
  email: string
  occupation: string
  work: string
  message: string
}

export const saveFormData = async (formData: FormData) => {
  try {
    const collectionRef = collection(db, 'registrant')
    await addDoc(collectionRef, formData)
    console.log('Form data saved to Firestore')
  } catch (error) {
    console.error('Error saving form data to Firestore:', error)
  }
}
