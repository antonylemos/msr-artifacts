---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
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

# 299 — DATou-love/micro-frontEnd

## Repository overview

Observable chain combines host qiankun dependency (#1), sub-app UMD output (#2), explicit target registration (#8) and mounting/unmounting lifecycles (#3–#6). Relationships #12 and #13 link Vue 3/Vite host to sub-vue2/sub-react16. Two present units with own entries/builds (#10, #11, #14, #15); sub-react16 only declared external target without snapshot-verifiable code/availability. Reviews record both relationships active. Possible strictStyleIsolation mounting issue does not change values, unverified by execution (#6, #9, #12).

Registration/start application-executed code (#8, #9) rather than configuration file. Dimension 2 only tool block configuring sub-app library (#2). Development ports, CORS, aliases and HTML base add no composition configuration observations under step scope. HTML base remains relationship #12/claim #21 support. No observed deployment for two applications (#14, #15).

Thirteen claims comments (#16–#28), weak alone. Two confuse mounting point/router base definition (#22, #26); cited implementations contradict them. Single commit does not clarify comment origins (#29, #30), but historical uncertainty does not make recorded snapshot architecture ambiguous.

## Observations

### 1. main-vue3/package.json:12

**Observation:** Host manifest declares `qiankun: ^2.10.16`.

**Interpretation:** Declaration isolated technological signal; usage in code observations.

### 2. sub-vue2/vue.config.js:3-23

**Observation:** Sub-app configuration defines output with `library: 'subVue2'`, `libraryTarget: 'umd'` and `chunkLoadingGlobal: 'webpackJsonp_sub_vue2'`.

**Interpretation:** Block configures qiankun integration library format in unit without naming another application.

### 3. sub-vue2/src/main.js:32-34

**Observation:** Entry exports asynchronous function `bootstrap`, writing console message.

**Interpretation:** Export offers qiankun lifecycle contract portion without independently linking sub-app to host.

### 4. sub-vue2/src/main.js:36-39; sub-vue2/src/main.js:10-17

**Observation:** Exported function `mount(props)` calls `render(props)`, using received container.

**Interpretation:** Lifecycle implements orchestrator-triggered mounting, receiving execution unit through parameter.

### 5. sub-vue2/src/main.js:41-46

**Observation:** Exported function `unmount` destroys Vue instance, clears element and assigns `null` to instance.

**Interpretation:** Implements sub-app deactivation through qiankun contract without naming consumer.

### 6. sub-vue2/src/main.js:10-17; sub-vue2/src/main.js:27-29; sub-vue2/src/main.js:36-39

**Observation:** `render` mounts instance in `#app` found inside `props.container`, or global `#app` without container. Called by `mount(props)` and outside qiankun environment.

**Interpretation:** Mounting adapts application to supplied container/isolated execution. Mechanism names no host; strict-isolation operation not executed.

### 7. main-vue3/src/main.ts:3; main-vue3/src/main.ts:10-36; main-vue3/index.html:11

**Observation:** Host entry imports `registerMicroApps` and `start` from `qiankun`, using both functions.

**Interpretation:** Import prepares composition mechanism; units named by registration in own observation.

### 8. main-vue3/src/main.ts:10-23; main-vue3/src/App.vue:11

**Observation:** `registerMicroApps` registers `sub-vue2` with entry `//localhost:8081` and rule `/sub-vue2`, and `sub-react16` with entry `//localhost:3000` and rule `/sub-react16`; both use `#subapp-viewport`.

**Interpretation:** Registration links host to two units through explicit addresses/activation rules. Second only declared snapshot target.

### 9. main-vue3/src/main.ts:26-36; main-vue3/index.html:11

**Observation:** Entry calls `start` with `sandbox.strictStyleIsolation: true`.

**Interpretation:** Call starts qiankun mechanism without naming targets; enabled option alone demonstrates no successful mounting.

### 10. main-vue3/; main-vue3/package.json:1-24; main-vue3/index.html:10-11; main-vue3/src/main.ts:6-7; main-vue3/src/main.ts:38; main-vue3/vite.config.ts:6-17; main-vue3/package.json:8

**Observation:** Directory contains own manifest, HTML entry loading `src/main.ts`, Vue 3 creation/mounting and build `vue-tsc -b && vite build` with own Vite configuration.

**Interpretation:** Artifacts delimit frontend unit with own entry/build without alone establishing other-unit link.

### 11. sub-vue2/; sub-vue2/package.json:1-44; sub-vue2/src/main.js:10-17; sub-vue2/src/main.js:27-29; sub-vue2/public/index.html:17; sub-vue2/vue.config.js:3-23; sub-vue2/package.json:7

**Observation:** Directory contains own manifest, Vue 2 entry with mounting outside qiankun, template with `#app` and build `vue-cli-service build` with own configuration.

**Interpretation:** Artifacts delimit another frontend unit with entry/build separate from host.

### 12. main-vue3/src/main.ts:3; main-vue3/src/main.ts:10-16; main-vue3/src/main.ts:26-36; main-vue3/src/App.vue:11; sub-vue2/vue.config.js:6; sub-vue2/vue.config.js:15-18; sub-vue2/public/index.html:8; sub-vue2/src/main.js:16; sub-vue2/src/main.js:32-46

**Observation:** Host registers `sub-vue2` at `//localhost:8081`, in container `#subapp-viewport`, activated at `/sub-vue2`. Sub-app has port 8081, UMD output, HTML base `/sub-vue2/` and exported lifecycles. Review marks relationship `root-config → application`, present and active.

**Interpretation:** Matching registration, address and contract explicitly links two relatively independent units. Active describes registered code without demonstrating successful strict-isolation execution.

### 13. main-vue3/src/main.ts:3; main-vue3/src/main.ts:17-22; main-vue3/src/main.ts:26-36; main-vue3/src/App.vue:7; main-vue3/src/App.vue:11

**Observation:** Host registers `sub-react16` at `//localhost:3000`, in same container with activation `/sub-react16`. Review marks relationship `root-config → application`, active with target outside snapshot.

**Interpretation:** Relationship declares another unit through explicit composition mechanism without evaluating implementation/availability.

### 14. main-vue3/package.json:8; main-vue3/vite.config.ts:6-17

**Observation:** Host has own script `vue-tsc -b && vite build` and Vite configuration. Review records Build separate, Deploy not observed and Versioning No.

**Interpretation:** Build confirms unit artifact production boundary without demonstrating publication/independent versioning.

### 15. sub-vue2/package.json:7; sub-vue2/vue.config.js:12-20

**Observation:** Sub-app has script `vue-cli-service build` and UMD output `subVue2`. Review records Build separate, Deploy not observed and Versioning No.

**Interpretation:** Own sub-app build in qiankun contract without publication/independent versioning evidence.

### 16. main-vue3/src/App.vue:10

**Observation:** Comment states: “子应用挂载点” (English translation: Sub-application mounting point.).

**Interpretation:** Identifies host composition container; review records corroboration through element/sub-app registrations.

### 17. main-vue3/src/main.ts:9

**Observation:** Comment states: “定义子应用” (English translation: Define sub-applications.).

**Interpretation:** Describes registration organization, corroborated by two relationships without claiming all targets locally present.

### 18. main-vue3/src/main.ts:25

**Observation:** Comment states: “启动 qiankun” (English translation: Start qiankun.).

**Interpretation:** Names mechanism; actual call/dependency corroborate claim.

### 19. main-vue3/src/main.ts:29

**Observation:** Comment states: “开启严格的沙箱模式（推荐）” (English translation: Enable strict sandbox mode (recommended).).

**Interpretation:** Review corroborates only `strictStyleIsolation` activation without establishing functional isolation/security.

### 20. main-vue3/vite.config.ts:9

**Observation:** Comment states: “主应用端口” (English translation: Main application port.).

**Interpretation:** Identifies main-vue3 host role corroborated by unit/composition. Port demonstrates no deployment.

### 21. sub-vue2/public/index.html:7

**Observation:** Comment states: “子应用静态资源前缀” (English translation: Sub-application static asset prefix.).

**Interpretation:** Review corroborates unit relative-URL base through `base` element without inferring publication.

### 22. sub-vue2/public/index.html:15

**Observation:** Comment states: “子应用挂载点，必须与主应用配置一致” (English translation: Sub-application mounting point must match main application configuration.).

**Interpretation:** Review records contradiction: sub-app `subapp-viewport` element not mounting target, which is `#app`; outer container belongs to host.

### 23. sub-vue2/src/main.js:9

**Observation:** Comment states: “渲染函数 - Updated for qiankun integration” (English translation: Rendering function updated for qiankun integration.).

**Interpretation:** Review corroborates rendering adaptation to supplied container without attesting execution.

### 24. sub-vue2/src/main.js:26

**Observation:** Comment states: “如果在 qiankun 环境下，不立即挂载” (English translation: Do not mount immediately in qiankun environment.).

**Interpretation:** Describes deferring mounting to lifecycle; guard/mount call corroborate claim.

### 25. sub-vue2/src/main.js:31

**Observation:** Comment states: “qiankun 生命周期” (English translation: Qiankun lifecycle.).

**Interpretation:** Technological claim corroborated by bootstrap/mount/unmount exports and host relationship contract.

### 26. sub-vue2/src/router/index.js:9

**Observation:** Comment states: “在 qiankun 环境下，路由base会在main.js中动态设置” (English translation: Router base will be set dynamically in main.js in qiankun environment.).

**Interpretation:** Review records contradiction: base fixed at `/sub-vue2`; main.js changes resource public path without changing router base.

### 27. sub-vue2/vue.config.js:11

**Observation:** Comment states: “微前端配置” (English translation: Microfrontend configuration.).

**Interpretation:** Characterizes concrete sub-app output block; review corroborates through configuration/host relationship without mechanism named in comment.

### 28. sub-vue2/vue.config.js:14

**Observation:** Comment states: “微前端要求的库配置” (English translation: Library configuration required by microfrontend.).

**Interpretation:** Review corroborates sub-app output contract through UMD block/own build; comment establishes no general microfrontend requirement.

### 29. 8e52e7d 2025-11-03 (sub-vue2/public/index.html; sub-vue2/src/main.js; main-vue3/src/App.vue)

**Observation:** Only commit adds mounting comment, HTML elements and rendering implementation together. Review finds no earlier version/mounting-target change, recording inconclusive result.

**Interpretation:** Past does not distinguish earlier attempt, copy or comment error. Uncertainty leaves snapshot architectural reading unchanged: implemented target #app, documentary contradiction retained.

### 30. 8e52e7d 2025-11-03 (sub-vue2/src/router/index.js; sub-vue2/src/main.js; sub-vue2/vue.config.js)

**Observation:** Only commit adds dynamic-base comment, literal base /sub-vue2 and __webpack_public_path__ assignment together. Review finds no alternative main.js version, recording inconclusive result.

**Interpretation:** History does not clarify comment origin; uncertainty about past with fixed base/public-path adjustment clear in snapshot.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (main-vue3/package.json:12) | 1 technology | manifest | qiankun | technological | weak | declares #7; declares #8; declares #9 |
| 2 | 3.4.3 (sub-vue2, Build); 3.4.4 (sub-vue2/src/main.js:32, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #12, #13 (Evidence) | 2 configuration | configuration | qiankun | technological | moderate | configures #3; configures #4; configures #5; configures #11; configures #12; configures #15 |
| 3 | 3.4.4 (src-mount-export, sub-vue2/src/main.js:32) | 3 code | source code | qiankun | technological | moderate | implements #12 |
| 4 | 3.4.4 (src-mount-export, sub-vue2/src/main.js:36) | 3 code | source code | qiankun | technological | moderate | implements #12 |
| 5 | 3.4.4 (src-mount-export, sub-vue2/src/main.js:41) | 3 code | source code | qiankun | technological | moderate | implements #12 |
| 6 | 3.4.4 (src-mount-call, sub-vue2/src/main.js:16) | 3 code | source code | qiankun | technological | moderate | implements #12 |
| 7 | 3.4.4 (src-lifecycles, main-vue3/src/main.ts:3) | 3 code | source code | qiankun | technological | moderate | implements #12; implements #13 |
| 8 | 3.4.4 (src-lifecycles, main-vue3/src/main.ts:10) | 3 code | source code | qiankun | architectural | strong | implements #12; implements #13 |
| 9 | 3.4.4 (manual, main-vue3/src/main.ts:26) | 3 code | source code | qiankun | technological | moderate | implements #12; implements #13 |
| 10 | 3.4.3 (main-vue3) | 4 structure | directory | — | architectural | moderate | — |
| 11 | 3.4.3 (sub-vue2) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.5 #1 | 5 composition | source code | qiankun | architectural | strong | links #10; links #11 |
| 13 | 3.4.5 #2 | 5 composition | source code | qiankun | architectural | strong | links #10; links main-vue3/src/main.ts:17-22 |
| 14 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #10 |
| 15 | 3.4.6 #2 | 6 build-deploy | manifest | qiankun | architectural | moderate | publishes #11 |
| 16 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #12; corroborates #13 |
| 17 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #8; corroborates #12; corroborates #13 |
| 18 | 3.4.7 #3 | 7 documentation | comment | qiankun | technological | weak | corroborates #1; corroborates #7; corroborates #9 |
| 19 | 3.4.7 #4 | 7 documentation | comment | — | technological | weak | corroborates #9 |
| 20 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | corroborates #10; corroborates #12 |
| 21 | 3.4.7 #6 | 7 documentation | comment | — | architectural | weak | corroborates #12 |
| 22 | 3.4.7 #7 | 7 documentation | comment | — | architectural | weak | contradicts #6; contradicts sub-vue2/public/index.html:16-17; contradicts #8 |
| 23 | 3.4.7 #8 | 7 documentation | comment | qiankun | technological | weak | corroborates #4; corroborates #6 |
| 24 | 3.4.7 #9 | 7 documentation | comment | qiankun | technological | weak | corroborates #4; corroborates #6 |
| 25 | 3.4.7 #10 | 7 documentation | comment | qiankun | technological | weak | corroborates #3; corroborates #4; corroborates #5; corroborates #12 |
| 26 | 3.4.7 #11 | 7 documentation | comment | qiankun | technological | weak | contradicts sub-vue2/src/router/index.js:10-12; contradicts sub-vue2/src/main.js:1-46 |
| 27 | 3.4.7 #12 | 7 documentation | comment | — | technological | weak | corroborates #2; corroborates #12 |
| 28 | 3.4.7 #13 | 7 documentation | comment | — | technological | weak | corroborates #2; corroborates #12; corroborates #15 |
| 29 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #22; explains #6 |
| 30 | 3.4.8 #2 | 8 history | history | qiankun | technological | weak | explains #26; explains sub-vue2/src/router/index.js:10-12; explains sub-vue2/src/main.js:20-23 |

## Summary

Observations: 30. Dimensions (technology: 1, configuration: 1, code: 7, structure: 2, composition: 2, build-deploy: 2, documentation: 13, history: 2). Strength (strong: 3, moderate: 11, weak: 16, ambiguous: 0). Evidence (technological: 17, architectural: 13, context: 0).

