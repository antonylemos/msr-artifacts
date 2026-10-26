---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 006 — Pandian-it/eager-workspace1

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:37 | devDependencies | @angular-architects/module-federation | ^20.0.0 | module-federation | Yes | projects/shell/webpack.config.js:1-18 (`withModuleFederationPlugin` and `shareAll` imported and invoked); projects/shell/project.json:19-40 (build with `@nx/angular:webpack-browser` references this configuration) |
| package.json:46 | devDependencies | @nx/angular | 21.3.11 | monorepo-tool | Yes | projects/shell/project.json:19-40 (executor `@nx/angular:webpack-browser` in target `build`); .github/workflows/Push-Event-To-Release.yml:140-145 (the pipeline runs `nx build` for affected projects) |
| package.json:47 | devDependencies | @nx/workspace | 21.3.11 | monorepo-tool | No | no import, executor or invocation of `@nx/workspace` in the snapshot code, configuration and workflow files (literal search, excluding lockfiles); only declared in package.json:47 |
| package.json:59 | devDependencies | nx | 21.3.11 | monorepo-tool | Yes | .github/workflows/User-Pull-Request.yml:36-54 (an active job invokes `npx nx show projects` and `npx nx affected --target=build`); nx.json:3-20 (build and test defaults configured) |

## Notes

- The tooling occurrences are the same for the three Nx packages, but do not demonstrate use of `@nx/workspace`. The workflow commands invoke `nx`, and the build executor belongs to `@nx/angular`.
- The lint/test jobs in .github/workflows/User-Pull-Request.yml:88-103 are commented out; they do not support the answers.
- The federation configurations belong to the packages in projects/<app>/ and use the dependency declared at the root.

