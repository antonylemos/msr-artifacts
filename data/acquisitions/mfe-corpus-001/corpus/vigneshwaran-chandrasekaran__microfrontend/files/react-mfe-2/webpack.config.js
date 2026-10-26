const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

/**
 * React MFE 2 — Webpack Configuration
 *
 * Same pattern as react-mfe-1 but on port 3002.
 * Exposes ./mount for the host to call.
 */
module.exports = {
  entry: './src/index.js',

  mode: 'development',

  devServer: {
    port: 3002,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  output: {
    publicPath: 'auto',
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
      name: 'reactMfe2',
      filename: 'remoteEntry.js',
      exposes: {
        './mount': './src/mount.js',
      },
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
