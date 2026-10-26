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

## Leitura do repositório

Exemplo single-spa com três projetos irmãos, sem workspace na raiz: o root config `parent-app` e duas aplicações, `react-child-app` (React) e `vue-child-app` (Vue 3). O host é o `parent-app`. Sua página `index.ejs` instala dois import maps pelo `@single-spa/import-map-injector` (parent-app/src/index.ejs:15-26, 33-41, 45) e, quando o injetor termina, importa o próprio root config (parent-app/src/index.ejs:53-55). O root config lê o layout declarativo `microfrontend-layout.html`, constrói as aplicações com um `loadApp` que faz `import()` nativo do nome da aplicação, registra todas no single-spa, ativa o motor de layout e chama `start()` (parent-app/src/frontenddevs-root-config.js:9-20). O layout põe as duas aplicações juntas na rota padrão e cada uma sozinha em `react-app` e `vue-app` (parent-app/src/microfrontend-layout.html:3-12). Cada aplicação exporta os lifecycles criados pelo adaptador do seu framework: `singleSpaReact` (react-child-app/src/frontenddevs-react-mfe.js:6-16) e `singleSpaVue` (vue-child-app/src/main.js:6-26).

A ligação entre as unidades é só por nome de módulo. O import map das unidades traduz `@frontenddevs/react-mfe` e `@frontenddevs/vue-child-app` para URLs em `localhost:8081` e `localhost:8082` (parent-app/src/index.ejs:37-38), mas só existe no modo local (`<% if (isLocal) { %>`, parent-app/src/index.ejs:32), acionado pelo `--env isLocal` do script `start` (parent-app/package.json:4; parent-app/webpack.config.js:21-22). O import map de produção está comentado (parent-app/src/index.ejs:29-30), então o caminho executável do exemplo é o de desenvolvimento. O primeiro import map só traz dependências compartilhadas por CDN (React, react-dom, scheduler, single-spa; parent-app/src/index.ejs:18-23), sem unidade do repositório; as bibliotecas `import-map-overrides` e o painel `<import-map-overrides-full>` são ferramentas de desenvolvimento (parent-app/src/index.ejs:44, 57) e não viraram relação.

O repositório é uma demonstração: o conteúdo das aplicações é placeholder (react-child-app/src/root.component.js:4-6; vue-child-app/src/App.vue:2-4), e o propósito é mostrar React e Vue montados pelo mesmo root config. Não há troca de mensagens entre as unidades, nem Module Federation, iframe ou custom element de outra unidade. A entrada `@frontenddevs/root-config` do import map (parent-app/src/index.ejs:36) aponta para o próprio `parent-app` e é interna à unidade. O formato do bundle Vue depende do `vue-cli-plugin-single-spa`, sem configuração no snapshot (vue-child-app/vue.config.js:1-4), como já registrado nas revisões de dependências e de código-fonte.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | parent-app | vue-child-app | root-config → application | origem → destino | single-spa | Yes | Yes | parent-app/src/index.ejs:38 (import map local `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js`); parent-app/src/microfrontend-layout.html:5 (aplicação na rota padrão); parent-app/src/microfrontend-layout.html:11 (aplicação na rota `vue-app`); vue-child-app/package.json:2 (`name` `@frontenddevs/vue-child-app`); vue-child-app/package.json:6 (porta 8082) | vue-child-app/src/main.js:24; vue-child-app/src/main.js:25; vue-child-app/src/main.js:26; vue-child-app/src/main.js:2; vue-child-app/src/main.js:6; parent-app/src/frontenddevs-root-config.js:13; parent-app/src/frontenddevs-root-config.js:18; parent-app/src/frontenddevs-root-config.js:20; parent-app/src/index.ejs:33; parent-app/src/microfrontend-layout.html:1 |
| 2 | parent-app | react-child-app | root-config → application | origem → destino | single-spa | Yes | Yes | parent-app/src/index.ejs:37 (import map local `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js`); parent-app/src/microfrontend-layout.html:4 (aplicação na rota padrão); parent-app/src/microfrontend-layout.html:8 (aplicação na rota `react-app`); react-child-app/package.json:2 (`name` `@frontenddevs/react-mfe`); react-child-app/webpack.config.js:6-7 (`orgName: "frontenddevs"`, `projectName: "react-mfe"`); react-child-app/webpack.config.js:10 (`outputSystemJS: false`); react-child-app/package.json:4 (porta 8081) | react-child-app/src/frontenddevs-react-mfe.js:3; react-child-app/src/frontenddevs-react-mfe.js:6; parent-app/src/frontenddevs-root-config.js:13; parent-app/src/frontenddevs-root-config.js:18; parent-app/src/frontenddevs-root-config.js:20; parent-app/src/index.ejs:33; parent-app/src/microfrontend-layout.html:1 |

## Observações

**1. parent-app → vue-child-app.** O root config registra a aplicação `@frontenddevs/vue-child-app`, que o layout coloca na rota padrão e na rota `vue-app` (parent-app/src/microfrontend-layout.html:5, 11); o `loadApp` a carrega por `import()` do nome (parent-app/src/frontenddevs-root-config.js:13), resolvido pelo import map local para `http://localhost:8082/js/app.js` (parent-app/src/index.ejs:38). O destino foi resolvido pelo nome: `@frontenddevs/vue-child-app` é o `name` do manifesto do projeto Vue (vue-child-app/package.json:2); a porta 8082 do `vue-cli-service serve` (vue-child-app/package.json:6) só corrobora, e o caminho `/js/app.js` segue a saída padrão do Vue CLI, sem configuração explícita no snapshot. O destino entra registrado no orquestrador (parent-app/src/frontenddevs-root-config.js:18), daí `root-config → application`, embora a carga seja um `import()` dinâmico. Ativa = `Yes` pelas linhas `Yes` dos lifecycles (vue-child-app/src/main.js:2, 6, 24-26) e do root config. A ressalva é a do modo: o mapa só existe com `isLocal` (parent-app/src/index.ejs:32), e não se verifica no snapshot se o bundle gerado pelo `vue-cli-plugin-single-spa` é compatível com o `import()` nativo do root config.

**2. parent-app → react-child-app.** Mesmo caminho: o layout põe `@frontenddevs/react-mfe` na rota padrão e na rota `react-app` (parent-app/src/microfrontend-layout.html:4, 8), e o import map local o resolve para `http://localhost:8081/frontenddevs-react-mfe.js` (parent-app/src/index.ejs:37). Aqui a correspondência é dupla: o nome coincide com o `name` do manifesto (react-child-app/package.json:2), e o nome do arquivo `frontenddevs-react-mfe.js` corresponde ao `orgName`/`projectName` do `webpack-config-single-spa-react` (react-child-app/webpack.config.js:6-7) e ao arquivo de entrada `src/frontenddevs-react-mfe.js`; a porta 8081 (react-child-app/package.json:4) corrobora. O bundle é ESM (`outputSystemJS: false`, react-child-app/webpack.config.js:10), compatível com o `import()` nativo de parent-app/src/frontenddevs-root-config.js:13. Os lifecycles exportados em react-child-app/src/frontenddevs-react-mfe.js:16 vêm de `singleSpaReact` (:6-14), e React e react-dom são resolvidos pelas dependências compartilhadas do primeiro import map (parent-app/src/index.ejs:18-20), não por outra unidade. Ativa = `Yes`, com a mesma ressalva do modo local da relação 1.

## Resumo

Relações: 2 (root-config → application: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
