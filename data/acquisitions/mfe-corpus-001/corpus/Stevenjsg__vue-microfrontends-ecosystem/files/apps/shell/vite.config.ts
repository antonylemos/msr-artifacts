// apps/shell/vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 5000,
    strictPort: true,
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
  plugins: [
    // 1. Aquí solo llamamos al plugin sin argumentos
    tailwindcss(),
    federation({
      name: "shell",
      remotes: {
        dashboard: "http://localhost:5001/assets/remoteEntry.js",
        cms: "http://localhost:5002/assets/remoteEntry.js",
        kanban: "http://localhost:5003/assets/remoteEntry.js",
      },
      shared: ["vue"],
    }),
    vue(),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
