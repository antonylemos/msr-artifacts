import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from "@module-federation/vite";

export default defineConfig({
    base: '/',
    server: {
        port: 3000,
        cors: true,
    },
  plugins: [
      vue(),
      federation({
          name: 'host',
          filename: 'remoteEntry.js',
          exposes: {
              './AuthStore': './src/stores/AuthStore.js',
              './HistoryStore': './src/stores/HistoryStore.js',
              './ErrorStore': './src/stores/ErrorStore.js',
              './PopupWindow': './src/common/PopupWindow.vue'
          },
          remotes: {
              remote_inputs: {
                  entry: "https://localhost/remote-inputs/remoteEntry.js",
                  name: "remote_inputs",
                  type: "module"
              },
              remote_results: {
                  entry: "https://localhost/remote-results/remoteEntry.js",
                  name: "remote_results",
                  type: "module"
              }
          },
          shared: {
              vue: {singleton: true},
              pinia: {singleton: true}
          }
      })
  ],
})
