---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-11 (root manifest, only `wp-pwa` in devDependencies) | — | package.json:9 (`wp-pwa build UX308_Assignment2_2025`, external tool without configuration in the snapshot) | — | .github/workflows/main.yml:29-30 (`diy-pwa/npm-build-2-gh-pages@v1.11`: npm run build and publishing to gh-pages) | Undetermined | Build and deployment declared, but no application entry is in the snapshot: only `wp-content/` from a WordPress site, assembled by the external tool. |

## Summary

Frontend applications in the snapshot: 0.

## Notes

- The snapshot has only `wp-content/` (themes, plugins, mu-plugins) from a WordPress site; the WordPress core and home page come from the `wp-pwa` tool (package.json:6-9) and are not in the repository. The themes’ `templates/index.html` files (e.g., `wp-content/themes/twentytwentyfive/templates/index.html:1`) are WordPress block templates, not application entries.
- The classification records frontend_units: 2: the WordPress site (host) and the external form `Contact_form_UX308`, published at another origin. The external unit is outside the snapshot and does not become a row; the host is row `.`, which remains Undetermined for lack of an observable entry. Therefore the count is 0.
- The composition evidence cited by the classification, `wp-content/database/.ht.sqlite`, is not in the snapshot: normalization removed it as a binary (`normalization.json:21-23`, `preset:binaries`). This does not change this stage, which does not assess composition.
- `package.json` appears as `workspace-config` in `artifacts.csv`, but does not declare `workspaces` (package.json:1-11).
