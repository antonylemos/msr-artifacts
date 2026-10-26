---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
inputs:
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

## Leitura do repositório

O repositório quase não documenta a arquitetura. Não há README na raiz. O único `.md`, e o único arquivo `documentation` do `artifacts.csv`, é `vue-child-app/README.md`, o texto padrão do Vue CLI, em inglês: o título com o nome do projeto e os comandos `npm install`, `npm run serve`, `npm run build` e `npm run lint`, com link para a referência de configuração do Vue CLI (vue-child-app/README.md:1-24). Os comandos estão em blocos de código, e nenhuma frase fala deste projeto; não virou linha. Os três `package.json` não têm `description`; os campos `name`, `@frontenddevs/root-config`, `@frontenddevs/react-mfe` e `@frontenddevs/vue-child-app` (parent-app/package.json:2; react-child-app/package.json:2; vue-child-app/package.json:2), são identificadores, já usados pela revisão de composição para resolver as unidades.

A única frase do autor sobre a arquitetura é o texto que a aplicação React exibe ao ser montada, "This is MFE with Single SPA (React Child App)" (react-child-app/src/root.component.js:6). Ela diz o que as revisões anteriores mostram: o `react-child-app` é uma aplicação single-spa montada pelo root config `parent-app`, ao lado do `vue-child-app` (3.4.3; 3.4.5 #1, #2). A linha anterior, "{props.name} is mounted!" (react-child-app/src/root.component.js:5), mostra o nome recebido em runtime e não afirma nada. A aplicação Vue exibe só o conteúdo padrão do Vue CLI, "Welcome to Your Vue.js App" (vue-child-app/src/App.vue:4).

Foram lidos os comentários dos artefatos que as revisões anteriores citam: `parent-app/src/index.ejs`, `parent-app/src/microfrontend-layout.html`, `parent-app/src/frontenddevs-root-config.js`, os dois `webpack.config.js`, `vue-child-app/vue.config.js`, `vue-child-app/src/main.js`, `react-child-app/src/frontenddevs-react-mfe.js`, `vue-child-app/.env.standalone`, `vue-child-app/public/index.html` e os `pre-commit` do husky. Todos os comentários são do template do create-single-spa, do `vue-cli-plugin-single-spa` ou do Vue CLI, e são instruções ao desenvolvedor, não afirmações sobre este projeto: "If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below" e o link que o segue (parent-app/src/index.ejs:10-12); "Shared dependencies go into this import map" (parent-app/src/index.ejs:14), que diz onde pôr as dependências compartilhadas, e cujo mapa traz React, react-dom, scheduler e single-spa por CDN (parent-app/src/index.ejs:15-26); "Add your organization's prod import map URL to this script's src" (parent-app/src/index.ejs:29-30), sobre o mapa de produção comentado, já registrado nas revisões de código-fonte e de build e deploy; "modify the webpack config however you'd like to by adding to this object" (parent-app/webpack.config.js:16; react-child-app/webpack.config.js:14); "Customize the root error boundary for your microfrontend here." (react-child-app/src/frontenddevs-react-mfe.js:11); os comentários sobre as props do single-spa (vue-child-app/src/main.js:11-18); "built files will be auto injected" (vue-child-app/public/index.html:15). O `/* webpackIgnore: true */` de parent-app/src/frontenddevs-root-config.js:13 é diretiva ao webpack. Os demais comentários do snapshot são dos `.gitignore` e de estilo (vue-child-app/src/components/HelloWorld.vue:42).

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | react-child-app/src/root.component.js:6 | "This is MFE with Single SPA (React Child App)" | estrutura | corroborada | 3.4.3 (react-child-app Yes); 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:6); 3.4.5 #2; react-child-app/src/frontenddevs-react-mfe.js:3, 6-16; parent-app/src/microfrontend-layout.html:4, 8 |

## Observações

**1. react-child-app/src/root.component.js:6.** É o subtítulo do componente raiz da aplicação React, não um comentário: a frase aparece na tela quando o single-spa monta a aplicação. Diz que o projeto React é um micro-frontend, que usa single-spa e que é uma aplicação filha. As três partes conferem. A revisão estrutural tem o `react-child-app` como unidade frontend própria (3.4.3). O componente `Root` é o `rootComponent` de `singleSpaReact`, que cria os lifecycles exportados (react-child-app/src/frontenddevs-react-mfe.js:3, 6-16; 3.4.4). O root config `parent-app` registra a aplicação `@frontenddevs/react-mfe` e o layout a põe na rota padrão e na rota `react-app` (parent-app/src/microfrontend-layout.html:4, 8; 3.4.5 #2), daí "child". A ressalva é a das revisões anteriores: a ligação só existe no modo local, pelo import map de parent-app/src/index.ejs:32-42.

## Resumo

Afirmações: 1 (corroborada: 1, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 1).
