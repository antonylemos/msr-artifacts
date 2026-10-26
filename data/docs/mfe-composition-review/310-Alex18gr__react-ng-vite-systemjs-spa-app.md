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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Leitura do repositório

Prova de conceito de single-spa com SystemJS e import maps (README.md:1-2), declarada como derivada do exemplo de terceiro `nitinreddy3/react-ng-spa-app`. O host é o root config (`root-config`), que registra três aplicações com `registerApplication`, cada uma numa rota própria: `@org1/react-app` em `/react`, `angular-app` em `/angular` e `react-vite-app` em `/react-vite` (root-config/src/org1-root-config.ts:3-19), e inicia o orquestrador com `start` (root-config/src/org1-root-config.ts:21-23). Cada registro carrega a aplicação por `System.import` do nome, que o import map SystemJS da página resolve para a URL do bundle de cada projeto: `//localhost:8080/org1-react-app.js`, `//localhost:4200/main.js` e `//localhost:3001/spa.js` (root-config/src/index.ejs:63-84). A página tem um menu que navega entre as três rotas com `singleSpaNavigate` (root-config/src/index.ejs:177-195). As três aplicações usam stacks diferentes (React 16 com webpack, Angular 12 com custom-webpack, React 19 com Vite e `vite-plugin-single-spa`), e o import map dá a cada React a sua versão por `scopes` (root-config/src/index.ejs:73-82).

Além do carregamento, as aplicações trocam o nome do usuário por um `BehaviorSubject` (common-lib-webpack/src/user-state.ts:3-19) na biblioteca `common-lib-webpack`. Ele só funciona como canal entre unidades porque as três externalizam `@myapp/common-lib-webpack` como `@paok/common-lib-webpack` (react-app/webpack.config.js:13-14; angular-app/extra-webpack.config.js:7-10; react-vite-app/vite.config.ts:11, 19) e o SystemJS resolve esse nome para um único módulo em `//localhost:9001/index.js` (root-config/src/index.ejs:71). `react-app` e `react-vite-app` publicam e assinam; `angular-app` só assina. Como as rotas não se sobrepõem, as aplicações não ficam montadas ao mesmo tempo, e o valor passa de uma para outra pelo último valor guardado no `BehaviorSubject`. A biblioteca `styleguide` também é compartilhada pelo import map (root-config/src/index.ejs:70), mas fornece só componentes visuais e não virou relação, assim como `common-lib-webpack` não é Destino de nada: as duas são bibliotecas, `No` na revisão estrutural.

O import map das unidades só existe no modo local (`<% if (isLocal) { %>`, root-config/src/index.ejs:62), ativado pelo `start` do root (root-config/package.json:4); a linha do mapa de produção está comentada (root-config/src/index.ejs:60). A porta 8080 do `react-app` não está escrita no repositório (react-app/package.json:4 só tem `webpack serve`), e o README documenta a execução só de `/react` e `/angular` (README.md:29-34). O `vue-app` é um scaffold Vue que não aparece no root config nem no import map e ficou fora de todas as relações.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | root-config | angular-app | root-config → application | origem → destino | single-spa | Yes | Yes | angular-app/angular.json:25 (`main: src/main.single-spa.ts`); angular-app/angular.json:33-34 (`libraryName: angular-app`, `libraryTarget: umd`); angular-app/angular.json:36 (`deployUrl: http://localhost:4200/`); angular-app/package.json:11 (`ng s … --port 4200`) | angular-app/src/main.single-spa.ts:112; angular-app/src/main.single-spa.ts:113; angular-app/src/main.single-spa.ts:114; angular-app/src/main.single-spa.ts:7; angular-app/src/main.single-spa.ts:20; root-config/src/org1-root-config.ts:9; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:11; root-config/src/org1-root-config.ts:21 |
| 2 | root-config | react-vite-app | root-config → application | origem → destino | single-spa | Yes | Yes | react-vite-app/vite.config.ts:25 (`format: "system"`); react-vite-app/vite.config.ts:37-41 (`vitePluginSingleSpa` com `type: "mife"`, `serverPort: 3001`, `spaEntryPoints: ["src/spa.tsx"]`) | react-vite-app/src/spa.tsx:99; react-vite-app/src/spa.tsx:100; react-vite-app/src/spa.tsx:101; react-vite-app/src/spa.tsx:3; react-vite-app/src/spa.tsx:8; root-config/src/org1-root-config.ts:15; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:17; root-config/src/org1-root-config.ts:21 |
| 3 | root-config | react-app | root-config → application | origem → destino | single-spa | Yes | Yes | react-app/webpack.config.js:5-10 (`singleSpaDefaults` com `orgName: "org1"`, `projectName: "react-app"`) | react-app/src/org1-react-app.tsx:3; react-app/src/org1-react-app.tsx:6; root-config/src/org1-root-config.ts:3; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:5; root-config/src/org1-root-config.ts:21 |
| 4 | react-app | angular-app | communication | origem → destino | events | Yes | Yes | root-config/src/index.ejs:71 (`@paok/common-lib-webpack` → `//localhost:9001/index.js`); common-lib-webpack/webpack.config.js:49-55 (`index.js` com `library.type: "system"`); react-app/webpack.config.js:13-14 (external `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); angular-app/extra-webpack.config.js:7-10 (idem) | common-lib-webpack/src/user-state.ts:9 |
| 5 | react-vite-app | angular-app | communication | origem → destino | events | Yes | Yes | root-config/src/index.ejs:71 (`@paok/common-lib-webpack` → `//localhost:9001/index.js`); common-lib-webpack/webpack.config.js:49-55 (`index.js` com `library.type: "system"`); react-vite-app/vite.config.ts:11 (alias `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); react-vite-app/vite.config.ts:19 (`@paok/common-lib-webpack` em `external`); angular-app/extra-webpack.config.js:7-10 (external `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`) | common-lib-webpack/src/user-state.ts:9 |
| 6 | react-app | react-vite-app | communication | bidirecional | events | Yes | Yes | root-config/src/index.ejs:71 (`@paok/common-lib-webpack` → `//localhost:9001/index.js`); common-lib-webpack/webpack.config.js:49-55 (`index.js` com `library.type: "system"`); react-app/webpack.config.js:13-14 (external `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); react-vite-app/vite.config.ts:11 (alias `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); react-vite-app/vite.config.ts:19 (`@paok/common-lib-webpack` em `external`) | common-lib-webpack/src/user-state.ts:9 |

## Observações

**1. root-config → angular-app.** O root config registra `angular-app` com `app: () => System.import("angular-app")` e `activeWhen: ["/angular"]` (root-config/src/org1-root-config.ts:9-13). O import map local resolve o nome para `//localhost:4200/main.js` (root-config/src/index.ejs:68). O destino é resolvido em `angular-app` pela correspondência entre o nome registrado e o `libraryName: angular-app` (angular-app/angular.json:33), pelo bundle `main.js` gerado da entrada `src/main.single-spa.ts` (angular-app/angular.json:25) e pelo `deployUrl` `http://localhost:4200/` (angular-app/angular.json:36). A porta 4200 também está no script de serve (angular-app/package.json:11). A entrada exporta os lifecycles criados por `singleSpaAngular` (angular-app/src/main.single-spa.ts:20-31, 112-114), com `mount` e `unmount` que ligam e desligam os `<style>` da aplicação. Ativa = `Yes`: todas as linhas de código são `Yes` na revisão de código-fonte. O `start` (root-config/src/org1-root-config.ts:21) e o import map (root-config/src/index.ejs:63) sustentam as três relações de registro e aparecem nas três.

**2. root-config → react-vite-app.** Registro `react-vite-app` com `System.import("react-vite-app")` e `activeWhen: ["/react-vite"]` (root-config/src/org1-root-config.ts:15-19), resolvido no import map para `//localhost:3001/spa.js` (root-config/src/index.ejs:69). O destino corresponde a `react-vite-app` pela entrada single-spa `src/spa.tsx` e pela `serverPort: 3001` do `vite-plugin-single-spa` (react-vite-app/vite.config.ts:37-41), com saída em formato `system` (react-vite-app/vite.config.ts:25). Os lifecycles exportados combinam os de CSS do plugin, o controle próprio de `<style>` e os de `singleSpaReact` (react-vite-app/src/spa.tsx:8-15, 98-101). A rota `/react-vite` está no menu da página (root-config/src/index.ejs:189), mas não no README. Ativa = `Yes`.

**3. root-config → react-app.** Registro `@org1/react-app` com `System.import("@org1/react-app")` e `activeWhen: ["/react"]` (root-config/src/org1-root-config.ts:3-7), resolvido para `//localhost:8080/org1-react-app.js` (root-config/src/index.ejs:67). O destino é resolvido em `react-app` pelo nome do arquivo: `orgName: "org1"` e `projectName: "react-app"` no preset (react-app/webpack.config.js:5-10) correspondem a `org1-react-app.js` e à entrada `src/org1-react-app.tsx`, que exporta os lifecycles de `singleSpaReact` (react-app/src/org1-react-app.tsx:6-16). A porta 8080 não está declarada no repositório; não foi usada para resolver o destino. O import map dá a esta aplicação React 16 por `scopes` (root-config/src/index.ejs:74-77). Ativa = `Yes`.

**4. react-app → angular-app.** A `react-app` publica o nome do usuário com `userState.setUser(username)` no envio do formulário (react-app/src/App.tsx:72), e a `angular-app` assina `userState.user$` no construtor do `AppComponent` (angular-app/src/app/app.component.ts:15-18). A `angular-app` não publica, então a direção é `origem → destino`. O canal é o `BehaviorSubject` de `common-lib-webpack` (common-lib-webpack/src/user-state.ts:3-19), e a linha de código é o `next` de `setUser` (common-lib-webpack/src/user-state.ts:9), registrada na revisão de código-fonte com unidade `—` por estar na biblioteca. O módulo é o mesmo para as duas unidades porque ambas o externalizam (react-app/webpack.config.js:13-14; angular-app/extra-webpack.config.js:7-10) e o SystemJS o carrega de uma única URL (root-config/src/index.ejs:71). Mecanismo `events`: um serviço reativo compartilhado é a forma de comunicação prevista no tipo, e a linha só tem esse canal de estado.

**5. react-vite-app → angular-app.** Mesmo canal da relação 4. A `react-vite-app` publica com `userState.setUser(formJson.userName)` no envio do formulário (react-vite-app/src/App.tsx:47), e a `angular-app` assina (angular-app/src/app/app.component.ts:15-18). Na `react-vite-app`, o nome importado é trocado por alias para `@paok/common-lib-webpack` e mantido fora do bundle (react-vite-app/vite.config.ts:11, 19), o que leva ao mesmo módulo do import map. Direção `origem → destino`, porque a `angular-app` só assina. Ativa = `Yes`.

**6. react-app → react-vite-app.** As duas aplicações React publicam (react-app/src/App.tsx:72; react-vite-app/src/App.tsx:47) e assinam (react-app/src/App.tsx:53-56; react-vite-app/src/App.tsx:13-18) o mesmo `userState`, então a direção é `bidirecional`, com Origem e Destino em ordem alfabética. Como cada aplicação está numa rota própria e o single-spa monta uma por vez, a troca acontece pelo valor guardado no `BehaviorSubject`, lido com `getUser()` na montagem (react-app/src/App.tsx:49-51; react-vite-app/src/App.tsx:10), e não entre duas aplicações montadas ao mesmo tempo. Ativa = `Yes`.

## Resumo

Relações: 6 (root-config → application: 3, communication: 3). Ativas: 6. Destino fora do snapshot: 0.
Unidades sem relação: vue-app.
