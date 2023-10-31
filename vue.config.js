const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5500
  },
  pwa: {
    manifestOptions: {
      "name": "Lista de compras",
      "description": "Sua nova lista de compras para o mercado.",
      "short_name": "Lista de compras",
      "start_url": '/?source=pwa',
      "icons": [
        {
          "src": "./img/favicons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./img/favicons/android-chrome-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "./img/favicons/apple-touch-icon.png",
          "sizes": "180x180",
          "type": "image/png"
        },
        {
          "src": "./img/favicons/favicon-16x16.png",
          "sizes": "16x16",
          "type": "image/png"
        },
        {
          "src": "./img/favicons/favicon-32x32.png",
          "sizes": "32x32",
          "type": "image/png"
        },
        {
          "src": "./img/favicons/mstile-150x150.png",
          "sizes": "150x150",
          "type": "image/png"
        }
      ],
      "background_color": "#FFFFFF",
      "display": 'standalone',
      "scope": "/",
      "theme_color": "#FFFFFF"
    },
    workboxPluginMode: 'GenerateSW'
  }
})
