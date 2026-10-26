---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
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

# 327 — samhoooo/module-federation-demo-mf2

## Repository overview

Chain starts with Module Federation dependencies (#1–#2), passes through HeaderApp header exposure (#3) and manifest-based HomeApp consumer configuration (#4), reaching host loading/rendering (#6–#7). Both units have own entries/builds (#8–#9, #11–#12). Matching remote name/exposed module supports active home-app → header-app relationship (#10), in repository with two React/Rspack applications.

Generated-declaration import (#5) does not load runtime code. Documentation describes unit roles, composition and cross-build typing (#13–#21), but separate build/deployment claim corroborated only for build (#22). Independent deployment unobserved (#11–#12). History clarifies claim/development configurations coexist since first commit without recorded abandoned deployment stage (#23); external publication/future intent outside what history clarifies.

## Observations

### 1. header-app/package.json:15

**Observation:** Manifest of header-app declares `@module-federation/enhanced` in devDependencies, version `^2.8.2`.

**Interpretation:** Isolated Module Federation technology signal; effective configuration in #3.

### 2. home-app/package.json:15

**Observation:** Manifest of home-app declares `@module-federation/enhanced` in devDependencies, version `^2.8.2`.

**Interpretation:** Isolated Module Federation technology signal; effective configuration in #4.

### 3. header-app/rspack.config.js:57-75

**Observation:** `ModuleFederationPlugin` configures `name: "HeaderApp"`, `filename: "remoteEntry.js"`, exposure `./Header` from `./src/App`, `dts: true` and React/ReactDOM shared as singletons.

**Interpretation:** Configures UI module/type offer by unit without naming consumer.

### 4. home-app/rspack.config.js:46-66

**Observation:** `ModuleFederationPlugin` configures `name: "HomeApp"`, remote `HeaderApp` at `HeaderApp@http://localhost:4001/mf-manifest.json`, `dts: true` and React/ReactDOM shared as singletons.

**Interpretation:** Links host HomeApp to remote HeaderApp through manifest, configuring code/type consumption.

### 5. home-app/@mf-types/HeaderApp/apis.d.ts:3; home-app/tsconfig.json:15-17; home-app/@mf-types/index.d.ts:1-22

**Observation:** Generated declaration uses `typeof import('HeaderApp/Header')` in conditional type. tsconfig resolves `HeaderApp/*` to local `@mf-types` declarations.

**Interpretation:** Remote-import syntax in file is typing rather than runtime loading; 3.4.4 records Composition No.

### 6. home-app/src/App.tsx:13; home-app/rspack.config.js:51-53; header-app/rspack.config.js:60-62

**Observation:** `lazy(() => import('HeaderApp/Header'))` names remote module. Host resolves HeaderApp through manifest; remote exposes `./Header` from `./src/App`.

**Interpretation:** Loading names composition target/connects host to header-app UI module.

### 7. home-app/src/App.tsx:11-20; header-app/src/App.tsx:14-20

**Observation:** Inside Suspense, host renders `<Header title="Header (MF2)" variant={HeaderVariant.Light} />`. Header from lazy; HeaderVariant from static import of `HeaderApp/Header`.

**Interpretation:** Integrates remote header into page through props; rendering uses load-prepared component without directly naming target in tag.

### 8. header-app/; header-app/rspack.config.js:7; header-app/src/entry.ts:1; header-app/src/index.tsx:11-16; header-app/rspack.config.js:54-56; header-app/package.json:11

**Observation:** Directory header-app has own manifest, entry through entry.ts and index.tsx, HTML template/Rspack configuration; build script `rspack build`.

**Interpretation:** Confirms frontend unit boundary, remote HeaderApp also rendering own page.

### 9. home-app/; home-app/rspack.config.js:6; home-app/src/entry.ts:1; home-app/src/index.tsx:11-16; home-app/rspack.config.js:43-45; home-app/package.json:11

**Observation:** Directory home-app has own manifest, entry through entry.ts and index.tsx, HTML template/Rspack configuration; build script `rspack build`.

**Interpretation:** Confirms frontend unit boundary, host HomeApp.

### 10. home-app/src/App.tsx:13; home-app/src/App.tsx:19; home-app/rspack.config.js:51-53; header-app/rspack.config.js:58-62

**Observation:** home-app declares HeaderApp through manifest, imports `HeaderApp/Header`, renders Header. HeaderApp name/exposure `./Header` match header-app configuration.

**Interpretation:** Active host → remote relationship with both units in snapshot: host composes page top with remote UI.

### 11. header-app/package.json:10-12; header-app/rspack.config.js:6-81

**Observation:** header-app has own `rspack build`; Rspack configuration uses development mode, port 4001, localhost publicPath/federation plugin. Section 3.4.6 records separate Build, unobserved Deployment and Versioning No.

**Interpretation:** Supports unit build separation but development artifacts do not demonstrate independent deployment.

### 12. home-app/package.json:10-12; home-app/rspack.config.js:5-72

**Observation:** home-app has own `rspack build`; Rspack configuration uses development mode, port 4000, localhost publicPath and manifest-based HeaderApp remote. Section 3.4.6 records separate Build, unobserved Deployment and Versioning No.

**Interpretation:** Supports host build separation without demonstrating independent deployment.

### 13. README.md:3

**Observation:** README presents example designed with micro frontend architectural pattern using Module Federation 2.0.

**Interpretation:** Claims MFE organization corroborated by two units/relationship; claim alone semantic.

### 14. README.md:5-6

**Observation:** README calls header-app remote, says it exposes `./Header` and publishes `mf-manifest.json`/generated `.d.ts` types.

**Interpretation:** Describes remote role/offer corroborated by configuration, relationship and generated declarations.

### 15. README.md:11-12

**Observation:** README calls home-app host, consuming `HeaderApp/Header` through manifest with type checking even in separate build.

**Interpretation:** Describes cross-unit consumption/cross-build typing corroborated by relationship, builds/TypeScript paths.

### 16. README.md:19-20

**Observation:** README instructs starting header-app first, says home-app retrieves runtime bundle/types on startup.

**Interpretation:** Describes consumer dependency on remote. Per 3.4.7 types fetched on startup; remote code loaded when browser opens host.

### 17. README.md:28

**Observation:** README instructs opening `http://localhost:4001` to see remote Header App.

**Interpretation:** Claims remote can show UI alone, corroborated by own entry/template.

### 18. README.md:30

**Observation:** README instructs isolated application type checking through `npm run typecheck`.

**Interpretation:** Unit type-check autonomy corroborated by individual scripts/declarations included in host.

### 19. home-app/rspack.config.js:48-50

**Observation:** Comment says remotes resolved through `mf-manifest.json` rather than fixed remoteEntry.js URL, allowing runtime resolution.

**Interpretation:** Describes consumer/remote mechanism corroborated by configured manifest/dynamic import. Manifest URL also fixed, as 3.4.7 qualifies.

### 20. home-app/src/App.tsx:3-5

**Observation:** Comment says TypeScript downloaded HeaderApp generated declarations to `./@mf-types/HeaderApp`, resolving them through paths `HeaderApp/*`.

**Interpretation:** Describes cross-unit type link corroborated by declarations, local mapping/configured dts.

### 21. home-app/src/App.tsx:5-8

**Observation:** Comment says HeaderVariant is header-app enum whose import brings types/runtime values from remote build without common package/handwritten declarations.

**Interpretation:** Describes cross-build value/type consumption corroborated by static import recorded in 3.4.4 Notes, enum/module exposure.

### 22. home-app/src/App.tsx:8-10

**Observation:** Comment says tsc rejects invalid props even with completely separate header-app build/deployment.

**Interpretation:** Partial claim in 3.4.7: builds separate, but separate deployment has no observed artifact.

### 23. eeac072 2026-08-10 (home-app/src/App.tsx; header-app/package.json; home-app/package.json; header-app/rspack.config.js; home-app/rspack.config.js)

**Observation:** Section 3.4.8 records first commit creating separate build/deployment comment and both applications with development configurations. Next two commits change only README; none of three creates/removes deployment artifact. Point clarified.

**Interpretation:** History explains comment/absence of provisioned deployment coexist since first observable presence without abandoned deployment stage. Does not clarify external publication/future intent.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (header-app/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #3 |
| 2 | 3.4.2 (home-app/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 3 | 3.4.2 (header-app/package.json:15, Evidence); 3.4.3 (header-app, Markers and Build); 3.4.4 (home-app/src/App.tsx:13, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #2, #8, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #8; configures #10 |
| 4 | 3.4.2 (home-app/package.json:15, Evidence); 3.4.3 (home-app, Markers and Build); 3.4.4 (home-app/@mf-types/HeaderApp/apis.d.ts:3 and home-app/src/App.tsx:13, :19, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #2, #3, #4, #7, #8 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #6; configures #7; configures #9; configures #10 |
| 5 | 3.4.4 (home-app/@mf-types/HeaderApp/apis.d.ts:3) | 3 code | source code | module-federation | technological | weak | — |
| 6 | 3.4.4 (home-app/src/App.tsx:13) | 3 code | source code | module-federation | architectural | strong | implements #10 |
| 7 | 3.4.4 (home-app/src/App.tsx:19) | 3 code | source code | module-federation | architectural | moderate | implements #10 |
| 8 | 3.4.3 (header-app) | 4 structure | directory | module-federation | architectural | moderate | — |
| 9 | 3.4.3 (home-app) | 4 structure | directory | module-federation | architectural | moderate | — |
| 10 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #9; links #8 |
| 11 | 3.4.6 #1 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #8 |
| 12 | 3.4.6 #2 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #9 |
| 13 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #8; corroborates #9; corroborates #10 |
| 14 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #3; corroborates #4; corroborates #10; corroborates home-app/@mf-types/HeaderApp/Header.d.ts:1-2 |
| 15 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #4; corroborates #10; corroborates #11; corroborates #12; corroborates home-app/tsconfig.json:15-17 |
| 16 | 3.4.7 #4 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #6; corroborates #4; corroborates header-app/rspack.config.js:14-20 |
| 17 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #8 |
| 18 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates header-app/package.json:12; corroborates home-app/package.json:12; corroborates home-app/tsconfig.json:15-19 |
| 19 | 3.4.7 #7 | 7 documentation | comment | module-federation | architectural | weak | corroborates #4; corroborates #6; corroborates #10 |
| 20 | 3.4.7 #8 | 7 documentation | comment | module-federation | architectural | weak | corroborates #3; corroborates #4; corroborates home-app/tsconfig.json:15-17; corroborates home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12 |
| 21 | 3.4.7 #9 | 7 documentation | comment | module-federation | architectural | weak | corroborates home-app/src/App.tsx:11; corroborates header-app/src/App.tsx:4-7; corroborates #3; corroborates home-app/@mf-types/index.d.ts:1-22 |
| 22 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | partially corroborates #11; partially corroborates #12 |
| 23 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #22; explains #11; explains #12 |

## Summary

Observations: 23. Dimensions (technology: 2, configuration: 2, code: 3, structure: 2, composition: 1, build-deploy: 2, documentation: 10, history: 1). Strength (strong: 3, moderate: 6, weak: 14, ambiguous: 0). Evidence (technological: 4, architectural: 19, context: 0).
