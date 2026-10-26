---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Leitura do repositório

Projeto acadêmico de segurança por visão computacional, com backend FastAPI e duas unidades
frontend. O host é `frontend`, um painel em HTML/JS sem framework e sem build, cujo shell é
`frontend/dashboard.html`. A outra unidade, `frontend-hermes`, é um assistente de chat em React,
compilado pelo Vite como biblioteca IIFE de arquivo único `hermes-widget.js`
(`frontend-hermes/vite.config.ts:11-15`). A entrada desse build envolve o `App` React num custom
element com shadow DOM e registra a tag `hermes-widget`
(`frontend-hermes/src/hermes-widget.tsx:6`, `:16`, `:58`).

O dashboard carrega o bundle por `<script src="/hermes/hermes-widget.js">`
(`frontend/dashboard.html:366`) e usa a tag `<hermes-widget>` com os atributos `api-base` e
`modulo` (`frontend/dashboard.html:361`), que o widget lê em
`frontend-hermes/src/hermes-widget.tsx:38-40`. Não há servidor próprio para o widget: o mesmo
FastAPI serve `frontend/` e o `dist` do widget no caminho `/hermes/` (`backend/main.py:92`,
`backend/main.py:281-288`). O mecanismo é Web Components, sem orquestrador nem federação.

Além da montagem, as unidades se comunicam por `CustomEvent` em `window`, num só sentido: o botão
"Hermes IA" do topbar de `frontend` dispara `toggle-hermes` (`frontend/components/topbar.html:26`)
e o drawer de perfil dispara `close-hermes` (`frontend/dashboard.html:421`); o `App` de
`frontend-hermes` ouve os dois (`frontend-hermes/src/App.tsx:35-36`). Os demais eventos e scripts
dinâmicos achados pela mineração (`argos:navaway`, reexecução de scripts dos fragmentos HTML,
Leaflet e Tailwind por CDN) são internos de `frontend` e não viram relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend | frontend-hermes | application → custom-element | origem → destino | web-components | Yes | Yes | frontend-hermes/vite.config.ts:11-15 (bundle `lib` com entrada `src/hermes-widget.tsx`, formato `iife`, arquivo `hermes-widget.js`) | frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:16; frontend-hermes/src/hermes-widget.tsx:58; frontend/dashboard.html:361; frontend/dashboard.html:366 |
| 2 | frontend | frontend-hermes | communication | origem → destino | events | Yes | Yes | — | frontend-hermes/src/App.tsx:35; frontend-hermes/src/App.tsx:36; frontend/components/topbar.html:26; frontend/dashboard.html:421 |

## Observações

**1. frontend → frontend-hermes.** A tag `hermes-widget` usada em `frontend/dashboard.html:361`
é a definida em `frontend-hermes/src/hermes-widget.tsx:58`, o que resolve o destino na unidade
`frontend-hermes`. O script que carrega a tag (`frontend/dashboard.html:366`) entra nesta relação:
o nome `hermes-widget.js` é o `fileName` do build (`frontend-hermes/vite.config.ts:15`) e o
prefixo `/hermes/` é a rota do backend que serve `frontend-hermes/dist` (`backend/main.py:92`,
`backend/main.py:281-288`). A classe e o shadow DOM (`frontend-hermes/src/hermes-widget.tsx:6`,
`:16`) estão no fornecedor, mas entram na relação do consumidor. Ativa `Yes`: todas as linhas de
código são `Yes` na revisão de código-fonte. A origem passa configuração ao widget só por
atributos (`api-base="/api"`, `modulo="dashboard"`), lidos em
`frontend-hermes/src/hermes-widget.tsx:38-40`.

**2. frontend → frontend-hermes.** `frontend` envia `toggle-hermes` pelo botão do topbar
(`frontend/components/topbar.html:26`), fragmento inserido no dashboard pelo roteador, e
`close-hermes` ao abrir o drawer de perfil (`frontend/dashboard.html:421`). `frontend-hermes` só
ouve (`frontend-hermes/src/App.tsx:35-36`) e não dispara eventos de volta, por isso a direção é
`origem → destino`, não `bidirecional`. Os dois eventos têm o mesmo par e tipo e ficam numa linha.

## Resumo

Relações: 2 (application → custom-element: 1, communication: 1). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
