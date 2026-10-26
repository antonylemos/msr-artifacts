---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/components/ProductConfig.tsx:5 | apps/shell | dynamic-loading | Yes | `React.lazy` loads `productConfig/App` (apps/shell/src/components/ProductConfig.tsx:4-5), with a local fallback on load failure (:5-26); remote `productConfig` points to `http://localhost:3004/dist/assets/remoteEntry.js` at apps/shell/vite.config.ts:13, and apps/product-config/vite.config.ts:11-12 exposes `./App`. Active: route `/products/*` at apps/shell/src/App.tsx:16, App mounted at apps/shell/src/main.tsx:7-13. |
| src-remote-import | apps/shell/src/components/SalesPortal.tsx:5 | apps/shell | dynamic-loading | Yes | `React.lazy` loads `salesPortal/App` (apps/shell/src/components/SalesPortal.tsx:4-5), with a local fallback on load failure (:5-27); remote `salesPortal` points to `http://localhost:3001/dist/assets/remoteEntry.js` at apps/shell/vite.config.ts:11, and apps/sales-portal/vite.config.ts:11-12 exposes `./App`. Active: route `/sales/*` at apps/shell/src/App.tsx:14. |
| src-remote-import | apps/shell/src/components/UnderwriterPortal.tsx:5 | apps/shell | dynamic-loading | Yes | `React.lazy` loads `underwriterPortal/App` (apps/shell/src/components/UnderwriterPortal.tsx:4-5), with a local fallback on load failure (:5-26); remote `underwriterPortal` points to `http://localhost:3002/dist/assets/remoteEntry.js` at apps/shell/vite.config.ts:12, and apps/underwriter-portal/vite.config.ts:11-12 exposes `./App`. Active: route `/underwriter/*` at apps/shell/src/App.tsx:15. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:12 | apps/shell | host-relationship | Yes | `Routes` declares where shell uses each remote: `/sales/*` → `SalesPortal`, `/underwriter/*` → `UnderwriterPortal`, `/products/*` → `ProductConfig` (apps/shell/src/App.tsx:12-17), components imported at apps/shell/src/App.tsx:5-7; App is mounted inside `BrowserRouter` at apps/shell/src/main.tsx:7-13. |
| manual | apps/shell/src/components/ProductConfig.tsx:75 | apps/shell | runtime-composition | Yes | Renders `RemoteProductConfig`, a component of unit apps/product-config, inside `ErrorBoundary` + `Suspense` (apps/shell/src/components/ProductConfig.tsx:62-77); the component comes from the lazy import at apps/shell/src/components/ProductConfig.tsx:4-5. |
| manual | apps/shell/src/components/SalesPortal.tsx:84 | apps/shell | runtime-composition | Yes | Renders `RemoteSalesPortal`, a component of unit apps/sales-portal, inside `ErrorBoundary` + `Suspense` (apps/shell/src/components/SalesPortal.tsx:69-86); the component comes from the lazy import at apps/shell/src/components/SalesPortal.tsx:4-5. |
| manual | apps/shell/src/components/UnderwriterPortal.tsx:75 | apps/shell | runtime-composition | Yes | Renders `RemoteUnderwriterPortal`, a component of unit apps/underwriter-portal, inside `ErrorBoundary` + `Suspense` (apps/shell/src/components/UnderwriterPortal.tsx:62-77); the component comes from the lazy import at apps/shell/src/components/UnderwriterPortal.tsx:4-5. |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 3, host-relationship: 1, runtime-composition: 3).

## Notes

- The remote modules are declared for TypeScript at apps/shell/src/types/remotes.d.ts:1-14; this is only typing and does not become a row.
- The step 4 search found no communication mechanism between units: the only `addEventListener` calls are in packages/shared-ui (packages/shared-ui/src/hooks/use-mobile.tsx:13, packages/shared-ui/src/components/ui/sidebar.tsx:115), a library judged `No` and used internally for UI.
- The menu links at apps/shell/src/components/Layout.tsx:9-12 only navigate to shell routes; they do not become rows.
