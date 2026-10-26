---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
inputs:
  clone: data/samples/mfe-sample-001/repos/andreea-lipan__cozy-desk-micro-frontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Repository overview

History up to snapshot has 3 commits, all on 2026-01-14, without merges. First, `6e2d0ab` (2026-01-14, "first commit"), creates all 96 repository files at once: `README.md`, images in `readme-images/` and three Angular projects (`test-base`, `tea-tracker`, `sticky-notes`), each with `package.json`, lockfile, `angular.json`, `federation.config.js` and `src/` sources, plus host federation manifest (`test-base/public/federation.manifest.json`). Host, remotes and Native Federation configuration therefore have first observable presence in this commit; history shows neither introduction nor where code was developed before. Next two commits, `0a2cc14` and `7050669` (2026-01-14, both "update readme"), change only `README.md`. Object identifiers show other 95 snapshot files match first commit.

Clone reveals messages, dates, touched files per commit and object identifiers of each version. Reading old version contents was unnecessary.

Of previous reviews, only dependency review left an ambiguous point: `@softarc/native-federation-node` declared and unused in three packages. No unit, relationship or deploy is `Undetermined` (deploy of three applications is `not observed`), and no construct is inactive or commented out. Documentation review has no `contradicted` or `partial` claim; differences between README walkthrough and code (name `digital-desktop`, `app.component.ts`, manifest in `src/assets/`) remained outside claims table and did not become points.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` declared and unused in three packages | 3.4.2 (sticky-notes/package.json:34); 3.4.2 (tea-tracker/package.json:34); 3.4.2 (test-base/package.json:34) | dependency use | 6e2d0ab 2026-01-14 first commit; 0a2cc14 2026-01-14 update readme; 7050669 2026-01-14 update readme | clarified |

## Observations

**1. `@softarc/native-federation-node` declared and unused in three packages.** Three `package.json` files appear only in first commit `6e2d0ab`, and have same object identifiers in snapshot as in that commit. Same applies to all other code and build files: next two commits change only `README.md`. Observable history has no code version differing from snapshot, and in that version dependency is only declared (3.4.2). Thus, since first observable presence, no repository file used it. History does not say why it is declared or whether it was used before first commit, outside this repository. Dependency remains `No` in snapshot.

## Commands

```
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends rev-list --count 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends rev-list --count --merges 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends log --format='%h %ad %s' --date=short 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends log --format='%h %ad %s' --date=short --name-status --no-renames 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends log --format='%h %ad %s' --date=short 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc -- test-base/package.json tea-tracker/package.json sticky-notes/package.json
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree -r 6e2d0ab
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree -r 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc -- test-base/package.json tea-tracker/package.json sticky-notes/package.json
docs/mfe-history-review/tools/hist.sh andreea-lipan__cozy-desk-micro-frontends ls-tree 6e2d0ab -- test-base/package.json tea-tracker/package.json sticky-notes/package.json
```

## Summary

Commits up to the snapshot: 3 (2026-01-14 to 2026-01-14). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
