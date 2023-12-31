// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaKf293EsVgxyGVnXTiWxubQ1v2zF3txg",
  authDomain: "hopecenter-2ccbe.firebaseapp.com",
  projectId: "hopecenter-2ccbe",
  storageBucket: "hopecenter-2ccbe.appspot.com",
  messagingSenderId: "904479267108",
  appId: "1:904479267108:web:e6013090d4eec0bd313bb1",
  measurementId: "G-NSD4NM48XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
