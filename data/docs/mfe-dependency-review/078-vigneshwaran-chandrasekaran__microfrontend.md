---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| angular-mfe/package.json:21 | devDependencies | @angular-architects/module-federation | ^16.0.4 | module-federation | Yes | angular-mfe/webpack.config.js:11-14 (`shareAll` e `withModuleFederationPlugin` importados de `@angular-architects/module-federation/webpack`); angular-mfe/webpack.config.js:23-30 (`withModuleFederationPlugin` com `name: 'angularMfe'`, `remoteEntry.js` e `exposes './mount'`); angular-mfe/angular.json:13-17 (builder `@angular-builders/custom-webpack:browser` com `customWebpackConfig.path: ./webpack.config.js`); angular-mfe/angular.json:51-52 (serve com `@angular-builders/custom-webpack:dev-server`) |

## Notas

- `other_package_matches` aponta para `host/`, `react-mfe-1/`, `react-mfe-2/` e `vue-mfe/`, que usam o `ModuleFederationPlugin` do próprio webpack (`require('webpack/lib/container/ModuleFederationPlugin')`, por exemplo `host/webpack.config.js:3`), não este pacote; não foram usados como evidência.
- Citam o pacote sem usá-lo: `angular-mfe/webpack.config.js:7` (comentário) e `host/webpack.config.js:26` (comentário sobre o formato de saída do remote Angular).
