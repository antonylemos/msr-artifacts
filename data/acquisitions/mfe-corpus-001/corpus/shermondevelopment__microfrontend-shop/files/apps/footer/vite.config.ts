import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';

const footerRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: footerRoot,
  cacheDir: '../../node_modules/.vite/footer',
  plugins: [
    react(),
    federation({
      name: 'footer',
      dts: false,
      filename: 'remoteEntry.js',
      exposes: {
        './Footer': './src/Footer.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    host: 'localhost',
    port: 3002,
    strictPort: true,
    origin: 'http://localhost:3002',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      clientPort: 3002,
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    host: 'localhost',
    port: 3002,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    outDir: '../../dist/footer',
    emptyOutDir: true,
    manifest: true,
    modulePreload: false,
  },
});
