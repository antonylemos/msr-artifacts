---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Repository overview

The repository has no `.md` file, and `package.json` files have empty `description`. Its only documentation consists of comments in the `bootstrap.js` files of the `react-js` set. Marketing comments explain the course pattern: the application mounts itself when running independently in development and exports `mount` for container use. Container's `bootstrap.js` is a literal marketing copy (react-js/container/src/bootstrap.js:1-22): it looks for the same element `#_marketing-dev-root`, also used by container's `index.html` (react-js/container/public/index.html:5), and repeats comments that do not apply to its host role.

Artifacts cited by previous reviews were read:
- webpack configurations (`webpack.common.js`, `webpack.dev.js` and empty `webpack.prod.js` files in the `react-js` set, and `webpack.config.js` files in `simple-js`);
- `package.json` files;
- all five applications' `index.js` and `bootstrap.js` files;
- react-js/container/src/App.js and react-js/container/src/components/MarketingApp.js.

The `simple-js` set has no architecture comments.

No `doc-*` occurrences in mining.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | react-js/container/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (in development and isolation, container mounts itself) | independence | corroborated | react-js/container/src/bootstrap.js:12-17; react-js/container/public/index.html:5 |
| 2 | react-js/container/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (container would be loaded by another container) | composition | contradicted | 3.4.5 (no relationship targeting container); react-js/container/config/webpack.dev.js:19-25 (without `exposes`) |
| 3 | react-js/marketing/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (in development and isolation, marketing mounts itself) | independence | corroborated | 3.4.3 (marketing `Yes`); react-js/marketing/src/bootstrap.js:12-17; react-js/marketing/public/index.html:5 |
| 4 | react-js/marketing/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (marketing is loaded by container through `mount`) | composition | corroborated | 3.4.5 #1; react-js/marketing/config/webpack.dev.js:19-24; react-js/container/src/components/MarketingApp.js:3, 9 |

## Observations

**1. react-js/container/src/bootstrap.js:10-11.** In development, container mounts its own `App` in element `#_marketing-dev-root` of its `index.html`. The comment matches behavior, but the element name and "in isolation" come from copying marketing's file. Because only development configuration exists, this is container's only initialization path in the snapshot.

**2. react-js/container/src/bootstrap.js:20-21.** The comment says the application runs "through container" and therefore exports `mount`. Container is the host: its Module Federation configuration exposes nothing (react-js/container/config/webpack.dev.js:19-25), and the composition review recorded no unit loading it. `export { mount }` has no consumer, and the comment was copied from the remote without matching this unit's role.

**3. react-js/marketing/src/bootstrap.js:10-11.** Marketing mounts itself when it finds `#_marketing-dev-root`, present in its own `index.html`. This supports independent execution in the structural review.

**4. react-js/marketing/src/bootstrap.js:20-21.** Marketing exposes `./MarketingApp`, pointing to `bootstrap.js`, and container imports `mount` from `marketing/MarketingApp` and calls it on its own element. The relationship is in the composition review.

## Summary

Claims: 4 (corroborated: 3, partial: 0, contradicted: 1, uncorroborated: 0). Themes: (composition: 2, independence: 2).
