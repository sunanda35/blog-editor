import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyCyuUFCZI7gR4FsL7B46b1JvQ0ZoxAmTnM",
    authDomain: "blog-85d67.firebaseapp.com",
    databaseURL: "https://blog-85d67.firebaseio.com",
    projectId: "blog-85d67",
    storageBucket: "blog-85d67.appspot.com",
    messagingSenderId: "360962377301",
    appId: "1:360962377301:web:e3a3a57601a61ca77db6dc",
    measurementId: "G-1HQDCGTZ5D"
  }
);


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth, storage}