---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 177 — Varshithknaik/mfe-lect

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | auth/src/index.js:1 | auth | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade; interno a auth. |
| src-async-bootstrap | container/src/index.js:1 | container | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade; interno a container. |
| src-async-bootstrap | marketing/src/index.js:1 | marketing | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade; interno a marketing. |
| src-async-bootstrap | packages/auth/src/index.js:1 | packages/auth | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade; interno a packages/auth. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade; interno a packages/container. |
| src-async-bootstrap | packages/dashboard/src/index.js:1 | packages/dashboard | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade; interno a packages/dashboard. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade; interno a packages/marketing. |
| src-mount-export | auth/src/bootstrap.js:46 | auth | runtime-composition | Yes | Exporta `mount(el, { onSignIn, onNavigate, defaultHistory, initialPath })` definido em auth/src/bootstrap.js:7-32; exposto como `./AuthApp` em auth/config/webpack.prod.js:16-17 e auth/config/webpack.dev.js:21-22; consumido por container em container/src/components/AuthApp.js:12. |
| src-mount-export | marketing/src/bootstrap.js:41 | marketing | runtime-composition | Yes | Exporta `mount(el, { onNavigate, defaultHistory, initialPath })` definido em marketing/src/bootstrap.js:7-30; exposto como `./MarketingApp` em marketing/config/webpack.prod.js:16-17 e marketing/config/webpack.dev.js:21-22; consumido por container em container/src/components/MarketingApp.js:13. |
| src-mount-export | packages/auth/src/bootstrap.js:46 | packages/auth | runtime-composition | Yes | Exporta `mount` definido em packages/auth/src/bootstrap.js:7-32; exposto como `./AuthApp` em packages/auth/config/webpack.prod.js:16-17 e packages/auth/config/webpack.dev.js:22-23; consumido por packages/container em packages/container/src/components/AuthApp.js:13. |
| src-mount-export | packages/dashboard/src/bootstrap.js:22 | packages/dashboard | runtime-composition | Yes | Exporta `mount(el)` definido em packages/dashboard/src/bootstrap.js:5-8; exposto como `./DashboardApp` em packages/dashboard/config/webpack.prod.js:16-17 e packages/dashboard/config/webpack.dev.js:25-26; consumido por packages/container em packages/container/src/components/DashboardApp.js:8. |
| src-mount-export | packages/marketing/src/bootstrap.js:46 | packages/marketing | runtime-composition | Yes | Exporta `mount` definido em packages/marketing/src/bootstrap.js:7-32; exposto como `./MarketingApp` em packages/marketing/config/webpack.prod.js:16-17 e packages/marketing/config/webpack.dev.js:22-23; consumido por packages/container em packages/container/src/components/MarketingApp.js:13. |
| src-mount-call | container/src/components/AuthApp.js:12 | container | runtime-composition | Yes | Monta o remote `auth` (auth/AuthApp) no `div` do wrapper, passando `initialPath`, `onNavigate` e `onSignIn` e guardando `onParentNavigate` (container/src/components/AuthApp.js:12-20); remote declarado em container/config/webpack.prod.js:19 e container/config/webpack.dev.js:22; wrapper carregado por `lazy` em container/src/App.js:15 e ligado à rota `/auth/*` em container/src/App.js:36-39. |
| src-mount-call | container/src/components/MarketingApp.js:13 | container | runtime-composition | Yes | Monta o remote `marketing` (marketing/MarketingApp) no `div` do wrapper, com `onNavigate` e `initialPath` (container/src/components/MarketingApp.js:13-20); remote declarado em container/config/webpack.prod.js:18 e container/config/webpack.dev.js:21; wrapper carregado em container/src/App.js:14 e ligado à rota `/*` em container/src/App.js:44. |
| src-mount-call | packages/container/src/components/AuthApp.js:13 | packages/container | runtime-composition | Yes | Monta o remote `auth` no `div` do wrapper, com `initialPath`, `onNavigate` e `onSignIn` (packages/container/src/components/AuthApp.js:13-21); remote declarado em packages/container/config/webpack.dev.js:22 e packages/container/config/webpack.prod.js:19; wrapper carregado em packages/container/src/App.js:9 e ligado à rota `/auth/*` em packages/container/src/App.js:30-32. |
| src-mount-call | packages/container/src/components/DashboardApp.js:8 | packages/container | runtime-composition | Yes | Monta o remote `dashboard` (Vue) no `div` do wrapper; remote declarado em packages/container/config/webpack.dev.js:23 e packages/container/config/webpack.prod.js:20; wrapper carregado em packages/container/src/App.js:10 e ligado à rota `/dashboard` em packages/container/src/App.js:33-35 (só com `isSignedIn`). |
| src-mount-call | packages/container/src/components/MarketingApp.js:13 | packages/container | runtime-composition | Yes | Monta o remote `marketing` no `div` do wrapper, com `initialPath` e `onNavigate` (packages/container/src/components/MarketingApp.js:13-20); remote declarado em packages/container/config/webpack.dev.js:21 e packages/container/config/webpack.prod.js:18; wrapper carregado em packages/container/src/App.js:8 e ligado à rota `/*` em packages/container/src/App.js:36. |
| src-mount-call | packages/dashboard/src/bootstrap.js:7 | packages/dashboard | runtime-composition | No | `app.mount(el)` do Vue renderiza o componente Dashboard da própria unidade (packages/dashboard/src/bootstrap.js:5-8); a fronteira com o host é o `export { mount }` em packages/dashboard/src/bootstrap.js:22. |
| src-mount-import | container/src/components/AuthApp.js:1 | container | runtime-composition | Yes | Importa `mount` do remote `auth/AuthApp`; usado em container/src/components/AuthApp.js:12. |
| src-mount-import | container/src/components/MarketingApp.js:1 | container | runtime-composition | Yes | Importa `mount` do remote `marketing/MarketingApp`; usado em container/src/components/MarketingApp.js:13. |
| src-mount-import | packages/container/src/components/AuthApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `auth/AuthApp`; usado em packages/container/src/components/AuthApp.js:13. |
| src-mount-import | packages/container/src/components/DashboardApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `dashboard/DashboardApp`; usado em packages/container/src/components/DashboardApp.js:8. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `marketing/MarketingApp`; usado em packages/container/src/components/MarketingApp.js:13. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | container/src/App.js:35 | container | host-relationship | Yes | `Routes` declara onde os wrappers dos remotes entram: `AuthLazy` em `/auth/*` e `MarketingLazy` em `/*` (container/src/App.js:35-45); a rota `/dashboard` com `DashboardLazy` está comentada (container/src/App.js:16 e 40-43). App montado em container/src/bootstrap.js:5-6. |
| manual | packages/container/src/App.js:29 | packages/container | host-relationship | Yes | `Routes` declara `AuthLazy` em `/auth/*`, `DashboardLazy` em `/dashboard` (protegida por `isSignedIn`) e `MarketingLazy` em `/*` (packages/container/src/App.js:29-37). App montado em packages/container/src/bootstrap.js:5-6. |

## Resumo

Construções com composição: 17 (runtime-composition: 15, host-relationship: 2).

## Notas

- Os `lazy(() => import('./components/...'))` de container/src/App.js:14-15 e packages/container/src/App.js:8-10 carregam wrappers locais do próprio container; não viraram linha manual. O `DashboardLazy` de container/src/App.js:16 está comentado, assim como o remote `dashboard` em container/config/webpack.prod.js:20.
- A navegação entre host e remotes usa callbacks (`onNavigate`, `onParentNavigate`, `onSignIn`), registrados na Observação das linhas de montagem; a busca do passo 4 não encontrou `CustomEvent`, `postMessage`, `BroadcastChannel`, iframes ou custom elements.
- Há duas cópias da aplicação: a da raiz (auth, container, marketing) e a de `packages/` (que acrescenta dashboard). Os remotes de cada container usam os mesmos nomes e portas (8081 marketing, 8082 auth) nas duas cópias (auth/config/webpack.dev.js:12, packages/auth/config/webpack.dev.js:13, marketing/config/webpack.dev.js:12, packages/marketing/config/webpack.dev.js:13), e os caminhos de produção `…/auth/latest` e `…/marketing/latest` são publicados só a partir da raiz (.github/workflows/marketing.yml:7-8 e 23). A unidade alvo de cada montagem foi tomada como a da mesma cópia; isso não muda as respostas, porque em qualquer caso o alvo é outra unidade.
- `dashboard/` da raiz não é unidade e não tem código-fonte no snapshot.
