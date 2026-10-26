---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
inputs:
  clone: data/samples/mfe-sample-001/repos/RafaM-dev__hostRepo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Repository overview

7 commits up to snapshot, all on 2025-11-19. The `8a62219` (2025-11-19, "first commit") already includes Vite application with Module Federation: `vite.config.ts`, `src/declare.d.ts`, `package.json`, `index.html`, `src/App.tsx`, `src/main.tsx` and `README.md`, among others. This is first observable presence of host configuration, rather than introduction: first commit does not say where code was developed before. The `500d5dd` (2025-11-19, "feat: Implement character list and filtering
functionality") creates `src/features/episodes_list/ListEpisodes.tsx`, list components, store, home and empty file `remote-root@0.0.0`, and changes `src/App.tsx`, `src/main.tsx` and `package.json`. Next four commits (`cf861ef`, `c775ef4`, `7a88edd`, `3f9d0c8`) concern Tailwind, layout, character count and CSS. Snapshot commit `e68ba94` (2025-11-19, "docs: Update README.md to reflect project details, installation instructions, and architecture
overview") changes only `README.md`. No commit up to snapshot removes a file.

The `vite.config.ts` does not change after `8a62219`: object is identical in this commit and snapshot (`06a796a`). The `README.md` changes only once, in snapshot commit: object at `8a62219` (`d2e7761`) differs from snapshot (`82587b0`).

Clone reveals messages, dates, files created or changed per commit and object identifiers. Old version contents of changed files are absent from clone: `show 8a62219:README.md` failed with missing object, and `cat-file -e` confirms object `d2e7761` is unavailable. Only old versions whose object matches snapshot can be read, such as `vite.config.ts`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README says host consumes remote `remote_root` at port 5174, but `vite.config.ts` declares `mf-remoteDetails` at port 5001 | 3.4.7 #7 (README.md:334-342, 346-347) | conflicting stages | 8a62219 2025-11-19 first commit; e68ba94 2025-11-19 docs: Update README.md to reflect project details, installation instructions, and architecture overview | clarified |

## Observations

**1. `remote_root` at port 5174 in README.** The `vite.config.ts` has same object (`06a796a`) from `8a62219` to snapshot, and only this commit touches it. Thus in all observable repository history, host configuration matches snapshot, with remote `mf-remoteDetails` at `http://localhost:5001/assets/remoteEntry.js`. No `vite.config.ts` version here declared `remote_root` or port 5174. README is rewritten in snapshot commit `e68ba94`, whose message announces updates to details, installation and architecture. This commit follows all configuration and composition code (`ListEpisodes.tsx`, from `500d5dd`). History clarifies, limited to these artifacts, README block and prose are not remnants of an earlier configuration stage in this repository: discrepancy was recorded or retained in last README version, when `vite.config.ts` already declared `mf-remoteDetails`. History does not show whether text already existed in first-commit README, because object `d2e7761` is absent from clone. It also does not show source of name `remote_root`, whether another repository or configuration outside this one. Empty file `remote-root@0.0.0`, whose name documentation review compared with `remote_root`, arrives in `500d5dd` and does not change up to snapshot; history does not explain its origin.

## Commands

```
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo rev-list --count e68ba940850001cc7231849cb8a44097f0e12853
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo log --format='%h %ad %s' --date=short --name-status e68ba940850001cc7231849cb8a44097f0e12853
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo log --format='%h %ad %s' --date=short e68ba940850001cc7231849cb8a44097f0e12853 -- vite.config.ts
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo log --format='%h %ad %s' --date=short e68ba940850001cc7231849cb8a44097f0e12853 -- README.md
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo ls-tree 8a62219 -- vite.config.ts README.md
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo ls-tree e68ba940850001cc7231849cb8a44097f0e12853 -- vite.config.ts README.md
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo show 8a62219:README.md
  # failed: fatal: bad object 8a62219:README.md (missing object in clone --filter=blob:none)
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo cat-file -e d2e77611fd3d959fee0487c41bd27b318be32b04
  # failed: exit 1, missing object in clone
docs/mfe-history-review/tools/hist.sh RafaM-dev__hostRepo cat-file -t 82587b074c29067df68bb686affb319cb07bac66
```

## Summary

Commits up to the snapshot: 7 (2025-11-19 to 2025-11-19). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
