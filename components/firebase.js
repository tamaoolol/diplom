import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqDr7pQGU87V-z82xInDJq3xweXFLOmQo",
  authDomain: "fir-auth-ee797.firebaseapp.com",
  projectId: "fir-auth-ee797",
  storageBucket: "fir-auth-ee797.appspot.com",
  messagingSenderId: "527412355783",
  appId: "1:527412355783:web:1baac367d9a142df3214e2",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
