---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
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

# 335 — AstroSoup/web-lab-4

## Repository overview

Three `@module-federation/vite` declarations isolated signals (#1–3). Architectural chain passes through configurations naming remotes/exposing modules (#4–6), imports/rendering of two panels in host and PopupWindow in input remote (#7–8, #11), and four active federated relationships (#15–18). Host also provides HistoryStore/ErrorStore (#9–10), supporting three bidirectional communication relationships through shared reactive state, recorded as `events` (#19–21).

Structure confirms host frontend unit (#12), but both remotes remain `Undetermined`: own package/build while `src/main.js` empty (#13–14). History clarifies entries added already empty without resolving execution autonomy (#25–26). Does not undo active panel federation consumption. Three builds separate but results published in same image/nginx service without independent versioning (#22–24).

Documentation review has zero claims, so no observations/textual signal to compare with implementation. Configuration deduplicated into one block per unit; nginx publication paths remain in build/deployment. Sources are seven final reviews/cited snapshot excerpts, without changing judgments.

## Observations

### 1. frontend/vite/host/package.json:17

**Observation:** Manifest declares `@module-federation/vite` version `latest` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review records Configured `Yes`, configuration has own observation.

### 2. frontend/vite/remote-inputs/package.json:16

**Observation:** Manifest declares `@module-federation/vite` version `latest` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review records Configured `Yes`, configuration has own observation.

### 3. frontend/vite/remote-results/package.json:16

**Observation:** Manifest declares `@module-federation/vite` version `latest` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review records Configured `Yes`, configuration has own observation.

### 4. frontend/vite/host/vite.config.js:3; frontend/vite/host/vite.config.js:13-38

**Observation:** Plugin `federation` configures `host`, publishes `remoteEntry.js`, exposes AuthStore, HistoryStore, ErrorStore, PopupWindow and declares `remote_inputs` at `https://localhost/remote-inputs/remoteEntry.js`, `remote_results` at `https://localhost/remote-results/remoteEntry.js`. Vue/Pinia singleton.

**Interpretation:** Configuration links host to two named remotes/offers modules for reverse consumption.

### 5. frontend/vite/remote-inputs/vite.config.js:3; frontend/vite/remote-inputs/vite.config.js:13-30

**Observation:** Plugin `federation` configures `remote_inputs`, publishes `remoteEntry.js`, exposes `./InputsContainer` and declares remote `host` at `https://localhost/remoteEntry.js`. Vue/Pinia singleton.

**Interpretation:** Block configures panel provider/federated link back to host, beyond isolated exposure.

### 6. frontend/vite/remote-results/vite.config.js:3; frontend/vite/remote-results/vite.config.js:13-30

**Observation:** Plugin `federation` configures `remote_results`, publishes `remoteEntry.js`, exposes `./ResultsContainer` and declares remote `host` at `https://localhost/remoteEntry.js`. Vue/Pinia singleton.

**Interpretation:** Block configures panel provider/federated link back to host, beyond isolated exposure.

### 7. frontend/vite/host/src/pages/MainPage.vue:6; frontend/vite/host/src/pages/MainPage.vue:11; frontend/vite/host/src/pages/MainPage.vue:23; frontend/vite/host/vite.config.js:23-27; frontend/vite/remote-inputs/vite.config.js:14-18

**Observation:** `MainPage` imports `InputsContainer` from `remote_inputs/InputsContainer`, registers component/renders `<InputsContainer />`. Configurations declare target remote/matching exposed key.

**Interpretation:** Host inserts another unit’s panel through Module Federation. Cited set identifies tag target.

### 8. frontend/vite/host/src/pages/MainPage.vue:7; frontend/vite/host/src/pages/MainPage.vue:11; frontend/vite/host/src/pages/MainPage.vue:24; frontend/vite/host/vite.config.js:28-32; frontend/vite/remote-results/vite.config.js:14-18

**Observation:** `MainPage` imports `ResultsContainer` from `remote_results/ResultsContainer`, registers component/renders `<ResultsContainer />`. Configurations declare target remote/matching exposed key.

**Interpretation:** Host inserts another unit’s panel through Module Federation. Cited set identifies tag target.

### 9. frontend/vite/host/src/stores/HistoryStore.js:6-24; frontend/vite/host/src/stores/HistoryStore.js:126-143; frontend/vite/remote-inputs/src/InputsContainer.vue:5-29; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:3; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:139-140; frontend/vite/remote-results/src/elements/Table.vue:2-13; frontend/vite/remote-results/src/elements/GroupInput.vue:4-32; frontend/vite/host/src/common/Header.vue:20-22

**Observation:** `defineStore("history", ...)` contains form fields, history/groups. Input remote imports host store, changes fields/calls `addRecord`; canvas reads `history`. Results remote reads history, changes selection/creates groups. Host clears state on logout.

**Interpretation:** Store provides shared reactive-state mechanism used by three units; definition implements channel without alone declaring consumer federation resolution.

### 10. frontend/vite/host/src/stores/ErrorStore.js:3-15; frontend/vite/remote-inputs/src/InputsContainer.vue:6; frontend/vite/remote-inputs/src/InputsContainer.vue:28-32; frontend/vite/remote-results/src/elements/GroupInput.vue:3; frontend/vite/remote-results/src/elements/GroupInput.vue:21-25; frontend/vite/host/src/pages/MainPage.vue:13-21

**Observation:** `defineStore("error", ...)` stores `errorMsg`, `errorTitle`. Remotes import host store/write fields on error; `MainPage` reads/presents fields in `PopupWindow`.

**Interpretation:** Store implements remote-to-host reactive message channel; declaration alone does not establish consumer federation resolution.

### 11. frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:2-9; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:23-24; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:154-155; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175-180; frontend/vite/remote-inputs/vite.config.js:19-25; frontend/vite/host/vite.config.js:20

**Observation:** `GraphCanvas` imports `PopupWindow` from `host/PopupWindow`, registers/renders component with local message/title. Remote `host` and exposure `./PopupWindow` declared in configurations.

**Interpretation:** Input remote composes host-provided visual component; excerpts identify tag target/federated contract.

### 12. frontend/vite/host; frontend/vite/host/index.html:11; frontend/vite/host/package.json:8; frontend/vite/host/vite.config.js:5-40; frontend/vite/host/src/main.js:24-40

**Observation:** Directory has own manifest/Vite configuration; `index.html` loads `src/main.js`, creating Vue application, installing router/Pinia and mounting at `#app`.

**Interpretation:** Frontend unit boundary confirmed, Frontend unit `Yes` in structure review.

### 13. frontend/vite/remote-inputs; frontend/vite/remote-inputs/index.html:11; frontend/vite/remote-inputs/package.json:8; frontend/vite/remote-inputs/vite.config.js:5-32; frontend/vite/remote-inputs/src/main.js (0 bytes)

**Observation:** Directory has own manifest/Vite configuration exposing `./InputsContainer`. `index.html` points to empty `src/main.js`.

**Interpretation:** Structural judgment remains `Undetermined`: build/exposed module delimit UI package without standalone bootstrap. Relatively independent frontend unit and panel dependent on host execution remain plausible readings.

### 14. frontend/vite/remote-results; frontend/vite/remote-results/index.html:11; frontend/vite/remote-results/package.json:8; frontend/vite/remote-results/vite.config.js:5-32; frontend/vite/remote-results/src/main.js (0 bytes)

**Observation:** Directory has own manifest/Vite configuration exposing `./ResultsContainer`. `index.html` points to empty `src/main.js`.

**Interpretation:** Structural judgment remains `Undetermined`: build/exposed module delimit UI package without standalone bootstrap. Relatively independent frontend unit and panel dependent on host execution remain plausible readings.

### 15. frontend/vite/host/src/pages/MainPage.vue:6; frontend/vite/host/src/pages/MainPage.vue:23; frontend/vite/host/vite.config.js:23-27; frontend/vite/remote-inputs/vite.config.js:14-18

**Observation:** Host renders `InputsContainer` imported from `remote_inputs/InputsContainer`. Remote entry points to `https://localhost/remote-inputs/remoteEntry.js`; provider declares matching name/file/exposure.

**Interpretation:** Active host → remote relationship recorded in 3.4.5, target present in snapshot.

### 16. frontend/vite/host/src/pages/MainPage.vue:7; frontend/vite/host/src/pages/MainPage.vue:24; frontend/vite/host/vite.config.js:28-32; frontend/vite/remote-results/vite.config.js:14-18

**Observation:** Host renders `ResultsContainer` imported from `remote_results/ResultsContainer`. Remote entry points to `https://localhost/remote-results/remoteEntry.js`; provider declares matching name/file/exposure.

**Interpretation:** Active host → remote relationship recorded in 3.4.5, target present in snapshot.

### 17. frontend/vite/remote-inputs/vite.config.js:19-25; frontend/vite/host/vite.config.js:14-20; frontend/vite/remote-inputs/src/InputsContainer.vue:5-6; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:2-3; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175

**Observation:** Consumer declares `host` at `https://localhost/remoteEntry.js`, imports `host/HistoryStore`, `host/ErrorStore` exposed by host. Also imports/renders `host/PopupWindow`.

**Interpretation:** Active federation-consumption relationship in remote → host direction, preserving host → remote type used in origin review.

### 18. frontend/vite/remote-results/vite.config.js:19-25; frontend/vite/host/vite.config.js:14-20; frontend/vite/remote-results/src/elements/GroupInput.vue:3-4; frontend/vite/remote-results/src/elements/Table.vue:2

**Observation:** Consumer declares `host` at `https://localhost/remoteEntry.js`, imports `host/HistoryStore`, `host/ErrorStore` exposed by host.

**Interpretation:** Active federation-consumption relationship in remote → host direction, preserving host → remote type used in origin review.

### 19. frontend/vite/host/vite.config.js:18-19; frontend/vite/host/vite.config.js:36; frontend/vite/remote-inputs/vite.config.js:28; frontend/vite/host/src/stores/HistoryStore.js:136-143; frontend/vite/host/src/stores/ErrorStore.js:3-7; frontend/vite/host/src/common/Header.vue:20-22; frontend/vite/host/src/pages/MainPage.vue:13-21; frontend/vite/remote-inputs/src/InputsContainer.vue:5-31; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:139-140

**Observation:** Host exposes HistoryStore/ErrorStore; Pinia singleton on both sides. Remote writes errors displayed by host; on logout host clears history/form fields read by remote.

**Interpretation:** Active bidirectional communication through shared reactive service, recorded `events` in 3.4.5.

### 20. frontend/vite/host/vite.config.js:18-19; frontend/vite/host/vite.config.js:36; frontend/vite/remote-results/vite.config.js:28; frontend/vite/host/src/stores/HistoryStore.js:136-143; frontend/vite/host/src/stores/ErrorStore.js:3-7; frontend/vite/host/src/common/Header.vue:20-22; frontend/vite/host/src/pages/MainPage.vue:13-21; frontend/vite/remote-results/src/elements/GroupInput.vue:3-24; frontend/vite/remote-results/src/elements/Table.vue:2-13; frontend/vite/remote-results/src/elements/Table.vue:53

**Observation:** Host exposes HistoryStore/ErrorStore; Pinia singleton on both sides. Remote writes errors displayed by host; on logout host clears history read by remote table.

**Interpretation:** Active bidirectional communication through shared reactive service, recorded `events` in 3.4.5.

### 21. frontend/vite/host/vite.config.js:18; frontend/vite/host/vite.config.js:36; frontend/vite/remote-inputs/vite.config.js:28; frontend/vite/remote-results/vite.config.js:28; frontend/vite/remote-inputs/src/InputsContainer.vue:5-29; frontend/vite/host/src/stores/HistoryStore.js:49; frontend/vite/host/src/stores/HistoryStore.js:126; frontend/vite/remote-results/src/elements/Table.vue:2-13; frontend/vite/remote-results/src/elements/Table.vue:39-53; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:139-140

**Observation:** Remotes import same host HistoryStore with singleton Pinia. Input remote adds history records consumed by table; results remote loads backend history on mount, input remote canvas reads it.

**Interpretation:** Active bidirectional inter-remote communication through shared reactive state, recorded `events`, without direct component call.

### 22. frontend/vite/host/package.json:2-8; frontend/vite/host/vite.config.js:5-40; config/nginx/Dockerfile:5; config/nginx/nginx.conf:18-35; config/nginx/nginx.conf:90-93; config/docker-compose.yaml:38-52

**Observation:** Package has own `vite build`/configuration. Dockerfile copies `dist` to folder in same image containing other frontends; own nginx server/TLS path serve it. Compose defines single `nginx` service. Manifest uses `private: true`, `version: 0.0.0`.

**Interpretation:** Separate build/joint deployment, Versioning `No` per 3.4.6. Separate address does not demonstrate independent publication.

### 23. frontend/vite/remote-inputs/package.json:2-8; frontend/vite/remote-inputs/vite.config.js:5-32; config/nginx/Dockerfile:6; config/nginx/nginx.conf:37-53; config/nginx/nginx.conf:95-98; config/docker-compose.yaml:38-52

**Observation:** Package has own `vite build`/configuration. Dockerfile copies `dist` to folder in same image containing other frontends; own nginx server/TLS path serve it. Compose defines single `nginx` service. Manifest uses `private: true`, `version: 0.0.0`.

**Interpretation:** Separate build/joint deployment, Versioning `No` per 3.4.6. Separate address does not demonstrate independent publication.

### 24. frontend/vite/remote-results/package.json:2-8; frontend/vite/remote-results/vite.config.js:5-32; config/nginx/Dockerfile:7; config/nginx/nginx.conf:55-71; config/nginx/nginx.conf:100-103; config/docker-compose.yaml:38-52

**Observation:** Package has own `vite build`/configuration. Dockerfile copies `dist` to folder in same image containing other frontends; own nginx server/TLS path serve it. Compose defines single `nginx` service. Manifest uses `private: true`, `version: 0.0.0`.

**Interpretation:** Separate build/joint deployment, Versioning `No` per 3.4.6. Separate address does not demonstrate independent publication.

### 25. 53e46c0 2025-12-05 (frontend/vite/remote-inputs/src/main.js); 2214561 2025-12-08 (frontend/vite/remote-inputs/src/main.js)

**Observation:** History review records `src/main.js` added in `53e46c0`, already associated with empty object `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`. Path retains same object through snapshot without recorded later change.

**Interpretation:** Point `clarified`: no earlier standalone bootstrap emptied at this path. Explains empty entry without demonstrating abandonment/changing structural `Undetermined`.

### 26. f5cb3ef 2025-12-08 (frontend/vite/remote-results/src/main.js); 2214561 2025-12-08 (frontend/vite/remote-results/src/main.js)

**Observation:** History review records `src/main.js` added in `f5cb3ef`, already associated with empty object `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`. Path retains same object through snapshot without recorded later change.

**Interpretation:** Point `clarified`: no earlier standalone bootstrap emptied at this path. Explains empty entry without demonstrating abandonment/changing structural `Undetermined`.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/vite/host/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (frontend/vite/remote-inputs/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (frontend/vite/remote-results/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (frontend/vite/host/package.json:17, Evidence); 3.4.2 (frontend/vite/remote-inputs/package.json:16, Evidence); 3.4.2 (frontend/vite/remote-results/package.json:16, Evidence); 3.4.3 (frontend/vite/host, Markers and Build); 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:23 and :24, Observation); 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6 and frontend/vite/host/src/stores/ErrorStore.js:3, Observation); 3.4.4 (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175, Observation); 3.4.5 #1–7 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #12; configures #15; configures #16; configures #17; configures #18; configures #19; configures #20; configures #21 |
| 5 | 3.4.2 (frontend/vite/remote-inputs/package.json:16, Evidence); 3.4.3 (frontend/vite/remote-inputs, Markers, Entry and Build); 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:23, Observation); 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6, Observation); 3.4.5 #1, #3, #5, #7 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #13; configures #15; configures #17; configures #19; configures #21 |
| 6 | 3.4.2 (frontend/vite/remote-results/package.json:16, Evidence); 3.4.3 (frontend/vite/remote-results, Markers, Entry and Build); 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:24, Observation); 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6, Observation); 3.4.5 #2, #4, #6, #7 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #14; configures #16; configures #18; configures #20; configures #21 |
| 7 | 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:23, manual) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 8 | 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:24, manual) | 3 code | source code | module-federation | architectural | strong | implements #16 |
| 9 | 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6, manual) | 3 code | source code | events | architectural | moderate | implements #17; implements #18; implements #19; implements #20; implements #21 |
| 10 | 3.4.4 (frontend/vite/host/src/stores/ErrorStore.js:3, manual) | 3 code | source code | events | architectural | moderate | implements #17; implements #18; implements #19; implements #20 |
| 11 | 3.4.4 (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175, manual) | 3 code | source code | module-federation | architectural | strong | implements #17 |
| 12 | 3.4.3 (frontend/vite/host) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (frontend/vite/remote-inputs) | 4 structure | directory | — | architectural | ambiguous | — |
| 14 | 3.4.3 (frontend/vite/remote-results) | 4 structure | directory | — | architectural | ambiguous | — |
| 15 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #12; links #13 |
| 16 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #12; links #14 |
| 17 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #13; links #12 |
| 18 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #14; links #12 |
| 19 | 3.4.5 #5 | 5 composition | source code | events | architectural | strong | links #12; links #13 |
| 20 | 3.4.5 #6 | 5 composition | source code | events | architectural | strong | links #12; links #14 |
| 21 | 3.4.5 #7 | 5 composition | source code | events | architectural | strong | links #13; links #14 |
| 22 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #12 |
| 23 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #13 |
| 24 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #14 |
| 25 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #13 |
| 26 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #14 |

## Summary

Observations: 26. Dimensions (technology: 3, configuration: 3, code: 5, structure: 3, composition: 7, build-deploy: 3, documentation: 0, history: 2). Strength (strong: 13, moderate: 6, weak: 5, ambiguous: 2). Evidence (technological: 3, architectural: 23, context: 0).
