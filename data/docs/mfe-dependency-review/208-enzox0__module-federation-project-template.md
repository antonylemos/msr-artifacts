---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/admin-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/admin-mf/vite.config.js:3-6 and apps/admin-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/admin-mf/module-federation.config.ts:2-5 (`name: 'adminMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/admin-mf/package.json:8 (`tsc && vite build`, which loads the directory Vite configuration) |
| apps/auth-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/auth-mf/vite.config.js:3-6 and apps/auth-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/auth-mf/module-federation.config.ts:2-5 (`name: 'authMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/auth-mf/package.json:8 (`tsc && vite build`) |
| apps/dashboard-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/dashboard-mf/vite.config.js:3-6 and apps/dashboard-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/dashboard-mf/module-federation.config.ts:2-5 (`name: 'dashboardMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/dashboard-mf/package.json:8 (`tsc && vite build`) |
| apps/messaging-mf/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/messaging-mf/vite.config.js:3-6 and apps/messaging-mf/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/messaging-mf/module-federation.config.ts:2-5 (`name: 'messagingMf'`, `exposes: { './App': './src/exposes.tsx' }`); apps/messaging-mf/package.json:8 (`tsc && vite build`) |
| apps/shell/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/shell/vite.config.js:3-6 and apps/shell/vite.config.ts:3-7 (`import federation from '@originjs/vite-plugin-federation'`; `plugins: [react(), federation(mfConfig)]`); apps/shell/module-federation.config.ts:2-9 (`name: 'shell'`, `remotes` `authMf`, `dashboardMf`, `adminMf`, `messagingMf`); apps/shell/package.json:8 (`tsc && vite build`) |
| package.json:30 | devDependencies | turbo | ^2.0.0 | monorepo-tool | Yes | turbo.json:4-19 (tasks `build`, `dev`, `lint`, `clean` configured); .github/workflows/ci.yml:3-7 and `:25-26` (an active job on push/PR to `main` runs `pnpm build` at the root); package.json:12 (`build`: `turbo run build`); apps/shell/Dockerfile:7 (`RUN pnpm build`, same in the other four apps) |

## Notes

- Each app versions `vite.config.ts` and the compiled `vite.config.js`; both import and invoke the plugin in the same way, so the answer does not depend on which one Vite resolves. The port discrepancy in `apps/shell/module-federation.config.js` (recorded in the classification) does not affect this stage.
- Each row's `other_package_matches` are the same configurations from the other four apps; each row was judged by its own app's configuration. Outside the lists, grep for the package found only `vite.config.*` files (excluding the lockfile).
- `turbo`: the only `turbo` command is in the root `build` script, which alone does not count as use; the `Yes` answer relies on the active CI job executing that script, and `turbo.json` configures the `build` task. The app Dockerfiles (`apps/*/Dockerfile:7`) also run `pnpm build`.

