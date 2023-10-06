import {doc, getDoc} from 'firebase/firestore'
import {db} from '$lib/firebase'

export async function getEvent() {
  try {
    const docRef = doc(db, 'registrant')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      return JSON.stringify(docSnap.data())
    } else {
      console.log('No such document!')
    }
  } catch (error) {
    console.error(error)
  }
}
