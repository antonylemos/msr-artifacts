---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-cross-unit-communication | analytics-dashboard/public/workers/filterWorker.js:7 | analytics-dashboard | none | No | `self.postMessage(logs)` from a log filtering Web Worker (`self.onmessage`, analytics-dashboard/public/workers/filterWorker.js:2), returning the result to its own main thread; not inter-unit communication. The file is also unused: no code references `filterWorker` or `workers/`, and the page creates the worker from an inline Blob (analytics-dashboard/src/app/page.tsx:46-50) |
| src-cross-unit-communication | analytics-dashboard/public/workers/filterWorker.js:23 | analytics-dashboard | none | No | `self.postMessage(filteredLogs)` from the same unused Web Worker (see analytics-dashboard/public/workers/filterWorker.js:7); worker → main thread message within the unit |
| src-cross-unit-communication | analytics-dashboard/src/app/page.tsx:30 | analytics-dashboard | none | No | `self.postMessage(logs)` within string `workerCode` (analytics-dashboard/src/app/page.tsx:26-43), code of the inline Web Worker instantiated at analytics-dashboard/src/app/page.tsx:50; the response returns to `setFilteredLogs` on the same page (analytics-dashboard/src/app/page.tsx:52-54). Internal to the unit |
| src-cross-unit-communication | analytics-dashboard/src/app/page.tsx:41 | analytics-dashboard | none | No | `self.postMessage(filtered)` from the same inline worker (analytics-dashboard/src/app/page.tsx:26-43); worker → page message, internal to the unit |
| src-cross-unit-communication | analytics-dashboard/src/app/page.tsx:97 | analytics-dashboard | none | No | `workerRef.current.postMessage({ logs: tableLogs, searchTerm })` sends logs to the page’s own inline Web Worker (`new Worker(workerUrl)` at analytics-dashboard/src/app/page.tsx:50); does not involve another unit |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | host-shell/next.config.ts:10 | host-shell | host-relationship | Yes | `async rewrites()` declares which applications host-shell uses and under which paths (`beforeFiles`): `/analytics`, `/analytics/api/metrics`, `/analytics/:path` and `/analytics-assets/_next/:path*` to `ANALYTICS_URL` (host-shell/next.config.ts:14-33), `/workspace`, `/workspace/:path*` and `/workspace-assets/_next/:path*` to `WORKSPACE_URL` (host-shell/next.config.ts:35-46). `ANALYTICS_URL` and `WORKSPACE_URL` are `PRODUCTION_*_URL` or `http://localhost:3001` and `http://localhost:3002` (host-shell/next.config.ts:3-6), the ports of analytics-dashboard (analytics-dashboard/package.json:6) and workspace-document (workspace-document/package.json:6), responding at those paths through `basePath`/`assetPrefix` (analytics-dashboard/next.config.ts:5-6, workspace-document/next.config.ts:5,7). Config exported as `nextConfig` at host-shell/next.config.ts:52 |

## Summary

Constructs participating in composition: 1 (host-relationship: 1).

## Notes

- Researcher decision (24/10/2026), valid for all repositories: when the host’s `rewrites()` declares a remote app under a path (`cfg-route-rewrites` in `matches.csv`), option B decided in 013-nikJovanovic__ita-vaje applies; host-shell/next.config.ts:10 therefore entered as a manual `host-relationship` / `Yes` row despite being a `cfg-route-rewrites` occurrence in `matches.csv`.
- The five `src-cross-unit-communication` rows are false positives: `postMessage` between the analytics-dashboard page and a filtering Web Worker. Multi-zone composition appears in `cfg-*` occurrences: `cfg-route-rewrites` at host-shell/next.config.ts:10 and `cfg-zone-path` at analytics-dashboard/next.config.ts:5-6 and workspace-document/next.config.ts:5,7.
- The step 4 search (`import(`, `React.lazy`, `dynamic(`, `loadRemote*`, `customElements`, `registerApplication`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`, `localStorage`, `document.cookie`) found no loading, mounting, embedding or communication between units. The `indexedDB` at workspace-document/src/utils/indexedDB.ts:11 stores the unit’s own draft, and `EventSource("/analytics/api/metrics")` (analytics-dashboard/src/app/page.tsx:68) talks to the unit’s own API route (analytics-dashboard/src/app/api/metrics/route.ts).
- Navigation between zones uses full-page links: `<a href={link.path}>` with `/analytics` and `/workspace` at host-shell/src/components/GlobalNavbar.tsx:10-14,41-43 and `<Link href={app.path}>` at host-shell/src/app/page.tsx:11,19,74-75. Navigation links are not among the step 4 types, so they did not become rows.
