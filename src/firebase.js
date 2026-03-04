import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9CCTP37td76zylOqkrf3sS4bWAntU4GM",
  authDomain: "cabanas-vinedo.firebaseapp.com",
  projectId: "cabanas-vinedo",
  storageBucket: "cabanas-vinedo.firebasestorage.app",
  messagingSenderId: "47227592382",
  appId: "1:47227592382:web:b5972f4d52723b2e49c8ef",
  measurementId: "G-90LCG3884S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
