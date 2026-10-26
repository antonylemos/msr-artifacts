---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inputs:
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

## Repository overview

Demonstration pnpm/Nx monorepo with three React applications built with Rsbuild: host `apps/shell` and remotes `apps/courses` and `apps/profile` (README.md:9-29). Each application has an Nx `build` target running `pnpm build` in its own directory (apps/shell/project.json:7-13; apps/courses/project.json:7-13; apps/profile/project.json:7-13), and that script is `rsbuild build` (apps/shell/package.json:7; apps/courses/package.json:7; apps/profile/package.json:7). Each `rsbuild.config.ts` generates output in `dist` within application (apps/shell/rsbuild.config.ts:10-21, likewise in the other two). Root `build` only triggers all three targets with `nx run-many` (package.json:6). The `nx.json` registers plugin `@nx/js/typescript` with a build target based on `tsconfig.lib.json` (nx.json:8-22), absent from snapshot; application builds come from `project.json` files.

All three `rsbuild.config.ts` files use `ZephyrRsbuildPlugin` from local package `packages/zephyr-rsbuild-plugin` (apps/shell/rsbuild.config.ts:3, 29), applying `withZephyr` from `zephyr-rspack-plugin` to bundler configuration before compilation (packages/zephyr-rsbuild-plugin/src/index.ts:2, 7-10). Package is private and has no publication (packages/zephyr-rsbuild-plugin/package.json:34). The snapshot has no other Zephyr configuration, so what this plugin does with build result is not observed here; it decides no table column.

Deploy uses Vercel, with three hosting configurations, one per application. Root `vercel.json` installs workspace, runs `npx nx build shell` and publishes `apps/shell/dist` (vercel.json:2-3). Those in `apps/courses` and `apps/profile` move to root, run `npx nx build courses` and `npx nx build profile` and publish `dist` (apps/courses/vercel.json:2-3; apps/profile/vercel.json:2-3), assuming Vercel projects rooted at each application, configuration outside snapshot. All three declare `framework: "vite"`, although build uses Rsbuild, and rewrite all routes to `/index.html` (vercel.json:4-10; apps/courses/vercel.json:4-10; apps/profile/vercel.json:4-10). Outside development, host points to each remote’s own Vercel domain unless `VITE_COURSES_URL`/`VITE_PROFILE_URL` are defined (apps/shell/module-federation.config.ts:7-15), consistent with independent publication. README also says each application has separate Vercel deploy and gives shell address (README.md:95-101), but this is documentation. No CI, Dockerfile or compose is present in snapshot.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/courses | separate | separate | https://nx-zephyr-module-federation-example-courses.vercel.app (apps/shell/module-federation.config.ts:10); `http://localhost:3001` in development (apps/courses/rsbuild.config.ts:8) | No | apps/courses/rsbuild.config.ts:10-21 (own output in `dist`); apps/courses/package.json:7 (`rsbuild build`); apps/courses/project.json:7-13 (target `build`); apps/courses/vercel.json:2-3 (own Vercel deploy, `npx nx build courses`, publishes `dist`) |
| 2 | apps/profile | separate | separate | https://nx-zephyr-module-federation-example-profile.vercel.app (apps/shell/module-federation.config.ts:15); `http://localhost:3002` in development (apps/profile/rsbuild.config.ts:8) | No | apps/profile/rsbuild.config.ts:10-21 (own output in `dist`); apps/profile/package.json:7 (`rsbuild build`); apps/profile/project.json:7-13 (target `build`); apps/profile/vercel.json:2-3 (own Vercel deploy, `npx nx build profile`, publishes `dist`) |
| 3 | apps/shell | separate | separate | `http://localhost:3000` in development (apps/shell/rsbuild.config.ts:8) | No | apps/shell/rsbuild.config.ts:10-21 (own output in `dist`); apps/shell/package.json:7 (`rsbuild build`); apps/shell/project.json:7-13 (target `build`); vercel.json:2-3 (root Vercel deploy, `npx nx build shell`, publishes `apps/shell/dist`) |

## Observations

**1. apps/courses.** Own build: Rsbuild generates `apps/courses/dist` with `remoteEntry.js` declared in apps/courses/module-federation.config.ts:5-9. Separate deploy: apps/courses/vercel.json:2-3 builds only project `courses` and publishes only its output. Production address comes from default URL host uses for remote (apps/shell/module-federation.config.ts:9-10); snapshot does not record domain in deploy itself, and variable `VITE_COURSES_URL` can replace it. Version `0.0.0` (apps/courses/package.json:3) is unused in publication.

**2. apps/profile.** Same arrangement as courses: own Rsbuild build, with `remoteEntry.js` (apps/profile/module-federation.config.ts:5-9), and own Vercel deploy building and publishing only `profile` (apps/profile/vercel.json:2-3). Production address is host’s default URL for remote (apps/shell/module-federation.config.ts:14-15), replaceable by `VITE_PROFILE_URL`. Version `0.0.0` (apps/profile/package.json:3) is unused in publication.

**3. apps/shell.** Own build and separate deploy through root `vercel.json`, building only shell and publishing `apps/shell/dist` (vercel.json:2-3). Remotes do not enter artifact: shell loads them at runtime through URLs in apps/shell/module-federation.config.ts:20-23. Shell’s only public address is in README (README.md:5, 99), which is not an artifact, so "Where served" records only development port; this domain’s name (`nx-zephyr-module-federation-shell`) does not follow remote domain pattern (`nx-zephyr-module-federation-example-<nome>`). Version `1.0.0` (apps/shell/package.json:3) is unused in publication.

## Summary

Applications: 3. Build (separate: 3). Deploy (separate: 3). Independent versioning: 0.
