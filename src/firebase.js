import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  // apiKey: "AIzaSyANTE0PGj__Cwj3yiuFYtlPn0WjlMaqSKY",
  // authDomain: "siddhi-parkar.firebaseapp.com",
  // projectId: "siddhi-parkar",
  // storageBucket: "siddhi-parkar.appspot.com",
  // messagingSenderId: "943695250412",
  // appId: "1:943695250412:web:2850a999c8e98ded80f6c9",
  // measurementId: "G-KEEXQW3GYY"
  apiKey: "AIzaSyA2sJmHen7Oqicuqf-a_SbjmoLROXmmWTg",
  authDomain: "siddhiparkar-5d475.firebaseapp.com",
  projectId: "siddhiparkar-5d475",
  storageBucket: "siddhiparkar-5d475.appspot.com",
  messagingSenderId: "284369189804",
  appId: "1:284369189804:web:c08da7cf00955436309809",
  measurementId: "G-1TEKHM7EXP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const storage = getStorage(app);
export default getFirestore();