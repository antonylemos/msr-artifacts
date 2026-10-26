import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mf_personagem_detalhe",
      filename: "remoteEntry.js",
      exposes: {
        "./PersonagemDetalhe": "./src/PersonagemDetalhe.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5004,
  },
  build: {
    outDir: '../dist/mf-personagem-detalhe',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css") return "mf-personagem-detalhe.css";
          return assetInfo.name ? assetInfo.name : "[name].[ext]";
        },
      },
    },
  },
});
