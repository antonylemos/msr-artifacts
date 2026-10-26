---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
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

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Leitura do repositório

A documentação do projeto é o README da raiz, em inglês e curto. O título e a primeira frase dizem o que o repositório é: uma prova de conceito de arquitetura de micro-frontends com single-spa, React, Angular, Vite e SystemJS, derivada do exemplo de terceiro `nitinreddy3/react-ng-spa-app` (README.md:1-2). O resto é roteiro de instalação e execução (README.md:4-34), que termina descrevendo a navegação entre as aplicações no root config. Os outros quatro arquivos `documentation` do `artifacts.csv` são READMEs de template de ferramenta, sem afirmação sobre este projeto: o do Angular CLI 12.0.3 em `angular-app/README.md:1-27`, o do template React + TypeScript + Vite em `react-vite-app/README.md:1-54` e em `styleguide/README.md:1-54` (texto quase idêntico, só mudam links), e o do template Vue 3 + Vite em `vue-app/README.md:1-40`. O `vue-app/src/components/icons/IconDocumentation.vue` aparece no `artifacts.csv` como `source` e é ícone do scaffold Vue.

O README confere com as revisões anteriores no que afirma: há um root config single-spa que registra, por rota, aplicações em stacks diferentes, carregadas por SystemJS a partir de um import map (3.4.5 #1-#3). Ele fica aquém do snapshot em dois pontos. A navegação descrita cobre só `/react` e `/angular` (README.md:31-34), sem a rota `/react-vite`, que está no registro e no menu da página (root-config/src/org1-root-config.ts:15-19; root-config/src/index.ejs:189). E a instrução de instalação manda rodar `npm install` só em `root-config`, `react-app` e `angular-app` (README.md:5), embora o roteiro de execução também mande subir a `react-vite-app` (README.md:24-27). O README não menciona as bibliotecas `common-lib-webpack` e `styleguide`, que o import map local também serve (root-config/src/index.ejs:70-71), nem o canal de estado compartilhado entre as aplicações (3.4.5 #4-#6), nem o `vue-app`, que não participa da composição (3.4.5, Resumo).

Ficaram fora da tabela, como instalação ou instrução de execução: a frase de que a versão de Node de cada aplicação é diferente e o `npm install` por pasta (README.md:5-8); os passos de execução de cada projeto, com "Requires Node 16" para a Angular e a React (README.md:10-27), que conferem com os scripts `serve:single-spa:angular-app`, `start` e `dev:single-spa` (angular-app/package.json:11; react-app/package.json:4; root-config/package.json:4; react-vite-app/package.json:11); o requisito de Node 16 não tem `engines` nem `.nvmrc` no snapshot. O endereço `http://localhost:9000` (README.md:29) é a porta do `webpack serve` do root config (root-config/package.json:4), detalhe de infraestrutura citado no parágrafo da afirmação 3.

Ocorrências `doc-*`: README.md:1 (`doc-integration-technology` e `doc-import-map-zones`) está na afirmação 1; README.md:2 (`doc-mfe-term`) na afirmação 2; README.md:14 e README.md:26 (`doc-integration-technology`) são instruções de execução (`npm run serve:single-spa:angular-app`, `npm run dev:single-spa`).

Comentários lidos nos artefatos que as revisões anteriores citam: em root-config/src/index.ejs, os comentários do gerador `create-single-spa` sobre regenerator-runtime, CSP, import-map-overrides, o import map de dependências compartilhadas, o import map de produção e o ZoneJS (root-config/src/index.ejs:9-13, 15-18, 22-24, 26-32, 59-60, 87-91), que são instruções genéricas do template ("Your shared dependencies must be of one of the following formats", "Add your organization's prod import map URL to this script's src"), sem afirmação sobre este projeto; o `<title>Single SPA React Angular</title>` da página (root-config/src/index.ejs:8), que repete o título do README; "Customize the root error boundary for your microfrontend here." (react-app/src/org1-react-app.tsx:11) e "Feel free to modify this webpack config however you'd like to" (angular-app/extra-webpack.config.js:59), também de template; e os comentários de root-config/webpack.config.js:17, react-app/webpack.config.js:17, angular-app/extra-webpack.config.js:12-57, angular-app/src/main.single-spa.ts:84-106, react-vite-app/src/spa.tsx:53-97, react-vite-app/vite.config.ts:10-50, styleguide/vite.config.ts:17-22 e common-lib-webpack/webpack.config.js:42-46, que são código comentado ou detalhes internos de build e de estilos de cada unidade. Nenhum `package.json` tem `description` preenchida; só `common-lib-webpack/package.json:19` tem o campo, vazio.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:1 | "Single-spa app with React Angular Vite and SystemJS" | composição | corroborada | 3.4.2 (single-spa, single-spa-angular, single-spa-react, vite-plugin-single-spa `Yes`); 3.4.5 #1-#3; root-config/src/org1-root-config.ts:1-23; root-config/src/index.ejs:95-99 |
| 2 | README.md:2 | "This is a microfrontend architecture poc" | estrutura | corroborada | 3.4.3 (angular-app, react-app, react-vite-app, root-config `Yes`); 3.4.5 #1-#3 |
| 3 | README.md:31 | "click on **React**, you will be routed to the React app, on click of **Angular** you will be redirected to angular app" | composição | corroborada | 3.4.5 #1, #3; root-config/src/org1-root-config.ts:3-13; root-config/src/index.ejs:177-188 |

## Observações

**1. README.md:1.** O título nomeia o orquestrador (single-spa), o carregador (SystemJS) e as stacks das aplicações. O root config importa `registerApplication` e `start` de `single-spa` e registra três aplicações carregadas por `System.import` (root-config/src/org1-root-config.ts:1-23); o SystemJS é carregado de CDN pela página (root-config/src/index.ejs:95-99), e o import map SystemJS resolve os nomes das aplicações (3.4.4, root-config/src/index.ejs:63). As aplicações são Angular (`angular-app`, com `single-spa-angular`), React com webpack (`react-app`, com `single-spa-react`) e React com Vite (`react-vite-app`, com `vite-plugin-single-spa` e saída `format: "system"`, react-vite-app/vite.config.ts:25, 37-41). A frase não se divide: todas as partes têm a mesma corroboração. Na revisão de dependências, o pacote `systemjs` declarado está `Undetermined` no root config e `No` na `react-vite-app`, porque o carregador que roda é o da CDN, não a cópia instalada; isso não muda que o SystemJS é o carregador usado. O `<title>` da página repete parte do título: "Single SPA React Angular" (root-config/src/index.ejs:8).

**2. README.md:2.** A revisão estrutural tem quatro unidades frontend compostas — o root config e as três aplicações registradas —, e a de composição liga o root a cada uma por single-spa, com carregamento em runtime (3.4.5 #1-#3). "poc" confere com o caráter de exemplo: tudo o que o snapshot executa é de desenvolvimento, e não há artefato de deploy (3.4.6, Leitura). A derivação do repositório `nitinreddy3/react-ng-spa-app`, no resto da frase, aponta para um projeto fora do snapshot e não diz nada verificável sobre as unidades; ela não foi conferida.

**3. README.md:31.** O menu da página do root config tem os itens React e Angular, que chamam `singleSpaNavigate('/react')` e `singleSpaNavigate('/angular')` (root-config/src/index.ejs:177-188), e o root ativa `@org1/react-app` em `/react` e `angular-app` em `/angular` (root-config/src/org1-root-config.ts:3-13). As linhas "**http://localhost:9000/react** -> React App" e "**http://localhost:9000/angular/** -> Angular App" (README.md:33-34) repetem a afirmação com as URLs; a barra final de `/angular/` também casa com `activeWhen: ["/angular"]`, que é prefixo. A porta 9000 é a do `webpack serve` do root config (root-config/package.json:4). A afirmação não fala da terceira aplicação: o menu também tem "React Vite", que leva a `/react-vite` (root-config/src/index.ejs:189-193), onde o root ativa `react-vite-app` (root-config/src/org1-root-config.ts:15-19). A omissão não contradiz o que está escrito.

## Resumo

Afirmações: 3 (corroborada: 3, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 1, composição: 2).
