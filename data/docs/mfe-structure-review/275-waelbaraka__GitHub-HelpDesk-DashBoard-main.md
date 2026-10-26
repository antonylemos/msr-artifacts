---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| Backend | Backend/package.json | Backend/package.json | — | — | — | — | No | Express/Prisma server (`main: index.js` in Backend/package.json:6; `express` in Backend/index.js:7), not frontend |
| Frontend | Frontend/index.html;Frontend/package.json;Frontend/vite.config.js | Frontend/package.json | Frontend/index.html:11 (`<script type="module" src="/src/main.jsx">`; `createRoot` in Frontend/src/main.jsx:26) | Frontend/vite.config.js:7-61 (`defineConfig` with `react()` and `federation`); Frontend/package.json:8 (`vite build`) | — | — | Yes | React + Vite host with its own entry and build |
| whatsapp-module-frontend | whatsapp-module-frontend/index.html;whatsapp-module-frontend/package.json;whatsapp-module-frontend/vite.config.js | whatsapp-module-frontend/package.json | whatsapp-module-frontend/index.html:11 (`<script type="module" src="/src/main.jsx">`; `ReactDOM.createRoot` in whatsapp-module-frontend/src/main.jsx:6) | whatsapp-module-frontend/vite.config.js:7-61 (`defineConfig` with `react()` and `federation`); whatsapp-module-frontend/package.json:8 (`vite build --watch` with `vite preview --port 5001`) | — | — | Yes | React + Vite remote with its own entry and build |

## Summary

Frontend applications in the snapshot: 2 (Frontend, whatsapp-module-frontend).

## Notes

- N = 2 matches the classification’s `frontend_units: 2` (host `Frontend/` and remote `whatsapp-module-frontend/`).
- The only `ops-*`/`ci-*` occurrence in `matches.csv` is `ops-cors` in whatsapp-module-frontend/vite.config.js:55 (`cors: true` for the development server), which is not a deployment artifact. There is no Dockerfile, CI workflow or hosting configuration in the snapshot.
- The remote’s `build` script (whatsapp-module-frontend/package.json:8) runs `vite build --watch` together with `vite preview`; it remains the directory’s own Vite build.
