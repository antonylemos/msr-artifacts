---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
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

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| shell-ui/package.json:52 | dependencies | @scality/module-federation | 1.6.1 | module-federation | Yes | shell-ui/src/FederatedApp.tsx:6 (`import { FederatedComponent, FederatedComponentProps, SolutionUI } from '@scality/module-federation'`); shell-ui/src/FederatedApp.tsx:85-92 (`<FederatedComponent url=… module={module} scope={scope}>` mounts each remote); shell-ui/src/index.tsx:2 (the entry point imports `./FederatedApp`; `entry: './src/index.tsx'` in shell-ui/rspack.config.ts:46, build `rspack build -c rspack.config.ts` in shell-ui/package.json:9); shell-ui/rspack.config.ts:156-159 (`'@scality/module-federation': { singleton: true, eager: true }` in `shared`) |
| shell-ui/package.json:20 | devDependencies | @module-federation/enhanced | ^0.21.6 | module-federation | Yes | shell-ui/rspack.config.ts:6 (`import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack'`); shell-ui/rspack.config.ts:130-144 (`new ModuleFederationPlugin({ name: 'shell', … exposes: { './App', … } })`); shell-ui/package.json:9 (build `rspack build -c rspack.config.ts`); shell-ui/src/FederatedApp.tsx:12 (`import { loadShare } from '@module-federation/enhanced/runtime'`), used in `InternalApp` (shell-ui/src/FederatedApp.tsx:145-152) |
| ui/package.json:11 | dependencies | @scality/module-federation | 1.6.1 | module-federation | Yes | ui/rspack.config.ts:6 (`import { MicroAppRuntimeConfigurationPlugin } from '@scality/module-federation'`); ui/rspack.config.ts:171-206 (`new MicroAppRuntimeConfigurationPlugin({ kind: 'MicroAppRuntimeConfiguration', … })` in `plugins`); ui/package.json:39 (build `rspack build -c rspack.config.ts`); ui/src/FederableApp.tsx:20 and ui/src/FederableApp.tsx:120-122 (`ShellHooksProvider` from the package wraps exposed module `./FederableApp`, ui/rspack.config.ts:122); ui/rspack.config.ts:135-137 (`shared` singleton) |
| ui/package.json:75 | devDependencies | @module-federation/enhanced | ^0.21.6 | module-federation | Yes | ui/rspack.config.ts:5 (`import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack'`); ui/rspack.config.ts:118-127 (`new ModuleFederationPlugin({ name: 'metalk8s', filename: \`static/js/remoteEntry.${version}.js\`, exposes: { './FederableApp', … } })`); ui/package.json:39 (build `rspack build -c rspack.config.ts`) |

## Notes

- Two packages (`shell-ui/`, `ui/`), each with its own `rspack.config.ts`; each row's lists include the other package's occurrences in `other_package_matches`, which were not used as evidence for the row.
- `ui/rspack.config.ts:6` (import of `MicroAppRuntimeConfigurationPlugin` from `@scality/module-federation`) is absent from the inspection lists (which contain `:5`); it appeared only in grep.
- `shell-ui/src/FederatedApp.tsx:19-23` is in `same_package_matches`, but these are local imports from `./initFederation/…`, not from the package; package uses in that file are at `:6` and `:12`.
- `ui/@mf-types/**` are versioned generated shell types; they were not used as evidence.
- `ui/src/index.ts` (entry `metalk8s_ui` in ui/rspack.config.ts:32-34) has 0 bytes in the snapshot; the UI code enters through the plugin's `exposes`, rather than the entry. This does not change the answers.
- `ui/rspack.config.ts:128-132`: `remotes: { shell }` only outside production.

