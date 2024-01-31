// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { getStorage } from 'firebase/storage';
const API = process.env.REACT_APP_FIREBASE_API;

const firebaseConfig = {
  apiKey: "AIzaSyBpOMTwx8jzB14yIDbyoYTwJxUZVpu-s0I",
  authDomain: "creative-ai-bf3e9.firebaseapp.com",
  projectId: "creative-ai-bf3e9",
  storageBucket: "creative-ai-bf3e9.appspot.com",
  messagingSenderId: "318918064709",
  appId: "1:318918064709:web:9d8b797dcf855db3a4412c",
  measurementId: "G-DZ9JZY9Y0T"
};
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage();

export { app, auth, database, push, ref, set, storage };
