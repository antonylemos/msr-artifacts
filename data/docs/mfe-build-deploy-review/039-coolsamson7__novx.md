---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
inputs:
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

## Repository overview

Nx monorepo with pnpm workspace (pnpm-workspace.yaml:1-3) for a React portal framework: four libraries in `libs/` and a reference app with shell `apps/app` and remote `apps/microfrontend`. Each app has an Nx project with its own `build` target through executor `@nx/webpack:webpack` and its own `webpack.config.js` (apps/app/project.json:14-38; apps/microfrontend/project.json:14-23); app `package.json` files only delegate to nx (apps/app/package.json:6; apps/microfrontend/package.json:6). Root triggers every project’s build with `nx run-many --target=build --all` (package.json:8), but each project generates its own output (apps/app/webpack.config.js:19; apps/microfrontend/webpack.config.js:27).

There are two GitHub Actions workflows. CI runs lint, tests and build for all projects on push and pull request (.github/workflows/ci.yml:3-7, :33) and publishes nothing. The documentation workflow, on pushes to `main`, builds only `apps/app` in production with `PUBLIC_URL: /novx/sample/` (.github/workflows/docs.yml:34-37), generates library typedoc documentation in `dist/docs` (.github/workflows/docs.yml:45-46; typedoc.json:2-10), copies `dist/apps/app` to `dist/docs/sample` (.github/workflows/docs.yml:48-52) and publishes that folder to GitHub Pages (.github/workflows/docs.yml:54-57, :59-69). This is the snapshot’s only frontend deployment, covering shell alone. `PUBLIC_URL` becomes shell’s `publicPath` (apps/app/webpack.config.js:20). Root script `deploy` (`pnpm build:site && gh-pages -d dist/apps/app`, package.json:11) calls a `build:site` absent from scripts (package.json:6-12), so it does not work as written.

The Pages publication does not load remote: shell configuration points remote to `http://localhost:3001` in code (apps/app/src/environments/environments.ts:8) and webpack `remotes` (apps/app/webpack.config.js:83), and nothing in the snapshot publishes `apps/microfrontend`. Remote is served only by dev server on port 3001, with `public/` as static content, containing the `manifest.json` fetched by shell (apps/microfrontend/webpack.config.js:17-21). The `ops-cors` occurrences are dev server `Access-Control-Allow-Origin: *` headers (apps/app/webpack.config.js:119; apps/microfrontend/webpack.config.js:22-24), development configuration. Remote’s `publicPath: 'auto'` (apps/microfrontend/webpack.config.js:28) is the other `cfg-public-path` occurrence.

Libraries have their own publication flow, covering no app: `release.sh` builds a library, replaces `workspace:*` with actual versions and runs `pnpm publish dist/libs/$LIB` (release.sh:5, :8-22, :25), and Nx declares independent release only for `libs/*` (nx.json:23-29, :37-42). There is also local Verdaccio registry configuration (.verdaccio/config.yml:1-28) and a `PUBLISH.TXT` with `npm version patch` and tag pushes. There is no Dockerfile, compose or server configuration.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/app | separate | separate | `/novx/sample/` on GitHub Pages (.github/workflows/docs.yml:37, :50-51); `http://localhost:3000` (apps/app/project.json:43-44) | No | apps/app/project.json:14-38 (own target `build`, output `dist/apps/app`); apps/app/webpack.config.js:18-23 (output and `publicPath` through `PUBLIC_URL`); .github/workflows/docs.yml:34-37 (production build of the app alone); .github/workflows/docs.yml:48-57 (copies to `dist/docs/sample` and uploads the Pages artifact); .github/workflows/docs.yml:59-69 (`deploy-pages`) |
| 2 | apps/microfrontend | separate | not observed | `http://localhost:3001` (apps/microfrontend/webpack.config.js:18; apps/app/src/environments/environments.ts:8) | No | apps/microfrontend/project.json:14-23 (own target `build`); apps/microfrontend/webpack.config.js:26-30 (own output); .github/workflows/ci.yml:33 (build together with other projects, without publication) |

## Observations

**1. apps/app.** Own build generating `dist/apps/app` with `index.html` from `HtmlWebpackPlugin` and a copy of `public/` (apps/app/webpack.config.js:19, :97-110). Deployment is separate: the docs job builds only this app and publishes its output under `sample/` on Pages (.github/workflows/docs.yml:34-37, :48-57). The Pages artifact also carries library typedoc documentation, which is not a frontend application. The published app depends on a remote at `localhost:3001` (apps/app/src/environments/environments.ts:8), so the remote feature does not load outside the developer’s machine. The manifest has no `version` field and is `private` (apps/app/package.json:1-3); root version `0.0.10` (package.json:3) is unused in app publication.

**2. apps/microfrontend.** Own build generating `remoteEntry.js` for container `microfrontend` (apps/microfrontend/webpack.config.js:53-59). Nx target `outputPath` is `dist/apps/microfrontend` (apps/microfrontend/project.json:17), and webpack `output.path` is folder `dist` in its own directory (apps/microfrontend/webpack.config.js:27); the snapshot does not clarify which applies, but either output belongs only to this app. The only CI artifact touching it is CI `run-many`, building without publishing (.github/workflows/ci.yml:33); the docs workflow does not build it. No observed deployment: only dev server on port 3001 (apps/microfrontend/project.json:24-30). Version `1.0.0` of `public/manifest.json` (apps/microfrontend/public/manifest.json:4) belongs to the manifest read by the portal and is unused in publication; `package.json` has no `version` (apps/microfrontend/package.json:1-3).

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 1, not observed: 1). Independent versioning: 0.
