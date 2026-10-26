---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
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

# 197 — charger17/mfe

## Leitura do repositório

Exemplo com quatro pacotes webpack 5 em `packages/`, unidos por Module Federation (`ModuleFederationPlugin` do próprio webpack). `container` é o host React: declara os remotes `marketing`, `auth` e `dashboard`, em desenvolvimento por `localhost:8081-8083` (packages/container/config/webpack.dev.js:20-24) e em produção por `${domain}/<nome>/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:17-21), com `domain` vindo de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6), que o workflow de deploy injeta a partir de um secret (.github/workflows/container.yml:29-32). Cada remote expõe um único módulo, o próprio `src/bootstrap`, que exporta uma função `mount(el, …)`. Dois remotes são React (`auth`, `marketing`) e um é Vue 3 (`dashboard`, packages/dashboard/src/bootstrap.js:1-7), então o host não renderiza componentes dos remotes: ele importa `mount` e o chama sobre um `div` próprio.

O container carrega cada wrapper por `lazy` (packages/container/src/App.js:11-13) e os distribui por rota no `Switch` (packages/container/src/App.js:42-55): `/auth` para o auth, `/dashboard` para o dashboard (com redirecionamento para `/` sem login, packages/container/src/App.js:46-51) e `/` para o marketing. A coordenação entre host e remotes é feita por callbacks passados no `mount`, que não viram relação: o host passa `initialPath` e `onNavigate` e recebe `onParentNavigate`, que registra em `history.listen` (packages/container/src/components/AuthApp.js:10-24; packages/container/src/components/MarketingApp.js:10-20), e os remotes React usam `createMemoryHistory` quando montados pelo host (packages/auth/src/bootstrap.js:7-9; packages/marketing/src/bootstrap.js:7-9). O auth recebe também `onSignIn`, que chega aos botões de login e cadastro (packages/auth/src/App.js:21-26; packages/auth/src/components/Signin.js:102; packages/auth/src/components/Signup.js:127) e muda o estado `isSignedIn` do host (packages/container/src/App.js:22-30, 44). O `isSignedIn` passado a `MarketingLazy` (packages/container/src/App.js:53) não chega ao remote, porque o wrapper não recebe props (packages/container/src/components/MarketingApp.js:5).

Cada remote também roda sozinho em desenvolvimento, montando em um elemento `#_<nome>-dev-root` (packages/auth/src/bootstrap.js:27-33; packages/dashboard/src/bootstrap.js:9-15; packages/marketing/src/bootstrap.js:28-34); essas montagens isoladas não são relações. Não há custom elements, iframes nem troca de mensagens entre as unidades. Não há README que descreva o propósito; a classificação registra o repositório como `example`.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/auth | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:22 (remote `auth@http://localhost:8082/remoteEntry.js`); packages/container/config/webpack.prod.js:19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); packages/auth/config/webpack.dev.js:20-24 (`name: 'auth'`, `filename: 'remoteEntry.js'`, expõe `./AuthApp`); packages/auth/config/webpack.dev.js:10 (`publicPath: 'http://localhost:8082/'`); packages/auth/config/webpack.dev.js:13 (porta 8082); packages/auth/config/webpack.prod.js:14-18 (`name: 'auth'`, `filename: 'remoteEntry.js'`, expõe `./AuthApp`); packages/auth/config/webpack.prod.js:10 (`publicPath: '/auth/latest/'`) | packages/auth/src/bootstrap.js:35; packages/container/src/components/AuthApp.js:10; packages/container/src/components/AuthApp.js:1; packages/container/src/App.js:42 |
| 2 | packages/container | packages/dashboard | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:23 (remote `dashboard@http://localhost:8083/remoteEntry.js`); packages/container/config/webpack.prod.js:20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); packages/dashboard/config/webpack.dev.js:23-27 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`); packages/dashboard/config/webpack.dev.js:10 (`publicPath: 'http://localhost:8083/'`); packages/dashboard/config/webpack.dev.js:13 (porta 8083); packages/dashboard/config/webpack.prod.js:14-18 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`); packages/dashboard/config/webpack.prod.js:10 (`publicPath: '/dashboard/latest/'`) | packages/dashboard/src/bootstrap.js:17; packages/container/src/components/DashboardApp.js:8; packages/container/src/components/DashboardApp.js:1; packages/container/src/App.js:42 |
| 3 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:21 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:20-24 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`); packages/marketing/config/webpack.dev.js:10 (`publicPath: 'http://localhost:8081/'`); packages/marketing/config/webpack.dev.js:13 (porta 8081); packages/marketing/config/webpack.prod.js:14-18 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`); packages/marketing/config/webpack.prod.js:10 (`publicPath: '/marketing/latest/'`) | packages/marketing/src/bootstrap.js:36; packages/container/src/components/MarketingApp.js:10; packages/container/src/components/MarketingApp.js:1; packages/container/src/App.js:42 |

## Observações

**1. packages/container → packages/auth.** O remote `auth` do container corresponde à unidade packages/auth pelo `name: 'auth'` e pelo `filename: 'remoteEntry.js'` (packages/auth/config/webpack.dev.js:20-21; packages/auth/config/webpack.prod.js:14-15), pelo `publicPath` de desenvolvimento igual à URL do remote (packages/auth/config/webpack.dev.js:10) e pelo `publicPath: '/auth/latest/'` de produção, que é o caminho do remote em packages/container/config/webpack.prod.js:19; a porta 8082 só corrobora. O container importa `mount` de `auth/AuthApp` (packages/container/src/components/AuthApp.js:1), que é o `./AuthApp` exposto, e o chama no `ref` do wrapper (packages/container/src/components/AuthApp.js:10), renderizado na rota `/auth` (packages/container/src/App.js:43-45). Pelas linhas `Yes`, a relação é ativa. A linha packages/container/src/App.js:42 também sustenta as relações 2 e 3.

**2. packages/container → packages/dashboard.** O destino foi resolvido pelo `name: 'dashboard'` e pelo `filename` (packages/dashboard/config/webpack.dev.js:23-24; packages/dashboard/config/webpack.prod.js:14-15), pelo `publicPath` de desenvolvimento (packages/dashboard/config/webpack.dev.js:10) e pelo `/dashboard/latest/` de produção (packages/dashboard/config/webpack.prod.js:10), que casa com packages/container/config/webpack.prod.js:20. O remote é Vue 3 dentro de um host React: o `mount(el)` exportado cria a app Vue no elemento recebido (packages/dashboard/src/bootstrap.js:4-7, 17), e o wrapper do container o chama sem opções (packages/container/src/components/DashboardApp.js:8), sem callbacks de navegação. Só o remote dashboard libera CORS no servidor de desenvolvimento (packages/dashboard/config/webpack.dev.js:17-19). A rota `/dashboard` redireciona para `/` sem login (packages/container/src/App.js:46-51), o que condiciona quando o remote aparece, mas não a relação, que é ativa.

**3. packages/container → packages/marketing.** O destino foi resolvido pelo `name: 'marketing'` e pelo `filename` (packages/marketing/config/webpack.dev.js:20-21; packages/marketing/config/webpack.prod.js:14-15), pelo `publicPath` de desenvolvimento (packages/marketing/config/webpack.dev.js:10) e pelo `/marketing/latest/` de produção (packages/marketing/config/webpack.prod.js:10), que casa com packages/container/config/webpack.prod.js:18. O container importa `mount` de `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:1) e o chama com `initialPath` e `onNavigate` (packages/container/src/components/MarketingApp.js:10-18); o wrapper é renderizado na rota `/`, que é a rota padrão do `Switch` (packages/container/src/App.js:52-54). A relação é ativa.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
