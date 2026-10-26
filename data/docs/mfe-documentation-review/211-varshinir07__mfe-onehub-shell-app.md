---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Repository overview

Sole `documentation` file in `artifacts.csv` is English `README.md`. Only first two lines project-specific: title "# mfe-onehub-shell" (README.md:1), without claim, and "MFE Remote App for OnehubShell" (README.md:2), claim 1. Rest standard Create React App README (README.md:4-74), describing `npm start`, `npm test`, `npm run build`, `npm run eject`, linking CRA documentation. "Builds the app for production to the `build` folder" and "Your app is ready to be deployed!" (README.md:27-31) template text without rows; build and deployment review already notes mismatch with actual script writing `dist/` in development mode (package.json:20; src/webpack.config.js:7, 25-29).

Architectural documentation in `src/webpack.config.js` comments and one `src/pages/Dashboard.jsx` line. They describe previous review findings: application uses Module Federation, consumes modules from two external remote applications, shares `react`/`react-dom` singleton (3.4.3; 3.4.5 #1-#2). README role is opposite: "Remote App", while project hosts as `onehub`, declaring `remotes`, exposing nothing (src/webpack.config.js:72-92). Classification already flags misleading signal.

Mining has two `doc-mfe-term` occurrences, both README: README.md:1 ("# mfe-onehub-shell") title without claim; README.md:2 ("MFE Remote App for OnehubShell") claim 1.

Comments/descriptive fields read: `src/webpack.config.js`, only :71, :75, :80 making unit claims (#3 through #5); others concern own build (development mode :6; entry :9; server :12-21; output/`publicPath` :24-28; loaders :31-60; HTML template :67; name :73; resolution/alias :95-99); src/pages/Dashboard.jsx:21 comment (#2); `package.json`, no `description` (package.json:1-51); CRA template text in `public/index.html` (`description` "Web site created using create-react-app", public/index.html:8-11, comments :13-16, :18-26, :32-41), `public/manifest.json` (public/manifest.json:2-3), src/index.js:14-16, src/setupTests.js:1-4, without claims.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:2 | "MFE Remote App for OnehubShell" | structure | contradicted | 3.4.5 #1-#2; src/webpack.config.js:72-92 |
| 2 | src/pages/Dashboard.jsx:21 | "Using Card from Remote App" | composition | corroborated | 3.4.4 (src-remote-import src/pages/Dashboard.jsx:9; manual src/pages/Dashboard.jsx:22); 3.4.5 #1 |
| 3 | src/webpack.config.js:71 | "Module Federation configuration for micro-frontends" | composition | corroborated | 3.4.5 #1-#2; src/webpack.config.js:3, 72-92 |
| 4 | src/webpack.config.js:75 | "Remote apps to consume modules from" | composition | corroborated | 3.4.5 #1-#2; src/webpack.config.js:76-77; src/pages/Dashboard.jsx:3-9 |
| 5 | src/webpack.config.js:80 | "Share React and ReactDOM as singletons to avoid version conflicts" | composition | partial | src/webpack.config.js:79-91 |

## Observations

**1. README.md:2.** Says repository is remote micro-frontend application consumed by "OnehubShell". "MFE" holds: participates in Module Federation composition (3.4.5 #1-#2). Role does not: snapshot only host `onehub`, two `remotes`, no `exposes` (src/webpack.config.js:72-92), composition review originating both host → remote relationships, target of none. Hence `contradicted`. "OnehubShell" likely project itself by name (container `name` `onehub`, src/webpack.config.js:73; title "mfe-onehub-shell", README.md:1), supporting "Remote" label as author mistake; classification same.

**2. src/pages/Dashboard.jsx:21.** Comment above `<Card>` says component from remote. Holds: `Card` loaded through `React.lazy(() => import('remote1/Card'))` (src/pages/Dashboard.jsx:9), `remote1` container `subscription` at `http://localhost:3001/remoteEntry.js` (src/webpack.config.js:76). Source-code review records load/render with props `topic`/`description` (src/pages/Dashboard.jsx:22-25), composition includes row in `.` → `subscription` relationship (3.4.5 #1). Remote outside snapshot; host side holds.

**3. src/webpack.config.js:71.** Comment presents `ModuleFederationPlugin` block (src/webpack.config.js:3, 72-92) as micro-frontend configuration. Technology matches both composition relationships (`module-federation` mechanism, 3.4.5 #1-#2), host indeed composing modules from two external units (3.4.4). Dependency review lacks row because plugin comes from `webpack` itself (`require('webpack').container`, src/webpack.config.js:3), without federation package in dependencies.csv.

**4. src/webpack.config.js:75.** Comment says `remotes` entries are remote applications supplying host-consumed modules. Entries `remote1: 'subscription@http://localhost:3001/remoteEntry.js'`/`remote2: 'ownership@http://localhost:3002/remoteEntry.js'` (src/webpack.config.js:76-77) used by five Dashboard `import('remote1/…')`/`import('remote2/…')` calls (src/pages/Dashboard.jsx:3-9), recorded in 3.4.5 #1 and #2. Separate applications on other ports supported only by configuration statements, units outside snapshot (3.4.3, Notes).

**5. src/webpack.config.js:80.** Host declares `react`/`react-dom` `singleton`, `requiredVersion: '^19.1.0'`, `eager: true` (src/webpack.config.js:79-91). Sharing requires at least two units using library in snapshot; remotes `subscription`/`ownership` outside, same `shared` declarations unobservable. Host portion holds, other side lacks artifact: `partial`. Rationale ("to avoid version conflicts") usual `singleton` purpose, without separate verification.

## Summary

Claims: 5 (corroborated: 3, partial: 1, contradicted: 1, uncorroborated: 0). Themes: (structure: 1, composition: 4).
