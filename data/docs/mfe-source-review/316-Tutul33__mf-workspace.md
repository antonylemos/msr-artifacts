---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/customer-app/src/main.ts:5 | projects/customer-app | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local de customer-app depois de initFederation (projects/customer-app/src/main.ts:3-5; projects/customer-app/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | projects/host-app/src/main.ts:7 | projects/host-app | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local do host depois de initFederation (projects/host-app/src/main.ts:3-7; projects/host-app/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | projects/orders-app/src/main.ts:5 | projects/orders-app | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local de orders-app depois de initFederation (projects/orders-app/src/main.ts:3-5; projects/orders-app/src/bootstrap.ts:5); interno à unidade. |
| src-load-remote | projects/customer-app/src/main.ts:1 | projects/customer-app | remote-resolution | No | Importa initFederation para a chamada sem argumento em projects/customer-app/src/main.ts:3; prepara o runtime da própria unidade, sem resolver outra aplicação. |
| src-load-remote | projects/customer-app/src/main.ts:3 | projects/customer-app | remote-resolution | No | `initFederation()` sem manifesto nem remotes; customer-app só expõe `./CustomerRoutes` (projects/customer-app/federation.config.js:7-10), que o host carrega sem executar este main. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:2 | projects/host-app | remote-resolution | Yes | Importa loadRemoteModule usado nas rotas `customers` e `orders` (projects/host-app/src/app/app.routes.ts:8 e projects/host-app/src/app/app.routes.ts:16). |
| src-load-remote | projects/host-app/src/app/app.routes.ts:8 | projects/host-app | remote-resolution | Yes | Rota `customers` carrega `./CustomerRoutes` de http://localhost:4301/remoteEntry.json e usa `CustomerRoutesModule` (projects/host-app/src/app/app.routes.ts:5-11); 4301 é a porta de customer-app (angular.json:227), que expõe o módulo em projects/customer-app/federation.config.js:9 (classe em projects/customer-app/src/app/customer/customer-routes.module.ts:12). Rotas registradas por provideRouter em projects/host-app/src/app/app.config.ts:10, usado em projects/host-app/src/bootstrap.ts:5. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:16 | projects/host-app | remote-resolution | Yes | Rota `orders` carrega `./OrdersRoutes` de http://localhost:4302/remoteEntry.json e usa `OrdersRoutesModule` (projects/host-app/src/app/app.routes.ts:13-19); 4302 é a porta de orders-app (angular.json:340), que expõe o módulo em projects/orders-app/federation.config.js:9 (classe em projects/orders-app/src/app/orders/orders-routes.module.ts:12). Mesma cadeia de registro da linha 8. |
| src-load-remote | projects/host-app/src/main.ts:1 | projects/host-app | remote-resolution | No | Importa initFederation para a chamada de projects/host-app/src/main.ts:3, que recebeu No (ver a linha seguinte). |
| src-load-remote | projects/host-app/src/main.ts:3 | projects/host-app | remote-resolution | No | `initFederation` registra o remote `customerApp` em http://localhost:4200/remoteEntry.json (projects/host-app/src/main.ts:3-5), mas 4200 é a porta do próprio host (angular.json:114; README.md:192), não a de customer-app (4301, angular.json:227); o nome `customerApp` não é usado por nenhum loadRemoteModule, que recebe a URL direto (projects/host-app/src/app/app.routes.ts:9 e :17). Não resolve outra unidade; ver Notas. |
| src-load-remote | projects/orders-app/src/main.ts:1 | projects/orders-app | remote-resolution | No | Importa initFederation para a chamada sem argumento em projects/orders-app/src/main.ts:3; prepara o runtime da própria unidade, sem resolver outra aplicação. |
| src-load-remote | projects/orders-app/src/main.ts:3 | projects/orders-app | remote-resolution | No | `initFederation()` sem manifesto nem remotes; orders-app só expõe `./OrdersRoutes` (projects/orders-app/federation.config.js:7-10), que o host carrega sem executar este main. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | projects/host-app/src/app/app.routes.ts:4 | projects/host-app | host-relationship | Yes | `routes` declara os caminhos `customers` e `orders` que nomeiam customer-app e orders-app (projects/host-app/src/app/app.routes.ts:4-26), registrados por provideRouter em projects/host-app/src/app/app.config.ts:10; apresentados pelos links e pelo `<router-outlet />` de projects/host-app/src/app/app.html:1-3. |

## Resumo

Construções com composição: 4 (remote-resolution: 3, host-relationship: 1).

## Notas

- Cadeia ativa do host: angular.json:62 → projects/host-app/src/main.ts:3-7 → projects/host-app/src/bootstrap.ts:5 → projects/host-app/src/app/app.config.ts:10 → projects/host-app/src/app/app.routes.ts:4-26.
- O `initFederation` do host (projects/host-app/src/main.ts:3-5) recebeu No, e não Undetermined, porque a URL aponta para a porta do próprio host e a composição com customer-app passa toda por loadRemoteModule com URL explícita. Se a intenção era registrar customer-app, a porta está errada; isso não muda o Resumo, pois nem No nem Undetermined contam.
- A busca do passo 4 achou ainda `import('./customer/home/home')` em projects/customer-app/src/app/app.routes.ts:7, lazy loading interno de customer-app, e trechos de código no README.md e em angular_20_microfrontend_app_guide.md, que não são construções. Não há `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, injeção de `<script>`, `registerRemotes`, `addEventListener` ou serviço compartilhado entre unidades em `projects/`.
- A rota vazia do host redireciona para ela mesma (projects/host-app/src/app/app.routes.ts:21-25); não afeta as rotas dos remotes.
