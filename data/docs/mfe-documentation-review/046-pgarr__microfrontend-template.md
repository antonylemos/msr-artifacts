---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 046 — pgarr/microfrontend-template

## Repository overview

The repository has no `.md` file, and `package.json` files have no `description`. Documentation consists of comments from the course pattern followed by the template:
- **Each remote's `bootstrap.js`:** each mounts itself when running independently in development and exports `mount` for container.
- **Container wrappers:** auth and marketing wrappers mount remote once and synchronize container-to-remote navigation.

Comments are identical across all three remotes, but each refers to its own unit and was checked there. This is the same architecture as repository 017, lacking those comments.

Artifacts cited by previous reviews were also read:
- all four deployment workflows;
- webpack configurations;
- `package.json` and `index.js` files;
- `container/src/App.js`, `DashboardApp.js` and auth login components.

None has an architecture comment. Comment "Listen to history changes and update location state", in `auth/src/App.js:12` and `marketing/src/App.js:12`, remained outside the table as an internal detail of each remote.

All comment claims match previous reviews.

No `doc-*` occurrences in mining.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | auth/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (auth mounts itself when isolated) | independence | corroborated | 3.4.3 (auth `Yes`); auth/src/bootstrap.js:36-42; auth/public/index.html:5 |
| 2 | auth/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (auth is mounted by container) | composition | corroborated | 3.4.5 #1; container/src/components/AuthApp.js:1, 13 |
| 3 | container/src/components/AuthApp.js:11 | "Mount the microfrontend once" (container mounts auth only once) | composition | corroborated | container/src/components/AuthApp.js:12-22 |
| 4 | container/src/components/AuthApp.js:24 | "Sync navigation from container to child" (container navigation is forwarded to auth) | composition | corroborated | container/src/components/AuthApp.js:21, 25-29 |
| 5 | container/src/components/MarketingApp.js:11 | "Mount the microfrontend once" (container mounts marketing only once) | composition | corroborated | container/src/components/MarketingApp.js:12-21 |
| 6 | container/src/components/MarketingApp.js:23 | "Sync navigation from container to child" (container navigation is forwarded to marketing) | composition | corroborated | container/src/components/MarketingApp.js:24-28 |
| 7 | dashboard/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (dashboard mounts itself when isolated) | independence | corroborated | 3.4.3 (dashboard `Yes`); dashboard/src/bootstrap.js:12-18; dashboard/public/index.html:5 |
| 8 | dashboard/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (dashboard is mounted by container) | composition | corroborated | 3.4.5 #2; container/src/components/DashboardApp.js:1, 8 |
| 9 | marketing/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (marketing mounts itself when isolated) | independence | corroborated | 3.4.3 (marketing `Yes`); marketing/src/bootstrap.js:36-42; marketing/public/index.html:5 |
| 10 | marketing/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (marketing is mounted by container) | composition | corroborated | 3.4.5 #3; container/src/components/MarketingApp.js:1, 13 |

## Observations

**1. auth/src/bootstrap.js:34-35.** In development, auth looks for `#_auth-dev-root`, present in its `index.html`, and mounts itself with browser history. When mounted by container, it uses memory history (see the composition review).

**2. auth/src/bootstrap.js:44-45.** Auth exposes `./AuthApp`, and container imports `mount` from `auth/AuthApp` and calls it in its wrapper.

**3. container/src/components/AuthApp.js:11.** Mounting is in a `useEffect` with empty dependencies, executed once per wrapper mount. The wrapper passes auth the initial path and callbacks `onNavigate` and `onSignIn`.

**4. container/src/components/AuthApp.js:24.** The wrapper retains `onParentNavigate` returned by `mount` and calls it whenever container location changes. Synchronization in the other direction uses `onNavigate` (container/src/components/AuthApp.js:15-17).

**5. container/src/components/MarketingApp.js:11.** Same auth pattern, once per wrapper mount, without the login callback.

**6. container/src/components/MarketingApp.js:23.** Same auth pattern.

**7. dashboard/src/bootstrap.js:10-11.** Dashboard, in Vue, looks for `#_dashboard-dev-root` and mounts itself. Unlike auth and marketing, it receives neither history nor options. Container wrapper also lacks mounting and synchronization comments, because no navigation needs synchronization (container/src/components/DashboardApp.js:1-11).

**8. dashboard/src/bootstrap.js:20-21.** Dashboard exposes `./DashboardApp`, and container calls `mount(ref.current)` once.

**9. marketing/src/bootstrap.js:34-35.** Same auth pattern, with `#_marketing-dev-root`.

**10. marketing/src/bootstrap.js:44-45.** Marketing exposes `./MarketingApp`, and container imports and calls its `mount`.

## Summary

Claims: 10 (corroborated: 10, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (composition: 7, independence: 3).
