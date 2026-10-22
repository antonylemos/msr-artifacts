import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/MyCounterElement.jsx',
      formats: ['iife'],
      name: 'MyCounterApp',
      fileName: 'my-counter-app',
    },
  },
});
