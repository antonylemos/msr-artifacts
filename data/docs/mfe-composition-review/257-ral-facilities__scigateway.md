---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
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

# 257 — ral-facilities/scigateway

## Leitura do repositório

O SciGateway é a aplicação-mãe, em produção, de um conjunto de plugins de uma organização de instalações científicas. O snapshot tem uma única unidade (`.`), uma aplicação React + Vite que faz ao mesmo tempo o papel de root-config single-spa e de casca visual (autenticação, menu, notificações, administração). Os plugins não estão no repositório: são listados em runtime no `settings.json` (lista `plugins` com `name`, `src`, `enable`), e o host os carrega um a um. Para cada plugin habilitado, injeta um `<script src>` com o bundle (src/state/actions/loadMicroFrontends.tsx:7-16, 27-28, 56-60), lê os lifecycles do global de mesmo nome (src/state/actions/loadMicroFrontends.tsx:19-23) e registra o plugin com `singleSpa.registerApplication` (src/state/actions/loadMicroFrontends.tsx:31-49). A carga começa em `configureSite` (src/state/actions/scigateway.actions.tsx:361-365), despachado na inicialização (src/App.tsx:50), e o `singleSpa.start()` vem depois de todos os plugins carregados (src/state/actions/scigateway.actions.tsx:367-410).

A particularidade do repositório é que a ativação por rota é definida pelo próprio plugin. O host não sabe de antemão as rotas: cada plugin envia `scigateway:api:register_route` pelo canal `CustomEvent` `scigateway` em `document`; o host trata a mensagem em `listenToPlugins` (src/state/middleware/scigateway.middleware.tsx:87-98, 114-164, 232), grava o prefixo em `singleSpaPluginRoutes` (src/state/reducers/scigateway.reducer.tsx:140-145), que é o que a função de atividade compara com `location.pathname` (src/state/actions/loadMicroFrontends.tsx:34-48), e cria as `<Route>` cujo elemento é o contêiner `<div id={plugin}>` onde o single-spa monta o plugin (src/routing/routing.component.tsx:113-124, 263-280; src/adminPage/adminPage.component.tsx:130-149 para as abas de administração). O mesmo canal leva mensagens do host aos plugins (ações com `payload.broadcast`, como `plugin_rerender` e `send_themeoptions`, src/state/middleware/scigateway.middleware.tsx:33-37, 242-244; src/state/actions/scigateway.actions.tsx:575-592; aviso de logout e de token renovado) e dos plugins ao host (rota, notificação, pedido de renovação de token). Há ainda mecanismos de robustez: espera de até 3 s por um `register_route` antes de iniciar o single-spa quando a URL é de plugin ainda desconhecido (src/state/actions/scigateway.actions.tsx:368-405), `triggerAppChange` quando a rota chega tarde (src/state/middleware/scigateway.middleware.tsx:148-157) e `unloadApplication` quando o contêiner fica preso no preloader (src/routing/routing.component.tsx:148-174).

O único plugin nomeado no snapshot é `demo_plugin`: em `public/settings.example.json:15-22` aponta para `http://localhost:5001/main.js` com `enable: false`, e em `server/e2e-settings.json:7-14` aponta para `/plugins/e2e-plugin/main.js` com `enable: true`, servido pelo servidor de testes e2e (server/e2e-test-server.js:8-10, 16-20). O arquivo servido, `server/e2e-plugin/main.js`, é o build copiado do repositório do plugin de demonstração (server/README.md:3-9), não fonte: cria o global `demo_plugin` (server/e2e-plugin/main.js:1), atribui a ele `bootstrap`/`mount`/`unmount` (server/e2e-plugin/main.js:20) e, também na linha 20, envia `register_route` com `plugin:"demo_plugin"` e `invalidate_token` e escuta `plugin_rerender` (server/e2e-plugin/main.js:20). Os `settings.json` reais ficam fora do Git (.gitignore:34-35). O `index.html` carrega React e ReactDOM UMD de CDN (index.html:18-29), que o host não usa mas o bundle UMD do plugin lê do global (server/e2e-plugin/main.js:1): é dependência compartilhada por global, não relação entre unidades. `micro-frontend-tools/` é só um script de desenvolvimento que serve builds locais de plugins em portas próprias (micro-frontend-tools/serve-plugins.js:37-59; micro-frontend-tools/dev-plugin-settings.example.json:1-14), sem nomear unidade.

Não viraram relação: os disparos de `NotificationType` no canal feitos e consumidos pelo próprio host (anotados `No` na revisão de código-fonte, tratados em src/state/middleware/scigateway.middleware.tsx:166-188), o `<iframe>` do formulário de contato e os scripts do Google Analytics, que não são unidades.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | demo_plugin | root-config → application | origem → destino | single-spa | No | Yes | public/settings.example.json:15-22 (`plugins`: `demo_plugin`, `src` `http://localhost:5001/main.js`, `enable: false`); server/e2e-settings.json:7-14 (`plugins`: `demo_plugin`, `src` `/plugins/e2e-plugin/main.js`, `enable: true`) | src/state/actions/loadMicroFrontends.tsx:31; src/state/actions/loadMicroFrontends.tsx:9; src/state/actions/scigateway.actions.tsx:391; src/state/actions/scigateway.actions.tsx:401; src/state/actions/scigateway.actions.tsx:408; src/state/middleware/scigateway.middleware.tsx:156; src/routing/routing.component.tsx:165; src/routing/routing.component.tsx:268; src/adminPage/adminPage.component.tsx:132 |
| 2 | . | demo_plugin | communication | bidirecional | events | No | Yes | — | src/authentication/baseAuthProvider.tsx:61; src/authentication/baseAuthProvider.tsx:62; src/state/middleware/scigateway.middleware.tsx:34; src/state/middleware/scigateway.middleware.tsx:35; src/state/middleware/scigateway.middleware.tsx:193; src/state/middleware/scigateway.middleware.tsx:194 |

## Observações

**1. . → demo_plugin.** O registro é genérico para todo plugin habilitado do `settings.json` (src/state/actions/loadMicroFrontends.tsx:56-60); o destino é o único nome que aparece nas configurações do snapshot, `demo_plugin` (public/settings.example.json:17; server/e2e-settings.json:9). A relação é mista, com carga por `<script>` (src/state/actions/loadMicroFrontends.tsx:9) e leitura do global (src/state/actions/loadMicroFrontends.tsx:22), mas o destino entra no host registrado no orquestrador (src/state/actions/loadMicroFrontends.tsx:31-49), daí `root-config → application` e `single-spa`. No snapshot = `No`: o plugin é construído em outro repositório (server/README.md:3), e o `server/e2e-plugin/main.js` presente na árvore é só o artefato compilado, que a revisão estrutural não lista como unidade. Ativa = `Yes` pelas nove linhas `Yes` da revisão de código-fonte: carga e registro, os três `singleSpa.start()` (src/state/actions/scigateway.actions.tsx:391, 401, 408), o `triggerAppChange` (src/state/middleware/scigateway.middleware.tsx:156), o `unloadApplication` (src/routing/routing.component.tsx:165) e as rotas-contêiner do host e da administração (src/routing/routing.component.tsx:268; src/adminPage/adminPage.component.tsx:132). No exemplo o plugin está desabilitado; só a configuração e2e o habilita. A ativação depende das rotas que o plugin envia (relação 2), sem as quais a função de atividade devolve `false` (src/state/actions/loadMicroFrontends.tsx:45-47).

**2. . ↔ demo_plugin.** O canal é o `CustomEvent` `scigateway` em `document` (src/state/middleware/scigateway.middleware.tsx:31). Do host para o plugin, as linhas `Yes` da revisão de código-fonte são o aviso de logout (`scigateway:api:signout`, src/authentication/baseAuthProvider.tsx:61-63), o `broadcastToPlugins` das ações com `payload.broadcast` (src/state/middleware/scigateway.middleware.tsx:33-37, 242-244), que inclui `plugin_rerender` e `send_themeoptions` (src/state/actions/scigateway.actions.tsx:575-592), e o aviso de token renovado (src/state/middleware/scigateway.middleware.tsx:193-199); o host ignora esses tipos no próprio listener (src/state/middleware/scigateway.middleware.tsx:100-112). Do plugin para o host, o listener `listenToPlugins` aceita só mensagens `scigateway:api:` e trata `register_route`, `notification` e `invalidate_token` (src/state/middleware/scigateway.middleware.tsx:94-98, 114-215, 232), e o bundle do plugin de demonstração envia `register_route` e `invalidate_token` e escuta `plugin_rerender` (server/e2e-plugin/main.js:20). Por isso Direção = `bidirecional`, com Origem e Destino em ordem alfabética. O envio do plugin aparece só no artefato compilado, anotado `No` na revisão de código-fonte, e não entra na coluna Código; a recepção pelo host da `register_route` (src/state/middleware/scigateway.middleware.tsx:156) está na relação 1. No snapshot = `No` pelo mesmo motivo da relação 1; Configuração = `—`, porque o canal é fixo no código.

## Resumo

Relações: 2 (root-config → application: 1, communication: 1). Ativas: 2. Destino fora do snapshot: 2.
Unidades sem relação: nenhuma.
