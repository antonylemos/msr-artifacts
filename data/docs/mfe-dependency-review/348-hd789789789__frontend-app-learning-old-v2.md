---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:48 | dependencies | @openedx/frontend-plugin-framework | ^1.7.0 | other-mfe-framework | Yes | src/plugin-slots/HeaderSlot/index.jsx:2 (`import { PluginSlot } from '@openedx/frontend-plugin-framework'`); src/plugin-slots/HeaderSlot/index.jsx:9-10 (`<PluginSlot id="org.openedx.frontend.layout.header_learning.v1"`); src/generic/PageNotFound.jsx:8 and src/generic/PageNotFound.jsx:20 (imports and renders `<HeaderSlot />`); src/index.jsx:54 (route `path="*"` with `<PageNotFound />`, at the application entry point) |

## Notes

- `same_package_matches` and `other_package_matches` are empty; all evidence came from searching for the package name outside the inspection lists.
- In `src/plugin-slots/`, 28 slot `index.*` files import `PluginSlot` from the package (for example, `FooterSlot`, `SequenceContainerSlot`, `CourseBreadcrumbsSlot`); `HeaderSlot` is also used in `src/tab-page/TabPage.jsx:9` and `src/generic/CourseAccessErrorPage.jsx:7`. One chain reaching a route is enough for `Yes`.
- `example.env.config.jsx:2` imports `DIRECT_PLUGIN` and `PLUGIN_OPERATIONS`, but is an example not referenced by any build in the snapshot; it was not used as evidence. The `README.md` files in `src/plugin-slots/` and `README.rst:137` only document the package. `src/setupTest.js:31-32` is a test mock.

