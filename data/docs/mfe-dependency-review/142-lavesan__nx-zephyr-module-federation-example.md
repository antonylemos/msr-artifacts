---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:13 | devDependencies | @nx/js | 20.7.2 | monorepo-tool | Yes | nx.json:8-22 (plugin `@nx/js/typescript` registered, with options `typecheck` and `build`; loaded on every nx execution, such as in vercel.json:2 `npx nx build shell`); no import or executor `@nx/js` outside nx.json (grep, excluding the lockfile) |
| package.json:17 | devDependencies | nx | 20.7.2 | monorepo-tool | Yes | vercel.json:2 (`buildCommand` for shell deployment invokes `npx nx build shell`); apps/courses/vercel.json:2 and apps/profile/vercel.json:2 (`npx nx build courses`, `npx nx build profile`); apps/shell/project.json:6-20 (targets `build` and `serve` with executor `nx:run-commands`), same in apps/courses/project.json:6-20 and apps/profile/project.json:6-20 |

## Notes

- The inspection lists contain only `pnpm-workspace.yaml:1`, which does not show use of either package. The evidence (plugin in `nx.json`, executors in `project.json`, `buildCommand` in `vercel.json`) appeared outside the lists.
- The scripts in package.json:6-8 invoke `nx run-many`, but a script does not count as use; `nx` relies on Vercel deploy `buildCommand` entries, serving the role of CI workflows in precedents 006 and 039.
- `@nx/js`: judged as in 039 (plugin registered in `nx.json`, loaded during nx executions). Here there is no `@nx/js:*` executor; the `@nx/js/typescript` plugin infers targets from `tsconfig*.json` (the `configName: tsconfig.lib.json` from nx.json:17 does not exist in the snapshot), but plugin registration is the configuration of the package in use.

