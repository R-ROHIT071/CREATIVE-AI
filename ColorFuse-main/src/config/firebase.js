// Import the functions you need from the SDKs you need
import getAnalytics from "firebase/compat/analytics";
import { default as firebase, default as initializeApp } from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpOMTwx8jzB14yIDbyoYTwJxUZVpu-s0I",
  authDomain: "creative-ai-bf3e9.firebaseapp.com",
  projectId: "creative-ai-bf3e9",
  storageBucket: "creative-ai-bf3e9.appspot.com",
  messagingSenderId: "318918064709",
  appId: "1:318918064709:web:9d8b797dcf855db3a4412c",
  measurementId: "G-DZ9JZY9Y0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;

