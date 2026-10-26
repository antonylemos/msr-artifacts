---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10 | frontend/shell | dynamic-loading | Yes | `import('customer_app/createAdminAppConfig')` carrega em runtime o módulo exposto pela unidade frontend/customer-app (remote `customer_app@http://localhost:3001/remoteEntry.js` em frontend/shell/webpack.config.js:62; exposto em frontend/customer-app/webpack.config.js:86-87) e chama a fábrica com `onBack` e `basename` (:11-14). `loadCustomerConfig` é chamada em frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:35, arquivo de entrada do shell (frontend/shell/webpack.config.js:7). |
| src-remote-import | frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10 | frontend/shell | dynamic-loading | Yes | `import('merchant_app/createAdminAppConfig')` carrega em runtime o módulo exposto pela unidade frontend/merchant-app (remote `merchant_app@http://localhost:3002/remoteEntry.js` em frontend/shell/webpack.config.js:63; exposto em frontend/merchant-app/webpack.config.js:86-87) e chama a fábrica com `onBack` e `basename` (:11-14). `loadMerchantConfig` é chamada em frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:36, arquivo de entrada do shell (frontend/shell/webpack.config.js:7). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45 | frontend/shell | host-relationship | Yes | `Routes` declara a página inicial do shell em `/` e as rotas `${customerBasePath}/*` e `${merchantBasePath}/*` para as configurações carregadas de customer-app e merchant-app (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45-66); `App` é renderizado na entrada em :81-88. |
| manual | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52 | frontend/shell | runtime-composition | Yes | Renderiza `AdminApp` (de `@bnpl/shared`) com as props devolvidas pela unidade frontend/customer-app, dentro de `ErrorBoundary` e `Suspense` (:50-54); as props trazem os componentes da unidade (`InstallmentList`, `PlanList`, `PlanShow` em frontend/customer-app/src/application/services/create-admin-app-config.service.ts:12-23) e vêm de `loadCustomerConfig` (:35). |
| manual | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:62 | frontend/shell | runtime-composition | Yes | Renderiza `AdminApp` (de `@bnpl/shared`) com as props devolvidas pela unidade frontend/merchant-app, dentro de `ErrorBoundary` e `Suspense` (:60-64); as props trazem os componentes da unidade (`Dashboard`, `PlanList`, `PlanShow`, `PlanCreate` em frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:13-21) e vêm de `loadMerchantConfig` (:36). |

## Resumo

Construções com composição: 5 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 2).

## Notas

- Os remotos não expõem componente React montado por eles mesmos: expõem uma fábrica de configuração (`./createAdminAppConfig`) que devolve as props de `AdminApp`, componente da biblioteca `frontend/shared`; o comentário em frontend/customer-app/webpack.config.js:84 explica a escolha ("No root.render files to prevent multi React Trees in shell").
- As chamadas `loadCustomerConfig()` e `loadMerchantConfig()` em frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:35-36 só envolvem os `import()` da mineração e não viraram linha à parte.
- As únicas outras ocorrências da busca do passo 4 são `import("@bnpl/shared")` de tipo em frontend/shell/src/infrastructure/shell/remotes.d.ts:3-11 (declarações de módulo, sem carga em runtime) e a palavra "storage" num comentário em frontend/shared/src/infrastructure/auth/provider/auth.provider.ts:138; nenhuma é construção de composição.
