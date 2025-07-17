import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_Ph4fM4z7puOhc9Pnx80o-XS9nMrYicM",
  authDomain: "chouks-weding.firebaseapp.com",
  projectId: "chouks-weding",
  storageBucket: "chouks-weding.firebasestorage.app",
  messagingSenderId: "359618318642",
  appId: "1:359618318642:web:97e4224b4021893b38c72b"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };