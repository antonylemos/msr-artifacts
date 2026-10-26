---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
inputs:
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

## Repository overview

Study example repository with two independent Module Federation sets: `simple-js` (Container, Products and Cart) and `react-js` (container and marketing, plus folders `auth` and `dashboard`, containing only `package.json`). There is no workspace or root manifest. Each application has its own `package.json`, lockfile and webpack configuration. The only way to run them is the development server: all `start` scripts are `webpack serve` (or `webpack server`) (react-js/container/package.json:5; react-js/marketing/package.json:5; simple-js/Cart/package.json:7; simple-js/Container/package.json:7; simple-js/Products/package.json:8). Configurations use `mode: "development"` with a fixed port (for example: simple-js/Cart/webpack.config.js:4-8; react-js/marketing/config/webpack.dev.js:7-10).

The `react-js` set has a course structure, with `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js`. Both `webpack.prod.js` files are empty (0 bytes), and no script uses them: production preparation remained only in the filename. There is no Dockerfile, CI, hosting configuration or production build script, and mining `ops-*`, `ci-*` and `cfg-public-path` occurrences are empty. Remotes are resolved only through `localhost` with a port (see the composition review).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | react-js/container | separate | not observed | `http://localhost:8080` in development (react-js/container/config/webpack.dev.js:9-10) | No | react-js/container/config/webpack.dev.js:7-29 (own configuration, development mode); react-js/container/package.json:5 (`webpack serve`) |
| 2 | react-js/marketing | separate | not observed | `http://localhost:8081` in development (react-js/marketing/config/webpack.dev.js:9-10) | No | react-js/marketing/config/webpack.dev.js:7-29 (own configuration, generates `remoteEntry.js`); react-js/marketing/package.json:5 (`webpack serve`) |
| 3 | simple-js/Cart | separate | not observed | `http://localhost:8082` in development (simple-js/Cart/webpack.config.js:6-7) | No | simple-js/Cart/webpack.config.js:4-22 (own configuration, generates `remoteEntry.js`); simple-js/Cart/package.json:7 (`webpack server`) |
| 4 | simple-js/Container | separate | not observed | `http://localhost:8080` in development (simple-js/Container/webpack.config.js:6-7) | No | simple-js/Container/webpack.config.js:4-21 (own configuration); simple-js/Container/package.json:7 (`webpack server`) |
| 5 | simple-js/Products | separate | not observed | `http://localhost:8081` in development (simple-js/Products/webpack.config.js:6-7) | No | simple-js/Products/webpack.config.js:4-8 (own configuration); simple-js/Products/package.json:8 (`webpack serve`) |

## Observations

**1. react-js/container.** Build is separate because webpack configuration and dependencies belong only to this application, even if their only use is the development server. The `webpack.prod.js` exists but is empty. No observed deployment. Version `1.0.0` from package.json is unused anywhere.

**2. react-js/marketing.** Same arrangement, with its own server on port 8081, exposing `remoteEntry.js` consumed by container (react-js/marketing/config/webpack.dev.js:19-24). The `webpack.prod.js` is also empty.

**3. simple-js/Cart.** Own configuration and server on port 8082 (simple-js/Cart/webpack.config.js:6-7, 10-17). No observed deployment.

**4. simple-js/Container.** Own configuration and server on port 8080, the same as the `react-js` set’s container (react-js/container/config/webpack.dev.js:10). Both sets cannot run simultaneously without changing a port, confirming that they are separate examples.

**5. simple-js/Products.** Own configuration and server on port 8081, the same as marketing (react-js/marketing/config/webpack.dev.js:10). No observed deployment.

## Summary

Applications: 5. Build (separate: 5). Deploy (not observed: 5). Independent versioning: 0.
