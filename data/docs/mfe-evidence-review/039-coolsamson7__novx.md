---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

# 039 — coolsamson7/novx

## Repository overview

Nx monorepo containing React portal framework (`libs/portal`, with `libs/core`, `libs/i18n` and `libs/communication`) and reference app with two applications, shell `apps/app` and remote `apps/microfrontend`. Composition mechanism resides in library, instance is app pair:
- **Configuration:** shell webpack declares remote `microfrontend` (#10); remote webpack declares same name/exposes `./Module` and `./MicrofrontendFeature` (#11); remote `manifest.json` lists feature/component (#12).
- **Code:** shell names remote/URL in `applicationConfig` (#21). Library fetches remote manifest (#22), injects `remoteEntry.js` (#20), initializes container (#15, #16), obtains exposed module/component (#17, #18, #19). Outlet renders loaded component (#23).
- **Relationship:** active `apps/app` → `apps/microfrontend` through Module Federation (#33), between shell (#25) and remote (#26).

Potentially misleading:
- Nine dependencies are Nx tools (#1 through #9), no declared MFE technology. Module Federation comes from webpack itself.
- Shell static `remotes` (#10) declares remote, but actual loading path is library through script/`window[scope]` (#20, #16).
- Four libraries, `tools/metadata` and `ui` are not frontend units (#27 through #32). `libs/portal` contains mechanism but is published library.
- Two webpack-global type declarations (#13, #14) execute nothing.

Remote as own application remains ambiguous: webpack entry is empty module, `HtmlWebpackPlugin` commented (#26). History shows `main`/`index` and `entry` from different stages without establishing prior standalone execution (#45). Remote role unaffected.

Both apps have separate builds (#34, #35). Only shell publishes to GitHub Pages, where remote feature does not load because remote remains at `localhost:3001`.

Documentation presents portal as microfrontend framework (#37), describes federated outlets/case and shell/microfrontend showcase, all corroborated (#38, #41, #43). Server-side logic (#39)/build parser (#40) claims partial; production server component lacks artifact (#42). History shows server never in repository (#46), but not whether build previously depended on scan (#47) or when `@nrwl/eslint-plugin-nx` entered (#44).

## Observations

### 1. package.json:14

**Observation:** `@nrwl/eslint-plugin-nx` (`^19.8.4`) declared in `devDependencies`, without import, plugin or snapshot invocation.

**Interpretation:** Declared unused monorepo tool rather than MFE technology.

### 2. package.json:15; nx.json:18-22; apps/app/project.json:56-61

**Observation:** `@nx/eslint` (`22.5.3`) declared in `devDependencies`. Plugin in `nx.json`, executor of project `lint` targets.

**Interpretation:** Monorepo tool in use rather than MFE technology.

### 3. package.json:16; eslint.config.mjs:1-6, 13

**Observation:** `@nx/eslint-plugin` (`22.5.3`) declared in `devDependencies`. ESLint configuration imports it/applies `@nx/enforce-module-boundaries`.

**Interpretation:** Monorepo tool in use rather than MFE technology.

### 4. package.json:17; nx.json:18-19; libs/portal/project.json:32-41

**Observation:** `@nx/js` (`22.5.3`) declared in `devDependencies`. Plugin in `nx.json`, executor of `build:types` target in `libs/portal`.

**Interpretation:** Monorepo tool in use rather than MFE technology.

### 5. package.json:18; nx.json:18-20; libs/portal/project.json:8-31

**Observation:** `@nx/rollup` (`22.5.3`) declared in `devDependencies`. Plugin in `nx.json`, executor of library `build` targets.

**Interpretation:** Monorepo tool building libraries rather than MFE technology.

### 6. package.json:19; apps/app/vitest.config.ts:2, 7-8

**Observation:** `@nx/vite` (`22.5.3`) declared in `devDependencies`. `nxViteTsPaths` imported/used in shell Vitest `plugins`.

**Interpretation:** Monorepo tool used in tests rather than MFE technology.

### 7. package.json:20; apps/app/project.json:62-67; apps/microfrontend/project.json:38-44

**Observation:** `@nx/vitest` (`22.5.3`) declared in `devDependencies`. Executor of project `test` targets.

**Interpretation:** Monorepo tool used in tests rather than MFE technology.

### 8. package.json:21; apps/app/project.json:14-21, 39-44; apps/microfrontend/project.json:14-30

**Observation:** `@nx/webpack` (`22.5.3`) declared in `devDependencies`. Executor of both apps’ `build` and `serve` targets, each with own `webpack.config.js`.

**Interpretation:** Monorepo tool running each app’s webpack. Federation in `webpack.config.js` (#10, #11), not dependency.

### 9. package.json:44; .github/workflows/ci.yml:31-33; nx.json:18-44

**Observation:** `nx` (`22.5.3`) declared in `devDependencies`. CI runs `pnpm nx run-many -t lint test build`, `nx.json` configuring plugins, `release` and `targetDefaults`.

**Interpretation:** Project-coordinating monorepo tool rather than MFE technology.

### 10. apps/app/webpack.config.js:6-11, 78-95

**Observation:** `ModuleFederationPlugin` declares `name: "app"`, `filename: "remoteEntry.js"` and remote `microfrontend: "microfrontend@http://localhost:3001/remoteEntry.js"`. Shares `eager` singletons `react`, `react-dom`, `react-router-dom`, `react/jsx-runtime`, `reflect-metadata` and four `@novx/*` libraries.

**Interpretation:** Host configuration declares remote `microfrontend`/development location. Framework libraries are shared dependencies rather than units.

### 11. apps/microfrontend/webpack.config.js:5-10, 53-69

**Observation:** `ModuleFederationPlugin` declares `name: 'microfrontend'` and `filename: 'remoteEntry.js'`, exposing `./Module` (`./apps/microfrontend/src/Module`) and `./MicrofrontendFeature` (`./apps/microfrontend/src/feature`), sharing same libraries as `eager` singletons.

**Interpretation:** `apps/microfrontend` configured as remote offering module/feature to host.

**Note:** Dev-server port 3001 (line 18), cited in 3.4.5/3.4.6, is marked "só corrobora" (English translation: "only corroborates") by 3.4.5 itself; `output` (lines 26-30) is build. Neither enters this observation.

### 12. apps/microfrontend/public/manifest.json:1-28

**Observation:** Manifest declares `"id": "microfrontend"`, feature with `"path": "/microfrontend/feature"` and `"component": "MicrofrontendFeature"`, plus `"moduleName": "MicrofrontendModule"`.

**Interpretation:** Remote describes own feature/serving component in manifest portal fetches at runtime.

### 13. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:11

**Observation:** `declare function __webpack_init_sharing__(scope: string): Promise<void>`, under "Webpack MF globals" comment.

**Interpretation:** Only declares Module Federation global type to TypeScript. Does not participate in composition.

### 14. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:12

**Observation:** `declare const __webpack_share_scopes__: { default: unknown }`.

**Interpretation:** Only declares Module Federation global type to TypeScript. Does not participate in composition.

### 15. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46

**Observation:** `await __webpack_init_sharing__('default')` within `initializeRemote(scope)`.

**Interpretation:** Framework initializes shared scope before starting parameter-received remote container.

### 16. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54

**Observation:** `await remoteContainer.init(__webpack_share_scopes__.default)`, container obtained from `window[scope]` (line 47).

**Interpretation:** Framework initializes container of parameter-named remote.

### 17. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57

**Observation:** `loadRemoteModule(scope, module, url)` loads `${url}/remoteEntry.js`, initializes container/obtains requested module factory through `window[scope].get(...)`.

**Interpretation:** Framework generic federated-module loader receiving remote as parameter.

### 18. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106

**Observation:** `RemoteComponentLoader.loadRemoteModule(feature.module!, './Module', feature.uri!)`.

**Interpretation:** Framework requests root module `./Module` from feature-indicated remote.

### 19. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137

**Observation:** ``outlet.component = await RemoteComponentLoader.loadRemoteModule(feature.module!, `./${feature.component}`, feature.uri!)``.

**Interpretation:** Framework obtains remote feature component, delivering to outlet.

### 20. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32

**Observation:** `document.createElement('script')` with `script.src = url` and `document.head.appendChild(script)` in `loadRemoteEntry`.

**Interpretation:** Framework loads remote `remoteEntry.js` through dynamic script.

### 21. apps/app/src/environments/environments.ts:8

**Observation:** `{ name: 'microfrontend', url: 'http://localhost:3001' }` in `remotes` list of deployment `microfrontend`, active deployment (line 2).

**Interpretation:** Shell code declares used remote/location.

### 22. libs/portal/src/lib/loader/remote-loader.ts:28

**Observation:** ``fetch(`${remote.url}/manifest.json`)``, followed by recording `id`, `uri` and `module` with remote name/URL (lines 39-41).

**Interpretation:** Framework discovers features of each received-list remote through manifest.

### 23. libs/portal/src/lib/feature-outlet.tsx:245

**Observation:** `<LoadedWrapper Component={Loaded} feature={feature} />` within loaded module `EnvironmentContext.Provider`.

**Interpretation:** Outlet renders loader-loaded component. In federated path component originates in remote.

### 24. .; package.json:1-78

**Observation:** Workspace root with nx-delegating scripts only (`package.json:8-10`), without UI entry/build.

**Interpretation:** Monorepo coordination root rather than unit.

### 25. apps/app; apps/app/package.json:1-18; apps/app/project.json:14-38; apps/app/webpack.config.js:14, 96-98; apps/app/src/main.tsx:27-32

**Observation:** React application with own manifest/Nx project, `main.tsx` entry mounting UI through `createRoot(...).render(<App />)`, webpack build with `HtmlWebpackPlugin`.

**Interpretation:** Frontend unit with own boundary, shell.

### 26. apps/microfrontend; apps/microfrontend/package.json:1-14; apps/microfrontend/project.json:14-23; apps/microfrontend/webpack.config.js:13-14, 70-72; apps/microfrontend/src/bootstrap.ts:1; apps/microfrontend/src/main.tsx:1-7

**Observation:** Own manifest, Nx project/webpack build. Webpack entry `bootstrap.ts` contains only `export {};`; `main.tsx` from `project.json` only imports without render; `HtmlWebpackPlugin` commented.

**Interpretation:** Two plausible readings: frontend unit running alone through unavailable snapshot path, or remote-module container without own UI. Remote role independent of question.

### 27. libs/communication; libs/communication/package.json:1-4; libs/communication/project.json:8-9

**Observation:** `@novx/communication` ("Communication library"), Rollup build/npm publication through `release.sh`, no application entry.

**Interpretation:** Library rather than frontend unit.

### 28. libs/core; libs/core/package.json:1-4; libs/core/project.json:8-9

**Observation:** `@novx/core` ("DI and AOP library"), Rollup build/npm publication through `release.sh`, no application entry.

**Interpretation:** Library rather than frontend unit.

### 29. libs/i18n; libs/i18n/package.json:1-4; libs/i18n/project.json:8-9

**Observation:** `@novx/i18n` ("i18n library"), Rollup build/npm publication through `release.sh`, no application entry.

**Interpretation:** Library rather than frontend unit.

### 30. libs/portal; libs/portal/package.json:1-4; libs/portal/project.json:8-31

**Observation:** `@novx/portal` ("Portal library"), Rollup build from `src/index.ts`, npm publication through `release.sh`, no application entry.

**Interpretation:** Library containing composition mechanism (#15 through #23) rather than frontend unit.

### 31. tools/metadata; tools/metadata/package.json:1-8; tools/metadata/project.json:6-16

**Observation:** `@tools/metadata`, with `bin: build-metadata` and targets `build` (`tsc`) and `scan` (`tsx`).

**Interpretation:** Manifest-generating build tool rather than frontend unit.

### 32. ui; ui/package.json:1-4, 35; ui/rollup.config.json:1-13

**Observation:** `@novx/ui` ("ui library"), Rollup library configuration outside pnpm workspace, no active `project.json` (only `ui/project.json.txt`).

**Interpretation:** Disabled library rather than frontend unit.

### 33. apps/app/src/environments/environments.ts:8; apps/app/webpack.config.js:82-84; apps/microfrontend/webpack.config.js:54-58; apps/microfrontend/public/manifest.json:2-10; libs/portal/src/lib/loader/remote-loader.ts:28; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32, 46, 54, 57, 106, 137; libs/portal/src/lib/feature-outlet.tsx:245; apps/app/src/module.ts:226, 262, 317

**Observation:** Shell declares remote `microfrontend` at `http://localhost:3001`, instantiating portal loaders. Name matches remote container `name`/manifest `id`, requested modules `./Module` and `./MicrofrontendFeature` matching exposures.

**Interpretation:** Active Module Federation host → remote relationship loaded at runtime by portal framework.

### 34. apps/app/project.json:14-38; apps/app/webpack.config.js:18-23; .github/workflows/docs.yml:34-37, 48-57, 59-69

**Observation:** Own `build` target/output `dist/apps/app`. Docs workflow builds only this app in production, copying output to `sample/`, publishing to GitHub Pages.

**Interpretation:** Own build/deployment boundaries. Published version points remote to `localhost:3001`.

### 35. apps/microfrontend/project.json:14-23; apps/microfrontend/webpack.config.js:26-30; .github/workflows/ci.yml:33

**Observation:** Own `build` target/output. CI builds with other projects without publication; only port 3001 dev server serves it.

**Interpretation:** Own build boundary without observed deployment.

### 36. README.md:9

**Observation:** "NOVX is a monorepo covering a number of Typescript and React solutions in individual packages".

**Interpretation:** Describes repository as package monorepo, listing four libraries without frontend-unit claim. Claim corroborated.

### 37. README.md:14

**Observation:** "[portal]...a react microfrontend framework".

**Interpretation:** Presents `portal` package as microfrontend framework. Claim corroborated.

### 38. libs/portal/README.md:14

**Observation:** "feature outlets that cover both local and federated components and allow for custom async preloading logic".

**Interpretation:** Claims framework outlets render local/federated components. Claim corroborated.

### 39. libs/portal/README.md:15

**Observation:** "custom application configurations with support for both client and server side logic".

**Interpretation:** Claims feature configuration can originate client/server. Client side of `service` mode exists, server absent. Claim partial.

### 40. libs/portal/README.md:36

**Observation:** "A parser - as part of the build - will locate those features and generate a `manifest.json`".

**Interpretation:** Claims manifest generated in build. `scan-metadata` target exists in both apps but no `build` depends on it. Claim partial.

### 41. libs/portal/README.md:205-212

**Observation:** "Federated modules will take a similar approach... The main application will only need to change the corresponding deployment loader to integrate it" / "the manifest is fetched dynamically from the known url and merged with the local manifest".

**Interpretation:** Describes main application integrating federated modules through each remote manifest. Claim corroborated.

### 42. libs/portal/README.md:214-216

**Observation:** "in production the logic would be handed over to a server component that is aware of different microfrontends and configurations also including more sophisticated logic to filter features according to feature flags".

**Interpretation:** Projects production server component. No artifact confirms/contradicts it; claim uncorroborated.

### 43. libs/portal/README.md:220

**Observation:** "A showcase app shows a shell and a microfreontend".

**Interpretation:** Describes reference app as shell/microfrontend. Claim corroborated.

### 44. d1267d3 2026-02-24 (package.json, version absent); 8e0388e 2026-03-16 (package.json)

**Observation:** `package.json` appears in `d1267d3`, changes in 32 commits. `8e0388e` version is snapshot’s, already declaring dependency; earlier versions/first `eslint.config.mjs` version unavailable.

**Interpretation:** Unknown when `@nrwl/eslint-plugin-nx` entered or prior use. Past-only question: dependency unused in snapshot.

### 45. 45b448f 2026-02-26 (apps/microfrontend/src/main.tsx, src/index.html); ed4e20e 2026-02-26 (apps/microfrontend/project.json, webpack.config.js); 3086f67 2026-02-26 (apps/microfrontend/index.html, project.json); c46ce96 2026-02-27 (apps/microfrontend/webpack.config.js); dd4543f 2026-02-27 (apps/microfrontend/src/bootstrap.ts); 5d8c3af 2026-03-06 (apps/microfrontend/webpack.config.js)

**Observation:** `main.tsx` and `src/index.html` from initial app stage; `src/index.html` moved in `3086f67`, never returns. `bootstrap.ts` with `export {};` created in `dd4543f` just after webpack change. Old webpack/`project.json` versions unavailable.

**Interpretation:** `main`/`index` from `project.json` and webpack `entry` originate in different stages. Point clarified regarding stages, history not establishing prior remote standalone execution.

### 46. d668c15 2026-02-26 (libs/portal/src/lib/loader/service-loader.ts, libs/portal/src/lib/service/)

**Observation:** Client of `service` mode enters in `d668c15`, unchanged through snapshot. No consulted tree has server directory.

**Interpretation:** Repository contained client side only since `service` mode introduction. Point clarified.

### 47. 073c63f 2026-02-26 (tools/metadata, apps/app/project.json, version absent); 3086f67 2026-02-26 (apps/microfrontend/public/manifest.json); 144cc29 2026-02-27 (apps/microfrontend/public/manifest.json); 9c90397 2026-03-06 (tools/metadata); 5d8c3af 2026-03-06 (apps/microfrontend/webpack.config.js)

**Observation:** `tools/metadata` enters in `073c63f`, changes once. Remote manifest moved from `src/` to `public/` in `3086f67`, but scan `outFile` still points to `src/manifest.json`. Old `project.json`/`nx.json` versions unavailable.

**Interpretation:** Unknown whether `build` previously depended on `scan-metadata`. Past-only question: no snapshot build depends on it.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:14) | 1 technology | manifest | — | context | weak | — |
| 2 | 3.4.2 (package.json:15) | 1 technology | manifest | — | context | weak | — |
| 3 | 3.4.2 (package.json:16) | 1 technology | manifest | — | context | weak | — |
| 4 | 3.4.2 (package.json:17) | 1 technology | manifest | — | context | weak | — |
| 5 | 3.4.2 (package.json:18) | 1 technology | manifest | — | context | weak | — |
| 6 | 3.4.2 (package.json:19) | 1 technology | manifest | — | context | weak | — |
| 7 | 3.4.2 (package.json:20) | 1 technology | manifest | — | context | weak | — |
| 8 | 3.4.2 (package.json:21) | 1 technology | manifest | — | context | weak | — |
| 9 | 3.4.2 (package.json:44) | 1 technology | manifest | — | context | weak | — |
| 10 | 3.4.3 (apps/app, Markers, Entry and Build); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #25; configures #33 |
| 11 | 3.4.3 (apps/microfrontend, Markers, Entry and Build); 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54, :106, :137, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #33 |
| 12 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137; libs/portal/src/lib/loader/remote-loader.ts:28, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | — | technological | moderate | configures #26; configures #33 |
| 13 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:11) | 3 code | source code | module-federation | technological | weak | — |
| 14 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:12) | 3 code | source code | module-federation | technological | weak | — |
| 15 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 16 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 17 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 18 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 19 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 20 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 21 | 3.4.4 (apps/app/src/environments/environments.ts:8) | 3 code | source code | — | architectural | strong | implements #33 |
| 22 | 3.4.4 (libs/portal/src/lib/loader/remote-loader.ts:28) | 3 code | source code | — | technological | moderate | implements #33 |
| 23 | 3.4.4 (libs/portal/src/lib/feature-outlet.tsx:245) | 3 code | source code | — | technological | moderate | implements #33 |
| 24 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 25 | 3.4.3 (apps/app) | 4 structure | directory | — | architectural | moderate | — |
| 26 | 3.4.3 (apps/microfrontend) | 4 structure | directory | — | architectural | ambiguous | — |
| 27 | 3.4.3 (libs/communication) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (libs/core) | 4 structure | directory | — | context | weak | — |
| 29 | 3.4.3 (libs/i18n) | 4 structure | directory | — | context | weak | — |
| 30 | 3.4.3 (libs/portal) | 4 structure | directory | — | context | weak | — |
| 31 | 3.4.3 (tools/metadata) | 4 structure | directory | — | context | weak | — |
| 32 | 3.4.3 (ui) | 4 structure | directory | — | context | weak | — |
| 33 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #25; links #26 |
| 34 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #25 |
| 35 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #26 |
| 36 | 3.4.7 #1 | 7 documentation | documentation | — | context | weak | corroborates pnpm-workspace.yaml:1-3; corroborates nx.json:18-44 |
| 37 | 3.4.7 #2 | 7 documentation | documentation | — | technological | weak | corroborates #25; corroborates #33 |
| 38 | 3.4.7 #3 | 7 documentation | documentation | module-federation | technological | weak | corroborates #18; corroborates #19; corroborates #23; corroborates #33 |
| 39 | 3.4.7 #4 | 7 documentation | documentation | — | technological | weak | partially corroborates apps/app/src/module.ts:221-228; partially corroborates libs/portal/src/lib/loader/service-loader.ts:15-16; partially corroborates libs/portal/src/lib/service/PortalService.ts:28-41; partially corroborates apps/app/src/environments/environments.ts:2-5 |
| 40 | 3.4.7 #5 | 7 documentation | documentation | — | technological | weak | partially corroborates apps/app/project.json:9-14; partially corroborates apps/microfrontend/project.json:9-14; partially corroborates #31 |
| 41 | 3.4.7 #6 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #33; corroborates #21; corroborates #22 |
| 42 | 3.4.7 #7 | 7 documentation | documentation | — | context | weak | — |
| 43 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #33 |
| 44 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #1 |
| 45 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #26 |
| 46 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #39 |
| 47 | 3.4.8 #4 | 8 history | history | — | technological | weak | explains #40 |

## Summary

Observations: 47. Dimensions (technology: 9, configuration: 3, code: 11, structure: 9, composition: 1, build-deploy: 2, documentation: 8, history: 4). Strength (strong: 3, moderate: 13, weak: 30, ambiguous: 1). Evidence (technological: 17, architectural: 10, context: 20).

