import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mf_dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/Dashboard.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5003,
  },
  build: {
     outDir: '../dist/mf-dashboard',
    emptyOutDir: false ,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css") return "mf-dashboard.css";
          return assetInfo.name ? assetInfo.name : "[name].[ext]";
        },
      },
    },
  },
});
