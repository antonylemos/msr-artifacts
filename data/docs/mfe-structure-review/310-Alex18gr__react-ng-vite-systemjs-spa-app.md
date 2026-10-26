---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| angular-app | angular-app/angular.json;angular-app/package.json | angular-app/package.json | angular-app/angular.json:24-25 (`"index": "src/index.html"`, `"main": "src/main.single-spa.ts"`); angular-app/src/main.single-spa.ts:20-31 e 112-114 (`singleSpaAngular({ ..., template: '<app-root />' })` e lifecycles exportados) | angular-app/angular.json:20-21 e 31-34 (target `build` com `@angular-builders/custom-webpack:browser`, `customWebpackConfig.path: extra-webpack.config.js`) + angular-app/package.json:7 (`"build": "ng build"`) | — | — | Yes | Aplicação Angular single-spa com entrada própria e build Angular CLI próprio. |
| common-lib-webpack | common-lib-webpack/index.html;common-lib-webpack/package.json;common-lib-webpack/webpack.config.js | common-lib-webpack/package.json | common-lib-webpack/webpack.config.js:5-7 (`index: "./src/index.ts"`, entrada de biblioteca); common-lib-webpack/src/index.ts:1-2 (só reexporta `Calculator` e `userState`); common-lib-webpack/index.html:1-11 (página “Hello world!” sem script) | common-lib-webpack/webpack.config.js:49-55 (`index.js` com `library.type: "system"`) + common-lib-webpack/package.json:8 (`"build": "webpack --mode production"`) | — | — | No | Módulo utilitário compartilhado (estado e calculadora), sem entrada de aplicação. |
| react-app | react-app/package.json;react-app/webpack.config.js | react-app/package.json | react-app/webpack.config.js:5-10 (`singleSpaDefaults({ orgName: "org1", projectName: "react-app", ... })`, entrada `src/org1-react-app.tsx` pela convenção do preset); react-app/src/org1-react-app.tsx:6-16 (`singleSpaReact({ ..., rootComponent: Root })` e lifecycles exportados) | react-app/webpack.config.js:1-19 + react-app/package.json:6 (`"build": "webpack --mode=production"`) | — | — | Yes | Aplicação React single-spa com entrada própria e build webpack próprio. |
| react-vite-app | react-vite-app/index.html;react-vite-app/package.json;react-vite-app/vite.config.ts | react-vite-app/package.json | react-vite-app/index.html:11 (`<script type="module" src="/src/main.tsx">`, entrada do Vite); react-vite-app/vite.config.ts:40 (`spaEntryPoints: ["src/spa.tsx"]`); react-vite-app/src/spa.tsx:8-15 e 99-101 (`singleSpaReact(...)` e lifecycles exportados) | react-vite-app/vite.config.ts:14-41 (saída `format: "system"` e `vitePluginSingleSpa({ type: "mife", ... })`) + react-vite-app/package.json:8 (`"build": "tsc -b && vite build"`) | — | — | Yes | Aplicação React single-spa com entrada própria e build Vite próprio. |
| root-config | root-config/package.json;root-config/webpack.config.js | root-config/package.json | root-config/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, entrada `src/org1-root-config.ts` pela convenção do preset); root-config/webpack.config.js:19-21 (`HtmlWebpackPlugin` com `template: "src/index.ejs"`); root-config/src/org1-root-config.ts:3-23 (registra as três aplicações e chama `start`) | root-config/webpack.config.js:1-29 + root-config/package.json:9 (`"build": "webpack --mode=production"`) | — | — | Yes | Root config single-spa com entrada própria e build webpack próprio. |
| styleguide | styleguide/index.html;styleguide/package.json;styleguide/vite.config.ts | styleguide/package.json | styleguide/vite.config.ts:20-24 (`build.lib` com `entry: src/styleguide.ts`, `formats: ['system']`); styleguide/src/styleguide.ts:3-5 (só exporta componentes); styleguide/index.html:11 (`/src/main.tsx`, página de scaffold do Vite usada só no `vite` de desenvolvimento) | styleguide/vite.config.ts:19-38 (build de biblioteca, React e MUI externos) + styleguide/package.json:10 (`"build": "tsc -b && vite build"`) | — | — | No | Biblioteca de componentes compartilhada; o build gera só o pacote (`main: ./dist/styleguide.system.js`, package.json:6), sem entrada de aplicação. |
| vue-app | vue-app/index.html;vue-app/package.json;vue-app/vite.config.ts | vue-app/package.json | vue-app/index.html:11 (`<script type="module" src="/src/main.ts">`, entrada do Vite); vue-app/src/main.ts:7-11 (`createApp(App)`, `app.mount("#app")`) | vue-app/vite.config.ts:8-15 + vue-app/package.json:6 e 8 (`"build": "run-p type-check build-only"`, `"build-only": "vite build"`) | — | — | Yes | Aplicação Vue com entrada própria e build Vite próprio. |

## Resumo

Aplicações frontend no snapshot: 5 (angular-app, react-app, react-vite-app, root-config, vue-app).

## Notas

- A contagem difere de `frontend_units: 4` da classificação porque inclui `vue-app`, scaffold Vue que monta sozinho em `#app` e não aparece no root config nem no import map (`root-config/src/org1-root-config.ts:3-19`; `root-config/src/index.ejs:63-84`). As outras quatro linhas `Yes` são as unidades contadas pela classificação.
- `angular-app/angular.json:8-9` tem um único projeto (`angular-app`), e não há `package.json` na raiz; os arquivos `workspace-config` do `artifacts.csv` são `package.json` e `tsconfig*.json` dos projetos, sem `workspaces`. As dependências `file:../common-lib-webpack` e `file:../styleguide` (`react-app/package.json:56`, `65`; `angular-app/package.json:23`; `react-vite-app/package.json:14`, `18`) são referências locais, não declaração de workspace. O `matches.csv` não tem ocorrências `ci-*`; tem 1 `ws-path-alias` (vue-app/tsconfig.json:6) e 1 `ops-cors` (common-lib-webpack/webpack.config.js:38). Não há Dockerfile, CI nem configuração de hospedagem no snapshot.
- `styleguide`: o `index.html` inicia a página de exemplo do Vite (`styleguide/src/main.tsx:6-10`, `App.tsx` com o contador padrão) só no servidor de desenvolvimento; o modo `build.lib` não usa esse HTML, e o `dev:single-spa` (`styleguide/package.json:15`) serve o pacote gerado na porta 3002 (`styleguide/vite.config.ts:39-41`), consumido pelo import map do root (`root-config/src/index.ejs:70`).
- `react-vite-app` tem duas entradas: `index.html` → `src/main.tsx` (`createRoot(...).render`, uso isolado) e `src/spa.tsx` (lifecycles single-spa), que é a que o root carrega como `spa.js` (`root-config/src/index.ejs:69`).
- `react-app` e `root-config` não escrevem a entrada no `webpack.config.js`; ela decorre de `orgName`/`projectName` no preset, e o import map do root aponta para `org1-react-app.js` e `org1-root-config.js` (`root-config/src/index.ejs:66-67`).
