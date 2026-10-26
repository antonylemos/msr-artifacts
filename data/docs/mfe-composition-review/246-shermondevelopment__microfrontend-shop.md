---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Repository overview

A React/Vite e-commerce example in an npm workspaces monorepo, joined by Module Federation (`@module-federation/vite`). `apps/host` is the shell: it declares three remotes, `header`, `footer` and `products` (apps/host/vite.config.ts:25-47), and loads them with `lazy(() => import('<remote>/<módulo>'))` (English translation of the placeholder: module) (apps/host/src/App.tsx:5-7). Each remote is its own application exposing one component through `remoteEntry.js`: `./Header` (apps/header/vite.config.ts:14-19), `./Footer` (apps/footer/vite.config.ts:14-19) and `./ProductsList` (apps/products/vite.config.ts:14-19). The host assembles the page in three bands, each with `RemoteErrorBoundary` and `Suspense` with a skeleton from `@microfrontend/ui` (apps/host/src/App.tsx:12-30), so one remote's failure does not bring down the others.

Remote URLs come from environment variables, defaulting to `http://localhost:300N/remoteEntry.js` (apps/host/vite.config.ts:12-15). In CI they are supplied through repository variables (.github/workflows/ci-cd.yml:102-104), whose values are absent from the snapshot. Targets were resolved through remote `name` and `exposes`, not the URL.

Besides visual composition, remotes `products` and `header` communicate through the cart: the Zustand store `useCartStore` in packages/shared (packages/shared/src/state/cart-store.ts:12), declared a singleton in host and both remotes. Packages/shared is not a unit, so appears as neither Source nor Target. The host only provides the shared store and neither reads nor writes it, and footer does not use it (apps/footer/vite.config.ts:20 shares only `react` and `react-dom`). The README describes the same arrangement (README.md:34-38 and :171). All four structural units participate in at least one relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/host | apps/header | host → remote | source → target | module-federation | Yes | Yes | apps/host/vite.config.ts:26-32 (remote `header`, `name: 'header'`, `entry: headerRemote`); apps/host/vite.config.ts:12 (`VITE_HEADER_REMOTE_URL` or `http://localhost:3001/remoteEntry.js`); apps/header/vite.config.ts:14-19 (`name: "header"`, `filename: "remoteEntry.js"`, exposes `./Header`); apps/header/vite.config.ts:41 (port 3001) | apps/host/src/App.tsx:5; apps/host/src/App.tsx:14 |
| 2 | apps/host | apps/footer | host → remote | source → target | module-federation | Yes | Yes | apps/host/vite.config.ts:33-39 (remote `footer`, `name: 'footer'`, `entry: footerRemote`); apps/host/vite.config.ts:13 (`VITE_FOOTER_REMOTE_URL` or `http://localhost:3002/remoteEntry.js`); apps/footer/vite.config.ts:14-19 (`name: 'footer'`, `filename: 'remoteEntry.js'`, exposes `./Footer`); apps/footer/vite.config.ts:25 (port 3002) | apps/host/src/App.tsx:6; apps/host/src/App.tsx:28 |
| 3 | apps/host | apps/products | host → remote | source → target | module-federation | Yes | Yes | apps/host/vite.config.ts:40-46 (remote `products`, `name: 'products'`, `entry: productsRemote`); apps/host/vite.config.ts:14-15 (`VITE_PRODUCTS_REMOTE_URL` or `http://localhost:3003/remoteEntry.js`); apps/products/vite.config.ts:14-19 (`name: "products"`, `filename: "remoteEntry.js"`, exposes `./ProductsList`); apps/products/vite.config.ts:41 (port 3003) | apps/host/src/App.tsx:7; apps/host/src/App.tsx:21 |
| 4 | apps/products | apps/header | communication | source → target | events | Yes | Yes | apps/host/vite.config.ts:55-60 (`zustand` and `@microfrontend/shared` singleton); apps/header/vite.config.ts:27-32 (same); apps/products/vite.config.ts:27-32 (same) | packages/shared/src/state/cart-store.ts:12 |

## Observations

**1. apps/host → apps/header.** The host's `header` remote matches apps/header through `name: "header"` and exposed module `./Header` (apps/header/vite.config.ts:14-18), the `header/Header` specifier imported in apps/host/src/App.tsx:5; port 3001 in the default URL (apps/host/vite.config.ts:12; apps/header/vite.config.ts:41) only corroborates. The component is rendered in apps/host/src/App.tsx:14, and `App` is mounted by the host entry point (apps/host/src/main.tsx:5 and :13), hence the relationship is active.

**2. apps/host → apps/footer.** Resolved identically: `name: 'footer'` and exposed `./Footer` (apps/footer/vite.config.ts:14-18) match `footer/Footer` in apps/host/src/App.tsx:6; port 3002 (apps/footer/vite.config.ts:25) corroborates. Rendered in apps/host/src/App.tsx:28. Unlike the other two remotes, footer shares only `react` and `react-dom` (apps/footer/vite.config.ts:20), without `singleton`, while the host requests `singleton: true` for both (apps/host/vite.config.ts:49-54).

**3. apps/host → apps/products.** `name: "products"` and exposed `./ProductsList` (apps/products/vite.config.ts:14-18) match `products/ProductsList` in apps/host/src/App.tsx:7; port 3003 (apps/products/vite.config.ts:41) corroborates. Rendered in apps/host/src/App.tsx:21, inside the page's main `section` (apps/host/src/App.tsx:18-24).

**4. apps/products → apps/header.** The channel is `useCartStore` (packages/shared/src/state/cart-store.ts:12), Zustand with `persist` under key `cart-storage` (:70-72), exported by packages/shared/src/index.ts:4. It becomes a single state across remotes through being a Module Federation singleton (`zustand` and `@microfrontend/shared`) in host and both remotes. Apps/products writes: `ProductCard` calls `addProduct` (apps/products/src/components/Product.tsx:14 and :36), and `ProductCard` is used in apps/products/src/ProductsList.tsx:30, the exposed module. Apps/header reads items and total quantity (apps/header/src/Header.tsx:16-17). Header also writes, removing items with `removeAllProduct` (apps/header/src/Header.tsx:18 and :27), but apps/products does not read the cart: it only uses `addProduct`. Hence direction is `source → target`, from products to header, rather than `bidirectional`. Mechanism is `events`, as a shared reactive service. The host provides the store but does not use it (apps/host/src/main.tsx:4 imports from `@microfrontend/shared` only `createAppQueryClient`), so is not part of the relationship. The relationship is active because the source code review line is `Yes`.

## Summary

Relationships: 4 (host → remote: 3, communication: 1). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.

