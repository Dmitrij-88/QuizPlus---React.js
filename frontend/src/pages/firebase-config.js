import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDppwl_9TIpyHsvWzh0a2GSztzVq8DIx08",
    authDomain: "cs363-group1-project.firebaseapp.com",
    projectId: "cs363-group1-project",
    storageBucket: "cs363-group1-project.appspot.com",
    messagingSenderId: "837887612068",
    appId: "1:837887612068:web:a2c1ea9fb831b8b81d4231",
    measurementId: "G-SWZ8MP6YWT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };