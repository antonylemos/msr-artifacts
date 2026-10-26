---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
url: https://github.com/viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Context

- **Implementation approach:** Module Federation (`@originjs/vite-plugin-federation`)
- **Repository type:** example/proof of concept (course assignment, "Emerging Technologies Lab Assignment 3": MF frontend + GraphQL microservices)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `client/shell-app`, `client/auth-app` and `client/community-app`, each with `package.json`, `vite.config.js`, `index.html` and `src/main.jsx`; `server/` with gateway and GraphQL microservices (auth, community-engagement) | strong |
| Configuration (host) | `client/shell-app/vite.config.js:10-13`: `name: 'shellApp'`, `remotes: { authApp: 'http://localhost:3001/assets/remoteEntry.js', communityApp: 'http://localhost:3002/assets/remoteEntry.js' }`; port 3000 (`:28`) | strong |
| Configuration (remotes) | `client/auth-app/vite.config.js:10-13` and `client/community-app/vite.config.js:10-13`: `name`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/App.jsx' }`; ports 3001/3002 | strong |
| Source code (composition) | `client/shell-app/src/App.jsx:5-6`: `lazy(() => import('authApp/App'))` and `import('communityApp/App')`; `:43-47`: routes `/login` and `/community` mount remotes | strong |
| Source code (communication) | `client/shell-app/src/App.jsx:25-31`: the shell listens for the `loginSuccess` event (`window.addEventListener`) triggered by the authentication remote | moderate |
| Build/deploy | `client/package.json:10`: `concurrently` with `npm run deploy` (build + preview) for each remote and shell `dev`; `client/auth-app/package.json:8-11` | moderate |
| Source code | No source code imports between apps (supports the units' independence) | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell-app`, `auth-app` and `community-app` |
| Q2 | Yes | Their own `vite.config.js`, entry, build and port; no source code imports between apps |
| Q3 | Yes | The shell routes to and mounts remotes (`App.jsx:43-47`) |
| Q4 | Yes | `remotes`/`exposes` configured and used through `import('<remote>/App')` |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes" and "examples… that actually compose frontend units".

## Analysis notes

- **RQ3:** remote → host communication through a global `CustomEvent` (`loginSuccess`), alongside session state queried by the shell through GraphQL.
- Aligned frontend/backend architecture: each remote corresponds to a microservice (auth, community).
