// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/database";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "next-firebase-chat-b2121.firebaseapp.com",
  projectId: "next-firebase-chat-b2121",
  storageBucket: "next-firebase-chat-b2121.appspot.com",
  messagingSenderId: "966375309261",
  appId: "1:966375309261:web:7a1fdb48d15e2c3f850e84",
  measurementId: "G-GX0V05DHR0",
  databaseURL: "https://next-firebase-chat-b2121-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const firestorage = getStorage(app);
export const auth = getAuth(app);

export default app;
