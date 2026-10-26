---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inputs:
  clone: data/samples/mfe-sample-001/repos/lavesan__nx-zephyr-module-federation-example
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Repository overview

History up to snapshot has 13 commits, without merges, from 2025-06-09 to 2025-06-10. First, `5a52004` (2025-06-09, "feat: initial commit"), already creates pnpm/Nx workspace with `apps/shell`, `apps/profile`, third application `apps/settings`, package `packages/zephyr-rsbuild-plugin` and a `packages/.gitkeep`; three applications already have `module-federation.config.ts`. This is first observable presence of federation and Zephyr plugin, rather than introduction: first commit does not say where code was developed before. The `78c42b1` (2025-06-10, "feat: divides microfrontends between two
page, building an simples inactive courses application") removes all files in `apps/settings` and creates `apps/courses`, also creating `apps/shell/src/components/Header.tsx` and changing shell and profile configurations. Following commits move remote URLs to environment variables (`9b23a4f`), create application `project.json` and `vercel.json` files (`0cc1e14`), replace profile `rspack.config.ts` with `rsbuild.config.ts` (`b56fe2e`), change README (`f9593dc`) and, in snapshot `766b6a2` (2025-06-10, "feat: adds configuration to save and deploy the
aplications on zephyr"), change three `rsbuild.config.ts` files and Zephyr plugin. Only `b56fe2e` and `78c42b1` remove files.

Clone lacks contents of queried old versions: `show` of README and `apps/settings` files at `5a52004` fails with missing objects. Visible evidence consists of messages, dates, created, changed and removed paths and trees of each version.

Of previous reviews, 3.4.2 has no unused dependency (`nx` and `@nx/js` are `Yes`), 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct, 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy. In 3.4.7, `contradicted` claim #7 became point 1. The `partial` claim #8 (Zephyr) did not become a point: uncorroborated element is effect of `withZephyr`, depending on external package `zephyr-rspack-plugin`, rather than a difference potentially left from an earlier stage. History adds only that plugin is in `packages/` since `5a52004` and only other commit touching `packages/` is snapshot itself, `766b6a2`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README lists "Shared component library", and snapshot has no component library | 3.4.7 #7 | conflicting stages | 5a52004 2025-06-09 feat: initial commit; 78c42b1 2025-06-10 feat: divides microfrontends between two page, building an simples inactive courses application; f9593dc 2025-06-10 feat: updates README with project info.; 766b6a2 2025-06-10 feat: adds configuration to save and deploy the aplications on zephyr | clarified |

## Observations

**1. "Shared component library" without a library in snapshot.** Limited to created and removed paths: none of 13 commits creates a shared component package or directory. In `packages/`, since `5a52004`, there was only `.gitkeep` and Zephyr plugin, and only `5a52004` and `766b6a2` touch directory; tree at `f9593dc` in `packages/` is identical. Only removed code collection is `apps/settings`, arranged like other applications (`rsbuild.config.ts`, `module-federation.config.ts`, `src/index.tsx`, `src/bootstrap.tsx`), deleted in `78c42b1`, whose message announces division into two pages and creation of courses. Snapshot README is version at `f9593dc`, last commit changing it, after that removal; this repository version also lacked a library. History does not show whether line was already in README at `5a52004` or what `apps/settings` exposed, because those objects are unavailable. Conclusion: no observable repository stage had a component library claim could describe; claim remains `contradicted`.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example rev-list --count 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --merges --format=%h 766b6a2c04c1ef39201ad05ed1b5970d4cb10436   # empty output: no merge
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --format='%h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --name-status --no-renames --format='@@ %h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --name-status --no-renames --diff-filter=D --format='@@ %h' 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --format='%h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436 -- README.md
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example ls-tree 5a52004 -- README.md packages/ apps/settings/module-federation.config.ts apps/settings/src/App.tsx
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example show 5a52004:README.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example show 5a52004:apps/settings/module-federation.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example show 5a52004:apps/settings/src/App.tsx   # failed: missing object
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example ls-tree -r --name-only f9593dc -- packages
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example ls-tree 766b6a2c04c1ef39201ad05ed1b5970d4cb10436 -- README.md
docs/mfe-history-review/tools/hist.sh lavesan__nx-zephyr-module-federation-example log --format='%h %ad %s' --date=short 766b6a2c04c1ef39201ad05ed1b5970d4cb10436 -- packages
```

## Summary

Commits up to the snapshot: 13 (2025-06-09 to 2025-06-10). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
