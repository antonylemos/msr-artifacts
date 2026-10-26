---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 106 — alimohammadi/micro-frontend

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | ecomm/container/src/index.js:1 | ecomm/container | dynamic-loading | No | `import('./bootstrap')` at ecomm/container/src/index.js:1 loads the unit’s own bootstrap; internal. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import('./bootstrap')` at packages/container/src/index.js:1 loads the unit’s own bootstrap; internal. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import("./bootstrap")` at packages/marketing/src/index.js:1 loads the unit’s own bootstrap; internal. |
| src-mount-export | ecomm/cart/src/mount.js:26 | ecomm/cart | runtime-composition | Yes | Exports `mount(el)` defined at ecomm/cart/src/mount.js:3-7; exposed as `./CartShow` → `./src/mount` at ecomm/cart/webpack.config.js:13-15 and consumed by the host at ecomm/container/src/bootstrap.js:3. |
| src-mount-export | ecomm/products/src/mount.js:31 | ecomm/products | runtime-composition | Yes | Exports `mount(el)` defined at ecomm/products/src/mount.js:5-12; exposed as `./ProductsIndex` → `./src/mount.js` at ecomm/products/webpack.config.js:13-15 and consumed by the host at ecomm/container/src/bootstrap.js:1. |
| src-mount-export | packages/marketing/src/bootstrap.js:17 | packages/marketing | runtime-composition | Yes | Exports `mount(el)` defined at packages/marketing/src/bootstrap.js:6-8, which renders the Marketing App; exposed as `./MarketingApp` → `./src/bootstrap` at packages/marketing/config/webpack.dev.js:20-22 and consumed at packages/container/src/components/MarketingApp.js:1. |
| src-mount-call | ecomm/cart/src/mount.js:17 | ecomm/cart | runtime-composition | No | Isolated development mount on its own `#dev-cart` element (ecomm/cart/src/mount.js:14-19; element at ecomm/cart/public/index.html:9); internal to the unit. |
| src-mount-call | ecomm/products/src/mount.js:22 | ecomm/products | runtime-composition | No | Isolated development mount on its own `#dev-products` element (ecomm/products/src/mount.js:19-24; element at ecomm/products/public/index.html:9); internal to the unit. |
| src-mount-call | packages/container/src/components/MarketingApp.js:8 | packages/container | runtime-composition | Yes | `mount(ref.current)` mounts unit packages/marketing in the adapter div (packages/container/src/components/MarketingApp.js:7-11); the adapter is rendered by the host App at packages/container/src/App.js:10, mounted at packages/container/src/bootstrap.js:5. |
| src-mount-import | ecomm/container/src/bootstrap.js:1 | ecomm/container | runtime-composition | Yes | Imports `mount` from `products/ProductsIndex` under alias `productsMount`, called at ecomm/container/src/bootstrap.js:5; remote `products@http://localhost:8081/remoteEntry.js` at ecomm/container/webpack.config.js:21. Target: ecomm/products. |
| src-mount-import | ecomm/container/src/bootstrap.js:3 | ecomm/container | runtime-composition | Yes | Imports `mount` from `carts/CartShow` under alias `cartMount`, called at ecomm/container/src/bootstrap.js:6; alias `carts` → `cart@http://localhost:8082/remoteEntry.js` at ecomm/container/webpack.config.js:22. Target: ecomm/cart. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from `marketing/MarketingApp`, called at packages/container/src/components/MarketingApp.js:8; remote `marketing@http://localhost:8081/remoteEntry.js` at packages/container/config/webpack.dev.js:19. Target: packages/marketing. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | ecomm/container/src/bootstrap.js:5 | ecomm/container | runtime-composition | Yes | `productsMount(document.querySelector("#my-products"))` mounts the ecomm/products UI in the host’s `#my-products` element (ecomm/container/public/index.html:9); remote import at ecomm/container/src/bootstrap.js:1 and entry at ecomm/container/src/index.js:1. The alias did not match the src-mount-call pattern. |
| manual | ecomm/container/src/bootstrap.js:6 | ecomm/container | runtime-composition | Yes | `cartMount(document.querySelector("#my-cart"))` mounts the ecomm/cart UI in the host’s `#my-cart` element (ecomm/container/public/index.html:10); remote import at ecomm/container/src/bootstrap.js:3 and entry at ecomm/container/src/index.js:1. The alias did not match the src-mount-call pattern. |

## Summary

Constructs participating in composition: 9 (runtime-composition: 9).

## Notes

- As in the final review of repository 007, aliased calls (`productsMount`, `cartMount`) did not match `src-mount-call` and were recorded manually; isolated development mounts are internal to their respective units.
- `ecomm/products/src/index.js:1` and `ecomm/cart/src/index.js:1` use `import("./mount")`, which the `src-async-bootstrap` pattern did not capture because it looks for `./bootstrap`. These are `import()` calls for local files of the unit itself rather than another unit, so they do not become manual rows.
- `packages/marketing/src/bootstrap.js:13` (`mount(devRoot)`) and `packages/container/src/bootstrap.js:5` (`ReactDom.render(<App />, "#root")`) also did not match `src-mount-call`; these mounts are internal to their own units and do not enter the manual table.
- `<MarketingApp />` at packages/container/src/App.js:10 is the host’s local adapter rather than the component imported from the remote; remote consumption is inside the adapter itself (lines 1 and 8).
- The step 4 search found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<script>` injection, `loadRemote*`, `initFederation`, `registerApplication` or `registerMicroApps` in the snapshot code files. Composition is entirely Module Federation with the `mount(el)` contract.
- The packages/container production remote depends on `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6,18), without a value in the snapshot; the answers above rely on development configurations triggered by the scripts.
