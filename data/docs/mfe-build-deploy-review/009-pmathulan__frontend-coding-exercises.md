---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
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

# 009 — pmathulan/frontend-coding-exercises

## Repository overview

Technical assessment exercise repository, each exercise in a folder with its own README (README.md:1-11). The exercises do not form a single application. The only composed set is `microfrontend-workspace`, an Angular CLI workspace with `shell`, `mfe1` and library `shared`, sharing the folder’s `package.json` (microfrontend-workspace/package.json:5-11). Shell and mfe1 have their own `build` targets with `ngx-build-plus` and separate outputs, `dist/shell` and `dist/mfe1` (microfrontend-workspace/angular.json:18-23, 126-131). Library `shared` is packaged with `ng-packagr` (microfrontend-workspace/angular.json:228-231) and reaches applications through an alias for `./dist/shared` (see the composition review). The other exercises are isolated applications: `angular-frontend-practical` and `ssr-app`, Angular with SSR (for example: ssr-app/angular.json:18-20, 38-40), and `react-performance-practical`, using Vite. Folder `rate-limited-scheduler` is TypeScript without UI.

No application has its own Dockerfile, CI or hosting configuration. The only mining `ops-*` occurrences are in folder `spa-helm/`, a generic Helm chart "for deploying a frontend SPA" (spa-helm/Chart.yaml:1-4). The chart has Deployment, Service, Ingress and a job clearing Cloudflare cache after each upgrade (spa-helm/templates/deployment.yaml:1-27; spa-helm/templates/service.yaml:1-13; spa-helm/templates/ingress.yaml:1-27; spa-helm/templates/post-upgrade-hook.yaml:1-32), plus common labels at spa-helm/templates/_helpers.tpl:1-8. There are no `ci-*` or `cfg-public-path` occurrences. Values are templates: image `dockerhub-username/spa-image:latest` and host `spa.example.com` (spa-helm/values.yaml:3-5, 17-18). Nothing connects the chart to a folder: no Dockerfile generates the image and no README mentions it.

The two SSR exercises provide a script running the already built Node server (`serve:ssr:*`, for example: ssr-app/package.json:10). The ssr-app README only describes generic deployment strategies (ssr-app/README.md:44-57) and cites a `dist/angular-optimized-ssr` that does not match project output `dist/ssr-app` (ssr-app/README.md:51; ssr-app/angular.json:20).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | angular-frontend-practical | separate | Undetermined | — | No | angular-frontend-practical/angular.json:17-22 (target `build`, output `dist/angular-frontend-practical`); angular-frontend-practical/package.json:7 (`ng build`); spa-helm/Chart.yaml:1-4 (generic chart unconnected to the folder) |
| 2 | microfrontend-workspace/projects/mfe1 | separate | Undetermined | `http://localhost:4201` in development (microfrontend-workspace/angular.json:191) | No | microfrontend-workspace/angular.json:125-131 (target `build`, output `dist/mfe1`); microfrontend-workspace/angular.json:150 (own webpack); spa-helm/Chart.yaml:1-4 (generic chart unconnected to the folder) |
| 3 | microfrontend-workspace/projects/shell | separate | Undetermined | `http://localhost:4200` in development (microfrontend-workspace/angular.json:83) | No | microfrontend-workspace/angular.json:17-23 (target `build`, output `dist/shell`); microfrontend-workspace/angular.json:42 (own webpack); spa-helm/Chart.yaml:1-4 (generic chart unconnected to the folder) |
| 4 | react-performance-practical | separate | Undetermined | — | No | react-performance-practical/vite.config.ts:6-11 (Vite configuration); react-performance-practical/package.json:8 (`tsc -b && vite build`); spa-helm/Chart.yaml:1-4 (generic chart unconnected to the folder) |
| 5 | ssr-app | separate | Undetermined | — | No | ssr-app/angular.json:17-22 (target `build`, output `dist/ssr-app`); ssr-app/package.json:7 (`ng build`); spa-helm/Chart.yaml:1-4 (generic chart unconnected to the folder) |

## Observations

**1. angular-frontend-practical.** Independent Angular project, with its own manifest, lockfile and build, and SSR. Deploy is `Undetermined` only because of the generic chart, which could serve any repository SPA or none (see the Recorded decision). Version `0.0.0` is unused.

**2. microfrontend-workspace/projects/mfe1.** Own target and output within the workspace, with the same dependency installation as shell. This is shell’s remote and serves its `remoteEntry.js` on port 4201 in development. Workspace `run:all` starts both development servers together (microfrontend-workspace/package.json:10). There is no publication.

**3. microfrontend-workspace/projects/shell.** Same arrangement, port 4200. The host only points to mfe1 at `localhost` (see the composition review). There is no production remote configuration.

**4. react-performance-practical.** Independent Vite project with its own build. Version `0.0.0` is unused.

**5. ssr-app.** Angular project with SSR, its own build and a script running the built server (ssr-app/package.json:10). README describes deployment only in generic terms (ssr-app/README.md:44-57).

## Summary

Applications: 5. Build (separate: 5). Deploy (Undetermined: 5). Independent versioning: 0.

## Recorded decision

Chart `spa-helm/` is a generic deployment artifact unconnected to any folder (placeholder image, no Dockerfile, no README mention). Researcher decision (2026-10-21): `Undetermined` for all five applications because an artifact exists whose relationship to them is unresolved in the snapshot (ambiguous evidence), rather than an absent artifact. Mining began covering chart folders with other names (recorded in the original project document `docs/mfe-config-revisions.md`, not included in this package).
