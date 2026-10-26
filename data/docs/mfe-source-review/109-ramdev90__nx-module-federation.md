---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | shell/src/app/app.routes.ts:7 | shell | dynamic-loading | Yes | `loadChildren` importa `customer/Routes` e usa `m!.remoteRoutes` (shell/src/app/app.routes.ts:5-8); o alvo é a unidade customer, que expõe `./Routes` apontando para customer/src/app/remote-entry/entry.routes.ts (customer/module-federation.config.ts:5-7), arquivo que exporta `remoteRoutes` (customer/src/app/remote-entry/entry.routes.ts:4). Cadeia ativa: shell/src/main.ts:1 → shell/src/bootstrap.ts:5 → shell/src/app/app.config.ts:6-9 → `appRoutes`. |
| src-remote-import | shell/src/app/app.routes.ts:11 | shell | dynamic-loading | Yes | `loadChildren` importa `orders/Routes` e usa `m!.remoteRoutes` (shell/src/app/app.routes.ts:9-12); alvo orders, que expõe `./Routes` para orders/src/app/remote-entry/entry.routes.ts (orders/module-federation.config.ts:5-7), com `remoteRoutes` exportado em orders/src/app/remote-entry/entry.routes.ts:4. |
| src-remote-import | shell/src/app/app.routes.ts:15 | shell | dynamic-loading | Yes | `loadChildren` importa `products/Routes` e usa `m!.remoteRoutes` (shell/src/app/app.routes.ts:13-16); alvo products, que expõe `./Routes` para products/src/app/remote-entry/entry.routes.ts (products/module-federation.config.ts:5-7), com `remoteRoutes` exportado em products/src/app/remote-entry/entry.routes.ts:5-8. |
| src-async-bootstrap | customer/src/main.ts:1 | customer | dynamic-loading | No | Importa o bootstrap local da própria unidade (customer/src/main.ts:1 → customer/src/bootstrap.ts:5); não atravessa fronteira de unidade. |
| src-async-bootstrap | orders/src/main.ts:1 | orders | dynamic-loading | No | Importa o bootstrap local da própria unidade (orders/src/main.ts:1 → orders/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | products/src/main.ts:1 | products | dynamic-loading | No | Importa o bootstrap local da própria unidade (products/src/main.ts:1 → products/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | shell/src/main.ts:1 | shell | dynamic-loading | No | Importa o bootstrap local do shell (shell/src/main.ts:1 → shell/src/bootstrap.ts:5); interno à unidade. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/app/app.routes.ts:4 | shell | host-relationship | Yes | `appRoutes` declara sob quais caminhos o shell usa customer, orders e products (shell/src/app/app.routes.ts:4-21); registrado por `provideRouter(appRoutes)` em shell/src/app/app.config.ts:6-9 e apresentado pelo `router-outlet` e pelo menu em shell/src/app/app.html:1-7. |
| manual | orders/src/app/remote-entry/nx-welcome.ts:512 | orders | other | Yes | O template de orders renderiza `<app-product-list>` (orders/src/app/remote-entry/nx-welcome.ts:512), componente da unidade products importado por caminho relativo que atravessa a fronteira de projeto (orders/src/app/remote-entry/nx-welcome.ts:3, declarado em `imports` na linha 7; seletor em products/src/app/product-list.ts:4). Não é Module Federation: a inclusão é em tempo de build, por isso `other`. Construção ativa: orders/src/app/remote-entry/entry.routes.ts:4 → orders/src/app/remote-entry/entry.ts:5-7 → este template. |

## Resumo

Construções com composição: 5 (dynamic-loading: 3, host-relationship: 1, other: 1).

## Notas

- Os quatro `src-async-bootstrap` são o padrão Nx/Angular de bootstrap assíncrono dentro da própria unidade; são falso positivo recorrente para interação entre unidades.
- As buscas do passo 4 encontraram ainda `import('./remote-entry/entry.routes')` em customer/src/app/app.routes.ts:7, orders/src/app/app.routes.ts:7 e products/src/app/app.routes.ts:7: são imports de módulos da própria unidade e não entram na tabela.
- `withModuleFederation` (shell/webpack.config.ts:9; products/webpack.config.ts:9; orders/webpack.config.ts:9; customer/webpack.config.ts:9) e os `remotes`/`exposes` (shell/module-federation.config.ts:17; products/module-federation.config.ts:5-7; orders/module-federation.config.ts:5-7; customer/module-federation.config.ts:5-7) são configuração de build, não construções de código-fonte; aparecem aqui só como evidência das linhas acima.
- `apps/microfrontend-workspace` (unidade `Yes` na revisão estrutural) não tem nenhuma construção de composição: suas rotas estão vazias (apps/microfrontend-workspace/src/app/app.routes.ts:1-3) e o template tem só NxWelcome e um router-outlet sem rotas (apps/microfrontend-workspace/src/app/app.html:1-2).
- O import cruzado orders → products registrado na linha manual coincide com a exceção já anotada na classificação (`docs/mfe-classification/109-ramdev90__nx-module-federation.md`, Q2); aqui ele é descrito como construção, sem rever a classificação.
- Buscas por `customElements`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<iframe>`, `registerApplication`, `registerMicroApps`, `loadRemote*`, `System.import` e `createElement('script'` nos arquivos do snapshot (exceto `package-lock.json`) não retornaram nada: não há mecanismo explícito de comunicação entre as unidades.
