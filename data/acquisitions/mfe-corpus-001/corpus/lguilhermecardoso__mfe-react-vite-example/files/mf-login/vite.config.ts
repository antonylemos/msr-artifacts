import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mf_login",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5001,
  },
  build: {
    outDir: '../dist/mf-login',
    emptyOutDir: false ,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css") return "mf-login.css";
          return assetInfo.name ? assetInfo.name : "[name].[ext]";
        },
      },
    },
  },
});
