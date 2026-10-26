---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
url: https://github.com/coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: library
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 039 — coolsamson7/novx

## Context

- **Implementation approach:** Module Federation (webpack 5) orchestrated by framework `@novx/portal` (manifest-based features, outlets with remote loading)
- **Repository type:** library/framework with a reference app (Nx monorepo with published libraries `@novx/{core,i18n,communication,portal}` and apps `app` and `microfrontend`)
- **Classification:** MFE-implemented (framework with a reference app; rule confirmed by the researchers)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:9-14`: package monorepo, including "[portal] a react microfrontend framework"; `libs/portal/README.md:1-15`: "a react portal framework supporting microfrontends… feature outlets that cover both local and federated components" | weak |
| Structure | `libs/` (`core`, `i18n`, `communication`, `portal`, published on npm, `libs/portal/package.json:2-3,57`) and two apps: `apps/app` (shell) and `apps/microfrontend` (remote), each with `project.json`, `webpack.config.js`, `src/main.tsx` | strong |
| Configuration (host) | `apps/app/webpack.config.js:78-91`: `ModuleFederationPlugin` with `name: "app"`, `remotes: { microfrontend: "microfrontend@http://localhost:3001/remoteEntry.js" }`, singleton `shared` (react, react-router-dom, `@novx/*` in `foundationShared`, `:6-11`) | strong |
| Configuration (remote) | `apps/microfrontend/webpack.config.js:53-67`: `name: 'microfrontend'`, `exposes: { './Module', './MicrofrontendFeature' }`, same singletons | strong |
| Configuration (runtime) | `apps/app/src/environments/environments.ts:2-10`: `deployment: "microfrontend"` with `remotes: [{ name: 'microfrontend', url: 'http://localhost:3001' }]`; `apps/microfrontend/public/manifest.json:1-28`: `microfrontend` module with feature `/microfrontend/feature` (component `MicrofrontendFeature`); `apps/app/src/manifest.json:1-5`: `shell` manifest | strong |
| Source code (framework) | `libs/portal/src/lib/outlet-loader/remote-component-loader.ts:28-66`: `loadRemoteEntry`/`loadRemoteModule` with `__webpack_init_sharing__` and loading of `${url}/remoteEntry.js`; `:95-140`: feature outlets load the remote component through the manifest's `feature.module`/`feature.component` | strong |
| Source code (app) | `apps/app/src/app/App.tsx:4,18-20`: the shell uses the portal's `DeploymentManager`/`RouterManager` to mount features (local and remote) | strong |
| Source code | No source code imports from `apps/microfrontend` in `apps/app` (supports the units' independence) | absent |
| Build/deploy | `apps/microfrontend/project.json:11-27`: its own Nx target (metadata scanning generates the manifest + webpack build) | moderate |
| Structure (noise) | Tracked `apps.zip`, `error.log` and `PUBLISH.TXT` | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `apps/app` (shell) and `apps/microfrontend` (remote) |
| Q2 | Yes | Their own `webpack.config.js`, entry and Nx target; no source code imports between apps (libraries `@novx/*` participate as singleton `shared`) |
| Q3 | Yes | The shell loads and routes the remote feature through a manifest (`environments.ts:6-10`, `remote-component-loader.ts:95-140`) |
| Q4 | Yes | MF configured on both sides and used at runtime by the framework loader |
| Q5 | Yes | Q1–Q4 converge for the reference app |

## Rationale

- Q1–Q5 are all Yes for the `app` + `microfrontend` pair, satisfying the MFE-implemented rule.
- The checklist lists "MFE frameworks and libraries (e.g., single-spa itself…)" as Non-MFE, but also includes "examples… that actually compose frontend units". Here, in addition to the framework, a reference app actually composes a shell and remote, with config, manifest and runtime loading.

## Analysis notes

- **RQ2:** a custom portal framework over MF, with feature manifests (`manifest.json`) generated through metadata scanning, an abstraction layer above MF.
- **RQ3:** shell → remote relationship mediated by manifest + deployment configuration (`environments.ts`), not only webpack `remotes`.

## Point for joint review

- **Framework + reference app:** if the "MFE frameworks and libraries" rule is applied to the repository as a whole, the case becomes Non-MFE. Proposed rule: "a framework repository counts as MFE-implemented when it contains a reference app that actually composes units; the framework without a composition app is Non-MFE". This would distinguish this case from the single-spa repository, for example.
- In artifact mining, the framework (`libs/portal`) is the composition mechanism; the reference app is the instance.
- **Researchers' decision:** rule accepted. A framework repository with a reference app that actually composes units is MFE-implemented; a framework without a composition app is Non-MFE.
