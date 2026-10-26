---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
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

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Leitura do repositório

Cinco projetos npm sem workspace: um host React e quatro remotes, dois React, um Vue e um Angular (#31 a #35). A raiz só orquestra a instalação, o build e a cópia dos `dist` (#30). A cadeia de Module Federation está completa:
- **Dependência:** só o Angular declara uma tecnologia de MFE, `@angular-architects/module-federation` (#1). Os outros quatro projetos usam o `ModuleFederationPlugin` do próprio webpack, sem dependência própria.
- **Configuração:** cada remote se declara, gera `remoteEntry.js` e expõe `./mount` (#2, #4 a #6). O host nomeia os quatro remotes, por porta local no desenvolvimento e por subcaminho do mesmo domínio em produção (#3). O Angular entra por `promise import(...)` (#11).
- **Código:** o host importa `<remote>/mount` numa lista de navegação (#7 a #10), gera uma rota por entrada (#27) e chama `mount(container)` com a função recebida (#19). Cada remote implementa o mesmo contrato `mount(element)` com o seu framework (#23, #25, #28, #29).
- **Relações:** isso resulta em quatro relações host → remote ativas (#36 a #39).

Ao lado do núcleo federado, o host mostra duas aplicações externas em `<iframe>`, declaradas numa lista própria (#24, #26). São duas relações ativas com destino fora do snapshot (#40, #41), sem contrato além da URL.

Sinais que enganam: o padrão da mineração casou com sete linhas de comentário que descrevem as construções em prosa (#12 a #14, #20 a #22), e o `import('./bootstrap')` das unidades é interno a cada uma (#15 a #18).

O que fica ambíguo é a publicação. Os cinco builds são separados (#42 a #46), mas há dois caminhos de publicação na Vercel, um `vercel.json` por diretório e o da raiz com o `dist` conjunto, e o snapshot não diz qual está em uso. O README descreve só o conjunto (#71, corroborada em parte), e um comentário do host descreve um terceiro arranjo, por variáveis de ambiente, que o código não usa (#75). O histórico mostra que os `vercel.json` por diretório são de um estágio anterior ao arranjo num só domínio (#79). A documentação confere com os artefatos em quase toda a composição (#48, #51, #56, #57, #62 a #64). Erra na contagem de aplicações (#50), no `publicPath` do Angular (#74, esclarecido em #81) e no compartilhamento do Vue (#78). O histórico não explica a origem da contagem nem a do comentário do Vue (#80, #82).

## Observações

### 1. angular-mfe/package.json:21

**Observação:** `@angular-architects/module-federation` (`^16.0.4`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do remote Angular.

### 2. angular-mfe/webpack.config.js:1-38

**Observação:** Configuração parcial, mesclada à do Angular CLI. `withModuleFederationPlugin` declara `name: 'angularMfe'`, `filename: 'remoteEntry.js'` e `exposes: { './mount': './src/mount.ts' }`, com `shared` de `shareAll` em singleton, sem `zone.js`. Em produção, `publicPath` fica `'/angular-mfe/'`; no desenvolvimento, `'auto'`.

**Interpretação:** O remote Angular está configurado como container de Module Federation e oferece sua função de montagem a um host.

**Nota:** O `angular-mfe/angular.json`, citado nas mesmas tabelas, só aponta o builder genérico `@angular-builders/custom-webpack` para este arquivo (`customWebpackConfig.path`, :13-17), e o target `serve` aponta para o `build`. Nenhum dos dois declara elemento da composição, e por isso não viraram observação.

### 3. host/webpack.config.js:1-96

**Observação:** `angularRemote` é `promise import('/angular-mfe/remoteEntry.js')` em produção e `promise import('http://localhost:4200/remoteEntry.js')` no desenvolvimento. O mapa `remotes` de produção declara `reactMfe1@/react-mfe-1/remoteEntry.js`, `reactMfe2@/react-mfe-2/remoteEntry.js`, `vueMfe@/vue-mfe/remoteEntry.js` e `angularMfe`; o de desenvolvimento usa as portas 3001 a 3003 e o mesmo `angularMfe`. `ModuleFederationPlugin` com `name: 'host'`, esses `remotes` e `shared` com `react`, `react-dom` e `react-redux` em singleton e `@reduxjs/toolkit` com `singleton: false`.

**Interpretação:** A configuração do host declara as quatro unidades locais como remotes e onde encontrá-las em cada ambiente.

### 4. react-mfe-1/webpack.config.js:1-69

**Observação:** `ModuleFederationPlugin` com `name: 'reactMfe1'`, `filename: 'remoteEntry.js'`, `exposes: { './mount': './src/mount.js' }` e o mesmo `shared` do host. `publicPath: 'auto'`; `devServer` na porta 3001.

**Interpretação:** A unidade está configurada como remote e oferece sua função de montagem a um host.

### 5. react-mfe-2/webpack.config.js:1-60

**Observação:** `ModuleFederationPlugin` com `name: 'reactMfe2'`, `filename: 'remoteEntry.js'`, `exposes: { './mount': './src/mount.js' }` e o mesmo `shared` do host. `publicPath: 'auto'`; `devServer` na porta 3002.

**Interpretação:** A unidade está configurada como remote e oferece sua função de montagem a um host.

### 6. vue-mfe/webpack.config.js:1-76

**Observação:** `ModuleFederationPlugin` com `name: 'vueMfe'`, `filename: 'remoteEntry.js'`, `exposes: { './mount': './src/mount.js' }` e `shared: { vue: { singleton: true } }`. `publicPath: 'auto'`; `devServer` na porta 3003.

**Interpretação:** A unidade está configurada como remote e oferece sua função de montagem a um host.

### 7. host/src/App.jsx:32

**Observação:** `{ label: 'React MFE 1', key: '/react-mfe-1', loader: () => import('reactMfe1/mount'), ... }`, em `MFE_NAV`.

**Interpretação:** O host carrega em runtime o módulo exposto pelo react-mfe-1, pelo nome dele, e o associa a um caminho.

### 8. host/src/App.jsx:33

**Observação:** `{ label: 'React MFE 2', key: '/react-mfe-2', loader: () => import('reactMfe2/mount'), ... }`, em `MFE_NAV`.

**Interpretação:** O host carrega em runtime o módulo exposto pelo react-mfe-2, pelo nome dele.

### 9. host/src/App.jsx:34

**Observação:** `{ label: 'Vue MFE', key: '/vue-mfe', loader: () => import('vueMfe/mount'), ... }`, em `MFE_NAV`.

**Interpretação:** O host carrega em runtime o módulo exposto pelo vue-mfe, pelo nome dele.

### 10. host/src/App.jsx:35

**Observação:** `{ label: 'Angular MFE', key: '/angular-mfe', loader: () => import('angularMfe/mount'), ... }`, em `MFE_NAV`.

**Interpretação:** O host carrega em runtime o módulo exposto pelo angular-mfe, pelo nome dele.

### 11. host/webpack.config.js:32

**Observação:** `` : `promise import('http://localhost:4200/remoteEntry.js')`; ``, valor de `angularRemote` no desenvolvimento, usado no mapa `remotes`.

**Interpretação:** O host resolve o `remoteEntry.js` do angular-mfe por import dinâmico, e não por script clássico.

### 12. react-mfe-1/src/mount.js:3

**Observação:** `// The host calls: import('reactMfe1/mount').then(({ default: mount }) => mount(element))`.

**Interpretação:** É comentário que descreve em prosa a chamada do host; não é código.

### 13. react-mfe-1/webpack.config.js:51

**Observação:** `// Host uses it as: import('reactMfe1/mount')`.

**Interpretação:** É comentário sobre o campo `exposes`; não é código.

### 14. host/src/index.js:5

**Observação:** `// By using import('./bootstrap'), we ensure everything is initialized before`.

**Interpretação:** É comentário que explica o bootstrap assíncrono; não é código.

### 15. host/src/index.js:7

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno ao host.

### 16. react-mfe-1/src/index.js:3

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 17. react-mfe-2/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 18. vue-mfe/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 19. host/src/App.jsx:61

**Observação:** `mount(container);`, dentro de `MfeContainer`, depois de `loader().then(({ default: mount }) => ...)` (:59-60). O `loader` chega por prop.

**Interpretação:** O host monta no próprio `div` a unidade remota que a rota lhe passa.

### 20. react-mfe-1/src/mount.js:3

**Observação:** A mesma linha de comentário de #12, encontrada por outro padrão.

**Interpretação:** É comentário; não é código.

### 21. react-mfe-1/webpack.config.js:9

**Observação:** ` *   2. Exposes the ./mount module so the host can call mount(element)`.

**Interpretação:** É comentário do cabeçalho da configuração; não é código.

### 22. vue-mfe/src/mount.js:4

**Observação:** `// app.mount(element) renders it into the container element provided by the host.`.

**Interpretação:** É comentário que descreve a montagem; não é código.

### 23. vue-mfe/src/mount.js:10

**Observação:** `app.mount(element);`, dentro de `const mount = (element) =>` (:8-11), exportado como `default`.

**Interpretação:** O remote Vue monta a própria aplicação no elemento que o host fornece.

### 24. host/src/App.jsx:97

**Observação:** `<iframe src={url}>`, em `IframeView({ url })` (:95-103).

**Interpretação:** O host embute por iframe a aplicação cuja URL recebe.

### 25. angular-mfe/src/mount.ts:20

**Observação:** `const mount = (element: HTMLElement): void =>` cria um `<app-root>` dentro do elemento e faz o bootstrap de `AppModule` só na primeira chamada (:20-32), exportado como `default`.

**Interpretação:** O remote Angular monta a própria aplicação no elemento que o host fornece.

### 26. host/src/App.jsx:38-41

**Observação:** `IFRAME_NAV` declara `Route Map` em `/route-map` com `url: 'https://route-map-five.vercel.app/'` e `Multibank` em `/multibank` com `url: 'https://multibank-1.onrender.com/'`.

**Interpretação:** O host declara as duas aplicações externas que embute e em que rota.

### 27. host/src/App.jsx:178-188

**Observação:** `MFE_NAV.map(({ key, loader }) => <Route path={key} element={... <MfeContainer loader={loader} /> ...} />)`.

**Interpretação:** A tabela de rotas do host liga o caminho de cada unidade remota ao seu carregador.

### 28. react-mfe-1/src/mount.js:11

**Observação:** `const mount = (element) =>` cria a raiz React no elemento e renderiza o `App` com o store da unidade (:11-18), exportado como `default`.

**Interpretação:** O remote monta a própria aplicação no elemento que o host fornece.

### 29. react-mfe-2/src/mount.js:7

**Observação:** `const mount = (element) =>` cria a raiz React no elemento e renderiza o `App` (:7-14), exportado como `default`.

**Interpretação:** O remote monta a própria aplicação no elemento que o host fornece.

### 30. .; package.json:1-17; vercel.json:2-3

**Observação:** É o manifesto da raiz, sem workspace, com scripts que instalam, iniciam, constroem e copiam os cinco projetos (:7-12), e o `vercel.json` que publica o `dist` combinado. Não tem entrada nem configuração de build próprias.

**Interpretação:** É a raiz de coordenação, não uma unidade frontend.

### 31. angular-mfe; angular-mfe/package.json; angular-mfe/angular.json:12-20; angular-mfe/src/main.ts:7-9; angular-mfe/vercel.json:2-3

**Observação:** É uma aplicação Angular com manifesto, target `build` com saída `dist/angular-mfe`, entrada `src/main.ts` e `ng build` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 32. host; host/package.json:8; host/webpack.config.js:49; host/src/index.js:7; host/vercel.json:2-3

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio, no papel de host.

### 33. react-mfe-1; react-mfe-1/package.json:8; react-mfe-1/webpack.config.js:12; react-mfe-1/src/index.js:3; react-mfe-1/vercel.json:2-3

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 34. react-mfe-2; react-mfe-2/package.json:8; react-mfe-2/webpack.config.js:11; react-mfe-2/src/index.js:1; react-mfe-2/vercel.json:2-3

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 35. vue-mfe; vue-mfe/package.json:8; vue-mfe/webpack.config.js:13; vue-mfe/src/index.js:1; vue-mfe/vercel.json:2-3

**Observação:** É uma aplicação Vue com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 36. host/src/App.jsx:32, 61, 178; react-mfe-1/src/mount.js:11; host/webpack.config.js:36, 42, 80-82; react-mfe-1/webpack.config.js:45-54

**Observação:** O host importa `reactMfe1/mount`, chama a função com o seu `div` quando a rota `/react-mfe-1` é aberta, e o remote cria ali a raiz React. O remote `reactMfe1` aponta para `/react-mfe-1/remoteEntry.js` ou `localhost:3001/remoteEntry.js`, e o nome e o `./mount` exposto correspondem aos do react-mfe-1.

**Interpretação:** É uma relação host → remote ativa.

### 37. host/src/App.jsx:33, 61, 178; react-mfe-2/src/mount.js:7; host/webpack.config.js:37, 43, 80-82; react-mfe-2/webpack.config.js:43-47

**Observação:** Mesma forma de #36, com `reactMfe2/mount`, a rota `/react-mfe-2` e os endereços `/react-mfe-2/remoteEntry.js` ou `localhost:3002/remoteEntry.js`.

**Interpretação:** É uma relação host → remote ativa.

### 38. host/src/App.jsx:34, 61, 178; vue-mfe/src/mount.js:10; host/webpack.config.js:38, 44, 80-82; vue-mfe/webpack.config.js:59-63

**Observação:** Mesma forma de #36, com `vueMfe/mount`, a rota `/vue-mfe` e os endereços `/vue-mfe/remoteEntry.js` ou `localhost:3003/remoteEntry.js`. O remote monta uma aplicação Vue no elemento do host.

**Interpretação:** É uma relação host → remote ativa, entre frameworks diferentes.

### 39. host/src/App.jsx:35, 61, 178; host/webpack.config.js:30-32, 39, 45, 80-82; angular-mfe/src/mount.ts:20; angular-mfe/webpack.config.js:23-28, 36

**Observação:** O host importa `angularMfe/mount` e o resolve por `promise import(...)` de `/angular-mfe/remoteEntry.js` ou `localhost:4200/remoteEntry.js`. A chave coincide com `name: 'angularMfe'`, e o caminho de produção, com o `publicPath` do remote. O `mount` faz o bootstrap de `AppModule` no elemento do host.

**Interpretação:** É uma relação host → remote ativa, entre frameworks diferentes.

### 40. host/src/App.jsx:38, 40, 97, 191-197

**Observação:** A entrada `Multibank` de `IFRAME_NAV` liga `/multibank` a um `<iframe src="https://multibank-1.onrender.com/">`. Não há configuração nem outro contrato além da URL, e o destino não está no snapshot.

**Interpretação:** É uma relação por iframe ativa, com destino externo.

### 41. host/src/App.jsx:38-39, 97, 191-197

**Observação:** A entrada `Route Map` de `IFRAME_NAV` liga `/route-map` a um `<iframe src="https://route-map-five.vercel.app/">`. Não há configuração nem outro contrato além da URL, e o destino não está no snapshot.

**Interpretação:** É uma relação por iframe ativa, com destino externo.

### 42. angular-mfe/angular.json:12-18; angular-mfe/package.json:8; angular-mfe/vercel.json:2-3; package.json:9, 11; vercel.json:2-3

**Observação:** `ng build` com saída própria em `dist/angular-mfe`. O `vercel.json` do diretório publica só esse `dist`; o da raiz publica-o copiado para `dist/angular-mfe`, junto com os outros quatro.

**Interpretação:** Há uma fronteira de build própria. Continuam plausíveis duas leituras do deploy, por projeto Vercel próprio ou conjunto num só domínio; o `publicPath` fixo do Angular só funciona no conjunto.

### 43. host/webpack.config.js:48-49; host/package.json:8; host/vercel.json:2-3; package.json:10, 11; vercel.json:2-3

**Observação:** `webpack --mode production` com configuração e `dist` próprios. O `vercel.json` do diretório publica só esse `dist`; o da raiz o põe na raiz do `dist` combinado. Os remotes de produção estão gravados no build como caminhos do mesmo domínio.

**Interpretação:** Há uma fronteira de build própria, com deploy indeterminado entre os dois caminhos.

### 44. react-mfe-1/webpack.config.js:11-12; react-mfe-1/package.json:8; react-mfe-1/vercel.json:2-18; package.json:9, 11; vercel.json:2-3

**Observação:** `webpack --mode production` com `dist` próprio. O `vercel.json` do diretório o publica à parte, com CORS para o `remoteEntry.js`; o da raiz o publica em `/react-mfe-1/` do `dist` combinado.

**Interpretação:** Há uma fronteira de build própria, com deploy indeterminado entre os dois caminhos.

### 45. react-mfe-2/webpack.config.js:10-11; react-mfe-2/package.json:8; react-mfe-2/vercel.json:2-18; package.json:9, 11; vercel.json:2-3

**Observação:** Mesmo arranjo de #44, com o subdiretório `/react-mfe-2/`.

**Interpretação:** Há uma fronteira de build própria, com deploy indeterminado entre os dois caminhos.

### 46. vue-mfe/webpack.config.js:12-13; vue-mfe/package.json:8; vue-mfe/vercel.json:2-18; package.json:9, 11; vercel.json:2-3

**Observação:** Mesmo arranjo de #44, com vue-loader e o subdiretório `/vue-mfe/`.

**Interpretação:** Há uma fronteira de build própria, com deploy indeterminado entre os dois caminhos.

### 47. README.md:3

**Observação:** "Live Demo → https://microfrontend-beta.vercel.app".

**Interpretação:** Dá o endereço publicado da aplicação. Nenhum artefato do snapshot registra esse domínio, e a afirmação fica sem corroboração.

### 48. README.md:5-6

**Observação:** "A hands-on example showing how to build a **Microfrontend architecture** with **Webpack 5 Module Federation**".

**Interpretação:** Apresenta o repositório como arquitetura de micro-frontends com Module Federation. A afirmação é corroborada.

### 49. README.md:6

**Observação:** "independent apps".

**Interpretação:** Afirma que as aplicações são independentes. Confirma-se para as cinco locais; as duas externas não têm artefato no snapshot. A afirmação é corroborada em parte.

### 50. README.md:6-7

**Observação:** "one host shell and five child apps (React, Vue, Angular, and two external apps)".

**Interpretação:** Conta as aplicações filhas do host. O host tem seis destinos, quatro remotes locais e duas aplicações externas, e a afirmação é contradita.

### 51. README.md:7-8

**Observação:** "all stitched together at runtime in a single browser window".

**Interpretação:** Afirma que o host compõe as aplicações em runtime na mesma página. A afirmação é corroborada.

### 52. README.md:42-58

**Observação:** Diagrama "Host App (http://localhost:3005)" contendo "React MFE", "Angular MFE", "React MFE2" e "Vue MFE".

**Interpretação:** Descreve o host com os quatro remotes locais. A afirmação é corroborada.

### 53. README.md:64-66

**Observação:** "Create each app independently" / "Each MFE was created as a standalone app".

**Interpretação:** Afirma que cada aplicação roda sozinha. A afirmação é corroborada.

### 54. README.md:67-70

**Observação:** "`react-mfe-1` and `react-mfe-2` — plain React + Babel + Webpack. `vue-mfe` — Vue 3 + vue-loader + Webpack. `angular-mfe` — Angular CLI 16 + `@angular-architects/module-federation`. `host` — React + Webpack".

**Interpretação:** Nomeia a pilha de cada aplicação. A afirmação é corroborada.

### 55. README.md:74-75

**Observação:** "Every MFE's `webpack.config.js` was given a `ModuleFederationPlugin` block that **exposes** a `mount` function".

**Interpretação:** Afirma que cada remote expõe uma função `mount` por Module Federation. A afirmação é corroborada.

### 56. README.md:89-91

**Observação:** "Each MFE exports a `mount(element)` function" / "This is the **contract** between every MFE and the host — framework-agnostic".

**Interpretação:** Descreve o contrato comum entre o host e os remotes. A afirmação é corroborada.

### 57. README.md:119

**Observação:** "`host/webpack.config.js` declares the MFEs as **remotes**".

**Interpretação:** Afirma que a configuração do host declara os remotes. A afirmação é corroborada.

### 58. README.md:136-137

**Observação:** "`react-router-dom` v6 was added to the host so each MFE (and external app) gets its own URL route".

**Interpretação:** Afirma que cada aplicação composta tem uma rota no host. A afirmação é corroborada.

### 59. README.md:142-143

**Observação:** "A root `package.json` uses `concurrently` to start all five apps with a single command".

**Interpretação:** Descreve uma conveniência de desenvolvimento da raiz. A afirmação é corroborada.

### 60. README.md:153-189

**Observação:** Árvore com "host/ ← Shell/container (React + react-router-dom)", "react-mfe-1/ ← React MFE — Counter app", "react-mfe-2/ ← React MFE — User Greeting", "vue-mfe/ ← Vue 3 MFE — Theme Switcher" e "angular-mfe/ ← Angular 16 MFE — Fun Facts".

**Interpretação:** Descreve o shell e os quatro remotes, cada um num diretório. A afirmação é corroborada.

### 61. README.md:195-196

**Observação:** "The host (`host/`) is the **only app the user ever visits** directly".

**Interpretação:** Afirma que o host é a página de entrada da composição. A afirmação é corroborada.

### 62. README.md:201

**Observação:** "Declaring which MFEs exist and their routes | `App.jsx` → `MFE_NAV` array".

**Interpretação:** Afirma que uma lista do host declara os remotes e as rotas. A afirmação é corroborada.

### 63. README.md:202

**Observação:** "Dynamically loading an MFE when its route is visited | `App.jsx` → `<MfeContainer>`".

**Interpretação:** Afirma que o host carrega cada remote quando a rota é aberta. A afirmação é corroborada.

### 64. README.md:203

**Observação:** "Embedding external apps as iframes | `App.jsx` → `IFRAME_NAV` + `<IframeView>`".

**Interpretação:** Afirma que o host embute as aplicações externas por iframe. A afirmação é corroborada.

### 65. README.md:205

**Observação:** "Sharing React so it isn't loaded twice | `webpack.config.js` → `shared`".

**Interpretação:** Afirma que o React é compartilhado entre as unidades. A afirmação é corroborada.

### 66. README.md:244-264

**Observação:** Diagrama "MfeContainer calls: import('reactMfe1/mount') [...] (webpack resolves the remote at runtime) [...] Fetches: http://localhost:3001/remoteEntry.js [...] Calls: mount(containerDiv)".

**Interpretação:** Descreve o fluxo de carga de um remote pelo host. A afirmação é corroborada.

### 67. README.md:342-343

**Observação:** "MFEs must be started **before** you click their route in the host. If an MFE is not running you will see a friendly error — the host will not crash."

**Interpretação:** Afirma que o host trata a falha de carga de um remote. A afirmação é corroborada; o comportamento não foi executado.

### 68. README.md:357-370

**Observação:** "**Only one file to edit:** `host/src/App.jsx`" / "The `<Header>`, `<IframeView>`, and `<Route>` are all generated automatically from the array."

**Interpretação:** Afirma que acrescentar uma aplicação por iframe só exige uma entrada na lista do host. A afirmação é corroborada.

### 69. README.md:398-436

**Observação:** "Register the new MFE in the host's webpack config [...] Add the route in `host/src/App.jsx` [...] restart the host".

**Interpretação:** Afirma que um remote novo exige mudar e reiniciar o host. A afirmação é corroborada.

### 70. README.md:489

**Observação:** "All five apps are built into a **single `dist/` folder**".

**Interpretação:** Afirma que os cinco builds são reunidos num só diretório. A afirmação é corroborada.

### 71. README.md:489-490

**Observação:** "deployed as one Vercel project".

**Interpretação:** Afirma que a publicação é única. A configuração dessa publicação existe, mas cada diretório também tem a sua, e o snapshot não diz qual está em uso. A afirmação é corroborada em parte.

### 72. README.md:490-511

**Observação:** "The build pipeline (in `package.json → build:all`) is: 1. npm run build inside react-mfe-1 → react-mfe-1/dist/ [...] 5. npm run build inside host → host/dist/ 6. copy:dist merges everything into one dist/".

**Interpretação:** Descreve builds separados, depois juntados num diretório. A afirmação é corroborada.

### 73. README.md:513-514

**Observação:** "The host's `webpack.config.js` uses **relative URLs** in production so no environment variables are needed".

**Interpretação:** Afirma que, em produção, o host resolve os remotes por caminhos do mesmo domínio. A afirmação é corroborada.

### 74. README.md:528-529

**Observação:** "Each MFE webpack config also sets `publicPath: 'auto'` so JavaScript chunks load from the correct subdirectory path at runtime."

**Interpretação:** Afirma que todos os remotes usam `publicPath: 'auto'`. O Angular fixa `/angular-mfe/` em produção, e a afirmação é contradita.

### 75. host/webpack.config.js:8-14

**Observação:** "Production : read from environment variables set in each Vercel project / REACT_MFE1_URL → deployed URL of react-mfe-1 (e.g. https://react-mfe-1.vercel.app)".

**Interpretação:** Afirma que, em produção, o host lê o endereço de cada remote de um projeto Vercel próprio. O código não lê essas variáveis, e a afirmação é contradita.

### 76. host/webpack.config.js:26-28

**Observação:** "outputs an ES Module (remoteEntry.js ends with `export { get, init }`)".

**Interpretação:** Afirma o formato do `remoteEntry.js` do Angular. Nenhum artefato do snapshot mostra a saída, e a afirmação fica sem corroboração.

### 77. host/webpack.config.js:29

**Observação:** "Using `promise import(...)` tells webpack to load it via dynamic import() instead."

**Interpretação:** Explica a forma de declarar o remote Angular. A afirmação é corroborada.

### 78. vue-mfe/webpack.config.js:10

**Observação:** "Shares the \"vue\" package so only one copy of Vue runs at a time".

**Interpretação:** Afirma que o Vue é compartilhado entre unidades. Nenhuma outra unidade declara `vue`, e a afirmação é contradita.

### 79. 027c8f7 2026-04-11 (vercel.json dos cinco diretórios, host/webpack.config.js); 204f174 2026-04-11 (vercel.json); 50e2db2 2026-04-11 (vercel.json, package.json, cinco webpack.config.js); 444c709 2026-04-11 (README.md); 87ce05b 2026-04-11 (host/webpack.config.js)

**Observação:** Os cinco `vercel.json` por diretório são criados por `027c8f7` e não mudam depois. O da raiz vem com `204f174` e é alterado por `50e2db2`, "single-domain deployment - build all MFEs into one dist folder for Vercel". O README do snapshot é o de `444c709`. O conteúdo antigo de `host/webpack.config.js` não está no clone.

**Interpretação:** Os `vercel.json` por diretório são de um estágio anterior ao arranjo num só domínio, que é o mais recente. Não se sabe se os projetos separados continuaram publicados, e o deploy segue indeterminado. O ponto está esclarecido.

### 80. 20b10e1 2026-04-09 (cinco diretórios de aplicação); 444c709 2026-04-11 (README.md)

**Observação:** Os cinco diretórios de aplicação existem desde `20b10e1`, e nenhum commit cria ou remove outro. As versões anteriores do README e de `host/src/App.jsx` não estão no clone.

**Interpretação:** A contagem do README não vem de um estágio com outro número de aplicações locais. O histórico não diz se vem de outro número de aplicações externas. A dúvida é só sobre o passado; no snapshot, os seis destinos estão claros.

### 81. 444c709 2026-04-11 (README.md); 2e2f847 2026-04-12 (angular-mfe/webpack.config.js)

**Observação:** O README não muda depois de `444c709`. `2e2f847` tem a mensagem "set Angular publicPath to /angular-mfe/ in production to fix chunk 404s".

**Interpretação:** A frase do README é anterior à correção do Angular e não foi atualizada. O ponto está esclarecido.

### 82. 20b10e1 2026-04-09 (vue-mfe/webpack.config.js); 50e2db2 2026-04-11 (vue-mfe/webpack.config.js)

**Observação:** `vue-mfe/webpack.config.js` aparece em `20b10e1` e muda só em `50e2db2`. Nenhuma versão antiga dele nem da configuração do host está no clone.

**Interpretação:** Não se sabe se o comentário é resto de outro estágio, intenção ou explicação genérica. A dúvida é só sobre o passado; no snapshot, nenhuma outra unidade compartilha o Vue.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (angular-mfe/package.json:21) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #2 |
| 2 | 3.4.2 (angular-mfe/package.json:21, Evidência); 3.4.3 (angular-mfe, Marcadores); 3.4.4 (host/src/App.jsx:35 e angular-mfe/src/mount.ts:20, Observação); 3.4.5 #4 (Configuração); 3.4.6 #1 (Onde é servida); 3.4.7 #9, #28 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #31; configura #39 |
| 3 | 3.4.3 (host, Marcadores, Entrada e Build); 3.4.4 (host/webpack.config.js:32, Arquivo:linha e Observação; host/src/App.jsx:32-35, Observação); 3.4.5 #1-#4 (Configuração); 3.4.6 #1-#5 (Onde é servida) e #2 (Artefatos); 3.4.7 #2, #11, #19, #20, #21, #23, #27, #29, #31, #32 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #32; configura #36; configura #37; configura #38; configura #39 |
| 4 | 3.4.3 (react-mfe-1, Marcadores, Entrada e Build); 3.4.4 (react-mfe-1/webpack.config.js:9 e :51, Arquivo:linha e Observação; host/src/App.jsx:32 e react-mfe-1/src/mount.js:11, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Onde é servida e Artefatos); 3.4.7 #9, #19, #20, #28 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #33; configura #36 |
| 5 | 3.4.3 (react-mfe-2, Marcadores, Entrada e Build); 3.4.4 (host/src/App.jsx:33 e react-mfe-2/src/mount.js:7, Observação); 3.4.5 #2 (Configuração); 3.4.6 #4 (Onde é servida e Artefatos); 3.4.7 #9, #19, #28 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #34; configura #37 |
| 6 | 3.4.3 (vue-mfe, Marcadores, Entrada e Build); 3.4.4 (host/src/App.jsx:34 e vue-mfe/src/mount.js:10, Observação); 3.4.5 #3 (Configuração); 3.4.6 #5 (Onde é servida e Artefatos); 3.4.7 #9, #28, #32 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #35; configura #38 |
| 7 | 3.4.4 (host/src/App.jsx:32) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #36 |
| 8 | 3.4.4 (host/src/App.jsx:33) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #37 |
| 9 | 3.4.4 (host/src/App.jsx:34) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #38 |
| 10 | 3.4.4 (host/src/App.jsx:35) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #39 |
| 11 | 3.4.4 (host/webpack.config.js:32) | 3 código | configuração | module-federation | arquitetural | forte | implementa #39 |
| 12 | 3.4.4 (react-mfe-1/src/mount.js:3, src-remote-import) | 3 código | comentário | — | contexto | fraca | — |
| 13 | 3.4.4 (react-mfe-1/webpack.config.js:51) | 3 código | comentário | — | contexto | fraca | — |
| 14 | 3.4.4 (host/src/index.js:5) | 3 código | comentário | — | contexto | fraca | — |
| 15 | 3.4.4 (host/src/index.js:7) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 16 | 3.4.4 (react-mfe-1/src/index.js:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 17 | 3.4.4 (react-mfe-2/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 18 | 3.4.4 (vue-mfe/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 19 | 3.4.4 (host/src/App.jsx:61) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #36; implementa #37; implementa #38; implementa #39 |
| 20 | 3.4.4 (react-mfe-1/src/mount.js:3, src-mount-call) | 3 código | comentário | — | contexto | fraca | — |
| 21 | 3.4.4 (react-mfe-1/webpack.config.js:9) | 3 código | comentário | — | contexto | fraca | — |
| 22 | 3.4.4 (vue-mfe/src/mount.js:4) | 3 código | comentário | — | contexto | fraca | — |
| 23 | 3.4.4 (vue-mfe/src/mount.js:10) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #38 |
| 24 | 3.4.4 (host/src/App.jsx:97) | 3 código | código-fonte | iframe | tecnológica | moderada | implementa #40; implementa #41 |
| 25 | 3.4.4 (angular-mfe/src/mount.ts:20) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #39 |
| 26 | 3.4.4 (host/src/App.jsx:38) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #40; implementa #41 |
| 27 | 3.4.4 (host/src/App.jsx:178) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #36; implementa #37; implementa #38; implementa #39 |
| 28 | 3.4.4 (react-mfe-1/src/mount.js:11) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #36 |
| 29 | 3.4.4 (react-mfe-2/src/mount.js:7) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #37 |
| 30 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 31 | 3.4.3 (angular-mfe) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.3 (host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (react-mfe-1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 34 | 3.4.3 (react-mfe-2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 35 | 3.4.3 (vue-mfe) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 36 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #33 |
| 37 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #34 |
| 38 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #35 |
| 39 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #31 |
| 40 | 3.4.5 #5 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #32; liga host/src/App.jsx:40 |
| 41 | 3.4.5 #6 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #32; liga host/src/App.jsx:39 |
| 42 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #31 |
| 43 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #32 |
| 44 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #33 |
| 45 | 3.4.6 #4 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #34 |
| 46 | 3.4.6 #5 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #35 |
| 47 | 3.4.7 #1 | 7 documentação | documentação | — | contexto | fraca | — |
| 48 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #3; corrobora #36; corrobora #37; corrobora #38; corrobora #39 |
| 49 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #31; corrobora em parte #32; corrobora em parte #33; corrobora em parte #34; corrobora em parte #35 |
| 50 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #36; contradiz #37; contradiz #38; contradiz #39; contradiz #40; contradiz #41 |
| 51 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #37; corrobora #38; corrobora #39; corrobora #40; corrobora #41 |
| 52 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #37; corrobora #38; corrobora #39 |
| 53 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #32; corrobora #33; corrobora #34; corrobora #35 |
| 54 | 3.4.7 #8 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora react-mfe-1/package.json:12, 17-22; corrobora vue-mfe/package.json:11, 19-21; corrobora host/package.json:14, 27 |
| 55 | 3.4.7 #9 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #2; corrobora #4; corrobora #5; corrobora #6 |
| 56 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #19; corrobora #23; corrobora #25; corrobora #28; corrobora #29 |
| 57 | 3.4.7 #11 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3 |
| 58 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #27 |
| 59 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | corrobora package.json:8 |
| 60 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #32; corrobora #33; corrobora #34; corrobora #35 |
| 61 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #37; corrobora #38; corrobora #39; corrobora #40; corrobora #41; corrobora vercel.json:4-6 |
| 62 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #27 |
| 63 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #19; corrobora #27 |
| 64 | 3.4.7 #18 | 7 documentação | documentação | iframe | arquitetural | fraca | corrobora #24; corrobora #26; corrobora #40; corrobora #41 |
| 65 | 3.4.7 #19 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #3; corrobora #4; corrobora #5 |
| 66 | 3.4.7 #20 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #7; corrobora #19; corrobora #3; corrobora #4; corrobora #36 |
| 67 | 3.4.7 #21 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #3; corrobora host/src/App.jsx:59-68, 78-86 |
| 68 | 3.4.7 #22 | 7 documentação | documentação | iframe | arquitetural | fraca | corrobora #26; corrobora #40; corrobora #41 |
| 69 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #43; corrobora package.json:8 |
| 70 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #42; corrobora #43; corrobora #44; corrobora #45; corrobora #46; corrobora package.json:11-12 |
| 71 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte vercel.json:2-3 |
| 72 | 3.4.7 #26 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #42; corrobora #43; corrobora #44; corrobora #45; corrobora #46; corrobora package.json:9-12 |
| 73 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3 |
| 74 | 3.4.7 #28 | 7 documentação | documentação | — | tecnológica | fraca | contradiz #2 |
| 75 | 3.4.7 #29 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #3 |
| 76 | 3.4.7 #30 | 7 documentação | comentário | module-federation | tecnológica | fraca | — |
| 77 | 3.4.7 #31 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #11 |
| 78 | 3.4.7 #32 | 7 documentação | comentário | module-federation | tecnológica | fraca | contradiz #3; contradiz host/package.json:10-18 |
| 79 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #42; explica #43; explica #44; explica #45; explica #46; explica #71; explica #75 |
| 80 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #50 |
| 81 | 3.4.8 #3 | 8 histórico | histórico | — | tecnológica | fraca | explica #74 |
| 82 | 3.4.8 #4 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #78 |

## Resumo

Observações: 82. Dimensões (tecnologia: 1, configuração: 5, código: 23, estrutura: 6, composição: 6, build-deploy: 5, documentação: 32, histórico: 4). Força (forte: 14, moderada: 20, fraca: 48, ambígua: 0). Evidência (tecnológica: 25, arquitetural: 48, contexto: 9).
