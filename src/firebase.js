import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNsSHev1mfi08aqduZvvIX0owUOoMspxU",
  authDomain: "best-2afaf.firebaseapp.com",
  projectId: "best-2afaf",
  storageBucket: "best-2afaf.firebasestorage.app",
  messagingSenderId: "529687635633",
  appId: "1:529687635633:web:414db9f9c88f6f3d022490",
  measurementId: "G-38LEKWFC2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
