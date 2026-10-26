---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
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

# 164 — horoshopodumaj/micro-frontends

## Repository overview

Module Federation demonstration with Rspack, with three sibling projects and no root manifest: `host` (React), `remote` (React) and `vue-remote` (Vue 3). Each project has its own `package.json`, `package-lock.json` and same script set: `"build": "NODE_ENV=production rspack build"`, `build:dev`, `build:start` and `start` (host/package.json:4-9; remote/package.json:4-9; vue-remote/package.json:4-9). All three Rspack configurations are nearly identical: entry `./src/index.ts`, `HtmlRspackPlugin` with `./index.html` and `ModuleFederationPlugin` with project’s own federated configuration (host/rspack.config.ts:17-19, 78-81; remote/rspack.config.ts:17-19, 78-81; vue-remote/rspack.config.ts:16-18, 79-82). None defines `output.path`, only `uniqueName` and `publicPath` (host/rspack.config.ts:29-34), so output remains in default Rspack directory, ignored by git (host/.gitignore:85). No script triggers all three builds together.

No deployment artifact is present in snapshot: no Dockerfile, compose, CI workflow or hosting configuration, and `matches.csv` has no `ops-*` or `ci-*` occurrences. All three `cfg-public-path` occurrences are each project’s fixed `publicPath` at `localhost` (host/rspack.config.ts:33; remote/rspack.config.ts:33; vue-remote/rspack.config.ts:33), the same ports as `devServer` (host/rspack.config.ts:24-25; remote/rspack.config.ts:24-25; vue-remote/rspack.config.ts:23-24). Because remote containers are also declared at `localhost:3001` and `localhost:3002` (composition review, Configuration column), even production build only works on local machine.

Everything snapshot executes is for development: `start` runs `rspack serve`, and `build:start` runs `rspack serve` from inside `dist` (host/package.json:7-8), still development server. README instructs installation and startup of each application in its own terminal with `npm run start` and opening `http://localhost:3000` (README.md:61-65, 71, 101); it uses `cd vue_remote`, but directory is `vue-remote` (README.md:62).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | host | separate | not observed | `http://localhost:3000/`, only in development with `rspack serve` (host/rspack.config.ts:25, 33; host/package.json:8) | No | host/package.json:5 (`NODE_ENV=production rspack build`); host/rspack.config.ts:15-92 (own entry, `HtmlRspackPlugin`, `ModuleFederationPlugin`, `uniqueName: "host"`) |
| 2 | remote | separate | not observed | `http://localhost:3001/`, only in development with `rspack serve` (remote/rspack.config.ts:25, 33; remote/package.json:8) | No | remote/package.json:5 (`NODE_ENV=production rspack build`); remote/rspack.config.ts:15-92 (own entry, `HtmlRspackPlugin`, `ModuleFederationPlugin`, `uniqueName: "remote"`); remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`) |
| 3 | vue-remote | separate | not observed | `http://localhost:3002/`, only in development with `rspack serve` (vue-remote/rspack.config.ts:24, 33; vue-remote/package.json:8) | No | vue-remote/package.json:5 (`NODE_ENV=production rspack build`); vue-remote/rspack.config.ts:14-92 (own entry, `vue-loader`, `HtmlRspackPlugin`, `ModuleFederationPlugin`, `uniqueName: "vue_remote"`); vue-remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`) |

## Observations

**1. host.** Own Rspack build, generating container page from `./index.html` (host/rspack.config.ts:78-80) and loading `remote` through federation (host/rspack.config.ts:81). The `publicPath` `http://localhost:3000/` (host/rspack.config.ts:33) ties assets to local server. No deployment artifact. Version `0.0.1` (host/package.json:3) is unused in any publication.

**2. remote.** Own build, identical to host’s except port, `uniqueName` and `publicPath` (remote/rspack.config.ts:25, 31, 33); also generates `remoteEntry.js` consumed by host (remote/module-federation.config.ts:3). No observed deploy; version `0.0.1` unused (remote/package.json:3).

**3. vue-remote.** Own build, with `vue-loader` and `VueLoaderPlugin` instead of React refresh (vue-remote/rspack.config.ts:5, 43-47, 78) and own `remoteEntry.js` (vue-remote/module-federation.config.ts:3). The `uniqueName` `vue_remote` (vue-remote/rspack.config.ts:31) differs from directory name. No observed deploy; version `0.0.1` unused (vue-remote/package.json:3).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
