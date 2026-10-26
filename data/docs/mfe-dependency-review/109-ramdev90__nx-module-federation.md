---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:15 | dependencies | @nx/angular | 22.5.4 | monorepo-tool | Yes | shell/project.json:9-26 (target `build` with executor `@nx/angular:webpack-browser`, `main: shell/src/main.ts` and `customWebpackConfig`); shell/project.json:60 (`@nx/angular:module-federation-dev-server`); products/project.json:10 and `:60` (`@nx/angular:webpack-browser`, `@nx/angular:dev-server`), same in orders/project.json:10 and `:60` and customer/project.json:10 and `:60`; nx.json:28-37 (`targetDefaults` for the executor) |
| package.json:25 | devDependencies | @module-federation/enhanced | ^0.21.2 | module-federation | Yes | shell/webpack.config.ts:1-9 (`withModuleFederation` from `@nx/module-federation/angular` invoked with shell/module-federation.config.ts:3-18, `remotes: ['products', 'orders', 'customer']`); products/webpack.config.ts:1-9 with products/module-federation.config.ts:3-8 (`exposes: { './Routes': ... }`), same in orders/ and customer/; shell/project.json:24-25 and products/project.json:24-25 (the build reads these configurations, also orders/ and customer/); package-lock.json:7612-7618 (`@nx/module-federation` depends on `@module-federation/enhanced`); no direct import of the package (grep, excluding the lockfile) |
| package.json:26 | devDependencies | @nx/eslint | 22.5.4 | monorepo-tool | Yes | shell/project.json:81-83 (target `lint` with executor `@nx/eslint:lint`), same in products/project.json:83, orders/project.json:83, customer/project.json:83 and apps/microfrontend-workspace/project.json:72; nx.json:19-27 (`targetDefaults` from `@nx/eslint:lint`) |
| package.json:27 | devDependencies | @nx/eslint-plugin | 22.5.4 | monorepo-tool | Yes | eslint.config.mjs:1-6 (`import nx from '@nx/eslint-plugin'` and `nx.configs['flat/base']`, `flat/typescript`, `flat/javascript`); eslint.config.mjs:13 (rule `@nx/enforce-module-boundaries`); shell/eslint.config.mjs:1-7 (imports the package and root configuration, `flat/angular`), same in `eslint.config.mjs` from products/, orders/, customer/ and apps/microfrontend-workspace/; project configurations with target `lint` (shell/project.json:81-83) |
| package.json:28 | devDependencies | @nx/js | 22.5.4 | monorepo-tool | No | no import, executor or plugin `@nx/js` in the snapshot code and configuration files (grep, excluding the lockfile); only declared in package.json:28 |
| package.json:29 | devDependencies | @nx/module-federation | 22.5.4 | monorepo-tool | Yes | shell/webpack.config.ts:1 and `:9` (`import { withModuleFederation } from '@nx/module-federation/angular'`, invoked in the export); shell/module-federation.config.ts:1-3 (type `ModuleFederationConfig`); same in products/, orders/ and customer/ (`webpack.config.ts:1-9`, `webpack.prod.config.ts:1-24`); shell/project.json:24-25 and `:43-44` (build and production build reference these files, also in the other three `project.json`) |
| package.json:30 | devDependencies | @nx/web | 22.5.4 | monorepo-tool | Yes | shell/project.json:84-91 (target `serve-static` with executor `@nx/web:file-server` and `buildTarget: shell:build`), same in products/project.json:85-93, orders/project.json:87, customer/project.json:87 and apps/microfrontend-workspace/project.json:76 |
| package.json:31 | devDependencies | @nx/webpack | 22.5.4 | monorepo-tool | No | no import, executor or plugin `@nx/webpack` in the snapshot code and configuration files (grep, excluding the lockfile); the builds use `@nx/angular:webpack-browser`; only declared in package.json:31 |
| package.json:32 | devDependencies | @nx/workspace | 22.5.4 | monorepo-tool | No | no import, executor or invocation of `@nx/workspace` in the snapshot code and configuration files (grep, excluding the lockfile); only declared in package.json:32 |
| package.json:41 | devDependencies | nx | 22.5.4 | monorepo-tool | Undetermined | nx.json:13-50 (`targetDefaults` and `generators` configured); `project.json` of each application with `$schema` of nx (shell/project.json:3); no invocation of `nx`: package.json:5 has `scripts` empty, there is no CI workflow or automation script in the snapshot (grep, excluding the lockfile); the mentions `nx build`, `nx graph` etc. are in the welcome template (shell/src/app/nx-welcome.ts:860-905), they are not invocations |

## Notes

- Both inspection lists exist only for `@module-federation/enhanced`, and no item imports that package: they are the `module-federation.config.ts` and `webpack*.config.ts` configurations, which use `@nx/module-federation`. I judged it `Yes` as in precedent 039 (MF plugin invoked through a wrapper): the invoked wrapper depends on the declared package, and the lockfile only shows that connection. Two list items are comments: shell/module-federation.config.ts:9 (external remote example) and `webpack.prod.config.ts:17` in the four projects (production override example).
- Evidence for the `@nx/*` packages (executors in `project.json`, imports in `eslint.config.mjs`) appeared outside the inspection lists.
- `nx`: unlike 006 and 039, there is no CI or script invoking `nx`; hence `Undetermined`, like `turbo` in 096. The `@nx/*` executors were judged by their reference in `project.json`, which is each application's build definition (there is no `angular.json`), serving the same role as `angular.json` in the `INSTRUCTIONS.md` example; the classification also bases the build chain on these files.
- The commit's `README.md` was removed from the snapshot by normalization (`preset:binaries`, the acquisition's normalization.json), and was not used.

