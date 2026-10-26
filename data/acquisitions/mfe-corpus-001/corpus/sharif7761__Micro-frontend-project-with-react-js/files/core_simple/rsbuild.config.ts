import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'core_simple',
      filename: 'remoteEntry.js',
      remotes: {
        common_simple: 'common_simple@http://localhost:3001/remoteEntry.js',
        users_simple: 'users_simple@http://localhost:3002/remoteEntry.js',
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
    port: 3000,
  },
});
