import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const productsRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: productsRoot,
  cacheDir: '../../node_modules/.vite/products-test',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
