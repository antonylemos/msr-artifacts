---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Workspace

`package.json:5-7` declares `workspaces` with `packages/*` (npm workspaces).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-13 (root manifest, no dependencies) | — | package.json:10 (`npm run build --workspaces --if-present`, only delegates to workspaces) | — | — | No | npm workspace root, with neither entry nor build configuration of its own. |
| packages/dev-utils-remote | packages/dev-utils-remote/package.json;packages/dev-utils-remote/webpack.config.js | packages/dev-utils-remote/package.json:1-26 (own manifest) | packages/dev-utils-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/dev-utils-remote/src/index.ts:3 (`import("./bootstrap")`); packages/dev-utils-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/dev-utils-remote/webpack.config.js:44 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/dev-utils-remote/webpack.config.js:9-46 (own webpack configuration, `ModuleFederationPlugin` `devUtils` at :33-43, port 3005 at :28); packages/dev-utils-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` with `packages/*`) | — | Yes | React remote with its own UI-mounting entry and webpack build. |
| packages/ocr-remote | packages/ocr-remote/package.json;packages/ocr-remote/webpack.config.js | packages/ocr-remote/package.json:1-28 (own manifest) | packages/ocr-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/ocr-remote/src/index.ts:3 (`import("./bootstrap")`); packages/ocr-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/ocr-remote/webpack.config.js:44 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/ocr-remote/webpack.config.js:9-46 (own webpack configuration, `ModuleFederationPlugin` `ocr` at :33-43, port 3007 at :28); packages/ocr-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` with `packages/*`) | — | Yes | React remote with its own UI-mounting entry and webpack build. |
| packages/pdf-conversion-remote | packages/pdf-conversion-remote/package.json;packages/pdf-conversion-remote/webpack.config.js | packages/pdf-conversion-remote/package.json:1-32 (own manifest) | packages/pdf-conversion-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/pdf-conversion-remote/src/index.ts:3 (`import("./bootstrap")`); packages/pdf-conversion-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/pdf-conversion-remote/webpack.config.js:44 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/pdf-conversion-remote/webpack.config.js:9-46 (own webpack configuration, `ModuleFederationPlugin` `pdfConversion` at :33-43, port 3003 at :28); packages/pdf-conversion-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` with `packages/*`) | .github/workflows/ci.yml:18,36 (matrix that builds only this workspace: `npm run build --workspace=packages/${{ matrix.package }}`); .github/workflows/deploy.yml:43 (copies `packages/pdf-conversion-remote/dist` to `site/remotes/pdf-conversion/`, published on GitHub Pages at :46-60) | Yes | React remote with its own UI-mounting entry and webpack build. |
| packages/pdf-form-filler-remote | packages/pdf-form-filler-remote/package.json;packages/pdf-form-filler-remote/webpack.config.js | packages/pdf-form-filler-remote/package.json:1-28 (own manifest) | packages/pdf-form-filler-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/pdf-form-filler-remote/src/index.ts:3 (`import("./bootstrap")`); packages/pdf-form-filler-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/pdf-form-filler-remote/webpack.config.js:44 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/pdf-form-filler-remote/webpack.config.js:9-46 (own webpack configuration, `ModuleFederationPlugin` `pdfFormFiller` at :33-43, port 3006 at :28); packages/pdf-form-filler-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` with `packages/*`) | — | Yes | React remote with its own UI-mounting entry and webpack build. |
| packages/pdf-manipulation-remote | packages/pdf-manipulation-remote/package.json;packages/pdf-manipulation-remote/webpack.config.js | packages/pdf-manipulation-remote/package.json:1-28 (own manifest) | packages/pdf-manipulation-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/pdf-manipulation-remote/src/index.ts:3 (`import("./bootstrap")`); packages/pdf-manipulation-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/pdf-manipulation-remote/webpack.config.js:44 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/pdf-manipulation-remote/webpack.config.js:9-46 (own webpack configuration, `ModuleFederationPlugin` `pdfManipulation` at :33-43, port 3004 at :28); packages/pdf-manipulation-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` with `packages/*`) | .github/workflows/ci.yml:18,36 (matrix that builds only this workspace: `npm run build --workspace=packages/${{ matrix.package }}`); .github/workflows/deploy.yml:44 (copies `packages/pdf-manipulation-remote/dist` to `site/remotes/pdf-manipulation/`, published on GitHub Pages at :46-60) | Yes | React remote with its own UI-mounting entry and webpack build. |
| packages/shell | packages/shell/package.json;packages/shell/webpack.config.js | packages/shell/package.json:1-26 (own manifest) | packages/shell/webpack.config.js:28 (`entry: "./src/index.ts"`); packages/shell/src/index.ts:3 (`import("./bootstrap")`); packages/shell/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/shell/webpack.config.js:64 (`HtmlWebpackPlugin` with `./public/index.html`) | packages/shell/webpack.config.js:8-66 (own webpack configuration, `ModuleFederationPlugin` `shell` with five remotes at :50-63); packages/shell/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` with `packages/*`) | .github/workflows/ci.yml:18,36 (matrix that builds only this workspace: `npm run build --workspace=packages/${{ matrix.package }}`); .github/workflows/deploy.yml:42 (copies `packages/shell/dist` to the root of `site/`, published on GitHub Pages at :46-60) | Yes | React host with its own UI-mounting entry and webpack build. |

## Summary

Frontend applications in the snapshot: 6 (packages/dev-utils-remote, packages/ocr-remote, packages/pdf-conversion-remote, packages/pdf-form-filler-remote, packages/pdf-manipulation-remote, packages/shell).

## Notes

- N = 6 matches the classification’s `frontend_units: 6` (shell and five remotes, all in the snapshot).
- `.github/workflows/deploy.yml:37` builds all workspaces, but `:41-44` only copies the shell and the `pdf-conversion` and `pdf-manipulation` remotes to the published site. The `dev-utils`, `ocr` and `pdf-form-filler` remotes are not published by this workflow, although `packages/shell/webpack.config.js:17-25` points, in production, to `remotes/dev-utils/`, `remotes/pdf-form-filler/` and `remotes/ocr/`. The matrix in `.github/workflows/ci.yml:18` also covers only the first three. Therefore the Deploy column for these three rows remains `—`; this does not change the answer, because separate deployment is not required for `Yes`.
