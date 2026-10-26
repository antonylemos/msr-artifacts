---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Repository overview

Sole document is English `README.md`, 11 lines. It presents webpack Module Federation learning project with React shell, React marketing/authentication remotes and "legacy" Vue dashboard (README.md:1-5). Rest refers to chapter-based guide `docs/README.md` (README.md:7-11), absent from snapshot. README omits two trees with same unit names. Root `container`, `marketing` and `auth` publish through workflows. Complete copy in `packages/` adds dashboard without workflow (3.4.3; 3.4.6). Claims match previous reviews. Vue dashboard exists as unit only in `packages/` copy (3.4.5 #4).

Four `doc-*` occurrences in README. `doc-mfe-term` (README.md:1) is row 1. `doc-integration-technology` (README.md:3) and `doc-host-remote` (README.md:4) are row 2. `doc-runtime-loading` (README.md:9) yields no row: sentence lists absent guide topics ("the current implementation, webpack, runtime integration, modern implementation options, production concerns, and a phased improvement plan", README.md:9-11), without describing unit composition. Instruction to start with guide (README.md:7) is also no claim.

Remaining documentation is English course-pattern comments:
- **Each remote's `bootstrap.js`:** mounts itself in isolated development, exporting `mount` for container. Comments in five remotes: auth, marketing, packages/auth, packages/dashboard and packages/marketing.
- **Container wrappers in `packages/`:** auth/marketing wrappers mount remote once, syncing container navigation to remote. Root container wrappers do same without comments (container/src/components/AuthApp.js:11-27).

Remote comments are identical but each addresses own unit and was checked there, yielding one row per file.

Excluded internal remote comments:
- "Mount function to start up the app", about function `mount` (auth/src/bootstrap.js:6; marketing/src/bootstrap.js:6; packages/auth/src/bootstrap.js:6; packages/dashboard/src/bootstrap.js:4; packages/marketing/src/bootstrap.js:6);
- "Listen to history changes and update location state" and listener cleanup comment (auth/src/App.js:12, 17; packages/auth/src/App.js:12, 17; packages/marketing/src/App.js:12, 17).

Also excluded layout comments (marketing/src/components/Landing.js:100; marketing/src/components/Pricing.js:127; packages/marketing/src/components/Landing.js:95; packages/marketing/src/components/Pricing.js:127; packages/dashboard/src/components/Dashboard.vue:394-564). Commented root container lines are disabled code rather than prose: remote `dashboard` (container/config/webpack.prod.js:20), `DashboardLazy` and `/dashboard` route (container/src/App.js:16, 40-43). Only context for row 2.

Also read artifacts cited by previous reviews:
- Three deployment workflows;
- Webpack configurations in both trees;
- `package.json` files (none with `description`), `index.js` and `public/index.html`;
- `container/src/App.js` and `packages/container/src/App.js`, wrappers `AuthApp.js`, `MarketingApp.js` and `DashboardApp.js`.

Workflows, webpack configurations and `index.html` files have no comments; `.vscode/settings.json` only configures editor.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:1 | "MFE learning project" | structure | corroborated | 3.4.3 (seven applications `Yes`); 3.4.5 #1-#5 |
| 2 | README.md:3-5 | "a webpack Module Federation learning project containing a React shell, React marketing and authentication remotes, and a legacy Vue dashboard example" | composition | corroborated | 3.4.3 (container, auth, marketing, packages/dashboard `Yes`); 3.4.5 #1-#5; container/config/webpack.prod.js:2, 15-21; packages/dashboard/src/bootstrap.js:1, 5-7 |
| 3 | auth/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (auth mounts itself when isolated) | independence | corroborated | 3.4.3 (auth `Yes`); auth/src/bootstrap.js:36-42; auth/public/index.html:7 |
| 4 | auth/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (auth is mounted by container) | composition | corroborated | 3.4.5 #1; auth/src/bootstrap.js:46; container/src/components/AuthApp.js:1, 12 |
| 5 | marketing/src/bootstrap.js:32 | "If we are development and in isolation, call mount immediately" (marketing mounts itself when isolated) | independence | corroborated | 3.4.3 (marketing `Yes`); marketing/src/bootstrap.js:33-38; marketing/public/index.html:5 |
| 6 | marketing/src/bootstrap.js:40 | "We are running through container and we should export the mount function" (marketing is mounted by container) | composition | corroborated | 3.4.5 #2; marketing/src/bootstrap.js:41; container/src/components/MarketingApp.js:1, 13 |
| 7 | packages/auth/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (auth in `packages/` mounts itself when isolated) | independence | corroborated | 3.4.3 (packages/auth `Yes`); packages/auth/src/bootstrap.js:36-42; packages/auth/public/index.html:5 |
| 8 | packages/auth/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (auth in `packages/` is mounted by container) | composition | corroborated | 3.4.5 #3; packages/auth/src/bootstrap.js:46; packages/container/src/components/AuthApp.js:1, 13 |
| 9 | packages/container/src/components/AuthApp.js:11 | "Mount the microfrontend once" (container mounts auth once) | composition | corroborated | 3.4.4 (packages/container/src/components/AuthApp.js:13); packages/container/src/components/AuthApp.js:12-22 |
| 10 | packages/container/src/components/AuthApp.js:24 | "Sync navigation from container to child" (container navigation passed to auth) | composition | corroborated | packages/container/src/components/AuthApp.js:21, 25-29; packages/auth/src/bootstrap.js:23-30 |
| 11 | packages/container/src/components/MarketingApp.js:11 | "Mount the microfrontend once" (container mounts marketing once) | composition | corroborated | 3.4.4 (packages/container/src/components/MarketingApp.js:13); packages/container/src/components/MarketingApp.js:12-21 |
| 12 | packages/container/src/components/MarketingApp.js:23 | "Sync navigation from container to child" (container navigation passed to marketing) | composition | corroborated | packages/container/src/components/MarketingApp.js:20, 24-28; packages/marketing/src/bootstrap.js:23-30 |
| 13 | packages/dashboard/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (dashboard mounts itself when isolated) | independence | corroborated | 3.4.3 (packages/dashboard `Yes`); packages/dashboard/src/bootstrap.js:12-18; packages/dashboard/public/index.html:5 |
| 14 | packages/dashboard/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (dashboard mounted by container) | composition | corroborated | 3.4.5 #4; packages/dashboard/src/bootstrap.js:22; packages/container/src/components/DashboardApp.js:1, 8 |
| 15 | packages/marketing/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (marketing in `packages/` mounts itself when isolated) | independence | corroborated | 3.4.3 (packages/marketing `Yes`); packages/marketing/src/bootstrap.js:36-42; packages/marketing/public/index.html:5 |
| 16 | packages/marketing/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (marketing in `packages/` mounted by container) | composition | corroborated | 3.4.5 #5; packages/marketing/src/bootstrap.js:46; packages/container/src/components/MarketingApp.js:1, 13 |

## Observations

**1. README.md:1.** Title presents micro-frontend project. Structural review has seven applications in both trees (3.4.3), composition review five host → remote Module Federation relationships, all active (3.4.5 #1-#5).

**2. README.md:3-5.** Named technology matches snapshot: all containers/remotes use webpack's `ModuleFederationPlugin` (container/config/webpack.prod.js:2, 15-21), and 3.4.5 records five relationships with mechanism `module-federation`. Dependency review lacks row because plugin built into webpack, so no naming difference. React shell is `container`, sole host per tree. React marketing/authentication remotes are `marketing` and `auth` (3.4.5 #1, #2, #3, #5). Vue dashboard is `packages/dashboard`, mounting Vue component through `createApp` (packages/dashboard/src/bootstrap.js:1, 5-7), remote of container in `packages/` (3.4.5 #4). Published root tree disables dashboard: remote/route commented (container/config/webpack.prod.js:20; container/src/App.js:16, 40-43), `dashboard/` containing only `package.json` (3.4.3). Fits README "legacy", without verifiable property. README describes one project without mentioning two copies; contradicts no sentence part because each named unit exists.

**3. auth/src/bootstrap.js:34-35.** In development, auth seeks `#_auth-dev-root`, mounting itself with browser history if element exists (auth/src/bootstrap.js:36-42). Element only exists in own `index.html` (auth/public/index.html:7). Structural review records mounting in Entry column (3.4.3).

**4. auth/src/bootstrap.js:44-45.** Auth exports `mount` (auth/src/bootstrap.js:46). Root container imports from `auth/AuthApp`, calling it in wrapper (container/src/components/AuthApp.js:1, 12), relationship 3.4.5 #1.

**5. marketing/src/bootstrap.js:32.** Same comment on one line with "If we are development" omitting "in". In development marketing mounts itself on `#_marketing-dev-root` (marketing/src/bootstrap.js:33-38), element in own `index.html` (marketing/public/index.html:5).

**6. marketing/src/bootstrap.js:40.** Marketing exports `mount` (marketing/src/bootstrap.js:41), root container wrapper importing/calling it (container/src/components/MarketingApp.js:1, 13). Relationship 3.4.5 #2.

**7. packages/auth/src/bootstrap.js:34-35.** Copy in `packages/`, same root code: mounts on `#_auth-dev-root` in isolated development (packages/auth/src/bootstrap.js:36-42; packages/auth/public/index.html:5).

**8. packages/auth/src/bootstrap.js:44-45.** Exported `mount` (packages/auth/src/bootstrap.js:46) imported/called by container wrapper in `packages/` (packages/container/src/components/AuthApp.js:1, 13). Relationship 3.4.5 #3.

**9. packages/container/src/components/AuthApp.js:11.** `useEffect` calls `mount` with empty dependency list (packages/container/src/components/AuthApp.js:12-22), running only on first wrapper render. Comment at line 22, "Empty dependency - mount once", repeats claim. Source-code review records call as `runtime-composition` (3.4.4).

**10. packages/container/src/components/AuthApp.js:24.** Wrapper retains `onParentNavigate` returned by `mount` (packages/container/src/components/AuthApp.js:21). Each `location` change calls function with current path (packages/container/src/components/AuthApp.js:25-29). Auth side pushes path into memory history if different (packages/auth/src/bootstrap.js:23-30). Reverse direction, remote to container, uses `onNavigate`, outside comment claim. 3.4.5 describes exchange in Repository overview, without separate relationship.

**11. packages/container/src/components/MarketingApp.js:11.** As row 9: `mount` called in `useEffect` with empty dependencies (packages/container/src/components/MarketingApp.js:12-21), comment repeated at line 21. Call in 3.4.4.

**12. packages/container/src/components/MarketingApp.js:23.** As row 10: wrapper retains `onParentNavigate` (packages/container/src/components/MarketingApp.js:20), calling on each `location` change (packages/container/src/components/MarketingApp.js:24-28). Marketing in `packages/` updates own history (packages/marketing/src/bootstrap.js:23-30).

**13. packages/dashboard/src/bootstrap.js:10-11.** In development dashboard mounts Vue component on `#_dashboard-dev-root` (packages/dashboard/src/bootstrap.js:12-18), own `index.html` element (packages/dashboard/public/index.html:5). Unlike React remotes, `mount` receives no history (packages/dashboard/src/bootstrap.js:5-8), without changing claim.

**14. packages/dashboard/src/bootstrap.js:20-21.** Dashboard exports `mount` (packages/dashboard/src/bootstrap.js:22), container in `packages/` importing/calling with element alone (packages/container/src/components/DashboardApp.js:1, 8). Relationship 3.4.5 #4. Root container does not load dashboard (row 2).

**15. packages/marketing/src/bootstrap.js:34-35.** Copy in `packages/`: mounts on `#_marketing-dev-root` in isolated development (packages/marketing/src/bootstrap.js:36-42; packages/marketing/public/index.html:5).

**16. packages/marketing/src/bootstrap.js:44-45.** Exported `mount` (packages/marketing/src/bootstrap.js:46) imported/called by container wrapper in `packages/` (packages/container/src/components/MarketingApp.js:1, 13). Relationship 3.4.5 #5.

## Summary

Claims: 16 (corroborated: 16, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (structure: 1, composition: 10, independence: 5).
