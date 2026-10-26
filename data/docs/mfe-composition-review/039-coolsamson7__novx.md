---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Repository overview

An Nx monorepo for a React portal framework (`@novx/portal` and the `@novx/core`, `@novx/i18n`, `@novx/communication` libs) with a two-unit reference app: `apps/app` is the shell and `apps/microfrontend` is the remote, which only generates a `remoteEntry.js` exposing `./Module` and `./MicrofrontendFeature` (apps/microfrontend/webpack.config.js:53-59). The composition mechanism resides in the framework, rather than the apps: the shell does not import the remote through `import('microfrontend/...')`; it reads from its `applicationConfig` the `microfrontend` deployment with its remote list (apps/app/src/environments/environments.ts:2-8) and passes that list to the portal's `RemoteDeploymentLoader` (apps/app/src/module.ts:226), which fetches each remote's `manifest.json` (libs/portal/src/lib/loader/remote-loader.ts:28). That manifest's features receive the container name and remote URL (libs/portal/src/lib/deployment-manager.ts:193-196), and `RemoteComponentLoader` injects `remoteEntry.js` through `<script>`, initializes the Module Federation container and obtains first `./Module` and then the feature component (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32-41, :57-73, :106-110, :137-141). The outlet mounts the loaded component inside the remote module's DI `Environment` (libs/portal/src/lib/feature-outlet.tsx:230, :245).

The shell's static webpack `remotes` (apps/app/webpack.config.js:82-84) declares the same remote, but the path that actually loads it is the framework's, through a script and `window[scope]` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:47, :69). The manifest read at runtime is the remote's `public/manifest.json`, served by the dev server (apps/microfrontend/webpack.config.js:19-21); the remote target's metadata scan writes elsewhere, `apps/microfrontend/src/manifest.json` (apps/microfrontend/project.json:11). The repository is a framework with a demonstration app; the remote has a single feature, a text page (apps/microfrontend/src/feature.tsx:15-27). What did not become a relationship: the libs are dependencies shared as singletons (apps/app/webpack.config.js:6-11, :93), rather than composed units, and `libs/communication` handles HTTP endpoints, with no message exchange between units (source code review, Notes).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/app | apps/microfrontend | host → remote | source → target | module-federation | Yes | Yes | apps/app/webpack.config.js:82-84 (remote `microfrontend` at `http://localhost:3001/remoteEntry.js`); apps/microfrontend/webpack.config.js:54-58 (`name: 'microfrontend'`, `filename: 'remoteEntry.js'`, exposes `./Module` and `./MicrofrontendFeature`); apps/microfrontend/webpack.config.js:18-21 (port 3001, serve `public/`); apps/microfrontend/public/manifest.json:2-10 (module `microfrontend`, feature `/microfrontend/feature` with component `MicrofrontendFeature`) | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32; apps/app/src/environments/environments.ts:8; libs/portal/src/lib/loader/remote-loader.ts:28; libs/portal/src/lib/feature-outlet.tsx:245 |

## Observations

**1. apps/app → apps/microfrontend.** The target was resolved by container name: the shell declares `{ name: 'microfrontend', url: 'http://localhost:3001' }` (apps/app/src/environments/environments.ts:8), and this name is the `name` of the `ModuleFederationPlugin` of `apps/microfrontend` (apps/microfrontend/webpack.config.js:54), which is also its manifest's `id` (apps/microfrontend/public/manifest.json:2); the requested modules, `./Module` and `./${feature.component}` = `./MicrofrontendFeature`, are those exposed (apps/microfrontend/webpack.config.js:56-58). Port 3001 (apps/microfrontend/webpack.config.js:18) only corroborates. The code lines in `libs/portal` have Unit `—` in the source code review, but belong to this relationship because they are the loader instantiated and executed by the shell: `RemoteDeploymentLoader` is created in the shell (apps/app/src/module.ts:226) and triggered in `loadDeployment` (apps/app/src/module.ts:262), and `RemoteComponentLoader` is in the shell's loader list (apps/app/src/module.ts:317). All nine constructs are `Yes`, so the relationship is active. `apps/microfrontend` is `Undetermined` in the structural review because it does not start a UI independently; this does not affect its role as target, which only provides `remoteEntry.js`. The connection has two levels, both within the same relationship: the shell loads `./Module`, whose class becomes an `Environment` child of the shell environment (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:124-131), and then the feature component, which the outlet renders with that environment (libs/portal/src/lib/feature-outlet.tsx:245).

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

