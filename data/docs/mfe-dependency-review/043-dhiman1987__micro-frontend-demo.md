---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 043 — dhiman1987/micro-frontend-demo

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| app3/package.json:13 | dependencies | @lit/react | ^1.0.7 | web-components | No | no import or invocation of `@lit/react` in the snapshot code and build files (literal search, excluding lockfiles); only declared in app3/package.json:13; app3/src/MyCounterLitElement.jsx:20-23 (calls `createComponent` without importing the function or package) |
| app3/package.json:15 | dependencies | lit | ^3.3.0 | web-components | Undetermined | app3/src/MyCounterLitElement.jsx:1-8 (imports `lit` and `lit/decorators.js`, extends `LitElement`); app3/src/MyCounterLitElement.jsx:16-23 (uses `html`, but calls `createComponent` without an import); app3/vite.config.js:9-15 and app3/src/main.jsx:1 (the build and entry point use `MyCounterElement`, with no reference to the Lit variant) |

## Notes

- The same_package_matches and other_package_matches occurrences show native custom elements; they do not demonstrate use of the Lit packages.
- The MyCounterLitElement.jsx variant is neither imported nor referenced by build or HTML in the snapshot (search for the filename and my-counter-lit-app tag). There is Lit code, but its actual use cannot be confirmed; therefore lit received Undetermined.
- The call to createComponent without an import does not demonstrate invocation of @lit/react; there is no import of this package in any code or build file.

