const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // 子应用端口
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 微前端配置
  configureWebpack: {
    output: {
      // 微前端要求的库配置
      library: 'subVue2',
      libraryTarget: 'umd',
      // 动态打包 (webpack 5)
      chunkLoadingGlobal: 'webpackJsonp_sub_vue2',
    },
  },
  // 路由 base 配置
  // publicPath: '/sub-vue2/',
})