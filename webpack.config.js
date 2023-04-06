const path = require('path')

//DESENVOLVIMENTO
module.exports = [
    {
        mode: "development",
        entry: "./src/pagina_de_aterrissagem.js",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "index.js"
        },
        watch: true,
        devtool: 'eval-source-map'
    },
    {
        mode: "development",
        entry: "./src/app.js",
        output: {
            path: path.resolve(__dirname, "public/app"),
            filename: "app.js"
        },
        watch: true,
        devtool: "eval-source-map"
    }
]

//PRODUÇÃO
// module.exports = [
//     {
//         mode: "production",
//         entry: "./src/app-index.js",
//         output: {
//             path: path.resolve(__dirname, "public"),
//             filename: "app.js"
//         }
//     },
//     {
//         mode: "production",
//         entry: "./src/app.js",
//         output: {
//             path: path.resolve(__dirname, "public/app"),
//             filename: "app.js"
//         }
//     }
// ]