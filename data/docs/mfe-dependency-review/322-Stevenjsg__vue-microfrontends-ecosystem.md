---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/cms/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/cms/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/cms/vite.config.ts:16-23 (`federation({ name: "cms_app", filename: "remoteEntry.js", exposes: { "./Cms": "./src/App.vue" }, shared: ["vue"] })`); default Vite configuration file, loaded by the scripts `vite build`/`vite preview` from apps/cms/package.json:8-10; the remote URL is in apps/shell/vite.config.ts:23 |
| apps/dashboard/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/dashboard/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/dashboard/vite.config.ts:18-25 (`federation({ name: "dashboard_app", filename: "remoteEntry.js", exposes: { "./Widget": "./src/components/WidgetDinero.vue" }, shared: ["vue"] })`); default Vite configuration file (apps/dashboard/package.json:7-10); the exposed module is consumed by the shell in apps/shell/src/App.vue:5-7 (`import('dashboard/Widget')`) |
| apps/kanban/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/kanban/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/kanban/vite.config.ts:16-23 (`federation({ name: "kanban_app", filename: "remoteEntry.js", exposes: { "./Kanban": "./src/App.vue" }, shared: ["vue"] })`); default Vite configuration file, loaded by the scripts in apps/kanban/package.json:7-10; the remote URL is in apps/shell/vite.config.ts:24 |
| apps/shell/package.json:16 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | apps/shell/vite.config.ts:4 (`import federation from "@originjs/vite-plugin-federation"`); apps/shell/vite.config.ts:19-27 (`federation({ name: "shell", remotes: { dashboard: …5001…, cms: …5002…, kanban: …5003… }, shared: ["vue"] })`); default Vite configuration file (apps/shell/package.json:7-9); apps/shell/src/App.vue:5-7 (`defineAsyncComponent(() => import('dashboard/Widget'))`), root component mounted by apps/shell/src/main.ts:3-5 |
| package.json:18 | devDependencies | turbo | ^2.6.1 | monorepo-tool | Undetermined | turbo.json:3-13 (tasks `dev`, `build`, `lint` configured); the only invocation of `turbo` is in the scripts in package.json:7-9, which do not count as use; no CI workflow, Dockerfile or automation script calling `turbo` (grep, excluding the lockfile); pnpm-workspace.yaml:1-3 (inspection item) only defines the pnpm workspace |

## Notes

- In `cms` and `kanban`, the plugin is configured and in use in each remote's build; the shell declares both in `remotes`, but does not import any module from them (recorded in the classification). This does not change the row answer, which concerns the package configured in the remote.
- The `pnpm-workspace.yaml:1` item in the `turbo` row is pnpm configuration, not Turborepo configuration; the configuration evidence for `turbo` is `turbo.json`, which is absent from the inspection list.

