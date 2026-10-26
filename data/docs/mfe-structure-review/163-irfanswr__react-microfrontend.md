---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| parent-app | parent-app/package.json;parent-app/webpack.config.js | parent-app/package.json | parent-app/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, entrada `src/frontenddevs-root-config.js` pela convenção do `webpack-config-single-spa`); parent-app/webpack.config.js:18-20 (`HtmlWebpackPlugin` com `template: "src/index.ejs"`); parent-app/src/frontenddevs-root-config.js:9-20 (registra as aplicações e chama `start()`) | parent-app/webpack.config.js:1-28 + parent-app/package.json:10-11 (`"build": "concurrently npm:build:*"`, `"build:webpack": "webpack --mode=production"`) | — | — | Yes | Root config single-spa com entrada própria e build webpack próprio. |
| react-child-app | react-child-app/package.json;react-child-app/webpack.config.js | react-child-app/package.json | react-child-app/webpack.config.js:5-7 (`projectName: "react-mfe"`, entrada `src/frontenddevs-react-mfe.js` pela convenção do `webpack-config-single-spa-react`); react-child-app/src/frontenddevs-react-mfe.js:6-16 (`singleSpaReact` com `rootComponent: Root` e lifecycles exportados) | react-child-app/webpack.config.js:1-16 + react-child-app/package.json:6-7 (`"build": "concurrently npm:build:*"`, `"build:webpack": "webpack --mode=production"`) | — | — | Yes | Aplicação React single-spa com entrada própria e build webpack próprio. |
| vue-child-app | vue-child-app/package.json | vue-child-app/package.json | vue-child-app/src/main.js:6-26 (entrada `src/main.js` da convenção do Vue CLI; `singleSpaVue({ createApp, ... })` e lifecycles exportados); vue-child-app/public/index.html:14 (`<div id="app">`, template HTML do Vue CLI) | vue-child-app/vue.config.js:1-4 (`defineConfig`) + vue-child-app/package.json:7 (`"build": "vue-cli-service build"`) | — | — | Yes | Aplicação Vue single-spa com entrada própria e build `vue-cli-service` próprio. |

## Resumo

Aplicações frontend no snapshot: 3 (parent-app, react-child-app, vue-child-app).

## Notas

- O N coincide com `frontend_units: 3` da classificação: o root config e as duas aplicações filhas, todos no snapshot.
- Os três `package.json` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum declara `workspaces` (parent-app/package.json:1-45, react-child-app/package.json:1-51, vue-child-app/package.json:1-46); não há manifesto na raiz nem ocorrências `ws-*`, `ops-*` ou `ci-*` no `matches.csv`.
- Não há `entry` explícito nos dois `webpack.config.js`; as entradas seguem a convenção `src/<orgName>-<projectName>.js` dos `webpack-config-single-spa*`, e os arquivos existem no snapshot. No Vue, a entrada segue a convenção do Vue CLI, como a do CRA em outras revisões.
- Cada projeto tem lockfile próprio (`package-lock.json`) e porta própria de desenvolvimento (parent-app/package.json:4, react-child-app/package.json:4, vue-child-app/package.json:6), sem artefato de deploy no snapshot.
