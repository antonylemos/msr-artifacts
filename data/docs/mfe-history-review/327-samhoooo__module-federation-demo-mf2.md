---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
inputs:
  clone: data/samples/mfe-sample-001/repos/samhoooo__module-federation-demo-mf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Repository overview

History up to snapshot has 3 commits, from 2026-08-10 to 2026-08-11, without merges:

- `eeac072` (2026-08-10, "Add Module Federation 2 demo: header-app remote + home-app host"), first, creates entire repository at once: both applications (`header-app/` and `home-app/`, with `package.json`, `package-lock.json`, `rspack.config.js`, `tsconfig.json`, `public/index.html` and sources), generated declarations in `home-app/@mf-types/`, root `package-lock.json` and `.gitignore` and `README.md`;
- `0a010ce` (2026-08-10, "Update README.md") and `0a621b6` (2026-08-11, "Update README.md"), snapshot commit, change only `README.md`.

No commit removes a file. Everything cited by previous reviews except README has first observable presence in `eeac072` and does not change afterward. Since first commit already includes entire project, history does not show how or where code was developed before.

Of previous reviews, only 3.4.7 left a point. 3.4.2 has no unused dependency (both declarations of `@module-federation/enhanced` are `Yes`), 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct (row for `home-app/@mf-types/HeaderApp/apis.d.ts:3` is generated type declaration, `none`), 3.4.5 has no `Undetermined` relationship and deploy in 3.4.6 is `not observed` in both applications, rather than `Undetermined`. In 3.4.7, claim 10 (`partial`) becomes a point because part without artifact (separate deploy) may be intention or remnant of stage with configured deploy. Snapshot does not resolve point: `.gitignore` excludes `node_modules`, `dist`, `.rspack`, `*.log`, `.claude` and `ARTICLE.md` (.gitignore:1-6), none a deploy configuration file.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Host comment mentions separate build and deploy of header-app, and snapshot has no deploy artifact | 3.4.7 #10 | active or abandoned | eeac072 2026-08-10 Add Module Federation 2 demo: header-app remote + home-app host | clarified |

## Observations

**1. Separate build and deploy without deploy artifact.** The `home-app/src/App.tsx`, containing comment (home-app/src/App.tsx:8-10), and both application `package.json` and `rspack.config.js` files are created in `eeac072` and do not change afterward. None of three commits creates or removes Dockerfile, workflow, hosting configuration or other deploy file, and no commit removes a file. History therefore records no stage with configured deploy later abandoned: comment and development-only configuration (`rspack serve` at `localhost`) coexist since first observable presence. History does not show whether applications were published outside repository or comment describes a plan.

## Commands

```
docs/mfe-history-review/tools/hist.sh samhoooo__module-federation-demo-mf2 rev-list --count 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
docs/mfe-history-review/tools/hist.sh samhoooo__module-federation-demo-mf2 rev-list --count --merges 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
docs/mfe-history-review/tools/hist.sh samhoooo__module-federation-demo-mf2 log --format='%h %ad %s' --date=short --name-status --no-renames 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
```

## Summary

Commits up to the snapshot: 3 (2026-08-10 to 2026-08-11). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
