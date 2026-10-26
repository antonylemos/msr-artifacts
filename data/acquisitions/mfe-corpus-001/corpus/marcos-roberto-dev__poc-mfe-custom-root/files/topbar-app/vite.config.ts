import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // coloque a dependencia do Vue para vir como externa
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      preserveEntrySignatures: "exports-only",
      output: {
        exports: 'named',
        entryFileNames: 'app.js',
        format: "system",
      }
      // external: ['vue']
    }
  },
})
