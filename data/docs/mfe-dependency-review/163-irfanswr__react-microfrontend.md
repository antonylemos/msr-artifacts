---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| parent-app/package.json:41 | dependencies | @types/systemjs | ^6.1.1 | import-maps | No | sem import, referência de tipos ou uso de `systemjs`/`System.` nos arquivos de código e build do snapshot (grep, excluindo lockfiles); não há arquivo TypeScript; apenas declaração em parent-app/package.json:41; parent-app/src/index.ejs:9, 15 e 45 (o import map usa `@single-spa/import-map-injector` por CDN, não SystemJS) |
| parent-app/package.json:42 | dependencies | single-spa | ^5.9.3 | single-spa | Yes | parent-app/src/frontenddevs-root-config.js:1 e 18-20 (`import { registerApplication, start } from "single-spa"`; `applications.forEach(registerApplication)`; `start()`); parent-app/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, cuja entrada é `src/frontenddevs-root-config.js`); parent-app/src/index.ejs:36 e 53-55 (import map local e `import('@frontenddevs/root-config')`) |
| parent-app/package.json:43 | dependencies | single-spa-layout | ^1.6.0 | single-spa | Yes | parent-app/src/frontenddevs-root-config.js:2-7 e 9-19 (`import { constructApplications, constructRoutes, constructLayoutEngine } from "single-spa-layout"`; rotas a partir de `./microfrontend-layout.html`; `layoutEngine.activate()`); mesmo arquivo de entrada da linha anterior (parent-app/webpack.config.js:7-9; parent-app/src/index.ejs:53-55) |
| parent-app/package.json:35 | devDependencies | webpack-config-single-spa | ^8.0.0 | single-spa | Yes | parent-app/webpack.config.js:2 e 7-13 (`require("webpack-config-single-spa")`; `singleSpaDefaults({ orgName, projectName: "root-config", ... })`); parent-app/package.json:4 e 11 (`webpack serve` e `webpack --mode=production`, que leem o `webpack.config.js` padrão) |
| react-child-app/package.json:49 | dependencies | single-spa-react | ^6.0.2 | single-spa | Yes | react-child-app/src/frontenddevs-react-mfe.js:3, 6-14 e 16 (`import singleSpaReact from "single-spa-react"`; `singleSpaReact({ React, ReactDOMClient, rootComponent: Root, ... })`; exporta `bootstrap`, `mount`, `unmount`); react-child-app/webpack.config.js:5-7 (`projectName: "react-mfe"`, cuja entrada é `src/frontenddevs-react-mfe.js`); parent-app/src/index.ejs:37 (`"@frontenddevs/react-mfe": "http://localhost:8081/frontenddevs-react-mfe.js"`) |
| react-child-app/package.json:42 | devDependencies | webpack-config-single-spa-react | ^8.0.0 | single-spa | Yes | react-child-app/webpack.config.js:2 e 5-11 (`require("webpack-config-single-spa-react")`; `singleSpaDefaults({ orgName: "frontenddevs", projectName: "react-mfe", ... })`); react-child-app/package.json:4 e 7 (`webpack serve --port 8081` e `webpack --mode=production`, que leem o `webpack.config.js` padrão) |
| vue-child-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | vue-child-app/src/main.js:2, 6-22 e 24-26 (`import singleSpaVue from 'single-spa-vue'`; `singleSpaVue({ createApp, appOptions: ... })`; exporta os lifecycles); `src/main.js` é a entrada padrão do `vue-cli-service` (vue-child-app/package.json:6-7); parent-app/src/index.ejs:38 (`"@frontenddevs/vue-child-app": "http://localhost:8082/js/app.js"`) |
| vue-child-app/package.json:24 | devDependencies | vue-cli-plugin-single-spa | ~4.0.0 | single-spa | Undetermined | sem import ou invocação de `vue-cli-plugin-single-spa` em arquivos do snapshot (grep, excluindo lockfiles); vue-child-app/vue.config.js:1-4 não o menciona; vue-child-app/package.json:6-9 (`vue-cli-service serve`/`build`, `--mode standalone`); vue-child-app/.env.standalone:1 (`STANDALONE_SINGLE_SPA=true`); a carga do plugin depende da convenção do Vue CLI, sem arquivo do snapshot que a mostre |

## Notas

- As listas da inspeção dão às linhas do `parent-app/` só ocorrências em `react-child-app/` e `vue-child-app/` (imports de `single-spa-react` e `single-spa-vue`), que não usam esses pacotes. A evidência de `single-spa`, `single-spa-layout` e `webpack-config-single-spa` veio do grep em `parent-app/`, fora das listas.
- `@types/systemjs`: as sete ocorrências de `same_package_matches` em `parent-app/src/index.ejs` são padrões de import map (meta `importmap-type`, scripts `injector-importmap`, comentários, injetor), não uso do pacote de tipos. Contexto do template `create-single-spa`; não muda a classificação.
- `single-spa` também é servido por CDN no import map compartilhado (parent-app/src/index.ejs:23, versão 6.0.3, diferente da declarada `^5.9.3`). O import no root config continua sendo o uso do pacote.
- As entradas `src/frontenddevs-root-config.js` e `src/frontenddevs-react-mfe.js` seguem a convenção `src/<orgName>-<projectName>.js` dos `webpack-config-single-spa*`; não há `entry` explícito no snapshot.
- `vue-cli-plugin-single-spa`: o Vue CLI carrega plugins `vue-cli-plugin-*` declarados no `package.json`, e a variável `STANDALONE_SINGLE_SPA` de `.env.standalone` é lida por esse plugin, segundo a documentação dele. Nenhum arquivo do snapshot importa ou invoca o pacote, e o `vue.config.js` não o configura; na dúvida entre `Yes` e `Undetermined`, ficou `Undetermined`.
