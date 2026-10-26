import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 5175,
  },
  build: {
    target: "esnext",
  },
  plugins: [
    react(),
    federation({
      remotes: {
        weather: "http://localhost:4173/assets/remoteEntry.js",
        counter: "http://localhost:4174/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});

