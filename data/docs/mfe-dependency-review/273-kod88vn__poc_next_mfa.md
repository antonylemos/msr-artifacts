---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:18 | devDependencies | turbo | ^2.3.3 | monorepo-tool | Undetermined | turbo.json:5-26 (tasks `build`, `dev`, `lint`, `type-check`, `clean` configured); the only invocation of `turbo` is in the scripts in package.json:9-11 and `:13-14`, which do not count as use; no CI workflow, Dockerfile or automation script calling `turbo` (grep, excluding the lockfiles) |

## Notes

- The only `same_package_matches` item, `package.json:4`, is the `"workspaces": [` line (`package.json:4-7`), an npm workspace declaration, not Turborepo configuration.
- The other `turbo` occurrences outside `turbo.json` are documentation or UI text: README.md:57, README.md:84, apps/duda/ARCHITECTURE.md:24, apps/shell/app/page.tsx:28 and `:80`, .gitignore:28-29.

