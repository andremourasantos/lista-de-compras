const staticApp = "lista-de-compras-app"
const assets = [
  "/logo.png",
  "/universal.css",
  "/imagens/ilustracoes/lista_vazia.png",
  "/imagens/esqueleto_de_carregamento.png",
  "/index.html",
  "/index.css",
  "/index.js",
  "/verificar_usuario.js",
  "/app/index.html",
  "/app/index.css",
  "/app/app.js",
  "/conta/",
  "/novidades/"
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