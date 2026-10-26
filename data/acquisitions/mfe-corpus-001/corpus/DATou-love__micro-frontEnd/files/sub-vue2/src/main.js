import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null

// 渲染函数 - Updated for qiankun integration
function render(props = {}) {
  const { container } = props

  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 判断是否在 qiankun 环境下
if (window.__POWERED_BY_QIANKUN__) {
  // 动态设置 publicPath
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 如果在 qiankun 环境下，不立即挂载
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// qiankun 生命周期
export async function bootstrap() {
  console.log('Vue2 app bootstraped')
}

export async function mount(props) {
  console.log('Vue2 app mounted', props)
  render(props)
}

export async function unmount() {
  console.log('Vue2 app unmounted')
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}