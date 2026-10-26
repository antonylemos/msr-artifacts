---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
inputs:
  clone: data/samples/mfe-sample-001/repos/riponcc__Group4COMP308Project
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Repository overview

History up to snapshot has 8 commits, from 2025-11-26 to 2025-12-10, with one merge, snapshot commit itself, `59db8c8` (2025-12-10, "Merge pull request #1 from riponcc/ahmadsbranch"), joining `f94a6e6` and `0df228d`. First commit, `934af61` (2025-11-26, "Initial project commit having backend auth-microservice"), creates only backend: `server/package.json`, `server/.gitignore`, auth-service and issue-management-service `package.json`. Three frontend applications are introduced one per commit: user-app in `9983a55` (2025-11-28, "Created frontend user-app"), shell in `94eaf5d` (2025-11-29, "Added shell app to handle microservices") and issue-app in `8c2b4f9` (2025-12-07, "Added backend and fronend for issue microservices"), changing `client/shell-app/vite.config.js`, `client/shell-app/src/App.jsx`, `client/shell-app/src/main.jsx` and `client/user-app/src/UserComponent.jsx` and creating issue-management-service code in same commit. Afterward, `f94a6e6` (2025-12-09, "Added AI chatboat") and `0df228d` (2025-12-10, "Update project files and add new features") change issue-app, `client/user-app/src/App.jsx` and backend services, and `0df228d` creates `README.md`; neither changes shell files.

Clone retains version contents from `8c2b4f9` onward for queried files; versions at `94eaf5d`, `9983a55` and `934af61` of read code files are unavailable (only `server/package.json` at `934af61` could be read).

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `client/shell-app/vite.config.js:1-26` retains entirely commented-out federation configuration, with only remote `userApp`, above active configuration with `userApp` and `issueApp` | 3.4.2 (Notes; client/shell-app/vite.config.js:1-26); 3.4.5 (Overview); 3.4.6 #2 | conflicting stages | 94eaf5d 2025-11-29 Added shell app to handle microservices; 8c2b4f9 2025-12-07 Added backend and fronend for issue microservices | clarified |
| 2 | Shell comments say it queries user at a "Gateway", but address belongs to auth-service, and snapshot has no gateway, only signs of one at port 4000 | 3.4.7 #6 | conflicting stages | 934af61 2025-11-26 Initial project commit having backend auth-microservice; 94eaf5d 2025-11-29 Added shell app to handle microservices; 8c2b4f9 2025-12-07 Added backend and fronend for issue microservices; 0df228d 2025-12-10 Update project files and add new features | clarified |

## Observations

**1. Commented-out configuration in shell `vite.config.js`.** File is introduced in `94eaf5d`, when user-app already existed and issue-app did not yet (created only in `8c2b4f9`). Contents of first version are absent from clone (`show` failed with missing object), so whether commented-out block is literally that version cannot be confirmed. Version at `8c2b4f9`, commit creating `client/issue-app/`, already has both parts: commented-out block with only `userApp` in remotes and active configuration with `userApp` and `issueApp`, latter with comment "Added Issue App" on new remote line. File does not change afterward up to snapshot. Conclusion limited to this file: commented-out block and active configuration belong to different stages; block corresponds to period when shell had only user-app as remote, and was commented out in same commit adding issue-app. It is not an alternative configuration in use.

**2. "Gateway" in shell.** None of 8 commits creates a gateway file: created paths in `server/` belong only to auth-service, issue-management-service and analytics-ai-service, and `index.js` that `server/package.json` declares as `main` since `934af61` is never created. In first readable shell version, at `8c2b4f9`, comment "// Gateway" already accompanies address `http://localhost:4001/graphql` at `client/shell-app/src/main.jsx:14`, and "Check logged-in user from Gateway" already exists at `client/shell-app/src/App.jsx:13`, both matching snapshot; versions at `94eaf5d` are absent from clone, so whether shell previously pointed to another port cannot be known. Port 4000 signals also already exist in pre-snapshot versions: auth-service version at `8c2b4f9` has origin `http://localhost:4000` in CORS and schema mounted as subgraph, in both commented-out block and active code (lines 44 and 58, 160 and 174), and version at `0df228d` of `client/user-app/src/App.jsx` has Apollo Client commented "for the gateway" at `http://localhost:4000/graphql` (lines 17-19), alongside active one at 4001. Auth-service version at `934af61` and user-app version at `9983a55` are absent from clone. Conclusion limited to queried files: no gateway was versioned in repository up to snapshot, and shell points to port 4001 labeled "Gateway" since first readable version; claim is not a remnant of a gateway that existed in repository. History does not show whether gateway at port 4000 was planned, ran outside repository or was abandoned.

## Commands

```
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project rev-list --count 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project rev-list --count --merges 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project log --format='%h %ad %s' --date=short --name-status --no-renames 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project log --format='%h %p %ad %s' --date=short 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 94eaf5d:client/shell-app/vite.config.js    # failed: missing object
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:client/shell-app/vite.config.js
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 94eaf5d:client/shell-app/src/main.jsx    # failed: missing object
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:client/shell-app/src/main.jsx
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 94eaf5d:client/shell-app/src/App.jsx    # failed: missing object
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:client/shell-app/src/App.jsx
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 9983a55:client/user-app/src/App.jsx    # failed: missing object
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 934af61:server/microservices/auth-service/auth-microservice.js    # failed: missing object
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 934af61:server/package.json
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:server/microservices/auth-service/auth-microservice.js
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 0df228d:client/user-app/src/App.jsx
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project ls-tree -r 94eaf5d client/shell-app/vite.config.js client/shell-app/src/main.jsx client/shell-app/src/App.jsx    # rejected by script (path taken as revision); no result
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project ls-tree -r 8c2b4f9 client/shell-app/vite.config.js client/shell-app/src/main.jsx client/shell-app/src/App.jsx    # rejected by script (path taken as revision); no result
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project ls-tree -r 59db8c8172c1e0efde31fe32c5135226a41cd044 client/shell-app/vite.config.js client/shell-app/src/main.jsx client/shell-app/src/App.jsx    # rejected by script (path taken as revision); no result
```

## Summary

Commits up to the snapshot: 8 (2025-11-26 to 2025-12-10). Points: 2 (clarified: 2, inconclusive: 0, resolved by the snapshot: 0).
