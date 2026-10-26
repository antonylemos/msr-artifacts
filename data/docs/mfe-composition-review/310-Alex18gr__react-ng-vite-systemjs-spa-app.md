---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
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

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Repository overview

A single-spa proof of concept with SystemJS and import maps (README.md:1-2), declared as derived from third-party example `nitinreddy3/react-ng-spa-app`. The host is root config (`root-config`), registering three applications with `registerApplication`, each on its own route: `@org1/react-app` at `/react`, `angular-app` at `/angular` and `react-vite-app` at `/react-vite` (root-config/src/org1-root-config.ts:3-19), and starting the orchestrator with `start` (root-config/src/org1-root-config.ts:21-23). Each registration loads the application through `System.import` of the name, which the page's SystemJS import map resolves to each project's bundle URL: `//localhost:8080/org1-react-app.js`, `//localhost:4200/main.js` and `//localhost:3001/spa.js` (root-config/src/index.ejs:63-84). The page has a menu navigating between all three routes with `singleSpaNavigate` (root-config/src/index.ejs:177-195). The three applications use different stacks (React 16 with webpack, Angular 12 with custom-webpack, React 19 with Vite and `vite-plugin-single-spa`), and the import map gives each React its version through `scopes` (root-config/src/index.ejs:73-82).

Besides loading, applications exchange the username through a `BehaviorSubject` (common-lib-webpack/src/user-state.ts:3-19) in library `common-lib-webpack`. It only works as an inter-unit channel because all three externalize `@myapp/common-lib-webpack` as `@paok/common-lib-webpack` (react-app/webpack.config.js:13-14; angular-app/extra-webpack.config.js:7-10; react-vite-app/vite.config.ts:11, 19), and SystemJS resolves that name to a single module at `//localhost:9001/index.js` (root-config/src/index.ejs:71). `react-app` and `react-vite-app` publish and subscribe; `angular-app` only subscribes. Because routes do not overlap, applications are not mounted simultaneously, and the value passes from one to another through the last value held by `BehaviorSubject`. Library `styleguide` is also shared through the import map (root-config/src/index.ejs:70), but provides only visual components and did not become a relationship, just as `common-lib-webpack` is no relationship's Target: both are libraries, `No` in the structural review.

The units' import map exists only in local mode (`<% if (isLocal) { %>`, root-config/src/index.ejs:62), enabled by the root's `start` (root-config/package.json:4); the production map line is commented out (root-config/src/index.ejs:60). `react-app`'s port 8080 is not written in the repository (react-app/package.json:4 only has `webpack serve`), and the README documents running only `/react` and `/angular` (README.md:29-34). `vue-app` is a Vue scaffold appearing in neither root config nor import map and remaining outside all relationships.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | root-config | angular-app | root-config → application | source → target | single-spa | Yes | Yes | angular-app/angular.json:25 (`main: src/main.single-spa.ts`); angular-app/angular.json:33-34 (`libraryName: angular-app`, `libraryTarget: umd`); angular-app/angular.json:36 (`deployUrl: http://localhost:4200/`); angular-app/package.json:11 (`ng s … --port 4200`) | angular-app/src/main.single-spa.ts:112; angular-app/src/main.single-spa.ts:113; angular-app/src/main.single-spa.ts:114; angular-app/src/main.single-spa.ts:7; angular-app/src/main.single-spa.ts:20; root-config/src/org1-root-config.ts:9; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:11; root-config/src/org1-root-config.ts:21 |
| 2 | root-config | react-vite-app | root-config → application | source → target | single-spa | Yes | Yes | react-vite-app/vite.config.ts:25 (`format: "system"`); react-vite-app/vite.config.ts:37-41 (`vitePluginSingleSpa` with `type: "mife"`, `serverPort: 3001`, `spaEntryPoints: ["src/spa.tsx"]`) | react-vite-app/src/spa.tsx:99; react-vite-app/src/spa.tsx:100; react-vite-app/src/spa.tsx:101; react-vite-app/src/spa.tsx:3; react-vite-app/src/spa.tsx:8; root-config/src/org1-root-config.ts:15; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:17; root-config/src/org1-root-config.ts:21 |
| 3 | root-config | react-app | root-config → application | source → target | single-spa | Yes | Yes | react-app/webpack.config.js:5-10 (`singleSpaDefaults` with `orgName: "org1"`, `projectName: "react-app"`) | react-app/src/org1-react-app.tsx:3; react-app/src/org1-react-app.tsx:6; root-config/src/org1-root-config.ts:3; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:5; root-config/src/org1-root-config.ts:21 |
| 4 | react-app | angular-app | communication | source → target | events | Yes | Yes | root-config/src/index.ejs:71 (`@paok/common-lib-webpack` → `//localhost:9001/index.js`); common-lib-webpack/webpack.config.js:49-55 (`index.js` with `library.type: "system"`); react-app/webpack.config.js:13-14 (external `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); angular-app/extra-webpack.config.js:7-10 (same) | common-lib-webpack/src/user-state.ts:9 |
| 5 | react-vite-app | angular-app | communication | source → target | events | Yes | Yes | root-config/src/index.ejs:71 (`@paok/common-lib-webpack` → `//localhost:9001/index.js`); common-lib-webpack/webpack.config.js:49-55 (`index.js` with `library.type: "system"`); react-vite-app/vite.config.ts:11 (alias `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); react-vite-app/vite.config.ts:19 (`@paok/common-lib-webpack` at `external`); angular-app/extra-webpack.config.js:7-10 (external `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`) | common-lib-webpack/src/user-state.ts:9 |
| 6 | react-app | react-vite-app | communication | bidirectional | events | Yes | Yes | root-config/src/index.ejs:71 (`@paok/common-lib-webpack` → `//localhost:9001/index.js`); common-lib-webpack/webpack.config.js:49-55 (`index.js` with `library.type: "system"`); react-app/webpack.config.js:13-14 (external `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); react-vite-app/vite.config.ts:11 (alias `@myapp/common-lib-webpack` → `@paok/common-lib-webpack`); react-vite-app/vite.config.ts:19 (`@paok/common-lib-webpack` at `external`) | common-lib-webpack/src/user-state.ts:9 |

## Observations

**1. root-config → angular-app.** Root config registers `angular-app` with `app: () => System.import("angular-app")` and `activeWhen: ["/angular"]` (root-config/src/org1-root-config.ts:9-13). The local import map resolves the name to `//localhost:4200/main.js` (root-config/src/index.ejs:68). The target is resolved as `angular-app` through the match between registered name and `libraryName: angular-app` (angular-app/angular.json:33), through bundle `main.js` generated from entry point `src/main.single-spa.ts` (angular-app/angular.json:25) and through `deployUrl` `http://localhost:4200/` (angular-app/angular.json:36). Port 4200 is also in the serve script (angular-app/package.json:11). The entry point exports lifecycles created by `singleSpaAngular` (angular-app/src/main.single-spa.ts:20-31, 112-114), with `mount` and `unmount` enabling and disabling the application's `<style>` elements. Active = `Yes`: all code lines are `Yes` in the source code review. `start` (root-config/src/org1-root-config.ts:21) and the import map (root-config/src/index.ejs:63) support all three registration relationships and appear in all three.

**2. root-config → react-vite-app.** Registration `react-vite-app` with `System.import("react-vite-app")` and `activeWhen: ["/react-vite"]` (root-config/src/org1-root-config.ts:15-19), resolved in the import map to `//localhost:3001/spa.js` (root-config/src/index.ejs:69). The target matches `react-vite-app` through single-spa entry point `src/spa.tsx` and `serverPort: 3001` of `vite-plugin-single-spa` (react-vite-app/vite.config.ts:37-41), with output in `system` format (react-vite-app/vite.config.ts:25). Exported lifecycles combine the plugin's CSS lifecycles, custom `<style>` control and those of `singleSpaReact` (react-vite-app/src/spa.tsx:8-15, 98-101). Route `/react-vite` is in the page menu (root-config/src/index.ejs:189), but absent from the README. Active = `Yes`.

**3. root-config → react-app.** Registration `@org1/react-app` with `System.import("@org1/react-app")` and `activeWhen: ["/react"]` (root-config/src/org1-root-config.ts:3-7), resolved to `//localhost:8080/org1-react-app.js` (root-config/src/index.ejs:67). The target is resolved as `react-app` through filename: `orgName: "org1"` and `projectName: "react-app"` in the preset (react-app/webpack.config.js:5-10) match `org1-react-app.js` and entry point `src/org1-react-app.tsx`, exporting `singleSpaReact` lifecycles (react-app/src/org1-react-app.tsx:6-16). Port 8080 is not declared in the repository; it was not used to resolve the target. The import map gives this application React 16 through `scopes` (root-config/src/index.ejs:74-77). Active = `Yes`.

**4. react-app → angular-app.** `react-app` publishes the username with `userState.setUser(username)` on form submission (react-app/src/App.tsx:72), and `angular-app` subscribes to `userState.user$` in the `AppComponent` constructor (angular-app/src/app/app.component.ts:15-18). `angular-app` does not publish, hence direction `source → target`. The channel is the `BehaviorSubject` of `common-lib-webpack` (common-lib-webpack/src/user-state.ts:3-19), and the code line is `next` in `setUser` (common-lib-webpack/src/user-state.ts:9), recorded in the source code review with unit `—` because it is in the library. The module is the same for both units because both externalize it (react-app/webpack.config.js:13-14; angular-app/extra-webpack.config.js:7-10), and SystemJS loads it from a single URL (root-config/src/index.ejs:71). Mechanism `events`: a shared reactive service is the communication form provided for in the type, and the row has only this state channel.

**5. react-vite-app → angular-app.** Same channel as relationship 4. `react-vite-app` publishes with `userState.setUser(formJson.userName)` on form submission (react-vite-app/src/App.tsx:47), and `angular-app` subscribes (angular-app/src/app/app.component.ts:15-18). In `react-vite-app`, the imported name is replaced through an alias with `@paok/common-lib-webpack` and kept outside the bundle (react-vite-app/vite.config.ts:11, 19), leading to the same import map module. Direction `source → target`, because `angular-app` only subscribes. Active = `Yes`.

**6. react-app → react-vite-app.** Both React applications publish (react-app/src/App.tsx:72; react-vite-app/src/App.tsx:47) and subscribe (react-app/src/App.tsx:53-56; react-vite-app/src/App.tsx:13-18) to the same `userState`, hence direction `bidirectional`, with Source and Target in alphabetical order. Because each application has its own route and single-spa mounts one at a time, exchange occurs through the value held in `BehaviorSubject`, read with `getUser()` on mounting (react-app/src/App.tsx:49-51; react-vite-app/src/App.tsx:10), rather than between two simultaneously mounted applications. Active = `Yes`.

## Summary

Relationships: 6 (root-config → application: 3, communication: 3). Active: 6. Target outside the snapshot: 0.
Units without a relationship: vue-app.

