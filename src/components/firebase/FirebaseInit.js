import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const FirebaseInit = () => {

    // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHlIY3djJMXF6A3ehQCCUb_vDfMa7Sd4U",
    authDomain: "ascents-88d37.firebaseapp.com",
    projectId: "ascents-88d37",
    storageBucket: "ascents-88d37.appspot.com",
    messagingSenderId: "208814000577",
    appId: "1:208814000577:web:0a815ed90f8b9177498740"
  };
  
  // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    return (
      <div></div>
    );
  }
  
  export default FirebaseInit;
  