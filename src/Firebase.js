// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZoPlCo4fQrZpHL-JgQGqG7jXyK8YZgjI",
  authDomain: "truckbez-564e5.firebaseapp.com",
  projectId: "truckbez-564e5",
  storageBucket: "truckbez-564e5.firebasestorage.app",
  messagingSenderId: "99507493316",
  appId: "1:99507493316:web:96149f33a3c75942122c91",
  measurementId: "G-JYJ2KW95JE",
  databaseURL: "https://truckbez-564e5-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
