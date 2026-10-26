const rspack = require("@rspack/core");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack");
const { dependencies } = require("./package.json");

module.exports = {
    entry: "./src/entry.ts",
    mode: "development",
    devServer: {
        port: 4000,
    },
    output: {
        publicPath: "http://localhost:4000/",
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
            name: "HomeApp", // This application named 'Home'
            // Remotes are resolved via each remote's mf-manifest.json rather than a
            // hardcoded remoteEntry.js URL — MF2's manifest carries build metadata
            // (exposed modules, shared deps) so consumers can resolve remotes at runtime.
            remotes: {
                HeaderApp: "HeaderApp@http://localhost:4001/mf-manifest.json",
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
