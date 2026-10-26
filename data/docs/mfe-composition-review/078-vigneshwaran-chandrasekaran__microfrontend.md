---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
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

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Leitura do repositório

Repositório didático com cinco aplicações: um host React (`host`) e quatro remotes, dois React
(`react-mfe-1`, `react-mfe-2`), um Vue (`vue-mfe`) e um Angular (`angular-mfe`). Todos usam
Module Federation do webpack; o Angular usa o helper `withModuleFederationPlugin` de
`@angular-architects/module-federation` (angular-mfe/webpack.config.js:23-30). Cada remote
expõe um único módulo `./mount`, uma função que recebe um elemento DOM e monta ali a aplicação
inteira com o seu framework (react-mfe-1/src/mount.js:11-18, react-mfe-2/src/mount.js:7-14,
vue-mfe/src/mount.js:8-11, angular-mfe/src/mount.ts:20-32). Esse contrato comum `mount(element)`
é o que permite ao host React montar telas Vue e Angular sem conhecer os frameworks.

O host declara os quatro remotes em dois mapas, um de desenvolvimento, por porta local, e outro de
produção, por subcaminho do mesmo domínio (host/webpack.config.js:30-46), e os passa ao
`ModuleFederationPlugin` (host/webpack.config.js:80-82). No código, uma lista `MFE_NAV` liga cada
rota a um `loader` com `import('<remote>/mount')` (host/src/App.jsx:31-36); um único componente
`MfeContainer` chama o loader e depois `mount(container)` num `div` do host (host/src/App.jsx:59-61,
87), e as rotas são geradas a partir da mesma lista (host/src/App.jsx:178-188). O remote Angular é
declarado de forma diferente, por `promise import(...)`, porque o `remoteEntry.js` gerado pelo
helper Angular é um ES module (host/webpack.config.js:26-32).

Além do núcleo federado, o host tem uma segunda lista, `IFRAME_NAV`, com duas aplicações externas
(Route Map e Multibank) em domínios próprios (host/src/App.jsx:38-41), exibidas por `<iframe>` em
rotas do mesmo shell (host/src/App.jsx:95-103, 191-197). Os iframes só recebem a URL: não há troca
de mensagens nem outro contrato com o host. Essas duas aplicações não estão no snapshot; a
classificação conta sete unidades incluindo-as, a revisão estrutural registra cinco.

Não há comunicação entre unidades: host, react-mfe-1 e react-mfe-2 criam cada um o seu store Redux,
sem compartilhá-lo, e a revisão de código-fonte não encontrou eventos, `postMessage` nem
`BroadcastChannel`. Cada remote também roda sozinho pelo seu `bootstrap` (por exemplo
react-mfe-1/src/index.js:3). A publicação conjunta constrói os cinco projetos separadamente e copia
cada `dist` para um subdiretório de um único `dist` (package.json:9-12, vercel.json:2-3), o que
explica os caminhos `/react-mfe-1/`, `/vue-mfe/` etc. do mapa de produção; não é composição em
build time.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host | react-mfe-1 | host → remote | origem → destino | module-federation | Yes | Yes | host/webpack.config.js:42 (remote `reactMfe1@http://localhost:3001/remoteEntry.js`, dev); host/webpack.config.js:36 (remote `reactMfe1@/react-mfe-1/remoteEntry.js`, prod); host/webpack.config.js:80-82 (`ModuleFederationPlugin` com `remotes`); react-mfe-1/webpack.config.js:45-54 (`name: 'reactMfe1'`, `filename: 'remoteEntry.js'`, expõe `./mount`); react-mfe-1/webpack.config.js:17 (porta 3001) | host/src/App.jsx:32; host/src/App.jsx:61; host/src/App.jsx:178; react-mfe-1/src/mount.js:11 |
| 2 | host | react-mfe-2 | host → remote | origem → destino | module-federation | Yes | Yes | host/webpack.config.js:43 (remote `reactMfe2@http://localhost:3002/remoteEntry.js`, dev); host/webpack.config.js:37 (remote `reactMfe2@/react-mfe-2/remoteEntry.js`, prod); host/webpack.config.js:80-82 (`ModuleFederationPlugin` com `remotes`); react-mfe-2/webpack.config.js:43-47 (`name: 'reactMfe2'`, `filename: 'remoteEntry.js'`, expõe `./mount`); react-mfe-2/webpack.config.js:16 (porta 3002) | host/src/App.jsx:33; host/src/App.jsx:61; host/src/App.jsx:178; react-mfe-2/src/mount.js:7 |
| 3 | host | vue-mfe | host → remote | origem → destino | module-federation | Yes | Yes | host/webpack.config.js:44 (remote `vueMfe@http://localhost:3003/remoteEntry.js`, dev); host/webpack.config.js:38 (remote `vueMfe@/vue-mfe/remoteEntry.js`, prod); host/webpack.config.js:80-82 (`ModuleFederationPlugin` com `remotes`); vue-mfe/webpack.config.js:59-63 (`name: 'vueMfe'`, `filename: 'remoteEntry.js'`, expõe `./mount`); vue-mfe/webpack.config.js:18 (porta 3003) | host/src/App.jsx:34; host/src/App.jsx:61; vue-mfe/src/mount.js:10; host/src/App.jsx:178 |
| 4 | host | angular-mfe | host → remote | origem → destino | module-federation | Yes | Yes | host/webpack.config.js:30-32 (`promise import` de `/angular-mfe/remoteEntry.js` em prod e `http://localhost:4200/remoteEntry.js` em dev); host/webpack.config.js:39 e :45 (remote `angularMfe`); host/webpack.config.js:80-82 (`ModuleFederationPlugin` com `remotes`); angular-mfe/webpack.config.js:23-28 (`name: 'angularMfe'`, `filename: 'remoteEntry.js'`, expõe `./mount`); angular-mfe/webpack.config.js:36 (`publicPath: '/angular-mfe/'` em prod); angular-mfe/angular.json:54 (porta 4200) | host/src/App.jsx:35; host/webpack.config.js:32; host/src/App.jsx:61; angular-mfe/src/mount.ts:20; host/src/App.jsx:178 |
| 5 | host | https://multibank-1.onrender.com/ | page → embedded-frontend | origem → destino | iframe | No | Yes | — | host/src/App.jsx:97; host/src/App.jsx:38 |
| 6 | host | https://route-map-five.vercel.app/ | page → embedded-frontend | origem → destino | iframe | No | Yes | — | host/src/App.jsx:97; host/src/App.jsx:38 |

## Observações

**1. host → react-mfe-1.** O remote `reactMfe1` do host corresponde à unidade react-mfe-1 pelo
`name` e pelo `remoteEntry.js` (react-mfe-1/webpack.config.js:45-48) e pelo módulo `./mount`
exposto (react-mfe-1/webpack.config.js:52-54), que é o importado em host/src/App.jsx:32. O caminho
de produção `/react-mfe-1/` coincide com o subdiretório para onde o build da unidade é copiado
(package.json:11); a porta 3001 só corrobora. Ativa: o host invoca o loader e chama `mount` com o
container (host/src/App.jsx:59-61) quando a rota `/react-mfe-1` é aberta (host/src/App.jsx:178-188),
e o remote cria a raiz React no elemento recebido, com o store próprio (react-mfe-1/src/mount.js:11-18).

**2. host → react-mfe-2.** Mesmo padrão da relação 1: `reactMfe2` e `./mount` em
react-mfe-2/webpack.config.js:43-47 correspondem ao remote do host (host/webpack.config.js:37, 43) e
ao import de host/src/App.jsx:33; o subdiretório `/react-mfe-2/` vem da cópia em package.json:11.
A função montada é react-mfe-2/src/mount.js:7-14.

**3. host → vue-mfe.** `vueMfe` e `./mount` em vue-mfe/webpack.config.js:59-63 correspondem ao remote
do host (host/webpack.config.js:38, 44) e ao import de host/src/App.jsx:34. Do lado do remote,
`mount` cria uma aplicação Vue isolada e a monta no elemento do host (vue-mfe/src/mount.js:8-11).
Na coluna Código, vue-mfe/src/mount.js:10 vem antes de host/src/App.jsx:178 porque segue a ordem da
revisão de código-fonte (primeira tabela, depois a segunda).

**4. host → angular-mfe.** O host não escreve `angularMfe@url` como nos outros remotes: declara a
chave `angularMfe` com um `promise import(...)` do `remoteEntry.js` (host/webpack.config.js:30-32,
39, 45). A correspondência vem do nome da chave igual ao `name: 'angularMfe'` do remote
(angular-mfe/webpack.config.js:24) e, em produção, do caminho `/angular-mfe/`, que é o `publicPath`
do remote (angular-mfe/webpack.config.js:36) e o subdiretório da cópia (package.json:11). O
`mount` cria um `<app-root>` dentro do elemento do host e faz o bootstrap de `AppModule` só na
primeira chamada (angular-mfe/src/mount.ts:18-32); numa segunda visita à rota o elemento é recriado,
mas o bootstrap não se repete. A análise é estática e não verifica se a tela reaparece nesse caso;
isso não muda a relação.

**5. host → https://multibank-1.onrender.com/.** O destino é a URL de `IFRAME_NAV`
(host/src/App.jsx:40), aberta pelo `<iframe src={url}>` de `IframeView` (host/src/App.jsx:97-98) na
rota `/multibank` (host/src/App.jsx:191-197). Está em outro domínio e não há unidade correspondente
no snapshot, por isso No snapshot `No`. Ativa `Yes` porque as duas linhas da revisão de código-fonte
que a sustentam são `Yes`. Não há configuração nem contrato além da URL. Destino escrito como
aparece no artefato.

**6. host → https://route-map-five.vercel.app/.** Igual à relação 5, com a URL de
host/src/App.jsx:39 e a rota `/route-map`. As mesmas duas linhas de código sustentam as relações 5
e 6, porque um só componente e uma só lista servem aos dois destinos; por isso o empate na ordem foi
resolvido pelo Destino em ordem alfabética.

## Resumo

Relações: 6 (host → remote: 4, page → embedded-frontend: 2). Ativas: 6. Destino fora do snapshot: 2.
Unidades sem relação: nenhuma.
