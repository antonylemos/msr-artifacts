import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const headerRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: headerRoot,
  cacheDir: '../../node_modules/.vite/header-test',
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
