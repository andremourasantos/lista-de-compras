const staticApp = "lista-de-compras-app"
const assets = [
  "/logo.png",
  "/imagens/ilustracoes/lista_vazia.png",
  "/imagens/esqueleto_de_carregamento.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticApp).then(cache => {
    cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})