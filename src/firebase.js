// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9yYkdfDPCcUGAg9o7uE66YFDDsNnH0mU",
  authDomain: "lei-account-book.firebaseapp.com",
  projectId: "lei-account-book",
  storageBucket: "lei-account-book.appspot.com",
  messagingSenderId: "877417171102",
  appId: "1:877417171102:web:39b160b32cd2c76a49d38f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth()


export {auth};