import { fileURLToPath, URL } from 'node:url';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const hostRoot = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const headerRemote = env.VITE_HEADER_REMOTE_URL ?? 'http://localhost:3001/remoteEntry.js';
  const footerRemote = env.VITE_FOOTER_REMOTE_URL ?? 'http://localhost:3002/remoteEntry.js';
  const productsRemote =
    env.VITE_PRODUCTS_REMOTE_URL ?? 'http://localhost:3003/remoteEntry.js';

  return {
    root: hostRoot,
    cacheDir: '../../node_modules/.vite/host',
    plugins: [
      react(),
      federation({
        name: 'host',
        dts: false,
        remotes: {
          header: {
            type: 'module',
            name: 'header',
            entry: headerRemote,
            entryGlobalName: 'header',
            shareScope: 'default',
          },
          footer: {
            type: 'module',
            name: 'footer',
            entry: footerRemote,
            entryGlobalName: 'footer',
            shareScope: 'default',
          },
          products: {
            type: 'module',
            name: 'products',
            entry: productsRemote,
            entryGlobalName: 'products',
            shareScope: 'default',
          },
        },
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
          zustand: {
            singleton: true,
          },
          '@microfrontend/shared': {
            singleton: true,
          },
          '@tanstack/react-query': {
            singleton: true,
          },
        },
      }),
    ],
    server: {
      host: 'localhost',
      port: 3000,
      strictPort: true,
      hmr: {
        host: 'localhost',
        protocol: 'ws',
        clientPort: 3000,
      },
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    preview: {
      host: 'localhost',
      port: 3000,
      strictPort: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    build: {
      target: 'esnext',
      outDir: '../../dist/host',
      emptyOutDir: true,
      manifest: true,
      modulePreload: false,
    },
  };
});
