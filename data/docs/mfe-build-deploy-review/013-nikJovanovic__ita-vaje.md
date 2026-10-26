---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Repository overview

There is no workspace: root `package.json` only declares `@biomejs/biome` (package.json:1-6). Each of the four Next.js apps (`shell`, `catalog-mfe`, `builds-mfe`, `auth-mfe`) has its own manifest and lockfile and the same `build: next build` script (for example: shell/package.json:7). Build generates a `standalone` server (for example: shell/next.config.ts:5). The zones’ `next.config.ts` files define the `assetPrefix` used by shell to forward assets (for example: catalog-mfe/next.config.ts:6).

Each app has its own three-stage Dockerfile: installs dependencies, runs `bun run build` and copies `.next/standalone`, `.next/static` and `public` to the final image, starting with `bun server.js` (for example: catalog-mfe/Dockerfile:1-20). Images differ only in exposed port: 3000 for shell, 3001 for catalog, 3002 for builds and 3003 for auth (shell/Dockerfile:25, catalog-mfe/Dockerfile:19, builds-mfe/Dockerfile:19, auth-mfe/Dockerfile:19). The shell Dockerfile receives zone addresses as build args (shell/Dockerfile:8-13), passed by compose (docker-compose.yml:199-202). Each zone’s address thus enters the shell build, where `rewrites()` is evaluated (shell/next.config.ts:6-9), and also enters as a runtime variable (docker-compose.yml:209-211).

The `docker-compose.yml` starts everything in a stack: Postgres, RabbitMQ, `grpcox`, the three services, both BFFs and the four apps, each as its own service with `build` from its directory (docker-compose.yml:157-158, 170-171, 183-184, 196-198). Shell depends on all three zones (docker-compose.yml:214-217) and is the entry on port 3000 (docker-compose.yml:205). This is a local execution stack with production images (`NODE_ENV=production`, for example: shell/Dockerfile:20). There is no hosting manifest, proxy in front of shell or image registry.

CI has one workflow per directory, triggered by `paths` for that directory (for example: .github/workflows/shell.yml:3-7). For all four frontends, the job installs, runs lint, build and tests (.github/workflows/shell.yml:24-32; those for `catalog-mfe`, `builds-mfe` and `auth-mfe` differ only in name, `paths` and `working-directory`). No workflow publishes an image or deploys, so CI supports separate builds rather than deployment.

Artifacts not covering frontend: the Dockerfiles of `parts-service`, `builds-service`, `users-service`, `web-bff` and `mobile-bff` (for example: web-bff/Dockerfile:1-21, users-service/Dockerfile:1-15), their compose services (docker-compose.yml:14-15, 33-34, 73-74, 101-102, 129-130), infrastructure services (docker-compose.yml:2-3, 58-59, 95-96) and test workflows for those directories (for example: .github/workflows/web-bff.yml:9-31; .github/workflows/users-service.yml:3-11, also triggered by `pull_request`). README says the zones are "deployed independently" (README.md:69).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | auth-mfe | separate | separate | `/auth` and `/auth-static/_next/*` through shell (shell/next.config.ts:23-28); `http://auth-mfe:3003` in compose (docker-compose.yml:211); port 3003 (docker-compose.yml:161) | No | auth-mfe/package.json:7 (`next build`); auth-mfe/next.config.ts:5-6 (`standalone`, `assetPrefix`); auth-mfe/Dockerfile:10, 15-20 (own build and image); docker-compose.yml:157-158 (service `auth-mfe`); .github/workflows/auth-mfe.yml:5-7, 15 (own CI, no deployment) |
| 2 | builds-mfe | separate | separate | `/builds` and `/builds-static/_next/*` through shell (shell/next.config.ts:17-22); `http://builds-mfe:3002` in compose (docker-compose.yml:210); port 3002 (docker-compose.yml:187) | No | builds-mfe/package.json:7 (`next build`); builds-mfe/next.config.ts:5-6 (`standalone`, `assetPrefix`); builds-mfe/Dockerfile:10, 15-20 (own build and image); docker-compose.yml:183-184 (service `builds-mfe`); .github/workflows/builds-mfe.yml:5-7, 15 (own CI, no deployment) |
| 3 | catalog-mfe | separate | separate | `/catalog` and `/catalog-static/_next/*` through shell (shell/next.config.ts:11-16); `http://catalog-mfe:3001` in compose (docker-compose.yml:209); port 3001 (docker-compose.yml:174) | No | catalog-mfe/package.json:7 (`next build`); catalog-mfe/next.config.ts:5-6 (`standalone`, `assetPrefix`); catalog-mfe/Dockerfile:10, 15-20 (own build and image); docker-compose.yml:170-171 (service `catalog-mfe`); .github/workflows/catalog-mfe.yml:5-7, 15 (own CI, no deployment) |
| 4 | shell | separate | separate | `/` on port 3000 (docker-compose.yml:205; shell/Dockerfile:25) | No | shell/package.json:7 (`next build`); shell/next.config.ts:5-30 (`standalone`, `rewrites`); shell/Dockerfile:8-16, 21-26 (build with zone addresses and own image); docker-compose.yml:196-202 (service `shell` with build args); .github/workflows/shell.yml:5-7, 15 (own CI, no deployment) |

## Observations

**1. auth-mfe.** Own build (auth-mfe/package.json:7; auth-mfe/Dockerfile:10), generating an image exclusively for it (auth-mfe/Dockerfile:12-20). Compose publishes it as its own service, built from `./auth-mfe` (docker-compose.yml:157-158), so deployment is `separate`. The user accesses it through shell at `/auth`, and assets at `/auth-static` (shell/next.config.ts:23-28; auth-mfe/next.config.ts:6). Port 3003 is also published directly (docker-compose.yml:161). Field `version: "0.1.0"` (auth-mfe/package.json:3) is used in no publication, and the app is `private` (auth-mfe/package.json:4), so Versioning is `No`.

**2. builds-mfe.** Same form as auth-mfe: own build and image (builds-mfe/Dockerfile:10, 12-20) and own compose service (docker-compose.yml:183-184). Served through shell at `/builds` (shell/next.config.ts:17-22), with assets at `/builds-static` (builds-mfe/next.config.ts:6). It shares BFF with the other apps (`WEB_BFF_URL`, docker-compose.yml:192), but that is backend rather than joint packaging. `version: "0.1.0"` unused (builds-mfe/package.json:3).

**3. catalog-mfe.** Same form: own build and image (catalog-mfe/Dockerfile:10, 12-20) and own compose service (docker-compose.yml:170-171). Served through shell at `/catalog` (shell/next.config.ts:11-16), with assets at `/catalog-static` (catalog-mfe/next.config.ts:6). `version: "0.1.0"` unused (catalog-mfe/package.json:3).

**4. shell.** Own build and image (shell/Dockerfile:16, 18-26) and own compose service (docker-compose.yml:196-198), on port 3000 (docker-compose.yml:205). Unlike zones, its build receives all three zone addresses (shell/Dockerfile:8-13; docker-compose.yml:199-202). The artifact does not contain zone code, but its routing depends on their locations. Still, each zone remains in a separate image and service, so deployment remains `separate`. The service waits for all three zones before starting (docker-compose.yml:214-217). `version: "0.1.0"` unused (shell/package.json:3).

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.
