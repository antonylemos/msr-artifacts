---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Leitura do repositório

Exemplo de micro-frontends com React, Vite e `@originjs/vite-plugin-federation`. O `root-app` é o host (`name: "root_app"`, root-app/vite.config.ts:31-35) e declara quatro remotes (root-app/vite.config.ts:11-24), um para cada uma das outras unidades: `mf-login`, `mf-navbar`, `mf-dashboard` e `mf-personagem-detalhe`. Cada remote expõe um único componente React com `filename: "remoteEntry.js"` (por exemplo mf-login/vite.config.ts:10-17). O host carrega os quatro por `React.lazy(() => import("<remote>/<módulo>"))` (root-app/src/App.tsx:5-8): a `Navbar` aparece acima das rotas quando há usuário (root-app/src/App.tsx:58-60), e login, dashboard e detalhe do personagem entram nas rotas `/login`, `/dashboard` e `/personagem/:id` do `HashRouter` (root-app/src/App.tsx:63-86; root-app/src/main.tsx:9-11).

As URLs dos remotes trocam conforme `IS_LOCAL` (root-app/vite.config.ts:9): `root-app/.env:1` (`IS_LOCAL=false`) aponta para o GitHub Pages (`https://lguilhermecardoso.github.io/mfe-react-vite-example/<mf>/assets/remoteEntry.js`), e `root-app/.env.local.bkp:1` (`IS_LOCAL=true`) aponta para `localhost:4173–4176`, as portas do `vite preview` listadas no README (README.md:62-65), não as portas de dev das configurações (5001–5004, por exemplo mf-login/vite.config.ts:20). Os caminhos de produção correspondem às pastas de saída de cada remote (`outDir: '../dist/<mf>'`, por exemplo mf-login/vite.config.ts:23), que `build-all.sh:8-23` gera em sequência antes de copiar o host para a raiz de `dist`, e `.github/workflows/deploy.yml:19-26` publica `./dist` no GitHub Pages. O host fixa `base: '/mfe-react-vite-example/'` (root-app/vite.config.ts:27).

A troca de dados entre host e remotes é feita por props e callbacks, que não viraram relação de `communication`: `onAuthSuccess` (root-app/src/App.tsx:67; mf-login/src/App.tsx:14), `onLogout` (root-app/src/App.tsx:59; mf-navbar/src/Navbar.tsx:71), `onCharacterClick` (root-app/src/App.tsx:76; mf-dashboard/src/Dashboard.tsx:95) e `onBack` (root-app/src/App.tsx:27; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:60). O `localStorage` é usado pelo host para guardar `user` e `token` (root-app/src/App.tsx:36-46), e mf-login também grava `token` (mf-login/src/LoginForm.tsx:22); o listener de `storage` (root-app/src/App.tsx:52) só ressincroniza o host entre abas, como registra a revisão de código-fonte. Os remotes não importam o host nem uns aos outros. O `mf-navbar/src/App.tsx:4-12` é só um mock para rodar a navbar sozinha.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | root-app | mf-navbar | host → remote | origem → destino | module-federation | Yes | Yes | root-app/vite.config.ts:21-23 (remote `mf_navbar`, local `localhost:4174` ou GitHub Pages `/mf-navbar/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` com `name: "root_app"` e `remotes`); mf-navbar/vite.config.ts:11-15 (`name: "mf_navbar"`, `filename: "remoteEntry.js"`, expõe `./Navbar`); mf-navbar/vite.config.ts:23 (saída `../dist/mf-navbar`) | root-app/src/App.tsx:5; root-app/src/App.tsx:59 |
| 2 | root-app | mf-login | host → remote | origem → destino | module-federation | Yes | Yes | root-app/vite.config.ts:12-14 (remote `mf_login`, local `localhost:4173` ou GitHub Pages `/mf-login/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` com `name: "root_app"` e `remotes`); mf-login/vite.config.ts:11-15 (`name: "mf_login"`, `filename: "remoteEntry.js"`, expõe `./Login`); mf-login/vite.config.ts:23 (saída `../dist/mf-login`) | root-app/src/App.tsx:6; root-app/src/App.tsx:63; root-app/src/App.tsx:67 |
| 3 | root-app | mf-dashboard | host → remote | origem → destino | module-federation | Yes | Yes | root-app/vite.config.ts:15-17 (remote `mf_dashboard`, local `localhost:4175` ou GitHub Pages `/mf-dashboard/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` com `name: "root_app"` e `remotes`); mf-dashboard/vite.config.ts:11-15 (`name: "mf_dashboard"`, `filename: "remoteEntry.js"`, expõe `./Dashboard`); mf-dashboard/vite.config.ts:23 (saída `../dist/mf-dashboard`) | root-app/src/App.tsx:7; root-app/src/App.tsx:63; root-app/src/App.tsx:73 |
| 4 | root-app | mf-personagem-detalhe | host → remote | origem → destino | module-federation | Yes | Yes | root-app/vite.config.ts:18-20 (remote `mf_personagem_detalhe`, local `localhost:4176` ou GitHub Pages `/mf-personagem-detalhe/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` com `name: "root_app"` e `remotes`); mf-personagem-detalhe/vite.config.ts:11-15 (`name: "mf_personagem_detalhe"`, `filename: "remoteEntry.js"`, expõe `./PersonagemDetalhe`); mf-personagem-detalhe/vite.config.ts:23 (saída `../dist/mf-personagem-detalhe`) | root-app/src/App.tsx:8; root-app/src/App.tsx:24; root-app/src/App.tsx:63 |

## Observações

**1. root-app → mf-navbar.** O especificador `mf_navbar/Navbar` (root-app/src/App.tsx:5) corresponde ao `name: "mf_navbar"` e à chave `./Navbar` do remote (mf-navbar/vite.config.ts:11-14), que aponta para `./src/Navbar.tsx`; o caminho de produção `/mf-navbar/` coincide com a pasta de saída (mf-navbar/vite.config.ts:23). A porta local 4174 só corrobora, pelo README (README.md:63). É a única relação que não passa pelas rotas: a navbar é renderizada fora de `Routes`, só quando há usuário, com `user` e `onLogout` (root-app/src/App.tsx:59), por isso root-app/src/App.tsx:63 não entra aqui.

**2. root-app → mf-login.** `mf_login/Login` (root-app/src/App.tsx:6) corresponde a `name: "mf_login"` e `./Login` (mf-login/vite.config.ts:11-14), e `/mf-login/` à saída `../dist/mf-login` (mf-login/vite.config.ts:23). O módulo exposto é o `App` do próprio remote (`./src/App.tsx`, mf-login/vite.config.ts:14), que alterna internamente entre telas e chama `onAuthSuccess` ao autenticar (mf-login/src/App.tsx:10-14). O host o monta na rota `/login` quando não há usuário (root-app/src/App.tsx:64-67).

**3. root-app → mf-dashboard.** `mf_dashboard/Dashboard` (root-app/src/App.tsx:7) corresponde a `name: "mf_dashboard"` e `./Dashboard` (mf-dashboard/vite.config.ts:11-14), e `/mf-dashboard/` à saída `../dist/mf-dashboard` (mf-dashboard/vite.config.ts:23). O host o monta na rota `/dashboard`, com `user`, `token` lido do `localStorage` e `onCharacterClick`, que navega para o detalhe (root-app/src/App.tsx:73-77). A navegação entre dashboard e detalhe passa sempre pelo host; os dois remotes não se referenciam.

**4. root-app → mf-personagem-detalhe.** `mf_personagem_detalhe/PersonagemDetalhe` (root-app/src/App.tsx:8) corresponde a `name: "mf_personagem_detalhe"` e `./PersonagemDetalhe` (mf-personagem-detalhe/vite.config.ts:11-14), e `/mf-personagem-detalhe/` à saída `../dist/mf-personagem-detalhe` (mf-personagem-detalhe/vite.config.ts:23). O host o renderiza num wrapper que lê o `id` da rota e passa `onBack` (root-app/src/App.tsx:20-29), usado em `/personagem/:id` (root-app/src/App.tsx:81-84).

## Resumo

Relações: 4 (host → remote: 4). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
