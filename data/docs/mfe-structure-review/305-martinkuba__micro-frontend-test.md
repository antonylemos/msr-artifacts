---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Workspace

`package.json:14-18` (npm `workspaces`: `packages/shell`, `packages/main-content`, `packages/sidebar`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — (package.json:11 `build` only delegates: `npm run build --workspaces`) | — | — | No | npm workspace root: coordinates the packages, with neither entry nor build configuration of its own |
| packages/main-content | packages/main-content/package.json;packages/main-content/webpack.config.js | packages/main-content/package.json | packages/main-content/webpack.config.js:8 (`entry: './src/index.ts'`); packages/main-content/src/index.ts:1 (only re-exports `MainContent`, no render); no `index.html` in the directory | packages/main-content/webpack.config.js:30-43 (`ModuleFederationPlugin` with `filename: 'remoteEntry.js'`); packages/main-content/package.json:7 (`webpack --config webpack.config.js`) | package.json:16 (`packages/main-content`) | — | Undetermined | Own federated build, but the entry only re-exports the component and nothing in the directory starts the UI on its own |
| packages/shell | packages/shell/package.json;packages/shell/webpack.config.js | packages/shell/package.json | packages/shell/webpack.config.js:9 (`entry: './src/index.tsx'`); packages/shell/src/index.tsx:2 (`import('./bootstrap')`); packages/shell/src/bootstrap.tsx:14-19 (`createRoot(container).render(<App />)`); packages/shell/webpack.config.js:44-47 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/shell/webpack.config.js:31-48 (host `ModuleFederationPlugin` and `HtmlWebpackPlugin`); packages/shell/package.json:7 (`webpack --config webpack.config.js`) | package.json:15 (`packages/shell`) | — | Yes | React host with its own UI-mounting entry and webpack build |
| packages/sidebar | packages/sidebar/package.json;packages/sidebar/webpack.config.js | packages/sidebar/package.json | packages/sidebar/webpack.config.js:8 (`entry: './src/index.ts'`); packages/sidebar/src/index.ts:1 (only re-exports `Sidebar`, no render); no `index.html` in the directory | packages/sidebar/webpack.config.js:30-42 (`ModuleFederationPlugin` with `filename: 'remoteEntry.js'`); packages/sidebar/package.json:7 (`webpack --config webpack.config.js`) | package.json:17 (`packages/sidebar`) | — | Undetermined | Own federated build, but the entry only re-exports the component and nothing in the directory starts the UI on its own |

## Summary

Frontend applications in the snapshot: 1 (packages/shell).

## Notes

- The classification records `frontend_units: 2` (shell and main-content; sidebar does not count because it is disconnected). This review counts one Yes row: `packages/main-content` and `packages/sidebar` were Undetermined, like the remotes in 039 and 084, because the federated build produces only `remoteEntry.js` and the `src/index.ts` entry only re-exports the component. Undetermined refers to running the package on its own, not its role as a remote, which is addressed by the composition review (protocol section 3.4.5). The classification was not changed.
- The `ops-cors` occurrences in `matches.csv` (`packages/*/webpack.config.js:51` and `packages/shell/webpack.config.js:57`) are `devServer` headers, not deployment. There is no Dockerfile, CI workflow or hosting configuration in the snapshot.
- Each package has its own port in `devServer` (shell 3000, main-content 3001, sidebar 3002: `packages/shell/webpack.config.js:50`, `packages/main-content/webpack.config.js:45`, `packages/sidebar/webpack.config.js:45`), but only to serve `dist` and `remoteEntry.js` in development.
