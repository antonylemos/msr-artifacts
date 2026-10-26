---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 228 — Christian-Encalada/examen-microfrontend

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | @mf-types/AlertDashboard/apis.d.ts:3 | . | none | No | `typeof import('AlertDashboard/AlertDashboard')` is a conditional type in a generated Module Federation DTS declaration file (@mf-types/index.d.ts:1-26), used only by TypeScript through `paths` (tsconfig.json:15-17); loads nothing at runtime. Actual loading is the static import at src/App.tsx:4 (manual row at src/App.tsx:66). |
| src-remote-import | @mf-types/AlertDashboard/compiled-types/components/AlertDashboard.d.ts:1 | . | none | No | `import("react/jsx-runtime").JSX.Element` is only the return type in the generated declaration of component `AlertDashboard`; a pattern false positive. |
| src-remote-import | @mf-types/AlertSender/apis.d.ts:3 | . | none | No | `typeof import('AlertSender/AlertSender')` is a conditional type in a generated Module Federation DTS declaration file (@mf-types/index.d.ts:1-26), used only by TypeScript through `paths` (tsconfig.json:15-17); loads nothing at runtime. Actual loading is the static import at src/App.tsx:3 (manual row at src/App.tsx:63). |
| src-remote-import | @mf-types/AlertSender/compiled-types/components/AlertSender.d.ts:1 | . | none | No | `import("react/jsx-runtime").JSX.Element` is only the return type in the generated declaration of component `AlertSender`; a pattern false positive. |
| src-mount-export | src/types/federation.d.ts:2 | . | none | No | Signature `export function mount(el: HTMLElement)` within `declare module "Footer/Footer"` (src/types/federation.d.ts:1-5): only a type declaration without implementation. There is no `Footer` remote in host configuration (module-federation.config.ts:5-8) or `Footer/Footer` import in code. |
| src-mount-call | src/types/federation.d.ts:2 | . | none | No | The same line as above: a type signature `mount(el: HTMLElement)` in `declare module "Footer/Footer"` rather than a call; no code calls `mount`. |
| src-cross-unit-communication | alert-dashboard/src/components/AlertDashboard.tsx:103 | alert-dashboard | communication | Yes | `window.addEventListener('academic-alert', handleAlert)` in the component’s `useEffect` (alert-dashboard/src/components/AlertDashboard.tsx:97-108) receives the `CustomEvent` dispatched by unit alert-sender (alert-sender/src/components/AlertSender.tsx:72-80) and shows the `detail` (alert-dashboard/src/components/AlertDashboard.tsx:98-101). Active: the component is exposed (alert-dashboard/module-federation.config.ts:4-6) and rendered by the host at src/App.tsx:66, on the same page as AlertSender (src/App.tsx:63). |
| src-cross-unit-communication | alert-sender/src/components/AlertSender.tsx:72 | alert-sender | communication | Yes | `new CustomEvent('academic-alert', { detail: { type, message, timestamp } })` created in `sendAlert` (alert-sender/src/components/AlertSender.tsx:71-81), called by buttons (alert-sender/src/components/AlertSender.tsx:87-95); the target is unit alert-dashboard, which listens for the event at alert-dashboard/src/components/AlertDashboard.tsx:103. Active: the component is exposed (alert-sender/module-federation.config.ts:4-6) and rendered by the host at src/App.tsx:63. |
| src-cross-unit-communication | alert-sender/src/components/AlertSender.tsx:80 | alert-sender | communication | Yes | `window.dispatchEvent(event)` dispatches the `CustomEvent` `academic-alert` created on line 72 (alert-sender/src/components/AlertSender.tsx:72-80) to unit alert-dashboard (alert-dashboard/src/components/AlertDashboard.tsx:103). Same mechanism as the preceding row. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/App.tsx:63 | . | runtime-composition | Yes | Renders `<AlertSender />`, a component of unit alert-sender, in the first host section (src/App.tsx:62-64); the component comes from static import `AlertSender/AlertSender` at src/App.tsx:3, resolved by remote `AlertSender@http://localhost:3001/remoteEntry.js` (module-federation.config.ts:6) and exposed at alert-sender/module-federation.config.ts:4-6. App is loaded by src/index.ts:1 and rendered at src/App.tsx:72-74. |
| manual | src/App.tsx:66 | . | runtime-composition | Yes | Renders `<AlertDashboard />`, a component of unit alert-dashboard, in the second host section (src/App.tsx:65-67); the component comes from static import `AlertDashboard/AlertDashboard` at src/App.tsx:4, resolved by remote `AlertDashboard@http://localhost:3002/remoteEntry.js` (module-federation.config.ts:7) and exposed at alert-dashboard/module-federation.config.ts:4-6. App is loaded by src/index.ts:1 and rendered at src/App.tsx:72-74. |

## Summary

Constructs participating in composition: 5 (communication: 3, runtime-composition: 2).

## Notes

- The four `@mf-types/` rows are type declarations generated by Module Federation DTS; they load nothing. The `loadRemote` declarations at @mf-types/index.d.ts:8-25 are also only declarations and did not become rows.
- `src/types/federation.d.ts` declares a `Footer/Footer` module corresponding to no remote in the snapshot; it appears to be a remnant of another project and does not participate in composition.
- The `import("./App")` calls at src/index.ts:1, alert-sender/src/index.ts:1 and alert-dashboard/src/index.ts:1 are internal to their own units and did not become rows.
- Communication between alert-sender and alert-dashboard only works when both are on the same page, as happens in the host (src/App.tsx:62-67); each remote running alone (alert-sender/src/App.tsx:4-10, alert-dashboard/src/App.tsx:4-10) lacks the other event side.
- The step 4 search found no custom elements, iframes, `postMessage`, `BroadcastChannel`, `localStorage`, `loadRemote` calls or script injection.
