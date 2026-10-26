---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
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

# 046 — pgarr/microfrontend-template

## Leitura do repositório

Template com a mesma arquitetura do repositório 017: um `container` React e três remotes, `auth` e `marketing` em React e `dashboard` em Vue, com o Module Federation nativo do webpack 5. Cada remote expõe uma função `mount` (ex.: auth/src/bootstrap.js:46), e o container a chama em wrappers carregados de forma *lazy* pelas rotas (container/src/App.js:29-36).

Em auth e marketing, `mount(el, opções)` sincroniza a navegação: o container passa `onNavigate` e `onSignIn` e recebe `onParentNavigate` (container/src/components/AuthApp.js:13-29; container/src/components/MarketingApp.js:13-28), e esses remotes usam histórico em memória quando montados pelo container (auth/src/bootstrap.js:7-11). O dashboard define só `mount(el)`, sem histórico nem opções (dashboard/src/bootstrap.js:5-8), e o container passa apenas o elemento (container/src/components/DashboardApp.js:8).

O container também controla quando o dashboard aparece: guarda `isSignedIn`, que o callback de login do auth liga antes de navegar para `/dashboard` (container/src/App.js:13-18), e nessa rota renderiza o dashboard só se houver login; senão, redireciona para `/` (container/src/App.js:33-35). Essas trocas por callback não viraram construções na revisão de código-fonte (seção 3.4.4 do protocolo), por isso não aparecem como `communication`.

Em produção, cada aplicação publica em `/<app>/latest/` (ex.: auth/config/webpack.prod.js:10), e o container busca os remotes no domínio de `PRODUCTION_DOMAIN` (container/config/webpack.prod.js:6, 17-20): deploy independente por unidade, num mesmo domínio. Por ser template, o conteúdo das telas é genérico; o valor está na estrutura.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | auth | host → remote | origem → destino | module-federation | Yes | Yes | container/config/webpack.prod.js:17, 19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); container/config/webpack.dev.js:20, 22 (remote `auth@http://localhost:8082/remoteEntry.js`); auth/config/webpack.prod.js:10-17 (`publicPath: '/auth/latest/'`, `name: 'auth'`, `filename: 'remoteEntry.js'`, expõe `./AuthApp`) | auth/src/bootstrap.js:46; container/src/components/AuthApp.js:13; container/src/components/AuthApp.js:1; container/src/App.js:29 |
| 2 | container | dashboard | host → remote | origem → destino | module-federation | Yes | Yes | container/config/webpack.prod.js:17, 20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); container/config/webpack.dev.js:20, 23 (remote `dashboard@http://localhost:8083/remoteEntry.js`); dashboard/config/webpack.prod.js:10-17 (`publicPath: '/dashboard/latest/'`, `name: 'dashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`) | dashboard/src/bootstrap.js:22; container/src/components/DashboardApp.js:8; container/src/components/DashboardApp.js:1; container/src/App.js:29 |
| 3 | container | marketing | host → remote | origem → destino | module-federation | Yes | Yes | container/config/webpack.prod.js:17-18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); container/config/webpack.dev.js:20-21 (remote `marketing@http://localhost:8081/remoteEntry.js`); marketing/config/webpack.prod.js:10-17 (`publicPath: '/marketing/latest/'`, `name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`) | marketing/src/bootstrap.js:46; container/src/components/MarketingApp.js:13; container/src/components/MarketingApp.js:1; container/src/App.js:29 |

## Observações

**1. container → auth.** O container importa `mount` de `auth/AuthApp` e o chama no wrapper (container/src/components/AuthApp.js:1, 13). O nome, o módulo e o caminho `/auth/latest/` correspondem a auth/config/webpack.prod.js:10-17.

**2. container → dashboard.** Mesmo padrão com `dashboard/DashboardApp` (container/src/components/DashboardApp.js:1, 8). O nome, o módulo e o caminho correspondem a dashboard/config/webpack.prod.js:10-17. O `app.mount` do Vue dentro do remote é interno à unidade.

**3. container → marketing.** Mesmo padrão com `marketing/MarketingApp` (container/src/components/MarketingApp.js:1, 13). O nome, o módulo e o caminho correspondem a marketing/config/webpack.prod.js:10-17.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
