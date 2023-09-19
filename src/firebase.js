import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyANTE0PGj__Cwj3yiuFYtlPn0WjlMaqSKY",
  authDomain: "siddhi-parkar.firebaseapp.com",
  projectId: "siddhi-parkar",
  storageBucket: "siddhi-parkar.appspot.com",
  messagingSenderId: "943695250412",
  appId: "1:943695250412:web:2850a999c8e98ded80f6c9",
  measurementId: "G-KEEXQW3GYY"
};

const app = initializeApp(firebaseConfig);
export default getFirestore();