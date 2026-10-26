const { ModuleFederationPlugin } = require('webpack').container
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { sharedAliases, VUETIFY2_DIST } = require('../../scripts/webpack.aliases')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3002/',
    clean: true,
  },

  resolveLoader: {
    // Local node_modules first — ensures vue-loader@15 is used, not the hoisted @17
    modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, '../../node_modules')],
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      ...sharedAliases,
    },
  },

  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-typescript'] },
        },
      },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/,
        use: ['vue-style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
      },
      { test: /\.(woff2?|eot|ttf|otf|svg)$/, type: 'asset/resource' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Admin MFE (standalone dev)',
      template: './public/index.html',
      excludeChunks: ['remoteEntry'],
    }),
    new VueLoaderPlugin(),
    // Redirect any vuetify/lib/* import to the pre-built dist.
    // This catches the inline sass-loader! requires inside vuetify/lib source files.
    new webpack.NormalModuleReplacementPlugin(
      new RegExp("^vuetify(\/lib.*)?$"),
      (resource) => { resource.request = VUETIFY2_DIST }
    ),
    new ModuleFederationPlugin({
      name: 'mfe_admin',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/bootstrap.js' },
      shared: {
        vue: { singleton: true, requiredVersion: '^2.7.0' },
      },
    }),
  ],

  devServer: {
    port: 3002,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
}
