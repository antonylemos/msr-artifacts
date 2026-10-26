---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Repository overview

npm workspaces monorepo (`apps/*`, `backend/services/nodejs/*`, `backend/services/python/*`, `packages/*`; package.json:5-10) orchestrated by Turbo: root `build` is only `turbo run build` (package.json:13), and Turbo task `build` writes to each package’s `dist/**` (turbo.json:6-9). All eight frontend applications use same recipe: script `build` with `tsc && vite build` (for example apps/shell/package.json:8) over own `vite.config.ts`, with plugin `@originjs/vite-plugin-federation` and `build: { target: "esnext", minify: false, cssCodeSplit: false }` (apps/shell/vite.config.ts:9-21, :56-60; apps/mfe-admin/vite.config.ts:8-22). Each remote generates own `remoteEntry.js` (for example apps/mfe-pet-profile/vite.config.ts:9-10), and shell fetches them at `http://localhost:3001` to `3007` (apps/shell/vite.config.ts:12-18), fixed addresses matching ports of each app’s scripts `dev` and `preview` (for example apps/mfe-pet-profile/package.json:7, :9). No production variant of these URLs exists.

The only frontend container artifact is for development. The `docker-compose.yml` starts two frontend services, `shell` on port 3000 and `mfe-auth` on 3001 (docker-compose.yml:11-16, :24-29), each with own Dockerfile. Both Dockerfiles are identical except directory and port: install dependencies only from app directory, copy code and `tsconfig.base.json`, and end in `CMD ["npm", "run", "dev", ...]`, Vite development server (apps/shell/Dockerfile:1-15; apps/mfe-auth/Dockerfile:1-15). Neither runs `vite build`. The mfe-auth `vite.config.ts` itself records this when enabling service worker in development: "The container serves `vite dev`" (apps/mfe-auth/vite.config.ts:47-49); directory `apps/mfe-auth/dev-dist/` (`registerSW.js`, `sw.js`, `workbox-*.js`) is this mode’s output, not production build. As in review of repository 208, an image only running development server does not count as deploy. Other six remotes (ports 3002 to 3007) have no compose service, so containerized shell would only reach them if started manually.

Remaining infrastructure is backend. All seven Node.js services have two-stage Dockerfiles compiling with `tsc` and running `node dist/server.js` (for example backend/services/nodejs/api-gateway/Dockerfile:1-20); both Python services use images `python:3.11-slim` with `uvicorn` (backend/services/python/ai-service/Dockerfile:1-7; backend/services/python/agent-service/Dockerfile:1). Compose starts them with Neo4j and MongoDB (docker-compose.yml:35-237). The `infra/gcp/cloudbuild.yaml`, not recorded by mining, builds and publishes only backend images to Artifact Registry, tagged with `$COMMIT_SHA` (infra/gcp/cloudbuild.yaml:1-59), and `infra/gcp/services.env.example` lists Cloud Run URLs only for these services (:1-8). No Cloud Build step covers frontend applications. Cloud Build is also inconsistent: uses service directory as context (infra/gcp/cloudbuild.yaml:7), but Node.js Dockerfiles copy paths relative to repository root (backend/services/nodejs/api-gateway/Dockerfile:3-4), as compose does with `context: .` (docker-compose.yml:36-38).

README cites "GCP (Cloud Run + Vertex AI + Cloud Build) + Firebase" and directory `infra/firebase/` (README.md:13, :50), absent from snapshot; instructs starting everything with `docker compose up --build` (README.md:67-71) and states application actually used is `apps/mfe-auth`, on port 3001, while "The shell + other MFEs are scaffold" (README.md:80). No CI workflow, hosting configuration or `ci-*` or `cfg-public-path` occurrences in `matches.csv` exist.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/mfe-admin | separate | not observed | `http://localhost:3007/assets/remoteEntry.js` (apps/shell/vite.config.ts:18), port only for `dev`/`preview` (apps/mfe-admin/package.json:7, :9) | No | apps/mfe-admin/package.json:8 (`tsc && vite build`); apps/mfe-admin/vite.config.ts:8-22 (remote `mfeAdmin`, `remoteEntry.js` and build options); package.json:13 (`turbo run build` triggers builds) |
| 2 | apps/mfe-auth | separate | not observed | `http://localhost:3001` (apps/mfe-auth/package.json:7, :9; apps/shell/vite.config.ts:12; apps/shell/src/App.tsx:12), served by development server in container (apps/mfe-auth/Dockerfile:13-15; docker-compose.yml:28-29) | No | apps/mfe-auth/package.json:8 (`tsc && vite build`); apps/mfe-auth/vite.config.ts:9-52 (remote `mfeAuth`, PWA and build options); apps/mfe-auth/Dockerfile:1-15 (image running `npm run dev`); docker-compose.yml:24-32 (service `mfe-auth`) |
| 3 | apps/mfe-pet-profile | separate | not observed | `http://localhost:3002/assets/remoteEntry.js` (apps/shell/vite.config.ts:13), port only for `dev`/`preview` (apps/mfe-pet-profile/package.json:7, :9) | No | apps/mfe-pet-profile/package.json:8 (`tsc && vite build`); apps/mfe-pet-profile/vite.config.ts:8-20 (remote `mfePetProfile`, `remoteEntry.js` and build options) |
| 4 | apps/mfe-risk-results | separate | not observed | `http://localhost:3004/assets/remoteEntry.js` (apps/shell/vite.config.ts:15), port only for `dev`/`preview` (apps/mfe-risk-results/package.json:7, :9) | No | apps/mfe-risk-results/package.json:8 (`tsc && vite build`); apps/mfe-risk-results/vite.config.ts:8-19 (remote `mfeRiskResults`, `remoteEntry.js` and build options) |
| 5 | apps/mfe-symptom-checker | separate | not observed | `http://localhost:3003/assets/remoteEntry.js` (apps/shell/vite.config.ts:14), port only for `dev`/`preview` (apps/mfe-symptom-checker/package.json:7, :9) | No | apps/mfe-symptom-checker/package.json:8 (`tsc && vite build`); apps/mfe-symptom-checker/vite.config.ts:8-19 (remote `mfeSymptom`, `remoteEntry.js` and build options) |
| 6 | apps/mfe-vaccination | separate | not observed | `http://localhost:3006/assets/remoteEntry.js` (apps/shell/vite.config.ts:17), port only for `dev`/`preview` (apps/mfe-vaccination/package.json:7, :9) | No | apps/mfe-vaccination/package.json:8 (`tsc && vite build`); apps/mfe-vaccination/vite.config.ts:8-19 (remote `mfeVaccination`, `remoteEntry.js` and build options) |
| 7 | apps/mfe-vet-discovery | separate | not observed | `http://localhost:3005/assets/remoteEntry.js` (apps/shell/vite.config.ts:16), port only for `dev`/`preview` (apps/mfe-vet-discovery/package.json:7, :9) | No | apps/mfe-vet-discovery/package.json:8 (`tsc && vite build`); apps/mfe-vet-discovery/vite.config.ts:8-20 (remote `mfeVetDiscover`, `remoteEntry.js` and build options) |
| 8 | apps/shell | separate | not observed | `http://localhost:3000` (apps/shell/package.json:7), served by development server in container (apps/shell/Dockerfile:13-15; docker-compose.yml:15-16) | No | apps/shell/package.json:8 (`tsc && vite build`); apps/shell/vite.config.ts:9-60 (host with remotes at `localhost`, PWA and build options); apps/shell/Dockerfile:1-15 (image running `npm run dev`); docker-compose.yml:11-21 (service `shell`) |

## Observations

**1. apps/mfe-admin.** Own build: script `tsc && vite build` (apps/mfe-admin/package.json:8) uses app configuration, generating `remoteEntry.js` for remote `mfeAdmin` (apps/mfe-admin/vite.config.ts:9-10); shell only consumes it at runtime (apps/shell/vite.config.ts:18), hence `separate`, even with Turbo triggering together (package.json:13). No Dockerfile, compose service or Cloud Build step covers app. Port 3007 appears only in scripts `dev` and `preview` (apps/mfe-admin/package.json:7, :9). The `version` `1.0.0` is unused for publication, and package is `private` (apps/mfe-admin/package.json:3-4).

**2. apps/mfe-auth.** Own build (apps/mfe-auth/package.json:8; apps/mfe-auth/vite.config.ts:9-52), with remote `mfeAuth` and PWA. One of two applications with own image and compose service (apps/mfe-auth/Dockerfile:1-15; docker-compose.yml:24-32), but image only installs dependencies, copies code and runs `npm run dev` on port 3001 (apps/mfe-auth/Dockerfile:7, :10, :15), without `vite build`; hence deploy `not observed`, rather than `separate`. PWA `devOptions` was enabled precisely because "The container serves `vite dev`" (apps/mfe-auth/vite.config.ts:47-49). According to README, this is application actually used, run alone on port 3001 (README.md:80), and shell redirects to it instead of federating it (apps/shell/src/App.tsx:8-13). The `version` `1.0.0` is unused in publication; package `private` (apps/mfe-auth/package.json:3-4).

**3. apps/mfe-pet-profile.** Same arrangement as application 1: own build (apps/mfe-pet-profile/package.json:8) with remote `mfePetProfile` (apps/mfe-pet-profile/vite.config.ts:9-10), consumed by shell at `localhost:3002` (apps/shell/vite.config.ts:13). No deployment artifact; port only in `dev` and `preview` (apps/mfe-pet-profile/package.json:7, :9). The `version` `1.0.0` is unused; package `private` (apps/mfe-pet-profile/package.json:3-4).

**4. apps/mfe-risk-results.** Own build (apps/mfe-risk-results/package.json:8) with remote `mfeRiskResults` (apps/mfe-risk-results/vite.config.ts:9-10), consumed at `localhost:3004` (apps/shell/vite.config.ts:15). No deployment artifact; port only in `dev` and `preview` (apps/mfe-risk-results/package.json:7, :9). The `version` `1.0.0` is unused; package `private` (apps/mfe-risk-results/package.json:3-4).

**5. apps/mfe-symptom-checker.** Own build (apps/mfe-symptom-checker/package.json:8) with remote `mfeSymptom` (apps/mfe-symptom-checker/vite.config.ts:9-10), consumed at `localhost:3003` (apps/shell/vite.config.ts:14). No deployment artifact; port only in `dev` and `preview` (apps/mfe-symptom-checker/package.json:7, :9). The `version` `1.0.0` is unused; package `private` (apps/mfe-symptom-checker/package.json:3-4).

**6. apps/mfe-vaccination.** Own build (apps/mfe-vaccination/package.json:8) with remote `mfeVaccination` (apps/mfe-vaccination/vite.config.ts:9-10), consumed at `localhost:3006` (apps/shell/vite.config.ts:17). No deployment artifact; port only in `dev` and `preview` (apps/mfe-vaccination/package.json:7, :9). The `version` `1.0.0` is unused; package `private` (apps/mfe-vaccination/package.json:3-4).

**7. apps/mfe-vet-discovery.** Own build (apps/mfe-vet-discovery/package.json:8) with remote `mfeVetDiscover` (apps/mfe-vet-discovery/vite.config.ts:9-10), consumed at `localhost:3005` (apps/shell/vite.config.ts:16). No deployment artifact; port only in `dev` and `preview` (apps/mfe-vet-discovery/package.json:7, :9). The `version` `1.0.0` is unused; package `private` (apps/mfe-vet-discovery/package.json:3-4).

**8. apps/shell.** Own build (apps/shell/package.json:8; apps/shell/vite.config.ts:9-60); remotes resolve at runtime through `localhost` URLs (apps/shell/vite.config.ts:12-18), so their code does not enter shell artifact. Like mfe-auth, has own image and compose service (apps/shell/Dockerfile:1-15; docker-compose.yml:11-21), but image runs `npm run dev` on port 3000 (apps/shell/Dockerfile:15), without build; hence deploy `not observed`. Shell `preview` fixes no port (apps/shell/package.json:9). The `version` `1.0.0` is unused in publication; package `private` (apps/shell/package.json:3-4).

## Summary

Applications: 8. Build (separate: 8). Deploy (not observed: 8). Independent versioning: 0.
