// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSBT3UKscdnwvAX00pn_k9ajXark15xUc",
  authDomain: "task-fc324.firebaseapp.com",
  projectId: "task-fc324",
  storageBucket: "task-fc324.appspot.com",
  messagingSenderId: "911818300608",
  appId: "1:911818300608:web:fc71f3af5813572d40a125",
  measurementId: "G-E1MD64T5DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);