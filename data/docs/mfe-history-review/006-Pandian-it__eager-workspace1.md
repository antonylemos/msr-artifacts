---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
inputs:
  clone: data/samples/mfe-sample-001/repos/Pandian-it__eager-workspace1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 006 — Pandian-it/eager-workspace1

## Repository overview

History up to snapshot has 94 commits, from 2025-08-12 to 2025-10-23, with 13 merges. Many commits belong to automated release flow (changesets, "Release …", "Version Packages").

Two milestones explain points from previous reviews:
- **`69e232b` (2025-08-12, "added nx build"):** removes `angular.json` and creates `nx.json` and `project.json` files. Workspace moves from Angular CLI to Nx.
- **`3a75f71` (2025-09-02, "Reverting back to webpack"):** changes composition configuration. First commit, `85d75fe`, already had a `federation.config.js` and `tsconfig.federation.json` in each of four applications, plus `projects/shell/public/federation.manifest.json`, whose entries point to `remoteEntry.json`. Artifacts compatible with Native Federation. Commit `3a75f71` removes all four `federation.config.js` files, creates a `webpack.config.js` per application and modifies `project.json` files, `main.ts` files, `package.json`, shell manifest service and release workflow. Same change adds guide `cloudfront-spa-config.md` and a changeset. Old `federation.config.js` files are unavailable in clone, so their configuration cannot be inspected. Message says "reverting back", but no earlier webpack stage appears in history.

The `tsconfig.federation.json` files remain in snapshot (e.g.: projects/cart/tsconfig.federation.json), as remnants of this first stage.

Old content availability varies by file. The `69e232b:package.json`, `85d75fe:projects/shell/src/app/manifest.service.ts` and `85d75fe:projects/cart/federation.config.js` fail because of missing objects. In contrast, `3a75f71:package.json`, `85d75fe:projects/shell/public/federation.manifest.json` and almost all checkout files at `3a75f71` are available.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@nx/workspace` declared and unused | 3.4.2 (package.json:47) | dependency use | 69e232b 2025-08-12 added nx build; 3a75f71 2025-09-02 Reverting back to webpack | inconclusive |
| 2 | Cart bootstrap uses a module not defining how to start UI | 3.4.3 (projects/cart `Undetermined`) | active or abandoned | 85d75fe 2025-08-12 first commit | clarified |
| 3 | Shell has a `federation.manifest.json` not read by code | 3.4.5 (Overview) | conflicting stages | 85d75fe 2025-08-12 first commit; 3a75f71 2025-09-02 Reverting back to webpack | clarified |
| 4 | CloudFront guide places shell and manifest at bucket root, while workflow publishes them elsewhere | 3.4.7 #4 | conflicting stages | 3a75f71 2025-09-02 Reverting back to webpack | clarified |
| 5 | Checkout configuration shares `@shared-ui` "since checkout uses it", and checkout does not import it | 3.4.7 #6 | conflicting stages | 3a75f71 2025-09-02 Reverting back to webpack | clarified |

## Observations

**1. `@nx/workspace` declared and unused.** Nx enters workspace in `69e232b`, modifying `package.json`, and `package.json` changes again in `3a75f71`. Version at `3a75f71`, same as snapshot, declares `"@nx/workspace": "21.3.11"`. Version at `69e232b` is unavailable. When dependency was first declared or whether a command used it previously cannot be known. It remains `No` in snapshot.

**2. Cart bootstrap uses a module not defining how to start UI.** The `projects/cart/src/app/mfe.module.ts` and `projects/cart/src/bootstrap.ts` have not changed since first commit. Cart `main.ts` changed only in `3a75f71`, during mechanism switch. Arrangement leaving cart `Undetermined` in structural review exists since first observed commit, and no commit altered it.

**3. Shell has a `federation.manifest.json` not read by code.** File is in first commit, with `federation.config.js` files of all four applications, and never changes afterward. Composition review described it as "template remnant". History permits a more precise boundary: it belongs to set of Native Federation-compatible artifacts in first commit and remained when `3a75f71` replaced `federation.config.js` files with `webpack.config.js`. Old versions of shell manifest service and `federation.config.js` files are unavailable. Whether manifest was ever read or how first stage was configured cannot be known.

**4. CloudFront guide places shell and manifest at bucket root, while workflow publishes them elsewhere.** Workflow exists since `5cf7880` (2025-08-31). The `cloudfront-spa-config.md` is created in `3a75f71`, same commit making last workflow change up to snapshot. Guide and snapshot workflow version have coexisted since `3a75f71`, so do not belong to different stages. History does not say which corresponds to actual deploy.

**5. Checkout configuration shares `@shared-ui` "since checkout uses it", and checkout does not import it.** Checkout `webpack.config.js`, including comment, is created in `3a75f71`. At this commit, all files in `projects/checkout/src` are available except `index.html`, and none references `shared-ui`. Comment already failed to match checkout when written. History does not say whether a version before `3a75f71` used library.

## Commands

```
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 rev-list --count 9ad83c2d39d410bab0e82efdebca145ebb04adbc
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 rev-list --count --merges 9ad83c2d39d410bab0e82efdebca145ebb04adbc
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format=%ad --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- package.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show --name-status --no-renames --format='== %h %s' 69e232b
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 69e232b:package.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show --name-status --no-renames --format='== %h %ad %s' --date=short 3a75f71
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 ls-tree -r --name-only 85d75fe
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/cart/src/app/mfe.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/cart/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/cart/src/main.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/shell/public/federation.manifest.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- cloudfront-spa-config.md
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- .github/workflows/Push-Event-To-Release.yml
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/checkout/webpack.config.js
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 log --format='%h %ad %s' --date=short 9ad83c2d39d410bab0e82efdebca145ebb04adbc -- projects/checkout/src
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:package.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 85d75fe:projects/shell/public/federation.manifest.json
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 85d75fe:projects/shell/src/app/manifest.service.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 85d75fe:projects/cart/federation.config.js   # failure: missing object
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 ls-tree -r --name-only 3a75f71 -- projects/checkout/src
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app-routing.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.html
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.scss
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.spec.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.component.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/app.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/mfe.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/app/shared-components.module.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/index.html   # failure: missing object
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/main.ts
docs/mfe-history-review/tools/hist.sh Pandian-it__eager-workspace1 show 3a75f71:projects/checkout/src/styles.scss
```

## Summary

Commits up to the snapshot: 94 (2025-08-12 to 2025-10-23). Points: 5 (clarified: 4, inconclusive: 1, resolved by the snapshot: 0).
