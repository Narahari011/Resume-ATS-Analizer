import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChz_P8UX-sVquW4KEqj02voaaELNZskao",
  authDomain: "ai-resume-analizer.firebaseapp.com",
  projectId: "ai-resume-analizer",
  storageBucket: "ai-resume-analizer.firebasestorage.app",
  messagingSenderId: "142478510868",
  appId: "1:142478510868:web:e8e5baa0b725b73fd71001",
  measurementId: "G-4TB4EE4K2J"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export { auth, provider };