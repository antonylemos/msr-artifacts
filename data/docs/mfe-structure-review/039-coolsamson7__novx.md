---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Workspace

pnpm-workspace.yaml:1-3 (`packages: ["apps/*", "libs/*"]`); nx.json:18-44 (Nx plugins, `release` and `targetDefaults`), with one `project.json` per project in `apps/*`, `libs/*` and `tools/metadata`.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-78 (workspace root manifest) | — | — | — | — | No | Workspace coordination root; the scripts only delegate to nx (package.json:8-10), with no UI entry or build of its own. |
| apps/app | apps/app/package.json;apps/app/project.json;apps/app/webpack.config.js | apps/app/package.json:1-18 (own manifest) | apps/app/project.json:18-20 (own `main: apps/app/src/main.tsx` and `index`); apps/app/webpack.config.js:14 (`entry: "./apps/app/src/main.tsx"`); apps/app/src/main.tsx:27-32 (`createRoot(...).render(<App />)`) | apps/app/project.json:14-38 (`build` target with `@nx/webpack:webpack` and `webpackConfig: apps/app/webpack.config.js`); apps/app/webpack.config.js:96-98 (`HtmlWebpackPlugin` with `apps/app/index.html`); apps/app/package.json:6 (`nx build app`) | pnpm-workspace.yaml:2 (`apps/*`); apps/app/project.json:1-6 (Nx project `app`) | .github/workflows/docs.yml:34-35 (`pnpm nx build app --configuration=production`); .github/workflows/docs.yml:48-57 (copies `dist/apps/app` to the Pages artifact); .github/workflows/docs.yml:59-69 (`deploy-pages`) | Yes | React application with its own UI-mounting entry and webpack build target. |
| apps/microfrontend | apps/microfrontend/package.json;apps/microfrontend/project.json;apps/microfrontend/webpack.config.js | apps/microfrontend/package.json:1-14 (own manifest) | apps/microfrontend/project.json:18-20 (`main: apps/microfrontend/src/main.tsx` and `index`); apps/microfrontend/webpack.config.js:13-14 (commented-out `main.tsx` entry; `entry: './apps/microfrontend/src/bootstrap.ts'`); apps/microfrontend/src/bootstrap.ts:1 (`export {};`); apps/microfrontend/src/main.tsx:1-7 (imports only to register decorators, no render) | apps/microfrontend/project.json:14-23 (`build` target with `@nx/webpack:webpack` and its own `webpackConfig`); apps/microfrontend/webpack.config.js:52-73 (`ModuleFederationPlugin` with `exposes`; `HtmlWebpackPlugin` commented out at :70-72); apps/microfrontend/package.json:6 (`nx build microfrontend`) | pnpm-workspace.yaml:2 (`apps/*`); apps/microfrontend/project.json:1-6 (Nx project `microfrontend`) | — | Undetermined | Own build declared, but the entry used by webpack is an empty module and nothing in the directory starts the UI on its own. |
| libs/communication | libs/communication/package.json;libs/communication/project.json;libs/communication/rollup.config.json | libs/communication/package.json:1-4 (`@novx/communication`, "Communication library") | — | libs/communication/project.json:8-9 (`build` target with `@nx/rollup:rollup`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 and release.sh:25 (`nx build $LIB` and `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Library published on npm, with no application entry. |
| libs/core | libs/core/package.json;libs/core/project.json;libs/core/rollup.config.json | libs/core/package.json:1-4 (`@novx/core`, "DI and AOP library") | — | libs/core/project.json:8-9 (`build` target with `@nx/rollup:rollup`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 and release.sh:25 (`nx build $LIB` and `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Library published on npm, with no application entry. |
| libs/i18n | libs/i18n/package.json;libs/i18n/project.json;libs/i18n/rollup.config.json | libs/i18n/package.json:1-4 (`@novx/i18n`, "i18n library") | — | libs/i18n/project.json:8-9 (`build` target with `@nx/rollup:rollup`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 and release.sh:25 (`nx build $LIB` and `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Library published on npm, with no application entry. |
| libs/portal | libs/portal/package.json;libs/portal/project.json;libs/portal/rollup.config.json | libs/portal/package.json:1-4 (`@novx/portal`, "Portal library") | — | libs/portal/project.json:8-31 (`build` target with `@nx/rollup:rollup`, `main: libs/portal/src/index.ts`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 and release.sh:25 (`nx build $LIB` and `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Portal framework library, with no application entry. |
| tools/metadata | tools/metadata/package.json;tools/metadata/project.json | tools/metadata/package.json:1-8 (`@tools/metadata`, `bin: build-metadata`) | — | tools/metadata/project.json:6-11 (`build` target with `tsc`); tools/metadata/project.json:12-16 (`scan` target with `tsx`) | tools/metadata/project.json:1-4 (Nx project `metadata`) | — | No | Build tool (metadata scan for the manifests), not frontend. |
| ui | ui/package.json;ui/rollup.config.json | ui/package.json:1-4 (`@novx/ui`, "ui library") | — | ui/rollup.config.json:1-13 (library configuration, `main: src/index.ts`); ui/package.json:35 (`nx build ui`, no active `project.json`: only `ui/project.json.txt`) | — | — | No | UI library outside the pnpm workspace and without an active Nx project; no application entry. |

## Summary

Frontend applications in the snapshot: 1 (apps/app).

## Notes

- The classification records `frontend_units: 2` (shell `apps/app` and remote `apps/microfrontend`). This review counts one Yes row; `apps/microfrontend` was Undetermined because the entry does not start the UI on its own. The classification was not changed.
- In `apps/microfrontend`, the `main` in project.json:18 (`main.tsx`) and the `entry` in webpack.config.js:14 (`bootstrap.ts`) differ, and neither renders anything; the directory’s `index.html` is not used because `HtmlWebpackPlugin` is commented out (webpack.config.js:70-72). The directory produces only `remoteEntry.js` with `./Module` and `./MicrofrontendFeature` (webpack.config.js:53-59). Undetermined refers to running `apps/microfrontend` on its own, not its role as a remote, which is addressed by the composition review (protocol section 3.4.5).
- `apps/microfrontend` has no separate deployment: only the joint build in .github/workflows/ci.yml:33 (`nx run-many -t lint test build`). The docs workflow publishes only `apps/app`.
- `ui/` appears to be a disabled project: `ui/project.json.txt` declares `root: libs/ui`, a path that does not exist in the snapshot.
