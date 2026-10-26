---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
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

# 237 — Axiean/micro-store

## Repository overview

An example made as a frontend technical assessment (README.md:3): a store with two independent
Next.js applications joined by Next.js Multi-Zones (README.md:5-12). `store-app` is the storefront
and user entry point (docker-compose.yml:6-7, port 3000 at :15); `cart-app` is the
cart, served under `basePath: "/cart"` (cart-app/next.config.ts:4).

Composition uses server routes, rather than mounting on the page. `store-app` declares in
`rewrites()` that every `/cart/:path*` request goes to `http://cart-app:3000/cart/:path*`
(store-app/next.config.ts:32-41), and the comment itself calls this "the core of the
Multi-Zone micro-frontend architecture" (store-app/next.config.ts:28). Hostname `cart-app` is the
Compose service name built from `./cart-app` (docker-compose.yml:20-24). Each zone
renders the entire page with its own layout. As in 013, none of the types `host → remote`,
`root-config → application`, `application → custom-element` or `page → embedded-frontend`
describes this entry method, hence the route relationship is `other`.

The second connection is cart state. Both zones have a copy of the same zustand store,
persisted under the same `cart-storage` key in `localStorage` (store-app/src/store/cartStore.ts:83-84;
cart-app/src/store/cartStore.ts:83-84). `store-app` writes when adding products and `cart-app`
reads the list to display the cart. This works because the rewrite places `cart-app` under the
`store-app` origin; accessed directly on port 3001 (docker-compose.yml:25-28), `cart-app` is under
another origin and does not see the same `localStorage`.

What did not become a relationship: navigation from `store-app` to cart is a full-page link
(`<a href="/cart">`, store-app/src/components/Header.tsx:29), not a relationship type.
`cartStore.ts` is copied in each zone, rather than imported between units. Alias `@repo/ui/*` to
`../../packages/ui/*` in both `tsconfig.json` files points to an absent snapshot directory and is
unused. There is no dependency on inspected technologies (dependency review) or
module loading by one zone from another.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | store-app | cart-app | other | source → target | other | Yes | Yes | store-app/next.config.ts:36-39 (`/cart/:path*` → `http://cart-app:3000/cart/:path*`); docker-compose.yml:20-24 (service `cart-app`, `context: ./cart-app`); cart-app/next.config.ts:4 (`basePath: "/cart"`) | store-app/next.config.ts:32 |
| 2 | store-app | cart-app | communication | source → target | other | Yes | Yes | — | store-app/src/store/cartStore.ts:83 |

## Observations

**1. store-app → cart-app.** `store-app` forwards `/cart/:path*` to
`http://cart-app:3000/cart/:path*` (store-app/next.config.ts:36-39). The target was resolved through
two matches: hostname `cart-app` is the Compose service built from `./cart-app`
(docker-compose.yml:20-23), with the container on internal port 3000 (docker-compose.yml:28;
`EXPOSE 3000` in cart-app/Dockerfile:32); and target prefix `/cart` is the zone's `basePath`
(cart-app/next.config.ts:4), whose `Home` page mounts the cart (cart-app/src/app/page.tsx:10).
Type and mechanism are `other`: `store-app` neither loads zone modules nor registers it in an
orchestrator; it forwards requests from a path to another application, responding with the
entire page (Next.js Multi-Zones through `rewrites`), as in relationships 1-3 of 013. Direction follows
forwarding. Unlike 013, the target is fixed in configuration, without an environment variable.

**2. store-app → cart-app.** `store-app` writes the cart to the store persisted under key
`cart-storage` (store-app/src/store/cartStore.ts:83-84; `localStorage.setItem` at :26) when adding
products (`addToCart`, :38-55), called by `ProductCard` (store-app/src/components/ProductCart.tsx:17).
`cart-app` declares the same store under the same key (cart-app/src/store/cartStore.ts:83-84) and reads
items in `CartDisplay` (cart-app/src/components/CartDisplay.tsx:15). Mechanism `other`: this is state
shared through `localStorage` under the same origin, rather than event exchange, as in relationships 4-6 of
013. Reading sees the data only because relationship 1's rewrite joins zones under one origin. `cart-app`
also rewrites the key in `removeItem` and `updateQuantity` (cart-app/src/store/cartStore.ts:58-80),
and the `Header` of `store-app` reads persisted items (store-app/src/components/Header.tsx:8). The
source code review did not record those lines as constructs, so, as in 013, direction
remains that of the recorded write (store-app/src/store/cartStore.ts:83), rather than `bidirectional`.

## Summary

Relationships: 2 (other: 1, communication: 1). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

