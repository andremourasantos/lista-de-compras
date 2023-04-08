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
const AUTENTICACAO = getAuth();
//↑↑ CONFIGURAÇÕES DO FIREBASE

//↓↓ INFORMAÇÕES DO USUÁRIO
function adicionarInformacoesDoUsuario() {
    const foto_de_perfil = document.querySelector('[data-usuario="foto_de_perfil"]');
    const nome = document.querySelector('[data-usuario="nome"]');
    const email = document.querySelector('[data-usuario="email"]');
    const criadaEm = document.querySelector('[data-usuario="criacoa"]');

    foto_de_perfil.src = AUTENTICACAO.currentUser.photoURL
    nome.textContent = AUTENTICACAO.currentUser.displayName
    email.textContent = AUTENTICACAO.currentUser.email
    criadaEm.textContent = AUTENTICACAO.currentUser.metadata.creationTime
};

onAuthStateChanged(AUTENTICACAO, (usuario)=>{
    if(usuario) {
        adicionarInformacoesDoUsuario();
    } else {
        window.open('/', '_self')
    }
})

//↓↓ AÇÕES DOS BOTÕES DO CABEÇALHO
document.querySelector('header button').addEventListener('click', ()=>{
    window.open('/app/', '_self')
});