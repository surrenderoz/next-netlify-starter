import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDjHrfkDZPdUWL1qAyXl3Cdxno03DyzgzU",
  authDomain: "fusionadmin-cfe6f.firebaseapp.com",
  projectId: "fusionadmin-cfe6f",
  storageBucket: "fusionadmin-cfe6f.appspot.com",
  messagingSenderId: "99708318963",
  appId: "1:99708318963:web:c1b11bbce5fb3531a37386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app)
export  {db, storage};