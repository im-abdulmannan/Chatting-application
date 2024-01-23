// import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP__AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAqSXRX1hz9QqRqNZ0avrHOO1O_VxjcEuA",
  authDomain: "chatify-afab3.firebaseapp.com",
  databaseURL: "https://chatify-afab3-default-rtdb.firebaseio.com",
  projectId: "chatify-afab3",
  storageBucket: "chatify-afab3.appspot.com",
  messagingSenderId: "446474111653",
  appId: "1:446474111653:web:b686b51386c121a742db4c",
  measurementId: "G-7TTQSKQVC3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, provider, signInWithPopup, storage };
