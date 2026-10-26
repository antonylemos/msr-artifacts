---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
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

# 257 — ral-facilities/scigateway

## Leitura do repositório

O snapshot contém uma única unidade frontend de fonte: o host SciGateway, React + Vite, com entrada, build e imagem próprios (#69, #72). A dependência single-spa (#1) é usada no registro parametrizado dos plugins (#6). As configurações nomeiam `demo_plugin`: o exemplo o desabilita (#3), enquanto o settings e2e o habilita em `/plugins/e2e-plugin/main.js` (#2). A relação #70 reúne carga por script, leitura de lifecycles no global, registro single-spa, ativação por rotas enviadas pelos plugins e contêineres na casca. O plugin é construído em outro repositório; o bundle presente serve aos testes e2e, sem virar outra unidade estrutural de fonte.

A comunicação usa `CustomEvent` no canal `scigateway` (#71): o host envia ações e avisos, e os plugins enviam rotas, notificações e pedidos de renovação de token. As duas tabelas de rotas ligam caminhos aos contêineres dos plugins (#67, #68). As chamadas genéricas que recebem nomes ou URLs por parâmetro sustentam o mecanismo; a identidade concreta das unidades vem das configurações e das relações. As evidências descrevem os artefatos, sem executar build, testes ou deploy.

Imports de cobertura, scripts de analytics, bibliotecas React de CDN, iframe de contato, construções de teste e notificações consumidas pelo próprio host não estabelecem outras unidades ou relações de composição. As linhas do bundle externo permanecem com o escopo `Composição No` registrado em 3.4.4, embora seu conteúdo ajude a contextualizar o contrato com o plugin. A documentação situa a aplicação-mãe (#77) e corrobora os mecanismos, mas seus enunciados têm força fraca. O comentário sobre passagem de store e `globalEventDistributor` é contradito (#89); as afirmações sobre stores, subrotas administrativas e settings externos têm corroboração parcial (#90, #84, #95). Os pontos históricos (#97–#99) não explicam conclusivamente a origem dessas afirmações, por indisponibilidade dos conteúdos antigos, mas não deixam em aberto a composição host–plugins demonstrada no snapshot.

## Observações

### 1. package.json:50

**Observação:** O manifesto declara `single-spa` na seção `dependencies`, na versão `6.0.3`.

**Interpretação:** A declaração sinaliza a tecnologia single-spa; o uso e a ligação com plugins exigem os artefatos de código e configuração.

### 2. server/e2e-settings.json:7-14

**Observação:** A lista `plugins` contém `demo_plugin`, com `src: /plugins/e2e-plugin/main.js`, `enable: true` e `location: main`.

**Interpretação:** A configuração de runtime dos testes e2e nomeia uma unidade externa ao host e o endereço pelo qual seu bundle é carregado.

### 3. public/settings.example.json:15-22

**Observação:** A lista `plugins` contém `demo_plugin`, com `src: http://localhost:5001/main.js`, `enable: false` e `location: main`.

**Interpretação:** O exemplo declara a ligação do host com um plugin servido por URL. O plugin está desabilitado neste exemplo; a declaração não demonstra ativação de produção.

### 4. vite.config.ts:28; vite.config.ts:24-32

**Observação:** Fora de produção, a configuração importa `vitest/config` para obter `coverageConfigDefaults.exclude`.

**Interpretação:** O import dinâmico atende à cobertura de testes e não carrega uma unidade frontend.

### 5. server/e2e-plugin/main.js:9; server/README.md:3; server/e2e-test-server.js:16-20

**Observação:** O bundle UMD do plugin de demonstração contém a implementação de `single-spa-react` e `singleSpaReact(opts)`.

**Interpretação:** É um artefato compilado de outro repositório servido nos testes e2e. A revisão 3.4.4 marca a construção como Composição No por não integrar um build do host; a observação preserva esse escopo.

### 6. src/state/actions/loadMicroFrontends.tsx:31; src/state/actions/loadMicroFrontends.tsx:19-23; src/state/actions/loadMicroFrontends.tsx:27-60; src/state/actions/scigateway.actions.tsx:361-365; src/state/reducers/scigateway.reducer.tsx:140-145; src/App.tsx:50

**Observação:** `loadApp(name, appURL)` registra `name` no single-spa, obtém os lifecycles de `window[name]` e compara a URL com as rotas de `singleSpaPluginRoutes[name]`; `init` percorre os plugins habilitados recebidos de `settings.plugins`.

**Interpretação:** O código implementa o registro e a ativação de plugins no single-spa, com identidade recebida por parâmetro. A configuração identifica o destino concreto.

### 7. src/cookieConsent/cookieConsent.component.test.tsx:104-106

**Observação:** O teste cria um elemento `script` como parte do resultado esperado para a carga da biblioteca Google Analytics.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 8. src/cookieConsent/cookieConsent.component.test.tsx:108-113

**Observação:** O teste cria um elemento `script` como parte do resultado esperado para a configuração inline de `gtag`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 9. src/cookieConsent/cookieConsent.component.tsx:45-65

**Observação:** Após consentimento, o componente injeta um script com URL `https://www.googletagmanager.com/gtag/js?id=...`.

**Interpretação:** É integração de analytics, sem composição de outra unidade frontend.

### 10. src/cookieConsent/cookieConsent.component.tsx:45-66

**Observação:** Após consentimento, o componente cria um script inline para configurar `gtag`.

**Interpretação:** É integração de analytics, sem composição de outra unidade frontend.

### 11. src/state/actions/loadMicroFrontends.tsx:9; src/state/actions/loadMicroFrontends.tsx:7-16; src/state/actions/loadMicroFrontends.tsx:27-28; src/state/actions/loadMicroFrontends.tsx:56-60

**Observação:** `runScript(url)` cria um elemento `script`, atribui `url` a `src` e o anexa ao `body`; `loadApp` o chama com a URL recebida, e `init` passa `p.src` de cada plugin habilitado.

**Interpretação:** A carga de bundles externos implementa parte da composição, mas recebe a URL por parâmetro e não identifica sozinha uma unidade de destino.

### 12. index.html:18; index.html:19-22

**Observação:** O HTML carrega React 18 UMD de CDN, com fallback local.

**Interpretação:** A carga de uma biblioteca de CDN não estabelece uma relação entre unidades frontend.

### 13. index.html:23; index.html:24-29

**Observação:** O HTML carrega ReactDOM 18 UMD de CDN, com fallback local.

**Interpretação:** A carga de uma biblioteca de CDN não estabelece uma relação entre unidades frontend.

### 14. src/accessibilityPage/contactUs.component.tsx:45; src/accessibilityPage/contactUs.component.tsx:42-51

**Observação:** O componente renderiza um `iframe` com título `Contact Us` e `src` recebido em `contactUsAccessibilityFormUrl`.

**Interpretação:** O iframe embute um formulário de contato; a revisão de origem não o identifica como unidade frontend.

### 15. server/e2e-plugin/main.js:20; server/README.md:3; server/e2e-test-server.js:16-20

**Observação:** O bundle do plugin de demonstração despacha `CustomEvent` no canal `scigateway`, com mensagens de registro de rota, notificação e invalidação de token.

**Interpretação:** É um artefato compilado de outro repositório servido nos testes e2e. A revisão 3.4.4 marca a construção como Composição No por não integrar um build do host; a observação preserva esse escopo.

### 16. src/App.test.tsx:110-114

**Observação:** O teste do `App` despacha um `CustomEvent` `scigateway` com `registerRouteAction` em `detail`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 17. src/App.test.tsx:111-113

**Observação:** O teste do `App` constrói um `CustomEvent` `scigateway` com `registerRouteAction` em `detail`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 18. src/authentication/baseAPIAuthProvider.tsx:35; src/authentication/baseAPIAuthProvider.tsx:31-45; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a configuração OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 19. src/authentication/baseAPIAuthProvider.tsx:36; src/authentication/baseAPIAuthProvider.tsx:31-45; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a configuração OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 20. src/authentication/baseAPIAuthProvider.tsx:63; src/authentication/baseAPIAuthProvider.tsx:61-74; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a busca dos provedores OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 21. src/authentication/baseAPIAuthProvider.tsx:64; src/authentication/baseAPIAuthProvider.tsx:61-74; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a busca dos provedores OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 22. src/authentication/baseAPIAuthProvider.tsx:160; src/authentication/baseAPIAuthProvider.tsx:159-171; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a verificação de state OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 23. src/authentication/baseAPIAuthProvider.tsx:161; src/authentication/baseAPIAuthProvider.tsx:159-171; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a verificação de state OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 24. src/authentication/baseAPIAuthProvider.tsx:192; src/authentication/baseAPIAuthProvider.tsx:191-203; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a verificação de nonce OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 25. src/authentication/baseAPIAuthProvider.tsx:193; src/authentication/baseAPIAuthProvider.tsx:191-203; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a verificação de nonce OIDC falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 26. src/authentication/baseAuthProvider.tsx:61; src/authentication/baseAuthProvider.tsx:57-64; src/state/middleware/scigateway.middleware.tsx:108-112

**Observação:** `logOut()` dispara um `CustomEvent` no canal `scigateway`, com tipo `BroadcastSignOutType`.

**Interpretação:** O host avisa os plugins sobre logout pelo canal compartilhado; o próprio listener ignora esse tipo. A chamada não nomeia um plugin específico.

### 27. src/authentication/baseAuthProvider.tsx:62; src/authentication/baseAuthProvider.tsx:57-64; src/state/middleware/scigateway.middleware.tsx:108-112

**Observação:** `logOut()` dispara um `CustomEvent` no canal `scigateway`, com tipo `BroadcastSignOutType`.

**Interpretação:** O host avisa os plugins sobre logout pelo canal compartilhado; o próprio listener ignora esse tipo. A chamada não nomeia um plugin específico.

### 28. src/authentication/icatAuthProvider.tsx:17; src/authentication/icatAuthProvider.tsx:15-28; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a busca dos autenticadores ICAT falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 29. src/authentication/icatAuthProvider.tsx:18; src/authentication/icatAuthProvider.tsx:15-28; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a busca dos autenticadores ICAT falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 30. src/state/actions/loadMicroFrontends.tsx:67; src/state/actions/loadMicroFrontends.tsx:64-78; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a carga de um plugin falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 31. src/state/actions/loadMicroFrontends.tsx:68; src/state/actions/loadMicroFrontends.tsx:64-78; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a carga de um plugin falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 32. src/state/actions/scigateway.actions.test.tsx:457

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 33. src/state/actions/scigateway.actions.tsx:465; src/state/actions/scigateway.actions.tsx:460-477; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando o banner de manutenção é solicitado. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 34. src/state/actions/scigateway.actions.tsx:466; src/state/actions/scigateway.actions.tsx:460-477; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando o banner de manutenção é solicitado. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 35. src/state/middleware/scigateway.middleware.test.tsx:369

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 36. src/state/middleware/scigateway.middleware.test.tsx:379

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 37. src/state/middleware/scigateway.middleware.test.tsx:407

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `InvalidateTokenType`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 38. src/state/middleware/scigateway.middleware.test.tsx:423-430

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `InvalidateTokenType e payload`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 39. src/state/middleware/scigateway.middleware.test.tsx:458-462

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteActionWithHelp`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 40. src/state/middleware/scigateway.middleware.test.tsx:494-498

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteActionWithHelp`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 41. src/state/middleware/scigateway.middleware.test.tsx:528-532

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 42. src/state/middleware/scigateway.middleware.test.tsx:552-556

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `registerRouteAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 43. src/state/middleware/scigateway.middleware.test.tsx:572

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `notificationAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 44. src/state/middleware/scigateway.middleware.test.tsx:590

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `notificationAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 45. src/state/middleware/scigateway.middleware.test.tsx:609

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `notificationAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 46. src/state/middleware/scigateway.middleware.test.tsx:628

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `notificationAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 47. src/state/middleware/scigateway.middleware.test.tsx:647

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `notificationAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 48. src/state/middleware/scigateway.middleware.test.tsx:666

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `notificationAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 49. src/state/middleware/scigateway.middleware.test.tsx:687

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `requestPluginRerenderAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 50. src/state/middleware/scigateway.middleware.test.tsx:700

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `broadcastSignOutAction`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 51. src/state/middleware/scigateway.middleware.test.tsx:708

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `action`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 52. src/state/middleware/scigateway.middleware.test.tsx:725

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `detail indefinido`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 53. src/state/middleware/scigateway.middleware.test.tsx:742

**Observação:** O teste passa ao handler um `CustomEvent` de nome `test`, com `actionWithoutType: true`.

**Interpretação:** É uma construção de teste; a revisão de origem a registra sem participação na composição do runtime.

### 54. src/state/middleware/scigateway.middleware.tsx:34; src/state/middleware/scigateway.middleware.tsx:31-37; src/state/middleware/scigateway.middleware.tsx:242-244

**Observação:** `broadcastToPlugins` despacha um `CustomEvent` de nome `scigateway`, levando a ação Redux em `detail`; o middleware o chama para ações com `payload.broadcast`.

**Interpretação:** O mecanismo transmite ações do host aos plugins, recebendo a ação por parâmetro e sem nomear um destino concreto.

### 55. src/state/middleware/scigateway.middleware.tsx:35; src/state/middleware/scigateway.middleware.tsx:31-37; src/state/middleware/scigateway.middleware.tsx:242-244

**Observação:** `broadcastToPlugins` despacha um `CustomEvent` de nome `scigateway`, levando a ação Redux em `detail`; o middleware o chama para ações com `payload.broadcast`.

**Interpretação:** O mecanismo transmite ações do host aos plugins, recebendo a ação por parâmetro e sem nomear um destino concreto.

### 56. src/state/middleware/scigateway.middleware.tsx:193; src/state/middleware/scigateway.middleware.tsx:189-199; src/state/middleware/scigateway.middleware.tsx:108-109

**Observação:** Após a resolução de `refresh()` no tratamento de `InvalidateTokenType`, o host dispara `TokenRefreshedType` no canal `scigateway`.

**Interpretação:** O host devolve o aviso de renovação aos plugins pelo canal compartilhado; a chamada não nomeia um plugin específico.

### 57. src/state/middleware/scigateway.middleware.tsx:194; src/state/middleware/scigateway.middleware.tsx:189-199; src/state/middleware/scigateway.middleware.tsx:108-109

**Observação:** Após a resolução de `refresh()` no tratamento de `InvalidateTokenType`, o host dispara `TokenRefreshedType` no canal `scigateway`.

**Interpretação:** O host devolve o aviso de renovação aos plugins pelo canal compartilhado; a chamada não nomeia um plugin específico.

### 58. src/state/middleware/scigateway.middleware.tsx:205; src/state/middleware/scigateway.middleware.tsx:201-213; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a renovação de token falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 59. src/state/middleware/scigateway.middleware.tsx:206; src/state/middleware/scigateway.middleware.tsx:201-213; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando a renovação de token falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 60. src/state/middleware/scigateway.middleware.tsx:302; src/state/middleware/scigateway.middleware.tsx:299-312; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando o auto-login falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 61. src/state/middleware/scigateway.middleware.tsx:303; src/state/middleware/scigateway.middleware.tsx:299-312; src/state/middleware/scigateway.middleware.tsx:166-188

**Observação:** O host dispara `NotificationType` por `CustomEvent` no canal `scigateway` quando o auto-login falha. O listener do próprio host trata esse tipo com toast e atualização do Redux.

**Interpretação:** É uso interno do canal pela mesma unidade, sem ligação demonstrada a outra unidade frontend.

### 62. src/state/actions/scigateway.actions.tsx:391; src/state/actions/scigateway.actions.tsx:361-410; src/App.tsx:50

**Observação:** O handler chama `singleSpa.start()` quando chega o registro de rota que corresponde à URL atual, após o carregamento dos plugins.

**Interpretação:** A chamada inicia o orquestrador dos plugins registrados, sem nomear uma unidade concreta de destino.

### 63. src/state/actions/scigateway.actions.tsx:401; src/state/actions/scigateway.actions.tsx:361-410; src/App.tsx:50

**Observação:** O temporizador remove o handler e chama `singleSpa.start()` após 3 segundos de espera por uma rota ainda desconhecida.

**Interpretação:** A chamada inicia o orquestrador dos plugins registrados, sem nomear uma unidade concreta de destino.

### 64. src/state/actions/scigateway.actions.tsx:408; src/state/actions/scigateway.actions.tsx:361-410; src/App.tsx:50

**Observação:** O ramo alternativo chama `singleSpa.start()` imediatamente quando a URL é do host, da manutenção ou de um plugin conhecido.

**Interpretação:** A chamada inicia o orquestrador dos plugins registrados, sem nomear uma unidade concreta de destino.

### 65. src/state/middleware/scigateway.middleware.tsx:156; src/state/middleware/scigateway.middleware.tsx:149-157

**Observação:** No tratamento de `RegisterRouteType`, se o caminho atual coincide com a rota recebida e o plugin está `NOT_LOADED`, o middleware chama `singleSpa.triggerAppChange()`.

**Interpretação:** O mecanismo reavalia a ativação quando uma rota de plugin chega tarde; o plugin é recebido na mensagem.

### 66. src/routing/routing.component.tsx:165; src/routing/routing.component.tsx:148-174

**Observação:** O efeito procura o plugin correspondente ao caminho atual e chama `singleSpa.unloadApplication(pluginConf.plugin)` se encontra o contêiner com o preloader.

**Interpretação:** O host solicita recarga do plugin pelo nome recebido na configuração de rota, sem identificar aqui uma unidade específica.

### 67. src/routing/routing.component.tsx:268; src/routing/routing.component.tsx:113-124; src/routing/routing.component.tsx:263-280; src/pageContainer.component.tsx:50

**Observação:** A tabela de rotas percorre os plugins não administrativos e associa `plugin.link` ao componente que fornece o contêiner com ID `plugin.plugin`.

**Interpretação:** A rota vincula o caminho do plugin ao local de montagem no host, explicitando a ligação de composição mesmo com os nomes provenientes do estado.

### 68. src/adminPage/adminPage.component.tsx:132; src/adminPage/adminPage.component.tsx:25-50; src/adminPage/adminPage.component.tsx:130-149; src/routing/routing.component.tsx:205-208

**Observação:** Para cada plugin e aba administrativa, a página cria uma `Route` com o caminho correspondente e um `PluginPlaceHolder` cujo ID é `pluginName`.

**Interpretação:** A tabela vincula rotas administrativas aos contêineres de montagem dos plugins, estabelecendo a ligação entre casca e conteúdo externo.

### 69. .; index.html:32; src/main.tsx:6-9; package.json:57; vite.config.ts:35-54; Dockerfile:4-31; .github/workflows/docker-release-build.yml:42-46

**Observação:** A raiz tem entrada Vite em `index.html`, renderização React em `src/main.tsx`, script próprio de build e Dockerfile que empacota o resultado. Não há declaração de workspace.

**Interpretação:** A raiz é uma unidade frontend com entrada e build próprios; a revisão estrutural encontra uma aplicação no snapshot. O plugin externo não constitui outra unidade de fonte na árvore.

### 70. public/settings.example.json:15-22; server/e2e-settings.json:7-14; src/state/actions/loadMicroFrontends.tsx:7-60; src/state/actions/scigateway.actions.tsx:361-410; src/state/middleware/scigateway.middleware.tsx:149-157; src/routing/routing.component.tsx:113-124; src/routing/routing.component.tsx:148-174; src/routing/routing.component.tsx:263-280; src/adminPage/adminPage.component.tsx:130-149

**Observação:** O host carrega scripts dos plugins habilitados, lê seus lifecycles no global e os registra no single-spa. `demo_plugin` é nomeado nos dois settings, habilitado no e2e; a ativação usa as rotas registradas pelos plugins e as rotas do host oferecem os contêineres de montagem.

**Interpretação:** A relação ativa `root-config → application` liga o host à unidade externa `demo_plugin`, com carga por script e orquestração single-spa. O destino está fora do snapshot como unidade de fonte.

### 71. src/authentication/baseAuthProvider.tsx:61-63; src/state/middleware/scigateway.middleware.tsx:31-37; src/state/middleware/scigateway.middleware.tsx:94-115; src/state/middleware/scigateway.middleware.tsx:166-215; src/state/middleware/scigateway.middleware.tsx:232-244; src/state/actions/scigateway.actions.tsx:575-592; server/e2e-plugin/main.js:20; server/e2e-settings.json:7-14

**Observação:** O canal `scigateway` leva avisos e ações do host aos plugins. O listener recebe registro de rota, notificação e pedido de renovação; o bundle `demo_plugin` envia mensagens e escuta `plugin_rerender`.

**Interpretação:** A relação ativa de comunicação conecta bidirecionalmente o host e `demo_plugin` por eventos. O canal é fixo no código, e o envio do plugin é visível no bundle usado em e2e.

### 72. package.json:57; vite.config.ts:35-54; Dockerfile:4-31; Dockerfile:77; docker/docker-entrypoint.sh:3-17; .github/workflows/docker-release-build.yml:30-52; .github/workflows/release-build.yml:28-65; .github/workflows/ci-build.yml:62-71

**Observação:** O build executa TypeScript e Vite e gera `dist/`. O Dockerfile copia esse resultado para httpd, e os workflows publicam a imagem `scigateway` no Harbor e um tarball na release do GitHub. Os nomes e tags derivam da tag Git; o CI também constrói a imagem sem publicá-la.

**Interpretação:** Build e deploy separados delimitam o host: as duas formas de publicação contêm sua saída, sem construir os plugins externos. O versionamento da aplicação acompanha a tag do repositório.

### 73. .github/workflows/ci-build.yml:38

**Observação:** O comentário diz que o job constrói a imagem Docker para verificar que ela pode ser construída.

**Interpretação:** A afirmação descreve o build de validação da unidade, sem publicação nesse fluxo.

### 74. .github/workflows/docker-release-build.yml:13

**Observação:** O comentário diz que o job constrói a imagem e a envia ao Harbor se tiver sucesso.

**Interpretação:** A afirmação descreve a publicação da imagem do host.

### 75. Dockerfile:1

**Observação:** O comentário inicial apresenta o Dockerfile como forma de construir e servir o SciGateway.

**Interpretação:** A afirmação situa o empacotamento e a execução do host.

### 76. Dockerfile:30

**Observação:** O comentário diz que a saída do build é colocada num servidor Apache.

**Interpretação:** A afirmação descreve o destino da saída da unidade no estágio de execução.

### 77. README.md:5

**Observação:** O README apresenta o SciGateway como aplicação-mãe React de uma arquitetura de micro-frontends.

**Interpretação:** A afirmação situa a casca frontend em relação aos plugins externos.

### 78. README.md:11

**Observação:** O README informa que o projeto usa Vite.

**Interpretação:** A afirmação identifica a ferramenta de build; sozinha não mostra mecanismo de MFE nem ligação entre unidades.

### 79. README.md:36

**Observação:** O README diz que o build de produção gera a pasta `dist`.

**Interpretação:** A afirmação descreve a saída de build da unidade host.

### 80. demos/sprint2/plugin_route_registration.md:5

**Observação:** O roteiro apresenta a possibilidade de plugins registrarem novas rotas na aplicação-mãe.

**Interpretação:** A afirmação descreve o contrato plugin → host que alimenta a ativação e o roteamento.

### 81. demos/sprint2/plugin_route_registration.md:14

**Observação:** O roteiro diz que o link leva ao caminho registrado pelo evento e que o micro-frontend decide o conteúdo ali exibido.

**Interpretação:** A afirmação descreve a divisão entre roteamento da casca e conteúdo do plugin.

### 82. demos/sprint3/notifications_badge.md:13

**Observação:** O roteiro diz que notificações recebidas por um plugin devem ser encaminhadas ao SciGateway para o usuário agir.

**Interpretação:** A afirmação situa o fluxo de mensagens do plugin ao host.

### 83. server/README.md:3

**Observação:** O README do servidor diz que os arquivos em `e2e-plugin` são os artefatos de build do plugin de demonstração, com origem em outro repositório.

**Interpretação:** A afirmação delimita a origem externa do plugin e o caráter compilado do conteúdo incluído nos testes.

### 84. src/routing/routing.component.tsx:78-81

**Observação:** O comentário atribui ao próprio plugin os caminhos aninhados sob `/admin/path` e restringe o host às rotas de topo.

**Interpretação:** A parte do host é corroborada pela seleção de rotas e pelos contêineres administrativos. O tratamento interno dos subcaminhos não é confirmado, pois o código dos plugins está fora do snapshot.

### 85. src/routing/routing.component.tsx:120-121

**Observação:** O comentário do placeholder diz que mostra um indicador de carga enquanto o plugin monta e que o plugin o substitui na montagem.

**Interpretação:** A afirmação descreve o contêiner que a casca oferece à unidade externa.

### 86. src/routing/routing.component.tsx:148-149

**Observação:** O comentário diz que o efeito detecta quando o single-spa considera um plugin carregado mas o contêiner continua com o indicador, e chama `unloadApplication`.

**Interpretação:** A afirmação descreve o mecanismo de recuperação da montagem de plugins.

### 87. src/routing/routing.component.tsx:264

**Observação:** O comentário diz que plugins de administração são excluídos da tabela principal e roteados pela página administrativa.

**Interpretação:** A afirmação descreve as duas formas de alojar plugins na casca.

### 88. src/state/actions/loadMicroFrontends.tsx:20

**Observação:** O comentário diz que os plugins são carregados no `window` e definem o próprio nome de propriedade.

**Interpretação:** A afirmação descreve o contrato de resolução dos lifecycles pelo nome global.

### 89. src/state/actions/loadMicroFrontends.tsx:30

**Observação:** O comentário diz que o registro no single-spa passa referências ao store do aplicativo e ao `globalEventDistributor`.

**Interpretação:** A revisão documental considera a afirmação contradita: há registro, mas os três argumentos não passam store nem distribuidor. O comentário não demonstra esse desenho de comunicação.

### 90. src/state/actions/loadMicroFrontends.tsx:83

**Observação:** O comentário diz que a inicialização espera todos os stores carregarem e todos os aplicativos serem registrados no single-spa.

**Interpretação:** A espera pelo registro é corroborada pelo carregamento de scripts e pelo `Promise.all`; a carga explícita de stores não aparece. A revisão registra corroboração parcial.

### 91. src/state/actions/scigateway.actions.tsx:361

**Observação:** O comentário diz que são carregados os plugins definidos nos settings.

**Interpretação:** A afirmação vincula a inicialização do host à lista de unidades configuradas.

### 92. src/state/actions/scigateway.actions.tsx:368-369

**Observação:** O comentário diz que, numa URL ainda desconhecida do host e dos plugins, espera-se um registro de rota correspondente para evitar um 404 prematuro.

**Interpretação:** A afirmação descreve a coordenação temporal entre registro de rotas externas e início do single-spa.

### 93. src/state/middleware/scigateway.middleware.tsx:99

**Observação:** O comentário diz que mensagens válidas vão para o Redux da aplicação-mãe.

**Interpretação:** A afirmação descreve a recepção pelo host das mensagens dos plugins.

### 94. src/state/middleware/scigateway.middleware.tsx:102

**Observação:** O comentário diz que o listener ignora eventos enviados pela aplicação-mãe.

**Interpretação:** A afirmação descreve a distinção de sentidos no canal compartilhado entre host e plugins.

### 95. src/state/middleware/scigateway.middleware.tsx:148

**Observação:** O comentário atribui problemas de atraso de rotas ao carregamento lento dos arquivos de settings dos plugins.

**Interpretação:** A reação a rotas tardias é corroborada; a origem delas em arquivos de configuração externos não é demonstrada no snapshot. A revisão registra corroboração parcial.

### 96. src/state/middleware/scigateway.middleware.tsx:159

**Observação:** O comentário diz que as opções de tema são enviadas depois do registro.

**Interpretação:** A afirmação descreve o envio de tema do host aos plugins após o registro de rota.

### 97. 3f0c185 2024-11-11 (src/routing/routing.component.tsx); 4dcb3a2 2026-03-12 (src/routing/routing.component.tsx)

**Observação:** O log registra geração de abas administrativas em `3f0c185` e correção de roteamento em `4dcb3a2`. A tentativa de ler o roteador em `3f0c185` retornou `fatal: bad object`.

**Interpretação:** Não é possível determinar historicamente se a delegação de subrotas descreve um contrato cumprido pelos plugins ou apenas uma responsabilidade esperada. O ponto é inconclusivo, mas o limite do host e seu vínculo com plugins já estão demonstrados no snapshot; a dúvida não desfaz essa organização.

### 98. 336bf97 2019-03-26 (src/state/actions/loadMicroFrontends.tsx); d3eec25 2019-04-05 (src/state/actions/loadMicroFrontends.tsx)

**Observação:** O log registra a criação do carregador em `336bf97` e atualização do carregamento e tema em `d3eec25`. As tentativas de ler os dois conteúdos retornaram `fatal: bad object`.

**Interpretação:** O ponto permanece inconclusivo quanto à origem dos comentários sobre stores e distribuidor. Não se pode inferir remoção de um desenho anterior: o snapshot é claro sobre a carga por script e o registro sem esses argumentos.

### 99. 47bc22e 2022-03-11 (src/state/middleware/scigateway.middleware.tsx; src/state/actions/loadMicroFrontends.tsx)

**Observação:** A mensagem de `47bc22e` anuncia a mudança do local de `singleSpa.start` e a adição de `triggerAppChange` para plugins que carregam settings tarde. A leitura do middleware nesse commit retornou `fatal: bad object`.

**Interpretação:** A mensagem registra a motivação anunciada, mas não comprova como plugins externos liam settings. O ponto histórico fica inconclusivo; o snapshot já mostra a reação do host a rotas tardias, sem depender dessa causa.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:50) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #6; declara #62; declara #63; declara #64; declara #65; declara #66 |
| 2 | 3.4.4 (server/e2e-plugin/main.js:9, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | single-spa | arquitetural | forte | configura #6; configura #11; configura #70 |
| 3 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:31 e :9, Observação); 3.4.5 #1 (Configuração); 3.4.7 #19 (Evidência) | 2 configuração | configuração | single-spa | arquitetural | forte | configura #6; configura #11; configura #70 |
| 4 | 3.4.4 (vite.config.ts:28) | 3 código | configuração | — | contexto | fraca | — |
| 5 | 3.4.4 (server/e2e-plugin/main.js:9) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 6 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:31) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #70 |
| 7 | 3.4.4 (src/cookieConsent/cookieConsent.component.test.tsx:104) | 3 código | código-fonte | — | contexto | fraca | — |
| 8 | 3.4.4 (src/cookieConsent/cookieConsent.component.test.tsx:108) | 3 código | código-fonte | — | contexto | fraca | — |
| 9 | 3.4.4 (src/cookieConsent/cookieConsent.component.tsx:54) | 3 código | código-fonte | — | contexto | fraca | — |
| 10 | 3.4.4 (src/cookieConsent/cookieConsent.component.tsx:58) | 3 código | código-fonte | — | contexto | fraca | — |
| 11 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:9) | 3 código | código-fonte | script-loading | tecnológica | moderada | implementa #70 |
| 12 | 3.4.4 (index.html:18) | 3 código | código-fonte | — | contexto | fraca | — |
| 13 | 3.4.4 (index.html:23) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (src/accessibilityPage/contactUs.component.tsx:45) | 3 código | código-fonte | — | contexto | fraca | — |
| 15 | 3.4.4 (server/e2e-plugin/main.js:20) | 3 código | código-fonte | events | arquitetural | fraca | — |
| 16 | 3.4.4 (src/App.test.tsx:110) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (src/App.test.tsx:111) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:35) | 3 código | código-fonte | — | contexto | fraca | — |
| 19 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:36) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:63) | 3 código | código-fonte | — | contexto | fraca | — |
| 21 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:64) | 3 código | código-fonte | — | contexto | fraca | — |
| 22 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:160) | 3 código | código-fonte | — | contexto | fraca | — |
| 23 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:161) | 3 código | código-fonte | — | contexto | fraca | — |
| 24 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:192) | 3 código | código-fonte | — | contexto | fraca | — |
| 25 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:193) | 3 código | código-fonte | — | contexto | fraca | — |
| 26 | 3.4.4 (src/authentication/baseAuthProvider.tsx:61) | 3 código | código-fonte | events | tecnológica | moderada | implementa #71 |
| 27 | 3.4.4 (src/authentication/baseAuthProvider.tsx:62) | 3 código | código-fonte | events | tecnológica | moderada | implementa #71 |
| 28 | 3.4.4 (src/authentication/icatAuthProvider.tsx:17) | 3 código | código-fonte | — | contexto | fraca | — |
| 29 | 3.4.4 (src/authentication/icatAuthProvider.tsx:18) | 3 código | código-fonte | — | contexto | fraca | — |
| 30 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:67) | 3 código | código-fonte | — | contexto | fraca | — |
| 31 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:68) | 3 código | código-fonte | — | contexto | fraca | — |
| 32 | 3.4.4 (src/state/actions/scigateway.actions.test.tsx:457) | 3 código | código-fonte | — | contexto | fraca | — |
| 33 | 3.4.4 (src/state/actions/scigateway.actions.tsx:465) | 3 código | código-fonte | — | contexto | fraca | — |
| 34 | 3.4.4 (src/state/actions/scigateway.actions.tsx:466) | 3 código | código-fonte | — | contexto | fraca | — |
| 35 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:369) | 3 código | código-fonte | — | contexto | fraca | — |
| 36 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:379) | 3 código | código-fonte | — | contexto | fraca | — |
| 37 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:407) | 3 código | código-fonte | — | contexto | fraca | — |
| 38 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:424) | 3 código | código-fonte | — | contexto | fraca | — |
| 39 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:459) | 3 código | código-fonte | — | contexto | fraca | — |
| 40 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:495) | 3 código | código-fonte | — | contexto | fraca | — |
| 41 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:529) | 3 código | código-fonte | — | contexto | fraca | — |
| 42 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:553) | 3 código | código-fonte | — | contexto | fraca | — |
| 43 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:572) | 3 código | código-fonte | — | contexto | fraca | — |
| 44 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:590) | 3 código | código-fonte | — | contexto | fraca | — |
| 45 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:609) | 3 código | código-fonte | — | contexto | fraca | — |
| 46 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:628) | 3 código | código-fonte | — | contexto | fraca | — |
| 47 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:647) | 3 código | código-fonte | — | contexto | fraca | — |
| 48 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:666) | 3 código | código-fonte | — | contexto | fraca | — |
| 49 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:687) | 3 código | código-fonte | — | contexto | fraca | — |
| 50 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:700) | 3 código | código-fonte | — | contexto | fraca | — |
| 51 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:708) | 3 código | código-fonte | — | contexto | fraca | — |
| 52 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:725) | 3 código | código-fonte | — | contexto | fraca | — |
| 53 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:742) | 3 código | código-fonte | — | contexto | fraca | — |
| 54 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:34) | 3 código | código-fonte | events | tecnológica | moderada | implementa #71 |
| 55 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:35) | 3 código | código-fonte | events | tecnológica | moderada | implementa #71 |
| 56 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:193) | 3 código | código-fonte | events | tecnológica | moderada | implementa #71 |
| 57 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:194) | 3 código | código-fonte | events | tecnológica | moderada | implementa #71 |
| 58 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:205) | 3 código | código-fonte | — | contexto | fraca | — |
| 59 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:206) | 3 código | código-fonte | — | contexto | fraca | — |
| 60 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:302) | 3 código | código-fonte | — | contexto | fraca | — |
| 61 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:303) | 3 código | código-fonte | — | contexto | fraca | — |
| 62 | 3.4.4 (src/state/actions/scigateway.actions.tsx:391) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #70 |
| 63 | 3.4.4 (src/state/actions/scigateway.actions.tsx:401) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #70 |
| 64 | 3.4.4 (src/state/actions/scigateway.actions.tsx:408) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #70 |
| 65 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:156) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #70 |
| 66 | 3.4.4 (src/routing/routing.component.tsx:165) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #70 |
| 67 | 3.4.4 (src/routing/routing.component.tsx:268) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #70 |
| 68 | 3.4.4 (src/adminPage/adminPage.component.tsx:132) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #70 |
| 69 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 70 | 3.4.5 #1 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #69; liga server/README.md:3 |
| 71 | 3.4.5 #2 | 5 composição | código-fonte | events | arquitetural | forte | liga #69; liga server/e2e-plugin/main.js:20 |
| 72 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #69 |
| 73 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #72 |
| 74 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #72 |
| 75 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #72 |
| 76 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #72 |
| 77 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #69; corrobora #70; corrobora #71 |
| 78 | 3.4.7 #6 | 7 documentação | documentação | — | contexto | fraca | corrobora #69 |
| 79 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #72 |
| 80 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #70; corrobora #71 |
| 81 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #67; corrobora #70 |
| 82 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #71 |
| 83 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #5; corrobora #15; corrobora server/e2e-plugin/main.js:1 |
| 84 | 3.4.7 #12 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #68; corrobora em parte src/routing/routing.component.tsx:83-88 |
| 85 | 3.4.7 #13 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #67; corrobora #70 |
| 86 | 3.4.7 #14 | 7 documentação | comentário | single-spa | arquitetural | fraca | corrobora #66 |
| 87 | 3.4.7 #15 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #67; corrobora #68 |
| 88 | 3.4.7 #16 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #6; corrobora #70 |
| 89 | 3.4.7 #17 | 7 documentação | comentário | single-spa | arquitetural | fraca | contradiz #6 |
| 90 | 3.4.7 #18 | 7 documentação | comentário | single-spa | arquitetural | fraca | corrobora em parte #11; corrobora em parte #6; corrobora em parte src/state/actions/loadMicroFrontends.tsx:84 |
| 91 | 3.4.7 #19 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #70; corrobora #3 |
| 92 | 3.4.7 #20 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #62; corrobora #63; corrobora #64 |
| 93 | 3.4.7 #21 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #71 |
| 94 | 3.4.7 #22 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #71 |
| 95 | 3.4.7 #23 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #65 |
| 96 | 3.4.7 #24 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #71 |
| 97 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #84 |
| 98 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #89; explica #90 |
| 99 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #95 |

## Resumo

Observações: 99. Dimensões (tecnologia: 1, configuração: 2, código: 65, estrutura: 1, composição: 2, build-deploy: 1, documentação: 24, histórico: 3). Força (forte: 6, moderada: 15, fraca: 78, ambígua: 0). Evidência (tecnológica: 15, arquitetural: 35, contexto: 49).
