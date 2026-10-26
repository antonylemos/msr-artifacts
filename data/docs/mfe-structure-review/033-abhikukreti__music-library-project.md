---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 033 — abhikukreti/music-library-project

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| main-app | main-app/index.html;main-app/package.json;main-app/vite.config.js | main-app/package.json:1-11 (own manifest) | main-app/index.html:10-11 (main.jsx entry); main-app/src/main.jsx:10-18 (mounts React) | main-app/vite.config.js:5-20 (own configuration); main-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| music-library | music-library/index.html;music-library/package.json;music-library/vite.config.js | music-library/package.json:1-11 (own manifest) | music-library/index.html:10-11 (main.jsx entry); music-library/src/main.jsx:9-22 (starts and mounts React) | music-library/vite.config.js:5-21 (own configuration); music-library/package.json:8 (`vite build`) | — | music-library/public/_headers:1-2 (hosting headers for this application’s assets) | Yes | React application with its own standalone entry and Vite build. |

## Summary

Frontend applications in the snapshot: 2 (main-app, music-library).

## Notes

- README.md:6-7 and README.md:29-35 describe two Netlify sites and their build directories. The snapshot contains no hosting configuration for main-app; its Deploy cell remains —. For music-library there is a _headers file, with no publishing workflow.
