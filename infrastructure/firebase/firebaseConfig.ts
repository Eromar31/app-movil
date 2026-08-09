import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0l7AVxDmj_Uw2DtStsrxfkpedQ6jBQN0",
  authDomain: "cable-tv-app-a2241.firebaseapp.com",
  projectId: "cable-tv-app-a2241",
  storageBucket: "cable-tv-app-a2241.firebasestorage.app",
  messagingSenderId: "997306774371",
  appId: "1:997306774371:web:2cef7c3c3dfcd8a75ed956"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);