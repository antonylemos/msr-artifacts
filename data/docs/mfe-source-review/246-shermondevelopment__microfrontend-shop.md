---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 246 — shermondevelopment/microfrontend-shop

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/host/src/App.tsx:5 | apps/host | dynamic-loading | Yes | `lazy(() => import('header/Header'))` loads at runtime the module exposed by apps/header (`"./Header": "./src/Header.tsx"`, apps/header/vite.config.ts:17-18), declared as remote `header` in the host (apps/host/vite.config.ts:26-32, `entry` at :12). Active: `App` is rendered by apps/host/src/main.tsx:5 and :13, the entry of apps/host/index.html:11. |
| src-remote-import | apps/host/src/App.tsx:6 | apps/host | dynamic-loading | Yes | `lazy(() => import('footer/Footer'))` loads the module exposed by apps/footer (`'./Footer': './src/Footer.tsx'`, apps/footer/vite.config.ts:17-18), host remote `footer` (apps/host/vite.config.ts:33-39, `entry` at :13). Same active chain as line 5. |
| src-remote-import | apps/host/src/App.tsx:7 | apps/host | dynamic-loading | Yes | `lazy(() => import('products/ProductsList'))` loads the module exposed by apps/products (`"./ProductsList": "./src/ProductsList.tsx"`, apps/products/vite.config.ts:17-18), host remote `products` (apps/host/vite.config.ts:40-46, `entry` at :14-15). Same active chain as line 5. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/host/src/App.tsx:14 | apps/host | runtime-composition | Yes | Renders `<Header />`, the remote apps/header component loaded at apps/host/src/App.tsx:5, inside `RemoteErrorBoundary` and `Suspense` with `HeaderSkeleton` (:12-16). |
| manual | apps/host/src/App.tsx:21 | apps/host | runtime-composition | Yes | Renders `<ProductsList />`, the remote apps/products component loaded at apps/host/src/App.tsx:7, inside `RemoteErrorBoundary` and `Suspense` with `ProductSkeleton` (:19-23). |
| manual | apps/host/src/App.tsx:28 | apps/host | runtime-composition | Yes | Renders `<Footer />`, the remote apps/footer component loaded at apps/host/src/App.tsx:6, inside `RemoteErrorBoundary` and `Suspense` with `FooterSkeleton` (:26-30). |
| manual | packages/shared/src/state/cart-store.ts:12 | — | communication | Yes | `useCartStore` (Zustand with `persist`, key `cart-storage`, :70-72) is cart state shared between apps/products and apps/header: exported by packages/shared/src/index.ts:4 and declared singleton (`zustand` and `@microfrontend/shared`) in the host (apps/host/vite.config.ts:55-60), apps/header (apps/header/vite.config.ts:27-32) and apps/products (apps/products/vite.config.ts:27-32). apps/products writes through `addProduct` (apps/products/src/components/Product.tsx:14 and :36, `ProductCard` used at apps/products/src/ProductsList.tsx:30); apps/header reads items and removes them through `removeAllProduct` (apps/header/src/Header.tsx:16-18 and :27). |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 3, runtime-composition: 3, communication: 1).

## Notes

- packages/shared is `No` in the structural review, as is `.`; the unit of the store row is therefore `—`.
- apps/footer neither uses the store nor declares `@microfrontend/shared` as shared (apps/footer/vite.config.ts:20, `shared: ['react', 'react-dom']`).
- The step 4 search found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`/`dispatchEvent`, `BroadcastChannel` or script loading in apps/ and packages/; uses of `useCartStore` in apps/header/src/Header.test.tsx are tests.
