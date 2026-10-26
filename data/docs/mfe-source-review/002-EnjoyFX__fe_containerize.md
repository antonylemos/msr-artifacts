---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 002 — EnjoyFX/fe_containerize

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | microfrontend/src/main.jsx:7 | microfrontend | runtime-composition | Yes | Exports `mount(container)`, which renders Widget at microfrontend/src/main.jsx:7-11; consumed by another unit at frontend/src/RemoteWidget.jsx:14; bundle entry at microfrontend/vite.config.js:25-29. |
| src-mount-export | microfrontend/src/main.jsx:14 | microfrontend | runtime-composition | Yes | Exports `unmount(container)` at microfrontend/src/main.jsx:14-19, called by the host during cleanup at frontend/src/RemoteWidget.jsx:24-26. |
| src-mount-call | frontend/src/RemoteWidget.jsx:14 | frontend | runtime-composition | Yes | Mounts the external widget after loading its script (frontend/src/RemoteWidget.jsx:12-18); component used by App at frontend/src/App.jsx:802, from the frontend/src/main.jsx:3-8 entry. |
| src-mount-call | frontend/src/RemoteWidget.jsx:26 | frontend | runtime-composition | Yes | Unmounts the widget from another unit during effect cleanup (frontend/src/RemoteWidget.jsx:24-31); active mounting at frontend/src/App.jsx:802. |
| src-mount-call | microfrontend/src/main.jsx:7 | microfrontend | runtime-composition | Yes | The pattern recognized the declaration rather than a call: the same `mount` export at microfrontend/src/main.jsx:7-11, used by the host at frontend/src/RemoteWidget.jsx:14. |
| src-mount-call | microfrontend/src/main.jsx:14 | microfrontend | runtime-composition | Yes | The pattern recognized the declaration rather than a call: the same `unmount` export at microfrontend/src/main.jsx:14-19, used by the host at frontend/src/RemoteWidget.jsx:26. |
| src-bundle-url | frontend/src/App.jsx:475 | frontend | none | No | frontend/src/App.jsx:475 is YAML text inside an example string for display, rather than code loading; executable mounting is at frontend/src/App.jsx:800-803. |
| src-bundle-url | frontend/src/App.jsx:802 | frontend | script-loading | Yes | Passes the microfrontend IIFE bundle URL to RemoteWidget (frontend/src/App.jsx:800-803); the wrapper assigns this URL to the script at frontend/src/RemoteWidget.jsx:8-9. |
| src-dynamic-script | frontend/src/RemoteWidget.jsx:8 | frontend | script-loading | Yes | Injects a script with the widget URL and appends it to the document (frontend/src/RemoteWidget.jsx:8-22); used by App at frontend/src/App.jsx:802, loaded by frontend/src/main.jsx:3-8. |

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 8 (runtime-composition: 6, script-loading: 2).

## Notes

- The mount and unmount definitions appear twice because the src-mount-export and src-mount-call patterns overlap. The rows were preserved, and the summary counts occurrences rather than unique constructs.
- The host chain is frontend/index.html:10 → frontend/src/main.jsx:3-8 → frontend/src/App.jsx:2 and frontend/src/App.jsx:802 → frontend/src/RemoteWidget.jsx:7-32. The widget bundle uses microfrontend/src/main.jsx as its entry (microfrontend/vite.config.js:25-29).
- The additional search found no other composition construct. root.unmount at microfrontend/src/main.jsx:17 is internal cleanup of the React root; it does not constitute another interaction between units.
