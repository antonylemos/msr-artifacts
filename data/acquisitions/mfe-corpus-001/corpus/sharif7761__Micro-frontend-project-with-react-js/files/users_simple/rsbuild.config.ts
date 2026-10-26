import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'users_simple',
      filename: 'remoteEntry.js',
      exposes: {
        './UserList': './src/App.tsx',
      },
      remotes: {
        common_simple: 'common_simple@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
        'react-router-dom': {
          singleton: true,
        },
      },
      dts: false,
    }),
  ],
  server: {
    port: 3002,
  },
});
