import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqSXRX1hz9QqRqNZ0avrHOO1O_VxjcEuA",
  authDomain: "chatify-afab3.firebaseapp.com",
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
