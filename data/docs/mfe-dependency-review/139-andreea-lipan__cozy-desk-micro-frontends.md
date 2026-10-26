---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| sticky-notes/package.json:26 | dependencies | @angular-architects/native-federation | ^21.0.4 | native-federation | Yes | sticky-notes/angular.json:16-39 (targets `build` e `serve` invocam o builder `@angular-architects/native-federation:build`); sticky-notes/angular.json:43-46 (target `esbuild` com entrada `browser: src/main.ts`); sticky-notes/federation.config.js:1-12 (importa e invoca `withNativeFederation`, `exposes: { './App': './src/app/app.ts' }`); sticky-notes/src/main.ts:1-6 (importa e invoca `initFederation()` antes do bootstrap) |
| sticky-notes/package.json:34 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal, excluindo lockfiles); apenas declaração em sticky-notes/package.json:34; sticky-notes/src/main.ts:1 e sticky-notes/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |
| tea-tracker/package.json:26 | dependencies | @angular-architects/native-federation | ^21.0.4 | native-federation | Yes | tea-tracker/angular.json:16-39 (targets `build` e `serve` invocam o builder `@angular-architects/native-federation:build`); tea-tracker/angular.json:43-46 (target `esbuild` com entrada `browser: src/main.ts`); tea-tracker/federation.config.js:1-12 (importa e invoca `withNativeFederation`, `exposes: { './App': './src/app/app.ts' }`); tea-tracker/src/main.ts:1-6 (importa e invoca `initFederation()` antes do bootstrap) |
| tea-tracker/package.json:34 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal, excluindo lockfiles); apenas declaração em tea-tracker/package.json:34; tea-tracker/src/main.ts:1 e tea-tracker/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |
| test-base/package.json:26 | dependencies | @angular-architects/native-federation | ^21.0.4 | native-federation | Yes | test-base/angular.json:16-39 (targets `build` e `serve` invocam o builder `@angular-architects/native-federation:build`); test-base/angular.json:43-46 (target `esbuild` com entrada `browser: src/main.ts`); test-base/src/main.ts:1-6 (importa e invoca `initFederation('federation.manifest.json')` antes do bootstrap); test-base/src/app/app.routes.ts:3-19 (importa e invoca `loadRemoteModule` nas rotas `tea-tracker` e `sticky-notes`); test-base/src/app/app.config.ts:4-9 (registra as rotas com `provideRouter`); test-base/federation.config.js:1-8 (importa e invoca `withNativeFederation`) |
| test-base/package.json:34 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal, excluindo lockfiles); apenas declaração em test-base/package.json:34; test-base/src/main.ts:1 e test-base/src/app/app.routes.ts:3 (usam outro pacote, `@angular-architects/native-federation`) |

## Notas

- Os três projetos (`test-base/`, `tea-tracker/`, `sticky-notes/`) têm `package.json` próprio, sem manifesto raiz; cada linha foi julgada pela evidência do próprio pacote. As listas `same_package_matches` de cada pacote coincidem com os arquivos do diretório dele.
- As listas de matches são idênticas para `@angular-architects/native-federation` e `@softarc/native-federation-node`, mas todos os imports, `require` e builders do snapshot usam `@angular-architects/native-federation`. A busca por `softarc` só encontra as declarações nos três `package.json`.
- `federation.config.js` não é referenciado explicitamente em `angular.json`; o `Yes` dos remotes se apoia no builder invocado pelo `angular.json` e no `initFederation()` do ponto de entrada `src/main.ts`.
