---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
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

# 232 — riponcc/Group4COMP308Project

## Repository overview

Three React/Vite applications have own entries/builds (#15–#17). Federation plugin declarations (#1–#3) realized in configurations: issue-app and user-app expose `./App` (#4, #6), while shell declares both remotes (#5). Imports name targets (#7, #8); host mounts them inside Suspense according to login (#13, #14). Host → remote relationships (#22, #23) complete chain between relatively independent units and runtime composition. Window event communication (#9–#12, #24, #25) drives switching: user-app reports login/logout, issue-app reports logout to shell.

Builds separate, but 3.4.6 observes neither deployment nor independent versioning (#26–#28). Scripts named deploy only chain build/local preview. Backend directories (#18–#21) explain microservice architecture alongside frontend without counting as frontend units. Documentary claims confirm technology, roles and flows (#29–#33, #35–#38), remaining weak evidence as semantic declarations. Claim that shell queries Gateway contradicted: active address auth-service (#34).

Two historical points clarified (#39, #40): old commented shell block not alternative configuration in use; no gateway versioned through snapshot. Unavailable initial versions limit past conclusions without leaving current composition ambiguous. Extraction uses only final reviews and checking their snapshot excerpts. Three active federation blocks selected; local ports, scripts and backend configuration declare no additional composition elements. Commented block remains in historical point #39.

## Observations

### 1. client/issue-app/package.json:15

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `dependencies`, version `^1.3.5`.

**Interpretation:** Module-federation technology declaration; 3.4.2 records Configured `Yes`, but declaration alone establishes no unit organization.

### 2. client/shell-app/package.json:14

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `dependencies`, version `^1.3.5`.

**Interpretation:** Module-federation technology declaration; 3.4.2 records Configured `Yes`, but declaration alone establishes no unit organization.

### 3. client/user-app/package.json:15

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `dependencies`, version `^1.4.1`.

**Interpretation:** Module-federation technology declaration; 3.4.2 records Configured `Yes`, but declaration alone establishes no unit organization.

### 4. client/issue-app/vite.config.js:14-26

**Observation:** Plugin `federation` receives `name: issueApp`, `filename: remoteEntry.js`, exposes `./App` as `./src/App`, sharing `react`, `react-dom`, `@apollo/client` and `graphql`.

**Interpretation:** Configures issue-app exposure/dependency sharing; block names no consumer.

### 5. client/shell-app/vite.config.js:36-50

**Observation:** Plugin names `shellApp`, declares `userApp` at `http://localhost:3001/assets/remoteEntry.js` and `issueApp` at `http://localhost:3002/assets/remoteEntry.js`, sharing React, ReactDOM, Apollo Client and GraphQL as singletons.

**Interpretation:** Host declares two distinct federation targets, linking shell to other units through remotes.

### 6. client/user-app/vite.config.js:10-17

**Observation:** Plugin names `userApp`, generates `remoteEntry.js`, exposes `./App` as `./src/App`, sharing `react`, `react-dom`, `@apollo/client` and `graphql`.

**Interpretation:** Configures user-app exposure as remote; consumer unnamed in block.

### 7. client/shell-app/src/App.jsx:10

**Observation:** Shell defines `UserApp` with `lazy(() => import("userApp/App"))`.

**Interpretation:** Import names remote userApp and its App module, loading authentication unit through federation.

### 8. client/shell-app/src/App.jsx:11

**Observation:** Shell defines `IssueApp` with `lazy(() => import("issueApp/App"))`.

**Interpretation:** Import names remote issueApp and its App module, loading issue management unit through federation.

### 9. client/issue-app/src/components/Header.jsx:32-39

**Observation:** Header logout handler executes mutation, clears token/user and dispatches `window.dispatchEvent(new CustomEvent("logout"))`.

**Interpretation:** Implements issue-app logout emission; call only emits global event without naming consuming unit.

### 10. client/shell-app/src/App.jsx:31-43; client/shell-app/src/App.jsx:51-52

**Observation:** Shell registers listeners `loginSuccess` and `logout`, whose handlers change isLoggedIn and refetch CurrentUser; removes listeners during effect cleanup.

**Interpretation:** Implements reception of events driving remote switching. Listener names no emitting unit.

### 11. client/user-app/src/UserComponent.jsx:50-58

**Observation:** After login user-app stores token/user in localStorage, emitting `loginSuccess` on window with `detail: { isLoggedIn: true }`.

**Interpretation:** Implements user-app login notification without identifying consumer in emission call.

### 12. client/user-app/src/UserComponent.jsx:70-76

**Observation:** After logout mutation user-app removes token/user, emitting `logout` on window with `detail: { isLoggedIn: false }`.

**Interpretation:** Implements user-app logout emission without naming receiving unit.

### 13. client/shell-app/src/App.jsx:61-69

**Observation:** Inside Suspense, shell renders `<UserApp />` when isLoggedIn false.

**Interpretation:** Remote authentication component mounting point, conditional on shell state; rendering alone uses already loaded component.

### 14. client/shell-app/src/App.jsx:61-69

**Observation:** Inside Suspense, shell renders `<IssueApp currentUser={data?.currentUser} />` when isLoggedIn true.

**Interpretation:** Remote issue-management component mounting point after login. Line records prop passing without demonstrating remote consumes it.

### 15. client/issue-app/; client/issue-app/package.json:1-12; client/issue-app/index.html:10-11; client/issue-app/src/main.jsx:6-10; client/issue-app/vite.config.js:6-35

**Observation:** Directory has own manifest, HTML entry at `/src/main.jsx`, React mounting and Vite configuration; script `build` calls `vite build`.

**Interpretation:** Confirms frontend unit boundary with own entry/build, as Frontend unit `Yes` in 3.4.3; alone establishes no link to others.

### 16. client/shell-app/; client/shell-app/package.json:1-12; client/shell-app/index.html:10-11; client/shell-app/src/main.jsx:27-33; client/shell-app/vite.config.js:32-56

**Observation:** Directory has own manifest, HTML entry at `/src/main.jsx`, React mounting and Vite configuration; script `build` calls `vite build`.

**Interpretation:** Confirms frontend unit boundary with own entry/build, as Frontend unit `Yes` in 3.4.3; alone establishes no link to others.

### 17. client/user-app/; client/user-app/package.json:1-12; client/user-app/index.html:10-11; client/user-app/src/main.jsx:6-10; client/user-app/vite.config.js:7-26

**Observation:** Directory has own manifest, HTML entry at `/src/main.jsx`, React mounting and Vite configuration; script `build` calls `vite build`.

**Interpretation:** Confirms frontend unit boundary with own entry/build, as Frontend unit `Yes` in 3.4.3; alone establishes no link to others.

### 18. server/; server/package.json:1-13

**Observation:** Server directory contains dependency-free manifest declaring main as index.js; review records absent entry and no build.

**Interpretation:** Backend directory without UI entry/frontend build; Frontend unit `No` in 3.4.3.

### 19. server/microservices/analytics-ai-service/; server/microservices/analytics-ai-service/package.json:1-8; server/microservices/analytics-ai-service/analytics-ai-microservice.js:40

**Observation:** Node package has start script executing `analytics-ai-microservice.js` and server entry with `app.listen`.

**Interpretation:** Backend service without UI, marked Frontend unit `No`; microservice separation does not constitute frontend unit separation.

### 20. server/microservices/auth-service/; server/microservices/auth-service/package.json:1-8; server/microservices/auth-service/auth-microservice.js:244

**Observation:** Node package has start script executing `auth-microservice.js` and server entry with `app.listen`.

**Interpretation:** Backend service without UI, marked Frontend unit `No`; microservice separation does not constitute frontend unit separation.

### 21. server/microservices/issue-management-service/; server/microservices/issue-management-service/package.json:1-8; server/microservices/issue-management-service/issue-microservice.js:147

**Observation:** Node package has start script executing `issue-microservice.js` and server entry with `httpServer.listen`.

**Interpretation:** Backend service without UI, marked Frontend unit `No`; microservice separation does not constitute frontend unit separation.

### 22. client/shell-app/src/App.jsx:10; client/shell-app/src/App.jsx:61-64; client/shell-app/vite.config.js:39-40; client/user-app/vite.config.js:11-15

**Observation:** Shell imports userApp/App, rendering it without login; configuration resolves userApp to remoteEntry.js, and user-app exposes ./App.

**Interpretation:** Explicitly links shell to user-app through Module Federation; relationship In snapshot `Yes` and Active `Yes`.

### 23. client/shell-app/src/App.jsx:11; client/shell-app/src/App.jsx:66-67; client/shell-app/vite.config.js:39-41; client/issue-app/vite.config.js:15-19

**Observation:** Shell imports issueApp/App, rendering it after login; configuration resolves issueApp to remoteEntry.js, and issue-app exposes ./App.

**Interpretation:** Explicitly links shell to issue-app through Module Federation; relationship In snapshot `Yes` and Active `Yes`.

### 24. client/issue-app/src/components/Header.jsx:32-39; client/shell-app/src/App.jsx:37-43

**Observation:** Issue-app emits logout through header; shell listens for logout on window, sets isLoggedIn false and refetches CurrentUser.

**Interpretation:** Establishes issue-app → shell event communication returning host to authentication screen. Relationship In snapshot `Yes` and Active `Yes`.

### 25. client/user-app/src/UserComponent.jsx:50-58; client/user-app/src/UserComponent.jsx:70-76; client/shell-app/src/App.jsx:31-43

**Observation:** User-app emits loginSuccess/logout on window; shell listens for both, changes isLoggedIn and refetches CurrentUser. Login handler does not use detail.

**Interpretation:** Establishes user-app → shell event communication driving remote switching. Relationship In snapshot `Yes` and Active `Yes`, without reverse sending.

### 26. client/issue-app/package.json:7-10; client/issue-app/vite.config.js:14-34; client/issue-app/package.json:11

**Observation:** Build script executes `vite build` with own configuration. Deploy script chains build/local preview.

**Interpretation:** Section 3.4.6 records Build `separate`, Deploy `not observed` and Versioning `No`: supports unit build autonomy without demonstrating publication or independent versioning.

### 27. client/shell-app/package.json:7-10; client/shell-app/vite.config.js:32-56

**Observation:** Build script executes `vite build` with own configuration. Local dev/preview, no deploy script.

**Interpretation:** Section 3.4.6 records Build `separate`, Deploy `not observed` and Versioning `No`: supports unit build autonomy without demonstrating publication or independent versioning.

### 28. client/user-app/package.json:7-10; client/user-app/vite.config.js:7-26; client/user-app/package.json:11

**Observation:** Build script executes `vite build` with own configuration. Deploy script chains build/local preview.

**Interpretation:** Section 3.4.6 records Build `separate`, Deploy `not observed` and Versioning `No`: supports unit build autonomy without demonstrating publication or independent versioning.

### 29. README.md:3

**Observation:** README claims application built with microservice architecture and React Module Federation.

**Interpretation:** Names federation technology without describing unit boundaries in sentence; 3.4.7 records claim corroborated.

### 30. README.md:24-27

**Observation:** README lists Shell App as Module Federation host, User App as authentication module and Issue App as issue-management module.

**Interpretation:** Describes organization of three units/roles; 3.4.7 records claim corroborated.

### 31. README.md:41

**Observation:** README lists Vite with Module Federation in frontend stack.

**Interpretation:** Technology claim corroborated in 3.4.7 by manifests and plugin calls.

### 32. client/issue-app/vite.config.js:15

**Observation:** Comment beside name calls issueApp unique Issue Microfrontend name.

**Interpretation:** Assigns identity to issue-app unit; 3.4.7 records corroboration through distinct names and host link.

### 33. client/issue-app/vite.config.js:18

**Observation:** Comment beside ./App says exposes main microfrontend entry point.

**Interpretation:** Describes exposed unit interface; 3.4.7 records corroboration in exposure configuration and shell consumption.

### 34. client/shell-app/src/App.jsx:13

**Observation:** Comment says shell checks logged-in user in Gateway.

**Interpretation:** Backend claim contradicted in 3.4.7: Apollo Client points to auth-service port 4001; no gateway in snapshot.

### 35. client/shell-app/src/App.jsx:30

**Observation:** Comment identifies handler as handling login from UserApp.

**Interpretation:** Describes login communication origin; 3.4.7 records corroboration in emitter, listener and inter-unit relationship.

### 36. client/shell-app/src/App.jsx:36

**Observation:** Comment identifies handler as handling logout from other applications.

**Interpretation:** Describes unit-to-host communication; 3.4.7 records corroboration in user-app/issue-app emitters and shell listener.

### 37. client/shell-app/src/App.jsx:63

**Observation:** Comment says user login application displayed without login.

**Interpretation:** Describes user-app composition condition; 3.4.7 records corroboration in mounting and host → remote relationship.

### 38. client/shell-app/src/App.jsx:66

**Observation:** Comment says issue-management application displayed after login.

**Interpretation:** Describes issue-app composition condition; 3.4.7 records corroboration in mounting and host → remote relationship.

### 39. 94eaf5d 2025-11-29 (client/shell-app/vite.config.js); 8c2b4f9 2025-12-07 (client/shell-app/vite.config.js)

**Observation:** Section 3.4.8 records shell file created in 94eaf5d, version unavailable. Readable 8c2b4f9 version introducing issue-app already contains commented block with only userApp and active block with two remotes; file unchanged afterward through snapshot.

**Interpretation:** Point clarified: commented block represents different stage, not alternative configuration in use. Unavailable first version prevents claiming literal identity with commented block; does not make snapshot active configuration ambiguous.

### 40. 934af61 2025-11-26 (server/package.json; server/microservices/auth-service/auth-microservice.js); 94eaf5d 2025-11-29 (client/shell-app/src/App.jsx; client/shell-app/src/main.jsx); 8c2b4f9 2025-12-07 (client/shell-app/src/App.jsx; client/shell-app/src/main.jsx; server/microservices/auth-service/auth-microservice.js); 0df228d 2025-12-10 (client/user-app/src/App.jsx)

**Observation:** Section 3.4.8 records none of eight commits through snapshot creates gateway or server/index.js. In first readable shell version, 8c2b4f9, Gateway comments already accompany address at 4001; 4000 signals also predate snapshot. Initial code versions cited in review unavailable.

**Interpretation:** Point clarified: Gateway label not remnant of gateway versioned in repository. Unknown whether service at 4000 planned, external or abandoned; past gap does not alter active snapshot endpoint.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (client/issue-app/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (client/shell-app/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (client/user-app/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (Evidence, client/issue-app/package.json:15); 3.4.3 (client/issue-app, Markers and Build); 3.4.4 (client/shell-app/src/App.jsx:11, Observation); 3.4.5 #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #3 (Evidence), #4, #5 (Document and Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #23 |
| 5 | 3.4.2 (Evidence, client/shell-app/package.json:14); 3.4.3 (client/shell-app, Markers and Build); 3.4.4 (client/shell-app/src/App.jsx:10, :11, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #2, #3, #4 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #16; configures #22; configures #23 |
| 6 | 3.4.2 (Evidence, client/user-app/package.json:15); 3.4.3 (client/user-app, Markers and Build); 3.4.4 (client/shell-app/src/App.jsx:10, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #3, #4 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #22 |
| 7 | 3.4.4 (client/shell-app/src/App.jsx:10) | 3 code | source code | module-federation | architectural | strong | implements #22 |
| 8 | 3.4.4 (client/shell-app/src/App.jsx:11) | 3 code | source code | module-federation | architectural | strong | implements #23 |
| 9 | 3.4.4 (client/issue-app/src/components/Header.jsx:39) | 3 code | source code | events | architectural | moderate | implements #24 |
| 10 | 3.4.4 (client/shell-app/src/App.jsx:42) | 3 code | source code | events | architectural | moderate | implements #25 |
| 11 | 3.4.4 (client/user-app/src/UserComponent.jsx:56) | 3 code | source code | events | architectural | moderate | implements #25 |
| 12 | 3.4.4 (client/user-app/src/UserComponent.jsx:74) | 3 code | source code | events | architectural | moderate | implements #25 |
| 13 | 3.4.4 (manual client/shell-app/src/App.jsx:64) | 3 code | source code | module-federation | architectural | moderate | implements #22 |
| 14 | 3.4.4 (manual client/shell-app/src/App.jsx:67) | 3 code | source code | module-federation | architectural | moderate | implements #23 |
| 15 | 3.4.3 (client/issue-app) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (client/shell-app) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (client/user-app) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (server) | 4 structure | directory | — | context | weak | — |
| 19 | 3.4.3 (server/microservices/analytics-ai-service) | 4 structure | directory | — | context | weak | — |
| 20 | 3.4.3 (server/microservices/auth-service) | 4 structure | directory | — | context | weak | — |
| 21 | 3.4.3 (server/microservices/issue-management-service) | 4 structure | directory | — | context | weak | — |
| 22 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #16; links #17 |
| 23 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #16; links #15 |
| 24 | 3.4.5 #3 | 5 composition | source code | events | architectural | strong | links #15; links #16 |
| 25 | 3.4.5 #4 | 5 composition | source code | events | architectural | strong | links #17; links #16 |
| 26 | 3.4.6 #1 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #15 |
| 27 | 3.4.6 #2 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #16 |
| 28 | 3.4.6 #3 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #17 |
| 29 | 3.4.7 #1 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #22; corroborates #23; corroborates #19; corroborates #20; corroborates #21 |
| 30 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #15; corroborates #16; corroborates #17; corroborates #22; corroborates #23; corroborates #5 |
| 31 | 3.4.7 #3 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #6 |
| 32 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #23; corroborates #4; corroborates #5; corroborates #6 |
| 33 | 3.4.7 #5 | 7 documentation | comment | module-federation | architectural | weak | corroborates #23; corroborates #4; corroborates #8 |
| 34 | 3.4.7 #6 | 7 documentation | comment | — | context | weak | contradicts client/shell-app/src/main.jsx:13-15; contradicts server/microservices/auth-service/config/config.js:9; contradicts #18; contradicts #19; contradicts #20; contradicts #21 |
| 35 | 3.4.7 #7 | 7 documentation | comment | — | architectural | weak | corroborates #10; corroborates #11; corroborates #25 |
| 36 | 3.4.7 #8 | 7 documentation | comment | — | architectural | weak | corroborates #9; corroborates #12; corroborates #24; corroborates #25; corroborates #10 |
| 37 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | corroborates #13; corroborates #22 |
| 38 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | corroborates #14; corroborates #23 |
| 39 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #5; explains #27 |
| 40 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #34 |

## Summary

Observations: 40. Dimensions (technology: 3, configuration: 3, code: 8, structure: 7, composition: 4, build-deploy: 3, documentation: 10, history: 2). Strength (strong: 7, moderate: 14, weak: 19, ambiguous: 0). Evidence (technological: 7, architectural: 27, context: 6).

