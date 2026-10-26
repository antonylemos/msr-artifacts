const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

/**
 * React MFE 1 — Webpack Configuration
 *
 * This app is a PROVIDER (remote). It:
 *   1. Serves a remoteEntry.js file that the host can download
 *   2. Exposes the ./mount module so the host can call mount(element)
 */
module.exports = {
  entry: './src/index.js',

  mode: 'development',

  devServer: {
    port: 3001,                          // This MFE lives on port 3001
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  output: {
    publicPath: 'auto',  // lets webpack infer the base URL from where remoteEntry.js is served
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      // Name must match the key used in the host's "remotes" config
      name: 'reactMfe1',

      // The host fetches this file to discover what this MFE exposes
      filename: 'remoteEntry.js',

      // Expose the mount function under the path './mount'
      // Host uses it as: import('reactMfe1/mount')
      exposes: {
        './mount': './src/mount.js',
      },

      // Share React — prevents duplicate React instances across host + this MFE
      shared: {
        react:            { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom':      { singleton: true, requiredVersion: '^18.2.0' },
        'react-redux':    { singleton: true, requiredVersion: '^9.0.0' },
        '@reduxjs/toolkit': { singleton: false, requiredVersion: '^2.0.0' },
      },
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
