---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
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

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Repository overview

No root README or project document. `artifacts.csv` three `documentation` files: content-app/README.md, root-app/README.md, topbar-app/README.md, identical Vue 3 + TypeScript + Vite templates ("This template should help get you started developing with Vue 3 and TypeScript in Vite", content-app/README.md:1-5), no project claims/rows. Sole other `.md`, .vscode/copilot-commit-message-instructions.md:1-12, commit message formatting instructions, no row. No `doc-*` mining occurrences.

Existing architectural documentation: English `root-app` comments, Vue "custom root" host. Page uses static ES module import map for microfrontends (root-app/index.html:10), loads SystemJS for "legacy" microfrontends (root-app/index.html:20). Helper `dynamicImport` first native `import()`, then `System.import()` on failure (root-app/src/utils/dynamicImport.ts:1-9). Matches reviews: remotes enter `root-app` through native map/`import()` (3.4.4; 3.4.5 #1, #4). SystemJS code exists without active target: sole `systemjs-importmap` commented (root-app/index.html:24-30), fallback source review `Undetermined`. Sole unit-description text "Topbar - MFE" on topbar screen (topbar-app/src/App.vue:4). `root-classic` only create-single-spa template comments, no `package.json` `description`.

Comments read without rows. In `root-app`: "Static import map for microfrontends system" (root-app/index.html:23) labels commented `systemjs-importmap` (root-app/index.html:24-30), no active-project claim; import-map-overrides "Import map overrides for local development"/"Import map overrides UI (toggle with localStorage: overrides-ui=true)" (root-app/index.html:32, 40), development tooling; "Global type declarations for single-spa, SystemJS, and import-map-overrides"/`Window` JSDoc (root-app/src/global.d.ts:1, 5-7, 13-16), typing, "(legacy/classic single-spa)" root-app/src/global.d.ts:6 technology rather than project; "Try different export patterns" (root-app/src/components/ParcelWrapper.vue:26), internal wrapper; `/* @vite-ignore */` root-app/src/utils/dynamicImport.ts:15 tool directive. In `root-classic`, all create-single-spa instructions: "If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below"/following link (root-classic/src/index.ejs:12-14); "Shared dependencies go into this import map" (root-classic/src/index.ejs:16), only `single-spa` CDN map (root-classic/src/index.ejs:17-23); "Add your organization's prod import map URL to this script's src" (root-classic/src/index.ejs:26), commented production map already reviewed; "This is the single-spa Layout Definition for your microfrontends"/commented layout examples (root-classic/src/microfrontend-layout.html:2-18); "modify the webpack config however you'd like to by adding to this object" (root-classic/webpack.config.js:16). `/* webpackIgnore: true */` root-classic/src/org-root-config.ts:13 webpack directive. In `topbar-app`, "coloque a dependencia do Vue para vir como externa" (English translation: "Make Vue dependency external") (topbar-app/vite.config.ts:7), pending instruction, requested `external: ['vue']` commented (topbar-app/vite.config.ts:17); theme comments (topbar-app/src/App.vue:27, 29) internal. Remote `main.ts` no prose comments, only disabled code (content-app/src/main.ts:2, 6; topbar-app/src/main.ts:2, 6). Outside previously cited artifacts, "Allow importing arbitrary remote URLs (Vite dev server / System.import of remote modules)" (content-app/src/shims-remote-modules.d.ts:1; root-app/src/shims-remote-modules.d.ts:1) merely justifies types.

Descriptive fields: `package.json` only `name` (content-app/package.json:2; root-app/package.json:2; root-classic/package.json:2; topbar-app/package.json:2), no `description`. Page titles repeat project name (content-app/index.html:7; root-app/index.html:8; topbar-app/index.html:7) or "Root Config" (root-classic/src/index.ejs:8). Content-app screen Vite template (content-app/src/App.vue:15; content-app/src/components/HelloWorld.vue:9-29). No snapshot text describes `root-classic` as alternative to `root-app` or explains topbar name `@org/header-app` in `root-app` (root-app/index.html:15), `@org/topbar-app` in `root-classic` (root-classic/src/index.ejs:35).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | root-app/index.html:10 | "Static import map for microfrontends esmodule" | composition | corroborated | 3.4.4 (root-app/index.html:11, `remote-resolution`); 3.4.5 #1, #4; root-app/index.html:11-18 |
| 2 | root-app/index.html:20 | "SystemJS for legacy microfrontends" | composition | partial | 3.4.4 (root-app/index.html:21; root-app/src/utils/dynamicImport.ts:24, `Undetermined`); 3.4.6 #4; root-app/index.html:21, 24-30; topbar-app/vite.config.ts:14-15 |
| 3 | root-app/src/utils/dynamicImport.ts:2 | "Hybrid dynamic import helper that supports both modern ESM and legacy SystemJS." | composition | corroborated | 3.4.4 (root-app/src/utils/dynamicImport.ts:15, :24); root-app/src/utils/dynamicImport.ts:10-38; root-app/index.html:21 |
| 4 | root-app/src/utils/dynamicImport.ts:5 | "Try native import() first (for modules in native import map)" | composition | corroborated | 3.4.4 (root-app/src/utils/dynamicImport.ts:15, `dynamic-loading`); 3.4.5 #1, #4; root-app/src/utils/dynamicImport.ts:13-17; root-app/index.html:11-18 |
| 5 | root-app/src/utils/dynamicImport.ts:6 | "If that fails, try System.import() (for modules in systemjs-importmap)" | composition | partial | 3.4.4 (root-app/src/utils/dynamicImport.ts:24, `Undetermined`); root-app/src/utils/dynamicImport.ts:18-26; root-app/index.html:24-30 |
| 6 | topbar-app/src/App.vue:4 | "Topbar - MFE" | structure | corroborated | 3.4.3 (topbar-app Yes); 3.4.4 (topbar-app/src/main.ts:8); 3.4.5 #3; topbar-app/src/main.ts:8-22 |

## Observations

**1. root-app/index.html:10.** Comment labels following block static ES-module import map for microfrontends. Native `<script type="importmap">` written in HTML (root-app/index.html:11-18), maps `@org/content-app`/`@org/header-app` to remote development servers (root-app/index.html:14-15). Source-code `remote-resolution` `Yes` (3.4.4), relationships 3.4.5 #1/#4 use it. Helper native `import()` resolves names (root-app/src/utils/dynamicImport.ts:15). Composition caveat: `@org/header-app` target linked to `topbar-app` only by URL matching other host (3.4.5 #4). Still loaded/mounted as parcel. Maps root-app/src/importMap.json, root-app/src/importMap.dev.json, root-app/mfe-app.json repeat names, no file reads them.

**2. root-app/index.html:20.** Says CDN SystemJS serves "legacy" microfrontends. Active script (root-app/index.html:21), sole `window.System` use helper fallback (root-app/src/utils/dynamicImport.ts:22-24). No mapped microfrontend: sole `systemjs-importmap`, pointing `@org/header-app` to `http://127.0.0.1:4173/app.js`, commented (root-app/index.html:24-30). Hence source fallback `Undetermined` (3.4.4). Topbar build `system`, output `app.js` (topbar-app/vite.config.ts:14-15), apparent commented-map target. Neither host uses build (3.4.6 #4), both load ES module through development server. Loader exists/connected, served microfrontends lack active artifact. Hence `partial`.

**3. root-app/src/utils/dynamicImport.ts:2.** Helper supports ESM/SystemJS. Code confirms native `import()` at root-app/src/utils/dynamicImport.ts:15, failure plus page SystemJS triggers `System.import()` at root-app/src/utils/dynamicImport.ts:22-24. SystemJS loaded root-app/index.html:21. Final same-comment "This allows separating modern ESM modules from legacy SystemJS modules." (root-app/src/utils/dynamicImport.ts:8) repeats capability, no extra row. Support entirely in code. Actual snapshot SystemJS-loaded module separate question, rows 2/5.

**4. root-app/src/utils/dynamicImport.ts:5.** `try` using `import(/* @vite-ignore */ url)` precedes alternatives (root-app/src/utils/dynamicImport.ts:13-17). Names `@org/header-app`/`@org/content-app` (root-app/src/App.vue:8-9; root-app/src/components/ParcelWrapper.vue:22) in native map (root-app/index.html:11-18), matching parenthesis. Source-code `import()` `dynamic-loading` `Yes` (3.4.4), path for 3.4.5 #1/#4.

**5. root-app/src/utils/dynamicImport.ts:6.** Fallback exists: `catch` of native `import()` calls `System.import(url)` if `window.System` (root-app/src/utils/dynamicImport.ts:18-26). Parenthesis assigns `systemjs-importmap` modules. Map commented (root-app/index.html:24-30), no other SystemJS map. Source-code call `Undetermined` for same reason (3.4.4). Attempt order confirmed, modules no active artifact. Hence `partial`.

**6. topbar-app/src/App.vue:4.** Topbar root screen title rather than comment, appears when host mounts unit. Says topbar microfrontend. Structural `topbar-app` own frontend unit (3.4.3). Entry only exports `singleSpaVue` lifecycles, own mounting commented (topbar-app/src/main.ts:6, 8-22; 3.4.4). `root-classic` registers application (3.4.5 #3). Local root-app/src/modules/Topbar/src/TopbarApp.vue:4 copy same title, import/use commented (root-app/src/App.vue:3, 7), no separate row.

## Summary

Claims: 6 (corroborated: 4, partial: 2, contradicted: 0, uncorroborated: 0). Themes: (structure: 1, composition: 5).
