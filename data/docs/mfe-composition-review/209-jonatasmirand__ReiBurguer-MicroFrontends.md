---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Repository overview

A learning project with three Next.js (Pages Router) applications in sibling folders, without a workspace: `container` is the host, `cardapio` and `pedido` are remotes. All three use `NextFederationPlugin` from `@module-federation/nextjs-mf` inside `webpack(config)`. The host declares both remotes with fixed `localhost` URLs (container/next.config.mjs:12-15) and, at `/`, loads each one's exposed component through `next/dynamic` with `ssr: false` (container/src/pages/index.js:5-6), mounting the menu and, below it, the order on the same page (container/src/pages/index.js:20-26).

Besides loading, both remotes exchange data through a `CustomEvent` on the container page's `window`: each menu dish's button fires `adicionarCarrinho` with name and price (cardapio/src/components/Cardapio.jsx:30-40), and the order listens to the event and sums items (pedido/src/_components/Pedido.jsx:7-18). Container neither sends nor receives messages; it only joins both on the page.

Details that did not become relationships: `cardapio` has two configuration files. `next.config.js`, loaded with precedence by Next 14, exposes `./src/components/Cardapio.jsx` (cardapio/next.config.js:10-12); `next.config.mjs` exposes `./src/_components/Cardapio.jsx` (cardapio/next.config.mjs:12-14), absent from the snapshot. `Cardapio.jsx` also has function `adicionarPedido`, firing another event (cardapio/src/components/Cardapio.jsx:5-8), never called and without a listener; the source code review marked it `No`. Container declares `filename: 'static/chunks/remoteEntry.js'` (container/next.config.mjs:11), but exposes nothing. Dish images come from the remote origin (cardapio/src/components/Cardapio.jsx:21), reinforcing port 3001, but they are static resources, not composition.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | cardapio | host → remote | source → target | module-federation | Yes | Yes | container/next.config.mjs:14 (remote `cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js`); cardapio/next.config.js:8-12 (`name: "cardapio"`, `filename: "static/chunks/remoteEntry.js"`, exposes `./Cardapio`); cardapio/package.json:6 (`next dev --port 3001`) | container/src/pages/index.js:5; container/src/pages/index.js:20 |
| 2 | container | pedido | host → remote | source → target | module-federation | Yes | Yes | container/next.config.mjs:13 (remote `pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js`); pedido/next.config.mjs:10-14 (`name: 'pedido'`, `filename: 'static/chunks/remoteEntry.js'`, exposes `./Pedido`); pedido/package.json:6 (`next dev --port 3002`) | container/src/pages/index.js:6; container/src/pages/index.js:25 |
| 3 | cardapio | pedido | communication | source → target | events | Yes | Yes | — | cardapio/src/components/Cardapio.jsx:32; cardapio/src/components/Cardapio.jsx:33; pedido/src/_components/Pedido.jsx:13 |

## Observations

**1. container → cardapio.** Import `cardapio/Cardapio` (container/src/pages/index.js:5) uses the host's `cardapio` remote (container/next.config.mjs:14), whose name and module match `name: "cardapio"` and key `./Cardapio` in cardapio/next.config.js:8-11; port 3001 of the `dev` script (cardapio/package.json:6) only corroborates. The component is rendered at `/` (container/src/pages/index.js:20). The cited configuration is `next.config.js`, which takes precedence; `next.config.mjs` declares the same `name` and exposed key, but with a nonexistent path (cardapio/next.config.mjs:10-13), changing neither target nor direction.

**2. container → pedido.** Import `pedido/Pedido` (container/src/pages/index.js:6) uses remote `pedido` (container/next.config.mjs:13), matching `name: 'pedido'` and key `./Pedido` in pedido/next.config.mjs:10-13; port 3002 (pedido/package.json:6) corroborates. The component is rendered inside `styles.section` (container/src/pages/index.js:24-26).

**3. cardapio → pedido.** The menu sends `adicionarCarrinho` through `window.top.dispatchEvent` (cardapio/src/components/Cardapio.jsx:32-38), and the order receives it through `window.addEventListener` (pedido/src/_components/Pedido.jsx:13); there is no sending in the reverse direction, hence direction `source → target`. The channel connects both units only because container mounts both components on the same page (container/src/pages/index.js:20 and 25); with no iframe in the snapshot, `window.top` is the same `window` listened to by the order. The channel has no configuration of its own. The `adicionarPedido` lines (cardapio/src/components/Cardapio.jsx:6-7), marked `No` in the source code review, were excluded.

## Summary

Relationships: 3 (host → remote: 2, communication: 1). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

