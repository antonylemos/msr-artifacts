---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| frontend/vite/host/package.json:17 | devDependencies | @module-federation/vite | latest | module-federation | Yes | frontend/vite/host/vite.config.js:3 (`import { federation } from "@module-federation/vite"`); frontend/vite/host/vite.config.js:11-38 (`federation({ name: 'host', exposes, remotes, shared })` in `plugins`); frontend/vite/host/package.json:8 (`vite build`, which uses the `vite.config.js` in the directory); frontend/vite/host/src/pages/MainPage.vue:6-7 (federated imports `remote_inputs/InputsContainer` and `remote_results/ResultsContainer`, page for route `/app` in frontend/vite/host/src/main.js:14) |
| frontend/vite/remote-inputs/package.json:16 | devDependencies | @module-federation/vite | latest | module-federation | Yes | frontend/vite/remote-inputs/vite.config.js:3 (`import { federation } from "@module-federation/vite"`); frontend/vite/remote-inputs/vite.config.js:11-31 (`federation({ name: 'remote_inputs', exposes: { "./InputsContainer" }, remotes: { host } })` in `plugins`); frontend/vite/remote-inputs/package.json:8 (`vite build`); frontend/vite/host/vite.config.js:23-27 (the host consumes `remote_inputs`) |
| frontend/vite/remote-results/package.json:16 | devDependencies | @module-federation/vite | latest | module-federation | Yes | frontend/vite/remote-results/vite.config.js:3 (`import { federation } from "@module-federation/vite"`); frontend/vite/remote-results/vite.config.js:11-31 (`federation({ name: 'remote_results', exposes: { "./ResultsContainer" }, remotes: { host } })` in `plugins`); frontend/vite/remote-results/package.json:8 (`vite build`); frontend/vite/host/vite.config.js:28-32 (the host consumes `remote_results`) |

## Notes

- Each package has the plugin in its own `vite.config.js`; the `other_package_matches` occurrences are the other two packages' configurations, which use the package declared in those packages themselves.
- Outside the lists, the search for the package name (grep in `*.js`, `*.ts`, `*.mjs`, `*.cjs`, `*.json`, `*.vue`, excluding lockfiles) finds only the three `import` statements in `vite.config.js:3` and three declarations in `package.json`.

