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
  server: { origin: 'http://localhost:5000', port: 5000 },
  preview: { port: 5000, strictPort: true },
  base: 'http://localhost:5000/',
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote_a: {
          type: 'module',
          name: 'remote_a',
          entry: 'http://localhost:5001/remoteEntry.js',
        },
        remote_b: {
          type: 'module',
          name: 'remote_b',
          entry: 'http://localhost:5002/remoteEntry.js',
        },
      },
      shared,
      shareStrategy: 'version-first',
      hostInitInjectLocation: 'entry',
    }),
  ],
  build: { target: 'chrome89', minify: false },
});
