---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/mfe-vue2-admin/package.json:13 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue2-admin/src/bootstrap.js:3 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), usados em `:27-30`; apps/mfe-vue2-admin/webpack.config.js:67 (`exposes: { './App': './src/bootstrap.js' }`) e apps/mfe-vue2-admin/webpack.config.js:4 e `:27` (`sharedAliases` resolve o pacote, scripts/webpack.aliases.js:13-17) |
| apps/mfe-vue2-checkout/package.json:13 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue2-checkout/src/bootstrap.js:3 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), usados em `:35-38`; apps/mfe-vue2-checkout/webpack.config.js:69 (`exposes: { './App': './src/bootstrap.js' }`) e apps/mfe-vue2-checkout/webpack.config.js:4 e `:29` (`sharedAliases`, scripts/webpack.aliases.js:13-17) |
| apps/mfe-vue3-dashboard/package.json:14 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue3-dashboard/src/bootstrap.js:8 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), usados em `:29-30`; apps/mfe-vue3-dashboard/webpack.config.js:56 (`exposes: { './App': './src/bootstrap.js' }`) e apps/mfe-vue3-dashboard/webpack.config.js:4 e `:23` (`alias: { ...sharedAliases }`) |
| apps/mfe-vue3-profile/package.json:14 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue3-profile/src/bootstrap.js:8 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), usados em `:33-36`; apps/mfe-vue3-profile/webpack.config.js:56 (`exposes: { './App': './src/bootstrap.js' }`) e apps/mfe-vue3-profile/webpack.config.js:4 e `:23` (`alias: { ...sharedAliases }`) |
| apps/shell/package.json:13 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/shell/pages/app/[...mfe].vue:30 (`import { MFE_REGISTRY } from '@mfe/shared'`), usado em `:40-41` para resolver a rota (página Nuxt, ponto de entrada por rota); apps/shell/stores/auth.ts:3 (`import { broadcastLogin, broadcastLogout } from '@mfe/shared/auth'`), store usada pela mesma página em `:31` e `:35`; apps/shell/composables/useMfeLoader.ts:1 (import de tipos) |
| package.json:34 | devDependencies | turbo | ^2.0.0 | monorepo-tool | Undetermined | turbo.json:3-18 (tasks `dev`, `build`, `lint`, `clean` configuradas); a única invocação de `turbo` está nos scripts de package.json:13, `:19-20`, `:22-23`, que não contam como uso; sem workflow de CI ou script de automação que chame `turbo` (grep, excluindo lockfile; scripts/start-local.sh:18-22 usa `pnpm --filter`) |

## Notas

- `@mfe/shared` é o pacote interno do workspace (packages/shared/package.json:2), que a regex `\bmfe` da tecnologia `mfe-term` captura pelo nome. Os itens das listas da inspeção (apps/shell/composables/useMfeLoader.ts:13 e `:79`) são `loadRemoteModule`, o carregador de remotes do shell, e não usos do pacote; as evidências acima vieram da busca fora das listas.
- Nos remotes, o `bootstrap.js` também é carregado pela entrada de desenvolvimento (por exemplo, apps/mfe-vue2-admin/src/index.js:1 e apps/mfe-vue2-admin/webpack.config.js:9).
- `turbo`: o `same_package_matches` aponta para pnpm-workspace.yaml:1, que é a lista de pacotes do pnpm, sem relação com o Turborepo. O README cita Turborepo (README.md:5), o que é documentação. Diferente do precedente com `turbo` em 025, aqui não há invocação fora dos scripts do package.json; por isso `Undetermined`.
