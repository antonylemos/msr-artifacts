---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
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

# 272 — scality/metalk8s

## Repository overview

MetalK8s is a production Kubernetes distribution, and the frontend is only part of the repository: two units, shell `shell-ui` and platform UI `ui`, composed by Module Federation (`@module-federation/enhanced/rspack`) through the organization's own layer, `@scality/module-federation` (`FederatedComponent`, `ComponentWithFederatedImports`, `ShellHooksProvider`). The shell is the host: it declares `name: 'shell'` (shell-ui/rspack.config.ts:131) and has no `remotes`. It does not know the UIs at build time. At runtime, it reads the deployed UI list at `discoveryUrl` (shell-ui/src/initFederation/UIListProvider.tsx:70; shell-ui/public/config.json:15), fetches each one's `.well-known/micro-app-configuration` (shell-ui/src/initFederation/ConfigurationProviders.tsx:395), and extracts `remoteEntryPath`, views, `scope` and `module` from it. Views become routes (shell-ui/src/FederatedApp.tsx:97-98), each mounted by `FederatedComponent` with the UI's URL plus `remoteEntryPath` (shell-ui/src/FederatedApp.tsx:85-92). The same mechanism loads each UI's headless "navbar updaters" (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51-69) and, when declared, an MCP tools module (shell-ui/src/mcp/MCPRegistrar.tsx:195-211).

In the snapshot, the only listed UI is `metalk8s-ui` (shell-ui/public/deployed-ui-apps.json:3-6), whose configuration is in `ui/public/.well-known/micro-app-configuration` and matches `name: 'metalk8s'` and `exposes` in ui/rspack.config.ts:118-126. In production, Kubernetes resources applied by Salt make the connection: `ScalityUI` `shell-ui-cp` puts views `platform` and `alerts` from `metalk8s-ui` in the navbar (salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:41-50), and `ScalityUIComponentExposer` connects component `metalk8s-ui` to that `ScalityUI` (salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63). `ui` does not mount independently (the structural review leaves it `Undetermined`): it is output only as exposed module `./FederableApp`, receiving `shellHooks` and `shellAlerts` from the shell through props (shell-ui/src/FederatedApp.tsx:73-76; ui/src/FederableApp.tsx:120-122). Those props are callbacks and hooks delivered by the host, not a separate relationship. Through them `ui` also queries views discovered by the shell (ui/src/containers/ConfigProvider.tsx:7-9) and, in turn, loads a UI of another kind, `vm-management-ui`, absent from the repository (ui/src/containers/Layout.tsx:100-103, 246-260).

What did not become a relationship: development-only `remotes: { shell }` of `ui` became a configuration-only relationship (relationship 4), but `ui` code does not import `shell/...` modules, and the only connection to the shell is through generated types in `ui/@mf-types/` (ui/src/FederableApp.tsx:21). Also excluded were the instance name adapter (`InstanceName`, inactive, `No` in the source code review), hook `./platformLibrary` and the other `exposes` of `ui` without consumers in the code read, Guardian's iframe and `postMessage` (external assistant disabled by `canUseGuardian: false`, shell-ui/public/config.json:18), and the language `CustomEvent`, which is never fired. The last three are `No` in the source code review.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell-ui | ui | host → remote | source → target | module-federation | Yes | Yes | shell-ui/public/config.json:2-15 (navbar with views `platform` and `alerts` of kind `metalk8s-ui`; `discoveryUrl: "/shell/deployed-ui-apps.json"`); shell-ui/public/deployed-ui-apps.json:2-8 (UI `metalk8s-ui`, `url: "http://localhost:3000"`); ui/public/.well-known/micro-app-configuration:1-49 (kind `metalk8s-ui`, `remoteEntryPath: "/mf-manifest.json"`, views with `module: "./FederableApp"` and `scope: "metalk8s"`, `navbarUpdaterComponents` `./AlertsNavbarUpdater`, `publicPath: "/metalk8s"`); ui/rspack.config.ts:118-126 (`name: 'metalk8s'`, `filename` of remoteEntry, `exposes` `./FederableApp`, `./AlertsNavbarUpdater` and others); ui/rspack.config.ts:42 (`publicPath: '/metalk8s/'`); ui/rspack.config.ts:209 (port 3000); salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:41-50 (navbar of `ScalityUI` `shell-ui-cp` with views from `metalk8s-ui`); salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63 (`ScalityUIComponentExposer` connects `metalk8s-ui` to `shell-ui-cp`) | shell-ui/src/initFederation/UIListProvider.tsx:70; shell-ui/src/FederatedApp.tsx:85; shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51 |
| 2 | shell-ui | mcpTools | host → remote | source → target | module-federation | Undetermined | Undetermined | — | shell-ui/src/mcp/MCPRegistrar.tsx:201 |
| 3 | ui | vm-management-ui | host → remote | source → target | module-federation | Undetermined | Undetermined | — | ui/src/containers/Layout.tsx:251 |
| 4 | ui | shell-ui | host → remote | source → target | module-federation | Yes | No | ui/rspack.config.ts:128-132 (`remotes: { shell: 'shell@http://localhost:8084/shell/mf-manifest.json' }` only with `!isProduction`); shell-ui/rspack.config.ts:131 (`name: 'shell'`); shell-ui/rspack.config.ts:54 (`publicPath: '/shell/'`) | — |

## Observations

**1. shell-ui → ui.** Shell code is generic: it names neither `metalk8s` nor `ui`. The target is resolved through configurations. The deployed UI list has a single entry, of kind `metalk8s-ui` (shell-ui/public/deployed-ui-apps.json:3-6). That kind's `.well-known` configuration is in `ui/public/` (ui/public/.well-known/micro-app-configuration:5) and points views and navbar updater to scope `metalk8s` (:16-17, :26-27, :44-45). That scope and those modules are `name` and `exposes` in ui/rspack.config.ts:119-124. Hence In snapshot = `Yes`. The list's URL (`http://localhost:3000`) matches `ui`'s dev server port (ui/rspack.config.ts:209), but the match comes from the name and `exposes`, rather than the port. The three `Yes` source code review lines support Active = `Yes`: discovery (shell-ui/src/initFederation/UIListProvider.tsx:70), mounting views by route (shell-ui/src/FederatedApp.tsx:85) and loading navbar updaters (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51). In production, the list is not the shell's `public/` file; it is generated from `ScalityUI`/`ScalityUIComponentExposer` resources applied by Salt (salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63), with the same `discoveryUrl` (salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2:33). `ui` publishes remoteEntry with the version in its name (ui/rspack.config.ts:120), and the shell requests `mf-manifest.json` with `?version=` (shell-ui/src/FederatedApp.tsx:86).

**2. shell-ui → mcpTools.** `MCPRegistrar` reads `spec.mcpTools` from each deployed UI's build configuration and imports that module from the UI's remoteEntry (shell-ui/src/mcp/MCPRegistrar.tsx:186, 197-210). Without `mcpTools`, it returns `null` (:195). The only snapshot UI's configuration does not declare `mcpTools` (ui/public/.well-known/micro-app-configuration:7-49), nor does any other snapshot configuration file: the name appears only in shell code and tests. Hence no unit or module is identified as target: the field name remains as it appears in the artifact, with In snapshot = `Undetermined`. The only source code review line is `Undetermined`, hence Active = `Undetermined`. The registrar is mounted whenever discovery succeeds (shell-ui/src/FederatedApp.tsx:172).

**3. ui → vm-management-ui.** `ui` searches views discovered by the shell (ui/src/containers/ConfigProvider.tsx:7-9, reading `useDiscoveredViews` from `shellHooks`) for a federated view of kind `vm-management-ui` (ui/src/containers/Layout.tsx:100-103) and mounts it at `virtual-machines/*` with `FederatedComponent` over `${vmView.app.url}/mf-manifest.json` (ui/src/containers/Layout.tsx:246-258). Without it, the route falls back to 404 (:262). The kind appears only in this snapshot file: no unit declares it, nor do `deployed-ui-apps.json` or Salt resources list it. The URL only comes from runtime discovery. The name identifies the UI, but nothing in the snapshot says where it is or whether it belongs to another repository. Hence In snapshot = `Undetermined`, rather than `No`. Active = `Undetermined` through the single `Undetermined` source code review line. This is a nested relationship: its source is itself a remote mounted by the shell (relationship 1).

**4. ui → shell-ui.** The `ModuleFederationPlugin` of `ui` declares remote `shell` at `http://localhost:8084/shell/mf-manifest.json` only outside production (ui/rspack.config.ts:128-132). Name `shell` is the plugin's `name` in shell-ui/rspack.config.ts:131, and path `/shell/` is `publicPath` in shell-ui/rspack.config.ts:54 (port 8084, shell-ui/rspack.config.ts:225, only confirms). Hence In snapshot = `Yes`. No source code review line supports the relationship: `ui` does not import `shell/...`, and shell use in ui/src/FederableApp.tsx:21 is a type import from `ui/@mf-types/shell/App`, generated by MF and annotated `No`. Hence Active = `No`. During development, the remote serves to generate and download these types and allow running `ui` against the local shell. Shell hooks reach `ui` at runtime through props in relationship 1, rather than this remote.

## Summary

Relationships: 4 (host → remote: 4). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

