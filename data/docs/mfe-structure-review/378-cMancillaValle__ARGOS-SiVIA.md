---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 378 — cMancillaValle/ARGOS-SiVIA

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| frontend | frontend/index.html | — | frontend/index.html:23-24 (HTML page with UI, Tailwind via CDN); frontend/dashboard.html:366-369 (loads `js/api.js`, `js/rbac.js`, `js/router.js` and the widget by URL) | — (static, no build) | — | — | Yes | Own HTML pages loading only static scripts and CDNs, without npm package imports; no build required. |
| frontend-hermes | frontend-hermes/index.html;frontend-hermes/package.json;frontend-hermes/vite.config.ts | frontend-hermes/package.json:1-31 (own package) | frontend-hermes/vite.config.ts:11-12 (`src/hermes-widget.tsx` build entry); frontend-hermes/src/hermes-widget.tsx:6, 27, 57-58 (mounts React with `createRoot` and registers `hermes-widget`) | frontend-hermes/vite.config.ts:10-16 (IIFE library build `hermes-widget.js`); frontend-hermes/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application encapsulated in a custom element, with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 2 (frontend, frontend-hermes).

## Notes

- The summary (2) matches the classification’s `frontend_units: 2`.
- `frontend-hermes/index.html:11` points to `/src/main.tsx`, which does not exist in the snapshot. This HTML is only for development `vite`; the build uses the library entry `src/hermes-widget.tsx` (`frontend-hermes/vite.config.ts:11-12`), which exists. Therefore the row remains `Yes`.
- No separate deployment: the same FastAPI serves the `frontend/` pages (`backend/main.py:257-278`, `292-293`) and the widget build at `/hermes/` (`backend/main.py:92`, `281-282`); `ngrok_tunnel.py:52-62` runs `npm run build` in `frontend-hermes` before starting. The only `ops-*` artifact (`docker-compose.yml:3-5`) is the Python backend service, which mounts the entire repository.
- `package-lock.json` at the root has no corresponding `package.json` and lists `"packages": {}`; it is not a workspace.
