/**
 * webpack.aliases.js
 * Shared path aliases for all MFE remote webpack configs.
 */
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SHARED_PKG = path.join(ROOT, 'packages/shared/src')

// Resolve vuetify from the monorepo root node_modules (pnpm hoisted location)
const VUETIFY2_DIST = path.join(ROOT, 'node_modules/vuetify/dist/vuetify.js')

const sharedAliases = {
  '@mfe/shared': SHARED_PKG,
  '@mfe/shared/auth': path.join(SHARED_PKG, 'auth/index.ts'),
  '@mfe/shared/types': path.join(SHARED_PKG, 'types/index.ts'),
}

module.exports = { sharedAliases, SHARED_PKG, ROOT, VUETIFY2_DIST }
