// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHEADrjBUge-aLjfFeC_mNcr_eHIpNUkw",
  authDomain: "netflix-clone-e4749.firebaseapp.com",
  projectId: "netflix-clone-e4749",
  storageBucket: "netflix-clone-e4749.appspot.com",
  messagingSenderId: "478548673289",
  appId: "1:478548673289:web:03eebd35fbaca311a449d8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const auth = firebaseAuth.getAuth()

export {auth,db}

