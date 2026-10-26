---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 237 — Axiean/micro-store

## Mined constructs

No src-* occurrences in matches.csv.

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | store-app/next.config.ts:32 | store-app | host-relationship | Yes | `async rewrites()` declares which application store-app uses and under which path: `/cart/:path*` to `http://cart-app:3000/cart/:path*` (store-app/next.config.ts:36-39); the target is cart-app, service `cart-app` at docker-compose.yml:20-24, which responds at that path through `basePath: "/cart"` (cart-app/next.config.ts:4). store-app is the entry point (docker-compose.yml:6-7, port 3000 at :15). Config exported as `nextConfig` at store-app/next.config.ts:45 |
| manual | store-app/src/store/cartStore.ts:83 | store-app | communication | Yes | The zustand store `useCartStore` is persisted through `persist` under key `cart-storage` in `localStorage` (`name: "cart-storage"`, store-app/src/store/cartStore.ts:83; `storage: createJSONStorage(() => safeLocalStorage)`, :84; `localStorage.setItem`, :26). store-app writes the cart in `addToCart` (:38-55), triggered by `ProductCard` (store-app/src/components/ProductCart.tsx:17), used on page `/` (store-app/src/app/page.tsx:52), and `Header` reads the items (store-app/src/components/Header.tsx:8, mounted at store-app/src/app/layout.tsx:18). The target is cart-app, which declares the same store under the same key (cart-app/src/store/cartStore.ts:83-84) and reads it in `CartDisplay` (cart-app/src/components/CartDisplay.tsx:15, mounted at cart-app/src/app/page.tsx:10). Both apps share `localStorage` because cart-app is served under store-app’s origin through rewrite `/cart/:path*` (store-app/next.config.ts:36-39) |

## Summary

Constructs participating in composition: 2 (host-relationship: 1, communication: 1).

## Notes

- Researcher decision (24/10/2026), valid for all repositories: when the host’s `rewrites()` declares a remote app under a path (`cfg-route-rewrites` in `matches.csv`), decision 013 applies (the step 4 exclusion applies only to `src-*` occurrences). store-app/next.config.ts:32 therefore entered as a manual `host-relationship` / `Yes` row despite being a `cfg-route-rewrites` occurrence in `matches.csv`.
- The `matches.csv` has no `src-*` rows. Multi-zone composition appears in `cfg-*` occurrences: `cfg-route-rewrites` at store-app/next.config.ts:32 (rewrite `/cart/:path*` to `http://cart-app:3000/cart/:path*`, :36-39) and `cfg-zone-path` at cart-app/next.config.ts:4 (`basePath: "/cart"`).
- The step 4 search (`import(`, `React.lazy`, `loadRemote*`, `initFederation`, `customElements`, `registerApplication`, `registerMicroApps`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`) returned nothing in store-app or cart-app: there is no loading, mounting or embedding of one unit within another in source code.
- Navigation from store-app to cart-app uses a full-page link (`<a href="/cart">`, store-app/src/components/Header.tsx:29). Navigation links are not among the step 4 types, so this did not become a row.
- `cart-app/src/store/cartStore.ts` is a copy of `store-app/src/store/cartStore.ts` (lines 1-87 identical except `export` at :12); cart-app also rewrites the key in `removeItem` and `updateQuantity` (:58-80). These are usage points of the same mechanism and did not become rows. Sharing applies when the user enters through store-app (port 3000, docker-compose.yml:13-15); direct access to cart-app on port 3001 (docker-compose.yml:25-28) has a different origin.
