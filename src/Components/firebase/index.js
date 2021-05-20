import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA_2AZNPPOiyl65EKmATSMIIXMSRdTvJvI",
    authDomain: "boot-camp-app.firebaseapp.com",
    databaseURL: "https://boot-camp-app-default-rtdb.firebaseio.com",
    projectId: "boot-camp-app",
    storageBucket: "boot-camp-app.appspot.com",
    messagingSenderId: "215011817450",
    appId: "1:215011817450:web:1da9dfa29d7d5b60f02493",
    measurementId: "G-L5BGVDSNCF"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
