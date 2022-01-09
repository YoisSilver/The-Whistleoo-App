import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3u7O7lSLv-hrsJ_tCW4QPM73QozsFhL0",
  authDomain: "the-whistleoo-app.firebaseapp.com",
  projectId: "the-whistleoo-app",
  storageBucket: "the-whistleoo-app.appspot.com",
  messagingSenderId: "490406897086",
  appId: "1:490406897086:web:8ea219bae247dc631205ef",
  measurementId: "G-T2GMMQ6K3F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
  // export default db;