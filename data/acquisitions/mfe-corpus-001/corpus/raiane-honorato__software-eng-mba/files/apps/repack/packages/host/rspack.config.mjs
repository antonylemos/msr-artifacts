import * as Repack from '@callstack/repack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sharedDeps } from '../shared-deps/sharedDeps.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default Repack.defineRspackConfig((env) => {
  const { mode, platform } = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    output: {
      uniqueName: 'mygym-host',
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
        name: 'host',
        dts: false,
        // O host consome os dois mini-apps pela rede (manifest MF2), em runtime.
        remotes: {
          checkin: `checkin@http://localhost:9001/${platform}/mf-manifest.json`,
          dashboard: `dashboard@http://localhost:9002/${platform}/mf-manifest.json`,
        },
        // Host é o fornecedor eager dos singletons (react, navigation, store, ...).
        shared: sharedDeps({ eager: true }),
      }),
    ],
  };
});
