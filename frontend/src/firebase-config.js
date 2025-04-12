// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA6xJGRqSrNa1XdsQhDveJTcj2Kd3MKLq4",
  authDomain: "zerowaste-43586.firebaseapp.com",
  projectId: "zerowaste-43586",
  storageBucket: "zerowaste-43586.appspot.com", // typo fixed from 'firebasestorage.app'
  messagingSenderId: "175162915245",
  appId: "1:175162915245:web:684bf28ffd29f59d508924",
  measurementId: "G-80712HZB6M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
