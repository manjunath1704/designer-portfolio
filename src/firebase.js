import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
const firebaseConfig = {

  apiKey: "AIzaSyA2sJmHen7Oqicuqf-a_SbjmoLROXmmWTg",
  authDomain: "siddhiparkar-5d475.firebaseapp.com",
  projectId: "siddhiparkar-5d475",
  storageBucket: "siddhiparkar-5d475.appspot.com",
  messagingSenderId: "284369189804",
  appId: "1:284369189804:web:c08da7cf00955436309809",
  measurementId: "G-1TEKHM7EXP"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default getFirestore();
