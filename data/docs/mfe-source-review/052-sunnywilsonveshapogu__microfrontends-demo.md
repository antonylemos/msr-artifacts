---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | shell/src/App.js:5 | shell | dynamic-loading | Yes | Requests headerMf/Header at shell/src/App.js:3-9; Header is rendered at shell/src/App.js:24-26 and App is connected to the entry at shell/src/bootstrap.js:3-6. |
| src-remote-import | shell/src/App.js:13 | shell | dynamic-loading | Yes | Requests productsMf/Products at shell/src/App.js:11-17; Products is rendered at shell/src/App.js:32-34 and App is connected to the entry at shell/src/bootstrap.js:3-6. |
| src-async-bootstrap | header-mf/src/index.js:1 | header-mf | dynamic-loading | No | header-mf/src/index.js:1 loads the unit’s own bootstrap. |
| src-async-bootstrap | products-mf/src/index.js:1 | products-mf | dynamic-loading | No | products-mf/src/index.js:1 loads the unit’s own bootstrap. |
| src-async-bootstrap | shell/src/index.js:1 | shell | dynamic-loading | No | shell/src/index.js:1 loads the shell’s local bootstrap. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/App.js:25 | shell | runtime-composition | Yes | Renders the Header component from another unit inside Suspense (shell/src/App.js:24-26); loaded through the remote import at shell/src/App.js:5. |
| manual | shell/src/App.js:33 | shell | runtime-composition | Yes | Renders the Products component from another unit inside Suspense (shell/src/App.js:32-34); loaded through the remote import at shell/src/App.js:13. |

## Summary

Constructs participating in composition: 4 (dynamic-loading: 2, runtime-composition: 2).

## Notes

- The structural review marks all three units Undetermined because their HTML templates are missing. They remain the units of this stage’s rows; the code chain shell/src/index.js:1 → shell/src/bootstrap.js:3-6 → shell/src/App.js:3-34 is present and connected to the build configuration, without commented code or orphan files.
- The Yes answers describe observable composition constructs referenced by the entry code; they do not confirm snapshot executability. shell/webpack.config.js:40 references a missing template, as do the remotes, according to the structural review.
- The fallbacks at shell/src/App.js:5-7 and shell/src/App.js:13-15 show import failure handling; they do not constitute new units or another remote load. No event-based communication between units was found in the searches.
- Under the criteria for constructs outside mining (method step 4), exports of the exposed components remain outside the table: header-mf/src/Header.js:38 and products-mf/src/Products.js:70 (exposure at header-mf/webpack.config.js:25-26 and products-mf/webpack.config.js:25-26).
