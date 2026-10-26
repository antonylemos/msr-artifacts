---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Repository overview

The repository is a demonstration host built on a Create React App scaffold: a single snapshot unit (`.`), simultaneously the single-spa root-config and local React application. The `src/index.js` entry point imports the React lifecycles statically (src/index.js:4), registers its own application as `odin-react`, always active (src/index.js:56-60), registers an external Angular application, `leadocs-angular` (src/index.js:63-100), and calls `start()` (src/index.js:103). The `odin-react` lifecycles come from `singleSpaReact` and mount `App` in `#root` (src/root.app.js:6-14). Because root and local application reside in the same bundle, this registration is internal to the unit and did not become a relationship.

The external application is absent from the snapshot. The host loads it by injecting a `<script>` with the Angular server's `main.js` bundle, defaulting to `http://localhost:4200/main.js`, configurable through `REACT_APP_LEAPDOCS_ORIGIN` and `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:7-9, 72-73, 93), and expects the bundle to publish lifecycles on the `leapdocs` global (src/index.js:69, 76-80). The error code acknowledges that this depends on the other project's `angular.json` (src/index.js:83). Activation is not route-based: the `App` sidebar fires the `CustomEvent` `toggle-leapdocs` (src/App.js:16-23), the `src/index.js` listener writes `isLeadocsActive` and calls `triggerAppChange()` (src/index.js:45-51), and single-spa mounts the remote in `#microfrontend-container`, a node rendered by `App` only when the "Leapdocs (Microfrontend)" section is active (src/index.js:96-98; src/App.js:11, 56-58). Event sender and receiver reside in the same unit, so it did not become a `communication` row.

Two features prepare the host to receive the Angular remote: `import 'zone.js'` at the top of the entry point (src/index.js:2) and the `history.pushState`/`replaceState` patch removing the `/leapdocs` URL prefix (src/index.js:10-42), apparently to prevent Angular routing from changing the host URL. There is no Module Federation, import map, custom element or iframe; `README.md` is the standard CRA text (README.md:1-3).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | leadocs-angular | root-config → application | source → target | single-spa | No | Yes | — | src/index.js:63; src/index.js:72; src/index.js:103 |

## Observations

**1. . → leadocs-angular.** The target is the registration name (src/index.js:63-64); the only location is the bundle URL, defaulting to `http://localhost:4200/main.js` or the value of `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:7-9), and no snapshot unit produces that bundle, hence In snapshot = `No`, as recorded in the classification (`unit_organization: multi-repo`). This is a mixed relationship: the loader injects the bundle script (src/index.js:72-73, 93) and returns the `leapdocs` global (src/index.js:78-80), but the target enters the host registered in the orchestrator (src/index.js:63-100), hence type `root-config → application` and mechanism `single-spa`. The activity function `() => isLeadocsActive` (src/index.js:96) depends on the internal `toggle-leapdocs` event described in the overview, and `domElementGetter` points to `#microfrontend-container` (src/index.js:98; src/App.js:57). Configuration = `—`: no snapshot configuration file declares the connection; the URL is in the entry code itself. Active = `Yes` through the three `Yes` source code review lines (registration, script and `start()`); if the remote bundle does not exist, loading fails with a console error (src/index.js:88-91), which is not observable in the snapshot.

## Summary

Relationships: 1 (root-config → application: 1). Active: 1. Target outside the snapshot: 1.
Units without a relationship: none.

