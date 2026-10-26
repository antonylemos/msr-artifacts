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

## Repository overview

A micro-frontends demonstration using Module Federation in an Nx/pnpm monorepo, with three React applications built with Rsbuild (README.md:1-29). `apps/shell` is the host and `apps/courses` and `apps/profile` are remotes. Federation is declared through each application's Rsbuild `moduleFederation` option (apps/shell/rsbuild.config.ts:31-33, the same in the other two), reading `mfConfig` from the neighboring `module-federation.config.ts`. The shell declares remotes `courses` and `profile` with URL `<nome>@<URL>/remoteEntry.js` (English translation of the placeholder: name) (apps/shell/module-federation.config.ts:20-23), and each remote exposes only key `./App`, pointing to its `src/App` (apps/courses/module-federation.config.ts:5-9; apps/profile/module-federation.config.ts:5-9). URLs are `localhost:3001`/`localhost:3002` in development and, otherwise, the `VITE_COURSES_URL`/`VITE_PROFILE_URL` variables or default Vercel URLs (apps/shell/module-federation.config.ts:4-15), consistent with separate deployment of each application (vercel.json:2-3; apps/courses/vercel.json:2-3).

Composition is through routes. The shell loads `courses/App` and `profile/App` with `React.lazy` (apps/shell/src/App.tsx:6-7) and renders them at `/courses*` and `/profile*`, inside `BrowserRouter` and `Suspense`, with `/` redirected to `/courses` (apps/shell/src/App.tsx:13-22); the shell header has links to both routes (apps/shell/src/components/Header.tsx:16-43). The contract is only each remote's default component, without props: both exposed `App` components show fixed data declared in the file itself (apps/courses/src/App.tsx:3-12; apps/profile/src/App.tsx:3-10). `react` and `react-dom` are shared as singletons, `eager` in the shell (apps/shell/module-federation.config.ts:25-37; apps/courses/module-federation.config.ts:10-20).

The shell also declares `name: "shell"`, `filename: "remoteEntry.js"` and `exposes: {}` (apps/shell/module-federation.config.ts:18-19, 24), with nothing exposed. There is no relationship between the two remotes or inter-unit communication (source code review, Notes). The `packages/zephyr-rsbuild-plugin` package is not a unit: it is the build plugin wrapping configuration with `withZephyr` (packages/zephyr-rsbuild-plugin/src/index.ts:2, 8) and used by all three `rsbuild.config.ts` files (apps/shell/rsbuild.config.ts:3, 29); it did not become a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/courses | host → remote | source → target | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:7-10 (courses URL: `localhost:3001` in dev, `VITE_COURSES_URL` or Vercel); apps/shell/module-federation.config.ts:21 (remote `courses@${COURSES_URL}/remoteEntry.js`); apps/courses/module-federation.config.ts:5-9 (`name: "courses"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/shell/rsbuild.config.ts:31-33 and apps/courses/rsbuild.config.ts:31-33 (`moduleFederation`) | apps/shell/src/App.tsx:6; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:20 |
| 2 | apps/shell | apps/profile | host → remote | source → target | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:12-15 (profile URL: `localhost:3002` in dev, `VITE_PROFILE_URL` or Vercel); apps/shell/module-federation.config.ts:22 (remote `profile@${PROFILE_URL}/remoteEntry.js`); apps/profile/module-federation.config.ts:5-9 (`name: "profile"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/shell/rsbuild.config.ts:31-33 and apps/profile/rsbuild.config.ts:31-33 (`moduleFederation`) | apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:21 |

## Observations

**1. apps/shell → apps/courses.** The shell's `courses` remote (apps/shell/module-federation.config.ts:21) matches the apps/courses unit through `name: "courses"`, `filename: "remoteEntry.js"` and key `./App` (apps/courses/module-federation.config.ts:5-9), the `courses/App` specifier imported in apps/shell/src/App.tsx:6. Port 3001 in the development URL (apps/shell/module-federation.config.ts:8) matches apps/courses/rsbuild.config.ts:8, but only corroborates. Active because all three code lines are `Yes`: the shell is mounted by apps/shell/src/index.tsx:1 and apps/shell/src/bootstrap.tsx:10, and `<Courses />` is the element of route `/courses*` (apps/shell/src/App.tsx:20), also the redirect target of `/` (apps/shell/src/App.tsx:19). The apps/shell/src/App.tsx:18 line (`Routes`) also supports relationship 2.

**2. apps/shell → apps/profile.** The same resolution: remote `profile` (apps/shell/module-federation.config.ts:22), `name: "profile"`, `filename: "remoteEntry.js"` and `./App` (apps/profile/module-federation.config.ts:5-9), import in apps/shell/src/App.tsx:7 and `<Profile />` at route `/profile*` (apps/shell/src/App.tsx:21). Port 3002 (apps/shell/module-federation.config.ts:13; apps/profile/rsbuild.config.ts:8) only corroborates. Unlike courses, profile's entry point imports bootstrap statically (apps/profile/src/index.tsx:1), which concerns the remote's isolated execution and does not change the relationship.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

