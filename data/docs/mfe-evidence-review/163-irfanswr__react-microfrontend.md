---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Leitura do repositório

É um exemplo single-spa com três projetos irmãos e sem workspace na raiz. O `parent-app` é o root config (#32), e as aplicações são `react-child-app`, em React (#33), e `vue-child-app`, em Vue 3 (#34). Cada projeto tem build próprio e nenhum tem deploy observado (#37–#39).

A cadeia que sustenta a arquitetura é curta e está toda no snapshot:
- **Dependências:** `single-spa` e `single-spa-layout` no root (#2, #3), e os adaptadores `single-spa-react` e `single-spa-vue` nas aplicações (#5, #7). As configurações webpack do create-single-spa ficam no root e no React (#4, #6).
- **Configuração:** o layout declara as duas aplicações na rota padrão e cada uma na sua rota (#12). O import map local da página do root traduz os nomes das aplicações para URLs em `localhost:8081` e `localhost:8082` (#9). As configurações webpack dão a cada projeto o nome com que o import map o pede (#10, #11).
- **Código:** o root config constrói as aplicações a partir do layout e as carrega por `import()` do nome (#27). Depois registra todas e chama `start()` (#28, #29). A linha do import map (#30) e a tabela de rotas (#31) nomeiam os destinos. Do outro lado, cada aplicação exporta os lifecycles criados pelo adaptador do seu framework (#13–#19).
- **Relações:** daí saem duas relações root-config → application, ambas ativas (#35, #36).

A ressalva vale para toda a cadeia: o import map das aplicações só existe quando a página é gerada com `isLocal`, pelo script `start` (#9, #10). O mapa de produção está comentado, e o histórico não diz se ele foi planejado ou se é só texto do gerador (#44). O caminho executável do exemplo é o de desenvolvimento.

Sinais que enganam:
- **Bibliotecas de import map:** as linhas de `index.ejs` que a mineração pegou como import map ou script externo são comentários do template (#20–#22) ou bibliotecas de CDN, o `import-map-overrides` e o injetor (#23–#26). Nenhuma carrega uma unidade.
- **`@types/systemjs`:** é declarado e não tem uso (#1). O import map usa o injetor do single-spa, não o SystemJS, e o histórico não diz de onde veio a declaração (#41).

O que fica ambíguo é o lado Vue. O `vue-cli-plugin-single-spa` é declarado, mas nenhum arquivo o configura (#8). O formato do bundle Vue depende dele, e o histórico não resolve a dúvida (#42). A relação com o Vue está declarada no layout e no import map (#9, #12), mas o snapshot não mostra se o bundle servido em `/js/app.js` é compatível com o `import()` nativo do root. No React, o bundle ESM é configurado de forma explícita (#11).

A documentação é uma frase só, o subtítulo exibido pela aplicação React. Ela é corroborada (#40).

Configuração: ficaram 4 blocos, um por arquivo, porque cada arquivo serve uma única unidade. A página `parent-app/src/index.ejs` entrou pelos seus import maps, de dependências compartilhadas e de aplicações (#9). O layout entrou como registro de aplicações (#12). Ficaram de fora:
- `vue-child-app/vue.config.js:1-4`, que só traz `transpileDependencies`;
- `vue-child-app/.env.standalone:1`, que liga o modo standalone de desenvolvimento;
- os `scripts` dos `package.json`, que são build ou servidor de desenvolvimento (dimensão 6) e cujas portas a 3.4.5 marcou como corroboração;
- os campos `name` dos `package.json` (react-child-app/package.json:2; vue-child-app/package.json:2). São identificadores de pacote, e nenhum arquivo do snapshot os lê para compor. Os nomes usados na composição estão no import map e no layout.

## Observações

### 1. parent-app/package.json:41

**Observação:** `@types/systemjs` `^6.1.1` em `dependencies`. A revisão o marca como não configurado: nenhum arquivo do snapshot importa o pacote, referencia os tipos ou usa `systemjs`/`System.`, e não há arquivo TypeScript. O import map de parent-app/src/index.ejs:9, 15 e 45 usa `@single-spa/import-map-injector`.

**Interpretação:** É uma declaração sem uso. Não indica SystemJS na composição.

### 2. parent-app/package.json:42

**Observação:** `single-spa` `^5.9.3` em `dependencies`. A revisão o marca como configurado, pelo import e pelas chamadas `registerApplication` e `start()` em parent-app/src/frontenddevs-root-config.js:1, 18-20.

**Interpretação:** O root declara o orquestrador single-spa e o usa na entrada.

### 3. parent-app/package.json:43

**Observação:** `single-spa-layout` `^1.6.0` em `dependencies`. A revisão o marca como configurado, pelo import de `constructApplications`, `constructRoutes` e `constructLayoutEngine` e pelo uso com `./microfrontend-layout.html` em parent-app/src/frontenddevs-root-config.js:2-19.

**Interpretação:** O root declara o motor de layout declarativo do single-spa e o usa para construir as rotas e as aplicações.

### 4. parent-app/package.json:35

**Observação:** `webpack-config-single-spa` `^8.0.0` em `devDependencies`. A revisão o marca como configurado, por `singleSpaDefaults({ orgName, projectName: "root-config", ... })` em parent-app/webpack.config.js:2, 7-13, lido por `webpack serve` e `webpack --mode=production` (parent-app/package.json:4, 11).

**Interpretação:** O root declara a configuração webpack padrão do single-spa e a usa no build.

### 5. react-child-app/package.json:49

**Observação:** `single-spa-react` `^6.0.2` em `dependencies`. A revisão o marca como configurado, pelo import e pela chamada `singleSpaReact(...)` em react-child-app/src/frontenddevs-react-mfe.js:3, 6-16, que cria os lifecycles exportados.

**Interpretação:** A aplicação React declara o adaptador single-spa e o usa para se expor ao root.

### 6. react-child-app/package.json:42

**Observação:** `webpack-config-single-spa-react` `^8.0.0` em `devDependencies`. A revisão o marca como configurado, por `singleSpaDefaults({ orgName: "frontenddevs", projectName: "react-mfe", ... })` em react-child-app/webpack.config.js:2, 5-11, lido pelos scripts de react-child-app/package.json:4, 7.

**Interpretação:** A aplicação React declara a configuração webpack do single-spa para React e a usa no build.

### 7. vue-child-app/package.json:13

**Observação:** `single-spa-vue` `^3.0.1` em `dependencies`. A revisão o marca como configurado, pelo import e pela chamada `singleSpaVue(...)` em vue-child-app/src/main.js:2, 6-26, a entrada padrão do `vue-cli-service`.

**Interpretação:** A aplicação Vue declara o adaptador single-spa e o usa para se expor ao root.

### 8. vue-child-app/package.json:24

**Observação:** `vue-cli-plugin-single-spa` `~4.0.0` em `devDependencies`. Nenhum arquivo do snapshot o importa ou invoca, e vue-child-app/vue.config.js:1-4 não o menciona. Os scripts usam `vue-cli-service serve`/`build` e `--mode standalone` (vue-child-app/package.json:6-9), e vue-child-app/.env.standalone:1 define `STANDALONE_SINGLE_SPA=true`. A revisão o marca como indeterminado.

**Interpretação:** Duas leituras continuam plausíveis. Pela convenção do Vue CLI, o plugin seria carregado por estar declarado e definiria o formato single-spa do bundle Vue. Ou ele não participa do build, e o bundle sai no formato padrão do Vue CLI. O snapshot não mostra qual das duas vale.

### 9. parent-app/src/index.ejs:9; parent-app/src/index.ejs:15-26; parent-app/src/index.ejs:32-41; parent-app/src/index.ejs:45; parent-app/webpack.config.js:21-22

**Observação:** A página do root traz dois `<script type="injector-importmap">`, instalados pelo `@single-spa/import-map-injector` de CDN. O primeiro (:15-26) mapeia `react`, `react-dom`, `react-dom/client`, `process`, `scheduler` e `single-spa` para URLs de CDN. O segundo (:33-41) só é gerado com `isLocal` (:32), parâmetro que vem de `--env isLocal` pelo HtmlWebpackPlugin. Ele mapeia `@frontenddevs/root-config` → `//localhost:9000/frontenddevs-root-config.js`, `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js` e `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js`. O mapa de produção está comentado (:30).

**Interpretação:** O root declara por import map as URLs das duas aplicações e as dependências compartilhadas por CDN. É a resolução dos destinos da composição, só no modo local.

### 10. parent-app/webpack.config.js:5-27

**Observação:** `singleSpaDefaults({ orgName: "frontenddevs", projectName: "root-config", ..., disableHtmlGeneration: true })`, combinado com um `HtmlWebpackPlugin` que gera a página a partir de `src/index.ejs`, com os parâmetros `isLocal` e `orgName`.

**Interpretação:** Configura o builder single-spa no root, com nome próprio. Também decide, por `isLocal`, se a página recebe o import map das aplicações.

### 11. react-child-app/webpack.config.js:4-16

**Observação:** `singleSpaDefaults({ orgName: "frontenddevs", projectName: "react-mfe", ..., outputSystemJS: false })`, sem outras opções.

**Interpretação:** Configura o builder single-spa na aplicação React, com nome próprio e saída ESM. O nome do bundle, `frontenddevs-react-mfe.js`, é o que o import map do root pede.

### 12. parent-app/src/microfrontend-layout.html:1-14; parent-app/src/frontenddevs-root-config.js:7-9

**Observação:** `<single-spa-router>` com `<main>`. A rota `default` tem as aplicações `@frontenddevs/react-mfe` e `@frontenddevs/vue-child-app` (:3-6), a rota `react-app` tem `@frontenddevs/react-mfe` (:7-9) e a rota `vue-app` tem `@frontenddevs/vue-child-app` (:10-12). O root config importa o arquivo e o converte em rotas.

**Interpretação:** O layout do root declara as duas aplicações e as rotas em que cada uma monta.

### 13. vue-child-app/src/main.js:24; vue-child-app/src/main.js:6-22

**Observação:** `export const bootstrap = vueLifecycles.bootstrap`. O objeto é criado por `singleSpaVue` em :6-22. A aplicação é resolvida como `@frontenddevs/vue-child-app` pelo import map do root (parent-app/src/index.ejs:38) e registrada em parent-app/src/frontenddevs-root-config.js:18.

**Interpretação:** É um lifecycle da aplicação Vue, chamado pelo orquestrador do root ao montar a aplicação.

### 14. vue-child-app/src/main.js:25

**Observação:** `export const mount = vueLifecycles.mount`, do mesmo objeto, chamado ao ativar as rotas `default` e `vue-app` (parent-app/src/microfrontend-layout.html:3-5, 10-11).

**Interpretação:** É um lifecycle da aplicação Vue, chamado pelo orquestrador do root ao montar a aplicação.

### 15. vue-child-app/src/main.js:26

**Observação:** `export const unmount = vueLifecycles.unmount`, do mesmo objeto, com o mesmo consumidor de parent-app/src/frontenddevs-root-config.js:18-20.

**Interpretação:** É um lifecycle da aplicação Vue, chamado pelo orquestrador do root ao desmontar a aplicação.

### 16. react-child-app/src/frontenddevs-react-mfe.js:3

**Observação:** `import singleSpaReact from "single-spa-react"`, usado em :6.

**Interpretação:** A aplicação React importa o adaptador com que cria os seus lifecycles.

### 17. react-child-app/src/frontenddevs-react-mfe.js:6-14; react-child-app/src/frontenddevs-react-mfe.js:16

**Observação:** `singleSpaReact({ React, ReactDOMClient, rootComponent: Root, errorBoundary })`, com `export const { bootstrap, mount, unmount } = lifecycles`. A aplicação é resolvida como `@frontenddevs/react-mfe` pelo import map do root (parent-app/src/index.ejs:37) e registrada nas rotas de parent-app/src/microfrontend-layout.html:4, 8.

**Interpretação:** O componente React é adaptado a lifecycles single-spa e exposto ao orquestrador do root.

### 18. vue-child-app/src/main.js:2

**Observação:** `import singleSpaVue from 'single-spa-vue'`, usado em :6.

**Interpretação:** A aplicação Vue importa o adaptador com que cria os seus lifecycles.

### 19. vue-child-app/src/main.js:6-22

**Observação:** `singleSpaVue({ createApp, appOptions: { render() { return h(App, {...}) } } })`, com os lifecycles exportados em :24-26.

**Interpretação:** O App Vue é adaptado a lifecycles single-spa e exposto ao orquestrador do root.

### 20. parent-app/src/index.ejs:10

**Observação:** Comentário HTML: "If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below".

**Interpretação:** É uma instrução do template ao desenvolvedor, não código ativo.

### 21. parent-app/src/index.ejs:11

**Observação:** Comentário HTML com o link para a documentação de configuração do `import-map-overrides`.

**Interpretação:** É uma instrução do template ao desenvolvedor, não código ativo.

### 22. parent-app/src/index.ejs:12

**Observação:** `<meta name="import-map-overrides-domains" content="denylist:prod.example.com" />`, inteiro dentro de um comentário HTML.

**Interpretação:** É uma opção de desenvolvimento desligada, não código ativo.

### 23. parent-app/src/index.ejs:44

**Observação:** `<script src="https://cdn.jsdelivr.net/npm/import-map-overrides@5.1.1/dist/import-map-overrides.js">`, apontado pelo padrão de import map.

**Interpretação:** Carrega de CDN a biblioteca de desenvolvimento que sobrescreve entradas do import map. Não carrega o bundle de outra unidade.

### 24. parent-app/src/index.ejs:57

**Observação:** `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>`, o painel da biblioteca da observação #23, exibido só com a chave `devtools` no localStorage.

**Interpretação:** É uma ferramenta de desenvolvimento, não o custom element de outra unidade.

### 25. parent-app/src/index.ejs:44

**Observação:** O mesmo `<script>` do `import-map-overrides`, agora apontado pelo padrão de script externo.

**Interpretação:** É a biblioteca de CDN da observação #23, não o bundle de outra unidade.

### 26. parent-app/src/index.ejs:45

**Observação:** `<script src="https://cdn.jsdelivr.net/npm/@single-spa/import-map-injector@2.0.1/lib/import-map-injector.js">`. Essa biblioteca instala os `<script type="injector-importmap">` de :9, :15 e :33.

**Interpretação:** Carrega de CDN a biblioteca que instala os import maps. Não carrega o bundle de outra unidade.

### 27. parent-app/src/frontenddevs-root-config.js:12-14; parent-app/src/index.ejs:37-38

**Observação:** `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }`, dentro de `constructApplications`. Os nomes vêm do layout e são resolvidos pelo import map local para as URLs das duas aplicações.

**Interpretação:** O root carrega em runtime a aplicação cujo nome recebe por parâmetro, por `import()` nativo.

### 28. parent-app/src/frontenddevs-root-config.js:18; parent-app/src/frontenddevs-root-config.js:9-16; parent-app/src/frontenddevs-root-config.js:19

**Observação:** `applications.forEach(registerApplication)`, sobre as aplicações construídas a partir do layout em :9-15. O motor de layout criado em :16 é ativado em :19.

**Interpretação:** O root registra no single-spa todas as aplicações do layout, sem nomeá-las na linha.

### 29. parent-app/src/frontenddevs-root-config.js:20; parent-app/src/frontenddevs-root-config.js:1

**Observação:** `start()`, importado de `single-spa`.

**Interpretação:** Inicia o orquestrador. Sem ele, os registros não montam nenhuma aplicação.

### 30. parent-app/src/index.ejs:33-41; parent-app/src/index.ejs:32

**Observação:** `<script type="injector-importmap">`, que mapeia `@frontenddevs/react-mfe` para `http://localhost:8081/frontenddevs-react-mfe.js` (:37) e `@frontenddevs/vue-child-app` para `http://localhost:8082/js/app.js` (:38). Só é gerado com `isLocal` (:32).

**Interpretação:** É a resolução dos nomes das duas aplicações para as URLs dos seus bundles, só no modo local.

### 31. parent-app/src/microfrontend-layout.html:1-14

**Observação:** `<single-spa-router>`, a tabela de rotas do root: a rota padrão com as duas aplicações, `react-app` com `@frontenddevs/react-mfe` e `vue-app` com `@frontenddevs/vue-child-app`. É importada e convertida em rotas em parent-app/src/frontenddevs-root-config.js:7-9.

**Interpretação:** É a tabela de rotas que liga caminhos às aplicações de outras unidades.

### 32. parent-app; parent-app/package.json; parent-app/webpack.config.js:7-9, 18-20; parent-app/src/frontenddevs-root-config.js:9-20; parent-app/package.json:10-11

**Observação:** Projeto com manifesto, `webpack.config.js` e lockfile próprios. A entrada `src/frontenddevs-root-config.js` vem da convenção do `webpack-config-single-spa`, e a página vem de `src/index.ejs`. O build é `webpack --mode=production`. Não declara workspace.

**Interpretação:** É uma unidade frontend com limite próprio, o root config da composição.

### 33. react-child-app; react-child-app/package.json; react-child-app/webpack.config.js:5-7; react-child-app/src/frontenddevs-react-mfe.js:6-16; react-child-app/package.json:6-7

**Observação:** Projeto com manifesto, `webpack.config.js` e lockfile próprios. A entrada `src/frontenddevs-react-mfe.js` vem da convenção do `webpack-config-single-spa-react` e exporta os lifecycles. O build é `webpack --mode=production`.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React single-spa.

### 34. vue-child-app; vue-child-app/package.json; vue-child-app/src/main.js:6-26; vue-child-app/public/index.html:14; vue-child-app/vue.config.js:1-4; vue-child-app/package.json:7

**Observação:** Projeto com manifesto, `vue.config.js` e lockfile próprios. A entrada `src/main.js` vem da convenção do Vue CLI e exporta os lifecycles, e o template tem `<div id="app">`. O build é `vue-cli-service build`.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação Vue single-spa.

### 35. parent-app/src/microfrontend-layout.html:5, 11; parent-app/src/index.ejs:38; parent-app/src/frontenddevs-root-config.js:13, 18, 20; vue-child-app/src/main.js:24-26

**Observação:** O root `parent-app` põe `@frontenddevs/vue-child-app` na rota padrão e na rota `vue-app`. Ele a carrega por `import()` do nome, resolvido pelo import map local para `http://localhost:8082/js/app.js`, e a registra no single-spa. O nome é o `name` do manifesto do projeto Vue (vue-child-app/package.json:2). A aplicação exporta os lifecycles criados por `singleSpaVue`. O mapa só existe com `isLocal`.

**Interpretação:** É uma relação root-config → application ativa entre o `parent-app` e o `vue-child-app`, no modo local.

### 36. parent-app/src/microfrontend-layout.html:4, 8; parent-app/src/index.ejs:37; parent-app/src/frontenddevs-root-config.js:13, 18, 20; react-child-app/webpack.config.js:6-7, 10; react-child-app/src/frontenddevs-react-mfe.js:16

**Observação:** O root `parent-app` põe `@frontenddevs/react-mfe` na rota padrão e na rota `react-app`, e o import map local o resolve para `http://localhost:8081/frontenddevs-react-mfe.js`. O nome coincide com o `name` do manifesto (react-child-app/package.json:2). O arquivo pedido corresponde ao `orgName`/`projectName` da configuração webpack, com saída ESM. A aplicação exporta os lifecycles de `singleSpaReact`. O mapa só existe com `isLocal`.

**Interpretação:** É uma relação root-config → application ativa entre o `parent-app` e o `react-child-app`, no modo local.

### 37. parent-app/package.json:10-11; parent-app/webpack.config.js:7-26

**Observação:** `"build": "concurrently npm:build:*"` e `"build:webpack": "webpack --mode=production"`, sobre `webpack-config-single-spa` com `projectName: "root-config"` e a página de `src/index.ejs`. Não há artefato de deploy, e o manifesto não tem `version`. O root só é servido em `localhost:9000` por `webpack serve`.

**Interpretação:** O root tem build separado, sem deploy observado nem versionamento independente.

### 38. react-child-app/package.json:6-7; react-child-app/webpack.config.js:5-11

**Observação:** O mesmo par de scripts de build, sobre `webpack-config-single-spa-react` com `projectName: "react-mfe"` e `outputSystemJS: false`. Não há artefato de deploy, e o manifesto não tem `version`. A aplicação só é servida em `localhost:8081` por `webpack serve`.

**Interpretação:** A aplicação React tem build separado, sem deploy observado nem versionamento independente.

### 39. vue-child-app/package.json:7; vue-child-app/package.json:24; vue-child-app/vue.config.js:1-4

**Observação:** `"build": "vue-cli-service build"`, com `vue-cli-plugin-single-spa` declarado e um `vue.config.js` sem opção de saída. Não há artefato de deploy, e a versão `0.1.0` de um pacote `private` não é usada em publicação. A aplicação só é servida em `localhost:8082` por `vue-cli-service serve`.

**Interpretação:** A aplicação Vue tem build separado, sem deploy observado nem versionamento independente.

### 40. react-child-app/src/root.component.js:6

**Observação:** Subtítulo exibido pelo componente raiz da aplicação React: "This is MFE with Single SPA (React Child App)".

**Interpretação:** Afirma que o projeto React é um micro-frontend single-spa e uma aplicação filha. A afirmação é corroborada: o projeto é unidade própria, os lifecycles vêm de `singleSpaReact` e o root o registra no layout.

### 41. 00ca0bf 2025-08-21 (parent-app/package.json)

**Observação:** O `parent-app/package.json` chega com a declaração de `@types/systemjs` no único commit do repositório e não tem outra versão.

**Interpretação:** O histórico não diz se o pacote foi usado antes do primeiro commit nem se veio só do gerador. A dúvida é só sobre o passado: no snapshot, o pacote não tem uso.

### 42. 00ca0bf 2025-08-21 (vue-child-app/package.json, vue-child-app/vue.config.js)

**Observação:** O `vue-child-app/package.json`, com o plugin em `devDependencies`, e o `vue-child-app/vue.config.js`, sem opção de saída, chegam juntos no único commit. Não há versão em que o plugin apareça configurado.

**Interpretação:** O histórico não diz se o plugin é carregado nem qual é o formato do bundle Vue. Continuam plausíveis as duas leituras da observação #8: a aplicação Vue sai num formato que o root carrega, ou a relação com ela fica só declarada.

### 43. 00ca0bf 2025-08-21 (parent-app/src/index.ejs)

**Observação:** O `parent-app/src/index.ejs` chega com as linhas 10 a 12 já comentadas no único commit.

**Interpretação:** O histórico não diz se a meta `import-map-overrides-domains` esteve ativa antes do primeiro commit ou se nunca foi descomentada. A dúvida é só sobre o passado.

### 44. 00ca0bf 2025-08-21 (parent-app/src/index.ejs)

**Observação:** O mesmo `parent-app/src/index.ejs` chega no único commit com o mapa de produção comentado e o espaço reservado `src="/importmap.json"`, ao lado do mapa local. Não há versão em que o mapa de produção esteja ativo.

**Interpretação:** O histórico não diz se o mapa de produção foi planejado e nunca conectado ou se é só texto do gerador. A dúvida é só sobre o passado: no snapshot, só o modo local liga as aplicações.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (parent-app/package.json:41) | 1 tecnologia | manifesto | import-maps | tecnológica | fraca | — |
| 2 | 3.4.2 (parent-app/package.json:42) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #28; declara #29 |
| 3 | 3.4.2 (parent-app/package.json:43) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #12; declara #27 |
| 4 | 3.4.2 (parent-app/package.json:35) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #10 |
| 5 | 3.4.2 (react-child-app/package.json:49) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #16; declara #17 |
| 6 | 3.4.2 (react-child-app/package.json:42) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #11 |
| 7 | 3.4.2 (vue-child-app/package.json:13) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #18; declara #19 |
| 8 | 3.4.2 (vue-child-app/package.json:24) | 1 tecnologia | manifesto | single-spa | tecnológica | ambígua | — |
| 9 | 3.4.2 (parent-app/package.json:41, :42, Evidência); 3.4.2 (react-child-app/package.json:49, Evidência); 3.4.2 (vue-child-app/package.json:13, Evidência); 3.4.4 (parent-app/src/index.ejs:33, Arquivo:linha); 3.4.4 (vue-child-app/src/main.js:24; react-child-app/src/frontenddevs-react-mfe.js:6; vue-child-app/src/main.js:6; parent-app/src/index.ejs:44, :45; parent-app/src/frontenddevs-root-config.js:13; parent-app/src/index.ejs:33, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #2, #3 (Onde é servida) | 2 configuração | configuração | import-maps | arquitetural | forte | configura #35; configura #36; configura #27 |
| 10 | 3.4.2 (parent-app/package.json:42, :43, :35, Evidência); 3.4.3 (parent-app, Marcadores, Entrada e Build); 3.4.4 (parent-app/src/frontenddevs-root-config.js:13; parent-app/src/index.ejs:33, Observação); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #32; configura #30 |
| 11 | 3.4.2 (react-child-app/package.json:49, :42, Evidência); 3.4.3 (react-child-app, Marcadores, Entrada e Build); 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:6, Observação); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #33; configura #36 |
| 12 | 3.4.4 (parent-app/src/microfrontend-layout.html:1, Arquivo:linha); 3.4.4 (vue-child-app/src/main.js:24, :25; react-child-app/src/frontenddevs-react-mfe.js:6, Observação); 3.4.5 #1, #2 (Configuração, Código); 3.4.7 #1 (Evidência) | 2 configuração | configuração | single-spa | arquitetural | forte | configura #35; configura #36 |
| 13 | 3.4.4 (vue-child-app/src/main.js:24) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35 |
| 14 | 3.4.4 (vue-child-app/src/main.js:25) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35 |
| 15 | 3.4.4 (vue-child-app/src/main.js:26) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35 |
| 16 | 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:3) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #36 |
| 17 | 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:6) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #36 |
| 18 | 3.4.4 (vue-child-app/src/main.js:2) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35 |
| 19 | 3.4.4 (vue-child-app/src/main.js:6) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35 |
| 20 | 3.4.4 (parent-app/src/index.ejs:10) | 3 código | comentário | — | contexto | fraca | — |
| 21 | 3.4.4 (parent-app/src/index.ejs:11) | 3 código | comentário | — | contexto | fraca | — |
| 22 | 3.4.4 (parent-app/src/index.ejs:12) | 3 código | comentário | — | contexto | fraca | — |
| 23 | 3.4.4 (parent-app/src/index.ejs:44, src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 24 | 3.4.4 (parent-app/src/index.ejs:57) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 25 | 3.4.4 (parent-app/src/index.ejs:44, src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 26 | 3.4.4 (parent-app/src/index.ejs:45) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 27 | 3.4.4 (parent-app/src/frontenddevs-root-config.js:13) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35; implementa #36 |
| 28 | 3.4.4 (parent-app/src/frontenddevs-root-config.js:18) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35; implementa #36 |
| 29 | 3.4.4 (parent-app/src/frontenddevs-root-config.js:20) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #35; implementa #36 |
| 30 | 3.4.4 (parent-app/src/index.ejs:33) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #35; implementa #36 |
| 31 | 3.4.4 (parent-app/src/microfrontend-layout.html:1) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #35; implementa #36 |
| 32 | 3.4.3 (parent-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (react-child-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 34 | 3.4.3 (vue-child-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 35 | 3.4.5 #1 | 5 composição | configuração | single-spa | arquitetural | forte | liga #32; liga #34 |
| 36 | 3.4.5 #2 | 5 composição | configuração | single-spa | arquitetural | forte | liga #32; liga #33 |
| 37 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #32 |
| 38 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #33 |
| 39 | 3.4.6 #3 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #34 |
| 40 | 3.4.7 #1 | 7 documentação | comentário | single-spa | arquitetural | fraca | corrobora #33; corrobora #17; corrobora #36 |
| 41 | 3.4.8 #1 | 8 histórico | histórico | — | tecnológica | fraca | explica #1 |
| 42 | 3.4.8 #2 | 8 histórico | histórico | — | tecnológica | ambígua | explica #8; explica #35 |
| 43 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #20; explica #21; explica #22 |
| 44 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #9; explica #30 |

## Resumo

Observações: 44. Dimensões (tecnologia: 8, configuração: 4, código: 19, estrutura: 3, composição: 2, build-deploy: 3, documentação: 1, histórico: 4). Força (forte: 6, moderada: 18, fraca: 18, ambígua: 2). Evidência (tecnológica: 26, arquitetural: 14, contexto: 4).
