import React from "react"
import './App.css';

//firebase sdk
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

//hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyAipfWmG7GVy3t-e2D7fKGsNUlcq1fOl2k",
  authDomain: "chat-app-a4e9d.firebaseapp.com",
  projectId: "chat-app-a4e9d",
  storageBucket: "chat-app-a4e9d.appspot.com",
  messagingSenderId: "427244418673",
  appId: "1:427244418673:web:f3f7b01f719348614f8dd0",
  measurementId: "G-R3Z7EM45JC"
})

//reference to auth and firestore
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      <section>
        { user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={ signInWithGoogle}>Sign In with Google</button>
  )
}

function signOut() {
  return auth.currentUser && (
    <button onClick={ () => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' })
  
  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={ msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>{ text}</p>
}

export default App;
