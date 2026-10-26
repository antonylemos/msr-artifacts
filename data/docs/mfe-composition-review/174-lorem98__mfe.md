---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Leitura do repositório

Prova de conceito de Module Federation (webpack 5) num monorepo sem workspace: `packages/container` é o shell React e `packages/marketing`, `packages/auth` (React) e `packages/dashboard` (Vue 3) são remotes. O container declara os três remotes no `ModuleFederationPlugin`, com `remoteEntry.js` em localhost:8081-8083 no desenvolvimento (packages/container/config/webpack.dev.js:17-21) ou em `${domain}/<pacote>/latest/remoteEntry.js` na produção (packages/container/config/webpack.prod.js:6, 17-21). Cada remote expõe um único módulo, o próprio `./src/bootstrap`, que exporta uma função `mount(el, opções)` (por exemplo packages/auth/config/webpack.prod.js:15-20 e packages/auth/src/bootstrap.js:22, 57). No container, um wrapper React por remote importa `mount` e o chama sobre uma `div` (packages/container/src/components/AuthApp.js:1, 26), e o `Switch` do App coloca cada wrapper numa rota: auth em `/auth`, dashboard em `/dashboard` só quando `signedIn`, marketing em `/` (packages/container/src/App.js:25-44). A integração é por função, independente de framework: o dashboard Vue entra no React sem biblioteca de interop (packages/container/src/components/DashboardApp.js:11-13, 21; packages/dashboard/src/bootstrap.js:12-14). As três relações têm a mesma forma.

O que não virou relação: os callbacks passados no `mount` não formam relação `communication`, conforme a nota da revisão de código-fonte. O container passa `onNavigate` e recebe `onParentNavigate` para sincronizar o browser history com o memory history do remote (packages/container/src/components/MarketingApp.js:10-22; packages/container/src/components/AuthApp.js:26-38; packages/marketing/src/bootstrap.js:13-29); o auth recebe ainda `onSignIn` e `initialPath` (packages/container/src/components/AuthApp.js:27-28), chama `onSignIn` após login ou cadastro (packages/auth/src/components/Signin.js:57-58) e o container usa esse sinal para liberar `/dashboard` (packages/container/src/App.js:28, 33). No dashboard, `onParentNavigate` é um placeholder vazio (packages/dashboard/src/bootstrap.js:19) e o container não usa o retorno de `mount` (packages/container/src/components/DashboardApp.js:21). Os quatro `import("./bootstrap")` (por exemplo packages/container/src/index.js:1) são internos a cada unidade, assim como o modo de execução isolada de cada remote em desenvolvimento (packages/marketing/src/bootstrap.js:34-41). Os remotes React compartilham `packageJson.dependencies` (packages/marketing/config/webpack.prod.js:19); o dashboard compartilha só `vue` como singleton (packages/dashboard/config/webpack.prod.js:21-26), que o container não usa. Não há `customElements`, `iframe`, `postMessage`, `CustomEvent` nem `BroadcastChannel`, segundo a revisão de código-fonte.

Cada pacote tem `publicPath` próprio em produção (`/container/latest/`, `/marketing/latest/`, `/auth/latest/`, `/dashboard/latest/`; por exemplo packages/container/config/webpack.prod.js:12) e workflow próprio que sincroniza `dist` em `s3://…/<pacote>/latest` (por exemplo .github/workflows/auth.yml:26), o que casa com as URLs dos remotes do container. O deploy em si é tratado na 3.4.6.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/auth | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:19 (remote `auth@http://localhost:8082/remoteEntry.js`); packages/container/config/webpack.prod.js:19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); packages/auth/config/webpack.dev.js:9 (porta 8082); packages/auth/config/webpack.dev.js:16-21 (`name: "auth"`, `filename: "remoteEntry.js"`, expõe `./AuthApp`); packages/auth/config/webpack.prod.js:12 (`publicPath: "/auth/latest/"`); packages/auth/config/webpack.prod.js:16-20 (`name: "auth"`, `filename: "remoteEntry.js"`, expõe `./AuthApp`) | packages/auth/src/bootstrap.js:57; packages/container/src/components/AuthApp.js:26; packages/container/src/components/AuthApp.js:1; packages/container/src/App.js:25 |
| 2 | packages/container | packages/dashboard | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:20 (remote `dashboard@http://localhost:8083/remoteEntry.js`); packages/container/config/webpack.prod.js:20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); packages/dashboard/config/webpack.dev.js:10 (porta 8083); packages/dashboard/config/webpack.dev.js:17-22 (`name: "dashboard"`, `filename: "remoteEntry.js"`, expõe `./DashboardApp`); packages/dashboard/config/webpack.prod.js:12 (`publicPath: "/dashboard/latest/"`); packages/dashboard/config/webpack.prod.js:16-20 (`name: "dashboard"`, `filename: "remoteEntry.js"`, expõe `./DashboardApp`) | packages/dashboard/src/bootstrap.js:36; packages/container/src/components/DashboardApp.js:21; packages/container/src/components/DashboardApp.js:1; packages/container/src/App.js:25 |
| 3 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:18 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:10 (porta 8081); packages/marketing/config/webpack.dev.js:17-21 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`); packages/marketing/config/webpack.prod.js:10 (`publicPath: "/marketing/latest/"`); packages/marketing/config/webpack.prod.js:14-18 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`) | packages/marketing/src/bootstrap.js:46; packages/container/src/components/MarketingApp.js:10; packages/container/src/components/MarketingApp.js:1; packages/container/src/App.js:25 |

## Observações

**1. packages/container → packages/auth.** O remote `auth` do container (packages/container/config/webpack.dev.js:19; packages/container/config/webpack.prod.js:19) corresponde à unidade pelo `name: "auth"` e pelo `./AuthApp` exposto (packages/auth/config/webpack.dev.js:16-20; packages/auth/config/webpack.prod.js:16-19), que é o módulo importado em packages/container/src/components/AuthApp.js:1; na produção, o caminho `/auth/latest/` da URL coincide com o `publicPath` do auth (packages/auth/config/webpack.prod.js:12), e a porta 8082 só corrobora. A relação é ativa: o wrapper chama `mount` (packages/container/src/components/AuthApp.js:26), exportado em packages/auth/src/bootstrap.js:57, e é renderizado na rota `/auth` (packages/container/src/App.js:27-29). É a única relação em que o remote devolve um sinal de estado ao host (`onSignIn`, packages/container/src/App.js:28), tratado na leitura como callback, não como relação própria. A linha de comentário packages/auth/config/webpack.dev.js:19 (Composição `No` na revisão de código-fonte) não entra na coluna Código.

**2. packages/container → packages/dashboard.** Remote `dashboard` (packages/container/config/webpack.dev.js:20; packages/container/config/webpack.prod.js:20), resolvido por `name: "dashboard"` e `./DashboardApp` (packages/dashboard/config/webpack.dev.js:17-21; packages/dashboard/config/webpack.prod.js:16-19) e pelo `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:12). O wrapper importa e chama `mount` (packages/container/src/components/DashboardApp.js:1, 21), e a rota `/dashboard` só o renderiza com `signedIn`, redirecionando para `/auth/signin` caso contrário (packages/container/src/App.js:32-38). O destino é Vue 3: `mount` cria e monta uma aplicação Vue no elemento recebido (packages/dashboard/src/bootstrap.js:12-14); esse `app.mount(el)` é interno à unidade (Composição `No` na revisão de código-fonte). Não há troca de navegação nem de callbacks nesta relação. O `shared` do dashboard declara `vue` como singleton e não inclui React (packages/dashboard/config/webpack.prod.js:21-26); isso não muda a relação.

**3. packages/container → packages/marketing.** Remote `marketing` (packages/container/config/webpack.dev.js:18; packages/container/config/webpack.prod.js:18), resolvido por `name: "marketing"` e `./MarketingApp` (packages/marketing/config/webpack.dev.js:17-20; packages/marketing/config/webpack.prod.js:14-17) e pelo `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10). O wrapper importa `mount`, chama-o com `onNavigate` e registra o `onParentNavigate` devolvido no history do container (packages/container/src/components/MarketingApp.js:1, 10-22); é renderizado na rota `/`, a última do `Switch` (packages/container/src/App.js:41-43), que recebe todo caminho não capturado antes.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
