import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5RMjulMMNorzr2VxRG-_9HpjTwEV87Bk",
  authDomain: "react-wecodeforyou.firebaseapp.com",
  projectId: "react-wecodeforyou",
  storageBucket: "react-wecodeforyou.appspot.com",
  messagingSenderId: "335857786993",
  appId: "1:335857786993:web:d28060b3ef34fe1a617bd0",
  measurementId: "G-ZJ91G1N80D",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export { app, auth, db };
