// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyA5Mob_Y86SAFF7U6czR1wT4ASZx319gsA",
  authDomain: "smile-1e863.firebaseapp.com",
  projectId: "smile-1e863",
  storageBucket: "smile-1e863.appspot.com",
  messagingSenderId: "959561476263",
  appId: "1:959561476263:web:dc3f2cb8ad7dc4c3d69382"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;


