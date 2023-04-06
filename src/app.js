import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, getDoc, doc, query, collection, orderBy, setDoc, serverTimestamp } from "firebase/firestore";

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
const BANCO_DE_DADOS = getFirestore(app);
(() => {if(window.location.hostname === 'localhost'){
    connectFirestoreEmulator(BANCO_DE_DADOS, 'localhost', 8080);
    alert('conectando banco de dados local.')
}})()
//↑↑ CONFIGURAÇÕES DO FIREBASE

const USUARIO = {
    UID: '',
    NOME: '',
    EMAIL: '',
    DOC_REFERENCIA: ''
};

//↓↓ CHECAGEM INICIAL
onAuthStateChanged(auth, async (usuario) => {
    if(usuario){
        document.querySelector('header img').src = usuario.photoURL;

        //INFORMAÇÕES DO USUÁRIO
        USUARIO.UID = usuario.uid;
        USUARIO.NOME = usuario.displayName;
        USUARIO.EMAIL = usuario.email;
        USUARIO.DOC_REFERENCIA = doc(BANCO_DE_DADOS, 'lista-de-compras', USUARIO.UID);

        checaBancoDeDadosPorListaDoUsuario();
    } else {
        window.open('/', '_self')
    }
});

async function checaBancoDeDadosPorListaDoUsuario () {
    if((await getDoc(USUARIO.DOC_REFERENCIA)).exists()){
        alert('banco de dados do usuário existe.')
    } else {
        alert('banco de dados do usuário não existe')

        setDoc(USUARIO.DOC_REFERENCIA, {
            nome: USUARIO.NOME,
            email: USUARIO.EMAIL,
            criacao: serverTimestamp()
        })

        alert('banco de dados do usuário criado.')
    }
}

//↓↓ BOTÕES DO MENU
(() => {
    document.querySelector('[data-btn-cabecalho="sair_da_conta"]').addEventListener('click', ()=>{
        auth.signOut()
    })
})()