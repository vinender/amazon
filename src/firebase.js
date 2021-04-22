import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBOtfq4Ewpphonffa3aYxQ2NzhS4nzBpLc",
  authDomain: "fir-b84d1.firebaseapp.com",
  projectId: "fir-b84d1",
  storageBucket: "fir-b84d1.appspot.com",
  messagingSenderId: "798776800716",
  appId: "1:798776800716:web:430aa4b57f8d236ad89969",
  measurementId: "G-9DRGP3DQYJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth}; 