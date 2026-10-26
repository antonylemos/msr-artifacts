import { fileURLToPath } from 'node:url'
import { createMicrofrontendEslintConfig } from './packages/config/eslint-config/dist/index.js'

const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url))

const baseConfig = createMicrofrontendEslintConfig({
  ignores: ['**/dist', '**/coverage'],
  tsconfigRootDir,
})

export default [
  ...baseConfig,
  {
    files: ['apps/header/**/*.{ts,tsx}'],
    rules: {
      semi: ['error', 'never'],
    },
  },
]
