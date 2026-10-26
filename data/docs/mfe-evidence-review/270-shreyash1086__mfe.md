---
schema: 1
id: 1248756347
full_name: shreyash1086/mfe
commit: b0fdd18d2ef6beb846fa0a534b9458669405fe6b
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

# 270 — shreyash1086/mfe

## Repository overview

Observed architecture combines shell and nine React modules composed through Module Federation, plus federated design system. Dependency inspection records no technologies in dependencies.csv, therefore no dimension 1 observation. Mechanism evidence comes from configurations/code: plugins expose Apps and declare remote sharedDesignSystem; HTML code resolves addresses, and shell loader initializes containers, retrieves modules and mounts through routes (#59; #101–#109). Nine modules do not load one another.

Design system has two roles: file: build package and remote consumed by shell/nine modules (#110–#119). Structure review confirms eleven directories with own entries/builds (#90–#100), including design system demo UI, while classification counts ten application units. Counting scopes recorded in 3.4 preserved here. Publication separate by image/service without independent versioning; shell build depends on module sources to generate CSS. Authentication/theme cross units through global bridge, storage and DOM class (#120–#128).

React-dom/client imports, local bootstraps and VM client iframes do not compose these units. Documentation confirms chain portions but retains old counts/names, example static imports, healthchecks and version guarantees contradicted by current artifacts (#140, #146, #147, #162, #165). Historical points explain expansion, delimiting old-blob gaps; remaining uncertainties concern past with snapshot architecture established.

Extraction uses seven final reviews without new mining. In dimension 2 each webpack configuration one whole observation per unit, including second shell config. HTML URL map browser-executed code supports recorded relationships without new configuration observation. Proxy configurations, nginx publication paths, devServer ports and executable code such as remoteConfig.js excluded. JavaScript constructs within promise remotes also remain in dimension 3, one per source-review row. Historical point without commits resolved only through snapshot excerpts indicated in 3.4.8.

## Observations

### 1. module-assessment/webpack.config.js:35-74

**Observation:** ModuleFederationPlugin declares name: "assessment", filename: "remoteEntry.js". Exposes `./AssessmentApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-assessment links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 2. module-cloud-console/webpack.config.js:34-73

**Observation:** ModuleFederationPlugin declares name: "cloud_console", filename: "remoteEntry.js". Exposes `./CloudConsoleApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-cloud-console links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 3. module-cloud-labs/webpack.config.js:29-68

**Observation:** ModuleFederationPlugin declares name: "cloud_labs", filename: "remoteEntry.js". Exposes `./CloudLabsApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-cloud-labs links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 4. module-code-environment/webpack.config.js:30-69

**Observation:** ModuleFederationPlugin declares name: "code_environment", filename: "remoteEntry.js". Exposes `./CodeEnvironmentApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-code-environment links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 5. module-code-module/webpack.config.js:37-79

**Observation:** ModuleFederationPlugin declares name: "code_module", filename: "remoteEntry.js". Exposes `./CodeModuleApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, styled-components, shared-design-system as singletons.

**Interpretation:** Configuration of module-code-module links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 6. module-content-uploading/webpack.config.js:29-68

**Observation:** ModuleFederationPlugin declares name: "content_uploading", filename: "remoteEntry.js". Exposes `./ContentUploadingApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-content-uploading links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 7. module-dashboard/webpack.config.js:29-68

**Observation:** ModuleFederationPlugin declares name: "dashboard", filename: "remoteEntry.js". Exposes `./DashboardApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-dashboard links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 8. module-logging/webpack.config.js:30-69

**Observation:** ModuleFederationPlugin declares name: "logging", filename: "remoteEntry.js". Exposes `./LoggingApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, shared-design-system as singletons.

**Interpretation:** Configuration of module-logging links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 9. module-virtual-machine/webpack.config.js:29-71

**Observation:** ModuleFederationPlugin declares name: "virtual_machine", filename: "remoteEntry.js". Exposes `./VirtualMachineApp` → `./src/App`. Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, styled-components, shared-design-system as singletons.

**Interpretation:** Configuration of module-virtual-machine links unit to remote sharedDesignSystem through Module Federation, offering own App for consumption.

### 10. shared-design-system/webpack.config.js:35-60

**Observation:** ModuleFederationPlugin declares name: "sharedDesignSystem", filename: "remoteEntry.js". Exposes `./tokens` → `./src/tokens/index.js`, `./styles` → `./src/styles/global.css`, `./ThemeContext` → `./src/contexts/ThemeContext.jsx`, `./Button` → `./src/components/Button.jsx`, `./Card` → `./src/components/Card.jsx`, `./Badge` → `./src/components/Badge.jsx`, `./Loader` → `./src/components/Loader.jsx`, `./PageHeader` → `./src/components/PageHeader.jsx`, `./EmptyState` → `./src/components/EmptyState.jsx`, `./Toast` → `./src/components/Toast.jsx`. Configures react, react-dom as singletons.

**Interpretation:** Configures federated container offering tokens, styles, context and components; block identifies no consumers.

### 11. shell-app/webpack.config.js:30-59

**Observation:** ModuleFederationPlugin declares name: "shell". Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, styled-components, shared-design-system as singletons.

**Interpretation:** Configuration of shell-app links unit to remote sharedDesignSystem through Module Federation. Nine module-* targets resolved by shell loader outside block.

### 12. shell-app/webpack.prod.config.js:42-66

**Observation:** ModuleFederationPlugin declares name: "shell". Declares sharedDesignSystem as promise remote: reuses window.sharedDesignSystem or injects script from design_system URL in window.__RUNTIME_REMOTE_CONFIG__, with fallback http://localhost:3010/remoteEntry.js. Configures react, react-dom, react-router, react-router-dom, styled-components, shared-design-system as singletons.

**Interpretation:** Configuration of shell-app links unit to remote sharedDesignSystem through Module Federation. Nine module-* targets resolved by shell loader outside block.

### 13. module-cloud-console/src/bootstrap.js:4; module-cloud-console/src/bootstrap.js:3-7

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 14. module-cloud-labs/src/bootstrap.js:4; module-cloud-labs/src/bootstrap.js:3-7

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 15. module-code-environment/src/bootstrap.js:4; module-code-environment/src/bootstrap.js:3-7

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 16. module-content-uploading/src/bootstrap.js:2; module-content-uploading/src/bootstrap.js:1-5

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 17. module-dashboard/src/bootstrap.js:4; module-dashboard/src/bootstrap.js:3-7

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 18. module-logging/src/bootstrap.js:4; module-logging/src/bootstrap.js:3-7

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 19. module-virtual-machine/src/bootstrap.js:4; module-virtual-machine/src/bootstrap.js:3-7

**Observation:** Bootstrap asynchronously imports react-dom/client, using createRoot to render local App.

**Interpretation:** Framework package loading renders own unit without linking frontends.

### 20. module-assessment/src/index.js:1

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 21. module-cloud-console/src/index.js:4

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 22. module-cloud-labs/src/index.js:4

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 23. module-code-environment/src/index.js:4

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 24. module-code-module/src/index.js:1

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 25. module-content-uploading/src/index.js:1

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 26. module-dashboard/src/index.js:4

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 27. module-logging/src/index.js:4

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 28. module-virtual-machine/src/index.js:4

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 29. shared-design-system/src/index.js:1

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 30. shell-app/src/index.js:2

**Observation:** Entry executes import("./bootstrap").

**Interpretation:** Local asynchronous boundary, isolated technological signal identifying neither composition mechanism nor target in construct.

### 31. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:35-49; shell-app/src/App.jsx:15-77

**Observation:** `__webpack_init_sharing__("default")` in `initRemoteContainer` (shell-app/src/remotes/remoteLoader.js:35-49) initializes shared scope before starting remote container

**Interpretation:** Implements Module Federation loader portion; target name parameter-supplied without independently establishing inter-unit link.

### 32. shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:41-47

**Observation:** `container.init(__webpack_share_scopes__.default)` starts container `window[scope]` of loaded remote (shell-app/src/remotes/remoteLoader.js:41-47); same chain as :59

**Interpretation:** Implements Module Federation loader portion; target name parameter-supplied without independently establishing inter-unit link.

### 33. shell-app/src/remotes/remoteLoader.js:51

**Observation:** Definition of `loadRemoteModule`: injects `remoteEntry.js` (:58), initializes container (:59), obtaining exposed module through `container.get(exposedModule)` (:62-63)

**Interpretation:** Implements Module Federation loader portion; target name parameter-supplied without independently establishing inter-unit link.

### 34. shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:80-88; shell-app/src/App.jsx:11; shell-app/src/App.jsx:15-77

**Observation:** `loadRemoteModule({ remoteName, remoteUrl, exposedModule })` inside `ReactLazyWrapper` (shell-app/src/remotes/remoteLoader.js:80-88), returned by `loadRemoteComponent` (:68-78), imported in shell-app/src/App.jsx:11 and called for nine remotes (shell-app/src/App.jsx:15-77)

**Interpretation:** Implements Module Federation loader portion; target name parameter-supplied without independently establishing inter-unit link.

### 35. module-assessment/webpack.config.js:44; module-assessment/webpack.config.js:39-50; module-assessment/src/ThemeContext.jsx:1; module-assessment/src/pages/Assessment.jsx:15-16; module-assessment/webpack.config.js:35-74

**Observation:** Remote `sharedDesignSystem` as `promise` (module-assessment/webpack.config.js:39-50): injects `remoteEntry.js` from shared-design-system through URL `design_system` in `window.__RUNTIME_REMOTE_CONFIG__` or `http://localhost:3010/remoteEntry.js` (:42-43). Used: `ThemeProvider` reexported from `sharedDesignSystem/ThemeContext` (module-assessment/src/ThemeContext.jsx:1) and `PageHeader`/`Card` (module-assessment/src/pages/Assessment.jsx:15-16)

**Interpretation:** Promise remote code of module-assessment names sharedDesignSystem, loading federated container and linking two units.

### 36. module-cloud-console/webpack.config.js:43; module-cloud-console/webpack.config.js:38-49; module-cloud-console/src/ThemeContext.jsx:1; module-cloud-console/src/CloudConsole.jsx:7-8; module-cloud-console/webpack.config.js:34-73

**Observation:** Remote `sharedDesignSystem` as `promise` (module-cloud-console/webpack.config.js:38-49), same injection of `remoteEntry.js` from shared-design-system (:41-42); used in module-cloud-console/src/ThemeContext.jsx:1 and module-cloud-console/src/CloudConsole.jsx:7-8

**Interpretation:** Promise remote code of module-cloud-console names sharedDesignSystem, loading federated container and linking two units.

### 37. module-cloud-labs/webpack.config.js:38; module-cloud-labs/webpack.config.js:33-44; module-cloud-labs/src/ThemeContext.jsx:1; module-cloud-labs/src/CloudLabs.jsx:6-7; module-cloud-labs/webpack.config.js:29-68

**Observation:** Remote `sharedDesignSystem` as `promise` (module-cloud-labs/webpack.config.js:33-44), same injection of `remoteEntry.js` from shared-design-system (:36-37); used in module-cloud-labs/src/ThemeContext.jsx:1 and module-cloud-labs/src/CloudLabs.jsx:6-7

**Interpretation:** Promise remote code of module-cloud-labs names sharedDesignSystem, loading federated container and linking two units.

### 38. module-code-environment/webpack.config.js:39; module-code-environment/webpack.config.js:34-45; module-code-environment/src/ThemeContext.jsx:1; module-code-environment/src/CodeEnvironment.jsx:9-10; module-code-environment/webpack.config.js:30-69

**Observation:** Remote `sharedDesignSystem` as `promise` (module-code-environment/webpack.config.js:34-45), same injection of `remoteEntry.js` from shared-design-system (:37-38); used in module-code-environment/src/ThemeContext.jsx:1 and module-code-environment/src/CodeEnvironment.jsx:9-10

**Interpretation:** Promise remote code of module-code-environment names sharedDesignSystem, loading federated container and linking two units.

### 39. module-code-module/webpack.config.js:46; module-code-module/webpack.config.js:41-52; module-code-module/src/ThemeContext.jsx:1; module-code-module/src/CodeModule.jsx:24; module-code-module/webpack.config.js:37-79

**Observation:** Remote `sharedDesignSystem` as `promise` (module-code-module/webpack.config.js:41-52), same injection of `remoteEntry.js` from shared-design-system (:44-45); used in module-code-module/src/ThemeContext.jsx:1 and module-code-module/src/CodeModule.jsx:24

**Interpretation:** Promise remote code of module-code-module names sharedDesignSystem, loading federated container and linking two units.

### 40. module-content-uploading/webpack.config.js:38; module-content-uploading/webpack.config.js:33-44; module-content-uploading/src/ThemeContext.jsx:1; module-content-uploading/src/Content.jsx:12-13; module-content-uploading/webpack.config.js:29-68

**Observation:** Remote `sharedDesignSystem` as `promise` (module-content-uploading/webpack.config.js:33-44), same injection of `remoteEntry.js` from shared-design-system (:36-37); used in module-content-uploading/src/ThemeContext.jsx:1 and module-content-uploading/src/Content.jsx:12-13

**Interpretation:** Promise remote code of module-content-uploading names sharedDesignSystem, loading federated container and linking two units.

### 41. module-dashboard/webpack.config.js:38; module-dashboard/webpack.config.js:33-44; module-dashboard/src/ThemeContext.jsx:1; module-dashboard/src/Dashboard.jsx:24-25; module-dashboard/webpack.config.js:29-68

**Observation:** Remote `sharedDesignSystem` as `promise` (module-dashboard/webpack.config.js:33-44), same injection of `remoteEntry.js` from shared-design-system (:36-37); used in module-dashboard/src/ThemeContext.jsx:1 and module-dashboard/src/Dashboard.jsx:24-25

**Interpretation:** Promise remote code of module-dashboard names sharedDesignSystem, loading federated container and linking two units.

### 42. module-logging/webpack.config.js:39; module-logging/webpack.config.js:34-45; module-logging/src/ThemeContext.jsx:1; module-logging/src/Logs.jsx:27-28; module-logging/webpack.config.js:30-69

**Observation:** Remote `sharedDesignSystem` as `promise` (module-logging/webpack.config.js:34-45), same injection of `remoteEntry.js` from shared-design-system (:37-38); used in module-logging/src/ThemeContext.jsx:1 and module-logging/src/Logs.jsx:27-28

**Interpretation:** Promise remote code of module-logging names sharedDesignSystem, loading federated container and linking two units.

### 43. module-virtual-machine/webpack.config.js:38; module-virtual-machine/webpack.config.js:33-44; module-virtual-machine/src/ThemeContext.jsx:1; module-virtual-machine/src/VirtualMachine.jsx:23; module-virtual-machine/webpack.config.js:29-71

**Observation:** Remote `sharedDesignSystem` as `promise` (module-virtual-machine/webpack.config.js:33-44), same injection of `remoteEntry.js` from shared-design-system (:36-37); used in module-virtual-machine/src/ThemeContext.jsx:1 and module-virtual-machine/src/VirtualMachine.jsx:23

**Interpretation:** Promise remote code of module-virtual-machine names sharedDesignSystem, loading federated container and linking two units.

### 44. shell-app/src/remotes/remoteLoader.js:9; shell-app/src/remotes/remoteLoader.js:4-31; shell-app/src/config/remoteConfig.js:28-31; shell-app/public/index.html:18-51

**Observation:** loadScript creates script element, assigns received URL and appends to head; loadRemoteModule uses function to load remoteEntry.js.

**Interpretation:** Injection implements federation mechanism dynamic loading, receiving target as parameter.

### 45. shell-app/webpack.config.js:40; shell-app/webpack.config.js:35-46; shell-app/package.json:6; shell-app/src/App.jsx:3; shell-app/src/contexts/ThemeContext.jsx:1; shell-app/webpack.config.js:30-59

**Observation:** Remote `sharedDesignSystem` as `promise` (shell-app/webpack.config.js:35-46) injects `remoteEntry.js` from shared-design-system (URL `design_system`, :38-39); config for script `build` (shell-app/package.json:6). Used by `import "sharedDesignSystem/styles"` (shell-app/src/App.jsx:3) and `ThemeProvider` from shell-app/src/contexts/ThemeContext.jsx:1

**Interpretation:** Promise remote code of shell-app names sharedDesignSystem, loading federated container and linking two units.

### 46. shell-app/webpack.prod.config.js:50; shell-app/webpack.prod.config.js:45-56; shell-app/Dockerfile:26; shell-app/webpack.prod.config.js:42-66

**Observation:** Same remote `sharedDesignSystem` as `promise` (shell-app/webpack.prod.config.js:45-56) in config used by Docker image (shell-app/Dockerfile:26)

**Interpretation:** Promise remote code of shell-app names sharedDesignSystem, loading federated container and linking two units.

### 47. module-assessment/src/pages/KodeEnvSection.jsx:369; module-assessment/src/pages/KodeEnvSection.jsx:7

**Observation:** Iframe receives external Guacamole client URL composed with connectionId and token of selected instance.

**Interpretation:** Embed displays laboratory VM session; review records Composition No because not frontend unit of group.

### 48. module-code-module/src/CodeModule.jsx:847; module-code-module/src/CodeModule.jsx:35

**Observation:** Iframe receives external Guacamole client URL composed with connectionId and token of selected instance.

**Interpretation:** Embed displays laboratory VM session; review records Composition No because not frontend unit of group.

### 49. shell-app/src/App.jsx:15; shell-app/src/App.jsx:15-21; module-cloud-labs/webpack.config.js:30; shell-app/src/App.jsx:181-192; module-cloud-labs/webpack.config.js:29-68

**Observation:** `React.lazy(loadRemoteComponent({ remoteName: "cloud_labs", exposedModule: "./CloudLabsApp", getRemoteUrl }))` (shell-app/src/App.jsx:15-21) loads module exposed at runtime by module-cloud-labs (`name: "cloud_labs"`, module-cloud-labs/webpack.config.js:30; `./CloudLabsApp`, :47); route `/cloud-labs` in shell-app/src/App.jsx:181-192

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 50. shell-app/src/App.jsx:22; shell-app/src/App.jsx:22-28; module-dashboard/webpack.config.js:30; shell-app/src/App.jsx:169-180; module-dashboard/webpack.config.js:29-68

**Observation:** `React.lazy` of `dashboard`/`./DashboardApp` (shell-app/src/App.jsx:22-28), exposed by module-dashboard (module-dashboard/webpack.config.js:30, :47); route `/dashboard` in shell-app/src/App.jsx:169-180

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 51. shell-app/src/App.jsx:29; shell-app/src/App.jsx:29-35; module-virtual-machine/webpack.config.js:30; shell-app/src/App.jsx:193-204; module-virtual-machine/webpack.config.js:29-71

**Observation:** `React.lazy` of `virtual_machine`/`./VirtualMachineApp` (shell-app/src/App.jsx:29-35), exposed by module-virtual-machine (module-virtual-machine/webpack.config.js:30, :47); route `/virtual-machine` in shell-app/src/App.jsx:193-204

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 52. shell-app/src/App.jsx:36; shell-app/src/App.jsx:36-42; module-cloud-console/webpack.config.js:35; shell-app/src/App.jsx:205-216; module-cloud-console/webpack.config.js:34-73

**Observation:** `React.lazy` of `cloud_console`/`./CloudConsoleApp` (shell-app/src/App.jsx:36-42), exposed by module-cloud-console (module-cloud-console/webpack.config.js:35, :52); route `/cloud-console` in shell-app/src/App.jsx:205-216

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 53. shell-app/src/App.jsx:43; shell-app/src/App.jsx:43-49; module-logging/webpack.config.js:31; shell-app/src/App.jsx:217-228; module-logging/webpack.config.js:30-69

**Observation:** `React.lazy` of `logging`/`./LoggingApp` (shell-app/src/App.jsx:43-49), exposed by module-logging (module-logging/webpack.config.js:31, :48); route `/system-logs` in shell-app/src/App.jsx:217-228

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 54. shell-app/src/App.jsx:50; shell-app/src/App.jsx:50-56; module-code-environment/webpack.config.js:31; shell-app/src/App.jsx:229-240; module-code-environment/webpack.config.js:30-69

**Observation:** `React.lazy` of `code_environment`/`./CodeEnvironmentApp` (shell-app/src/App.jsx:50-56), exposed by module-code-environment (module-code-environment/webpack.config.js:31, :48); route `/code-environment` in shell-app/src/App.jsx:229-240

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 55. shell-app/src/App.jsx:57; shell-app/src/App.jsx:57-63; module-code-module/webpack.config.js:38; shell-app/src/App.jsx:241-252; module-code-module/webpack.config.js:37-79

**Observation:** `React.lazy` of `code_module`/`./CodeModuleApp` (shell-app/src/App.jsx:57-63), exposed by module-code-module (module-code-module/webpack.config.js:38, :55); route `/code-module` in shell-app/src/App.jsx:241-252

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 56. shell-app/src/App.jsx:64; shell-app/src/App.jsx:64-70; module-content-uploading/webpack.config.js:30; shell-app/src/App.jsx:253-264; module-content-uploading/webpack.config.js:29-68

**Observation:** `React.lazy` of `content_uploading`/`./ContentUploadingApp` (shell-app/src/App.jsx:64-70), exposed by module-content-uploading (module-content-uploading/webpack.config.js:30, :47); route `/content-uploading/*` in shell-app/src/App.jsx:253-264

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 57. shell-app/src/App.jsx:71; shell-app/src/App.jsx:71-77; module-assessment/webpack.config.js:36; shell-app/src/App.jsx:265-276; module-assessment/webpack.config.js:35-74

**Observation:** `React.lazy` of `assessment`/`./AssessmentApp` (shell-app/src/App.jsx:71-77), exposed by module-assessment (module-assessment/webpack.config.js:36, :53); route `/assessment/*` in shell-app/src/App.jsx:265-276

**Interpretation:** Names remote container/exposed module at loading point, linking host to target unit.

### 58. shell-app/src/App.jsx:148; shell-app/src/App.jsx:128-153; shell-app/src/bootstrap.js:6

**Observation:** `RemoteWrapper` renders `<Component />`, lazy remote component, inside `RemoteErrorBoundary` and `Suspense` (shell-app/src/App.jsx:128-153); receives nine components through routes at :169-276. `App` rendered in shell-app/src/bootstrap.js:6

**Interpretation:** Wrapper renders parameter-supplied remote component with waiting/error handling; alone names no target.

### 59. shell-app/src/App.jsx:167; shell-app/src/App.jsx:167-277; shell-app/src/App.jsx:294

**Observation:** `<Routes>` of `AppLayout` (shell-app/src/App.jsx:167-277) declares nine routes and remote of each (`remoteName` and `component`, e.g. `/dashboard` → `dashboard`/`DashboardApp`, :169-180); `AppLayout` is route `/*` in shell-app/src/App.jsx:294

**Interpretation:** Route table links shell paths to nine identified remote components, explicitly showing interface composition.

### 60. shell-app/src/App.jsx:291; shell-app/src/App.jsx:291-296; shell-app/src/contexts/ThemeContext.jsx:1; shell-app/src/App.jsx:6; shared-design-system/webpack.config.js:41; shell-app/src/App.jsx:3; shared-design-system/webpack.config.js:40; shared-design-system/webpack.config.js:35-60

**Observation:** Renders `<ThemeProvider>` around app (shell-app/src/App.jsx:291-296); from reexport of `sharedDesignSystem/ThemeContext` (shell-app/src/contexts/ThemeContext.jsx:1, imported in shell-app/src/App.jsx:6), exposed by shared-design-system (shared-design-system/webpack.config.js:41). Shell also loads `sharedDesignSystem/styles` through static import (shell-app/src/App.jsx:3; exposed in shared-design-system/webpack.config.js:40)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 61. shell-app/src/contexts/AuthContext.jsx:229; shell-app/src/contexts/AuthContext.jsx:228-262; module-dashboard/src/AuthContext.jsx:30-33; module-cloud-labs/src/AuthContext.jsx:111-113; shell-app/src/components/Login.jsx:70-71; shell-app/src/App.jsx:290

**Observation:** Shell `AuthProvider` publishes bridge `window.__SHELL_AUTH__` (shell-app/src/contexts/AuthContext.jsx:228-262) with user, password, token, role, `accessFlags`, `onAuthChange` and `signOut`; notifies subscribers on logout (:218-224). Remotes read it when running in shell, e.g. module-dashboard/src/AuthContext.jsx:30-33 and module-cloud-labs/src/AuthContext.jsx:111-113; shell login stores credentials through it (shell-app/src/components/Login.jsx:70-71). `AuthProvider` wraps app in shell-app/src/App.jsx:290

**Interpretation:** Bridge publishes state/subscriptions for inter-unit communication; concrete consumers appear in composition relationships.

### 62. shared-design-system/src/contexts/ThemeContext.jsx:21; shared-design-system/webpack.config.js:41; shared-design-system/src/contexts/ThemeContext.jsx:14-22; shell-app/src/App.jsx:291; module-dashboard/src/App.jsx:11; module-assessment/src/pages/AssessmentReports.jsx:418; shell-app/src/components/Login.jsx:50; shared-design-system/webpack.config.js:35-60

**Observation:** Exposed `ThemeProvider` (`./ThemeContext`, shared-design-system/webpack.config.js:41) writes theme under key `theme` in `localStorage`, applying class `dark` on `documentElement` (shared-design-system/src/contexts/ThemeContext.jsx:14-22); each instance reads key on mounting (:8), listening for event `storage` (:24-33). Shell and nine modules each use own `ThemeProvider` (e.g. shell-app/src/App.jsx:291, module-dashboard/src/App.jsx:11); modules change theme through `toggleTheme` (e.g. module-assessment/src/pages/AssessmentReports.jsx:418); shell login writes same key (shell-app/src/components/Login.jsx:50, :53)

**Interpretation:** Shared context uses storage/DOM state to communicate theme between unit instances; storage listener does not demonstrate synthetic emission on same page.

### 63. module-assessment/src/App.jsx:24; module-assessment/src/App.jsx:22-45; module-assessment/src/ThemeContext.jsx:1; module-assessment/webpack.config.js:53; module-assessment/webpack.config.js:35-74

**Observation:** Renders `<ThemeProvider>` from shared-design-system around module routes (module-assessment/src/App.jsx:22-45); reexport from `sharedDesignSystem/ThemeContext` in module-assessment/src/ThemeContext.jsx:1. `App` is exposed module `./AssessmentApp` (module-assessment/webpack.config.js:53)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 64. module-assessment/src/pages/Assessment.jsx:350; module-assessment/src/pages/Assessment.jsx:15; shared-design-system/webpack.config.js:46; module-assessment/src/App.jsx:29; shared-design-system/webpack.config.js:35-60

**Observation:** Renders `<PageHeader>` from shared-design-system (import `sharedDesignSystem/PageHeader`, module-assessment/src/pages/Assessment.jsx:15; exposed in shared-design-system/webpack.config.js:46); `Assessment` is route `/` in module-assessment/src/App.jsx:29

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 65. module-assessment/src/pages/Assessment.jsx:400; module-assessment/src/pages/Assessment.jsx:16; shared-design-system/webpack.config.js:43; shared-design-system/webpack.config.js:35-60

**Observation:** Renders `<Card>` from shared-design-system (import `sharedDesignSystem/Card`, module-assessment/src/pages/Assessment.jsx:16; exposed in shared-design-system/webpack.config.js:43)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 66. module-assessment/src/pages/AssessmentsList.jsx:706; module-assessment/src/pages/AssessmentsList.jsx:9; module-assessment/src/App.jsx:30

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-assessment/src/pages/AssessmentsList.jsx:9); `AssessmentsList` is route `/assessments-list` in module-assessment/src/App.jsx:30

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 67. module-cloud-console/src/App.jsx:11; module-cloud-console/src/ThemeContext.jsx:1; module-cloud-console/webpack.config.js:52; module-cloud-console/webpack.config.js:34-73

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-cloud-console/src/ThemeContext.jsx:1); `App` is exposed module `./CloudConsoleApp` (module-cloud-console/webpack.config.js:52)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 68. module-cloud-console/src/CloudConsole.jsx:261; module-cloud-console/src/CloudConsole.jsx:7; module-cloud-console/src/App.jsx:12

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-cloud-console/src/CloudConsole.jsx:7); `CloudConsole` rendered in module-cloud-console/src/App.jsx:12

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 69. module-cloud-console/src/CloudConsole.jsx:281; module-cloud-console/src/CloudConsole.jsx:8

**Observation:** Renders `<Card>` from shared-design-system (import in module-cloud-console/src/CloudConsole.jsx:8)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 70. module-cloud-labs/src/App.jsx:11; module-cloud-labs/src/ThemeContext.jsx:1; module-cloud-labs/webpack.config.js:47; module-cloud-labs/webpack.config.js:29-68

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-cloud-labs/src/ThemeContext.jsx:1); `App` is exposed module `./CloudLabsApp` (module-cloud-labs/webpack.config.js:47)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 71. module-cloud-labs/src/CloudLabs.jsx:28; module-cloud-labs/src/CloudLabs.jsx:6

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-cloud-labs/src/CloudLabs.jsx:6)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 72. module-cloud-labs/src/CloudLabs.jsx:37; module-cloud-labs/src/CloudLabs.jsx:7

**Observation:** Renders `<Card>` from shared-design-system (import in module-cloud-labs/src/CloudLabs.jsx:7)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 73. module-code-environment/src/App.jsx:11; module-code-environment/src/ThemeContext.jsx:1; module-code-environment/webpack.config.js:48; module-code-environment/webpack.config.js:30-69

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-code-environment/src/ThemeContext.jsx:1); `App` is exposed module `./CodeEnvironmentApp` (module-code-environment/webpack.config.js:48)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 74. module-code-environment/src/CodeEnvironment.jsx:39; module-code-environment/src/CodeEnvironment.jsx:28-39; module-code-environment/src/CodeEnvironment.jsx:10

**Observation:** Renders `<Card>` from shared-design-system in `TaskCard` (module-code-environment/src/CodeEnvironment.jsx:28-39; import at :10), used at :548

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 75. module-code-environment/src/CodeEnvironment.jsx:492; module-code-environment/src/CodeEnvironment.jsx:9

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-code-environment/src/CodeEnvironment.jsx:9)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 76. module-code-module/src/App.jsx:11; module-code-module/src/ThemeContext.jsx:1; module-code-module/webpack.config.js:55; module-code-module/webpack.config.js:37-79

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-code-module/src/ThemeContext.jsx:1); `App` is exposed module `./CodeModuleApp` (module-code-module/webpack.config.js:55)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 77. module-code-module/src/CodeModule.jsx:887; module-code-module/src/CodeModule.jsx:24

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-code-module/src/CodeModule.jsx:24)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 78. module-content-uploading/src/App.jsx:12; module-content-uploading/src/App.jsx:12-18; module-content-uploading/src/ThemeContext.jsx:1; module-content-uploading/webpack.config.js:47; module-content-uploading/webpack.config.js:29-68

**Observation:** Renders `<ThemeProvider>` from shared-design-system around module routes (module-content-uploading/src/App.jsx:12-18; reexport in module-content-uploading/src/ThemeContext.jsx:1); `App` is exposed module `./ContentUploadingApp` (module-content-uploading/webpack.config.js:47)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 79. module-content-uploading/src/Content.jsx:639; module-content-uploading/src/Content.jsx:12; module-content-uploading/src/App.jsx:14

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-content-uploading/src/Content.jsx:12); `Content` is route `/` in module-content-uploading/src/App.jsx:14

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 80. module-content-uploading/src/CohortContent.jsx:311; module-content-uploading/src/CohortContent.jsx:13; module-content-uploading/src/App.jsx:15-16

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-content-uploading/src/CohortContent.jsx:13); `CohortContent` is route in module-content-uploading/src/App.jsx:15-16

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 81. module-content-uploading/src/CohortContent.jsx:327; module-content-uploading/src/CohortContent.jsx:14

**Observation:** Renders `<Card>` from shared-design-system (import in module-content-uploading/src/CohortContent.jsx:14; again at :755)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 82. module-dashboard/src/App.jsx:11; module-dashboard/src/ThemeContext.jsx:1; module-dashboard/webpack.config.js:47; module-dashboard/webpack.config.js:29-68

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-dashboard/src/ThemeContext.jsx:1); `App` is exposed module `./DashboardApp` (module-dashboard/webpack.config.js:47)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 83. module-dashboard/src/Dashboard.jsx:203; module-dashboard/src/Dashboard.jsx:202-203; module-dashboard/src/Dashboard.jsx:25

**Observation:** Renders `<Card>` from shared-design-system in `StatCard` (module-dashboard/src/Dashboard.jsx:202-203; import at :25), used at :293; again at :301 and :362

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 84. module-dashboard/src/Dashboard.jsx:272; module-dashboard/src/Dashboard.jsx:270-272; module-dashboard/src/Dashboard.jsx:24

**Observation:** Renders `<PageHeader>` from shared-design-system in `AdminDashboard` (module-dashboard/src/Dashboard.jsx:270-272; import at :24), rendered at :420 and :427

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 85. module-logging/src/App.jsx:11; module-logging/src/ThemeContext.jsx:1; module-logging/webpack.config.js:48; module-logging/webpack.config.js:30-69

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-logging/src/ThemeContext.jsx:1); `App` is exposed module `./LoggingApp` (module-logging/webpack.config.js:48)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 86. module-logging/src/Logs.jsx:458; module-logging/src/Logs.jsx:457-458; module-logging/src/Logs.jsx:28

**Observation:** Renders `<Card>` from shared-design-system in `StatCard` (module-logging/src/Logs.jsx:457-458; import at :28), used at :513

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 87. module-logging/src/Logs.jsx:492; module-logging/src/Logs.jsx:27

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-logging/src/Logs.jsx:27)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 88. module-virtual-machine/src/App.jsx:11; module-virtual-machine/src/ThemeContext.jsx:1; module-virtual-machine/webpack.config.js:47; module-virtual-machine/webpack.config.js:29-71

**Observation:** Renders `<ThemeProvider>` from shared-design-system (reexport in module-virtual-machine/src/ThemeContext.jsx:1); `App` is exposed module `./VirtualMachineApp` (module-virtual-machine/webpack.config.js:47)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 89. module-virtual-machine/src/VirtualMachine.jsx:802; module-virtual-machine/src/VirtualMachine.jsx:23

**Observation:** Renders `<PageHeader>` from shared-design-system (import in module-virtual-machine/src/VirtualMachine.jsx:23)

**Interpretation:** Uses federated design system component in unit rendering. Rendering point uses mechanism without declaring inter-application route.

### 90. module-assessment/; module-assessment/webpack.config.js:6; module-assessment/src/bootstrap.js:7; module-assessment/package.json:6; module-assessment/Dockerfile:2; docker-compose.yml:145-148; module-assessment/Dockerfile:15-20

**Observation:** Directory module-assessment has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 91. module-cloud-console/; module-cloud-console/webpack.config.js:7; module-cloud-console/src/bootstrap.js:6; module-cloud-console/package.json:6; module-cloud-console/Dockerfile:2; docker-compose.yml:80-83; module-cloud-console/Dockerfile:15-20

**Observation:** Directory module-cloud-console has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 92. module-cloud-labs/; module-cloud-labs/webpack.config.js:6; module-cloud-labs/src/bootstrap.js:6; module-cloud-labs/package.json:6; module-cloud-labs/Dockerfile:2; docker-compose.yml:41-44; module-cloud-labs/Dockerfile:15-20

**Observation:** Directory module-cloud-labs has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 93. module-code-environment/; module-code-environment/webpack.config.js:7; module-code-environment/src/bootstrap.js:6; module-code-environment/package.json:6; module-code-environment/Dockerfile:2; docker-compose.yml:106-109; module-code-environment/Dockerfile:15-20

**Observation:** Directory module-code-environment has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 94. module-code-module/; module-code-module/webpack.config.js:7; module-code-module/src/bootstrap.js:8; module-code-module/package.json:6; module-code-module/Dockerfile:2; docker-compose.yml:119-122; module-code-module/Dockerfile:15-20

**Observation:** Directory module-code-module has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 95. module-content-uploading/; module-content-uploading/webpack.config.js:6; module-content-uploading/src/bootstrap.js:4; module-content-uploading/package.json:6; module-content-uploading/Dockerfile:2; docker-compose.yml:132-135; module-content-uploading/Dockerfile:15-20

**Observation:** Directory module-content-uploading has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 96. module-dashboard/; module-dashboard/webpack.config.js:6; module-dashboard/src/bootstrap.js:6; module-dashboard/package.json:6; module-dashboard/Dockerfile:2; docker-compose.yml:54-57; module-dashboard/Dockerfile:15-20

**Observation:** Directory module-dashboard has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 97. module-logging/; module-logging/webpack.config.js:7; module-logging/src/bootstrap.js:6; module-logging/package.json:6; module-logging/Dockerfile:2; docker-compose.yml:93-96; module-logging/Dockerfile:15-20

**Observation:** Directory module-logging has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 98. module-virtual-machine/; module-virtual-machine/webpack.config.js:6; module-virtual-machine/src/bootstrap.js:6; module-virtual-machine/package.json:6; module-virtual-machine/Dockerfile:2; docker-compose.yml:67-70; module-virtual-machine/Dockerfile:15-20

**Observation:** Directory module-virtual-machine has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 99. shared-design-system/; shared-design-system/webpack.config.js:6; shared-design-system/src/bootstrap.js:7; shared-design-system/package.json:6; shared-design-system/Dockerfile:2; docker-compose.yml:29-32; shared-design-system/Dockerfile:12-18

**Observation:** Directory shared-design-system has own package.json and webpack configuration. Entry renders design system demonstration page. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build. Section 3.4.3 counts demo UI boundary; classification retains 10 application units excluding design system.

### 100. shell-app/; shell-app/webpack.config.js:6; shell-app/src/bootstrap.js:6; shell-app/package.json:6; shell-app/webpack.prod.config.js:18; shell-app/Dockerfile:26; shell-app/Dockerfile:2; docker-compose.yml:159-162; shell-app/Dockerfile:26-31

**Observation:** Directory shell-app has own package.json and webpack configuration. Entry renders unit React App. Manifest declares webpack build; Dockerfile builds directory, copying dist to nginx image linked to own compose service.

**Interpretation:** Confirms frontend unit boundary with own entry/build.

### 101. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:71; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:33; shell-app/public/index.html:46; nginx/nginx.conf:133-134; module-assessment/webpack.config.js:36-37; module-assessment/webpack.config.js:53; module-assessment/webpack.config.js:80

**Observation:** Shell requests module-assessment exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-assessment through runtime Module Federation.

### 102. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:36; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:28; shell-app/public/index.html:41; nginx/nginx.conf:73-74; module-cloud-console/webpack.config.js:35-36; module-cloud-console/webpack.config.js:52; module-cloud-console/webpack.config.js:83

**Observation:** Shell requests module-cloud-console exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-cloud-console through runtime Module Federation.

### 103. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:15; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:25; shell-app/public/index.html:38; nginx/nginx.conf:37-38; module-cloud-labs/webpack.config.js:30-31; module-cloud-labs/webpack.config.js:47; module-cloud-labs/webpack.config.js:74

**Observation:** Shell requests module-cloud-labs exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-cloud-labs through runtime Module Federation.

### 104. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:50; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:30; shell-app/public/index.html:43; nginx/nginx.conf:97-98; module-code-environment/webpack.config.js:31-32; module-code-environment/webpack.config.js:48; module-code-environment/webpack.config.js:79

**Observation:** Shell requests module-code-environment exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-code-environment through runtime Module Federation.

### 105. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:57; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:31; shell-app/public/index.html:44; nginx/nginx.conf:109-110; module-code-module/webpack.config.js:38-39; module-code-module/webpack.config.js:55; module-code-module/webpack.config.js:85

**Observation:** Shell requests module-code-module exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-code-module through runtime Module Federation.

### 106. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:64; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:32; shell-app/public/index.html:45; nginx/nginx.conf:121-122; module-content-uploading/webpack.config.js:30-31; module-content-uploading/webpack.config.js:47; module-content-uploading/webpack.config.js:74

**Observation:** Shell requests module-content-uploading exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-content-uploading through runtime Module Federation.

### 107. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:22; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:26; shell-app/public/index.html:39; nginx/nginx.conf:49-50; module-dashboard/webpack.config.js:30-31; module-dashboard/webpack.config.js:47; module-dashboard/webpack.config.js:75

**Observation:** Shell requests module-dashboard exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-dashboard through runtime Module Federation.

### 108. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:43; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:29; shell-app/public/index.html:42; nginx/nginx.conf:85-86; module-logging/webpack.config.js:31-32; module-logging/webpack.config.js:48; module-logging/webpack.config.js:78

**Observation:** Shell requests module-logging exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-logging through runtime Module Federation.

### 109. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:29; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:27; shell-app/public/index.html:40; nginx/nginx.conf:61-62; module-virtual-machine/webpack.config.js:30-31; module-virtual-machine/webpack.config.js:47; module-virtual-machine/webpack.config.js:77

**Observation:** Shell requests module-virtual-machine exposed App through React.lazy/loadRemoteComponent, mounting in route. Loader injects remoteEntry.js, initializes shared scope and obtains container module; HTML map resolves URL and gateway forwards to target container.

**Interpretation:** Actively links host shell-app to module-virtual-machine through runtime Module Federation.

### 110. module-assessment/webpack.config.js:44; module-assessment/src/App.jsx:24; module-assessment/src/pages/Assessment.jsx:350; module-assessment/src/pages/Assessment.jsx:400; module-assessment/src/pages/AssessmentsList.jsx:706; module-assessment/webpack.config.js:39-50; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-assessment declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-assessment to federated design system; target also has own entry/publication.

### 111. module-cloud-console/webpack.config.js:43; module-cloud-console/src/App.jsx:11; module-cloud-console/src/CloudConsole.jsx:261; module-cloud-console/src/CloudConsole.jsx:281; module-cloud-console/webpack.config.js:38-49; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-cloud-console declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-cloud-console to federated design system; target also has own entry/publication.

### 112. module-cloud-labs/webpack.config.js:38; module-cloud-labs/src/App.jsx:11; module-cloud-labs/src/CloudLabs.jsx:28; module-cloud-labs/src/CloudLabs.jsx:37; module-cloud-labs/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-cloud-labs declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-cloud-labs to federated design system; target also has own entry/publication.

### 113. module-code-environment/webpack.config.js:39; module-code-environment/src/App.jsx:11; module-code-environment/src/CodeEnvironment.jsx:39; module-code-environment/src/CodeEnvironment.jsx:492; module-code-environment/webpack.config.js:34-45; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-code-environment declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-code-environment to federated design system; target also has own entry/publication.

### 114. module-code-module/webpack.config.js:46; module-code-module/src/App.jsx:11; module-code-module/src/CodeModule.jsx:887; module-code-module/webpack.config.js:41-52; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-code-module declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-code-module to federated design system; target also has own entry/publication.

### 115. module-content-uploading/webpack.config.js:38; module-content-uploading/src/App.jsx:12; module-content-uploading/src/Content.jsx:639; module-content-uploading/src/CohortContent.jsx:311; module-content-uploading/src/CohortContent.jsx:327; module-content-uploading/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-content-uploading declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-content-uploading to federated design system; target also has own entry/publication.

### 116. module-dashboard/webpack.config.js:38; module-dashboard/src/App.jsx:11; module-dashboard/src/Dashboard.jsx:203; module-dashboard/src/Dashboard.jsx:272; module-dashboard/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-dashboard declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-dashboard to federated design system; target also has own entry/publication.

### 117. module-logging/webpack.config.js:39; module-logging/src/App.jsx:11; module-logging/src/Logs.jsx:458; module-logging/src/Logs.jsx:492; module-logging/webpack.config.js:34-45; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-logging declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader and Card. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-logging to federated design system; target also has own entry/publication.

### 118. module-virtual-machine/webpack.config.js:38; module-virtual-machine/src/App.jsx:11; module-virtual-machine/src/VirtualMachine.jsx:802; module-virtual-machine/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observation:** module-virtual-machine declares promise remote sharedDesignSystem, renders ThemeProvider, PageHeader. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links module-virtual-machine to federated design system; target also has own entry/publication.

### 119. shell-app/webpack.config.js:40; shell-app/webpack.prod.config.js:50; shell-app/src/App.jsx:291; shell-app/webpack.config.js:34-46; shell-app/webpack.prod.config.js:44-56; shell-app/public/index.html:24; shell-app/public/index.html:37; nginx/nginx.conf:25-26; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67; shell-app/src/App.jsx:3

**Observation:** shell-app declares promise remote sharedDesignSystem, renders ThemeProvider, importing global CSS. Target webpack exposes modules; promise reuses global container or injects remoteEntry.js through design_system URL with local fallback.

**Interpretation:** Actively links shell-app to federated design system; target also has own entry/publication.

### 120. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-cloud-console/src/AuthContext.jsx:30-34; module-cloud-console/src/AuthContext.jsx:111-126; module-cloud-console/src/App.jsx:11

**Observation:** shell-app and module-cloud-console access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 121. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-cloud-labs/src/AuthContext.jsx:30-34; module-cloud-labs/src/AuthContext.jsx:111-126; module-cloud-labs/src/App.jsx:11

**Observation:** shell-app and module-cloud-labs access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 122. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-code-environment/src/AuthContext.jsx:30-34; module-code-environment/src/AuthContext.jsx:111-126; module-code-environment/src/App.jsx:11

**Observation:** shell-app and module-code-environment access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 123. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-code-module/src/AuthContext.jsx:30-34; module-code-module/src/AuthContext.jsx:111-126; module-code-module/src/App.jsx:11

**Observation:** shell-app and module-code-module access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 124. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-content-uploading/src/AuthContext.jsx:30-34; module-content-uploading/src/AuthContext.jsx:111-126; module-content-uploading/src/App.jsx:12

**Observation:** shell-app and module-content-uploading access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 125. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-dashboard/src/AuthContext.jsx:30-34; module-dashboard/src/AuthContext.jsx:111-126; module-dashboard/src/App.jsx:11

**Observation:** shell-app and module-dashboard access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 126. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-logging/src/AuthContext.jsx:30-34; module-logging/src/AuthContext.jsx:111-126; module-logging/src/App.jsx:11

**Observation:** shell-app and module-logging access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 127. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-virtual-machine/src/AuthContext.jsx:30-34; module-virtual-machine/src/AuthContext.jsx:111-126; module-virtual-machine/src/App.jsx:11

**Observation:** shell-app and module-virtual-machine access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `source → target` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 128. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-assessment/src/AuthContext.jsx:30-34; module-assessment/src/AuthContext.jsx:111-126; module-assessment/src/App.jsx:24; module-assessment/src/pages/AssessmentReports.jsx:418

**Observation:** module-assessment and shell-app access window.__SHELL_AUTH__ bridge and shared theme. Shell publishes getters/onAuthChange; theme context reads/writes theme key, changing documentElement dark class.

**Interpretation:** Communication relationship active with direction `bidirectional` and events mechanism recorded in 3.4.5. Authentication/theme combined for same unit pair; theme depends on no demonstrated synthetic events.

### 129. module-assessment/package.json:6; module-assessment/Dockerfile:15; module-assessment/Dockerfile:18-20; docker-compose.yml:145-156; nginx/nginx.conf:133-140; module-assessment/Dockerfile:6-7; module-assessment/package.json:22; module-assessment/tailwind.config.js:1

**Observation:** module-assessment Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /assessment-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 130. module-cloud-console/package.json:6; module-cloud-console/Dockerfile:15; module-cloud-console/Dockerfile:18-20; docker-compose.yml:80-91; nginx/nginx.conf:73-80; module-cloud-console/Dockerfile:6-7; module-cloud-console/package.json:16; module-cloud-console/tailwind.config.js:1

**Observation:** module-cloud-console Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /cloud-console-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 131. module-cloud-labs/package.json:6; module-cloud-labs/Dockerfile:15; module-cloud-labs/Dockerfile:18-20; docker-compose.yml:41-52; nginx/nginx.conf:37-44; module-cloud-labs/Dockerfile:6-7; module-cloud-labs/package.json:15; module-cloud-labs/tailwind.config.js:1

**Observation:** module-cloud-labs Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /cloud-labs-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 132. module-code-environment/package.json:6; module-code-environment/Dockerfile:15; module-code-environment/Dockerfile:18-20; docker-compose.yml:106-117; nginx/nginx.conf:97-104; module-code-environment/Dockerfile:6-7; module-code-environment/package.json:15; module-code-environment/tailwind.config.js:1

**Observation:** module-code-environment Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /code-environment-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 133. module-code-module/package.json:6; module-code-module/Dockerfile:15; module-code-module/Dockerfile:18-20; docker-compose.yml:119-130; nginx/nginx.conf:109-116; module-code-module/Dockerfile:6-7; module-code-module/package.json:19; module-code-module/tailwind.config.js:1

**Observation:** module-code-module Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /code-module-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 134. module-content-uploading/package.json:6; module-content-uploading/Dockerfile:15; module-content-uploading/Dockerfile:18-20; docker-compose.yml:132-143; nginx/nginx.conf:121-128; module-content-uploading/Dockerfile:6-7; module-content-uploading/package.json:16; module-content-uploading/tailwind.config.js:1

**Observation:** module-content-uploading Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /content-uploading-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 135. module-dashboard/package.json:6; module-dashboard/Dockerfile:15; module-dashboard/Dockerfile:18-20; docker-compose.yml:54-65; nginx/nginx.conf:49-56; module-dashboard/Dockerfile:6-7; module-dashboard/package.json:15; module-dashboard/tailwind.config.js:1

**Observation:** module-dashboard Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /dashboard-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 136. module-logging/package.json:6; module-logging/Dockerfile:15; module-logging/Dockerfile:18-20; docker-compose.yml:93-104; nginx/nginx.conf:85-92; module-logging/Dockerfile:6-7; module-logging/package.json:16; module-logging/tailwind.config.js:1

**Observation:** module-logging Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /logging-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 137. module-virtual-machine/package.json:6; module-virtual-machine/Dockerfile:15; module-virtual-machine/Dockerfile:18-20; docker-compose.yml:67-78; nginx/nginx.conf:61-68; module-virtual-machine/Dockerfile:6-7; module-virtual-machine/package.json:17; module-virtual-machine/tailwind.config.js:1

**Observation:** module-virtual-machine Dockerfile executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /virtual-machine-remote/ to application container. Build copies shared-design-system as file: dependency and token source.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). Artifact separation coexists with build source dependency.

### 138. shared-design-system/package.json:6; shared-design-system/Dockerfile:12; shared-design-system/Dockerfile:15-21; docker-compose.yml:29-38; nginx/nginx.conf:25-32

**Observation:** Dockerfile of shared-design-system executes package.json build script, copying dist to own nginx image. Compose declares own service; gateway forwards prefix /design-system-remote/ to application container.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6).

### 139. shell-app/package.json:6; shell-app/Dockerfile:26; shell-app/Dockerfile:29-31; docker-compose.yml:159-179; nginx/nginx.conf:18-22; shell-app/Dockerfile:6-22; shell-app/tailwind.config.js:4-17; shell-app/public/index.html:18-51

**Observation:** Dockerfile of shell-app executes webpack with webpack.prod.config.js, copying dist to own nginx image. Compose declares own service; gateway forwards prefix / to application container. Dockerfile also copies nine modules for Tailwind; HTML contains remote addresses.

**Interpretation:** Separate build/deployment confirm unit publishable boundary without demonstrating independent versioning (No in 3.4.6). CSS depends on module classes; address changes require shell rebuild.

### 140. README.md:4

**Observation:** Document states: "A production-ready micro-frontend setup with 3 independent modules".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Count of three modules differs from nine modules plus design system.

### 141. README.md:4; docker-compose.yml:29-179

**Observation:** Document states: "each running in its own Docker container".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 142. README.md:4

**Observation:** Document states: "orchestrated by a Shell host app".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 143. README.md:12; shell-app/src/App.jsx:15-71

**Observation:** Document states: "shell-app/ ← Host (port 3000) — loads all modules at runtime".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 144. README.md:16; docker-compose.yml:3-184

**Observation:** Document states: "docker-compose.yml ← Master orchestrator".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 145. README.md:29; module-cloud-labs/webpack.config.js:30-31

**Observation:** Document states: "Each module **exposes** a React component via `remoteEntry.js`.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 146. README.md:46; docker-compose.yml:168-178

**Observation:** Document states: "Shell waits for all 3 modules to pass healthchecks before starting.".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Depends_on only orders startup; no healthchecks.

### 147. README.md:103; shell-app/src/App.jsx:15-71; shell-app/webpack.config.js:32-47

**Observation:** Document states: "Shell imports modules like normal React".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Shell uses runtime loader rather than example static import.

### 148. README.md:113-114; module-cloud-labs/webpack.config.js:49-53; shell-app/webpack.config.js:51-53; shared-design-system/webpack.config.js:50-54

**Observation:** Document states: "With `singleton: true`, all modules share ONE React instance negotiated at runtime.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 149. README.md:120; module-cloud-labs/Dockerfile:1-22

**Observation:** Document states: "Each module's Dockerfile (multi-stage)".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 150. README.md:164, 167; docker-compose.yml:54-58; nginx/nginx.conf:49-50

**Observation:** Document states: "Scale a single module" […] "Scale dashboard to 3 instances (behind a load balancer)".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Fixed container names prevent illustrated scaling.

### 151. README.md:171

**Observation:** Document states: "Deploy only one module".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 152. README.md:171

**Observation:** Document states: "(zero-downtime)".

**Interpretation:** Section 3.4.7 found no artifact supporting claim; remains stated description or possibility.

### 153. README.md:194

**Observation:** Document states: "Be developed by a separate team".

**Interpretation:** Section 3.4.7 found no artifact supporting claim; remains stated description or possibility.

### 154. README.md:195; module-cloud-labs/src/App.jsx:18-33; module-cloud-labs/webpack.config.js:69-75

**Observation:** Document states: "Run standalone (open `:3001` directly in browser)".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 155. README.md:196

**Observation:** Document states: "Have its own CI/CD pipeline".

**Interpretation:** Section 3.4.7 found no artifact supporting claim; remains stated description or possibility.

### 156. README.md:198; module-cloud-labs/webpack.config.js:49-67; shell-app/webpack.config.js:51-58; module-cloud-labs/package.json:11-14

**Observation:** Document states: "Use a different version of shared libraries (with care)".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Configuration uses singletons.

### 157. README.md:214-230; module-cloud-labs/src/index.js:4; module-cloud-labs/webpack.config.js:47

**Observation:** Document states: "Project Structure (each module)" (annotated module tree: `index.js` "Entry (just: import("./bootstrap"))", `App.jsx` "Component exposed to Shell", `webpack.config.js` "Module Federation config (exposes CloudLabsApp)").

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 158. docs/ARCHITECTURE.md:3; shell-app/webpack.config.js:2

**Observation:** Document states: "This repository implements a production-grade micro-frontend platform using Webpack 5 Module Federation, Docker, and nginx.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 159. docs/ARCHITECTURE.md:7; shell-app/public/index.html:22-48; shell-app/webpack.config.js:38-39

**Observation:** Document states: "Runtime Module Federation loader that injects `remoteEntry.js` at runtime (no hardcoded build-time remote URLs).".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. URLs fixed in HTML included in build.

### 160. docs/ARCHITECTURE.md:8; shell-app/src/config/remoteConfig.js:8-31; shell-app/public/index.html:51

**Observation:** Document states: "Centralized runtime remote config (`window.__RUNTIME_REMOTE_CONFIG__`) with sane localhost defaults; can be overridden at runtime (nginx or injected script).".

**Interpretation:** Claim partially corroborated: external override read/preserved without injection implemented at container startup.

### 161. docs/ARCHITECTURE.md:9; shell-app/src/App.jsx:148; shell-app/src/remotes/remoteLoader.js:4; shell-app/src/App.jsx:105-106

**Observation:** Document states: "Shell now lazy-loads remotes using a robust loader with timeouts and retry support.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 162. docs/ARCHITECTURE.md:10; shell-app/webpack.config.js:48-58; module-cloud-labs/webpack.config.js:49-63

**Observation:** Document states: "`react`, `react-dom`, and `react-router-dom` are enforced as singletons with strict version matching.".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Configuration does not enable strictVersion.

### 163. docs/ARCHITECTURE.md:11; shell-app/Dockerfile:26

**Observation:** Document states: "Shell Docker build uses explicit `webpack.prod.config.js`.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 164. docs/ARCHITECTURE.md:32-36; shell-app/src/App.jsx:148; shell-app/src/App.jsx:79-153

**Observation:** Document states: "the shell uses a `RemoteWrapper` which: Uses `React.lazy()` with a runtime loader […] Calls the remote container `init()` […] Calls `container.get()` […] an error boundary with a Retry button on failure.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 165. docs/ARCHITECTURE.md:46-51; docker-compose.yml:29-179

**Observation:** Document states: "Shell (host) […] Auth (remote) […] Dashboard (remote) […] Profile (remote)" (Docker Compose services).

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Auth/Profile not current services.

### 166. module-assessment/Dockerfile:6; module-assessment/package.json:22; module-assessment/Dockerfile:7

**Observation:** Comment states: "Copy the shared design system folder first (required by the file:../shared-design-system dependency)".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 167. module-assessment/src/AuthContext.jsx:29, 110; module-assessment/src/AuthContext.jsx:111-126

**Observation:** Comment states: "Check if shell bridge is available (module running within shell)" […] "If shell bridge is available, subscribe to its changes instead of checking auth ourselves".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 168. shared-design-system/src/contexts/ThemeContext.jsx:13; shared-design-system/src/contexts/ThemeContext.jsx:14-22; module-assessment/src/pages/AssessmentReports.jsx:418

**Observation:** Comment states: "Shell owns the DOM class — single source of truth".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Each module provider also changes dark class.

### 169. shared-design-system/src/contexts/ThemeContext.jsx:24; shared-design-system/src/contexts/ThemeContext.jsx:25-33

**Observation:** Comment states: "React to synthetic StorageEvents dispatched from any module".

**Interpretation:** Claim contradicted by snapshot artifacts indicated in 3.4.7. Storage listener exists without synthetic emitter in snapshot.

### 170. shell-app/public/index.html:16-17; shell-app/public/index.html:18-48; nginx/nginx.conf:25-134

**Observation:** Comment states: "In Docker (port 80/443), use relative paths handled by gateway Nginx. In dev (port 3000), use localhost port-based URLs.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 171. shell-app/src/contexts/AuthContext.jsx:136, 218, 227; shell-app/src/contexts/AuthContext.jsx:229

**Observation:** Comment states: "Notify remotes of auth state" […] "Notify remotes of sign out" […] "Setup window bridge for remotes to access auth".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 172. shell-app/webpack.config.js:32-33; shell-app/webpack.config.js:34-47; shell-app/src/App.jsx:3

**Observation:** Comment states: "We rely on runtime remote loading (shell reads window.__RUNTIME_REMOTE_CONFIG__) but sharedDesignSystem is imported statically at build-time.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 173. shell-app/webpack.config.js:48-50; shell-app/webpack.config.js:51-58; module-cloud-labs/webpack.config.js:49-67

**Observation:** Comment states: "Relax strict version checks at build time so remotes with minor patch versions can still initialize during development.".

**Interpretation:** Claim corroborated by artifacts indicated in 3.4.7.

### 174. 18051fd 2026-06-05 (shared-design-system/src/contexts/ThemeContext.jsx)

**Observation:** Provider appears in 18051fd with synthetic-event comment and only storage listener; object unchanged afterward. Old consumers not fully recovered.

**Interpretation:** Emitter past remains inconclusive; does not change absent snapshot emitter or theme communication through key/DOM.

### 175. 68ea11f 2026-05-25 (docs/ARCHITECTURE.md); ded9db1 2026-06-03 (README.md); 18051fd 2026-06-05 (module-assessment/)

**Observation:** First commit contains three modules and architecture document with Auth/Profile. ded9db1 removes paths, adds Cloud Labs/Virtual Machine and changes README; 18051fd adds six modules/design system without later document updates.

**Interpretation:** Clarifies documentary counts/names as earlier-stage records without demonstrating monolith extraction.

### 176. 68ea11f 2026-05-25 (docker-compose.yml); ded9db1 2026-06-03 (README.md; docker-compose.yml); 18051fd 2026-06-05 (docker-compose.yml)

**Observation:** README in ded9db1 already claims healthcheck wait. Compose changes in ded9db1 and 18051fd; first two blobs unavailable, snapshot declares no healthchecks.

**Interpretation:** Earlier behavior inconclusive; current claim/compose divergence established.

### 177. 68ea11f 2026-05-25 (shell-app/src/remotes/remoteLoader.js; shell-app/src/App.jsx; shell-app/webpack.config.js); ded9db1 2026-06-03 (README.md; shell-app/webpack.config.js)

**Observation:** Loader read from first commit has same snapshot contents. README in ded9db1 already exemplifies auth/AuthApp import; required old App/webpack blobs unavailable.

**Interpretation:** No historical mechanism replacement demonstrated. Snapshot uses loader; past uncertainty does not change reading.

### 178. ded9db1 2026-06-03 (README.md); 18051fd 2026-06-05 (docker-compose.yml)

**Observation:** Three-instance instruction already in ded9db1 README. Compose in 18051fd is snapshot version with fixed names; two earlier states unreadable.

**Interpretation:** Earlier replica support inconclusive; current instruction still contradicted by compose.

### 179. ded9db1 2026-06-03 (README.md; shell-app/webpack.config.js); 18051fd 2026-06-05 (shell-app/webpack.config.js)

**Observation:** README in ded9db1 already permits different versions. Webpack changes in ded9db1 and 18051fd, latter snapshot version; earlier blobs unavailable.

**Interpretation:** Singleton past inconclusive without changing current configuration contradicting claim.

### 180. 68ea11f 2026-05-25 (docs/ARCHITECTURE.md; shell-app/src/remotes/remoteLoader.js); ded9db1 2026-06-03 (shell-app/public/index.html); 18051fd 2026-06-05 (shell-app/public/index.html)

**Observation:** Architecture document/loader retain objects since first commit. HTML changes later but initial contents unreadable; current HTML contains fixed URLs.

**Interpretation:** Cannot decide when documentary divergence arose; fixed URL origin clear in snapshot.

### 181. docs/ARCHITECTURE.md:55; shell-app/public/index.html:51; shell-app/Dockerfile:29-33; shell-app/nginx.conf:1-34

**Observation:** Architecture lists container-startup injection as next step. HTML preserves external override; Dockerfile/nginx only copy/serve files.

**Interpretation:** Resolved by snapshot: external override support exists; container-startup injection remains future, preserving partial claim corroboration.

### 182. 68ea11f 2026-05-25 (docs/ARCHITECTURE.md; shell-app/webpack.config.js); ded9db1 2026-06-03 (shell-app/webpack.config.js); 18051fd 2026-06-05 (shell-app/webpack.config.js)

**Observation:** Strict-version claim already in unchanged first architecture document. Webpack changes twice; current state relaxes versions, two earlier blobs absent.

**Interpretation:** Past strict checks inconclusive without changing absent strictVersion in current configuration.

### 183. 18051fd 2026-06-05 (shared-design-system/src/contexts/ThemeContext.jsx; module-assessment/src/App.jsx; module-assessment/src/ThemeContext.jsx)

**Observation:** Provider/assessment App added together in 18051fd, retaining same objects: provider already writes class/storage, module already mounts federated provider.

**Interpretation:** Clarifies exclusive shell-control comment conflicts with module usage since first artifact presence without demonstrating intent or external origin.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (module-assessment) (Markers); 3.4.3 (module-assessment) (Build); 3.4.4 (module-assessment/webpack.config.js:44) (File:line); 3.4.4 (module-assessment/webpack.config.js:44) (Observation); 3.4.4 (shell-app/src/App.jsx:71) (Observation); 3.4.4 (module-assessment/src/App.jsx:24) (Observation); 3.4.5 #1 (Configuration); 3.4.5 #10 (Configuration); 3.4.5 #10 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #101; configures #110 |
| 2 | 3.4.3 (module-cloud-console) (Markers); 3.4.3 (module-cloud-console) (Build); 3.4.4 (module-cloud-console/webpack.config.js:43) (File:line); 3.4.4 (module-cloud-console/webpack.config.js:43) (Observation); 3.4.4 (shell-app/src/App.jsx:36) (Observation); 3.4.4 (module-cloud-console/src/App.jsx:11) (Observation); 3.4.5 #2 (Configuration); 3.4.5 #11 (Configuration); 3.4.5 #11 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #102; configures #111 |
| 3 | 3.4.3 (module-cloud-labs) (Markers); 3.4.3 (module-cloud-labs) (Build); 3.4.4 (module-cloud-labs/webpack.config.js:38) (File:line); 3.4.4 (module-cloud-labs/webpack.config.js:38) (Observation); 3.4.4 (shell-app/src/App.jsx:15) (Observation); 3.4.4 (module-cloud-labs/src/App.jsx:11) (Observation); 3.4.5 #3 (Configuration); 3.4.5 #12 (Configuration); 3.4.5 #12 (Code); 3.4.7 #6 (Evidence); 3.4.7 #9 (Evidence); 3.4.7 #17 (Evidence); 3.4.7 #18 (Evidence); 3.4.7 #23 (Evidence); 3.4.7 #34 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #103; configures #112 |
| 4 | 3.4.3 (module-code-environment) (Markers); 3.4.3 (module-code-environment) (Build); 3.4.4 (module-code-environment/webpack.config.js:39) (File:line); 3.4.4 (module-code-environment/webpack.config.js:39) (Observation); 3.4.4 (shell-app/src/App.jsx:50) (Observation); 3.4.4 (module-code-environment/src/App.jsx:11) (Observation); 3.4.5 #4 (Configuration); 3.4.5 #13 (Configuration); 3.4.5 #13 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #104; configures #113 |
| 5 | 3.4.3 (module-code-module) (Markers); 3.4.3 (module-code-module) (Build); 3.4.4 (module-code-module/webpack.config.js:46) (File:line); 3.4.4 (module-code-module/webpack.config.js:46) (Observation); 3.4.4 (shell-app/src/App.jsx:57) (Observation); 3.4.4 (module-code-module/src/App.jsx:11) (Observation); 3.4.5 #5 (Configuration); 3.4.5 #14 (Configuration); 3.4.5 #14 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #105; configures #114 |
| 6 | 3.4.3 (module-content-uploading) (Markers); 3.4.3 (module-content-uploading) (Build); 3.4.4 (module-content-uploading/webpack.config.js:38) (File:line); 3.4.4 (module-content-uploading/webpack.config.js:38) (Observation); 3.4.4 (shell-app/src/App.jsx:64) (Observation); 3.4.4 (module-content-uploading/src/App.jsx:12) (Observation); 3.4.5 #6 (Configuration); 3.4.5 #15 (Configuration); 3.4.5 #15 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #106; configures #115 |
| 7 | 3.4.3 (module-dashboard) (Markers); 3.4.3 (module-dashboard) (Build); 3.4.4 (module-dashboard/webpack.config.js:38) (File:line); 3.4.4 (module-dashboard/webpack.config.js:38) (Observation); 3.4.4 (shell-app/src/App.jsx:22) (Observation); 3.4.4 (module-dashboard/src/App.jsx:11) (Observation); 3.4.5 #7 (Configuration); 3.4.5 #16 (Configuration); 3.4.5 #16 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #107; configures #116 |
| 8 | 3.4.3 (module-logging) (Markers); 3.4.3 (module-logging) (Build); 3.4.4 (module-logging/webpack.config.js:39) (File:line); 3.4.4 (module-logging/webpack.config.js:39) (Observation); 3.4.4 (shell-app/src/App.jsx:43) (Observation); 3.4.4 (module-logging/src/App.jsx:11) (Observation); 3.4.5 #8 (Configuration); 3.4.5 #17 (Configuration); 3.4.5 #17 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #108; configures #117 |
| 9 | 3.4.3 (module-virtual-machine) (Markers); 3.4.3 (module-virtual-machine) (Build); 3.4.4 (module-virtual-machine/webpack.config.js:38) (File:line); 3.4.4 (module-virtual-machine/webpack.config.js:38) (Observation); 3.4.4 (shell-app/src/App.jsx:29) (Observation); 3.4.4 (module-virtual-machine/src/App.jsx:11) (Observation); 3.4.5 #9 (Configuration); 3.4.5 #18 (Configuration); 3.4.5 #18 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #109; configures #118 |
| 10 | 3.4.3 (shared-design-system) (Markers); 3.4.3 (shared-design-system) (Build); 3.4.4 (shell-app/src/App.jsx:291) (Observation); 3.4.4 (shared-design-system/src/contexts/ThemeContext.jsx:21) (Observation); 3.4.4 (module-assessment/src/pages/Assessment.jsx:350) (Observation); 3.4.4 (module-assessment/src/pages/Assessment.jsx:400) (Observation); 3.4.5 #10 (Configuration); 3.4.5 #11 (Configuration); 3.4.5 #12 (Configuration); 3.4.5 #13 (Configuration); 3.4.5 #14 (Configuration); 3.4.5 #15 (Configuration); 3.4.5 #16 (Configuration); 3.4.5 #17 (Configuration); 3.4.5 #18 (Configuration); 3.4.5 #19 (Configuration); 3.4.7 #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #110; configures #111; configures #112; configures #113; configures #114; configures #115; configures #116; configures #117; configures #118; configures #119 |
| 11 | 3.4.3 (shell-app) (Markers); 3.4.3 (shell-app) (Build); 3.4.4 (shell-app/webpack.config.js:40) (File:line); 3.4.4 (shell-app/webpack.config.js:40) (Observation); 3.4.5 #19 (Configuration); 3.4.5 #19 (Code); 3.4.7 #8 (Evidence); 3.4.7 #9 (Evidence); 3.4.7 #17 (Evidence); 3.4.7 #19 (Evidence); 3.4.7 #20 (Evidence); 3.4.7 #23 (Evidence); 3.4.7 #33 (Document); 3.4.7 #33 (Evidence); 3.4.7 #34 (Document); 3.4.7 #34 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #119 |
| 12 | 3.4.3 (shell-app) (Markers); 3.4.4 (shell-app/webpack.prod.config.js:50) (File:line); 3.4.4 (shell-app/webpack.prod.config.js:50) (Observation); 3.4.5 #19 (Configuration); 3.4.5 #19 (Code) | 2 configuration | configuration | module-federation | architectural | strong | configures #119 |
| 13 | 3.4.4 (module-cloud-console/src/bootstrap.js:4) | 3 code | source code | — | context | weak | — |
| 14 | 3.4.4 (module-cloud-labs/src/bootstrap.js:4) | 3 code | source code | — | context | weak | — |
| 15 | 3.4.4 (module-code-environment/src/bootstrap.js:4) | 3 code | source code | — | context | weak | — |
| 16 | 3.4.4 (module-content-uploading/src/bootstrap.js:2) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (module-dashboard/src/bootstrap.js:4) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (module-logging/src/bootstrap.js:4) | 3 code | source code | — | context | weak | — |
| 19 | 3.4.4 (module-virtual-machine/src/bootstrap.js:4) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (module-assessment/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 21 | 3.4.4 (module-cloud-console/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 22 | 3.4.4 (module-cloud-labs/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 23 | 3.4.4 (module-code-environment/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 24 | 3.4.4 (module-code-module/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 25 | 3.4.4 (module-content-uploading/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 26 | 3.4.4 (module-dashboard/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 27 | 3.4.4 (module-logging/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 28 | 3.4.4 (module-virtual-machine/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 29 | 3.4.4 (shared-design-system/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 30 | 3.4.4 (shell-app/src/index.js:2) | 3 code | source code | — | technological | weak | — |
| 31 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:40) | 3 code | source code | module-federation | technological | moderate | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 32 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:45) | 3 code | source code | module-federation | technological | moderate | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 33 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:51) | 3 code | source code | module-federation | technological | moderate | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 34 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:82) | 3 code | source code | module-federation | technological | moderate | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 35 | 3.4.4 (module-assessment/webpack.config.js:44) | 3 code | configuration | module-federation | architectural | strong | implements #110 |
| 36 | 3.4.4 (module-cloud-console/webpack.config.js:43) | 3 code | configuration | module-federation | architectural | strong | implements #111 |
| 37 | 3.4.4 (module-cloud-labs/webpack.config.js:38) | 3 code | configuration | module-federation | architectural | strong | implements #112 |
| 38 | 3.4.4 (module-code-environment/webpack.config.js:39) | 3 code | configuration | module-federation | architectural | strong | implements #113 |
| 39 | 3.4.4 (module-code-module/webpack.config.js:46) | 3 code | configuration | module-federation | architectural | strong | implements #114 |
| 40 | 3.4.4 (module-content-uploading/webpack.config.js:38) | 3 code | configuration | module-federation | architectural | strong | implements #115 |
| 41 | 3.4.4 (module-dashboard/webpack.config.js:38) | 3 code | configuration | module-federation | architectural | strong | implements #116 |
| 42 | 3.4.4 (module-logging/webpack.config.js:39) | 3 code | configuration | module-federation | architectural | strong | implements #117 |
| 43 | 3.4.4 (module-virtual-machine/webpack.config.js:38) | 3 code | configuration | module-federation | architectural | strong | implements #118 |
| 44 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:9) | 3 code | source code | module-federation | technological | moderate | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 45 | 3.4.4 (shell-app/webpack.config.js:40) | 3 code | configuration | module-federation | architectural | strong | implements #119 |
| 46 | 3.4.4 (shell-app/webpack.prod.config.js:50) | 3 code | configuration | module-federation | architectural | strong | implements #119 |
| 47 | 3.4.4 (module-assessment/src/pages/KodeEnvSection.jsx:369) | 3 code | source code | iframe | context | weak | — |
| 48 | 3.4.4 (module-code-module/src/CodeModule.jsx:847) | 3 code | source code | iframe | context | weak | — |
| 49 | 3.4.4 (shell-app/src/App.jsx:15) | 3 code | source code | module-federation | architectural | strong | implements #103 |
| 50 | 3.4.4 (shell-app/src/App.jsx:22) | 3 code | source code | module-federation | architectural | strong | implements #107 |
| 51 | 3.4.4 (shell-app/src/App.jsx:29) | 3 code | source code | module-federation | architectural | strong | implements #109 |
| 52 | 3.4.4 (shell-app/src/App.jsx:36) | 3 code | source code | module-federation | architectural | strong | implements #102 |
| 53 | 3.4.4 (shell-app/src/App.jsx:43) | 3 code | source code | module-federation | architectural | strong | implements #108 |
| 54 | 3.4.4 (shell-app/src/App.jsx:50) | 3 code | source code | module-federation | architectural | strong | implements #104 |
| 55 | 3.4.4 (shell-app/src/App.jsx:57) | 3 code | source code | module-federation | architectural | strong | implements #105 |
| 56 | 3.4.4 (shell-app/src/App.jsx:64) | 3 code | source code | module-federation | architectural | strong | implements #106 |
| 57 | 3.4.4 (shell-app/src/App.jsx:71) | 3 code | source code | module-federation | architectural | strong | implements #101 |
| 58 | 3.4.4 (shell-app/src/App.jsx:148) | 3 code | source code | module-federation | technological | moderate | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 59 | 3.4.4 (shell-app/src/App.jsx:167) | 3 code | source code | module-federation | architectural | strong | implements #101; implements #102; implements #103; implements #104; implements #105; implements #106; implements #107; implements #108; implements #109 |
| 60 | 3.4.4 (shell-app/src/App.jsx:291) | 3 code | source code | module-federation | architectural | moderate | implements #119 |
| 61 | 3.4.4 (shell-app/src/contexts/AuthContext.jsx:229) | 3 code | source code | — | architectural | moderate | implements #120; implements #121; implements #122; implements #123; implements #124; implements #125; implements #126; implements #127; implements #128 |
| 62 | 3.4.4 (shared-design-system/src/contexts/ThemeContext.jsx:21) | 3 code | source code | — | architectural | moderate | implements #120; implements #121; implements #122; implements #123; implements #124; implements #125; implements #126; implements #127; implements #128 |
| 63 | 3.4.4 (module-assessment/src/App.jsx:24) | 3 code | source code | module-federation | architectural | moderate | implements #110 |
| 64 | 3.4.4 (module-assessment/src/pages/Assessment.jsx:350) | 3 code | source code | module-federation | architectural | moderate | implements #110 |
| 65 | 3.4.4 (module-assessment/src/pages/Assessment.jsx:400) | 3 code | source code | module-federation | architectural | moderate | implements #110 |
| 66 | 3.4.4 (module-assessment/src/pages/AssessmentsList.jsx:706) | 3 code | source code | module-federation | architectural | moderate | implements #110 |
| 67 | 3.4.4 (module-cloud-console/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #111 |
| 68 | 3.4.4 (module-cloud-console/src/CloudConsole.jsx:261) | 3 code | source code | module-federation | architectural | moderate | implements #111 |
| 69 | 3.4.4 (module-cloud-console/src/CloudConsole.jsx:281) | 3 code | source code | module-federation | architectural | moderate | implements #111 |
| 70 | 3.4.4 (module-cloud-labs/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #112 |
| 71 | 3.4.4 (module-cloud-labs/src/CloudLabs.jsx:28) | 3 code | source code | module-federation | architectural | moderate | implements #112 |
| 72 | 3.4.4 (module-cloud-labs/src/CloudLabs.jsx:37) | 3 code | source code | module-federation | architectural | moderate | implements #112 |
| 73 | 3.4.4 (module-code-environment/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #113 |
| 74 | 3.4.4 (module-code-environment/src/CodeEnvironment.jsx:39) | 3 code | source code | module-federation | architectural | moderate | implements #113 |
| 75 | 3.4.4 (module-code-environment/src/CodeEnvironment.jsx:492) | 3 code | source code | module-federation | architectural | moderate | implements #113 |
| 76 | 3.4.4 (module-code-module/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #114 |
| 77 | 3.4.4 (module-code-module/src/CodeModule.jsx:887) | 3 code | source code | module-federation | architectural | moderate | implements #114 |
| 78 | 3.4.4 (module-content-uploading/src/App.jsx:12) | 3 code | source code | module-federation | architectural | moderate | implements #115 |
| 79 | 3.4.4 (module-content-uploading/src/Content.jsx:639) | 3 code | source code | module-federation | architectural | moderate | implements #115 |
| 80 | 3.4.4 (module-content-uploading/src/CohortContent.jsx:311) | 3 code | source code | module-federation | architectural | moderate | implements #115 |
| 81 | 3.4.4 (module-content-uploading/src/CohortContent.jsx:327) | 3 code | source code | module-federation | architectural | moderate | implements #115 |
| 82 | 3.4.4 (module-dashboard/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #116 |
| 83 | 3.4.4 (module-dashboard/src/Dashboard.jsx:203) | 3 code | source code | module-federation | architectural | moderate | implements #116 |
| 84 | 3.4.4 (module-dashboard/src/Dashboard.jsx:272) | 3 code | source code | module-federation | architectural | moderate | implements #116 |
| 85 | 3.4.4 (module-logging/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #117 |
| 86 | 3.4.4 (module-logging/src/Logs.jsx:458) | 3 code | source code | module-federation | architectural | moderate | implements #117 |
| 87 | 3.4.4 (module-logging/src/Logs.jsx:492) | 3 code | source code | module-federation | architectural | moderate | implements #117 |
| 88 | 3.4.4 (module-virtual-machine/src/App.jsx:11) | 3 code | source code | module-federation | architectural | moderate | implements #118 |
| 89 | 3.4.4 (module-virtual-machine/src/VirtualMachine.jsx:802) | 3 code | source code | module-federation | architectural | moderate | implements #118 |
| 90 | 3.4.3 (module-assessment) | 4 structure | directory | — | architectural | moderate | — |
| 91 | 3.4.3 (module-cloud-console) | 4 structure | directory | — | architectural | moderate | — |
| 92 | 3.4.3 (module-cloud-labs) | 4 structure | directory | — | architectural | moderate | — |
| 93 | 3.4.3 (module-code-environment) | 4 structure | directory | — | architectural | moderate | — |
| 94 | 3.4.3 (module-code-module) | 4 structure | directory | — | architectural | moderate | — |
| 95 | 3.4.3 (module-content-uploading) | 4 structure | directory | — | architectural | moderate | — |
| 96 | 3.4.3 (module-dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 97 | 3.4.3 (module-logging) | 4 structure | directory | — | architectural | moderate | — |
| 98 | 3.4.3 (module-virtual-machine) | 4 structure | directory | — | architectural | moderate | — |
| 99 | 3.4.3 (shared-design-system) | 4 structure | directory | — | architectural | moderate | — |
| 100 | 3.4.3 (shell-app) | 4 structure | directory | — | architectural | moderate | — |
| 101 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #100; links #90 |
| 102 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #100; links #91 |
| 103 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #100; links #92 |
| 104 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #100; links #93 |
| 105 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #100; links #94 |
| 106 | 3.4.5 #6 | 5 composition | source code | module-federation | architectural | strong | links #100; links #95 |
| 107 | 3.4.5 #7 | 5 composition | source code | module-federation | architectural | strong | links #100; links #96 |
| 108 | 3.4.5 #8 | 5 composition | source code | module-federation | architectural | strong | links #100; links #97 |
| 109 | 3.4.5 #9 | 5 composition | source code | module-federation | architectural | strong | links #100; links #98 |
| 110 | 3.4.5 #10 | 5 composition | source code | module-federation | architectural | strong | links #90; links #99 |
| 111 | 3.4.5 #11 | 5 composition | source code | module-federation | architectural | strong | links #91; links #99 |
| 112 | 3.4.5 #12 | 5 composition | source code | module-federation | architectural | strong | links #92; links #99 |
| 113 | 3.4.5 #13 | 5 composition | source code | module-federation | architectural | strong | links #93; links #99 |
| 114 | 3.4.5 #14 | 5 composition | source code | module-federation | architectural | strong | links #94; links #99 |
| 115 | 3.4.5 #15 | 5 composition | source code | module-federation | architectural | strong | links #95; links #99 |
| 116 | 3.4.5 #16 | 5 composition | source code | module-federation | architectural | strong | links #96; links #99 |
| 117 | 3.4.5 #17 | 5 composition | source code | module-federation | architectural | strong | links #97; links #99 |
| 118 | 3.4.5 #18 | 5 composition | source code | module-federation | architectural | strong | links #98; links #99 |
| 119 | 3.4.5 #19 | 5 composition | source code | module-federation | architectural | strong | links #100; links #99 |
| 120 | 3.4.5 #20 | 5 composition | source code | events | architectural | strong | links #100; links #91 |
| 121 | 3.4.5 #21 | 5 composition | source code | events | architectural | strong | links #100; links #92 |
| 122 | 3.4.5 #22 | 5 composition | source code | events | architectural | strong | links #100; links #93 |
| 123 | 3.4.5 #23 | 5 composition | source code | events | architectural | strong | links #100; links #94 |
| 124 | 3.4.5 #24 | 5 composition | source code | events | architectural | strong | links #100; links #95 |
| 125 | 3.4.5 #25 | 5 composition | source code | events | architectural | strong | links #100; links #96 |
| 126 | 3.4.5 #26 | 5 composition | source code | events | architectural | strong | links #100; links #97 |
| 127 | 3.4.5 #27 | 5 composition | source code | events | architectural | strong | links #100; links #98 |
| 128 | 3.4.5 #28 | 5 composition | source code | events | architectural | strong | links #90; links #100 |
| 129 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #90 |
| 130 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #91 |
| 131 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #92 |
| 132 | 3.4.6 #4 | 6 build-deploy | deploy | — | architectural | moderate | publishes #93 |
| 133 | 3.4.6 #5 | 6 build-deploy | deploy | — | architectural | moderate | publishes #94 |
| 134 | 3.4.6 #6 | 6 build-deploy | deploy | — | architectural | moderate | publishes #95 |
| 135 | 3.4.6 #7 | 6 build-deploy | deploy | — | architectural | moderate | publishes #96 |
| 136 | 3.4.6 #8 | 6 build-deploy | deploy | — | architectural | moderate | publishes #97 |
| 137 | 3.4.6 #9 | 6 build-deploy | deploy | — | architectural | moderate | publishes #98 |
| 138 | 3.4.6 #10 | 6 build-deploy | deploy | — | architectural | moderate | publishes #99 |
| 139 | 3.4.6 #11 | 6 build-deploy | deploy | — | architectural | moderate | publishes #100 |
| 140 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | contradicts #101; contradicts #102; contradicts #103; contradicts #104; contradicts #105; contradicts #106; contradicts #107; contradicts #108; contradicts #109 |
| 141 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #129; corroborates #130; corroborates #131; corroborates #132; corroborates #133; corroborates #134; corroborates #135; corroborates #136; corroborates #137; corroborates #138; corroborates #139; corroborates docker-compose.yml:29-179 |
| 142 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #101; corroborates #102; corroborates #103; corroborates #104; corroborates #105; corroborates #106; corroborates #107; corroborates #108; corroborates #109 |
| 143 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #101; corroborates #102; corroborates #103; corroborates #104; corroborates #105; corroborates #106; corroborates #107; corroborates #108; corroborates #109; corroborates #49; corroborates shell-app/src/App.jsx:15-71 |
| 144 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #129; corroborates #130; corroborates #131; corroborates #132; corroborates #133; corroborates #134; corroborates #135; corroborates #136; corroborates #137; corroborates #138; corroborates #139; corroborates docker-compose.yml:3-184 |
| 145 | 3.4.7 #6 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #101; corroborates #102; corroborates #103; corroborates #104; corroborates #105; corroborates #106; corroborates #107; corroborates #108; corroborates #109; corroborates #3 |
| 146 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts docker-compose.yml:168-178 |
| 147 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | contradicts #49; contradicts #11; contradicts shell-app/src/App.jsx:15-71 |
| 148 | 3.4.7 #9 | 7 documentation | documentation | module-federation | technological | weak | corroborates #3; corroborates #10; corroborates #11 |
| 149 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #129; corroborates #130; corroborates #131; corroborates #132; corroborates #133; corroborates #134; corroborates #135; corroborates #136; corroborates #137; corroborates #138; corroborates #139; corroborates module-cloud-labs/Dockerfile:1-22 |
| 150 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | contradicts docker-compose.yml:54-58; contradicts nginx/nginx.conf:49-50 |
| 151 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #129; corroborates #130; corroborates #131; corroborates #132; corroborates #133; corroborates #134; corroborates #135; corroborates #136; corroborates #137 |
| 152 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | — |
| 153 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | — |
| 154 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates module-cloud-labs/src/App.jsx:18-33 |
| 155 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | — |
| 156 | 3.4.7 #17 | 7 documentation | documentation | — | technological | weak | contradicts #3; contradicts #11; contradicts module-cloud-labs/package.json:11-14 |
| 157 | 3.4.7 #18 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #22; corroborates #3; corroborates module-cloud-labs/src/index.js:4 |
| 158 | 3.4.7 #19 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #101; corroborates #102; corroborates #103; corroborates #104; corroborates #105; corroborates #106; corroborates #107; corroborates #108; corroborates #109; corroborates #110; corroborates #111; corroborates #112; corroborates #113; corroborates #114; corroborates #115; corroborates #116; corroborates #117; corroborates #118; corroborates #119; corroborates #11; corroborates #129; corroborates #130; corroborates #131; corroborates #132; corroborates #133; corroborates #134; corroborates #135; corroborates #136; corroborates #137; corroborates #138; corroborates #139 |
| 159 | 3.4.7 #20 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #11; contradicts #139; contradicts shell-app/public/index.html:22-48 |
| 160 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | partially corroborates shell-app/src/config/remoteConfig.js:8-31; partially corroborates shell-app/public/index.html:51 |
| 161 | 3.4.7 #22 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #58; corroborates shell-app/src/App.jsx:148; corroborates shell-app/src/remotes/remoteLoader.js:4; corroborates shell-app/src/App.jsx:105-106 |
| 162 | 3.4.7 #23 | 7 documentation | documentation | module-federation | technological | weak | contradicts #3; contradicts #11 |
| 163 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #139; corroborates shell-app/Dockerfile:26 |
| 164 | 3.4.7 #25 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #58; corroborates shell-app/src/App.jsx:148; corroborates shell-app/src/App.jsx:79-153 |
| 165 | 3.4.7 #26 | 7 documentation | documentation | — | architectural | weak | contradicts #129; contradicts #130; contradicts #131; contradicts #132; contradicts #133; contradicts #134; contradicts #135; contradicts #136; contradicts #137; contradicts #138; contradicts #139; contradicts docker-compose.yml:29-179 |
| 166 | 3.4.7 #27 | 7 documentation | comment | — | architectural | weak | corroborates module-assessment/package.json:22; corroborates module-assessment/Dockerfile:7 |
| 167 | 3.4.7 #28 | 7 documentation | comment | — | architectural | weak | corroborates #120; corroborates #121; corroborates #122; corroborates #123; corroborates #124; corroborates #125; corroborates #126; corroborates #127; corroborates #128; corroborates module-assessment/src/AuthContext.jsx:111-126 |
| 168 | 3.4.7 #29 | 7 documentation | comment | — | architectural | weak | contradicts #128; contradicts shared-design-system/src/contexts/ThemeContext.jsx:14-22; contradicts module-assessment/src/pages/AssessmentReports.jsx:418 |
| 169 | 3.4.7 #30 | 7 documentation | comment | — | architectural | weak | contradicts shared-design-system/src/contexts/ThemeContext.jsx:25-33 |
| 170 | 3.4.7 #31 | 7 documentation | comment | — | architectural | weak | corroborates #101; corroborates #102; corroborates #103; corroborates #104; corroborates #105; corroborates #106; corroborates #107; corroborates #108; corroborates #109; corroborates shell-app/public/index.html:18-48; corroborates nginx/nginx.conf:25-134 |
| 171 | 3.4.7 #32 | 7 documentation | comment | — | architectural | weak | corroborates #120; corroborates #121; corroborates #122; corroborates #123; corroborates #124; corroborates #125; corroborates #126; corroborates #127; corroborates #128; corroborates #61; corroborates shell-app/src/contexts/AuthContext.jsx:229 |
| 172 | 3.4.7 #33 | 7 documentation | comment | module-federation | architectural | weak | corroborates #119; corroborates #11; corroborates shell-app/src/App.jsx:3 |
| 173 | 3.4.7 #34 | 7 documentation | comment | module-federation | technological | weak | corroborates #3; corroborates #11 |
| 174 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #169; explains #62 |
| 175 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #140; explains #165 |
| 176 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #146 |
| 177 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #147 |
| 178 | 3.4.8 #5 | 8 history | history | — | context | weak | explains #150 |
| 179 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #156 |
| 180 | 3.4.8 #7 | 8 history | history | — | context | weak | explains #159 |
| 181 | 3.4.8 #8 | 8 history | history | — | context | weak | explains #160 |
| 182 | 3.4.8 #9 | 8 history | history | — | context | weak | explains #162 |
| 183 | 3.4.8 #10 | 8 history | history | — | architectural | weak | explains #168 |

## Summary

Observations: 183. Dimensions (technology: 0, configuration: 12, code: 77, structure: 11, composition: 28, build-deploy: 11, documentation: 34, history: 10). Strength (strong: 60, moderate: 59, weak: 64, ambiguous: 0). Evidence (technological: 22, architectural: 145, context: 16).

