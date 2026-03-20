// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNxAkvuFvs-IexqwqkiUAL7O8eRM2dvNw",
  authDomain: "fitnexaai-f4666.firebaseapp.com",
  projectId: "fitnexaai-f4666",
  storageBucket: "fitnexaai-f4666.firebasestorage.app",
  messagingSenderId: "1074462133039",
  appId: "1:1074462133039:web:57cbd591de1dc23e892fda",
  measurementId: "G-V46RXRR5QF"
};

// Initialize Firebase (ensure it's only initialized once in Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);

export { app, analytics, auth };
