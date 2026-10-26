---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Repository overview

Markdown documentation is limited to two English READMEs: main-vue3/README.md:1-5 is the Vue 3/TypeScript/Vite template; sub-vue2/README.md:1-24 is the Vue CLI template with installation, execution, build and lint. Neither explains composition between units; command blocks at sub-vue2/README.md:4-20 do not become claims. matches.csv has no `doc-*` occurrences. No root README appears in artifacts.csv.

Architectural documentation resides in configuration/entry comments, mostly Chinese. Files read in full: main-vue3/package.json:1-24, sub-vue2/package.json:1-44 (both without `description`), main-vue3/vite.config.ts:1-17, sub-vue2/vue.config.js:1-23, main-vue3/src/main.ts:1-38, sub-vue2/src/main.js:1-46, main-vue3/src/App.vue:1-48, main-vue3/index.html:1-13, sub-vue2/public/index.html:1-19 and routers main-vue3/src/router/index.ts:1-28 and sub-vue2/src/router/index.js:1-38. Most comments accompany qiankun composition recorded in 3.4.5: host, sub-app registration, container and lifecycles. Unit sub-react16 is registered only in host, without snapshot implementation (3.4.5 #2; main-vue3/src/main.ts:17-22). Local references and build scripts do not document publication; 3.4.6 records separate build and deployment not observed for both present units.

Address, port, CORS and activation-route comments (main-vue3/src/main.ts:13,15; main-vue3/vite.config.ts:10) generate no additional infrastructure claims. Commented experimental isolation alternative and prefetch option (main-vue3/src/main.ts:31-35) describe disabled options, without claiming project use. The `publicPath` comment at sub-vue2/src/main.js:21 describes resource prefix rather than router base; it therefore does not support the divergent sub-vue2/src/router/index.js:9 comment. `publicPath` at sub-vue2/vue.config.js:21-22 is also commented. Comments on webpack 5 (sub-vue2/vue.config.js:17), types, guards and route extensions are internal details without another claim about units collectively.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | main-vue3/src/App.vue:10 | “子应用挂载点” (English translation: "sub-application mounting point") | composition | corroborated | 3.4.5 #1; 3.4.5 #2; main-vue3/src/App.vue:11; main-vue3/src/main.ts:14,20 |
| 2 | main-vue3/src/main.ts:9 | “定义子应用” (English translation: "defines sub-applications") | structure | corroborated | 3.4.5 #1; 3.4.5 #2; main-vue3/src/main.ts:10-23 |
| 3 | main-vue3/src/main.ts:25 | “启动 qiankun” (English translation: "starts qiankun") | composition | corroborated | 3.4.2, qiankun dependency; main-vue3/src/main.ts:3,26-36 |
| 4 | main-vue3/src/main.ts:29 | “开启严格的沙箱模式（推荐）” (English translation: "enables strict sandbox mode, recommended") | composition | corroborated | main-vue3/src/main.ts:28-30; 3.4.5, Repository overview |
| 5 | main-vue3/vite.config.ts:9 | “主应用端口” (English translation: "main application port") | structure | corroborated | 3.4.3, unit main-vue3; 3.4.5 #1; main-vue3/src/main.ts:10-26 |
| 6 | sub-vue2/public/index.html:7 | “子应用静态资源前缀” (English translation: "sub-application static resource prefix") | composition | corroborated | sub-vue2/public/index.html:8; 3.4.5 #1 |
| 7 | sub-vue2/public/index.html:15 | “子应用挂载点，必须与主应用配置一致” (English translation: "sub-application mounting point, must match main application configuration") | composition | contradicted | sub-vue2/public/index.html:16-17; sub-vue2/src/main.js:11-16; main-vue3/src/main.ts:14; main-vue3/src/App.vue:11 |
| 8 | sub-vue2/src/main.js:9 | “渲染函数 - Updated for qiankun integration” (English translation: "render function — updated for qiankun integration") | composition | corroborated | 3.4.4, src-mount-call; sub-vue2/src/main.js:10-17,36-38 |
| 9 | sub-vue2/src/main.js:26 | “如果在 qiankun 环境下，不立即挂载” (English translation: "in the qiankun environment, does not mount immediately") | composition | corroborated | sub-vue2/src/main.js:27-29,36-38; 3.4.4, src-mount-call |
| 10 | sub-vue2/src/main.js:31 | “qiankun 生命周期” (English translation: "qiankun lifecycle") | composition | corroborated | 3.4.4, src-mount-export; sub-vue2/src/main.js:32-46; 3.4.5 #1 |
| 11 | sub-vue2/src/router/index.js:9 | “在 qiankun 环境下，路由base会在main.js中动态设置” (English translation: "in the qiankun environment, router base will be set dynamically in main.js") | composition | contradicted | sub-vue2/src/router/index.js:10-12; sub-vue2/src/main.js:1-46 |
| 12 | sub-vue2/vue.config.js:11 | “微前端配置” (English translation: "micro-frontend configuration") | composition | corroborated | sub-vue2/vue.config.js:12-20; 3.4.5 #1 |
| 13 | sub-vue2/vue.config.js:14 | “微前端要求的库配置” (English translation: "library configuration required by the micro-frontend") | build-deploy | corroborated | sub-vue2/vue.config.js:15-18; 3.4.5 #1; 3.4.6 #2 |

## Observations

**1. main-vue3/src/App.vue.** The comment identifies the host element used as container: id `subapp-viewport` (main-vue3/src/App.vue:11), targeted by both registrations (main-vue3/src/main.ts:14,20). Comment “子应用挂载的容器 id” (English translation: "id of the container where the sub-application mounts") at main-vue3/src/main.ts:14 repeats this claim without a new row. Confirms configuration without proving execution of both sub-apps.

**2. main-vue3/src/main.ts.** Registration defines `sub-vue2` and `sub-react16` as sub-applications (main-vue3/src/main.ts:10-23). The second exists as a configured target; the claim does not say its code is present. Comments “子应用名称” (English translation: "sub-application name") at main-vue3/src/main.ts:12 and “子应用端口” (English translation: "sub-application port") at sub-vue2/vue.config.js:6 reiterate sub-vue2’s role without a new claim.

**3. main-vue3/src/main.ts.** `start` is imported from qiankun and called after unit registration (main-vue3/src/main.ts:3,10-26). Review 3.4.2 records the configured dependency; the comment matches the actual code call.

**4. main-vue3/src/main.ts.** Active option is `sandbox.strictStyleIsolation: true` (main-vue3/src/main.ts:28-30). Corroboration is limited to enabling this configuration, called strict mode by the comment; it proves neither functional isolation nor security. Review 3.4.5 overview already qualifies that mounting under this isolation was not executed.

**5. main-vue3/vite.config.ts.** The port comment identifies main-vue3 as main application. Sub-application registration and orchestrator initialization confirm its role (main-vue3/src/main.ts:10-26). Port value alone is not deployment evidence; the theme is unit role.

**6. sub-vue2/public/index.html.** The comment accompanies `<base href="/sub-vue2/">` (sub-vue2/public/index.html:8), providing the base for relative document URLs. The path matches host activation (main-vue3/src/main.ts:15). Neither public hosting nor rewriting all resource URLs is inferred.

**7. sub-vue2/public/index.html.** The element id below the comment textually matches the configured host container (sub-vue2/public/index.html:16; main-vue3/src/main.ts:14). However, this sub-app element is not its mount target: `render` receives the external container and searches for `#app` within it, or uses `#app` outside qiankun (sub-vue2/src/main.js:11-16). The internal target is the next element (sub-vue2/public/index.html:17); host container belongs to main-vue3/src/App.vue:11. The claim confuses both mounting levels despite matching cited ids.

**8. sub-vue2/src/main.js.** The verifiable `render` adaptation receives `props.container` and mounts at its `#app`; `mount(props)` forwards those properties (sub-vue2/src/main.js:10-17,36-38). This supports the described integration without claiming execution testing.

**9. sub-vue2/src/main.js.** Immediate mounting occurs only when `__POWERED_BY_QIANKUN__` is false; within qiankun, the call is in lifecycle `mount` (sub-vue2/src/main.js:27-29,36-38). The claim concerns mounting timing under the orchestrator.

**10. sub-vue2/src/main.js.** The comment introduces exports `bootstrap`, `mount` and `unmount` (sub-vue2/src/main.js:32-46), linked to host registration in relationship 3.4.5 #1. This lifecycle-contract claim is distinct from rendering implementation and the immediate-mount condition.

**11. sub-vue2/src/router/index.js.** Base is literal and fixed at `/sub-vue2` (sub-vue2/src/router/index.js:10-12). Full reading of sub-vue2/src/main.js:1-46 shows that file imports the router and supplies it to the Vue instance without changing its base. The dynamic value assigned at sub-vue2/src/main.js:20-23 is `__webpack_public_path__`, a different property. Implementation contradicts the comment.

**12. sub-vue2/vue.config.js.** The block configures UMD output, library name and loading global (sub-vue2/vue.config.js:12-20); lifecycles and registration confirm the host relationship (sub-vue2/src/main.js:32-46; main-vue3/src/main.ts:11-16). This is not an isolated mention: the comment characterizes a concrete block used by composition.

**13. sub-vue2/vue.config.js.** The comment specifies the library form generically announced by the preceding block: `library: 'subVue2'`, `libraryTarget: 'umd'` and own global (sub-vue2/vue.config.js:15-18). Reviews 3.4.5 #1 and 3.4.6 #2 confirm this output contract for the qiankun sub-app. The claim concerns this integration’s configuration, without generalizing a requirement to every micro-frontend architecture.

## Summary

Claims: 13 (corroborated: 11, partial: 0, contradicted: 2, uncorroborated: 0). Themes: (structure: 2, composition: 10, build-deploy: 1).
