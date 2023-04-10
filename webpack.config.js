const path = require('path')

//DESENVOLVIMENTO
// module.exports = [
//     {
//         mode: "development",
//         entry: "./src/pagina_de_aterrissagem.js",
//         output: {
//             path: path.resolve(__dirname, "public"),
//             filename: "index.js"
//         },
//         watch: true,
//         devtool: 'eval-source-map'
//     },
//     {
//         mode: "development",
//         entry: "./src/app.js",
//         output: {
//             path: path.resolve(__dirname, "public/app"),
//             filename: "app.js"
//         },
//         watch: true,
//         devtool: "eval-source-map"
//     },
//     {
//         mode: "development",
//         entry: "./src/conta.js",
//         output: {
//             path: path.resolve(__dirname, "public/app/conta"),
//             filename: "conta.js"
//         },
//         watch: true,
//         devtool: "eval-source-map"
//     },
//     {
//         mode: "development",
//         entry: "./src/verificar_usuario.js",
//         output: {
//             path: path.resolve(__dirname, "public/app"),
//             filename: "verificar_usuario.js"
//         },
//         watch: true,
//         devtool: "eval-source-map"
//     }
// ]

//PRODUÇÃO
module.exports = [
    {
        mode: "production",
        entry: "./src/pagina_de_aterrissagem.js",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "index.js"
        }
    },
    {
        mode: "production",
        entry: "./src/app.js",
        output: {
            path: path.resolve(__dirname, "public/app"),
            filename: "app.js"
        }
    },
    {
        mode: "production",
        entry: "./src/conta.js",
        output: {
            path: path.resolve(__dirname, "public/app/conta"),
            filename: "conta.js"
        }
    },
    {
        mode: "production",
        entry: "./src/verificar_usuario.js",
        output: {
            path: path.resolve(__dirname, "public/app"),
            filename: "verificar_usuario.js"
        }
    }
]