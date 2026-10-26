const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports={
    mode:"development",
    entry:"./index.js",
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,'./dist')
    },
  
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/, // Targets JS files
        exclude: /node_modules/,   // Do not transpile library code
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type:"asset/resource"
      }
    ]
  },
  plugins:[new ModuleFederationPlugin({
      name: "hostApp",
      remotes: {
        RemoteApp: "RemoteApp@http://localhost:9001/remoteappbuild.js",
      }
    }),
    new HtmlWebpackPlugin({
        template:"index.html"
    }),
    new CleanWebpackPlugin()

  ]
    
  
}