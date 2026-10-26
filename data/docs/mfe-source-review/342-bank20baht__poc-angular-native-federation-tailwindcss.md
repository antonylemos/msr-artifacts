---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | host/src/main.ts:7 | host | dynamic-loading | No | `import('./bootstrap')` de arquivo local, depois do `initFederation` (host/src/main.ts:3-8); interno ao host. |
| src-async-bootstrap | remote/src/main.ts:5 | remote | dynamic-loading | No | `import('./bootstrap')` de arquivo local, depois do `initFederation()` (remote/src/main.ts:3-6); interno ao remote. |
| src-load-remote | host/src/app/app.routes.ts:1 | host | remote-resolution | Yes | Import de `loadRemoteModule`, que habilita as resoluções de host/src/app/app.routes.ts:11 e :22 (ambas `Yes`). |
| src-load-remote | host/src/app/app.routes.ts:11 | host | remote-resolution | Yes | `loadRemoteModule('remote', './Component')` na rota `''` com `loadComponent` (host/src/app/app.routes.ts:8-16); resolve o `App` exposto pelo remote em `./Component` (remote/federation.config.js:7-8), com `Fallback` em caso de erro. Ativo: `routes` registrado por `provideRouter` (host/src/app/app.config.ts:10), usado em host/src/bootstrap.ts:5, carregado por host/src/main.ts:7. |
| src-load-remote | host/src/app/app.routes.ts:22 | host | remote-resolution | Yes | `loadRemoteModule('remote', './routes')` na rota `flights` com `loadChildren` (host/src/app/app.routes.ts:18-28); resolve `APP_ROUTES` exposto pelo remote em `./routes` (remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3), com `fallbackRoutes` em caso de erro. Mesma cadeia ativa da linha 11. |
| src-load-remote | host/src/main.ts:1 | host | remote-resolution | Yes | Import de `initFederation`, que habilita a chamada de host/src/main.ts:3 (`Yes`). |
| src-load-remote | host/src/main.ts:3 | host | remote-resolution | Yes | `initFederation` com o mapa `'remote': 'http://localhost:4201/remoteEntry.json'` (host/src/main.ts:3-5); registra o remote, servido na porta 4201 (remote/angular.json:108), antes do bootstrap do host (host/src/main.ts:7). Ponto de entrada do host (host/angular.json:60). |
| src-load-remote | remote/src/main.ts:1 | remote | remote-resolution | No | Import de `initFederation`, que habilita a chamada de remote/src/main.ts:3 (`No`). |
| src-load-remote | remote/src/main.ts:3 | remote | remote-resolution | No | `initFederation()` sem manifesto nem remotes (remote/src/main.ts:3); o remote só expõe `./Component` e `./routes` (remote/federation.config.js:7-10) e não resolve outra unidade. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | host/src/app/app.routes.ts:7 | host | host-relationship | Yes | Tabela de rotas do host que nomeia o remote e onde ele entra: `''` → `remote/./Component` e `flights` → `remote/./routes` (host/src/app/app.routes.ts:7-29); registrada por `provideRouter(routes)` em host/src/app/app.config.ts:10, e o host renderiza o resultado no `<router-outlet>` de host/src/app/app.html:2. |

## Resumo

Construções com composição: 6 (remote-resolution: 5, host-relationship: 1).

## Notas

- Os `import()` das rotas do próprio remote (remote/src/app/app.routes.ts:7; remote/src/app/modules/home/home.routes.ts:7, :12) são de arquivos locais e não entram na tabela manual.
- host/src/remote.d.ts:1 declara o módulo `remote/Styles?inline`, mas nenhum arquivo do host o importa e o remote não expõe `./Styles` (remote/federation.config.js:7-10); não é construção de composição.
- Não há `cfg-route-rewrites` no `matches.csv` deste repositório; a regra da opção B não se aplica.
