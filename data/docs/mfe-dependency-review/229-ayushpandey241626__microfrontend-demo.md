---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:31 | devDependencies | @angular-architects/module-federation | ^19.0.3 | module-federation | Yes | projects/host-app/webpack.config.js:2-5 (`shareAll`, `SharedMappings` importados de `@angular-architects/module-federation/webpack`), usado em projects/host-app/webpack.config.js:8-9 e :26-34; projects/mfe1/webpack.config.js:1-4 e :6-21, projects/mfe2/webpack.config.js:1-4 e :6-21, projects/login-mfe-app/webpack.config.js:1-4 e :6-21 (`withModuleFederationPlugin` com `exposes`); angular.json:14, :115, :216, :321 (builder `ngx-build-plus:browser`) e angular.json:35, :136, :237, :342 (`extraWebpackConfig` de cada projeto); projects/host-app/src/app/app.routes.ts:3 e :16-40 (`loadRemoteModule` nas rotas `contacts`, `admin`, `login`), registrado por `provideRouter(routes)` em projects/host-app/src/app/app.config.ts:12 |

## Notas

- Todas as ocorrências da inspeção estão em `same_package_matches`; `other_package_matches` está vazio. `projects/*` não têm `package.json` próprio e pertencem ao pacote da raiz.
- `package.json:10` (script `run:all` com `mf-dev-server.js`) cita o pacote sem usá-lo; não foi contado como evidência.
- O host usa `ModuleFederationPlugin` direto do webpack (projects/host-app/webpack.config.js:6), com só `shareAll`/`SharedMappings` vindos do pacote; os remotos usam `withModuleFederationPlugin` do pacote.
- Os `webpack.prod.config.js` só reexportam o `webpack.config.js` do projeto (por exemplo, projects/mfe1/webpack.prod.config.js:1).
