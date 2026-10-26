---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
inputs:
  clone: data/samples/mfe-sample-001/repos/victorlmneves___nuxt-monorepo-mfe-platform
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Repository overview

History up to snapshot has 4 commits, without merges, all from 2026-05-29. First, `da1cfb0` ("first commit"), creates only a `README.md`, whose version is unavailable in clone. Second, `74f5247` ("Initial commit"), creates monorepo root (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `pnpm-lock.yaml`, `.gitignore`, `.npmrc`, `tsconfig.json`), all of `packages/shared` (auth, registry and types) and four files in `scripts/`, and replaces README with snapshot version (object identifier `0dd924b` is identical in `74f5247` and snapshot). Third, `8606169` ("Add apps folder and its contents"), adds `apps` as gitlink to commit `cb1c03a` from another repository, absent from clone. Snapshot, `84ffc24` ("Fix: add apps/ and
all subfolders as regular files (remove submodule)"), removes gitlink, changes `.gitignore` and creates 41 files in `apps/` (shell and four remotes).

Thus, all code of five units has its first observable presence in snapshot commit itself: no `apps/` file has an earlier readable version, and contents pointed to by gitlink cannot be read. README, root files, `packages/shared` and `scripts/` do not change from `74f5247` to snapshot (object identifiers and `packages` and `scripts` tree identifiers are identical in both commits). Repository-wide `log --name-status` reached first commit without failure, and no commit creates or removes a file outside those listed above.

Of previous reviews, 3.4.2 has one `Undetermined` dependency (`turbo`), forming one point. 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive or `Undetermined` construct, 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy. Of four `contradicted` claims in 3.4.7, #13 and #15 about `singleton` scope became one point; #6 (shared header) and #16 (header as only shared thing) are separate points, because 3.4.7 separates them (Observation 16) and each historical uncertainty concerns different artifacts: unit usage of `ShellHeader.vue` in one, and package `@mfe/shared` in the other.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `turbo` has `turbo.json`, but is called only by `package.json` scripts, without a CI workflow or script invoking it | 3.4.2 (package.json:34) | dependency use | 74f5247 2026-05-29 Initial commit; 84ffc24 2026-05-29 Fix: add apps/ and all subfolders as regular files (remove submodule) | clarified |
| 2 | README calls `ShellHeader.vue` a "Shared header", and only shell uses it | 3.4.7 #6 | conflicting stages | 74f5247 2026-05-29 Initial commit; 8606169 2026-05-29 Add apps folder and its contents; 84ffc24 2026-05-29 Fix: add apps/ and all subfolders as regular files (remove submodule) | inconclusive |
| 3 | README attributes Vue 2 remote isolation and Vue 3 sharing with shell to `singleton` scope, and shell has no `ModuleFederationPlugin` and initializes containers with empty scope | 3.4.7 #13, #15 | conflicting stages | 74f5247 2026-05-29 Initial commit; 8606169 2026-05-29 Add apps folder and its contents; 84ffc24 2026-05-29 Fix: add apps/ and all subfolders as regular files (remove submodule) | inconclusive |
| 4 | README says header is the only shared thing, and package `@mfe/shared` and event bus are used by five units | 3.4.7 #16 | conflicting stages | 74f5247 2026-05-29 Initial commit | clarified |

## Observations

**1. `turbo` without invocation outside scripts.** The `package.json` and `turbo.json` are created in `74f5247` and do not change up to snapshot (same object identifiers, `229d4e3` and `e44e060`). None of four commits creates or removes a CI workflow, Dockerfile or other script calling `turbo`: the only removed path in all history is gitlink `apps`, and files in `scripts/` are identical since `74f5247`. Contents of `apps/` before snapshot, at gitlink `cb1c03a`, are unavailable, but invocations sought by 3.4.2 would be in root or `scripts/`. Conclusion limited to these files: repository never had a `turbo` invocation outside `package.json` scripts later removed; `Undetermined` is not a remnant of abandoned automation. This does not change `Undetermined` in 3.4.2.

**2. The "shared" header.** README containing sentence is version at `74f5247` and does not change up to snapshot. The `ShellHeader.vue` and remote `App.vue` files have their first observable presence in snapshot commit `84ffc24`, creating them as regular files; previously, `apps` was gitlink `cb1c03a` (`8606169`), and pointed-to commit is absent from clone (`cat-file` failed). History shows README was recorded before application code entered repository as files, on the same day, but does not show whether an earlier application version used header in more than one unit. Message of `84ffc24` announces only replacement of submodule with regular files. README also says it was built on another repository (README.md:5), which was not consulted. Inconclusive; claim remains `contradicted`.

**3. `singleton` scope.** Both sentences are in README at `74f5247`, unchanged up to snapshot. Artifacts contradicting them, remote `webpack.config.js` files (Vuetify 2 outside `shared`), shell `nuxt.config.ts` without plugin and `container.init({})` in `useMfeLoader.ts`, all have their first observable presence in `84ffc24`, and a single commit in each `log`. History does not show whether shell had, in an earlier version in gitlink `cb1c03a` or source repository cited at README.md:5, a `ModuleFederationPlugin` with Vue 3 in shared scope, because those contents are unavailable. Inconclusive; claims remain `contradicted`.

**4. The "only shared thing".** README and package `packages/shared`, with `src/auth/index.ts`, `src/registry.ts`, `src/types/index.ts` and `src/index.ts`, arrive together in `74f5247`, and neither changes up to snapshot (README is object `0dd924b`, and tree `packages` is `a195189` in both commits). Readable README version at `74f5247` already has, immediately below title "The only shared thing: the header", section "Auth state sharing" with bus from `packages/shared/src/auth` and contract `RemoteMount` "defined in `@mfe/shared`". Conclusion limited to these files: in repository, title never coexisted with a version lacking shared package; discrepancy is internal to README since its first observable presence, rather than a remnant of a stage preceding package. Usage of package by five units is observable only in snapshot. Claim remains `contradicted`.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform rev-list --count 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --format='%h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --merges --format='%h' 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --name-status --format='@@ %h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree da1cfb0
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 74f5247
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 8606169
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 84ffc2429b311b3c7565ffd35de4de48dafd5929
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 74f5247:packages/shared/src
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform ls-tree 84ffc2429b311b3c7565ffd35de4de48dafd5929:packages/shared/src
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform show da1cfb0:README.md      # failed: missing object
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --format='%h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929 -- README.md package.json turbo.json packages scripts
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform log --format='%h %ad %s' --date=short 84ffc2429b311b3c7565ffd35de4de48dafd5929 -- apps/shell/components/ShellHeader.vue apps/shell/composables/useMfeLoader.ts apps/shell/nuxt.config.ts apps/mfe-vue2-checkout/webpack.config.js apps/mfe-vue2-admin/webpack.config.js apps/mfe-vue3-profile/webpack.config.js apps/mfe-vue3-dashboard/webpack.config.js
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform cat-file -t cb1c03abe02b536d52cdc5aa31d29c616a8558ce      # failed: missing object (gitlink commit)
docs/mfe-history-review/tools/hist.sh victorlmneves___nuxt-monorepo-mfe-platform show 74f5247:README.md
```

## Summary

Commits up to the snapshot: 4 (2026-05-29 to 2026-05-29). Points: 4 (clarified: 2, inconclusive: 2, resolved by the snapshot: 0).
