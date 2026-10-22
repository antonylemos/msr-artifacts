---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 017 — a-kelen/mfe

## Leitura do repositório

Exemplo com um `container` React e três remotes: `auth` e `marketing` em React e `dashboard` em Vue. Todos usam o Module Federation nativo do webpack 5. Cada remote expõe uma função `mount` (ex.: packages/auth/src/bootstrap.js:34), e o container a chama dentro de um componente wrapper por remote, ligado às rotas (packages/container/src/App.js:40-48). Como o contrato é só essa função, o container React consegue montar um remote Vue.

O contrato não é igual para todos. Em auth e marketing, `mount(el, opções)` também carrega a sincronização de navegação: o container passa `onNavigate` e `onSignIn` e recebe `onParentNavigate` de volta (packages/container/src/components/AuthApp.js:11-21; packages/container/src/components/MarketingApp.js:11-20). Assim o histórico em memória desses remotes (packages/auth/src/bootstrap.js:7-9) acompanha o histórico do navegador do container, e o login no auth avisa o container. O dashboard define só `mount(el)`, sem histórico nem callbacks (packages/dashboard/src/bootstrap.js:4-7), e o container passa apenas o elemento (packages/container/src/components/DashboardApp.js:8). Essas trocas por callback não foram registradas como construções na revisão de código-fonte (seção 3.4.4 do protocolo), por isso não aparecem como relação `communication`.

No build de produção, cada aplicação publica em `/<app>/latest/` (`publicPath`, ex.: packages/auth/config/webpack.prod.js:10), e o container busca os remotes num domínio vindo de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6, 17-20). Junto com os workflows por aplicação indicados na revisão estrutural, isso mostra deploy independente de cada unidade num mesmo domínio.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/auth | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:17, 19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:20, 22 (remote `auth@http://localhost:8082/remoteEntry.js`); packages/auth/config/webpack.prod.js:10-17 (`publicPath: '/auth/latest/'`, `name: 'auth'`, `filename: 'remoteEntry.js'`, expõe `./AuthApp`) | packages/auth/src/bootstrap.js:34; packages/container/src/components/AuthApp.js:4; packages/container/src/components/AuthApp.js:11; packages/container/src/App.js:40 |
| 2 | packages/container | packages/dashboard | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:17, 20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:20, 23 (remote `dashboard@http://localhost:8084/remoteEntry.js`); packages/dashboard/config/webpack.prod.js:10-17 (`publicPath: '/dashboard/latest/'`, `name: 'dashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`) | packages/dashboard/src/bootstrap.js:16; packages/container/src/components/DashboardApp.js:2; packages/container/src/components/DashboardApp.js:8; packages/container/src/App.js:40 |
| 3 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:17-18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:20-21 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/marketing/config/webpack.prod.js:10-17 (`publicPath: '/marketing/latest/'`, `name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`) | packages/marketing/src/bootstrap.js:33; packages/container/src/components/MarketingApp.js:4; packages/container/src/components/MarketingApp.js:11; packages/container/src/App.js:40 |

## Observações

**1. packages/container → packages/auth.** O container importa `mount` de `auth/AuthApp` (packages/container/src/components/AuthApp.js:4) e o chama no wrapper (packages/container/src/components/AuthApp.js:11). O nome, o módulo e o caminho `/auth/latest/` correspondem a packages/auth/config/webpack.prod.js:10-17.

**2. packages/container → packages/dashboard.** Mesmo padrão com `dashboard/DashboardApp` (packages/container/src/components/DashboardApp.js:2, 8). O nome, o módulo e o caminho `/dashboard/latest/` correspondem a packages/dashboard/config/webpack.prod.js:10-17. Dentro do remote, o `mount` cria a aplicação Vue; esse `app.mount` é interno à unidade.

**3. packages/container → packages/marketing.** Mesmo padrão com `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:4, 11). O nome, o módulo e o caminho `/marketing/latest/` correspondem a packages/marketing/config/webpack.prod.js:10-17.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
