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

Project documentation is English root README. It presents micro-frontend demonstration using Module Federation in Nx monorepo with Zephyr (README.md:1-3), describes three applications, shell hosting courses and profile remotes (README.md:9-29), lists technology stack (README.md:31-79), provides Mermaid architecture diagram (README.md:85-93), Vercel deployment section (README.md:95-101), run instructions (README.md:103-127), annotated directory tree (README.md:129-140) and feature list (README.md:142-149). READMEs in `apps/courses`, `apps/profile`, `apps/shell` and `packages/zephyr-rsbuild-plugin` are tool templates ("# Rsbuild project", apps/courses/README.md:1 and apps/shell/README.md:1; "# Rspack project" with `npm` commands, apps/profile/README.md:1, 8; "# Rslib project", packages/zephyr-rsbuild-plugin/README.md:1), installation and build instructions only, without project claims.

README mostly matches previous reviews: three React applications with Rsbuild (3.4.3), shell loading both remotes through Module Federation routes (3.4.4; 3.4.5 #1, #2), shared `react` and `react-dom`, and Vercel deployment per application (3.4.6 #1-#3). Exceptions: "Shared component library" (claim 7), absent from snapshot; Live Demo address (claim 2), only in README; federation optimization attributed to Zephyr (claim 8), whose effect is unobservable in snapshot.

Excluded from table:
- Generic sentence "This project showcases how to build scalable, modular web applications using cutting-edge technologies" (README.md:3);
- Unit descriptions concerning business or appearance: "Modern header with responsive design" (README.md:16), courses list (README.md:20-23) and profile list (README.md:26-29);
- Generic technology descriptions not about project: Nx "Monorepo management / Efficient build system / Smart caching / Project dependency graph" (README.md:37-40), Rsbuild/Rspack "Next-generation build tool / Fast compilation / Built-in optimizations" (README.md:58-60), Biome (README.md:63-66), React (README.md:72-74) and TypeScript (README.md:76-79). Versions match manifests: Nx 20.7.2 (README.md:35; package.json:13, 17) and React 19.1.0 (README.md:70; apps/shell/package.json:15-16);
- Nonarchitectural features: "Type Safety", "Modern UI" and "Hot Module Replacement (HMR) support" (README.md:146-147, 149);
- Cloning, installation and run instructions (README.md:103-121) and development ports (README.md:123-127), matching apps/shell/rsbuild.config.ts:8, apps/courses/rsbuild.config.ts:8 and apps/profile/rsbuild.config.ts:8; tree root name `nx-module-federation-with-zephyr/` (README.md:132) is `name` in package.json:2;
- "Contributing" and "License" sections (README.md:151-157).

`doc-*` occurrences: README.md:1 title; README.md:3 claim 1, repeated by README.md:47 and 83; README.md:9 claim 3; README.md:42 claim 6; README.md:52 claim 8; README.md:61 claim 9; README.md:100 and 101 repeat 5.

Artifacts cited by previous reviews were read: four application/plugin `package.json` files (without `description`) and root one, `nx.json`, `pnpm-workspace.yaml`, three `module-federation.config.ts`, `rsbuild.config.ts`, `project.json` and `vercel.json` files, `src/index.tsx` and `src/bootstrap.tsx`, apps/shell/src/App.tsx, apps/shell/src/components/Header.tsx, apps/shell/src/remotes.d.ts, remote `App.tsx` files and packages/zephyr-rsbuild-plugin/src/index.ts. Comment "// Lazy load the remote modules" (apps/shell/src/App.tsx:5) repeats claim 13. Plugin retains commented previous hook applying `withZephyr` (packages/zephyr-rsbuild-plugin/src/index.ts:11-15), without claim. `vercel.json` files and `nx.json` have no comments.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A modern micro-frontend architecture demonstration using Module Federation, built with Nx monorepo and Zephyr." | structure | corroborated | 3.4.2 (`nx`, `@nx/js`); 3.4.3 (three units `Yes`); 3.4.5 #1, #2; apps/shell/rsbuild.config.ts:3, 29, 31-33 |
| 2 | README.md:5 | "[Live Demo](https://nx-zephyr-module-federation-shell.vercel.app/)" (published shell address) | build-deploy | uncorroborated | — |
| 3 | README.md:9 | "This monorepo contains three main applications that work together using Module Federation" | structure | corroborated | 3.4.3 (Summary); 3.4.5 #1, #2; pnpm-workspace.yaml:1-3 |
| 4 | README.md:11-15 | "**Shell** (Host Application) / Main container application / Handles routing and navigation / Integrates remote modules seamlessly" | structure | corroborated | 3.4.4 (apps/shell/src/App.tsx:18, `host-relationship`); 3.4.5 #1, #2; apps/shell/src/App.tsx:13-22; apps/shell/src/components/Header.tsx:16-43 |
| 5 | README.md:18-25 | "**Courses** (Remote Module) [...] **Profile** (Remote Module)" | structure | corroborated | 3.4.5 #1, #2; apps/courses/module-federation.config.ts:5-9; apps/profile/module-federation.config.ts:5-9 |
| 6 | README.md:42-45 | "**Module Federation** / Runtime dependency sharing / Dynamic remote loading" | composition | corroborated | 3.4.4 (apps/shell/src/App.tsx:6, 7); 3.4.5 #1, #2; apps/shell/module-federation.config.ts:20-37; apps/courses/module-federation.config.ts:10-20; apps/profile/module-federation.config.ts:10-20 |
| 7 | README.md:46 | "Shared component library" | composition | contradicted | 3.4.3 (packages/zephyr-rsbuild-plugin `No`); pnpm-workspace.yaml:1-3; apps/courses/src/App.tsx:1; apps/profile/src/App.tsx:1; apps/courses/module-federation.config.ts:7-9; apps/profile/module-federation.config.ts:7-9 |
| 8 | README.md:49-52 | "**Zephyr** / Custom RSBuild plugin / Enhanced build configuration / Optimized module federation setup" | build-deploy | partial | 3.4.6 (Repository overview); packages/zephyr-rsbuild-plugin/src/index.ts:4-10; apps/shell/rsbuild.config.ts:3, 29; apps/courses/rsbuild.config.ts:3, 29; apps/profile/rsbuild.config.ts:3, 29 |
| 9 | README.md:56-61 | "**RSBuild/RSPack** [...] Module Federation support" | build-deploy | corroborated | 3.4.3 (Build column); 3.4.6 #1-#3; apps/shell/package.json:7; apps/shell/rsbuild.config.ts:31-33; apps/courses/rsbuild.config.ts:31-33; apps/profile/rsbuild.config.ts:31-33 |
| 10 | README.md:86-88 | diagram "A[Shell App] --> B[Courses App]" / "A --> C[Profile App]" | composition | corroborated | 3.4.5 #1, #2 |
| 11 | README.md:89-92 | diagram "B --> D[Shared Dependencies]" / "C --> D" / "D --> E[React]" / "D --> F[React DOM]" | composition | corroborated | apps/courses/module-federation.config.ts:10-20; apps/profile/module-federation.config.ts:10-20; apps/shell/module-federation.config.ts:25-37; apps/courses/package.json:16-17; apps/profile/package.json:16-17; apps/shell/package.json:15-16 |
| 12 | README.md:97 | "The project is deployed on Vercel with separate deployments for each application" | build-deploy | corroborated | 3.4.6 #1-#3; vercel.json:2-3; apps/courses/vercel.json:2-3; apps/profile/vercel.json:2-3 |
| 13 | README.md:144 | "**Dynamic Module Loading**: Remote modules are loaded on demand" | composition | corroborated | 3.4.4 (apps/shell/src/App.tsx:6, 7); apps/shell/src/App.tsx:6-7, 17-21 |

## Observations

**1. README.md:3.** Three applications are frontend units (3.4.3), with shell loading both remotes through `module-federation` (3.4.5 #1, #2), declared through Rsbuild option `moduleFederation` (apps/shell/rsbuild.config.ts:31-33). Nx monorepo is pnpm workspace with Nx `project.json` per application, and `nx` and `@nx/js` are used (3.4.2). Zephyr enters through local plugin applied by all three `rsbuild.config.ts` files (apps/shell/rsbuild.config.ts:3, 29). Claim repeats in "Micro-frontend architecture" (README.md:47) and "The project uses a micro-frontend architecture with Module Federation" (README.md:83). Title "Nx Module Federation with Zephyr" (README.md:1) names same technologies.

**2. README.md:5.** Shell address appears only in README, here and deployment section ("Shell App: https://nx-zephyr-module-federation-shell.vercel.app/", README.md:99). Root `vercel.json` configures shell deployment (vercel.json:2-3), without domain, and build and deployment review notes domain name differs from host remote URL pattern (`nx-zephyr-module-federation-example-<nome>`, English explanation: name placeholder, apps/shell/module-federation.config.ts:10, 15; 3.4.6 #3). Nothing confirms or refutes shell publishing at this address.

**3. README.md:9.** Snapshot has three frontend units, apps/courses, apps/profile and apps/shell, in pnpm workspace (pnpm-workspace.yaml:3; 3.4.3), linked by two `module-federation` relationships (3.4.5 #1, #2). "main" leaves room for other projects: fourth workspace package is build plugin rather than application (3.4.3, packages/zephyr-rsbuild-plugin `No`).

**4. README.md:11-15.** Shell hosts both relationships (3.4.5 #1, #2), exposing nothing (`exposes: {}`, apps/shell/module-federation.config.ts:24). It owns routing and navigation: `BrowserRouter` with routes `/courses*` and `/profile*` and redirect from `/` (apps/shell/src/App.tsx:13-22), plus header links (apps/shell/src/components/Header.tsx:16-43). Remotes have no own routers. Directory tree repeats role ("shell/ # Host application", README.md:134).

**5. README.md:18-25.** Both remotes expose `./App` with `filename: "remoteEntry.js"` (apps/courses/module-federation.config.ts:5-9; apps/profile/module-federation.config.ts:5-9), loaded by shell (3.4.5 #1, #2). Directory tree (README.md:135-136) and deployment section ("Remote module integrated with Shell", README.md:100-101) repeat roles.

**6. README.md:42-45.** Dynamic loading is shell's `lazy(() => import("courses/App"))` and `lazy(() => import("profile/App"))`, resolved through remotes declared in apps/shell/module-federation.config.ts:20-23 (3.4.4; 3.4.5 #1, #2). Runtime sharing is `shared` in three configurations, spreading `dependencies` from each `package.json` and marking `react` and `react-dom` singleton (apps/shell/module-federation.config.ts:25-37; apps/courses/module-federation.config.ts:10-20; apps/profile/module-federation.config.ts:10-20); all three depend on `react` and `react-dom` (claim 11). Feature "Shared Dependencies: Efficient runtime dependency sharing" (README.md:145) repeats sharing.

**7. README.md:46.** Snapshot has no component library. Only workspace package outside `apps/` is build plugin (pnpm-workspace.yaml:2; 3.4.3), remote `App.tsx` files only import own CSS (apps/courses/src/App.tsx:1; apps/profile/src/App.tsx:1), and shell only imports own `Header` and both remote modules (apps/shell/src/App.tsx:3, 6-7). Each remote exposes only own `./App` (apps/courses/module-federation.config.ts:7-9; apps/profile/module-federation.config.ts:7-9), consumed solely by shell; no component is used by multiple units as library. Hence `contradicted`, rather than `uncorroborated`.

**8. README.md:49-52.** "Custom RSBuild plugin" exists: `ZephyrRsbuildPlugin` replaces bundler configuration with result of `withZephyr()` before compiler creation (packages/zephyr-rsbuild-plugin/src/index.ts:4-10), used by all three applications (apps/shell/rsbuild.config.ts:3, 29; apps/courses/rsbuild.config.ts:3, 29; apps/profile/rsbuild.config.ts:3, 29), also confirming build configuration changes. Effect of `withZephyr`, including federation optimization, depends on `zephyr-rspack-plugin` and is unobservable in snapshot, which has no other Zephyr configuration (3.4.6, Repository overview). Directory tree repeats plugin ("zephyr-rsbuild-plugin/ # Custom build plugin", README.md:138).

**9. README.md:56-61.** All three applications build with `rsbuild build` (apps/shell/package.json:7; apps/courses/package.json:7; apps/profile/package.json:7), and federation is declared through Rsbuild's own `moduleFederation` option (apps/shell/rsbuild.config.ts:31-33; apps/courses/rsbuild.config.ts:31-33; apps/profile/rsbuild.config.ts:31-33). "Build Optimization: Efficient build process with RSBuild" (README.md:148) repeats Rsbuild build. `vercel.json` files declare `framework: "vite"` (vercel.json:4), though build uses Rsbuild (3.4.6, Repository overview).

**10. README.md:86-88.** Diagram has exactly two composition review relationships, shell → courses and shell → profile (3.4.5 #1, #2), without remote-to-remote connection, matching snapshot (3.4.5, Repository overview).

**11. README.md:89-92.** `react` and `react-dom` appear in `shared` of all three configurations (apps/courses/module-federation.config.ts:12-19; apps/profile/module-federation.config.ts:12-19; apps/shell/module-federation.config.ts:27-36), and all three applications depend on them (apps/courses/package.json:16-17; apps/profile/package.json:16-17; apps/shell/package.json:15-16). Diagram only links remotes to shared dependencies, but shell also shares them with `eager: true` (apps/shell/module-federation.config.ts:29, 34). Since `shared` spreads all `dependencies` per application (apps/shell/module-federation.config.ts:26), shared list exceeds React and React DOM (includes shell `react-router-dom`, apps/shell/package.json:17).

**12. README.md:97.** Three Vercel deployment configurations, one per application, each building and publishing only own application (vercel.json:2-3; apps/courses/vercel.json:2-3; apps/profile/vercel.json:2-3), and build and deployment review records `separate` deployment for all three (3.4.6 #1-#3). Following lines repeat shell address (README.md:99, claim 2) and remote roles (README.md:100-101, claim 5).

**13. README.md:144.** Both remotes imported through `React.lazy` (apps/shell/src/App.tsx:6-7), rendered only on routes `/courses*` and `/profile*` inside `Suspense` (apps/shell/src/App.tsx:17-21), so each fetched only upon route visit; since `/` redirects to `/courses` (apps/shell/src/App.tsx:19), courses loads on entry. Comment "// Lazy load the remote modules" (apps/shell/src/App.tsx:5) repeats claim.

## Summary

Claims: 13 (corroborated: 10, partial: 1, contradicted: 1, uncorroborated: 1). Themes: (structure: 4, composition: 5, build-deploy: 4).
