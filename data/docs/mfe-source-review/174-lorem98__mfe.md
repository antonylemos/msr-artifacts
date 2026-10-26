---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 174 — lorem98/mfe

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/auth/src/index.js:4 | packages/auth | dynamic-loading | No | `import("./bootstrap")` carrega o próprio bootstrap da unidade (packages/auth/src/bootstrap.js); interno à unidade. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import("./bootstrap")` carrega o próprio bootstrap da unidade (packages/container/src/bootstrap.js); interno à unidade. |
| src-async-bootstrap | packages/dashboard/src/index.js:3 | packages/dashboard | dynamic-loading | No | `import("./bootstrap")` carrega o próprio bootstrap da unidade (packages/dashboard/src/bootstrap.js); interno à unidade. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import("./bootstrap")` carrega o próprio bootstrap da unidade (packages/marketing/src/bootstrap.js); interno à unidade. |
| src-mount-export | packages/auth/src/bootstrap.js:57 | packages/auth | runtime-composition | Yes | Exporta `mount` (packages/auth/src/bootstrap.js:22-42), exposto como `./AuthApp` em packages/auth/config/webpack.prod.js:18-20 e packages/auth/config/webpack.dev.js:18-21, e chamado pelo container em packages/container/src/components/AuthApp.js:26. |
| src-mount-export | packages/dashboard/src/bootstrap.js:36 | packages/dashboard | runtime-composition | Yes | Exporta `mount` (packages/dashboard/src/bootstrap.js:12-21), exposto como `./DashboardApp` em packages/dashboard/config/webpack.prod.js:18-20 e packages/dashboard/config/webpack.dev.js:19-22, e chamado pelo container em packages/container/src/components/DashboardApp.js:21. |
| src-mount-export | packages/marketing/src/bootstrap.js:46 | packages/marketing | runtime-composition | Yes | Exporta `mount` (packages/marketing/src/bootstrap.js:7-30), exposto como `./MarketingApp` em packages/marketing/config/webpack.prod.js:16-18 e packages/marketing/config/webpack.dev.js:19-21, e chamado pelo container em packages/container/src/components/MarketingApp.js:10. |
| src-mount-call | packages/container/src/components/AuthApp.js:26 | packages/container | runtime-composition | Yes | `mount(ref.current, {...})` (packages/container/src/components/AuthApp.js:26-36) monta a unidade auth, importada de `auth/AuthApp` em packages/container/src/components/AuthApp.js:1 e resolvida pelo remote `auth` em packages/container/config/webpack.prod.js:19; o wrapper é renderizado na rota `/auth` em packages/container/src/App.js:27-29, e o App é montado em packages/container/src/bootstrap.js:5. |
| src-mount-call | packages/container/src/components/DashboardApp.js:21 | packages/container | runtime-composition | Yes | `mount(ref.current)` monta a unidade dashboard (Vue), importada de `dashboard/DashboardApp` em packages/container/src/components/DashboardApp.js:1 e resolvida pelo remote `dashboard` em packages/container/config/webpack.prod.js:20; o wrapper é renderizado na rota `/dashboard` quando `signedIn` em packages/container/src/App.js:32-38. |
| src-mount-call | packages/container/src/components/MarketingApp.js:10 | packages/container | runtime-composition | Yes | `mount(ref.current, {...})` (packages/container/src/components/MarketingApp.js:10-20) monta a unidade marketing, importada de `marketing/MarketingApp` em packages/container/src/components/MarketingApp.js:1 e resolvida pelo remote `marketing` em packages/container/config/webpack.prod.js:18; o wrapper é renderizado na rota `/` em packages/container/src/App.js:41-43. |
| src-mount-call | packages/dashboard/src/bootstrap.js:14 | packages/dashboard | runtime-composition | No | `app.mount(el)` do Vue renderiza a UI da própria unidade dentro da função `mount` (packages/dashboard/src/bootstrap.js:12-14); a fronteira com o container é o export de packages/dashboard/src/bootstrap.js:36. |
| src-mount-import | packages/auth/config/webpack.dev.js:19 | packages/auth | none | No | Linha de comentário (`// The container imports this as: import { mount } from "auth/AuthApp"`) acima do `exposes` em packages/auth/config/webpack.dev.js:18-21; não é código executável. |
| src-mount-import | packages/container/src/components/AuthApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `auth/AuthApp`; chamado em packages/container/src/components/AuthApp.js:26. |
| src-mount-import | packages/container/src/components/DashboardApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `dashboard/DashboardApp`; chamado em packages/container/src/components/DashboardApp.js:21. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `marketing/MarketingApp`; chamado em packages/container/src/components/MarketingApp.js:10. |
| src-mount-import | packages/dashboard/config/webpack.dev.js:20 | packages/dashboard | none | No | Linha de comentário (`// The container imports this as: import { mount } from "dashboard/DashboardApp"`) acima do `exposes` em packages/dashboard/config/webpack.dev.js:19-22; não é código executável. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/container/src/App.js:25 | packages/container | host-relationship | Yes | O `Switch` (packages/container/src/App.js:25-44) declara onde as unidades entram na UI: `AuthApp` em `/auth` (:27-29), `DashboardApp` em `/dashboard`, protegido por `signedIn` com redirecionamento para `/auth/signin` (:32-38), e `MarketingApp` em `/` (:41-43); wrappers importados em packages/container/src/App.js:5-7 e App montado em packages/container/src/bootstrap.js:5. |

## Resumo

Construções com composição: 10 (runtime-composition: 9, host-relationship: 1).

## Notas

- As chamadas `mount` do container usam o nome importado do remote, e a mineração as pegou (`src-mount-call`); por isso não há linhas manuais de montagem.
- Pelo passo 4, os callbacks trocados no `mount` não viram linhas: o container passa `onSignIn`, `onNavigate` e `initialPath` e recebe `onParentNavigate` (packages/container/src/components/AuthApp.js:26-38; packages/container/src/components/MarketingApp.js:10-22); o auth chama `onSignIn` em packages/auth/src/components/Signin.js:58 e packages/auth/src/components/Signup.js:59, e o container usa esse sinal para liberar `/dashboard` (packages/container/src/App.js:28 e :33). O `onParentNavigate` do dashboard é vazio (packages/dashboard/src/bootstrap.js:19) e o container não o usa (packages/container/src/components/DashboardApp.js:21).
- A busca do passo 4 achou só os quatro `import("./bootstrap")` já na mineração; não há `customElements`, `iframe`, `postMessage`, `CustomEvent` nem `BroadcastChannel` nas unidades.
- As URLs de produção dos remotes dependem de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6 e :18-20); em desenvolvimento apontam para localhost:8081-8083 (packages/container/config/webpack.dev.js:18-20).
