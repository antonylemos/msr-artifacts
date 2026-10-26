---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
url: https://github.com/Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 006 — Pandian-it/eager-workspace1

## Context

- **Implementation approach:** Module Federation (`@angular-architects/module-federation`, Angular 18) with manifest-driven dynamic loading
- **Repository type:** example/proof of concept, with a production-like release pipeline (the README is Angular CLI boilerplate and the apps are simple, but there is per-app versioning and deployment to S3/CloudFront)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:37`: `@angular-architects/module-federation`; `:24` Angular 18; `:59` Nx | weak |
| Structure | Nx monorepo with four apps (`projects/shell`, `projects/cart`, `projects/checkout`, `projects/orders`) and two libraries (`projects/shared-lib`, `projects/shared-ui`). Each app has its own `package.json`, `project.json`, `webpack.config.js`, `src/main.ts` and `src/bootstrap.ts`. | strong |
| Configuration (host) | `projects/shell/webpack.config.js:5-11`: `name: 'shell'`, `remotes` for `cart` (4201), `checkout` (4202) and `orders` (4203); `:21-33` `@shared-lib` and `@shared-ui` as `eager` singletons | strong |
| Configuration (remotes) | `projects/cart/webpack.config.js:5-8`, `projects/checkout/webpack.config.js:5-8`, `projects/orders/webpack.config.js:5-8`: each exposes `./Module` → `src/app/mfe.module.ts` | strong |
| Source code (composition) | `projects/shell/src/app/app-routing.module.ts:9-29`: `cart`, `checkout` and `orders` routes with `loadChildren` → `ManifestService.loadRemoteModule(...)` | strong |
| Source code (loading) | `projects/shell/src/app/manifest.service.ts:4` imports `loadRemoteModule`; `:23-37` fetches the manifest (`mfe.manifest.json` on localhost, `deployment-manifest.json` in production); `:57-58` constructs the URL `/apps/<app>/<version>/remoteEntry.js`; `:62-75` calls `loadRemoteModule({ remoteEntry, exposedModule: './Module' })` | strong |
| Source code | Each app's `src/main.ts:1` uses `import('./bootstrap')` (MF asynchronous entry); no app imports another's source code, only the `@shared-lib`/`@shared-ui` libraries through path aliases (`tsconfig.json:17-20`) (supports the units' independence) | moderate |
| Configuration (runtime) | `projects/shell/public/mfe.manifest.json:2-4`: local URLs of the three remotes; `deployment-manifest.json:10-25`: independent version per app (checkout 2.0.4, orders 1.1.3, shell 1.0.7, cart 1.0.5) | strong |
| Build/deploy | `.github/workflows/Push-Event-To-Release.yml:61` detects affected apps (`nx show projects --affected`); `:158-162` `aws s3 sync dist/$app s3://…/apps/$app/$APP_VERSION`; `:167` publishes `deployment-manifest.json`. Each app has its own build and versioned deployment. | strong |
| Configuration (remnant) | `projects/shell/public/federation.manifest.json:2-3` (`mfe1`, `mfe2`) is not referenced in the code; scaffolding remnant | context |
| Documentation | `README.md` is Angular CLI boilerplate, without an architecture description | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four frontend units in the repository (`shell`, `cart`, `checkout`, `orders`), all referenced by the composition config (`shell/webpack.config.js:7-11`) |
| Q2 | Yes | Each app has its own entry, `webpack.config.js` and build; independent versions and deployment (`deployment-manifest.json`, `Push-Event-To-Release.yml:158-162`); no source code imports between apps |
| Q3 | Yes | The shell routes to and loads remotes (`app-routing.module.ts:9-29`) |
| Q4 | Yes | Module Federation configured on both sides (`remotes`/`exposes`) and used at runtime through `loadRemoteModule` (`manifest.service.ts:62-75`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches the case "monorepos containing a host and its remotes".
- The evidence forms a complete chain: dependency → `remotes`/`exposes` config → routes with `loadChildren` → manifest-driven `loadRemoteModule` → versioned build and deployment per app.
- Shared libraries (`shared-lib`, `shared-ui`) participate as MF `shared` singletons, not as direct coupling between units, so they do not compromise Q2.

## Analysis notes

- **RQ1:** documentation is absent (boilerplate README); all evidence comes from configuration, code and CI/CD.
- **RQ3:** host → remote relationship mediated by a manifest at runtime (`mfe.manifest.json` / `deployment-manifest.json`), instead of fixed URLs. Static webpack `remotes` coexist with dynamic resolution.
- **RQ1 (build/deploy):** independent versioning per app with Changesets (`.changeset/`) and Nx affected, a strong case for evidence dimension 6.
