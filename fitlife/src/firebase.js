import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQZYl5v6btcvHWkp7GpbuRsyuj7HWybtw",
  authDomain: "fitlife-868fd.firebaseapp.com",
  projectId: "fitlife-868fd",
  storageBucket: "fitlife-868fd.appspot.com",
  messagingSenderId: "780009996448",
  appId: "1:780009996448:web:c98e957cc6fa1abc73c9c5",
  measurementId: "G-DNZG03F175",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default db;
export { auth, firebaseApp };
