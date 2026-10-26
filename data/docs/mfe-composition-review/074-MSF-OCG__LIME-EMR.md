---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
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

# 074 — MSF-OCG/LIME-EMR

## Repository overview

MSF-OCG's OpenMRS 3 distribution, built on Ozone HIS and packaged by Maven for three sites (`sites/mosul`, `sites/bunia`, `sites/matsapha`). The repository contains no frontend application code: it selects which external ESM modules enter the distribution and how they behave. The assembly configuration pins the core version and lists 42 versioned `frontendModules` (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:2-46), and excludes six default modules (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:48-55). The UI configuration adjusts those modules by package name: it enables feature flags for `@openmrs/esm-app-shell` (distro/configs/openmrs/frontend_config/msf-frontend-config.json:18-20) and places the `patient-flags-list` extension in patient chart slots (distro/configs/openmrs/frontend_config/msf-frontend-config.json:27-39; distro/configs/openmrs/frontend_config/msf-frontend-config.json:146-158). The build replaces frontend configuration in the generated `.env` and adds configurations to `SPA_CONFIG_URLS` (distro/pom.xml:446-447; distro/pom.xml:460-461).

The host composing those modules is the external `@openmrs/esm-app-shell`. According to the repository's own script, app-shell loads each bundle through `importmap.json` and registers pages and extensions through `routes.registry.json` (scripts/remove-importmap-entries.groovy:7-16). Both maps are generated during the build and absent from the snapshot. What is versioned is their maintenance: each site runs `remove-importmap-entries.groovy` during `process-resources` to remove modules from its distribution (sites/mosul/pom.xml:220-234, removing `@openmrs/esm-ward-app` and `@openmrs/esm-patient-task-list-app` at :229; sites/bunia/pom.xml:327; sites/matsapha/pom.xml:282). The script deletes entries from both maps (scripts/remove-importmap-entries.groovy:71-100) and fails the build if a route lacks an import map entry (scripts/remove-importmap-entries.groovy:111-123).

No relationship was recorded. The structural review judges both candidate directories `No`, `.` (Playwright tests) and `docs` (Docsify site), and counts 0 frontend applications in the snapshot. The source code review has no `Yes` or `Undetermined` construct, and the dependency review has no dependency on the inspected technologies. A relationship requires a Source directory that is `Yes` or `Undetermined` in the structural review, and here there is none. The actual composition source (app-shell) and targets (the 42 modules) are all outside the snapshot, and their connection passes through generated maps also absent from it. The declarations above show which units the distribution composes and how the build maintains the maps, but do not connect two snapshot units. This does not contradict the classification (`MFE-implemented`, `approaches: [import-maps]`, 42 `multi-repo` units): the repository configures a composition whose parts all reside in other repositories.

## Relationships

No relationship.

## Observations

No relationship. The source code review has no `Yes` or `Undetermined` row to distribute in the Code column.

## Summary

Relationships: 0. Active: 0. Target outside the snapshot: 0.
Units without a relationship: none.

