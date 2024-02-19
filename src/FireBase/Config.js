import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyDSa-pR79VoGj0RNHoqe3-jJo6PG4KNs6A',
    authDomain: 'work-history-3cb5c.firebaseapp.com',
    projectId: 'work-history-3cb5c',
    storageBucket: 'work-history-3cb5c.appspot.com',
    messagingSenderId: '1037995823536',
    appId: '1:1037995823536:web:862f0e7328e6c5153ac675',
    measurementId: 'G-D1KZGSBLWT',
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const firestore = getFirestore(app);
