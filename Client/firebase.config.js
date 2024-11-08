import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdYrV2yAxxYSJC-Bu-bF99dp4BT50pEn4",
  authDomain: "wortschatz-app.firebaseapp.com",
  projectId: "wortschatz-app",
  storageBucket: "wortschatz-app.appspot.com",
  messagingSenderId: "956995515688",
  appId: "1:956995515688:web:e249ad38b7610588638c1d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);