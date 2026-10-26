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

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| ecomm/cart | ecomm/cart/package.json;ecomm/cart/webpack.config.js | ecomm/cart/package.json:1-24 (own package `cart`) | ecomm/cart/src/index.js:1 (conventional webpack entry, `import("./mount")`); ecomm/cart/src/mount.js:14-19 (mounts the UI at `#dev-cart`); ecomm/cart/webpack.config.js:22-24 (template `./public/index.html`) | ecomm/cart/webpack.config.js:4-26 (own configuration, port 8082); ecomm/cart/package.json:6 (`webpack serve`) | — | — | Yes | JavaScript application with its own entry and webpack configuration, served independently. |
| ecomm/container | ecomm/container/package.json;ecomm/container/webpack.config.js | ecomm/container/package.json:1-22 (own package `container`) | ecomm/container/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); ecomm/container/src/bootstrap.js:5-6 (mounts remotes in page elements); ecomm/container/webpack.config.js:25-27 (template `./public/index.html`) | ecomm/container/webpack.config.js:4-29 (own configuration, port 8080); ecomm/container/package.json:6 (`webpack serve`) | — | — | Yes | JavaScript application with its own entry and webpack configuration. |
| ecomm/products | ecomm/products/package.json;ecomm/products/webpack.config.js | ecomm/products/package.json:1-24 (own package, `name` `container`) | ecomm/products/src/index.js:1 (conventional webpack entry, `import("./mount")`); ecomm/products/src/mount.js:19-24 (mounts the UI at `#dev-products`); ecomm/products/webpack.config.js:18-20 (template `./public/index.html`) | ecomm/products/webpack.config.js:4-22 (own configuration, port 8081); ecomm/products/package.json:6 (`webpack serve`) | — | — | Yes | JavaScript application with its own entry and webpack configuration, served independently. |
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-29 (manifest and test script only) | — | — | — | — | No | Manifest and lockfile only; there is no UI code, application entry or build in the snapshot. |
| packages/container | packages/container/package.json | packages/container/package.json:1-30 (own package `container`) | packages/container/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); packages/container/src/bootstrap.js:5 (mounts React at `#root`); packages/container/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-26 (development configuration); packages/container/config/webpack.prod.js:8-25 (production configuration); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | React application with its own entry and webpack builds referenced by the scripts. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/container build; not a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-33 (manifest and test script only) | — | — | — | — | No | Manifest and lockfile only; there is no UI code, application entry or build in the snapshot. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (own package `marketing`) | packages/marketing/src/index.js:1 (conventional webpack entry, `import("./bootstrap")`); packages/marketing/src/bootstrap.js:10-14 (mounts React at `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:25-27 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-31 (development configuration); packages/marketing/config/webpack.prod.js:6-23 (production configuration); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | React application with its own entry and webpack builds referenced by the scripts. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/marketing build; not a separate application. |

## Summary

Frontend applications in the snapshot: 5 (ecomm/cart, ecomm/container, ecomm/products, packages/container, packages/marketing).

## Notes

- `artifacts.csv` marks the `package.json` files as `workspace-config`, but none declares `workspaces`, `matches.csv` has no `ws-*` occurrences, and there is no other workspace file in the snapshot.
- No webpack configuration declares `entry`; the cited entries are webpack’s `src/index.*` convention.
- packages/auth and packages/dashboard contain only package.json and package-lock.json; React/Vue dependencies do not demonstrate an implemented application.
- The config directories belong to the applications immediately above them; they do not inherit their entries or builds as their own characteristics.
- The count of 5 matches the classification’s `frontend_units`. The `ecomm/products/dist/` cited in the classification was removed from the snapshot by normalization (`preset:build-output`) and does not appear in `units.csv`.
- There is no Dockerfile, CI or hosting configuration in the snapshot. The `publicPath` `/container/latest/` and the `PRODUCTION_DOMAIN` in packages/container/config/webpack.prod.js:6-12 do not constitute a separate deployment artifact.
