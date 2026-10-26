import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      reportsDirectory: '../../coverage/libs/contracts-platform-messaging',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/**/index.ts'],
    },
  },
  resolve: {
    alias: {
      '@nx-mf-df/contracts-platform-messaging': path.resolve(
        __dirname,
        './src/index.ts',
      ),
    },
  },
});
