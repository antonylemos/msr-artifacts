const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const dependencies = require('./package.json').dependencies;
module.exports = {
    entry:"./src/bootstrap.js",
    output:{
        path:path.resolve(__dirname, "build"),
        filename:"bundle.js",
    },
    mode:"development",
    devServer: { 
        port: 3000,
        historyApiFallback:true
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
            test: /\.(?:js|mjs|cjs|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                   presets: [
                    '@babel/preset-env',
                    ['@babel/preset-react', { runtime: 'automatic' }]
                    ]
                }
            }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template:path.resolve(__dirname, "./public/index.html"),
    }),
    new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
        name:'host_app',
        filename:'remoteEntry.js',
        remotes:{
            'todoForm_app':'todoForm_app@http://localhost:3001/remoteEntry.js',
            'todoList_app':'todoList_app@http://localhost:3002/remoteEntry.js',
        },
        shared:{
            ...dependencies,
        }
    }),
    ],
}