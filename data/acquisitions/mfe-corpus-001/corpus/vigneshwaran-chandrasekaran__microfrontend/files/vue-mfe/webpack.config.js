const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { VueLoaderPlugin } = require('vue-loader');

/**
 * Vue MFE — Webpack Configuration
 *
 * Same Module Federation provider pattern as the React MFEs, but:
 *   - Uses vue-loader to process .vue Single File Components (SFCs)
 *   - Shares the "vue" package so only one copy of Vue runs at a time
 */
module.exports = {
  entry: './src/index.js',

  mode: 'development',

  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  output: {
    publicPath: 'auto',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      // Use the ES module bundler build of Vue 3 (needed for webpack)
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },

  module: {
    rules: [
      {
        // vue-loader processes .vue files (template, script, style blocks)
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // vue-style-loader injects <style> blocks from .vue files into the DOM
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'vueMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './mount': './src/mount.js',
      },
      shared: {
        vue: { singleton: true, requiredVersion: '^3.3.0' },
      },
    }),

    // Required for vue-loader to work
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
