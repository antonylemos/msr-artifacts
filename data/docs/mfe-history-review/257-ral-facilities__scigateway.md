---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
inputs:
  clone: data/samples/mfe-sample-001/repos/ral-facilities__scigateway
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Repository overview

Reachable history up to snapshot has 2,957 commits, from 2019-03-12 to 2026-10-07. It begins at `fcc61a6` (2019-03-12, “Initial commit”) and ends at snapshot `fadb600` (2026-10-07, “Merge pull request #1673 from ral-facilities/dependabot/npm_and_yarn/brace-expansion-1.1.21”). Steps 3.4.2 to 3.4.6 left no undetermined dependencies, units, constructs, relationships or deploys. Three points come from partial or contradicted claims in 3.4.7; two loader store references form one uncertainty.

Log records creation of `src/state/actions/loadMicroFrontends.tsx` in `336bf97` (2019-03-26, “Started adding the ability to load plugins in the parent app, added a tool to host plugins”). This establishes file introduction, but not comment origins or earlier store passing. Message of `3f0c185` (2024-11-11, “Generate custom admin tabs from plugin routes #1418”) announces admin tabs generated from plugin routes; message of `47bc22e` (2022-03-11, “Fix plugin loading bug by moving where singleSpa.start is called - also add in triggerAppChange call in middleware for if a plugin loads its settings really late”) announces late-loading correction. Attempts to read old contents for these milestones failed with `fatal: bad object`, without fetching objects. Metadata cannot confirm earlier design with stores, comment origins or internal behavior of external plugins. Snapshot already delineates current behavior, but does not resolve these historical questions; all three points remain inconclusive.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Comment delegates admin subroutes to plugins, whose code is outside snapshot. | 3.4.7 #12 (src/routing/routing.component.tsx:78-81) | conflicting stages | 3f0c185, 2024-11-11, Generate custom admin tabs from plugin routes #1418; 4dcb3a2, 2026-03-12, Fix admin plugin route routing | inconclusive |
| 2 | Loader mentions passing store and globalEventDistributor and waiting for stores, but current code only loads scripts and registers plugins. | 3.4.7 #17 and #18 (src/state/actions/loadMicroFrontends.tsx:30, 83) | conflicting stages | 336bf97, 2019-03-26, Started adding the ability to load plugins in the parent app, added a tool to host plugins; d3eec25, 2019-04-05, Updated how the plugins load as well as the theming | inconclusive |
| 3 | Comment attributes route delay to plugin settings reading, without this behavior in snapshot demonstration bundle. | 3.4.7 #23 (src/state/middleware/scigateway.middleware.tsx:148) | conflicting stages | 47bc22e, 2022-03-11, Fix plugin loading bug by moving where singleSpa.start is called - also add in triggerAppChange call in middleware for if a plugin loads its settings really late | inconclusive |

## Observations

**1. Admin subroutes.** Snapshot shows host retaining second link segment and creating containers per plugin and tab (src/routing/routing.component.tsx:83-88; src/adminPage/adminPage.component.tsx:25-50, 130-149), without plugin code handling subpaths. Log records router changes in `3f0c185` and `4dcb3a2`; messages announce tab generation and admin routing correction, respectively. Attempt to read router at `3f0c185` failed with `fatal: bad object`. Without contents and external code, whether comment describes earlier stage, a contract actually met by plugins or only their expected responsibility is unknown. Partial snapshot claim remains without conclusive historical explanation.

**2. Stores and globalEventDistributor.** In snapshot, `registerApplication` receives only name, loading function and activity function; `Promise.all` waits for `loadApp` promises, rather than explicit store loading (src/state/actions/loadMicroFrontends.tsx:27-49, 56-60, 83-84). This confirms textual discrepancy already recorded in 3.4.7, but does not say whether removal, copying or intention never connected occurred. Log marks file added in `336bf97` and changed in `d3eec25`; second message announces loading and theme update. Both attempts to read these contents failed with `fatal: bad object`. Whether comment already existed at creation, or a store or distributor was ever passed, cannot be asserted. Both claims are grouped in an inconclusive point, without inferring abandonment.

**3. Plugin settings and late routes.** In snapshot, middleware calls `triggerAppChange` if received route matches current URL and plugin is `NOT_LOADED` (src/state/middleware/scigateway.middleware.tsx:149-157); demonstration bundle sends routes without reading settings (server/e2e-plugin/main.js:20). Message of `47bc22e` announces addition of `triggerAppChange` for a plugin loading settings late, and log records changes to middleware and loader. Reading middleware at this commit failed with `fatal: bad object`. Message documents announced motivation for change, but does not prove external plugins read configurations, or snapshot demonstration bundle replaced a version doing so. Queried history does not resolve this part of claim.

## Commands

Comparisons before and after queries, both without differences:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Queries limited to snapshot or commits returned by its log:

```sh
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway rev-list --count fadb600e1fa4c8a64daefbf8f2541998e559979c
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --reverse fadb600e1fa4c8a64daefbf8f2541998e559979c | sed -n '1p;$p'
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --name-status --no-renames fadb600e1fa4c8a64daefbf8f2541998e559979c -- src/state/actions/loadMicroFrontends.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --name-status --no-renames fadb600e1fa4c8a64daefbf8f2541998e559979c -- src/routing/routing.component.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --name-status --no-renames fadb600e1fa4c8a64daefbf8f2541998e559979c -- src/state/middleware/scigateway.middleware.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show 336bf97:src/state/actions/loadMicroFrontends.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show d3eec25:src/state/actions/loadMicroFrontends.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show 3f0c185:src/routing/routing.component.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show 47bc22e:src/state/middleware/scigateway.middleware.tsx
```

All four `show` commands failed with `fatal: bad object <revisão:caminho>` (historical contents unavailable locally). First `rev-list --count` attempt was blocked before query by lack of permission to write `tools/commands.log`; authorized repetition returned count above. No query used another means of clone access.

## Summary

Commits up to the snapshot: 2957 (2019-03-12 to 2026-10-07). Points: 3 (clarified: 0, inconclusive: 3, resolved by the snapshot: 0).
