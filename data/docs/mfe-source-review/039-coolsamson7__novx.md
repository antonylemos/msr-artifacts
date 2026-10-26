---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:11 | — | none | No | `declare function __webpack_init_sharing__(scope: string): Promise<void>` apenas declara o tipo do global do Module Federation para o TypeScript, sob o comentário "Webpack MF globals" (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:9); não executa resolução remota — a chamada é que está em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:12 | — | none | No | `declare const __webpack_share_scopes__: { default: unknown }` apenas declara o tipo do global; não executa resolução remota — o uso que resolve o escopo compartilhado está em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46 | — | remote-resolution | Yes | `await __webpack_init_sharing__('default')` inicializa o escopo compartilhado antes de inicializar o container do remote (`remoteContainer.init` em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54); chamado por `loadRemoteModule` em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:67 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54 | — | remote-resolution | Yes | `await remoteContainer.init(__webpack_share_scopes__.default)` inicializa o container MF do escopo obtido em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:47; no snapshot o escopo é `microfrontend` (apps/app/src/environments/environments.ts:8, apps/microfrontend/webpack.config.js:54) |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57 | — | remote-resolution | Yes | Define `loadRemoteModule(scope, module, url)`, que carrega o `remoteEntry.js` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:66), inicializa o container (:67) e obtém a factory do módulo exposto (:69-73); chamada em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106 e :137 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106 | — | remote-resolution | Yes | `RemoteComponentLoader.loadRemoteModule(feature.module!, './Module', feature.uri!)` resolve o módulo `./Module` exposto pela outra unidade (apps/microfrontend/webpack.config.js:56-57); `module`/`uri` vêm do manifesto remoto (libs/portal/src/lib/deployment-manager.ts:193-196) |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137 | — | remote-resolution | Yes | `loadRemoteModule(feature.module!, './${feature.component}', feature.uri!)` resolve o componente exposto pela outra unidade e o atribui a `outlet.component`; no snapshot, `MicrofrontendFeature` (apps/microfrontend/public/manifest.json:10, apps/microfrontend/webpack.config.js:58) |
| src-dynamic-script | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32 | — | script-loading | Yes | `document.createElement('script')` injeta o bundle `${url}/remoteEntry.js` da outra unidade (`script.src` em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:33, `document.head.appendChild` em :41); a URL é montada em libs/portal/src/lib/outlet-loader/remote-component-loader.ts:66 a partir do `uri` do remote (apps/app/src/environments/environments.ts:8) |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/app/src/environments/environments.ts:8 | apps/app | host-relationship | Yes | `{ name: 'microfrontend', url: 'http://localhost:3001' }` declara, no código do shell, qual aplicação remota ele usa e onde; o deployment ativo é `microfrontend` (apps/app/src/environments/environments.ts:2) e a lista é consumida em apps/app/src/module.ts:226 |
| manual | libs/portal/src/lib/loader/remote-loader.ts:28 | — | remote-resolution | Yes | ``fetch(`${remote.url}/manifest.json`)`` resolve o manifesto da outra unidade (apps/microfrontend/public/manifest.json:1-28) e grava `id`/`uri`/`module` do remote (libs/portal/src/lib/loader/remote-loader.ts:39-41), que depois alimentam `feature.module`/`feature.uri` (libs/portal/src/lib/deployment-manager.ts:193-196); a lista de remotes vem do shell, que instancia o loader em apps/app/src/module.ts:226 — essa linha é só a passagem da lista, que o construtor guarda em `this.remoteUrls` (libs/portal/src/lib/loader/remote-loader.ts:16-17), sem registrar nem resolver nada; o loader é passado ao `DeploymentManager` em apps/app/src/module.ts:233-241 e acionado em apps/app/src/module.ts:262 (`loadDeployment`); não é pego pelos padrões `src-*` porque usa `fetch` |
| manual | libs/portal/src/lib/feature-outlet.tsx:245 | — | runtime-composition | Yes | `<LoadedWrapper Component={Loaded} feature={feature} />` monta no host o componente que os loaders carregaram (libs/portal/src/lib/feature-outlet.tsx:154, :183); no caminho federado esse componente vem do remote (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137) e é renderizado com o `Environment` do módulo remoto (libs/portal/src/lib/feature-outlet.tsx:230, :244) |

## Resumo

Construções com composição: 9 (remote-resolution: 6, script-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notas

- Todas as ocorrências `src-*` do `matches.csv` estão em `libs/portal`, que a revisão estrutural julgou `No` (biblioteca publicada no npm); por isso a Unidade dessas linhas é `—`. O mecanismo de composição é o framework, e a instância é o par apps/app + apps/microfrontend, como a classificação já observa (docs/mfe-classification/039-coolsamson7__novx.md, "Ponto para revisão conjunta").
- A cadeia que confirma que o loader está ativo: `RemoteComponentLoader` se registra em `OutletLoader.loaders` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:16-18), é importado pelo shell (apps/app/src/module.ts:16, :317), e os loaders são executados pelo outlet em libs/portal/src/lib/feature-outlet.tsx:149-154, dentro das rotas construídas em libs/portal/src/lib/route-manager.tsx:211-217 e renderizadas pelo shell em apps/app/src/app/App.tsx:39.
- `loadRemoteEntry` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:28 e a chamada em :66) não aparece no `matches.csv` porque o padrão `src-load-remote` casa `loadRemote(` e `loadRemoteModule`, não `loadRemoteEntry(`. É passo intermediário do mesmo mecanismo já registrado (linhas :57, :32), e por isso ficou na Observação dessas linhas, sem virar linha própria.
- Falsos positivos descartados na busca do passo 4: `import("./FormatterRegistry")` em libs/i18n/src/lib/format/registerFormatter.decorator.ts:5 (módulo local da própria biblioteca) e `import(`./showcases/${filename}?raw`)` em apps/app/src/showcase.tsx:498 (carrega arquivos de documentação da própria unidade). `React.lazy` só aparece comentado em libs/portal/src/lib/deployment-manager.ts:106.
- Nada no snapshot define ou consome custom element, `<iframe>`, `postMessage`, `BroadcastChannel` ou `CustomEvent`. `libs/communication` trata de endpoints HTTP para o servidor (apps/app/src/module.ts:245-250), não de comunicação entre unidades frontend.
- `apps/microfrontend` só expõe `./Module` e `./MicrofrontendFeature` (apps/microfrontend/webpack.config.js:56-58); a exposição é configuração de build e os `export` correspondentes (apps/microfrontend/src/feature.tsx:30) não viram linha.
