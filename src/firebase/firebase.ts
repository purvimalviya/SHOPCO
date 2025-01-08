// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "reduxcart-cygbit.firebaseapp.com",
  databaseURL: "https://reduxcart-cygbit-default-rtdb.firebaseio.com",
  projectId: "reduxcart-cygbit",
  storageBucket: "reduxcart-cygbit.firebasestorage.app",
  messagingSenderId: "206297385851",
  appId: "1:206297385851:web:12455363773c5cc5b48bde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);