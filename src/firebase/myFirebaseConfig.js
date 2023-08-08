import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth, GoogleAuthProvider, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword, sendPasswordResetEmail } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA_FBxy9EzX9idb_talGEHrpoHMqssgfGk",
  authDomain: "react-blog-app-dc7f0.firebaseapp.com",
  databaseURL: "https://react-blog-app-dc7f0-default-rtdb.firebaseio.com",
  projectId: "react-blog-app-dc7f0",
  storageBucket: "react-blog-app-dc7f0.appspot.com",
  messagingSenderId: "566162356677",
  appId: "1:566162356677:web:9fa4cef62b52343b5633ac"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth();

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {database as default, db, auth, provider, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword, sendPasswordResetEmail };