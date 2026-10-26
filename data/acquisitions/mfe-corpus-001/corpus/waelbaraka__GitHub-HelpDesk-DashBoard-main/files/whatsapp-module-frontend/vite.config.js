// whatsapp-module-frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      // 1. Name of THIS remote application.
      name: 'remote_app', // Must match the alias used in the host's `remotes`.
      filename: 'remoteEntry.js',

      // 2. Define what this remote exposes for the host to use.
      exposes: {
        './Button': './src/components/Button.jsx', 
        './WhatsAppChannelSettingsPage': './src/pages/WhatsAppChannelSettingsPage.jsx',

      },

      // 3. Define where this remote can find the host.
      //    This is the other critical part for your goal.
      remotes: {
        // The key 'platform_host' MUST match the name in your import statement.
        // The value is the URL to the host's remoteEntry.js file.
        platform_host: 'http://localhost:5173/assets/remoteEntry.js',
        
      },

      // 4. List the common libraries to share.
      shared: {


  //// Critical Libraries
        'react': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-router-dom': { singleton: true, eager: true },
        'zustand': { singleton: true, eager: true },
        
        // Common Utilities
        'axios': { singleton: true },
        'react-hot-toast': { singleton: true },
        
        // Icon Libraries
        '@heroicons/react': { singleton: true },
        '@tabler/icons-react': { singleton: true }
      }
    }),
  ],
  server: {
    port: 5001,
    strictPort: true,
    cors: true, // <--- ADD THIS LINE
  },
  build: {
    modulePreload: false,
    target: 'esnext',
  },
});