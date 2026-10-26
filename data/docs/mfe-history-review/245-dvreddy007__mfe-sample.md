---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
inputs:
  clone: data/samples/mfe-sample-001/repos/dvreddy007__mfe-sample
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Repository overview

History up to snapshot has 2 commits, from 2025-05-17 to 2025-05-25, without merges. First, `e4a97c4` (2025-05-17, "push first commit"), creates all code at once: root and three package `package.json` files, `lerna.json`, `README.md`, `vite.config.js` files, route manifest, `Loader.vue`, federation plugin and remote `entry.js` files. Second, `d4cef45` (2025-05-25, "Add or update the Azure App Service build and deployment workflow config"), is snapshot and creates only `.github/workflows/main_vdumpavue3.yml`. No first-commit file changes afterward: object identifiers of `README.md`, `lerna.json`, `package.json`, `packages/host/vite.config.js` and `packages/host/src/routeManifest.js` are identical in `e4a97c4` and snapshot.

Code, README and configurations already exist in first commit, so this is first observable presence rather than introduction: history does not say where or in what order they were developed before. There is also no earlier version to compare with README, instructing cloning another repository (README.md:41-42). Only introduction shown by history is Azure workflow.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | The `lerna` is declared and appears only in root `dev` script, with minimal `lerna.json` | 3.4.2 (package.json:12); 3.4.7 #12 | dependency use | e4a97c4 2025-05-17 push first commit | inconclusive |
| 2 | Azure workflow publishes entire repository zip without building any package, and deploy of three applications remained `Undetermined` | 3.4.6 #1, #2, #3; 3.4.7 #1 | active or abandoned | e4a97c4 2025-05-17 push first commit; d4cef45 2025-05-25 Add or update the Azure App Service build and deployment workflow config | inconclusive |
| 3 | README attributes own routes and routing and runtime route updates to micro frontends, and routes are fixed in host manifest | 3.4.7 #5, #7, #13 | conflicting stages | e4a97c4 2025-05-17 push first commit | inconclusive |
| 4 | Host `filename` comment mentions host own remote modules, and host has no `exposes` | 3.4.7 #18 | active or abandoned | e4a97c4 2025-05-17 push first commit | inconclusive |

## Observations

**1. `lerna` declared and only in `dev` script.** The `package.json` and `lerna.json` have a single commit, `e4a97c4`, and same object in first commit and snapshot. The `lerna` was not configured and later abandoned within observable history: state is unchanged since first presence. History does not say whether `lerna run dev` was used to start packages, or whether minimal `lerna.json` already came that way from source example. The `lerna` remains `Undetermined`.

**2. Azure deploy.** Workflow is created alone in `d4cef45`, eight days after code, and is last commit up to snapshot. Message announces creation or update of Azure App Service build and deploy configuration, wizard default text. Commit changes no `package.json`: root still lacks `build`, `test` and `start` (package.json, same object in `e4a97c4` and snapshot). Thus workflow was added on top of code not adapted for it. History does not show whether publication ran, served any application or was used afterward, and no subsequent commit exists. Knowing when workflow appeared proves neither usage nor abandonment. Deploy remains `Undetermined`.

**3. README routing description and host manifest routes.** The `README.md`, `routeManifest.js` and `router/index.js` have only commit `e4a97c4` and do not change up to snapshot. In `e4a97c4`, `packages/host/src/router/routeManifest.js`, path in README.md:78 title, does not exist; directory `packages/host/src/router` has only `index.js`. Thus observable history has no code stage with routes coming from remotes, their own routing or manifest at README path. README and code arrive together, and history does not say whether README was written for another stage or copied from source example before first commit.

**4. Host `filename` comment.** The `packages/host/vite.config.js` has only commit `e4a97c4`, with same object in snapshot. There is no version where host has `exposes`; comment and configuration without `exposes` arrive together. History does not say whether comment is a remnant of configuration before first commit or unrealized intention.

## Commands

```
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample rev-list --count d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample rev-list --count --merges d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --reverse --format='%h %ad %s' --date=short --name-status d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- package.json
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- lerna.json
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- .github/workflows/main_vdumpavue3.yml
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- README.md
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- packages/host/src/routeManifest.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- packages/host/src/router/index.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- packages/host/vite.config.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample ls-tree e4a97c4 -- package.json lerna.json README.md packages/host/vite.config.js packages/host/src/routeManifest.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample ls-tree d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- package.json lerna.json README.md packages/host/vite.config.js packages/host/src/routeManifest.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample ls-tree -r --name-only e4a97c4 -- packages/host/src/router
```

## Summary

Commits up to the snapshot: 2 (2025-05-17 to 2025-05-25). Points: 4 (clarified: 0, inconclusive: 4, resolved by the snapshot: 0).
