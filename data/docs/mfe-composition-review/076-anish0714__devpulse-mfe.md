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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Repository overview

A browser toolbox demonstration in an npm monorepo: `packages/shell` is the host and five React/webpack packages are Module Federation remotes, each exposing a single `./Widget` module with the tool screen (PDF conversion, PDF manipulation, development utilities, PDF form filling and OCR). The shell declares the five remotes in `ModuleFederationPlugin` (packages/shell/webpack.config.js:50-58), with a `remoteEntry.js` URL on localhost (ports 3003 to 3007) in development or under `https://anish0714.github.io/devpulse-mfe/remotes/...` in production (packages/shell/webpack.config.js:6, 11-25). In the code, the five `Widget` modules are imported through `React.lazy` (packages/shell/src/App.tsx:7-11) and gathered in a section table (packages/shell/src/App.tsx:34-91); the sidebar chooses the active section (packages/shell/src/App.tsx:135-148) and the selected remote component is rendered inside `Suspense` and a `RemoteErrorBoundary` (packages/shell/src/App.tsx:162-166). Thus only the open widget is loaded; all five relationships have the same form.

What did not become a relationship: each unit has the asynchronous `import("./bootstrap")` required by Module Federation (for example packages/shell/src/index.ts:3), internal to it. Each section's `url` field (packages/shell/src/App.tsx:42-44, 53-55, 64-66, 75-77, 86-88) repeats the configuration URLs but is not read by the shell; resolution comes from webpack. There is no inter-unit communication: the shell passes no props to widgets (packages/shell/src/App.tsx:164) and the source code review found no events, `postMessage` or shared state. The remotes share only `react` and `react-dom` as singletons with the host (packages/shell/webpack.config.js:59-62).

Publication detail: the deploy workflow builds all workspaces but copies only the shell and PDF conversion and manipulation remotes to the site (.github/workflows/deploy.yml:36-44). In production, the dev-utils, PDF forms and OCR URLs (packages/shell/webpack.config.js:17-25) would have no files published by that workflow. This does not change the relationships declared and used in the code, but limits what can be said about the published site (not accessed).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/shell | packages/pdf-conversion-remote | host → remote | source → target | module-federation | Yes | Yes | packages/shell/webpack.config.js:53 (remote `pdfConversion`); packages/shell/webpack.config.js:11-13 (URL `remotes/pdf-conversion/remoteEntry.js` or `localhost:3003/remoteEntry.js`); packages/pdf-conversion-remote/webpack.config.js:34-37 (`name: "pdfConversion"`, `filename: "remoteEntry.js"`, exposes `./Widget`); packages/pdf-conversion-remote/webpack.config.js:28 (port 3003) | packages/shell/src/App.tsx:7; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 2 | packages/shell | packages/pdf-manipulation-remote | host → remote | source → target | module-federation | Yes | Yes | packages/shell/webpack.config.js:54 (remote `pdfManipulation`); packages/shell/webpack.config.js:14-16 (URL `remotes/pdf-manipulation/remoteEntry.js` or `localhost:3004/remoteEntry.js`); packages/pdf-manipulation-remote/webpack.config.js:34-37 (`name: "pdfManipulation"`, `filename: "remoteEntry.js"`, exposes `./Widget`); packages/pdf-manipulation-remote/webpack.config.js:28 (port 3004) | packages/shell/src/App.tsx:8; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 3 | packages/shell | packages/dev-utils-remote | host → remote | source → target | module-federation | Yes | Yes | packages/shell/webpack.config.js:55 (remote `devUtils`); packages/shell/webpack.config.js:17-19 (URL `remotes/dev-utils/remoteEntry.js` or `localhost:3005/remoteEntry.js`); packages/dev-utils-remote/webpack.config.js:34-37 (`name: "devUtils"`, `filename: "remoteEntry.js"`, exposes `./Widget`); packages/dev-utils-remote/webpack.config.js:28 (port 3005) | packages/shell/src/App.tsx:9; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 4 | packages/shell | packages/pdf-form-filler-remote | host → remote | source → target | module-federation | Yes | Yes | packages/shell/webpack.config.js:56 (remote `pdfFormFiller`); packages/shell/webpack.config.js:20-22 (URL `remotes/pdf-form-filler/remoteEntry.js` or `localhost:3006/remoteEntry.js`); packages/pdf-form-filler-remote/webpack.config.js:34-37 (`name: "pdfFormFiller"`, `filename: "remoteEntry.js"`, exposes `./Widget`); packages/pdf-form-filler-remote/webpack.config.js:28 (port 3006) | packages/shell/src/App.tsx:10; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 5 | packages/shell | packages/ocr-remote | host → remote | source → target | module-federation | Yes | Yes | packages/shell/webpack.config.js:57 (remote `ocr`); packages/shell/webpack.config.js:23-25 (URL `remotes/ocr/remoteEntry.js` or `localhost:3007/remoteEntry.js`); packages/ocr-remote/webpack.config.js:34-37 (`name: "ocr"`, `filename: "remoteEntry.js"`, exposes `./Widget`); packages/ocr-remote/webpack.config.js:28 (port 3007) | packages/shell/src/App.tsx:11; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |

## Observations

**1. packages/shell → packages/pdf-conversion-remote.** The shell's `pdfConversion` remote (packages/shell/webpack.config.js:53) matches the unit through `name: "pdfConversion"` and the exposed `./Widget` (packages/pdf-conversion-remote/webpack.config.js:34-37), the module requested in packages/shell/src/App.tsx:7; port 3003 only corroborates. The relationship is active: the component enters the section at packages/shell/src/App.tsx:45 and is rendered at packages/shell/src/App.tsx:164 when that section is selected. It is one of the two remotes published by the deploy workflow (.github/workflows/deploy.yml:43).

**2. packages/shell → packages/pdf-manipulation-remote.** The same form as relationship 1: remote `pdfManipulation` (packages/shell/webpack.config.js:54), `name` and `./Widget` in packages/pdf-manipulation-remote/webpack.config.js:34-37, import in packages/shell/src/App.tsx:8, section in packages/shell/src/App.tsx:56. Also published by deployment (.github/workflows/deploy.yml:44).

**3. packages/shell → packages/dev-utils-remote.** Remote `devUtils` (packages/shell/webpack.config.js:55), resolved through `name: "devUtils"` and `./Widget` (packages/dev-utils-remote/webpack.config.js:34-37); import in packages/shell/src/App.tsx:9 and section in packages/shell/src/App.tsx:67. The widget's internal tools (JSON, Base64, UUID, regex) remain inside the remote and do not form their own relationships. The production URL `remotes/dev-utils/` (packages/shell/webpack.config.js:18) is not populated by deployment (.github/workflows/deploy.yml:41-44); this does not affect Active, which relies on code.

**4. packages/shell → packages/pdf-form-filler-remote.** Remote `pdfFormFiller` (packages/shell/webpack.config.js:56), resolved through `name: "pdfFormFiller"` and `./Widget` (packages/pdf-form-filler-remote/webpack.config.js:34-37); import in packages/shell/src/App.tsx:10 and section in packages/shell/src/App.tsx:78. As in relationship 3, the production path (packages/shell/webpack.config.js:21) is not copied by deployment.

**5. packages/shell → packages/ocr-remote.** Remote `ocr` (packages/shell/webpack.config.js:57), resolved through `name: "ocr"` and `./Widget` (packages/ocr-remote/webpack.config.js:34-37); import in packages/shell/src/App.tsx:11 and section in packages/shell/src/App.tsx:89. As in relationships 3 and 4, the production path (packages/shell/webpack.config.js:24) is not copied by deployment.

## Summary

Relationships: 5 (host → remote: 5). Active: 5. Target outside the snapshot: 0.
Units without a relationship: none.

