import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9vBaSZpWEyn3f1RbM_x2JdbQvliA0O2Q",
  authDomain: "e-tutor-8e3ab.firebaseapp.com",
  projectId: "e-tutor-8e3ab",
  storageBucket: "e-tutor-8e3ab.appspot.com",
  messagingSenderId: "795884970385",
  appId: "1:795884970385:web:a40ab25f01b4b754ccba30",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
