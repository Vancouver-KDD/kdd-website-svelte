import {collection, addDoc} from 'firebase/firestore'
import {db} from '$lib/firebase'

interface FormData {
  firstTime: string
  name: string
  email: string
  occupation: string
  work: string
  location: string
  message: string
}

export const saveFormData = async (formData: FormData) => {
  try {
    const collectionRef = collection(db, 'Tickets')
    await addDoc(collectionRef, formData)
    console.log('Form data saved to Firestore')
  } catch (error) {
    console.error('Error saving form data to Firestore:', error)
  }
}
