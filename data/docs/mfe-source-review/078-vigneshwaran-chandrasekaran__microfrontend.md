---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | host/src/App.jsx:32 | host | dynamic-loading | Yes | `loader: () => import('reactMfe1/mount')` in the React MFE 1 entry of `MFE_NAV` (host/src/App.jsx:31-36) loads at runtime the `./mount` module of unit `react-mfe-1`, exposed at react-mfe-1/webpack.config.js:52-54; remote `reactMfe1` resolved at host/webpack.config.js:42 (dev) and :36 (prod); the loader is invoked at host/src/App.jsx:59. |
| src-remote-import | host/src/App.jsx:33 | host | dynamic-loading | Yes | `loader: () => import('reactMfe2/mount')` loads the `./mount` of unit `react-mfe-2`, exposed at react-mfe-2/webpack.config.js:45-47; remote `reactMfe2` resolved at host/webpack.config.js:43 and :37; invoked at host/src/App.jsx:59. |
| src-remote-import | host/src/App.jsx:34 | host | dynamic-loading | Yes | `loader: () => import('vueMfe/mount')` loads the `./mount` of unit `vue-mfe`, exposed at vue-mfe/webpack.config.js:61-63; remote `vueMfe` resolved at host/webpack.config.js:44 and :38; invoked at host/src/App.jsx:59. |
| src-remote-import | host/src/App.jsx:35 | host | dynamic-loading | Yes | `loader: () => import('angularMfe/mount')` loads the `./mount` of unit `angular-mfe`, exposed at angular-mfe/webpack.config.js:26-28; remote `angularMfe` resolved by the `promise import(...)` at host/webpack.config.js:30-32, used at :39 and :45; invoked at host/src/App.jsx:59. |
| src-remote-import | host/webpack.config.js:32 | host | remote-resolution | Yes | `promise import('http://localhost:4200/remoteEntry.js')` resolves the `remoteEntry.js` of unit `angular-mfe` in development (host/webpack.config.js:30-32); the value enters the `remotes` map at :45 (dev) and :39 (prod, `/angular-mfe/remoteEntry.js`), passed to `ModuleFederationPlugin` at :80-82. |
| src-remote-import | react-mfe-1/src/mount.js:3 | react-mfe-1 | none | No | Header comment line (react-mfe-1/src/mount.js:1-4) describing the host call; not executable code. The corresponding construct is the `mount` definition at react-mfe-1/src/mount.js:11-18, recorded in the manual table. |
| src-remote-import | react-mfe-1/webpack.config.js:51 | react-mfe-1 | none | No | Comment line (`// Host uses it as: import('reactMfe1/mount')`) above the `exposes` field at react-mfe-1/webpack.config.js:52-54; not executable code. |
| src-async-bootstrap | host/src/index.js:5 | host | none | No | Comment line from the explanatory block at host/src/index.js:1-6, citing `import('./bootstrap')` in prose; the call is at host/src/index.js:7. |
| src-async-bootstrap | host/src/index.js:7 | host | dynamic-loading | No | `import('./bootstrap')` loads host/src/bootstrap.js, a file of unit `host` itself that mounts the React App at host/src/bootstrap.js:9-14; construct internal to the unit. |
| src-async-bootstrap | react-mfe-1/src/index.js:3 | react-mfe-1 | dynamic-loading | No | `import('./bootstrap')` loads react-mfe-1/src/bootstrap.js, from the unit itself (mounts App at react-mfe-1/src/bootstrap.js:9-14); internal to the unit. |
| src-async-bootstrap | react-mfe-2/src/index.js:1 | react-mfe-2 | dynamic-loading | No | `import('./bootstrap')` loads react-mfe-2/src/bootstrap.js, from the unit itself; internal to the unit. |
| src-async-bootstrap | vue-mfe/src/index.js:1 | vue-mfe | dynamic-loading | No | `import('./bootstrap')` loads vue-mfe/src/bootstrap.js, from the unit itself, which mounts the application in `#root` (vue-mfe/src/bootstrap.js:5); internal to the unit. |
| src-mount-call | host/src/App.jsx:61 | host | runtime-composition | Yes | `mount(container)` calls the `default` function of the remote module received through `loader` and mounts the remote unit in the host’s `div` (host/src/App.jsx:48-69, container at :87); the targets are the four units in `MFE_NAV` (host/src/App.jsx:32-35) and mounting is triggered by the routes at host/src/App.jsx:178-188. |
| src-mount-call | react-mfe-1/src/mount.js:3 | react-mfe-1 | none | No | The same comment line as the `src-remote-import` occurrence above; two patterns point to react-mfe-1/src/mount.js:3, which is header prose. |
| src-mount-call | react-mfe-1/webpack.config.js:9 | react-mfe-1 | none | No | Comment line in the react-mfe-1/webpack.config.js:4-10 documentation block (`Exposes the ./mount module so the host can call mount(element)`); not executable code. |
| src-mount-call | vue-mfe/src/mount.js:4 | vue-mfe | none | No | Header comment line at vue-mfe/src/mount.js:1-4, describing `app.mount(element)` in prose; the call is at vue-mfe/src/mount.js:10. |
| src-mount-call | vue-mfe/src/mount.js:10 | vue-mfe | runtime-composition | Yes | `app.mount(element)` mounts the Vue application on the element supplied by the host, inside `mount` (vue-mfe/src/mount.js:8-11, exported at :13); module exposed as `./mount` at vue-mfe/webpack.config.js:61-63 and called by the host at host/src/App.jsx:61. The `mount` definition at vue-mfe/src/mount.js:8 is the first step of the same construct. |
| src-iframe | host/src/App.jsx:97 | host | embedding | Yes | `<iframe src={url}>` in `IframeView` (host/src/App.jsx:95-104) embeds the two external applications declared in `IFRAME_NAV` (host/src/App.jsx:38-41), `https://route-map-five.vercel.app/` and `https://multibank-1.onrender.com/`; the routes rendering the component are at host/src/App.jsx:191-197. Targets outside the snapshot. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | angular-mfe/src/mount.ts:20 | angular-mfe | runtime-composition | Yes | `const mount = (element: HTMLElement): void` creates an `<app-root>` inside the element received from the host and bootstraps `AppModule` once (angular-mfe/src/mount.ts:20-32, export at :34); module exposed as `./mount` at angular-mfe/webpack.config.js:26-28 and loaded by the host at host/src/App.jsx:35. Mining captured no executable line in this file. |
| manual | host/src/App.jsx:38 | host | host-relationship | Yes | `IFRAME_NAV` declares which external applications the host uses and at which route (host/src/App.jsx:38-41): Route Map at `/route-map` and Multibank at `/multibank`; the registry feeds the menu at :126 and routes at :191-197, which render the `<iframe>` at :97. |
| manual | host/src/App.jsx:178 | host | host-relationship | Yes | The host route table generates one route per `MFE_NAV` entry, connecting each path (`/react-mfe-1`, `/react-mfe-2`, `/vue-mfe`, `/angular-mfe`) to `MfeContainer` with the corresponding unit’s `loader` (host/src/App.jsx:178-188); routes are rendered inside `Routes` at :160-198, under the `BrowserRouter` at :209-211. |
| manual | react-mfe-1/src/mount.js:11 | react-mfe-1 | runtime-composition | Yes | `const mount = (element) =>` creates the React root on the element supplied by the host and renders App with the unit’s own store (react-mfe-1/src/mount.js:11-18, export at :20); exposed as `./mount` at react-mfe-1/webpack.config.js:52-54 and called by the host at host/src/App.jsx:61. Mining captured only comment line :3 in this file. |
| manual | react-mfe-2/src/mount.js:7 | react-mfe-2 | runtime-composition | Yes | `const mount = (element) =>` mounts the React App on the element supplied by the host (react-mfe-2/src/mount.js:7-14, export at :16); exposed as `./mount` at react-mfe-2/webpack.config.js:45-47 and loaded by the host at host/src/App.jsx:33. No line from this file is in `matches.csv`. |

## Summary

Constructs participating in composition: 13 (dynamic-loading: 4, remote-resolution: 1, runtime-composition: 5, embedding: 1, host-relationship: 2).

## Notes

- Recurring false positive in this sample: the repository is educational and has long comments citing the constructs in prose. Six of the 18 `src-*` occurrences fall on comment lines (react-mfe-1/src/mount.js:3 through two patterns, react-mfe-1/webpack.config.js:9 and :51, host/src/index.js:5, vue-mfe/src/mount.js:4) and were annotated as `none`/`No`, with the corresponding executable line cited in the Observation.
- Mining missed the `mount` definitions of three of the four remote units (react-mfe-1/src/mount.js:11, react-mfe-2/src/mount.js:7, angular-mfe/src/mount.ts:20): the `src-mount-call` pattern only matched Vue’s `app.mount(` and comment lines. In vue-mfe the construct was already covered by occurrence :10, so the definition at :8 did not become a manual row.
- The `remotes` map at host/webpack.config.js:34-46 names the four units and their `remoteEntry.js` files, but is build configuration (section 3.4.2); only line :32, included in `matches.csv`, entered the table. The same applies to the four remotes’ `exposes` fields.
- There is no communication mechanism between units: host, react-mfe-1 and react-mfe-2 each create their own Redux store (host/src/store/store.js:4-8, react-mfe-1/src/store/store.js:4-8, react-mfe-2/src/store/store.js) and none is shared; `@reduxjs/toolkit` is declared with `singleton: false` at host/webpack.config.js:87. The step 4 search found no `postMessage`, `CustomEvent`, `BroadcastChannel` or `customElements` in code (only `<app-root>`, angular-mfe’s internal selector, at angular-mfe/src/index.html:10 and angular-mfe/src/app/app.component.ts:10).
- The two iframe target units are outside the snapshot; the host references them only by URL (host/src/App.jsx:39-40), as already observed in the structural review.
- The `README.md` repeats the same constructs in examples (README.md:415-420, including a `reactMfe3/mount` that does not exist in the snapshot); documentation did not become a row.
