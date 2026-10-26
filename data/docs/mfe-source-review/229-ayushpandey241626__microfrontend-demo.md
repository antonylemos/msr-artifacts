---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/host-app/src/main.ts:1 | projects/host-app | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (projects/host-app/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | projects/login-mfe-app/src/main.ts:1 | projects/login-mfe-app | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (projects/login-mfe-app/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | projects/mfe1/src/main.ts:1 | projects/mfe1 | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (projects/mfe1/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | projects/mfe2/src/main.ts:1 | projects/mfe2 | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (projects/mfe2/src/bootstrap.ts:5); interno à unidade. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:3 | projects/host-app | remote-resolution | Yes | Importa `loadRemoteModule` de `@angular-architects/module-federation`, usado em projects/host-app/src/app/app.routes.ts:17, :27 e :36. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:17 | projects/host-app | remote-resolution | Yes | `loadRemoteModule({ type: 'module', exposedModule: './ContactsModule', remoteEntry: 'http://localhost:4201/remoteEntry.js' })` (projects/host-app/src/app/app.routes.ts:17-21) carrega as rotas de projects/mfe1 na rota `contacts`; `./ContactsModule` exposto em projects/mfe1/webpack.config.js:10-11 e porta 4201 em angular.json:177; rotas registradas por `provideRouter(routes)` em projects/host-app/src/app/app.config.ts:12, usado em projects/host-app/src/bootstrap.ts:5. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:27 | projects/host-app | remote-resolution | Yes | `loadRemoteModule({ type: 'module', exposedModule: './AdminModule', remoteEntry: 'http://localhost:4202/remoteEntry.js' })` (projects/host-app/src/app/app.routes.ts:27-31) carrega as rotas de projects/mfe2 na rota `admin`; `./AdminModule` exposto em projects/mfe2/webpack.config.js:10-11 e porta 4202 em angular.json:278; mesma cadeia de registro da linha anterior. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:36 | projects/host-app | remote-resolution | Yes | `loadRemoteModule({ type: 'module', exposedModule: './LoginModule', remoteEntry: 'http://localhost:4203/remoteEntry.js' })` (projects/host-app/src/app/app.routes.ts:36-40) carrega as rotas de projects/login-mfe-app na rota `login`; `./LoginModule` exposto em projects/login-mfe-app/webpack.config.js:10-11 e porta 4203 em angular.json:383; mesma cadeia de registro. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | projects/host-app/src/app/app.routes.ts:7 | projects/host-app | host-relationship | Yes | A tabela `routes` declara onde cada remote entra no host: `contacts` → mfe1, `admin` → mfe2, `login` → login-mfe-app, com redirecionamento inicial para `login` (projects/host-app/src/app/app.routes.ts:7-46); `contacts` e `admin` protegidas por `AuthGuard` (:15, :25); registrada por `provideRouter(routes)` em projects/host-app/src/app/app.config.ts:12. |
| manual | projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63 | projects/login-mfe-app | communication | Yes | `localStorage.setItem('isLoggedIn', 'true')` grava o estado de sessão no login e navega para `/contacts` (:64); a mesma chave é lida pelo `AuthGuard` do host (projects/host-app/src/app/auth.guard.ts:11) para liberar as rotas `contacts` e `admin` (projects/host-app/src/app/app.routes.ts:15, :25). O componente entra no host pelas rotas expostas em projects/login-mfe-app/src/app/login/login-form.routes.ts:4. |

## Resumo

Construções com composição: 6 (remote-resolution: 4, host-relationship: 1, communication: 1).

## Notas

- Os `remotes` estáticos de projects/host-app/webpack.config.js:21-25 (`mfe1`, `mfe2`, `loginMfeApp`) não são usados no código: não há `import('mfe1/...')` nem equivalente; o host carrega os três remotes só por `loadRemoteModule` com `type: 'module'` e URL de `remoteEntry`. O nome `loginMfeApp` difere do `name: "login-mfe-app"` em projects/login-mfe-app/webpack.config.js:7, o que não afeta a carga por URL.
- O logout do host (projects/host-app/src/app/app.component.ts:71-74) só navega para `/login`; nenhum código remove a chave `isLoggedIn`.
- A busca do passo 4 achou também `import()` locais de rotas internas (projects/mfe1/src/app/app.routes.ts:8, projects/mfe2/src/app/app.routes.ts:7, projects/login-mfe-app/src/app/app.routes.ts:7) e o uso de `localStorage` da chave `contacts` dentro de mfe1 (projects/mfe1/src/app/contact-list/contact-list.component.ts:109, :301, :318); são internos à unidade e não viraram linha. Não há custom elements, iframes, `postMessage`, `CustomEvent`, `BroadcastChannel` nem injeção de script.
