---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
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

# 164 — horoshopodumaj/micro-frontends

## Repository overview

Module Federation demonstration with Rspack and `@module-federation/enhanced`. Three sibling projects and no root workspace: React `host`, React `remote` and Vue 3 `vue-remote` (#13 through #15). Each has own build and none has observed deployment (#18 through #20). Composition is chained, called nested federation by README: host consumes `remote`, and `remote` consumes `vue_remote`.

Architecture-supporting chain is entirely in snapshot:
- **Dependency:** each project declares `@module-federation/enhanced` in own manifest (#1 through #3).
- **Configuration:** host names container `remote` at `localhost:3001` (#4). `remote` exposes `./RemoteContent` and names container `vue_remote` at `localhost:3002` (#6). `vue-remote` exposes `./Counter` and runtime `vue` itself, shared as singleton (#8). Each `rspack.config.ts` applies `ModuleFederationPlugin` to project configuration (#5, #7, #9).
- **Code:** host renders `RemoteContent` imported from `remote/RemoteContent` (#12). Inside it, React wrapper creates Vue app with `createApp` from `vue_remote/vue`, mounting in a `div` (#11).
- **Relationships:** two host → remote relationships result, both active: remote → vue-remote (#16) and host → remote (#17). Host does not declare `vue_remote`; Vue component reaches its page only through `remote`.

All addresses are for local development, without deployment artifact (#18 through #20). Example works on local machine.

Misleading signals:
- **Generated types:** `typeof import('remote/RemoteContent')` in `host/@mf-types/` is a plugin-generated type declaration, loading nothing (#10).
- **Name `vue_remote`:** README uses federated container name as folder name. Folder tree is therefore contradicted by directory `vue-remote` (#30). History shows README originated this way and folder `vue_remote/` never existed (#33).

Documentation is Russian README and matches remaining artifacts (#21 through #29, #31, #32). Sole discrepancy is folder name (#30). Nothing remains ambiguous in snapshot.

Configuration: 6 blocks retained, one per file, because each file serves one unit. Excluded:
- `package.json` files: `scripts` concern build or development server (dimension 6), and `dependencies` are dimension 1. `vue-remote` spreads its `dependencies` in `shared` (vue-remote/module-federation.config.ts:9), but declaration is in block #8;
- `index.html` files, containing only `<title>` and `<div id="app">` (host/index.html:7, 11);
- `paths` in `tsconfig.json`, path aliases to `./@mf-types/*` (host/tsconfig.json:15-17).

## Observations

### 1. host/package.json:25

**Observation:** `@module-federation/enhanced` `^0.8.9` in `dependencies`. Review marks it configured: host/rspack.config.ts:5 imports `ModuleFederationPlugin` from `@module-federation/enhanced/rspack` and instantiates it with `mfConfig` at :81. Configuration comes from host/module-federation.config.ts:1-8, and host imports `remote/RemoteContent` in host/src/App.tsx:3.

**Interpretation:** Host declares Module Federation implementation used by build.

### 2. remote/package.json:25

**Observation:** `@module-federation/enhanced` `^0.8.9` in `dependencies`. Review marks it configured: remote/rspack.config.ts:5 and :81 import and instantiate `ModuleFederationPlugin` with configuration from remote/module-federation.config.ts:1-11.

**Interpretation:** `remote` declares Module Federation implementation used by build.

### 3. vue-remote/package.json:25

**Observation:** `@module-federation/enhanced` `^0.8.9` in `dependencies`. Review marks it configured: vue-remote/rspack.config.ts:4 and :82 import and instantiate `ModuleFederationPlugin` with configuration from vue-remote/module-federation.config.ts:1-14.

**Interpretation:** `vue-remote` declares Module Federation implementation used by build.

### 4. host/module-federation.config.ts:1-8

**Observation:** `mfConfig` with `name: "host"`, `remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' }`, `exposes: {}` and `shared: ["react", "react-dom"]`.

**Interpretation:** Host configuration declares container `remote` and its `remoteEntry.js` address, exposing nothing.

### 5. host/rspack.config.ts:1-92

**Observation:** `defineConfig` with entry `./src/index.ts`, `devServer` on port 3000, `output.uniqueName: "host"` and `publicPath: "http://localhost:3000/"`. Plugins are `HtmlRspackPlugin` with `./index.html` and `new ModuleFederationPlugin(mfConfig)`, with `mfConfig` imported from `./module-federation.config` (:8, :81).

**Interpretation:** Federation plugin applied to host build with configuration from #4.

### 6. remote/module-federation.config.ts:1-11

**Observation:** `mfConfig` with `name: "remote"`, `filename: 'remoteEntry.js'`, `remotes: { "vue_remote": "vue_remote@http://localhost:3002/remoteEntry.js" }`, `exposes: { "./RemoteContent": "./src/RemoteContent.tsx" }` and `shared: ["react", "react-dom"]`.

**Interpretation:** `remote` is both provider and consumer: exposes component to host and declares container `vue_remote` with address.

### 7. remote/rspack.config.ts:1-92

**Observation:** Same host configuration, with port 3001, `uniqueName: "remote"` and `publicPath: "http://localhost:3001/"` (:25, :31, :33), and `new ModuleFederationPlugin(mfConfig)` (:81).

**Interpretation:** Federation plugin applied to `remote` build with configuration from #6. `publicPath` is address requested by host in #4.

### 8. vue-remote/module-federation.config.ts:1-14

**Observation:** `mfConfig` with `name: "vue_remote"`, `filename: 'remoteEntry.js'` and `exposes: { "./Counter": "./src/Counter.vue", "./vue": "vue" }`. In `shared`, spreads `dependencies` from own `package.json` (:9) and declares `vue` with `singleton: true` and `eager: true` (:10-13).

**Interpretation:** `vue-remote` declares itself as container `vue_remote` and exposes component and Vue runtime mounting it. Names no other unit.

### 9. vue-remote/rspack.config.ts:1-92

**Observation:** `defineConfig` with entry `./src/index.ts`, `devServer` on port 3002, `uniqueName: "vue_remote"` and `publicPath: "http://localhost:3002/"`. Plugins are `VueLoaderPlugin`, `HtmlRspackPlugin` and `new ModuleFederationPlugin(mfConfig)` (:78-82), with `vue-loader` rule for `.vue` (:42-48).

**Interpretation:** Federation plugin applied to `vue-remote` build with configuration from #8. `publicPath` is address requested by `remote` in #6.

### 10. host/@mf-types/remote/apis.d.ts:3

**Observation:** `type PackageType<T> = T extends 'remote/RemoteContent' ? typeof import('remote/RemoteContent') : any`, in declaration file generated by Module Federation DTS (host/@mf-types/index.d.ts:1-22), read by TypeScript through `paths` in host/tsconfig.json:15-17.

**Interpretation:** Remote module type used only in type checking. Loads nothing at runtime.

### 11. remote/src/CounterWrapper.tsx:10; remote/src/CounterWrapper.tsx:2-3, 9

**Observation:** `counter.mount(containerRef.current)`, inside a `useEffect` in React component `CounterWrapper`. `counter` is created at :9 through `createApp(Counter)`, with `Counter` from `vue_remote/Counter` and `createApp` from `vue_remote/vue` (:2-3). Cleanup at :12 returns `counter.unmount` without calling it.

**Interpretation:** `remote` mounts Vue component exposed by `vue-remote` inside its React tree, with provider's own Vue runtime.

### 12. host/src/App.tsx:19; host/src/App.tsx:3

**Observation:** `<RemoteContent/>` in `<section className="content">` (:18-20), alongside static sidebar menu. Component comes from import `remote/RemoteContent` (:3).

**Interpretation:** Host renders component exposed by `remote` in own content area.

### 13. host; host/package.json; host/rspack.config.ts:17-19, 78-80; host/src/App.tsx:24-25; host/package.json:5

**Observation:** Project with own `package.json`, lockfile and `rspack.config.ts`. Entry is `./src/index.ts`, page comes from `./index.html`, and `App` is rendered by `ReactDOM.createRoot`. Build is `NODE_ENV=production rspack build`. No workspace declared.

**Interpretation:** Frontend unit with own boundary, React application acting as host.

### 14. remote; remote/package.json; remote/rspack.config.ts:17-19, 78-80; remote/src/App.tsx:13-14; remote/package.json:5

**Observation:** Project with own `package.json`, lockfile and `rspack.config.ts`. Entry is `./src/index.ts`, page comes from `./index.html`, and `App` is rendered by `ReactDOM.createRoot`. Build is `NODE_ENV=production rspack build`.

**Interpretation:** Frontend unit with own boundary, a React application.

### 15. vue-remote; vue-remote/package.json; vue-remote/rspack.config.ts:16-18, 79-81; vue-remote/src/bootloader.ts:8; vue-remote/package.json:5

**Observation:** Project with own `package.json`, lockfile and `rspack.config.ts`. Entry is `./src/index.ts`, page comes from `./index.html`, and `createApp(App).mount("#app")` mounts app. Build is `NODE_ENV=production rspack build`.

**Interpretation:** Frontend unit with own boundary, a Vue 3 application.

### 16. remote/src/CounterWrapper.tsx:10; remote/module-federation.config.ts:5; vue-remote/module-federation.config.ts:2-3, 5-6, 10-13; vue-remote/rspack.config.ts:33

**Observation:** `remote` declares container `vue_remote` at `http://localhost:3002/remoteEntry.js`. This is `name` and `filename` in `vue-remote` configuration, confirmed by `publicPath`. Consumed modules, `vue_remote/Counter` and `vue_remote/vue`, are both `exposes` entries, and mounting occurs in remote/src/CounterWrapper.tsx:10. Wrapper is rendered by `RemoteContent` (remote/src/RemoteContent.tsx:10), on `remote` and host pages.

**Interpretation:** An active host → remote relationship from `remote` to `vue-remote` through Module Federation, integrating React and Vue.

### 17. host/src/App.tsx:19; host/module-federation.config.ts:4; remote/module-federation.config.ts:2-3, 8; remote/rspack.config.ts:33

**Observation:** Host declares container `remote` at `http://localhost:3001/remoteEntry.js`. This is `name` and `filename` in `remote` configuration, confirmed by `publicPath`. Imported module, `remote/RemoteContent`, is sole `exposes` of `remote`, and host renders it in host/src/App.tsx:19. Host does not declare `vue_remote` (host/module-federation.config.ts:3-5).

**Interpretation:** An active host → remote relationship. Vue component appears in host through this relationship and #16, without direct host → vue-remote relationship.

### 18. host/package.json:5; host/rspack.config.ts:15-92

**Observation:** Own build with `NODE_ENV=production rspack build`, own entry, `HtmlRspackPlugin`, `ModuleFederationPlugin` and `uniqueName: "host"`. Served only in development at `http://localhost:3000/` through `rspack serve`. No deployment artifact, and version `0.0.1` unused.

**Interpretation:** Own build boundary without observed deployment.

### 19. remote/package.json:5; remote/rspack.config.ts:15-92; remote/module-federation.config.ts:3

**Observation:** Own build with `NODE_ENV=production rspack build`, same as host except port, `uniqueName` and `publicPath`, generating `remoteEntry.js`. Served only in development at `http://localhost:3001/`. No deployment artifact, and version `0.0.1` unused.

**Interpretation:** Own build boundary without observed deployment.

### 20. vue-remote/package.json:5; vue-remote/rspack.config.ts:14-92; vue-remote/module-federation.config.ts:3

**Observation:** Own build with `NODE_ENV=production rspack build`, with `vue-loader`, `VueLoaderPlugin` and `uniqueName: "vue_remote"`, generating `remoteEntry.js`. Served only in development at `http://localhost:3002/`. No deployment artifact, and version `0.0.1` unused.

**Interpretation:** Own build boundary without observed deployment.

### 21. README.md:1

**Observation:** "Microfrontends Demo (Rspack + Module Federation)". Opening sentence repeats idea (README.md:3).

**Interpretation:** README presents repository as micro-frontend demonstration with Module Federation on Rspack.

### 22. README.md:5

**Observation:** "Проект состоит из трёх независимых приложений" (English translation: project consists of three independent applications).

**Interpretation:** Claim describes units together: three separate applications.

### 23. README.md:7

**Observation:** "**host** — React-приложение (контейнер), которое подключает удалённые модули." (English translation: host — React application (container) connecting remote modules).

**Interpretation:** Claim assigns host container role consuming remotes.

### 24. README.md:8

**Observation:** "**remote** — React-приложение (микрофронтенд), которое отдаёт наружу компонент `RemoteContent` и само подключает Vue-микрофронтенд." (English translation: remote — React application (micro-frontend) exposing component `RemoteContent` and itself connecting Vue micro-frontend).

**Interpretation:** Claim assigns `remote` dual provider/consumer role.

### 25. README.md:9

**Observation:** "**vue_remote** — Vue 3 приложение (микрофронтенд), которое отдаёт наружу компонент `Counter`." (English translation: vue_remote — Vue 3 application (micro-frontend) exposing component `Counter`).

**Interpretation:** Claim assigns Vue application component-provider role.

### 26. README.md:15-31

**Observation:** Diagram linking `host` to `remote` through `remote@http://localhost:3001/remoteEntry.js` and `remote` to `vue_remote` through `vue_remote@http://localhost:3002/remoteEntry.js`.

**Interpretation:** Claim describes composition chain and container addresses.

### 27. README.md:34

**Observation:** "`host` ничего не знает про `vue_remote`. Vue-микрофронтенд подключается внутри `remote`, что демонстрирует **вложенную федерацию**." (English translation: `host` knows nothing about `vue_remote`. Vue micro-frontend is connected inside `remote`, demonstrating nested federation). Feature list repeats idea (README.md:133).

**Interpretation:** Claim says composition is chained and host does not directly connect Vue application.

### 28. README.md:46

**Observation:** "Сборщик у всех приложений — **Rspack**." (English translation: bundler for all applications is Rspack).

**Interpretation:** Claim only names build tool.

### 29. README.md:103-106

**Observation:** Host page displays "React-компонент `RemoteContent`, пришедший из `remote`" and, inside it, "Vue-компонент `Counter` …, пришедший из `vue_remote`" (English translation: React component `RemoteContent` from `remote`; inside it, Vue component `Counter` from `vue_remote`).

**Interpretation:** Claim describes chained composition result on same page.

### 30. README.md:112-127

**Observation:** Annotated folder tree with `host/`, `remote/` and `vue_remote/`, each with `src/` and `module-federation.config.ts`, and with `RemoteContent.tsx` and `Counter.vue`. Snapshot directory is `vue-remote/`. Commands `cd vue_remote` (README.md:62, 78) use same name.

**Interpretation:** Claim describes three-folder organization, but uses federated container name instead of Vue application directory.

### 31. README.md:134

**Observation:** "**Кросс-фреймворковое взаимодействие** — React-контейнер рендерит Vue-компонент." (English translation: cross-framework interaction: React container renders a Vue component).

**Interpretation:** Claim says React unit composes a Vue-unit component.

### 32. README.md:135

**Observation:** "**Singleton Vue** — гарантирует единый рантайм Vue между приложениями." (English translation: singleton Vue: guarantees one Vue runtime between applications).

**Interpretation:** Claim concerns Vue runtime sharing between applications.

### 33. 5501ade 2026-09-23 (host/, remote/, vue-remote/); e1e0a52 2026-09-23 (README.md)

**Observation:** First commit, `5501ade`, creates all Vue application files already in `vue-remote/`, and no commit through snapshot creates, renames or removes a `vue_remote` path. README only appears in `e1e0a52`, touching nothing else. Review marks point clarified.

**Interpretation:** README folder tree does not remain from earlier stage: it originated differing from directory. Claim remains contradicted.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (host/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #4; declares #5; declares #12 |
| 2 | 3.4.2 (remote/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #6; declares #7 |
| 3 | 3.4.2 (vue-remote/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #8; declares #9 |
| 4 | 3.4.2 (host/package.json:25, remote/package.json:25, Evidence); 3.4.3 (host, Markers); 3.4.4 (host/src/App.tsx:19, Observation); 3.4.5 #2 (Configuration); 3.4.7 #3, #6, #7, #10 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #13; configures #17 |
| 5 | 3.4.2 (host/package.json:25, Evidence); 3.4.3 (host, Markers, Entry and Build); 3.4.6 #1 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #13; configures #17 |
| 6 | 3.4.2 (remote/package.json:25, vue-remote/package.json:25, Evidence); 3.4.3 (remote, Markers); 3.4.4 (remote/src/CounterWrapper.tsx:10, host/src/App.tsx:19, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #4, #6, #7 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #14; configures #16; configures #17 |
| 7 | 3.4.2 (remote/package.json:25, Evidence); 3.4.3 (remote, Markers, Entry and Build); 3.4.5 #2 (Configuration); 3.4.6 #2 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #14; configures #17 |
| 8 | 3.4.2 (vue-remote/package.json:25, Evidence); 3.4.3 (vue-remote, Markers); 3.4.4 (remote/src/CounterWrapper.tsx:10, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #5, #6, #10, #12 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #16 |
| 9 | 3.4.2 (vue-remote/package.json:25, Evidence); 3.4.3 (vue-remote, Markers, Entry and Build); 3.4.5 #1 (Configuration); 3.4.6 #3 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #16 |
| 10 | 3.4.4 (host/@mf-types/remote/apis.d.ts:3) | 3 code | source code | module-federation | technological | weak | — |
| 11 | 3.4.4 (remote/src/CounterWrapper.tsx:10) | 3 code | source code | module-federation | technological | moderate | implements #16 |
| 12 | 3.4.4 (host/src/App.tsx:19) | 3 code | source code | module-federation | technological | moderate | implements #17 |
| 13 | 3.4.3 (host) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.3 (remote) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (vue-remote) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #14; links #15 |
| 17 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #13; links #14 |
| 18 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #13 |
| 19 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #14 |
| 20 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #15 |
| 21 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #19; corroborates #20 |
| 22 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #15; corroborates #18; corroborates #19; corroborates #20; corroborates remote/src/App.tsx:7-14; corroborates vue-remote/src/bootloader.ts:8 |
| 23 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #4; corroborates #12; corroborates host/package.json:26 |
| 24 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #6; corroborates remote/package.json:26 |
| 25 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #8; corroborates vue-remote/package.json:26 |
| 26 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #4; corroborates #6; corroborates #8 |
| 27 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #4; corroborates #6 |
| 28 | 3.4.7 #8 | 7 documentation | documentation | — | technological | weak | corroborates #18; corroborates #19; corroborates #20 |
| 29 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #11; corroborates #16; corroborates #17; corroborates remote/src/RemoteContent.tsx:10 |
| 30 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts #15 |
| 31 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates #16 |
| 32 | 3.4.7 #12 | 7 documentation | documentation | — | technological | weak | corroborates #8; corroborates #11; corroborates #16 |
| 33 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #30 |

## Summary

Observations: 33. Dimensions (technology: 3, configuration: 6, code: 3, structure: 3, composition: 2, build-deploy: 3, documentation: 12, history: 1). Strength (strong: 4, moderate: 12, weak: 17, ambiguous: 0). Evidence (technological: 12, architectural: 20, context: 1).

