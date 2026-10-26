---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Leitura do repositório

Projeto de aprendizado de Module Federation com webpack 5 (README.md:1-5): um shell React (`container`) carrega remotes React `marketing` e `auth` e, numa das cópias, um dashboard Vue. O snapshot tem duas árvores com os mesmos nomes de unidade. Na raiz, `container`, `marketing` e `auth` formam a versão que o autor desenvolveu e publica por workflows: cada um sincroniza seu `dist` em `<bucket>/<unidade>/latest` (.github/workflows/container.yml:25; .github/workflows/marketing.yml:23; .github/workflows/auth.yml:23). Em `packages/`, `container`, `marketing`, `auth` e `dashboard` formam uma cópia completa, sem workflow. Em cada árvore o container é o único host: declara os remotes no `ModuleFederationPlugin` (container/config/webpack.dev.js:20-23; packages/container/config/webpack.dev.js:20-24), e cada remote expõe seu `./src/bootstrap` com `filename: "remoteEntry.js"` (por exemplo marketing/config/webpack.dev.js:19-23).

A integração segue o mesmo desenho nas duas árvores. O container tem, para cada remote, um wrapper React que importa `mount` do módulo exposto e o chama num `div` (container/src/components/MarketingApp.js:1, 13-18); os wrappers entram por `lazy` e são ligados a rotas do `BrowserRouter` do container: `/auth/*` para auth e `/*` para marketing (container/src/App.js:35-45), mais `/dashboard`, só com login, na cópia de `packages/` (packages/container/src/App.js:33-35). Cada remote define `mount` e o exporta (auth/src/bootstrap.js:7-32, 46).

O que não virou relação: os callbacks trocados no `mount`. O container passa `onNavigate` e `initialPath` (e `onSignIn` para auth) e guarda o `onParentNavigate` devolvido, sincronizando o histórico do navegador com o histórico em memória do remote (container/src/components/AuthApp.js:12-27; auth/src/bootstrap.js:8-31); o dashboard recebe só o elemento (packages/container/src/components/DashboardApp.js:8; packages/dashboard/src/bootstrap.js:5-8). Essas trocas não foram registradas como construções na 3.4.4 e não aparecem como `communication`. Na raiz, a rota `/dashboard` e o remote `dashboard` estão comentados (container/src/App.js:16, 40-43; container/config/webpack.prod.js:20), e o `dashboard/` da raiz só tem `package.json`, sem unidade nem código. Os `import('./bootstrap')` de cada `src/index.js` e o modo de execução isolada de cada remote em desenvolvimento (marketing/src/bootstrap.js:33-38) são internos a cada unidade. Os containers e remotes compartilham `packageJson.dependencies`; na cópia de `packages/`, React, ReactDOM e React Router são `singleton` (packages/container/config/webpack.dev.js:25-39; packages/marketing/config/webpack.dev.js:25-39).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | auth | host → remote | origem → destino | module-federation | Yes | Yes | container/config/webpack.dev.js:22 (remote `auth` em `http://localhost:8082/remoteEntry.js`); container/config/webpack.prod.js:19 (remote `auth` em `${domain}/auth/latest/remoteEntry.js`); auth/config/webpack.dev.js:19-23 (`name: "auth"`, `filename: "remoteEntry.js"`, expõe `./AuthApp`); auth/config/webpack.dev.js:9 (`publicPath` `http://localhost:8082/`); auth/config/webpack.prod.js:10 (`publicPath` `/auth/latest/`); auth/config/webpack.prod.js:14-17 (`name: "auth"`, `filename: "remoteEntry.js"`, expõe `./AuthApp`) | auth/src/bootstrap.js:46; container/src/components/AuthApp.js:12; container/src/components/AuthApp.js:1; container/src/App.js:35 |
| 2 | container | marketing | host → remote | origem → destino | module-federation | Yes | Yes | container/config/webpack.dev.js:21 (remote `marketing` em `http://localhost:8081/remoteEntry.js`); container/config/webpack.prod.js:18 (remote `marketing` em `${domain}/marketing/latest/remoteEntry.js`); marketing/config/webpack.dev.js:19-23 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`); marketing/config/webpack.dev.js:9 (`publicPath` `http://localhost:8081/`); marketing/config/webpack.prod.js:10 (`publicPath` `/marketing/latest/`); marketing/config/webpack.prod.js:14-17 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`) | marketing/src/bootstrap.js:41; container/src/components/MarketingApp.js:13; container/src/components/MarketingApp.js:1; container/src/App.js:35 |
| 3 | packages/container | packages/auth | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:22 (remote `auth` em `http://localhost:8082/remoteEntry.js`); packages/container/config/webpack.prod.js:19 (remote `auth` em `${domain}/auth/latest/remoteEntry.js`); packages/auth/config/webpack.dev.js:20-24 (`name: 'auth'`, `filename: 'remoteEntry.js'`, expõe `./AuthApp`); packages/auth/config/webpack.dev.js:10 (`publicPath` `http://localhost:8082/`); packages/auth/config/webpack.prod.js:10 (`publicPath` `/auth/latest/`); packages/auth/config/webpack.prod.js:14-17 (`name: 'auth'`, `filename: 'remoteEntry.js'`, expõe `./AuthApp`) | packages/auth/src/bootstrap.js:46; packages/container/src/components/AuthApp.js:13; packages/container/src/components/AuthApp.js:1; packages/container/src/App.js:29 |
| 4 | packages/container | packages/dashboard | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:23 (remote `dashboard` em `http://localhost:8083/remoteEntry.js`); packages/container/config/webpack.prod.js:20 (remote `dashboard` em `${domain}/dashboard/latest/remoteEntry.js`); packages/dashboard/config/webpack.dev.js:23-27 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`); packages/dashboard/config/webpack.dev.js:10 (`publicPath` `http://localhost:8083/`); packages/dashboard/config/webpack.prod.js:10 (`publicPath` `/dashboard/latest/`); packages/dashboard/config/webpack.prod.js:14-17 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`) | packages/dashboard/src/bootstrap.js:22; packages/container/src/components/DashboardApp.js:8; packages/container/src/components/DashboardApp.js:1; packages/container/src/App.js:29 |
| 5 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:21 (remote `marketing` em `http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:18 (remote `marketing` em `${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:20-24 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`); packages/marketing/config/webpack.dev.js:10 (`publicPath` `http://localhost:8081/`); packages/marketing/config/webpack.prod.js:10 (`publicPath` `/marketing/latest/`); packages/marketing/config/webpack.prod.js:14-17 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`) | packages/marketing/src/bootstrap.js:46; packages/container/src/components/MarketingApp.js:13; packages/container/src/components/MarketingApp.js:1; packages/container/src/App.js:29 |

## Observações

**1. container → auth.** O remote `auth` do container corresponde à unidade pelo `name: "auth"`, pelo `remoteEntry.js` e pelo `publicPath` `/auth/latest/` (auth/config/webpack.prod.js:10-17); a porta 8082 só corrobora. O mesmo nome e o mesmo `publicPath` existem em packages/auth (packages/auth/config/webpack.prod.js:10-17), então a configuração sozinha não separa as duas cópias. O destino foi tomado como o auth da raiz, como na revisão de código-fonte (nota sobre as duas cópias), porque é o que o workflow publica em `auth/latest`, o caminho do remote de produção (.github/workflows/auth.yml:8, 23; container/config/webpack.prod.js:19). A relação é ativa: o wrapper importa `mount` de `auth/AuthApp` (container/src/components/AuthApp.js:1) e o chama ao montar (container/src/components/AuthApp.js:12-18), e o wrapper entra na rota `/auth/*` (container/src/App.js:36-39).

**2. container → marketing.** Resolvido como na relação 1: `name: "marketing"`, `remoteEntry.js` e `publicPath` `/marketing/latest/` (marketing/config/webpack.prod.js:10-17), com a porta 8081 só como corroboração; o caminho de produção é publicado pelo workflow de `marketing/**` (.github/workflows/marketing.yml:8, 23). O wrapper importa e chama `mount` (container/src/components/MarketingApp.js:1, 13-18) e é ligado à rota `/*` (container/src/App.js:44), então a relação é ativa e é a página padrão do container.

**3. packages/container → packages/auth.** O remote `auth` corresponde a packages/auth pelo `name`, pelo `remoteEntry.js` e pelo `publicPath` `/auth/latest/` (packages/auth/config/webpack.prod.js:10-17). A mesma correspondência vale para o auth da raiz; o destino foi tomado na mesma cópia, como na revisão de código-fonte. Em qualquer caso o destino está no snapshot. A montagem é ativa (packages/container/src/components/AuthApp.js:1, 13-19), na rota `/auth/*` (packages/container/src/App.js:30-32).

**4. packages/container → packages/dashboard.** É a única relação sem ambiguidade de cópia: só packages/dashboard declara `name: 'dashboard'` com `exposes` `./DashboardApp` (packages/dashboard/config/webpack.prod.js:14-17), e o `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:10) bate com o remote de produção (packages/container/config/webpack.prod.js:20). O container passa só o elemento ao `mount` (packages/container/src/components/DashboardApp.js:8), sem callbacks; o dashboard é Vue e monta seu componente com `createApp` (packages/dashboard/src/bootstrap.js:5-8). A rota `/dashboard` só renderiza o wrapper com login e redireciona para `/` sem ele (packages/container/src/App.js:33-35); a relação é ativa porque a carga e a montagem estão no código.

**5. packages/container → packages/marketing.** Resolvido como na relação 3, por `name`, `remoteEntry.js` e `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10-17), na mesma cópia. A montagem é ativa (packages/container/src/components/MarketingApp.js:1, 13-18), na rota `/*` (packages/container/src/App.js:36).

## Resumo

Relações: 5 (host → remote: 5). Ativas: 5. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
