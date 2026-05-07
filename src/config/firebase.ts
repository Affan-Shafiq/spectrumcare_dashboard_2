import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQpR5NgVaiEifBYQa-F7bnzSihVaJLbYo",
    authDomain: "spectrum-care-d81e9.firebaseapp.com",
    projectId: "spectrum-care-d81e9",
    storageBucket: "spectrum-care-d81e9.firebasestorage.app",
    messagingSenderId: "93508055014",
    appId: "1:93508055014:web:88189654c35b67d46df027",
    measurementId: "G-49PZNJPFF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
