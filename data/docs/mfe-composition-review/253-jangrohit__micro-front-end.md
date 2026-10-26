---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Leitura do repositório

Exemplo de micro-frontends com o Module Federation nativo do webpack 5 (README.md:3). O host é `packages/container`, em React, e o único remote ligado a ele é `packages/marketing`, também em React, com as páginas Landing e Pricing (README.md:10-14). O marketing expõe `./MarketingApp` a partir do seu `src/bootstrap` (packages/marketing/config/webpack.prod.js:19-24), que exporta uma função `mount(el)` que renderiza o `App` do marketing no elemento recebido (packages/marketing/src/bootstrap.js:5-7, 17). O container importa essa função e a chama num componente wrapper (packages/container/src/components/MarketingApp.js:3, 9), renderizado direto no `App` do host, sem rota que o selecione (packages/container/src/App.js:19).

O contrato é só o elemento: o container não passa callbacks nem histórico, e o remote não devolve nada (packages/container/src/components/MarketingApp.js:9). Não há troca de mensagens entre as unidades. Em desenvolvimento, o marketing também se monta sozinho em `#_marketing-dev-root` (packages/marketing/src/bootstrap.js:9-13), o que é montagem isolada da própria unidade, não composição.

No build de produção, cada aplicação publica em `/<app>/latest/` (packages/container/config/webpack.prod.js:10; packages/marketing/config/webpack.prod.js:10), e o container busca o remote num domínio vindo de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:5, 22). Com os workflows por aplicação indicados na revisão estrutural, isso aponta deploy independente das duas unidades num mesmo domínio.

`packages/auth` e `packages/dashboard` têm só `package.json` e lockfile; são `No` na revisão estrutural, o container não declara remote para eles (packages/container/config/webpack.prod.js:21-23) e o README diz que não estão ligados ao host (README.md:47-48). Por isso não entram em nenhuma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:21-22 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:16-17 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/marketing/config/webpack.prod.js:10, 20-23 (`publicPath: "/marketing/latest/"`, `name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`); packages/marketing/config/webpack.dev.js:9, 16-19 (porta 8081, `name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`) | packages/marketing/src/bootstrap.js:17; packages/container/src/components/MarketingApp.js:9; packages/container/src/components/MarketingApp.js:3 |

## Observações

**1. packages/container → packages/marketing.** O container importa `mount` de `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:3) e o chama com o `div` do wrapper (packages/container/src/components/MarketingApp.js:9). O destino foi resolvido pelo nome do remote e pelo módulo exposto: `name: "marketing"` e `./MarketingApp` em packages/marketing/config/webpack.prod.js:20-23, com o caminho `/marketing/latest/` igual ao `publicPath` do marketing (packages/marketing/config/webpack.prod.js:10). Em desenvolvimento, a URL `localhost:8081` do remote (packages/container/config/webpack.dev.js:17) bate com a porta do devServer do marketing (packages/marketing/config/webpack.dev.js:9), mas a correspondência vem do nome. A relação é ativa: o wrapper é renderizado em packages/container/src/App.js:19, o `App` é iniciado em packages/container/src/bootstrap.js:5 e o bootstrap é carregado por packages/container/src/index.js:1.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
