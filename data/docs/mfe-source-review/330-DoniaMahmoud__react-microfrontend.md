---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 330 — DoniaMahmoud/react-microfrontend

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | cart/src/index.js:4 | cart | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (cart/src/bootstrap.js); internal to the unit. |
| src-async-bootstrap | container/src/index.js:2 | container | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (container/src/bootstrap.js); internal to the unit. |
| src-async-bootstrap | products/src/index.js:4 | products | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (products/src/bootstrap.js); internal to the unit. |
| src-mount-export | cart/src/bootstrap.js:15 | cart | runtime-composition | Yes | Exports `mount(el)`, defined at cart/src/bootstrap.js:3-6, which writes the cart UI to `el.innerHTML`; the module is exposed as `./CartShow` at cart/webpack.config.js:13-14 and consumed by container at container/src/bootstrap.js:2 and :7. |
| src-mount-export | products/src/bootstrap.js:26 | products | runtime-composition | Yes | Exports `mount(el)`, defined at products/src/bootstrap.js:4-13, which writes the product list to `el.innerHTML`; the module is exposed as `./ProductsIndex` at products/webpack.config.js:13-14 and consumed by container at container/src/bootstrap.js:1 and :6. |
| src-mount-call | cart/src/bootstrap.js:11 | cart | runtime-composition | No | cart/src/bootstrap.js:8-13 calls `mount` on its own `#dev-cart` element (cart/public/index.html:4), only in isolated development; mounting internal to unit cart. |
| src-mount-call | products/src/bootstrap.js:23 | products | runtime-composition | No | products/src/bootstrap.js:17-25 calls `mount` on its own `#dev-products` element (products/public/index.html:5), only in isolated development; mounting internal to unit products. |
| src-mount-import | container/src/bootstrap.js:1 | container | runtime-composition | Yes | Imports `mount` from `products/ProductsIndex` under alias `mountProducts`, called at container/src/bootstrap.js:6; remote `products` points to `http://localhost:8081/remoteEntry.js` (container/webpack.config.js:13), and bootstrap is loaded by container/src/index.js:2. |
| src-mount-import | container/src/bootstrap.js:2 | container | runtime-composition | Yes | Imports `mount` from `cart/CartShow` under alias `mountCart`, called at container/src/bootstrap.js:7; remote `cart` points to `http://localhost:8082/remoteEntry.js` (container/webpack.config.js:14), and bootstrap is loaded by container/src/index.js:2. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | container/src/bootstrap.js:6 | container | runtime-composition | Yes | `mountProducts(document.querySelector("#my-products"))` mounts unit products’ UI on the container’s `#my-products` element (container/public/index.html:5); remote import at container/src/bootstrap.js:1 and entry at container/src/index.js:2. |
| manual | container/src/bootstrap.js:7 | container | runtime-composition | Yes | `mountCart(document.querySelector("#my-cart"))` mounts unit cart’s UI on the container’s `#my-cart` element (container/public/index.html:6); remote import at container/src/bootstrap.js:2 and entry at container/src/index.js:2. |

## Summary

Constructs participating in composition: 6 (runtime-composition: 6).

## Notes

- The `src-mount-call` pattern captured only isolated development mounts (cart/src/bootstrap.js:11; products/src/bootstrap.js:23), rather than the container’s aliased calls (container/src/bootstrap.js:6-7), recorded as manual rows.
- The step 4 search found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel` or script loading in the three units’ code files.
