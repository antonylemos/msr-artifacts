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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10 | frontend/shell | dynamic-loading | Yes | `import('customer_app/createAdminAppConfig')` loads at runtime the module exposed by unit frontend/customer-app (remote `customer_app@http://localhost:3001/remoteEntry.js` at frontend/shell/webpack.config.js:62; exposed at frontend/customer-app/webpack.config.js:86-87) and calls the factory with `onBack` and `basename` (:11-14). `loadCustomerConfig` is called at frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:35, the shell entry file (frontend/shell/webpack.config.js:7). |
| src-remote-import | frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10 | frontend/shell | dynamic-loading | Yes | `import('merchant_app/createAdminAppConfig')` loads at runtime the module exposed by unit frontend/merchant-app (remote `merchant_app@http://localhost:3002/remoteEntry.js` at frontend/shell/webpack.config.js:63; exposed at frontend/merchant-app/webpack.config.js:86-87) and calls the factory with `onBack` and `basename` (:11-14). `loadMerchantConfig` is called at frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:36, the shell entry file (frontend/shell/webpack.config.js:7). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45 | frontend/shell | host-relationship | Yes | `Routes` declares the shell home page at `/` and routes `${customerBasePath}/*` and `${merchantBasePath}/*` for configurations loaded from customer-app and merchant-app (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45-66); `App` is rendered at the entry at :81-88. |
| manual | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52 | frontend/shell | runtime-composition | Yes | Renders `AdminApp` (from `@bnpl/shared`) with props returned by unit frontend/customer-app, inside `ErrorBoundary` and `Suspense` (:50-54); props carry the unit’s components (`InstallmentList`, `PlanList`, `PlanShow` at frontend/customer-app/src/application/services/create-admin-app-config.service.ts:12-23) and come from `loadCustomerConfig` (:35). |
| manual | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:62 | frontend/shell | runtime-composition | Yes | Renders `AdminApp` (from `@bnpl/shared`) with props returned by unit frontend/merchant-app, inside `ErrorBoundary` and `Suspense` (:60-64); props carry the unit’s components (`Dashboard`, `PlanList`, `PlanShow`, `PlanCreate` at frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:13-21) and come from `loadMerchantConfig` (:36). |

## Summary

Constructs participating in composition: 5 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 2).

## Notes

- The remotes do not expose a React component they mount themselves: they expose a configuration factory (`./createAdminAppConfig`) returning props for `AdminApp`, a component from library `frontend/shared`; the comment at frontend/customer-app/webpack.config.js:84 explains the choice ("No root.render files to prevent multi React Trees in shell").
- The `loadCustomerConfig()` and `loadMerchantConfig()` calls at frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:35-36 only wrap the mined `import()` calls and did not become separate rows.
- The only other step 4 search occurrences are type `import("@bnpl/shared")` at frontend/shell/src/infrastructure/shell/remotes.d.ts:3-11 (module declarations without runtime loading) and the word "storage" in a comment at frontend/shared/src/infrastructure/auth/provider/auth.provider.ts:138; neither is a composition construct.
