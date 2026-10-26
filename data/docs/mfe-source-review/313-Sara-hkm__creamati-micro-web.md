---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-iframe | frontend/container/src/App.tsx:239 | frontend/container | embedding | Yes | Container `<iframe>` whose `src` selects, according to the active tab, the published URL of one of the four micro-frontends: `.../golden-sample-react-micro-web/user-management/`, `/data-grid/`, `/analytics/` and `/settings/` (frontend/container/src/App.tsx:240-245); the segments match the publication `destination_dir` values of units `frontend/user-management-app`, `frontend/data-grid-app`, `frontend/analytics-app` and `frontend/settings-app` (.github/workflows/deploy-all.yml:86-89 and 116). The frame is rendered only outside tab `home` (frontend/container/src/App.tsx:138 and 218), and tabs come from `menuItems` (frontend/container/src/App.tsx:12-18), triggered by `openMicroFrontend` (:8-10, :93, :158). Active: `App` is rendered by entry `frontend/container/src/index.tsx:4` and `:10-14`. |

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 1 (embedding: 1).

## Notes

- The `iframe` URLs point to `olivium-dev.github.io/golden-sample-react-micro-web/` (frontend/container/src/App.tsx:241-244) rather than this repository’s GitHub Pages (`Sara-hkm`), where snapshot workflows would publish; the paths match the four units’ publication destinations, so composition is `Yes` targeting those units, served from an external origin.
- The four micro-frontends have no composition construct: `App.tsx` only renders static content (for example: frontend/analytics-app/src/App.tsx:4-34); there is no `postMessage` or other communication between container and frames.
- The only `import()` in the units is the standard CRA `import('web-vitals')` at each app’s `src/reportWebVitals.ts:5`, internal to the unit; it does not become a row.
- `.cursor/templates/` (for example: `RemoteComponent.template.tsx`, `webpack.config.template.js`) are code generation templates, outside any structural review unit and unused by any build; they were not recorded.
