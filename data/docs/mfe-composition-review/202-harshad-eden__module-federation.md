---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Repository overview

An example of a fictitious insurance platform: a pnpm monorepo with four React/Vite applications joined by Module Federation (`@originjs/vite-plugin-federation`). `apps/shell` is the host, on port 3000 and without `exposes` (apps/shell/vite.config.ts:8-16, 23-25). It declares three remotes, `salesPortal`, `underwriterPortal` and `productConfig` (apps/shell/vite.config.ts:10-14). Each matches an application in `apps/` exposing `./App` in a `remoteEntry.js` (apps/sales-portal/vite.config.ts:9-13; apps/underwriter-portal/vite.config.ts:9-13; apps/product-config/vite.config.ts:9-13). All four share `react`, `react-dom` and `react-router-dom` (for example apps/shell/vite.config.ts:15).

The entry pattern is identical for all three remotes. For each, the shell has a wrapper component performing `React.lazy(() => import("<remote>/App"))`, with a local error component in `.catch` (apps/shell/src/components/SalesPortal.tsx:4-5). The wrapper renders the remote inside `ErrorBoundary` and `Suspense` (apps/shell/src/components/SalesPortal.tsx:84). Shell routes connect each wrapper to a prefix: `/sales/*`, `/underwriter/*` and `/products/*` (apps/shell/src/App.tsx:12-17). The shell is mounted inside `BrowserRouter` (apps/shell/src/main.tsx:7-13), and remotes use the host router for their internal routes. For example, sales-portal declares both `/quotes` and `/sales/quotes` (apps/sales-portal/src/App.tsx:11-18). Remote modules have type declarations only for TypeScript (apps/shell/src/types/remotes.d.ts:1-14).

There is no inter-unit communication: the source code review found no messaging mechanism, and applications exchange code only through workspace packages `packages/shared-ui` and `packages/shared-types`, which are not units. Remote URLs are fixed on `localhost` and point to the generated bundle (`/dist/assets/remoteEntry.js`, apps/shell/vite.config.ts:11-13). Documentation mentions two more applications, `employer-portal` and `service-provider` (README.md:11-19, 85-88), absent from the snapshot and with no remote declared in the shell. All four structural review units participate in a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/product-config | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:13 (remote `productConfig` at `http://localhost:3004/dist/assets/remoteEntry.js`); apps/product-config/vite.config.ts:9-13 (`name: "productConfig"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/product-config/vite.config.ts:26 (port 3004) | apps/shell/src/components/ProductConfig.tsx:5; apps/shell/src/App.tsx:12; apps/shell/src/components/ProductConfig.tsx:75 |
| 2 | apps/shell | apps/sales-portal | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:11 (remote `salesPortal` at `http://localhost:3001/dist/assets/remoteEntry.js`); apps/sales-portal/vite.config.ts:9-13 (`name: "salesPortal"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/sales-portal/vite.config.ts:26 (port 3001) | apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/App.tsx:12; apps/shell/src/components/SalesPortal.tsx:84 |
| 3 | apps/shell | apps/underwriter-portal | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:12 (remote `underwriterPortal` at `http://localhost:3002/dist/assets/remoteEntry.js`); apps/underwriter-portal/vite.config.ts:9-13 (`name: "underwriterPortal"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/underwriter-portal/vite.config.ts:26 (port 3002) | apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/App.tsx:12; apps/shell/src/components/UnderwriterPortal.tsx:75 |

## Observations

**1. apps/shell → apps/product-config.** The shell declares the remote through key `productConfig` (apps/shell/vite.config.ts:13). This key matches apps/product-config's federation `name` (apps/product-config/vite.config.ts:9), and the URL's file is the `filename` declared there (apps/product-config/vite.config.ts:10). Port 3004 (apps/product-config/vite.config.ts:26) only corroborates. The imported module, `productConfig/App` (apps/shell/src/components/ProductConfig.tsx:5), is the exposed `./App` (apps/product-config/vite.config.ts:11-12). The relationship is active: the wrapper is rendered at `/products/*` (apps/shell/src/App.tsx:16) and renders the remote component (apps/shell/src/components/ProductConfig.tsx:75). If loading fails, a local notice appears, but this does not alter the relationship. The remote declares only routes `/` and `/products` (apps/product-config/src/App.tsx:10-11).

**2. apps/shell → apps/sales-portal.** The target was resolved identically: key `salesPortal` (apps/shell/vite.config.ts:11) matches apps/sales-portal's `name` and `filename` (apps/sales-portal/vite.config.ts:9-10), exposing `./App` (apps/sales-portal/vite.config.ts:11-12). Port 3001 (apps/sales-portal/vite.config.ts:26) only corroborates. The relationship is active through route `/sales/*` (apps/shell/src/App.tsx:14), the import of `salesPortal/App` (apps/shell/src/components/SalesPortal.tsx:5) and rendering of the remote component (apps/shell/src/components/SalesPortal.tsx:84). Inside the remote, routes appear with and without prefix `/sales` (apps/sales-portal/src/App.tsx:11-18), allowing the same screens to be served both under the shell and independently.

**3. apps/shell → apps/underwriter-portal.** The target was resolved through key `underwriterPortal` (apps/shell/vite.config.ts:12), matching apps/underwriter-portal's `name` and `filename` (apps/underwriter-portal/vite.config.ts:9-10), and the exposed `./App` (apps/underwriter-portal/vite.config.ts:11-12). Port 3002 (apps/underwriter-portal/vite.config.ts:26) only corroborates. The relationship is active through route `/underwriter/*` (apps/shell/src/App.tsx:15), the import of `underwriterPortal/App` (apps/shell/src/components/UnderwriterPortal.tsx:5) and rendering (apps/shell/src/components/UnderwriterPortal.tsx:75). As in sales-portal, internal routes exist with and without prefix `/underwriter` (apps/underwriter-portal/src/App.tsx:11-18).

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

