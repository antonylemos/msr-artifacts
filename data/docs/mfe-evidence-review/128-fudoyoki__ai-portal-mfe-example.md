---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
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

# 128 — fudoyoki/ai-portal-mfe-example

## Repository overview

npm workspaces monorepo with two React/Vite applications, shell (host) and dashboard (remote), a NestJS BFF and two shared packages. Complete Module Federation chain:
- **Dependency:** `@originjs/vite-plugin-federation`, in both applications (#1, #2).
- **Configuration:** shell declares remote `mfeDashboard`, with development and production URL (#5), and dashboard publishes itself under that name and exposes `./DashboardApp` (#4); both sides share same libraries as singletons.
- **Code:** shell imports `mfeDashboard/DashboardApp` with `React.lazy` (#6), links route `/dashboard/*` to remote component (#7) and renders it passing `user` and `basePath` (#8).
- **Relationship:** active shell → dashboard relationship results (#15), between two units with own boundaries (#11, #12), separate builds and deployments, one nginx image per application (#16, #17).

Misleading signals come from portal depicted by documentation but absent from snapshot. Chat, Tools and Admin remotes exist only as commented shell configuration lines and route placeholders (#5, #7); README presents them as remotes (#20, #23), and history shows they never had code (#42). README connects units to BFF, called by neither (#22, #43); types package calls itself shared with BFF, which does not use it (#39, #47). BFF (#10), coordination root (#9) and packages (#13, #14) are context rather than frontend units.

Two publication claims are unsupported: README CDN deployment uses a different prefix from shell expectation (#33), and per-app `sonar-project.properties` files do not exist (#35). History does not say when CDN section entered README (#45) or whether remote `build` + `preview` requirement comes from another stage than development compose (#44); both uncertainties concern only past. Sole ambiguous observation is `turbo` (#3): declared and configured, but invoked only by `package.json` scripts, without deciding whether it orchestrates build.

## Observations

### 1. apps/mfe-dashboard/package.json:21

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.6`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in dashboard build.

### 2. apps/shell/package.json:22

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.6`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in shell build.

### 3. package.json:18; turbo.json:3-25

**Observation:** `turbo` (`^2.3.0`) is declared in `devDependencies`. `turbo.json` defines tasks `build`, `dev`, `lint`, `test`, `test:coverage` and `clean`. Sole `turbo` invocation is in root `package.json` scripts (package.json:10-15); Dockerfiles copy `turbo.json` and build with `npm run build --workspace=...`, and no CI workflow exists.

**Interpretation:** Monorepo tool rather than MFE technology. Dependency review rule leaves usage undetermined: Turborepo may be actual build orchestration or merely a script shortcut.

### 4. apps/mfe-dashboard/vite.config.ts:11-40

**Observation:** `federation` declares `name: 'mfeDashboard'` and `filename: 'remoteEntry.js'`, exposes `./DashboardApp` (`./src/DashboardApp.tsx`) and shares as `singleton` `react`, `react-dom`, `react-router-dom`, `@ai-portal/ui-kit` and `@ai-portal/shared-types`.

**Interpretation:** Dashboard is configured as remote and offers main component to a host.

### 5. apps/shell/vite.config.ts:17-23; apps/shell/vite.config.ts:28-60

**Observation:** `federation` declares `name: 'shell'` and remote `mfeDashboard: getRemoteUrl('mfeDashboard')`. `getRemoteUrl` returns `http://localhost:3001/assets/remoteEntry.js` in development and `${CDN_URL}/mfeDashboard/remoteEntry.js`, defaulting to `https://cdn.example.com`, in production. Entries `mfeChat`, `mfeTools` and `mfeAdmin` are commented under "Add more MFEs as they're created" (:32-35). `shared` matches dashboard.

**Interpretation:** Host configuration declares dashboard as remote and where to find it in each environment; other three remotes are only planned.

### 6. apps/shell/src/App.tsx:7

**Observation:** `const DashboardApp = React.lazy(() => import('mfeDashboard/DashboardApp'))`.

**Interpretation:** Shell loads module exposed by remote, by name at runtime.

### 7. apps/shell/src/App.tsx:165-179

**Observation:** `AppRoutes` route table links `/dashboard/*` to remote `DashboardApp`; `/chat/*` and `/tools/*` render local placeholder `ComingSoon`. `AppRoutes` is used by `App` (:184-189).

**Interpretation:** Host places remote in its own route; other remote routes load no unit.

### 8. apps/shell/src/App.tsx:170-174

**Observation:** `<DashboardApp user={user} basePath="/dashboard" />`, inside `MfeErrorBoundary` and `Suspense`, with `user` from shell `AuthContext`.

**Interpretation:** Host renders remote component and passes props; inter-unit contract consists only of props.

**Note:** Row is in route `element`, but path-to-remote-component link is route row (#7); this only renders component, the `moderate` guidance case.

### 9. .; package.json:1-25; docker-compose.yml:3-58

**Observation:** Root contains workspace manifest declaring `apps/*` and `packages/*`, only delegating `dev` and `build` to `turbo run`, and `docker-compose.yml`, orchestrating subdirectory services. No entry or build of its own.

**Interpretation:** Workspace coordination root rather than frontend unit.

### 10. apps/bff; apps/bff/package.json:1-32; apps/bff/nest-cli.json:1-8; apps/bff/Dockerfile:2-16

**Observation:** Own manifest with `nest build`, Nest CLI configuration, own Docker image and `bff` compose service.

**Interpretation:** NestJS server (BFF) rather than frontend unit.

### 11. apps/mfe-dashboard; apps/mfe-dashboard/package.json:1-31; apps/mfe-dashboard/index.html:10-11; apps/mfe-dashboard/src/main.tsx:17-26; apps/mfe-dashboard/vite.config.ts:8-56

**Observation:** React application with own manifest, entry and Vite build; `main.tsx` mounts `DashboardApp` standalone. Own deployment image.

**Interpretation:** Frontend unit with own boundary, able to run without shell.

### 12. apps/shell; apps/shell/package.json:1-32; apps/shell/index.html:10-11; apps/shell/src/main.tsx:8-16; apps/shell/vite.config.ts:25-76

**Observation:** React application with own manifest, entry and Vite build. Own deployment image.

**Interpretation:** Frontend unit with own boundary.

### 13. packages/shared-types; packages/shared-types/package.json:1-25

**Observation:** Own manifest and library build (`tsup src/index.ts`, :17), without application entry or deployment.

**Interpretation:** Shared types package rather than frontend unit.

### 14. packages/ui-kit; packages/ui-kit/package.json:1-35

**Observation:** Own manifest and library build (`tsup src/index.ts`, :18), without application entry or deployment.

**Interpretation:** Shared component library rather than frontend unit.

### 15. apps/shell/src/App.tsx:7, 165, 172; apps/shell/vite.config.ts:17-23, 28-31; apps/mfe-dashboard/vite.config.ts:11-17

**Observation:** Shell imports `mfeDashboard/DashboardApp` and renders it at route `/dashboard/*`. Remote name, `remoteEntry.js` and module `./DashboardApp` match dashboard configuration.

**Interpretation:** An active host → remote relationship through Module Federation.

### 16. apps/mfe-dashboard/package.json:8; apps/mfe-dashboard/vite.config.ts:8-56; apps/mfe-dashboard/Dockerfile:2-33; apps/mfe-dashboard/nginx.conf:1-38; docker-compose.yml:19-27

**Observation:** Own `tsc && vite build` and configuration generating `remoteEntry.js`. Dockerfile builds packages and app and copies only `apps/mfe-dashboard/dist` into nginx image; compose service `mfe-dashboard` publishes it on port 3001. `nginx.conf` opens CORS and does not cache `remoteEntry.js`. Production shell expects remote on CDN (apps/shell/vite.config.ts:22), published by no artifact. Version `0.1.0` with `private: true`.

**Interpretation:** Dashboard has separate build and deployment without independent versioning; production address used by shell is not published in snapshot.

### 17. apps/shell/package.json:8; apps/shell/vite.config.ts:25-76; apps/shell/Dockerfile:2-33; apps/shell/nginx.conf:1-34; docker-compose.yml:5-16

**Observation:** Own `tsc && vite build` and configuration; artifact only stores remote URL. Dockerfile copies only `apps/shell/dist` into nginx image; service `shell` publishes it on port 3000, with `depends_on` on `mfe-dashboard` and `bff`. Version `0.1.0` with `private: true`.

**Interpretation:** Shell has separate build and deployment without independent versioning; changing remote address requires rebuilding it.

### 18. README.md:3

**Observation:** "A complete example of a micro-frontend architecture using **Vite + React + Module Federation**, with a **NestJS BFF**".

**Interpretation:** Presents repository as micro-frontend architecture with Module Federation and BFF. Claim corroborated.

### 19. README.md:11-16

**Observation:** "SHELL (Host) / Auth · Routing · Layout · State" […] "Dashboard MFE (remote)".

**Interpretation:** Describes shell as host with authentication, routing, layout and state, and dashboard as remote. Claim corroborated.

### 20. README.md:14-16

**Observation:** "Chat MFE (remote)" […] "Tools MFE (remote)".

**Interpretation:** Claims two remotes beyond dashboard. They only appear commented in configuration and as route placeholders. Claim contradicted.

### 21. README.md:21-22

**Observation:** "SHARED PACKAGES (via Federation) / @ai-portal/ui-kit · @ai-portal/shared-types".

**Interpretation:** Claims internal packages are shared through federation. Claim corroborated.

### 22. README.md:25-30

**Observation:** "BROWSER" […] "▼" […] "BFF (NestJS) / /api/auth · /api/chat · ...".

**Interpretation:** Claims browser units call BFF. BFF exists with these routes, but no frontend unit calls it. Claim contradicted.

### 23. README.md:46

**Observation:** "MFE Admin | 3004 | Admin panel".

**Interpretation:** Claims MFE Admin with own port. No directory, route or active remote exists. Claim contradicted.

### 24. README.md:61

**Observation:** "Build Shared Packages (required first!)".

**Interpretation:** Claims application builds depend on prior package builds. Claim corroborated.

### 25. README.md:70

**Observation:** "MFEs must be built before running — Module Federation needs the `remoteEntry.js` file."

**Interpretation:** Claims remote must be built to serve `remoteEntry.js`. Configuration generates file and shell fetches it, but plugin only generating it in build is tool behavior; claim partially corroborated.

### 26. README.md:103

**Observation:** "You should see the Dashboard MFE loaded inside the Shell".

**Interpretation:** Claims dashboard renders inside shell. Claim corroborated.

### 27. README.md:115

**Observation:** "The Shell (host) can run `npm run dev` because it *consumes* remotes, not *exposes* them."

**Interpretation:** Distinguishes module consumer and provider roles. Claim corroborated.

### 28. README.md:142-143

**Observation:** "turbo.json              # Turborepo config" / "package.json            # Workspace root".

**Interpretation:** Describes root as workspace and `turbo.json` as Turborepo configuration. Claim corroborated.

### 29. README.md:150

**Observation:** "MFEs expose components that the Shell loads at runtime".

**Interpretation:** Claims runtime loading of components exposed by remote. Claim corroborated.

### 30. README.md:168

**Observation:** "Packages listed in `shared` are **provided by the Shell** at runtime. MFEs don't bundle their own copies."

**Interpretation:** Claims host provides shared dependencies. Both sides declare them as singletons, but generated bundle is absent from snapshot and dashboard also runs standalone; claim partially corroborated.

### 31. README.md:170

**Observation:** "**Rule:** Shared packages must be installed on the Shell (host)."

**Interpretation:** Claims every shared package is a host dependency. Claim corroborated.

### 32. README.md:183

**Observation:** "Develop MFEs in standalone mode first".

**Interpretation:** Claims remote runs without shell. Claim corroborated.

### 33. README.md:187-196

**Observation:** "Static Assets to CDN" […] "aws s3 sync apps/shell/dist/ s3://cdn/shell/" / "aws s3 sync apps/mfe-dashboard/dist/ s3://cdn/mfe-dashboard/".

**Interpretation:** Describes publishing each application under CDN prefix. Shell fetches remote at `/mfeDashboard/remoteEntry.js`, rather than `mfe-dashboard/assets/`. Claim contradicted.

### 34. README.md:201

**Observation:** "Production: Set CDN_URL for remote URLs".

**Interpretation:** Claims production remote URL comes from `CDN_URL`. Claim corroborated.

### 35. README.md:207

**Observation:** "Each app has independent quality metrics. See `sonar-project.properties` in each app directory."

**Interpretation:** Claims independent quality metrics per application. File exists in no directory. Claim contradicted.

### 36. README.md:226-248

**Observation:** "Production Build" […] "docker-compose up -d" […] "Services will be available at: - Shell: http://localhost:3000 - MFE Dashboard: http://localhost:3001".

**Interpretation:** Describes a container per application, each at own address. Claim corroborated.

### 37. README.md:279

**Observation:** "**Module Federation:** @originjs/vite-plugin-federation".

**Interpretation:** Names federation plugin. Claim corroborated.

### 38. apps/mfe-dashboard/nginx.conf:21

**Observation:** "remoteEntry.js - never cache (Shell needs latest)".

**Interpretation:** Claims remote server always delivers latest `remoteEntry.js` to shell. Claim corroborated.

### 39. packages/shared-types/src/index.ts:1

**Observation:** "Shared Types across all MFEs and BFF".

**Interpretation:** Claims types package is common to frontend units and BFF. BFF neither declares nor imports it. Claim contradicted.

### 40. packages/shared-types/src/index.ts:47

**Observation:** "MFE Props - passed from Shell to MFEs".

**Interpretation:** Claims interface `MfeProps` is props contract between shell and remotes. Claim corroborated.

### 41. 2a87116 2026-01-30 (package.json, turbo.json); 26c3601 2026-01-30 (Dockerfiles)

**Observation:** Root `package.json` and `turbo.json` have a single commit, and Dockerfiles, created later, never change. No commit creates or removes CI workflow or script, and none removes a file.

**Interpretation:** No automation invoking `turbo` was ever deleted. Point clarified, dependency remains undetermined.

### 42. 2a87116 2026-01-30 (apps/shell/vite.config.ts, apps/shell/src/vite-env.d.ts); 26c3601 2026-01-30 (docker-compose.yml)

**Observation:** Shell configuration with Chat, Tools and Admin remotes commented and their type declarations have a single commit; so does compose with `mfe-chat` commented. No commit creates directory or file for these remotes.

**Interpretation:** Planned remotes never connected rather than removed remotes. Point clarified.

### 43. 2a87116 2026-01-30 (apps/shell/src/context/AuthContext.tsx); d0748ce 2026-01-30 (apps/shell/src/App.tsx, apps/shell/src/main.tsx, previous versions absent); 912587f 2026-01-30 (apps/mfe-dashboard/src/DashboardApp.tsx, previous version absent)

**Observation:** `AuthContext`, with fictitious user and comments "In real app: … BFF", has a single commit. Other frontend files change in commits announcing moving `AuthProvider` and removing imports.

**Interpretation:** BFF connection has been intent since first presence rather than abandoned call. Point clarified, limited to `AuthContext`.

### 44. 26c3601 2026-01-30 (docker-compose.dev.yml, README.md, version absent); f1fd5b0 2026-01-30 (README.md)

**Observation:** `docker-compose.dev.yml` is created alongside README change and never changes afterward; README changes again in snapshot. Earlier README versions unavailable.

**Interpretation:** Whether `build` + `preview` requirement was already in README when development compose was created is unknown. Uncertainty concerns only past: both instructions differ in snapshot.

### 45. 2a87116 2026-01-30 (apps/shell/vite.config.ts, README.md, version absent); 26c3601 2026-01-30 (README.md, version absent); f1fd5b0 2026-01-30 (README.md)

**Observation:** Shell configuration with `${CDN_URL}/mfeDashboard/remoteEntry.js` has a single commit. README has three, and no earlier version is available.

**Interpretation:** When CDN deployment section entered or whether it already differed from shell is unknown. Uncertainty concerns only past: prefix differs in snapshot.

### 46. 2a87116 2026-01-30, 26c3601 2026-01-30, f1fd5b0 2026-01-30 (README.md; sonar-project.properties, empty log)

**Observation:** `log` of `sonar-project.properties` paths is empty, and no commit has a Sonar file or removes a file.

**Interpretation:** File never existed; README mention does not remain from removed configuration. Point clarified.

### 47. 2a87116 2026-01-30 (packages/shared-types/src/index.ts, apps/bff/package.json); 3ced632 2026-01-30 (apps/bff/src/chat/chat.service.ts)

**Observation:** Types package and BFF manifest have a single commit, and manifest never declared `@ai-portal/shared-types`. Chat service changes in a commit announcing export of BFF own interfaces.

**Interpretation:** BFF sharing has been comment intent since first presence rather than abandoned usage. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/mfe-dashboard/package.json:21) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (apps/shell/package.json:22) | 1 technology | manifest | module-federation | technological | weak | declares #5; declares #6 |
| 3 | 3.4.2 (package.json:18) | 1 technology | manifest | — | context | ambiguous | declares turbo.json:3-25 |
| 4 | 3.4.2 (apps/mfe-dashboard/package.json:21, Evidence); 3.4.3 (apps/mfe-dashboard, Markers and Build); 3.4.4 (apps/shell/src/App.tsx:7, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #4, #8, #10, #12, #13, #16 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #11; configures #15 |
| 5 | 3.4.2 (apps/shell/package.json:22, Evidence); 3.4.3 (apps/shell, Markers and Build); 3.4.4 (apps/shell/src/App.tsx:7, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served), #2 (Artifacts); 3.4.7 #3, #4, #6, #8, #10, #13, #14, #16, #17 (Evidence); 3.4.8 #2 (Origin) | 2 configuration | configuration | module-federation | architectural | strong | configures #12; configures #15 |
| 6 | 3.4.4 (apps/shell/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 7 | 3.4.4 (apps/shell/src/App.tsx:165) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 8 | 3.4.4 (apps/shell/src/App.tsx:172) | 3 code | source code | module-federation | technological | moderate | implements #15 |
| 9 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 10 | 3.4.3 (apps/bff) | 4 structure | directory | — | context | weak | — |
| 11 | 3.4.3 (apps/mfe-dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (packages/shared-types) | 4 structure | directory | — | context | weak | — |
| 14 | 3.4.3 (packages/ui-kit) | 4 structure | directory | — | context | weak | — |
| 15 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #12; links #11 |
| 16 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #11 |
| 17 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #12 |
| 18 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #11; corroborates #12; corroborates #10; corroborates #1; corroborates #2; corroborates #15 |
| 19 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #7; corroborates apps/shell/src/App.tsx:57-118; corroborates apps/shell/src/context/AuthContext.tsx:14-49 |
| 20 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | contradicts #5; contradicts #7; contradicts apps/shell/src/App.tsx:150-158 |
| 21 | 3.4.7 #4 | 7 documentation | documentation | module-federation | technological | weak | corroborates #4; corroborates #5; corroborates apps/shell/src/App.tsx:3; corroborates apps/mfe-dashboard/src/DashboardApp.tsx:2-3; corroborates apps/shell/src/context/AuthContext.tsx:2 |
| 22 | 3.4.7 #5 | 7 documentation | documentation | — | context | weak | contradicts apps/shell/src/context/AuthContext.tsx:14-34 |
| 23 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts #5; contradicts #7; contradicts apps/shell/src/App.tsx:61-66 |
| 24 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates apps/shell/package.json:14-15; corroborates apps/mfe-dashboard/package.json:14-15; corroborates turbo.json:4-6; corroborates #16; corroborates #17 |
| 25 | 3.4.7 #8 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #4; partially corroborates #5; partially corroborates apps/mfe-dashboard/package.json:8-9 |
| 26 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #15 |
| 27 | 3.4.7 #10 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #15; corroborates #5; corroborates #4 |
| 28 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | corroborates #9; corroborates turbo.json:3-25 |
| 29 | 3.4.7 #12 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #6; corroborates #15; corroborates #4 |
| 30 | 3.4.7 #13 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #5; partially corroborates #4; partially corroborates apps/shell/package.json:14-18 |
| 31 | 3.4.7 #14 | 7 documentation | documentation | module-federation | technological | weak | corroborates apps/shell/package.json:14-18; corroborates #5 |
| 32 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates apps/mfe-dashboard/src/main.tsx:7-26 |
| 33 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | contradicts #5; contradicts #4 |
| 34 | 3.4.7 #17 | 7 documentation | documentation | module-federation | technological | weak | corroborates #5; corroborates #15 |
| 35 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | contradicts apps/mfe-dashboard/package.json:6-12; contradicts apps/shell/package.json:6-12 |
| 36 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17 |
| 37 | 3.4.7 #20 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #15 |
| 38 | 3.4.7 #21 | 7 documentation | comment | module-federation | architectural | weak | corroborates #16 |
| 39 | 3.4.7 #22 | 7 documentation | comment | — | context | weak | contradicts apps/bff/package.json:15-30; contradicts apps/bff/src/chat/chat.service.ts:3-16 |
| 40 | 3.4.7 #23 | 7 documentation | comment | — | architectural | weak | corroborates #8; corroborates packages/shared-types/src/index.ts:48-51 |
| 41 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #3 |
| 42 | 3.4.8 #2 | 8 history | history | module-federation | architectural | weak | explains #5; explains #7; explains #20; explains #23 |
| 43 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #22 |
| 44 | 3.4.8 #4 | 8 history | history | module-federation | technological | weak | explains #25 |
| 45 | 3.4.8 #5 | 8 history | history | module-federation | architectural | weak | explains #33 |
| 46 | 3.4.8 #6 | 8 history | history | — | architectural | weak | explains #35 |
| 47 | 3.4.8 #7 | 8 history | history | — | context | weak | explains #39 |

## Summary

Observations: 47. Dimensions (technology: 3, configuration: 2, code: 3, structure: 6, composition: 1, build-deploy: 2, documentation: 23, history: 7). Strength (strong: 4, moderate: 6, weak: 36, ambiguous: 1). Evidence (technological: 11, architectural: 25, context: 11).

