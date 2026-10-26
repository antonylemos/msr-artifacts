---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | src/frontend/apps/ui-catalog/vite.config.ts:37 | src/frontend/apps/ui-catalog | dynamic-loading | Yes | Plugin `remoteAppsPlugin` generates, for each `remotes.json` entry, ``Component: React.lazy(() => import("${app.scope}/${modulePath}"))`` (:32-39), meaning `import("merchantApp/App")` and `import("consumerApp/App")`, modules exposed as `"./App"` by remotes (src/frontend/apps/ui-catalog-merchant/vite.config.ts:19-21; src/frontend/apps/ui-catalog-consumer/vite.config.ts:19-21). The code goes to `src/remoteApps.generated.tsx` (src/frontend/apps/ui-catalog/vite.config.ts:27, :41-50), generated in `buildStart` (:57-59) and ignored by git (src/frontend/apps/ui-catalog/.gitignore:16), hence absent from the snapshot. Active: the plugin is in `plugins` (src/frontend/apps/ui-catalog/vite.config.ts:84), and `remoteApps` is imported at src/frontend/apps/ui-catalog/src/App.tsx:3. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/frontend/apps/ui-catalog/remotes.json:3 | src/frontend/apps/ui-catalog | host-relationship | Yes | Shell remote registry: `"scope": "merchantApp"` with `"url": "http://localhost:3001/assets/remoteEntry.js"`, `"module": "./App"` and `"route": "merchant"` (src/frontend/apps/ui-catalog/remotes.json:2-8), and `"scope": "consumerApp"` with `http://localhost:3002/assets/remoteEntry.js` and `"route": "consumer"` (:9-15). Ports 3001 and 3002 belong to ui-catalog-merchant (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9) and ui-catalog-consumer (src/frontend/apps/ui-catalog-consumer/vite.config.ts:9). The file is read by the shell’s `vite.config.ts` to assemble federation `remotes` (src/frontend/apps/ui-catalog/vite.config.ts:10-17, :85-89) and generate routes (:30). |
| manual | src/frontend/apps/ui-catalog/src/App.tsx:26 | src/frontend/apps/ui-catalog | runtime-composition | Yes | Renders `<Component />`, the lazy remote component of each `remoteApps` entry, inside `Suspense` in route `${route}/*` (src/frontend/apps/ui-catalog/src/App.tsx:14-28), meaning `merchant/*` → ui-catalog-merchant and `consumer/*` → ui-catalog-consumer, under `ShellLayout` (:12). Chain: src/frontend/apps/ui-catalog/index.html:11 → src/frontend/apps/ui-catalog/src/main.tsx:7-10 → `App`. The shell menu lists the same routes (src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:27-31). |

## Summary

Constructs participating in composition: 3 (dynamic-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notes

- The plugin-generated file (`remoteApps.generated.tsx`) is absent from the snapshot; the only `src-*` occurrence is the template at src/frontend/apps/ui-catalog/vite.config.ts:37.
- ui-catalog-merchant declares `name: "consumerApp"` in federation (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17), the same name as ui-catalog-consumer (src/frontend/apps/ui-catalog-consumer/vite.config.ts:17); shell references it as `merchantApp` through the port 3001 URL (src/frontend/apps/ui-catalog/remotes.json:3-4).
- Both remotes have a build plugin in watch mode making an HTTP request to `http://localhost:3000/__fullReload` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:24-45; src/frontend/apps/ui-catalog-consumer/vite.config.ts:24-45), handled by the shell development server (src/frontend/apps/ui-catalog/vite.config.ts:90-102). This is a development tool rather than runtime inter-application communication; it did not become a row.
- No communication mechanism between units (`CustomEvent`, `postMessage`, `BroadcastChannel`, `localStorage`) in the three apps’ code.
