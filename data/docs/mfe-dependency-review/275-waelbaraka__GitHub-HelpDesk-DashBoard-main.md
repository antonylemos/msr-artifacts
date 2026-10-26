---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| Frontend/package.json:53 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | Frontend/vite.config.js:4 (`import federation from '@originjs/vite-plugin-federation'`); Frontend/vite.config.js:11-35 (`federation({ name: 'platform_host', remotes: { remote_app: ... }, exposes, shared })` in `plugins`); Frontend/package.json:7-8 (`vite` and `vite build`, which read the `vite.config.js` in the directory); Frontend/src/components/layouts/DashboardLayout.jsx:144 (`import('remote_app/WhatsAppChannelSettingsPage')`) and :385 (route `/integrations/whatsapp`) |
| whatsapp-module-frontend/package.json:28 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | whatsapp-module-frontend/vite.config.js:4 (`import federation from '@originjs/vite-plugin-federation'`); whatsapp-module-frontend/vite.config.js:11-50 (`federation({ name: 'remote_app', filename: 'remoteEntry.js', exposes: { './Button', './WhatsAppChannelSettingsPage' }, ... })` in `plugins`); whatsapp-module-frontend/package.json:7-8 (`vite --port 5001` and `vite build --watch`, which read the `vite.config.js` in the directory) |

## Notes

- The two packages have no common workspace; each row was judged by its own package's configuration (`same_package_matches`). Each row's `other_package_matches` are the other frontend's configuration, which uses its own package declaration.
- Outside the lists, grep for the package name in `.js/.jsx/.ts/.mjs/.cjs/.json` (excluding lockfiles) found only the two `import` statements in `vite.config.js:4` and the two manifest declarations.
- `Frontend/src/modules/moduleLoader.js` (placeholder cited by the classification) does not import the package and was not used as evidence.

