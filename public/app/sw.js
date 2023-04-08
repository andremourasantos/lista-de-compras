const staticApp = "lista-de-compras-app"
const assets = [
  "/logo.png",
  "/universal.css",
  "/imagens/ilustracoes/lista_vazia.png",
  "/app",
  "/app/index.html",
  "/app/index.css",
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