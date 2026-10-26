---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Repository overview

Snapshot brings four frontend units with own entries/builds: React host, React header/footer remotes and Vue URL-shortener remote (#14–#17). Host configuration names three targets (#2), remotes expose modules (#3–#5) and code loads/renders targets (#7–#12). Chain supports three active host → remote relationships with all targets in snapshot (#18–#20). Shortener module arrives through Module Federation, then mounts as Vue application in React host container (#9, #10, #20).

Two signals require care: `@module-federation/enhanced` declared unused (#1), while builds use Rspack’s built-in plugin (#2–#5); root `frontend` coordinates applications without another unit (#13). History cannot clarify package’s past usage because old objects absent, but current composition unambiguous (#29).

Four builds have separate publication recorded through `withZephyr()` (#21–#24), without published address/demonstrated independent versioning. Host `zephyr:dependencies` names only header/footer (#6); local Module Federation resolution also includes shortener (#2). README corroborates demonstration and host/header/footer roles (#25–#28), without listing Vue remote. Per 3.4.7 list does not claim exhaustiveness; omission limits documentation without contradicting described units.

## Observations

### 1. frontend/package.json:59

**Observation:** Aggregator manifest declares `@module-federation/enhanced` version `^0.8.9` in `dependencies`. Section 3.4.2 records Configured `No`: no application import/require of package.

**Interpretation:** Isolated technology signal. Observed federation uses Rspack built-in plugin without this package.

### 2. frontend/apps/host/rspack.config.ts:1; frontend/apps/host/rspack.config.ts:82-94

**Observation:** Rspack `ModuleFederationPlugin` declares `name: "host"`, remotes `remote_header`, `remote_footer`, `url_shortener`, respectively resolved through `http://localhost:3001/remoteEntry.js`, `http://localhost:3002/remoteEntry.js`, `http://localhost:3003/remoteEntry.js`. Shares `react`, `react-dom`, `vue` as singleton/eager.

**Interpretation:** Configuration explicitly links host to three remote units through Module Federation. URLs record local target resolution.

### 3. frontend/apps/remote-footer/rspack.config.ts:73-84

**Observation:** Federation plugin declares `name: "remote_footer"`, `filename: "remoteEntry.js"`, exposes `./Footer` from `./src/Footer.tsx` and shares `react`, `react-dom` singleton/eager.

**Interpretation:** Configures mechanism/module offered by remote-footer unit without naming consumer in block.

### 4. frontend/apps/remote-header/rspack.config.ts:73-84

**Observation:** Federation plugin declares `name: "remote_header"`, `filename: "remoteEntry.js"`, exposes `./Header` from `./src/Header.tsx` and shares `react`, `react-dom` singleton/eager.

**Interpretation:** Configures mechanism/module offered by remote-header unit without naming consumer in block.

### 5. frontend/apps/url-shortener/rspack.config.ts:74-87

**Observation:** Federation plugin declares `name: "url_shortener"`, `filename: "remoteEntry.js"`, exposes `./Shortener` from `./src/Shortener.vue` and shares `vue` singleton/eager, with `requiredVersion: "^3.4.0"`.

**Interpretation:** Configures mechanism/module offered by url-shortener unit without naming consumer in block.

### 6. frontend/apps/host/package.json:4-7

**Observation:** Host field `zephyr:dependencies` declares `remote-header@^1.0.0`, `remote-footer@^1.0.0`. Excludes `url-shortener`.

**Interpretation:** Configuration names two remote targets as host Zephyr dependencies. Situates units but declared ranges do not demonstrate independent versioning/completed publication.

### 7. frontend/apps/host/src/App.tsx:6; frontend/apps/host/rspack.config.ts:85; frontend/apps/remote-header/rspack.config.ts:74-78

**Observation:** `React.lazy(() => import("remote_header/Header"))` assigns `RemoteHeader` module `./Header` from remote `remote_header`, declared in host configuration.

**Interpretation:** Loading names remote target/crosses host–header boundary through Module Federation.

### 8. frontend/apps/host/src/App.tsx:7; frontend/apps/host/rspack.config.ts:86; frontend/apps/remote-footer/rspack.config.ts:74-78

**Observation:** `React.lazy(() => import("remote_footer/Footer"))` assigns `RemoteFooter` module `./Footer` from remote `remote_footer`, declared in host configuration.

**Interpretation:** Loading names remote target/crosses host–footer boundary through Module Federation.

### 9. frontend/apps/host/src/utils/VueShortener.tsx:12; frontend/apps/host/rspack.config.ts:87; frontend/apps/url-shortener/rspack.config.ts:75-78

**Observation:** Host wrapper executes `await import("url_shortener/Shortener")`, receiving module `./Shortener` exposed by remote `url_shortener`.

**Interpretation:** Loading names Vue target/links host to remote module through Module Federation.

### 10. frontend/apps/host/src/utils/VueShortener.tsx:10-16

**Observation:** Wrapper loads `createApp` from `vue`, creates application with `Shortener.default`, imported from `url_shortener/Shortener`, and executes `app.mount(containerRef.current)`.

**Interpretation:** Mount inserts remote Vue component in React host container. Mount call integrates rendering of previously loaded module.

### 11. frontend/apps/host/src/App.tsx:6; frontend/apps/host/src/App.tsx:12-14; frontend/apps/host/src/App.tsx:27-28

**Observation:** Host renders `<RemoteHeader />` inside `Suspense`, using component resolved through `React.lazy`; `App` itself mounted through `root.render(<App />)`.

**Interpretation:** Rendering uses host-loaded remote component/participates in header relationship.

### 12. frontend/apps/host/src/App.tsx:7; frontend/apps/host/src/App.tsx:20-22

**Observation:** Host renders `<RemoteFooter />` inside `Suspense`, using component resolved through `React.lazy`.

**Interpretation:** Rendering uses host-loaded remote component/participates in footer relationship.

### 13. frontend; frontend/index.html:1-14; frontend/package.json:12-16

**Observation:** Root `frontend` aggregates scripts entering each application directory for build. Its `index.html` loads no script and unused by build per 3.4.3.

**Interpretation:** Coordination root classified Frontend unit `No`; adds no fifth unit.

### 14. frontend/apps/host; frontend/apps/host/rspack.config.ts:9-10; frontend/apps/host/rspack.config.ts:102-103; frontend/apps/host/package.json:9

**Observation:** Directory host has own manifest, entry `./src/App.tsx`, template `./index.html` and own Rspack build script.

**Interpretation:** Frontend React unit with confirmed entry/build boundary, recorded `Yes` in 3.4.3.

### 15. frontend/apps/remote-footer; frontend/apps/remote-footer/rspack.config.ts:9-10; frontend/apps/remote-footer/rspack.config.ts:89-90; frontend/apps/remote-footer/package.json:5

**Observation:** Directory remote-footer has own manifest, entry `./src/index.tsx`, template `./index.html` and own Rspack build script.

**Interpretation:** Frontend React unit with confirmed entry/build boundary, recorded `Yes` in 3.4.3.

### 16. frontend/apps/remote-header; frontend/apps/remote-header/rspack.config.ts:9-10; frontend/apps/remote-header/rspack.config.ts:89-90; frontend/apps/remote-header/package.json:5

**Observation:** Directory remote-header has own manifest, entry `./src/index.tsx`, template `./index.html` and own Rspack build script.

**Interpretation:** Frontend React unit with confirmed entry/build boundary, recorded `Yes` in 3.4.3.

### 17. frontend/apps/url-shortener; frontend/apps/url-shortener/rspack.config.ts:7-8; frontend/apps/url-shortener/rspack.config.ts:96-97; frontend/apps/url-shortener/package.json:5

**Observation:** Directory url-shortener has own manifest, entry `./src/index.ts`, template `./index.html` and own Rspack build script.

**Interpretation:** Frontend Vue 3 unit with confirmed entry/build boundary, recorded `Yes` in 3.4.3.

### 18. frontend/apps/host/src/App.tsx:6; frontend/apps/host/src/App.tsx:13; frontend/apps/host/rspack.config.ts:85; frontend/apps/remote-header/rspack.config.ts:74-78

**Observation:** Host references `remote_header/Header`; remote `remote_header` matches name/module exposed in `frontend/apps/remote-header`. Host renders component in `Suspense`.

**Interpretation:** Active `host → remote` Module Federation relationship with both units in snapshot.

### 19. frontend/apps/host/src/App.tsx:7; frontend/apps/host/src/App.tsx:21; frontend/apps/host/rspack.config.ts:86; frontend/apps/remote-footer/rspack.config.ts:74-78

**Observation:** Host references `remote_footer/Footer`; remote `remote_footer` matches name/module exposed in `frontend/apps/remote-footer`. Host renders component in `Suspense`.

**Interpretation:** Active `host → remote` Module Federation relationship with both units in snapshot.

### 20. frontend/apps/host/src/utils/VueShortener.tsx:12-16; frontend/apps/host/src/App.tsx:4; frontend/apps/host/src/App.tsx:17; frontend/apps/host/rspack.config.ts:87; frontend/apps/url-shortener/rspack.config.ts:75-78

**Observation:** Host references `url_shortener/Shortener`; remote `url_shortener` matches name/module exposed in `frontend/apps/url-shortener`. Wrapper creates/mounts Vue application in React host.

**Interpretation:** Active `host → remote` Module Federation relationship with both units in snapshot. Subsequent Vue mounting does not change target’s module entry.

### 21. frontend/apps/host/package.json:3; frontend/apps/host/package.json:9; frontend/apps/host/rspack.config.ts:7; frontend/apps/host/rspack.config.ts:82-94; frontend/package.json:12; frontend/package.json:16

**Observation:** Application host has own `rspack build` script/configuration wrapped by `withZephyr()`. Root calls individual build/includes it in `build:all`. Manifest version `1.0.0`; section 3.4.6 records Build `separate`, Deployment `separate`, Independent versioning `No`.

**Interpretation:** Per-application build/publication boundary through Zephyr plugin. Snapshot supplies no published address or version usage in publication; local URLs do not prove completed deployment.

### 22. frontend/apps/remote-footer/package.json:3; frontend/apps/remote-footer/package.json:5; frontend/apps/remote-footer/rspack.config.ts:7; frontend/apps/remote-footer/rspack.config.ts:73-84; frontend/package.json:14; frontend/package.json:16

**Observation:** Application remote-footer has own `rspack build` script/configuration wrapped by `withZephyr()`. Root calls individual build/includes it in `build:all`. Manifest version `1.0.0`; section 3.4.6 records Build `separate`, Deployment `separate`, Independent versioning `No`.

**Interpretation:** Per-application build/publication boundary through Zephyr plugin. Snapshot supplies no published address or version usage in publication; local URLs do not prove completed deployment.

### 23. frontend/apps/remote-header/package.json:3; frontend/apps/remote-header/package.json:5; frontend/apps/remote-header/rspack.config.ts:7; frontend/apps/remote-header/rspack.config.ts:73-84; frontend/package.json:13; frontend/package.json:16

**Observation:** Application remote-header has own `rspack build` script/configuration wrapped by `withZephyr()`. Root calls individual build/includes it in `build:all`. Manifest version `1.0.0`; section 3.4.6 records Build `separate`, Deployment `separate`, Independent versioning `No`.

**Interpretation:** Per-application build/publication boundary through Zephyr plugin. Snapshot supplies no published address or version usage in publication; local URLs do not prove completed deployment.

### 24. frontend/apps/url-shortener/package.json:3; frontend/apps/url-shortener/package.json:5; frontend/apps/url-shortener/rspack.config.ts:5; frontend/apps/url-shortener/rspack.config.ts:74-87; frontend/package.json:15; frontend/package.json:16

**Observation:** Application url-shortener has own `rspack build` script/configuration wrapped by `withZephyr()`. Root calls individual build/includes it in `build:all`. Manifest version `1.0.0`; section 3.4.6 records Build `separate`, Deployment `separate`, Independent versioning `No`.

**Interpretation:** Per-application build/publication boundary through Zephyr plugin. Snapshot supplies no published address or version usage in publication; local URLs do not prove completed deployment.

### 25. frontend/README.md:3

**Observation:** README presents microfrontend architecture demonstration with Rspack, Module Federation, React and Zephyr Cloud.

**Interpretation:** Architectural claim corroborated by active relationships/publication configurations without proving deployment occurred.

### 26. frontend/README.md:7

**Observation:** README describes Host Application as main application consuming remote microfrontends.

**Interpretation:** Declared consumer role corroborated by three host relationships.

### 27. frontend/README.md:8

**Observation:** README describes Remote Header as independent header component.

**Interpretation:** Corroborated by header own entry/build boundary; concerns execution/development without claiming independent versioning.

### 28. frontend/README.md:9

**Observation:** README describes Remote Footer as independent footer component.

**Interpretation:** Corroborated by footer own entry/build boundary; concerns execution/development without claiming independent versioning.

### 29. 87ab32c 2025-05-26 (package.json; module-federation.config.ts; rspack.config.ts); dc92890 2025-05-27 (module-federation.config.ts; apps/host/rspack.config.ts); a9f8005 2025-05-27 (package.json); 8b5da15 2025-06-02 (frontend/package.json); be7d3bc 2025-06-04 (frontend/package.json)

**Observation:** Historical point in 3.4.8 records root manifest creation, removal of root federation configuration when applications appear, manifest changes/move to `frontend/`. Old objects needed to read manifests/configurations unavailable. Result `inconclusive`.

**Interpretation:** Cannot determine when `@module-federation/enhanced` declared or past usage. Historical uncertainty does not alter snapshot reading: dependency unused and current federation from Rspack.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/package.json:59) | 1 technology | manifest | module-federation | technological | weak | — |
| 2 | 3.4.2 (frontend/package.json:59, Evidence); 3.4.3 (frontend/apps/host, Markers, Entry, Build, Deploy); 3.4.4 (frontend/apps/host/src/App.tsx:6, :7; frontend/apps/host/src/utils/VueShortener.tsx:12, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1 (Evidence); 3.4.7 #1, #2 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #7; configures #8; configures #9; configures #14; configures #18; configures #19; configures #20 |
| 3 | 3.4.2 (frontend/package.json:59, Evidence); 3.4.3 (frontend/apps/remote-footer, Markers, Entry, Build, Deploy); 3.4.4 (frontend/apps/host/src/App.tsx:7, Observation); 3.4.5 #2 (Configuration); 3.4.6 #2 (Evidence); 3.4.7 #4 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #19 |
| 4 | 3.4.2 (frontend/package.json:59, Evidence); 3.4.3 (frontend/apps/remote-header, Markers, Entry, Build, Deploy); 3.4.4 (frontend/apps/host/src/App.tsx:6, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Evidence); 3.4.7 #3 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #16; configures #18 |
| 5 | 3.4.2 (frontend/package.json:59, Evidence); 3.4.3 (frontend/apps/url-shortener, Markers, Entry, Build, Deploy); 3.4.4 (frontend/apps/host/src/utils/VueShortener.tsx:12, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #20 |
| 6 | 3.4.3 (frontend/apps/host, Markers, Manifesto) | 2 configuration | configuration | — | architectural | strong | configures #14; configures #18; configures #19 |
| 7 | 3.4.4 (frontend/apps/host/src/App.tsx:6) | 3 code | source code | module-federation | architectural | strong | implements #18 |
| 8 | 3.4.4 (frontend/apps/host/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 9 | 3.4.4 (frontend/apps/host/src/utils/VueShortener.tsx:12) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 10 | 3.4.4 (frontend/apps/host/src/utils/VueShortener.tsx:16) | 3 code | source code | module-federation | architectural | moderate | implements #20 |
| 11 | 3.4.4 (frontend/apps/host/src/App.tsx:13) | 3 code | source code | module-federation | architectural | moderate | implements #18 |
| 12 | 3.4.4 (frontend/apps/host/src/App.tsx:21) | 3 code | source code | module-federation | architectural | moderate | implements #19 |
| 13 | 3.4.3 (frontend) | 4 structure | directory | — | context | weak | — |
| 14 | 3.4.3 (frontend/apps/host) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (frontend/apps/remote-footer) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (frontend/apps/remote-header) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (frontend/apps/url-shortener) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #14; links #16 |
| 19 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #14; links #15 |
| 20 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #14; links #17 |
| 21 | 3.4.6 #1 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #14 |
| 22 | 3.4.6 #2 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #15 |
| 23 | 3.4.6 #3 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #16 |
| 24 | 3.4.6 #4 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #17 |
| 25 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #2; corroborates #18; corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #23; corroborates #24 |
| 26 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #2; corroborates #18; corroborates #19; corroborates #20 |
| 27 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #16 |
| 28 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #15 |
| 29 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #1 |

## Summary

Observations: 29. Dimensions (technology: 1, configuration: 5, code: 6, structure: 5, composition: 3, build-deploy: 4, documentation: 4, history: 1). Strength (strong: 8, moderate: 14, weak: 7, ambiguous: 0). Evidence (technological: 5, architectural: 23, context: 1).
