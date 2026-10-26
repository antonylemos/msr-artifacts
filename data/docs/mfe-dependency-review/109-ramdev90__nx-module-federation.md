---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:15 | dependencies | @nx/angular | 22.5.4 | monorepo-tool | Yes | shell/project.json:9-26 (target `build` com executor `@nx/angular:webpack-browser`, `main: shell/src/main.ts` e `customWebpackConfig`); shell/project.json:60 (`@nx/angular:module-federation-dev-server`); products/project.json:10 e `:60` (`@nx/angular:webpack-browser`, `@nx/angular:dev-server`), idem em orders/project.json:10 e `:60` e customer/project.json:10 e `:60`; nx.json:28-37 (`targetDefaults` do executor) |
| package.json:25 | devDependencies | @module-federation/enhanced | ^0.21.2 | module-federation | Yes | shell/webpack.config.ts:1-9 (`withModuleFederation` de `@nx/module-federation/angular` invocado com shell/module-federation.config.ts:3-18, `remotes: ['products', 'orders', 'customer']`); products/webpack.config.ts:1-9 com products/module-federation.config.ts:3-8 (`exposes: { './Routes': ... }`), idem em orders/ e customer/; shell/project.json:24-25 e products/project.json:24-25 (build lê essas configs, também orders/ e customer/); package-lock.json:7612-7618 (`@nx/module-federation` depende de `@module-federation/enhanced`); sem import direto do pacote (grep, excluindo lockfile) |
| package.json:26 | devDependencies | @nx/eslint | 22.5.4 | monorepo-tool | Yes | shell/project.json:81-83 (target `lint` com executor `@nx/eslint:lint`), idem em products/project.json:83, orders/project.json:83, customer/project.json:83 e apps/microfrontend-workspace/project.json:72; nx.json:19-27 (`targetDefaults` de `@nx/eslint:lint`) |
| package.json:27 | devDependencies | @nx/eslint-plugin | 22.5.4 | monorepo-tool | Yes | eslint.config.mjs:1-6 (`import nx from '@nx/eslint-plugin'` e `nx.configs['flat/base']`, `flat/typescript`, `flat/javascript`); eslint.config.mjs:13 (regra `@nx/enforce-module-boundaries`); shell/eslint.config.mjs:1-7 (importa o pacote e a config raiz, `flat/angular`), idem nos `eslint.config.mjs` de products/, orders/, customer/ e apps/microfrontend-workspace/; configs dos projetos com target `lint` (shell/project.json:81-83) |
| package.json:28 | devDependencies | @nx/js | 22.5.4 | monorepo-tool | No | sem import, executor ou plugin `@nx/js` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); apenas declaração em package.json:28 |
| package.json:29 | devDependencies | @nx/module-federation | 22.5.4 | monorepo-tool | Yes | shell/webpack.config.ts:1 e `:9` (`import { withModuleFederation } from '@nx/module-federation/angular'`, invocado no export); shell/module-federation.config.ts:1-3 (tipo `ModuleFederationConfig`); idem em products/, orders/ e customer/ (`webpack.config.ts:1-9`, `webpack.prod.config.ts:1-24`); shell/project.json:24-25 e `:43-44` (build e build de produção referenciam esses arquivos, também nos outros três `project.json`) |
| package.json:30 | devDependencies | @nx/web | 22.5.4 | monorepo-tool | Yes | shell/project.json:84-91 (target `serve-static` com executor `@nx/web:file-server` e `buildTarget: shell:build`), idem em products/project.json:85-93, orders/project.json:87, customer/project.json:87 e apps/microfrontend-workspace/project.json:76 |
| package.json:31 | devDependencies | @nx/webpack | 22.5.4 | monorepo-tool | No | sem import, executor ou plugin `@nx/webpack` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); os builds usam `@nx/angular:webpack-browser`; apenas declaração em package.json:31 |
| package.json:32 | devDependencies | @nx/workspace | 22.5.4 | monorepo-tool | No | sem import, executor ou invocação de `@nx/workspace` nos arquivos de código e configuração do snapshot (grep, excluindo lockfile); apenas declaração em package.json:32 |
| package.json:41 | devDependencies | nx | 22.5.4 | monorepo-tool | Undetermined | nx.json:13-50 (`targetDefaults` e `generators` configurados); `project.json` de cada aplicação com `$schema` do nx (shell/project.json:3); nenhuma invocação de `nx`: package.json:5 tem `scripts` vazio, não há workflow de CI nem script de automação no snapshot (grep, excluindo lockfile); as menções `nx build`, `nx graph` etc. estão no template de boas-vindas (shell/src/app/nx-welcome.ts:860-905), não são invocação |

## Notas

- As duas listas da inspeção só existem para `@module-federation/enhanced`, e nenhum item importa esse pacote: são as configs `module-federation.config.ts` e `webpack*.config.ts`, que usam `@nx/module-federation`. Julguei `Yes` como no precedente 039 (plugin MF invocado por meio de um wrapper): o wrapper invocado depende do pacote declarado, e o lockfile só mostra essa ligação. Dois itens das listas são comentários: shell/module-federation.config.ts:9 (exemplo de remote externo) e `webpack.prod.config.ts:17` nos quatro projetos (exemplo de override de produção).
- A evidência dos pacotes `@nx/*` (executores nos `project.json`, imports em `eslint.config.mjs`) apareceu fora das listas da inspeção.
- `nx`: diferente de 006 e 039, não há CI nem script que invoque `nx`; por isso `Undetermined`, como `turbo` em 096. Os executores `@nx/*` foram julgados pela referência no `project.json`, que é a definição de build de cada aplicação (não há `angular.json`), no mesmo papel do `angular.json` do exemplo da `INSTRUCTIONS.md`; a classificação também apoia a cadeia de build nesses arquivos.
- O `README.md` do commit foi removido do snapshot pela normalização (`preset:binaries`, normalization.json da aquisição), e não foi usado.
