---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
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
  date: 2026-10-21
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Repository overview

Three React/Vite applications form complete Module Federation chain:
- **Dependency:** `@originjs/vite-plugin-federation` in three applications (#1 through #3).
- **Configuration:** two remotes declare themselves/expose `./App` (#4, #5), shell declaring both (#6).
- **Code:** shell imports each remote application by name (#7, #8), links to route (#11), renders (#12, #13).
- **Host → remote relationships:** two active relationships result (#19, #20).

Also inter-frontend communication channel. Auth-app dispatches `loginSuccess` on `window` (#9), shell listening (#10). Third active relationship auth-app → shell (#21). Immediately after event auth-app reloads page, state then depending on backend session. Particularity not recorded by strength.

Separate builds, no observed deployment: `deploy` script only builds/local previews (#22 through #24). Root `client/` and backend `server/` context (#14, #18). Sole backend-comment claim corroborates three micro-frontends (#25).

## Observations

### 1. client/auth-app/package.json:15

**Observation:** `@originjs/vite-plugin-federation` (`1.3.5`) declared in `dependencies`.

**Interpretation:** Federation technology present in auth-app build.

### 2. client/community-app/package.json:15

**Observation:** `@originjs/vite-plugin-federation` (`1.3.5`) declared in `dependencies`.

**Interpretation:** Federation technology present in community-app build.

### 3. client/shell-app/package.json:14

**Observation:** `@originjs/vite-plugin-federation` (`1.3.5`) declared in `dependencies`.

**Interpretation:** Federation technology present in shell build.

### 4. client/auth-app/vite.config.js:1-33

**Observation:** `federation` declares `name: 'authApp'` and `filename: 'remoteEntry.js'`, exposing `./App` (`./src/App.jsx`), sharing `react`, `react-dom`, `@apollo/client` and `graphql`. Development/preview port 3001.

**Interpretation:** Auth-app configured as remote offering application to host.

### 5. client/community-app/vite.config.js:1-33

**Observation:** `federation` declares `name: 'communityApp'` and `filename: 'remoteEntry.js'`, exposing `./App`, sharing same libraries. Ports 3002.

**Interpretation:** Community-app configured as remote offering application to host.

### 6. client/shell-app/vite.config.js:1-33

**Observation:** `federation` declares `name: 'shellApp'`, remotes `authApp` and `communityApp` at `http://localhost:3001` and `3002/assets/remoteEntry.js`, sharing same libraries.

**Interpretation:** Host configuration declares two remotes/development locations.

### 7. client/shell-app/src/App.jsx:5

**Observation:** Lazily imports `authApp/App`.

**Interpretation:** Shell imports auth-app-exposed application by name.

### 8. client/shell-app/src/App.jsx:6

**Observation:** Lazily imports `communityApp/App`.

**Interpretation:** Shell imports community-app-exposed application by name.

### 9. client/auth-app/src/subcomponents/Login.jsx:37-38

**Observation:** `window.dispatchEvent(new CustomEvent('loginSuccess', { detail: { isLoggedIn: true } }))`. Following line reloads page to `/`.

**Interpretation:** Auth-app announces login to `window` listeners.

### 10. client/shell-app/src/App.jsx:23-28, 34-35

**Observation:** Shell registers `loginSuccess` listener updating `isLoggedIn` from `event.detail`, removing on cleanup.

**Interpretation:** Shell receives other-unit login notification.

### 11. client/shell-app/src/App.jsx:43-47

**Observation:** `Routes` links `/` to redirect, `/login` to `AuthApp`, `/community` to `CommunityApp`.

**Interpretation:** Host routing declares remote placement.

### 12. client/shell-app/src/App.jsx:45; client/shell-app/src/App.jsx:5

**Observation:** `<Route path="/login" element={<AuthApp />} />`.

**Interpretation:** Route links `/login` to auth-app remote application.

### 13. client/shell-app/src/App.jsx:46; client/shell-app/src/App.jsx:6

**Observation:** `<Route path="/community" element={<CommunityApp />} />`.

**Interpretation:** Route links `/community` to community-app remote application.

### 14. client; client/package.json:1-16

**Observation:** Manifest starting three applications together through `concurrently`, without UI entry/build.

**Interpretation:** Coordination folder rather than unit.

### 15. client/auth-app; client/auth-app/package.json:1-12; client/auth-app/index.html:10-11; client/auth-app/src/main.jsx:7-11; client/auth-app/vite.config.js:21-26

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary.

### 16. client/community-app; client/community-app/package.json:1-12; client/community-app/index.html:10-11; client/community-app/src/main.jsx:6-10; client/community-app/vite.config.js:21-26

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary.

### 17. client/shell-app; client/shell-app/package.json:1-12; client/shell-app/index.html:10-11; client/shell-app/src/main.jsx:16-24; client/shell-app/vite.config.js:18-23

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary.

### 18. server; server/package.json:1-20; server/gateway.js:85-108

**Observation:** GraphQL microservices/HTTP gateway without UI.

**Interpretation:** Backend in same repository rather than frontend unit.

### 19. client/shell-app/src/App.jsx:5, 43, 45; client/shell-app/vite.config.js:9-12; client/auth-app/vite.config.js:9-14

**Observation:** Shell imports `authApp/App`, rendering at `/login`. Name/module match auth-app configuration.

**Interpretation:** Active host → remote relationship.

### 20. client/shell-app/src/App.jsx:6, 43, 46; client/shell-app/vite.config.js:9-11, 13; client/community-app/vite.config.js:9-14

**Observation:** Shell imports `communityApp/App`, rendering at `/community`. Name/module match community-app configuration.

**Interpretation:** Active host → remote relationship.

### 21. client/auth-app/src/subcomponents/Login.jsx:37; client/shell-app/src/App.jsx:28

**Observation:** Auth-app emits `loginSuccess`, shell listening. No reverse-direction sending.

**Interpretation:** Active auth-app → shell communication relationship.

### 22. client/auth-app/vite.config.js:21-26, 30-31; client/auth-app/package.json:8, 10-11

**Observation:** Own configuration/`vite build`. Script `deploy` only runs `build` and local `preview` on port 3001.

**Interpretation:** Own build boundary without observed deployment.

### 23. client/community-app/vite.config.js:21-26, 30-31; client/community-app/package.json:8, 10-11

**Observation:** Own configuration/`vite build`. Script `deploy` only runs `build` and local `preview` on port 3002.

**Interpretation:** Own build boundary without observed deployment.

### 24. client/shell-app/vite.config.js:18-23; client/shell-app/package.json:8

**Observation:** Own configuration/`vite build`, running only through development server.

**Interpretation:** Own build boundary without observed deployment.

### 25. server/gateway.js:12

**Observation:** "Microfrontends: shell 3000, auth-app 3001, community-app 3002".

**Interpretation:** Names three applications as micro-frontends accepted as gateway origins. Claim corroborated.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (client/auth-app/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (client/community-app/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (client/shell-app/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (client/auth-app/package.json:15, Evidence); 3.4.3 (client/auth-app, Markers and Build); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #19 |
| 5 | 3.4.2 (client/community-app/package.json:15, Evidence); 3.4.3 (client/community-app, Markers and Build); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #16; configures #20 |
| 6 | 3.4.2 (client/shell-app/package.json:14, Evidence); 3.4.3 (client/shell-app, Markers and Build); 3.4.5 #1, #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #17; configures #19; configures #20 |
| 7 | 3.4.4 (client/shell-app/src/App.jsx:5) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 8 | 3.4.4 (client/shell-app/src/App.jsx:6) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 9 | 3.4.4 (client/auth-app/src/subcomponents/Login.jsx:37) | 3 code | source code | events | technological | moderate | implements #21 |
| 10 | 3.4.4 (client/shell-app/src/App.jsx:28) | 3 code | source code | events | technological | moderate | implements #21 |
| 11 | 3.4.4 (client/shell-app/src/App.jsx:43) | 3 code | source code | module-federation | architectural | strong | implements #19; implements #20 |
| 12 | 3.4.4 (client/shell-app/src/App.jsx:45) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 13 | 3.4.4 (client/shell-app/src/App.jsx:46) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 14 | 3.4.3 (client) | 4 structure | directory | — | context | weak | — |
| 15 | 3.4.3 (client/auth-app) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (client/community-app) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (client/shell-app) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (server) | 4 structure | directory | — | context | weak | — |
| 19 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #17; links #15 |
| 20 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #17; links #16 |
| 21 | 3.4.5 #3 | 5 composition | source code | events | architectural | strong | links #15; links #17 |
| 22 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #15 |
| 23 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #16 |
| 24 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #17 |
| 25 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #15; corroborates #16; corroborates #17; corroborates server/gateway.js:13-17 |

## Summary

Observations: 25. Dimensions (technology: 3, configuration: 3, code: 7, structure: 5, composition: 3, build-deploy: 3, documentation: 1, history: 0). Strength (strong: 9, moderate: 10, weak: 6, ambiguous: 0). Evidence (technological: 7, architectural: 16, context: 2).

