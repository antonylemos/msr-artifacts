---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:30 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | sem import ou invocação de `@softarc/native-federation-node` nos arquivos de código e build do snapshot (busca literal, excluindo package-lock.json); apenas declaração em package.json:30; projects/host-app/src/main.ts:1 e projects/host-app/src/app/app.routes.ts:2 importam outro pacote (`@angular-architects/native-federation`) |
| package.json:36 | devDependencies | @angular-architects/native-federation | ^20.1.7 | native-federation | Yes | angular.json:17-29, angular.json:130-142 e angular.json:243-255 (target `build` dos três projetos invoca o builder `@angular-architects/native-federation:build`); angular.json:62, angular.json:175 e angular.json:288 (entradas `browser` dos projetos); projects/customer-app/federation.config.js:1-10 e projects/orders-app/federation.config.js:1-10 (`withNativeFederation` com `exposes`); projects/host-app/src/main.ts:1-8 (importa e invoca `initFederation` antes do bootstrap); projects/host-app/src/app/app.routes.ts:2-19 (importa e invoca `loadRemoteModule`); projects/host-app/src/app/app.config.ts:4-10 (registra as rotas) |

## Notas

- As listas de matches são idênticas para os dois pacotes, mas os imports, o `require` dos `federation.config.js` e os builders usam `@angular-architects/native-federation`. Isso não demonstra uso direto de `@softarc/native-federation-node`.
- Os diretórios `projects/host-app/`, `projects/customer-app/` e `projects/orders-app/` não têm `package.json` próprio; pertencem ao pacote da raiz.
