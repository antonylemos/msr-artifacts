---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 272 — scality/metalk8s

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| shell-ui | shell-ui/package.json;shell-ui/rspack.config.ts | shell-ui/package.json | shell-ui/rspack.config.ts:46 (`entry: './src/index.tsx'`); shell-ui/src/index.tsx:1-9 (`createRoot(rootElement).render(<App />)`); shell-ui/rspack.config.ts:209-213 (`HtmlRspackPlugin` with `template: './index-template.html'`) | shell-ui/rspack.config.ts:42-46 (own rspack configuration); shell-ui/package.json:9 (`rspack build -c rspack.config.ts`) | — | shell-ui/Dockerfile:4-27 (Node build with `npm run rsbuild` and nginx image with `./shell`); .github/workflows/build-shell-ui.yaml:31-33 (`docker build` with `working-directory: shell-ui`); buildchain/buildchain/image.py:417-421 (image `shell-ui`); salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15-24 (`ScalityUI` `shell-ui-cp`) | Yes | React shell with its own UI-mounting entry and rspack build, with its own image and CI. |
| tools/crd-client-generator-js | tools/crd-client-generator-js/package.json | tools/crd-client-generator-js/package.json | — | — | — | — | No | Node tool for CRD client generation (`ts-node src/index.ts`, tools/crd-client-generator-js/package.json:8), not frontend. |
| ui | ui/package.json;ui/rspack.config.ts | ui/package.json | ui/rspack.config.ts:32-34 (`entry: { metalk8s_ui: './src/index.ts' }`; `ui/src/index.ts` has 0 bytes); ui/rspack.config.ts:121-122 (`exposes` `./FederableApp`); ui/src/FederableApp.tsx:120-122 (exported component, no render of its own) | ui/rspack.config.ts:28-207 (own rspack configuration); ui/package.json:39 (`rspack build -c rspack.config.ts`) | — | ui/Dockerfile:3-19 and ui/entrypoint.sh:5-8 (builder image running `npm run build`; buildchain/buildchain/builder.py:94-96 and buildchain/buildchain/ui.py:115-121); buildchain/buildchain/image.py:422-437 (image `metalk8s-ui`); images/metalk8s-ui/Dockerfile:9 (`COPY ui /usr/share/nginx/html/`); salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15-25 (`ScalityUIComponent` `metalk8s-ui`) | Undetermined | Own build and deployment, but the build entry is an empty file and nothing in the directory starts the UI on its own; the UI is only provided through the exposed module. |

## Summary

Frontend applications in the snapshot: 1 (shell-ui).

## Notes

- The classification records `frontend_units: 2` (`shell-ui` and `ui`). The difference comes from `ui`: it is the `metalk8s` remote (ui/rspack.config.ts:118-127), whose UI the shell mounts through `./FederableApp`, but there is no HTML, `HtmlRspackPlugin` or `createRoot`/`render` in `ui/` (grep), and entry `./src/index.ts` is empty. `Undetermined` follows the case of an empty entry module without standalone startup (039, `apps/microfrontend`) and concerns building/serving `ui` on its own, not its role as a remote, which is addressed by the composition review (protocol section 3.4.5).
- `images/metalk8s-ui/Dockerfile:9-11` copies the `ui` build, documentation and `shell-ui` build into the same image; `shell-ui` also has its own image (buildchain/buildchain/image.py:417-421).
- `SHELL_UI_BUILDER` (buildchain/buildchain/builder.py:105-107) reuses `ui/Dockerfile` as a builder image.
- No `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `turbo.json`, `rush.json` or `workspaces` in `package.json` outside `ui/@mf-types`; the `ws-path-alias` occurrences are `paths` in the `tsconfig.json` files. Each package has its own `package-lock.json`.
- `ui/@mf-types/` (generated shell types, with `package.json` under `node_modules/`) does not appear in `units.csv`, correctly.
