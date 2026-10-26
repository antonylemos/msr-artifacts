---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
inputs:
  clone: data/samples/mfe-sample-001/repos/horoshopodumaj__micro-frontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Repository overview

History up to snapshot has two commits, without merge, on same day. First, `5501ade` (2026-09-23, "demo micro frontends"), creates three projects together, `host/`, `remote/` and `vue-remote/`, with configurations, code and generated types; this is first observable presence of entire composition, and history does not say where it was developed before. Second, `e1e0a52` (2026-09-23, "Create README.md"), is snapshot and only creates `README.md`.

Previous reviews left no unused dependency, `Undetermined` unit or relationship, deactivated construct or `Undetermined` deploy. Only point is `contradicted` claim in 3.4.7, README directory tree calling Vue application directory `vue_remote/`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README directory tree places Vue application in `vue_remote/`, and directory is `vue-remote/` | 3.4.7 #10 | conflicting stages | 5501ade 2026-09-23 demo micro frontends; e1e0a52 2026-09-23 Create README.md | clarified |

## Observations

**1. README directory tree places Vue application in `vue_remote/`, and directory is `vue-remote/`.** All Vue application files are created already in `vue-remote/` in first commit `5501ade`, and no commit up to snapshot creates, renames or removes a path `vue_remote`. README appears only afterward, in `e1e0a52`, touching nothing else. Thus observable history never had a directory `vue_remote/` that README matched: tree is not a remnant of an earlier repository stage, and README differed from directory from its creation. History does not show source of name; `vue_remote` is federated container `name` (3.4.7 #5), already shown by snapshot. Claim remains `contradicted`.

## Commands

```
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends rev-list --count e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends rev-list --count --merges e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --reverse --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --name-status --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05 -- README.md
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --name-status --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05 -- vue_remote
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05 -- vue-remote
docs/mfe-history-review/tools/hist.sh horoshopodumaj__micro-frontends log --name-status --no-renames --format='%h %ad %s' --date=short e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
```

Query for `vue_remote` returned no commit. No query failed with a missing object.

## Summary

Commits up to the snapshot: 2 (2026-09-23 to 2026-09-23). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
