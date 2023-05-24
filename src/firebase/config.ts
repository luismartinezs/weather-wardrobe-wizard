// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3DkTRkK9A49IyMSGg_RoPwoHXdttfjQA",
  authDomain: "weather-wardrobe-wizard.firebaseapp.com",
  projectId: "weather-wardrobe-wizard",
  storageBucket: "weather-wardrobe-wizard.appspot.com",
  messagingSenderId: "757546456944",
  appId: "1:757546456944:web:6852e7b369c184177061b5",
  measurementId: "G-Y0S6HCQX1K"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app