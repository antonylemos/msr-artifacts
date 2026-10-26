<template>
  <div id="app">
    <h1>主应用 - Vue3</h1>
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/sub-vue2">子应用 Vue2</router-link> |
      <router-link to="/sub-react16">子应用 React16</router-link>
    </nav>

    <!-- 子应用挂载点 -->
    <div id="subapp-viewport"></div>

    <!-- 主应用自己的内容 -->
    <router-view v-if="!isSubAppRoute" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSubAppRoute = ref(false)

// 监听路由变化，判断是否为子应用路由
watch(
  () => route.path,
  (path) => {
    isSubAppRoute.value = path.startsWith('/sub-vue2') || path.startsWith('/sub-react16')
  },
  { immediate: true }
)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav a {
  padding: 0 10px;
  color: #42b983;
}
</style>