const { ModuleFederationPlugin } = require('webpack').container
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { sharedAliases } = require('../../scripts/webpack.aliases')
const path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3004/',
    clean: true,
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, '../../node_modules')],
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: { ...sharedAliases },
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
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
      },
      { test: /\.(woff2?|eot|ttf|otf|svg)$/, type: 'asset/resource' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard MFE (standalone dev)',
      template: './public/index.html',
      excludeChunks: ['remoteEntry'],
    }),
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'mfe_dashboard',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/bootstrap.js' },
      shared: {
        vue: { singleton: true, requiredVersion: '^3.5.0' },
        vuetify: { singleton: true, requiredVersion: '^3.7.0' },
      },
    }),
  ],

  devServer: {
    port: 3004,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
}
