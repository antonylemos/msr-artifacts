---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:32 (`<script type="module" src="/src/main.tsx">`, Vite entry); src/main.tsx:6-9 (`createRoot(...).render(<App .../>)`) | vite.config.ts:35-53 (`defineConfig`, with `plugins` and `build`) + package.json:57 (`"build": "tsc --project tsconfig.build.json && vite build"`) | — | Dockerfile:4, 23 and 31 (`builder` stage, `RUN yarn build`, copy of `dist/` to httpd); .github/workflows/docker-release-build.yml:42-46 (`docker/build-push-action` with `context: .` and `file: ./Dockerfile`) | Yes | Vite application with its own entry, its own build and Docker image. |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 2`: the host (root) and the `demo_plugin` plugin, built in another repository and referenced by `public/settings.example.json:15-22` and `server/e2e-settings.json:7-14`. The plugin is not in the snapshot as source and does not become a row; `server/e2e-plugin/main.js` is only the compiled bundle used in e2e tests.
- `server/` and `micro-frontend-tools/` have Node scripts (test and plugin servers) without their own `package.json` and do not appear in `units.csv`; they are not frontend.
- `package.json` appears as `workspace-config` in `artifacts.csv`, but does not declare `workspaces`, and there are no `ws-*` occurrences in `matches.csv`. The `yarn workspaces focus --production` in `Dockerfile:19` is a Yarn command, not a workspace declaration.
