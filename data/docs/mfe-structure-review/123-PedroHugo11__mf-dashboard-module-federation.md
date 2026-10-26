---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| mfe-counter | mfe-counter/index.html;mfe-counter/package.json;mfe-counter/vite.config.ts | mfe-counter/package.json:1-31 (own manifest) | mfe-counter/index.html:10-11 (`/src/main.tsx` entry); mfe-counter/src/main.tsx:4-6 (mounts `CounterWidget` with React) | mfe-counter/vite.config.ts:5-23 (own configuration); mfe-counter/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| mfe-weather | mfe-weather/index.html;mfe-weather/package.json;mfe-weather/vite.config.ts | mfe-weather/package.json:1-31 (own manifest) | mfe-weather/index.html:10-11 (`/src/main.tsx` entry); mfe-weather/src/main.tsx:4-6 (mounts `WeatherWidget` with React) | mfe-weather/vite.config.ts:5-23 (own configuration); mfe-weather/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| shell | shell/index.html;shell/package.json;shell/vite.config.ts | shell/package.json:1-31 (own manifest) | shell/index.html:10-11 (`/src/main.tsx` entry); shell/src/main.tsx:5-7 (mounts `App` with React) | shell/vite.config.ts:5-22 (own configuration); shell/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 3 (mfe-counter, mfe-weather, shell).

## Notes

- There is no `package.json` at the root or workspace declaration; the `workspace-config` items in `artifacts.csv` are each directory’s `package.json` and `tsconfig*.json`, without `workspaces`. `matches.csv` has no `ws-*`, `ops-*` or `ci-*` occurrences, and the snapshot has no Dockerfile, CI or hosting configuration.
- N = 3 matches the classification’s `frontend_units: 3`.
