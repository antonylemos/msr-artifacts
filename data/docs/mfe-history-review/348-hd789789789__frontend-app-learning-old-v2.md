---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inputs:
  clone: data/samples/mfe-sample-001/repos/hd789789789__frontend-app-learning-old-v2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Repository overview

Reachable history up to snapshot has 1,518 commits, from 2019-05-02 to 2025-11-16. First is `1a782f7` (2019-05-02, "Initial commit"), already containing README.rst: first observable presence, without demonstrating where text was written before. Last is `d987aed` (2025-11-16, "chore: update browserslist DB (#1826)"). Analysis is limited to documentary review uncertainty about environment variable convention across MFEs; it does not reconstruct adoption trajectory.

README changed in `1308d1e` (2021-08-06, "docs: explain the learning MFE specific environment variables (#578)"). Message announces Learning-specific variable documentation, but contents of version are unavailable locally. Last README change up to snapshot is `d5a092b` (2025-03-26, "Update edx.rtd.io links to docs.openedx.org (#1654)"); message announces link update without demonstrating environment convention change. Snapshot confirms local configuration but provides no environment manifest from another MFE. None of metadata resolves scope of claim about all MFEs.

Reviews 3.4.2 to 3.4.6 leave no unused or undetermined dependency, undetermined unit, inactive or undetermined composition construct, undetermined relationship or undetermined deploy. Plugin examples are identified as examples, both discussion bars have active flag selection and deploy is not observed; these are no additional historical ambiguities. Uncorroborated Tutor claims in 3.4.7 describe missing external configuration without observed stage conflict. Only partial claim is point below.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Claim of mandatory variable set common to all MFEs is supported only in Learning environment | 3.4.7 #6 (README.rst:145-147) | conflicting stages | 1308d1e 2021-08-06 docs: explain the learning MFE specific environment variables (#578); d5a092b 2025-03-26 Update edx.rtd.io links to docs.openedx.org (#1654) | inconclusive |

## Observations

**1. Variables common to MFEs.** README.rst:144-149 distinguishes per-environment configuration, general convention and additional Learning variables. Snapshot contains authentication and session variables at .env:6-8, :26-28, :40, :51, but only for this application, as recorded in 3.4.7 #6. Path history confirms README.rst modifications in `1308d1e` and `d5a092b`, rather than changed sentences. Query `ls-tree` finds README.rst at `1308d1e`, with object differing from snapshot, but `show 1308d1e:README.rst` fails with `fatal: bad object 1308d1e:README.rst`: historical contents are unavailable and no objects were fetched. Message of `1308d1e` announces specific variable explanation without proving when general claim appeared, whether from another stage or abandoned. Remains inconclusive; partial snapshot judgment does not change.

## Commands

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 rev-list --count d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 log --format='%h %ad %s' --date=short d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee -- README.rst README.md
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 log --reverse --format='%h %ad %s' --date=short d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 show 1308d1e:README.rst
# Failed: fatal: bad object 1308d1e:README.rst (historical contents missing).
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 log --format='%h %ad %s' --date=short --name-status --no-renames d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee -- README.rst
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 ls-tree d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee -- README.rst
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 ls-tree 1308d1e -- README.rst
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 1518 (2019-05-02 to 2025-11-16). Points: 1 (clarified: 0, inconclusive: 1, resolved by the snapshot: 0).
