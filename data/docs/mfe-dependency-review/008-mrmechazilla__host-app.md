---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 008 — mrmechazilla/host-app

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:14 | dependencies | @angular-architects/module-federation | ^19.0.0 | module-federation | Yes | webpack.config.js:1-3 (`withModuleFederationPlugin` importado do pacote); angular.json:18 (builder `ngx-build-plus:browser`); angular.json:42 e angular.json:88 (`extraWebpackConfig: webpack.config.js` em build e serve); angular.json:63 e angular.json:78 (`webpack.prod.config.js`, que reusa a config em webpack.prod.config.js:1); src/main.ts:2-4 (`loadManifest` do pacote; `main` em angular.json:41); src/app/app.routes.ts:1 e src/app/app.routes.ts:8-12 (`loadRemoteModule` do `users-mfe`, registrado por `provideRouter(routes)` em src/app/app.config.ts:13) |

## Notas

- Todas as 17 ocorrências estão em `same_package_matches`; `other_package_matches` está vazio. `src/` não tem `package.json` próprio e pertence ao pacote da raiz, apesar de ter `src/index.html`.
- `src/app/shared/utils/remote-loader.ts:1` e `:14` estão na lista, mas o arquivo inteiro está comentado (`/*` na linha 1, `*/` na linha 28); não foi usado como evidência.
- Citam o pacote sem usá-lo: `package.json:10` (script `run:all` com `mf-dev-server.js`) e `angular.json:45` (`allowedCommonJsDependencies`). A inspeção corretamente não conta o script como dependência.
