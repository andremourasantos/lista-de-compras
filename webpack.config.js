//DESENVOLVIMENTO
const path = require('path')

module.exports = [
    {
        mode: "development",
        entry: "./src/app-index.js",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "app.js"
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
// const path = require('path')

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