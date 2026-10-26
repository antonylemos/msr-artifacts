---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
inputs:
  clone: data/samples/mfe-sample-001/repos/charger17__mfe
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 197 — charger17/mfe

## Repository overview

History up to snapshot has 44 commits, from 2025-06-05 to 2025-06-16, without merges. Most have default upload or web interface editing messages ("Add files via upload", "Update …", "Create …", "Delete …"). Milestones are:

- `c353631` (2025-06-05, "Create readme.txt") creates `readme.txt`;
- `ed8bc04` (2025-06-05, "Add files via upload") creates `.gitignore`;
- `90a9779` (2025-06-06, "Add files via upload") creates complete container and marketing together, with webpack configurations, sources and wrapper `MarketingApp.js`, plus only `package.json` (and `package-lock.json`) of auth and dashboard;
- between 2025-06-06 and 2025-06-09, a commit series creates and adjusts container workflows (`900f654`, "Create container", then `c10b605`, "Rename container to container.yml", and several "Update container.yml") and marketing workflows (`25b361c`, "Create marketing.yml");
- `5fc915e` (2025-06-16, "Add files via upload") creates auth sources and configurations and container wrapper `AuthApp.js`, and changes container configuration and `App.js`;
- `c04d19e` (2025-06-16, "Add files via upload"), snapshot commit, creates dashboard sources and configurations and wrapper `DashboardApp.js`, and changes container configuration and `App.js` again.

The `package-lock.json` files of container, marketing, auth and dashboard are removed in separate commits (`2346ff7`, `7efba35`, `26a63ec`, `0d605c5`), consistent with `.gitignore` cited in build and deploy review. Commit `d22735d` (2025-06-16, "Add files via upload") lists no changed file. Since files arrive through upload, history shows order in which each unit was submitted, but not where or how code was developed before. Each unit has first observable presence in upload commit where it appears.

Previous reviews left no ambiguous point history could clarify:

- dependency review has no row;
- all four units are `Yes`;
- composition constructs are all active, none commented out or `Undetermined`;
- all three relationships are active;
- deploy of four applications is `separate`;
- documentation review has no claims.

Commented-out template block at `packages/dashboard/src/components/Dashboard.vue:138` was excluded by documentation review because it concerns one unit appearance. Thus history was not consulted beyond this context.

## Points

No ambiguous points in previous reviews.

## Commands

```
docs/mfe-history-review/tools/hist.sh charger17__mfe rev-list --count c04d19eb237bd77ce574657d732efe265c0de531
docs/mfe-history-review/tools/hist.sh charger17__mfe rev-list --count --merges c04d19eb237bd77ce574657d732efe265c0de531
docs/mfe-history-review/tools/hist.sh charger17__mfe log --format='%h %ad %s' --date=short --name-status --no-renames c04d19eb237bd77ce574657d732efe265c0de531
```

## Summary

Commits up to the snapshot: 44 (2025-06-05 to 2025-06-16). Points: 0.
