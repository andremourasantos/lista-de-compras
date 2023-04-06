import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, getDoc, doc, query, collection, orderBy, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

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

(() => {
    if(window.location.hostname === 'localhost'){
        connectFirestoreEmulator(BANCO_DE_DADOS, 'localhost', 8080);
    }
})();
//↑↑ CONFIGURAÇÕES DO FIREBASE

//↓↓ CHECAGEM INICIAL
const USUARIO = {
    UID: '',
    NOME: '',
    EMAIL: '',
    DOC_REFERENCIA: '',
    LISTA_DE_COMPRAS: ''
};

onAuthStateChanged(auth, async (usuario) => {
    if(usuario){
        document.querySelector('header img').src = usuario.photoURL;

        //INFORMAÇÕES DO USUÁRIO
        USUARIO.UID = usuario.uid;
        USUARIO.NOME = usuario.displayName;
        USUARIO.EMAIL = usuario.email;
        USUARIO.DOC_REFERENCIA = doc(BANCO_DE_DADOS, 'lista-de-compras', USUARIO.UID)
        USUARIO.LISTA_DE_COMPRAS = collection(BANCO_DE_DADOS, 'lista-de-compras', USUARIO.UID, 'lista')
        checarBancoDeDadosPorListaDoUsuario();
    } else {
        window.open('/', '_self')
    }
});

async function checarBancoDeDadosPorListaDoUsuario () {
    if((await getDoc(USUARIO.DOC_REFERENCIA)).exists()){
        resgatarItensDaLista();
    } else {
        setDoc(USUARIO.DOC_REFERENCIA, {
            nome: USUARIO.NOME,
            email: USUARIO.EMAIL,
            criacao: serverTimestamp()
        });
    }
}

async function resgatarItensDaLista () {
    const CONSULTA = query(USUARIO.LISTA_DE_COMPRAS, orderBy('criacao', 'asc'))

    onSnapshot(CONSULTA, (snapshot) => {
        let itens_da_lista = []

        snapshot.forEach(documento => {
            itens_da_lista.push({...documento.data(), id: documento.id})
        })

        if(itens_da_lista.length == 0){return}

        itens_da_lista.forEach(documento => {
            DATA_ITEM.ADICIONAR(documento)
        })
    })
}

//↓↓ AÇÕES GERAIS
const DATA_ITEM = {
    OBTER_ELEMENTO_PAI: (evento) => {
        let pai = evento.currentTarget;
        while (pai.nodeName != 'ARTICLE'){
            pai = pai.parentNode;
        };
        return pai;
    },
    OBTER_ID: (elemento_pai) => {
        return elemento_pai.getAttribute('data-item-id');
    },
    SALVAR: () => {
        /*ADICIONA O ITEM À NUVEM*/
        
    },
    ADICIONAR: (item_info) => {
        /*ADICIONA O ITEM AO DOM*/
        const modelo = document.importNode(document.querySelector('template').content, true)
        const item = document.importNode(modelo, true)

        //Adicionando informações
        item.querySelector('p').textContent = item_info.nome

        const container = document.createElement('article')
        container.classList.add('item_da_lista')
        container.setAttribute('data-item-id', item_info.id)

        container.appendChild(item)

        //Adicionando interações
        container.querySelector('section').addEventListener('click', (e)=>{
            e.stopImmediatePropagation()
        })

        container.addEventListener('click', () => {
            container.classList.toggle('editar_item')
        })

        DATA_ITEM_ACAO.EDITAR(container)
        DATA_ITEM_ACAO.DELETAR(container)

        //Anexando ao DOM
        document.querySelector('main').appendChild(container)
    },
    EDITAR: (item_id, item_info) => {
        document.querySelector(`[data-item-id="${item_id}"] p`).textContent = item_info.nome
    },
    REMOVER: (item_id) => {
        document.querySelector(`[data-item-id="${item_id}"]`).style.animationName = 'deletar_item'

        setTimeout(() => {
            document.querySelector(`[data-item-id="${item_id}"]`).remove()
        }, 150);
    },
    NOTIFICAR: (nome_icone, texto) => {        
        document.querySelector('#notificacao .material-symbols-rounded').textContent = nome_icone
        document.querySelector('#notificacao p').textContent = texto

        document.querySelector('#notificacao').style.display = 'grid'

        if (DATA_ITEM.timeoutId) {
            console.log(1)
            clearTimeout(DATA_ITEM.timeoutId)
        } else {console.log(2)}

        DATA_ITEM.timeoutId = setTimeout(() => {
            document.querySelector('#notificacao').style.display = 'none'
        }, 3000)
    }
};

//↓↓ BOTÕES DO MENU
(() => {
    document.querySelector('[data-btn-cabecalho="sair_da_conta"]').addEventListener('click', ()=>{
        auth.signOut()
    })
})()