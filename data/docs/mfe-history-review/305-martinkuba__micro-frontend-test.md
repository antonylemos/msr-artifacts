---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
inputs:
  clone: data/samples/mfe-sample-001/repos/martinkuba__micro-frontend-test
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Repository overview

History up to snapshot has 11 commits, from 2026-01-06 to 2026-01-07. First, `efec921` (2026-01-06, "init"), already has shell, main-content and sidebar sources. Both remote entries only reexport components at this first observable presence and never change again. This delineates historical entry evidence; it demonstrates neither standalone execution nor where code was developed before.

The `aaf32b6` (2026-01-06, "run all apps on different ports to guarantee separation") creates manifests and webpack configurations of three packages; `364c596` (2026-01-07, "deleted root webpack config") removes root webpack configuration. Message of `3174dd1` (2026-01-07, "removed side app for now") announces temporary sidebar removal and listing records changes to root manifest, App and host configuration. Sidebar status text already existed before this message and remains in snapshot. Last commit, `f629b5b` (2026-01-07, "added readme"), adds README.

Original remote entries and a sidebar component version preceding announced removal could be read. Queried old App and host configuration blobs are unavailable locally: queries failed without network fetching. Thus earlier sidebar connection was not confirmed through contents. No snapshot judgment changes.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Main-content has entry only reexporting component, without demonstrated standalone mounting | 3.4.3 (Units: packages/main-content, Undetermined); 3.4.7 #7 | conflicting stages | efec921 2026-01-06 init | clarified |
| 2 | Sidebar has entry only reexporting component, without demonstrated standalone mounting | 3.4.3 (Units: packages/sidebar, Undetermined) | conflicting stages | efec921 2026-01-06 init | clarified |
| 3 | Sidebar is disabled in host, but retains federated loading text | 3.4.4 (packages/shell/src/App.tsx:7,206-214); 3.4.5 (Overview: sidebar disabled); 3.4.7 #12 | active or abandoned | eb20348 2026-01-07 added buttons to trigger signals in parent shell; 3174dd1 2026-01-07 removed side app for now | inconclusive |

## Observations

**1. Main-content entry.** The `show efec921:packages/main-content/src/index.ts` shows only `export { default as MainContent } from './MainContent';`. Complete change listing up to snapshot records entry creation in `efec921` and no later change. Snapshot retains contents (packages/main-content/src/index.ts:1); configuration points to it (packages/main-content/webpack.config.js:8). History clarifies, limited to this file, that entry without mounting does not result from later removal of standalone bootstrap. It demonstrates neither past nor present independent execution, nor intention of sentence at packages/main-content/src/MainContent.tsx:160. Structural Undetermined and uncorroborated claim remain.

**2. Sidebar entry.** The `show efec921:packages/sidebar/src/index.ts` shows only `export { default as Sidebar } from './Sidebar';`. This entry is also created only in first commit and has no later changes in listing up to snapshot. Current contents and configuration reference (packages/sidebar/src/index.ts:1; packages/sidebar/webpack.config.js:8) match this organization. History clarifies this file did not lose standalone mounting during observed commits. This does not prove standalone UI in another context or change structural Undetermined; host disconnection is another point.

**3. Disabled sidebar with loading text.** Version of packages/sidebar/src/Sidebar.tsx at `eb20348`, read in full, already contains “✓ Loaded via Module Federation”. Listing records no later file change, so text predates announced removal in `3174dd1` and remains in snapshot (packages/sidebar/src/Sidebar.tsx:158). Message of `3174dd1` announces “removed side app for now”; its changed paths are package.json, packages/shell/src/App.tsx and packages/shell/webpack.config.js. Snapshot confirms commented-out import, mounting and remote (packages/shell/src/App.tsx:7,206-214; packages/shell/webpack.config.js:36) and root start without sidebar (package.json:7). However, queries for App at `61ab9ca` and host configuration at `aaf32b6` failed with missing objects. Earlier connection activity could not be verified through contents, nor all current commented-out lines attributed to this commit. Message and retained text do not suffice to prove earlier usage or definitive abandonment. Point remains inconclusive; snapshot No construct and contradicted claim remain.

## Commands

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test log --reverse --format='%h %ad %s' --date=short --name-status f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test rev-list --count f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show efec921:packages/main-content/src/index.ts
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show efec921:packages/sidebar/src/index.ts
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show 61ab9ca:packages/shell/src/App.tsx
# Failed: fatal: bad object 61ab9ca:packages/shell/src/App.tsx (missing object, no fetching).
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show aaf32b6:packages/shell/webpack.config.js
# Failed: fatal: bad object aaf32b6:packages/shell/webpack.config.js (missing object, no fetching).
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show eb20348:packages/sidebar/src/Sidebar.tsx
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Both fingerprint comparisons, before and after queries, matched reference. All queried content commits appear in log limited to snapshot.

## Summary

Commits up to the snapshot: 11 (2026-01-06 to 2026-01-07). Points: 3 (clarified: 2, inconclusive: 1, resolved by the snapshot: 0).
