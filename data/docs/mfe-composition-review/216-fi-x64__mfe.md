---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Leitura do repositório

Exemplo em estágio inicial de um roteiro de curso com webpack 5 e Module Federation em `packages/`. Há duas aplicações React: `container`, o host, e `marketing`, o remote. O marketing expõe o próprio bootstrap como `./MarketingApp`, sob `name: "marketing"` e `filename: "remoteEntry.js"` (packages/marketing/config/webpack.dev.js:16-21; packages/marketing/config/webpack.prod.js:13-18). Esse bootstrap exporta uma função `mount(el)` que renderiza a App do marketing no elemento recebido (packages/marketing/src/bootstrap.js:6-8, 22). O container declara o remote `marketing` (packages/container/config/webpack.dev.js:18-20; packages/container/config/webpack.prod.js:17-19), importa `mount` num componente wrapper e o chama sobre um `div` próprio dentro de `useEffect` (packages/container/src/components/MarketingApp.js:1-11). O wrapper é renderizado sempre, logo abaixo do `Header`, sem rotas que separem as unidades (packages/container/src/App.js:10-11).

A integração depende só de `mount`. O container não passa props, callbacks nem histórico ao remote (packages/container/src/components/MarketingApp.js:8), e o `Header` aceita `signedIn` e `onSignOut` (packages/container/src/components/Header.js:57), que o container não preenche (packages/container/src/App.js:10). Nenhuma comunicação entre as unidades aparece. O marketing também roda sozinho em desenvolvimento, montando-se em `#_marketing-dev-root` (packages/marketing/src/bootstrap.js:12-17; packages/marketing/public/index.html:5); isso não é relação. Em produção, o remote é procurado em `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`, caminho que coincide com o `publicPath` do marketing (packages/marketing/config/webpack.prod.js:10) e com o destino do deploy em S3 (.github/workflows/marketing.yml:24). `packages/auth` e `packages/dashboard` só têm `package.json` e lockfile, não são unidades e não aparecem em nenhuma configuração de composição.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:18-20 (remote `marketing` em `http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:17-19 (remote `marketing` em `${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:17-21 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`); packages/marketing/config/webpack.prod.js:10 (`publicPath: "/marketing/latest/"`); packages/marketing/config/webpack.prod.js:14-18 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`); packages/marketing/config/webpack.dev.js:10 (porta 8081) | packages/marketing/src/bootstrap.js:22; packages/container/src/components/MarketingApp.js:8; packages/container/src/components/MarketingApp.js:1 |

## Observações

**1. packages/container → packages/marketing.** O remote `marketing` do container corresponde à unidade `packages/marketing` pelo `name` e pelo `remoteEntry.js` do seu `ModuleFederationPlugin` (packages/marketing/config/webpack.dev.js:17-18; packages/marketing/config/webpack.prod.js:14-15). Em produção, o caminho `/marketing/latest/` também coincide com o `publicPath` (packages/marketing/config/webpack.prod.js:10); em desenvolvimento, a porta 8081 (packages/marketing/config/webpack.dev.js:10) só corrobora. O módulo importado, `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:1), é o `./MarketingApp` exposto, que aponta para `./src/bootstrap` (packages/marketing/config/webpack.dev.js:20; packages/marketing/config/webpack.prod.js:17). A relação é ativa: as três linhas da revisão de código-fonte são `Yes`, e o wrapper que chama `mount` é renderizado incondicionalmente pela App do container (packages/container/src/App.js:11), carregada pela entrada (packages/container/src/index.js:1; packages/container/src/bootstrap.js:5). O domínio de produção vem de `process.env.PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6), preenchido por um secret no build do workflow (.github/workflows/container.yml:21-23); o valor não está no snapshot, mas o destino é resolvido pelo nome e pelo caminho.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
