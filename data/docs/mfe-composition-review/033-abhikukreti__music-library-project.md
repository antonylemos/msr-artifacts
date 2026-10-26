---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 033 — abhikukreti/music-library-project

## Repository overview

An example with two React/Vite applications joined by Module Federation (`@originjs/vite-plugin-federation`): `main-app` is the host and `music-library` is the remote, exposing the `MusicLibrary` component (music-library/vite.config.js:8-13). The host loads the component with `React.lazy` and displays it only after login, passing the user's role as the `isAdmin` prop (main-app/src/App.jsx:5-22). Access control is split: the host decides whether the user enters (login) and their role; the remote uses `isAdmin` to decide whether to show the song addition form and deletion buttons (music-library/src/MusicLibrary.jsx:41, 84, 95).

Distinctive feature: the host points to a published Netlify deployment, rather than localhost (main-app/vite.config.js:11). The snapshot contains the remote's source, but running composition depends on the hosted artifact, which may have diverged from it. The remote also runs independently and uses MSW to simulate the API (music-library/src/main.jsx:10).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | main-app | music-library | host → remote | source → target | module-federation | Yes | Yes | main-app/vite.config.js:8-12 (remote `music_library` at `https://astonishing-seahorse-d2decf.netlify.app/assets/remoteEntry.js`); music-library/vite.config.js:8-13 (`name: 'music_library'`, `filename: 'remoteEntry.js'`, exposes `./MusicLibrary`) | main-app/src/App.jsx:5; main-app/src/App.jsx:22 |

## Observations

**1. main-app → music-library.** The name `music_library` and module `./MusicLibrary` imported by the host match music-library/vite.config.js:9-12, so the target is the snapshot unit, even with the URL pointing to Netlify. See the overview on the distinction between the source and published artifact.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

