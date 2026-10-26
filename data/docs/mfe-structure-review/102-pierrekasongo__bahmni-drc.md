---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| openmrs-module-bahmniapps/micro-frontends | openmrs-module-bahmniapps/micro-frontends/package.json;openmrs-module-bahmniapps/micro-frontends/webpack.config.js | openmrs-module-bahmniapps/micro-frontends/package.json | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-20 (`entry` `ipd`, `next-ui`, `shared`; `src/ipd/index.js:8-34` only registers AngularJS components through `react2angular`) | openmrs-module-bahmniapps/micro-frontends/webpack.config.js + openmrs-module-bahmniapps/micro-frontends/package.json:57 (`webpack --mode production`), output to `../ui/app/micro-frontends-dist` (`webpack.config.js:21-25`) | — | — | No | React bridge bundles written to `ui/app/micro-frontends-dist` and consumed by the build and pages of row `openmrs-module-bahmniapps/ui` (`ui/Gruntfile.js:24-26`, `:77-79`; `ui/app/clinical/index.html:92-96`); does not start its own UI |
| openmrs-module-bahmniapps/ui | openmrs-module-bahmniapps/ui/package.json | openmrs-module-bahmniapps/ui/package.json | openmrs-module-bahmniapps/ui/Gruntfile.js:215-229 (`useminPrepare.html` over `app/**/*.html`), e.g., openmrs-module-bahmniapps/ui/app/home/index.html:34 (`ng-app="bahmni.home"`) and openmrs-module-bahmniapps/ui/app/clinical/index.html:29 (`ng-app="consultation"`) | openmrs-module-bahmniapps/ui/Gruntfile.js:600-620 (`bundle` and `build` tasks) + openmrs-module-bahmniapps/ui/package.json:117 (`grunt build`) | — | openmrs-module-bahmniapps/package/docker/Dockerfile:12-13 (`COPY ui/dist/` to Apache); docker-compose.yml:366-372 (`bahmni-web` service, build of the local image `bahmni-web-drc`) | Yes | AngularJS pages with their own entry and Grunt build, packaged in an Apache image |

## Summary

Frontend applications in the snapshot: 1 (openmrs-module-bahmniapps/ui).

## Notes

- The classification records `frontend_units: 2`: the local Bahmni host and the IPD remote (`bahmni_ipd`), which comes from an external image/service (`docker-compose.yml:586-593`) and has no sources in this snapshot. Here the host appears as a single boundary (`ui`); `micro-frontends` is the same host’s React/Module Federation bridge, built into `ui/app/micro-frontends-dist` (`openmrs-module-bahmniapps/micro-frontends/README.md:27-28`), and does not count as a separate application.
- `artifacts.csv` marks both `package.json` files as `workspace-config`, but neither has a `workspaces` field, and `matches.csv` has no `ws-*` occurrence. There is no `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `angular.json` or `project.json` in the snapshot.
- The other Dockerfiles (`bahmni-proxy/`, `openmrs-db/`, `default-config/package/docker/`) and Compose services are for proxy, database, configuration and third-party services, not `micro-frontends`. There is no CI workflow in the snapshot. The chart in `openmrs-module-bahmniapps/package/helm/values.yaml:12-15` points to the image `bahmni/bahmni-web`, not the local image.
- The symlinks `ui/app/app` and `ui/app/components` cited in the classification are not in the snapshot’s `files/`; they do not change the rows.
