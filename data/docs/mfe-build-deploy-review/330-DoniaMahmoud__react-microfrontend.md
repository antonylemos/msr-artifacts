---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
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

# 330 — DoniaMahmoud/react-microfrontend

## Repository overview

Teaching example of Module Federation in plain JavaScript, with three independent webpack applications: `container` (host), `products` and `cart` (remotes). No root `package.json` or workspace; each application has its own `package.json`, `package-lock.json` and `webpack.config.js`. The only script in each `package.json` is `start`, with `webpack serve` (cart/package.json:7; container/package.json:7; products/package.json:7); no script `build` exists. All three configurations use `mode: "development"` and fix development server port: 8080 in container, 8081 in products and 8082 in cart (container/webpack.config.js:5-8; products/webpack.config.js:5-8; cart/webpack.config.js:5-8).

Everything present is development configuration. Host fetches remotes at `http://localhost:8081/remoteEntry.js` and `http://localhost:8082/remoteEntry.js` (container/webpack.config.js:13-14), remote development server addresses. No Dockerfile, compose, CI workflow, hosting configuration or proxy is present in snapshot, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrence. The `.gitignore` excludes `dist/` and `build/` (.gitignore:4-6).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | cart | separate | not observed | `http://localhost:8082` in development (cart/webpack.config.js:6-7; container/webpack.config.js:14) | No | cart/webpack.config.js:4-28 (own configuration, generates `remoteEntry.js`); cart/package.json:7 (`webpack serve`) |
| 2 | container | separate | not observed | `http://localhost:8080` in development (container/webpack.config.js:6-7) | No | container/webpack.config.js:4-21 (own configuration, host with two remotes); container/package.json:7 (`webpack serve`) |
| 3 | products | separate | not observed | `http://localhost:8081` in development (products/webpack.config.js:6-7; container/webpack.config.js:13) | No | products/webpack.config.js:4-29 (own configuration, generates `remoteEntry.js`); products/package.json:7 (`webpack serve`) |

## Observations

**1. cart.** Separate build because webpack configuration and dependencies belong only to this application (cart/webpack.config.js:4-28; cart/package.json:12-19), even if development server is its only use. It generates `remoteEntry.js` with module `./CartShow` (cart/webpack.config.js:10-15). Deploy not observed: only `webpack serve` on port 8082. Version `1.0.0` (cart/package.json:3) is unused in publication.

**2. container.** Own configuration and server on port 8080 (container/webpack.config.js:4-21). Remote code does not enter its build: arrives at runtime through `remoteEntry.js` files at `localhost` (container/webpack.config.js:12-15). Deploy not observed. Version `1.0.0` (container/package.json:3) is unused in publication.

**3. products.** Same arrangement as cart, with server on port 8081 and exposed module `./ProductsIndex` (products/webpack.config.js:6-15). Deploy not observed. Version `1.0.0` (products/package.json:3) is unused in publication.

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
