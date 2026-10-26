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

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| cart | cart/package.json;cart/webpack.config.js | cart/package.json:1-20 (own package `cart`) | cart/src/index.js:4 (conventional webpack entry, `import("./bootstrap")`); cart/src/bootstrap.js:8-13 (mounts the UI at `#dev-cart`); cart/webpack.config.js:24-26 (template `./public/index.html`) | cart/webpack.config.js:4-28 (own configuration, port 8082); cart/package.json:7 (`webpack serve`) | — | — | Yes | JavaScript application with its own entry and webpack configuration, served independently. |
| container | container/package.json;container/webpack.config.js | container/package.json:1-19 (own package `container`) | container/src/index.js:2 (conventional webpack entry, `import("./bootstrap")`); container/src/bootstrap.js:6-7 (mounts remotes in `#my-products` and `#my-cart`); container/webpack.config.js:17-19 (template `./public/index.html`) | container/webpack.config.js:4-21 (own configuration, port 8080); container/package.json:7 (`webpack serve`) | — | — | Yes | JavaScript application with its own entry and webpack configuration. |
| products | products/package.json;products/webpack.config.js | products/package.json:1-20 (own package `products`) | products/src/index.js:4 (conventional webpack entry, `import("./bootstrap")`); products/src/bootstrap.js:17-25 (mounts the UI at `#dev-products`); products/webpack.config.js:25-27 (template `./public/index.html`) | products/webpack.config.js:4-29 (own configuration, port 8081); products/package.json:7 (`webpack serve`) | — | — | Yes | JavaScript application with its own entry and webpack configuration, served independently. |

## Summary

Frontend applications in the snapshot: 3 (cart, container, products).

## Notes

- No `webpack.config.js` declares `entry`; webpack’s default entry, `src/index.js`, present in all three directories, applies.
- The three `package.json` files have only the `start` script (`webpack serve`) and all three configurations use `mode: "development"` (`:5`); there is no `build` script or deployment. It counts as its own build, as in equivalent pilot examples.
- `artifacts.csv` marks the three `package.json` files as `workspace-config`, but none declares `workspaces` and `matches.csv` has no `ws-*`, `ops-*` or `ci-*` occurrence.
- N = 3 matches the classification’s `frontend_units: 3`.
