import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

const shared = {
  react: { singleton: true, strictVersion: false, requiredVersion: '^19.2.4' },
  'react/jsx-runtime': { singleton: true, strictVersion: false, requiredVersion: '^19.2.4' },
  'react/jsx-dev-runtime': { singleton: true, strictVersion: false, requiredVersion: '^19.2.4' },
  'react/compiler-runtime': { singleton: true, strictVersion: false, requiredVersion: '^19.2.4' },
  'react-dom/client': { singleton: true, strictVersion: false, requiredVersion: '^19.2.4' },
};

export default defineConfig({
  server: { origin: 'http://localhost:5002', port: 5002 },
  preview: { port: 5002, strictPort: true },
  base: 'http://localhost:5002/',
  plugins: [
    react(),
    federation({
      name: 'remote_b',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      shared,
      shareStrategy: 'version-first',
      hostInitInjectLocation: 'entry',
    }),
  ],
  build: { target: 'chrome89', minify: false },
});
