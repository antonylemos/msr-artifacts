---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
inputs:
  clone: data/samples/mfe-sample-001/repos/DATou-love__micro-frontEnd
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Repository overview

History up to snapshot has a single commit, snapshot itself, without merges: `8e52e7d` (2025-11-03, "主应用vue3，子应用vue2" (English translation: "main app Vue 3, sub-app Vue 2"), "main app Vue 3, sub-app Vue 2"). It adds all 36 repository files at once: root `.gitignore`, host `main-vue3/` and sub-app `sub-vue2/`. Everything in snapshot has first observable presence in this commit; there is no separate artifact introduction commit or earlier version of any file, and history does not show where code was developed before first commit. No path `sub-react16` appears in history up to snapshot, even as removed file: sub-app registered in host with `//localhost:3000` (main-vue3/src/main.ts:17-22) was never in this repository.

Points come only from 3.4.7: claims 7 and 11, `contradicted`. 3.4.2 has no unused dependency (qiankun is `Yes`), 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct (all seven are `Yes`), 3.4.5 has no `Undetermined` relationship (`sub-react16` is target outside snapshot, with defined values) and 3.4.6 has `not observed` deploy, rather than `Undetermined`. Mounting uncertainty under `strictStyleIsolation`, recorded since classification, concerns execution rather than history and did not become a point. Snapshot resolves neither point.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Comment in `sub-vue2/public/index.html` calls a `<div id="subapp-viewport">` unused as sub-app target its mounting point, required to match host; it mounts at `#app` | 3.4.7 #7 | conflicting stages | 8e52e7d 2025-11-03 主应用vue3，子应用vue2 (English translation: "main app Vue 3, sub-app Vue 2") | inconclusive |
| 2 | Sub-app router comment says base is defined dynamically in `main.js`, but base is fixed at `/sub-vue2` and `main.js` only adjusts `__webpack_public_path__` | 3.4.7 #11 | conflicting stages | 8e52e7d 2025-11-03 主应用vue3，子应用vue2 (English translation: "main app Vue 3, sub-app Vue 2") | inconclusive |

## Observations

**1. Mounting point in `sub-vue2/public/index.html`.** History shows only that `sub-vue2/public/index.html`, with comment at line 15 and both `div` elements at lines 16 and 17, arrives in sole commit together with `sub-vue2/src/main.js` and `main-vue3/src/App.vue`, and none changes up to snapshot, that same commit. There is no earlier version where sub-app mounted at `#subapp-viewport`, or commit changing `render` target. History does not say whether `div` is a remnant of earlier mounting attempt, copy of host container or comment writer mistake. Inconclusive; contradiction recorded in 3.4.7 remains unchanged.

**2. Dynamic router base.** The `sub-vue2/src/router/index.js`, with comment at line 9 and fixed base at line 12, and `sub-vue2/src/main.js`, assigning only `__webpack_public_path__` (sub-vue2/src/main.js:20-23), arrive together in sole commit and have no other version up to snapshot; same applies to `sub-vue2/vue.config.js`, with commented-out `publicPath` (sub-vue2/vue.config.js:21-22). There is no `main.js` version defining router base and later stopping. History does not distinguish a stage before first commit, intention never implemented and mistakenly written comment. Inconclusive; contradiction recorded in 3.4.7 remains unchanged.

## Commands

```
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd rev-list --count 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd rev-list --count --merges 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd log --format='%h %ad %s' --date=short 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd show --name-status --format='%h %ad' --date=short 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd log --format='%h %ad' --date=short --name-status 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942 -- sub-vue2/public/index.html sub-vue2/src/router/index.js sub-vue2/src/main.js sub-vue2/vue.config.js
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd log --format='%h %ad' --date=short --full-history 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942 -- sub-react16   # empty output
```

## Summary

Commits up to the snapshot: 1 (2025-11-03 to 2025-11-03). Points: 2 (clarified: 0, inconclusive: 2, resolved by the snapshot: 0).
