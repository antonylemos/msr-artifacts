---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
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

# 163 — irfanswr/react-microfrontend

## Repository overview

A single-spa example with three sibling projects, without a root workspace: root config `parent-app` and two applications, `react-child-app` (React) and `vue-child-app` (Vue 3). The host is `parent-app`. Its `index.ejs` page installs two import maps through `@single-spa/import-map-injector` (parent-app/src/index.ejs:15-26, 33-41, 45) and, when the injector finishes, imports the root config itself (parent-app/src/index.ejs:53-55). The root config reads the declarative `microfrontend-layout.html` layout, constructs applications with a `loadApp` performing native `import()` of the application name, registers all in single-spa, activates the layout engine and calls `start()` (parent-app/src/frontenddevs-root-config.js:9-20). The layout places both applications together on the default route and each separately at `react-app` and `vue-app` (parent-app/src/microfrontend-layout.html:3-12). Each application exports lifecycles created by its framework adapter: `singleSpaReact` (react-child-app/src/frontenddevs-react-mfe.js:6-16) and `singleSpaVue` (vue-child-app/src/main.js:6-26).

The inter-unit connection uses only module names. The units' import map translates `@frontenddevs/react-mfe` and `@frontenddevs/vue-child-app` to URLs on `localhost:8081` and `localhost:8082` (parent-app/src/index.ejs:37-38), but exists only in local mode (`<% if (isLocal) { %>`, parent-app/src/index.ejs:32), triggered by `--env isLocal` in the `start` script (parent-app/package.json:4; parent-app/webpack.config.js:21-22). The production import map is commented out (parent-app/src/index.ejs:29-30), so the example's executable path is development. The first import map contains only dependencies shared through CDN (React, react-dom, scheduler, single-spa; parent-app/src/index.ejs:18-23), with no repository unit; the `import-map-overrides` library and `<import-map-overrides-full>` panel are development tools (parent-app/src/index.ejs:44, 57) and did not become a relationship.

The repository is a demonstration: application contents are placeholders (react-child-app/src/root.component.js:4-6; vue-child-app/src/App.vue:2-4), and the purpose is to show React and Vue mounted by the same root config. There is no inter-unit message exchange, Module Federation, iframe or custom element from another unit. The import map's `@frontenddevs/root-config` entry (parent-app/src/index.ejs:36) points to `parent-app` itself and is internal to the unit. The Vue bundle format depends on `vue-cli-plugin-single-spa`, without snapshot configuration (vue-child-app/vue.config.js:1-4), as already recorded in dependency and source code reviews.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | parent-app | vue-child-app | root-config → application | source → target | single-spa | Yes | Yes | parent-app/src/index.ejs:38 (local import map `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js`); parent-app/src/microfrontend-layout.html:5 (application at the default route); parent-app/src/microfrontend-layout.html:11 (application at route `vue-app`); vue-child-app/package.json:2 (`name` `@frontenddevs/vue-child-app`); vue-child-app/package.json:6 (port 8082) | vue-child-app/src/main.js:24; vue-child-app/src/main.js:25; vue-child-app/src/main.js:26; vue-child-app/src/main.js:2; vue-child-app/src/main.js:6; parent-app/src/frontenddevs-root-config.js:13; parent-app/src/frontenddevs-root-config.js:18; parent-app/src/frontenddevs-root-config.js:20; parent-app/src/index.ejs:33; parent-app/src/microfrontend-layout.html:1 |
| 2 | parent-app | react-child-app | root-config → application | source → target | single-spa | Yes | Yes | parent-app/src/index.ejs:37 (local import map `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js`); parent-app/src/microfrontend-layout.html:4 (application at the default route); parent-app/src/microfrontend-layout.html:8 (application at route `react-app`); react-child-app/package.json:2 (`name` `@frontenddevs/react-mfe`); react-child-app/webpack.config.js:6-7 (`orgName: "frontenddevs"`, `projectName: "react-mfe"`); react-child-app/webpack.config.js:10 (`outputSystemJS: false`); react-child-app/package.json:4 (port 8081) | react-child-app/src/frontenddevs-react-mfe.js:3; react-child-app/src/frontenddevs-react-mfe.js:6; parent-app/src/frontenddevs-root-config.js:13; parent-app/src/frontenddevs-root-config.js:18; parent-app/src/frontenddevs-root-config.js:20; parent-app/src/index.ejs:33; parent-app/src/microfrontend-layout.html:1 |

## Observations

**1. parent-app → vue-child-app.** The root config registers application `@frontenddevs/vue-child-app`, placed by the layout on the default route and at `vue-app` (parent-app/src/microfrontend-layout.html:5, 11); `loadApp` loads it through `import()` of its name (parent-app/src/frontenddevs-root-config.js:13), resolved by the local import map to `http://localhost:8082/js/app.js` (parent-app/src/index.ejs:38). The target was resolved by name: `@frontenddevs/vue-child-app` is the Vue project's manifest `name` (vue-child-app/package.json:2); port 8082 of `vue-cli-service serve` (vue-child-app/package.json:6) only corroborates, and path `/js/app.js` follows Vue CLI's default output, without explicit snapshot configuration. The target enters registered in the orchestrator (parent-app/src/frontenddevs-root-config.js:18), hence `root-config → application`, although loading uses dynamic `import()`. Active = `Yes` through the `Yes` lifecycle lines (vue-child-app/src/main.js:2, 6, 24-26) and root config. The caveat concerns mode: the map exists only with `isLocal` (parent-app/src/index.ejs:32), and the snapshot does not verify whether the bundle generated by `vue-cli-plugin-single-spa` is compatible with the root config's native `import()`.

**2. parent-app → react-child-app.** The same path: the layout places `@frontenddevs/react-mfe` on the default route and at `react-app` (parent-app/src/microfrontend-layout.html:4, 8), and the local import map resolves it to `http://localhost:8081/frontenddevs-react-mfe.js` (parent-app/src/index.ejs:37). Here the match is twofold: the name matches manifest `name` (react-child-app/package.json:2), and filename `frontenddevs-react-mfe.js` corresponds to the `orgName`/`projectName` of `webpack-config-single-spa-react` (react-child-app/webpack.config.js:6-7) and entry file `src/frontenddevs-react-mfe.js`; port 8081 (react-child-app/package.json:4) corroborates. The bundle is ESM (`outputSystemJS: false`, react-child-app/webpack.config.js:10), compatible with the native `import()` in parent-app/src/frontenddevs-root-config.js:13. The lifecycles exported in react-child-app/src/frontenddevs-react-mfe.js:16 come from `singleSpaReact` (:6-14), and React and react-dom are resolved through the first import map's shared dependencies (parent-app/src/index.ejs:18-20), not another unit. Active = `Yes`, with the same local-mode caveat as relationship 1.

## Summary

Relationships: 2 (root-config → application: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

