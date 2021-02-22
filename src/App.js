import React from "react"
import './App.css';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDgRknu2rRIrSMVqj8_WAfvL0Qm8OIku-I",
  authDomain: "chitchat-d90f0.firebaseapp.com",
  projectId: "chitchat-d90f0",
  storageBucket: "chitchat-d90f0.appspot.com",
  messagingSenderId: "203058000996",
  appId: "1:203058000996:web:77de06c14d474a15271b71",
  measurementId: "G-CFSLMWRGMK" 
})

const auth = firebase.auth();
const firestore = firebase.firestore(); 

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

export default App;
