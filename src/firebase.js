import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyB1uvdwCbJR_TymfV__WW_JD-HTu608Kqs",
    authDomain: "leave-application-app-3b3c8.firebaseapp.com",
    projectId: "leave-application-app-3b3c8",
    storageBucket: "leave-application-app-3b3c8.appspot.com",
    messagingSenderId: "82508330762",
    appId: "1:82508330762:web:dd67dedff365085e63acf3",
    measurementId: "G-TQTHNJRVJM"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export default firebase;
