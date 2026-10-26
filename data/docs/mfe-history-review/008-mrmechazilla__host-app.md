---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
inputs:
  clone: data/samples/mfe-sample-001/repos/mrmechazilla__host-app
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 008 — mrmechazilla/host-app

## Repository overview

History up to snapshot has 5 commits, from 2025-08-23 to 2026-01-21, without merges. First is `486bd68` ("Initial commit"). Second, `2227f83` (2025-08-24, "feat: add and configure module federation"), creates `webpack.config.js`, `webpack.prod.config.js` and `public/mf.manifest.json`: composition configuration is introduced there. Following commits change routes and manifest (`292d70d`, `4885b01`). Last, `38ab4eb` (2026-01-21), whose message announces internationalization, also creates `remote-config.ts` and `remote-loader.ts` and changes routes and manifest again.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `src/app/shared/utils/remote-loader.ts` is entirely commented out | 3.4.4 (src/app/shared/utils/remote-loader.ts:1, 14) | active or abandoned | 38ab4eb 2026-01-21 feat: add and configure i18n with @jsverse/transloco | clarified |

## Observations

**1. `src/app/shared/utils/remote-loader.ts` is entirely commented out.** File is created in `38ab4eb`, snapshot commit, and exists in no earlier version. Its only history version is snapshot’s, entirely commented out. No active version was later disabled. History does not say why an already-commented loader was added.

## Commands

```
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app rev-list --count 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app rev-list --count --merges 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --reverse --format='%h %ad %s' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app show --name-status --no-renames --format='== %h' 2227f83
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --format='%h %ad' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8 -- src/app/shared/utils/remote-loader.ts
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --format='%h %ad' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8 -- public/mf.manifest.json
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app log --format='%h %ad' --date=short 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8 -- src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh mrmechazilla__host-app show --name-status --no-renames --format='== %h %ad %s' --date=short 38ab4eb
```

## Summary

Commits up to the snapshot: 5 (2025-08-23 to 2026-01-21). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
