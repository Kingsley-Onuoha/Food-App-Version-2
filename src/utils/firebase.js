// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeKZawuFWGIci0NwGomvvFH1cqMIJuFec",
  authDomain: "swiggy-food-f842d.firebaseapp.com",
  projectId: "swiggy-food-f842d",
  storageBucket: "swiggy-food-f842d.appspot.com",
  messagingSenderId: "746991584727",
  appId: "1:746991584727:web:156d2b02aa5be0c5403792",
  measurementId: "G-0BHLB8XSE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();