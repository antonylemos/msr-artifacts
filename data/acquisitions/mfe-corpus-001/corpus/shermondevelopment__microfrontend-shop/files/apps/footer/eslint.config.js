import { fileURLToPath } from 'node:url'
import { createMicrofrontendEslintConfig } from '../../packages/config/eslint-config/dist/index.js'

const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url))

export default createMicrofrontendEslintConfig({
  ignores: ['dist'],
  tsconfigRootDir,
})