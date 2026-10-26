---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-lifecycles | src/main.ts:13 | . | runtime-composition | Yes | `registerApplication({ name: 'menu', app: () => import(env.VITE_MENU), activeWhen: '/' })` (src/main.ts:13-17, `registerApplication` imported from `single-spa` at src/main.ts:3) registers in root config the external `menu` microfrontend, outside the snapshot, active on all routes; mounts on the page’s `#single-spa-application:menu` node (index.html:12). The file is the unit entry (index.html:20). |
| src-lifecycles | src/main.ts:21 | . | runtime-composition | Yes | `registerApplication({ name: 'base', app: () => import(env.VITE_BASE), activeWhen: '/' })` (src/main.ts:21-25) registers the external `base` microfrontend, outside the snapshot, also active at `/`; mounts on node `#single-spa-application:base` (index.html:17). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/main.ts:15 | . | dynamic-loading | Yes | `app: () => import(/* @vite-ignore */ env.VITE_MENU)` loads at runtime the external `menu` microfrontend’s lifecycles through the URL in variable `VITE_MENU` (src/main.ts:7), which in the snapshot appears only at `.envtest:8` (`http://localhost:9083/src/index.ts`). |
| manual | src/main.ts:23 | . | dynamic-loading | Yes | `app: () => import(/* @vite-ignore */ env.VITE_BASE)` loads at runtime the external `base` microfrontend’s lifecycles through the `VITE_BASE` URL, defined in the snapshot only at `.envtest:11` (`http://localhost:9081/src/index.ts`). |
| manual | src/main.ts:29 | . | runtime-composition | Yes | `start()` from single-spa (imported at src/main.ts:3) starts the orchestrator; without it, the registrations at src/main.ts:13-17 and :21-25 do not mount `menu` or `base`. |

## Summary

Constructs participating in composition: 5 (runtime-composition: 3, dynamic-loading: 2).

## Notes

- The two target units (`menu` and `base`) are outside the snapshot; the repository contains only root config (structural review 176, unit `.`).
- The microfrontend URLs come from `import.meta.env` (src/main.ts:7). The only snapshot file defining them is `.envtest` (`.envtest:8` and `:11`); the comment at src/main.ts:5-6 indicates `.env` / `.env.local`, absent from the snapshot. This does not change the answer: each registration’s target is named (`menu`, `base`) and the registrations are in the unit entry.
- The `#single-spa-application:menu` and `#single-spa-application:base` nodes (index.html:12 and :17) are the registrations’ mounting points and appear in their observations; they did not become separate rows.
- The step 4 search in snapshot files (except `package-lock.json`) found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<script>` injection, `loadRemote*`, `initFederation`, `registerRemotes` or `System.import`; the only `import()` calls are at src/main.ts:15 and :23.
