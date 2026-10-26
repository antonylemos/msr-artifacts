---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Mined constructs

No src-* occurrences in matches.csv.

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | frontend/vite/host/src/pages/MainPage.vue:23 | frontend/vite/host | runtime-composition | Yes | `<InputsContainer />` renders in the host the `InputsContainer` from frontend/vite/remote-inputs, imported from `remote_inputs/InputsContainer` (frontend/vite/host/src/pages/MainPage.vue:6, registered at :11); remote `remote_inputs` points to `https://localhost/remote-inputs/remoteEntry.js` (frontend/vite/host/vite.config.js:23-27) and exposes `./InputsContainer` (frontend/vite/remote-inputs/vite.config.js:16-18). `MainPage` is route `/app` (frontend/vite/host/src/main.js:14), shown by the `<router-view />` at frontend/vite/host/src/App.vue:5. |
| manual | frontend/vite/host/src/pages/MainPage.vue:24 | frontend/vite/host | runtime-composition | Yes | `<ResultsContainer />` renders in the host the `ResultsContainer` from frontend/vite/remote-results, imported from `remote_results/ResultsContainer` (frontend/vite/host/src/pages/MainPage.vue:7, registered at :11); remote at `https://localhost/remote-results/remoteEntry.js` (frontend/vite/host/vite.config.js:28-32), exposing `./ResultsContainer` (frontend/vite/remote-results/vite.config.js:16-18). Same route `/app` as the preceding row. |
| manual | frontend/vite/host/src/stores/HistoryStore.js:6 | frontend/vite/host | communication | Yes | `defineStore('history', ...)` defines point and group state shared between host and both remotes: exposed by host as `./HistoryStore` (frontend/vite/host/vite.config.js:18), with `pinia` singleton in host (frontend/vite/host/vite.config.js:36) and remotes (frontend/vite/remote-inputs/vite.config.js:28; frontend/vite/remote-results/vite.config.js:28), which import it from `host/HistoryStore` (remote `host` at `https://localhost/remoteEntry.js`, frontend/vite/remote-inputs/vite.config.js:20-24). remote-inputs writes `x`, `y`, `r` and calls `addRecord` (frontend/vite/remote-inputs/src/InputsContainer.vue:5, :23, :27-29) and reads `history` in the canvas (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:3, :139-140); remote-results reads `history`/`reversedHistory` and writes `chosenHitsIds` (frontend/vite/remote-results/src/elements/Table.vue:2, :8-13) and creates groups (frontend/vite/remote-results/src/elements/GroupInput.vue:4, :17, :32); host clears state on logout (frontend/vite/host/src/common/Header.vue:20-22). |
| manual | frontend/vite/host/src/stores/ErrorStore.js:3 | frontend/vite/host | communication | Yes | `defineStore('error', ...)` (`errorMsg`, `errorTitle`, :4-7) is the channel through which remotes send error messages to host: exposed as `./ErrorStore` (frontend/vite/host/vite.config.js:19), with the same `pinia` singleton as the preceding row. remote-inputs writes the message on sending failure (frontend/vite/remote-inputs/src/InputsContainer.vue:6, :30-31) and remote-results when the group name is missing (frontend/vite/remote-results/src/elements/GroupInput.vue:3, :23-24); host reads state (frontend/vite/host/src/pages/MainPage.vue:13) and shows `PopupWindow` (:21). |
| manual | frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175 | frontend/vite/remote-inputs | runtime-composition | Yes | `<PopupWindow` renders in the remote the host’s `PopupWindow` component, imported from `host/PopupWindow` (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:2, registered at :9) and exposed by host as `./PopupWindow` (frontend/vite/host/vite.config.js:20); the message comes from the component’s local state (:23-24, :154-155). `GraphCanvas` is used in `InputsContainer` (frontend/vite/remote-inputs/src/InputsContainer.vue:66), the module mounted by host. |

## Summary

Constructs participating in composition: 5 (runtime-composition: 3, communication: 2).

## Notes

- The `matches.csv` has no `src-*` rows: composition is entirely through static federated module imports (`remote_inputs/...`, `remote_results/...`, `host/...`) and Vue tags, not covered by line-by-line patterns.
- Federation is bidirectional: host consumes both remotes and exposes stores and `PopupWindow`, consumed by remotes through remote `host` (frontend/vite/remote-inputs/vite.config.js:19-25; frontend/vite/remote-results/vite.config.js:19-25). Remote `host/...` imports go in observations of store and `PopupWindow` rows rather than becoming their own rows.
- The host route table (frontend/vite/host/src/main.js:11-16) does not become a `host-relationship` row: it only names local pages (`StartPage`, `MainPage`); the remotes enter inside `MainPage`.
- `AuthStore` is also exposed by host (frontend/vite/host/vite.config.js:17), but no remote file imports it (grep `Store\|host/` in `remote-*/src`); it is used indirectly by `HistoryStore` actions (frontend/vite/host/src/stores/HistoryStore.js:2, :31).
