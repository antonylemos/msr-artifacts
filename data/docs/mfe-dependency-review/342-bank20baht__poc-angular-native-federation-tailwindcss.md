---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| host/package.json:23 | dependencies | @angular-architects/native-federation | 20.1.6 | native-federation | Yes | host/angular.json:16-29 (target `build` invoca o builder `@angular-architects/native-federation:build`, que delega a `host:esbuild`); host/angular.json:57-60 (target `esbuild` com entrada `src/main.ts`); host/federation.config.js:1-3 (`require('@angular-architects/native-federation/config')` e `withNativeFederation`); host/src/main.ts:1-7 (importa e invoca `initFederation` com o remote antes de `import('./bootstrap')`); host/src/app/app.routes.ts:1-28 (importa e invoca `loadRemoteModule` nas rotas `''` e `flights`); host/src/app/app.config.ts:4-10 (registra as rotas com `provideRouter(routes)`) |
| host/package.json:31 | dependencies | @softarc/native-federation-node | ^2.0.10 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal `@softarc`, excluindo lockfiles); apenas declaração em host/package.json:31; host/src/main.ts:1 e host/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |
| remote/package.json:23 | dependencies | @angular-architects/native-federation | 20.1.6 | native-federation | Yes | remote/angular.json:16-31 (target `build` invoca o builder `@angular-architects/native-federation:build`, que delega a `remote:esbuild`); remote/angular.json:58-61 (target `esbuild` com entrada `src/main.ts`); remote/federation.config.js:1-10 (`withNativeFederation` com `name: 'remote'` e `exposes` `./Component` e `./routes`); remote/src/main.ts:1-6 (importa e invoca `initFederation` antes de `import('./bootstrap')`) |
| remote/package.json:31 | dependencies | @softarc/native-federation-node | ^2.0.10 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal `@softarc`, excluindo lockfiles); apenas declaração em remote/package.json:31; remote/src/main.ts:1 e remote/federation.config.js:1 (usam outro pacote, `@angular-architects/native-federation`) |

## Notas

- As listas de matches das linhas de `@softarc/native-federation-node` são as mesmas das linhas de `@angular-architects/native-federation` do mesmo pacote; todos os imports e builders citados nelas usam `@angular-architects/native-federation`. Isso não demonstra uso direto de `@softarc/native-federation-node`.
- `host/` e `remote/` são pacotes independentes, cada um com seu `package.json`; a evidência de cada linha foi tomada no próprio pacote.
