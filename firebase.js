import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  // Paste your Firebase project's configuration object here
  apiKey: "AIzaSyBp0W2COYkBxkeo2A9-n-wRIZ3CGuqi2Vo",
  authDomain: "task-overview.firebaseapp.com",
  databaseURL: "https://task-overview-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "task-overview",
  storageBucket: "task-overview.appspot.com",
  messagingSenderId: "368232790313",
  appId: "1:368232790313:web:5649f8a9e0c15459cbdf38",
  measurementId: "G-0RC81YZZL7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
