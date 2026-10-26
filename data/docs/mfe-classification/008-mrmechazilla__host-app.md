---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
url: https://github.com/mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 3
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 008 — mrmechazilla/host-app

## Context

- **Implementation approach:** Module Federation (`@angular-architects/module-federation`, Angular 19) with a dynamic manifest
- **Repository type:** example/proof of concept (5 commits, remotes on `localhost`, README containing only the title)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:14`: `@angular-architects/module-federation` ^19; `:18` Angular 19; `:10` `run:all` script with `mf-dev-server` | weak |
| Structure | A single Angular app in the repository: the host (shell) with `header`, `footer` and `unavailable` | context |
| Configuration (host) | `webpack.config.js:3-12`: `withModuleFederationPlugin` with `name: 'host-mfe'`, empty `exposes` and singleton `shareAll`; no static `remotes` (resolved through the manifest) | moderate |
| Configuration (manifest) | `public/mf.manifest.json:2-10`: remote `users-mfe` (`localhost:4202/remoteEntry.js`, `./users`, `usersRoutes`, `type: routes`); `:11-19`: remote `payments-mfe` (`localhost:4203`, `./payments`, `PaymentsModule`, `type: module`) | strong |
| Source code (bootstrap) | `src/main.ts:2-6`: `loadManifest("mf.manifest.json")` before `import('./bootstrap')` | strong |
| Source code (composition) | `src/app/app.routes.ts:5-14`: `''` route with `loadChildren` → `loadRemoteModule({ type: 'manifest', remoteName: 'users-mfe', exposedModule: './users' })` → `m.usersRoutes`, with fallback on error | strong |
| Source code (layout) | `src/app/app.component.html:1-2`: host's `<app-header>` + `<router-outlet>` where remote routes are mounted; `header.component.html:8-9` with `/users` and `/payments` links | moderate |
| Source code | `src/app/core/models/remote-config.ts:1-9` models integration types (`module`, `routes`, `component`); `src/app/shared/utils/remote-loader.ts:1-28` is a generic loader with fallback, **entirely commented out** (evolving) | ambiguous |
| Composition (gap) | `payments-mfe` is in the manifest and header, but no host route loads it; it may be loaded by `users-mfe`'s own routes, which is not observable here | ambiguous |
| Build/deploy | No CI/CD, Dockerfile or hosting config; `webpack.prod.config.js:1` reuses the development config | weak |
| Documentation | `README.md:1`: only "# Host Application Documentation" | absent |
| History | `2227f83` "add and configure module federation"; `292d70d` "ingest a routing file from remote microfrontend"; `4885b01` "update integration setup for users mfe" | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The host in the repository + `users-mfe` (and `payments-mfe`) referenced by the composition config (`public/mf.manifest.json:2-19`) |
| Q2 | Yes | The host has its own entry and build; remotes are external and served separately (`localhost:4202`/`4203`), which counts as Yes under the operational criterion |
| Q3 | Yes | The host mounts `users-mfe` routes in its `router-outlet` (`app.routes.ts:5-14`, `app.component.html:1-2`) |
| Q4 | Yes | `loadManifest` (`main.ts:4`) + `loadRemoteModule` in `loadChildren` (`app.routes.ts:8-13`), configured and in use for `users-mfe` |
| Q5 | Yes | Q1–Q4 converge for `users-mfe`; the `payments-mfe` gap does not affect the result |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches the listed case "repositories containing only the host, which references external remote units".
- This is the inverse of repository 001 (`chart-app`, MFE-unit): composition is observable here because the host declares and loads remotes. The external unit counts for Q1 because it is in the composition config.
- The host → `users-mfe` pair is sufficient to satisfy the checklist; `payments-mfe` reinforces the intent, but its loading is not observable in the host.

## Analysis notes

- **RQ1:** evidence comes entirely from configuration (manifest) and routing code; documentation and deployment are absent.
- **RQ3:** host → remote relationship mediated by a manifest at runtime, with different integration types per remote (`routes` vs `module`), as in repository 006 (`eager-workspace1`).
- **Protocol (corpus):** remotes `users-mfe` and `payments-mfe` are not in the repository; artifact analysis is restricted to the host side.
