// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";


  // apiKey: "AIzaSyAmD3y4jL54LiBr_zQP8WhNEkluEfN3rmM",
  // authDomain: "testproject-13159.firebaseapp.com",
  // projectId: "testproject-13159",
  // storageBucket: "testproject-13159.appspot.com",
  // messagingSenderId: "72473213711",
  // appId: "1:72473213711:web:d30a062268d6c115ca1c7a",
  // measurementId: "G-50Z23HNPGR"

const firebaseConfig = {
  apiKey: "AIzaSyAmD3y4jL54LiBr_zQP8WhNEkluEfN3rmM",
  authDomain: "testproject-13159.firebaseapp.com",
  projectId: "testproject-13159",
  storageBucket: "testproject-13159.appspot.com",
  messagingSenderId: "72473213711",
  appId: "1:72473213711:web:d30a062268d6c115ca1c7a",
  measurementId: "G-50Z23HNPGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);