import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    libInjectCss(),
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // or 'development'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/styleguide.ts'),
      // name: 'styleguide',
      fileName: (format) => `styleguide.${format}.js`,
      formats: ['system'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', '@mui/material'],
      output: {
        format: 'systemjs',
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          'react-dom/client': 'react-dom/client',
          '@mui/material': '@mui/material',
        },
      },
    },
  },
  preview: {
    port: 3002,
  }
})
