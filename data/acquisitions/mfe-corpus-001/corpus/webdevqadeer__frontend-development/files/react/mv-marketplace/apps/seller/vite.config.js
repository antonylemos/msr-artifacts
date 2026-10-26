import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "seller_app",
      filename: "remoteEntry.js",
      exposes: { "./App": "./src/App.jsx" },
      remotes: {
        package: "http://localhost:5005/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  preview: { port: 5002, strictPort: true },
});
