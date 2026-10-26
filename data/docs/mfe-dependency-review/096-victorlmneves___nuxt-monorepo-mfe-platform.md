---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/mfe-vue2-admin/package.json:13 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue2-admin/src/bootstrap.js:3 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), used in `:27-30`; apps/mfe-vue2-admin/webpack.config.js:67 (`exposes: { './App': './src/bootstrap.js' }`) and apps/mfe-vue2-admin/webpack.config.js:4 and `:27` (`sharedAliases` resolves the package, scripts/webpack.aliases.js:13-17) |
| apps/mfe-vue2-checkout/package.json:13 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue2-checkout/src/bootstrap.js:3 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), used in `:35-38`; apps/mfe-vue2-checkout/webpack.config.js:69 (`exposes: { './App': './src/bootstrap.js' }`) and apps/mfe-vue2-checkout/webpack.config.js:4 and `:29` (`sharedAliases`, scripts/webpack.aliases.js:13-17) |
| apps/mfe-vue3-dashboard/package.json:14 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue3-dashboard/src/bootstrap.js:8 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), used in `:29-30`; apps/mfe-vue3-dashboard/webpack.config.js:56 (`exposes: { './App': './src/bootstrap.js' }`) and apps/mfe-vue3-dashboard/webpack.config.js:4 and `:23` (`alias: { ...sharedAliases }`) |
| apps/mfe-vue3-profile/package.json:14 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/mfe-vue3-profile/src/bootstrap.js:8 (`import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'`), used in `:33-36`; apps/mfe-vue3-profile/webpack.config.js:56 (`exposes: { './App': './src/bootstrap.js' }`) and apps/mfe-vue3-profile/webpack.config.js:4 and `:23` (`alias: { ...sharedAliases }`) |
| apps/shell/package.json:13 | dependencies | @mfe/shared | workspace:* | mfe-term | Yes | apps/shell/pages/app/[...mfe].vue:30 (`import { MFE_REGISTRY } from '@mfe/shared'`), used in `:40-41` to resolve the route (Nuxt page, entry point by route); apps/shell/stores/auth.ts:3 (`import { broadcastLogin, broadcastLogout } from '@mfe/shared/auth'`), store used by the same page in `:31` and `:35`; apps/shell/composables/useMfeLoader.ts:1 (type import) |
| package.json:34 | devDependencies | turbo | ^2.0.0 | monorepo-tool | Undetermined | turbo.json:3-18 (tasks `dev`, `build`, `lint`, `clean` configured); the only invocation of `turbo` is in the scripts in package.json:13, `:19-20`, `:22-23`, which do not count as use; no CI workflow or automation script calling `turbo` (grep, excluding the lockfile; scripts/start-local.sh:18-22 uses `pnpm --filter`) |

## Notes

- `@mfe/shared` is the internal workspace package (packages/shared/package.json:2), captured by name by the `\bmfe` regex for the `mfe-term` technology. The inspection list items (apps/shell/composables/useMfeLoader.ts:13 and `:79`) are `loadRemoteModule`, the shell's remote loader, rather than package uses; the evidence above came from searching outside the lists.
- In the remotes, `bootstrap.js` is also loaded by the development entry point (for example, apps/mfe-vue2-admin/src/index.js:1 and apps/mfe-vue2-admin/webpack.config.js:9).
- `turbo`: `same_package_matches` points to pnpm-workspace.yaml:1, which is the pnpm package list, unrelated to Turborepo. The README mentions Turborepo (README.md:5), which is documentation. Unlike the precedent with `turbo` in 025, here there is no invocation outside package.json scripts; hence `Undetermined`.

