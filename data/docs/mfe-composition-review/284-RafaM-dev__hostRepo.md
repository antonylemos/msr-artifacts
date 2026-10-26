---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Repository overview

The repository contains only the React + Vite host of a Rick and Morty character explorer, made as a technical assessment. The snapshot has a single unit at the root. The host uses `@originjs/vite-plugin-federation` and declares a single remote, `mf-remoteDetails`, served at `http://localhost:5001/assets/remoteEntry.js` (vite.config.ts:8-15). This remote is absent from the snapshot. The host imports its component `DetailEpisode` (src/features/episodes_list/ListEpisodes.tsx:15), with the type declared in src/declare.d.ts:1-4, and renders it as a detail modal in the episode list (src/features/episodes_list/ListEpisodes.tsx:96-100). The list is route `/episodes` (src/App.tsx:11).

The host passes the remote component the selected character, boolean `open` and callback `onClose`, which clears the selection in the host (src/features/episodes_list/ListEpisodes.tsx:97-99). Those props and callback are the only exchange between units; there are no events, `postMessage` or shared service in `src/`, hence no `communication` relationship. The host also declares `name: "host"` with `filename: "remoteEntry.js"` (vite.config.ts:9-10), but has no `exposes`: nothing from it is offered to another unit. Only `react` and `react-dom` are shared (vite.config.ts:14).

The README describes another configuration: remote `remote_root` at `http://localhost:5174/assets/remoteEntry.js` (README.md:335-341, 346-347). The table follows the snapshot's `vite.config.ts`; the README generates no relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | mf-remoteDetails | host → remote | source → target | module-federation | No | Yes | vite.config.ts:11-13 (`remotes` with `mf-remoteDetails` at `http://localhost:5001/assets/remoteEntry.js`) | src/features/episodes_list/ListEpisodes.tsx:96 |

## Observations

**1. . → mf-remoteDetails.** The target is known only through the remote's name and URL in configuration (vite.config.ts:12) and import specifier `mf-remoteDetails/DetailEpisode` (src/features/episodes_list/ListEpisodes.tsx:15). No `name`, `exposes` or `base` in the snapshot resolves it, and classification records it as an external unit: In snapshot = No. Active = Yes through the `Yes` source code review line: the component is rendered in src/features/episodes_list/ListEpisodes.tsx:96-100, inside route `/episodes` (src/App.tsx:11), and App is mounted in src/main.tsx:7-13. The module exposed by the remote is not observable; judging by the import, it would be `./DetailEpisode`.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 1.
Units without a relationship: none.

