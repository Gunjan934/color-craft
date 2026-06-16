import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrYI0wgl3Ov1Tj2UJyZc2WXl7V1i2ACk8",
  authDomain: "login-d8a55.firebaseapp.com",
  projectId: "login-d8a55",
  storageBucket: "login-d8a55.firebasestorage.app",
  messagingSenderId: "692473955255",
  appId: "1:692473955255:web:a7fabcd8425160d8421e32",
  measurementId: "G-BW4KQB2TSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Google Auth Provider with additional configuration
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
