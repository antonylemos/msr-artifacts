import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { fileURLToPath, URL } from "node:url";

const productsRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: productsRoot,
  cacheDir: "../../node_modules/.vite/products",
  plugins: [
    react(),
    federation({
      name: "products",
      dts: false,
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsList": "./src/ProductsList.tsx",
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
    port: 3003,
    strictPort: true,
    origin: "http://localhost:3003",
    hmr: {
      host: "localhost",
      protocol: "ws",
      clientPort: 3003,
    },
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    host: "localhost",
    port: 3003,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
    outDir: "../../dist/products",
    emptyOutDir: true,
    manifest: true,
    modulePreload: false,
  },
});
