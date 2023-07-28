// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyABY4javHYnOvQApJn2rdh7AZmuUQd_ejQ",
  authDomain: "hackathon-4e135.firebaseapp.com",
  databaseURL:
    "https://hackathon-4e135-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hackathon-4e135",
  storageBucket: "hackathon-4e135.appspot.com",
  messagingSenderId: "1054000420347",
  appId: "1:1054000420347:web:779086d27115dbbfd6675e",
  measurementId: "G-EMF5ZXWT36",
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
