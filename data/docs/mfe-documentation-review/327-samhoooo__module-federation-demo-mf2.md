---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
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

# 327 — samhoooo/module-federation-demo-mf2

## Repository overview

Documentation is the short English root README, sole `documentation` file in `artifacts.csv`. It presents a micro frontend example using Module Federation 2.0 (README.md:1-3), describes two applications, `header-app` as remote and `home-app` as host (README.md:5-6, 11-12), and explains execution/type checking (README.md:17-30). README emphasizes typing across separate builds: remote publishes manifest and generated `.d.ts`, host checks remote import through `tsc`. Two screenshots (README.md:8, 14) are external images without text.

Code comments say more than README. home-app/rspack.config.js:48-50 justifies `mf-manifest.json` instead of fixed `remoteEntry.js` URL, and home-app/src/App.tsx:3-10 explains origin of `HeaderVariant` enum types/values. Also read comments/fields in header-app/rspack.config.js, both `package.json` (no `description`), `tsconfig.json`, `entry.ts` and `index.tsx`, `public/index.html`, header-app/src/App.tsx and generated types in `home-app/@mf-types/` (home-app/@mf-types/index.d.ts:1-22; home-app/@mf-types/HeaderApp/apis.d.ts:1-3; home-app/@mf-types/HeaderApp/Header.d.ts:1-2; home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12), without comments. Comment header-app/rspack.config.js:14-17 says `dts` plugin writes type files to `dist/` outside compilation, hence `devServer` serves them statically; this development-server detail stays outside table, cited in claim 4. Comment `// This application named 'Home'` (home-app/rspack.config.js:47) only names application.

README matches previous reviews: two units (3.4.3), `@module-federation/enhanced` configured in both (3.4.2), one active host → remote relationship through `mf-manifest.json` (3.4.5 #1) and separate build for each (3.4.6). Only claim beyond snapshot is home-app/src/App.tsx:10 comment about separate "build/deploy": no deployment artifact exists (3.4.6, Deploy `not observed: 2`).

Excluded from table:
- ports 4001 and 4000 (README.md:5, 27-28), infrastructure details;
- command block `cd header-app && npm install && npm start` and `cd home-app && npm install && npm start` (README.md:22-25), cited in claim 4;
- "Open http://localhost:4000 to view the host (Home App)" (README.md:27), repeating host role in claim 3 paragraph.

`doc-*` occurrence without row: README.md:1 (`doc-integration-technology`), title "Module Federation 2.0 React Example". README.md:3 (`doc-mfe-term` and `doc-integration-technology`) is claim 1, README.md:11 (`doc-host-remote`) claim 3.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "An example app designed with micro frontend architectural pattern using **Module Federation 2.0**" | structure | corroborated | 3.4.3 (header-app and home-app `Yes`); 3.4.2 (`@module-federation/enhanced` ^2.8.2 configured in both); 3.4.5 #1 |
| 2 | README.md:5-6 | "`header-app` — remote, exposes `./Header`, […] publishes `mf-manifest.json` and generated `.d.ts` types for everything it exposes" | structure | corroborated | 3.4.5 #1; header-app/rspack.config.js:57-63; home-app/rspack.config.js:52; home-app/@mf-types/HeaderApp/Header.d.ts:1-2 |
| 3 | README.md:11-12 | "`home-app` — host, consumes `HeaderApp/Header` via the remote's manifest and gets full IDE/`tsc` type checking on that import, even though it's a separate build" | structure | corroborated | 3.4.5 #1; 3.4.6 #1 and #2 (`separate`); home-app/rspack.config.js:51-54; home-app/tsconfig.json:15-17 |
| 4 | README.md:19-20 | "Start `header-app` first — `home-app` fetches both its runtime bundle *and* its types from it on startup" | composition | corroborated | 3.4.4 (dynamic-loading in home-app/src/App.tsx:13); home-app/rspack.config.js:52, 54; header-app/rspack.config.js:14-20 |
| 5 | README.md:28 | "Open [http://localhost:4001](http://localhost:4001) to view the remote (Header App)" (the remote runs alone) | independence | corroborated | 3.4.3 (entry of header-app); header-app/src/index.tsx:11-16; header-app/rspack.config.js:54-56 |
| 6 | README.md:30 | "Type-check either app on its own with `npm run typecheck`." | independence | corroborated | header-app/package.json:12; home-app/package.json:12; home-app/tsconfig.json:15-19 |
| 7 | home-app/rspack.config.js:48-50 | "Remotes are resolved via each remote's mf-manifest.json rather than a hardcoded remoteEntry.js URL — […] so consumers can resolve remotes at runtime." | composition | corroborated | 3.4.5 #1; 3.4.4 (dynamic-loading in home-app/src/App.tsx:13); home-app/rspack.config.js:51-53 |
| 8 | home-app/src/App.tsx:3-5 | "TS downloaded HeaderApp's generated declarations into ./@mf-types/HeaderApp and resolves them via the \"HeaderApp/*\" path in tsconfig.json" | composition | corroborated | home-app/tsconfig.json:15-17; home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12; header-app/rspack.config.js:63; home-app/rspack.config.js:54 |
| 9 | home-app/src/App.tsx:5-8 | "HeaderVariant is a real enum defined in header-app/src/App.tsx — this pulls in both its type AND its runtime values (Light/Dark) from the remote's own build, with no shared package and no hand-written .d.ts" | composition | corroborated | 3.4.4 (Notes, static import from home-app/src/App.tsx:11); header-app/src/App.tsx:4-7; header-app/rspack.config.js:60-62; home-app/@mf-types/index.d.ts:1-22 |
| 10 | home-app/src/App.tsx:8-10 | "tsc will reject it even though header-app is a completely separate build/deploy" | build-deploy | partial | 3.4.6 #1 and #2 (build `separate`, deploy `not observed`) |

## Observations

**1. README.md:3.** Snapshot has two React/Rspack applications, each with own manifest/build, linked by `ModuleFederationPlugin` from `@module-federation/enhanced` ^2.8.2 (header-app/package.json:15; home-app/package.json:15), the Module Federation 2.0 package. Word "example" matches classification `repo_type: example`.

**2. README.md:5-6.** header-app is remote `HeaderApp`, exposing `./Header` from `./src/App` (header-app/rspack.config.js:58-62). Manifest/types are not published snapshot files because `dist` is ignored (.gitignore:2), but publication is confirmed from both sides: host fetches `http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:52), and generated `./Header` declarations, with remote `dts: true` (header-app/rspack.config.js:63), reside in `home-app/@mf-types/HeaderApp/` (home-app/@mf-types/HeaderApp/Header.d.ts:1-2). Port 4001 stays outside table.

**3. README.md:11-12.** home-app is host `HomeApp` (home-app/rspack.config.js:47), declaring remote through manifest (home-app/rspack.config.js:51-53). Type checking relies on `dts: true` (home-app/rspack.config.js:54) and `paths` mapping `HeaderApp/*` to `./@mf-types/HeaderApp/*` (home-app/tsconfig.json:15-17); mechanism is described in claim 8 comment. Separate build is that recorded by build/deployment review (home-app/package.json:11). README.md:27 repeats host role ("to view the host (Home App)").

**4. README.md:19-20.** Host depends on running remote for both: code arrives at runtime through manifest (home-app/rspack.config.js:52) when page loads `lazy(() => import('HeaderApp/Header'))` (home-app/src/App.tsx:13), and types are downloaded by host `dts` plugin (home-app/rspack.config.js:54). Remote `devServer` serves `dist/` statically specifically for type files (header-app/rspack.config.js:14-20). "On startup" applies to types; remote code is fetched when browser opens host. Following commands (README.md:22-25) run each application in its directory, remote first.

**5. README.md:28.** header-app has own entry rendering header without host, with `<App title="Header (MF2)" />` (header-app/src/index.tsx:11-16) and own `index.html` (header-app/rspack.config.js:54-56). Running alone, remote uses default `variant` `Dark` (header-app/src/App.tsx:14), whereas host passes `Light` (home-app/src/App.tsx:19).

**6. README.md:30.** Both applications have `typecheck` script with `tsc --noEmit` (header-app/package.json:12; home-app/package.json:12). Host can check types without running remote because generated declarations are in snapshot and included by `tsconfig.json` (home-app/tsconfig.json:15-19).

**7. home-app/rspack.config.js:48-50.** Comment repeats claim 3’s manifest use, adding runtime remote resolution. Remote is declared through `HeaderApp@http://localhost:4001/mf-manifest.json` rather than `remoteEntry.js` (home-app/rspack.config.js:51-53), and host loads it through dynamic `import()` (home-app/src/App.tsx:13), an active composition-review relationship. Manifest URL is nevertheless also fixed in configuration. Comment portion about manifest content ("carries build metadata (exposed modules, shared deps)") describes Module Federation 2.0 format rather than project.

**8. home-app/src/App.tsx:3-5.** Generated declarations in `home-app/@mf-types/HeaderApp/` reproduce remote `HeaderVariant` and `HeaderProps` (home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12; header-app/src/App.tsx:4-12). tsconfig `paths` links specifier `HeaderApp/*` to them (home-app/tsconfig.json:15-17). Both sides have `dts: true` (header-app/rspack.config.js:63; home-app/rspack.config.js:54).

**9. home-app/src/App.tsx:5-8.** Enum is at header-app/src/App.tsx:4-7, exported through exposed module `./Header` (header-app/rspack.config.js:60-62). Host imports it statically from `HeaderApp/Header` (home-app/src/App.tsx:11), an import source-code review recorded in Notes as runtime remote consumption. No common package exists between applications (no workspace, 3.4.3), and `.d.ts` in `@mf-types` have plugin-generated format (home-app/@mf-types/index.d.ts:1-22), not handwritten. Packages declared by `shared` (header-app/rspack.config.js:64-74; home-app/rspack.config.js:55-65) are React rather than project code.

**10. home-app/src/App.tsx:8-10.** Type-checking part is confirmed (claim 8), as is separate build (header-app/package.json:11; home-app/package.json:11). Separate deployment lacks artifacts: both applications are served only through `rspack serve` on `localhost`, and build/deployment review recorded Deploy `not observed` for both. Claim is therefore `partial`.

## Summary

Claims: 10 (corroborated: 9, partial: 1, contradicted: 0, uncorroborated: 0). Themes: (structure: 3, composition: 4, build-deploy: 1, independence: 2).
