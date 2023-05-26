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

    foto_de_perfil.src = AUTENTICACAO.currentUser.photoURL;
    nome.textContent = AUTENTICACAO.currentUser.displayName;
    email.textContent = AUTENTICACAO.currentUser.email;

    document.querySelectorAll('#perfil .esqueleto_de_carregamento_foto').forEach(elemento => {
        elemento.classList.remove('esqueleto_de_carregamento_foto');
    })
    document.querySelectorAll('#perfil .esqueleto_de_carregamento_texto').forEach(elemento => {
        elemento.classList.remove('esqueleto_de_carregamento_texto');
    })
};

onAuthStateChanged(AUTENTICACAO, (usuario)=>{
    if(usuario) {
        adicionarInformacoesDoUsuario();
    }
})

//↓↓ AÇÕES DOS BOTÕES DO CABEÇALHO
document.querySelector('header button').addEventListener('click', ()=>{
    window.open('/app/', '_self')
});

//↓↓ PARÂMETROS DA URL
window.addEventListener('load', ()=>{
    const procurarNaURL = new URLSearchParams(window.location.search);

    //↓↓ Faz uma ação de acordo com cada parâmetro da URL.
    if(procurarNaURL.get('abrir_popup') != null){
        const identificador_do_popup = procurarNaURL.get('abrir_popup')
        POPUPS.ABRIR(`[data-popup="${identificador_do_popup}"]`)

        const FECHAR = ()=>{
            POPUPS.FECHAR('[data-popup="politica_de_privacidade"]')
            
            document.querySelector('[data-popup="politica_de_privacidade"] .btn-acao_primaria').removeEventListener('click', FECHAR);
        }

        document.querySelector('[data-popup="politica_de_privacidade"] .btn-acao_primaria').addEventListener('click', FECHAR);
    }
})

//↓↓ POPUPS
const POPUPS = {
    ABRIR: (identificador_do_popup) => {
        document.querySelector(identificador_do_popup).style.animationName = 'abrir_popup';
        setTimeout(()=>{
            document.querySelector(identificador_do_popup).style.display = 'grid';
            document.querySelector(identificador_do_popup).scrollTo(0,0)
        }, 100)
    },
    FECHAR: (identificador_do_popup) => {
        document.querySelectorAll(identificador_do_popup).forEach(popup => {
            popup.style.animationName = 'fechar_popup';
            setTimeout(()=>{
                popup.style.display = 'none';
            },100)
        
            //Cria uma cópia do botão para remover todos os eventListeners.
            const btn = popup.querySelector('.btn-acao_primaria');
            const btn_copia = btn.cloneNode(true);
        
            btn.parentNode.replaceChild(btn_copia, btn)
        })
    },
    IMPORTAR: async (identificador_do_popup) => {
        const popups = await fetch('/app/pedacos/popups.html').then(res => {return res.text()})
        const parser = new DOMParser();
        const HTML = parser.parseFromString(popups, 'text/html');
        const POPUP = HTML.querySelector(`[data-popup="${identificador_do_popup}"]`);
        document.body.appendChild(POPUP)

        const FECHAR = ()=>{POPUPS.FECHAR('.popup')}
        if(POPUP.querySelector('.btn-acao_secundaria')){POPUP.querySelector('.btn-acao_secundaria').addEventListener('click', FECHAR)}
    }
};

async function importarPopups(){
    await POPUPS.IMPORTAR('politica_de_privacidade');
    await POPUPS.IMPORTAR('exclusao_de_conta');
    adicionarInteracoesNosBotoesDasSecoes();
}; importarPopups();

//↓↓ AÇÕES DA CONTA
function adicionarInteracoesNosBotoesDasSecoes() {
    document.querySelector('#politica_de_privacidade button').addEventListener('click', ()=>{
        POPUPS.ABRIR('[data-popup="politica_de_privacidade"]')

        const FECHAR = ()=>{
            POPUPS.FECHAR('[data-popup="politica_de_privacidade"]')
            
            document.querySelector('[data-popup="politica_de_privacidade"] .btn-acao_primaria').removeEventListener('click', FECHAR);
        }

        document.querySelector('[data-popup="politica_de_privacidade"] .btn-acao_primaria').addEventListener('click', FECHAR);
    });

    document.querySelector('#exclusao_de_conta button').addEventListener('click', ()=>{
        POPUPS.ABRIR('[data-popup="exclusao_de_conta"]')

        document.querySelector('[data-popup="exclusao_de_conta"] .btn-acao_primaria').addEventListener('click', solicitarExclusaoDeConta);
    });
};

//↓↓ AÇÕES DOS POPUPS
function solicitarExclusaoDeConta() {
    let link = 'mailto:contato@andremourasantos.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20exclus%C3%A3o%20de%20conta&body=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20a%20exclus%C3%A3o%20da%20minha%20conta%20(%23EMAIL%23)%20do%20aplicativo%20lista-de-compras.andremourasantos.com.br.%20Obrigado.';

    link = link.replace('(%23EMAIL%23)', AUTENTICACAO.currentUser.email);

    window.open(link, '_blank');
};