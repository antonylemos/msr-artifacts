---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
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

# 232 — riponcc/Group4COMP308Project

## Repository overview

Project documentation is English root README.md. Presents course "Municipal Issue
Management System" (COMP308, Centennial College; README.md:259, 271), three backend microservices/three Module Federation frontend applications: shell host, user/issue modules (README.md:3, 19-27). Other three `documentation` files in `artifacts.csv`, client/shell-app/README.md, client/user-app/README.md, client/issue-app/README.md, identical React + Vite template READMEs (client/shell-app/README.md:1-3), without project claims/rows.

Frontend claims match previous reviews: three React/Vite applications with `@originjs/vite-plugin-federation`, shell hosting `userApp`/`issueApp` remotes. Does not describe switching (login, `window` events), only code comments, rows #7 through #10. Sole discrepancy: comment calls shell-queried endpoint "Gateway", actually auth-service (#6).

Five `doc-*` occurrences (all `doc-integration-technology`) in table rows 1 through 3: README.md:3 and :12 row 1, README.md:25 and :234 row 2, README.md:41 row 3.

README exclusions: team roles (README.md:11-15), personal tasks including "DevOps: Service orchestration, environment configuration, deployment" (README.md:15), without unit deployment details; microservice ports/functions (README.md:19-22, 194-214, 233), backend only; frontend libraries (README.md:40-45), no collective-unit properties; application ports (README.md:25-27), infrastructure; security including "JWT-based authentication across all services"/"CORS configuration for frontend access" (README.md:218-222); feature/appearance/test/limitation/plan sections (README.md:154-190, 224-255). Installation/`.env`/run command blocks (README.md:63-66, 69-89, 97-115, 121-149) yield no rows. Instruct six processes/separate terminals, shell `npm run dev`, user-app/issue-app `npm run preview` (README.md:138-148), open `http://localhost:3000` (README.md:152); build and deployment overview already records.

Comments read in previously cited artifacts: three `vite.config.js`, three `package.json` files in `client/`, client/shell-app/src/App.jsx and main.jsx, client/user-app/src/App.jsx and UserComponent.jsx, client/issue-app/src/App.jsx, main.jsx and components/Header.jsx, server/package.json. `package.json` in `client/` lacks `description`, server/package.json empty (server/package.json:4). Non-architectural: filename comments (client/shell-app/vite.config.js:27; client/user-app/vite.config.js:2, wrong `user-app/src/vite.config.js` path; client/issue-app/vite.config.js:1; client/user-app/src/App.jsx:1; client/issue-app/src/App.jsx:2; client/issue-app/src/components/Header.jsx:1); port comments (client/shell-app/vite.config.js:24, inside commented old :1-26 configuration, :54; client/issue-app/vite.config.js:8); "Initial check from GraphQL" (client/shell-app/src/App.jsx:45), shell authentication detail; Apollo Client configuration (client/user-app/src/App.jsx:5, 17; client/issue-app/src/App.jsx:43); role-separated routes/components/menus within issue-app (client/issue-app/src/App.jsx:17-38, 63-151, 184; client/issue-app/src/components/Header.jsx:59-81), user-app mutations (client/user-app/src/UserComponent.jsx:8). Repeating comments in row 2/6 paragraphs.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "built with microservices architecture and React Module Federation" | composition | corroborated | 3.4.2 (three rows `@originjs/vite-plugin-federation`, Configured `Yes`); 3.4.5 #1-#2; 3.4.3 (three microservices in `server/microservices/`) |
| 2 | README.md:24-27 | "Shell App (Port 3000): Main Module Federation host / User App (Port 3001): Authentication module / Issue App (Port 3002): Issue management module" | structure | corroborated | 3.4.3 (client/shell-app, client/user-app and client/issue-app `Yes`); 3.4.5 #1-#2; client/shell-app/vite.config.js:36-42 |
| 3 | README.md:41 | "Vite (Module Federation)" (federation through Vite) | composition | corroborated | 3.4.2 (three rows `@originjs/vite-plugin-federation`); client/shell-app/vite.config.js:30, 36; client/user-app/vite.config.js:5, 10; client/issue-app/vite.config.js:4, 14 |
| 4 | client/issue-app/vite.config.js:15 | "Unique name for Issue Microfrontend" | composition | corroborated | 3.4.5 #2; client/issue-app/vite.config.js:15; client/shell-app/vite.config.js:37, 41; client/user-app/vite.config.js:11 |
| 5 | client/issue-app/vite.config.js:18 | "Expose main microfrontend entrypoint" | composition | corroborated | 3.4.5 #2; client/issue-app/vite.config.js:17-18; client/shell-app/src/App.jsx:11 |
| 6 | client/shell-app/src/App.jsx:13 | "Check logged-in user from Gateway" (shell queries user through gateway) | composition | contradicted | client/shell-app/src/main.jsx:13-15; server/microservices/auth-service/config/config.js:9; 3.4.3 (server and three microservices) |
| 7 | client/shell-app/src/App.jsx:30 | "Handle login from UserApp" | composition | corroborated | 3.4.4 (client/shell-app/src/App.jsx:42; client/user-app/src/UserComponent.jsx:56); 3.4.5 #4 |
| 8 | client/shell-app/src/App.jsx:36 | "Handle logout from other apps" | composition | corroborated | 3.4.4 (client/user-app/src/UserComponent.jsx:74; client/issue-app/src/components/Header.jsx:39); 3.4.5 #3-#4; client/shell-app/src/App.jsx:43 |
| 9 | client/shell-app/src/App.jsx:63 | "If not logged in → Show User Login App" | composition | corroborated | 3.4.4 (manual client/shell-app/src/App.jsx:64); 3.4.5 #1 |
| 10 | client/shell-app/src/App.jsx:66 | "After login → Show Issue Management App" | composition | corroborated | 3.4.4 (manual client/shell-app/src/App.jsx:67); 3.4.5 #2 |

## Observations

**1. README.md:3.** Opening says microservices/"React Module Federation". Three `client/` applications configure `@originjs/vite-plugin-federation` (3.4.2), shell loading user-app/issue-app through federation (3.4.5 #1-#2). Microservices backend-only: three `server/microservices/` services, structural review non-frontend. "Frontend Development: React Module Federation" (README.md:12) repeats as team role.

**2. README.md:24-27.** Lists three frontend applications/roles: shell Module Federation host, user-app authentication, issue-app issue management. Structural/composition reviews same: three units, shell declaring `userApp`/`issueApp` (client/shell-app/vite.config.js:39-42), user-app login/registration screen, issue-app issue management. Listed ports match scripts (3.4.6), without judgment weight. Repetitions: "3 Frontend
modules with Module Federation" (README.md:234), "Microfrontends" over shell remote imports with "login/register"/"issue reporter" roles (client/shell-app/src/App.jsx:9-11), "Added Issue App" next to `issueApp` (client/shell-app/vite.config.js:41).

**3. README.md:41.** Frontend stack places Module Federation parenthetically beside Vite. Federation through Vite plugin `@originjs/vite-plugin-federation`, imported/called per application (client/shell-app/vite.config.js:30, 36; client/user-app/vite.config.js:5, 10; client/issue-app/vite.config.js:4, 14). README omits plugin name, same dependency-review mechanism.

**4. client/issue-app/vite.config.js:15.** Comment says `issueApp` unique issue-app microfrontend name. Three distinct federation names (`shellApp`, `userApp`, `issueApp`; client/shell-app/vite.config.js:37; client/user-app/vite.config.js:11; client/issue-app/vite.config.js:15), shell uses exact `issueApp` in remote declaration/import (client/shell-app/vite.config.js:41; client/shell-app/src/App.jsx:11).

**5. client/issue-app/vite.config.js:18.** Comment says issue-app exposes main entry. Exposed `'./App': './src/App'` (client/issue-app/vite.config.js:17-18), shell imports/renders after login (client/shell-app/src/App.jsx:11, 67; 3.4.5 #2).

**6. client/shell-app/src/App.jsx:13.** Comment says shell checks logged-in user through gateway; "// Gateway" by shell Apollo address (client/shell-app/src/main.jsx:14) repeats. Address `http://localhost:4001/graphql` (client/shell-app/src/main.jsx:13-15), auth-service port (server/microservices/auth-service/config/config.js:9; README.md:20). No snapshot gateway: `server/` only empty manifest/three microservices (3.4.3). Indications of absent port-4000 gateway: commented user-app Apollo Client, "Set up Apollo Client for the gateway" (client/user-app/src/App.jsx:17-22), origin `http://localhost:4000` in auth-service CORS (server/microservices/auth-service/auth-microservice.js:160), subgraph schema (server/microservices/auth-service/auth-microservice.js:174). Active shell code queries auth-service directly, hence `contradicted`.

**7. client/shell-app/src/App.jsx:30.** Comment in `loginSuccess` handler, shell listening on `window` (client/shell-app/src/App.jsx:31-34, 42), user-app firing on successful login (client/user-app/src/UserComponent.jsx:56). Communication relationship 3.4.5 #4.

**8. client/shell-app/src/App.jsx:36.** Comment in `logout` handler (client/shell-app/src/App.jsx:37-40, 43). "other apps" both units: user-app fires `logout` on logout mutation (client/user-app/src/UserComponent.jsx:74), issue-app through header (client/issue-app/src/components/Header.jsx:39), relationships 3.4.5 #4 and #3.

**9. client/shell-app/src/App.jsx:63.** Without login shell renders `<UserApp />` (client/shell-app/src/App.jsx:64), user-app `./App` mounting login/registration form (client/user-app/src/App.jsx:31). Matches source-code manual row, relationship 3.4.5 #1.

**10. client/shell-app/src/App.jsx:66.** Logged in, shell renders `<IssueApp>`, passing user from query `CurrentUser` (client/shell-app/src/App.jsx:67), issue-app `./App`. Matches source-code manual row, relationship 3.4.5 #2.

## Summary

Claims: 10 (corroborated: 9, partial: 0, contradicted: 1, uncorroborated: 0). Themes: (structure: 1, composition: 9).
