/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // React 17+ não precisa de import React em cada arquivo
    'react/react-in-jsx-scope': 'off',
    // Variáveis prefixadas com _ são intencionalmente não usadas
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Permite any explícito — útil em mocks e dados de PoC
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    es2021: true,
    node: true,
  },
}
