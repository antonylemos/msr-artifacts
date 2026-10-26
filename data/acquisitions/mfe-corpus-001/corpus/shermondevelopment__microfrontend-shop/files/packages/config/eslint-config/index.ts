import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

type CreateMicrofrontendEslintConfigOptions = {
  ignores?: string[]
  tsconfigRootDir?: string
}

export function createMicrofrontendEslintConfig(
  options: CreateMicrofrontendEslintConfigOptions = {},
) {
  const { ignores = ['dist', 'coverage'], tsconfigRootDir } = options;

  return defineConfig([
    globalIgnores(ignores),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
      ],
      rules: {
        semi: ['error', 'always'],
      },
      languageOptions: {
        globals: globals.browser,
        parserOptions: {
          tsconfigRootDir,
        },
      },
    },
  ]);
}

export default createMicrofrontendEslintConfig;