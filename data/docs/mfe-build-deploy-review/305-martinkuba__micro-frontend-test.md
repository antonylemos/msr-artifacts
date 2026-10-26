---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Repository overview

npm workspaces monorepo with three webpack 5 packages: `packages/shell`, `packages/main-content` and `packages/sidebar` (package.json:14-18). Root `build` only triggers each workspace’s `build` (package.json:11). Each package has its own `webpack --config webpack.config.js` (packages/shell/package.json:7; packages/main-content/package.json:7; packages/sidebar/package.json:7) and own `dist` output in its directory (packages/shell/webpack.config.js:11; packages/main-content/webpack.config.js:10; packages/sidebar/webpack.config.js:10). Three separate builds. Both remotes each generate their own `remoteEntry.js` (packages/main-content/webpack.config.js:33; packages/sidebar/webpack.config.js:33), and shell generates `index.html` with `HtmlWebpackPlugin` (packages/shell/webpack.config.js:44-47).

All configuration is for development. All three configurations are in `mode: 'development'` (packages/shell/webpack.config.js:7; packages/main-content/webpack.config.js:6; packages/sidebar/webpack.config.js:6). The `publicPath` points to `localhost` (ports 3000, 3001 and 3002: packages/shell/webpack.config.js:12; packages/main-content/webpack.config.js:11; packages/sidebar/webpack.config.js:11), and shell fetches remote at `http://localhost:3001/remoteEntry.js` (packages/shell/webpack.config.js:35), as composition review records. The only way to serve applications is `webpack serve` in scripts `start` (packages/shell/package.json:6; packages/main-content/package.json:6; packages/sidebar/package.json:6), with `devServer` on own ports (packages/shell/webpack.config.js:49-59; packages/main-content/webpack.config.js:44-53; packages/sidebar/webpack.config.js:44-53). Root `start` starts main-content and shell in parallel with `concurrently` (package.json:7), and sidebar has separate `start:sidebar` (package.json:10).

No Dockerfile, compose, CI workflow, deployment manifest or hosting configuration is present in snapshot. The 23 files are three packages, root (`package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`) and `README.md`. The `.gitignore` excludes `dist/` (.gitignore:2). The `cfg-public-path` occurrences in `matches.csv` are all three `publicPath` values at `localhost` cited above. The `ops-cors` occurrences are `Access-Control-Allow-Origin: '*'` header of `devServer` (packages/shell/webpack.config.js:56-58; packages/main-content/webpack.config.js:50-52; packages/sidebar/webpack.config.js:50-52), allowing shell to fetch `remoteEntry.js` from another port in development. None is deploy. README also describes only local execution, with `npm start` and `http://localhost:3000` (README.md:14-19).

All packages are at `version: "1.0.0"` and `private: true` (packages/shell/package.json:3-4; packages/main-content/package.json:3-4; packages/sidebar/package.json:3-4), without publication.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/main-content | separate | not observed | `http://localhost:3001` in development (packages/main-content/webpack.config.js:11, :45) | No | packages/main-content/webpack.config.js:4-43 (own configuration, generates `remoteEntry.js` in `dist`); packages/main-content/package.json:7 (`webpack`); package.json:11 (`npm run build --workspaces`) |
| 2 | packages/shell | separate | not observed | `http://localhost:3000` in development (packages/shell/webpack.config.js:12, :50) | No | packages/shell/webpack.config.js:5-48 (own configuration, federated host and `index.html`); packages/shell/package.json:7 (`webpack`); package.json:11 (`npm run build --workspaces`) |
| 3 | packages/sidebar | separate | not observed | `http://localhost:3002` in development (packages/sidebar/webpack.config.js:11, :45) | No | packages/sidebar/webpack.config.js:4-42 (own configuration, generates `remoteEntry.js` in `dist`); packages/sidebar/package.json:7 (`webpack`); package.json:11 (`npm run build --workspaces`) |

## Observations

**1. packages/main-content.** Own build: configuration generates in `packages/main-content/dist` the `remoteEntry.js` exposing `./MainContent` (packages/main-content/webpack.config.js:10, :31-36), triggered by package script (packages/main-content/package.json:7) or root `build` (package.json:11). It shares `react`, `react-dom` and `@grafana/faro-web-sdk` as runtime singletons with shell (packages/main-content/webpack.config.js:37-41), but artifact belongs only to remote. Served only by `webpack serve` on port 3001 (packages/main-content/package.json:6; packages/main-content/webpack.config.js:44-53), address used by shell (packages/shell/webpack.config.js:35). Nothing in snapshot publishes `dist`, hence deploy `not observed`. Structural review left package `Undetermined` because it does not start a standalone UI; this does not affect build, which is its own.

**2. packages/shell.** Own host build in `packages/shell/dist`, with `index.html` generated from `public/index.html` (packages/shell/webpack.config.js:11, :44-47) and `publicPath` at `http://localhost:3000/` (packages/shell/webpack.config.js:12). Remote code does not enter artifact: shell only declares `mainContent` in `remotes` and loads it at runtime (packages/shell/webpack.config.js:34-35). Served only by `webpack serve` on port 3000, with `historyApiFallback` (packages/shell/package.json:6; packages/shell/webpack.config.js:49-55). Deploy `not observed`.

**3. packages/sidebar.** Own build, identical to main-content, with `remoteEntry.js` exposing `./Sidebar` (packages/sidebar/webpack.config.js:10, :31-36). Difference is Faro SDK is not shared, and comment says package carries its own bundle (packages/sidebar/webpack.config.js:40). Included in root `build --workspaces` (package.json:11, :17), but shell does not declare it as remote (packages/shell/webpack.config.js:36, commented out) and root `start` does not start it (package.json:7). Served only by `start:sidebar`, on port 3002 (package.json:10; packages/sidebar/webpack.config.js:44-53). Deploy `not observed`.

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
