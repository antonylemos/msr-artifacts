import * as Repack from '@callstack/repack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sharedDeps } from '../shared-deps/sharedDeps.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Mini-app dashboard (REMOTE) — espelho invertido do host:
 * expõe o DashboardStack (exposes) e consome os singletons do host (eager: false).
 */

export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  output: {
    uniqueName: 'mygym-dashboard',
  },
  resolve: {
    ...Repack.getResolveOptions({ enablePackageExports: true }),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new Repack.plugins.ModuleFederationPluginV2({
      name: 'dashboard',
      filename: 'dashboard.container.js.bundle',
      dts: false,
      // Expõe o Stack SEM NavigationContainer — o container fica só no host.
      exposes: { './DashboardStack': './src/navigation/DashboardStack' },
      // Consome os singletons do host; não embute cópia própria (eager: false).
      shared: sharedDeps({ eager: false }),
    }),
  ],
});
