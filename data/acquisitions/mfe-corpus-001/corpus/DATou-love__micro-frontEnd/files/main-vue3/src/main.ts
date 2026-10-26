import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'
import router from './router/index.ts'

const app = createApp(App)
app.use(router)

// 定义子应用
registerMicroApps([
  {
    name: 'sub-vue2', // 子应用名称
    entry: '//localhost:8081', // 子应用启动后的访问地址
    container: '#subapp-viewport', // 子应用挂载的容器 id
    activeRule: '/sub-vue2', // 激活路由
  },
  {
    name: 'sub-react16',
    entry: '//localhost:3000',
    container: '#subapp-viewport',
    activeRule: '/sub-react16',
  },
])

// 启动 qiankun
start({
  // 可选配置
  sandbox: {
    // 开启严格的沙箱模式（推荐）
    strictStyleIsolation: true,
    // 或使用实验性的影子DOM模式
    // experimentalStyleIsolation: true,
  },
  // 跳过预加载（开发环境可关闭以加快启动）
  // prefetch: false,
})

app.mount('#app')