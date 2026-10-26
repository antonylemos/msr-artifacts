---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
inputs:
  clone: data/samples/mfe-sample-001/repos/Varshithknaik__mfe-lect
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 177 — Varshithknaik/mfe-lect

## Repository overview

History up to snapshot has 40 commits, with one merge (`2710964`, 2025-11-03), from 2025-09-24 (`256e049`, "first commit", only `README.md`) to 2026-07-26 (`deea335`, snapshot commit, changing only `.gitignore` and `README.md`). Second commit, `9584f06` (2025-10-05, "feat(marketing): initialize marketing package with React and MUI components"), creates entire `packages/` tree at once (container, marketing, auth and dashboard, with configurations, `src` and `public`), root `marketing/` code and configurations and only `package.json` and `package-lock.json` of root `auth/`, `container/` and `dashboard/`. These four root `package.json` files have same objects in `9584f06` as those in `packages/` (for example `8e0ec21` in `dashboard/package.json` and `packages/dashboard/package.json`), and remain identical in snapshot. Root tree is then built incrementally: container in `fa98fd9` (2025-10-05), federation with marketing in `cf1d5ec` (2025-10-12), container and marketing workflows in `2fb5c14` (2025-10-15) and `0d951f4` (2025-10-25), auth code in `dfd5a8c` (2025-11-03) and its workflow in `6dfc014` (2025-11-03), routes with `lazy` in `2d3ac70` (2025-11-05) and `onSignIn` in `b3e0b20` (2025-11-06). No commit after `9584f06` touches `packages/` or `dashboard/`.

For both points, `packages/` and root `dashboard/` have first observable presence in `9584f06`; history does not show where this code was written before. Old version contents are mostly unavailable in partial clone: of queried `container/config/webpack.prod.js` and `container/src/App.js` versions, only `webpack.prod.js` at `522c5d7` (same object as snapshot) could be read; others failed with missing objects. Messages and object identifiers (`ls-tree`) resolve points.

Not raised as points: dependency review has no rows; structural, composition and build/deploy reviews left nothing `Undetermined` (root `dashboard/` is `No` in 3.4.3, and `not observed` deploy of `packages/` in 3.4.6 is not `Undetermined`); and all 16 claims in 3.4.7 are `corroborated`. The `docs/README.md` referenced by README (README.md:7), absent from snapshot, is explained by snapshot itself: `.gitignore` ignores `**/docs/**` (.gitignore:3), and both files change together in `deea335`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | In root container, remote `dashboard`, `DashboardLazy` and route `/dashboard` are commented out, and root `dashboard/` has only `package.json`. | 3.4.4 (container/src/App.js:35); 3.4.5 (Overview); 3.4.6 (Overview); 3.4.7 #2 | active or abandoned | 9584f06 2025-10-05 feat(marketing): initialize marketing package with React and MUI components; 0f9f1e8 2025-10-25 fix(workflows): adjust environment variable placement in container.yml and remove redundant env declaration in marketing.yml fix(webpack): comment out unused remote entries in webpack.prod.js; 522c5d7 2025-11-03 feat(auth): configure development server and update public paths in webpack configs; add Auth component for microfrontend integration; 2d3ac70 2025-11-05 feat(container): implement routing with lazy loading for Auth and Marketing components; add Progress component for loading indication | clarified |
| 2 | Snapshot has two trees with same unit names, root tree (published by workflows) and complete copy in `packages/`, not distinguished by configuration alone. | 3.4.4 (Notes); 3.4.5 #1, #3 | conflicting stages | 9584f06 2025-10-05 feat(marketing): initialize marketing package with React and MUI components; fa98fd9 2025-10-05 feat(container): set up initial webpack configuration and application structure; dfd5a8c 2025-11-03 feat(MarketingApp): enhance navigation handling by adding initialPath support and defaultHistory option | clarified |

## Observations

**1. Commented-out dashboard at root.** Root `dashboard/` arrives in `9584f06` with only `package.json` and `package-lock.json`, with same objects as those in `packages/dashboard/`, and does not change up to snapshot (`log -- dashboard packages` lists only `9584f06`). No commit creates `container/src/components/DashboardApp.js` at root (`log` empty for path), and `ls-tree` of `container/src/components` at `7e61019`, `0d951f4`, `0ab8363`, `0f9f1e8`, `522c5d7`, `de2d707`, `2d3ac70` and snapshot never shows it. Message of `0f9f1e8` (2025-10-25) announces "comment out unused remote entries in webpack.prod.js"; current `webpack.prod.js` object (`2802909`) is from `522c5d7` (2025-11-03), whose readable version already has dashboard line commented out. Earlier versions could not be read, so history does not show whether remote line was ever uncommented. Snapshot `App.js` has object from `2d3ac70` (2025-11-05), whose message announces routes with `lazy` for Auth and Marketing; earlier `App.js` versions also could not be read. Conclusion limited to these files: in root tree, dashboard never progressed beyond manifest and container never had wrapper `DashboardApp`; commented-out lines are planned and never connected in this tree, rather than remnants of a working dashboard later abandoned.

**2. Two trees with same names.** Tree `packages/` appears complete in `9584f06` (2025-10-05), second commit, and is not changed afterward. Root tree begins in same commit with only manifests, identical to those in `packages/` (same objects in four `package.json` files), and code is created later, application by application: marketing in `9584f06`, container in `fa98fd9`, auth in `dfd5a8c`. In snapshot, `auth/src/bootstrap.js` has same object (`50c1d9e`) as `packages/auth/src/bootstrap.js`, created in `dfd5a8c`, whose message mentions only MarketingApp. History therefore does not show `packages/` as extraction from root or an earlier stage later replaced: both coexist from start, `packages/` as complete static version and root as incremental reconstruction reusing manifests and, at least in auth `bootstrap.js`, same contents. History does not show source of `packages/` contents. Conclusion: conflicting artifacts do not belong to successive repository stages; they are a fixed reference and parallel reconstruction, and only root tree evolved and acquired workflows.

## Commands

```
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect rev-list --count deea3350c74ee5de8427c190378733b644ae4b53
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect rev-list --count --merges deea3350c74ee5de8427c190378733b644ae4b53
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short --reverse --name-status deea3350c74ee5de8427c190378733b644ae4b53
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- dashboard packages
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show -s --format='%h %ad%n%B' --date=short 0f9f1e8
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 0d951f4:container/config/webpack.prod.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 0ab8363:container/config/webpack.prod.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 0f9f1e8:container/config/webpack.prod.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 522c5d7:container/config/webpack.prod.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 7e61019 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 0d951f4 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 0ab8363 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 0f9f1e8 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 522c5d7 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r de2d707 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 2d3ac70 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r deea3350c74ee5de8427c190378733b644ae4b53 -- container/config/webpack.prod.js container/src/App.js container/src/components dashboard
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- container/src/App.js container/config/webpack.prod.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- container/src/components/DashboardApp.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r 9584f06 -- dashboard packages/dashboard/package.json packages/dashboard/package-lock.json auth/package.json container/package.json marketing/package.json packages/auth/package.json packages/container/package.json packages/marketing/package.json
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 2673630:container/src/App.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show 522c5d7:container/src/App.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect show de2d707:container/src/App.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect ls-tree -r deea3350c74ee5de8427c190378733b644ae4b53 -- auth/package.json container/package.json marketing/package.json dashboard/package.json auth/src/bootstrap.js packages/auth/package.json packages/container/package.json packages/marketing/package.json packages/dashboard/package.json packages/auth/src/bootstrap.js
docs/mfe-history-review/tools/hist.sh Varshithknaik__mfe-lect log --format='%h %ad %s' --date=short deea3350c74ee5de8427c190378733b644ae4b53 -- auth/package.json container/package.json marketing/package.json auth/src/bootstrap.js
```

## Summary

Commits up to the snapshot: 40 (2025-09-24 to 2026-07-26). Points: 2 (clarified: 2, inconclusive: 0, resolved by the snapshot: 0).
