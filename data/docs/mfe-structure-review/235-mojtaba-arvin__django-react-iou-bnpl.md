---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Workspace

`frontend/pnpm-workspace.yaml:1-5` declares `packages` with `shared`, `shell`, `customer-app` and `merchant-app` (pnpm); `frontend/package.json:5-10` repeats the list in `workspaces`.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| frontend | frontend/package.json | frontend/package.json:1-88 (workspace root manifest, with common dependencies) | — | frontend/package.json:14 (`pnpm --filter ... build`, only delegates to packages) | — | frontend/Dockerfile.dev:3-52 (development image with pnpm, no build, `CMD ["sh"]`); docker-compose.dev.yml:149-171 (`bnpl-frontend` service mounts `./frontend` and exposes 3000-3002) | No | pnpm workspace root, with neither entry nor build configuration of its own. |
| frontend/customer-app | frontend/customer-app/package.json;frontend/customer-app/webpack.config.js | frontend/customer-app/package.json:1-17 (own manifest, `@bnpl/customer-app`) | frontend/customer-app/webpack.config.js:14-22 (`entry` standalone `src/infrastructure/standalone/standalone-app.bootstrap.tsx` or remote `src/infrastructure/federation/remote-entry.module.ts`); frontend/customer-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8 (`renderStandaloneApp(document.getElementById('root')!, ...)`); frontend/customer-app/webpack.config.js:74-79 (`HtmlWebpackPlugin` with `public/index.html` in standalone mode) | frontend/customer-app/webpack.config.js:6-137 (own webpack configuration, `ModuleFederationPlugin` `customer_app` at :81-116, port 3001 at :121); frontend/customer-app/package.json:7 (`webpack --env standalone=false`) and :9 (`build:standalone`) | frontend/pnpm-workspace.yaml:4 (`customer-app`) | — | Yes | React remote with its own UI-mounting standalone entry and webpack build. |
| frontend/merchant-app | frontend/merchant-app/package.json;frontend/merchant-app/webpack.config.js | frontend/merchant-app/package.json:1-18 (own manifest, `@bnpl/merchant-app`) | frontend/merchant-app/webpack.config.js:14-22 (`entry` standalone `src/infrastructure/standalone/standalone-app.bootstrap.tsx` or remote `src/infrastructure/federation/remote-entry.module.ts`); frontend/merchant-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8 (`renderStandaloneApp(document.getElementById('root')!, ...)`); frontend/merchant-app/webpack.config.js:74-79 (`HtmlWebpackPlugin` with `public/index.html` in standalone mode) | frontend/merchant-app/webpack.config.js:6-137 (own webpack configuration, `ModuleFederationPlugin` `merchant_app` at :81-116, port 3002 at :121); frontend/merchant-app/package.json:7 (`webpack --env standalone=false`) and :9 (`build:standalone`) | frontend/pnpm-workspace.yaml:5 (`merchant-app`) | — | Yes | React remote with its own UI-mounting standalone entry and webpack build. |
| frontend/shared | frontend/shared/package.json | frontend/shared/package.json:1-15 (own manifest, `@bnpl/shared`, `main: src/index.ts`) | — | frontend/shared/package.json:8 (`tsc -p tsconfig.build.json`, library compilation) | frontend/pnpm-workspace.yaml:2 (`shared`) | — | No | Shared workspace library (exports from `src/index.ts`), with no application entry. |
| frontend/shell | frontend/shell/package.json;frontend/shell/webpack.config.js | frontend/shell/package.json:1-15 (own manifest, `shell`) | frontend/shell/webpack.config.js:7 (`entry: "./src/infrastructure/shell/shell-app.bootstrap.tsx"`); frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81 (`ReactDOM.createRoot(document.getElementById('root')!)`); frontend/shell/webpack.config.js:95-98 (`HtmlWebpackPlugin` with `public/index.html`) | frontend/shell/webpack.config.js:6-115 (own webpack configuration, `ModuleFederationPlugin` `shell` with two remotes at :59-94, port 3000 at :16); frontend/shell/package.json:7 (`webpack --config webpack.config.js`) | frontend/pnpm-workspace.yaml:3 (`shell`) | — | Yes | React host with its own UI-mounting entry and webpack build. |

## Summary

Frontend applications in the snapshot: 3 (frontend/customer-app, frontend/merchant-app, frontend/shell).

## Notes

- N = 3 matches the classification’s `frontend_units: 3` (shell and two remotes; the `shared` library does not count).
- In the remotes, the remote-mode entry (`src/infrastructure/federation/remote-entry.module.ts`) is an empty file (0 bytes); the federated content comes from `exposes` (`webpack.config.js:85-88`). The entry that starts its own UI is the standalone-mode entry, which is why it was cited.
- The only frontend deployment artifact is the development image in `frontend/Dockerfile.dev`, shared by the four packages; the two CI workflows (`.github/workflows/backend-*.yml`) handle only the backend.
