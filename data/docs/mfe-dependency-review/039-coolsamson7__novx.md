---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:14 | devDependencies | @nrwl/eslint-plugin-nx | ^19.8.4 | monorepo-tool | No | no import, plugin or invocation of `@nrwl/eslint-plugin-nx` in the snapshot code, configuration and workflow files (grep for `nrwl`, excluding the lockfile); only declared in package.json:14 (`.vscode/extensions.json:3` cites the extension `nrwl.angular-console`, not the package) |
| package.json:15 | devDependencies | @nx/eslint | 22.5.3 | monorepo-tool | Yes | nx.json:18-22 (plugin `@nx/eslint`); apps/app/project.json:56-61 and apps/microfrontend/project.json:32-37 (target `lint` with executor `@nx/eslint:lint`, also in `project.json` of the libs); .github/workflows/ci.yml:33 (`pnpm nx run-many -t lint test build`) |
| package.json:16 | devDependencies | @nx/eslint-plugin | 22.5.3 | monorepo-tool | Yes | eslint.config.mjs:1-6 (`import nx from '@nx/eslint-plugin'` and `nx.configs['flat/base']`, `flat/typescript`, `flat/javascript`); eslint.config.mjs:13 (rule `@nx/enforce-module-boundaries`); root configuration used by target `lint` (apps/app/project.json:56-61, with no configuration of its own in `apps/app/`) run in .github/workflows/ci.yml:33 |
| package.json:17 | devDependencies | @nx/js | 22.5.3 | monorepo-tool | Yes | nx.json:18-19 (plugin `@nx/js`, loaded on every nx execution, such as in .github/workflows/ci.yml:33); libs/portal/project.json:32-41 (target `build:types` with executor `@nx/js:tsc`) |
| package.json:18 | devDependencies | @nx/rollup | 22.5.3 | monorepo-tool | Yes | nx.json:18-20 (plugin `@nx/rollup`); libs/portal/project.json:8-31 and libs/core/project.json:8-9 (target `build` with executor `@nx/rollup:rollup`, also in `libs/communication` and `libs/i18n`); .github/workflows/ci.yml:33 (`build`); release.sh:5 (`npx nx build $LIB`) |
| package.json:19 | devDependencies | @nx/vite | 22.5.3 | monorepo-tool | Yes | apps/app/vitest.config.ts:2 and apps/app/vitest.config.ts:7-8 (`nxViteTsPaths` imported from `@nx/vite/plugins/nx-tsconfig-paths.plugin` and used in `plugins`); apps/app/project.json:62-67 (target `test` with `configFile: apps/app/vitest.config.ts`); .github/workflows/ci.yml:33 (`test`) |
| package.json:20 | devDependencies | @nx/vitest | 22.5.3 | monorepo-tool | Yes | apps/app/project.json:62-67 and apps/microfrontend/project.json:38-44 (target `test` with executor `@nx/vitest:test`, also in `project.json` of the libs); .github/workflows/ci.yml:33 (`test`) |
| package.json:21 | devDependencies | @nx/webpack | 22.5.3 | monorepo-tool | Yes | apps/app/project.json:14-21 (target `build` with executor `@nx/webpack:webpack` and `webpackConfig: apps/app/webpack.config.js`); apps/app/project.json:39-44 (`@nx/webpack:dev-server`); apps/microfrontend/project.json:14-30 (same); .github/workflows/docs.yml:34-35 (`pnpm nx build app --configuration=production`); .github/workflows/ci.yml:33 |
| package.json:44 | devDependencies | nx | 22.5.3 | monorepo-tool | Yes | .github/workflows/ci.yml:31-33 (an active job runs `pnpm nx run-many -t lint test build`); .github/workflows/docs.yml:34-35 (`pnpm nx build app`); nx.json:18-44 (plugins, `release` and `targetDefaults` configured) |

## Notes

- `same_package_matches` provides the same two occurrences for the nine packages (`.github/workflows/ci.yml:33` and `pnpm-workspace.yaml:1`), which only show the use of `nx` and the pnpm workspace. Evidence for the `@nx/*` plugins (executors in `project.json`, plugins in `nx.json`, imports in `eslint.config.mjs` and `vitest.config.ts`) appeared outside the inspection lists.
- The `build`, `lint` and `test` scripts in package.json:8-10 invoke `nx`, but a script does not count as use; the answers rely on the workflows and `project.json` files.
- `ui/` has `package.json` and `nx build ui` scripts (ui/package.json:35-37), but the project is disabled (`ui/project.json.txt`, no `project.json`); it was not used as evidence.

