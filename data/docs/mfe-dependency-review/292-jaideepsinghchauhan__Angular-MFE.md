---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:17 | dependencies | @nx/angular | 21.2.0 | monorepo-tool | Yes | appshell/host/project.json:9-27 (target `build` com executor `@nx/angular:webpack-browser`, `main: appshell/host/src/main.ts` e `customWebpackConfig`); appshell/host/project.json:61 (`@nx/angular:module-federation-dev-server`); appshell/mfe1/project.json:10 e `:61` (`@nx/angular:webpack-browser`, `@nx/angular:dev-server`), idem em appshell/mfe2/project.json:10 e `:61`; nx.json:49-59 (`targetDefaults` do executor) |
| package.json:27 | devDependencies | @module-federation/enhanced | ^0.9.0 | module-federation | Yes | appshell/host/webpack.config.ts:1-9 (`withModuleFederation` de `@nx/module-federation/angular` invocado com appshell/host/module-federation.config.ts:3-18, `remotes: ['mfe1', 'mfe2']`); appshell/mfe1/webpack.config.ts:1-9 com appshell/mfe1/module-federation.config.ts:3-10 (`exposes: { './Routes': ..., './GreetingComponent': ... }`), idem em appshell/mfe2/ (`exposes: { './Routes': ... }`); appshell/host/project.json:25-26 e `:44-45` (build e build de produção leem essas configs, também em appshell/mfe1/project.json e appshell/mfe2/project.json); package-lock.json:8765-8771 (`@nx/module-federation` depende de `@module-federation/enhanced`); sem import direto do pacote (grep, excluindo lockfile) |
| package.json:28 | devDependencies | @nx/cypress | 21.2.0 | monorepo-tool | Yes | nx.json:62-70 (plugin `@nx/cypress/plugin` registrado, com `targetName: e2e`); apps/angular-monorepo-e2e/cypress.config.ts:1 e `:6-14` (`nxE2EPreset` importado de `@nx/cypress/plugins/cypress-preset` e invocado); apps/angular-monorepo-e2e/project.json:8-9 (targets inferidos pelos plugins) |
| package.json:29 | devDependencies | @nx/devkit | 21.2.0 | monorepo-tool | Yes | appshell/host-e2e/playwright.config.ts:3 e `:30` (`import { workspaceRoot } from '@nx/devkit'`, usado em `webServer.cwd`), idem em appshell/mfe1-e2e/playwright.config.ts:3 e appshell/mfe2-e2e/playwright.config.ts:3; nx.json:77-82 (plugin `@nx/playwright/plugin` infere o target `e2e` a partir dessas configs; appshell/host-e2e/project.json:7-8 sem targets próprios) |
| package.json:30 | devDependencies | @nx/eslint | 21.2.0 | monorepo-tool | Yes | nx.json:71-76 (plugin `@nx/eslint/plugin`); appshell/host/project.json:82-84 (target `lint` com executor `@nx/eslint:lint`), idem em appshell/mfe1/project.json:84, appshell/mfe2/project.json:84, libs/shared/ui/project.json:17, libs/shared/data/project.json:17 e apps/angular-monorepo/project.json:73; nx.json:27-35 (`targetDefaults` de `@nx/eslint:lint`) |
| package.json:31 | devDependencies | @nx/eslint-plugin | 21.2.0 | monorepo-tool | Yes | eslint.config.mjs:1-6 (`import nx from '@nx/eslint-plugin'` e `nx.configs['flat/base']`, `flat/typescript`, `flat/javascript`); eslint.config.mjs:13 (regra `@nx/enforce-module-boundaries`); appshell/host/eslint.config.mjs:1-7 (importa o pacote e a config raiz, `flat/angular`), idem nos `eslint.config.mjs` de appshell/mfe1/, appshell/mfe2/, libs/shared/ui/, libs/shared/data/ e apps/angular-monorepo/; configs dos projetos com target `lint` (appshell/host/project.json:82-84) |
| package.json:32 | devDependencies | @nx/jest | 21.2.0 | monorepo-tool | Yes | appshell/host/project.json:85-91 (target `test` com executor `@nx/jest:jest` e `jestConfig: appshell/host/jest.config.ts`), idem em appshell/mfe1/project.json:87-90, appshell/mfe2/project.json:87-90, libs/shared/ui/project.json:9-15 e libs/shared/data/project.json:9-15; jest.preset.js:1-3 (`require('@nx/jest/preset')`), usado por appshell/host/jest.config.ts:3 (`preset: '../../jest.preset.js'`); jest.config.ts:2-5 (`getJestProjectsAsync`); nx.json:36-48 (`targetDefaults` de `@nx/jest:jest`) |
| package.json:33 | devDependencies | @nx/js | 21.2.0 | monorepo-tool | No | sem import, executor ou plugin `@nx/js` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); apenas declaração em package.json:33 |
| package.json:34 | devDependencies | @nx/module-federation | 21.2.0 | monorepo-tool | Yes | appshell/host/webpack.config.ts:1 e `:9` (`import { withModuleFederation } from '@nx/module-federation/angular'`, invocado no export); appshell/host/module-federation.config.ts:1-3 (tipo `ModuleFederationConfig`); idem em appshell/mfe1/ e appshell/mfe2/ (`webpack.config.ts:1-9`, `webpack.prod.config.ts:1-24`, `module-federation.config.ts:1-3`); appshell/host/project.json:25-26 e `:44-45` (build e build de produção referenciam esses arquivos, também em appshell/mfe1/project.json:25-26 e `:44-45` e appshell/mfe2/project.json:25-26 e `:44-45`) |
| package.json:35 | devDependencies | @nx/playwright | 21.2.0 | monorepo-tool | Yes | nx.json:77-82 (plugin `@nx/playwright/plugin` registrado, com `targetName: e2e`); appshell/host-e2e/playwright.config.ts:2 e `:18` (`nxE2EPreset` importado de `@nx/playwright/preset` e invocado), idem em appshell/mfe1-e2e/playwright.config.ts:2 e appshell/mfe2-e2e/playwright.config.ts:2 |
| package.json:36 | devDependencies | @nx/web | 21.2.0 | monorepo-tool | Yes | appshell/host/project.json:92-99 (target `serve-static` com executor `@nx/web:file-server` e `buildTarget: host:build`), idem em appshell/mfe1/project.json:95, appshell/mfe2/project.json:95 e apps/angular-monorepo/project.json:75-83 |
| package.json:37 | devDependencies | @nx/webpack | 21.2.0 | monorepo-tool | No | sem import, executor ou plugin `@nx/webpack` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); os builds usam `@nx/angular:webpack-browser` (appshell/host/project.json:10); apenas declaração em package.json:37 |
| package.json:38 | devDependencies | @nx/workspace | 21.2.0 | monorepo-tool | No | sem import, executor ou invocação de `@nx/workspace` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile; `.gitignore:42` e `.prettierignore:5` citam só o diretório `.nx/workspace-data`); apenas declaração em package.json:38 |
| package.json:56 | devDependencies | nx | 21.2.0 | monorepo-tool | Yes | appshell/host-e2e/playwright.config.ts:26-31 (`webServer.command: 'npx nx run host:serve'`), idem em appshell/mfe1-e2e/playwright.config.ts:27 e appshell/mfe2-e2e/playwright.config.ts:27; essas configs são lidas pelo target `e2e` inferido do plugin em nx.json:77-82; apps/angular-monorepo-e2e/cypress.config.ts:8-12 (`webServerCommands` com `npx nx run angular-monorepo:serve`); nx.json:21-98 (`targetDefaults`, `plugins` e `generators` configurados) |

## Notas

- As listas da inspeção só existem para `@module-federation/enhanced`, e nenhum item importa esse pacote: são as configs `module-federation.config.ts` e `webpack*.config.ts`, que usam `@nx/module-federation`. Julguei `Yes` como nos precedentes 039 e 109 (plugin MF invocado por meio de um wrapper, ligação mostrada pelo lockfile). Dois itens das listas são comentários: appshell/host/module-federation.config.ts:9 (exemplo de remote externo) e `webpack.prod.config.ts:17` nos três projetos (exemplo de override de produção).
- A evidência dos pacotes `@nx/*` e de `nx` (executores nos `project.json`, plugins em `nx.json`, imports em `eslint.config.mjs`, `jest.preset.js`, `playwright.config.ts` e `cypress.config.ts`) apareceu fora das listas da inspeção.
- `nx`: diferente de 109 (`Undetermined`, sem invocação), aqui as configs de e2e do host e dos remotes invocam `nx` no `webServer`, e essas configs são as mesmas que sustentam `@nx/devkit` e `@nx/playwright`. Não há CI nem script: package.json:5 tem `scripts` vazio. Os comandos `npx nx ...` do README.md:21-84 não contam como uso.
- O e2e com Cypress (`apps/angular-monorepo-e2e/`) serve à aplicação padrão do Nx, fora da composição; ele só sustenta `@nx/cypress`, que também tem o plugin registrado em nx.json.
- Os executores `@nx/*` foram julgados pela referência no `project.json`, que é a definição de build de cada aplicação (não há `angular.json`), como em 109.
