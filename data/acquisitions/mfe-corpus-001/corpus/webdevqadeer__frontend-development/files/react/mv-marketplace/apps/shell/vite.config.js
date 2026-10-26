import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell_app",
      remotes: {
        buyer_app: "http://localhost:5001/assets/remoteEntry.js",
        seller_app: "http://localhost:5002/assets/remoteEntry.js",
        admin_app: "http://localhost:5003/assets/remoteEntry.js",
        payment_app: "http://localhost:5004/assets/remoteEntry.js",
        package: "http://localhost:5005/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  build: {
    outDir: "dist",
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
