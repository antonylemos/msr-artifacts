---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Workspace

pnpm-workspace.yaml:1-3 (includes `packages/*` and `apps/*`); nx.json:1-24 and Nx `project.json` in apps/shell, apps/courses and apps/profile.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-21 (coordination manifest, `nx run-many` scripts) | — | — | — | — | No | pnpm/Nx orchestration root, with no UI entry or application build of its own. |
| apps/courses | apps/courses/module-federation.config.ts;apps/courses/package.json;apps/courses/project.json;apps/courses/rsbuild.config.ts | apps/courses/package.json:1-27 (own manifest) | apps/courses/src/index.tsx:1 (conventional Rsbuild entry); apps/courses/src/bootstrap.tsx:5-13 (mounts React) | apps/courses/rsbuild.config.ts:6-34 (own configuration); apps/courses/package.json:7 (`rsbuild build`); apps/courses/project.json:7-13 (target `build`) | pnpm-workspace.yaml:3 (`apps/*`) | apps/courses/vercel.json:2-3 (own Vercel deployment, `npx nx build courses`) | Yes | React application with its own UI entry and Rsbuild build. |
| apps/profile | apps/profile/module-federation.config.ts;apps/profile/package.json;apps/profile/project.json;apps/profile/rsbuild.config.ts | apps/profile/package.json:1-27 (own manifest) | apps/profile/src/index.tsx:1 (conventional Rsbuild entry); apps/profile/src/bootstrap.tsx:5-13 (mounts React) | apps/profile/rsbuild.config.ts:6-34 (own configuration); apps/profile/package.json:7 (`rsbuild build`); apps/profile/project.json:7-13 (target `build`) | pnpm-workspace.yaml:3 (`apps/*`) | apps/profile/vercel.json:2-3 (own Vercel deployment, `npx nx build profile`) | Yes | React application with its own UI entry and Rsbuild build. |
| apps/shell | apps/shell/module-federation.config.ts;apps/shell/package.json;apps/shell/project.json;apps/shell/rsbuild.config.ts | apps/shell/package.json:1-29 (own manifest) | apps/shell/src/index.tsx:1 (conventional Rsbuild entry); apps/shell/src/bootstrap.tsx:5-13 (mounts React) | apps/shell/rsbuild.config.ts:6-34 (own configuration); apps/shell/package.json:7 (`rsbuild build`); apps/shell/project.json:7-13 (target `build`) | pnpm-workspace.yaml:3 (`apps/*`) | vercel.json:2-3 (root Vercel deployment builds only the shell, `npx nx build shell`, output `apps/shell/dist`) | Yes | React application with its own UI entry and Rsbuild build. |
| packages/zephyr-rsbuild-plugin | packages/zephyr-rsbuild-plugin/package.json | packages/zephyr-rsbuild-plugin/package.json:1-39 (exported package) | — | packages/zephyr-rsbuild-plugin/rslib.config.ts:4-21 (ESM library build); packages/zephyr-rsbuild-plugin/package.json:17 (`rslib build`) | pnpm-workspace.yaml:2 (`packages/*`) | — | No | Rsbuild build plugin (wraps `withZephyr`), with no entry that starts a UI. |

## Summary

Frontend applications in the snapshot: 3 (apps/courses, apps/profile, apps/shell).

## Notes

- N = 3 matches the classification’s `frontend_units: 3`.
- apps/profile/index.html:1-12 exists, but no `rsbuild.config.ts` references it (`html.template`); it was not used as an entry.
- The packages/zephyr-rsbuild-plugin plugin is imported by the three `rsbuild.config.ts` files (line 3 and `:29`); it is part of the applications’ build, not an application.
