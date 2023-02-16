import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, collection, onSnapshot, setDoc, addDoc, deleteDoc, doc, getDoc, query, orderBy, serverTimestamp, where, updateDoc } from "firebase/firestore";

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
const bd = getFirestore(app);
(() => {if(window.location.hostname === 'localhost'){
    connectFirestoreEmulator(bd, 'localhost', 8080);
}})()

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.querySelector('[data-cabecalho="foto-de-perfil"]').classList.remove('esqueleto-de-carregamento_animacao')
        document.querySelector('[data-cabecalho="foto-de-perfil"]').src = user.photoURL

        document.querySelector('[data-menu-btn="sair"]').addEventListener('click', () => {auth.signOut()})

        if((await getDoc(doc(bd, "lista-de-compras", user.uid))).exists()){
            const coleçãoReferência = query(collection(bd, `lista-de-compras/${user.uid}/lista`), orderBy('criacao', 'asc'))
           
            onSnapshot(coleçãoReferência, (snapshot) => {
            let itens = []

            snapshot.forEach(documento => {
                if(documento.data().item != ''){itens.push({...documento.data(), id: documento.id})} else {
                    deleteDoc(doc(bd, `lista-de-compras/${user.uid}/lista`, documento.id))
                }
            })

            if(itens.length == 0){estadoDaLista('vazia'); return;}

            adicionarItens(itens);
            estadoDaLista('itens');
            itemRemovido(itens)
            return;
           })
        } else {
            setDoc(doc(bd, "lista-de-compras", user.uid), {nome: user.displayName, email: user.email, criacao: serverTimestamp(), edicao: serverTimestamp()})
            estadoDaLista('vazia');
        }
    } else{window.open('/', '_self')}
})

function adicionarItens(lista) {
    const modelo = document.importNode(document.querySelector('#template-lista_item').content,true)

    const adicionar = (item) => {
        const elemento = document.importNode(modelo, true)
        elemento.querySelector('h2').textContent = item.item
        elemento.querySelector('input[type="checkbox"]').setAttribute('data-bd-doc-id',item.id)
        document.querySelector('main').append(elemento)

        document.querySelectorAll('.lista_item input[type="checkbox"]').forEach(item => {item.addEventListener('click', removerItem)})
        document.querySelectorAll('.lista_item span.material-symbols-rounded').forEach(item => {item.addEventListener('click', editarItem)})
    }

    const itensNaLista = Array.from(document.querySelectorAll('.lista_item input[type="checkbox"]'), item => {return item.getAttribute('data-bd-doc-id')})

    for(const [index, item] of Object.entries(lista)){
        if(!(itensNaLista.includes(item.id))){
            adicionar(item)
        } else{continue;}
    }
}

//ADICIONAR ACIONADORES NO CABEÇALHO
(() => {
    document.querySelector('[data-cabecalho="foto-de-perfil"]').addEventListener('click', () => {document.querySelector('header section:nth-child(2)').classList.toggle('cabeçalho-menu')})
})();

//ADICIONAR ITENS À LISTA
(() => {
    const adicionarClasse = () => {
        if(!(document.querySelector('#adicionar-item').className.includes('adicionar-item_aberto'))){
            document.querySelector('#adicionar-item').classList.add('adicionar-item_aberto')
            
            document.querySelector('#adicionar-item').removeEventListener('click', adicionarClasse)

            document.querySelector('#adicionar-item.adicionar-item_aberto > input[type=text]').focus()
        }
    }

    document.querySelector('#adicionar-item > span.material-symbols-rounded').addEventListener('click', ()=>{
        if(document.querySelector('#adicionar-item').className.includes('adicionar-item_aberto')){
            const nome = document.querySelector('#adicionar-item > input[type=text]').value.trim()
            document.querySelector('#adicionar-item').classList.remove('adicionar-item_aberto')

            if(nome === ''){alert('Você não pode adicionar um item vazio.'); return}

            addDoc(collection(bd, `lista-de-compras/${auth.currentUser.uid}/lista`), {
                item: nome,
                criacao: serverTimestamp(),
            })
        } else {
            document.querySelector('#adicionar-item').addEventListener('click', adicionarClasse)
            document.querySelector('#adicionar-item > input[type=text]').value = ''
        }
    })
})()

function editarItem() {
    const elemento = event.currentTarget.parentNode
    const docID =  event.currentTarget.parentNode.querySelector('input[type="checkbox"]').getAttribute('data-bd-doc-id')
    const ícone = event.currentTarget

    const título = elemento.querySelector('h2')
    const campoDeEdição = elemento.querySelector('input[type="text"]')
    const novoValor = campoDeEdição.value

    setTimeout(() => {
        campoDeEdição.focus()
    }, 250);    
    campoDeEdição.value = título.textContent

    switch (elemento.classList.contains('lista_item_edição')) {
        case true:
            ícone.textContent = 'edit'
            
            if(título.textContent === novoValor){break;}
            
            updateDoc(doc(bd,`lista-de-compras/${auth.currentUser.uid}/lista`, docID), {item: novoValor, criacao: serverTimestamp()})

            título.textContent = novoValor
            break;
    
        default:
            ícone.textContent = 'check'
            break;
    }

    elemento.classList.toggle('lista_item_edição')
}

function itemRemovido(itens) {
    let itensBd = Array.from(itens, item => {return item.id})

    const itensNaLista = Array.from(document.querySelectorAll('.lista_item input[type="checkbox"]'), item => {return item.getAttribute('data-bd-doc-id')})

    for(const id of itensNaLista){
        if(!(itensBd.includes(id))){document.querySelector(`[data-bd-doc-id="${id}"]`).parentNode.remove()}
    }
}

function removerItem() {
    const docID = event.currentTarget.getAttribute('data-bd-doc-id')
    const elemento = event.currentTarget.parentNode
    const item = elemento.querySelector('h2').textContent
    
    elemento.remove()
    deleteDoc(doc(bd, `lista-de-compras/${auth.currentUser.uid}/lista`, docID))
}

function estadoDaLista(estado) {    
    if(document.querySelector('#esqueleto-de-carregamento')){document.querySelector('#esqueleto-de-carregamento').remove()}

    switch (estado) {
        case 'vazia':
            document.querySelector('#lista-vazia').style.display = 'grid'
            break;

        case 'erro':
            document.querySelector('#lista-vazia').style.display = 'grid'
            document.querySelector('#lista-vazia h2').textContent = 'Erro de conexão'
            document.querySelector('#lista-vazia p').textContent = 'Não foi possível se conectar ao servidor.'
        break;
    
        default:
            document.querySelector('#lista-vazia').style.display = 'none'
            break;
    }
}