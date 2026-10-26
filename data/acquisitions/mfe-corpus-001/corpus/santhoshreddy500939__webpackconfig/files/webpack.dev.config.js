
const path = require("path");
const { merge } = require("webpack-merge");
const common=require('./webpack.common.config')
module.exports=merge(common,{
    mode:"development",
   
  module: {
    rules: [
       {
        test: /\.css$/, // Targets css files
        use: ['style-loader','css-loader']
      }
      ,
       {
        test: /\.scss$/, // Targets scss files
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    port: 9000,
    devMiddleware:{
        writeToDisk:true
    }
  },

    
  
})


