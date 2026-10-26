---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
inputs:
  clone: data/samples/mfe-sample-001/repos/coolsamson7__novx
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Repository overview

History up to snapshot has 251 commits, from 2026-02-19 to 2026-03-16. First is `b606d83` (2026-02-19, "Initial commit"); library code enters in `d1267d3` (2026-02-24, "initial code"), creating `package.json`, `nx.json`, `eslint.config.mjs`, CI and `libs/core`. Milestones relevant to points are on 2026-02-26 and 2026-02-27: `d668c15` ("added new libs") brings client side of portal mode `service`; `073c63f` ("added new libs") creates `apps/app` and scan tool `tools/metadata`; "added sample app" series creates `apps/microfrontend` (`45b448f`, `ed4e20e`, `3086f67`); next day, two "fix" commits modify remote webpack (`c46ce96`) and create `bootstrap.ts` (`dd4543f`). Snapshot is `128ba9a` (2026-03-16, "fixed test").

Clone does not store old content of files changed later: `show <commit>:<caminho>` failed because of missing objects for all old versions of `package.json`, `nx.json`, `eslint.config.mjs`, app `project.json` files and remote `webpack.config.js`. Only versions identical to snapshot can be read (e.g.: `bootstrap.ts` at `dd4543f`, `main.tsx` at `45b448f`). Trees are generally available, revealing files each commit created, changed, moved or removed; whole-repository `log --name-status` and `log` limited to `libs` failed because of missing tree (`da9b173`), but queries restricted to `apps`, `tools`, `ui` and specific paths reached first commit.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@nrwl/eslint-plugin-nx` declared in devDependencies without import, plugin or invocation in snapshot | 3.4.2 (package.json:14) | dependency use | d1267d3 2026-02-24 initial code; 8e0388e 2026-03-16 added scss loader | inconclusive |
| 2 | `apps/microfrontend`: the `main`/`index` of `project.json` (`src/main.tsx`, `src/index.html`) and webpack `entry` (`src/bootstrap.ts`) differ, and `HtmlWebpackPlugin` is commented out | 3.4.3 (apps/microfrontend) | conflicting stages | 45b448f 2026-02-26 added sample app; ed4e20e 2026-02-26 added sample app; 3086f67 2026-02-26 added sample app; c46ce96 2026-02-27 fix; dd4543f 2026-02-27 fix; 5d8c3af 2026-03-06 run extractor | clarified |
| 3 | Configuration "client and server side": client side (mode `service`) exists, server responding to `/portal/deployment` does not | 3.4.7 #4 | active or abandoned | d668c15 2026-02-26 added new libs | clarified |
| 4 | Parser generating `manifest.json` "as part of the build": target `scan-metadata` exists, but no `build` depends on it | 3.4.7 #5 | active or abandoned | 073c63f 2026-02-26 added new libs; 3086f67 2026-02-26 added sample app; 144cc29 2026-02-27 started login / logout; 9c90397 2026-03-06 fix(tools): expose./Module; 5d8c3af 2026-03-06 run extractor | inconclusive |

## Observations

**1. `@nrwl/eslint-plugin-nx` unused.** The `package.json` appears in `d1267d3` (2026-02-24, "initial
code") and changes in 32 commits up to snapshot, last `8e0388e` (2026-03-16, "added scss loader"), whose version matches snapshot and already includes dependency on line 14. All consulted earlier versions (`d1267d3`, `62bc297`, `797a21a`, `ba724bb`, `d668c15`, `710012d`, `181e3d1`, `a7e7050`, `844828f`, `757085b`) failed because of missing objects, as did first version of `eslint.config.mjs` (`d1267d3`; file also changes in `d87e969`, "lint", and `41f6541`, "fixed tests"). History shows neither when package entered nor whether ESLint configuration ever used it. Inconclusive; dependency remains `No` in snapshot.

**2. Entry of `apps/microfrontend`.** History separates artifacts into two moments. On 2026-02-26, `45b448f` ("added sample app") creates `src/main.tsx` (unchanged up to snapshot), `src/Module.ts`, `src/feature.tsx`, `src/index.html` and `src/manifest.json`, and `ed4e20e` creates `project.json` and `webpack.config.js`; shortly afterward, `3086f67` moves `src/index.html` to `apps/microfrontend/index.html` (rename without content change) and modifies `project.json`. No later commit recreates `src/index.html`, so `index` declared by snapshot `project.json` (`apps/microfrontend/src/index.html`) points to a path existing only between `45b448f` and `3086f67`. On 2026-02-27, `c46ce96` ("fix") changes `webpack.config.js` and, 23 seconds later, `dd4543f` ("fix") creates `src/bootstrap.ts` with `export {};`, same content as snapshot; webpack changes afterward only in `5d8c3af` (2026-03-06, "run extractor"). Thus `main` and `index` of `project.json` refer to first app stage, and webpack `entry` points to a file from following stage. History does not show old webpack versions’ content (`ed4e20e` and `c46ce96` failed because of missing objects) or `project.json` (`3086f67` and `8b15f6f` failed), so does not say whether `entry` was ever `main.tsx`, when `HtmlWebpackPlugin` was commented out, or whether remote ever ran alone. Clarified regarding file stages; unit remains `Undetermined`.

**3. Server side of configuration.** The `libs/portal/src/lib/loader/service-loader.ts` and `libs/portal/src/lib/service/` enter in `d668c15` (2026-02-26, "added new libs") and remain unchanged up to snapshot. The `log` of files created in `apps/` and `tools/`, covering all history up to snapshot, shows only `apps/app`, `apps/microfrontend` and `tools/metadata`; roots of `d1267d3`, `d668c15`, `710012d`, `1e68673`, `4c70ac5`, `b9a6463` and snapshot have no server directory, and `apps/`, `tools/` and `libs/` in consulted versions (`710012d`, `1e68673`, `4c70ac5`, `b9a6463`, `5d8c3af`, snapshot) contain only known projects. Within these artifacts, server was not created and removed: repository had only client since mode `service` entered. History does not show whether server exists in another repository. The `log` of `libs` failed because of missing tree, so `libs/` was viewed only in listed versions. Clarified; claim remains `partial`.

**4. Metadata scan in build.** The `tools/metadata` enters in `073c63f` (2026-02-26, "added new
libs"), with `apps/app/project.json`, and changes only in `9c90397` (2026-03-06, "fix(tools):
expose./Module", in `feature-parser.ts`). Remote manifest was created at `apps/microfrontend/src/manifest.json` (`45b448f`) and moved to `public/manifest.json` in `3086f67`, without content change; afterward only `144cc29` (2026-02-27, "started login / logout") changes it. Field `outFile` of remote `scan-metadata` in snapshot is still `src/manifest.json`, a path absent since `3086f67`. The `apps/app/src/manifest.json` changes in 16 commits, from `f59d5b1` (2026-02-26, "added sample app") to `ed15c1d` (2026-03-16, "i18n showcase"); messages do not say whether each change came from scan. Message of `5d8c3af` ("run extractor") announces running extractor, but commit only changes remote `webpack.config.js`, whose old content is unavailable. Old `project.json` and `nx.json` versions failed because of missing objects (`073c63f`, `3086f67`, `8b15f6f`, `a580eb6`), so history does not show whether `build` ever depended on `scan-metadata`. Inconclusive; claim remains `partial`.

## Commands

```
docs/mfe-history-review/tools/hist.sh coolsamson7__novx rev-list --count 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --reverse --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- package.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short d1267d3
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show d1267d3:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 62bc297:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 797a21a:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show ba724bb:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show d668c15:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 710012d:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 181e3d1:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show a7e7050:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 844828f:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 757085b:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 8e0388e:package.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=D --name-status --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f      # failed after 948f1ea: missing object da9b173
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/webpack.config.js
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/src/main.tsx
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/app/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- nx.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- tools/metadata
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- libs/portal/src/lib/loader/service-loader.ts
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- libs/portal/src/lib/service
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- ui
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short ed4e20e
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 45b448f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 3086f67
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short c46ce96
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short dd4543f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 5d8c3af
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 9c90397
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short b0bc255
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%H %ad %s' --date=short 8b15f6f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show ed4e20e:apps/microfrontend/webpack.config.js      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show c46ce96:apps/microfrontend/webpack.config.js      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show dd4543f:apps/microfrontend/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 45b448f:apps/microfrontend/src/main.tsx
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 3086f67:apps/microfrontend/project.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 8b15f6f:apps/microfrontend/project.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 073c63f:apps/app/project.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 3086f67:apps/app/project.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show b2269d5:apps/app/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show 5a51d51:nx.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show a580eb6:nx.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --name-status --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f      # failed at b9a6463: missing object da9b173
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only d1267d3
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only d668c15
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 710012d
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 1e68673
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 4c70ac5
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only b9a6463
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only <c>:apps      # <c> = 710012d, 1e68673, 4c70ac5, b9a6463, 5d8c3af, 128ba9a0f9f373210c09948a19bd1b59d9c7673f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only <c>:tools     # same
docs/mfe-history-review/tools/hist.sh coolsamson7__novx ls-tree --name-only <c>:libs      # same
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=iso 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/microfrontend/src/index.html apps/microfrontend/index.html apps/microfrontend/src/bootstrap.ts apps/microfrontend/src/main.tsx apps/microfrontend/webpack.config.js apps/microfrontend/project.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short 8b90051
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- tools/metadata apps/microfrontend/src/manifest.json apps/microfrontend/public/manifest.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short 073c63f
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show --name-status --format='%h %ad %s' --date=short 144cc29
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps/app/src/manifest.json
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --format='%h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- eslint.config.mjs
docs/mfe-history-review/tools/hist.sh coolsamson7__novx show d1267d3:eslint.config.mjs      # failed: missing object
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- tools
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- libs      # failed after b0bc255: missing object da9b173
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- ui
docs/mfe-history-review/tools/hist.sh coolsamson7__novx log --diff-filter=A --name-only --format= 128ba9a0f9f373210c09948a19bd1b59d9c7673f -- apps tools
```

## Summary

Commits up to the snapshot: 251 (2026-02-19 to 2026-03-16). Points: 4 (clarified: 2, inconclusive: 2, resolved by the snapshot: 0).
