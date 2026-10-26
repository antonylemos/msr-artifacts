---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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

# 006 — Pandian-it/eager-workspace1

## Repository overview

Nx workspace with Angular: four applications (`shell`, `cart`, `checkout`, `orders`) and two libraries (`shared-lib`, `shared-ui`) in `projects/`. Each application has `project.json` with its own `build` target and output in `dist/<app>` (for example: projects/cart/project.json:19-24), plus a `package.json` with its own version (for example: projects/cart/package.json:2-3). Root `package.json` provides `nx build`/`nx serve` scripts (package.json:8-19) and only workspace version `0.0.0` (package.json:3).

What distinguishes the repository is the **per-application release** process in three GitHub Actions workflows:
- **User-Pull-Request.yml:** on each PR, detects projects affected through Nx, builds only those projects and generates a `patch` changeset for each (.github/workflows/User-Pull-Request.yml:43, 54, 57-70).
- **Initiate-Release.yml:** manually triggered, creates branch `release-*`, applies changesets to raise package versions and records in `deployment-manifest.json` each project’s version and the release introducing it (.github/workflows/Initiate-Release.yml:25-29, 51-61, 71-117).
- **Push-Event-To-Release.yml:** on a release branch push, repeats versioning and manifest updating when the commit is from a developer (.github/workflows/Push-Event-To-Release.yml:68-135). When the commit is from the bot, builds only affected applications (.github/workflows/Push-Event-To-Release.yml:140-146) and publishes each to S3 at `apps/<app>/<versão>` (.github/workflows/Push-Event-To-Release.yml:155-165). Finally, copies the manifest to `manifest/<release>/` (.github/workflows/Push-Event-To-Release.yml:167).

The versioned `deployment-manifest.json` records each project’s version and the release introducing it, including libraries (deployment-manifest.json:1-26). Checkout, orders and cart are in release `15.0.9`, and shell in `16.0.1`. Libraries also enter the publication loop when affected because they are Nx projects.

The manifest also connects deployment to production composition. Outside `localhost`, shell reads `deployment-manifest.json` at its own origin and assembles each remote URL as `<origem com www trocado por mfe>/apps/<app>/<versão>/remoteEntry.js` (projects/shell/src/app/manifest.service.ts:28-34, 50-58). There are two mismatches unresolved in the snapshot. First, the workflow publishes the manifest at `manifest/<release>/` rather than the root where shell looks for it. Second, nothing in the repository shows what serves shell at the domain root or domain `mfe`. File cloudfront-spa-config.md only documents error pages and a CloudFront function for SPA routing (cloudfront-spa-config.md:1-40), and there is no CloudFront configuration in the snapshot.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | projects/cart | separate | separate | `s3://static-app-601416097429/apps/cart/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `<origem mfe>/apps/cart/<versão>/remoteEntry.js` for shell (projects/shell/src/app/manifest.service.ts:57-58); `http://localhost:4201` in development (projects/cart/project.json:79) | Yes | projects/cart/project.json:19-24 (target `build`, output `dist/cart`); .github/workflows/Push-Event-To-Release.yml:143-145 (build per affected application); .github/workflows/Push-Event-To-Release.yml:158-162 (application sync to its version path); projects/cart/package.json:3 (version `1.0.5`); deployment-manifest.json:22-25 (version and release) |
| 2 | projects/checkout | separate | separate | `s3://static-app-601416097429/apps/checkout/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `<origem mfe>/apps/checkout/<versão>/remoteEntry.js` for shell (projects/shell/src/app/manifest.service.ts:57-58); `http://localhost:4202` in development (projects/checkout/project.json:88) | Yes | projects/checkout/project.json:20-25 (target `build`); .github/workflows/Push-Event-To-Release.yml:143-145; .github/workflows/Push-Event-To-Release.yml:158-162; projects/checkout/package.json:3 (version `2.0.4`); deployment-manifest.json:10-13 |
| 3 | projects/orders | separate | separate | `s3://static-app-601416097429/apps/orders/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `<origem mfe>/apps/orders/<versão>/remoteEntry.js` for shell (projects/shell/src/app/manifest.service.ts:57-58); `http://localhost:4203` in development (projects/orders/project.json:87) | Yes | projects/orders/project.json:19-24 (target `build`); .github/workflows/Push-Event-To-Release.yml:143-145; .github/workflows/Push-Event-To-Release.yml:158-162; projects/orders/package.json:3 (version `1.1.3`); deployment-manifest.json:14-17 |
| 4 | projects/shell | separate | separate | `s3://static-app-601416097429/apps/shell/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `http://localhost:4200` in development (projects/shell/project.json:87) | Yes | projects/shell/project.json:19-24 (target `build`); .github/workflows/Push-Event-To-Release.yml:143-145; .github/workflows/Push-Event-To-Release.yml:158-162; projects/shell/package.json:3 (version `1.0.7`); deployment-manifest.json:18-21 |

## Observations

**1. projects/cart.** Build and deployment follow the same per-application loop as the others: built and published only when Nx marks it affected, going to a path with its version. The version comes from its own package.json, increases through changesets and is recorded in the manifest (deployment-manifest.json:22-25: `1.0.5`, release `15.0.9`). This is the version used by shell to assemble the remote URL. The application is `Undetermined` in the structural review because the module used during bootstrap does not define how to start the UI. This affects isolated execution rather than build or publication, which are the same as the others.

**2. projects/checkout.** Same arrangement. Version `2.0.4` differs from the others (deployment-manifest.json:10-13), showing versions evolving independently per application.

**3. projects/orders.** Same arrangement, version `1.1.3` (deployment-manifest.json:14-17).

**4. projects/shell.** Published by the same loop at `apps/shell/<versão>` (.github/workflows/Push-Event-To-Release.yml:158-162). Shell HTML declares `<base href="/">` (projects/shell/src/index.html:6), and shell fetches the manifest at the origin root (projects/shell/src/app/manifest.service.ts:32-33). The snapshot does not show how this configuration connects to publication at a versioned path. "Where served" therefore records only the S3 path. Version `1.0.7` belongs to a different release from the remotes (deployment-manifest.json:18-21: release `16.0.1`).

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 4.
