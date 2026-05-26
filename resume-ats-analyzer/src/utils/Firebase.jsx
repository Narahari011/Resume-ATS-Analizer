import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";



const firebaseConfig = {
  apiKey:  "AIzaSyABoMp2F9uQOVqh1h-bWa9_oDtLjRXGoOw",
  authDomain: "resume-ats-6da55.firebaseapp.com",
  projectId: "resume-ats-6da55",
  storageBucket: "resume-ats-6da55.firebasestorage.app",
  messagingSenderId: "496601041157",
  appId: "1:496601041157:web:d7a001a267a507e2fe0f6c",
  measurementId: "G-YX1716BR09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth , provider};
