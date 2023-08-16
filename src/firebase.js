// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCI7aPylpyykjTu-Tk808WuKOdwT5MYR9s',
  authDomain: 'thinkapple-e3bd5.firebaseapp.com',
  projectId: 'thinkapple-e3bd5',
  storageBucket: 'thinkapple-e3bd5.appspot.com',
  messagingSenderId: '1066836551019',
  appId: '1:1066836551019:web:08634493999e3c4beb582e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
