const HTMLWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8082,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./CartShow": "./src/bootstrap",
      },
      shared: ["faker"],
      // Ensure only a single version of faker is loaded
      //  shared: {
      //   faker: {
      //     singleton: true,
      //   },
      // },
    }),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
