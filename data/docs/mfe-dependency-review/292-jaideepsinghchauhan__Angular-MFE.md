---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:17 | dependencies | @nx/angular | 21.2.0 | monorepo-tool | Yes | appshell/host/project.json:9-27 (target `build` with executor `@nx/angular:webpack-browser`, `main: appshell/host/src/main.ts` and `customWebpackConfig`); appshell/host/project.json:61 (`@nx/angular:module-federation-dev-server`); appshell/mfe1/project.json:10 and `:61` (`@nx/angular:webpack-browser`, `@nx/angular:dev-server`), same in appshell/mfe2/project.json:10 and `:61`; nx.json:49-59 (`targetDefaults` of the executor) |
| package.json:27 | devDependencies | @module-federation/enhanced | ^0.9.0 | module-federation | Yes | appshell/host/webpack.config.ts:1-9 (`withModuleFederation` from `@nx/module-federation/angular` invoked with appshell/host/module-federation.config.ts:3-18, `remotes: ['mfe1', 'mfe2']`); appshell/mfe1/webpack.config.ts:1-9 with appshell/mfe1/module-federation.config.ts:3-10 (`exposes: { './Routes': ..., './GreetingComponent': ... }`), same in appshell/mfe2/ (`exposes: { './Routes': ... }`); appshell/host/project.json:25-26 and `:44-45` (build and production build read these configurations, also in appshell/mfe1/project.json and appshell/mfe2/project.json); package-lock.json:8765-8771 (`@nx/module-federation` depends on `@module-federation/enhanced`); no direct import of the package (grep, excluding the lockfile) |
| package.json:28 | devDependencies | @nx/cypress | 21.2.0 | monorepo-tool | Yes | nx.json:62-70 (plugin `@nx/cypress/plugin` registered, with `targetName: e2e`); apps/angular-monorepo-e2e/cypress.config.ts:1 and `:6-14` (`nxE2EPreset` imported from `@nx/cypress/plugins/cypress-preset` and invoked); apps/angular-monorepo-e2e/project.json:8-9 (targets inferred by the plugins) |
| package.json:29 | devDependencies | @nx/devkit | 21.2.0 | monorepo-tool | Yes | appshell/host-e2e/playwright.config.ts:3 and `:30` (`import { workspaceRoot } from '@nx/devkit'`, used in `webServer.cwd`), same in appshell/mfe1-e2e/playwright.config.ts:3 and appshell/mfe2-e2e/playwright.config.ts:3; nx.json:77-82 (plugin `@nx/playwright/plugin` infers target `e2e` from these configurations; appshell/host-e2e/project.json:7-8 no own targets) |
| package.json:30 | devDependencies | @nx/eslint | 21.2.0 | monorepo-tool | Yes | nx.json:71-76 (plugin `@nx/eslint/plugin`); appshell/host/project.json:82-84 (target `lint` with executor `@nx/eslint:lint`), same in appshell/mfe1/project.json:84, appshell/mfe2/project.json:84, libs/shared/ui/project.json:17, libs/shared/data/project.json:17 and apps/angular-monorepo/project.json:73; nx.json:27-35 (`targetDefaults` from `@nx/eslint:lint`) |
| package.json:31 | devDependencies | @nx/eslint-plugin | 21.2.0 | monorepo-tool | Yes | eslint.config.mjs:1-6 (`import nx from '@nx/eslint-plugin'` and `nx.configs['flat/base']`, `flat/typescript`, `flat/javascript`); eslint.config.mjs:13 (rule `@nx/enforce-module-boundaries`); appshell/host/eslint.config.mjs:1-7 (imports the package and root configuration, `flat/angular`), same in `eslint.config.mjs` from appshell/mfe1/, appshell/mfe2/, libs/shared/ui/, libs/shared/data/ and apps/angular-monorepo/; project configurations with target `lint` (appshell/host/project.json:82-84) |
| package.json:32 | devDependencies | @nx/jest | 21.2.0 | monorepo-tool | Yes | appshell/host/project.json:85-91 (target `test` with executor `@nx/jest:jest` and `jestConfig: appshell/host/jest.config.ts`), same in appshell/mfe1/project.json:87-90, appshell/mfe2/project.json:87-90, libs/shared/ui/project.json:9-15 and libs/shared/data/project.json:9-15; jest.preset.js:1-3 (`require('@nx/jest/preset')`), used by appshell/host/jest.config.ts:3 (`preset: '../../jest.preset.js'`); jest.config.ts:2-5 (`getJestProjectsAsync`); nx.json:36-48 (`targetDefaults` from `@nx/jest:jest`) |
| package.json:33 | devDependencies | @nx/js | 21.2.0 | monorepo-tool | No | no import, executor or plugin `@nx/js` in the snapshot code and configuration files (grep, excluding the lockfile); only declared in package.json:33 |
| package.json:34 | devDependencies | @nx/module-federation | 21.2.0 | monorepo-tool | Yes | appshell/host/webpack.config.ts:1 and `:9` (`import { withModuleFederation } from '@nx/module-federation/angular'`, invoked in the export); appshell/host/module-federation.config.ts:1-3 (type `ModuleFederationConfig`); same in appshell/mfe1/ and appshell/mfe2/ (`webpack.config.ts:1-9`, `webpack.prod.config.ts:1-24`, `module-federation.config.ts:1-3`); appshell/host/project.json:25-26 and `:44-45` (build and production build reference these files, also in appshell/mfe1/project.json:25-26 and `:44-45` and appshell/mfe2/project.json:25-26 and `:44-45`) |
| package.json:35 | devDependencies | @nx/playwright | 21.2.0 | monorepo-tool | Yes | nx.json:77-82 (plugin `@nx/playwright/plugin` registered, with `targetName: e2e`); appshell/host-e2e/playwright.config.ts:2 and `:18` (`nxE2EPreset` imported from `@nx/playwright/preset` and invoked), same in appshell/mfe1-e2e/playwright.config.ts:2 and appshell/mfe2-e2e/playwright.config.ts:2 |
| package.json:36 | devDependencies | @nx/web | 21.2.0 | monorepo-tool | Yes | appshell/host/project.json:92-99 (target `serve-static` with executor `@nx/web:file-server` and `buildTarget: host:build`), same in appshell/mfe1/project.json:95, appshell/mfe2/project.json:95 and apps/angular-monorepo/project.json:75-83 |
| package.json:37 | devDependencies | @nx/webpack | 21.2.0 | monorepo-tool | No | no import, executor or plugin `@nx/webpack` in the snapshot code and configuration files (grep, excluding the lockfile); the builds use `@nx/angular:webpack-browser` (appshell/host/project.json:10); only declared in package.json:37 |
| package.json:38 | devDependencies | @nx/workspace | 21.2.0 | monorepo-tool | No | no import, executor or invocation of `@nx/workspace` in the snapshot code and configuration files (grep, excluding the lockfile; `.gitignore:42` and `.prettierignore:5` mention only the directory `.nx/workspace-data`); only declared in package.json:38 |
| package.json:56 | devDependencies | nx | 21.2.0 | monorepo-tool | Yes | appshell/host-e2e/playwright.config.ts:26-31 (`webServer.command: 'npx nx run host:serve'`), same in appshell/mfe1-e2e/playwright.config.ts:27 and appshell/mfe2-e2e/playwright.config.ts:27; these configurations are read by target `e2e` inferred from the plugin in nx.json:77-82; apps/angular-monorepo-e2e/cypress.config.ts:8-12 (`webServerCommands` with `npx nx run angular-monorepo:serve`); nx.json:21-98 (`targetDefaults`, `plugins` and `generators` configured) |

## Notes

- The inspection lists exist only for `@module-federation/enhanced`, and no item imports that package: they are the `module-federation.config.ts` and `webpack*.config.ts` configurations, which use `@nx/module-federation`. I judged it `Yes` as in precedents 039 and 109 (MF plugin invoked through a wrapper, connection shown by the lockfile). Two list items are comments: appshell/host/module-federation.config.ts:9 (external remote example) and `webpack.prod.config.ts:17` in the three projects (production override example).
- Evidence for the `@nx/*` packages and `nx` (executors in `project.json`, plugins in `nx.json`, imports in `eslint.config.mjs`, `jest.preset.js`, `playwright.config.ts` and `cypress.config.ts`) appeared outside the inspection lists.
- `nx`: unlike 109 (`Undetermined`, no invocation), here the host and remote e2e configurations invoke `nx` in `webServer`, and these are the same configurations supporting `@nx/devkit` and `@nx/playwright`. There is no CI or script: package.json:5 has an empty `scripts`. The `npx nx ...` commands in README.md:21-84 do not count as use.
- The Cypress e2e (`apps/angular-monorepo-e2e/`) serves the default Nx application, outside the composition; it only supports `@nx/cypress`, which also has its plugin registered in nx.json.
- The `@nx/*` executors were judged by their reference in `project.json`, which is each application's build definition (there is no `angular.json`), as in 109.

