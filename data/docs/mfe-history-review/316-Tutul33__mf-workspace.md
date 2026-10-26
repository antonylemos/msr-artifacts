---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
inputs:
  clone: data/samples/mfe-sample-001/repos/Tutul33__mf-workspace
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Repository overview

History up to snapshot has 5 commits, all on 2025-11-18. First, `1137709` ("initial commit"), records workspace files without projects. Second, `f038259` ("Commit"), adds three projects, their federation configurations, entries and routes, and modifies manifests and angular.json. Queried versions from second commit already contain direct-URL routing to both remotes, mismatched host initialization map and commented-out exposure alternatives. This introduces files in available history; it does not reveal where they were developed before.

Next three commits only add or change documentation: `1a56f1c` ("Commit app") creates angular_20_microfrontend_app_guide.md; `53ab035` and `eb6d1cc` (both "Commit") change README.md. No later application code change stage occurs in interval. All requested historical contents were available locally. History explains artifact persistence without changing snapshot review judgments or demonstrating execution or abandonment intention.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Dependency `@softarc/native-federation-node` declared without observed direct usage | 3.4.2 (package.json:30) | dependency use | f038259 2025-11-18 Commit | clarified |
| 2 | Host `customerApp` map differs from URLs used by routes | 3.4.4 (projects/host-app/src/main.ts:3); 3.4.5 (Repository overview); 3.4.7 (Repository overview) | conflicting stages | f038259 2025-11-18 Commit | clarified |
| 3 | Alternative exposures of `./Component` are commented out in both remotes | 3.4.5 (Repository overview: projects/customer-app/federation.config.js:8 and projects/orders-app/federation.config.js:8); 3.4.7 (Repository overview) | active or abandoned | f038259 2025-11-18 Commit | clarified |
| 4 | Documented tree includes directories without files in snapshot inventory | 3.4.7 #5 (README.md:213-251) | conflicting stages | f038259 2025-11-18 Commit; eb6d1cc 2025-11-18 Commit | clarified |

## Observations

**1. Dependency declared without direct usage.** package.json at `f038259` already declares `@softarc/native-federation-node`, matching snapshot. Projects are added in this commit and none of their files changes afterward; package.json also does not change in remaining three commits. Queried host main, routes and federation.config.js files at this version use `@angular-architects/native-federation`. Thus examined projects and manifests have no earlier direct-usage version later removed: declaration already accompanies first project version, without observed direct connection. History neither explains declaration reason nor demonstrates abandonment. The `No` in 3.4.2 remains.

**2. Mismatched host map.** In `f038259`, projects/host-app/src/main.ts already registers `customerApp` at `http://localhost:4200/remoteEntry.json`, while projects/host-app/src/app/app.routes.ts already loads remotes through direct URLs at ports 4301 and 4302. Both are created together and do not change afterward. Thus in these files map and routing are not traces of successive versions: they coexist since repository introduction. Whether map was copied or planned for another arrangement cannot be concluded; no transition from previously used map to abandoned map is observable.

**3. Commented-out component exposures.** Both federation.config.js files are created in `f038259` already with `./Component` commented out and `./CustomerRoutes` or `./OrdersRoutes` active. Neither changes afterward. Only recorded version of these files already has this form, without active component exposure later deactivated. This clarifies available sequence, but not intention behind retaining commented-out alternatives or earlier code origins.

**4. Documented tree directories.** Snapshot itself explains part of difference: .gitignore:4,10,32 excludes dist, node_modules and .angular cache; angular.json:68,181,294 configures public paths as assets. For public, history adds evidence: `f038259` creates a favicon.ico in each of three directories, and ls-tree at snapshot commit still lists all three files. These paths exist in commit Git tree, although files are absent from acquired inventory used by previous reviews. No later removal of these assets occurs in history up to snapshot. Documentation difference demonstrates neither abandoned asset configuration nor removed earlier stage. This explains source boundary without modifying `partial` corroboration in 3.4.7, based on acquired snapshot.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace log --reverse --name-status --no-renames --format='%h %ad %s' --date=short eb6d1cc782f44fa05b6a6d83c23edf20487af9db
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace rev-list --count eb6d1cc782f44fa05b6a6d83c23edf20487af9db
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:package.json
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/host-app/src/main.ts
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/customer-app/federation.config.js
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/orders-app/federation.config.js
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/host-app/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace ls-tree -r --name-only eb6d1cc782f44fa05b6a6d83c23edf20487af9db -- projects/customer-app/public projects/host-app/public projects/orders-app/public
```

First log command attempt was blocked when writing commands.log, before querying clone; authorized repetition completed. No missing object failure occurred. Comparison below was performed before and after queries, identical in both:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 5 (2025-11-18 to 2025-11-18). Points: 4 (clarified: 4, inconclusive: 0, resolved by the snapshot: 0).
