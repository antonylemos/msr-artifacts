---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
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

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Repository overview

Five independent npm projects, without a workspace: each has its own `package.json`, lockfile and build configuration, and each `build` script generates its own `dist` (`webpack --mode production` at host/package.json:8, react-mfe-1/package.json:8, react-mfe-2/package.json:8 and vue-mfe/package.json:8; `ng build` at angular-mfe/package.json:8, with output in `dist/angular-mfe`, angular-mfe/angular.json:18). Root `package.json` only orchestrates: installs each project with `npm install --prefix` (package.json:7), triggers the four remote builds and then host build (package.json:9-10, 12), and finally copies all five `dist` directories into a single root `dist`, host at root and each remote in a subdirectory with its name (package.json:11).

There are two Vercel publication paths, both in the snapshot and without CI, Dockerfile or compose. Root `vercel.json` runs `install:all` and `build:all` and publishes this combined `dist`, with a rewrite to host `index.html` for extensionless routes (vercel.json:2-6). At the same time, each of the five directories has its own `vercel.json`, running the project’s `npm run build` and publishing only its `dist` (host/vercel.json:2-3, react-mfe-1/vercel.json:2-3, react-mfe-2/vercel.json:2-3, vue-mfe/vercel.json:2-3, angular-mfe/vercel.json:2-3); those of all four remotes also enable CORS for `remoteEntry.js` and other `.js` files (for example react-mfe-1/vercel.json:4-18), which only makes sense if remote is served at an origin other than host’s.

Artifacts contradict each other about which path is in use. Host production configuration points remotes to relative same-domain paths, `/react-mfe-1/remoteEntry.js` etc. (host/webpack.config.js:30-31, 34-40), and Angular remote fixes `publicPath: '/angular-mfe/'` in production (angular-mfe/webpack.config.js:35-36); both resolve only in root combined `dist` layout. The host header comment, however, says production addresses would come from environment variables of each Vercel project (`REACT_MFE1_URL` etc., host/webpack.config.js:8-14), but code does not read those variables; the following comment describes the current same-domain subdirectory arrangement (host/webpack.config.js:17-19). README describes only joint publication, a single Vercel project rooted at `/` (README.md:489-490, 534-536), and gives public address https://microfrontend-beta.vercel.app (README.md:473-485); being documentation, this remains in text and does not decide Deploy. Per-directory `vercel.json` files appear to be remnants of earlier separate publication, but the snapshot cannot establish that they are unused.

The `ops-deployment-file` occurrences are the six `vercel.json` files; `ops-cors` occurrences are headers of all four remote `vercel.json` files and `headers` of `devServer`, applying only in development (host/webpack.config.js:56-58, react-mfe-1/webpack.config.js:19-21, react-mfe-2/webpack.config.js:18-20, vue-mfe/webpack.config.js:20-22). All `ops-hosting` occurrences are in README.md (lines 3 to 535). The `cfg-public-path` occurrences are `publicPath: 'auto'` in the three webpack remotes (react-mfe-1/webpack.config.js:25, react-mfe-2/webpack.config.js:24, vue-mfe/webpack.config.js:26) and Angular’s conditional `publicPath` (angular-mfe/webpack.config.js:36). There is no backend or API server in the snapshot. The two external applications displayed in host iframes (Route Map and Multibank) are at other domains and outside the snapshot; they do not become rows.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | angular-mfe | separate | Undetermined | `/angular-mfe/` no `dist` joint (package.json:11; host/webpack.config.js:31; angular-mfe/webpack.config.js:36); own Vercel project root, domain not recorded in the snapshot (angular-mfe/vercel.json:2-3); `http://localhost:4200` in development (angular-mfe/angular.json:54) | No | angular-mfe/angular.json:12-18 (target `build` with custom webpack and output `dist/angular-mfe`); angular-mfe/package.json:8 (`ng build`); angular-mfe/vercel.json:2-3 (publishes only `dist/angular-mfe`); package.json:9 (build triggered by root); package.json:11 (copy to `dist/angular-mfe`); vercel.json:2-3 (joint publication of `dist`) |
| 2 | host | separate | Undetermined | `/` no `dist` joint (package.json:11; vercel.json:3-6); own Vercel project root, domain not recorded in the snapshot (host/vercel.json:2-3); `http://localhost:3005` in development (host/webpack.config.js:54) | No | host/webpack.config.js:48-49 (own configuration and entry); host/package.json:8 (`webpack --mode production`); host/vercel.json:2-3 (publishes only host `dist`); package.json:10 (build triggered by root); package.json:11 (copy to the root of `dist`); vercel.json:2-3 (joint publication of `dist`) |
| 3 | react-mfe-1 | separate | Undetermined | `/react-mfe-1/` no `dist` joint (package.json:11; host/webpack.config.js:36); own Vercel project root, domain not recorded in the snapshot (react-mfe-1/vercel.json:2-3); `http://localhost:3001` in development (react-mfe-1/webpack.config.js:17) | No | react-mfe-1/webpack.config.js:11-12 (own configuration and entry); react-mfe-1/package.json:8 (`webpack --mode production`); react-mfe-1/vercel.json:2-18 (publishes only react-mfe-1 `dist`, with CORS); package.json:9 (build triggered by root); package.json:11 (copy to `dist/react-mfe-1`); vercel.json:2-3 (joint publication of `dist`) |
| 4 | react-mfe-2 | separate | Undetermined | `/react-mfe-2/` no `dist` joint (package.json:11; host/webpack.config.js:37); own Vercel project root, domain not recorded in the snapshot (react-mfe-2/vercel.json:2-3); `http://localhost:3002` in development (react-mfe-2/webpack.config.js:16) | No | react-mfe-2/webpack.config.js:10-11 (own configuration and entry); react-mfe-2/package.json:8 (`webpack --mode production`); react-mfe-2/vercel.json:2-18 (publishes only react-mfe-2 `dist`, with CORS); package.json:9 (build triggered by root); package.json:11 (copy to `dist/react-mfe-2`); vercel.json:2-3 (joint publication of `dist`) |
| 5 | vue-mfe | separate | Undetermined | `/vue-mfe/` no `dist` joint (package.json:11; host/webpack.config.js:38); own Vercel project root, domain not recorded in the snapshot (vue-mfe/vercel.json:2-3); `http://localhost:3003` in development (vue-mfe/webpack.config.js:18) | No | vue-mfe/webpack.config.js:12-13 (own configuration and entry); vue-mfe/package.json:8 (`webpack --mode production`); vue-mfe/vercel.json:2-18 (publishes only vue-mfe `dist`, with CORS); package.json:9 (build triggered by root); package.json:11 (copy to `dist/vue-mfe`); vercel.json:2-3 (joint publication of `dist`) |

## Observations

**1. angular-mfe.** Separate build: Angular CLI target `build`, with partial webpack adding federation, generates `dist/angular-mfe` containing only this application (angular-mfe/angular.json:12-18; angular-mfe/webpack.config.js:23-30). Deploy `Undetermined`: angular-mfe/vercel.json:2-3 publishes this directory separately, while root vercel.json:2-3 publishes it, copied to `dist/angular-mfe` (package.json:11), with the other four. Of the five, this depends most on the joint layout: in production, fixed `publicPath` `/angular-mfe/` (angular-mfe/webpack.config.js:36) requests chunks at that subpath, absent if the project is published alone at a domain root. Version `1.0.0` (angular-mfe/package.json:3) is unused in publication.

**2. host.** Separate build: own webpack configuration depending on `--mode` (host/webpack.config.js:23-24, 48-49), and own `build` script (host/package.json:8). Deploy `Undetermined`: host/vercel.json:2-3 publishes only host `dist`; root vercel.json places it at the joint `dist` root (package.json:11; vercel.json:3-6). Production remotes are written into host build as relative same-domain paths (host/webpack.config.js:30-31, 34-40): published alone, host would not find remotes, and changing a remote address requires rebuilding host. The comment about per-Vercel-project environment variables (host/webpack.config.js:8-14) does not match code. No independent version used in publication (host/package.json:3).

**3. react-mfe-1.** Separate build (react-mfe-1/webpack.config.js:11-12; react-mfe-1/package.json:8), with `publicPath: 'auto'` (react-mfe-1/webpack.config.js:25), allowing chunks to resolve from wherever `remoteEntry.js` is served, so the same build serves both paths. Deploy `Undetermined`: react-mfe-1/vercel.json:2-3 publishes it separately, with CORS enabled for `remoteEntry.js` (react-mfe-1/vercel.json:4-18); root vercel.json publishes it at `/react-mfe-1/` in joint `dist` (package.json:11), the address used by host in production (host/webpack.config.js:36). Version `1.0.0` (react-mfe-1/package.json:3) unused in publication.

**4. react-mfe-2.** Same arrangement as react-mfe-1: own build (react-mfe-2/webpack.config.js:10-11; react-mfe-2/package.json:8) with `publicPath: 'auto'` (react-mfe-2/webpack.config.js:24); separate publication through react-mfe-2/vercel.json:2-18 and joint at `/react-mfe-2/` (package.json:11; host/webpack.config.js:37). Version `1.0.0` (react-mfe-2/package.json:3) unused in publication.

**5. vue-mfe.** Same arrangement as React remotes, with vue-loader in its own build (vue-mfe/webpack.config.js:12-13, 37-55; vue-mfe/package.json:8) and `publicPath: 'auto'` (vue-mfe/webpack.config.js:26); separate publication through vue-mfe/vercel.json:2-18 and joint at `/vue-mfe/` (package.json:11; host/webpack.config.js:38). Version `1.0.0` (vue-mfe/package.json:3) unused in publication.

## Summary

Applications: 5. Build (separate: 5). Deploy (Undetermined: 5). Independent versioning: 0.
