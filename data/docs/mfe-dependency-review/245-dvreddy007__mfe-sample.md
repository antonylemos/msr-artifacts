---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:12 | devDependencies | lerna | ^8.1.9 | monorepo-tool | Undetermined | lerna.json:1-4 (só `$schema` e `version: "0.0.0"`); a única invocação de `lerna` está no script de package.json:8 (`dev`: `lerna run dev`), que não conta como uso; package.json:4-6 (`workspaces`, casado pela inspeção) é recurso do npm, não do lerna; .github/workflows/main_vdumpavue3.yml:26-30 roda `npm install` e `npm run build --if-present` na raiz, sem chamar `lerna` (grep, excluindo lockfile) |
| packages/app-1/package.json:16 | devDependencies | @module-federation/vite | ^1.2.2 | module-federation | Yes | packages/app-1/vite.config.js:3 e 9-16 (`federation({ name: 'app1', filename: 'remoteEntry.js', exposes: { './entry': './src/entry.js' }, shared: ['vue'] })` em `plugins`); packages/app-1/package.json:7-8 (`vite` e `vite build` usam a configuração padrão) |
| packages/app-2/package.json:16 | devDependencies | @module-federation/vite | ^1.2.2 | module-federation | Yes | packages/app-2/vite.config.js:3 e 9-16 (`federation({ name: 'app2', filename: 'remoteEntry.js', exposes: { './entry': './src/entry.js' }, shared: ['vue'] })` em `plugins`); packages/app-2/package.json:7-8 (`vite` e `vite build` usam a configuração padrão) |
| packages/host/package.json:18 | devDependencies | @module-federation/runtime | ^0.8.9 | module-federation | Yes | packages/host/src/plugins/federationPlugin.js:1 (`import { init, loadRemote as _loadRemote } from '@module-federation/runtime'`); packages/host/src/plugins/federationPlugin.js:15-18 e 29 (`init({ name: 'host', remotes: mfRemotes })` e `_loadRemote(`${module}/entry`)`); packages/host/src/main.js:5 e 15 (`app.use(federationPlugin, getRemotes())`); packages/host/src/components/Loader.vue:8 e 70 (`moduleFederation.loadRemote(mfeConfig.module)`), componente de todas as rotas (packages/host/src/router/index.js:11); packages/host/index.html:11 (entrada `/src/main.js`) |
| packages/host/package.json:19 | devDependencies | @module-federation/vite | ^1.2.2 | module-federation | Yes | packages/host/vite.config.js:3 e 10-14 (`federation({ name: 'host', filename: 'remoteEntry.js', shared: ['vue'] })` em `plugins`, sem `remotes` estáticos); packages/host/package.json:7-8 (`vite` e `vite build` usam a configuração padrão) |

## Notas

- `lerna`: segue 096 e 128 (configuração presente, invocação só em script). O `lerna.json` daqui é mínimo; o casamento da inspeção em `package.json:4` é o bloco `workspaces` do npm.
- `@module-federation/runtime`: as ocorrências de `Loader.vue:70` e `:96` em `same_package_matches` são chamadas a funções locais chamadas `loadRemote` (o wrapper `useModuleFederation` e a função do próprio componente), não ao pacote direto; o uso do pacote está em `federationPlugin.js`, que esses trechos chamam.
- O host usa o plugin de Vite só com `shared`; os remotes são registrados em runtime por `init`, a partir de `packages/host/src/routeManifest.js:1-35`.
