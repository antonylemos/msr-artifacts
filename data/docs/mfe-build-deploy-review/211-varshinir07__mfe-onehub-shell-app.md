---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Repository overview

Repository with a single React application, Module Federation host `onehub`. Both remotes it consumes (`subscription` and `ownership`) are absent from snapshot: appear only as `http://localhost:3001/remoteEntry.js` and `http://localhost:3002/remoteEntry.js` (src/webpack.config.js:76-77). Their build and deploy, if present, are outside repository.

Project originated from Create React App, but scripts `start` and `build` call own Webpack 5 configuration: `webpack serve --config src/webpack.config.js --mode development` and `webpack --config src/webpack.config.js --mode development` (package.json:19-20). Even build remains in development mode (src/webpack.config.js:7), writes a single `bundle.js` to `dist/` (src/webpack.config.js:25-29) and fixes `publicPath` at `http://localhost:3000/` (src/webpack.config.js:26), same port as development server (src/webpack.config.js:19). This is the only mined `cfg-public-path` occurrence. It is development configuration.

No Dockerfile, CI workflow, hosting configuration or publication script exists, and `matches.csv` has no `ops-*` or `ci-*` occurrences. README is CRA default: says `npm run build` generates directory `build` "ready to be deployed" (README.md:25-31), not matching actual script, writing to `dist/` in development mode.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | `http://localhost:3000` in development (src/webpack.config.js:19, 26) | No | package.json:20 (`webpack --config src/webpack.config.js --mode development`); src/webpack.config.js:5-102 (webpack configuration with `ModuleFederationPlugin` `onehub`); src/webpack.config.js:25-29 (output `dist/bundle.js`, `publicPath` `http://localhost:3000/`) |

## Observations

**1. Root (`.`).** Root application, the host. Separate build: own configuration and output (src/webpack.config.js:10, 25-29), and remote code is absent from repository; remotes load at runtime through URLs in src/webpack.config.js:76-77. No observed deploy: only development server on port 3000 (package.json:19; src/webpack.config.js:13-22), and nothing in snapshot publishes application. No versioning: package.json:3-4 declares `0.1.0` with `private: true`, unused in publication.

## Summary

Applications: 1. Build (separate: 1). Deploy (not observed: 1). Independent versioning: 0.
