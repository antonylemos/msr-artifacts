import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mf_navbar",
      filename: "remoteEntry.js",
      exposes: {
        "./Navbar": "./src/Navbar.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5002,
  },
  build: {
    outDir: '../dist/mf-navbar',
    emptyOutDir: false ,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css") return "mf-navbar.css";
          return assetInfo.name ? assetInfo.name : "[name].[ext]";
        },
      },
    },
  },
});
