---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Repository overview

Sole documentation is English root `README.txt`, with 18 lines. `artifacts.csv` contains no `documentation` files (`README.txt` has empty `artifact_types` column), and `matches.csv` no `doc-*` occurrences. Because file is project-wide prose, it was read in full and included in table, as in repository 013 review. It describes a micro-frontend demonstration using webpack Module Federation, names both applications and roles, gives run instructions and says host loads remote component (README.txt:1-14). All matches previous reviews: two units (`app1` and `app2`), one host → remote Module Federation relationship, separate development-mode builds and no observed deployment.

Excluded: run steps (README.txt:7-13), execution instructions — terminal per directory, `npm install` and `npm start`, first `app2` then `app1` — already used by build and deployment review to describe local execution; order reflects host composing only while remote server runs (app1/webpack.config.js:31). Final notes also excluded (README.txt:16-18): "minimal demo" is repository type, "Node >= 18 and npm" concerns installation, and port adjustment in `webpack.config.js` is infrastructure detail.

Artifacts cited by previous reviews were read: both `package.json` files (without `description`; app1/package.json:1-21; app2/package.json:1-21), both `webpack.config.js`, `index.js`, `bootstrap.js`, app1/src/App.jsx, app2/src/RemoteApp.jsx and both `public/index.html`. None has comments. Interface text repeats README roles — titles "App1 Host" and "App2 Remote" (app1/public/index.html:3; app2/public/index.html:3) and heading "Host App (app1)" (app1/src/App.jsx:7) — but is page text rather than documentation, cited only here.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.txt:1 | "Microfrontend Webpack Module Federation demo" | structure | corroborated | 3.4.3 (app1 and app2 `Yes`); 3.4.5 #1; app1/webpack.config.js:2,28; app2/webpack.config.js:2,28 |
| 2 | README.txt:3-5 | "Two apps: / - app1 (host) -> http://localhost:3001 / - app2 (remote) -> http://localhost:3002" | structure | corroborated | 3.4.3 (app1 and app2 `Yes`); 3.4.5 #1; 3.4.6 #1; 3.4.6 #2 |
| 3 | README.txt:14 | "app1 will open at http://localhost:3001 and load remote component from app2" | composition | corroborated | 3.4.5 #1; 3.4.4 (`src-remote-import`, app1/src/App.jsx:2); app1/src/App.jsx:2,8-10 |

## Observations

**1. README.txt:1.** Title says project demonstrates micro-frontends with webpack Module Federation. Structural review records two frontend units, `app1` and `app2`, and both configurations use `ModuleFederationPlugin` from `webpack` itself (app1/webpack.config.js:2,28; app2/webpack.config.js:2,28), basis of relationship 3.4.5 #1. Since plugin comes from `webpack` rather than own package, dependency review has no technology row; named technology matches composition review (`module-federation`), so no naming discrepancy.

**2. README.txt:3-5.** Both applications exist, each with own directory, `package.json` and webpack configuration (3.4.3), and roles match: `app1` declares remote `app2` (app1/webpack.config.js:30-31), and `app2` publishes through `remoteEntry.js` and exposes `./RemoteApp` (app2/webpack.config.js:29-32), relationship 3.4.5 #1. Ports 3001 and 3002 belong to development servers (app1/webpack.config.js:8-9; app2/webpack.config.js:8-9; app1/package.json:6; app2/package.json:6), recorded in 3.4.6 #1 and #2; infrastructure details without claim effect. Page titles and host heading repeat roles (see Repository overview).

**3. README.txt:14.** Host loads remote-exposed component at runtime: `React.lazy(() => import('app2/RemoteApp'))` (app1/src/App.jsx:2), rendered within `Suspense` (app1/src/App.jsx:8-10), resolved through `remoteEntry.js` at `http://localhost:3002` (app1/webpack.config.js:31). This is active relationship 3.4.5 #1 and source-code review construct `src-remote-import`. Remote component is only a `div` with one sentence (app2/src/RemoteApp.jsx:3-5). Opening `http://localhost:3001` comes from `webpack serve --open` on port 3001 (app1/package.json:6).

## Summary

Claims: 3 (corroborated: 3, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (structure: 2, composition: 1).
