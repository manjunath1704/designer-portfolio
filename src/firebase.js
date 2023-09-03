// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGJtO6kW94AfN1rQJE8ncXiuDuz7M9E2A",
  authDomain: "designer-portfolio-637ad.firebaseapp.com",
  projectId: "designer-portfolio-637ad",
  storageBucket: "designer-portfolio-637ad.appspot.com",
  messagingSenderId: "499346662909",
  appId: "1:499346662909:web:0a9546740ecb04765d2594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();