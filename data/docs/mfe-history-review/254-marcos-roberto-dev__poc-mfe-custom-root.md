---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
inputs:
  clone: data/samples/mfe-sample-001/repos/marcos-roberto-dev__poc-mfe-custom-root
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Repository overview

History up to snapshot has 4 linear commits, all from 2026-01-09, without merges. First, `546aa27` ("tada: start poc project MFE"), already includes four projects (`content-app`, `root-app`, `root-classic`, `topbar-app`): first observable presence of almost all files, including both host import maps, helper `dynamicImport.ts` and topbar `vite.config.ts`. First commit does not say where code was developed before. Next three commits change little: `0cccd59` ("feat: add topbar component with theme toggle functionality") creates `topbar-app/src/App.vue`, removes `topbar-app/src/TopbarApp.vue` and changes `topbar-app/src/main.ts`, plus styles and lockfiles; `f2f2494` ("feat: implement topbar component with theme toggle functionality") creates topbar copy in `root-app/src/modules/Topbar/` and changes `root-app/src/App.vue`; `6ae6565` ("style: format App.vue for consistency and readability"), snapshot, changes `content-app/src/App.vue`, `content-app/src/main.ts` and `topbar-app/src/App.vue`.

No `root-classic` file changes after `546aa27`. In `root-app`, `index.html`, `package.json`, `vite.config.ts`, `src/utils/dynamicImport.ts`, `mfe-app.json`, `src/importMap.json` and `src/importMap.dev.json` also do not change. Since object identifier is identical in all commits, version of these files throughout history matches snapshot. Clone is partial: old version contents of changed files (`root-app/src/App.vue` at `546aa27`, `topbar-app/src/TopbarApp.vue`, earlier `main.ts` files and `topbar-app/src/App.vue` at `0cccd59`) are unavailable locally. Only object identifiers are compared there, through `ls-tree`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `single-spa` declared in both remotes without import, which import only `single-spa-vue` | 3.4.2 (content-app/package.json:12; topbar-app/package.json:12) | dependency use | 546aa27 2026-01-09 tada: start poc project MFE; 0cccd59 2026-01-09 feat: add topbar component with theme toggle functionality; 6ae6565 2026-01-09 style: format App.vue for consistency and readability | inconclusive |
| 2 | `vite-plugin-single-spa` declared in `root-app` without import or registration in `vite.config.ts` | 3.4.2 (root-app/package.json:14) | dependency use | 546aa27 2026-01-09 tada: start poc project MFE | clarified |
| 3 | `@types/systemjs` declared in `root-classic` without usage | 3.4.2 (root-classic/package.json:44) | dependency use | 546aa27 2026-01-09 tada: start poc project MFE | clarified |
| 4 | Standalone mounting (`createApp(App).mount('#app')`) is commented out in both remotes | 3.4.3 (Notes); 3.4.5 (Overview) | active or abandoned | 546aa27 2026-01-09 tada: start poc project MFE; 0cccd59 2026-01-09 feat: add topbar component with theme toggle functionality; 6ae6565 2026-01-09 style: format App.vue for consistency and readability | inconclusive |
| 5 | The `root-app` has local topbar copy in `src/modules/Topbar/`, with import and usage commented out | 3.4.3 (Notes); 3.4.4 (Notes); 3.4.5 (Overview) | extraction | 546aa27 2026-01-09 tada: start poc project MFE; 0cccd59 2026-01-09 feat: add topbar component with theme toggle functionality; f2f2494 2026-01-09 feat: implement topbar component with theme toggle functionality; 6ae6565 2026-01-09 style: format App.vue for consistency and readability | clarified |
| 6 | SystemJS path of `root-app` (loader, fallback `System.import` and topbar `app.js` build) has no target because only `systemjs-importmap` is commented out | 3.4.4 (root-app/index.html:24; root-app/src/utils/dynamicImport.ts:24; Notes); 3.4.6 (Overview); 3.4.7 #2, #5 | active or abandoned | 546aa27 2026-01-09 tada: start poc project MFE | clarified |
| 7 | Meta `import-map-overrides-domains` and its instructions are commented out in `root-classic` | 3.4.4 (root-classic/src/index.ejs:12, 13, 14) | active or abandoned | 546aa27 2026-01-09 tada: start poc project MFE | clarified |
| 8 | `root-app/mfe-app.json`, `root-app/src/importMap.json` and `root-app/src/importMap.dev.json` map units to other URLs and are unread | 3.4.4 (Notes); 3.4.5 (Overview); 3.4.6 (Overview) | conflicting stages | 546aa27 2026-01-09 tada: start poc project MFE | clarified |
| 9 | Production import map of `root-classic` is commented out, and only local mode connects applications | 3.4.4 (Notes); 3.4.6 (Overview) | active or abandoned | 546aa27 2026-01-09 tada: start poc project MFE | clarified |
| 10 | Topbar is named `@org/header-app` in `root-app` and `@org/topbar-app` in `root-classic` | 3.4.5 #4 | conflicting stages | 546aa27 2026-01-09 tada: start poc project MFE; f2f2494 2026-01-09 feat: implement topbar component with theme toggle functionality | clarified |

## Observations

**1. `single-spa` declared in remotes without import.** The `content-app/package.json` and `topbar-app/package.json` do not change since `546aa27`: declaration exists in all versions. Files where package would be imported, `main.ts` files, changed afterward: `topbar-app/src/main.ts` in `0cccd59` and `content-app/src/main.ts` in `6ae6565`. Earlier versions are unavailable, so history does not show whether they ever imported `single-spa` directly. Uncertainty remains unchanged; package remains unused in snapshot.

**2. `vite-plugin-single-spa` declared and unused.** The `root-app/package.json` and `root-app/vite.config.ts`, where a Vite plugin would be registered, have same object in all commits. No history version shows plugin registered in `vite.config.ts`, containing only `vue()`. Conclusion applies to build configuration; old versions of `root-app/src/App.vue` and `root-app/src/shims-remote-modules.d.ts`, changed in `f2f2494`, are unavailable. Within history, dependency was declared and never configured; it was not disconnected afterward. History does not say why it was declared.

**3. `@types/systemjs` declared and unused.** No `root-classic` file changes after `546aa27`, so all project versions in history match snapshot, where package is not referenced. Dependency arrives with project and is never used in history. Whether it came only from generator (`create-single-spa`) or was used before first commit cannot be known.

**4. Remote standalone mounting is commented out.** Both `main.ts` files exist since `546aa27` and change once each: `topbar-app/src/main.ts` in `0cccd59`, whose message announces topbar component with theme toggle, and `content-app/src/main.ts` in `6ae6565`, whose message announces `App.vue` formatting. Earlier versions are unavailable. History does not show whether line `createApp(App).mount('#app')` was already commented out in first commit or any remote mounted UI alone. Inconclusive.

**5. Local topbar copy in `root-app`.** The `topbar-app` exists as project since `546aa27`, with `src/TopbarApp.vue`; in `0cccd59` this file leaves and `src/App.vue` arrives. Copy in `root-app/src/modules/Topbar/` appears only afterward in `f2f2494`, same commit changing `root-app/src/App.vue`. Object identifiers show copied `HelloWorld.vue` and `vue.svg` match those in `topbar-app`, and copied `TopbarApp.vue` (`064fd53`) is identical to snapshot `topbar-app/src/App.vue`, reaching these contents only in `6ae6565`. The `root-app/src/App.vue` at `f2f2494` already has snapshot object, with copy import and usage commented out; no history version has copy connected. Conclusion limited to these files: `topbar-app` was not extracted from this copy, which follows it and reproduces topbar code inside host; copy arrives already disconnected. Contents of `root-app/src/App.vue` before `f2f2494` are unavailable, and history does not say why copy was made.

**6. SystemJS path without target.** The `root-app/index.html`, with SystemJS loaded and only `systemjs-importmap` commented out, `root-app/src/utils/dynamicImport.ts`, with fallback `System.import`, and `topbar-app/vite.config.ts`, with build `format: "system"` and output `app.js`, have same object in all commits since `546aa27`. No history version had active SystemJS map: path was not disconnected afterward, arriving that way in first commit. History does not say whether it was connected before first commit or planned and never connected. The `partial` claims 3.4.7 #2 and #5 remain unchanged.

**7. Commented-out meta `import-map-overrides-domains`.** The `root-classic/src/index.ejs` does not change after `546aa27`; lines 12 to 14 are commented out in all versions. History had no version with active meta. They are `create-single-spa` template comments, and history does not say whether they were ever uncommented before first commit.

**8. Unread import maps.** Three files are created in `546aa27`, same commit as native import map in `root-app/index.html`, and none of four changes afterward. Different URLs (port 5173, `spa.js`) do not belong to an earlier observable stage: unread maps and active map coexist since first commit. History does not say whether these files were used before first commit.

**9. Commented-out production import map.** Same `root-classic/src/index.ejs` arrives in `546aa27` with production map commented out and local map conditional on `isLocal`, and does not change afterward. There is no version with active production map or commit commenting it out. History does not say whether it was planned and never connected or is only generator text.

**10. Two topbar names.** The `root-app/index.html`, with `@org/header-app`, `root-classic/src/index.ejs` and `root-classic/src/microfrontend-layout.html`, with `@org/topbar-app`, and `topbar-app/package.json` do not change since `546aa27`. Both names coexist since first commit, and no commit renames unit. The `root-app/src/App.vue`, using `@org/header-app` at line 8, changes in `f2f2494`, and earlier version is unavailable; but map resolving name, in `index.html`, is identical in all versions. Conclusion limited to these files: names do not belong to different history stages. History does not link `@org/header-app` to `topbar-app`, and relationship 3.4.5 #4 remains unchanged.

## Commands

```
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root rev-list --count 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root rev-list --count --merges 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --reverse --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --reverse --name-status --no-renames --format='--- %h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r 546aa27 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r 0cccd59 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r f2f2494 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r 6ae6565 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 546aa27:root-app/src/App.vue          # failed: missing object
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 546aa27:topbar-app/src/TopbarApp.vue   # failed: missing object
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 546aa27:topbar-app/src/main.ts        # failed: missing object
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 0cccd59:topbar-app/src/App.vue        # failed: missing object
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e 7bdbd66488bbc178965cb9e0d338a96d59a6a1c5   # missing
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e 42c5d27d9381b1844b9a08adf2bba16239778d9b   # missing
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e 73c35efb899418e4db9c80fdf4fa0c7449e155e0   # missing
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e f5dc067023592d4e1f28db789ac61328e4c4d3cc   # missing
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- content-app/package.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/package.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- content-app/src/main.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/src/main.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/package.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-classic
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/App.vue
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/modules
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/src
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/index.html
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/utils/dynamicImport.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/mfe-app.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/importMap.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/importMap.dev.json
```

## Summary

Commits up to the snapshot: 4 (2026-01-09 to 2026-01-09). Points: 10 (clarified: 8, inconclusive: 2, resolved by the snapshot: 0).
