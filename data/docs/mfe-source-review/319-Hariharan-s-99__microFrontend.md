---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 319 — Hariharan-s-99/microFrontend

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | home/src/index.ts:1 | home | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (home/src/index.ts:1); internal to home. |
| src-async-bootstrap | settings/src/index.ts:1 | settings | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (settings/src/index.ts:1); internal to settings. |
| src-mount-export | container/global.d.ts:3 | container | none | No | `export { mount }` within `declare module "home/app"` (container/global.d.ts:1-4): TypeScript type declaration, loads or mounts nothing at runtime. |
| src-mount-export | container/global.d.ts:8 | container | none | No | `export { mount }` within `declare module "settings/app"` (container/global.d.ts:6-9): type declaration without runtime effect. |
| src-mount-export | home/src/bootstrap.tsx:12 | home | runtime-composition | Yes | Exports `mount(element)`, which renders App on the received element (home/src/bootstrap.tsx:6-10); exposed as `./app` at home/module-federation.config.ts:4-5 (plugin at home/rspack.config.ts:94) and called by container at container/src/Home.tsx:8. |
| src-mount-export | settings/src/bootstrap.tsx:12 | settings | runtime-composition | Yes | Exports `mount(element)`, which renders App on the received element (settings/src/bootstrap.tsx:6-10); exposed as `./app` at settings/module-federation.config.ts:4-5 (plugin at settings/rspack.config.ts:93) and called by container at container/src/Settings.tsx:7. |
| src-mount-call | container/src/Home.tsx:8 | container | runtime-composition | Yes | Mounts remote home in the wrapper’s `div` (container/src/Home.tsx:6-13); remote declared at container/module-federation.config.ts:5; wrapper used at container/src/App.tsx:18 and :62, from entry container/src/index.ts:1. |
| src-mount-call | container/src/Settings.tsx:7 | container | runtime-composition | Yes | Mounts remote settings in the wrapper’s `div` (container/src/Settings.tsx:5-12); remote declared at container/module-federation.config.ts:4; wrapper used at container/src/App.tsx:19 and :63. |
| src-mount-import | container/src/Home.tsx:1 | container | runtime-composition | Yes | Imports `mount` from `home/app`, called at container/src/Home.tsx:8; `home` resolved to `http://localhost:8081/remoteEntry.js` at container/module-federation.config.ts:5. |
| src-mount-import | container/src/Settings.tsx:1 | container | runtime-composition | Yes | Imports `mount` from `settings/app`, called at container/src/Settings.tsx:7; `settings` resolved to `http://localhost:8082/remoteEntry.js` at container/module-federation.config.ts:4. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | container/src/App.tsx:17 | container | host-relationship | Yes | `Switch` declares routes `/mf1` → Home and `/mf2` → Settings (container/src/App.tsx:17-20), the wrappers mounting remotes home and settings (container/src/Home.tsx:8, container/src/Settings.tsx:7); App rendered at container/src/App.tsx:24-27, loaded by container/src/index.ts:1. |

## Summary

Constructs participating in composition: 7 (runtime-composition: 6, host-relationship: 1).

## Notes

- `advancedWebpack` has no composition construct: the step 4 search found no `import()`, `mount`, script loading, custom element, iframe or communication mechanism in advancedWebpack/.
- `TabBar` (container/src/App.tsx:29-67) also renders `<Home />` and `<Settings />` according to tab (container/src/App.tsx:62-63), in addition to the routes; these use the same wrapper and mount, so no separate row was added.
- No `unmount` call and no communication mechanism between units; wrappers pass `{}` as the second argument of `mount`, ignored by the remotes (home/src/bootstrap.tsx:6, settings/src/bootstrap.tsx:6).
