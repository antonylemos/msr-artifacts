---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Repository overview

An npm workspaces monorepo (#20) with a React shell and five React remotes, each with its own manifest, entry and webpack build (#21 through #26). The Module Federation chain is complete, although it does not go through a declared dependency: `ModuleFederationPlugin` comes from webpack itself, and the dependency review recorded no MFE technology. The chain therefore starts with configuration:
- **Configuration:** each remote declares its own name, generates `remoteEntry.js`, exposes `./Widget` and shares `react` and `react-dom` as singletons (#1 through #5). The shell names the five remotes, with production URLs under GitHub Pages or `localhost` in development (#6).
- **Code:** the shell imports the five `<remote>/Widget` modules through `React.lazy` (#7 through #11), groups them in a sections table naming each remote (#18) and renders the selected section's widget (#19).
- **Relationships:** this results in five active host → remote relationships (#27 through #31).

Signals that are not composition: `import("./bootstrap")` in the six units (#12 through #17) is the asynchronous bootstrap required by Module Federation, internal to each unit. The workspace root is not a unit (#20).

The weak point is deployment. The six builds are separate (#32 through #37), but the sole deployment workflow publishes everything to one GitHub Pages site and only copies the shell and two remotes (#34, #36, #37); dev-utils, OCR and PDF forms are built but not published (#32, #33, #35), although the shell points to them in production (#6). The README differs from these artifacts in three claims: independent deployment (#39), CI per package (#44) and a site assembled from six builds (#54); another is only partially corroborated (#52). Its composition claims match the artifacts (#40, #45, #46, #55). History clarifies the two discrepancies: there was never deployment per unit (#58), and workflows remained at the two-remote stage because pushing changes was blocked by permissions (#59).

## Observations

### 1. packages/dev-utils-remote/webpack.config.js:1-47

**Observation:** `ModuleFederationPlugin` with `name: "devUtils"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` and `react` and `react-dom` shared as `singleton`. The `devServer` uses port 3005.

**Interpretation:** The unit is configured as a Module Federation remote and offers its screen to a host.

### 2. packages/ocr-remote/webpack.config.js:1-47

**Observation:** `ModuleFederationPlugin` with `name: "ocr"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` and `react` and `react-dom` shared as `singleton`. The `devServer` uses port 3007.

**Interpretation:** The unit is configured as a Module Federation remote and offers its screen to a host.

### 3. packages/pdf-conversion-remote/webpack.config.js:1-47

**Observation:** `ModuleFederationPlugin` with `name: "pdfConversion"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` and `react` and `react-dom` shared as `singleton`. The `devServer` uses port 3003.

**Interpretation:** The unit is configured as a Module Federation remote and offers its screen to a host.

### 4. packages/pdf-form-filler-remote/webpack.config.js:1-47

**Observation:** `ModuleFederationPlugin` with `name: "pdfFormFiller"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` and `react` and `react-dom` shared as `singleton`. The `devServer` uses port 3006.

**Interpretation:** The unit is configured as a Module Federation remote and offers its screen to a host.

### 5. packages/pdf-manipulation-remote/webpack.config.js:1-47

**Observation:** `ModuleFederationPlugin` with `name: "pdfManipulation"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` and `react` and `react-dom` shared as `singleton`. The `devServer` uses port 3004.

**Interpretation:** The unit is configured as a Module Federation remote and offers its screen to a host.

### 6. packages/shell/webpack.config.js:1-67

**Observation:** `PROD_BASE = "https://anish0714.github.io/devpulse-mfe"`. In production, remote URLs are `${PROD_BASE}/remotes/<nome>/remoteEntry.js`; in development, `http://localhost:3003` through `3007/remoteEntry.js` (:11-25). `ModuleFederationPlugin` with `name: "shell"`, `remotes` `pdfConversion`, `pdfManipulation`, `devUtils`, `pdfFormFiller` and `ocr`, each in `<nome>@<url>` format, and `react` and `react-dom` shared as `singleton`.

**Interpretation:** The host configuration declares the five units as remotes and where to find them in each environment.

### 7. packages/shell/src/App.tsx:7

**Observation:** `const PdfConversionWidget = lazy(() => import("pdfConversion/Widget"));`.

**Interpretation:** The shell loads the module exposed by the PDF conversion remote at runtime, by name.

### 8. packages/shell/src/App.tsx:8

**Observation:** `const PdfManipulationWidget = lazy(() => import("pdfManipulation/Widget"));`.

**Interpretation:** The shell loads the module exposed by the PDF manipulation remote at runtime, by name.

### 9. packages/shell/src/App.tsx:9

**Observation:** `const DevUtilsWidget = lazy(() => import("devUtils/Widget"));`.

**Interpretation:** The shell loads the module exposed by the utilities remote at runtime, by name.

### 10. packages/shell/src/App.tsx:10

**Observation:** `const PdfFormFillerWidget = lazy(() => import("pdfFormFiller/Widget"));`.

**Interpretation:** The shell loads the module exposed by the PDF forms remote at runtime, by name.

### 11. packages/shell/src/App.tsx:11

**Observation:** `const OcrWidget = lazy(() => import("ocr/Widget"));`.

**Interpretation:** The shell loads the module exposed by the OCR remote at runtime, by name.

### 12. packages/dev-utils-remote/src/index.ts:3

**Observation:** `import("./bootstrap");`.

**Interpretation:** This is an asynchronous bootstrap internal to the unit.

### 13. packages/ocr-remote/src/index.ts:3

**Observation:** `import("./bootstrap");`.

**Interpretation:** This is an asynchronous bootstrap internal to the unit.

### 14. packages/pdf-conversion-remote/src/index.ts:3

**Observation:** `import("./bootstrap");`.

**Interpretation:** This is an asynchronous bootstrap internal to the unit.

### 15. packages/pdf-form-filler-remote/src/index.ts:3

**Observation:** `import("./bootstrap");`.

**Interpretation:** This is an asynchronous bootstrap internal to the unit.

### 16. packages/pdf-manipulation-remote/src/index.ts:3

**Observation:** `import("./bootstrap");`.

**Interpretation:** This is an asynchronous bootstrap internal to the unit.

### 17. packages/shell/src/index.ts:3

**Observation:** `import("./bootstrap");`.

**Interpretation:** This is an asynchronous bootstrap internal to the shell.

### 18. packages/shell/src/App.tsx:34-91

**Observation:** `const sections: Section[]` has an introduction entry and five remote entries. Each declares `key` with the remote name, `packageName` (`pdf-conversion-remote`, `pdf-manipulation-remote`, `dev-utils-remote`, `pdf-form-filler-remote`, `ocr-remote`), the `url` of `remoteEntry.js` and `Component` with the widget imported at :7-11.

**Interpretation:** The host declares which units it uses and associates each with an application section.

### 19. packages/shell/src/App.tsx:164

**Observation:** `<current.Component />`, inside `<Suspense>` (:163) and `<RemoteErrorBoundary remoteName={current.packageName}>` (:162). `current` is the section selected in navigation (:97, :135-148).

**Interpretation:** The host renders the remote widget of whichever section is active.

### 20. .; package.json:1-13

**Observation:** This is the root manifest, without dependencies, with `workspaces: ["packages/*"]` and scripts that only invoke workspace scripts (`npm run build --workspaces --if-present`). It has no entry or build configuration.

**Interpretation:** This is the workspace coordination root rather than a frontend unit.

### 21. packages/dev-utils-remote; packages/dev-utils-remote/package.json:1-26; packages/dev-utils-remote/webpack.config.js:9-46; packages/dev-utils-remote/src/index.ts:3; packages/dev-utils-remote/src/bootstrap.tsx:4-7

**Observation:** A React application with its own manifest, webpack configuration, entry (`./src/index.ts`, which mounts `App` in `bootstrap.tsx`) and `webpack build --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 22. packages/ocr-remote; packages/ocr-remote/package.json:1-28; packages/ocr-remote/webpack.config.js:9-46; packages/ocr-remote/src/index.ts:3; packages/ocr-remote/src/bootstrap.tsx:4-7

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack build --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 23. packages/pdf-conversion-remote; packages/pdf-conversion-remote/package.json:1-32; packages/pdf-conversion-remote/webpack.config.js:9-46; packages/pdf-conversion-remote/src/index.ts:3; packages/pdf-conversion-remote/src/bootstrap.tsx:4-7

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack build --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 24. packages/pdf-form-filler-remote; packages/pdf-form-filler-remote/package.json:1-28; packages/pdf-form-filler-remote/webpack.config.js:9-46; packages/pdf-form-filler-remote/src/index.ts:3; packages/pdf-form-filler-remote/src/bootstrap.tsx:4-7

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack build --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 25. packages/pdf-manipulation-remote; packages/pdf-manipulation-remote/package.json:1-28; packages/pdf-manipulation-remote/webpack.config.js:9-46; packages/pdf-manipulation-remote/src/index.ts:3; packages/pdf-manipulation-remote/src/bootstrap.tsx:4-7

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack build --mode production`.

**Interpretation:** A frontend unit with its own boundary.

### 26. packages/shell; packages/shell/package.json:1-26; packages/shell/webpack.config.js:8-66; packages/shell/src/index.ts:3; packages/shell/src/bootstrap.tsx:4-7

**Observation:** A React application with its own manifest, webpack configuration, entry and `webpack build --mode production`.

**Interpretation:** A frontend unit with its own boundary, in the host role.

### 27. packages/shell/src/App.tsx:7, 34, 164; packages/shell/webpack.config.js:11-13, 53; packages/pdf-conversion-remote/webpack.config.js:34-37

**Observation:** The shell imports `pdfConversion/Widget`, puts the component in a section and renders it when selected. Remote `pdfConversion` points to `remotes/pdf-conversion/remoteEntry.js` or `localhost:3003/remoteEntry.js`, and its name and exposed `./Widget` match the remote.

**Interpretation:** An active host → remote relationship.

### 28. packages/shell/src/App.tsx:8, 34, 164; packages/shell/webpack.config.js:14-16, 54; packages/pdf-manipulation-remote/webpack.config.js:34-37

**Observation:** The shell imports `pdfManipulation/Widget`, puts the component in a section and renders it when selected. Remote `pdfManipulation` points to `remotes/pdf-manipulation/remoteEntry.js` or `localhost:3004/remoteEntry.js`, and its name and exposed `./Widget` match the remote.

**Interpretation:** An active host → remote relationship.

### 29. packages/shell/src/App.tsx:9, 34, 164; packages/shell/webpack.config.js:17-19, 55; packages/dev-utils-remote/webpack.config.js:34-37

**Observation:** The shell imports `devUtils/Widget`, puts the component in a section and renders it when selected. Remote `devUtils` points to `remotes/dev-utils/remoteEntry.js` or `localhost:3005/remoteEntry.js`, and its name and exposed `./Widget` match the remote.

**Interpretation:** An active host → remote relationship. The production URL is not populated by deployment (#32), which does not change the relationship in code.

### 30. packages/shell/src/App.tsx:10, 34, 164; packages/shell/webpack.config.js:20-22, 56; packages/pdf-form-filler-remote/webpack.config.js:34-37

**Observation:** The shell imports `pdfFormFiller/Widget`, puts the component in a section and renders it when selected. Remote `pdfFormFiller` points to `remotes/pdf-form-filler/remoteEntry.js` or `localhost:3006/remoteEntry.js`, and its name and exposed `./Widget` match the remote.

**Interpretation:** An active host → remote relationship. The production URL is not populated by deployment (#35).

### 31. packages/shell/src/App.tsx:11, 34, 164; packages/shell/webpack.config.js:23-25, 57; packages/ocr-remote/webpack.config.js:34-37

**Observation:** The shell imports `ocr/Widget`, puts the component in a section and renders it when selected. Remote `ocr` points to `remotes/ocr/remoteEntry.js` or `localhost:3007/remoteEntry.js`, and its name and exposed `./Widget` match the remote.

**Interpretation:** An active host → remote relationship. The production URL is not populated by deployment (#33).

### 32. packages/dev-utils-remote/package.json:7; packages/dev-utils-remote/webpack.config.js:13-17, 33-43; .github/workflows/deploy.yml:37, 41-44

**Observation:** It has its own `webpack build --mode production` and `dist` output, and generates container `devUtils` with `remoteEntry.js`. The deployment workflow builds all workspaces, but does not copy this `dist` to the site. The package is not in the CI matrix (.github/workflows/ci.yml:18).

**Interpretation:** There is a separate build boundary, without observed deployment.

### 33. packages/ocr-remote/package.json:7; packages/ocr-remote/webpack.config.js:13-17, 33-43; .github/workflows/deploy.yml:37, 41-44

**Observation:** It has its own `webpack build --mode production` and `dist` output, and generates container `ocr` with `remoteEntry.js`. The deployment workflow builds it, but does not copy `dist` to the site. The package is not in the CI matrix.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 34. packages/pdf-conversion-remote/package.json:7; packages/pdf-conversion-remote/webpack.config.js:13-17; .github/workflows/ci.yml:18, 36; .github/workflows/deploy.yml:43, 46-60

**Observation:** It has its own `webpack build --mode production` and `dist` output, and its own build job in the CI matrix. Deployment copies `dist` to `site/remotes/pdf-conversion/`, and the entire `site` directory is uploaded as a single GitHub Pages artifact in a single job.

**Interpretation:** There is a separate build boundary, with joint deployment alongside the shell and manipulation remote, under its own subpath.

### 35. packages/pdf-form-filler-remote/package.json:7; packages/pdf-form-filler-remote/webpack.config.js:13-17, 33-43; .github/workflows/deploy.yml:37, 41-44

**Observation:** It has its own `webpack build --mode production` and `dist` output, and generates container `pdfFormFiller` with `remoteEntry.js`. The deployment workflow builds it, but does not copy `dist` to the site. The package is not in the CI matrix.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 36. packages/pdf-manipulation-remote/package.json:7; packages/pdf-manipulation-remote/webpack.config.js:13-17; .github/workflows/ci.yml:18, 36; .github/workflows/deploy.yml:44, 46-60

**Observation:** It has its own `webpack build --mode production` and `dist` output, and its own build job in the CI matrix. Deployment copies `dist` to `site/remotes/pdf-manipulation/`, published in the same GitHub Pages artifact.

**Interpretation:** There is a separate build boundary, with joint deployment under its own subpath.

### 37. packages/shell/package.json:7; packages/shell/webpack.config.js:31-35; .github/workflows/ci.yml:18, 36; .github/workflows/deploy.yml:42, 46-60

**Observation:** It has its own `webpack build --mode production` and `dist` output, and its own build job in the CI matrix. Deployment copies `dist` to the root of `site`, published in the same GitHub Pages artifact as the conversion and manipulation remotes.

**Interpretation:** There is a separate build boundary, with joint deployment alongside the two published remotes.

### 38. README.md:3

**Observation:** "independently developed [...] micro-frontends".

**Interpretation:** Claims that units are developed separately. Each has its own manifest, entry, build and development server, and the claim is corroborated.

### 39. README.md:3

**Observation:** "independently deployed".

**Interpretation:** Claims that each unit is deployed on its own. The sole deployment publishes three units together and does not publish the other three, and the claim is contradicted.

### 40. README.md:3

**Observation:** "micro-frontends, composed at runtime into one app by a shell host using Webpack 5's Module Federation".

**Interpretation:** Presents the repository as a host and micro-frontends composed through Module Federation at runtime. The claim is corroborated.

### 41. README.md:5

**Observation:** "Live: https://anish0714.github.io/devpulse-mfe/".

**Interpretation:** Gives the published application address, which is the shell production base. The claim is corroborated; the site was not accessed.

### 42. README.md:11

**Observation:** "entirely client-side".

**Interpretation:** Claims the tools do not depend on a backend. The snapshot only has frontend units and the root, and the claim is corroborated.

### 43. README.md:12

**Observation:** "each tool is its own React app with its own build".

**Interpretation:** Claims each tool is an application with its own build. The claim is corroborated.

### 44. README.md:12

**Observation:** "its own CI check".

**Interpretation:** Claims each tool has its own CI check. The CI matrix only has three of the six packages, and the claim is contradicted.

### 45. README.md:18

**Observation:** "the shell has zero compile-time dependency on any tool's source; it only knows a URL and an exposed module name".

**Interpretation:** Claims the shell only knows remotes through their URL and exposed module. The claim is corroborated.

### 46. README.md:58

**Observation:** "selecting one renders that remote's own widget in the right-hand content pane".

**Interpretation:** Claims the shell renders the selected remote widget. The claim is corroborated.

### 47. README.md:58

**Observation:** "The shell itself renders no tool-specific UI — only navigation, the Introduction, and the loading/error states around whichever remote is active."

**Interpretation:** Claims each tool screen comes from the remote, and the shell only provides the frame. The claim is corroborated.

### 48. README.md:64

**Observation:** "This is an npm-workspaces monorepo".

**Interpretation:** Describes the organization of units in a monorepo. The claim is corroborated.

### 49. README.md:66-79

**Observation:** Tree of `packages/` with "shell/ the host app: [...] remote loading, error boundaries [...]" and five remotes, each with "exposes ./Widget".

**Interpretation:** Describes the host and five remotes and what each exposes. The claim is corroborated.

### 50. README.md:82

**Observation:** "has its own `webpack.config.js` and `ModuleFederationPlugin` config".

**Interpretation:** Claims each package has its own build and federation configuration. The claim is corroborated.

### 51. README.md:84

**Observation:** "also has a standalone `App.tsx` entry".

**Interpretation:** Claims each package runs standalone. The claim is corroborated.

### 52. README.md:84

**Observation:** "visiting a remote's own deployed URL directly still renders something meaningful".

**Interpretation:** Claims each remote has its own published address. Only the conversion and manipulation remotes are published, under subpaths of the same site, and the claim is partially corroborated.

### 53. README.md:88

**Observation:** "Deployed as one GitHub Pages site (`/devpulse-mfe/`)".

**Interpretation:** Claims the units are published together on a single site. The claim is corroborated and contradicts #39.

### 54. README.md:88-97

**Observation:** "assembled from six independent builds", with a diagram copying the six `dist` to `site/`.

**Interpretation:** Claims the site combines the six builds. The workflow only copies the shell and two remotes, and the claim is contradicted.

### 55. README.md:99

**Observation:** "The shell's production config points at those exact URLs".

**Interpretation:** Claims the host configuration uses the published remote addresses. Configuration points to the five paths, and the claim is corroborated.

### 56. README.md:116

**Observation:** "deploy.yml runs only on push to `main` (or manual dispatch): it lints and builds everything, assembles the combined site, and deploys to GitHub Pages".

**Interpretation:** Describes deployment that builds everything and publishes a combined site. The claim is corroborated.

### 57. packages/dev-utils-remote/src/index.ts:1-2

**Observation:** "Module Federation requires the real entry point to be loaded asynchronously so the shared module scope can initialize before this app touches React." The same comment appears in the `index.ts` of the other five units.

**Interpretation:** Explains asynchronous bootstrap through the Module Federation shared scope. The claim is corroborated.

### 58. 310dc85 2026-09-01 (message); f4321e2 2026-09-01 (.github/workflows/deploy.yml); 25e6a9b 2026-09-01 (.github/workflows/deploy.yml)

**Observation:** The first commit message already announces "a single GitHub Pages deployment". Both readable versions of `deploy.yml` assemble a single `site` directory and publish it in a single artifact. Older README versions are not in the clone.

**Interpretation:** A stage with deployment per unit is never observed; "independently deployed" describes the intended architecture. The point is clarified.

### 59. f4321e2 2026-09-01 (.github/workflows); 25e6a9b 2026-09-01 (.github/workflows, README.md); d0b0a84 2026-09-01 (.github/workflows); 5062d12 2026-09-01 (README.md); fcca491 2026-09-01 (README.md)

**Observation:** `25e6a9b` adds dev-utils to the CI matrix and site; `d0b0a84` restores both workflows to the version in `f4321e2`, with the message "push blocked without workflow OAuth scope". `5062d12` and `fcca491` update the README without touching workflows. No later commit changes `.github/`.

**Interpretation:** The snapshot workflows are from the shell-and-two-remotes stage, and the README describes the next stage, with six packages. Connecting the three remotes to CI and deployment remained pending because of the permission block. The point is clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/dev-utils-remote, Markers, Entry and Build); 3.4.4 (packages/shell/src/App.tsx:9, Observation); 3.4.5 #3 (Configuration); 3.4.6 #1 (Where served and Artifacts); 3.4.7 #20 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #21; configures #29 |
| 2 | 3.4.3 (packages/ocr-remote, Markers, Entry and Build); 3.4.4 (packages/shell/src/App.tsx:11, Observation); 3.4.5 #5 (Configuration); 3.4.6 #2 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #31 |
| 3 | 3.4.3 (packages/pdf-conversion-remote, Markers, Entry and Build); 3.4.4 (packages/shell/src/App.tsx:7, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Where served and Artifacts); 3.4.7 #1, #6, #12, #13 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #23; configures #27 |
| 4 | 3.4.3 (packages/pdf-form-filler-remote, Markers, Entry and Build); 3.4.4 (packages/shell/src/App.tsx:10, Observation); 3.4.5 #4 (Configuration); 3.4.6 #4 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #30 |
| 5 | 3.4.3 (packages/pdf-manipulation-remote, Markers, Entry and Build); 3.4.4 (packages/shell/src/App.tsx:8, Observation); 3.4.5 #2 (Configuration); 3.4.6 #5 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #25; configures #28 |
| 6 | 3.4.3 (packages/shell, Markers, Entry and Build); 3.4.4 (packages/shell/src/App.tsx:7-11, Observation); 3.4.5 #1-#5 (Configuration); 3.4.6 #3, #5, #6 (Where served and Artifacts); 3.4.7 #3, #4, #8, #13, #18, #20 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #27; configures #28; configures #29; configures #30; configures #31 |
| 7 | 3.4.4 (packages/shell/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #27 |
| 8 | 3.4.4 (packages/shell/src/App.tsx:8) | 3 code | source code | module-federation | architectural | strong | implements #28 |
| 9 | 3.4.4 (packages/shell/src/App.tsx:9) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 10 | 3.4.4 (packages/shell/src/App.tsx:10) | 3 code | source code | module-federation | architectural | strong | implements #30 |
| 11 | 3.4.4 (packages/shell/src/App.tsx:11) | 3 code | source code | module-federation | architectural | strong | implements #31 |
| 12 | 3.4.4 (packages/dev-utils-remote/src/index.ts:3) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (packages/ocr-remote/src/index.ts:3) | 3 code | source code | — | technological | weak | — |
| 14 | 3.4.4 (packages/pdf-conversion-remote/src/index.ts:3) | 3 code | source code | — | technological | weak | — |
| 15 | 3.4.4 (packages/pdf-form-filler-remote/src/index.ts:3) | 3 code | source code | — | technological | weak | — |
| 16 | 3.4.4 (packages/pdf-manipulation-remote/src/index.ts:3) | 3 code | source code | — | technological | weak | — |
| 17 | 3.4.4 (packages/shell/src/index.ts:3) | 3 code | source code | — | technological | weak | — |
| 18 | 3.4.4 (packages/shell/src/App.tsx:34) | 3 code | source code | module-federation | architectural | strong | implements #27; implements #28; implements #29; implements #30; implements #31 |
| 19 | 3.4.4 (packages/shell/src/App.tsx:164) | 3 code | source code | module-federation | technological | moderate | implements #27; implements #28; implements #29; implements #30; implements #31 |
| 20 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 21 | 3.4.3 (packages/dev-utils-remote) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (packages/ocr-remote) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (packages/pdf-conversion-remote) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (packages/pdf-form-filler-remote) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (packages/pdf-manipulation-remote) | 4 structure | directory | — | architectural | moderate | — |
| 26 | 3.4.3 (packages/shell) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #26; links #23 |
| 28 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #26; links #25 |
| 29 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #26; links #21 |
| 30 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #26; links #24 |
| 31 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #26; links #22 |
| 32 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #21 |
| 33 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #22 |
| 34 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #23 |
| 35 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #24 |
| 36 | 3.4.6 #5 | 6 build-deploy | CI | — | architectural | moderate | publishes #25 |
| 37 | 3.4.6 #6 | 6 build-deploy | CI | — | architectural | moderate | publishes #26 |
| 38 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26 |
| 39 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | contradicts #32; contradicts #33; contradicts #34; contradicts #35; contradicts #36; contradicts #37 |
| 40 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #6; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 41 | 3.4.7 #4 | 7 documentation | documentation | — | context | weak | corroborates #37 |
| 42 | 3.4.7 #5 | 7 documentation | documentation | — | context | weak | corroborates #20 |
| 43 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates #33; corroborates #34; corroborates #35; corroborates #36; corroborates #37 |
| 44 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts .github/workflows/ci.yml:18; contradicts #32; contradicts #33; contradicts #35 |
| 45 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates packages/shell/package.json:10-13; corroborates #6; corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #11 |
| 46 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #18; corroborates #19; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 47 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates packages/shell/src/App.tsx:133-168; corroborates packages/shell/src/Introduction.tsx:14-30; corroborates packages/shell/src/RemoteErrorBoundary.tsx:24-42 |
| 48 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #20 |
| 49 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 50 | 3.4.7 #13 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #6 |
| 51 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26 |
| 52 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | partially corroborates #34; partially corroborates #36 |
| 53 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #34; corroborates #36; corroborates #37 |
| 54 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | contradicts .github/workflows/deploy.yml:39-44; contradicts #32; contradicts #33; contradicts #35 |
| 55 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #6; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 56 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates .github/workflows/deploy.yml:3-6; corroborates #34; corroborates #36; corroborates #37 |
| 57 | 3.4.7 #20 | 7 documentation | comment | module-federation | technological | weak | corroborates #12; corroborates #1; corroborates #6 |
| 58 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #39; explains #34; explains #36; explains #37 |
| 59 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #44; explains #52; explains #54; explains #32; explains #33; explains #35 |

## Summary

Observations: 59. Dimensions (technology: 0, configuration: 6, code: 13, structure: 7, composition: 5, build-deploy: 6, documentation: 20, history: 2). Strength (strong: 12, moderate: 18, weak: 29, ambiguous: 0). Evidence (technological: 13, architectural: 43, context: 3).

