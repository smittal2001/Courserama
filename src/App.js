import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
require('firebase/auth');
require("firebase/firestore");

const signOut = () => {
  firebase.auth().signOut().then(() => {
    console.log("Signed out successfully");
  }).catch((error) => {
    console.log("There was an issue signing out")
  });
}

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyA7imaGWDCN-Z8CG8xeMus4Q2NsPyRPq1o",
    authDomain: "courserama-8730b.firebaseapp.com",
    projectId: "courserama-8730b",
    storageBucket: "courserama-8730b.appspot.com",
    messagingSenderId: "611436566986",
    appId: "1:611436566986:web:64fdffe14f93b1daf55733",
    measurementId: "G-0QNGBJYJ69"
  };

  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
  } else {
     firebase.app(); // if already initialized, use that one
  }

  const firebaseui = require('firebaseui');
  var ui = firebaseui.auth.AuthUI.getInstance() ?
    firebaseui.auth.AuthUI.getInstance() :
    new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID

    ],
    // Other config options...
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(uid);
    } else {
      // User is signed out
      // ...
      console.log("Signed out");
    }
  });

  return (
   <div className = "App">
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    <button onClick={signOut}>Sign out</button>
   </div>

  );
}

export default App;
