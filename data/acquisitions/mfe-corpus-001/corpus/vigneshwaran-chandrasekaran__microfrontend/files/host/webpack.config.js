const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

/**
 * Host App — Webpack Configuration
 *
 * Remote URLs:
 *   - Local dev  : hardcoded localhost ports (below)
 *   - Production : read from environment variables set in each Vercel project
 *       REACT_MFE1_URL   → deployed URL of react-mfe-1  (e.g. https://react-mfe-1.vercel.app)
 *       REACT_MFE2_URL   → deployed URL of react-mfe-2
 *       VUE_MFE_URL      → deployed URL of vue-mfe
 *       ANGULAR_MFE_URL  → deployed URL of angular-mfe
 */

// Production: MFEs are served from subdirectories on the same Vercel domain.
//   /react-mfe-1/remoteEntry.js, /vue-mfe/remoteEntry.js, etc.
// Development: each MFE runs on its own localhost port.
//
// Export a function so webpack passes argv.mode ('development' | 'production')
// directly — process.env.NODE_ENV is NOT set by --mode in the config context.
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  // Angular MFE uses @angular-architects/module-federation which outputs an ES Module
  // (remoteEntry.js ends with `export { get, init }`). A regular script-tag remote
  // declaration would cause a SyntaxError because classic scripts can't use `export`.
  // Using `promise import(...)` tells webpack to load it via dynamic import() instead.
  const angularRemote = isProd
    ? `promise import('/angular-mfe/remoteEntry.js')`
    : `promise import('http://localhost:4200/remoteEntry.js')`;

  const remotes = isProd
    ? {
        reactMfe1:  'reactMfe1@/react-mfe-1/remoteEntry.js',
        reactMfe2:  'reactMfe2@/react-mfe-2/remoteEntry.js',
        vueMfe:     'vueMfe@/vue-mfe/remoteEntry.js',
        angularMfe: angularRemote,
      }
    : {
        reactMfe1:  'reactMfe1@http://localhost:3001/remoteEntry.js',
        reactMfe2:  'reactMfe2@http://localhost:3002/remoteEntry.js',
        vueMfe:     'vueMfe@http://localhost:3003/remoteEntry.js',
        angularMfe: angularRemote,
      };

  return {
  entry: './src/index.js',

  mode: 'development',

  devServer: {
    port: 3005,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes,
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
  }; // end of config object
}; // end of exported function
