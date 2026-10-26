---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Mined constructs

No src-* occurrences in matches.csv.

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 0.

## Notes

- The `matches.csv` has 37 rows, none with `pattern` starting with `src-`: only `ci-workflow-file` (9), `ops-compose-service` (12), `ops-deployment-file` (5), `ops-dockerfile` (2), `doc-import-map-zones` (5), `doc-mfe-term` (3) and `doc-independence` (1).
- The structural review judges both candidate directories `No` (`.`, a Playwright test package; `docs`, a Docsify site), meaning 0 frontend applications in the snapshot. Any row in this stage would receive `Unit: —`.
- The snapshot has 450 files outside `.yarn/` and almost no UI code: 10 `.ts` (all in `e2e/`, Playwright specs), 1 `.js` (`playwright.config.js`), 1 `.html` (`docs/index.html`) and 3 `.groovy` in `scripts/`. The step 4 search (`import(`, `React.lazy`, `loadRemote*`, `initFederation`, `registerRemotes`, `System.import`, `customElements`, `registerApplication`, `registerMicroApps`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script')`) had no occurrences outside `.yarn/releases/yarn-4.13.0.cjs`, the package manager binary bundled in the repository.
- `docs/index.html:35-40` loads six CDN scripts (`docsify.min.js`, `search.min.js`, four Prism components). They were not included in `matches.csv` because the `src-html-external-script` regex requires `https?://` and the URLs are protocol-relative (`//cdn.jsdelivr.net/...`). They did not become manual rows because they are third-party libraries of the documentation site itself rather than another unit’s bundle.
- The composition mechanism recorded by the classification (`approaches: [import-maps]`) does not appear in source code at this commit. Every import map reference is in configuration or build: `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json` (42 `frontendModules`), `README.md:1081-1082` and the `pom.xml` files of the three sites (`sites/mosul/pom.xml:232-233`, `sites/bunia/pom.xml:330-331`, `sites/matsapha/pom.xml:285-286`), which connect `scripts/remove-importmap-entries.groovy` to the build. This script edits `importmap.json` and `routes.registry.json` in `target/` (`scripts/remove-importmap-entries.groovy:71-100`) and fails the build when a route lacks an entry in the map (`:113-122`); this is build-time map maintenance rather than runtime loading, resolution, mounting or registration, so it does not fit any step 4 type. The maps it edits are generated and absent from the snapshot, and the app-shell consuming them is external to the repository.
