import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isLocal = env.IS_LOCAL === 'true';

  const remotes = {
    mf_login: isLocal
      ? "http://localhost:4173/assets/remoteEntry.js"
      : "https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-login/assets/remoteEntry.js",
    mf_dashboard: isLocal
      ? "http://localhost:4175/assets/remoteEntry.js"
      : "https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-dashboard/assets/remoteEntry.js",
    mf_personagem_detalhe: isLocal
      ? "http://localhost:4176/assets/remoteEntry.js"
      : "https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-personagem-detalhe/assets/remoteEntry.js",
    mf_navbar: isLocal
      ? "http://localhost:4174/assets/remoteEntry.js"
      : "https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-navbar/assets/remoteEntry.js",
  };

  return {
    base: '/mfe-react-vite-example/',
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "root_app",
        remotes,
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      outDir: '../dist/root-app',
      emptyOutDir: false 
    },
    server: {
      port: 5000,
    },
  };
});
