/*SCRIPTS PARA TESTE*/
document.querySelector('[data-btn-acao="abrir_menu_cabecalho"]').addEventListener('click', ()=>{
    const display = document.querySelector('#menu_cabecalho').style.display === 'grid' ? 'none' : 'grid';
    const animacao = document.querySelector('#menu_cabecalho').style.display === 'grid' ? 'fechar_menu_cabecalho' : 'abrir_menu_cabecalho';

    document.querySelector('#menu_cabecalho').style.animationName = animacao
    setTimeout(()=>{
        document.querySelector('#menu_cabecalho').style.display = display;
    },100)
    
})

document.querySelectorAll('.item_da_lista').forEach(item => {
    item.addEventListener('click', (e)=>{
        item.classList.toggle('editar_item')
    })
})

document.querySelectorAll('.item_da_lista section').forEach(section => {
    section.addEventListener('click', (e)=>{
        e.stopImmediatePropagation()
    })
})

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

        DATA_ITEM_BTN.EDITAR(container)
        DATA_ITEM_BTN.DELETAR(container)

        document.querySelector('main').appendChild(container)
    },
    EDITAR: (item_id, item_info) => {
        document.querySelector(`[data-item-id="${item_id}"] p`).textContent = item_info.nome
    },
    REMOVER: (item_id) => {

    }
};
const DATA_ITEM_BTN = {
    EDITAR: (elemento_de_item) => {
        elemento_de_item.querySelector('[data-item="editar_item"]').addEventListener('click', (e) => {
            const pai = DATA_ITEM.OBTER_ELEMENTO_PAI(e)
            const id = DATA_ITEM.OBTER_ID(pai)
            DATA_ITEM_POPUP.EDITAR(pai)
    
            document.querySelector('[data-item="popup"]').style.animationName = 'abrir_popup'
            setTimeout(()=>{
                document.querySelector('[data-item="popup"]').style.display = 'grid'
            },100)
    
            const item_info = {
                nome: ''
            }
    
            const editar = () => {
                item_info.nome = document.querySelector('[data-item="popup"] input[type="text"]').value
    
                DATA_ITEM.EDITAR(id, item_info)
    
                document.querySelector('[data-item="popup"] .btn-acao_primaria').removeEventListener('click', editar)
                
                document.querySelector('[data-item="popup"] .btn-acao_secundaria').click()
            }
    
            document.querySelector('[data-item="popup"] .btn-acao_primaria').addEventListener('click', editar)
        })
    },
    DELETAR: (elemento_de_item) => {
        elemento_de_item.querySelectorAll('[data-item="deletar_item"], [data-item="concluir_item"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pai = DATA_ITEM.OBTER_ELEMENTO_PAI(e)
    
                pai.remove()
            })
        })
    },
}
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
})