---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
url: https://github.com/pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 009 — pmathulan/frontend-coding-exercises

## Context

- **Implementation approach:** Module Federation (`@angular-architects/module-federation` + `ngx-build-plus`, Angular 19)
- **Repository type:** example/proof of concept (technical assessment exercises, `README.md:3`)
- **Assessed commit:** `89a3c27` (the repository's only commit)

## Observed evidence

The repository brings together six independent exercises (`angular-frontend-practical/`, `microfrontend-workspace/`, `rate-limited-scheduler/`, `react-performance-practical/`, `spa-helm/`, `ssr-app/`). Only `microfrontend-workspace/` has MFE evidence; paths below are relative to it unless indicated otherwise.

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:14`: `@angular-architects/module-federation` ^19.0.3; `:10` `run:all` script with `mf-dev-server` | weak |
| Structure | Angular workspace with `projects/shell`, `projects/mfe1` (apps) and `projects/shared` (library); each app has its own `main.ts`, `bootstrap.ts`, `webpack.config.js` and `webpack.prod.config.js` | strong |
| Configuration (build) | `angular.json:18` builder `ngx-build-plus:browser`; `:42`, `:60`, `:85` `extraWebpackConfig` pointing to each project's webpack | moderate |
| Configuration (host) | `projects/shell/webpack.config.js:5` `name: 'shell'`; `:14-16` `remotes: { mfe1: "mfe1@http://localhost:4201/remoteEntry.js" }` | strong |
| Configuration (remote) | `projects/mfe1/webpack.config.js:5-10`: `name: 'mfe1'`, `filename: 'remoteEntry.js'`, `exposes: { './Component' }` | strong |
| Source code (composition) | `projects/shell/src/app/app.routes.ts:5-13`: `mfe1` route with `loadComponent` → `loadRemoteModule({ remoteEntry: 'http://localhost:4201/remoteEntry.js', exposedModule: './Component' })` → `AppComponent`; `:23` redirects `''` to `mfe1`; `:14-21` commented-out `mfe2` route | strong |
| Source code (layout) | `projects/shell/src/app/app.component.html:1-5`: shell title, input and "Send to MFE1" button + `<router-outlet>` where mfe1 is mounted | strong |
| Source code (communication) | `projects/shared/src/lib/message.service.ts:7-13`: `MessageService` with `BehaviorSubject`; used by the shell (`shell/src/app/app.component.ts:4,14`) and mfe1 (`mfe1/src/app/app.component.ts:3,13-18`) through a shared library (`tsconfig.json:15-18`, `"shared": ["./dist/shared"]`), singleton through `shareAll` | moderate |
| Source code | `projects/shell/src/main.ts:1` and `projects/mfe1/src/main.ts:1`: `import('./bootstrap')`; no source code imports between `shell` and `mfe1` (supports the units' independence) | moderate |
| Build/deploy | No CI/CD or workspace deployment; only dev servers on distinct ports (`README.md:28,34`). `spa-helm/` (root) is a generic SPA chart, not linked to the workspace. | weak |
| Documentation | `README.md:3-7`: "demonstrates a Micro-Frontend architecture using Angular, Module Federation, and a shared library" with Shell, MFE1 and Shared Library; `:41`, `:46-55` describe runtime loading | moderate |
| Source code (other exercises) | `ssr-app/src/app/app.routes.ts:22-36` uses `loadComponent` with local `import()` (ordinary lazy loading, not composition); no other occurrence of federation, `remoteEntry` or `customElements` | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell` and `mfe1` in `microfrontend-workspace/projects/` |
| Q2 | Yes | Each app has its own entry, webpack and build target (`angular.json`), served separately (4200/4201); no source code imports between apps, only the `shared` library |
| Q3 | Yes | The shell mounts `mfe1` in its `router-outlet` (`app.routes.ts:5-13`, `app.component.html:5`) |
| Q4 | Yes | MF configured on both sides (`remotes`/`exposes`) and used through `loadRemoteModule` (`app.routes.ts:8-12`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "examples, templates, and proofs of concept that actually compose frontend units" and "monorepos containing a host and its remotes".
- MFE is only one of the repository's six exercises; the others are independent apps without composition. Under the protocol (section 3.1), the repository is assessed as a whole, and one observable implementation is sufficient.
- The `shared` library is shared as a singleton and serves as a communication channel, not code coupling between units; it does not compromise Q2.

## Analysis notes

- **Protocol (corpus):** during artifact mining, restrict analysis to `microfrontend-workspace/`; the other directories are noise (other exercises).
- **RQ3:** host ↔ remote communication through a shared singleton service (`MessageService`), a mechanism absent from the preceding repositories.
- **RQ1:** composition is duplicated (static `remotes` in webpack and the fixed URL in `loadRemoteModule`), a common pattern in examples.
