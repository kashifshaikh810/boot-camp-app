import firebaseApp from 'firebase/app';
import  'firebase/auth';
import  'firebase/database';
import 'firebase/storage';

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
 
 const fire= firebaseApp.initializeApp(firebaseConfig);
  const auth = fire.auth();
  const database=fire.database();
  const Storage=fire.storage();

export {auth,database,Storage};






