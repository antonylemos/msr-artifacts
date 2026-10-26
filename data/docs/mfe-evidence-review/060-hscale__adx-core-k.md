---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
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

# 060 — hscale/adx-core-k

## Repository overview

Architecture supported by complete Module Federation chain between React/Vite shell and six domain remotes in `adx-core/apps/`:
- **Dependency:** `@originjs/vite-plugin-federation` declared in seven applications (#1 through #7).
- **Configuration:** shell declares six remotes (#11). Each declares `<app>_app`, generates `remoteEntry.js`, exposes `./App`, sharing same libraries (#8 through #10, #12 through #14).
- **Code:** shell loads each remote’s `./App` by name (#15 through #20), mounting under route prefix in route table (#40).
- **Relationships:** six active host → remote relationships (#59 through #64).

Units weaker than composition. Only shell/auth confirmed unit boundaries (#42, #45). Other five remotes ambiguous (#43, #44, #46 through #48): file, tenant, user and workflow lack `index.html`; file, tenant, user, workflow and module `exposes` point to missing files. Module also imports missing components within own `./App`. Relationships remain active because loaded `./App` exists in all six. History explains gaps: mostly from snapshot commit recreating applications in `adx-core/apps/` without previously existing files (#98).

Separate builds in seven applications, deployment undetermined (#65 through #71). Workflows build/publish `apps/<app>`, absent snapshot path; shell points remotes to `localhost` (#11). History clarifies workflows belong to root-application stage (#102).

Three misleading signals in isolation:
- **Unlinked event channels:** event bus, i18n/shared-context dispatch/listen for inter-unit `CustomEvent` (#21 through #26), in files no unit reaches. Documentation claims event-bus coordination/shared global state, contradicted by artifacts (#84, #93). History does not establish prior channel use (#99 through #101).
- **Test events:** thirteen event constructs in desktop/mobile Playwright tests only simulate platform events (#27 through #39).
- **Nonfrontend directories:** workspace root (#41), four Node BFFs (#49 through #52), five shared libraries (#53 through #57), command-line tool (#58).

Documentation has 26 claims, all weak under protocol: 9 corroborated, 7 partial, 5 contradicted, 5 uncorroborated. Corroborated repeat chain above (#72, #73, #82, #86, #92). Contradicted concern inter-unit communication (#84, #93), fault isolation (#91), per-team structure (#94), shared i18n (#96). Context rather than MFE evidence: cross-platform compatibility (#77), BFF claims (#75, #87 through #90), whose remote use lacks functioning artifact (#103).

## Observations

### 1. adx-core/apps/auth/package.json:41

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in auth build.

### 2. adx-core/apps/file/package.json:26

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in file build.

### 3. adx-core/apps/module/package.json:39

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in module build.

### 4. adx-core/apps/shell/package.json:40

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in shell build. Configuration/code use it.

### 5. adx-core/apps/tenant/package.json:36

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in tenant build.

### 6. adx-core/apps/user/package.json:26

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in user build.

### 7. adx-core/apps/workflow/package.json:26

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present in workflow build.

### 8. adx-core/apps/auth/vite.config.ts:1-48

**Observation:** `federation` declares `name: 'auth_app'` and `filename: 'remoteEntry.js'`, exposing `./App` and five components (`./LoginForm`, `./RegisterForm`, `./MFASetup`, `./PasswordReset`, `./SSOLogin`), sharing as `singleton` `react`, `react-dom`, `@tanstack/react-query`, `@adx-core/design-system`, `@adx-core/shared-context`, `@adx-core/event-bus` and `@adx-core/bff-client`. Six exposed modules exist.

**Interpretation:** Auth configured as remote offering application/domain components to host.

**Note:** Other review-table configuration files declare no composition element/no configuration observation: application `package.json` (scripts/manifest), root `workspaces` (`package.json:5-10`, structure); `index.html` (entry); `.github/workflows/` workflows (build/deployment, dimension 6); `adx-core/Cargo.toml` (backend). `server`/`preview` ports in `vite.config.ts` are development; 3.4.5 marked supporting.

### 9. adx-core/apps/file/vite.config.ts:1-30

**Observation:** `federation` declares `name: 'file_app'` and `filename: 'remoteEntry.js'`, exposing `./App`, `./FileUpload`, `./FileBrowser` and `./FileViewer`, sharing same seven libraries as `singleton`. Only `./App` (`./src/App.tsx`) exists; three exposed components absent.

**Interpretation:** File configured as remote. Configuration promises more modules than directory contains; only entire application can be offered to host.

### 10. adx-core/apps/module/vite.config.ts:1-48

**Observation:** `federation` declares `name: 'module_app'` and `filename: 'remoteEntry.js'`, exposing `./App`, `./ModuleMarketplace`, `./ModuleManager`, `./ModuleInstaller`, `./ModuleSettings` and `./ModuleDeveloper`, sharing same seven libraries as `singleton`. Last three exposed modules absent.

**Interpretation:** Module configured as remote with some exposed modules absent.

### 11. adx-core/apps/shell/vite.config.ts:1-69

**Observation:** `federation` declares `name: 'shell'` and remotes `auth_app`, `tenant_app`, `file_app`, `user_app`, `workflow_app` and `module_app`, each at `http://localhost:300N/assets/remoteEntry.js` (N from 1 through 6). Shares as `singleton` `react`, `react-dom`, `react-router-dom`, `@tanstack/react-query` and `zustand`, with `requiredVersion`, plus `@adx-core/shared-context`, `@adx-core/design-system`, `@adx-core/event-bus` and `@adx-core/i18n`. Exposes no modules.

**Interpretation:** Host configuration declares six domain units as remotes. Development addresses: no snapshot configuration links shell to published addresses.

### 12. adx-core/apps/tenant/vite.config.ts:1-47

**Observation:** `federation` declares `name: 'tenant_app'` and `filename: 'remoteEntry.js'`, exposing `./App`, `./TenantSwitcher`, `./TenantSettings`, `./TenantMembers` and `./TenantBilling`, sharing same seven libraries as `singleton`. `./TenantSwitcher` points to missing file.

**Interpretation:** Tenant configured as remote with missing exposed module.

### 13. adx-core/apps/user/vite.config.ts:1-30

**Observation:** `federation` declares `name: 'user_app'` and `filename: 'remoteEntry.js'`, exposing `./App`, `./UserProfile`, `./UserList` and `./UserSettings`, sharing same seven libraries as `singleton`. Only `./App` exists.

**Interpretation:** User configured as remote. Like file, only whole application can be offered to host.

### 14. adx-core/apps/workflow/vite.config.ts:1-30

**Observation:** `federation` declares `name: 'workflow_app'` and `filename: 'remoteEntry.js'`, exposing `./App`, `./WorkflowList`, `./WorkflowStatus` and `./WorkflowHistory`, sharing same seven libraries as `singleton`. Only `./App` exists.

**Interpretation:** Workflow configured as remote. Like file, only whole application can be offered to host.

### 15. adx-core/apps/shell/src/App.tsx:16

**Observation:** `const AuthApp = React.lazy(() => import('auth_app/App'))`.

**Interpretation:** Shell loads remote auth module `./App` by name.

### 16. adx-core/apps/shell/src/App.tsx:17

**Observation:** `const TenantApp = React.lazy(() => import('tenant_app/App'))`.

**Interpretation:** Shell loads remote tenant module `./App` by name.

### 17. adx-core/apps/shell/src/App.tsx:18

**Observation:** `const FileApp = React.lazy(() => import('file_app/App'))`.

**Interpretation:** Shell loads remote file module `./App` by name.

### 18. adx-core/apps/shell/src/App.tsx:19

**Observation:** `const UserApp = React.lazy(() => import('user_app/App'))`.

**Interpretation:** Shell loads remote user module `./App` by name.

### 19. adx-core/apps/shell/src/App.tsx:20

**Observation:** `const WorkflowApp = React.lazy(() => import('workflow_app/App'))`.

**Interpretation:** Shell loads remote workflow module `./App` by name.

### 20. adx-core/apps/shell/src/App.tsx:21

**Observation:** `const ModuleApp = React.lazy(() => import('module_app/App'))`.

**Interpretation:** Shell loads remote module module `./App` by name.

### 21. adx-core/packages/event-bus/src/EventBus.tsx:49; adx-core/packages/event-bus/src/index.ts:2

**Observation:** `window.dispatchEvent(new CustomEvent(\`adx:${eventType}\`, …))` after comment "Also emit as custom DOM event for cross-micro-frontend communication". Package entry exports only `./providers/EventBusProvider`, no unit importing `EventBus.tsx`.

**Interpretation:** Implemented inter-unit event channel unreachable by any unit.

### 22. adx-core/packages/i18n/src/hooks.ts:19; adx-core/packages/i18n/src/index.ts:26

**Observation:** `window.dispatchEvent(new CustomEvent('adx-language-changed', …))` in `changeLanguage`. Package entry exports only i18next instance, no unit imports hook, no snapshot event listener.

**Interpretation:** Implemented unused inter-unit language-change notification.

### 23. adx-core/packages/shared-context/src/tenant-store.ts:77; adx-core/packages/shared-context/src/index.ts:2-5

**Observation:** `window.dispatchEvent(new CustomEvent('tenant:switched', …))` after tenant switch. `tenant-store.ts` neither exported by package entry nor imported by any unit.

**Interpretation:** Implemented unreachable inter-unit tenant-switch notification.

### 24. adx-core/packages/shared-context/src/theme-store.ts:33; adx-core/packages/shared-context/src/index.ts:2-5

**Observation:** `window.dispatchEvent(new CustomEvent('theme:changed', …))` in `setTheme`, after comment "Emit theme change event for micro-frontends". `theme-store.ts` neither exported by package entry nor imported by any unit.

**Interpretation:** Implemented unreachable inter-unit theme-change notification.

### 25. adx-core/packages/shared-context/src/theme-store.ts:142

**Observation:** `window.addEventListener('theme:changed', …)` registered on module load after comment "Listen for theme changes from other micro-frontends", same file as #24.

**Interpretation:** Theme channel listener side exists, also unreachable.

### 26. adx-core/packages/shared-context/src/theme-store.ts:162

**Observation:** `window.addEventListener('theme:changed', …)` within `useThemeSync`. Hook neither exported by package entry nor used by any unit.

**Interpretation:** Second theme-channel listener exists, unused.

### 27. tests/desktop/tauri-integration.test.ts:129

**Observation:** `new CustomEvent('tauri://deep-link')` inside Playwright test `page.evaluate`.

**Interpretation:** Test simulates Tauri deep link. Not composition construct.

### 28. tests/desktop/tauri-integration.test.ts:132

**Observation:** `window.dispatchEvent(event)` for same simulated event.

**Interpretation:** Simulated test-event dispatch. Not composition construct.

### 29. tests/mobile/android-integration.test.ts:89

**Observation:** `element.dispatchEvent(touchEvent)` in touch-gesture test.

**Interpretation:** Test simulates gesture. Not composition construct.

### 30. tests/mobile/android-integration.test.ts:189

**Observation:** `window.dispatchEvent(new Event('orientationchange'))`.

**Interpretation:** Test simulates screen rotation. Not composition construct.

### 31. tests/mobile/android-integration.test.ts:240

**Observation:** `window.dispatchEvent(new Event('pagehide'))`.

**Interpretation:** Test simulates application backgrounding. Not composition construct.

### 32. tests/mobile/android-integration.test.ts:241

**Observation:** `document.dispatchEvent(new Event('visibilitychange'))` in same scenario as #31.

**Interpretation:** Part of same test simulation. Not composition construct.

### 33. tests/mobile/android-integration.test.ts:256

**Observation:** `window.dispatchEvent(new Event('pageshow'))`.

**Interpretation:** Test simulates foreground return. Not composition construct.

### 34. tests/mobile/android-integration.test.ts:257

**Observation:** `document.dispatchEvent(new Event('visibilitychange'))` in same scenario as #33.

**Interpretation:** Part of same test simulation. Not composition construct.

### 35. tests/mobile/ios-integration.test.ts:170

**Observation:** `window.dispatchEvent(new Event('pagehide'))`.

**Interpretation:** Test simulates application backgrounding. Not composition construct.

### 36. tests/mobile/ios-integration.test.ts:171

**Observation:** `document.dispatchEvent(new Event('visibilitychange'))` in same scenario as #35.

**Interpretation:** Part of same test simulation. Not composition construct.

### 37. tests/mobile/ios-integration.test.ts:186

**Observation:** `window.dispatchEvent(new Event('pageshow'))`.

**Interpretation:** Test simulates foreground return. Not composition construct.

### 38. tests/mobile/ios-integration.test.ts:187

**Observation:** `document.dispatchEvent(new Event('visibilitychange'))` in same scenario as #37.

**Interpretation:** Part of same test simulation. Not composition construct.

### 39. tests/mobile/ios-integration.test.ts:231

**Observation:** `window.dispatchEvent(event)` for simulated `DeviceMotionEvent`.

**Interpretation:** Test simulates device movement. Not composition construct.

### 40. adx-core/apps/shell/src/App.tsx:46-55

**Observation:** Shell `Routes` table links `/auth/*` to `AuthApp`, `/tenant/*` to `TenantApp`, `/files/*` to `FileApp`, `/users/*` to `UserApp`, `/workflows/*` to `WorkflowApp`, `/modules/*` to `ModuleApp`, six components from #15 through #20 inside `Suspense`.

**Interpretation:** Host declares mounting paths for each remote.

### 41. .; package.json:1-26

**Observation:** Root `adx-core-monorepo` declares `workspaces` (`apps/*`, `packages/*`, `bff-services/*`, `tools/*`), delegating build through `yarn workspaces run build`. No application entry/build. Workspace patterns do not reach `adx-core/` directories.

**Interpretation:** Coordination root rather than frontend unit. Workspace excludes snapshot applications.

### 42. adx-core/apps/auth; adx-core/apps/auth/package.json:1-9; adx-core/apps/auth/index.html:10-11; adx-core/apps/auth/src/main.tsx:6-10; adx-core/apps/auth/vite.config.ts:5-48

**Observation:** React application with own manifest, entry and Vite build. Exposed modules present.

**Interpretation:** Frontend unit with own boundary.

### 43. adx-core/apps/file; adx-core/apps/file/package.json:1-9; adx-core/apps/file/vite.config.ts:5-30

**Observation:** Own manifest/Vite build but no `index.html`, `exposes` at `vite.config.ts:13-15` pointing to absent `src/components/*`. Directory has only `src/App.tsx` beyond manifest/configuration.

**Interpretation:** Ambiguous unit boundary. Two plausible readings: incomplete remote existing only mounted by shell, or sketched directory whose snapshot build cannot complete.

### 44. adx-core/apps/module; adx-core/apps/module/package.json:1-9; adx-core/apps/module/index.html:10-11; adx-core/apps/module/src/main.tsx:4, 6-10; adx-core/apps/module/vite.config.ts:5-48

**Observation:** Own manifest, entry/Vite build but `exposes` at `vite.config.ts:15-17` point to absent files, `src/main.tsx:4` importing missing `./index.css`.

**Interpretation:** Ambiguous unit boundary. Application has everything for standalone execution, but build depends on absent snapshot files.

### 45. adx-core/apps/shell; adx-core/apps/shell/package.json:1-9; adx-core/apps/shell/index.html:10-11; adx-core/apps/shell/src/main.tsx:6-10; adx-core/apps/shell/vite.config.ts:6-69

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary.

### 46. adx-core/apps/tenant; adx-core/apps/tenant/package.json:1-9; adx-core/apps/tenant/vite.config.ts:5-47

**Observation:** Own manifest/Vite build but no `index.html`, expose at `vite.config.ts:13` pointing to missing `src/components/TenantSwitcher.tsx`.

**Interpretation:** Ambiguous unit boundary: incomplete remote existing only mounted by shell, or directory whose snapshot build cannot complete.

### 47. adx-core/apps/user; adx-core/apps/user/package.json:1-9; adx-core/apps/user/vite.config.ts:5-30

**Observation:** Own manifest/Vite build but no `index.html`, `exposes` at `vite.config.ts:13-15` pointing to absent `src/components/*`.

**Interpretation:** Ambiguous unit boundary, same two readings as #43.

### 48. adx-core/apps/workflow; adx-core/apps/workflow/package.json:1-9; adx-core/apps/workflow/vite.config.ts:5-30

**Observation:** Own manifest/Vite build but no `index.html`, `exposes` at `vite.config.ts:13-15` pointing to absent `src/components/*`.

**Interpretation:** Ambiguous unit boundary, same two readings as #43.

### 49. adx-core/bff-services/auth-bff; adx-core/bff-services/auth-bff/package.json:7-9

**Observation:** Node Express server (`tsx watch src/server.ts`, `tsc`), without frontend application entry.

**Interpretation:** BFF service rather than frontend unit.

### 50. adx-core/bff-services/file-bff; adx-core/bff-services/file-bff/package.json:8-10

**Observation:** Node Express server (`tsx watch src/server.ts`, `tsc`), without frontend application entry.

**Interpretation:** BFF service rather than frontend unit.

### 51. adx-core/bff-services/module-bff; adx-core/bff-services/module-bff/package.json:7-9

**Observation:** Node Express server (`tsx watch src/server.ts`, `tsc`), without frontend application entry.

**Interpretation:** BFF service rather than frontend unit.

### 52. adx-core/bff-services/tenant-bff; adx-core/bff-services/tenant-bff/package.json:7-9

**Observation:** Node Express server (`tsx watch src/server.ts`, `tsc`), without frontend application entry.

**Interpretation:** BFF service rather than frontend unit.

### 53. adx-core/packages/bff-client; adx-core/packages/bff-client/package.json:5, 8

**Observation:** `main: dist/index.js` and `tsc` build without application entry.

**Interpretation:** Shared library rather than frontend unit.

### 54. adx-core/packages/design-system; adx-core/packages/design-system/package.json:5, 8

**Observation:** `main: dist/index.js` and `tsc && vite build` build without directory `vite.config.*` or application entry.

**Interpretation:** Component library rather than frontend unit.

### 55. adx-core/packages/event-bus; adx-core/packages/event-bus/package.json:5, 8

**Observation:** `main: dist/index.js` and `tsc` build without application entry.

**Interpretation:** Shared library rather than frontend unit.

### 56. adx-core/packages/i18n; adx-core/packages/i18n/package.json:5, 8

**Observation:** `main: dist/index.js` and `tsc` build without application entry.

**Interpretation:** Shared library rather than frontend unit.

### 57. adx-core/packages/shared-context; adx-core/packages/shared-context/package.json:5, 8

**Observation:** `main: dist/index.js` and `tsc` build without application entry.

**Interpretation:** Shared library rather than frontend unit.

### 58. tools/kiro-github-task-sync; tools/kiro-github-task-sync/package.json:7-9; package.json:9

**Observation:** Only `package.json`, with `tsc` and `tsx watch src/index.ts`, no directory `src/`. Root workspace member (`package.json:9`).

**Interpretation:** Command-line tool rather than frontend unit.

### 59. adx-core/apps/shell/src/App.tsx:16, 48; adx-core/apps/shell/vite.config.ts:12; adx-core/apps/auth/vite.config.ts:9-12; adx-core/apps/auth/src/App.tsx:53

**Observation:** Shell loads `auth_app/App`, mounting at `/auth/*`. Name/`remoteEntry.js` match auth configuration exposing present `./App` (`adx-core/apps/auth/src/App.tsx:53`).

**Interpretation:** Active host → remote relationship. Sole pair whose target has confirmed unit boundary/all exposed modules present.

### 60. adx-core/apps/shell/src/App.tsx:17, 49; adx-core/apps/shell/vite.config.ts:13; adx-core/apps/tenant/vite.config.ts:9-12; adx-core/apps/tenant/src/App.tsx:51

**Observation:** Shell loads `tenant_app/App`, mounting at `/tenant/*`. Name/`remoteEntry.js` match tenant configuration with existing `./App` (`adx-core/apps/tenant/src/App.tsx:51`).

**Interpretation:** Active host → remote relationship with ambiguous target boundary (#46).

### 61. adx-core/apps/shell/src/App.tsx:18, 50; adx-core/apps/shell/vite.config.ts:14; adx-core/apps/file/vite.config.ts:9-12; adx-core/apps/file/src/App.tsx:43

**Observation:** Shell loads `file_app/App`, mounting at `/files/*`. Name/`remoteEntry.js` match file configuration with existing `./App` (`adx-core/apps/file/src/App.tsx:43`).

**Interpretation:** Active host → remote relationship with ambiguous target boundary (#43).

### 62. adx-core/apps/shell/src/App.tsx:19, 51; adx-core/apps/shell/vite.config.ts:15; adx-core/apps/user/vite.config.ts:9-12; adx-core/apps/user/src/App.tsx:43

**Observation:** Shell loads `user_app/App`, mounting at `/users/*`. Name/`remoteEntry.js` match user configuration with existing `./App` (`adx-core/apps/user/src/App.tsx:43`).

**Interpretation:** Active host → remote relationship with ambiguous target boundary (#47).

### 63. adx-core/apps/shell/src/App.tsx:20, 52; adx-core/apps/shell/vite.config.ts:16; adx-core/apps/workflow/vite.config.ts:9-12; adx-core/apps/workflow/src/App.tsx:43

**Observation:** Shell loads `workflow_app/App`, mounting at `/workflows/*`. Name/`remoteEntry.js` match workflow configuration with existing `./App` (`adx-core/apps/workflow/src/App.tsx:43`).

**Interpretation:** Active host → remote relationship with ambiguous target boundary (#48).

### 64. adx-core/apps/shell/src/App.tsx:21, 53; adx-core/apps/shell/vite.config.ts:17; adx-core/apps/module/vite.config.ts:9-12; adx-core/apps/module/src/App.tsx:10-12, 54

**Observation:** Shell loads `module_app/App`, mounting at `/modules/*`. Name/`remoteEntry.js` match module configuration. `./App` exists (`adx-core/apps/module/src/App.tsx:54`), but imports missing `ModuleInstaller`, `ModuleSettings` and `ModuleDeveloper` (`adx-core/apps/module/src/App.tsx:10-12`).

**Interpretation:** Active host → remote relationship. Loaded module not fully resolvable in snapshot.

### 65. adx-core/apps/auth/vite.config.ts:5-48; adx-core/apps/auth/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-170, 189-193; .github/workflows/deploy-production.yml:208-236, 305-335

**Observation:** Own configuration/`tsc && vite build`, generating own `remoteEntry.js`. Both workflows build/publish application separately at own S3 path but use `apps/auth`, absent from snapshot. Recorded version is whole repository commit.

**Interpretation:** Own build boundary. Separate deployment unconfirmed because workflows mismatch application path.

### 66. adx-core/apps/file/vite.config.ts:5-30; adx-core/apps/file/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 129-132, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observation:** Own configuration/`tsc && vite build`, exposes targeting absent files. Workflows use `apps/file`. Workflow check requires `index.html` in `dist` (`.github/workflows/deploy-microfrontends.yml:129-132`), folder lacking `index.html`.

**Interpretation:** Own build boundary. Separate deployment unconfirmed.

### 67. adx-core/apps/module/vite.config.ts:5-48; adx-core/apps/module/src/main.tsx:4; adx-core/apps/module/package.json:8; .github/workflows/deploy-microfrontends.yml:45, 105-111, 151-170; .github/workflows/deploy-production.yml:213, 311

**Observation:** Own configuration/`tsc && vite build`, exposes/import targeting absent files. Only `deploy-microfrontends.yml` matrix includes it at `apps/module`; `deploy-production.yml` matrix excludes it.

**Interpretation:** Own build boundary. Separate deployment unconfirmed.

### 68. adx-core/apps/shell/vite.config.ts:6-69; adx-core/apps/shell/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-165; .github/workflows/deploy-production.yml:208-236, 305-335

**Observation:** Own configuration/`tsc && vite build`. One workflow publishes at environment root, other at `shell/`, both using `apps/shell`. If published, would load remotes from `localhost`.

**Interpretation:** Own build boundary. Separate deployment unconfirmed, no configuration linking shell/published remotes.

### 69. adx-core/apps/tenant/vite.config.ts:5-47; adx-core/apps/tenant/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 129-132, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observation:** Own configuration/`tsc && vite build`, one expose targeting missing file. Workflows use `apps/tenant`, folder lacking workflow-required `index.html`.

**Interpretation:** Own build boundary. Separate deployment unconfirmed.

### 70. adx-core/apps/user/vite.config.ts:5-30; adx-core/apps/user/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observation:** Own configuration/`tsc && vite build`, exposes targeting absent files, no `index.html`. Workflows use `apps/user`.

**Interpretation:** Own build boundary. Separate deployment unconfirmed.

### 71. adx-core/apps/workflow/vite.config.ts:5-30; adx-core/apps/workflow/package.json:8; .github/workflows/deploy-microfrontends.yml:105-111, 151-170; .github/workflows/deploy-production.yml:208-236, 305-335

**Observation:** Own configuration/`tsc && vite build`, exposes targeting absent files, no `index.html`. Workflows use `apps/workflow`.

**Interpretation:** Own build boundary. Separate deployment unconfirmed.

### 72. DEV-SETUP.md:43

**Observation:** "**Frontend Micro-Apps**: Shell, Auth, Tenant, File, User, Workflow, Module apps".

**Interpretation:** Lists seven frontend applications. Claim corroborated.

### 73. DEV-SETUP.md:244

**Observation:** "**Frontend Microservices**: Module Federation for …".

**Interpretation:** Names Module Federation as frontend composition technology. Claim corroborated.

### 74. DEV-SETUP.md:244

**Observation:** "… for independent micro-apps".

**Interpretation:** Claims independent applications. All seven have separate build, only shell/auth/module have standalone entries. Claim partially corroborated.

### 75. DEV-SETUP.md:246

**Observation:** "**BFF Pattern**: Optional optimization layer for frontend data aggregation".

**Interpretation:** Claims BFF layer for frontend. BFFs exist but only module attempts client use through unexported package hook. Claim partially corroborated.

### 76. FINAL_TESTING_REPORT.md:124

**Observation:** "Shared context and event bus architecture".

**Interpretation:** Claims shared context/event bus. Seven applications import both packages. Claim corroborated as packages without specifying state/event circulation.

### 77. FINAL_TESTING_REPORT.md:125

**Observation:** "Cross-platform compatibility framework".

**Interpretation:** Claims cross-platform compatibility. Snapshot neither confirms nor disproves. Claim uncorroborated.

### 78. PROJECT_REPORT.md:77

**Observation:** "**Styling**: TailwindCSS with shared design system".

**Interpretation:** Claims shared design system. Seven applications import `@adx-core/design-system`. Claim corroborated.

### 79. PROJECT_REPORT.md:153

**Observation:** "Team autonomy …".

**Interpretation:** Claims team autonomy. Snapshot does not show each unit’s developers. Claim uncorroborated.

### 80. PROJECT_REPORT.md:153

**Observation:** "… and independent deployments".

**Interpretation:** Claims independent deployment. Separate builds/per-application publication job exist, deployment undetermined for all seven. Claim partially corroborated.

### 81. PROJECT_REPORT.md:154

**Observation:** "Technology flexibility per domain".

**Interpretation:** Claims per-domain technology freedom. Seven applications share stack, neither confirming nor disproving possibility. Claim uncorroborated.

### 82. adx-core-final-sync-manager-summary.md:45

**Observation:** "**✅ Shell Application:** Module Federation host (port 3000)".

**Interpretation:** Attributes host role to shell. Claim corroborated.

### 83. adx-core-final-sync-manager-summary.md:71

**Observation:** "**✅ Team Autonomy:** Vertical slice ownership (backend + frontend + BFF)".

**Interpretation:** Claims per-domain vertical slice. Each remote has same-domain Rust service/BFF. Claim corroborated structurally.

### 84. adx-core-final-sync-manager-summary.md:73

**Observation:** "**✅ Event Bus Communication:** Cross-micro-frontend coordination".

**Interpretation:** Claims inter-micro-frontend event-bus coordination. Mounted provider only propagates events within own React tree, DOM dispatch unreachable. Claim contradicted.

### 85. adx-core-final-sync-manager-summary.md:110

**Observation:** "**✅ Scalable Architecture:** Independent scaling of all services and micro-frontends".

**Interpretation:** Claims independent micro-frontend scaling. No artifact addresses per-application scaling. Claim uncorroborated.

### 86. adx-core/apps/shell/src/App.tsx:15

**Observation:** "// Dynamic imports for micro-frontends".

**Interpretation:** Announces dynamic micro-frontend loading in following lines. Claim corroborated.

### 87. adx-core/bff-services/auth-bff/README.md:3

**Observation:** "This service acts as a Temporal workflow client and provides optimized APIs for the Auth micro-frontend."

**Interpretation:** Links BFF/auth remote. BFF exists, remote does not use it. Claim partially corroborated.

### 88. adx-core/bff-services/file-bff/README.md:3

**Observation:** "This service acts as a Temporal workflow client and provides optimized APIs for file management micro-frontends."

**Interpretation:** Links BFF/file remote. BFF exists, remote does not use it. Claim partially corroborated.

### 89. adx-core/bff-services/module-bff/README.md:3

**Observation:** "This service acts as a Temporal workflow client and provides optimized APIs for the Module micro-frontend."

**Interpretation:** Links BFF/module remote. Remote calls BFF client through nonexistent package hook, BFF URL undefined. Claim partially corroborated.

### 90. adx-core/bff-services/tenant-bff/README.md:17-23

**Observation:** Diagram "Tenant Micro- Frontend (Port 3002) ◄──► Tenant BFF Service (Port 4002) ◄──► Backend Services".

**Interpretation:** Links BFF/tenant remote. BFF exists, remote does not use it. Claim partially corroborated.

### 91. adx-core/docs/README.md:107

**Observation:** "**Fault isolation** between applications".

**Interpretation:** Claims inter-application fault isolation. Shell has one `ErrorBoundary` around everything, remote routes without own boundary. Claim contradicted.

### 92. adx-core/docs/developer-guide/module-federation.md:26-27

**Observation:** Diagram "Shared Dependencies │ React, React-DOM, Design System, Event Bus, Context".

**Interpretation:** Lists federation shared dependencies. Seven `vite.config.ts` declare as `singleton`. Claim corroborated.

### 93. adx-core/docs/developer-guide/module-federation.md:37

**Observation:** "**Shared Context**: Global state management for authentication, tenant, and theme".

**Interpretation:** Claims global inter-application state. Each unit mounts own locally stateful provider, event-synchronizing stores unreachable. Claim contradicted.

### 94. adx-core/docs/developer-guide/team-autonomy.md:342-373

**Observation:** "Each team maintains their own development environment" and tree `team-workspace/` (`backend-service/`, `frontend-app/ # React micro-frontend`, `bff-service/`, …).

**Interpretation:** Describes per-team repository. Snapshot organizes all in one repository by layer. Claim contradicted.

### 95. adx-core/docs/user-guide/README.md:44

**Observation:** "**Shell Application**: Main navigation and shared components".

**Interpretation:** Attributes common navigation to shell. Shell wraps remote routes in own navbar. Claim corroborated.

### 96. adx-core/packages/i18n/package.json:4

**Observation:** "Internationalization for ADX Core micro-frontends".

**Interpretation:** Presents package as micro-frontend internationalization. Only shell uses it, no remote shares it, inter-unit notification unused. Claim contradicted.

### 97. adx-core/services/module-service/docs/developer-portal.md:44

**Observation:** "**Frontend Components**: React components with Module Federation".

**Interpretation:** Claims third-party modules enter through Module Federation. Snapshot has neither artifact nor counter-artifact for mechanism. Claim uncorroborated.

### 98. 1705eaf 2025-08-13 (apps/auth, apps/tenant); 1920432 2025-08-16 (apps/file, apps/module, apps/user, apps/workflow); 683dec7 2025-08-28 (apps/, adx-core/apps/)

**Observation:** Through pre-snapshot commit each application at `apps/<app>` had `index.html`. Snapshot commit deletes tree/recreates `adx-core/apps/` without file, tenant, user and workflow `index.html`, missing some previously existing expose/import-requested components. Five exposed/imported names absent from every commit.

**Interpretation:** Gaps mostly caused by snapshot-commit application recreation rather than gradual abandonment. Point clarified, units remaining ambiguous in snapshot.

### 99. 7fac338 2025-08-13 (packages/event-bus/src/EventBus.tsx); 683dec7 2025-08-28 (adx-core/packages/event-bus/src/index.ts, providers/EventBusProvider.tsx)

**Observation:** `EventBus.tsx` unchanged since creation. Package entry rewritten/provider created in snapshot commit. Earlier entry version unavailable.

**Interpretation:** Unknown whether DOM event channel ever exported/used. Past-only question: channel unreachable in snapshot.

### 100. d4d1897 2025-08-16 (packages/i18n/src/hooks.ts); 683dec7 2025-08-28 (adx-core/packages/i18n/src/index.ts)

**Observation:** `hooks.ts` unchanged through snapshot. Package entry changed in snapshot commit, prior version unavailable.

**Interpretation:** Unknown whether language notification ever exported/used. Past-only question.

### 101. 7fac338 2025-08-13 (packages/shared-context/src/tenant-store.ts, theme-store.ts); 1920432 2025-08-16 (theme-store.ts); 683dec7 2025-08-28 (adx-core/packages/shared-context/src/index.ts, providers/)

**Observation:** Both stores unchanged since 2025-08-16. Package entry rewritten/providers created in snapshot commit. Prior entry version unavailable.

**Interpretation:** Unknown whether stores ever exported/used. Past-only question.

### 102. 1920432 2025-08-16 (apps/); d4d1897 2025-08-16 (.github/workflows/deploy-microfrontends.yml, deploy-production.yml); 683dec7 2025-08-28 (adx-core/apps/)

**Observation:** Deployment workflows created when seven applications at `apps/<app>`, unchanged through snapshot. Snapshot commit moves applications to `adx-core/apps/` without workflow changes.

**Interpretation:** Workflows from prior stage. Point clarified, deployment remains undetermined.

### 103. 1705eaf 2025-08-13 (apps/<app>/src/services/<app>BFFClient.ts); 1920432 2025-08-16 (bff-services/*/README.md); 978acbf 2025-08-16 (bff-services/auth-bff/README.md); 683dec7 2025-08-28 (adx-core/packages/bff-client)

**Observation:** BFF READMEs from stage with own BFF client per application. Snapshot commit deletes six clients/creates `bff-client` package unimported by remotes.

**Interpretation:** README/snapshot mismatch results from replacing clients with package. Point clarified.

### 104. 7fac338 2025-08-13 (apps/shell/src/App.tsx, ErrorBoundary.tsx); 1920432 2025-08-16 (apps/shell/src/App.tsx); d4d1897 2025-08-16 (docs/README.md, docs/developer-guide/module-federation.md); 683dec7 2025-08-28 (adx-core/apps/shell/src/App.tsx)

**Observation:** Guides unchanged through snapshot. Shell `App.tsx` rewritten in snapshot commit, earlier versions unavailable.

**Interpretation:** Unknown whether shell had per-route `ErrorBoundary`. Past-only question: no snapshot isolation.

### 105. d4d1897 2025-08-16 (docs/developer-guide/team-autonomy.md)

**Observation:** Autonomy guide content unchanged through snapshot. No commit path contains `team-workspace`, `frontend-app` or `auth-frontend`.

**Interpretation:** Per-team structure is no prior repository stage. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (adx-core/apps/auth/package.json:41) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 2 | 3.4.2 (adx-core/apps/file/package.json:26) | 1 technology | manifest | module-federation | technological | weak | declares #9 |
| 3 | 3.4.2 (adx-core/apps/module/package.json:39) | 1 technology | manifest | module-federation | technological | weak | declares #10 |
| 4 | 3.4.2 (adx-core/apps/shell/package.json:40) | 1 technology | manifest | module-federation | technological | weak | declares #11; declares #15; declares #16; declares #17; declares #18; declares #19; declares #20 |
| 5 | 3.4.2 (adx-core/apps/tenant/package.json:36) | 1 technology | manifest | module-federation | technological | weak | declares #12 |
| 6 | 3.4.2 (adx-core/apps/user/package.json:26) | 1 technology | manifest | module-federation | technological | weak | declares #13 |
| 7 | 3.4.2 (adx-core/apps/workflow/package.json:26) | 1 technology | manifest | module-federation | technological | weak | declares #14 |
| 8 | 3.4.2 (adx-core/apps/auth/package.json:41, Evidence); 3.4.3 (adx-core/apps/auth, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:16, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #16, #21, #25 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #42; configures #59 |
| 9 | 3.4.2 (adx-core/apps/file/package.json:26, Evidence); 3.4.3 (adx-core/apps/file, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:18, Observation); 3.4.5 #3 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #17, #21 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #43; configures #61 |
| 10 | 3.4.2 (adx-core/apps/module/package.json:39, Evidence); 3.4.3 (adx-core/apps/module, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:21, Observation); 3.4.5 #6 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #44; configures #64 |
| 11 | 3.4.2 (adx-core/apps/shell/package.json:40, Evidence); 3.4.3 (adx-core/apps/shell, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:16 through :21, Observation); 3.4.5 #1, #2, #3, #4, #5, #6 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #11, #21 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #45; configures #59; configures #60; configures #61; configures #62; configures #63; configures #64 |
| 12 | 3.4.2 (adx-core/apps/tenant/package.json:36, Evidence); 3.4.3 (adx-core/apps/tenant, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:17, Observation); 3.4.5 #2 (Configuration); 3.4.6 #5 (Artifacts); 3.4.7 #19 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #46; configures #60 |
| 13 | 3.4.2 (adx-core/apps/user/package.json:26, Evidence); 3.4.3 (adx-core/apps/user, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:19, Observation); 3.4.5 #4 (Configuration); 3.4.6 #6 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #47; configures #62 |
| 14 | 3.4.2 (adx-core/apps/workflow/package.json:26, Evidence); 3.4.3 (adx-core/apps/workflow, Markers and Build); 3.4.4 (adx-core/apps/shell/src/App.tsx:20, Observation); 3.4.5 #5 (Configuration); 3.4.6 #7 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #48; configures #63 |
| 15 | 3.4.4 (adx-core/apps/shell/src/App.tsx:16) | 3 code | source code | module-federation | architectural | strong | implements #59 |
| 16 | 3.4.4 (adx-core/apps/shell/src/App.tsx:17) | 3 code | source code | module-federation | architectural | strong | implements #60 |
| 17 | 3.4.4 (adx-core/apps/shell/src/App.tsx:18) | 3 code | source code | module-federation | architectural | strong | implements #61 |
| 18 | 3.4.4 (adx-core/apps/shell/src/App.tsx:19) | 3 code | source code | module-federation | architectural | strong | implements #62 |
| 19 | 3.4.4 (adx-core/apps/shell/src/App.tsx:20) | 3 code | source code | module-federation | architectural | strong | implements #63 |
| 20 | 3.4.4 (adx-core/apps/shell/src/App.tsx:21) | 3 code | source code | module-federation | architectural | strong | implements #64 |
| 21 | 3.4.4 (adx-core/packages/event-bus/src/EventBus.tsx:49) | 3 code | source code | events | technological | weak | — |
| 22 | 3.4.4 (adx-core/packages/i18n/src/hooks.ts:19) | 3 code | source code | events | technological | weak | — |
| 23 | 3.4.4 (adx-core/packages/shared-context/src/tenant-store.ts:77) | 3 code | source code | events | technological | weak | — |
| 24 | 3.4.4 (adx-core/packages/shared-context/src/theme-store.ts:33) | 3 code | source code | events | technological | weak | — |
| 25 | 3.4.4 (adx-core/packages/shared-context/src/theme-store.ts:142) | 3 code | source code | events | technological | weak | — |
| 26 | 3.4.4 (adx-core/packages/shared-context/src/theme-store.ts:162) | 3 code | source code | events | technological | weak | — |
| 27 | 3.4.4 (tests/desktop/tauri-integration.test.ts:129) | 3 code | source code | — | context | weak | — |
| 28 | 3.4.4 (tests/desktop/tauri-integration.test.ts:132) | 3 code | source code | — | context | weak | — |
| 29 | 3.4.4 (tests/mobile/android-integration.test.ts:89) | 3 code | source code | — | context | weak | — |
| 30 | 3.4.4 (tests/mobile/android-integration.test.ts:189) | 3 code | source code | — | context | weak | — |
| 31 | 3.4.4 (tests/mobile/android-integration.test.ts:240) | 3 code | source code | — | context | weak | — |
| 32 | 3.4.4 (tests/mobile/android-integration.test.ts:241) | 3 code | source code | — | context | weak | — |
| 33 | 3.4.4 (tests/mobile/android-integration.test.ts:256) | 3 code | source code | — | context | weak | — |
| 34 | 3.4.4 (tests/mobile/android-integration.test.ts:257) | 3 code | source code | — | context | weak | — |
| 35 | 3.4.4 (tests/mobile/ios-integration.test.ts:170) | 3 code | source code | — | context | weak | — |
| 36 | 3.4.4 (tests/mobile/ios-integration.test.ts:171) | 3 code | source code | — | context | weak | — |
| 37 | 3.4.4 (tests/mobile/ios-integration.test.ts:186) | 3 code | source code | — | context | weak | — |
| 38 | 3.4.4 (tests/mobile/ios-integration.test.ts:187) | 3 code | source code | — | context | weak | — |
| 39 | 3.4.4 (tests/mobile/ios-integration.test.ts:231) | 3 code | source code | — | context | weak | — |
| 40 | 3.4.4 (adx-core/apps/shell/src/App.tsx:46) | 3 code | source code | module-federation | architectural | strong | implements #59; implements #60; implements #61; implements #62; implements #63; implements #64 |
| 41 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 42 | 3.4.3 (adx-core/apps/auth) | 4 structure | directory | — | architectural | moderate | — |
| 43 | 3.4.3 (adx-core/apps/file) | 4 structure | directory | — | architectural | ambiguous | — |
| 44 | 3.4.3 (adx-core/apps/module) | 4 structure | directory | — | architectural | ambiguous | — |
| 45 | 3.4.3 (adx-core/apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 46 | 3.4.3 (adx-core/apps/tenant) | 4 structure | directory | — | architectural | ambiguous | — |
| 47 | 3.4.3 (adx-core/apps/user) | 4 structure | directory | — | architectural | ambiguous | — |
| 48 | 3.4.3 (adx-core/apps/workflow) | 4 structure | directory | — | architectural | ambiguous | — |
| 49 | 3.4.3 (adx-core/bff-services/auth-bff) | 4 structure | directory | — | context | weak | — |
| 50 | 3.4.3 (adx-core/bff-services/file-bff) | 4 structure | directory | — | context | weak | — |
| 51 | 3.4.3 (adx-core/bff-services/module-bff) | 4 structure | directory | — | context | weak | — |
| 52 | 3.4.3 (adx-core/bff-services/tenant-bff) | 4 structure | directory | — | context | weak | — |
| 53 | 3.4.3 (adx-core/packages/bff-client) | 4 structure | directory | — | context | weak | — |
| 54 | 3.4.3 (adx-core/packages/design-system) | 4 structure | directory | — | context | weak | — |
| 55 | 3.4.3 (adx-core/packages/event-bus) | 4 structure | directory | — | context | weak | — |
| 56 | 3.4.3 (adx-core/packages/i18n) | 4 structure | directory | — | context | weak | — |
| 57 | 3.4.3 (adx-core/packages/shared-context) | 4 structure | directory | — | context | weak | — |
| 58 | 3.4.3 (tools/kiro-github-task-sync) | 4 structure | directory | — | context | weak | — |
| 59 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #45; links #42 |
| 60 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #45; links #46 |
| 61 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #45; links #43 |
| 62 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #45; links #47 |
| 63 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #45; links #48 |
| 64 | 3.4.5 #6 | 5 composition | source code | module-federation | architectural | strong | links #45; links #44 |
| 65 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #42 |
| 66 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #43 |
| 67 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #44 |
| 68 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #45 |
| 69 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #46 |
| 70 | 3.4.6 #6 | 6 build-deploy | configuration | — | architectural | moderate | publishes #47 |
| 71 | 3.4.6 #7 | 6 build-deploy | configuration | — | architectural | moderate | publishes #48 |
| 72 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #42; corroborates #45; corroborates #59; corroborates #60; corroborates #61; corroborates #62; corroborates #63; corroborates #64 |
| 73 | 3.4.7 #2 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #7; corroborates #59; corroborates #60; corroborates #61; corroborates #62; corroborates #63; corroborates #64 |
| 74 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | partially corroborates #65; partially corroborates #66; partially corroborates #67; partially corroborates #68; partially corroborates #69; partially corroborates #70; partially corroborates #71; partially corroborates adx-core/apps/auth/index.html:10-11 |
| 75 | 3.4.7 #4 | 7 documentation | documentation | — | context | weak | partially corroborates #49; partially corroborates #50; partially corroborates #51; partially corroborates #52; partially corroborates adx-core/apps/module/src/components/ModuleMarketplace.tsx:4, 48 |
| 76 | 3.4.7 #5 | 7 documentation | documentation | — | technological | weak | corroborates adx-core/apps/shell/src/App.tsx:5-6; corroborates adx-core/apps/auth/src/App.tsx:5-6; corroborates adx-core/apps/tenant/src/App.tsx:5-6; corroborates adx-core/apps/file/src/App.tsx:5-6; corroborates adx-core/apps/user/src/App.tsx:5-6; corroborates adx-core/apps/workflow/src/App.tsx:5-6; corroborates adx-core/apps/module/src/App.tsx:5-6 |
| 77 | 3.4.7 #6 | 7 documentation | documentation | — | context | weak | — |
| 78 | 3.4.7 #7 | 7 documentation | documentation | — | technological | weak | corroborates adx-core/apps/shell/src/App.tsx:4; corroborates adx-core/apps/auth/src/App.tsx:4; corroborates adx-core/apps/tenant/src/App.tsx:4; corroborates adx-core/apps/file/src/App.tsx:4, 7; corroborates adx-core/apps/user/src/App.tsx:4, 7; corroborates adx-core/apps/workflow/src/App.tsx:4, 7; corroborates adx-core/apps/module/src/App.tsx:4 |
| 79 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | — |
| 80 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | partially corroborates #65; partially corroborates #66; partially corroborates #67; partially corroborates #68; partially corroborates #69; partially corroborates #70; partially corroborates #71 |
| 81 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | — |
| 82 | 3.4.7 #11 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #11; corroborates #59; corroborates #60; corroborates #61; corroborates #62; corroborates #63; corroborates #64 |
| 83 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates adx-core/Cargo.toml:4-8, 11; corroborates #49; corroborates #50; corroborates #51; corroborates #52; corroborates #59; corroborates #60; corroborates #61; corroborates #62; corroborates #63; corroborates #64 |
| 84 | 3.4.7 #13 | 7 documentation | documentation | events | architectural | weak | contradicts #21; contradicts adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:26-55; contradicts adx-core/apps/auth/src/App.tsx:31; contradicts adx-core/apps/shell/src/App.tsx:40 |
| 85 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | — |
| 86 | 3.4.7 #15 | 7 documentation | comment | — | architectural | weak | corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #19; corroborates #20 |
| 87 | 3.4.7 #16 | 7 documentation | documentation | — | context | weak | partially corroborates #49 |
| 88 | 3.4.7 #17 | 7 documentation | documentation | — | context | weak | partially corroborates #50 |
| 89 | 3.4.7 #18 | 7 documentation | documentation | — | context | weak | partially corroborates #51; partially corroborates adx-core/apps/module/src/components/ModuleMarketplace.tsx:4, 48, 63, 69, 76 |
| 90 | 3.4.7 #19 | 7 documentation | documentation | — | context | weak | partially corroborates #52 |
| 91 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | contradicts adx-core/apps/shell/src/App.tsx:35, 45-55, 65; contradicts adx-core/apps/shell/src/components/ErrorBoundary.tsx:39-74; contradicts adx-core/apps/file/src/App.tsx:22-41 |
| 92 | 3.4.7 #21 | 7 documentation | documentation | module-federation | technological | weak | corroborates #8; corroborates #9; corroborates #10; corroborates #11; corroborates #12; corroborates #13; corroborates #14 |
| 93 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | contradicts adx-core/packages/shared-context/src/providers/SharedContextProvider.tsx:10-19; contradicts adx-core/packages/shared-context/src/providers/TenantProvider.tsx:33-34; contradicts adx-core/apps/shell/src/App.tsx:39; contradicts adx-core/apps/auth/src/App.tsx:30; contradicts #23; contradicts #24 |
| 94 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | contradicts #41; contradicts #42; contradicts #45; contradicts #49; contradicts #50; contradicts #51; contradicts #52; contradicts adx-core/Cargo.toml:2-15 |
| 95 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates adx-core/apps/shell/src/App.tsx:43; corroborates adx-core/apps/shell/src/components/Navigation.tsx:25-30, 74; corroborates adx-core/apps/shell/src/components/UserMenu.tsx:23 |
| 96 | 3.4.7 #25 | 7 documentation | comment | — | technological | weak | contradicts adx-core/apps/shell/src/App.tsx:8; contradicts #8; contradicts #22 |
| 97 | 3.4.7 #26 | 7 documentation | documentation | module-federation | technological | weak | — |
| 98 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #43; explains #44; explains #46; explains #47; explains #48; explains #74 |
| 99 | 3.4.8 #2 | 8 history | history | events | technological | weak | explains #21; explains #84 |
| 100 | 3.4.8 #3 | 8 history | history | events | technological | weak | explains #22; explains #96 |
| 101 | 3.4.8 #4 | 8 history | history | events | technological | weak | explains #23; explains #24; explains #25; explains #26; explains #93 |
| 102 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #65; explains #66; explains #67; explains #68; explains #69; explains #70; explains #71; explains #80 |
| 103 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #75; explains #87; explains #88; explains #89; explains #90 |
| 104 | 3.4.8 #7 | 8 history | history | — | architectural | weak | explains #91 |
| 105 | 3.4.8 #8 | 8 history | history | — | architectural | weak | explains #94 |

## Summary

Observations: 105. Dimensions (technology: 7, configuration: 7, code: 26, structure: 18, composition: 6, build-deploy: 7, documentation: 26, history: 8). Strength (strong: 14, moderate: 15, weak: 71, ambiguous: 5). Evidence (technological: 28, architectural: 46, context: 31).

