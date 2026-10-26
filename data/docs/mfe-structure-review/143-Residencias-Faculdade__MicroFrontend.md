---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:34 (`<script type="module" src="/src/main.ts">`, directory’s Vite entry) | vite.config.ts:5-14 (`defineConfig`, `outDir: 'dist'`) + package.json:8 (`"build": "tsc && vite build"`) | — | Dockerfile:1-18 (`npm run build` and serves `dist/` with Nginx); docker-compose.yml:4-7 (`shell` service, `context: .`) | Yes | Vite shell with its own entry in `index.html` and its own build. |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 2`: the root shell and the external unit `member-manager`, loaded from `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6). The external unit is not in the snapshot and does not become a row.
- `docker-compose.yml:19-22` declares the `posts-crud` service with `context: ../Caio/aprendendo/primeiro-projeto`, outside the repository; it is not a snapshot unit.
- `Dockerfile.keycloak` and the `keycloak` service (docker-compose.yml:34-35) belong to the identity provider, not frontend.
- `package.json` and `tsconfig.json` appear as `workspace-config` in `artifacts.csv`, but `package.json:1-24` does not declare `workspaces`; the only `ws-*` occurrence is the path alias `tsconfig.json:11` (`paths`), which is not a workspace declaration.
