---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| frontend/vite/host | frontend/vite/host/package.json;frontend/vite/host/vite.config.js | frontend/vite/host/package.json | frontend/vite/host/index.html:11 (`<script type="module" src="/src/main.js">`); frontend/vite/host/src/main.js:24-40 (`createApp(App)` with router and `app.mount('#app')`) | frontend/vite/host/vite.config.js:5-40 (own Vite configuration with `vue()` and `federation`); frontend/vite/host/package.json:8 (`vite build`) | — | config/nginx/Dockerfile:5 (copies `frontend/vite/host/dist`); config/nginx/nginx.conf:18-35 (server on port 3000 with `root /usr/share/nginx/html/host`) | Yes | Vue UI-mounting entry and its own Vite build. |
| frontend/vite/remote-inputs | frontend/vite/remote-inputs/package.json;frontend/vite/remote-inputs/vite.config.js | frontend/vite/remote-inputs/package.json | frontend/vite/remote-inputs/index.html:11 (`<script type="module" src="/src/main.js">`; `src/main.js` has 0 bytes); frontend/vite/remote-inputs/vite.config.js:16-18 (`exposes` `./InputsContainer`) | frontend/vite/remote-inputs/vite.config.js:5-32 (own Vite configuration with `vue()` and `federation`); frontend/vite/remote-inputs/package.json:8 (`vite build`) | — | config/nginx/Dockerfile:6 (copies `frontend/vite/remote-inputs/dist`); config/nginx/nginx.conf:37-53 (server on port 3001 with `root /usr/share/nginx/html/remote-inputs`) | Undetermined | Own build, but the `index.html` entry is an empty file and nothing in the directory starts the UI on its own; the UI is only provided through the exposed module. |
| frontend/vite/remote-results | frontend/vite/remote-results/package.json;frontend/vite/remote-results/vite.config.js | frontend/vite/remote-results/package.json | frontend/vite/remote-results/index.html:11 (`<script type="module" src="/src/main.js">`; `src/main.js` has 0 bytes); frontend/vite/remote-results/vite.config.js:16-18 (`exposes` `./ResultsContainer`) | frontend/vite/remote-results/vite.config.js:5-32 (own Vite configuration with `vue()` and `federation`); frontend/vite/remote-results/package.json:8 (`vite build`) | — | config/nginx/Dockerfile:7 (copies `frontend/vite/remote-results/dist`); config/nginx/nginx.conf:55-71 (server on port 3002 with `root /usr/share/nginx/html/remote-results`) | Undetermined | Own build, but the `index.html` entry is an empty file and nothing in the directory starts the UI on its own; the UI is only provided through the exposed module. |

## Summary

Frontend applications in the snapshot: 1 (frontend/vite/host).

## Notes

- The classification records `frontend_units: 3` (host and two remotes). The difference comes from the remotes: the host mounts `InputsContainer` and `ResultsContainer` through federated imports (frontend/vite/host/src/pages/MainPage.vue:6-7 and :23-24), but the remotes have no `createApp`/`mount` (grep in `src/` and `index.html`) and their `src/main.js` files are empty. `Undetermined` follows the case of an empty entry module without standalone startup (039, 272) and concerns building/serving the directory on its own, not its role as a remote, which is addressed by the composition review (protocol section 3.4.5).
- Deployment is a single nginx container for the three units (config/docker-compose.yaml:38-52), with one `dist` and server per unit; `config/frontend/Dockerfile` is empty (0 bytes).
- The three `package.json` files are marked `workspace-config` in `artifacts.csv`, but none declares `workspaces`; each package has its own `package-lock.json`.
