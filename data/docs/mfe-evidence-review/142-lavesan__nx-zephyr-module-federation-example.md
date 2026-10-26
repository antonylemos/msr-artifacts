---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Repository overview

Demonstration with three Rsbuild React applications in a pnpm/Nx monorepo: host `apps/shell` and remotes `apps/courses` and `apps/profile`, each with own manifest, entry and build (#17 through #19). Architecture is supported by complete Module Federation chain, without separate federation dependency: mechanism comes from native Rsbuild `moduleFederation` option.
- **Configuration:** each remote declares itself by name, with `remoteEntry.js`, exposing `./App` (#3, #5). Shell names both remotes, with development and production URLs (#7). Three `rsbuild.config.ts` files pass declarations to `moduleFederation` option (#4, #6, #8).
- **Code:** shell imports `courses/App` and `profile/App` with `React.lazy` (#9, #10) and links them to routes `/courses*` and `/profile*` in route table (#13 through #15).
- **Relationships:** two active host → remote relationships result (#21, #22).
- **Build and deployment:** each application has own build and Vercel deployment configuration (#23 through #25). Production remote URLs used by host match these independent publications (#7).

Documentation is root README and almost entirely matches implementation (#26, #28 through #31, #34 through #38). Exceptions:
- **Live Demo (#27):** shell address only appears in README.
- **Zephyr (#33):** plugin changing bundler configuration exists and is used by three applications, but federation effect is unobservable in snapshot.
- **"Shared component library" (#32):** contradicted by snapshot, which has no component library. History confirms no observable stage had one (#39).

Signals misleading when read alone:
- **Nx (#1, #2):** monorepo tools in use rather than MFE tools.
- **Asynchronous bootstrap (#11, #12):** internal to each unit.
- **Zephyr plugin (#20):** fourth workspace package, but a build plugin rather than unit or shared library.

Nothing remains ambiguous in snapshot.

## Observations

### 1. package.json:13; nx.json:8-22

**Observation:** `@nx/js` (`20.7.2`) is declared in `devDependencies`. `nx.json` registers plugin `@nx/js/typescript`, with `typecheck` and `build` options. No `@nx/js` import or executor outside `nx.json`.

**Interpretation:** Monorepo tool in use rather than MFE technology.

### 2. package.json:17; vercel.json:2; apps/courses/vercel.json:2; apps/profile/vercel.json:2; apps/shell/project.json:6-20; apps/courses/project.json:6-20; apps/profile/project.json:6-20

**Observation:** `nx` (`20.7.2`) is declared in `devDependencies`. Three `vercel.json` files invoke `npx nx build shell`, `npx nx build courses` and `npx nx build profile`, and three application `project.json` files define targets `build` and `serve` with executor `nx:run-commands`.

**Interpretation:** Monorepo tool triggering deployment builds rather than MFE technology.

### 3. apps/courses/module-federation.config.ts:1-21

**Observation:** `mfConfig` declares `name: "courses"`, `filename: "remoteEntry.js"` and exposes `./App` (`./src/App`). `shared` spreads `dependencies` from `package.json` and marks `react` and `react-dom` as singletons.

**Interpretation:** Courses is configured as remote and offers its application to a host.

**Note:** Other configuration files cited in 3.4 tables (`nx.json`, `pnpm-workspace.yaml`, `project.json` files, `vercel.json` files and packages/zephyr-rsbuild-plugin/rslib.config.ts) do not declare a composition element and did not become configuration observations. Development ports only corroborate.

### 4. apps/courses/rsbuild.config.ts:1-34

**Observation:** `defineConfig` defines port 3001, `dist` output, plugins `pluginReact` and `ZephyrRsbuildPlugin`, and `moduleFederation.options: mfConfig`, imported from adjacent `module-federation.config.ts`.

**Interpretation:** Courses build applies native Rsbuild federation with configuration from #3.

### 5. apps/profile/module-federation.config.ts:1-21

**Observation:** `mfConfig` declares `name: "profile"`, `filename: "remoteEntry.js"` and exposes `./App` (`./src/App`). `shared` spreads `dependencies` from `package.json` and marks `react` and `react-dom` as singletons.

**Interpretation:** Profile is configured as remote and offers its application to a host.

### 6. apps/profile/rsbuild.config.ts:1-34

**Observation:** `defineConfig` defines port 3002, `dist` output, plugins `pluginReact` and `ZephyrRsbuildPlugin`, and `moduleFederation.options: mfConfig`.

**Interpretation:** Profile build applies native Rsbuild federation with configuration from #5.

### 7. apps/shell/module-federation.config.ts:1-38

**Observation:** `mfConfig` declares `name: "shell"`, `filename: "remoteEntry.js"`, `exposes: {}` and `remotes` `courses: courses@${COURSES_URL}/remoteEntry.js` and `profile: profile@${PROFILE_URL}/remoteEntry.js`. URLs are `http://localhost:3001` and `http://localhost:3002` in development and, otherwise, `VITE_COURSES_URL`/`VITE_PROFILE_URL` or defaults `https://nx-zephyr-module-federation-example-courses.vercel.app` and `https://nx-zephyr-module-federation-example-profile.vercel.app`. `shared` spreads `dependencies` and marks `react` and `react-dom` as `eager` singletons.

**Interpretation:** Host configuration declares courses and profile units as remotes and where to find them in each environment.

### 8. apps/shell/rsbuild.config.ts:1-34

**Observation:** `defineConfig` defines port 3000, `dist` output, plugins `pluginReact` and `ZephyrRsbuildPlugin`, and `moduleFederation.options: mfConfig`.

**Interpretation:** Shell build applies native Rsbuild federation with configuration from #7.

### 9. apps/shell/src/App.tsx:6

**Observation:** `const Courses = lazy(() => import("courses/App"));`.

**Interpretation:** Shell loads module exposed by courses at runtime.

### 10. apps/shell/src/App.tsx:7

**Observation:** `const Profile = lazy(() => import("profile/App"));`.

**Interpretation:** Shell loads module exposed by profile at runtime.

### 11. apps/courses/src/index.tsx:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 12. apps/shell/src/index.tsx:1

**Observation:** `import("./bootstrap")`.

**Interpretation:** An asynchronous bootstrap internal to shell.

### 13. apps/shell/src/App.tsx:18-22; apps/shell/src/App.tsx:13-17; apps/shell/src/components/Header.tsx:16-43

**Observation:** `Routes` links `/courses*` to `Courses` and `/profile*` to `Profile`, redirecting `/` to `/courses`, inside `BrowserRouter` and `Suspense`. Shell header has links for both routes.

**Interpretation:** Host routing declares host → remotes relationship and presents both remotes in same application.

### 14. apps/shell/src/App.tsx:20

**Observation:** `<Route path="/courses*" element={<Courses />} />`.

**Interpretation:** Route links path `/courses*` to remote courses component.

### 15. apps/shell/src/App.tsx:21

**Observation:** `<Route path="/profile*" element={<Profile />} />`.

**Interpretation:** Route links path `/profile*` to remote profile component.

### 16. .; package.json:1-21; pnpm-workspace.yaml:1-3

**Observation:** pnpm workspace root (`packages/*` and `apps/*`), with `nx run-many` scripts for three applications, without UI entry or build.

**Interpretation:** Monorepo coordination root rather than unit.

### 17. apps/courses; apps/courses/package.json:1-27; apps/courses/src/index.tsx:1; apps/courses/src/bootstrap.tsx:5-13; apps/courses/rsbuild.config.ts:6-34

**Observation:** Own manifest, React-mounting entry and Rsbuild build.

**Interpretation:** Frontend unit with its own boundary.

### 18. apps/profile; apps/profile/package.json:1-27; apps/profile/src/index.tsx:1; apps/profile/src/bootstrap.tsx:5-13; apps/profile/rsbuild.config.ts:6-34

**Observation:** Own manifest, React-mounting entry and Rsbuild build.

**Interpretation:** Frontend unit with its own boundary.

### 19. apps/shell; apps/shell/package.json:1-29; apps/shell/src/index.tsx:1; apps/shell/src/bootstrap.tsx:5-13; apps/shell/rsbuild.config.ts:6-34

**Observation:** Own manifest, React-mounting entry and Rsbuild build.

**Interpretation:** Frontend unit with its own boundary.

### 20. packages/zephyr-rsbuild-plugin; packages/zephyr-rsbuild-plugin/package.json:1-39; packages/zephyr-rsbuild-plugin/rslib.config.ts:4-21

**Observation:** Package built as ESM library with Rslib, wrapping configuration with `withZephyr`, without UI-starting entry. Three `rsbuild.config.ts` files import it.

**Interpretation:** Application build plugin rather than frontend unit.

### 21. apps/shell/src/App.tsx:6; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:20; apps/shell/module-federation.config.ts:7-10, 21; apps/courses/module-federation.config.ts:5-9; apps/shell/rsbuild.config.ts:31-33; apps/courses/rsbuild.config.ts:31-33

**Observation:** Shell remote `courses` matches unit `name: "courses"`, `filename: "remoteEntry.js"` and key `./App`, corresponding to specifier `courses/App` imported by shell and rendered at route `/courses*`, also target of `/` redirect.

**Interpretation:** An active host → remote relationship.

### 22. apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:21; apps/shell/module-federation.config.ts:12-15, 22; apps/profile/module-federation.config.ts:5-9; apps/shell/rsbuild.config.ts:31-33; apps/profile/rsbuild.config.ts:31-33

**Observation:** Same flow for `profile`: remote `profile` in shell, `name: "profile"`, `remoteEntry.js` and `./App` in unit, import `profile/App` and route `/profile*`.

**Interpretation:** An active host → remote relationship.

### 23. apps/courses/rsbuild.config.ts:10-21; apps/courses/package.json:7; apps/courses/project.json:7-13; apps/courses/vercel.json:2-3

**Observation:** Own `rsbuild build`, outputting to `apps/courses/dist`, and Nx target `build`. Application `vercel.json` builds only `courses` and publishes `dist`. Production address is default URL used by host for remote. Version `0.0.0` unused in publication.

**Interpretation:** Own build and deployment boundaries.

### 24. apps/profile/rsbuild.config.ts:10-21; apps/profile/package.json:7; apps/profile/project.json:7-13; apps/profile/vercel.json:2-3

**Observation:** Own `rsbuild build`, outputting to `apps/profile/dist`, and Nx target `build`. Application `vercel.json` builds only `profile` and publishes `dist`. Production address is default URL used by host for remote. Version `0.0.0` unused in publication.

**Interpretation:** Own build and deployment boundaries.

### 25. apps/shell/rsbuild.config.ts:10-21; apps/shell/package.json:7; apps/shell/project.json:7-13; vercel.json:2-3

**Observation:** Own `rsbuild build`, outputting to `apps/shell/dist`, and Nx target `build`. Root `vercel.json` builds only shell and publishes `apps/shell/dist`; remotes are absent from artifact. No artifact records shell public address. Version `1.0.0` unused in publication.

**Interpretation:** Own build and deployment boundaries. Shell loads separately published remotes.

### 26. README.md:3

**Observation:** "A modern micro-frontend architecture demonstration using Module Federation, built with Nx monorepo and Zephyr."

**Interpretation:** Presents repository as micro-frontend architecture with Module Federation in Nx monorepo. Claim corroborated.

### 27. README.md:5

**Observation:** "[Live Demo](https://nx-zephyr-module-federation-shell.vercel.app/)".

**Interpretation:** Gives shell published address, recorded by no artifact. Claim remains uncorroborated.

### 28. README.md:9

**Observation:** "This monorepo contains three main applications that work together using Module Federation".

**Interpretation:** Claims monorepo has three applications composed through Module Federation. Claim corroborated.

### 29. README.md:11-15

**Observation:** "**Shell** (Host Application) / Main container application / Handles routing and navigation / Integrates remote modules seamlessly".

**Interpretation:** Assigns host role with routing and navigation to shell. Claim corroborated.

### 30. README.md:18-25

**Observation:** "**Courses** (Remote Module) [...] **Profile** (Remote Module)".

**Interpretation:** Assigns remote roles to courses and profile. Claim corroborated.

### 31. README.md:42-45

**Observation:** "**Module Federation** / Runtime dependency sharing / Dynamic remote loading".

**Interpretation:** Attributes dependency sharing and dynamic remote loading to Module Federation. Claim corroborated.

### 32. README.md:46

**Observation:** "Shared component library".

**Interpretation:** Claims a shared component library exists. Snapshot has none: sole package outside `apps/` is build plugin, and each remote only exposes its application. Claim contradicted.

### 33. README.md:49-52

**Observation:** "**Zephyr** / Custom RSBuild plugin / Enhanced build configuration / Optimized module federation setup".

**Interpretation:** Claims own Rsbuild plugin changes build and optimizes federation. Plugin exists and changes bundler configuration, but federation effect is unobservable in snapshot. Claim partially corroborated.

### 34. README.md:56-61

**Observation:** "**RSBuild/RSPack** [...] Module Federation support".

**Interpretation:** Claims build uses Rsbuild with Module Federation support. Claim corroborated.

### 35. README.md:86-88

**Observation:** Diagram "A[Shell App] --> B[Courses App]" / "A --> C[Profile App]".

**Interpretation:** Depicts both shell-to-remote links without a link between remotes. Claim corroborated.

### 36. README.md:89-92

**Observation:** Diagram "B --> D[Shared Dependencies]" / "C --> D" / "D --> E[React]" / "D --> F[React DOM]".

**Interpretation:** Claims remotes share React and React DOM. Claim corroborated; shell also shares them, and shared list is larger.

### 37. README.md:97

**Observation:** "The project is deployed on Vercel with separate deployments for each application".

**Interpretation:** Claims separate deployment per application. Claim corroborated.

### 38. README.md:144

**Observation:** "**Dynamic Module Loading**: Remote modules are loaded on demand".

**Interpretation:** Claims remotes load on demand. Claim corroborated.

### 39. 5a52004 2025-06-09 (packages/, apps/settings); 78c42b1 2025-06-10 (apps/settings, apps/courses); f9593dc 2025-06-10 (README.md); 766b6a2 2025-06-10 (packages/zephyr-rsbuild-plugin)

**Observation:** None of 13 commits creates a shared component package or directory. `packages/` only contained `.gitkeep` and Zephyr plugin. Sole removed set is `apps/settings`, with same arrangement as other applications, deleted in `78c42b1`. Snapshot README is version `f9593dc`, after removal. Older README and `apps/settings` versions unavailable.

**Interpretation:** No observable stage had a component library that claim could describe. Point clarified, claim remains contradicted.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:13) | 1 technology | manifest | — | context | weak | declares nx.json:8-22 |
| 2 | 3.4.2 (package.json:17) | 1 technology | manifest | — | context | weak | declares vercel.json:2; declares apps/courses/vercel.json:2; declares apps/profile/vercel.json:2; declares apps/shell/project.json:6-20; declares apps/courses/project.json:6-20; declares apps/profile/project.json:6-20 |
| 3 | 3.4.3 (apps/courses, Markers); 3.4.4 (apps/shell/src/App.tsx:6, Observation); 3.4.5 #1 (Configuration); 3.4.7 #5, #6, #7, #11 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #21 |
| 4 | 3.4.3 (apps/courses, Markers and Build); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #8, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #21 |
| 5 | 3.4.3 (apps/profile, Markers); 3.4.4 (apps/shell/src/App.tsx:7, Observation); 3.4.5 #2 (Configuration); 3.4.7 #5, #6, #7, #11 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #22 |
| 6 | 3.4.3 (apps/profile, Markers and Build); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #8, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #22 |
| 7 | 3.4.3 (apps/shell, Markers); 3.4.4 (apps/shell/src/App.tsx:6, apps/shell/src/App.tsx:7, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #2 (Where served); 3.4.7 #6, #11 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #19; configures #21; configures #22 |
| 8 | 3.4.3 (apps/shell, Markers and Build); 3.4.5 #1, #2 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #1, #8, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #19; configures #21; configures #22 |
| 9 | 3.4.4 (apps/shell/src/App.tsx:6) | 3 code | source code | module-federation | architectural | strong | implements #21 |
| 10 | 3.4.4 (apps/shell/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #22 |
| 11 | 3.4.4 (apps/courses/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (apps/shell/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (apps/shell/src/App.tsx:18) | 3 code | source code | module-federation | architectural | strong | implements #21; implements #22 |
| 14 | 3.4.4 (apps/shell/src/App.tsx:20) | 3 code | source code | module-federation | architectural | strong | implements #21 |
| 15 | 3.4.4 (apps/shell/src/App.tsx:21) | 3 code | source code | module-federation | architectural | strong | implements #22 |
| 16 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 17 | 3.4.3 (apps/courses) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (apps/profile) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.3 (packages/zephyr-rsbuild-plugin) | 4 structure | directory | — | context | weak | — |
| 21 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #19; links #17 |
| 22 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #19; links #18 |
| 23 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #17 |
| 24 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #18 |
| 25 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #19 |
| 26 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #8; corroborates #17; corroborates #18; corroborates #19; corroborates #21; corroborates #22 |
| 27 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | — |
| 28 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #21; corroborates #22; corroborates pnpm-workspace.yaml:1-3 |
| 29 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #21; corroborates #22 |
| 30 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #5; corroborates #21; corroborates #22 |
| 31 | 3.4.7 #6 | 7 documentation | documentation | module-federation | technological | weak | corroborates #3; corroborates #5; corroborates #7; corroborates #9; corroborates #10; corroborates #21; corroborates #22 |
| 32 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts #3; contradicts #5; contradicts #20; contradicts pnpm-workspace.yaml:1-3; contradicts apps/courses/src/App.tsx:1; contradicts apps/profile/src/App.tsx:1 |
| 33 | 3.4.7 #8 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #4; partially corroborates #6; partially corroborates #8; partially corroborates packages/zephyr-rsbuild-plugin/src/index.ts:4-10 |
| 34 | 3.4.7 #9 | 7 documentation | documentation | module-federation | technological | weak | corroborates #4; corroborates #6; corroborates #8; corroborates #23; corroborates #24; corroborates #25 |
| 35 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22 |
| 36 | 3.4.7 #11 | 7 documentation | documentation | — | technological | weak | corroborates #3; corroborates #5; corroborates #7; corroborates apps/courses/package.json:16-17; corroborates apps/profile/package.json:16-17; corroborates apps/shell/package.json:15-16 |
| 37 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #23; corroborates #24; corroborates #25 |
| 38 | 3.4.7 #13 | 7 documentation | documentation | — | technological | weak | corroborates #9; corroborates #10; corroborates #14; corroborates #15 |
| 39 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #32; explains #20 |

## Summary

Observations: 39. Dimensions (technology: 2, configuration: 6, code: 7, structure: 5, composition: 2, build-deploy: 3, documentation: 13, history: 1). Strength (strong: 8, moderate: 11, weak: 20, ambiguous: 0). Evidence (technological: 12, architectural: 23, context: 4).

