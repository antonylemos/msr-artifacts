---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | adx-core/apps/shell/src/App.tsx:16 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('auth_app/App'))` loads the `auth_app` remote (adx-core/apps/shell/vite.config.ts:12, `http://localhost:3001/assets/remoteEntry.js`), which is unit adx-core/apps/auth (`name: 'auth_app'`, `'./App': './src/App.tsx'` at adx-core/apps/auth/vite.config.ts:9,12); used in the `/auth/*` route at adx-core/apps/shell/src/App.tsx:48, with App mounted at adx-core/apps/shell/src/main.tsx:6-10 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:17 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('tenant_app/App'))` loads the `tenant_app` remote (adx-core/apps/shell/vite.config.ts:13), which is unit adx-core/apps/tenant (adx-core/apps/tenant/vite.config.ts:9,12); used in the `/tenant/*` route at adx-core/apps/shell/src/App.tsx:49 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:18 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('file_app/App'))` loads the `file_app` remote (adx-core/apps/shell/vite.config.ts:14), which is unit adx-core/apps/file (adx-core/apps/file/vite.config.ts:9,12); used in the `/files/*` route at adx-core/apps/shell/src/App.tsx:50 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:19 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('user_app/App'))` loads the `user_app` remote (adx-core/apps/shell/vite.config.ts:15), which is unit adx-core/apps/user (adx-core/apps/user/vite.config.ts:9,12); used in the `/users/*` route at adx-core/apps/shell/src/App.tsx:51 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:20 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('workflow_app/App'))` loads the `workflow_app` remote (adx-core/apps/shell/vite.config.ts:16), which is unit adx-core/apps/workflow (adx-core/apps/workflow/vite.config.ts:9,12); used in the `/workflows/*` route at adx-core/apps/shell/src/App.tsx:52 |
| src-remote-import | adx-core/apps/shell/src/App.tsx:21 | adx-core/apps/shell | dynamic-loading | Yes | `React.lazy(() => import('module_app/App'))` loads the `module_app` remote (adx-core/apps/shell/vite.config.ts:17), which is unit adx-core/apps/module (adx-core/apps/module/vite.config.ts:9,12); used in the `/modules/*` route at adx-core/apps/shell/src/App.tsx:53 |
| src-cross-unit-communication | adx-core/packages/event-bus/src/EventBus.tsx:49 | — | communication | No | `window.dispatchEvent(new CustomEvent('adx:'+eventType))` ("cross-micro-frontend communication", adx-core/packages/event-bus/src/EventBus.tsx:47-52), but the file is not reached by any unit: the package entry only exports `./providers/EventBusProvider` (adx-core/packages/event-bus/src/index.ts:2), whose `emit` does not dispatch a DOM event (adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:30-55); the only file importing `./EventBus` is adx-core/packages/event-bus/src/hooks.ts:2, also not exported by the entry |
| src-cross-unit-communication | adx-core/packages/i18n/src/hooks.ts:19 | — | communication | No | `window.dispatchEvent(new CustomEvent('adx-language-changed'))` in `changeLanguage` (adx-core/packages/i18n/src/hooks.ts:10-22), but the package entry only exports the i18next instance (adx-core/packages/i18n/src/index.ts:26) and no unit imports this hook: the shell uses `useTranslation` from `react-i18next` (adx-core/apps/shell/src/components/LanguageSelector.tsx:3,22); no listener for `adx-language-changed` in the snapshot |
| src-cross-unit-communication | adx-core/packages/shared-context/src/tenant-store.ts:77 | — | communication | No | `window.dispatchEvent(new CustomEvent('tenant:switched'))` after switching tenant (adx-core/packages/shared-context/src/tenant-store.ts:77-83), but `tenant-store.ts` is neither exported by the package entry (adx-core/packages/shared-context/src/index.ts:2-5) nor imported by providers (adx-core/packages/shared-context/src/providers/SharedContextProvider.tsx:2-4) or any unit |
| src-cross-unit-communication | adx-core/packages/shared-context/src/theme-store.ts:33 | — | communication | No | `window.dispatchEvent(new CustomEvent('theme:changed'))` in `setTheme` (adx-core/packages/shared-context/src/theme-store.ts:23-35), in the same `theme-store.ts` not exported by the entry (adx-core/packages/shared-context/src/index.ts:2-5) and not imported by any unit |
| src-cross-unit-communication | adx-core/packages/shared-context/src/theme-store.ts:142 | — | communication | No | `window.addEventListener('theme:changed', ...)` registered when the module loads (adx-core/packages/shared-context/src/theme-store.ts:131-147), in the same file unreachable from the package entry |
| src-cross-unit-communication | adx-core/packages/shared-context/src/theme-store.ts:162 | — | communication | No | `window.addEventListener('theme:changed', ...)` inside `useThemeSync` (adx-core/packages/shared-context/src/theme-store.ts:150-168); the hook is neither exported by the package entry nor used by any unit |
| src-cross-unit-communication | tests/desktop/tauri-integration.test.ts:129 | — | none | No | `new CustomEvent('tauri://deep-link')` created inside a Playwright test `page.evaluate` to simulate a Tauri deep link (tests/desktop/tauri-integration.test.ts:124-135); not a composition construct |
| src-cross-unit-communication | tests/desktop/tauri-integration.test.ts:132 | — | none | No | `window.dispatchEvent(event)` for the same event simulated in the test (tests/desktop/tauri-integration.test.ts:129-132) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:89 | — | none | No | `element.dispatchEvent(touchEvent)` simulates a touch gesture in a test (tests/mobile/android-integration.test.ts:85-89) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:189 | — | none | No | `window.dispatchEvent(new Event('orientationchange'))` simulates screen rotation in a test (tests/mobile/android-integration.test.ts:186-189) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:240 | — | none | No | `window.dispatchEvent(new Event('pagehide'))` simulates the app entering the background in a test (tests/mobile/android-integration.test.ts:239-241) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:241 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` from the same test scenario (tests/mobile/android-integration.test.ts:239-241) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:256 | — | none | No | `window.dispatchEvent(new Event('pageshow'))` simulates returning to the foreground in a test (tests/mobile/android-integration.test.ts:251-257) |
| src-cross-unit-communication | tests/mobile/android-integration.test.ts:257 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` from the same test scenario (tests/mobile/android-integration.test.ts:251-257) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:170 | — | none | No | `window.dispatchEvent(new Event('pagehide'))` simulates the app entering the background in a test (tests/mobile/ios-integration.test.ts:169-171) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:171 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` from the same test scenario (tests/mobile/ios-integration.test.ts:169-171) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:186 | — | none | No | `window.dispatchEvent(new Event('pageshow'))` simulates returning to the foreground in a test (tests/mobile/ios-integration.test.ts:180-187) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:187 | — | none | No | `document.dispatchEvent(new Event('visibilitychange'))` from the same test scenario (tests/mobile/ios-integration.test.ts:180-187) |
| src-cross-unit-communication | tests/mobile/ios-integration.test.ts:231 | — | none | No | `window.dispatchEvent(event)` from a `DeviceMotionEvent` simulated in a test (tests/mobile/ios-integration.test.ts:225-231) |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | adx-core/apps/shell/src/App.tsx:46 | adx-core/apps/shell | host-relationship | Yes | The `Routes` table declares which applications the shell uses and under which paths: `/auth/*` → `AuthApp`, `/tenant/*` → `TenantApp`, `/files/*` → `FileApp`, `/users/*` → `UserApp`, `/workflows/*` → `WorkflowApp`, `/modules/*` → `ModuleApp` (adx-core/apps/shell/src/App.tsx:46-55), the six components loaded from the remotes at adx-core/apps/shell/src/App.tsx:16-21; the router is mounted at adx-core/apps/shell/src/App.tsx:41 and App at adx-core/apps/shell/src/main.tsx:6-10 |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 6, host-relationship: 1).

## Notes

- Recurring false positive of `src-cross-unit-communication`: 13 of the 25 occurrences are in desktop and mobile Playwright tests (`tests/desktop/`, `tests/mobile/`), which simulate platform events (`pagehide`, `visibilitychange`, `orientationchange`, touch, `DeviceMotionEvent`) rather than communication between units.
- The three shared packages each contain the skeleton of an inter-unit channel (`adx:<evento>` at adx-core/packages/event-bus/src/EventBus.tsx:49, `adx-language-changed` at adx-core/packages/i18n/src/hooks.ts:19, `theme:changed` and `tenant:switched` at adx-core/packages/shared-context/src/theme-store.ts:33 and tenant-store.ts:77), but in all cases the file dispatching or listening for the event is neither exported by the package entry (adx-core/packages/event-bus/src/index.ts:2, adx-core/packages/i18n/src/index.ts:26, adx-core/packages/shared-context/src/index.ts:2-5) nor imported by any unit. There are two parallel event bus implementations in the same package, and the one the units receive (adx-core/packages/event-bus/src/providers/EventBusProvider.tsx:26-96) only propagates events within its own React tree.
- The `emit` actually used by a unit (adx-core/apps/module/src/components/ModuleMarketplace.tsx:49,74,79,85,87,93) comes from the `EventBusProvider` mounted by the unit itself at adx-core/apps/module/src/App.tsx:32, so it is internal to the unit; it therefore did not become a manual `communication` row.
- `@adx-core/event-bus`, `@adx-core/shared-context`, `@adx-core/design-system` and `@adx-core/i18n` are declared `singleton` in the shell’s `shared` (adx-core/apps/shell/vite.config.ts:40-52); in the remotes, `shared` declares `singleton` for `@adx-core/event-bus`, `@adx-core/shared-context` and `@adx-core/design-system` (for example: adx-core/apps/auth/vite.config.ts:23-25), and `@adx-core/i18n` is not included in any remote’s `shared`. This is the configuration of a shared channel; the conclusion above concerns the code rather than that configuration.
- The step 4 searches found no other loading, custom element, iframe or script injection in the units: the snapshot’s only `import()`/`React.lazy` is the shell’s, and the units’ `index.html` files only load their own `/src/main.tsx` (adx-core/apps/shell/index.html:11, adx-core/apps/auth/index.html:11, adx-core/apps/module/index.html:11).
- Consistent with the classification’s completeness caveat: the six remotes expose `./App` → `./src/App.tsx`, present in all of them; the missing exposed modules (`FileUpload`, `UserProfile`, `WorkflowList`, `TenantSwitcher`, etc.) are not loaded by any source code construct, only declared in `exposes`.
