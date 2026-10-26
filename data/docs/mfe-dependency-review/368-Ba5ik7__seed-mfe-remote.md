---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:14 | dependencies | @angular-architects/module-federation | ^19.0.3 | module-federation | Yes | projects/seed-mfe-remote/webpack.config.js:1-15 (`withModuleFederationPlugin({ name: 'seedMfeRemote', exposes: { './RemoteWidget': ... }, shared: shareAll(...) })`, importado de `@angular-architects/module-federation/webpack`); projects/demo/webpack.config.js:1-13 (`withModuleFederationPlugin({ remotes: { "seedMfeRemote": "http://localhost:4202/remoteEntry.js" }, ... })`); angular.json:18 e angular.json:39 (builder `ngx-build-plus:browser` e `extraWebpackConfig` do remote), angular.json:82 (serve), angular.json:123, angular.json:144 e angular.json:187 (idem para `demo`); angular.json:57, :72, :162 e :177 (`webpack.prod.config.js`, que reusa a config em projects/demo/webpack.prod.config.js:1 e projects/seed-mfe-remote/webpack.prod.config.js:1); projects/demo/src/app/app.component.ts:1 e `:26-36` (`loadRemoteModule` e `createComponent` no componente raiz, inicializado em projects/demo/src/bootstrap.ts:5, entry `main` em angular.json:143); projects/demo/src/app/app.routes.ts:2 e `:5-13` (rota `remote` com `loadRemoteModule`, registrada por `provideRouter(routes)` em projects/demo/src/app/app.config.ts:7) |

## Notas

- Todas as ocorrências estão em `same_package_matches`; `other_package_matches` está vazio. `projects/demo/` e `projects/seed-mfe-remote/` não têm `package.json` próprio e pertencem ao pacote da raiz.
- A busca fora das listas (grep em `*.ts`, `*.js`, `*.json`, sem lockfile) não achou outro uso. `package.json:10` (script `run:all` com `mf-dev-server.js`) cita o pacote sem usá-lo.
