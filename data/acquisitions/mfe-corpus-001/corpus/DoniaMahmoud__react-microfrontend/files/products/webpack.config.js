const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsIndex": "./src/bootstrap",
      },
      shared: ["faker"],
      // Ensure only a single version of faker is loaded
      //  shared: {
      //   faker: {
      //     singleton: true,
      //   },
      // },
    }),
    // Plugin that is gonnaa take a look on whatever file is generated from webpack and use it in the appropriate script tag automatically
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
