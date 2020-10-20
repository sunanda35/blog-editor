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
    appId: "1:360962377301:web:88a80373543532167db6dc",
    measurementId: "G-RR3G4WKX79"
  }



);


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth, storage}