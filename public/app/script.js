/*SCRIPTS PARA TESTE*/
document.querySelector('[data-btn-acao="abrir_menu_cabecalho"]').addEventListener('click', ()=>{
    const display = document.querySelector('#menu_cabecalho').style.display === 'grid' ? 'none' : 'grid';
    const animacao = document.querySelector('#menu_cabecalho').style.display === 'grid' ? 'fechar_menu_cabecalho' : 'abrir_menu_cabecalho';

    document.querySelector('#menu_cabecalho').style.animationName = animacao
    setTimeout(()=>{
        document.querySelector('#menu_cabecalho').style.display = display;
    },100)
});

document.querySelectorAll('.item_da_lista').forEach(item => {
    item.addEventListener('click', (e)=>{
        item.classList.toggle('editar_item')
    })
});

document.querySelectorAll('.item_da_lista section').forEach(section => {
    section.addEventListener('click', (e)=>{
        e.stopImmediatePropagation()
    })
});

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
      
})()

//AÇÕES COM OS ITENS
const DATA_ITEM = {
    OBTER_ELEMENTO_PAI: (evento) => {
        let pai = evento.currentTarget
        while (pai.nodeName != 'ARTICLE'){
            pai = pai.parentNode
        }
        return pai
    },
    OBTER_ID: (elemento_pai) => {
        return elemento_pai.getAttribute('data-item-id')
    },
    ADICIONAR: (item_info) => {
        const modelo = document.importNode(document.querySelector('template').content, true)
        const item = document.importNode(modelo, true)

        const nome = document.querySelector('[data-item="popup"] input[type="text"]').value

                if(nome === ''){
                    DATA_ITEM.NOTIFICAR('warning', 'Não é possível adicionar um item sem nome.');
                    document.querySelector('[data-item="popup"] .btn-acao_secundaria').click();
                    return
                }

        item.querySelector('p').textContent = item_info.nome

        const container = document.createElement('article')
        container.classList.add('item_da_lista')
        container.setAttribute('data-item-id', Math.random())

        container.appendChild(item)

        //Interações
        container.querySelector('section').addEventListener('click', (e)=>{
            e.stopImmediatePropagation()
        })

        container.addEventListener('click', () => {
            container.classList.toggle('editar_item')
        })

        DATA_ITEM_ACAO.EDITAR(container)
        DATA_ITEM_ACAO.DELETAR(container)

        document.querySelector('main').appendChild(container)
        DATA_ITEM.NOTIFICAR('check_circle', `O item ${item_info.nome} foi adicionado à sua lista de compras.`)
    },
    EDITAR: (item_id, item_info) => {
        document.querySelector(`[data-item-id="${item_id}"] p`).textContent = item_info.nome
    },
    REMOVER: (item_id) => {
        document.querySelector(`[data-item-id="${item_id}"]`).style.animationName = 'deletar_item'

        setTimeout(() => {
            document.querySelector(`[data-item-id="${item_id}"]`).remove()
        }, 250);
    },
    NOTIFICAR: (nome_icone, texto) => {        
        // document.querySelector('#notificacao .material-symbols-rounded').textContent = nome_icone
        // document.querySelector('#notificacao p').textContent = texto

        // document.querySelector('#notificacao').style.display = 'grid'

        // setTimeout(() => {
        //     document.querySelector('#notificacao').style.display = 'none'
        // }, 3000);
    }
};
const DATA_ITEM_ACAO = {
    /*AÇÕES DOS BOTÕES NA SEÇÃO DE ÍCONES DO ITEM*/
    EDITAR: (elemento_de_item) => {
        elemento_de_item.querySelector('[data-item="editar_item"]').addEventListener('click', (e) => {
            const pai = DATA_ITEM.OBTER_ELEMENTO_PAI(e)
            const id = DATA_ITEM.OBTER_ID(pai)
            DATA_ITEM_POPUP.EDITAR(pai)
    
            document.querySelector('[data-item="popup"]').style.animationName = 'abrir_popup'
            setTimeout(()=>{
                document.querySelector('[data-item="popup"]').style.display = 'grid'
                document.querySelector('[data-item="popup"] input:first-of-type').focus()
            },100)
    
            const item_info = {
                nome: '',
                nomeAntigo: document.querySelector(`[data-item-id="${id}"] p`).textContent
            }
    
            const editar = () => {
                const nome = document.querySelector('[data-item="popup"] input[type="text"]').value

                if(nome === ''){
                    DATA_ITEM.NOTIFICAR('warning', 'Não é possível alterar o título para nada.');
                    document.querySelector('[data-item="popup"] .btn-acao_secundaria').click();
                    return
                }

                item_info.nome = nome
    
                DATA_ITEM.EDITAR(id, item_info)
    
                document.querySelector('[data-item="popup"] .btn-acao_primaria').removeEventListener('click', editar)

                document.querySelector(`[data-item-id="${id}"]`).classList.remove('editar_item')
                
                document.querySelector('[data-item="popup"] .btn-acao_secundaria').click()

                DATA_ITEM.NOTIFICAR('check_circle', `O item "${item_info.nomeAntigo}" foi alterado para "${item_info.nome}".`)
            }
    
            document.querySelector('[data-item="popup"] .btn-acao_primaria').addEventListener('click', editar)
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
    },
};
const DATA_ITEM_POPUP = {
    ADICIONAR: () => {
        document.querySelector('[data-item="popup"] h2').textContent = 'Adicionar item';
        document.querySelector('[data-item="popup"] p').textContent = 'O que você vai adicionar?';
        document.querySelector('[data-item="popup"] input[type="text"]').value = ''
        document.querySelector('[data-item="popup"] .btn-acao_primaria').textContent = 'Adicionar';
    },
    EDITAR: (elemento_pai) => {
        document.querySelector('[data-item="popup"] h2').textContent = 'Editar item';
        document.querySelector('[data-item="popup"] p').textContent = 'O que você deseja alterar?';
        document.querySelector('[data-item="popup"] input[type="text"]').value = elemento_pai.querySelector('p').textContent
        document.querySelector('[data-item="popup"] .btn-acao_primaria').textContent = 'Alterar';
    }
};

//Adicionar item
document.querySelector('[data-item="adicionar_item"]').addEventListener('click', ()=>{
    DATA_ITEM_POPUP.ADICIONAR()
    document.querySelector('[data-item="popup"]').style.animationName = 'abrir_popup'
    setTimeout(()=>{
        document.querySelector('[data-item="popup"]').style.display = 'grid'
        document.querySelector('[data-item="popup"] input:first-of-type').focus()
    },100)    

    const item_info = {
        nome: document.querySelector('[data-item="popup"] input[type="text"]').value
    }

    const adicionar = () => {
        const item_info = {
            nome: document.querySelector('[data-item="popup"] input[type="text"]').value
        }
        DATA_ITEM.ADICIONAR(item_info)

        document.querySelector('[data-item="popup"] .btn-acao_primaria').removeEventListener('click', adicionar)

        document.querySelector('[data-item="popup"] .btn-acao_secundaria').click()
    }

    document.querySelector('[data-item="popup"] .btn-acao_primaria').addEventListener('click', adicionar)
})

//Fechar popup
document.querySelector('[data-item="popup"] .btn-acao_secundaria').addEventListener('click', () => {
    document.querySelector('[data-item="popup"]').style.animationName = 'fechar_popup'
    setTimeout(()=>{
        document.querySelector('[data-item="popup"] input[type="text"]').value = ''
        document.querySelector('[data-item="popup"]').style.display = 'none'
    },100)

    //Cria uma cópia do botão para remover todos os eventListeners.
    const btn = document.querySelector('[data-item="popup"] .btn-acao_primaria');
    const btn_copia = btn.cloneNode(true);

    btn.parentNode.replaceChild(btn_copia, btn)
})