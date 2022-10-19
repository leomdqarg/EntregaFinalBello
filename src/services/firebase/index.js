// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrmigFHxNHVuLrUQuCgf7YEFl12VpgN0s",
  authDomain: "backend-mi-tiendia.firebaseapp.com",
  projectId: "backend-mi-tiendia",
  storageBucket: "backend-mi-tiendia.appspot.com",
  messagingSenderId: "922722431367",
  appId: "1:922722431367:web:10793e9c9335c4bedde322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)