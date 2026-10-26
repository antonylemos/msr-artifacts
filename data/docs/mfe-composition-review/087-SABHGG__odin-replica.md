---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Leitura do repositório

O repositório é um host de demonstração feito sobre um scaffold do Create React App: uma só unidade no snapshot (`.`), que é ao mesmo tempo o root-config single-spa e a aplicação React local. A entrada `src/index.js` importa os lifecycles React estaticamente (src/index.js:4), registra a própria aplicação como `odin-react`, sempre ativa (src/index.js:56-60), registra uma aplicação Angular externa, `leadocs-angular` (src/index.js:63-100), e chama `start()` (src/index.js:103). Os lifecycles de `odin-react` vêm de `singleSpaReact` e montam o `App` em `#root` (src/root.app.js:6-14). Como root e aplicação local estão no mesmo bundle, esse registro é interno à unidade e não virou relação.

A aplicação externa não está no snapshot. O host a carrega injetando um `<script>` com o bundle `main.js` de um servidor Angular, por padrão `http://localhost:4200/main.js`, configurável por `REACT_APP_LEAPDOCS_ORIGIN` e `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:7-9, 72-73, 93), e espera que esse bundle publique os lifecycles no global `leapdocs` (src/index.js:69, 76-80). O código de erro admite que isso depende do `angular.json` do outro projeto (src/index.js:83). A ativação não é por rota: a barra lateral do `App` dispara o `CustomEvent` `toggle-leapdocs` (src/App.js:16-23), o listener de `src/index.js` grava `isLeadocsActive` e chama `triggerAppChange()` (src/index.js:45-51), e o single-spa monta o remoto em `#microfrontend-container`, nó que o `App` só renderiza quando a seção "Leapdocs (Microfrontend)" está ativa (src/index.js:96-98; src/App.js:11, 56-58). Emissor e receptor do evento estão na mesma unidade, então ele não virou linha `communication`.

Duas particularidades preparam o host para receber o remoto Angular: o `import 'zone.js'` no topo da entrada (src/index.js:2) e o patch de `history.pushState`/`replaceState` que remove o prefixo `/leapdocs` das URLs (src/index.js:10-42), aparentemente para que o roteamento do Angular não altere a URL do host. Não há Module Federation, import map, custom element nem iframe; o `README.md` é o texto padrão do CRA (README.md:1-3).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | leadocs-angular | root-config → application | origem → destino | single-spa | No | Yes | — | src/index.js:63; src/index.js:72; src/index.js:103 |

## Observações

**1. . → leadocs-angular.** O destino é o nome do registro (src/index.js:63-64); a única localização é a URL do bundle, `http://localhost:4200/main.js` por padrão ou o valor de `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:7-9), e nenhuma unidade do snapshot produz esse bundle, por isso No snapshot = `No`, como registrado na classificação (`unit_organization: multi-repo`). A relação é mista: o loader injeta o script do bundle (src/index.js:72-73, 93) e devolve o global `leapdocs` (src/index.js:78-80), mas o destino entra no host registrado no orquestrador (src/index.js:63-100), daí o tipo `root-config → application` e o mecanismo `single-spa`. A função de atividade `() => isLeadocsActive` (src/index.js:96) depende do evento interno `toggle-leapdocs` descrito na leitura, e o `domElementGetter` aponta para `#microfrontend-container` (src/index.js:98; src/App.js:57). Configuração = `—`: não há arquivo de configuração no snapshot que declare a ligação; a URL está no próprio código de entrada. Ativa = `Yes` pelas três linhas `Yes` da revisão de código-fonte (registro, script e `start()`); se o bundle remoto não existe, a carga falha com erro no console (src/index.js:88-91), o que não se observa no snapshot.

## Resumo

Relações: 1 (root-config → application: 1). Ativas: 1. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
