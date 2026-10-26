---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
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

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Repository overview

Documentation is English root README, sole `documentation` in `artifacts.csv`. Mostly Django backend (README.md:59-116, 263-356, 371-384), Docker development setup (README.md:118-261). Frontend concentrated in opening (README.md:10-12), "Architecture" (README.md:42-43), run instructions (README.md:206-261), tree (README.md:358-369), stack (README.md:386-397). Composition matches previous reviews: shell/two webpack 5 Module Federation remotes, pnpm workspace, customer/merchant areas under `customer/*`/`merchant/*`. README omits remotes exposing configuration factories rather than components (3.4.4, Notes). Sole claim without artifact "isolated deployments" (README.md:42), already in build and deployment overview (3.4.6, Repository overview). Workspace root `dependenciesDocumentation` attributes `ModuleFederationPlugin` to `@module-federation/typescript` (frontend/package.json:70), refuted by `webpack.config.js` (3.4.2, Notes).

Excluded:
- "architecture-microfrontend" badge (README.md:6), repeats claim 1;
- Frontend stack "React 19.1, TypeScript, react-admin | Admin interfaces" (README.md:390), state/routing/authentication/observability/testing lines (README.md:392-396), libraries rather than collective-unit properties; micro-frontend stack line (README.md:391) repeats claim 3;
- Internal unit details: layered "Clean Architecture" (README.md:43), authentication/data providers (README.md:47-48), OpenTelemetry (README.md:57), tests/lint (README.md:52-53), account-type login restriction (README.md:12, 235);
- Backend including "DevOps | Docker, GitHub Actions | Containerized app, CI/CD ready" (README.md:383), backend CI (README.md:89-91), backend-only (3.4.6, Repository overview: both workflows backend);
- Frontend container startup/entry instructions (README.md:206-220), common four-package development environment (docker-compose.dev.yml:149-174; frontend/Dockerfile.dev:52);
- Default settings location `frontend/shared/src/infrastructure/context/global-settings.context.tsx` (README.md:237-241), configuration detail; exists, defines `/customer`/`/merchant` (:30-31);
- Command blocks (README.md:131-133, 152-154, 167-169, 175-191, 202-204, 210-212, 218-220, 226-229, 249-251, 257-259), cited where supporting claims;
- Demonstration addresses (README.md:399-492), all under `http://localhost:3000/customer/` or `/merchant/`, repeat claim 2, except shell homepage (README.md:404);
- Business/screens/API (README.md:12, 263-337).

`doc-*` occurrences: README.md:6 badge above; README.md:10 claim 1; README.md:42 (`doc-integration-technology`, `doc-runtime-loading`, `doc-independence`) claims 3/4; README.md:391 (`doc-mfe-term`, `doc-integration-technology`) repeats 3; README.md:224 run instruction, `pnpm dev` parallel remotes/shell, matching root script (`pnpm --parallel`, frontend/package.json:13); host/remote roles claim 6; README.md:243 says new environment variables defined in shell/remote `DefinePlugin`, environment detail; all three configurations have `DefinePlugin` (frontend/shell/webpack.config.js:99-113; frontend/customer-app/webpack.config.js:59-73; frontend/merchant-app/webpack.config.js:59-73), comment frontend/shared/src/infrastructure/context/global-settings.context.tsx:19 same.

Artifacts cited previously read: root/four package `package.json`, three webpack configurations, `frontend/shell/tsconfig.build.json`, `frontend/Dockerfile.dev`, frontend portion `docker-compose.dev.yml`, shell adapters/bootstrap, `remotes.d.ts`, factories `create-admin-app-config.service.ts`, remote standalone entries, `frontend/shared` files `global-settings.context.tsx`, `standalone-app.bootstrap.tsx`, `admin-app.component.tsx`. No `package.json` has `description`. Rows cover `dependenciesDocumentation` (claim 9), comments frontend/customer-app/webpack.config.js:13 (claim 8), frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:21-24 (claim 10). Other comments non-architectural: "standalone or remote" label (frontend/customer-app/webpack.config.js:7), shell `publicPath`/`HtmlWebpackPlugin` (frontend/shell/webpack.config.js:30, 96), `rootDir` (frontend/shell/tsconfig.build.json:30), Dockerfile permissions/volumes (frontend/Dockerfile.dev:1-2, 15-21), Compose port labels (docker-compose.dev.yml:169-171), telemetry initialization (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:73), common `AdminApp` rendering react-admin with configuration (frontend/shared/src/presentation/components/admin-app.component.tsx:6-9). `dependenciesDocumentation` also says `@module-federation/typescript` requires `axios` (frontend/package.json:71), tool dependency without unit claims.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:10 | "built with **Django** and **React.js** with **TypeScript**, using **Micro-Frontend** architecture" | structure | corroborated | 3.4.3 (three units `Yes`); 3.4.5 #1, #2; frontend/shell/webpack.config.js:59-64 |
| 2 | README.md:12 | "The system includes separate **react-admin** panels under `customer/*` and `merchant/*`" | structure | corroborated | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45, 52, 62); 3.4.5 #1, #2; frontend/shared/src/infrastructure/context/global-settings.context.tsx:30-31 |
| 3 | README.md:42 | "**Micro‑Frontend (Module Federation)** – Runtime loading of independent React apps, enabling parallel development" | composition | corroborated | 3.4.4 (src-remote-import: 2); 3.4.5 #1, #2; 3.4.3 (three units with own manifest, entry and build); frontend/shell/webpack.config.js:3, 59-64; frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10 |
| 4 | README.md:42 | "isolated deployments" (units deployed in isolation) | build-deploy | uncorroborated | — |
| 5 | README.md:245-261 | "Standalone Development (for development purposes)" (each remote runs independently) | independence | corroborated | 3.4.3 (Entry column of customer-app and merchant-app); frontend/customer-app/package.json:8; frontend/customer-app/webpack.config.js:14-18, 74-79; frontend/customer-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8 |
| 6 | README.md:360-369 | "shell/ # Host app; customer-app/ # Remote Customer app; merchant-app/ # Remote Merchant app; shared/ # Shared modules and utilities" (frontend tree) | structure | corroborated | 3.4.3 (Workspace; three units `Yes`, `shared` `No`); 3.4.5 #1, #2; frontend/shell/package.json:11-13; frontend/customer-app/package.json:13-15; frontend/merchant-app/package.json:14-16 |
| 7 | README.md:397 | "**Monorepo** \| pnpm workspaces \| Multi-package management" | structure | corroborated | 3.4.3 (Workspace); frontend/pnpm-workspace.yaml:1-5 |
| 8 | frontend/customer-app/webpack.config.js:13 | "just standalone allowed to use root.render, for remote env root.render will be handle by shell" | composition | corroborated | 3.4.3 (Notes: empty remote entry); 3.4.4 (Notes); frontend/customer-app/webpack.config.js:14-22, 85-88; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52, 62, 81-82 |
| 9 | frontend/package.json:70 | "@module-federation/typescript": "Webpack requires ModuleFederationPlugin to dynamically provide/consume modules at runtime." (package provides `ModuleFederationPlugin`) | composition | contradicted | 3.4.2 (row `@module-federation/typescript`, `Undetermined`; Notes); frontend/shell/webpack.config.js:3; frontend/customer-app/webpack.config.js:3; frontend/merchant-app/webpack.config.js:3 |
| 10 | frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:21-24 | "Shell application loads remote AdminApp configs for customer and merchant, wraps them in ErrorBoundary and Suspense, and mounts under routes." | composition | corroborated | 3.4.4 (src-remote-import: 2; manual :45, :52, :62); 3.4.5 #1, #2; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-37, 45-66 |

## Observations

**1. README.md:10.** Structural review three frontend units, shell/two remotes; composition two active host → remote Module Federation relationships (frontend/shell/webpack.config.js:59-64). Sentence concerns whole system with Django backend; micro-frontends frontend-only. Badge (README.md:6) repeats.

**2. README.md:12.** Remote returns `AdminApp` configuration, common-library react-admin component (frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7-25; frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:8-23); shell mounts each in own `AdminApp` under `${customerBasePath}/*`/`${merchantBasePath}/*` (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:47-66), `/customer`/`/merchant` (frontend/shared/src/infrastructure/context/global-settings.context.tsx:30-31). Two separate panels, one per remote. Repeated README.md:232-233, demonstration addresses (e.g. README.md:413, 422). Account-type login restriction latter sentence internal/excluded.

**3. README.md:42.** Shell declares two remotes through webpack 5 built-in `ModuleFederationPlugin` (frontend/shell/webpack.config.js:3, 59-64), loads through runtime `import()` (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10). Loads factory returning area screens to common `AdminApp`, rather than ready React app (3.4.4, Notes); independent apps through own manifests/entries/builds/development servers (3.4.3; frontend/customer-app/package.json:6-9), no inter-unit source imports (classification, "Código-fonte (fronteiras)", English translation: "Source code, boundaries"). Three depend on same build-time workspace library `@bnpl/shared` (claim 6). Supports technically parallel development; no team information, sole history author (classification, "Autoria e histórico", English translation: "Authorship and history"). Repetition: "Micro-Frontend | Webpack 5, Module Federation | Runtime dynamic module loading" (README.md:391).

**4. README.md:42.** Build and deployment review records `not observed` deployment for three (3.4.6 #1-#3). Sole frontend container common four-package development environment, no code copy/build (frontend/Dockerfile.dev:15, 52; docker-compose.dev.yml:149-174), both workflows backend-only. Nothing deploys units together/separately. Separate builds with own `dist`/`remoteEntry.js` (3.4.6 #1-#3) allow but do not show isolated deployment.

**5. README.md:245-261.** Each remote scripts `dev:standalone`/`build:standalone` (frontend/customer-app/package.json:8-9; frontend/merchant-app/package.json:8-9), selecting own entry in `webpack.config.js` with `HtmlWebpackPlugin` (frontend/customer-app/webpack.config.js:14-18, 74-79), mounting through `renderStandaloneApp` (frontend/customer-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8; frontend/shared/src/infrastructure/standalone/standalone-app.bootstrap.tsx:36-42). Ports 3001/3002 match `devServer` (frontend/customer-app/webpack.config.js:121; frontend/merchant-app/webpack.config.js:121). README commands swap filters: "customer standalone" filters `@bnpl/merchant-app` (README.md:250), "merchant standalone" filters `@bnpl/customer-app` (README.md:258), already noted by classification; instruction error, both packages have scripts. Shell lacks standalone mode, README claims none.

**6. README.md:360-369.** Tree four workspace packages (frontend/pnpm-workspace.yaml:1-5), reviewed roles: shell host, customer-app/merchant-app remotes (3.4.5 #1, #2), `shared` library, no structural unit. "Shared" holds: three declare `"@bnpl/shared": "workspace:*"` (frontend/shell/package.json:11-13; frontend/customer-app/package.json:13-15; frontend/merchant-app/package.json:14-16), webpack-alias resolution (frontend/shell/webpack.config.js:37; frontend/customer-app/webpack.config.js:35), code imports (e.g. frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:1-5; frontend/customer-app/src/application/services/create-admin-app-config.service.ts:1-2). Tree also `Dockerfile.dev`, claim 4 development environment.

**7. README.md:397.** `frontend/pnpm-workspace.yaml:1-5` declares four packages, root repeats in `workspaces` (frontend/package.json:5-10). Claim 6 tree also `pnpm-workspace.yaml` (README.md:367).

**8. frontend/customer-app/webpack.config.js:13.** Comment explains entry choice (:14-22): only standalone calls `root.render`; remote entry empty file (`remote-entry.module.ts`, 0 bytes; 3.4.3, Notes), only configuration factory exposed (:85-88), shell rendering through configured `AdminApp` (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52, 62) inside sole React root created at shell entry (:81-82). Comment :84, "No root.render files to prevent multi React Trees in shell", repeats/rationalizes. Both also frontend/merchant-app/webpack.config.js:13/:84, configuration differing only `name`, port, standalone `publicPath`. Sentence first identifies rendering entry, division of shell/remote roles; theme composition.

**9. frontend/package.json:70.** Field documents `@module-federation/typescript`, saying webpack needs `ModuleFederationPlugin` to provide/consume runtime modules. Runtime holds: three configurations plugin, shell `remotes`, remote `exposes` (3.4.5 #1, #2). Package attribution refuted: three `webpack.config.js` get `ModuleFederationPlugin` from `require("webpack").container` (frontend/shell/webpack.config.js:3; frontend/customer-app/webpack.config.js:3; frontend/merchant-app/webpack.config.js:3); package only TypeScript compiler plugin in `frontend/shell/tsconfig.build.json:17-24`, no confirmed build effect (3.4.2, `Undetermined`).

**10. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:21-24.** Component `App` loads both configurations on mounting (:34-37), waits for both (:39-41), mounts each `AdminApp` inside `ErrorBoundary`/`Suspense` under area routes (:45-66), as reviews record. Promises :35-36 lack `catch`, `ErrorBoundary` around `AdminApp` does not cover load failure (classification, Notes); comment says configurations wrapped, as they are, without protecting loading itself.

## Summary

Claims: 10 (corroborated: 8, partial: 0, contradicted: 1, uncorroborated: 1). Themes: (structure: 4, composition: 4, build-deploy: 1, independence: 1).
