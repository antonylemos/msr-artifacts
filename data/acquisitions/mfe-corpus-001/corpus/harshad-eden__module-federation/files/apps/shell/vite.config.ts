import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        salesPortal: "http://localhost:3001/dist/assets/remoteEntry.js",
        underwriterPortal: "http://localhost:3002/dist/assets/remoteEntry.js",
        productConfig: "http://localhost:3004/dist/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
  },
});
