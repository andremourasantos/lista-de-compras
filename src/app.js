import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAAdgbV_X6cdkZWytuuUuA2-_XlvL_V4mo",
    authDomain: "groceries-app-451f5.firebaseapp.com",
    projectId: "groceries-app-451f5",
    storageBucket: "groceries-app-451f5.appspot.com",
    messagingSenderId: "1010463074472",
    appId: "1:1010463074472:web:7a51918a58c895cfaf7a9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
//↑↑ CONFIGURAÇÕES DO FIREBASE

const USUARIO = {
    UID: ''
};

//↓↓ CHECAGEM INICIAL
onAuthStateChanged(auth, async (usuario) => {
    if(usuario){
        document.querySelector('header img').src = usuario.photoURL;
        USUARIO.UID = usuario.uid;
    } else {
        window.open('/', '_self')
    }
});

//↓↓ BOTÕES DO MENU
(() => {
    document.querySelector('[data-btn-cabecalho="sair_da_conta"]').addEventListener('click', ()=>{
        auth.signOut()
    })
})()