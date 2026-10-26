---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Workspace

`pnpm-workspace.yaml:1-5` (`packages`: `lib`, `app-1`, `app-2`, `host`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | — | No | pnpm workspace root: `package.json:8` (`pnpm -r run build`) only delegates to members, with neither entry nor build configuration of its own |
| app-1 | app-1/index.html;app-1/package.json;app-1/vite.config.ts | app-1/package.json | app-1/index.html:11 (`<script type="module" src="/src/main.ts">`); app-1/src/main.ts:13-21 (`createApp(App)` ... `app.mount("#app")`) | app-1/vite.config.ts:7-44; app-1/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:3 (`'app-1'`) | — | Yes | Vue application with its own `index.html` and Vite build (remote `remote-app1`) |
| app-2 | app-2/index.html;app-2/package.json;app-2/vite.config.ts | app-2/package.json | app-2/index.html:11 (`<script type="module" src="/src/main.ts">`); app-2/src/main.ts:33-37 (`createApp(App)` ... `app.mount("#app")`) | app-2/vite.config.ts:7-48; app-2/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:4 (`'app-2'`) | — | Yes | Vue application with `index.html`, its own router in standalone mode and its own Vite build (remote `remote-app2`) |
| host | host/index.html;host/package.json;host/vite.config.ts | host/package.json | host/index.html:10 (`<script type="module" src="/src/main.ts">`); host/src/main.ts:17-40 (`createApp(App)` ... `app.mount("#app")`) | host/vite.config.ts:7-50; host/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:5 (`'host'`) | — | Yes | Vue host application with its own `index.html` and Vite build |
| lib | lib/index.html;lib/package.json;lib/vite.config.ts | lib/package.json | lib/index.html:11 (`<script type="module" src="/src/main.ts">`); lib/src/main.ts:10-14 (`createApp(App)` ... `app.mount("#app")`) | lib/vite.config.ts:8-59; lib/package.json:11 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`'lib'`) | — | Yes | Has `index.html` mounting a demonstration `App.vue` and its own Vite build (remote `remote-lib`) |

## Summary

Frontend applications in the snapshot: 4 (app-1, app-2, host, lib).

## Notes

- N = 4 matches the classification’s `frontend_units: 4` (host, app-1, app-2, lib).
- `lib` mainly exposes shared components and services (`lib/vite.config.ts:21-25`: `./Confirm`, `./apiClient`, `./types`), but has its own entry that starts a UI (`lib/src/App.vue` opens the `Confirm` dialog) and its own build; therefore it does not fall under "library without an application entry".
- `matches.csv` has 1 `ws-workspaces` (pnpm-workspace.yaml:1, the workspace in the Workspace section), 8 `ops-cors` (for example app-1/vite.config.ts:37) and 1 `ci-workflow-file` (.github/workflows/node.js.yml). The only workflow, `.github/workflows/node.js.yml:20-23`, runs `pnpm install` and `pnpm build` for the entire workspace, not a directory; there is no Dockerfile or hosting configuration in the snapshot.
- `Api/` (.NET) is not in `units.csv` and is not frontend.
