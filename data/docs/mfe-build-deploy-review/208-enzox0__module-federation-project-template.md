---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
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

# 208 — enzox0/module-federation-project-template

## Repository overview

pnpm/Turbo monorepo template with five React/Vite applications in `apps/`. Root build is `turbo run build` (package.json:12), executing each member’s `build` and saving each `dist/**` (turbo.json:5-8). Each application has the same script, `tsc && vite build` (for example apps/admin-mf/package.json:8), and its own `vite.config.ts` with federation plugin (for example apps/admin-mf/vite.config.ts:6-13). The `scripts/build-all.sh:3` only repeats `pnpm build`.

Packaging uses a Dockerfile per application, all identical except copied directory. Stage `builder` installs dependencies and runs `pnpm build` across entire workspace (apps/admin-mf/Dockerfile:1-7). Final stage is an `nginx:alpine` image receiving only application’s own `dist` and exposing port 80 (apps/admin-mf/Dockerfile:9-12). Shell also has two Dockerfiles in `infrastructure/docker/`. Production file repeats app file and adds `infrastructure/nginx/nginx.conf` (infrastructure/docker/production/Dockerfile.shell:9-13), an SPA configuration with fallback to `index.html` (infrastructure/nginx/nginx.conf:13-17). Development file runs `pnpm dev` in shell directory, port 3000 (infrastructure/docker/development/Dockerfile.shell:7-9), and does not count as deploy. No docker-compose or other artifact builds or starts these images.

Remaining infrastructure is a skeleton. CI runs `pnpm build` and `pnpm lint` across entire workspace, publishing nothing (.github/workflows/ci.yml:23-28), and `lint.yml` only runs lint (.github/workflows/lint.yml:18-21). CD triggers on tags `v*`, but deploy step only prints "Deploying..." (.github/workflows/cd.yml:3-6, 14-15), as does `scripts/deploy.sh:2`. Kubernetes manifests, one per application, and AWS and Cloudflare Terraform files are only placeholder comments (infrastructure/kubernetes/shell/index.yaml:1; infrastructure/kubernetes/admin-mf/index.yaml:1; infrastructure/terraform/aws/index.tf:1; infrastructure/terraform/cloudflare/index.tf:1). The `.changeset/config.json:1-11` configures Changesets, but no script or job uses it to publish.

Images and host are inconsistent. Shell expects each remote at `http://localhost:300N/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:5-8). Images copy `dist` contents to nginx root (apps/auth-mf/Dockerfile:10) and listen on port 80 (apps/auth-mf/Dockerfile:11), so file would reside at `/assets/remoteEntry.js`, without prefix `/dist`, and on another port. Ports 3000 to 3004 belong to development servers (apps/auth-mf/vite.config.ts:14-17; check-ports.js:10-16). The `ops-cors` occurrences are these development servers’ `cors: true`, in each app’s `.ts` and compiled `.js` (for example apps/shell/vite.config.ts:16; apps/shell/vite.config.js:15). No build or deployment artifact covers packages in `packages/*`.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/admin-mf | separate | separate | image port 80 (apps/admin-mf/Dockerfile:11); `http://localhost:3003/dist/assets/remoteEntry.js`, as shell expects (apps/shell/module-federation.config.ts:7) | No | apps/admin-mf/package.json:8 (`tsc && vite build`); apps/admin-mf/vite.config.ts:6-13 (own configuration); apps/admin-mf/Dockerfile:1-12 (workspace build and nginx image containing only app `dist`) |
| 2 | apps/auth-mf | separate | separate | image port 80 (apps/auth-mf/Dockerfile:11); `http://localhost:3001/dist/assets/remoteEntry.js`, as shell expects (apps/shell/module-federation.config.ts:5) | No | apps/auth-mf/package.json:8 (`tsc && vite build`); apps/auth-mf/vite.config.ts:6-13 (own configuration); apps/auth-mf/Dockerfile:1-12 (workspace build and nginx image containing only app `dist`) |
| 3 | apps/dashboard-mf | separate | separate | image port 80 (apps/dashboard-mf/Dockerfile:11); `http://localhost:3002/dist/assets/remoteEntry.js`, as shell expects (apps/shell/module-federation.config.ts:6) | No | apps/dashboard-mf/package.json:8 (`tsc && vite build`); apps/dashboard-mf/vite.config.ts:6-13 (own configuration); apps/dashboard-mf/Dockerfile:1-12 (workspace build and nginx image containing only app `dist`) |
| 4 | apps/messaging-mf | separate | separate | image port 80 (apps/messaging-mf/Dockerfile:11); `http://localhost:3004/dist/assets/remoteEntry.js`, as shell expects (apps/shell/module-federation.config.ts:8) | No | apps/messaging-mf/package.json:8 (`tsc && vite build`); apps/messaging-mf/vite.config.ts:6-13 (own configuration); apps/messaging-mf/Dockerfile:1-12 (workspace build and nginx image containing only app `dist`) |
| 5 | apps/shell | separate | separate | image port 80 (apps/shell/Dockerfile:11; infrastructure/docker/production/Dockerfile.shell:12), path `/` (infrastructure/nginx/nginx.conf:10-17) | No | apps/shell/package.json:8 (`tsc && vite build`); apps/shell/vite.config.ts:6-13 (own configuration); apps/shell/Dockerfile:1-12 (nginx image containing only shell `dist`); infrastructure/docker/production/Dockerfile.shell:1-13 (shell nginx image with `nginx.conf`); infrastructure/nginx/nginx.conf:9-18 (SPA with fallback to `index.html`) |

## Observations

**1. apps/admin-mf.** Own build: script `tsc && vite build` (apps/admin-mf/package.json:8) uses app configuration (apps/admin-mf/vite.config.ts:6-13) and generates its `dist`. Dockerfile builds entire workspace (apps/admin-mf/Dockerfile:7), but final image carries only `apps/admin-mf/dist` (apps/admin-mf/Dockerfile:10), supporting `separate` deploy. Nothing in snapshot builds or starts this image: CD is an `echo` (.github/workflows/cd.yml:15) and app Kubernetes manifest is a placeholder (infrastructure/kubernetes/admin-mf/index.yaml:1). Address shell expects uses development port and prefix `/dist`, not reproduced by image (see "Repository overview"). Version `0.1.0` (apps/admin-mf/package.json:4) is unused for publication; package is `private` (apps/admin-mf/package.json:3).

**2. apps/auth-mf.** Same arrangement as admin-mf: own build (apps/auth-mf/package.json:8; apps/auth-mf/vite.config.ts:6-13) and nginx image containing only `apps/auth-mf/dist` (apps/auth-mf/Dockerfile:10). Kubernetes manifest is a placeholder (infrastructure/kubernetes/auth-mf/index.yaml:1). Shell expects it on port 3001 (apps/shell/module-federation.config.ts:5). No versioning used in publication.

**3. apps/dashboard-mf.** Same arrangement: own build (apps/dashboard-mf/package.json:8; apps/dashboard-mf/vite.config.ts:6-13) and nginx image containing only `apps/dashboard-mf/dist` (apps/dashboard-mf/Dockerfile:10). Placeholder Kubernetes manifest (infrastructure/kubernetes/dashboard-mf/index.yaml:1). Shell expects it on port 3002 (apps/shell/module-federation.config.ts:6). No versioning used in publication.

**4. apps/messaging-mf.** Same arrangement: own build (apps/messaging-mf/package.json:8; apps/messaging-mf/vite.config.ts:6-13) and nginx image containing only `apps/messaging-mf/dist` (apps/messaging-mf/Dockerfile:10). Placeholder Kubernetes manifest (infrastructure/kubernetes/messaging-mf/index.yaml:1). Shell expects it on port 3004 (apps/shell/module-federation.config.ts:8). No versioning used in publication.

**5. apps/shell.** Own build (apps/shell/package.json:8; apps/shell/vite.config.ts:6-13). The only application with two production images, both containing only `apps/shell/dist`: one from app directory (apps/shell/Dockerfile:10) and one from `infrastructure/docker/production`, adding SPA nginx configuration (infrastructure/docker/production/Dockerfile.shell:10-11; infrastructure/nginx/nginx.conf:13-17). Both publish shell separately, so deploy is `separate`. Development Dockerfile runs `pnpm dev` (infrastructure/docker/development/Dockerfile.shell:9) and does not count. Shell embeds remote `localhost` URLs in build (apps/shell/module-federation.config.ts:5-8), without production environment variable. No versioning used in publication.

## Summary

Applications: 5. Build (separate: 5). Deploy (separate: 5). Independent versioning: 0.
