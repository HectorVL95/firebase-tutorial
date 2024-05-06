// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNpDxuQK3uqI9sANgB4eiYZJDBVgeN-fQ",
  authDomain: "fir-course-new.firebaseapp.com",
  projectId: "fir-course-new",
  storageBucket: "fir-course-new.appspot.com",
  messagingSenderId: "999301869894",
  appId: "1:999301869894:web:cacee2b3efb8a65b93f547"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)