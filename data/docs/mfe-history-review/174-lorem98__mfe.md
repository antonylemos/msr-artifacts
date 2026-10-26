---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
inputs:
  clone: data/samples/mfe-sample-001/repos/lorem98__mfe
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 174 — lorem98/mfe

## Repository overview

History up to snapshot has 17 commits, without merges, from 2026-02-05 (`ba3fc6f`, "Initial commit") to 2026-05-21 (`44eb295`, "Revert previous temp commit", snapshot commit). There are three phases. In February and March, container and marketing: first commit already includes both packages with webpack configurations (and only `package.json` and `package-lock.json` of `auth` and `dashboard`); container and marketing workflows arrive in `13cc9fe` (2026-02-06, "Created container deploy script") and `6819b9e` (2026-02-13, "Added marketing MFE workflow"), and navigation between container and marketing in `2be6f54` (2026-03-24, "Navigation between orchestrator and MF and viceversa"). On 2026-05-11, `6af9f6d` ("Created auth MFE") creates auth code and configurations, and `91feee5` ("Created Dashboard MFE + added readme") creates dashboard, container wrappers `AuthApp` and `DashboardApp` and `README.md`. On 2026-05-21, `60008a4` ("Created deploy workflows for auth and dashboard") creates two missing workflows; `d1cf5a5` ("Temp commit to test the new deploy workflows") changes `packages/auth/src/components/Signup.js` and `packages/dashboard/src/App.vue`, and `44eb295` reverts both changes.

All points come from documentation review (3.4.7). What decides almost all is comparison of object identifiers (`ls-tree`) in `91feee5`, `60008a4`, `d1cf5a5` and snapshot: `README.md`, all dashboard `src` and `config`, auth `public` and `config`, auth and marketing `bootstrap.js`, container `webpack.dev.js` and `src` have same objects in snapshot as in `91feee5` (auth `public` and `config` match `6af9f6d`). Only one of these files changed afterward: `App.vue`, which changes object in `d1cf5a5` and in `44eb295` returns to `91feee5` object. Thus README and described code are from same stage and did not change up to snapshot. This is both first observable presence and introduction for README and dashboard, created in these commits; history does not say where README text came from.

Not raised as points: reviews 3.4.2, 3.4.3, 3.4.5 and 3.4.6 left nothing `Undetermined` or any unused dependency; both `none` rows in source review (packages/auth/config/webpack.dev.js:19; packages/dashboard/config/webpack.dev.js:20) are explanatory comments matching code, rather than commented-out constructs. Old version contents were not read: object identifiers and messages resolve points.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README attributes history synchronization and isolated `mount` with browser history to "each remote", and dashboard does not follow this pattern. | 3.4.7 #10, #24 | conflicting stages | 2be6f54 2026-03-24 Navigation between orchestrator and MF and viceversa; 6af9f6d 2026-05-11 Created auth MFE; 91feee5 2026-05-11 Created Dashboard MFE + added readme | clarified |
| 2 | README justifies Vue `singleton` for "all Vue-based remotes", and there is only one Vue remote. | 3.4.7 #22 | conflicting stages | — | resolved by the snapshot |
| 3 | README says every dashboard SFC uses `<style scoped>`, and `App.vue` does not. | 3.4.7 #27 | conflicting stages | 91feee5 2026-05-11 Created Dashboard MFE + added readme; d1cf5a5 2026-05-21 Temp commit to test the new deploy workflows; 44eb295 2026-05-21 Revert previous temp commit | clarified |
| 4 | README instructs starting remotes before container because development server would fail fetching `remoteEntry.js`, unsupported by configuration. | 3.4.7 #28 | conflicting stages | 91feee5 2026-05-11 Created Dashboard MFE + added readme | clarified |
| 5 | Comment in auth `index.html` says this HTML is never served, and production build generates it and workflow publishes and invalidates it. | 3.4.7 #32 | conflicting stages | 6af9f6d 2026-05-11 Created auth MFE; 60008a4 2026-05-21 Created deploy workflows for auth and dashboard | clarified |

## Observations

**1. History pattern "in each remote".** Pattern generalized by README predates dashboard: message of `2be6f54` (2026-03-24) announces navigation between container and marketing, and auth with same pattern is created in `6af9f6d`. README and dashboard originate together in `91feee5`, and objects of `README.md`, `packages/dashboard/src/bootstrap.js` and `packages/container/src/components/DashboardApp.js` are identical from `91feee5` to snapshot. Thus there is no dashboard version with routing history later removed, nor README later than dashboard. History does not show whether sentence was written before dashboard elsewhere or copied from another text. Conclusion limited to these files: generalization and dashboard without routing are from same commit and did not change afterward; contradiction does not result from different repository stages.

**2. Vue shared among Vue remotes.** README itself marks case as hypothetical ("should you add more", README.md:256), and snapshot has only one Vue package (3.4.7 #22). History has nothing to add: sentence describes a possible extension, rather than repository state. No query was made.

**3. `<style scoped>` "in every SFC".** The `App.vue` and `Dashboard.vue` are created in `91feee5`, together with README. The `App.vue` is only file in this part changed afterward: in `d1cf5a5` (2026-05-21, "Temp commit to test the new deploy workflows") it acquires another object, and in `44eb295` ("Revert previous temp commit") returns to object from `91feee5` (`dd66cc2`). The `Dashboard.vue` and `README.md` do not change. Temporary version contents were not read; message announces change to test workflows. Conclusion: snapshot `App.vue` matches when README was written; `<style>` without `scoped` is neither a remnant nor change after README.

**4. Development startup order.** The `packages/container/config/webpack.dev.js` is changed in `ba3fc6f`, `13cc9fe` and `91feee5`, and object at `91feee5` matches snapshot; container wrappers `AuthApp.js` and `DashboardApp.js` and `App.js` are also in snapshot as in `91feee5`. README is created in same commit. Instruction was therefore written with current development configuration and wrappers, rather than left over from earlier configuration. Contents of versions at `ba3fc6f` and `13cc9fe` were not read, and history does not show source of development server explanation. Conclusion limited to these files: claim and contradicting configuration are from same stage.

**5. Auth `index.html` "never served".** The `packages/auth/public/index.html`, with comment, and `packages/auth/config/webpack.common.js`, with `HtmlWebpackPlugin` generating this HTML also in production, are created together in `6af9f6d` (2026-05-11) and have same objects up to snapshot. Workflow publishing `dist` and invalidating `/auth/latest/index.html` comes afterward in `60008a4` (2026-05-21, "Created deploy workflows for auth and dashboard"); in snapshot, `.github/workflows/auth.yml` differs from `.github/workflows/container.yml` only by package name (lines 1, 8, 12, 26 and 32), including invalidated file. History shows comment predates workflow, but build already generating HTML is from same commit as comment, so claim does not match even stage when written. Auth workflow being based on container workflow is consistent with identical text, but message only announces creation. Conclusion: comment does not describe an earlier build stage; HTML publication and invalidation arrived afterward in a workflow shaped like container workflow.

## Commands

```
docs/mfe-history-review/tools/hist.sh lorem98__mfe rev-list --count 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
docs/mfe-history-review/tools/hist.sh lorem98__mfe rev-list --count --merges 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
docs/mfe-history-review/tools/hist.sh lorem98__mfe log --format='%h %ad %s' --date=short --reverse --name-status 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 91feee5 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 60008a4 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r d1cf5a5 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 44eb295 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 6af9f6d -- packages/auth/public packages/auth/config .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 6af9f6d
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 91feee5
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 60008a4
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short d1cf5a5
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 44eb295
docs/mfe-history-review/tools/hist.sh lorem98__mfe log --format='%h %ad %s' --date=short 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4 -- README.md packages/auth/public/index.html packages/auth/config/webpack.common.js packages/dashboard/src/App.vue packages/dashboard/src/bootstrap.js packages/container/config/webpack.dev.js .github/workflows/auth.yml
```

## Summary

Commits up to the snapshot: 17 (2026-02-05 to 2026-05-21). Points: 5 (clarified: 4, inconclusive: 0, resolved by the snapshot: 1).
