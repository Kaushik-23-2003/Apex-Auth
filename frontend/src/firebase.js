import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a442d.firebaseapp.com",
  projectId: "mern-auth-a442d",
  storageBucket: "mern-auth-a442d.firebasestorage.app",
  messagingSenderId: "991824700796",
  appId: "1:991824700796:web:7c87953587394ce29870f9"
};

export const app = initializeApp(firebaseConfig);