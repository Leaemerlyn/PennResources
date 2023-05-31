// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCEeS4yFlu4_2Q9jeoGWTHjIGXGVTjNPpY",
    authDomain: "pennresources.firebaseapp.com",
    projectId: "pennresources",
    storageBucket: "pennresources.appspot.com",
    messagingSenderId: "838265112558",
    appId: "1:838265112558:web:84de551c4040ac632ff0ff",
    measurementId: "G-9F2VNHRJZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomerParameters({hd: "seas.upenn.edu"});
