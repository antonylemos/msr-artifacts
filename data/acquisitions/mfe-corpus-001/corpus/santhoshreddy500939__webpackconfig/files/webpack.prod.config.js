const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
module.exports={
    mode:"production",
 
  module: {
    rules: [
    
       {
        test: /\.css$/, // Targets css files
        use: [MiniCssExtractPlugin.loader,'css-loader']
      }
      ,
       {
        test: /\.scss$/, // Targets scss files
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
        filename:"mystyle.css"
    }),

    new HtmlWebpackPlugin({
        template:"index.html"
    }),
    new CleanWebpackPlugin()

  ]
    
  
}