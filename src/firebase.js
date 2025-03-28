// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5VzS9gFBEm-4kktoaOVUFJvH3CSH6Rqs",
    authDomain: "fitnessjournalapp-2df56.firebaseapp.com",
    projectId: "fitnessjournalapp-2df56",
    storageBucket: "fitnessjournalapp-2df56.firebasestorage.app",
    messagingSenderId: "1028003154562",
    appId: "1:1028003154562:web:42f4532076f531400f029b",
    measurementId: "G-JXP9V5KN3Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };