---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
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

# 059 — Efraim0601/union-portal

## Repository overview

Angular CLI workspace. The three frontend applications share root manifest and lockfile (package.json:1-17), installed once for all three builds (Dockerfile:13-14, 20-22); the only other manifest is backend `server/diaspora-otp`, with its own lockfile (server/diaspora-otp/package.json:2-3; deploy/test/Dockerfile.otp:7). Each application (`shell`, `promote`, `diaspora`) is an `angular.json` project with its own `build` target, using the Native Federation builder over an `esbuild` target (for example: angular.json:52-64, 76-80). Root scripts trigger builds individually (package.json:14, `build:all`). In development, each application runs its own `ng serve`: shell on port 4200, promote on 4201 and diaspora on 4202 (angular.json:139, 264, 391). Both remotes enable CORS (angular.json:267, 394) because shell, on another port, fetches their `remoteEntry.json`.

Deployment joins everything in a **single image**, described as a gateway that "sert shell + promote + diaspora" (**English translation:** "serves shell + promote + diaspora") at one origin (Dockerfile:1-3). The first stage installs dependencies once and runs all three builds, each with its own `base-href` (Dockerfile:13-14, 20-22). The second stage copies all three artifacts into the same nginx: shell at root and remotes at `/remotes/promote/` and `/remotes/diaspora/` (Dockerfile:38-41). Finally, replaces the development federation manifest with the production one (Dockerfile:42-43). Nginx serves each path (deploy/nginx.conf:2-4, 31-40) and sends everything else to shell’s `index.html` (deploy/nginx.conf:128-130). The same origin is an explicit choice: it allows sharing authentication `localStorage` without CORS (deploy/nginx.conf:5). The same nginx also proxies backend APIs (deploy/nginx.conf:72-123) and serves at root a copy of MediaPipe files living in diaspora’s build (deploy/nginx.conf:51-52). Both points couple applications within the image.

There are three ways to start this image, none separating the applications:
- **docker-compose.yml:** declares a single service, `union` (docker-compose.yml:18-23).
- **deploy/test/docker-compose.yml:** test stack with the same image as `gateway` (deploy/test/docker-compose.yml:15-19), plus two backends, `diaspora-otp` and `diaspora-ocr` (deploy/test/docker-compose.yml:32-48), with their own Dockerfiles (deploy/test/Dockerfile.otp:5-9; deploy/test/Dockerfile.ocr:5-12).
- **deploy/server/deploy.sh:** production script deploying the solution by components read from deploy/server/components.env (deploy/server/deploy.sh:35-40). For each, rebuilds the image and recreates the service (deploy/server/deploy.sh:130-153). The entire portal is one component, `union` (deploy/server/components.env:15, 61-73), alongside backends in other repositories (deploy/server/components.env:22-26, 35-39, 50-54). The deploy/server/stop.sh stops them through the same manifest (deploy/server/stop.sh:15-18, 26-34).

Script deploy/40-selfsigned-cert.sh, installed in the image (Dockerfile:34-36), generates the TLS certificate on container startup (deploy/40-selfsigned-cert.sh:16-27). There is no CI in the repository.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | projects/diaspora | separate | joint | `/remotes/diaspora/` in the image (Dockerfile:41; deploy/nginx.conf:37-40); `http://localhost:4202` in development (angular.json:391) | No | angular.json:305-317 (diaspora `build` target); Dockerfile:22 (`ng build diaspora --base-href /remotes/diaspora/`); Dockerfile:41 (copies build into the joint image); deploy/federation.manifest.prod.json:3 (production address) |
| 2 | projects/promote | separate | joint | `/remotes/promote/` in the image (Dockerfile:40; deploy/nginx.conf:31-34); `http://localhost:4201` in development (angular.json:264) | No | angular.json:178-190 (promote `build` target); Dockerfile:21 (`ng build promote --base-href /remotes/promote/`); Dockerfile:40 (copies build into the joint image); deploy/federation.manifest.prod.json:2 (production address) |
| 3 | projects/shell | separate | joint | `/` in the image (Dockerfile:38; deploy/nginx.conf:128-130); `http://localhost:4200` in development (angular.json:139) | No | angular.json:52-64 (shell `build` target); Dockerfile:20 (`ng build shell --base-href /`); Dockerfile:38 (copies build to image root); Dockerfile:43 (production manifest at shell root) |

## Observations

**1. projects/diaspora.** Build is separate: own `angular.json` target and own Dockerfile invocation, with `base-href` aligned to the serving path (Dockerfile:22). Deployment is joint: in observed deployment, the artifact is included in the portal image (Dockerfile:41), a single compose service and a single deploy.sh component (docker-compose.yml:19-23; deploy/server/components.env:65-70). No independent versioning observed. The shared manifest declares `version: 0.0.0` (package.json:3), without observed use of this field in application publication. Diaspora build also carries MediaPipe files served by nginx at root for both applications (deploy/nginx.conf:42-52), an inter-unit deployment dependency.

**2. projects/promote.** Same arrangement as diaspora: own target and invocation (angular.json:178-190; Dockerfile:21), artifact copied to `/remotes/promote/` in the same image (Dockerfile:40). No independent version.

**3. projects/shell.** Separate build (angular.json:52-64; Dockerfile:20), served at root of the same image (Dockerfile:38). Build is separate but source code is not isolated: shell styles include promote’s `styles.css` (angular.json:87-90). Shell receives the production manifest (Dockerfile:43). That manifest connects remote deployment paths to runtime loading; under the recorded deployment flow, changing the embedded manifest requires rebuilding and republishing the joint image (deploy/server/deploy.sh:153). No independent version observed.

## Summary

Applications: 3. Build (separate: 3). Deploy (joint: 3). Independent versioning: 0.
