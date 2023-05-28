document.querySelector('header button').addEventListener('click', ()=>{
    window.open('/app/', '_self')
})

document.querySelector('[data-novidade-id="001"]').addEventListener('click', ()=>{window.open('/app/conta/?abrir_popup=politica_de_privacidade', '_self')})