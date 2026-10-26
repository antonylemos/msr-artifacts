---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
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

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Repository overview

Chain combines single-spa manifests (#2, #5, #10, #13), own build/lifecycle configurations (#18, #20, #23; #37, #39, #41) and root registrations (#42–#44). Local map (#21) resolves three bundles; relationships #76–#78 link root to Angular, React/webpack and React/Vite applications with route activation. Separate boundaries/builds (#69, #71, #72, #73; #82–#85) support relative unit independence.

Applications also share state through BehaviorSubject (#68); externalization/resolution of same module supports three events relationships (#79–#81). Libraries common-lib-webpack/styleguide not applications (#70, #74). Vue unit has own entry/build without root relationship (#75, #86).

Demonstrated composition local: application map depends on isLocal, production map commented (#21, #25). Builds separate without observed deployment/independent versioning (#82–#86). Library scripts, development panel and commented calls not inter-unit relationships. Undetermined declarations (#6, #14–#16) remain ambiguous regarding installed package usage; CDN loader/local composition presence independent of resolving them. History (#90–#101) delimits continuity since initial commit or resolves comments through snapshot without turning dependencies Yes. README (#87–#89) semantically corroborates organization.

## Observations

### 1. angular-app/package.json:25

**Observation:** Manifest declares `single-spa` in `dependencies`, version `^5.9.3`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 2. angular-app/package.json:26

**Observation:** Manifest declares `single-spa-angular` in `dependencies`, version `^5.0.1`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 3. common-lib-webpack/package.json:22

**Observation:** Manifest declares `@types/systemjs` in `devDependencies`, version `^6.15.3`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 4. react-app/package.json:60

**Observation:** Manifest declares `@types/systemjs` in `dependencies`, version `^6.1.0`.

**Interpretation:** Declaration isolated signal without configured usage in unit per review; demonstrates no composition.

### 5. react-app/package.json:44

**Observation:** Manifest declares `single-spa-react` in `devDependencies`, version `^4.0.0`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 6. react-app/package.json:45

**Observation:** Manifest declares `ts-config-single-spa` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Declaration admits indirect build usage or installed copy present without usage; snapshot cannot decide between readings.

### 7. react-app/package.json:49

**Observation:** Manifest declares `webpack-config-single-spa-react` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Declaration isolated signal without configured usage in unit per review; demonstrates no composition.

### 8. react-app/package.json:50

**Observation:** Manifest declares `webpack-config-single-spa-react-ts` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 9. react-app/package.json:51

**Observation:** Manifest declares `webpack-config-single-spa-ts` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Declaration isolated signal without configured usage in unit per review; demonstrates no composition.

### 10. react-vite-app/package.json:17

**Observation:** Manifest declares `single-spa-react` in `dependencies`, version `^6.0.2`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 11. react-vite-app/package.json:19

**Observation:** Manifest declares `systemjs` in `dependencies`, version `^6.15.1`.

**Interpretation:** Declaration isolated signal without configured usage in unit per review; demonstrates no composition.

### 12. react-vite-app/package.json:36

**Observation:** Manifest declares `vite-plugin-single-spa` in `devDependencies`, version `^1.0.0`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 13. root-config/package.json:47

**Observation:** Manifest declares `single-spa` in `dependencies`, version `^5.8.2`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 14. root-config/package.json:48

**Observation:** Manifest declares `systemjs` in `dependencies`, version `^6.15.1`.

**Interpretation:** SystemJS loader runs through CDN; declaration does not determine whether installed copy indirectly participates in build or remains unused. Local composition demonstrated by other observations.

### 15. root-config/package.json:23

**Observation:** Manifest declares `@types/systemjs` in `devDependencies`, version `^6.15.3`.

**Interpretation:** Declaration admits indirect build usage or installed copy present without usage; snapshot cannot decide between readings.

### 16. root-config/package.json:36

**Observation:** Manifest declares `ts-config-single-spa` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Declaration admits indirect build usage or installed copy present without usage; snapshot cannot decide between readings.

### 17. root-config/package.json:40

**Observation:** Manifest declares `webpack-config-single-spa-ts` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Declaration isolated technological signal; review records configuration/usage represented separately in following observations.

### 18. angular-app/angular.json:20-71

**Observation:** Build target uses custom-webpack, entry src/main.single-spa.ts, libraryName angular-app and libraryTarget umd; output dist/angular-app, deployUrl localhost:4200.

**Interpretation:** Parameterizes Angular application for single-spa integration without naming another unit.

### 19. angular-app/extra-webpack.config.js:1-61

**Observation:** Configuration applies singleSpaAngularWebpack, externalizing @myapp/common-lib-webpack as @paok/common-lib-webpack.

**Interpretation:** Configures single-spa adapter/shared module consumption in Angular application.

### 20. react-app/webpack.config.js:1-19

**Observation:** Preset webpack-config-single-spa-react-ts receives orgName org1 and projectName react-app; common-lib-webpack/styleguide external.

**Interpretation:** Configures single-spa application/shared dependencies without registering target applications.

### 21. root-config/src/index.ejs:62-85

**Observation:** Under isLocal import map associates @org1/root-config, @org1/react-app, angular-app and react-vite-app with localhost bundles at ports 9000, 8080, 4200 and 3001; also maps styleguide/@paok/common-lib-webpack. Scopes distinguish React versions of two applications.

**Interpretation:** Explicitly links root/three applications through SystemJS resolution in local path; also resolves shared modules.

**Note:** Declarative template maps have configuration observations. Executable script with System.set, System.addImportMap and System.import yields no additional dimension 2 observation. common-lib-webpack/webpack.config.js only declares entry/SystemJS output format without composition builder, remote, exposed module or shared dependencies; cited excerpts remain relationship artifacts without own configuration observation. Aliases, TypeScript types and isolated ports also add no blocks.

### 22. root-config/webpack.config.js:1-29

**Observation:** Preset webpack-config-single-spa-ts receives orgName org1 and projectName root-config; HtmlWebpackPlugin reads src/index.ejs, passing isLocal.

**Interpretation:** Configures single-spa root build/page condition for emitting local map.

### 23. react-vite-app/vite.config.ts:7-67

**Observation:** Vite produces system format, externalizes React/shared libraries and applies vitePluginSingleSpa with type mife, serverPort 3001 and spaEntryPoints src/spa.tsx.

**Interpretation:** Prepares React/Vite application/lifecycles for single-spa. Alias part of same configuration, not another observation.

### 24. root-config/src/index.ejs:50-56

**Observation:** Systemjs-importmap associates single-spa with CDN system bundle single-spa@5.9.0.

**Interpretation:** Configures orchestrator resolution without independently linking applications.

### 25. root-config/src/index.ejs:59-60

**Observation:** Script systemjs-importmap with src /importmap.json inside HTML comment.

**Interpretation:** Production map inactive; demonstrates no production unit resolution.

**Note:** Weak strength because block commented: configures no active map.

### 26. styleguide/vite.config.ts:9-42

**Observation:** Build.lib enters src/styleguide.ts, declares system format and externalizes React, ReactDOM and MUI.

**Interpretation:** Configures shared visual library for external consumption without establishing composed application.

### 27. root-config/src/index.ejs:35-48

**Observation:** Native import map associates React 19, React 16, ReactDOM and MUI with CDN addresses.

**Interpretation:** Configures shared library resolution; names no frontend units.

### 28. angular-app/src/main.single-spa.ts:112; angular-app/src/main.single-spa.ts:20-31

**Observation:** Exports bootstrap = lifecycles.bootstrap.

**Interpretation:** Exposes Angular application single-spa initialization contract.

### 29. angular-app/src/main.single-spa.ts:113; angular-app/src/main.single-spa.ts:100-110

**Observation:** Exports mount = [mountStyles, lifecycles.mount]; mountStyles reenables styles with paokOle attribute.

**Interpretation:** Prepares orchestrator mounting of Angular application/styles.

### 30. angular-app/src/main.single-spa.ts:114; angular-app/src/main.single-spa.ts:61-98

**Observation:** Exports unmount = [unmountStyles, lifecycles.unmount]; unmountStyles disables paokOle styles.

**Interpretation:** Prepares Angular application/style unmounting.

### 31. react-vite-app/src/spa.tsx:99; react-vite-app/src/spa.tsx:8-15; react-vite-app/src/spa.tsx:98

**Observation:** Exports bootstrap = [cssLc.bootstrap, lc.bootstrap].

**Interpretation:** Combines CSS/React initialization in Vite application single-spa lifecycles.

### 32. react-vite-app/src/spa.tsx:100; react-vite-app/src/spa.tsx:84-94

**Observation:** Exports mount = [cssLc.mount, mountStyles, lc.mount]; mountStyles reenables paok styles.

**Interpretation:** Prepares React/CSS mounting in Vite application single-spa contract.

### 33. react-vite-app/src/spa.tsx:101; react-vite-app/src/spa.tsx:51-82

**Observation:** Exports unmount = [cssLc.unmount, unmountStyles, lc.unmount].

**Interpretation:** Prepares React/CSS unmounting in Vite application single-spa contract.

### 34. angular-app/extra-webpack.config.js:1; angular-app/extra-webpack.config.js:1-2

**Observation:** Imports single-spa-angular/lib/webpack through require.

**Interpretation:** Build adapter rather than runtime composition; own configuration observed in dimension 2.

### 35. angular-app/extra-webpack.config.js:5; angular-app/extra-webpack.config.js:5-10

**Observation:** Calls singleSpaAngularWebpack(config, options), adding common library external.

**Interpretation:** Adjusts Angular application build without loading/mounting another unit.

### 36. angular-app/src/main.single-spa.ts:7

**Observation:** Imports singleSpaAngular from single-spa-angular.

**Interpretation:** Provides lifecycle adapter used by Angular entry.

### 37. angular-app/src/main.single-spa.ts:20; angular-app/src/main.single-spa.ts:20-31

**Observation:** Calls singleSpaAngular with bootstrapFunction, template app-root, Router, NavigationStart and NgZone; forwards props to subject.

**Interpretation:** Adapts Angular application to single-spa contract without naming another unit.

### 38. react-app/src/org1-react-app.tsx:3

**Observation:** Imports singleSpaReact.

**Interpretation:** Provides lifecycle adapter used by React application.

### 39. react-app/src/org1-react-app.tsx:6; react-app/src/org1-react-app.tsx:6-16

**Observation:** Calls singleSpaReact with React, ReactDOM and rootComponent Root, exporting bootstrap, mount and unmount.

**Interpretation:** Adapts React application to single-spa contract without naming another unit.

### 40. react-vite-app/src/spa.tsx:3

**Observation:** Imports singleSpaReact.

**Interpretation:** Provides adapter used by React/Vite single-spa entry.

### 41. react-vite-app/src/spa.tsx:8; react-vite-app/src/spa.tsx:8-15

**Observation:** Calls singleSpaReact with React, ReactDOMClient and rootComponent App.

**Interpretation:** Prepares React/Vite application lifecycles, combined with CSS lifecycles in exports.

### 42. root-config/src/org1-root-config.ts:3; root-config/src/org1-root-config.ts:3-7

**Observation:** Registers @org1/react-app with System.import of same name and activeWhen /react.

**Interpretation:** Links root to React application through single-spa registration/route activation.

### 43. root-config/src/org1-root-config.ts:9; root-config/src/org1-root-config.ts:9-13

**Observation:** Registers angular-app with System.import of same name and activeWhen /angular.

**Interpretation:** Links root to Angular application through single-spa registration/route activation.

### 44. root-config/src/org1-root-config.ts:15; root-config/src/org1-root-config.ts:15-19

**Observation:** Registers react-vite-app with System.import of same name and activeWhen /react-vite.

**Interpretation:** Links root to React/Vite application through single-spa registration/route activation.

### 45. react-vite-app/src/App.tsx:26; react-vite-app/src/App.tsx:20-34

**Observation:** Contains System.import of styleguide in commented useEffect.

**Interpretation:** Construct inactive; establishes no dynamic frontend unit loading.

### 46. root-config/src/index.ejs:22

**Observation:** Comment instructs uncommenting environment-specific import-map-overrides restriction.

**Interpretation:** Template guidance without active composition.

### 47. root-config/src/index.ejs:23

**Observation:** Comment contains import-map-overrides documentation link.

**Interpretation:** Template reference without active composition.

### 48. root-config/src/index.ejs:24

**Observation:** Meta import-map-overrides-domains with denylist:prod.example.com commented.

**Interpretation:** Enables no restriction or demonstrated production configuration.

### 49. root-config/src/index.ejs:35; root-config/src/index.ejs:35-48

**Observation:** Script importmap maps React, ReactDOM and MUI to CDNs.

**Interpretation:** Technological shared-library resolution rather than unit composition.

### 50. root-config/src/index.ejs:50; root-config/src/index.ejs:50-56

**Observation:** Systemjs-importmap maps single-spa to CDN.

**Interpretation:** Resolves orchestrator library rather than another frontend unit.

### 51. root-config/src/index.ejs:60

**Observation:** External systemjs-importmap /importmap.json commented.

**Interpretation:** Production map inactive, composing no units through path.

### 52. root-config/src/index.ejs:63; root-config/src/index.ejs:62-85

**Observation:** Local systemjs-importmap maps root, three applications and two libraries to localhost URLs, defining React scopes.

**Interpretation:** Explicitly resolves distinct frontend units for local root registrations.

### 53. root-config/src/index.ejs:93

**Observation:** Loads import-map-overrides@2.2.0 from CDN.

**Interpretation:** Import-map development tool rather than another unit bundle.

### 54. root-config/src/index.ejs:135

**Observation:** Executes System.import of @org1/root-config inside module script.

**Interpretation:** Loads own root rather than inter-unit relationship.

### 55. root-config/src/index.ejs:197

**Observation:** Contains commented System.import call for @org1/root-config.

**Interpretation:** Call inactive, would be internal to root.

### 56. root-config/src/index.ejs:199

**Observation:** Declares import-map-overrides-full with show-when-local-storage devtools and dev-libs.

**Interpretation:** Development panel rather than another frontend unit custom element.

### 57. root-config/src/org1-root-config.ts:5

**Observation:** App function calls System.import of @org1/react-app.

**Interpretation:** Loads root-registered React application lifecycles at runtime.

### 58. root-config/src/org1-root-config.ts:11

**Observation:** App function calls System.import of angular-app.

**Interpretation:** Loads root-registered Angular application lifecycles at runtime.

### 59. root-config/src/org1-root-config.ts:17

**Observation:** App function calls System.import of react-vite-app.

**Interpretation:** Loads root-registered React/Vite application lifecycles at runtime.

### 60. root-config/src/index.ejs:14

**Observation:** Loads regenerator-runtime@0.13.7 from CDN.

**Interpretation:** Babel polyfill without unit composition.

### 61. root-config/src/index.ejs:91

**Observation:** CDN script for zone.js@0.11.3 commented.

**Interpretation:** Excerpt inactive, referring to library rather than frontend unit.

### 62. root-config/src/index.ejs:93

**Observation:** Loads import-map-overrides@2.2.0 from CDN.

**Interpretation:** Same development tool recorded through another pattern without loading unit.

### 63. root-config/src/index.ejs:95

**Observation:** Loads systemjs@6.15.1/dist/system.js from CDN in local branch.

**Interpretation:** Provides loader used for SystemJS resolution without independently loading application.

### 64. root-config/src/index.ejs:96

**Observation:** Loads SystemJS extras/amd.js in local branch.

**Interpretation:** Provides loader AMD support without locating frontend unit.

### 65. root-config/src/index.ejs:98

**Observation:** Loads SystemJS system.min.js in nonlocal branch.

**Interpretation:** Provides nonlocal loader without demonstrating map/inter-application link in branch.

### 66. root-config/src/index.ejs:99

**Observation:** Loads extras/amd.min.js in nonlocal branch.

**Interpretation:** Provides AMD support without locating frontend unit.

### 67. root-config/src/org1-root-config.ts:21; root-config/src/org1-root-config.ts:21-23

**Observation:** Calls single-spa start({ urlRerouteOnly: true }).

**Interpretation:** Starts registration orchestration; call alone names no targets.

### 68. common-lib-webpack/src/user-state.ts:9; common-lib-webpack/src/user-state.ts:3-19

**Observation:** setUser publishes user through _userSubject.next; user$ exposes BehaviorSubject, and userState exported as instance.

**Interpretation:** Implements userState state-publication mechanism; application links recorded in communication relationships.

### 69. angular-app/; angular-app/angular.json:24-25; angular-app/src/main.single-spa.ts:20-31 and 112-114; angular-app/angular.json:20-21 and 31-34; angular-app/package.json:7

**Observation:** Directory contains manifest, main.single-spa.ts entry with Angular lifecycles and own build target.

**Interpretation:** Single-spa Angular application with own entry/Angular CLI build.

### 70. common-lib-webpack/; common-lib-webpack/webpack.config.js:5-7; common-lib-webpack/src/index.ts:1-2; common-lib-webpack/index.html:1-11; common-lib-webpack/webpack.config.js:49-55; common-lib-webpack/package.json:8

**Observation:** Directory has src/index.ts entry reexporting Calculator/userState, script-free HTML and system-format library index.js build.

**Interpretation:** Shared utility module (state/calculator) without application entry.

### 71. react-app/; react-app/webpack.config.js:5-10; react-app/src/org1-react-app.tsx:6-16; react-app/webpack.config.js:1-19; react-app/package.json:6

**Observation:** Directory contains manifest, org1-react-app.tsx entry with React lifecycles and own webpack preset build.

**Interpretation:** Single-spa React application with own entry/webpack build.

### 72. react-vite-app/; react-vite-app/index.html:11; react-vite-app/vite.config.ts:40; react-vite-app/src/spa.tsx:8-15 and 99-101; react-vite-app/vite.config.ts:14-41; react-vite-app/package.json:8

**Observation:** Directory contains manifest, HTML entry src/main.tsx, single-spa entry src/spa.tsx and own Vite build.

**Interpretation:** Single-spa React application with own entry/Vite build.

### 73. root-config/; root-config/webpack.config.js:7-9; root-config/webpack.config.js:19-21; root-config/src/org1-root-config.ts:3-23; root-config/webpack.config.js:1-29; root-config/package.json:9

**Observation:** Directory contains manifest, org1-root-config.ts entry with registrations/start, index.ejs template and own webpack build.

**Interpretation:** Single-spa root config with own entry/webpack build.

### 74. styleguide/; styleguide/vite.config.ts:20-24; styleguide/src/styleguide.ts:3-5; styleguide/index.html:11; styleguide/vite.config.ts:19-38; styleguide/package.json:10

**Observation:** Directory contains library entry src/styleguide.ts, component exports and Vite build.lib; HTML starts scaffold only in development.

**Interpretation:** Shared component library; build generates only package (`main: ./dist/styleguide.system.js`, package.json:6) without application entry.

### 75. vue-app/; vue-app/index.html:11; vue-app/src/main.ts:7-11; vue-app/vite.config.ts:8-15; vue-app/package.json:6 and 8

**Observation:** Directory contains manifest, index.html pointing to src/main.ts, createApp(App), mounting in #app and own Vite build.

**Interpretation:** Vue application with own entry/Vite build. No root relationship in composition review.

### 76. root-config/src/org1-root-config.ts:9-13; root-config/src/index.ejs:68; angular-app/angular.json:25; angular-app/angular.json:33-34; angular-app/angular.json:36; angular-app/package.json:11; angular-app/src/main.single-spa.ts:112; angular-app/src/main.single-spa.ts:113; angular-app/src/main.single-spa.ts:114; angular-app/src/main.single-spa.ts:7; angular-app/src/main.single-spa.ts:20; root-config/src/org1-root-config.ts:9; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:11; root-config/src/org1-root-config.ts:21

**Observation:** Root registers angular-app, loads name through System.import and activates route /angular. Local import map resolves bundle; target exports single-spa lifecycles.

**Interpretation:** Active relationship links root-config to angular-app through local single-spa loading/mounting.

### 77. root-config/src/org1-root-config.ts:15-19; root-config/src/index.ejs:69; react-vite-app/vite.config.ts:25; react-vite-app/vite.config.ts:37-41; react-vite-app/src/spa.tsx:99; react-vite-app/src/spa.tsx:100; react-vite-app/src/spa.tsx:101; react-vite-app/src/spa.tsx:3; react-vite-app/src/spa.tsx:8; root-config/src/org1-root-config.ts:15; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:17; root-config/src/org1-root-config.ts:21

**Observation:** Root registers react-vite-app, loads name through System.import and activates route /react-vite. Local import map resolves bundle; target exports single-spa lifecycles.

**Interpretation:** Active relationship links root-config to react-vite-app through local single-spa loading/mounting.

### 78. root-config/src/org1-root-config.ts:3-7; root-config/src/index.ejs:67; react-app/webpack.config.js:5-10; react-app/src/org1-react-app.tsx:3; react-app/src/org1-react-app.tsx:6; root-config/src/org1-root-config.ts:3; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:5; root-config/src/org1-root-config.ts:21

**Observation:** Root registers @org1/react-app, loads name through System.import and activates route /react. Local import map resolves bundle; target exports single-spa lifecycles.

**Interpretation:** Active relationship links root-config to react-app through local single-spa loading/mounting.

### 79. react-app/src/App.tsx:53-56; react-app/src/App.tsx:72; angular-app/src/app/app.component.ts:15-18; root-config/src/index.ejs:71; common-lib-webpack/webpack.config.js:49-55; react-app/webpack.config.js:13-14; angular-app/extra-webpack.config.js:7-10; common-lib-webpack/src/user-state.ts:9

**Observation:** react-app publishes user through setUser; angular-app subscribes to user$. Applications externalize library; import map resolves single @paok/common-lib-webpack module.

**Interpretation:** Active relationship uses shared reactive service as events channel from react-app to angular-app. State persists between route mountings.

### 80. react-vite-app/src/App.tsx:14-18; react-vite-app/src/App.tsx:47; angular-app/src/app/app.component.ts:15-18; root-config/src/index.ejs:71; common-lib-webpack/webpack.config.js:49-55; react-vite-app/vite.config.ts:11; react-vite-app/vite.config.ts:19; angular-app/extra-webpack.config.js:7-10; common-lib-webpack/src/user-state.ts:9

**Observation:** react-vite-app publishes user through setUser; angular-app subscribes to user$. Applications externalize library; import map resolves single @paok/common-lib-webpack module.

**Interpretation:** Active relationship uses shared reactive service as events channel from react-vite-app to angular-app. State persists between route mountings.

### 81. react-app/src/App.tsx:49-56; react-app/src/App.tsx:72; react-vite-app/src/App.tsx:10-18; react-vite-app/src/App.tsx:47; root-config/src/index.ejs:71; common-lib-webpack/webpack.config.js:49-55; react-app/webpack.config.js:13-14; react-vite-app/vite.config.ts:11; react-vite-app/vite.config.ts:19; common-lib-webpack/src/user-state.ts:9

**Observation:** react-app and react-vite-app publish through setUser, subscribing to user$; both read stored value. Applications externalize library; import map resolves single @paok/common-lib-webpack module.

**Interpretation:** Active relationship uses shared reactive service as bidirectional events channel between React applications. State persists between route mountings.

### 82. angular-app/package.json:7; angular-app/package.json:10; angular-app/angular.json:20-36; angular-app/extra-webpack.config.js:4-10; angular-app/package.json:11; angular-app/angular.json:36; root-config/src/index.ejs:68

**Observation:** angular-app has own build script/configuration (separate); cited serving artifacts local. Review records deployment not observed and independent versioning No.

**Interpretation:** Build confirms unit boundary. No publication artifact demonstrating independent deployment.

### 83. react-app/package.json:6; react-app/webpack.config.js:5-18; react-app/package.json:4; root-config/src/index.ejs:67

**Observation:** react-app has own build script/configuration (separate); cited serving artifacts local. Review records deployment not observed and independent versioning No.

**Interpretation:** Build confirms unit boundary. No publication artifact demonstrating independent deployment.

### 84. react-vite-app/package.json:8; react-vite-app/vite.config.ts:14-41; react-vite-app/package.json:10-11; react-vite-app/vite.config.ts:39; root-config/src/index.ejs:69

**Observation:** react-vite-app has own build script/configuration (separate); cited serving artifacts local. Review records deployment not observed and independent versioning No.

**Interpretation:** Build confirms unit boundary. No publication artifact demonstrating independent deployment.

### 85. root-config/package.json:9; root-config/webpack.config.js:5-28; root-config/package.json:4; root-config/src/index.ejs:66

**Observation:** root-config has own build script/configuration (separate); cited serving artifacts local. Review records deployment not observed and independent versioning No.

**Interpretation:** Build confirms unit boundary. No publication artifact demonstrating independent deployment.

### 86. vue-app/package.json:6; vue-app/vite.config.ts:8-15; vue-app/package.json:7

**Observation:** vue-app has own build script/configuration (separate); cited serving artifacts local. Review records deployment not observed and independent versioning No.

**Interpretation:** Build confirms unit boundary. No publication artifact demonstrating independent deployment. Vue unit remains outside single-spa mounting.

### 87. README.md:1

**Observation:** README title presents single-spa application with React, Angular, Vite and SystemJS.

**Interpretation:** Claim names single-spa, React, Angular, Vite and SystemJS without describing unit organization; technological/semantic evidence corroborated by registration/loading.

### 88. README.md:2

**Observation:** README presents project as microfrontend architecture proof of concept.

**Interpretation:** Architectural claim corroborated by root boundaries and three linked applications.

### 89. README.md:31

**Observation:** README says clicking React/Angular menu leads to respective application.

**Interpretation:** Claim corroborated by menu/React and Angular relationships; does not claim only applications.

### 90. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/package.json:60; react-app/tsconfig.json:1-8); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** React-app manifests, tsconfig, declarations and sources added in initial commit, unchanged through snapshot.

**Interpretation:** Continuity explains SystemJS type declaration without explicit reference; proves neither implicit usage nor earlier removal. No retained.

### 91. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/tsconfig.json:2; react-app/package.json:3-14); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** React-app ts-config-single-spa extension and Babel/webpack build coexist since initial commit, unchanged afterward.

**Interpretation:** History does not verify preset reads tsconfig; indirect usage/unused declaration alternatives remain open.

### 92. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/package.json:49; react-app/webpack.config.js:2); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** webpack-config-single-spa-react declaration and webpack-config-single-spa-react-ts usage already coexist in initial commit.

**Interpretation:** No recorded preset replacement; direct usage No retained.

### 93. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/package.json:51; root-config/webpack.config.js:2); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** react-app manifest/webpack unchanged; webpack-config-single-spa-ts preset also already used in root in initial commit.

**Interpretation:** No recorded transfer; react-app declaration without direct usage remains No.

### 94. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-vite-app/package.json:19; react-vite-app/src/App.tsx:6-34); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** react-vite-app manifest, App.tsx and vite.config.ts unchanged; static styleguide import/commented System.import block coexist since initial commit.

**Interpretation:** History proves neither earlier experiment nor abandonment; dependency/commented construct No values retained.

### 95. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/package.json:48; root-config/src/index.ejs:95-99); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** Root manifest and index.ejs unchanged; systemjs dependency/CDN loader coexist since initial commit.

**Interpretation:** No recorded migration or proof of installed-copy usage; Undetermined retained.

### 96. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/package.json:23; root-config/tsconfig.json:3); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** Root manifest, tsconfig, declarations and sources retained since initial commit, including generic types/System accesses.

**Interpretation:** Continuity does not verify internal preset checking; type-package usage remains Undetermined.

### 97. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/tsconfig.json:2; root-config/babel.config.json:1); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** Tsconfig extending ts-config-single-spa and root Babel/webpack build coexist since initial commit, unchanged.

**Interpretation:** No historical tool change resolving internal preset usage; Undetermined retained.

### 98. root-config/src/index.ejs:22-24; root-config/src/index.ejs:93; root-config/src/index.ejs:199

**Observation:** Uncomment instruction/import-map-overrides restriction meta commented; library loaded and panel declared.

**Interpretation:** Snapshot resolves inactive template option; demonstrates no abandoned production.

### 99. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/src/index.ejs:59-85; root-config/package.json:4-9); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observation:** index.ejs and root scripts unchanged since initial commit: production map commented, local map conditional on isLocal.

**Interpretation:** Continuity proves neither abandonment nor external publication; deployment remains not observed.

### 100. root-config/src/index.ejs:135; root-config/src/index.ejs:197

**Observation:** Snapshot contains active root System.import at :135 and commented repetition at :197.

**Interpretation:** Coexistence resolves uncertainty: commented call does not disable root loading.

### 101. angular-app/src/main.single-spa.ts:14; angular-app/angular.json:25-26; angular-app/src/polyfills.ts:60; root-config/src/index.ejs:91

**Observation:** Angular entry imports zone.js/dist/zone; build also points to polyfills.ts importing zone.js. Host CDN script commented.

**Interpretation:** Snapshot resolves apparent ZoneJS absence; host comment demonstrates no library absence in application.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (angular-app/package.json:25) | 1 technology | manifest | single-spa | technological | weak | declares angular-app/src/single-spa/single-spa-props.ts:2 |
| 2 | 3.4.2 (angular-app/package.json:26) | 1 technology | manifest | single-spa | technological | weak | declares #19; declares #36; declares #37 |
| 3 | 3.4.2 (common-lib-webpack/package.json:22) | 1 technology | manifest | import-maps | technological | weak | declares common-lib-webpack/tsconfig.json:17 |
| 4 | 3.4.2 (react-app/package.json:60) | 1 technology | manifest | import-maps | technological | weak | — |
| 5 | 3.4.2 (react-app/package.json:44) | 1 technology | manifest | single-spa | technological | weak | declares #38; declares #39 |
| 6 | 3.4.2 (react-app/package.json:45) | 1 technology | manifest | single-spa | technological | ambiguous | — |
| 7 | 3.4.2 (react-app/package.json:49) | 1 technology | manifest | single-spa | technological | weak | — |
| 8 | 3.4.2 (react-app/package.json:50) | 1 technology | manifest | single-spa | technological | weak | declares #20 |
| 9 | 3.4.2 (react-app/package.json:51) | 1 technology | manifest | single-spa | technological | weak | — |
| 10 | 3.4.2 (react-vite-app/package.json:17) | 1 technology | manifest | single-spa | technological | weak | declares #40; declares #41 |
| 11 | 3.4.2 (react-vite-app/package.json:19) | 1 technology | manifest | import-maps | technological | weak | — |
| 12 | 3.4.2 (react-vite-app/package.json:36) | 1 technology | manifest | single-spa | technological | weak | declares #23; declares #31; declares #32; declares #33 |
| 13 | 3.4.2 (root-config/package.json:47) | 1 technology | manifest | single-spa | technological | weak | declares #42; declares #43; declares #44; declares #67 |
| 14 | 3.4.2 (root-config/package.json:48) | 1 technology | manifest | import-maps | technological | ambiguous | — |
| 15 | 3.4.2 (root-config/package.json:23) | 1 technology | manifest | import-maps | technological | ambiguous | — |
| 16 | 3.4.2 (root-config/package.json:36) | 1 technology | manifest | single-spa | technological | ambiguous | — |
| 17 | 3.4.2 (root-config/package.json:40) | 1 technology | manifest | single-spa | technological | weak | declares #22 |
| 18 | 3.4.2 (angular-app/package.json:25; Evidence); 3.4.2 (angular-app/package.json:26; Evidence); 3.4.3 (angular-app; Markers); 3.4.3 (angular-app; Entry); 3.4.3 (angular-app; Build); 3.4.4 (angular-app/src/main.single-spa.ts:112; Observation); 3.4.4 (angular-app/extra-webpack.config.js:5; Observation); 3.4.5 (#1; Configuration); 3.4.6 (#1; Where served); 3.4.6 (#1; Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #69; configures #76 |
| 19 | 3.4.2 (angular-app/package.json:26; Evidence); 3.4.4 (angular-app/src/main.single-spa.ts:113; Observation); 3.4.4 (angular-app/extra-webpack.config.js:1; File:line); 3.4.4 (angular-app/extra-webpack.config.js:1; Observation); 3.4.4 (angular-app/extra-webpack.config.js:5; File:line); 3.4.4 (angular-app/extra-webpack.config.js:5; Observation); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observation); 3.4.5 (#4; Configuration); 3.4.5 (#5; Configuration); 3.4.6 (#1; Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #76; configures #79; configures #80 |
| 20 | 3.4.2 (react-app/package.json:44; Evidence); 3.4.2 (react-app/package.json:49; Evidence); 3.4.2 (react-app/package.json:50; Evidence); 3.4.2 (react-app/package.json:51; Evidence); 3.4.3 (react-app; Markers); 3.4.3 (react-app; Entry); 3.4.3 (react-app; Build); 3.4.4 (react-app/src/org1-react-app.tsx:6; Observation); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observation); 3.4.5 (#3; Configuration); 3.4.5 (#4; Configuration); 3.4.5 (#6; Configuration); 3.4.6 (#2; Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #71; configures #78; configures #79; configures #81 |
| 21 | 3.4.2 (react-app/package.json:44; Evidence); 3.4.2 (react-vite-app/package.json:17; Evidence); 3.4.2 (root-config/package.json:47; Evidence); 3.4.2 (root-config/package.json:48; Evidence); 3.4.4 (angular-app/src/main.single-spa.ts:112; Observation); 3.4.4 (react-vite-app/src/spa.tsx:99; Observation); 3.4.4 (react-app/src/org1-react-app.tsx:6; Observation); 3.4.4 (root-config/src/index.ejs:63; File:line); 3.4.4 (root-config/src/index.ejs:63; Observation); 3.4.4 (root-config/src/index.ejs:135; Observation); 3.4.4 (root-config/src/org1-root-config.ts:5; Observation); 3.4.4 (root-config/src/org1-root-config.ts:11; Observation); 3.4.4 (root-config/src/org1-root-config.ts:17; Observation); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observation); 3.4.5 (#1; Code); 3.4.5 (#2; Code); 3.4.5 (#3; Code); 3.4.5 (#4; Configuration); 3.4.5 (#5; Configuration); 3.4.5 (#6; Configuration); 3.4.6 (#1; Where served); 3.4.6 (#2; Where served); 3.4.6 (#3; Where served); 3.4.6 (#4; Where served) | 2 configuration | configuration | import-maps | architectural | strong | configures #76; configures #77; configures #78; configures #79; configures #80; configures #81 |
| 22 | 3.4.2 (react-app/package.json:51; Evidence); 3.4.2 (root-config/package.json:47; Evidence); 3.4.2 (root-config/package.json:48; Evidence); 3.4.2 (root-config/package.json:40; Evidence); 3.4.3 (root-config; Markers); 3.4.3 (root-config; Entry); 3.4.3 (root-config; Build); 3.4.4 (root-config/src/org1-root-config.ts:3; Observation); 3.4.4 (root-config/src/index.ejs:63; Observation); 3.4.6 (#4; Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #73; configures #42 |
| 23 | 3.4.2 (react-vite-app/package.json:17; Evidence); 3.4.2 (react-vite-app/package.json:19; Evidence); 3.4.2 (react-vite-app/package.json:36; Evidence); 3.4.3 (react-vite-app; Markers); 3.4.3 (react-vite-app; Entry); 3.4.3 (react-vite-app; Build); 3.4.4 (react-vite-app/src/spa.tsx:99; Observation); 3.4.4 (react-vite-app/src/spa.tsx:100; Observation); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observation); 3.4.5 (#2; Configuration); 3.4.5 (#5; Configuration); 3.4.5 (#6; Configuration); 3.4.6 (#3; Where served); 3.4.6 (#3; Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #72; configures #77; configures #80; configures #81 |
| 24 | 3.4.2 (root-config/package.json:48; Evidence); 3.4.4 (root-config/src/index.ejs:50; File:line); 3.4.4 (root-config/src/index.ejs:50; Observation) | 2 configuration | configuration | import-maps | technological | moderate | — |
| 25 | 3.4.2 (root-config/package.json:48; Evidence); 3.4.4 (root-config/src/index.ejs:60; File:line); 3.4.8 (#10; Origin) | 2 configuration | configuration | import-maps | technological | weak | — |
| 26 | 3.4.3 (styleguide; Markers); 3.4.3 (styleguide; Entry); 3.4.3 (styleguide; Build) | 2 configuration | configuration | import-maps | technological | moderate | configures #74 |
| 27 | 3.4.4 (root-config/src/index.ejs:35; File:line); 3.4.4 (root-config/src/index.ejs:35; Observation) | 2 configuration | configuration | import-maps | technological | moderate | — |
| 28 | 3.4.4 (angular-app/src/main.single-spa.ts:112; src-mount-export) | 3 code | source code | single-spa | technological | moderate | implements #76 |
| 29 | 3.4.4 (angular-app/src/main.single-spa.ts:113; src-mount-export) | 3 code | source code | single-spa | technological | moderate | implements #76 |
| 30 | 3.4.4 (angular-app/src/main.single-spa.ts:114; src-mount-export) | 3 code | source code | single-spa | technological | moderate | implements #76 |
| 31 | 3.4.4 (react-vite-app/src/spa.tsx:99; src-mount-export) | 3 code | source code | single-spa | technological | moderate | implements #77 |
| 32 | 3.4.4 (react-vite-app/src/spa.tsx:100; src-mount-export) | 3 code | source code | single-spa | technological | moderate | implements #77 |
| 33 | 3.4.4 (react-vite-app/src/spa.tsx:101; src-mount-export) | 3 code | source code | single-spa | technological | moderate | implements #77 |
| 34 | 3.4.4 (angular-app/extra-webpack.config.js:1; src-lifecycles) | 3 code | configuration | single-spa | technological | weak | — |
| 35 | 3.4.4 (angular-app/extra-webpack.config.js:5; src-lifecycles) | 3 code | configuration | single-spa | technological | weak | — |
| 36 | 3.4.4 (angular-app/src/main.single-spa.ts:7; src-lifecycles) | 3 code | source code | single-spa | technological | moderate | implements #76 |
| 37 | 3.4.4 (angular-app/src/main.single-spa.ts:20; src-lifecycles) | 3 code | source code | single-spa | technological | moderate | implements #76 |
| 38 | 3.4.4 (react-app/src/org1-react-app.tsx:3; src-lifecycles) | 3 code | source code | single-spa | technological | moderate | implements #78 |
| 39 | 3.4.4 (react-app/src/org1-react-app.tsx:6; src-lifecycles) | 3 code | source code | single-spa | technological | moderate | implements #78 |
| 40 | 3.4.4 (react-vite-app/src/spa.tsx:3; src-lifecycles) | 3 code | source code | single-spa | technological | moderate | implements #77 |
| 41 | 3.4.4 (react-vite-app/src/spa.tsx:8; src-lifecycles) | 3 code | source code | single-spa | technological | moderate | implements #77 |
| 42 | 3.4.4 (root-config/src/org1-root-config.ts:3; src-lifecycles) | 3 code | source code | single-spa | architectural | strong | implements #78 |
| 43 | 3.4.4 (root-config/src/org1-root-config.ts:9; src-lifecycles) | 3 code | source code | single-spa | architectural | strong | implements #76 |
| 44 | 3.4.4 (root-config/src/org1-root-config.ts:15; src-lifecycles) | 3 code | source code | single-spa | architectural | strong | implements #77 |
| 45 | 3.4.4 (react-vite-app/src/App.tsx:26; src-import-map) | 3 code | comment | import-maps | technological | weak | — |
| 46 | 3.4.4 (root-config/src/index.ejs:22; src-import-map) | 3 code | comment | import-maps | technological | weak | — |
| 47 | 3.4.4 (root-config/src/index.ejs:23; src-import-map) | 3 code | comment | import-maps | technological | weak | — |
| 48 | 3.4.4 (root-config/src/index.ejs:24; src-import-map) | 3 code | comment | import-maps | technological | weak | — |
| 49 | 3.4.4 (root-config/src/index.ejs:35; src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 50 | 3.4.4 (root-config/src/index.ejs:50; src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 51 | 3.4.4 (root-config/src/index.ejs:60; src-import-map) | 3 code | comment | import-maps | technological | weak | — |
| 52 | 3.4.4 (root-config/src/index.ejs:63; src-import-map) | 3 code | source code | import-maps | architectural | strong | implements #76; implements #77; implements #78 |
| 53 | 3.4.4 (root-config/src/index.ejs:93; src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 54 | 3.4.4 (root-config/src/index.ejs:135; src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 55 | 3.4.4 (root-config/src/index.ejs:197; src-import-map) | 3 code | comment | import-maps | technological | weak | — |
| 56 | 3.4.4 (root-config/src/index.ejs:199; src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 57 | 3.4.4 (root-config/src/org1-root-config.ts:5; src-import-map) | 3 code | source code | import-maps | architectural | strong | implements #78 |
| 58 | 3.4.4 (root-config/src/org1-root-config.ts:11; src-import-map) | 3 code | source code | import-maps | architectural | strong | implements #76 |
| 59 | 3.4.4 (root-config/src/org1-root-config.ts:17; src-import-map) | 3 code | source code | import-maps | architectural | strong | implements #77 |
| 60 | 3.4.4 (root-config/src/index.ejs:14; src-html-external-script) | 3 code | source code | — | context | weak | — |
| 61 | 3.4.4 (root-config/src/index.ejs:91; src-html-external-script) | 3 code | comment | — | context | weak | — |
| 62 | 3.4.4 (root-config/src/index.ejs:93; src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 63 | 3.4.4 (root-config/src/index.ejs:95; src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 64 | 3.4.4 (root-config/src/index.ejs:96; src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 65 | 3.4.4 (root-config/src/index.ejs:98; src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 66 | 3.4.4 (root-config/src/index.ejs:99; src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 67 | 3.4.4 (root-config/src/org1-root-config.ts:21; manual) | 3 code | source code | single-spa | technological | moderate | implements #76; implements #77; implements #78 |
| 68 | 3.4.4 (common-lib-webpack/src/user-state.ts:9; manual) | 3 code | source code | events | technological | moderate | implements #79; implements #80; implements #81 |
| 69 | 3.4.3 (angular-app) | 4 structure | directory | single-spa | architectural | moderate | — |
| 70 | 3.4.3 (common-lib-webpack) | 4 structure | directory | — | context | weak | — |
| 71 | 3.4.3 (react-app) | 4 structure | directory | single-spa | architectural | moderate | — |
| 72 | 3.4.3 (react-vite-app) | 4 structure | directory | single-spa | architectural | moderate | — |
| 73 | 3.4.3 (root-config) | 4 structure | directory | single-spa | architectural | moderate | — |
| 74 | 3.4.3 (styleguide) | 4 structure | directory | — | context | weak | — |
| 75 | 3.4.3 (vue-app) | 4 structure | directory | — | architectural | moderate | — |
| 76 | 3.4.5 #1 | 5 composition | source code | single-spa | architectural | strong | links #73; links #69 |
| 77 | 3.4.5 #2 | 5 composition | source code | single-spa | architectural | strong | links #73; links #72 |
| 78 | 3.4.5 #3 | 5 composition | source code | single-spa | architectural | strong | links #73; links #71 |
| 79 | 3.4.5 #4 | 5 composition | source code | events | architectural | strong | links #71; links #69 |
| 80 | 3.4.5 #5 | 5 composition | source code | events | architectural | strong | links #72; links #69 |
| 81 | 3.4.5 #6 | 5 composition | source code | events | architectural | strong | links #71; links #72 |
| 82 | 3.4.6 #1 | 6 build-deploy | configuration | single-spa | architectural | moderate | publishes #69 |
| 83 | 3.4.6 #2 | 6 build-deploy | configuration | single-spa | architectural | moderate | publishes #71 |
| 84 | 3.4.6 #3 | 6 build-deploy | configuration | single-spa | architectural | moderate | publishes #72 |
| 85 | 3.4.6 #4 | 6 build-deploy | configuration | single-spa | architectural | moderate | publishes #73 |
| 86 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #75 |
| 87 | 3.4.7 #1 | 7 documentation | documentation | single-spa | technological | weak | corroborates #76; corroborates #77; corroborates #78 |
| 88 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #73; corroborates #69; corroborates #71; corroborates #72; corroborates #76; corroborates #77; corroborates #78 |
| 89 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #76; corroborates #78 |
| 90 | 3.4.8 #1 | 8 history | history | import-maps | technological | weak | explains #4 |
| 91 | 3.4.8 #2 | 8 history | history | single-spa | technological | weak | explains #6 |
| 92 | 3.4.8 #3 | 8 history | history | single-spa | technological | weak | explains #7 |
| 93 | 3.4.8 #4 | 8 history | history | single-spa | technological | weak | explains #9 |
| 94 | 3.4.8 #5 | 8 history | history | import-maps | technological | weak | explains #11; explains #45 |
| 95 | 3.4.8 #6 | 8 history | history | import-maps | technological | weak | explains #14 |
| 96 | 3.4.8 #7 | 8 history | history | import-maps | technological | weak | explains #15 |
| 97 | 3.4.8 #8 | 8 history | history | single-spa | technological | weak | explains #16 |
| 98 | 3.4.8 #9 | 8 history | history | import-maps | technological | weak | explains #46; explains #47; explains #48 |
| 99 | 3.4.8 #10 | 8 history | history | import-maps | architectural | weak | explains #25; explains #21; explains #51; explains #85 |
| 100 | 3.4.8 #11 | 8 history | history | import-maps | technological | weak | explains #54; explains #55 |
| 101 | 3.4.8 #12 | 8 history | history | — | context | weak | explains #61 |

## Summary

Observations: 101. Dimensions (technology: 17, configuration: 10, code: 41, structure: 7, composition: 6, build-deploy: 5, documentation: 3, history: 12). Strength (strong: 14, moderate: 32, weak: 51, ambiguous: 4). Evidence (technological: 69, architectural: 27, context: 5).

