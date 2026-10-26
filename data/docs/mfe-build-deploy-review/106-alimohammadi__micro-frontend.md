---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
inputs:
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

## Repository overview

Course source code, with two independent Module Federation examples: `ecomm/` (container, products and cart, in plain JavaScript) and `packages/` (container and marketing, in React, plus `auth` and `dashboard`, containing only `package.json` and lockfile). No workspace or root manifest; README has only a title (README.md:1). Each application has its own `package.json`, lockfile and webpack configuration, and is built and served independently.

Example `ecomm` has only a development server: the only script is `start` with `webpack serve` (ecomm/cart/package.json:6; ecomm/container/package.json:6; ecomm/products/package.json:6), and all three configurations use `mode: "development"` with a fixed port (ecomm/cart/webpack.config.js:5-8; ecomm/container/webpack.config.js:5-8; ecomm/products/webpack.config.js:5-8). Example `packages` goes further: container and marketing have, besides `start`, a `build` script running `webpack --config config/webpack.prod.js` (packages/container/package.json:6; packages/marketing/package.json:6), and these production files are populated. Container production build fixes `publicPath: "/container/latest/"` and points remote to `marketing@${domain}/marketing/remoteEntry.js`, with `domain` read from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6,10-13,18); marketing build generates `remoteEntry.js` with hashed filenames (packages/marketing/config/webpack.prod.js:8-14). These paths indicate publication in separate directories under one domain, but the publisher is absent from the snapshot: no Dockerfile, compose, CI, hosting configuration or upload script. The only mined `cfg-public-path` occurrence is `publicPath` above, and no `ops-*` or `ci-*` occurrences exist.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | ecomm/cart | separate | not observed | `http://localhost:8082` in development (ecomm/cart/webpack.config.js:6-7) | No | ecomm/cart/webpack.config.js:4-26 (own configuration, development mode, generates `remoteEntry.js`); ecomm/cart/package.json:6 (`webpack serve`) |
| 2 | ecomm/container | separate | not observed | `http://localhost:8080` in development (ecomm/container/webpack.config.js:6-7) | No | ecomm/container/webpack.config.js:4-29 (own configuration, development mode); ecomm/container/package.json:6 (`webpack serve`) |
| 3 | ecomm/products | separate | not observed | `http://localhost:8081` in development (ecomm/products/webpack.config.js:6-7) | No | ecomm/products/webpack.config.js:4-22 (own configuration, development mode, generates `remoteEntry.js`); ecomm/products/package.json:6 (`webpack serve`) |
| 4 | packages/container | separate | not observed | `http://localhost:8080` in development (packages/container/config/webpack.dev.js:8-9); `/container/latest/` in production build (packages/container/config/webpack.prod.js:12) | No | packages/container/config/webpack.prod.js:8-25 (production build, `publicPath` `/container/latest/`); packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.dev.js:6-26 (development); packages/container/package.json:5 (`webpack serve`) |
| 5 | packages/marketing | separate | not observed | `http://localhost:8081` in development (packages/marketing/config/webpack.dev.js:9-10); `${PRODUCTION_DOMAIN}/marketing/remoteEntry.js`, expected by container in production (packages/container/config/webpack.prod.js:18) | No | packages/marketing/config/webpack.prod.js:6-23 (production build, generates `remoteEntry.js`); packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.dev.js:7-31 (development); packages/marketing/package.json:5 (`webpack serve`) |

## Observations

**1. ecomm/cart.** Separate build: webpack configuration and dependencies belong only to this application, even if development server is the only use. It generates `remoteEntry.js` consumed by container of the same example (ecomm/cart/webpack.config.js:10-15). No production build script or observed deploy. Version `1.0.0` (ecomm/cart/package.json:3) is unused in publication.

**2. ecomm/container.** Same arrangement, port 8080, with remotes pointing to `localhost:8081` and `localhost:8082` (ecomm/container/webpack.config.js:20-23). No observed deploy.

**3. ecomm/products.** Same arrangement, port 8081 (ecomm/products/webpack.config.js:6-7), the same as packages/marketing (packages/marketing/config/webpack.dev.js:10): both examples cannot run simultaneously without changing a port. The `package.json` declares `name` `container` (ecomm/products/package.json:2), without effect on build.

**4. packages/container.** Separate build, with own production configuration triggered by script `build` (packages/container/package.json:6). The `publicPath` `/container/latest/` (packages/container/config/webpack.prod.js:12) states the path at which host expects to be served, but is build configuration, not an artifact packaging or publishing application; therefore Deploy remains `not observed`. Version `1.0.0` (packages/container/package.json:3) does not appear in publication, and path `latest` is fixed rather than derived from it.

**5. packages/marketing.** Separate build, with own production configuration (packages/marketing/config/webpack.prod.js:6-23) and script `build` (packages/marketing/package.json:6). Production address appears only on container side, as `${domain}/marketing/remoteEntry.js` (packages/container/config/webpack.prod.js:18), with domain coming from an environment variable without a snapshot value (packages/container/config/webpack.prod.js:6). No snapshot artifact puts build at this path, so Deploy remains `not observed`. Version `1.0.0` (packages/marketing/package.json:3) unused in publication.

## Summary

Applications: 5. Build (separate: 5). Deploy (not observed: 5). Independent versioning: 0.
