---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); vite.config.ts:8-15 (`federation({ name: "host", ... remotes: { "mf-remoteDetails": ... }, shared: ["react", "react-dom"] })` in `plugins`); package.json:7-8 (`vite` and `vite build`, which load the `vite.config.ts` at the root); src/features/episodes_list/ListEpisodes.tsx:15 (`import DetailEpisode from "mf-remoteDetails/DetailEpisode"`, the remote declared in vite.config.ts:12), mounted on route `/episodes` in src/App.tsx:11 |

## Notes

- The three inspection occurrences are in `same_package_matches` (vite.config.ts:8, :11, :14); `other_package_matches` is empty. Grep outside the lists finds only the import in vite.config.ts:3 and declaration in package.json:26.
- `vite.config.ts` is not referenced by name: Vite loads it by convention from the root, where the `dev` and `build` scripts run.

