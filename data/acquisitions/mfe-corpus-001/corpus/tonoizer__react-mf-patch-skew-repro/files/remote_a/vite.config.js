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
  server: { origin: 'http://localhost:5001', port: 5001 },
  preview: { port: 5001, strictPort: true },
  base: 'http://localhost:5001/',
  plugins: [
    react(),
    federation({
      name: 'remote_a',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      remotes: {
        remote_c: {
          type: 'module',
          name: 'remote_c',
          entry: 'http://localhost:5003/remoteEntry.js',
        },
      },
      shared,
      shareStrategy: 'version-first',
      hostInitInjectLocation: 'entry',
    }),
  ],
  build: { target: 'chrome89', minify: false },
});
