---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| react-js/auth | react-js/auth/package.json | react-js/auth/package.json:1-6 (manifest and test script only) | — | — | — | — | No | Manifest and lockfile only; there is no UI code, application entry or build in the snapshot. |
| react-js/container | react-js/container/package.json | react-js/container/package.json:1-6 (own package) | react-js/container/src/index.js:1 (conventional webpack entry); react-js/container/src/bootstrap.js:6-17 (mounts React); react-js/container/config/webpack.dev.js:16-17 (HTML template) | react-js/container/config/webpack.dev.js:7-29 (development configuration); react-js/container/package.json:5 (`webpack serve --config config/webpack.dev.js`) | — | — | Yes | React application with its own entry and development webpack compilation. |
| react-js/container/config | react-js/container/config/webpack.common.js;react-js/container/config/webpack.dev.js;react-js/container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the react-js/container build; it is not a separate application. |
| react-js/dashboard | react-js/dashboard/package.json | react-js/dashboard/package.json:1-6 (manifest and test script only) | — | — | — | — | No | Manifest and lockfile only; there is no UI code, application entry or build in the snapshot. |
| react-js/marketing | react-js/marketing/package.json | react-js/marketing/package.json:1-6 (own package) | react-js/marketing/src/index.js:1 (conventional webpack entry); react-js/marketing/src/bootstrap.js:6-17 (mounts React); react-js/marketing/config/webpack.dev.js:16-17 (HTML template) | react-js/marketing/config/webpack.dev.js:7-29 (development configuration); react-js/marketing/package.json:5 (`webpack serve --config config/webpack.dev.js`) | — | — | Yes | React application with its own entry and development webpack compilation. |
| react-js/marketing/config | react-js/marketing/config/webpack.common.js;react-js/marketing/config/webpack.dev.js;react-js/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the react-js/marketing build; it is not a separate application. |
| simple-js/Cart | simple-js/Cart/package.json;simple-js/Cart/webpack.config.js | simple-js/Cart/package.json:1-9 (own package) | simple-js/Cart/src/index.js:1 (conventional webpack entry); simple-js/Cart/src/bootstrap.js:1-7 (starts the UI) | simple-js/Cart/webpack.config.js:4-8 (own configuration); simple-js/Cart/package.json:7 (webpack server script) | — | — | Yes | JavaScript application with its own entry and compilation configuration. |
| simple-js/Container | simple-js/Container/package.json;simple-js/Container/webpack.config.js | simple-js/Container/package.json:1-9 (own package) | simple-js/Container/src/index.js:1 (conventional webpack entry); simple-js/Container/src/bootstrap.js:1-5 (starts the UI) | simple-js/Container/webpack.config.js:4-8 (own configuration); simple-js/Container/package.json:7 (webpack server script) | — | — | Yes | JavaScript application with its own entry and compilation configuration. |
| simple-js/Products | simple-js/Products/package.json;simple-js/Products/webpack.config.js | simple-js/Products/package.json:1-9 (own package) | simple-js/Products/src/index.js:1 (conventional webpack entry); simple-js/Products/src/bootstrap.js:1-7 (starts the UI) | simple-js/Products/webpack.config.js:4-8 (own configuration); simple-js/Products/package.json:8 (webpack server script) | — | — | Yes | JavaScript application with its own entry and compilation configuration. |

## Summary

Frontend applications in the snapshot: 5 (react-js/container, react-js/marketing, simple-js/Cart, simple-js/Container, simple-js/Products).

## Notes

- react-js/auth and react-js/dashboard contain only package.json and package-lock.json; UI dependencies do not demonstrate an implemented application.
- The webpack.prod.js configurations for container and marketing are empty. The Yes decisions for these units are supported by the development builds referenced in their start scripts, without asserting production executability.
- The config directories belong to the applications immediately above them; they do not inherit their entries or builds as their own characteristics.
