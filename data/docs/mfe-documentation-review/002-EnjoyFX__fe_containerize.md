---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 002 — EnjoyFX/fe_containerize

## Repository overview

Documentation is in Ukrainian, with diagrams in English, and consists of three `.md` files:
- **README.md:** overview, with architecture diagram and service table.
- **README.docker-compose.md:** Docker Compose deployment, structure, local development and production notes.
- **helm/README.md:** deployment on k3s with Helm, with cluster diagram and per-service redeployment.

Artifacts cited by previous reviews have few comments:
- Dockerfiles only mark stages ("Build stage", "Production stage");
- helm/build-and-deploy.sh describes the script steps;
- frontend/nginx.conf explains the micro-frontend proxy.

Other cited artifacts have no architecture comments: Vite configurations, docker-compose.yml, the Helm chart and frontend and microfrontend code. The frontend's `App.jsx` embeds copies of project files as text displayed in the interface (e.g.: frontend/src/App.jsx:122-124); this is demonstration content, not documentation.

Documentation describes the project as a four-service demonstration: frontend, backend, microfrontend and database. The microfrontend is a widget loaded at runtime and served internally behind the frontend proxy, with two deployment paths. All this matches previous reviews.

`doc-*` occurrences that did not become rows:
- **Folder structure and commands:** README.docker-compose.md:69, 98, 132 and 135; helm/README.md:78.
- **Diagram label:** README.md:20, within the repetition of claims 2 and 3.
- **Chart parameters:** helm/README.md:100, 110.
- **Cluster diagram:** helm/README.md:128, repeating claim 6.

The others are in claims 1, 2, 3, 4, 6, 8 and 10.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.docker-compose.md:3-8 | "Демо застосунок з 4 сервісів […] `microfrontend`: окремий React widget у форматі IIFE" (English translation: demonstration with four services; microfrontend is a separate React widget in IIFE format) | structure | corroborated | 3.4.3 (frontend and microfrontend `Yes`); microfrontend/vite.config.js:25-29; docker-compose.yml:2-46 |
| 2 | README.docker-compose.md:19 | "loads JS bundle at runtime" (frontend loads the microfrontend bundle at runtime) | composition | corroborated | 3.4.4 (frontend/src/RemoteWidget.jsx:8, `script-loading`); 3.4.5 #1; frontend/src/App.jsx:802 |
| 3 | README.docker-compose.md:21-24 | "Micro-frontend […] internal" (microfrontend is not exposed directly) | build-deploy | corroborated | 3.4.6 #2; docker-compose.yml:35-37; helm/fe-containerize/templates/microfrontend.yaml:43-56 |
| 4 | README.docker-compose.md:150-152 | "`frontend/vite.config.js` проксіює `/api` […] `/mfe` на `http://localhost:3001` […] `microfrontend/vite.config.js` проксіює `/api`" (English translation: in development, frontend Vite forwards `/mfe` to microfrontend, and both forward `/api` to backend) | build-deploy | corroborated | frontend/vite.config.js:8-10; microfrontend/vite.config.js:35-37 |
| 5 | README.docker-compose.md:158 | "`frontend/nginx.conf` проксіює `/api` до `backend:8000`" (English translation: frontend nginx forwards `/api` to backend) | build-deploy | corroborated | frontend/nginx.conf:45-46 |
| 6 | README.docker-compose.md:159 | "`frontend/nginx.conf` проксіює `/mfe` до `microfrontend:80`" (English translation: frontend nginx forwards `/mfe` to microfrontend) | build-deploy | corroborated | 3.4.5 #1 (Configuration); frontend/nginx.conf:57-58 |
| 7 | README.md:3-6 | "два варіанти деплою: Docker Compose […] k3s + Helm" (English translation: two deployment forms) | build-deploy | corroborated | 3.4.6 (Overview); docker-compose.yml:1-49; helm/fe-containerize/Chart.yaml:1-6 |
| 8 | README.md:32 | "`microfrontend` […] Незалежний widget" (English translation: independent widget) | independence | corroborated | 3.4.3 (microfrontend with its own entry point and build); microfrontend/index.html; microfrontend/src/main.jsx |
| 9 | frontend/nginx.conf:56 | "Proxy micro-frontend assets (no cache — bundle changes on redeploy)" (the micro-frontend bundle changes on each redeployment of it) | build-deploy | corroborated | 3.4.6 #2 (separate deployment); frontend/nginx.conf:61-62 |
| 10 | helm/README.md:47 | "microfrontend.yaml # MFE: Deployment + Service" (MFE has its own Deployment and Service on k3s) | build-deploy | corroborated | 3.4.6 #2; helm/fe-containerize/templates/microfrontend.yaml:1-56 |
| 11 | helm/README.md:154-158 | "Редеплой після змін у коді […] Один сервіс (наприклад frontend)" (English translation: redeployment of a single service) | build-deploy | corroborated | 3.4.6 #1-#2; helm/README.md:160-170; docker-compose.yml:35-41 |

## Observations

**1. README.docker-compose.md:3-8.** The four listed services match the four in compose. Frontend and microfrontend are the structural review's two `Yes` applications, and microfrontend is built as an IIFE library with global `MicroFrontendWidget`. Repetitions: README.md:3 and the service table (README.md:28-33).

**2. README.docker-compose.md:19.** The diagram shows the frontend loading the micro-frontend bundle at runtime. Frontend renders `RemoteWidget` with `/mfe/widget.iife.js` (frontend/src/App.jsx:802), and the component injects the script and mounts the widget through the global API (see the composition review). Repetition: README.md:17.

**3. README.docker-compose.md:21-24.** "internal" matches both arrangements. In compose, service `microfrontend` publishes no port (docker-compose.yml:35-37). In Helm, it has a Service but no Ingress (helm/fe-containerize/templates/microfrontend.yaml:43-56). Repetitions: README.md:19-23 and README.docker-compose.md:156.

**4. README.docker-compose.md:150-152.** In development, Vite's proxy plays nginx's role: frontend forwards `/api` to backend and `/mfe` to the microfrontend server on port 3001 (frontend/vite.config.js:8-10), and microfrontend also forwards `/api` to backend (microfrontend/vite.config.js:35-37). When running independently, microfrontend can reach backend through its own proxy. Integrated into frontend, its relative `/api` request (microfrontend/src/Widget.jsx:45) uses frontend's origin and passes through its proxy.

**5. README.docker-compose.md:158.** Frontend's nginx has route `/api/` with `proxy_pass http://backend:8000/api/` (frontend/nginx.conf:45-46). In production, microfrontend calls to `/api` reach backend through that same proxy, because it is served under frontend's origin.

**6. README.docker-compose.md:159.** Frontend's nginx has route `/mfe/` with `proxy_pass http://microfrontend:80/` (frontend/nginx.conf:57-58). Repetitions: README.md:30 ("проксює /api та /mfe", English translation: "proxies /api and /mfe", also repeating claim 5) and the cluster diagram (helm/README.md:117-133).

**7. README.md:3-6.** The repository includes both deployment paths: compose at the root and the Helm chart in `helm/`, with script helm/build-and-deploy.sh.

**8. README.md:32.** Microfrontend has its own page, entry point and build and runs independently in the development server (README.docker-compose.md:132-138). This supports "independente" (English translation: "independent") in the sense of running and being built independently.

**9. frontend/nginx.conf:56.** The comment assumes the micro-frontend is republished separately and therefore disables caching for this path (frontend/nginx.conf:61-62). Image and service separation recorded in the build and deployment review confirms this is possible.

**10. helm/README.md:47.** The chart has a Deployment and Service exclusively for microfrontend, with its own image (helm/fe-containerize/values.yaml:7).

**11. helm/README.md:154-158.** The README describes redeploying one service: rebuilding only `frontend`, importing only its image and recreating only its pods (helm/README.md:160-170). Because each service has its own `build` in compose, the same applies to microfrontend.

## Summary

Claims: 11 (corroborated: 11, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (structure: 1, composition: 1, build-deploy: 8, independence: 1).
