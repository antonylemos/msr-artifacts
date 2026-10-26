const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "cardapio",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Cardapio": "./src/components/Cardapio.jsx",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      })
    );
    return config;
  },
};
