import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, getDoc, doc, query, collection, orderBy, setDoc, serverTimestamp, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

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
    COLECAO_LISTA_DE_COMPRAS: ''
};

onAuthStateChanged(auth, async (usuario) => {
    if(usuario){
        document.querySelector('header img').src = usuario.photoURL;

        //INFORMAÇÕES DO USUÁRIO
        USUARIO.UID = usuario.uid;
        USUARIO.NOME = usuario.displayName;
        USUARIO.EMAIL = usuario.email;
        USUARIO.DOC_REFERENCIA = doc(BANCO_DE_DADOS, 'lista-de-compras', USUARIO.UID)
        USUARIO.COLECAO_LISTA_DE_COMPRAS = collection(BANCO_DE_DADOS, 'lista-de-compras', USUARIO.UID, 'lista')
        checarBancoDeDadosPorListaDoUsuario();
    } else {
        window.open('/', '_self')
    }
});

async function checarBancoDeDadosPorListaDoUsuario () {
    if(!((await getDoc(USUARIO.DOC_REFERENCIA)).exists())){
        setDoc(USUARIO.DOC_REFERENCIA, {
            nome: USUARIO.NOME,
            email: USUARIO.EMAIL,
            criacao: serverTimestamp()
        });
    };

    resgatarItensDaLista()
};

let inscricaoNoBancoDeDados

async function resgatarItensDaLista () {
    const CONSULTA = query(USUARIO.COLECAO_LISTA_DE_COMPRAS, orderBy('criacao', 'asc'))

    inscricaoNoBancoDeDados = onSnapshot(CONSULTA, (snapshot) => {
        let itens_da_lista = []
        
        //Filtro de itens já adicionados
        const itens_ja_adicionados = []
        document.querySelectorAll('.item_da_lista').forEach(item => {
            itens_ja_adicionados.push(item.getAttribute('data-item-id'))
        })

        snapshot.forEach(documento => {
            if(itens_ja_adicionados.includes(documento.id)){
                return;
            } else {
                itens_da_lista.push({...documento.data(), id: documento.id});
            }
        })

        if(itens_da_lista.length == 0){return}

        itens_da_lista.forEach(documento => {
            DATA_ITEM.ADICIONAR(documento)
        })
    })
};

//↓↓ DESINSCREVE DO BANCO DE DADOS
window.addEventListener('beforeunload', function (event) {
    this.localStorage.setItem('fechou',1)
    inscricaoNoBancoDeDados()
});

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
    SALVAR: (item_info) => {
        /*ADICIONA O ITEM À NUVEM*/
        if(item_info.nome === ''){
            DATA_ITEM.NOTIFICAR('warning', 'Não é possível adicionar um item sem nome.');
            document.querySelector('[data-item="popup"] .btn-acao_secundaria').click();
            return;
        }

        addDoc(USUARIO.COLECAO_LISTA_DE_COMPRAS, {
            nome: item_info.nome,
            criacao: serverTimestamp()
        })
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

        DATA_ITEM_ICONES_DE_ACAO.EDITAR(container)
        DATA_ITEM_ICONES_DE_ACAO.DELETAR(container)

        //Anexando ao DOM
        document.querySelector('main').appendChild(container)
    },
    EDITAR: (item_info) => {
        //Atualiza o item diretamente no banco de dados
        updateDoc(doc(BANCO_DE_DADOS, `lista-de-compras/${USUARIO.UID}/lista`, item_info.id), {nome: item_info.nome})

        //Atualiza o item na exibição atual do usuário
        document.querySelector(`[data-item-id="${item_info.id}"] p`).textContent = item_info.nome

        DATA_ITEM.NOTIFICAR('check_circle', `O item "${item_info.nomeAntigo}" foi alterado para "${item_info.nome}".`)
    },
    REMOVER: (item_id) => {
        deleteDoc(doc(BANCO_DE_DADOS, `lista-de-compras/${USUARIO.UID}/lista`, item_id))

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
            clearTimeout(DATA_ITEM.timeoutId)
        }

        DATA_ITEM.timeoutId = setTimeout(() => {
            document.querySelector('#notificacao').style.display = 'none'
        }, 3000)
    }
};
const DATA_ITEM_ICONES_DE_ACAO = {
    /*AÇÕES DOS BOTÕES NA SEÇÃO DE ÍCONES DO ITEM*/
    EDITAR: (elemento_de_item) => {
        elemento_de_item.querySelector('[data-item="editar_item"]').addEventListener('click', (e) => {
            const pai = DATA_ITEM.OBTER_ELEMENTO_PAI(e)
            const id = DATA_ITEM.OBTER_ID(pai)
            DATA_ITEM_POPUP.ACAO_EDITAR(pai)
    
            document.querySelector('[data-item="popup"]').style.animationName = 'abrir_popup'
            setTimeout(()=>{
                document.querySelector('[data-item="popup"]').style.display = 'grid'
                document.querySelector('[data-item="popup"] input:first-of-type').focus()
            }, 100)

            const item_info = {
                id: id,
                nome: '',
                nomeAntigo: document.querySelector(`[data-item-id="${id}"] p`).textContent
            }

            const COLETAR_INFO = () => {
                const nome = document.querySelector('[data-item="popup"] input[type="text"]').value

                if(nome === ''){
                    document.querySelector('[data-item="popup"] .btn-acao_secundaria').click();
                    DATA_ITEM.NOTIFICAR('warning', 'Não é possível alterar o nome do item para um valor vazio.');
                    return;
                } else if (nome === item_info.nomeAntigo){
                    document.querySelector('[data-item="popup"] .btn-acao_secundaria').click();
                    DATA_ITEM.NOTIFICAR('warning', 'Novo nome igual ao nome anterior, nada foi feito.');
                    return;
                }

                item_info.nome = nome;
                DATA_ITEM.EDITAR(item_info)
                
                document.querySelector(`[data-item-id="${id}"]`).classList.remove('editar_item')
                document.querySelector('[data-item="popup"] .btn-acao_secundaria').click()
            }

            document.querySelector('[data-item="popup"] .btn-acao_primaria').addEventListener('click', COLETAR_INFO)
        })
    },
    DELETAR: (elemento_de_item) => {
        elemento_de_item.querySelectorAll('[data-item="deletar_item"], [data-item="concluir_item"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pai = DATA_ITEM.OBTER_ELEMENTO_PAI(e)
                const id = DATA_ITEM.OBTER_ID(pai)

                DATA_ITEM.REMOVER(id)
            })
        })
    }
};
const POPUPS = {
    ABRIR: (identificador_do_popup) => {
        document.querySelector(identificador_do_popup).style.animationName = 'abrir_popup';
        setTimeout(()=>{
            document.querySelector(identificador_do_popup).style.display = 'grid'
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
    }
};
const DATA_ITEM_POPUP = {
    /*ESSAS FUNÇÕES APENAS ALTERAM O CONTEÚDO DOS POPUPS, NÃO EXECUTAM AÇÕES.*/
    ACAO_ADICIONAR: () => {
        document.querySelector('[data-item="popup"] h2').textContent = 'Adicionar item';
        document.querySelector('[data-item="popup"] p').textContent = 'O que você vai adicionar?';
        document.querySelector('[data-item="popup"] input[type="text"]').value = ''
        document.querySelector('[data-item="popup"] .btn-acao_primaria').textContent = 'Adicionar';
    },
    ACAO_EDITAR: (elemento_pai) => {
        document.querySelector('[data-item="popup"] h2').textContent = 'Editar item';
        document.querySelector('[data-item="popup"] p').textContent = 'O que você deseja alterar?';
        document.querySelector('[data-item="popup"] input[type="text"]').value = elemento_pai.querySelector('p').textContent;
        document.querySelector('[data-item="popup"] .btn-acao_primaria').textContent = 'Alterar';
    }
};

//↓↓ REGISTRAR SERVICEWORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/app/sw.js")
        .catch(erro => console.log(erro))
    })
}

//↓↓ TRILHA PARA INSTALAÇÃO DO PWA
let promptDeInstalacaoPWA;

function instalarPWA() {
    POPUPS.FECHAR('.popup')
    promptDeInstalacaoPWA.prompt();
    promptDeInstalacaoPWA.userChoice.then(async (choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            document.querySelector('[data-btn-cabecalho="atalho_na_tela_inicial"]').style.display = 'none';

            POPUPS.FECHAR('.popup')
            await POPUPS.IMPORTAR('pwa_sucesso')
            POPUPS.ABRIR('[data-popup="pwa_sucesso"]')

            const FECHAR = () => {
                POPUPS.FECHAR('.popup')

                document.querySelector('[data-popup="pwa_sucesso"] .btn-acao_primaria').removeEventListener('click', FECHAR)
            }

            document.querySelector('[data-popup="pwa_sucesso"] .btn-acao_primaria').addEventListener('click', FECHAR)
        } else {
            POPUPS.FECHAR('.popup')
        }

        //LIMPA O PROMPT
        promptDeInstalacaoPWA = null;
    });
};

window.addEventListener('beforeinstallprompt', (e) => {
    if (!(window.matchMedia('(display-mode: standalone)').matches)) {
        e.preventDefault();
        promptDeInstalacaoPWA = e;

        document.querySelector('[data-btn-cabecalho="atalho_na_tela_inicial"]').style.display = 'flex';
    } else {
        return;
    }
})

//↓↓ BOTÕES DO MENU
function adicionarAcoesAosBotoesDoMenu() {
    //Animação do menu do cabeçalho.
    document.querySelector('[data-btn-acao="abrir_menu_cabecalho"]').addEventListener('click', ()=>{
        const display = document.querySelector('#menu_cabecalho').style.display === 'grid' ? 'none' : 'grid';
        const animacao = document.querySelector('#menu_cabecalho').style.display === 'grid' ? 'fechar_menu_cabecalho' : 'abrir_menu_cabecalho';

        document.querySelector('#menu_cabecalho').style.animationName = animacao
        setTimeout(()=>{
            document.querySelector('#menu_cabecalho').style.display = display;
        },100)
    });

    //Ações dos botões
    document.querySelector('[data-btn-cabecalho="sair_da_conta"]').addEventListener('click', ()=>{
        auth.signOut()
    });

    document.querySelector('[data-btn-cabecalho="conta"]').addEventListener('click', ()=>{
        window.open('/app/conta/', '_self')
    });

    document.querySelector('[data-btn-cabecalho="novidades"]').addEventListener('click', ()=>{
        window.open('/app/novidades/', '_self')
    });

    document.querySelector('[data-btn-cabecalho="atalho_na_tela_inicial"]').addEventListener('click', () => {
        document.querySelector('[data-popup="pwa"] .btn-acao_primaria').addEventListener('click', instalarPWA)
        POPUPS.ABRIR('[data-popup="pwa"]');
    });
}; adicionarAcoesAosBotoesDoMenu();

//↓↓ BOTÃO DE ADICIONAR ITEM
document.querySelector('[data-item="adicionar_item"]').addEventListener('click', ()=>{
    DATA_ITEM_POPUP.ACAO_ADICIONAR()

    document.querySelector('[data-item="popup"]').style.animationName = 'abrir_popup'
    setTimeout(()=>{
        document.querySelector('[data-item="popup"]').style.display = 'grid'
        document.querySelector('[data-item="popup"] input:first-of-type').focus()
    }, 100)

    const COLETAR_INFO = () => {
        const item_info = {
            nome: document.querySelector('[data-item="popup"] input[type="text"]').value
        }

        DATA_ITEM.SALVAR(item_info)

        document.querySelector('[data-item="popup"] .btn-acao_primaria').removeEventListener('click', COLETAR_INFO)
        document.querySelector('[data-item="popup"] .btn-acao_secundaria').click()
    }

    document.querySelector('[data-item="popup"] .btn-acao_primaria').addEventListener('click', COLETAR_INFO)
});

    //ANIMAÇÃO DO BOTÃO
    (()=>{
        const BTN_ADICIONAR_ITEM = {
            ELEMENTO: document.getElementById("adicionar_item"),
            TEXTO: '',
            TAMANHO_G: '',
            TAMANHO_P: '',
        }
    
        BTN_ADICIONAR_ITEM.TEXTO = BTN_ADICIONAR_ITEM.ELEMENTO.childNodes[0]
        BTN_ADICIONAR_ITEM.TAMANHO_G = BTN_ADICIONAR_ITEM.ELEMENTO.clientWidth
        BTN_ADICIONAR_ITEM.TAMANHO_P = (Number((getComputedStyle(BTN_ADICIONAR_ITEM.ELEMENTO).padding).replace('px','')))*2 + Number((getComputedStyle(BTN_ADICIONAR_ITEM.ELEMENTO.querySelector('.material-symbols-rounded')).fontSize).replace('px',''))
    
        BTN_ADICIONAR_ITEM.ELEMENTO.style.width = BTN_ADICIONAR_ITEM.TAMANHO_G + 'px'
    
        setTimeout(function() {
            BTN_ADICIONAR_ITEM.TEXTO.remove()
            BTN_ADICIONAR_ITEM.ELEMENTO.style.width = BTN_ADICIONAR_ITEM.TAMANHO_P + 'px'
        }, 5000);
          
    
        BTN_ADICIONAR_ITEM.ELEMENTO.addEventListener("mouseenter", () => {
            BTN_ADICIONAR_ITEM.ELEMENTO.style.width = BTN_ADICIONAR_ITEM.TAMANHO_G + 'px'
            setTimeout(() => {
                BTN_ADICIONAR_ITEM.ELEMENTO.insertBefore(BTN_ADICIONAR_ITEM.TEXTO, BTN_ADICIONAR_ITEM.ELEMENTO.childNodes[0])
            }, 150);
        });
    
        BTN_ADICIONAR_ITEM.ELEMENTO.addEventListener("mouseleave", () => {
            BTN_ADICIONAR_ITEM.TEXTO.remove()
            BTN_ADICIONAR_ITEM.ELEMENTO.style.width = BTN_ADICIONAR_ITEM.TAMANHO_P + 'px'
        });
    
        BTN_ADICIONAR_ITEM.ELEMENTO.addEventListener('click', () => {
            BTN_ADICIONAR_ITEM.TEXTO.remove()
            BTN_ADICIONAR_ITEM.ELEMENTO.style.width = BTN_ADICIONAR_ITEM.TAMANHO_P + 'px'
        })
    })();

//↓↓ FECHAR POPUP
document.querySelectorAll('.popup .btn-acao_secundaria').forEach(btn => {
    const FECHAR = ()=>{POPUPS.FECHAR('.popup')}
    btn.addEventListener('click', FECHAR)
})