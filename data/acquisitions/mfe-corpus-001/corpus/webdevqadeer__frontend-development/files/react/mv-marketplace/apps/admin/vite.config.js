import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "admin_app",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx", // Exposing the main app component
      },
      remotes: {
        package: "http://localhost:5005/assets/remoteEntry.js", // The remote package
      },
      shared: ["react", "react-dom"], // Shared libraries
    }),
  ],
  preview: { port: 5003, strictPort: true },
});
