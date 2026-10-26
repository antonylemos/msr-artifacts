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

Course group project with three React/Vite applications in `client/` (shell-app as host, user-app and issue-app as Module Federation remotes) and Node microservices in `server/microservices/`. No root `package.json` or workspace: each application has its own manifest, with own `vite build` (client/shell-app/package.json:8; client/user-app/package.json:8; client/issue-app/package.json:8), and is installed and run from its directory. No script triggers all three builds together.

The snapshot has no Dockerfile, compose, CI workflow or hosting configuration, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. Existing configuration is for local development: scripts `dev` and `preview` fix ports 3000, 3001 and 3002 (client/shell-app/package.json:7, 10; client/user-app/package.json:7, 10; client/issue-app/package.json:7, 10), and shell points remotes to `http://localhost:3001` and `http://localhost:3002` (client/shell-app/vite.config.js:39-42). Scripts named `deploy` in user-app and issue-app only run `npm run build && npm run preview` (client/user-app/package.json:11; client/issue-app/package.json:11), building and serving locally with `vite preview`; shell has no such script. README describes same execution in six terminals, with services started through `node` and shell in `npm run dev` while user-app and issue-app run `npm run preview` (README.md:121-132, 138-148), and instructs opening `http://localhost:3000` (README.md:152).

On backend side, `server/package.json:1-13` is an empty manifest without dependencies or execution script, and each microservice has only local scripts, `dev` with `nodemon` and `start` with `node` (for example server/microservices/auth-service/package.json:6-7). None of this packages or publishes frontend applications.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | client/issue-app | separate | not observed | `http://localhost:3002`, in local `dev` and `preview` (client/issue-app/package.json:7, 10; client/issue-app/vite.config.js:7-9) | No | client/issue-app/vite.config.js:14-34 (own federation and build configuration); client/issue-app/package.json:8 (`vite build`); client/issue-app/package.json:11 (`deploy` = build + local preview) |
| 2 | client/shell-app | separate | not observed | `http://localhost:3000`, in local `dev` and `preview` (client/shell-app/package.json:7, 10; client/shell-app/vite.config.js:53-55) | No | client/shell-app/vite.config.js:32-56 (own configuration); client/shell-app/package.json:8 (`vite build`) |
| 3 | client/user-app | separate | not observed | `http://localhost:3001`, in local `dev` and `preview` (client/user-app/package.json:7, 10) | No | client/user-app/vite.config.js:7-26 (own federation and build configuration); client/user-app/package.json:8 (`vite build`); client/user-app/package.json:11 (`deploy` = build + local preview) |

## Observations

**1. client/issue-app.** Own build with `vite build` (client/issue-app/package.json:8), generating `remoteEntry.js` for remote `issueApp` from own directory federation configuration (client/issue-app/vite.config.js:14-19), with `build` adjusted for federation (`modulePreload: false`, `target: 'esnext'`, client/issue-app/vite.config.js:29-34). Script `deploy` (client/issue-app/package.json:11) publishes nothing: chains build and `vite preview` on port 3002 (client/issue-app/package.json:10), the port shell expects (client/shell-app/vite.config.js:41). Deploy `not observed`. The `version: "0.0.0"` (client/issue-app/package.json:4) is unused in publication, and package is `private` (client/issue-app/package.json:3).

**2. client/shell-app.** Own build with `vite build` (client/shell-app/package.json:8) and active configuration at client/shell-app/vite.config.js:32-56; lines 1-26 of same file are an earlier fully commented version. Remote addresses are fixed at `localhost` (client/shell-app/vite.config.js:40-41), without environment variable or `base`, tying build to local environment. No script `deploy`, and README runs it in mode `dev` (README.md:138-140). Deploy `not observed`; `version: "0.0.0"` (client/shell-app/package.json:4) is unused in publication.

**3. client/user-app.** Same arrangement as issue-app: own build (client/user-app/package.json:8) with federation of remote `userApp` (client/user-app/vite.config.js:10-17) and same `build` block (client/user-app/vite.config.js:20-25). Unlike issue-app, `vite.config.js` fixes no port; 3001 expected by shell (client/shell-app/vite.config.js:40) comes only from scripts `dev` and `preview` (client/user-app/package.json:7, 10). The `deploy` (client/user-app/package.json:11) is build + local preview. Deploy `not observed`; version `0.0.0` (client/user-app/package.json:4) unused in publication.

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
