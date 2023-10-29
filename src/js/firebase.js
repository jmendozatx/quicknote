// Import
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configure Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD32K4GdC3uKzhDfuGPV1-aoWQ0tJZ1ST0',
  authDomain: 'quicknotes-df5e8.firebaseapp.com',
  projectId: 'quicknotes-df5e8',
  storageBucket: 'quicknotes-df5e8.appspot.com',
  messagingSenderId: '665248721138',
  appId: '1:665248721138:web:9e3f21c141c12d86bcc86b'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth }