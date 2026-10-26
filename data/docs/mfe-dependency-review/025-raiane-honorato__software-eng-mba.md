---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/repack-poc/host/package.json:13 | dependencies | @module-federation/enhanced | ^2.6.0 | module-federation | Yes | apps/repack-poc/host/rspack.config.mjs:39-51 (plugins invoca `new Repack.plugins.ModuleFederationPluginV2({ name: 'host', remotes: { remote: ... }, shared })`); apps/repack-poc/host/react-native.config.js:1-3 (`commands: require('@callstack/repack/commands/rspack')`, que faz o `react-native start` usar o rspack.config); apps/repack-poc/host/App.tsx:26 (`React.lazy(() => import('remote/HelloScreen'))`) |
| apps/repack-poc/remote/package.json:13 | dependencies | @module-federation/enhanced | ^2.6.0 | module-federation | Yes | apps/repack-poc/remote/rspack.config.mjs:35-46 (plugins invoca `new Repack.plugins.ModuleFederationPluginV2({ name: 'remote', exposes: { './HelloScreen': ... } })`); apps/repack-poc/remote/react-native.config.js:1-3 (comandos rspack do Re.Pack) |
| apps/repack/packages/check-in/package.json:13 | dependencies | @module-federation/enhanced | ^2.6.0 | module-federation | Yes | apps/repack/packages/check-in/rspack.config.mjs:37-49 (plugins invoca `new Repack.plugins.ModuleFederationPluginV2({ name: 'checkin', exposes: { './CheckInStack': ... }, shared: sharedDeps({ eager: false }) })`); apps/repack/packages/check-in/react-native.config.js:1-3 (comandos rspack do Re.Pack); apps/repack/packages/host/src/screens/CheckInTab.tsx:11-13 (host consome `import('checkin/CheckInStack')`) |
| apps/repack/packages/dashboard/package.json:13 | dependencies | @module-federation/enhanced | ^2.6.0 | module-federation | Yes | apps/repack/packages/dashboard/rspack.config.mjs:37-47 (plugins invoca `new Repack.plugins.ModuleFederationPluginV2({ name: 'dashboard', exposes: { './DashboardStack': ... } })`); apps/repack/packages/dashboard/react-native.config.js:1-3 (comandos rspack do Re.Pack); apps/repack/packages/host/src/screens/DashboardTab.tsx:9 (host consome `import('dashboard/DashboardStack')`) |
| apps/repack/packages/host/package.json:13 | dependencies | @module-federation/enhanced | ^2.6.0 | module-federation | Yes | apps/repack/packages/host/rspack.config.mjs:43-55 (plugins invoca `new Repack.plugins.ModuleFederationPluginV2({ name: 'host', remotes: { checkin: ..., dashboard: ... } })`); apps/repack/packages/host/react-native.config.js:2 (comandos rspack do Re.Pack); apps/repack/packages/host/src/screens/CheckInTab.tsx:11-13 (`import('checkin/CheckInStack')`); apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53 (abas montam `DashboardTab` e `CheckInTab`) |
| apps/turborepo/package.json:12 | devDependencies | turbo | ^2.9.5 | monorepo-tool | Yes | apps/turborepo/turbo.json:4-28 (tasks `build`, `typecheck`, `lint`, `dev`, `test` configuradas); scripts/measure.sh:102-104 (`pnpm turbo run typecheck/lint/test --force` no diretório `apps/turborepo`, automação de medição citada em README.md:70) |

## Notas

- Nenhum arquivo do snapshot importa `@module-federation/enhanced` diretamente (grep em `*.js`, `*.ts`, `*.tsx`, `*.mjs`, `*.cjs`, `*.json`, fora de lockfiles: só as cinco declarações). O plugin configurado é `Repack.plugins.ModuleFederationPluginV2`, do `@callstack/repack`, que tem `@module-federation/enhanced` como peer dependency (`apps/repack/pnpm-lock.yaml:1262-1270`; resolução `@callstack/repack@5.2.5(...)(@module-federation/enhanced@2.6.0...)` em `apps/repack/pnpm-lock.yaml:7228` e em `apps/repack-poc/{host,remote}/pnpm-lock.yaml:5485`). Julguei `Yes` porque o pacote declarado é o que o plugin MF invocado usa; o lockfile serve só para mostrar essa ligação, não como uso. Caso que pode virar regra: plugin MF invocado por meio de um wrapper (Re.Pack, como executores do Nx).
- `apps/repack/packages/host` e `check-in`/`dashboard` compartilham a lista `shared` por `apps/repack/packages/shared-deps/sharedDeps.mjs`, importado em cada `rspack.config.mjs:4`.
- `turbo`: os scripts de `apps/turborepo/package.json:4-9` também chamam `turbo run`, mas não contam como uso; a evidência é o `turbo.json` mais a invocação em `scripts/measure.sh`.
- `other_package_matches` de `turbo` aponta para `apps/repack/pnpm-workspace.yaml:1`, que é a lista de pacotes do pnpm, sem relação com o Turborepo.
