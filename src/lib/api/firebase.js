import { firebaseConfig } from '$lib/firebaseConfig';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";


let firebaseApp;
let db;

if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
}

// Initialize Firestore
db = getFirestore();

// export { db };


export const saveFormData = async (formData) => {
    try {
        const collectionRef = collection(db, 'registrant');
        await addDoc(collectionRef, formData);
        console.log('Form data saved to Firestore');
    } catch (error) {
        console.error('Error saving form data to Firestore:', error);
    }
};