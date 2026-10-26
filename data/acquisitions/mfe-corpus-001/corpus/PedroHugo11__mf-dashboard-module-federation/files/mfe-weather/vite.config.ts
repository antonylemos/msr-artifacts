import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    target: "esnext",
  },
  plugins: [
    react(),
    federation({
      name: "weather",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/bootstrap",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});

