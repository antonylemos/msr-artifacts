---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:11 | — | none | No | `declare function __webpack_init_sharing__(scope: string): Promise<void>` only declares the type of the Module Federation global for TypeScript, under the "Webpack MF globals" comment (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:9); it does not execute remote resolution — the call is at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:12 | — | none | No | `declare const __webpack_share_scopes__: { default: unknown }` only declares the global’s type; it does not execute remote resolution — the use that resolves the shared scope is at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46 | — | remote-resolution | Yes | `await __webpack_init_sharing__('default')` initializes the shared scope before initializing the remote container (`remoteContainer.init` at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54); called by `loadRemoteModule` at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:67 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54 | — | remote-resolution | Yes | `await remoteContainer.init(__webpack_share_scopes__.default)` initializes the MF container of the scope obtained at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:47; in the snapshot the scope is `microfrontend` (apps/app/src/environments/environments.ts:8, apps/microfrontend/webpack.config.js:54) |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57 | — | remote-resolution | Yes | Defines `loadRemoteModule(scope, module, url)`, which loads `remoteEntry.js` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:66), initializes the container (:67) and obtains the exposed module’s factory (:69-73); called at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106 and :137 |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106 | — | remote-resolution | Yes | `RemoteComponentLoader.loadRemoteModule(feature.module!, './Module', feature.uri!)` resolves the `./Module` module exposed by the other unit (apps/microfrontend/webpack.config.js:56-57); `module`/`uri` come from the remote manifest (libs/portal/src/lib/deployment-manager.ts:193-196) |
| src-load-remote | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137 | — | remote-resolution | Yes | `loadRemoteModule(feature.module!, './${feature.component}', feature.uri!)` resolves the component exposed by the other unit and assigns it to `outlet.component`; in the snapshot, `MicrofrontendFeature` (apps/microfrontend/public/manifest.json:10, apps/microfrontend/webpack.config.js:58) |
| src-dynamic-script | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32 | — | script-loading | Yes | `document.createElement('script')` injects the other unit’s `${url}/remoteEntry.js` bundle (`script.src` at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:33, `document.head.appendChild` at :41); the URL is assembled at libs/portal/src/lib/outlet-loader/remote-component-loader.ts:66 from the remote’s `uri` (apps/app/src/environments/environments.ts:8) |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/app/src/environments/environments.ts:8 | apps/app | host-relationship | Yes | `{ name: 'microfrontend', url: 'http://localhost:3001' }` declares, in the shell code, which remote application it uses and where; the active deployment is `microfrontend` (apps/app/src/environments/environments.ts:2) and the list is consumed at apps/app/src/module.ts:226 |
| manual | libs/portal/src/lib/loader/remote-loader.ts:28 | — | remote-resolution | Yes | ``fetch(`${remote.url}/manifest.json`)`` resolves the other unit’s manifest (apps/microfrontend/public/manifest.json:1-28) and records the remote’s `id`/`uri`/`module` (libs/portal/src/lib/loader/remote-loader.ts:39-41), which subsequently feed `feature.module`/`feature.uri` (libs/portal/src/lib/deployment-manager.ts:193-196); the remote list comes from the shell, which instantiates the loader at apps/app/src/module.ts:226 — this line only passes the list, which the constructor stores in `this.remoteUrls` (libs/portal/src/lib/loader/remote-loader.ts:16-17), without registering or resolving anything; the loader is passed to `DeploymentManager` at apps/app/src/module.ts:233-241 and triggered at apps/app/src/module.ts:262 (`loadDeployment`); not captured by the `src-*` patterns because it uses `fetch` |
| manual | libs/portal/src/lib/feature-outlet.tsx:245 | — | runtime-composition | Yes | `<LoadedWrapper Component={Loaded} feature={feature} />` mounts in the host the component loaded by the loaders (libs/portal/src/lib/feature-outlet.tsx:154, :183); in the federated path this component comes from the remote (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137) and is rendered with the remote module’s `Environment` (libs/portal/src/lib/feature-outlet.tsx:230, :244) |

## Summary

Constructs participating in composition: 9 (remote-resolution: 6, script-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notes

- All `src-*` occurrences in `matches.csv` are in `libs/portal`, which the structural review judged `No` (library published on npm); the Unit of these rows is therefore `—`. The composition mechanism is the framework, and the instance is the apps/app + apps/microfrontend pair, as the classification already observes (docs/mfe-classification/039-coolsamson7__novx.md, "Point for joint review").
- The chain confirming that the loader is active: `RemoteComponentLoader` registers in `OutletLoader.loaders` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:16-18), is imported by the shell (apps/app/src/module.ts:16, :317), and the loaders are executed by the outlet at libs/portal/src/lib/feature-outlet.tsx:149-154, within the routes built at libs/portal/src/lib/route-manager.tsx:211-217 and rendered by the shell at apps/app/src/app/App.tsx:39.
- `loadRemoteEntry` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:28 and the call at :66) does not appear in `matches.csv` because the `src-load-remote` pattern matches `loadRemote(` and `loadRemoteModule`, rather than `loadRemoteEntry(`. It is an intermediate step of the same mechanism already recorded (lines :57, :32), so it remains in those rows’ Observation without becoming a separate row.
- False positives discarded in the step 4 search: `import("./FormatterRegistry")` at libs/i18n/src/lib/format/registerFormatter.decorator.ts:5 (a local module of the library itself) and `import(`./showcases/${filename}?raw`)` at apps/app/src/showcase.tsx:498 (loads documentation files of the unit itself). `React.lazy` only appears commented out at libs/portal/src/lib/deployment-manager.ts:106.
- Nothing in the snapshot defines or consumes a custom element, `<iframe>`, `postMessage`, `BroadcastChannel` or `CustomEvent`. `libs/communication` deals with HTTP endpoints for the server (apps/app/src/module.ts:245-250), rather than communication between frontend units.
- `apps/microfrontend` only exposes `./Module` and `./MicrofrontendFeature` (apps/microfrontend/webpack.config.js:56-58); exposure is build configuration and the corresponding `export` statements (apps/microfrontend/src/feature.tsx:30) do not become rows.
