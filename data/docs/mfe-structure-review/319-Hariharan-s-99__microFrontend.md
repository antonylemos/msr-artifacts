---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 319 — Hariharan-s-99/microFrontend

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| advancedWebpack | advancedWebpack/package.json;advancedWebpack/webpack.config.js | advancedWebpack/package.json:1-37 (own manifest, `name` `webpack`) | advancedWebpack/webpack.config.js:5 (`entry: "./src/index.tsx"`); advancedWebpack/src/index.tsx:14-19 (`ReactDOM.render` at `#root`); advancedWebpack/webpack.config.js:116 (template `./public/index.html`) | advancedWebpack/webpack.config.js:4-124 (own webpack configuration, port 3001 at :121); advancedWebpack/package.json:8 (`webpack --mode production`) | — | — | Yes | React app with its own entry and webpack build, independent of the others. |
| container | container/index.html;container/module-federation.config.ts;container/package.json;container/rspack.config.ts | container/package.json:1-35 (own manifest, `name` `container`) | container/rspack.config.ts:17-19 (`entry.main: "./src/index.ts"`); container/src/index.ts:1 (`import("./App")`); container/src/App.tsx:24-27 (`createRoot` at `#container` and `render`); container/rspack.config.ts:92 (template `./index.html`) | container/rspack.config.ts:15-105 (own Rspack configuration, port 8080 at :25); container/package.json:5 (`rspack build`) | — | — | Yes | React host with its own UI entry and Rspack build. |
| home | home/index.html;home/module-federation.config.ts;home/package.json;home/rspack.config.ts | home/package.json:1-35 (own manifest, `name` `home`) | home/rspack.config.ts:17-19 (`entry.main: "./src/index.ts"`); home/src/index.ts:1 (`import("./bootstrap")`); home/src/bootstrap.tsx:6-10 (`mount` renders the UI in the received element); home/rspack.config.ts:92 (template `./index.html`) | home/rspack.config.ts:15-105 (own Rspack configuration, port 8081 at :25); home/package.json:5 (`rspack build`) | — | — | Yes | React remote with its own UI-mounting entry and Rspack build. |
| settings | settings/index.html;settings/module-federation.config.ts;settings/package.json;settings/rspack.config.ts | settings/package.json:1-34 (own manifest, `name` `settings`) | settings/rspack.config.ts:16-18 (`entry.main: "./src/index.ts"`); settings/src/index.ts:1 (`import("./bootstrap")`); settings/src/bootstrap.tsx:6-10 (`mount` renders the UI in the received element); settings/rspack.config.ts:91 (template `./index.html`) | settings/rspack.config.ts:14-104 (own Rspack configuration, port 8082 at :24); settings/package.json:5 (`rspack build`) | — | — | Yes | React remote with its own UI-mounting entry and Rspack build. |

## Summary

Frontend applications in the snapshot: 4 (advancedWebpack, container, home, settings).

## Notes

- The classification records `frontend_units: 3` (`container`, `home`, `settings`). The difference is `advancedWebpack/`, an independent React + webpack app with no federation or connection to the others, which is an application boundary but does not participate in composition.
- In the remotes, `src/bootstrap.tsx` only exports `mount` and does not call it; served on their own, `home/index.html:11` (`#home`) and `settings/index.html:11` (`#settings`) remain empty. The UI is mounted when the host calls `mount` (container/src/Home.tsx:8, container/src/Settings.tsx:7). This does not change the answer: the entry leads to the `mount` that starts the UI, and the build is its own.
- There is no `package.json` at the root. The `ws-path-alias` occurrences in `matches.csv` are `paths` in each package’s `tsconfig.json`, not a workspace declaration. No `ops-*` or `ci-*` occurrence and no Dockerfile, workflow or hosting configuration in the snapshot.
