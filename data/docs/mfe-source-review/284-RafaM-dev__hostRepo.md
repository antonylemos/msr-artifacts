---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Mined constructs

No src-* occurrences in matches.csv.

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/features/episodes_list/ListEpisodes.tsx:96 | . | runtime-composition | Yes | Renders `<DetailEpisode />` from external unit `mf-remoteDetails` (src/features/episodes_list/ListEpisodes.tsx:96-100), imported at src/features/episodes_list/ListEpisodes.tsx:15 (`import DetailEpisode from "mf-remoteDetails/DetailEpisode"`) and resolved by the remote declared at vite.config.ts:11-13 (`http://localhost:5001/assets/remoteEntry.js`); type declared at src/declare.d.ts:1-4. Active: `ListEpisodes` is the element of route `/episodes` at src/App.tsx:11, and App is rendered at src/main.tsx:7-13. Props `character`, `open`, `onClose` passed to the remote (ListEpisodes.tsx:97-99). |

## Summary

Constructs participating in composition: 1 (runtime-composition: 1).

## Notes

- Target unit `mf-remoteDetails` is outside the snapshot; it appears only at vite.config.ts:12.
- The remote is loaded through a static federated module import (ListEpisodes.tsx:15), captured by no `src-*` pattern; mining records only configuration (`cfg-*`, `rt-remote-entry`).
