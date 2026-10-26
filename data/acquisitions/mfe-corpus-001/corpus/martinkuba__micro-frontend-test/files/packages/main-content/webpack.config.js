const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  name: 'mainContent',
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mainContent',
      filename: 'remoteEntry.js',
      exposes: {
        './MainContent': './src/MainContent',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        '@grafana/faro-web-sdk': { singleton: true, requiredVersion: '^2.1.0' },
      },
    }),
  ],
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

