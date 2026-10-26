---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| athletes/package.json:14 | dependencies | @angular-architects/native-federation | ^21.2.3 | native-federation | Yes | athletes/angular.json:16-29 (target `build` invoca o builder `@angular-architects/native-federation:build`, que delega a `athletes:esbuild`); athletes/angular.json:43-46 (target `esbuild` com `browser: src/main.ts`); athletes/federation.config.js:1-9 (`require('@angular-architects/native-federation/config')`, `withNativeFederation` com `name: 'athletes'` e `exposes` `./Component` e `./Routes`); athletes/src/main.ts:1-5 (importa e invoca `initFederation` antes de `import('./bootstrap')`) |
| athletes/package.json:22 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal `@softarc`, excluindo lockfiles); apenas declaração em athletes/package.json:22; athletes/src/main.ts:1 e athletes/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |
| ranking/package.json:14 | dependencies | @angular-architects/native-federation | ^21.2.3 | native-federation | Yes | ranking/angular.json:16-29 (target `build` invoca o builder `@angular-architects/native-federation:build`, que delega a `ranking:esbuild`); ranking/angular.json:43-46 (target `esbuild` com `browser: src/main.ts`); ranking/federation.config.js:1-8 (`require('@angular-architects/native-federation/config')`, `withNativeFederation` com `name: 'ranking'` e `exposes` `./Component`); ranking/src/main.ts:1-5 (importa e invoca `initFederation` antes de `import('./bootstrap')`) |
| ranking/package.json:22 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal `@softarc`, excluindo lockfiles); apenas declaração em ranking/package.json:22; ranking/src/main.ts:1 e ranking/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |
| shell/package.json:14 | dependencies | @angular-architects/native-federation | ^21.2.3 | native-federation | Yes | shell/angular.json:16-29 (target `build` invoca o builder `@angular-architects/native-federation:build`, que delega a `shell:esbuild`); shell/angular.json:43-46 (target `esbuild` com `browser: src/main.ts`); shell/federation.config.js:1-8 (`withNativeFederation` com `name: 'shell'` e `shareAll`); shell/src/main.ts:1-5 (importa e invoca `initFederation('federation.manifest.json')` antes de `import('./bootstrap')`); shell/src/app/app.routes.ts:1-19 (importa e invoca `loadRemoteModule` nas rotas `athletes` e `ranking`); shell/src/app/app.config.ts:9 (registra as rotas com `provideRouter(routes)`); shell/src/app/dashboard/dashboard.ts:10, 56-57 (importa e invoca `loadRemoteModule` para os dois `./Component`, componente da rota `dashboard` em shell/src/app/app.routes.ts:6-9) |
| shell/package.json:22 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal `@softarc`, excluindo lockfiles); apenas declaração em shell/package.json:22; shell/src/main.ts:1, shell/src/app/app.routes.ts:1 e shell/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |

## Notas

- As listas de matches das linhas de `@softarc/native-federation-node` são as mesmas das linhas de `@angular-architects/native-federation` do mesmo pacote; todos os imports e builders citados nelas usam `@angular-architects/native-federation`. Isso não demonstra uso direto de `@softarc/native-federation-node`.
- `athletes/`, `ranking/` e `shell/` são pacotes independentes, cada um com seu `package.json`; a evidência de cada linha foi tomada no próprio pacote.
