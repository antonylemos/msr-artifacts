// platform-host/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      // 1. Name of THIS host application. The remote will use this name.
      name: 'platform_host',
      filename: 'remoteEntry.js', // Standard filename for dev mode

      // 2. Define the remote applications this host can import from.
      remotes: {
        // 'remote_app' is the alias for your button's project.
        // It must match the `name` in the remote's config.
  remote_app: 'http://localhost:5001/assets/remoteEntry.js', // <--- CORRECTED URL
      },

      // 3. EXPOSE the modules you want to share with remotes.
      //    This is the most important part for your goal.
      exposes: {
        './apiClient': './src/api/api.js', // Expose the API client
        './authStore': './src/stores/authStore.js', // Expose the Zustand store
      },
      
      // 4. List common libraries to share to avoid loading them twice.
      shared: [
        'react', 'react-dom', 'react-router-dom',
        'axios', 'zustand', 'react-hot-toast', '@heroicons/react','@tabler/icons-react'
      ]
    }),
  ],
  server: {
    port: 5173, // Ensure host port is correct
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
  },  
  
  optimizeDeps: {
    include: [
      // List your largest and most common dependencies here
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'axios',
      'zustand',
      'react-hot-toast',
      '@tabler/icons-react',
      '@heroicons/react/24/solid',
      // Add any other large libraries you use, like a chart library or date library
    ],
  },
});