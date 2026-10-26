---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | vite.config.ts:28 | . | none | No | `await import('vitest/config')` no arquivo de configuração do Vite, só fora de produção, para ler `coverageConfigDefaults.exclude` (vite.config.ts:24-32); configuração de build/teste, não carrega outra unidade. |
| src-lifecycles | server/e2e-plugin/main.js:9 | . | runtime-composition | No | Texto do `single-spa-react` (`singleSpaReact(opts)`) dentro do bundle UMD compilado do plugin de demonstração, artefato de outro repositório (server/README.md:3); o arquivo só é servido pelo servidor de testes e2e (server/e2e-test-server.js:16-20, server/e2e-settings.json:10) e nenhum build do host o usa (entrada index.html:32). |
| src-lifecycles | src/state/actions/loadMicroFrontends.tsx:31 | . | runtime-composition | Yes | `singleSpa.registerApplication(name, () => loadReactApp(name), activityFn)` registra cada plugin habilitado do `settings.json` (loadMicroFrontends.tsx:52-60), com o objeto de lifecycles lido de `window[name]` (loadMicroFrontends.tsx:19-23) e ativação pelas rotas que o plugin registra em `singleSpaPluginRoutes` (loadMicroFrontends.tsx:34-48; preenchidas em src/state/reducers/scigateway.reducer.tsx:140-145). Ativa: `loadMicroFrontends.init(settings.plugins)` em src/state/actions/scigateway.actions.tsx:363, dentro de `configureSite` despachado em src/App.tsx:50. Alvo: plugins externos (ex.: `demo_plugin`, public/settings.example.json:17-18). |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.test.tsx:104 | . | none | No | `createElement('script')` do resultado esperado num teste do componente de cookies; arquivo de teste. |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.test.tsx:108 | . | none | No | Segundo script esperado no mesmo teste; arquivo de teste. |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.tsx:54 | . | none | No | Injeta o script do Google Analytics (`https://www.googletagmanager.com/gtag/js?id=...`, cookieConsent.component.tsx:53-56) após consentimento; biblioteca de terceiros, não outra unidade. |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.tsx:58 | . | none | No | Script inline de configuração do `gtag` (cookieConsent.component.tsx:58-60); não é composição. |
| src-dynamic-script | src/state/actions/loadMicroFrontends.tsx:9 | . | script-loading | Yes | `runScript` cria um `<script src=url>` e o anexa ao `body` (loadMicroFrontends.tsx:7-16); chamado por `loadApp` com o `src` de cada plugin (loadMicroFrontends.tsx:27-28, 60) antes do `registerApplication`. Alvo: bundles externos dos plugins (ex.: `http://localhost:5001/main.js`, public/settings.example.json:18). |
| src-html-external-script | index.html:18 | . | none | No | `<script src="https://unpkg.com/react@18/umd/react.production.min.js">`, com fallback local (index.html:19-22); carrega uma biblioteca de CDN, não o bundle de outra unidade. O bundle UMD do plugin de demonstração lê `React` do escopo global (server/e2e-plugin/main.js:1, `N(k.demo_plugin={},k.React,k.ReactDOM)`); ver Notas. |
| src-html-external-script | index.html:23 | . | none | No | Mesmo caso para `react-dom@18` UMD, com fallback local (index.html:24-29); biblioteca de CDN. |
| src-iframe | src/accessibilityPage/contactUs.component.tsx:45 | . | none | No | `<iframe title="Contact Us" src={props.contactUsAccessibilityFormUrl}>` embute um formulário de contato configurado no settings (contactUs.component.tsx:42-51); não é outra unidade frontend. |
| src-cross-unit-communication | server/e2e-plugin/main.js:20 | . | communication | No | `document.dispatchEvent(new CustomEvent("scigateway", ...))` do plugin de demonstração (`register_route`, `notification`, `invalidate_token`) no bundle compilado de outro repositório; arquivo usado só pelo servidor de testes e2e (server/e2e-test-server.js:16-20) e por nenhum build do host. |
| src-cross-unit-communication | src/App.test.tsx:110 | . | none | No | `document.dispatchEvent` num teste do `App`; arquivo de teste. |
| src-cross-unit-communication | src/App.test.tsx:111 | . | none | No | `new CustomEvent('scigateway', ...)` do mesmo teste; arquivo de teste. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:35 | . | communication | No | Dispara `NotificationType` no canal `scigateway` quando falha a configuração OIDC (baseAPIAuthProvider.tsx:31-45); quem trata é o próprio host, em `listenToPlugins` (src/state/middleware/scigateway.middleware.tsx:166-188, toast/Redux). Uso interno do canal pela unidade. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:36 | . | communication | No | `new CustomEvent('scigateway', { detail: { type: NotificationType ... } })` do mesmo disparo (baseAPIAuthProvider.tsx:36-44); consumido pelo próprio host. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:63 | . | communication | No | `NotificationType` quando falha a busca dos provedores OIDC (baseAPIAuthProvider.tsx:61-74); consumido pelo próprio host (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:64 | . | communication | No | `new CustomEvent` do mesmo disparo (baseAPIAuthProvider.tsx:64-73); consumido pelo próprio host. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:160 | . | communication | No | `NotificationType` quando falha a verificação do `state` OIDC (baseAPIAuthProvider.tsx:159-171); consumido pelo próprio host (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:161 | . | communication | No | `new CustomEvent` do mesmo disparo (baseAPIAuthProvider.tsx:161-170); consumido pelo próprio host. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:192 | . | communication | No | `NotificationType` quando falha a verificação do nonce OIDC (baseAPIAuthProvider.tsx:191-203); consumido pelo próprio host (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:193 | . | communication | No | `new CustomEvent` do mesmo disparo (baseAPIAuthProvider.tsx:193-202); consumido pelo próprio host. |
| src-cross-unit-communication | src/authentication/baseAuthProvider.tsx:61 | . | communication | Yes | `logOut()` dispara `BroadcastSignOutType` (`scigateway:api:signout`, src/state/scigateway.types.tsx:28) no canal `scigateway` (baseAuthProvider.tsx:57-64); o host ignora esse tipo no seu listener (src/state/middleware/scigateway.middleware.tsx:111-112), então o destino são os plugins que escutam o canal. Alvo: plugins externos. |
| src-cross-unit-communication | src/authentication/baseAuthProvider.tsx:62 | . | communication | Yes | `new CustomEvent('scigateway', { detail: { type: BroadcastSignOutType } })` do mesmo aviso de logout aos plugins (baseAuthProvider.tsx:61-63). |
| src-cross-unit-communication | src/authentication/icatAuthProvider.tsx:17 | . | communication | No | `NotificationType` quando falha a busca dos autenticadores ICAT (icatAuthProvider.tsx:15-28); consumido pelo próprio host (src/state/middleware/scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/icatAuthProvider.tsx:18 | . | communication | No | `new CustomEvent` do mesmo disparo (icatAuthProvider.tsx:18-27); consumido pelo próprio host. |
| src-cross-unit-communication | src/state/actions/loadMicroFrontends.tsx:67 | . | communication | No | `NotificationType` quando falha a carga de um plugin (loadMicroFrontends.tsx:64-78); quem mostra o erro é o próprio host (src/state/middleware/scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/actions/loadMicroFrontends.tsx:68 | . | communication | No | `new CustomEvent('scigateway', ...)` do mesmo disparo (loadMicroFrontends.tsx:68-77); consumido pelo próprio host. |
| src-cross-unit-communication | src/state/actions/scigateway.actions.test.tsx:457 | . | none | No | `new CustomEvent('test', ...)` passado a um handler em teste; arquivo de teste. |
| src-cross-unit-communication | src/state/actions/scigateway.actions.tsx:465 | . | communication | No | `displayMaintenanceBanner` dispara `NotificationType` no canal `scigateway` (scigateway.actions.tsx:460-477) para o banner de manutenção; consumido pelo próprio host (src/state/middleware/scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/actions/scigateway.actions.tsx:466 | . | communication | No | `new CustomEvent('scigateway', ...)` do mesmo disparo (scigateway.actions.tsx:466-475); consumido pelo próprio host. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:369 | . | none | No | `new CustomEvent('test', ...)` passado ao handler em teste; arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:379 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:407 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:424 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:459 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:495 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:529 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:553 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:572 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:590 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:609 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:628 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:647 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:666 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:687 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:700 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:708 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:725 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:742 | . | none | No | Idem, arquivo de teste. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:34 | . | communication | Yes | `broadcastToPlugins` define o envio de ações Redux aos plugins pelo canal `scigateway` (`microFrontendMessageId`, scigateway.middleware.tsx:31-37), usado pelo `ScigatewayMiddleware` para toda ação com `payload.broadcast` (scigateway.middleware.tsx:242-244). O mesmo canal recebe as mensagens dos plugins em `listenToPlugins` (`document.addEventListener(microFrontendMessageId, handler)`, scigateway.middleware.tsx:232), registrado em src/App.tsx:47. Alvo: plugins externos. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:35 | . | communication | Yes | `new CustomEvent(microFrontendMessageId, { detail: action })` do mesmo `broadcastToPlugins` (scigateway.middleware.tsx:34-36). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:193 | . | communication | Yes | Após `refresh()` do token pedido por um plugin (`InvalidateTokenType`, scigateway.middleware.tsx:189-192), dispara `TokenRefreshedType` no canal (scigateway.middleware.tsx:193-199); o host ignora esse tipo no próprio listener (scigateway.middleware.tsx:108-109), então o destino são os plugins. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:194 | . | communication | Yes | `new CustomEvent(microFrontendMessageId, { detail: { type: TokenRefreshedType } })` do mesmo aviso aos plugins (scigateway.middleware.tsx:194-198). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:205 | . | communication | No | Se o refresh falha, reenvia no canal a notificação recebida do plugin como `NotificationType` (scigateway.middleware.tsx:201-213); quem a trata é o próprio host (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:206 | . | communication | No | `new CustomEvent` do mesmo disparo (scigateway.middleware.tsx:206-211); consumido pelo próprio host. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:302 | . | communication | No | `autoLoginMiddleware` dispara `NotificationType` quando o auto-login falha (scigateway.middleware.tsx:299-312); consumido pelo próprio host (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:303 | . | communication | No | `new CustomEvent` do mesmo disparo (scigateway.middleware.tsx:303-311); consumido pelo próprio host. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/state/actions/scigateway.actions.tsx:391 | . | runtime-composition | Yes | `singleSpa.start()` inicia o single-spa, que monta os plugins registrados cuja rota está ativa, depois de `loadMicroFrontends.init` (scigateway.actions.tsx:363-367). Esta chamada fica no `handler` do canal `scigateway`, quando a URL atual não é do host nem de plugin conhecido e chega o `RegisterRouteType` de um plugin para ela (scigateway.actions.tsx:371-394). Ativa a partir de `configureSite` (src/App.tsx:50). |
| manual | src/state/actions/scigateway.actions.tsx:401 | . | runtime-composition | Yes | `singleSpa.start()` no `setTimeout` de 3 s do mesmo caso (scigateway.actions.tsx:396-403): se nenhum plugin registrou a rota da URL atual a tempo, remove o `handler` e inicia o single-spa mesmo assim, montando os plugins registrados. Ativa a partir de `configureSite` (src/App.tsx:50). |
| manual | src/state/actions/scigateway.actions.tsx:408 | . | runtime-composition | Yes | `singleSpa.start()` no ramo `else` (scigateway.actions.tsx:406-409), quando a URL atual é do host, da manutenção ou de um plugin já conhecido; inicia o single-spa direto, sem esperar `RegisterRouteType`. Ativa a partir de `configureSite` (src/App.tsx:50). |
| manual | src/state/middleware/scigateway.middleware.tsx:156 | . | runtime-composition | Yes | Ao receber `RegisterRouteType` de um plugin, se a URL atual é da rota registrada e o plugin está `NOT_LOADED`, chama `singleSpa.triggerAppChange()` para o single-spa carregar e montar o plugin (scigateway.middleware.tsx:149-157). |
| manual | src/routing/routing.component.tsx:165 | . | runtime-composition | Yes | `singleSpa.unloadApplication(pluginConf.plugin)` força o single-spa a recarregar um plugin cujo contêiner ainda mostra o preloader (routing.component.tsx:148-174). |
| manual | src/routing/routing.component.tsx:268 | . | host-relationship | Yes | Tabela de rotas do host para os plugins registrados: cada `plugin.link` vira uma `<Route>` cujo elemento é o contêiner `<div id={plugin.plugin}>` (`PluginPlaceHolder`, routing.component.tsx:113-124) onde o single-spa monta o plugin (routing.component.tsx:263-280); `props.plugins` vem do estado (routing.component.tsx:289), preenchido pelas mensagens `RegisterRouteType` dos plugins. Ativa: `Routing` em src/pageContainer.component.tsx:50. |
| manual | src/adminPage/adminPage.component.tsx:132 | . | host-relationship | Yes | Rotas das abas de administração dos plugins: para cada plugin e aba (`getAdminPluginRoutes`, adminPage.component.tsx:25-50), uma `<Route>` com `<PluginPlaceHolder id={pluginName} />` (adminPage.component.tsx:130-149); a página é roteada em src/routing/routing.component.tsx:205-208. |

## Resumo

Construções com composição: 15 (runtime-composition: 6, script-loading: 1, communication: 6, host-relationship: 2).

## Notas

- O canal `scigateway` (`CustomEvent` em `document`) é o barramento entre o host e os plugins. Os disparos do host com `NotificationType` foram anotados `No` porque o consumidor é o próprio `listenToPlugins` do host (src/state/middleware/scigateway.middleware.tsx:166-188), que mostra o toast e grava no Redux; os disparos de tipos que o host ignora no próprio listener (`BroadcastSignOutType`, `TokenRefreshedType`, scigateway.middleware.tsx:108-112) e o `broadcastToPlugins` foram anotados `Yes`. Plugins fora do snapshot podem também escutar notificações, mas nenhum código aberto mostra isso: o plugin de demonstração só reage a `plugin_rerender` (server/e2e-plugin/main.js:20).
- As assinaturas do canal (`document.addEventListener(microFrontendMessageId, handler)` em scigateway.middleware.tsx:232 e `document.addEventListener('scigateway', handler)` em src/state/actions/scigateway.actions.tsx:405) não casaram com `src-cross-unit-communication` porque o nome do evento é variável ou não tem `[A-Z:_-]`; não viram linha por serem pontos de uso do mecanismo já registrado.
- `index.html:18` e `index.html:23` carregam React e ReactDOM UMD de CDN, que o host não usa (o Vite empacota o React, vite.config.ts:35-54 sem `external`), mas que o bundle UMD do plugin espera no escopo global (server/e2e-plugin/main.js:1). Anotados `none` como biblioteca de CDN; é um mecanismo de dependência compartilhada por global.
- Os plugins são declarados em `settings.json` de runtime (public/settings.example.json:15-22, `enable: false`; server/e2e-settings.json:7-14 para os testes e2e); arquivos JSON de configuração, não viraram linha. Unidades alvo (plugins) ficam fora do snapshot.
- `server/e2e-plugin/main.js` é o bundle compilado do plugin de demonstração de outro repositório (server/README.md:3), servido só nos testes e2e; suas linhas foram anotadas `No`.
