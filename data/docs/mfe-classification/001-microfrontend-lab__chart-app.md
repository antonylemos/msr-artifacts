---
schema: 1
id: 1307506894
full_name: microfrontend-lab/chart-app
url: https://github.com/microfrontend-lab/chart-app
commit: 3cc620f7aa2c2faf4db22ccf8e9c975ef55f05c1
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 001 — microfrontend-lab/chart-app

## Context

Module Federation remote in a micro-frontends POC (`README.md:4`, "micro frontend POC"). The host (portal) is in another repository, `microfrontend-lab/mf-registry` (`CLAUDE.md:8-11`).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json`: `@module-federation/enhanced` in `devDependencies` | weak |
| Configuration | `rspack.config.ts:64-73`: `ModuleFederationPlugin` with `name: 'chartApp'`, `filename: 'remoteEntry.js'`, `exposes: { './ChartWidget' }`, singleton `shared` (react, react-dom, react-router); no `remotes` | moderate |
| Configuration | `rspack.config.ts:17`: `publicPath: 'auto'`, with a comment explaining that the remote is loaded on the portal page | moderate |
| Source code (exposure) | `src/index.tsx:1`: `import('./bootstrap')` (MF remote asynchronous entry pattern); `src/types/widget.ts:5`: `WidgetProps` (`basename`, `user`, `theme`) as the contract with the host | moderate |
| Source code (consumption) | Search for `remotes`, `loadRemote`, `registerApplication` and import map in `src/`, `public/` and the config: no occurrences | absent |
| Structure | A single unit: one `package.json`, one entry point, one build | contrary |
| Composition | No host in the repository; the host is in `microfrontend-lab/mf-registry` (`CLAUDE.md:8-11`) | absent |
| Build/deploy | `.github/workflows/deploy.yml:43-53`: `gsutil rsync` to `gs://mf-chart-app`, `remoteEntry.js` with `no-cache`; `infra/*.tf` creates the bucket (independent deployment) | moderate |
| Documentation | `README.md:3-4`: "a remote in the `microfrontend-lab` micro frontend POC"; `README.md:51-58`: `/apps/chart` route in the portal and a registry entry with the `remoteEntry.js` URL | moderate |
| History | `3cc620f` "Fix publicPath: hardcoded prefix broke embedded chunk loading in production", actual use as a remote | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Only one frontend unit; the composition config has only `exposes` (`rspack.config.ts:67`) and does not reference external units. The portal appears only in documentation. |
| Q2 | Yes | For this unit: its own entry, build and deployment (`deploy.yml`, dedicated bucket) |
| Q3 | Undetermined | The host mounting the unit is not in the repository (`CLAUDE.md:11` points to another repo) |
| Q4 | Undetermined | The remote side is configured (`exposes`), but the consumer side is not observable |
| Q5 | No | The evidence shows a unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No. Under the general rule this would yield Non-MFE, but the checklist allows the MFE-unit exception: "a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable".
- The repository meets both requirements of this exception:
  - **Prepared for composition:** `exposes`, `remoteEntry.js`, singleton `shared`, asynchronous bootstrap, `publicPath: 'auto'` and the `WidgetProps` contract.
  - **Host not observable:** the portal is in `microfrontend-lab/mf-registry`, outside the repository.
- Matches the case "repositories containing only a remote unit, without the composing host".
