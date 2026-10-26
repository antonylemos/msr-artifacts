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

Project documentation is the short English root README. Its title and opening sentence identify a proof of concept of micro-frontend architecture with single-spa, React, Angular, Vite and SystemJS, derived from third-party example `nitinreddy3/react-ng-spa-app` (README.md:1-2). The rest is installation/execution instructions (README.md:4-34), ending with application navigation within root config. The other four `documentation` files in `artifacts.csv` are tool template READMEs without claims about this project: Angular CLI 12.0.3 at `angular-app/README.md:1-27`, React + TypeScript + Vite at `react-vite-app/README.md:1-54` and `styleguide/README.md:1-54` (almost identical text, differing only in links), and Vue 3 + Vite at `vue-app/README.md:1-40`. `vue-app/src/components/icons/IconDocumentation.vue` appears in `artifacts.csv` as `source`, a Vue scaffold icon.

README claims match previous reviews: a single-spa root config registers applications using different stacks by route, loaded by SystemJS through an import map (3.4.5 #1-#3). It falls short of the snapshot in two respects. Described navigation covers only `/react` and `/angular` (README.md:31-34), omitting `/react-vite`, present in registration and page menu (root-config/src/org1-root-config.ts:15-19; root-config/src/index.ejs:189). Installation instructs `npm install` only in `root-config`, `react-app` and `angular-app` (README.md:5), although execution also instructs starting `react-vite-app` (README.md:24-27). README mentions neither `common-lib-webpack` and `styleguide`, also served by local import map (root-config/src/index.ejs:70-71), nor shared state channel between applications (3.4.5 #4-#6), nor `vue-app`, outside composition (3.4.5, Summary).

Excluded from table as installation/execution instructions: statement that each application uses a different Node version and per-folder `npm install` (README.md:5-8); execution steps for each project, with "Requires Node 16" for Angular and React (README.md:10-27), matching scripts `serve:single-spa:angular-app`, `start` and `dev:single-spa` (angular-app/package.json:11; react-app/package.json:4; root-config/package.json:4; react-vite-app/package.json:11); Node 16 requirement has neither `engines` nor `.nvmrc` in snapshot. Address `http://localhost:9000` (README.md:29) is root config `webpack serve` port (root-config/package.json:4), infrastructure detail cited in claim 3 paragraph.

`doc-*` occurrences: README.md:1 (`doc-integration-technology` and `doc-import-map-zones`) is claim 1; README.md:2 (`doc-mfe-term`) claim 2; README.md:14 and README.md:26 (`doc-integration-technology`) are execution instructions (`npm run serve:single-spa:angular-app`, `npm run dev:single-spa`).

Comments read in artifacts cited by previous reviews: in root-config/src/index.ejs, generator `create-single-spa` comments on regenerator-runtime, CSP, import-map-overrides, shared-dependency import map, production import map and ZoneJS (root-config/src/index.ejs:9-13, 15-18, 22-24, 26-32, 59-60, 87-91), generic template instructions ("Your shared dependencies must be of one of the following formats", "Add your organization's prod import map URL to this script's src") without project claims; page `<title>Single SPA React Angular</title>` (root-config/src/index.ejs:8), repeating README title; "Customize the root error boundary for your microfrontend here." (react-app/src/org1-react-app.tsx:11) and "Feel free to modify this webpack config however you'd like to" (angular-app/extra-webpack.config.js:59), also templates; and comments at root-config/webpack.config.js:17, react-app/webpack.config.js:17, angular-app/extra-webpack.config.js:12-57, angular-app/src/main.single-spa.ts:84-106, react-vite-app/src/spa.tsx:53-97, react-vite-app/vite.config.ts:10-50, styleguide/vite.config.ts:17-22 and common-lib-webpack/webpack.config.js:42-46, commented code or internal build/style details of each unit. No `package.json` has a populated `description`; only `common-lib-webpack/package.json:19` has the field, empty.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:1 | "Single-spa app with React Angular Vite and SystemJS" | composition | corroborated | 3.4.2 (single-spa, single-spa-angular, single-spa-react, vite-plugin-single-spa `Yes`); 3.4.5 #1-#3; root-config/src/org1-root-config.ts:1-23; root-config/src/index.ejs:95-99 |
| 2 | README.md:2 | "This is a microfrontend architecture poc" | structure | corroborated | 3.4.3 (angular-app, react-app, react-vite-app, root-config `Yes`); 3.4.5 #1-#3 |
| 3 | README.md:31 | "click on **React**, you will be routed to the React app, on click of **Angular** you will be redirected to angular app" | composition | corroborated | 3.4.5 #1, #3; root-config/src/org1-root-config.ts:3-13; root-config/src/index.ejs:177-188 |

## Observations

**1. README.md:1.** The title names the orchestrator (single-spa), loader (SystemJS) and application stacks. Root config imports `registerApplication` and `start` from `single-spa`, registering three applications loaded through `System.import` (root-config/src/org1-root-config.ts:1-23); page loads SystemJS from CDN (root-config/src/index.ejs:95-99), and SystemJS import map resolves application names (3.4.4, root-config/src/index.ejs:63). Applications are Angular (`angular-app`, with `single-spa-angular`), React with webpack (`react-app`, with `single-spa-react`) and React with Vite (`react-vite-app`, with `vite-plugin-single-spa` and output `format: "system"`, react-vite-app/vite.config.ts:25, 37-41). The sentence remains indivisible: all parts have the same corroboration. In dependency review, declared `systemjs` package is `Undetermined` in root config and `No` in `react-vite-app`, because the running loader is CDN rather than installed copy; this does not change SystemJS being the loader used. Page `<title>` repeats part of the title: "Single SPA React Angular" (root-config/src/index.ejs:8).

**2. README.md:2.** Structural review has four composed frontend units — root config and three registered applications — and composition review links root to each through single-spa, with runtime loading (3.4.5 #1-#3). "poc" matches the example character: all snapshot execution is development, with no deployment artifact (3.4.6, Repository overview). Derivation from repository `nitinreddy3/react-ng-spa-app` in the rest of the sentence points outside snapshot, stating nothing verifiable about units; it was not checked.

**3. README.md:31.** Root config page menu has React and Angular items calling `singleSpaNavigate('/react')` and `singleSpaNavigate('/angular')` (root-config/src/index.ejs:177-188), and root activates `@org1/react-app` at `/react` and `angular-app` at `/angular` (root-config/src/org1-root-config.ts:3-13). Lines "**http://localhost:9000/react** -> React App" and "**http://localhost:9000/angular/** -> Angular App" (README.md:33-34) repeat the claim with URLs; trailing slash `/angular/` also matches `activeWhen: ["/angular"]`, a prefix. Port 9000 belongs to root config `webpack serve` (root-config/package.json:4). The claim does not discuss the third application: menu also has "React Vite", leading to `/react-vite` (root-config/src/index.ejs:189-193), where root activates `react-vite-app` (root-config/src/org1-root-config.ts:15-19). Omission does not contradict the written claim.

## Summary

Claims: 3 (corroborated: 3, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (structure: 1, composition: 2).
