---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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
  date: 2026-10-21
---

# 002 — EnjoyFX/fe_containerize

## Leitura do repositório

Exemplo conteinerizado com um backend NestJS e dois frontends React/Vite: `frontend`, a aplicação principal, e `microfrontend`, um widget. A composição não usa Module Federation nem outra biblioteca de MFE (a revisão de dependências não encontrou nenhuma). O widget é empacotado como bundle IIFE que publica a global `MicroFrontendWidget` com `mount` e `unmount` (microfrontend/vite.config.js:25-29; microfrontend/src/main.jsx:7-19). O frontend injeta esse script, chama `mount` num elemento próprio e `unmount` na limpeza (frontend/src/RemoteWidget.jsx:7-32), dentro de um painel lateral (frontend/src/App.jsx:800-803).

O contrato entre as unidades é só a global no `window` e um elemento do DOM. A URL do script leva `?v=${Date.now()}` (frontend/src/App.jsx:802), o que força o download a cada renderização e evita cache. O widget também roda sozinho pela sua própria página (microfrontend/index.html:9-12). Cada frontend tem imagem e nginx próprios, e o nginx do frontend encaminha `/mfe/` para o contêiner do widget (frontend/nginx.conf:57-58; frontend/Dockerfile:12): é por esse proxy que o host alcança o bundle. O backend não é unidade frontend.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend | microfrontend | page → embedded-frontend | origem → destino | script | Yes | Yes | microfrontend/vite.config.js:25-29 (bundle `lib` com entrada `src/main.jsx`, global `MicroFrontendWidget`, arquivo `widget`, formato `iife`); frontend/nginx.conf:57-58 (`/mfe/` → `http://microfrontend:80/`) | microfrontend/src/main.jsx:7; microfrontend/src/main.jsx:14; frontend/src/RemoteWidget.jsx:14; frontend/src/RemoteWidget.jsx:26; microfrontend/src/main.jsx:7; microfrontend/src/main.jsx:14; frontend/src/App.jsx:802; frontend/src/RemoteWidget.jsx:8 |

## Observações

**1. frontend → microfrontend.** O host carrega `/mfe/widget.iife.js` e chama `window.MicroFrontendWidget.mount`/`unmount` (frontend/src/RemoteWidget.jsx:8-14, 25-26). O nome do arquivo e o da global correspondem ao bundle do widget: `fileName: 'widget'` com formato `iife` e `name: 'MicroFrontendWidget'` (microfrontend/vite.config.js:27-29). O prefixo `/mfe/` é resolvido pelo proxy do nginx do frontend, que o encaminha ao serviço `microfrontend` (frontend/nginx.conf:57-58). As definições de `mount` e `unmount` aparecem duas vezes em Código porque a revisão de código-fonte as registrou por dois padrões.

## Resumo

Relações: 1 (page → embedded-frontend: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
