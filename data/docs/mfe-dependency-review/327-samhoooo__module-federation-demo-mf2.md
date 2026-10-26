---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| header-app/package.json:15 | devDependencies | @module-federation/enhanced | ^2.8.2 | module-federation | Yes | header-app/rspack.config.js:3 (`const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack")`); header-app/rspack.config.js:57-75 (`new ModuleFederationPlugin({ name: "HeaderApp", filename: "remoteEntry.js", exposes: { "./Header": "./src/App" }, dts: true, shared … })`); header-app/package.json:10-11 (`rspack serve`, `rspack build`, que carregam o `rspack.config.js` do diretório); header-app/rspack.config.js:7 (`entry: "./src/entry.ts"`, que carrega header-app/src/entry.ts:1 `import('./index')`) |
| home-app/package.json:15 | devDependencies | @module-federation/enhanced | ^2.8.2 | module-federation | Yes | home-app/rspack.config.js:2 (`const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack")`); home-app/rspack.config.js:46-66 (`new ModuleFederationPlugin({ name: "HomeApp", remotes: { HeaderApp: "HeaderApp@http://localhost:4001/mf-manifest.json" }, dts: true, shared … })`); home-app/package.json:10-11 (`rspack serve`, `rspack build`, que carregam o `rspack.config.js` do diretório); home-app/rspack.config.js:6 (`entry: "./src/entry.ts"`) |

## Notas

- Cada linha usa só a evidência do próprio pacote (`header-app/` ou `home-app/`); os itens de `other_package_matches` são a configuração do outro app, que declara a mesma dependência no próprio `package.json`.
- O `rspack.config.js` não é citado por nome nos scripts: `rspack serve` e `rspack build` usam o arquivo de configuração padrão do diretório.
- A busca fora das listas achou só `home-app/@mf-types/index.d.ts:9` (`declare module "@module-federation/enhanced/runtime"`), tipo gerado pelo `dts: true`; não foi usado como evidência. O `package-lock.json` da raiz tem `packages: {}` e não declara o pacote.
