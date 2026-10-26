---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 059 — Efraim0601/union-portal

## Workspace

angular.json:19-21 and angular.json:48-49 (shell); angular.json:146-147 and angular.json:174-175 (promote); angular.json:273-274 and angular.json:301-302 (diaspora).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-17 (workspace manifest) | — | — | — | — | No | Angular coordination root; the targets belong to the three applications in projects/, with no additional UI at the root. |
| projects/diaspora | projects/diaspora/federation.config.js | — | angular.json:332 (browser diaspora); projects/diaspora/src/main.ts:1-6 (loads bootstrap); projects/diaspora/src/bootstrap.ts:1-5 (starts the UI) | angular.json:305-317 (diaspora build target); angular.json:329-333 (esbuild target); Dockerfile:22 (`ng build diaspora`) | angular.json:273-274 and angular.json:301-302 (diaspora project) | Dockerfile:22 and Dockerfile:41 (own build and artifact directory within a joint image) | Yes | Angular project with its own entry and build target, without requiring a local manifest. |
| projects/promote | projects/promote/federation.config.js | — | angular.json:205 (browser promote); projects/promote/src/main.ts:1-6 (loads bootstrap); projects/promote/src/bootstrap.ts:1-5 (starts the UI) | angular.json:178-190 (promote build target); angular.json:202-206 (esbuild target); Dockerfile:21 (`ng build promote`) | angular.json:146-147 and angular.json:174-175 (promote project) | Dockerfile:21 and Dockerfile:40 (own build and artifact directory within a joint image) | Yes | Angular project with its own entry and build target, without requiring a local manifest. |
| projects/shell | projects/shell/federation.config.js | — | angular.json:79 (browser shell); projects/shell/src/main.ts:1-6 (loads bootstrap); projects/shell/src/bootstrap.ts:1-5 (starts the UI) | angular.json:52-64 (shell build target); angular.json:76-80 (esbuild target); Dockerfile:20 (`ng build shell`) | angular.json:20-21 and angular.json:48-49 (shell project) | Dockerfile:20 and Dockerfile:38 (own build and artifact directory within a joint image) | Yes | Angular project with its own entry and build target, without requiring a local manifest. |
| server/diaspora-otp | server/diaspora-otp/package.json | server/diaspora-otp/package.json:1-16 (server package) | server/diaspora-otp/package.json:8-9 (runs index.js); server/diaspora-otp/index.js:18 and server/diaspora-otp/index.js:528-530 (starts an Express server, no UI) | — | — | deploy/test/Dockerfile.otp:5-9 (backend image) | No | Express API/OTP server, with no frontend application entry. |

## Summary

Frontend applications in the snapshot: 3 (projects/diaspora, projects/promote, projects/shell).

## Notes

- Dockerfile:20-22 builds the applications separately and Dockerfile:38-41 keeps their artifacts in distinct directories. The image and deployment are joint; the Deploy column records the separation of artifacts, without asserting independent images.
- projects/auth and projects/design-system are libraries referenced by aliases in tsconfig.json:18-24; they are not in units.csv and were not added to the table.
