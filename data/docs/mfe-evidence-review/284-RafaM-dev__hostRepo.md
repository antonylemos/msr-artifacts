---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

# 284 — RafaM-dev/hostRepo

## Repository overview

Snapshot contains root React + Vite application: host with own entry/build (#4, #6). Declaration of `@originjs/vite-plugin-federation` initial technological signal (#1). Plugin configures host to resolve `mf-remoteDetails` at `http://localhost:5001/assets/remoteEntry.js`, sharing `react` and `react-dom` (#2). Code imports `DetailEpisode` from remote, rendering in episode list and passing selected character, open state and close callback (#3). Supports active host → remote relationship (#5). Target outside snapshot: implementation/build/deployment unobservable here. Own host build confirms unit boundary without observed deployment (#6).

Dependency declaration alone weak (#1). Configuration naming/resolving other unit and active relationship strong (#2, #5). Remote component rendering outside target-naming route moderate (#3); route `/episodes` mounts local component `ListEpisodes`. Structure/build also moderate (#4, #6).

Documentation confirms host/remote organization, remote dependency and composition mechanism (#7–#11), but claims weak semantic signals. Alleged scalability uncorroborated (#12). Concrete divergence: README names `remote_root` at port 5174, configuration/import use `mf-remoteDetails` at port 5001 (#13). History clarifies configuration unchanged since first observable commit; last README change later than configuration/composition code (#14). No earlier configuration stage explaining README name observed; text origin unknown without making snapshot composition ambiguous.

## Observations

### 1. package.json:26

**Observation:** `@originjs/vite-plugin-federation`, version `^1.4.1`, declared in `devDependencies`.

**Interpretation:** Dependency signals Module Federation; declaration alone establishes neither units nor composition relationship.

### 2. vite.config.ts:3; vite.config.ts:8-15

**Observation:** File imports `federation` from `@originjs/vite-plugin-federation`, applying plugin in `plugins`. Block declares `name: "host"`, `filename: "remoteEntry.js"`, remote `mf-remoteDetails` at `http://localhost:5001/assets/remoteEntry.js` and `shared: ["react", "react-dom"]`. No `exposes` declaration.

**Interpretation:** Configuration explicitly links host to another unit through Module Federation, indicating resolution name/address. Host shares React/React DOM without offering modules through `exposes`.

### 3. src/features/episodes_list/ListEpisodes.tsx:15; src/features/episodes_list/ListEpisodes.tsx:96-100; src/declare.d.ts:1-4; vite.config.ts:11-13; src/App.tsx:4; src/App.tsx:11; src/main.tsx:7-13

**Observation:** `ListEpisodes` imports `DetailEpisode` from `mf-remoteDetails/DetailEpisode`, rendering `<DetailEpisode />` and passing `character={selectedCharacter}`, `open={!!selectedCharacter}` and `onClose={() => setSelectedCharacter(null)}`. Type declaration for same module. Name `mf-remoteDetails` in Vite `remotes`. `App` imports `ListEpisodes`, mounting at route `/episodes`; `main.tsx` renders `App`.

**Interpretation:** Host uses external unit component within episode list with data/callback through props. Construct implements runtime composition. Rendering inside local component; route names local component rather than directly remote unit.

### 4. .; index.html:11; src/main.tsx:7-13; vite.config.ts:5-17; package.json:8

**Observation:** Root contains `index.html`, `package.json` and `vite.config.ts`. HTML loads `/src/main.tsx`, rendering `App`. Script `build` executes `tsc -b && vite build`; Vite configures React/federation plugins. Structural review records root as only snapshot frontend application without workspace declaration/deployment artifact.

**Interpretation:** Root delimits frontend unit with own entry/build: host. Existence alone demonstrates no other frontend link.

### 5. src/features/episodes_list/ListEpisodes.tsx:15; src/features/episodes_list/ListEpisodes.tsx:96-100; vite.config.ts:11-13; src/App.tsx:11; src/main.tsx:7-13

**Observation:** Source `.` imports/renders `DetailEpisode` from `mf-remoteDetails/DetailEpisode`. `remotes` resolves `mf-remoteDetails` at `http://localhost:5001/assets/remoteEntry.js`. Component used in `ListEpisodes`, mounted at route `/episodes` of `App` rendered by `main.tsx`. Composition review records relationship `host → remote`, direction `source → target`, mechanism `module-federation`, `In snapshot: No` and `Active: Yes`.

**Interpretation:** Active host composition relationship with remote external to snapshot. Target name/address observable consumer-side; remote implementation/module exposure unverifiable in repository.

### 6. package.json:4; package.json:7-10; vite.config.ts:5-17

**Observation:** Host has script `build: "tsc -b && vite build"` and own Vite configuration with React/federation. Other execution scripts `dev: "vite"` and `preview: "vite preview"`; manifest version `0.0.0`. Build/deployment review records for `.` build `separate`, deployment `not observed`, served location `—` and versioning `No`, without snapshot publication artifact.

**Interpretation:** Build confirms host own boundary separate from external remote code. No evidence of deployment or independent host publication versioning.

### 7. README.md:3

**Observation:** README claims application implements microfrontend architecture through Module Federation.

**Interpretation:** Architectural organization claim corroborated by configured dependency/host → remote relationship. Phrase alone configures/implements no organization.

### 8. README.md:3

**Observation:** README presents application as main host integrating remote modules.

**Interpretation:** Documentation assigns repository host role corroborated by root unit, configuration/remote consumption. Snapshot shows single remote/module consumed although phrase plural.

### 9. README.md:21

**Observation:** README lists running remote application at configured port as Module Federation requirement.

**Interpretation:** Claim describes host dependency on runtime-available remote unit, corroborated by static import, configuration/active relationship. Establishes no remote deployment.

### 10. README.md:75

**Observation:** README claims project uses `@originjs/vite-plugin-federation` for Module Federation.

**Interpretation:** Claim names composition technology, corroborated by declaration/import/plugin application. Alone locates neither unit boundaries nor inter-unit link.

### 11. README.md:299

**Observation:** README lists dynamic remote module loading as Module Federation feature.

**Interpretation:** Claim describes runtime loading mechanism corroborated by remote resolution/component rendering. Isolated wording identifies no involved units.

### 12. README.md:300

**Observation:** README characterizes microfrontend architecture as scalable.

**Interpretation:** Alleged architectural property uncorroborated in documentation review. Configuring/consuming remote demonstrates composition but neither confirms nor contradicts scalability.

### 13. README.md:346-347

**Observation:** README claims application consumes modules of remote microfrontend `remote_root` at port 5174.

**Interpretation:** Claim locates host/target but contradicted by snapshot configuration/import using `mf-remoteDetails` at port 5001. Architectural reading follows observed relationship without turning README name into another unit.

### 14. 8a62219 2025-11-19 (vite.config.ts; README.md); e68ba94 2025-11-19 (vite.config.ts; README.md)

**Observation:** History review records `vite.config.ts` touched only in first observable commit, `8a62219`, retaining same object through snapshot, `06a796a`, with `mf-remoteDetails` at port 5001. README changes once in snapshot commit, `e68ba94`, later than configuration/composition code. Old README unreadable due to missing object. README/configuration conflict point result `clarified`.

**Interpretation:** History explains documentary divergence: no observable `vite.config.ts` stage with `remote_root` at port 5174. Divergent text written/retained in final README with current configuration already present. Whether in first README or external origin undetermined; snapshot relationship unchanged.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:26) | 1 technology | manifest | module-federation | technological | weak | declares #2 |
| 2 | 3.4.2 (package.json:26, Evidence); 3.4.3 (., Markers, Build); 3.4.4 (src/features/episodes_list/ListEpisodes.tsx:96, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #1, #2, #3, #4, #5, #7 (Evidence); 3.4.8 #1 (Point) | 2 configuration | configuration | module-federation | architectural | strong | configures #3; configures #4; configures #5 |
| 3 | 3.4.4 (src/features/episodes_list/ListEpisodes.tsx:96) | 3 code | source code | module-federation | architectural | moderate | implements #5 |
| 4 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 5 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #4; links vite.config.ts:12 |
| 6 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #4 |
| 7 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #5 |
| 8 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #2; corroborates #3; corroborates #4; corroborates #5 |
| 9 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #2; corroborates #3; corroborates #5 |
| 10 | 3.4.7 #4 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2 |
| 11 | 3.4.7 #5 | 7 documentation | documentation | module-federation | technological | weak | corroborates #2; corroborates #3; corroborates #5 |
| 12 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | — |
| 13 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts #2; contradicts #3; contradicts #5 |
| 14 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #2; explains #13 |

## Summary

Observations: 14. Dimensions (technology: 1, configuration: 1, code: 1, structure: 1, composition: 1, build-deploy: 1, documentation: 7, history: 1). Strength (strong: 2, moderate: 3, weak: 9, ambiguous: 0). Evidence (technological: 3, architectural: 11, context: 0).

