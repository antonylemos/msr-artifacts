---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:14 | devDependencies | @nrwl/eslint-plugin-nx | ^19.8.4 | monorepo-tool | No | sem import, plugin ou invocação de `@nrwl/eslint-plugin-nx` nos arquivos de código, configuração e workflows do snapshot (grep por `nrwl`, excluindo lockfile); apenas declaração em package.json:14 (`.vscode/extensions.json:3` cita a extensão `nrwl.angular-console`, não o pacote) |
| package.json:15 | devDependencies | @nx/eslint | 22.5.3 | monorepo-tool | Yes | nx.json:18-22 (plugin `@nx/eslint`); apps/app/project.json:56-61 e apps/microfrontend/project.json:32-37 (target `lint` com executor `@nx/eslint:lint`, também nos `project.json` das libs); .github/workflows/ci.yml:33 (`pnpm nx run-many -t lint test build`) |
| package.json:16 | devDependencies | @nx/eslint-plugin | 22.5.3 | monorepo-tool | Yes | eslint.config.mjs:1-6 (`import nx from '@nx/eslint-plugin'` e `nx.configs['flat/base']`, `flat/typescript`, `flat/javascript`); eslint.config.mjs:13 (regra `@nx/enforce-module-boundaries`); config raiz usada pelo target `lint` (apps/app/project.json:56-61, sem config própria em `apps/app/`) executado em .github/workflows/ci.yml:33 |
| package.json:17 | devDependencies | @nx/js | 22.5.3 | monorepo-tool | Yes | nx.json:18-19 (plugin `@nx/js`, carregado em toda execução do nx, como em .github/workflows/ci.yml:33); libs/portal/project.json:32-41 (target `build:types` com executor `@nx/js:tsc`) |
| package.json:18 | devDependencies | @nx/rollup | 22.5.3 | monorepo-tool | Yes | nx.json:18-20 (plugin `@nx/rollup`); libs/portal/project.json:8-31 e libs/core/project.json:8-9 (target `build` com executor `@nx/rollup:rollup`, também em `libs/communication` e `libs/i18n`); .github/workflows/ci.yml:33 (`build`); release.sh:5 (`npx nx build $LIB`) |
| package.json:19 | devDependencies | @nx/vite | 22.5.3 | monorepo-tool | Yes | apps/app/vitest.config.ts:2 e apps/app/vitest.config.ts:7-8 (`nxViteTsPaths` importado de `@nx/vite/plugins/nx-tsconfig-paths.plugin` e usado em `plugins`); apps/app/project.json:62-67 (target `test` com `configFile: apps/app/vitest.config.ts`); .github/workflows/ci.yml:33 (`test`) |
| package.json:20 | devDependencies | @nx/vitest | 22.5.3 | monorepo-tool | Yes | apps/app/project.json:62-67 e apps/microfrontend/project.json:38-44 (target `test` com executor `@nx/vitest:test`, também nos `project.json` das libs); .github/workflows/ci.yml:33 (`test`) |
| package.json:21 | devDependencies | @nx/webpack | 22.5.3 | monorepo-tool | Yes | apps/app/project.json:14-21 (target `build` com executor `@nx/webpack:webpack` e `webpackConfig: apps/app/webpack.config.js`); apps/app/project.json:39-44 (`@nx/webpack:dev-server`); apps/microfrontend/project.json:14-30 (idem); .github/workflows/docs.yml:34-35 (`pnpm nx build app --configuration=production`); .github/workflows/ci.yml:33 |
| package.json:44 | devDependencies | nx | 22.5.3 | monorepo-tool | Yes | .github/workflows/ci.yml:31-33 (job ativo executa `pnpm nx run-many -t lint test build`); .github/workflows/docs.yml:34-35 (`pnpm nx build app`); nx.json:18-44 (plugins, `release` e `targetDefaults` configurados) |

## Notas

- `same_package_matches` traz as mesmas duas ocorrências para os nove pacotes (`.github/workflows/ci.yml:33` e `pnpm-workspace.yaml:1`), que só mostram o uso de `nx` e do workspace pnpm. A evidência dos plugins `@nx/*` (executores em `project.json`, plugins em `nx.json`, imports em `eslint.config.mjs` e `vitest.config.ts`) apareceu fora das listas da inspeção.
- Os scripts `build`, `lint` e `test` de package.json:8-10 invocam `nx`, mas script não conta como uso; as respostas se apoiam nos workflows e nos `project.json`.
- `ui/` tem `package.json` e scripts `nx build ui` (ui/package.json:35-37), mas o projeto está desativado (`ui/project.json.txt`, sem `project.json`); não foi usado como evidência.
