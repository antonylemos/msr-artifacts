const path = require("path");
const rspack = require("@rspack/core");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack");
const { dependencies } = require("./package.json");

module.exports = {
    entry: "./src/entry.ts",
    mode: "development",
    devServer: {
        port: 4001,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        // The dts-plugin writes generated type archives straight to disk under
        // dist/ outside the rspack compilation, so they need to be served as
        // plain static files (the default static serving gets confused by the
        // absolute publicPath below).
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    output: {
        publicPath: "http://localhost:4001/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                tsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        },
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new rspack.HtmlRspackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: "HeaderApp",
            filename: "remoteEntry.js",
            exposes: {
                "./Header": "./src/App",
            },
            dts: true,
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    target: "web",
};
