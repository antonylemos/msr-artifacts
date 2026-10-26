---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
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

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Repository overview

single-spa proof of concept with seven sibling projects and no root manifest: root config `root-config`, applications `react-app` (React with webpack), `angular-app` (Angular 12), `react-vite-app` (React with Vite), scaffold `vue-app` and two runtime-shared libraries, `common-lib-webpack` and `styleguide`. Each project has its own `package.json` and lockfile, and README instructs installing and running each in its directory (README.md:4-27). All builds are individual: `webpack --mode=production` in root config and `react-app` (root-config/package.json:9; react-app/package.json:6), `ng build` with builder `@angular-builders/custom-webpack:browser` and output in `dist/angular-app` in `angular-app` (angular-app/package.json:7; angular-app/angular.json:20-23), `tsc -b && vite build` with output `format: "system"` in `react-vite-app` (react-vite-app/package.json:8; react-vite-app/vite.config.ts:24-25) and `vite build` in `vue-app` (vue-app/package.json:6, 8). No script triggers builds together.

No deployment artifact is present in snapshot: no Dockerfile, compose, CI workflow or hosting configuration, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. The only hooks are husky `pre-commit` hooks in root config and `react-app`, running formatting, tests and lint (root-config/package.json:11-15; react-app/package.json:15-19), without build or publication.

Everything snapshot executes is for development. Root config starts with `webpack serve --port 9000 --env isLocal` (root-config/package.json:4), and import map connecting applications to `localhost` ports is emitted only when `isLocal` is true (root-config/src/index.ejs:62-85); production import map is a comment with placeholder, `src="/importmap.json"` (root-config/src/index.ejs:59-60). Applications start with `webpack serve` (react-app/package.json:4), `ng s --port 4200` (angular-app/package.json:11) and `vite build --watch` in parallel with `vite preview` (react-vite-app/package.json:10-11). Production build of `angular-app` itself fixes `deployUrl: http://localhost:4200/` (angular-app/angular.json:36), so generated bundle only works served on this local port.

Both shared libraries are not frontend applications in structural review, but are part of same local setup: `common-lib-webpack` is served by `webpack serve` on port 9001, with open CORS headers (common-lib-webpack/webpack.config.js:34-40), and `styleguide` by `vite preview` on 3002 (styleguide/package.json:15; styleguide/vite.config.ts:39-41); local import map references both (root-config/src/index.ejs:70-71). Only `common-lib-webpack` has a version other than `0.0.0` (common-lib-webpack/package.json:3), and neither is published.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | angular-app | separate | not observed | `http://localhost:4200/`, only in development with `ng s` (angular-app/package.json:11; angular-app/angular.json:36; root-config/src/index.ejs:68) | No | angular-app/package.json:7 (`ng build`); angular-app/package.json:10 (`ng build angular-app --prod`); angular-app/angular.json:20-36 (builder custom-webpack, `outputPath: dist/angular-app`, `main: src/main.single-spa.ts`, `libraryName: angular-app`, `libraryTarget: umd`, `deployUrl`); angular-app/extra-webpack.config.js:4-10 (`singleSpaAngularWebpack` and common library external) |
| 2 | react-app | separate | not observed | `//localhost:8080/org1-react-app.js`, only in development with `webpack serve` (react-app/package.json:4; root-config/src/index.ejs:67) | No | react-app/package.json:6 (`webpack --mode=production`); react-app/webpack.config.js:5-18 (`webpack-config-single-spa-react-ts`, `orgName: "org1"`, `projectName: "react-app"`, externals) |
| 3 | react-vite-app | separate | not observed | `//localhost:3001/spa.js`, only in development with `vite preview` (react-vite-app/package.json:10-11; react-vite-app/vite.config.ts:39; root-config/src/index.ejs:69) | No | react-vite-app/package.json:8 (`tsc -b && vite build`); react-vite-app/vite.config.ts:14-41 (output `format: "system"`, externals, `vitePluginSingleSpa` with `spaEntryPoints: ["src/spa.tsx"]`) |
| 4 | root-config | separate | not observed | `localhost:9000`, only in development with `webpack serve` (root-config/package.json:4; root-config/src/index.ejs:66) | No | root-config/package.json:9 (`webpack --mode=production`); root-config/webpack.config.js:5-28 (`webpack-config-single-spa-ts`, `projectName: "root-config"`, `HtmlWebpackPlugin` with `src/index.ejs`) |
| 5 | vue-app | separate | not observed | `localhost:4173`, only in development with `vite preview` (vue-app/package.json:7) | No | vue-app/package.json:6, 8 (`run-p type-check build-only` → `vite build`); vue-app/vite.config.ts:8-15 (Vue plugins, without output option) |

## Observations

**1. angular-app.** Own build through Angular CLI, with builder `custom-webpack` and configuration `extra-webpack.config.js`, applying `singleSpaAngularWebpack` and externalizing common library (angular-app/angular.json:20-35; angular-app/extra-webpack.config.js:4-10). Artifact resides in `dist/angular-app` and outputs as UMD library `angular-app` (angular-app/angular.json:23, 33-34). Fixed `deployUrl` at `http://localhost:4200/` applies to all build configurations (angular-app/angular.json:36), and local import map requests `main.js` on this port (root-config/src/index.ejs:68): build serves local setup rather than publication. Version `0.0.0` with `private: true` (angular-app/package.json:3, 13) is unused in any publication.

**2. react-app.** Own build with preset `webpack-config-single-spa-react-ts`; bundle name `org1-react-app.js` requested by local import map follows from `orgName`/`projectName` (react-app/webpack.config.js:5-10; root-config/src/index.ejs:67). Port 8080 appears only in import map; `webpack serve` does not declare it (react-app/package.json:4). There are also `start:standalone` and `analyze` (react-app/package.json:5, 7), for development or diagnostics. The `package.json` has no `version` field (react-app/package.json:1-3).

**3. react-vite-app.** Own Vite build, with SystemJS output and `vite-plugin-single-spa` in mode `mife`, port 3001 and entry `src/spa.tsx` (react-vite-app/vite.config.ts:24-25, 37-41). Script `dev:single-spa` runs build in mode `--watch` and `vite preview` simultaneously (react-vite-app/package.json:11): production build used as development server, without publication. Version `0.0.0` with `private: true` (react-vite-app/package.json:3-4) is unused.

**4. root-config.** Own build, generating root config and page from `src/index.ejs` (root-config/webpack.config.js:7-26). No deployment artifact. Production page would lack applications: with `isLocal` false, import map containing addresses is not emitted, and production map is commented out (root-config/src/index.ejs:59-62, 85). The `package.json` has no `version` field (root-config/package.json:1-2).

**5. vue-app.** Own Vite build (vue-app/package.json:6, 8), without any output configuration beyond Vue plugins (vue-app/vite.config.ts:8-15). Application is absent from root config and import map (root-config/src/index.ejs:63-84), so does not participate in single-spa setup; the only declared address is `vite preview` on port 4173 (vue-app/package.json:7). Version `0.0.0` (vue-app/package.json:3) is unused in any publication.

## Summary

Applications: 5. Build (separate: 5). Deploy (not observed: 5). Independent versioning: 0.
