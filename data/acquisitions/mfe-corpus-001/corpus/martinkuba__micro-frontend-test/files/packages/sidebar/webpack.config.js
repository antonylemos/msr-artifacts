const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  name: 'sidebar',
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3002/',
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
      name: 'sidebar',
      filename: 'remoteEntry.js',
      exposes: {
        './Sidebar': './src/Sidebar',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        // Faro SDK is NOT shared - this micro frontend has its own bundle
      },
    }),
  ],
  devServer: {
    port: 3002,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

