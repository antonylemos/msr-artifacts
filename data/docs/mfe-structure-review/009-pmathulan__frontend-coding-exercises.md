---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Workspace

microfrontend-workspace/angular.json:5-14 (shell project); microfrontend-workspace/angular.json:114-122 (mfe1 project); microfrontend-workspace/angular.json:222-225 (shared library).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| angular-frontend-practical | angular-frontend-practical/angular.json;angular-frontend-practical/package.json | angular-frontend-practical/package.json:1-11 (own package) | angular-frontend-practical/angular.json:21-22 (index and browser); angular-frontend-practical/src/main.ts:1-6 (UI bootstrap) | angular-frontend-practical/angular.json:17-22 (application build target); angular-frontend-practical/package.json:7 (`ng build`) | — | — | Yes | Independent Angular application with its own entry and build. |
| microfrontend-workspace | microfrontend-workspace/angular.json;microfrontend-workspace/package.json | microfrontend-workspace/package.json:1-12 (workspace manifest) | — | — | — | — | No | Coordination root for the shell, mfe1 and shared projects, with no UI of its own. |
| microfrontend-workspace/projects/mfe1 | microfrontend-workspace/projects/mfe1/webpack.config.js;microfrontend-workspace/projects/mfe1/webpack.prod.config.js | — | microfrontend-workspace/angular.json:132 and microfrontend-workspace/angular.json:149 (index and main); microfrontend-workspace/projects/mfe1/src/bootstrap.ts:1-6 (UI bootstrap) | microfrontend-workspace/angular.json:125-131 (mfe1 build target); microfrontend-workspace/angular.json:150 (own webpack); microfrontend-workspace/package.json:7 (`ng build`) | microfrontend-workspace/angular.json:114-122 (mfe1 project) | — | Yes | Angular project with its own entry and build target, even without a local manifest. |
| microfrontend-workspace/projects/shared | microfrontend-workspace/projects/shared/package.json | microfrontend-workspace/projects/shared/package.json:1-12 (library) | — | microfrontend-workspace/angular.json:222-241 (ng-packagr library target) | microfrontend-workspace/angular.json:222-225 (shared project) | — | No | Shared library with no application entry. |
| microfrontend-workspace/projects/shell | microfrontend-workspace/projects/shell/webpack.config.js;microfrontend-workspace/projects/shell/webpack.prod.config.js | — | microfrontend-workspace/angular.json:24 and microfrontend-workspace/angular.json:41 (index and main); microfrontend-workspace/projects/shell/src/bootstrap.ts:1-6 (UI bootstrap) | microfrontend-workspace/angular.json:17-23 (shell build target); microfrontend-workspace/angular.json:42 (own webpack); microfrontend-workspace/package.json:7 (`ng build`) | microfrontend-workspace/angular.json:6-14 (shell project) | — | Yes | Angular project with its own entry and build target, even without a local manifest. |
| rate-limited-scheduler | rate-limited-scheduler/package.json | rate-limited-scheduler/package.json:1-9 (TypeScript utility) | — | rate-limited-scheduler/package.json:7 (`tsc`); rate-limited-scheduler/tsconfig.json:2-13 (compiles src to dist) | — | — | No | Scheduling and types utility, with no UI or frontend entry. |
| react-performance-practical | react-performance-practical/index.html;react-performance-practical/package.json;react-performance-practical/vite.config.ts | react-performance-practical/package.json:1-11 (own package) | react-performance-practical/index.html:10-11 (main.tsx entry); react-performance-practical/src/main.tsx:6-10 (mounts React) | react-performance-practical/vite.config.ts:6-11 (Vite configuration); react-performance-practical/package.json:8 (`tsc -b` and `vite build`) | — | — | Yes | Independent React application with its own entry and build. |
| ssr-app | ssr-app/angular.json;ssr-app/package.json | ssr-app/package.json:1-11 (own package) | ssr-app/angular.json:21-22 (index and browser); ssr-app/src/main.ts:1-6 (UI bootstrap) | ssr-app/angular.json:17-22 (application build target); ssr-app/package.json:7 (`ng build`) | — | — | Yes | Angular application with its own browser entry and build, including SSR. |

## Summary

Frontend applications in the snapshot: 5 (angular-frontend-practical, microfrontend-workspace/projects/mfe1, microfrontend-workspace/projects/shell, react-performance-practical, ssr-app).

## Notes

- The classification records frontend_units: 2 for shell and mfe1. This review follows all rows of units.csv and also finds three applications from other exercises (angular-frontend-practical, react-performance-practical and ssr-app), totaling five frontend units in the snapshot, without assessing their composition.
- angular-frontend-practical/angular.json and ssr-app/angular.json each declare a single project; they do not configure a workspace with multiple applications. The multi-project declaration is in microfrontend-workspace/angular.json.
- spa-helm is absent from units.csv and was not added to the table. Since the mining configuration review of 2026-10-21 (recorded in the original project document `docs/mfe-config-revisions.md`, which is not included in this package), the chart has ops-* occurrences in matches.csv, but it is generic and neither names nor builds any of the units; therefore the Deploy column remains "—". There is no ci-* occurrence.
