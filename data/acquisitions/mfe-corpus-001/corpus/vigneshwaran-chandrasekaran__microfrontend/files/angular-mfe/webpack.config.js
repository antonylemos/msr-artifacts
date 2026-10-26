/**
 * Angular MFE — Webpack Partial Config
 *
 * This is NOT a full webpack config — Angular CLI provides its own webpack config.
 * @angular-builders/custom-webpack MERGES this partial config on top of Angular's.
 *
 * withModuleFederationPlugin() is a helper from @angular-architects/module-federation
 * that correctly sets up Module Federation for Angular apps (handles shared Angular
 * packages, optimisation settings, etc.).
 */
const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const allShared = shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' });
// zone.js must run as a synchronous side-effect polyfill (imported first in mount.ts).
// If left in the shared scope, webpack may load it lazily via federation, causing a
// race condition where Angular's NgZone constructor fires before zone.js has executed
// (NG0908: In this configuration Angular requires Zone.js).
delete allShared['zone.js'];

const config = withModuleFederationPlugin({
  name: 'angularMfe',
  filename: 'remoteEntry.js',
  exposes: {
    './mount': './src/mount.ts',
  },
  shared: allShared,
});

// In production (ng build --configuration production), Angular CLI sets NODE_ENV=production.
// publicPath must be '/angular-mfe/' because all chunks are served under that subpath on Vercel.
// In dev (ng serve), Angular dev-server serves from '/', so 'auto' resolves correctly to http://localhost:4200/.
const isProd = process.env.NODE_ENV === 'production';
config.output = { ...config.output, publicPath: isProd ? '/angular-mfe/' : 'auto' };

module.exports = config;
