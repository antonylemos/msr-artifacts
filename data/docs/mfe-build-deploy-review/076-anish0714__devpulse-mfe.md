---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
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

# 076 — anish0714/devpulse-mfe

## Repository overview

npm workspaces monorepo (package.json:5-7) with a host (`packages/shell`) and five Module Federation remotes. Each package has the same recipe: `webpack build --mode production` (for example packages/shell/package.json:7) over its own webpack configuration, writing to the package’s own `dist/` (packages/shell/webpack.config.js:31-35; packages/pdf-conversion-remote/webpack.config.js:13-17), and `webpack serve` for development (packages/shell/package.json:6). Root `build` script only triggers each workspace’s build (package.json:10). All five remote configurations are identical except for dev server port and container `name`. There is no Dockerfile, compose, proxy or hosting configuration; `dist` is git-ignored (.gitignore:2).

There are two GitHub Actions workflows. `ci.yml` runs on pull requests to `main` (.github/workflows/ci.yml:3-5) and, in a matrix, type-checks and builds one package per job, but only `shell`, `pdf-conversion-remote` and `pdf-manipulation-remote` (.github/workflows/ci.yml:18, 33, 36); it publishes nothing. `deploy.yml` runs on push to `main` or manually (.github/workflows/deploy.yml:3-6), builds all workspaces (.github/workflows/deploy.yml:36-37) and assembles a single `site` directory: shell `dist` at root and PDF conversion and manipulation `dist` at `site/remotes/pdf-conversion/` and `site/remotes/pdf-manipulation/` (.github/workflows/deploy.yml:39-44). That directory uploads as a single GitHub Pages artifact and deploys in a single job (.github/workflows/deploy.yml:46-60). This is production configuration; base address is `https://anish0714.github.io/devpulse-mfe` (packages/shell/webpack.config.js:6).

Contradiction between artifacts: production shell points remotes `dev-utils`, `pdf-form-filler` and `ocr` to `remotes/dev-utils/`, `remotes/pdf-form-filler/` and `remotes/ocr/` under that address (packages/shell/webpack.config.js:17-25), but deployment does not copy those three `dist` directories into the site (.github/workflows/deploy.yml:41-44). README describes six builds assembled in the site (README.md:88-96) and a CI matrix with all six packages (README.md:115), unconfirmed by the snapshot; this belongs in the documentation review. The phrase "independently deployed" (README.md:3) also does not match the workflow, which publishes everything together.

Occurrences in `matches.csv` outside the table: `cfg-public-path` in all webpack configurations (`publicPath: "auto"`, for example packages/shell/webpack.config.js:32 and packages/pdf-conversion-remote/webpack.config.js:14) only makes runtime resolve chunks from the file’s load location, allowing each `dist` to be served under a subpath; `ops-cors` in all five remotes (`Access-Control-Allow-Origin: *`, for example packages/pdf-conversion-remote/webpack.config.js:30) is in `devServer` and applies only to development. Both workflows (`ci-workflow-file`) are described above.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/dev-utils-remote | separate | not observed | dev server port 3005 (packages/dev-utils-remote/webpack.config.js:28) | No | packages/dev-utils-remote/package.json:7 (`webpack build --mode production`); packages/dev-utils-remote/webpack.config.js:13-17 (own `dist` output); packages/dev-utils-remote/webpack.config.js:33-43 (container `devUtils`, `remoteEntry.js`); .github/workflows/deploy.yml:37 (built, but not copied into the site at :41-44) |
| 2 | packages/ocr-remote | separate | not observed | dev server port 3007 (packages/ocr-remote/webpack.config.js:28) | No | packages/ocr-remote/package.json:7 (`webpack build --mode production`); packages/ocr-remote/webpack.config.js:13-17 (own `dist` output); packages/ocr-remote/webpack.config.js:33-43 (container `ocr`, `remoteEntry.js`); .github/workflows/deploy.yml:37 (built, but not copied into the site at :41-44) |
| 3 | packages/pdf-conversion-remote | separate | joint | `https://anish0714.github.io/devpulse-mfe/remotes/pdf-conversion/` (.github/workflows/deploy.yml:43; packages/shell/webpack.config.js:6, 12); dev server port 3003 (packages/pdf-conversion-remote/webpack.config.js:28) | No | packages/pdf-conversion-remote/package.json:7 (`webpack build --mode production`); packages/pdf-conversion-remote/webpack.config.js:13-17 (own `dist` output); .github/workflows/ci.yml:18, 36 (own build job in the matrix); .github/workflows/deploy.yml:43 (copies `dist` to `site/remotes/pdf-conversion/`); .github/workflows/deploy.yml:46-60 (publishes the entire `site` to GitHub Pages) |
| 4 | packages/pdf-form-filler-remote | separate | not observed | dev server port 3006 (packages/pdf-form-filler-remote/webpack.config.js:28) | No | packages/pdf-form-filler-remote/package.json:7 (`webpack build --mode production`); packages/pdf-form-filler-remote/webpack.config.js:13-17 (own `dist` output); packages/pdf-form-filler-remote/webpack.config.js:33-43 (container `pdfFormFiller`, `remoteEntry.js`); .github/workflows/deploy.yml:37 (built, but not copied into the site at :41-44) |
| 5 | packages/pdf-manipulation-remote | separate | joint | `https://anish0714.github.io/devpulse-mfe/remotes/pdf-manipulation/` (.github/workflows/deploy.yml:44; packages/shell/webpack.config.js:6, 15); dev server port 3004 (packages/pdf-manipulation-remote/webpack.config.js:28) | No | packages/pdf-manipulation-remote/package.json:7 (`webpack build --mode production`); packages/pdf-manipulation-remote/webpack.config.js:13-17 (own `dist` output); .github/workflows/ci.yml:18, 36 (own build job in the matrix); .github/workflows/deploy.yml:44 (copies `dist` to `site/remotes/pdf-manipulation/`); .github/workflows/deploy.yml:46-60 (publishes the entire `site` to GitHub Pages) |
| 6 | packages/shell | separate | joint | `https://anish0714.github.io/devpulse-mfe/` (packages/shell/webpack.config.js:6; .github/workflows/deploy.yml:42); dev server port 3000 (packages/shell/webpack.config.js:46) | No | packages/shell/package.json:7 (`webpack build --mode production`); packages/shell/webpack.config.js:31-35 (own `dist` output); .github/workflows/ci.yml:18, 36 (own build job in the matrix); .github/workflows/deploy.yml:42 (copies `dist` to the root of `site`); .github/workflows/deploy.yml:46-60 (publishes the entire `site` to GitHub Pages) |

## Observations

**1. packages/dev-utils-remote.** Build `separate`: own webpack with output in `packages/dev-utils-remote/dist` (packages/dev-utils-remote/webpack.config.js:13-17), triggered by the package script (packages/dev-utils-remote/package.json:7) and, during deployment, by all-workspace build (.github/workflows/deploy.yml:37). Deploy `not observed`: workflow builds the package but does not copy `dist` into the published site (.github/workflows/deploy.yml:41-44), and the package is outside CI matrix (.github/workflows/ci.yml:18). Shell expects remote at `remotes/dev-utils/remoteEntry.js` under the production address (packages/shell/webpack.config.js:17-18), but no snapshot artifact places files there; the only evidenced address is development port 3005. Versioning `No`: `"version": "1.0.0"` with `"private": true` (packages/dev-utils-remote/package.json:3-4), unused in publication.

**2. packages/ocr-remote.** Same situation as application 1: own build to `dist` (packages/ocr-remote/webpack.config.js:13-17; packages/ocr-remote/package.json:7), built at .github/workflows/deploy.yml:37 but not copied into the site (.github/workflows/deploy.yml:41-44) and outside CI matrix (.github/workflows/ci.yml:18). Shell points to production `remotes/ocr/remoteEntry.js` (packages/shell/webpack.config.js:23-24), a path filled by no artifact. Only development port 3007 is observed. Versioning `No` (packages/ocr-remote/package.json:3-4).

**3. packages/pdf-conversion-remote.** Build `separate`: own output in `dist` (packages/pdf-conversion-remote/webpack.config.js:13-17) and own CI matrix build job (.github/workflows/ci.yml:18, 36), checking only, without publication. Deploy `joint`: `dist` is copied to `site/remotes/pdf-conversion/` (.github/workflows/deploy.yml:43), inside the same `site` directory receiving shell and manipulation remote, uploaded as a single Pages artifact and deployed in a single job (.github/workflows/deploy.yml:46-60). Its own subpath separates files rather than publication. Published address matches shell’s production address (packages/shell/webpack.config.js:11-12). Versioning `No` (packages/pdf-conversion-remote/package.json:3-4).

**4. packages/pdf-form-filler-remote.** Same situation as applications 1 and 2: own build to `dist` (packages/pdf-form-filler-remote/webpack.config.js:13-17; packages/pdf-form-filler-remote/package.json:7), built at .github/workflows/deploy.yml:37 and not copied into the site (.github/workflows/deploy.yml:41-44), outside CI matrix (.github/workflows/ci.yml:18). Shell expects `remotes/pdf-form-filler/remoteEntry.js` (packages/shell/webpack.config.js:20-21). Only development port 3006 is observed. Versioning `No` (packages/pdf-form-filler-remote/package.json:3-4).

**5. packages/pdf-manipulation-remote.** Same as application 3: own build (packages/pdf-manipulation-remote/webpack.config.js:13-17) with own CI job (.github/workflows/ci.yml:18, 36); `dist` copied to `site/remotes/pdf-manipulation/` (.github/workflows/deploy.yml:44) and published in the same Pages artifact as shell and conversion remote (.github/workflows/deploy.yml:46-60). Published address matches shell’s production address (packages/shell/webpack.config.js:14-15). Versioning `No` (packages/pdf-manipulation-remote/package.json:3-4).

**6. packages/shell.** Build `separate`: own webpack with output in `packages/shell/dist` (packages/shell/webpack.config.js:31-35), with remotes resolved at runtime by URL rather than embedded in the bundle (packages/shell/webpack.config.js:50-58); own CI job (.github/workflows/ci.yml:18, 36). Deploy `joint`: `dist` goes to `site` root (.github/workflows/deploy.yml:42) and is published with remotes 3 and 5 (.github/workflows/deploy.yml:46-60). Production mode replaces `localhost` URLs with Pages URLs (packages/shell/webpack.config.js:9-25), requiring a shell rebuild if base address changes. Versioning `No` (packages/shell/package.json:3-4).

## Summary

Applications: 6. Build (separate: 6). Deploy (joint: 3, not observed: 3). Independent versioning: 0.
