import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
    server: {
    port: 7100, // 主应用端口
    cors: true, // 允许跨域
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
