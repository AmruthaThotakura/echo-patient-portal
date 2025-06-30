
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDn7ARptwboPPCP_J4UIyCsCR86_0O6B04",
  authDomain: "hospital-user-website.firebaseapp.com",
  projectId: "hospital-user-website",
  storageBucket: "hospital-user-website.firebasestorage.app",
  messagingSenderId: "822993050688",
  appId: "1:822993050688:web:ac227e1f513aa5ef71d3a5",
  measurementId: "G-YM7P67DCBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
