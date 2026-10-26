import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5002,
    strictPort: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
  },
  plugins: [
    federation({
      name: "cms_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Cms": "./src/App.vue",
      },
      shared: ["vue"],
    }),
    vue(),
    tailwindcss(),
  ],
  build: {
    target: "esnext", // Permite await fuera de funciones async
    minify: false, // Ayuda a depurar si algo falla
    cssCodeSplit: false, // A veces ayuda con los estilos compartidos
  },
});
