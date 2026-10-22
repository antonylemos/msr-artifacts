const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'auto',
  },
  mode: 'production',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9004,
    historyApiFallback: true,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      title: 'List',
    }),
    new ModuleFederationPlugin({
      name: 'ListApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ListRoutes': './src/components/ListRoutes',
      },
      remotes: {
        RegisterApp:
          'RegisterApp@https://register-navy-ten.vercel.app/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: false,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: false,
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),
  ],
};
