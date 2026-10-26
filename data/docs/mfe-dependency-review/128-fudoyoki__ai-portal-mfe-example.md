---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/mfe-dashboard/package.json:21 | devDependencies | @originjs/vite-plugin-federation | ^1.3.6 | module-federation | Yes | apps/mfe-dashboard/vite.config.ts:3 (`import federation from '@originjs/vite-plugin-federation'`); apps/mfe-dashboard/vite.config.ts:9-40 (the default Vite configuration invokes `federation` in plugins with `name: 'mfeDashboard'`, `filename: 'remoteEntry.js'`, `exposes` `./DashboardApp` and `shared`); apps/mfe-dashboard/package.json:6-9 (`dev`, `build` and `preview` run `vite` with no alternative configuration) |
| apps/shell/package.json:22 | devDependencies | @originjs/vite-plugin-federation | ^1.3.6 | module-federation | Yes | apps/shell/vite.config.ts:3 (`import federation from '@originjs/vite-plugin-federation'`); apps/shell/vite.config.ts:26-60 (the default Vite configuration invokes `federation` in plugins with `name: 'shell'`, `remotes` `mfeDashboard` and `shared`); apps/shell/package.json:6-9 (`dev`, `build` and `preview` run `vite` with no alternative configuration); apps/shell/src/App.tsx:7 (`React.lazy(() => import('mfeDashboard/DashboardApp'))`) |
| package.json:18 | devDependencies | turbo | ^2.3.0 | monorepo-tool | Undetermined | turbo.json:3-25 (tasks `build`, `dev`, `lint`, `test`, `test:coverage`, `clean` configured); the only invocation of `turbo` is in the scripts in package.json:10-15, which do not count as use; apps/shell/Dockerfile:8 and apps/mfe-dashboard/Dockerfile:8 only copy `turbo.json`, and the build runs `npm run build --workspace=...` (apps/shell/Dockerfile:18-20; apps/mfe-dashboard/Dockerfile:18-20); docker-compose.dev.yml:11 uses `npm run dev --workspace=@ai-portal/shell`; no CI workflow in the snapshot (grep, excluding the lockfile) |

## Notes

- Each app has its own `vite.config.ts` using the plugin; the `other_package_matches` occurrences belong to the other app and were not used as evidence for the row.
- `turbo`: there is configuration (`turbo.json`), but no build or automation file invokes the package outside `package.json` scripts; the Dockerfiles copy `turbo.json` without calling it. Hence `Undetermined`, rather than `Yes`.

