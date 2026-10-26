import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld.vue'
import AboutPage from '../views/AboutPage.vue'

// 安装VueRouter插件
Vue.use(VueRouter)

// 注意：在 qiankun 环境下，路由base会在main.js中动态设置
const router = new VueRouter({
  mode: 'history',
  base: '/sub-vue2',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
      },
    {
      // 404页面
      path: '*',
      redirect: '/'
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 可以在这里添加权限验证等逻辑
  next()
})

export default router