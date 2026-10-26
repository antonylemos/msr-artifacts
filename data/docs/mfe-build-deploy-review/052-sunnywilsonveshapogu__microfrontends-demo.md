---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
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

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Repository overview

Demonstration with three webpack applications (`shell`, `header-mf` and `products-mf`), each with its own manifest, lockfile and `webpack.config.js`. Root `package.json` only orchestrates: installs all three sequentially, starts all three development servers with `concurrently` and chains all three builds in a single command (package.json:7, 11-12). Each `build` runs `webpack --mode production` (for example: shell/package.json:6), while the shared configuration declares `mode: 'development'` and a `devServer` (for example: shell/webpack.config.js:4-8); the command-line option determines build mode.

The snapshot is incomplete for building: all three configurations point to a `./public/index.html` absent from the repository (shell/webpack.config.js:39-41). README provides these files’ contents for the reader to create manually (README.md:20, 123). This is why all three applications are `Undetermined` in the structural review. There is no Dockerfile, CI or hosting configuration, and mining `ops-*`, `ci-*` and `cfg-public-path` occurrences are empty. README only indicates local ports (README.md:27-30).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | header-mf | separate | not observed | `http://localhost:3001` in development (header-mf/webpack.config.js:6-7; README.md:29) | No | header-mf/webpack.config.js:4-19 (own configuration); header-mf/package.json:6 (`webpack --mode production`); package.json:12 (`build:all`) |
| 2 | products-mf | separate | not observed | `http://localhost:3002` in development (products-mf/webpack.config.js:6-7; README.md:30) | No | products-mf/webpack.config.js:4-19 (own configuration); products-mf/package.json:6 (`webpack --mode production`); package.json:12 (`build:all`) |
| 3 | shell | separate | not observed | `http://localhost:3000` in development (shell/webpack.config.js:6-7; README.md:28) | No | shell/webpack.config.js:4-43 (own configuration); shell/package.json:6 (`webpack --mode production`); package.json:12 (`build:all`) |

## Observations

**1. header-mf.** Own configuration and build command. Root `build:all` only chains builds, each generating output in its own folder. Build depends on the missing template (header-mf/webpack.config.js:46). Separation is therefore declared, but the snapshot cannot build the application without completing the repository. No observed deployment. Version `1.0.0` is unused.

**2. products-mf.** Same arrangement, port 3002, with the same missing template (products-mf/webpack.config.js:46).

**3. shell.** Same arrangement, port 3000. Remotes are fixed at `localhost` (shell/webpack.config.js:24-27).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
