// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe1de4e2UohtlqNRi2jTJbe_H4KuNRjVw",
  authDomain: "expense-tracker-5ff6d.firebaseapp.com",
  projectId: "expense-tracker-5ff6d",
  storageBucket: "expense-tracker-5ff6d.appspot.com",
  messagingSenderId: "440787503251",
  appId: "1:440787503251:web:f31587ee981af8e296a566",
  measurementId: "G-52GKKHX8R0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
