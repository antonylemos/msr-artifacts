---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | src/root.app.js:16 | . | runtime-composition | No | Exports the `bootstrap` lifecycle from the React lifecycles created at src/root.app.js:6-14; the only consumer is the unit’s own registration at src/index.js:56-60 (`async () => RootApp`, imported at src/index.js:4), in the same CRA bundle; internal to unit `.`. |
| src-mount-export | src/root.app.js:17 | . | runtime-composition | No | Exports the `mount` lifecycle from the same object at src/root.app.js:6-14, consumed by local registration at src/index.js:56-60; no other unit consumes it (no build exposure; package.json:18-22 only has `react-scripts` scripts). |
| src-mount-export | src/root.app.js:18 | . | runtime-composition | No | Exports the `unmount` lifecycle from the same object at src/root.app.js:6-14, with the same internal consumer at src/index.js:56-60. |
| src-lifecycles | src/index.js:56 | . | runtime-composition | No | `registerApplication('odin-react', async () => RootApp, () => true)` (src/index.js:56-60) registers unit `.` itself: the lifecycle object comes from the static import at src/index.js:4 and mounts in `#root` (src/root.app.js:13, public/index.html:31); internal registration without another unit involved. |
| src-lifecycles | src/index.js:63 | . | runtime-composition | Yes | `registerApplication('leadocs-angular', ...)` (src/index.js:63-100) registers the external `leadocs-angular` unit: script loader (src/index.js:65-94), activity function `() => isLeadocsActive` (src/index.js:96) and `domElementGetter` for `#microfrontend-container` (src/index.js:98), a node created by the host at src/App.js:57. |
| src-lifecycles | src/root.app.js:3 | . | runtime-composition | No | Imports `singleSpaReact`, used at src/root.app.js:6 to create the unit’s own lifecycles; the use it enables is `No`. |
| src-lifecycles | src/root.app.js:6 | . | runtime-composition | No | `singleSpaReact({ React, ReactDOM, rootComponent: App, ... })` (src/root.app.js:6-14) adapts the local App to single-spa lifecycles; this is unit `.` itself adapting to the orchestrator in the same bundle (src/index.js:4 and 56-60). |
| src-dynamic-script | src/index.js:72 | . | script-loading | Yes | Inside the remote loader, creates the `<script>` with `src = LEAPDOCS_BUNDLE_URL` (src/index.js:73; URL at src/index.js:8-9, default `http://localhost:4200/main.js`) and injects it into `document.head` (src/index.js:93), resolving with `globalThis.leapdocs` (src/index.js:78-80); loads the bundle of the external `leadocs-angular` unit, outside the snapshot. |
| src-cross-unit-communication | src/App.js:18 | . | none | No | `window.dispatchEvent(...)` (src/App.js:18-22), triggered by sidebar buttons (src/App.js:29-38), dispatches an event listened to only by unit `.` itself (src/index.js:47); sender and receiver are in the same unit, so this is an internal event rather than a composition construct. The external unit is mounted by the orchestrator, recorded at src/index.js:63. |
| src-cross-unit-communication | src/App.js:19 | . | none | No | `new CustomEvent('toggle-leapdocs', { detail: { isActive: sectionId === 'microfrontend' } })` (src/App.js:19-21) is the event dispatched at src/App.js:18, whose only receiver is unit `.`’s own listener at src/index.js:47; internal event for the same reason as the src/App.js:18 row. |
| src-cross-unit-communication | src/index.js:47 | . | none | No | `globalThis.addEventListener('toggle-leapdocs', ...)` (src/index.js:47-51) receives the event emitted by unit `.` itself at src/App.js:18-22, writes `isLeadocsActive` (src/index.js:48) and calls `triggerAppChange()` (src/index.js:50); this is the receiver side of an internal unit event, while mounting of `leadocs-angular` is handled by the registration at src/index.js:63. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/index.js:103 | . | runtime-composition | Yes | `start()` from single-spa (imported at src/index.js:3) starts the orchestrator; without it, none of the registrations at src/index.js:56-100 mounts. This activates loading of the external `leadocs-angular` unit. |

## Summary

Constructs participating in composition: 3 (runtime-composition: 2, script-loading: 1).

## Notes

- The snapshot has a single unit (`.`, structural review 087). The single-spa root and local React application are in the same CRA bundle (src/index.js:4 imports `./root.app` statically), so the `src/root.app.js` lifecycles and the `odin-react` registration at src/index.js:56-60 are internal to the unit and remained `No`, as in 007 for the container’s own `mount`. The only other unit is the external `leadocs-angular` remote, absent from the snapshot.
- `triggerAppChange()` (src/index.js:50) and the `domElementGetter` for `#microfrontend-container` (src/index.js:98, node created at src/App.js:57) did not become separate rows: they are steps of the rows already recorded at src/index.js:47 and src/index.js:63, and are in their observations.
- The `toggle-leapdocs` pair has sender (src/App.js:18) and receiver (src/index.js:47) in the same unit `.`: it is an internal event, annotated as `none` / `No`. The external unit is mounted by the single-spa orchestrator, recorded at src/index.js:63; later activation through the event does not make the event an inter-unit interaction.
- `import('web-vitals')` at src/reportWebVitals.js:3 is dynamic loading of an npm package within the unit itself; it is not a composition construct and did not become a row.
- The step 4 search in `src/`, `public/`, `README.md` and `package.json` found no `customElements`, `<iframe`, `postMessage`, `BroadcastChannel`, `loadRemote*`, `initFederation`, `registerRemotes` or `System.import`.
