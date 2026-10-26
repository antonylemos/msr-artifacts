---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
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

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Repository overview

Five npm projects without a workspace: a React host and four remotes, two React, one Vue and one Angular (#31 through #35). The root only orchestrates installation, building and copying `dist` outputs (#30). The Module Federation chain is complete:
- **Dependency:** only Angular declares an MFE technology, `@angular-architects/module-federation` (#1). The other four projects use webpack's own `ModuleFederationPlugin`, without a separate dependency.
- **Configuration:** each remote declares itself, generates `remoteEntry.js` and exposes `./mount` (#2, #4 through #6). The host names the four remotes, using local ports in development and subpaths of the same domain in production (#3). Angular is loaded through `promise import(...)` (#11).
- **Code:** the host imports `<remote>/mount` in a navigation list (#7 through #10), generates a route per entry (#27) and calls `mount(container)` with the received function (#19). Each remote implements the same `mount(element)` contract using its framework (#23, #25, #28, #29).
- **Relationships:** this results in four active host → remote relationships (#36 through #39).

Alongside the federated core, the host displays two external applications in `<iframe>`, declared in their own list (#24, #26). These are two active relationships with targets outside the snapshot (#40, #41), with no contract beyond the URL.

Misleading signals: the mining pattern matched seven comment lines describing constructs in prose (#12 through #14, #20 through #22), and the units' `import('./bootstrap')` is internal to each (#15 through #18).

Publication remains ambiguous. The five builds are separate (#42 through #46), but there are two Vercel publication paths, a `vercel.json` per directory and the root one with combined `dist`, and the snapshot does not say which is in use. The README describes only the combined path (#71, partially corroborated), and a host comment describes a third arrangement, through environment variables, that the code does not use (#75). History shows the per-directory `vercel.json` files predate the single-domain arrangement (#79). Documentation matches artifacts in almost all composition claims (#48, #51, #56, #57, #62 through #64). It is wrong about the application count (#50), Angular's `publicPath` (#74, clarified in #81) and Vue sharing (#78). History does not explain the origin of the count or the Vue comment (#80, #82).

## Observations

### 1. angular-mfe/package.json:21

**Observation:** `@angular-architects/module-federation` (`^16.0.4`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in the Angular remote build.

### 2. angular-mfe/webpack.config.js:1-38

**Observation:** Partial configuration, merged into Angular CLI configuration. `withModuleFederationPlugin` declares `name: 'angularMfe'`, `filename: 'remoteEntry.js'` and `exposes: { './mount': './src/mount.ts' }`, with `shared` from `shareAll` as singletons, without `zone.js`. In production, `publicPath` is `'/angular-mfe/'`; in development, `'auto'`.

**Interpretation:** The Angular remote is configured as a Module Federation container and offers its mount function to a host.

**Note:** `angular-mfe/angular.json`, cited in the same tables, only points the generic builder `@angular-builders/custom-webpack` to this file (`customWebpackConfig.path`, :13-17), and the `serve` target points to `build`. Neither declares a composition element, so neither became an observation.

### 3. host/webpack.config.js:1-96

**Observation:** `angularRemote` is `promise import('/angular-mfe/remoteEntry.js')` in production and `promise import('http://localhost:4200/remoteEntry.js')` in development. The production `remotes` map declares `reactMfe1@/react-mfe-1/remoteEntry.js`, `reactMfe2@/react-mfe-2/remoteEntry.js`, `vueMfe@/vue-mfe/remoteEntry.js` and `angularMfe`; development uses ports 3001 through 3003 and the same `angularMfe`. `ModuleFederationPlugin` with `name: 'host'`, these `remotes` and `shared` with `react`, `react-dom` and `react-redux` as singletons and `@reduxjs/toolkit` with `singleton: false`.

**Interpretation:** The host configuration declares the four local units as remotes and where to find them in each environment.

### 4. react-mfe-1/webpack.config.js:1-69

**Observation:** `ModuleFederationPlugin` with `name: 'reactMfe1'`, `filename: 'remoteEntry.js'`, `exposes: { './mount': './src/mount.js' }` and the same `shared` as the host. `publicPath: 'auto'`; `devServer` on port 3001.

**Interpretation:** The unit is configured as a remote and offers its mount function to a host.

### 5. react-mfe-2/webpack.config.js:1-60

**Observation:** `ModuleFederationPlugin` with `name: 'reactMfe2'`, `filename: 'remoteEntry.js'`, `exposes: { './mount': './src/mount.js' }` and the same `shared` as the host. `publicPath: 'auto'`; `devServer` on port 3002.

**Interpretation:** The unit is configured as a remote and offers its mount function to a host.

### 6. vue-mfe/webpack.config.js:1-76

**Observation:** `ModuleFederationPlugin` with `name: 'vueMfe'`, `filename: 'remoteEntry.js'`, `exposes: { './mount': './src/mount.js' }` and `shared: { vue: { singleton: true } }`. `publicPath: 'auto'`; `devServer` on port 3003.

**Interpretation:** The unit is configured as a remote and offers its mount function to a host.

### 7. host/src/App.jsx:32

**Observation:** `{ label: 'React MFE 1', key: '/react-mfe-1', loader: () => import('reactMfe1/mount'), ... }`, in `MFE_NAV`.

**Interpretation:** The host loads the module exposed by react-mfe-1 at runtime, by name, and associates it with a path.

### 8. host/src/App.jsx:33

**Observation:** `{ label: 'React MFE 2', key: '/react-mfe-2', loader: () => import('reactMfe2/mount'), ... }`, in `MFE_NAV`.

**Interpretation:** The host loads the module exposed by react-mfe-2 at runtime, by name.

### 9. host/src/App.jsx:34

**Observation:** `{ label: 'Vue MFE', key: '/vue-mfe', loader: () => import('vueMfe/mount'), ... }`, in `MFE_NAV`.

**Interpretation:** The host loads the module exposed by vue-mfe at runtime, by name.

### 10. host/src/App.jsx:35

**Observation:** `{ label: 'Angular MFE', key: '/angular-mfe', loader: () => import('angularMfe/mount'), ... }`, in `MFE_NAV`.

**Interpretation:** The host loads the module exposed by angular-mfe at runtime, by name.

### 11. host/webpack.config.js:32

**Observation:** `` : `promise import('http://localhost:4200/remoteEntry.js')`; ``, the development value of `angularRemote`, used in the `remotes` map.

**Interpretation:** The host resolves angular-mfe's `remoteEntry.js` through dynamic import rather than a classic script.

### 12. react-mfe-1/src/mount.js:3

**Observation:** `// The host calls: import('reactMfe1/mount').then(({ default: mount }) => mount(element))`.

**Interpretation:** A comment describing the host call in prose; not code.

### 13. react-mfe-1/webpack.config.js:51

**Observation:** `// Host uses it as: import('reactMfe1/mount')`.

**Interpretation:** A comment about the `exposes` field; not code.

### 14. host/src/index.js:5

**Observation:** `// By using import('./bootstrap'), we ensure everything is initialized before`.

**Interpretation:** A comment explaining asynchronous bootstrap; not code.

### 15. host/src/index.js:7

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to the host.

### 16. react-mfe-1/src/index.js:3

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to the unit.

### 17. react-mfe-2/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to the unit.

### 18. vue-mfe/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to the unit.

### 19. host/src/App.jsx:61

**Observation:** `mount(container);`, inside `MfeContainer`, after `loader().then(({ default: mount }) => ...)` (:59-60). `loader` arrives through a prop.

**Interpretation:** The host mounts the remote unit supplied by the route in its own `div`.

### 20. react-mfe-1/src/mount.js:3

**Observation:** The same comment line as #12, found by another pattern.

**Interpretation:** A comment; not code.

### 21. react-mfe-1/webpack.config.js:9

**Observation:** ` *   2. Exposes the ./mount module so the host can call mount(element)`.

**Interpretation:** A configuration header comment; not code.

### 22. vue-mfe/src/mount.js:4

**Observation:** `// app.mount(element) renders it into the container element provided by the host.`.

**Interpretation:** A comment describing mounting; not code.

### 23. vue-mfe/src/mount.js:10

**Observation:** `app.mount(element);`, inside `const mount = (element) =>` (:8-11), exported as `default`.

**Interpretation:** The Vue remote mounts its own application in the element supplied by the host.

### 24. host/src/App.jsx:97

**Observation:** `<iframe src={url}>`, in `IframeView({ url })` (:95-103).

**Interpretation:** The host embeds the application whose URL it receives through an iframe.

### 25. angular-mfe/src/mount.ts:20

**Observation:** `const mount = (element: HTMLElement): void =>` creates an `<app-root>` inside the element and bootstraps `AppModule` only on the first call (:20-32), exported as `default`.

**Interpretation:** The Angular remote mounts its own application in the element supplied by the host.

### 26. host/src/App.jsx:38-41

**Observation:** `IFRAME_NAV` declares `Route Map` at `/route-map` with `url: 'https://route-map-five.vercel.app/'` and `Multibank` at `/multibank` with `url: 'https://multibank-1.onrender.com/'`.

**Interpretation:** The host declares the two external applications it embeds and their routes.

### 27. host/src/App.jsx:178-188

**Observation:** `MFE_NAV.map(({ key, loader }) => <Route path={key} element={... <MfeContainer loader={loader} /> ...} />)`.

**Interpretation:** The host route table links each remote unit path to its loader.

### 28. react-mfe-1/src/mount.js:11

**Observation:** `const mount = (element) =>` creates the React root in the element and renders `App` with the unit store (:11-18), exported as `default`.

**Interpretation:** The remote mounts its own application in the element supplied by the host.

### 29. react-mfe-2/src/mount.js:7

**Observation:** `const mount = (element) =>` creates the React root in the element and renders `App` (:7-14), exported as `default`.

**Interpretation:** The remote mounts its own application in the element supplied by the host.

### 30. .; package.json:1-17; vercel.json:2-3

**Observation:** The root manifest, without a workspace, with scripts installing, starting, building and copying the five projects (:7-12), and `vercel.json` publishing the combined `dist`. It has no entry or build configuration of its own.

**Interpretation:** The coordination root rather than a frontend unit.

### 31. angular-mfe; angular-mfe/package.json; angular-mfe/angular.json:12-20; angular-mfe/src/main.ts:7-9; angular-mfe/vercel.json:2-3

**Observation:** An Angular application with its own manifest, `build` target outputting `dist/angular-mfe`, `src/main.ts` entry and `ng build`.

**Interpretation:** A frontend unit with its own boundary.

### 32. host; host/package.json:8; host/webpack.config.js:49; host/src/index.js:7; host/vercel.json:2-3

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** A frontend unit with its own boundary, in the host role.

### 33. react-mfe-1; react-mfe-1/package.json:8; react-mfe-1/webpack.config.js:12; react-mfe-1/src/index.js:3; react-mfe-1/vercel.json:2-3

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 34. react-mfe-2; react-mfe-2/package.json:8; react-mfe-2/webpack.config.js:11; react-mfe-2/src/index.js:1; react-mfe-2/vercel.json:2-3

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 35. vue-mfe; vue-mfe/package.json:8; vue-mfe/webpack.config.js:13; vue-mfe/src/index.js:1; vue-mfe/vercel.json:2-3

**Observation:** A Vue application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 36. host/src/App.jsx:32, 61, 178; react-mfe-1/src/mount.js:11; host/webpack.config.js:36, 42, 80-82; react-mfe-1/webpack.config.js:45-54

**Observation:** The host imports `reactMfe1/mount`, calls the function with its `div` when route `/react-mfe-1` opens, and the remote creates the React root there. Remote `reactMfe1` points to `/react-mfe-1/remoteEntry.js` or `localhost:3001/remoteEntry.js`, and its name and exposed `./mount` match react-mfe-1.

**Interpretation:** An active host → remote relationship.

### 37. host/src/App.jsx:33, 61, 178; react-mfe-2/src/mount.js:7; host/webpack.config.js:37, 43, 80-82; react-mfe-2/webpack.config.js:43-47

**Observation:** Same form as #36, with `reactMfe2/mount`, route `/react-mfe-2` and addresses `/react-mfe-2/remoteEntry.js` or `localhost:3002/remoteEntry.js`.

**Interpretation:** An active host → remote relationship.

### 38. host/src/App.jsx:34, 61, 178; vue-mfe/src/mount.js:10; host/webpack.config.js:38, 44, 80-82; vue-mfe/webpack.config.js:59-63

**Observation:** Same form as #36, with `vueMfe/mount`, route `/vue-mfe` and addresses `/vue-mfe/remoteEntry.js` or `localhost:3003/remoteEntry.js`. The remote mounts a Vue application in the host element.

**Interpretation:** An active host → remote relationship between different frameworks.

### 39. host/src/App.jsx:35, 61, 178; host/webpack.config.js:30-32, 39, 45, 80-82; angular-mfe/src/mount.ts:20; angular-mfe/webpack.config.js:23-28, 36

**Observation:** The host imports `angularMfe/mount` and resolves it through `promise import(...)` from `/angular-mfe/remoteEntry.js` or `localhost:4200/remoteEntry.js`. The key matches `name: 'angularMfe'`, and the production path matches the remote's `publicPath`. `mount` bootstraps `AppModule` in the host element.

**Interpretation:** An active host → remote relationship between different frameworks.

### 40. host/src/App.jsx:38, 40, 97, 191-197

**Observation:** The `Multibank` entry of `IFRAME_NAV` links `/multibank` to an `<iframe src="https://multibank-1.onrender.com/">`. There is no configuration or other contract beyond the URL, and the target is not in the snapshot.

**Interpretation:** An active iframe relationship with an external target.

### 41. host/src/App.jsx:38-39, 97, 191-197

**Observation:** The `Route Map` entry of `IFRAME_NAV` links `/route-map` to an `<iframe src="https://route-map-five.vercel.app/">`. There is no configuration or other contract beyond the URL, and the target is not in the snapshot.

**Interpretation:** An active iframe relationship with an external target.

### 42. angular-mfe/angular.json:12-18; angular-mfe/package.json:8; angular-mfe/vercel.json:2-3; package.json:9, 11; vercel.json:2-3

**Observation:** `ng build` with its own output in `dist/angular-mfe`. The directory's `vercel.json` only publishes this `dist`; the root one publishes it copied to `dist/angular-mfe`, alongside the other four.

**Interpretation:** There is a separate build boundary. Two deployment readings remain plausible, a separate Vercel project or joint deployment on one domain; Angular's fixed `publicPath` only works with joint deployment.

### 43. host/webpack.config.js:48-49; host/package.json:8; host/vercel.json:2-3; package.json:10, 11; vercel.json:2-3

**Observation:** `webpack --mode production` with its own configuration and `dist`. The directory's `vercel.json` only publishes this `dist`; the root one puts it at the root of the combined `dist`. Production remotes are recorded in the build as paths on the same domain.

**Interpretation:** There is a separate build boundary, with deployment undetermined between the two paths.

### 44. react-mfe-1/webpack.config.js:11-12; react-mfe-1/package.json:8; react-mfe-1/vercel.json:2-18; package.json:9, 11; vercel.json:2-3

**Observation:** `webpack --mode production` with its own `dist`. The directory's `vercel.json` publishes it separately, with CORS for `remoteEntry.js`; the root one publishes it under `/react-mfe-1/` in the combined `dist`.

**Interpretation:** There is a separate build boundary, with deployment undetermined between the two paths.

### 45. react-mfe-2/webpack.config.js:10-11; react-mfe-2/package.json:8; react-mfe-2/vercel.json:2-18; package.json:9, 11; vercel.json:2-3

**Observation:** Same arrangement as #44, with subdirectory `/react-mfe-2/`.

**Interpretation:** There is a separate build boundary, with deployment undetermined between the two paths.

### 46. vue-mfe/webpack.config.js:12-13; vue-mfe/package.json:8; vue-mfe/vercel.json:2-18; package.json:9, 11; vercel.json:2-3

**Observation:** Same arrangement as #44, with vue-loader and subdirectory `/vue-mfe/`.

**Interpretation:** There is a separate build boundary, with deployment undetermined between the two paths.

### 47. README.md:3

**Observation:** "Live Demo → https://microfrontend-beta.vercel.app".

**Interpretation:** Gives the published application address. No snapshot artifact records this domain, and the claim remains uncorroborated.

### 48. README.md:5-6

**Observation:** "A hands-on example showing how to build a **Microfrontend architecture** with **Webpack 5 Module Federation**".

**Interpretation:** Presents the repository as a micro-frontend architecture with Module Federation. The claim is corroborated.

### 49. README.md:6

**Observation:** "independent apps".

**Interpretation:** Claims the applications are independent. Confirmed for the five local ones; the two external ones have no artifact in the snapshot. The claim is partially corroborated.

### 50. README.md:6-7

**Observation:** "one host shell and five child apps (React, Vue, Angular, and two external apps)".

**Interpretation:** Counts the host child applications. The host has six targets, four local remotes and two external applications, and the claim is contradicted.

### 51. README.md:7-8

**Observation:** "all stitched together at runtime in a single browser window".

**Interpretation:** Claims the host composes applications at runtime on the same page. The claim is corroborated.

### 52. README.md:42-58

**Observation:** Diagram "Host App (http://localhost:3005)" containing "React MFE", "Angular MFE", "React MFE2" and "Vue MFE".

**Interpretation:** Describes the host with the four local remotes. The claim is corroborated.

### 53. README.md:64-66

**Observation:** "Create each app independently" / "Each MFE was created as a standalone app".

**Interpretation:** Claims each application runs standalone. The claim is corroborated.

### 54. README.md:67-70

**Observation:** "`react-mfe-1` and `react-mfe-2` — plain React + Babel + Webpack. `vue-mfe` — Vue 3 + vue-loader + Webpack. `angular-mfe` — Angular CLI 16 + `@angular-architects/module-federation`. `host` — React + Webpack".

**Interpretation:** Names each application stack. The claim is corroborated.

### 55. README.md:74-75

**Observation:** "Every MFE's `webpack.config.js` was given a `ModuleFederationPlugin` block that **exposes** a `mount` function".

**Interpretation:** Claims each remote exposes a `mount` function through Module Federation. The claim is corroborated.

### 56. README.md:89-91

**Observation:** "Each MFE exports a `mount(element)` function" / "This is the **contract** between every MFE and the host — framework-agnostic".

**Interpretation:** Describes the common contract between host and remotes. The claim is corroborated.

### 57. README.md:119

**Observation:** "`host/webpack.config.js` declares the MFEs as **remotes**".

**Interpretation:** Claims the host configuration declares the remotes. The claim is corroborated.

### 58. README.md:136-137

**Observation:** "`react-router-dom` v6 was added to the host so each MFE (and external app) gets its own URL route".

**Interpretation:** Claims each composed application has a route in the host. The claim is corroborated.

### 59. README.md:142-143

**Observation:** "A root `package.json` uses `concurrently` to start all five apps with a single command".

**Interpretation:** Describes a root development convenience. The claim is corroborated.

### 60. README.md:153-189

**Observation:** Tree with "host/ ← Shell/container (React + react-router-dom)", "react-mfe-1/ ← React MFE — Counter app", "react-mfe-2/ ← React MFE — User Greeting", "vue-mfe/ ← Vue 3 MFE — Theme Switcher" and "angular-mfe/ ← Angular 16 MFE — Fun Facts".

**Interpretation:** Describes the shell and four remotes, each in a directory. The claim is corroborated.

### 61. README.md:195-196

**Observation:** "The host (`host/`) is the **only app the user ever visits** directly".

**Interpretation:** Claims the host is the entry page for the composition. The claim is corroborated.

### 62. README.md:201

**Observation:** "Declaring which MFEs exist and their routes | `App.jsx` → `MFE_NAV` array".

**Interpretation:** Claims a host list declares remotes and routes. The claim is corroborated.

### 63. README.md:202

**Observation:** "Dynamically loading an MFE when its route is visited | `App.jsx` → `<MfeContainer>`".

**Interpretation:** Claims the host loads each remote when its route opens. The claim is corroborated.

### 64. README.md:203

**Observation:** "Embedding external apps as iframes | `App.jsx` → `IFRAME_NAV` + `<IframeView>`".

**Interpretation:** Claims the host embeds external applications through iframes. The claim is corroborated.

### 65. README.md:205

**Observation:** "Sharing React so it isn't loaded twice | `webpack.config.js` → `shared`".

**Interpretation:** Claims React is shared between units. The claim is corroborated.

### 66. README.md:244-264

**Observation:** Diagram "MfeContainer calls: import('reactMfe1/mount') [...] (webpack resolves the remote at runtime) [...] Fetches: http://localhost:3001/remoteEntry.js [...] Calls: mount(containerDiv)".

**Interpretation:** Describes the remote loading flow through the host. The claim is corroborated.

### 67. README.md:342-343

**Observation:** "MFEs must be started **before** you click their route in the host. If an MFE is not running you will see a friendly error — the host will not crash."

**Interpretation:** Claims the host handles remote loading failure. The claim is corroborated; behavior was not executed.

### 68. README.md:357-370

**Observation:** "**Only one file to edit:** `host/src/App.jsx`" / "The `<Header>`, `<IframeView>`, and `<Route>` are all generated automatically from the array."

**Interpretation:** Claims adding an iframe application only requires an entry in the host list. The claim is corroborated.

### 69. README.md:398-436

**Observation:** "Register the new MFE in the host's webpack config [...] Add the route in `host/src/App.jsx` [...] restart the host".

**Interpretation:** Claims a new remote requires changing and restarting the host. The claim is corroborated.

### 70. README.md:489

**Observation:** "All five apps are built into a **single `dist/` folder**".

**Interpretation:** Claims the five builds are combined in one directory. The claim is corroborated.

### 71. README.md:489-490

**Observation:** "deployed as one Vercel project".

**Interpretation:** Claims publication is unified. Configuration for that publication exists, but each directory also has its own, and the snapshot does not say which is in use. The claim is partially corroborated.

### 72. README.md:490-511

**Observation:** "The build pipeline (in `package.json → build:all`) is: 1. npm run build inside react-mfe-1 → react-mfe-1/dist/ [...] 5. npm run build inside host → host/dist/ 6. copy:dist merges everything into one dist/".

**Interpretation:** Describes separate builds then combined in a directory. The claim is corroborated.

### 73. README.md:513-514

**Observation:** "The host's `webpack.config.js` uses **relative URLs** in production so no environment variables are needed".

**Interpretation:** Claims the host resolves production remotes through paths on the same domain. The claim is corroborated.

### 74. README.md:528-529

**Observation:** "Each MFE webpack config also sets `publicPath: 'auto'` so JavaScript chunks load from the correct subdirectory path at runtime."

**Interpretation:** Claims all remotes use `publicPath: 'auto'`. Angular fixes `/angular-mfe/` in production, and the claim is contradicted.

### 75. host/webpack.config.js:8-14

**Observation:** "Production : read from environment variables set in each Vercel project / REACT_MFE1_URL → deployed URL of react-mfe-1 (e.g. https://react-mfe-1.vercel.app)".

**Interpretation:** Claims the host reads each production remote address from its own Vercel project. Code does not read these variables, and the claim is contradicted.

### 76. host/webpack.config.js:26-28

**Observation:** "outputs an ES Module (remoteEntry.js ends with `export { get, init }`)".

**Interpretation:** Claims the format of Angular's `remoteEntry.js`. No snapshot artifact shows the output, and the claim remains uncorroborated.

### 77. host/webpack.config.js:29

**Observation:** "Using `promise import(...)` tells webpack to load it via dynamic import() instead."

**Interpretation:** Explains how to declare the Angular remote. The claim is corroborated.

### 78. vue-mfe/webpack.config.js:10

**Observation:** "Shares the \"vue\" package so only one copy of Vue runs at a time".

**Interpretation:** Claims Vue is shared between units. No other unit declares `vue`, and the claim is contradicted.

### 79. 027c8f7 2026-04-11 (vercel.json of the five directories, host/webpack.config.js); 204f174 2026-04-11 (vercel.json); 50e2db2 2026-04-11 (vercel.json, package.json, five webpack.config.js); 444c709 2026-04-11 (README.md); 87ce05b 2026-04-11 (host/webpack.config.js)

**Observation:** The five per-directory `vercel.json` files are created by `027c8f7` and do not change afterward. The root one arrives with `204f174` and is changed by `50e2db2`, "single-domain deployment - build all MFEs into one dist folder for Vercel". The snapshot README is from `444c709`. Older contents of `host/webpack.config.js` are not in the clone.

**Interpretation:** Per-directory `vercel.json` files predate the single-domain arrangement, which is the latest. Whether the separate projects remained published is unknown, and deployment remains undetermined. The point is clarified.

### 80. 20b10e1 2026-04-09 (five application directories); 444c709 2026-04-11 (README.md)

**Observation:** The five application directories have existed since `20b10e1`, and no commit creates or removes another. Earlier versions of the README and `host/src/App.jsx` are not in the clone.

**Interpretation:** The README count does not come from a stage with a different number of local applications. History does not say whether it comes from a different number of external applications. Uncertainty concerns only the past; the six targets are clear in the snapshot.

### 81. 444c709 2026-04-11 (README.md); 2e2f847 2026-04-12 (angular-mfe/webpack.config.js)

**Observation:** The README does not change after `444c709`. `2e2f847` has the message "set Angular publicPath to /angular-mfe/ in production to fix chunk 404s".

**Interpretation:** The README sentence predates the Angular fix and was not updated. The point is clarified.

### 82. 20b10e1 2026-04-09 (vue-mfe/webpack.config.js); 50e2db2 2026-04-11 (vue-mfe/webpack.config.js)

**Observation:** `vue-mfe/webpack.config.js` appears in `20b10e1` and changes only in `50e2db2`. No older version of it or the host configuration is in the clone.

**Interpretation:** Whether the comment remains from another stage, expresses intent or gives a generic explanation is unknown. Uncertainty concerns only the past; no other unit shares Vue in the snapshot.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (angular-mfe/package.json:21) | 1 technology | manifest | module-federation | technological | weak | declares #2 |
| 2 | 3.4.2 (angular-mfe/package.json:21, Evidence); 3.4.3 (angular-mfe, Markers); 3.4.4 (host/src/App.jsx:35 and angular-mfe/src/mount.ts:20, Observation); 3.4.5 #4 (Configuration); 3.4.6 #1 (Where served); 3.4.7 #9, #28 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #31; configures #39 |
| 3 | 3.4.3 (host, Markers, Entry and Build); 3.4.4 (host/webpack.config.js:32, File:line and Observation; host/src/App.jsx:32-35, Observation); 3.4.5 #1-#4 (Configuration); 3.4.6 #1-#5 (Where served) and #2 (Artifacts); 3.4.7 #2, #11, #19, #20, #21, #23, #27, #29, #31, #32 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #32; configures #36; configures #37; configures #38; configures #39 |
| 4 | 3.4.3 (react-mfe-1, Markers, Entry and Build); 3.4.4 (react-mfe-1/webpack.config.js:9 and :51, File:line and Observation; host/src/App.jsx:32 and react-mfe-1/src/mount.js:11, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Where served and Artifacts); 3.4.7 #9, #19, #20, #28 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #33; configures #36 |
| 5 | 3.4.3 (react-mfe-2, Markers, Entry and Build); 3.4.4 (host/src/App.jsx:33 and react-mfe-2/src/mount.js:7, Observation); 3.4.5 #2 (Configuration); 3.4.6 #4 (Where served and Artifacts); 3.4.7 #9, #19, #28 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #34; configures #37 |
| 6 | 3.4.3 (vue-mfe, Markers, Entry and Build); 3.4.4 (host/src/App.jsx:34 and vue-mfe/src/mount.js:10, Observation); 3.4.5 #3 (Configuration); 3.4.6 #5 (Where served and Artifacts); 3.4.7 #9, #28, #32 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #35; configures #38 |
| 7 | 3.4.4 (host/src/App.jsx:32) | 3 code | source code | module-federation | architectural | strong | implements #36 |
| 8 | 3.4.4 (host/src/App.jsx:33) | 3 code | source code | module-federation | architectural | strong | implements #37 |
| 9 | 3.4.4 (host/src/App.jsx:34) | 3 code | source code | module-federation | architectural | strong | implements #38 |
| 10 | 3.4.4 (host/src/App.jsx:35) | 3 code | source code | module-federation | architectural | strong | implements #39 |
| 11 | 3.4.4 (host/webpack.config.js:32) | 3 code | configuration | module-federation | architectural | strong | implements #39 |
| 12 | 3.4.4 (react-mfe-1/src/mount.js:3, src-remote-import) | 3 code | comment | — | context | weak | — |
| 13 | 3.4.4 (react-mfe-1/webpack.config.js:51) | 3 code | comment | — | context | weak | — |
| 14 | 3.4.4 (host/src/index.js:5) | 3 code | comment | — | context | weak | — |
| 15 | 3.4.4 (host/src/index.js:7) | 3 code | source code | — | technological | weak | — |
| 16 | 3.4.4 (react-mfe-1/src/index.js:3) | 3 code | source code | — | technological | weak | — |
| 17 | 3.4.4 (react-mfe-2/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 18 | 3.4.4 (vue-mfe/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 19 | 3.4.4 (host/src/App.jsx:61) | 3 code | source code | module-federation | technological | moderate | implements #36; implements #37; implements #38; implements #39 |
| 20 | 3.4.4 (react-mfe-1/src/mount.js:3, src-mount-call) | 3 code | comment | — | context | weak | — |
| 21 | 3.4.4 (react-mfe-1/webpack.config.js:9) | 3 code | comment | — | context | weak | — |
| 22 | 3.4.4 (vue-mfe/src/mount.js:4) | 3 code | comment | — | context | weak | — |
| 23 | 3.4.4 (vue-mfe/src/mount.js:10) | 3 code | source code | module-federation | technological | moderate | implements #38 |
| 24 | 3.4.4 (host/src/App.jsx:97) | 3 code | source code | iframe | technological | moderate | implements #40; implements #41 |
| 25 | 3.4.4 (angular-mfe/src/mount.ts:20) | 3 code | source code | module-federation | technological | moderate | implements #39 |
| 26 | 3.4.4 (host/src/App.jsx:38) | 3 code | source code | iframe | architectural | strong | implements #40; implements #41 |
| 27 | 3.4.4 (host/src/App.jsx:178) | 3 code | source code | module-federation | architectural | strong | implements #36; implements #37; implements #38; implements #39 |
| 28 | 3.4.4 (react-mfe-1/src/mount.js:11) | 3 code | source code | module-federation | technological | moderate | implements #36 |
| 29 | 3.4.4 (react-mfe-2/src/mount.js:7) | 3 code | source code | module-federation | technological | moderate | implements #37 |
| 30 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 31 | 3.4.3 (angular-mfe) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.3 (host) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (react-mfe-1) | 4 structure | directory | — | architectural | moderate | — |
| 34 | 3.4.3 (react-mfe-2) | 4 structure | directory | — | architectural | moderate | — |
| 35 | 3.4.3 (vue-mfe) | 4 structure | directory | — | architectural | moderate | — |
| 36 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #32; links #33 |
| 37 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #32; links #34 |
| 38 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #32; links #35 |
| 39 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #32; links #31 |
| 40 | 3.4.5 #5 | 5 composition | source code | iframe | architectural | strong | links #32; links host/src/App.jsx:40 |
| 41 | 3.4.5 #6 | 5 composition | source code | iframe | architectural | strong | links #32; links host/src/App.jsx:39 |
| 42 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #31 |
| 43 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #32 |
| 44 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #33 |
| 45 | 3.4.6 #4 | 6 build-deploy | deploy | — | architectural | moderate | publishes #34 |
| 46 | 3.4.6 #5 | 6 build-deploy | deploy | — | architectural | moderate | publishes #35 |
| 47 | 3.4.7 #1 | 7 documentation | documentation | — | context | weak | — |
| 48 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #3; corroborates #36; corroborates #37; corroborates #38; corroborates #39 |
| 49 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | partially corroborates #31; partially corroborates #32; partially corroborates #33; partially corroborates #34; partially corroborates #35 |
| 50 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | contradicts #36; contradicts #37; contradicts #38; contradicts #39; contradicts #40; contradicts #41 |
| 51 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #37; corroborates #38; corroborates #39; corroborates #40; corroborates #41 |
| 52 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #37; corroborates #38; corroborates #39 |
| 53 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #32; corroborates #33; corroborates #34; corroborates #35 |
| 54 | 3.4.7 #8 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates react-mfe-1/package.json:12, 17-22; corroborates vue-mfe/package.json:11, 19-21; corroborates host/package.json:14, 27 |
| 55 | 3.4.7 #9 | 7 documentation | documentation | module-federation | technological | weak | corroborates #2; corroborates #4; corroborates #5; corroborates #6 |
| 56 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #19; corroborates #23; corroborates #25; corroborates #28; corroborates #29 |
| 57 | 3.4.7 #11 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #3 |
| 58 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #27 |
| 59 | 3.4.7 #13 | 7 documentation | documentation | — | context | weak | corroborates package.json:8 |
| 60 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #31; corroborates #32; corroborates #33; corroborates #34; corroborates #35 |
| 61 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #37; corroborates #38; corroborates #39; corroborates #40; corroborates #41; corroborates vercel.json:4-6 |
| 62 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #27 |
| 63 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #19; corroborates #27 |
| 64 | 3.4.7 #18 | 7 documentation | documentation | iframe | architectural | weak | corroborates #24; corroborates #26; corroborates #40; corroborates #41 |
| 65 | 3.4.7 #19 | 7 documentation | documentation | module-federation | technological | weak | corroborates #3; corroborates #4; corroborates #5 |
| 66 | 3.4.7 #20 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #7; corroborates #19; corroborates #3; corroborates #4; corroborates #36 |
| 67 | 3.4.7 #21 | 7 documentation | documentation | — | technological | weak | corroborates #3; corroborates host/src/App.jsx:59-68, 78-86 |
| 68 | 3.4.7 #22 | 7 documentation | documentation | iframe | architectural | weak | corroborates #26; corroborates #40; corroborates #41 |
| 69 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #43; corroborates package.json:8 |
| 70 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #42; corroborates #43; corroborates #44; corroborates #45; corroborates #46; corroborates package.json:11-12 |
| 71 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | partially corroborates vercel.json:2-3 |
| 72 | 3.4.7 #26 | 7 documentation | documentation | — | architectural | weak | corroborates #42; corroborates #43; corroborates #44; corroborates #45; corroborates #46; corroborates package.json:9-12 |
| 73 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | corroborates #3 |
| 74 | 3.4.7 #28 | 7 documentation | documentation | — | technological | weak | contradicts #2 |
| 75 | 3.4.7 #29 | 7 documentation | comment | — | architectural | weak | contradicts #3 |
| 76 | 3.4.7 #30 | 7 documentation | comment | module-federation | technological | weak | — |
| 77 | 3.4.7 #31 | 7 documentation | comment | module-federation | technological | weak | corroborates #11 |
| 78 | 3.4.7 #32 | 7 documentation | comment | module-federation | technological | weak | contradicts #3; contradicts host/package.json:10-18 |
| 79 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #42; explains #43; explains #44; explains #45; explains #46; explains #71; explains #75 |
| 80 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #50 |
| 81 | 3.4.8 #3 | 8 history | history | — | technological | weak | explains #74 |
| 82 | 3.4.8 #4 | 8 history | history | module-federation | technological | weak | explains #78 |

## Summary

Observations: 82. Dimensions (technology: 1, configuration: 5, code: 23, structure: 6, composition: 6, build-deploy: 5, documentation: 32, history: 4). Strength (strong: 14, moderate: 20, weak: 48, ambiguous: 0). Evidence (technological: 25, architectural: 48, context: 9).

