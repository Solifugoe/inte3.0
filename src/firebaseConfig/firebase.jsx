import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBNOAWRFKg1C4CABvltaETscXGSE9pYpL4",
  authDomain: "integradora-71456.firebaseapp.com",
  projectId: "integradora-71456",
  storageBucket: "integradora-71456.appspot.com",
  messagingSenderId: "197319481498",
  appId: "1:197319481498:web:54e5383e33184e51092723"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const firestore = getFirestore(app);
const database = getDatabase(app);
export { db }
export const imageDb = getStorage(app);
export const auth = getAuth(app);
export { signOut };
export { database };
export default firestore;