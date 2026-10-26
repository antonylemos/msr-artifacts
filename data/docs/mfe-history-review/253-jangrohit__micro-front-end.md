---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
inputs:
  clone: data/samples/mfe-sample-001/repos/jangrohit__micro-front-end
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 253 — jangrohit/micro-front-end

## Repository overview

History up to snapshot has 15 commits, from 2026-03-09 to 2026-09-27. First, `f107f7b` (2026-03-09, “initial commit”), adds four package directories together, including container and marketing composition files. This is first observable presence of these artifacts, without evidence of where they were developed before. Reviews 3.4.2 to 3.4.6 leave no dependency, unit, construct, relationship or deploy with undetermined result requiring historical investigation.

Both points come from contradicted claims in documentation review. History clarifies workflow and README order: container workflow is added in `5d05e98` (2026-09-27, “created git action for container”); marketing workflow in `e002f80` (2026-09-27, “update config”). Both workflows could be read at version `e002f80`, already with build, S3 publication and CloudFront invalidation. README is added only afterward, in snapshot `c6c0dbc` (2026-09-27, “Create README.md”). Thus sentence denying pipeline does not document a stage before these files existed. Other contradiction, about nested routers, is resolved by snapshot itself without specific historical query.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README denies publication pipeline existence, but there are two deploy workflows. | 3.4.6 (Repository overview, contradiction em README.md:104); 3.4.7 #22 | conflicting stages | 5d05e98, 2026-09-27, created git action for container; e002f80, 2026-09-27, update config; c6c0dbc, 2026-09-27, Create README.md | clarified |
| 2 | README interprets host and remote BrowserRouter as nested in same component tree. | 3.4.7 #23 | conflicting stages | — | resolved by the snapshot |

## Observations

**1. Pipeline denied by README.** Log with filenames and statuses records addition of `.github/workflows/container.yml` in `5d05e98` and `.github/workflows/marketing.yml` in `e002f80`, both on 2026-09-27. Reading both files at `e002f80` confirms `npm run build`, `aws s3 sync` to container and marketing own prefixes and CloudFront invalidation. No later commit up to snapshot changes these workflows; `c6c0dbc` only adds `README.md`, whose text at README.md:104 denies pipeline existence. Thus publication artifacts already existed when claim appeared, and queried history has no earlier README version corresponding to stage without workflows. This clarifies contradiction chronology, but not reason for writing, possible external origin or whether jobs ever ran. It neither demonstrates workflow abandonment nor changes deploy recorded in 3.4.6.

**2. Routers interpreted as nested.** Snapshot itself distinguishes DOM tree from React tree: packages/container/src/App.js:17-20 places wrapper inside host BrowserRouter, but packages/marketing/src/bootstrap.js:5-7 mounts `<App />` through its own `ReactDOM.render` call on received element. BrowserRouter at packages/marketing/src/App.js:14-19 belongs to this separate root. This resolves interpretation of README.md:108 without postulating different code stages. Possible effect of both routers on browser history was neither executed nor verified; conclusion is limited to component tree separation already recorded in 3.4.7.

## Commands

Integrity comparisons performed before and after queries, both without differences:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Queries limited to snapshot or its ancestor `e002f80`:

```sh
docs/mfe-history-review/tools/hist.sh jangrohit__micro-front-end log --reverse --format='%h %cs %s' --name-status c6c0dbc9fb78b8baab20e74394647ca40b521355
docs/mfe-history-review/tools/hist.sh jangrohit__micro-front-end rev-list --count c6c0dbc9fb78b8baab20e74394647ca40b521355
docs/mfe-history-review/tools/hist.sh jangrohit__micro-front-end show e002f80:.github/workflows/container.yml e002f80:.github/workflows/marketing.yml
```

## Summary

Commits up to the snapshot: 15 (2026-03-09 to 2026-09-27). Points: 2 (clarified: 1, inconclusive: 0, resolved by the snapshot: 1).
