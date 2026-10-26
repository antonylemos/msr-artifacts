import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { fileURLToPath, URL } from "node:url";

const headerRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: headerRoot,
  cacheDir: "../../node_modules/.vite/header",
  plugins: [
    react(),
    federation({
      name: "header",
      dts: false,
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/Header.tsx",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        zustand: {
          singleton: true,
        },
        "@microfrontend/shared": {
          singleton: true,
        },
        "@tanstack/react-query": {
          singleton: true,
        },
      },
    }),
  ],
  server: {
    host: "localhost",
    port: 3001,
    strictPort: true,
    origin: "http://localhost:3001",
    hmr: {
      host: "localhost",
      protocol: "ws",
      clientPort: 3001,
    },
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    host: "localhost",
    port: 3001,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
    outDir: "../../dist/header",
    emptyOutDir: true,
    manifest: true,
    modulePreload: false,
  },
});
