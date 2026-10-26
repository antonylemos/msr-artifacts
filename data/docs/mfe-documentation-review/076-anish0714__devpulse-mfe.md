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

Documentation is root README, in English, the only `documentation` file in `artifacts.csv`. Long and well organized: it presents the project as both a browser toolbox and a micro-frontends architecture demonstration (README.md:9-12), describing each tool, shell interface, package tree, published site assembly, both workflows and technical stack. `package.json` files lack `description`.

On composition, README matches previous reviews: a shell and five webpack remotes connected through Module Federation, each exposing `./Widget`, in an npm workspaces monorepo. The dependency review lists no technology dependency; `ModuleFederationPlugin` comes from webpack itself (`require("webpack").container`, packages/shell/webpack.config.js:3). README differs from artifacts in build and deployment. It mentions "independently deployed" micro-frontends (README.md:3), a site assembled from six builds (README.md:88-97), and CI with one job per each of six packages (README.md:115). Snapshot has one deployment workflow publishing everything jointly and copying only shell and two of five remotes into the site (.github/workflows/deploy.yml:39-60), and CI whose matrix covers three packages (.github/workflows/ci.yml:18). The build and deployment review had already identified those differences (3.4.6, Overview).

Excluded from the table:
- title (README.md:1), repeating claim 3;
- production URL code block (README.md:101-107), reproducing an abridged shell configuration (packages/shell/webpack.config.js:11-25, 53-57); its introductory sentence is claim 18;
- development ports and switching URLs to `localhost` (README.md:109), an infrastructure detail confirmed by configuration (packages/shell/webpack.config.js:11-25; packages/pdf-conversion-remote/webpack.config.js:28), not changing the mechanism, as README itself says;
- CI/CD opening, "Two separate GitHub Actions workflows" (README.md:113): both exist (.github/workflows/ci.yml, .github/workflows/deploy.yml); section claims about each are in claims 7 and 19;
- trunk-based workflow (README.md:20, 118, 141), a development process rather than unit property;
- internal unit details: downloading OCR engine through CDN (README.md:47), and `dev-utils-remote` lacking runtime dependencies (README.md:50, 136);
- functional tool descriptions, interface appearance and library stack (README.md:22-55, 60, 129-137), except repetitions in claims 3 and 11.

`doc-*` occurrences: README.md:1 is title. README.md:3 is in claims 1 through 3; README.md:5 in 4; README.md:12 in 6 and 7; README.md:18 in 8; README.md:58 in 9 and 10; README.md:64 in 11; README.md:68 in 12; README.md:83 repeats 6; README.md:88 is in 16 and 17; README.md:102-106 is the code block above; README.md:113 is the opening above; README.md:115 repeats 7; README.md:124 is an execution instruction (`npm run dev`, running `start` in every workspace, package.json:9); README.md:131 repeats claims 3 and 11; README.md:141 repeats claims 3, 2, 7 and 5.

Artifacts cited by previous reviews were read: root and six packages' `package.json` files, all six webpack configurations, both workflows, `index.ts`, `bootstrap.tsx` and `App.tsx` in all six units, and shell's `Introduction.tsx`, `RemoteErrorBoundary.tsx` and `types/remotes.d.ts`. The only comment is in `index.ts`, identical across six units (claim 20). Interface texts repeat README claims: shell subtitle, "each one a separately built, separately deployed micro-frontend" (packages/shell/src/App.tsx:104-107), Introduction paragraph, "independently built and independently deployed [...] loaded into this shell at runtime via Webpack Module Federation" (packages/shell/src/Introduction.tsx:25-29), and each remote's notice, "standalone, at its own deployed URL" (e.g.: packages/pdf-conversion-remote/src/App.tsx:25-26). They are application content rather than documentation and are cited in corresponding claim paragraphs.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "independently developed [...] micro-frontends" | independence | corroborated | 3.4.3 (six units with own manifests, entry points and builds); packages/shell/package.json:6; packages/pdf-conversion-remote/webpack.config.js:27-31 |
| 2 | README.md:3 | "independently deployed" (units are deployed independently) | build-deploy | contradicted | 3.4.6 #1-#6 (deploy `joint`: 3, `not observed`: 3); .github/workflows/deploy.yml:36-60 |
| 3 | README.md:3 | "micro-frontends, composed at runtime into one app by a shell host using Webpack 5's Module Federation" | structure | corroborated | 3.4.3 (six `Yes` units); 3.4.5 #1-#5; packages/shell/webpack.config.js:3, 50-58; packages/shell/src/App.tsx:7-11 |
| 4 | README.md:5 | "Live: https://anish0714.github.io/devpulse-mfe/" (published application address) | build-deploy | corroborated | 3.4.6 #6; packages/shell/webpack.config.js:6; .github/workflows/deploy.yml:42, 46-60 |
| 5 | README.md:11 | "entirely client-side" (tools do not depend on backend) | other | corroborated | 3.4.3 (only six frontend units and root); 3.4.6 (Overview: no Dockerfile, compose or proxy) |
| 6 | README.md:12 | "each tool is its own React app with its own build" | build-deploy | corroborated | 3.4.6 #1-#6 (build `separate`: 6); packages/pdf-conversion-remote/webpack.config.js:13-17; package.json:10 |
| 7 | README.md:12 | "its own CI check" (each tool has its own CI check) | build-deploy | contradicted | .github/workflows/ci.yml:18, 33, 36; 3.4.6 #1, #2, #4 |
| 8 | README.md:18 | "the shell has zero compile-time dependency on any tool's source; it only knows a URL and an exposed module name" | composition | corroborated | 3.4.6 #6; packages/shell/package.json:10-13; packages/shell/webpack.config.js:11-25, 52-58; packages/shell/src/App.tsx:7-11 |
| 9 | README.md:58 | "selecting one renders that remote's own widget in the right-hand content pane" | composition | corroborated | 3.4.4 (packages/shell/src/App.tsx:34, 164); 3.4.5 #1-#5; packages/shell/src/App.tsx:135-148, 162-166 |
| 10 | README.md:58 | "The shell itself renders no tool-specific UI — only navigation, the Introduction, and the loading/error states around whichever remote is active." | structure | corroborated | packages/shell/src/App.tsx:133-168; packages/shell/src/Introduction.tsx:14-30; packages/shell/src/RemoteErrorBoundary.tsx:24-42 |
| 11 | README.md:64 | "This is an npm-workspaces monorepo" | structure | corroborated | 3.4.3 (Workspace); package.json:5-7 |
| 12 | README.md:66-79 | "shell/ the host app: [...] remote loading, error boundaries [...] pdf-conversion-remote/ exposes ./Widget [...]" (tree with host and all five remotes) | structure | corroborated | 3.4.3 (six `Yes` units); 3.4.5 #1-#5; packages/pdf-conversion-remote/webpack.config.js:33-38 |
| 13 | README.md:82 | "has its own `webpack.config.js` and `ModuleFederationPlugin` config" | build-deploy | corroborated | 3.4.3 (Build column of all six units); packages/shell/webpack.config.js:3, 50-63; packages/pdf-conversion-remote/webpack.config.js:3, 33-43 |
| 14 | README.md:84 | "also has a standalone `App.tsx` entry" (each package runs independently) | independence | corroborated | 3.4.3 (Entry point column); packages/pdf-conversion-remote/src/bootstrap.tsx:2, 7; packages/pdf-conversion-remote/src/App.tsx:1-39 |
| 15 | README.md:84 | "visiting a remote's own deployed URL directly still renders something meaningful" (each remote has its own published address) | build-deploy | partial | 3.4.6 #3, #5 (`joint`) and #1, #2, #4 (`not observed`); .github/workflows/deploy.yml:41-44 |
| 16 | README.md:88 | "Deployed as one GitHub Pages site (`/devpulse-mfe/`)" | build-deploy | corroborated | 3.4.6 #3, #5, #6; .github/workflows/deploy.yml:46-60 |
| 17 | README.md:88-97 | "assembled from six independent builds" (diagram with all six `dist` copied into `site/`) | build-deploy | contradicted | .github/workflows/deploy.yml:39-44; 3.4.6 #1, #2, #4 (`not observed`) |
| 18 | README.md:99 | "The shell's production config points at those exact URLs" | composition | corroborated | 3.4.5 #1-#5; packages/shell/webpack.config.js:6, 11-25, 52-58 |
| 19 | README.md:116 | "deploy.yml runs only on push to `main` (or manual dispatch): it lints and builds everything, assembles the combined site, and deploys to GitHub Pages" | build-deploy | corroborated | 3.4.6 (Overview); .github/workflows/deploy.yml:3-6, 33-44, 46-60 |
| 20 | packages/dev-utils-remote/src/index.ts:1-2 | "Module Federation requires the real entry point to be loaded asynchronously so the shared module scope can initialize before this app touches React." (React belongs to the units' shared scope) | composition | corroborated | 3.4.4 (Notes, `src-async-bootstrap`); packages/shell/webpack.config.js:59-62; packages/dev-utils-remote/webpack.config.js:39-42 |

## Observations

**1. README.md:3.** Each of six units has its own manifest, entry point and build (3.4.3), its own development server (`webpack serve`, packages/shell/package.json:6; port 3003 in packages/pdf-conversion-remote/webpack.config.js:27-31), and can start independently (README.md:127, repeating claim 14). This confirms separate development technically. Snapshot says nothing about separate teams or authors; README presents a single-author project (README.md:60).

**2. README.md:3.** Snapshot has one deployment workflow. It builds all workspaces at once (.github/workflows/deploy.yml:36-37), assembles one `site` directory (.github/workflows/deploy.yml:39-44) and publishes it as one GitHub Pages artifact in one job (.github/workflows/deploy.yml:46-60). Shell and conversion and manipulation remotes publish together (`joint`), while the other three remotes do not publish (`not observed`). No unit has its own deployment. Repetitions: "its own deploy" (README.md:12), "redeployed on its own schedule without touching the shell" (README.md:18), "independent build/deploy pipelines per package" (README.md:141) and interface texts (packages/shell/src/App.tsx:105-106; packages/shell/src/Introduction.tsx:26). README itself partly refutes it: "Deployed as one GitHub Pages site" (README.md:88, claim 16).

**3. README.md:3.** Shell declares five remotes in webpack 5's `ModuleFederationPlugin` (packages/shell/webpack.config.js:3, 50-58) and loads them through `React.lazy` at runtime (packages/shell/src/App.tsx:7-11); all five host → remote relationships are in the composition review. Repetitions: title (README.md:1), "loaded into a shared shell at runtime rather than bundled together at build time" (README.md:12), technical stack, "Webpack 5 (`ModuleFederationPlugin`) for runtime composition" (README.md:131), and "Micro-frontend architecture with genuine runtime composition" (README.md:141).

**4. README.md:5.** The address is shell configuration's production base (`PROD_BASE`, packages/shell/webpack.config.js:6), and shell `dist` goes to published GitHub Pages site root (.github/workflows/deploy.yml:42, 46-60). The site was not accessed.

**5. README.md:11.** Snapshot has only six frontend units and workspace root (3.4.3), without server, Dockerfile, compose or proxy (3.4.6, Overview), and no `src` makes network calls beyond `remoteEntry.js` URLs. Repetitions: "every tool runs 100% in the browser [...] so there's no backend to trust" (README.md:17) and "browser-only file processing with zero backend" (README.md:141). OCR downloads engine and language data through CDN (README.md:47; `tesseract.js`, packages/ocr-remote/src/Widget.tsx:2), not a project backend.

**6. README.md:12.** Each package has `webpack build --mode production` using its own configuration and output `dist` (packages/pdf-conversion-remote/webpack.config.js:13-17); root `build` only triggers each workspace's (package.json:10). The build and deployment review recorded `separate` build for all six. Repetitions: "builds to its own `dist/`, independent of the others" (README.md:83), "each package still builds independently" (README.md:64) and "A tool can be rebuilt [...] without touching the shell" (README.md:18). During deployment, however, all build in the same step (.github/workflows/deploy.yml:37).

**7. README.md:12.** `ci.yml` matrix has only `shell`, `pdf-conversion-remote` and `pdf-manipulation-remote` (.github/workflows/ci.yml:18); each job type-checks and builds one package (.github/workflows/ci.yml:33, 36). Utility, OCR and PDF form remotes have no CI check. Repetitions: "Per-package CI — each package lints and builds as its own GitHub Actions check" (README.md:19), the six-package matrix list (README.md:115), "per-package CI" (README.md:137) and "independent build/deploy pipelines per package" (README.md:141). The confirmed part is the matrix's three packages; README.md:115's list is refuted by the matrix line.

**8. README.md:18.** Shell `package.json` depends only on `react` and `react-dom` (packages/shell/package.json:10-13), and no file in `packages/shell/src` imports another package's code. Shell knows each remote through container name and `remoteEntry.js` URL (packages/shell/webpack.config.js:11-25, 52-58) and imports only `<remote>/Widget` (packages/shell/src/App.tsx:7-11), with separately declared types (packages/shell/src/types/remotes.d.ts:1-29). Repetition: "wired together only via runtime URLs" (README.md:64). The item's second sentence on independent rebuild and redeployment splits between claims 6 and 2.

**9. README.md:58.** Sidebar selects the active section (packages/shell/src/App.tsx:135-148), and selected remote component renders inside `Suspense` and `RemoteErrorBoundary` (packages/shell/src/App.tsx:162-166). Only the opened widget loads (3.4.5, Overview).

**10. README.md:58.** Shell `src` has only `App.tsx` with header, navigation and content area (packages/shell/src/App.tsx:133-168), Introduction listing tools from the section table (packages/shell/src/Introduction.tsx:14-30), and error boundary (packages/shell/src/RemoteErrorBoundary.tsx:24-42). Each tool screen comes from remote.

**11. README.md:64.** Root declares `workspaces` with `packages/*` (package.json:5-7). Repetition: "npm workspaces for the monorepo" (README.md:131). The rest of the sentence is in claims 6 and 8.

**12. README.md:66-79.** The tree lists all six packages recorded as units by the structural review, with shell as host and five remotes exposing `./Widget`, confirmed by configurations (e.g.: packages/pdf-conversion-remote/webpack.config.js:33-38). Shell loads remotes and has the error boundary (packages/shell/src/App.tsx:7-11; packages/shell/src/RemoteErrorBoundary.tsx:13).

**13. README.md:82.** All six units have their own `webpack.config.js` with `ModuleFederationPlugin`: shell as consumer (packages/shell/webpack.config.js:50-63), and remotes as containers with `remoteEntry.js` (e.g.: packages/pdf-conversion-remote/webpack.config.js:33-43). All five remote configurations differ only by port and `name` (3.4.6, Overview).

**14. README.md:84.** Each unit has an entry point mounting its own `App` (e.g.: packages/pdf-conversion-remote/src/bootstrap.tsx:2, 7). In remotes, `App.tsx` wraps `Widget` with a notice of viewing the micro-frontend independently (packages/pdf-conversion-remote/src/App.tsx:1-39). Repetition: "Or run a single package: `npm run start --workspace=packages/ocr-remote`" (README.md:127; packages/ocr-remote/package.json:6).

**15. README.md:84.** Conversion and manipulation remotes have their own published site subpaths (`site/remotes/pdf-conversion/` and `site/remotes/pdf-manipulation/`, .github/workflows/deploy.yml:43-44), also containing `index.html` generated by `HtmlWebpackPlugin`. For the other three, no snapshot artifact publishes `dist` (.github/workflows/deploy.yml:41-44), and only development server serves them. Interface text says the same ("at its own deployed URL", e.g.: packages/ocr-remote/src/App.tsx:25-26), including the three undeployed remotes.

**16. README.md:88.** Workflow uploads a single `site` directory as Pages artifact and deploys in one job (.github/workflows/deploy.yml:46-60). The build and deployment review recorded `joint` deployment for shell and both published remotes. The claim confirms joint deployment and contradicts claim 2. Repetition: "GitHub Pages hosting" (README.md:137).

**17. README.md:88-97.** The diagram places six `dist` directories in `site/`, but workflow creates only `site/remotes/pdf-conversion` and `site/remotes/pdf-manipulation`, copying only shell and both remotes (.github/workflows/deploy.yml:39-44). `dist` directories of `dev-utils-remote`, `pdf-form-filler-remote` and `ocr-remote` are built (.github/workflows/deploy.yml:37) but do not enter site. Shell and both remote portions are confirmed.

**18. README.md:99.** In production, shell assembles five URLs under `https://anish0714.github.io/devpulse-mfe/remotes/` (packages/shell/webpack.config.js:6, 11-25) and uses them in `remotes` of `ModuleFederationPlugin` (packages/shell/webpack.config.js:52-58). Configuration points to all five diagram paths, including three unfilled by deployment (claim 17); shell handles failure with "It may not be deployed yet" (packages/shell/src/RemoteErrorBoundary.tsx:37-38). Section table repeats URLs in field `url`, unread by shell (3.4.4, Notes).

**19. README.md:116.** `deploy.yml` runs on push to `main` or through `workflow_dispatch` (.github/workflows/deploy.yml:3-6), type-checks and builds all workspaces (.github/workflows/deploy.yml:33-37), assembles combined site (.github/workflows/deploy.yml:39-44) and deploys to GitHub Pages (.github/workflows/deploy.yml:46-60). "Combined site" is exact; what snapshot does not confirm is that site's composition, handled in claim 17.

**20. packages/dev-utils-remote/src/index.ts:1-2.** The comment explains asynchronous entry point loading of `bootstrap`: Module Federation shared scope must initialize before React. All six configurations share `react` and `react-dom` as singletons (packages/shell/webpack.config.js:59-62; packages/dev-utils-remote/webpack.config.js:39-42, identical in other remotes), and all six units depend on `react` (e.g.: packages/dev-utils-remote/package.json:11-12), meeting the shared-library rule. The same comment is in `packages/ocr-remote/src/index.ts:1-2`, `packages/pdf-conversion-remote/src/index.ts:1-2`, `packages/pdf-form-filler-remote/src/index.ts:1-2`, `packages/pdf-manipulation-remote/src/index.ts:1-2` and `packages/shell/src/index.ts:1-2`.

## Summary

Claims: 20 (corroborated: 16, partial: 1, contradicted: 3, uncorroborated: 0). Themes: (structure: 4, composition: 4, build-deploy: 9, independence: 2, other: 1).
