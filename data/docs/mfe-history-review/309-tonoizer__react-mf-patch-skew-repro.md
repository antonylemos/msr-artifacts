---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
inputs:
  clone: data/samples/mfe-sample-001/repos/tonoizer__react-mf-patch-skew-repro
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Repository overview

History up to snapshot has a single commit, `92739d5` (2026-09-11, "Add React patch-skew repro for @module-federation/vite 1.21.6"). README, manifests, configurations and sources of four applications already appear there, plus capture procedure and versioned evidence. This is first observable presence of collection; history does not reveal where it was developed before.

Steps 3.4.2 to 3.4.6 leave no Undetermined dependency, unit, construct, relationship or deploy, nor inactive or commented-out construct to investigate. Both points come from documentation: generalization about different patches and sharing list including two entries without observed usage. Snapshot delineates current state; sole commit clarifies involved artifacts coexist since first observable version, without recorded earlier stage explaining differences. This demonstrates neither intention, earlier usage nor abandonment and does not change previous review judgments.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README claims different patches per app, but host and remote_c pin same patch | 3.4.7 #2 (README.md:3,65; host/package.json:11-12; remote_c/package.json:11-12) | conflicting stages | 92739d5 2026-09-11 Add React patch-skew repro for @module-federation/vite 1.21.6 | clarified |
| 2 | Sharing list includes react/jsx-dev-runtime and react/compiler-runtime without observed usage | 3.4.7 #7 (README.md:16-22; host/vite.config.js:8-9; remote_a/vite.config.js:8-9; remote_b/vite.config.js:8-9; remote_c/vite.config.js:8-9) | dependency use | 92739d5 2026-09-11 Add React patch-skew repro for @module-federation/vite 1.21.6 | clarified |

## Observations

**1. Different patches per app.** Snapshot already shows caveat: host and remote_c pin React and React DOM 19.2.8 (host/package.json:11-12; remote_c/package.json:11-12), including README own table (README.md:11,14). Historical question is whether generalizing text could be remnant of earlier configuration. Complete log up to snapshot records only README and manifest additions in sole commit. Thus sentence and both manifests coexist since first observable version; queried history has no transition from different to identical patches. This is clarification limit: it explains neither wording origin nor excludes earlier work outside history. Contradicted claim in 3.4.7 remains.

**2. Shared entries without observed usage.** Snapshot declares react/jsx-dev-runtime and react/compiler-runtime in shared object (lines 8-9 of four vite.config.js files), but 3.4.7 finds no imports demonstrating usage; scope records demonstrate only availability. Complete log shows README, configurations, sources and evidence all added in sole commit, without recorded earlier version. History clarifies, limited to these artifacts, no observable consumer removal or earlier phase with demonstrated usage exists: list and current source state already coexist at first observable presence. This does not support attributing abandonment, copying or intention to both entries. Knowing when they appear does not prove usage; partial claim in 3.4.7 remains.

## Commands

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh tonoizer__react-mf-patch-skew-repro log --reverse --format='%h %ad %s' --date=short --name-status 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
docs/mfe-history-review/tools/hist.sh tonoizer__react-mf-patch-skew-repro rev-list --count 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Initial log and rev-list attempts through hist.sh were blocked when opening tools/commands.log for writing, before executing Git; same queries were repeated with permission for mandatory record. No query involved a missing object. Comparisons before and after queries matched reference.

## Summary

Commits up to the snapshot: 1 (2026-09-11 to 2026-09-11). Points: 2 (clarified: 2, inconclusive: 0, resolved by the snapshot: 0).
