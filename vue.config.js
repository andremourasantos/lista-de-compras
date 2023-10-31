const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5500
  },
  pwa: {
    assetsVersion: 'b-1.2',
    manifestOptions: {
      "name": "Lista de compras",
      "short_name": "Lista de compras",
      "description": "Sua nova lista de compras vai ajudar você a se manter organizado e a economizar durante as idas ao mercado.",
      "categories": ["finance", "food", "utilities"],
      "start_url": '/?source=pwa',
      "background_color": "#FFFFFF",
      "display": 'standalone',
      "scope": "/",
      "theme_color": "#FFFFFF",
      "icons": [
        {
          "src": "./img/icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./img/icons/android-chrome-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "./img/icons/apple-touch-icon.png",
          "sizes": "180x180",
          "type": "image/png"
        },
        {
          "src": "./img/icons/favicon-16x16.png",
          "sizes": "16x16",
          "type": "image/png"
        },
        {
          "src": "./img/icons/favicon-32x32.png",
          "sizes": "32x32",
          "type": "image/png"
        },
        {
          "src": "./img/icons/maskable-icon.png",
          "sizes": "300x300",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      "screenshots": [
        {
          "src": "img/promotional/0-lista-vazia.png",
          "sizes": "1079x2110",
          "form_factor": "narrow",
          "label": "A sua nova lista de compras está esperando por você!"
        },
        {
          "src": "img/promotional/1-lista-preenchida.png",
          "sizes": "1079x2110",
          "form_factor": "narrow",
          "label": "Adicione todos os items que precisar, com os detalhes que precisar."
        },
        {
          "src": "img/promotional/2-editando-item.png",
          "sizes": "1079x2110",
          "form_factor": "narrow",
          "label": "Mudou de ideia? Sem problemas, basta clicar no item para editá-lo."
        },
        {
          "src": "img/promotional/0-wide-lista-vazia.png",
          "sizes": "2276x1422",
          "form_factor": "wide",
          "label": "A sua nova lista de compras está esperando por você!"
        },
        {
          "src": "img/promotional/1-wide-lista-preenchida.png",
          "sizes": "2276x1422",
          "form_factor": "wide",
          "label": "Adicione todos os items que precisar, com os detalhes que precisar."
        },
        {
          "src": "img/promotional/2-wide-editando-item.png",
          "sizes": "2276x1422",
          "form_factor": "wide",
          "label": "Mudou de ideia? Sem problemas, basta clicar no item para editá-lo."
        }
      ]
    },
    workboxPluginMode: 'GenerateSW'
  }
})
