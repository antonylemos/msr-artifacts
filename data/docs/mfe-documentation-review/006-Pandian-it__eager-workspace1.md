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

Prose documentation barely describes the architecture. The `.md` files are of three types:
- **Angular CLI templates:** the root README and both library READMEs (README.md:1-3; projects/shared-lib/README.md:1-3; projects/shared-ui/README.md:1-3).
- **Changesets-generated changelogs:** one per project (e.g.: projects/shell/CHANGELOG.md:1-40). They record only "Auto-generated patch for affected projects", but show independently advancing versions: shell reaches 1.0.7 and cart 1.0.5 (projects/cart/CHANGELOG.md:3).
- **cloudfront-spa-config.md:** explains configuring CloudFront for SPA routing (cloudfront-spa-config.md:1-40), a hosting detail without corresponding configuration in the snapshot. It also shows the version manifest format, remote URLs it produces and bucket structure (cloudfront-spa-config.md:49-94). CloudFront configuration examples and manifest JSON are code blocks and did not become rows.

Architecture appears in comments of artifacts cited by previous reviews:
- **Release workflows:** numbered steps describing versioning through changesets and deployment of affected applications. Files read were `.github/workflows/Initiate-Release.yml`, `.github/workflows/Push-Event-To-Release.yml` and `.github/workflows/User-Pull-Request.yml`.
- **Each application's webpack configurations:** comments on shared libraries.
- **Shell manifest service:** comments on how remotes are resolved in development and production.

The following had no architecture comments:
- `package.json` and each project's `package.json` and `project.json`;
- `nx.json` and `deployment-manifest.json`;
- `main.ts`, `bootstrap.ts` and `app-routing.module.ts`;
- manifests in `projects/shell/public/`.

This documentation matches previous reviews, with two exceptions: checkout configuration says it shares `@shared-ui` "since checkout uses it", but checkout does not import that library; and the CloudFront guide puts shell and manifest at the bucket root, where the workflow does not publish them.

Excluded from the table as infrastructure details:
- comment "Derive CloudFront URL from current domain" (projects/shell/src/app/manifest.service.ts:31); code uses the current origin, and CloudFront is absent from the snapshot;
- the CloudFront guide's SPA routing section.

No `doc-*` occurrences in mining.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | .github/workflows/Initiate-Release.yml:50 | "Run changesets/action to bump versions & open PR" (package versions advance through changesets) | build-deploy | corroborated | 3.4.6 (Versioning `Yes` in all four applications); .github/workflows/Initiate-Release.yml:51-61; deployment-manifest.json:1-26 |
| 2 | .github/workflows/Push-Event-To-Release.yml:137-139 | "CASE A: Bot commit → Build, Deploy apps & manifest" (builds and publishes affected applications and manifest) | build-deploy | corroborated | 3.4.6 #1-#4 (separate deployment); .github/workflows/Push-Event-To-Release.yml:140-167 |
| 3 | cloudfront-spa-config.md:70-73 | "This will resolve to URLs like: `https://yourdomain.com/apps/cart/v1.0.0/remoteEntry.js` […]" (each remote is resolved through the manifest name and version) | composition | corroborated | projects/shell/src/app/manifest.service.ts:54-58; .github/workflows/Push-Event-To-Release.yml:162 |
| 4 | cloudfront-spa-config.md:78-81 | "s3://your-bucket/ ├── index.html (shell app) ├── deployment-manifest.json ├── apps/" (shell and manifest are at the bucket root, and remotes in `apps/`) | build-deploy | contradicted | 3.4.6 #4; .github/workflows/Push-Event-To-Release.yml:158-162, 167 |
| 5 | projects/cart/webpack.config.js:18 | "Explicitly share the custom shared library" (`@shared-lib` is shared between units) | structure | corroborated | projects/cart/webpack.config.js:19-24; projects/cart/src/app/app.component.ts:3; projects/checkout/src/app/app.component.ts:2; projects/orders/src/app/app.component.ts:2; projects/shell/src/app/app.component.ts:2 |
| 6 | projects/checkout/webpack.config.js:26 | "Also share @shared-ui since checkout uses it" (checkout uses `@shared-ui`) | structure | contradicted | projects/checkout/src (no reference to `shared-ui`); projects/shell/src/app/app.component.ts:4 |
| 7 | projects/shell/src/app/manifest.service.ts:51-54 | "For localhost, mfe.manifest.json contains direct URLs […] For production, deployment-manifest.json contains version objects" (in production, remotes are resolved through the version manifest) | composition | corroborated | 3.4.5 #1-#3 (Configuration); projects/shell/src/app/manifest.service.ts:28-34, 50-58; deployment-manifest.json:10-25 |
| 8 | projects/shell/src/app/manifest.service.ts:62 | "Centralized method for loading remote modules" (one method loads all remotes) | composition | corroborated | 3.4.4 (projects/shell/src/app/manifest.service.ts:71-75); projects/shell/src/app/app-routing.module.ts:13, 20, 27 |

## Observations

**1. .github/workflows/Initiate-Release.yml:50.** The step applies changesets, advancing each affected package's version. The next step writes those versions to `deployment-manifest.json` (.github/workflows/Initiate-Release.yml:70-117). Repetitions: .github/workflows/Push-Event-To-Release.yml:66 and .github/workflows/User-Pull-Request.yml:56, generating a `patch` changeset per affected project. Per-project changelogs and different manifest versions confirm independent version evolution.

**2. .github/workflows/Push-Event-To-Release.yml:137-139.** The comment describes the workflow branch building only affected applications and publishing each on S3 under its version path. Repetition: "Detect affected apps" (.github/workflows/Push-Event-To-Release.yml:47-49).

**3. cloudfront-spa-config.md:70-73.** The guide describes URLs produced by the version manifest, `apps/<app>/<versão>/remoteEntry.js`, the same format assembled by shell (projects/shell/src/app/manifest.service.ts:54-58) and path where the workflow publishes each application (.github/workflows/Push-Event-To-Release.yml:162). English explanation of the original path placeholder: version. The guide puts those URLs under the page's domain. Code replaces `www` with `mfe` in the origin (projects/shell/src/app/manifest.service.ts:57), a domain difference that does not change the path format.

**4. cloudfront-spa-config.md:78-81.** The bucket tree puts shell's `index.html` and `deployment-manifest.json` at the root, and remotes in `apps/<app>/<versão>/` (cloudfront-spa-config.md:77-94). English explanation of the original path placeholder: version. This is the arrangement shell expects, because it fetches the manifest at the origin root (projects/shell/src/app/manifest.service.ts:32-33). The workflow, however, publishes shell through the same loop as remotes, at `apps/shell/<versão>`, and copies the manifest to `manifest/<release>/` (.github/workflows/Push-Event-To-Release.yml:158-162, 167). English explanation of the original shell path placeholder: version. What the guide describes for shell and manifest is contradicted by the snapshot's only publishing artifact; the remotes portion matches.

**5. projects/cart/webpack.config.js:18.** `@shared-lib` is declared a shared singleton, and all four applications import its `VersionService`. Repetitions: projects/checkout/webpack.config.js:18, projects/orders/webpack.config.js:18 and projects/shell/webpack.config.js:20, referring to libraries in the plural.

**6. projects/checkout/webpack.config.js:26.** Configuration shares `@shared-ui`, justifying this by checkout's use, but no file in `projects/checkout/src` references it. The only `@shared-ui` import is in shell and is empty (`import {} from '@shared-ui'`, projects/shell/src/app/app.component.ts:4). Thus the library is not actually used by two units.

**7. projects/shell/src/app/manifest.service.ts:51-54.** Comments describe both manifests read by code: in `localhost`, `mfe.manifest.json` with direct URLs; elsewhere, `deployment-manifest.json` with version and release, from which shell assembles `apps/<app>/<versão>/remoteEntry.js`. English explanation of the original path placeholder: version. Code and repository manifest match. The build and deployment review records that the workflow publishes the manifest at a path different from the one shell searches, but this does not contradict the described format.

**8. projects/shell/src/app/manifest.service.ts:62.** All three shell routes call the service's same `loadRemoteModule`, reading the manifest before loading each remote. Repetition: projects/shell/src/app/manifest.service.ts:64.

## Summary

Claims: 8 (corroborated: 6, partial: 0, contradicted: 2, uncorroborated: 0). Themes: (structure: 2, composition: 3, build-deploy: 3).
