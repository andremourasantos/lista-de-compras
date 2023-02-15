import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAdgbV_X6cdkZWytuuUuA2-_XlvL_V4mo",
  authDomain: "groceries-app-451f5.firebaseapp.com",
  projectId: "groceries-app-451f5",
  storageBucket: "groceries-app-451f5.appspot.com",
  messagingSenderId: "1010463074472",
  appId: "1:1010463074472:web:7a51918a58c895cfaf7a9d"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

(() => {
  if(document.querySelector('#aterrissagem-login')) {
    document.querySelector('#btn_login-google').addEventListener('click', ()=>{
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    })
  }
})()

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.open('/app', '_self')
  } else {}
});