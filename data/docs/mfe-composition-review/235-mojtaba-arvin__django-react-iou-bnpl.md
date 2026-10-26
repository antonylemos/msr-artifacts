---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
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

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Leitura do repositório

Sistema de "Buy Now, Pay Later" com backend Django e frontend React num workspace pnpm (`frontend/`). O frontend tem um host, `frontend/shell` (porta 3000), e dois remotes Module Federation, `frontend/customer-app` (porta 3001) e `frontend/merchant-app` (porta 3002), além da biblioteca `frontend/shared` (`@bnpl/shared`), que não é unidade frontend e entra em cada app em build time. A federação usa o plugin nativo do webpack 5 (`require("webpack").container`, frontend/shell/webpack.config.js:3), por isso a revisão de dependências não encontrou pacote de federação configurado.

O shell declara os dois remotes (frontend/shell/webpack.config.js:59-64) e, nos adaptadores, carrega de cada um o módulo `createAdminAppConfig` com `import()` (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10). O que vem dos remotes não é um componente montado por eles: é uma fábrica que recebe `onBack` e `basename` do shell e devolve as props de `AdminApp`, componente react-admin da biblioteca comum, com as telas próprias de cada área (frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7-25; frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:8-23). O comentário em frontend/customer-app/webpack.config.js:84 explica a escolha: evitar várias árvores React no shell. O shell então renderiza `AdminApp` sob `/customer/*` e `/merchant/*` (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45-66; caminhos padrão em frontend/shared/src/infrastructure/context/global-settings.context.tsx:30-31).

Cada remote tem dois modos no mesmo `webpack.config.js`, escolhidos por `env.standalone` (frontend/customer-app/webpack.config.js:8): no standalone, uma entrada própria com `HtmlWebpackPlugin` (:14-18, :74-79); no remoto, o `ModuleFederationPlugin` (:80-116) com uma entrada vazia (`remote-entry.module.ts`, 0 bytes). Os scripts `dev` e `build` usam o modo remoto (frontend/customer-app/package.json:6-7; frontend/merchant-app/package.json:6-7). O callback `onBack` passado pelo shell (customer-app.adapter.ts:12) só redireciona a janela para `/`; não há troca de mensagens entre as unidades. É um projeto de portfólio, com URLs `localhost` e sem configuração de produção da federação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/shell | frontend/customer-app | host → remote | origem → destino | module-federation | Yes | Yes | frontend/shell/webpack.config.js:61-62 (remote `customer_app@http://localhost:3001/remoteEntry.js`); frontend/customer-app/webpack.config.js:81-88 (`name: "customer_app"`, `filename: "remoteEntry.js"`, expõe `./createAdminAppConfig`); frontend/customer-app/webpack.config.js:121 (porta 3001) | frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52 |
| 2 | frontend/shell | frontend/merchant-app | host → remote | origem → destino | module-federation | Yes | Yes | frontend/shell/webpack.config.js:61,63 (remote `merchant_app@http://localhost:3002/remoteEntry.js`); frontend/merchant-app/webpack.config.js:81-88 (`name: "merchant_app"`, `filename: "remoteEntry.js"`, expõe `./createAdminAppConfig`); frontend/merchant-app/webpack.config.js:121 (porta 3002) | frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:62 |

## Observações

**1. frontend/shell → frontend/customer-app.** O adaptador importa `customer_app/createAdminAppConfig` (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10) e chama a fábrica com `onBack` e `basename: settings.customerBasePath` (:11-14). O destino foi resolvido pelo `name: "customer_app"` e pela exposição `./createAdminAppConfig` em frontend/customer-app/webpack.config.js:82-87, que correspondem ao remote do shell (frontend/shell/webpack.config.js:62); a porta 3001 (frontend/customer-app/webpack.config.js:121) só corrobora. O shell chama `loadCustomerConfig` na montagem (shell-app.bootstrap.tsx:35) e renderiza `AdminApp` com as props devolvidas na rota `${customerBasePath}/*` (:47-55); a linha das `Routes` (:45) sustenta as duas relações. A federação só existe no modo remoto do customer-app, que é o dos scripts `dev` e `build` (frontend/customer-app/package.json:6-7). As promessas de :35-36 não têm `catch`, e o shell só renderiza quando as duas configurações chegam (:39-41); isso não muda a relação.

**2. frontend/shell → frontend/merchant-app.** Mesmo padrão: `import('merchant_app/createAdminAppConfig')` em frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10, com `basename: settings.merchantBasePath` (:13). O destino foi resolvido pelo `name: "merchant_app"` e pela exposição em frontend/merchant-app/webpack.config.js:82-87, que correspondem ao remote do shell (frontend/shell/webpack.config.js:63); a porta 3002 (frontend/merchant-app/webpack.config.js:121) só corrobora. `AdminApp` é renderizado com as props do merchant-app em `${merchantBasePath}/*` (shell-app.bootstrap.tsx:57-65). A configuração do merchant-app acrescenta um `dashboard` às telas (frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:13).

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
