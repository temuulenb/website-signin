// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgTtTVNm7FSmkl-6nvudfJz4CcRaf0N0A",
  authDomain: "my-web-react-290f6.firebaseapp.com",
  projectId: "my-web-react-290f6",
  storageBucket: "my-web-react-290f6.appspot.com",
  messagingSenderId: "84515969444",
  appId: "1:84515969444:web:cc192c421df1ef083fc931"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()