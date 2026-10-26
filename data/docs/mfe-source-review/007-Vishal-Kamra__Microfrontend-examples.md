---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | react-js/container/src/index.js:1 | react-js/container | dynamic-loading | No | react-js/container/src/index.js:1 imports the application’s own bootstrap. |
| src-async-bootstrap | react-js/marketing/src/index.js:1 | react-js/marketing | dynamic-loading | No | react-js/marketing/src/index.js:1 imports the local bootstrap. |
| src-async-bootstrap | simple-js/Cart/src/index.js:1 | simple-js/Cart | dynamic-loading | No | simple-js/Cart/src/index.js:1 imports the local bootstrap. |
| src-async-bootstrap | simple-js/Container/src/index.js:1 | simple-js/Container | dynamic-loading | No | simple-js/Container/src/index.js:1 imports the local bootstrap. |
| src-async-bootstrap | simple-js/Products/src/index.js:1 | simple-js/Products | dynamic-loading | No | simple-js/Products/src/index.js:1 imports the local bootstrap. |
| src-mount-export | react-js/container/src/bootstrap.js:22 | react-js/container | runtime-composition | No | Exports the container’s own mount at react-js/container/src/bootstrap.js:22, but there is no consumer from another frontend or exposure of this bootstrap; its use at react-js/container/src/bootstrap.js:12-17 is internal standalone use. |
| src-mount-export | react-js/marketing/src/bootstrap.js:22 | react-js/marketing | runtime-composition | Yes | Exports mount at react-js/marketing/src/bootstrap.js:22, exposed by react-js/marketing/config/webpack.dev.js:22-23 and consumed by the container wrapper at react-js/container/src/components/MarketingApp.js:3-9. |
| src-mount-export | simple-js/Cart/src/bootstrap.js:3 | simple-js/Cart | runtime-composition | Yes | Exports mount at simple-js/Cart/src/bootstrap.js:3-8, exposed at simple-js/Cart/webpack.config.js:13-14 and consumed by the container at simple-js/Container/src/bootstrap.js:2-5. |
| src-mount-export | simple-js/Products/src/bootstrap.js:3 | simple-js/Products | runtime-composition | Yes | Exports mount at simple-js/Products/src/bootstrap.js:3-12, exposed at simple-js/Products/webpack.config.js:13-14 and consumed by the container at simple-js/Container/src/bootstrap.js:1-4. |
| src-mount-call | react-js/container/src/components/MarketingApp.js:9 | react-js/container | runtime-composition | Yes | Mounts the marketing remote on the wrapper ref at react-js/container/src/components/MarketingApp.js:8-10; wrapper rendered at react-js/container/src/App.js:8, used by the bootstrap at react-js/container/src/bootstrap.js:3-7. |
| src-mount-call | simple-js/Cart/src/bootstrap.js:13 | simple-js/Cart | runtime-composition | No | simple-js/Cart/src/bootstrap.js:10-14 calls mount on its own development element; mounting internal to the Cart unit. |
| src-mount-call | simple-js/Products/src/bootstrap.js:17 | simple-js/Products | runtime-composition | No | simple-js/Products/src/bootstrap.js:14-18 calls mount on its own development element; mounting internal to the Products unit. |
| src-mount-import | react-js/container/src/components/MarketingApp.js:3 | react-js/container | runtime-composition | Yes | Imports mount from marketing/MarketingApp, invoked at react-js/container/src/components/MarketingApp.js:9; the wrapper is in the active App at react-js/container/src/App.js:8. |
| src-mount-import | simple-js/Container/src/bootstrap.js:1 | simple-js/Container | runtime-composition | Yes | Imports mount from products/ProductsIndex under the alias mountProducts, called at simple-js/Container/src/bootstrap.js:4; bootstrap loaded by simple-js/Container/src/index.js:1. |
| src-mount-import | simple-js/Container/src/bootstrap.js:2 | simple-js/Container | runtime-composition | Yes | Imports mount from cart/CartShow under the alias mountCart, called at simple-js/Container/src/bootstrap.js:5; bootstrap loaded by simple-js/Container/src/index.js:1. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | simple-js/Container/src/bootstrap.js:4 | simple-js/Container | runtime-composition | Yes | mountProducts mounts the Products unit UI in the container; remote import at simple-js/Container/src/bootstrap.js:1 and entry at simple-js/Container/src/index.js:1. |
| manual | simple-js/Container/src/bootstrap.js:5 | simple-js/Container | runtime-composition | Yes | mountCart mounts the Cart unit UI in the container; remote import at simple-js/Container/src/bootstrap.js:2 and entry at simple-js/Container/src/index.js:1. |

## Summary

Constructs participating in composition: 9 (runtime-composition: 9).

## Notes

- Calls using the mountProducts and mountCart aliases did not match the src-mount-call pattern and were recorded manually.
- The React container’s mount export is a remnant of a mounting contract: there is local standalone use, but no other observable unit imports it. The marketing mount, however, is exposed and consumed by the container.
- The development configurations connect the React example to the conventional entry points; this review describes the active code in that flow without asserting a production build (webpack.prod.js is empty, according to the structural review).
