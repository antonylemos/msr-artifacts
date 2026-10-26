---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 197 — charger17/mfe

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | packages/auth/src/bootstrap.js:35 | packages/auth | runtime-composition | Yes | Exporta `mount(el, { onNavigate, defaultHistory, initialPath, onSignIn })`, que renderiza a App do auth em packages/auth/src/bootstrap.js:6-25; exposto como `./AuthApp` em packages/auth/config/webpack.prod.js:16-17 e packages/auth/config/webpack.dev.js:22-23 e consumido pelo container em packages/container/src/components/AuthApp.js:1 e :10. |
| src-mount-export | packages/dashboard/src/bootstrap.js:17 | packages/dashboard | runtime-composition | Yes | Exporta `mount(el)`, que cria a app Vue do dashboard em packages/dashboard/src/bootstrap.js:4-7; exposto como `./DashboardApp` em packages/dashboard/config/webpack.prod.js:16-17 e packages/dashboard/config/webpack.dev.js:25-26 e consumido pelo container em packages/container/src/components/DashboardApp.js:1 e :8. |
| src-mount-export | packages/marketing/src/bootstrap.js:36 | packages/marketing | runtime-composition | Yes | Exporta `mount(el, { onNavigate, defaultHistory, initialPath })`, que renderiza a App do marketing em packages/marketing/src/bootstrap.js:6-26; exposto como `./MarketingApp` em packages/marketing/config/webpack.prod.js:16-17 e packages/marketing/config/webpack.dev.js:22-23 e consumido pelo container em packages/container/src/components/MarketingApp.js:1 e :10. |
| src-mount-call | packages/container/src/components/AuthApp.js:10 | packages/container | runtime-composition | Yes | Monta o remote `auth` no `ref` do wrapper (packages/container/src/components/AuthApp.js:9-25); remote declarado em packages/container/config/webpack.prod.js:19 e packages/container/config/webpack.dev.js:22; wrapper carregado por `lazy` em packages/container/src/App.js:12 e renderizado na rota `/auth` em packages/container/src/App.js:43-45; App renderizada em packages/container/src/bootstrap.js:5-8, carregado pela entrada packages/container/src/index.js:1. |
| src-mount-call | packages/container/src/components/DashboardApp.js:8 | packages/container | runtime-composition | Yes | Monta o remote `dashboard` no `ref` do wrapper (packages/container/src/components/DashboardApp.js:7-9); remote declarado em packages/container/config/webpack.prod.js:20 e packages/container/config/webpack.dev.js:23; wrapper carregado por `lazy` em packages/container/src/App.js:13 e renderizado na rota `/dashboard` em packages/container/src/App.js:46-51; App renderizada em packages/container/src/bootstrap.js:5-8. |
| src-mount-call | packages/container/src/components/MarketingApp.js:10 | packages/container | runtime-composition | Yes | Monta o remote `marketing` no `ref` do wrapper (packages/container/src/components/MarketingApp.js:9-21); remote declarado em packages/container/config/webpack.prod.js:18 e packages/container/config/webpack.dev.js:21; wrapper carregado por `lazy` em packages/container/src/App.js:11 e renderizado na rota `/` em packages/container/src/App.js:52-54; App renderizada em packages/container/src/bootstrap.js:5-8. |
| src-mount-call | packages/dashboard/src/bootstrap.js:6 | packages/dashboard | runtime-composition | No | `app.mount(el)` do Vue renderiza o componente Dashboard da própria unidade (packages/dashboard/src/bootstrap.js:4-7); a fronteira com o container é o export `mount` de packages/dashboard/src/bootstrap.js:17. |
| src-mount-import | packages/container/src/components/AuthApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `auth/AuthApp`, usado em packages/container/src/components/AuthApp.js:10. |
| src-mount-import | packages/container/src/components/DashboardApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `dashboard/DashboardApp`, usado em packages/container/src/components/DashboardApp.js:8. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `marketing/MarketingApp`, usado em packages/container/src/components/MarketingApp.js:10. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/container/src/App.js:42 | packages/container | host-relationship | Yes | O `Switch` declara onde auth (`/auth`), dashboard (`/dashboard`, com redirecionamento para `/` sem login) e marketing (`/`) entram na UI do container (packages/container/src/App.js:42-55), pelos wrappers de packages/container/src/App.js:11-13; App renderizada em packages/container/src/bootstrap.js:5-8. |

## Resumo

Construções com composição: 10 (runtime-composition: 9, host-relationship: 1).

## Notas

- Os `import()` de packages/container/src/App.js:11-13 carregam wrappers locais do container e os `import ('./bootstrap…')` dos quatro `src/index.js` carregam o próprio bootstrap; são internos e não viram linha.
- Pelo passo 4, os callbacks trocados no `mount` não viram linhas: o container passa `initialPath`, `onNavigate` e, ao auth, `onSignIn` (packages/container/src/components/AuthApp.js:10-22, packages/container/src/components/MarketingApp.js:10-18) e recebe `onParentNavigate`, registrado em `history.listen` (packages/container/src/components/AuthApp.js:24, packages/container/src/components/MarketingApp.js:20); o auth repassa `onSignIn` aos botões em packages/auth/src/components/Signin.js:102 e packages/auth/src/components/Signup.js:127.
- O container passa `isSignedIn` a `MarketingLazy` (packages/container/src/App.js:53), mas o wrapper de packages/container/src/components/MarketingApp.js:5 não recebe props; o valor não chega ao remote.
- Os `mount(devRoot, …)` de desenvolvimento (packages/auth/src/bootstrap.js:31, packages/dashboard/src/bootstrap.js:13, packages/marketing/src/bootstrap.js:32) são montagens isoladas de cada remote e não estão no `matches.csv`; não viram linha.
- Nenhum custom element, iframe, `postMessage`, `CustomEvent` ou armazenamento compartilhado no código das unidades.
