---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
inputs:
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

## Repository overview

The repository is a local Bahmni/OpenMRS distribution assembled through Docker Compose. There is no workspace or CI workflow, and `matches.csv` has no `ci-*` or `cfg-public-path` occurrences. The only frontend application in the structural review is `openmrs-module-bahmniapps/ui`, Bahmni AngularJS pages. Its build is Grunt: `yarn build` calls `grunt build` (openmrs-module-bahmniapps/ui/package.json:117), running `yarn-install` and task `bundle` (openmrs-module-bahmniapps/ui/Gruntfile.js:600-620), with output in `dist` (openmrs-module-bahmniapps/ui/Gruntfile.js:9-10). The React/Module Federation bridge (`openmrs-module-bahmniapps/micro-frontends`, `No` in structural review) has its own Webpack build (`"build": "webpack --mode production"`, openmrs-module-bahmniapps/micro-frontends/package.json:57), but output goes inside `ui`, into `ui/app/micro-frontends-dist`, and `ui` Grunt includes these bundles in application CSS and JS lists (openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, :77-79). Nothing in the snapshot triggers both builds together; module README describes running bridge build first (openmrs-module-bahmniapps/README.md:41-44). In the snapshot, `ui/app/micro-frontends-dist` contains only CSS, translations and license files, without `.min.js` files, and there is no `ui/dist`. The `ui/scripts/package.sh` packages `dist` into ZIP `bahmniapps.zip` (openmrs-module-bahmniapps/ui/scripts/package.sh:13-15, :31), an upstream distribution format no other snapshot artifact uses.

Packaging is an Apache image. Dockerfile `openmrs-module-bahmniapps/package/docker/Dockerfile` starts from `httpd:2.4-alpine`, copies `httpd.conf` (listening on port 8091, openmrs-module-bahmniapps/package/docker/httpd.conf:53) and supporting static pages, and copies `ui/dist/` to `/usr/local/apache2/htdocs/bahmni/` (openmrs-module-bahmniapps/package/docker/Dockerfile:1-13). Service `bahmni-web` in `docker-compose.yml` builds this image as `bahmni-web-drc:latest`, replacing published image `bahmni/bahmni-web`, left commented out (docker-compose.yml:366-371). However, the same service volume-mounts source code `${BAHMNI_APPS_PATH}/ui/app/` over `/usr/local/apache2/htdocs/bahmni` and Bower components over `bahmni/components` (docker-compose.yml:375-377, with `BAHMNI_APPS_PATH='./openmrs-module-bahmniapps'` in .env:110). With this volume, Compose serves `ui/app` as it exists on disk, rather than `dist` copied into the image: this is a local distribution setup with development characteristics. The `start.sh` builds all three local images (`bahmni-web-drc`, `bahmni-config-drc`, `bahmni-proxy-drc`) and starts Compose (start.sh:6-24), without running Grunt build. Apache proxy (`bahmni-proxy/Dockerfile:1-8`) publishes application at `/bahmni`, forwarding to `bahmni-web:8091` (bahmni-proxy/resources/bahmni-proxy.conf:40-41), and redirects `/home` to `/bahmni/home/` (bahmni-proxy/resources/bahmni-proxy.conf:6).

Remote IPD consumed by host has no source here: service `ipd` uses external image `bahmni/microfrontend-ipd:${IPD_TAG}` (docker-compose.yml:586-594; `IPD_TAG=1.0.0` in .env:193), with local source volume commented out (docker-compose.yml:591-592), and proxy forwards `/ipd` to it (bahmni-proxy/resources/bahmni-proxy.conf:32-33). Host and remote are therefore released in different images and services.

Other `ops-*` artifacts do not cover frontend applications. `bahmni-proxy/Dockerfile` is the reverse proxy. `default-config/package/docker/Dockerfile` copies clinical configuration to `/etc/bahmni_config` (default-config/package/docker/Dockerfile:1-10), and chart `default-config/package/helm/` (Chart.yaml, values.yaml and templates `deployment.yaml`, `rbac.yaml`, `restart-dependencies-script-configmap.yaml`, `serviceaccount.yaml`, `volumes/bahmni-config.yaml`) deploys this configuration image (`bahmni/default-config:latest`, default-config/package/helm/values.yaml:13-16). `openmrs-db/Dockerfile` is OpenMRS MySQL (openmrs-db/Dockerfile:2). Other `ops-compose-service` occurrences in `docker-compose.yml` are backends and third-party services using published images (OpenELIS, Odoo, OpenMRS, Metabase, Mart, reports, PACS etc.). Chart `openmrs-module-bahmniapps/package/helm/` (Chart.yaml, values.yaml, `deployment.yaml`, `service.yaml`, `hpa.yaml`) is the Bahmni Web chart, but points to published image `bahmni/bahmni-web:latest` (openmrs-module-bahmniapps/package/helm/values.yaml:12-15; openmrs-module-bahmniapps/package/helm/templates/deployment.yaml:53), rather than local image, and no snapshot script applies it. `docker-compose copy.yml` is an old Compose copy: its `bahmni-web` service uses context `./openmrs-module-bahmniapps/package/docker` (docker-compose copy.yml:362-367), where the `package/docker/...` and `ui/...` files copied by Dockerfile do not exist, and `start.sh` uses default `docker compose up` (start.sh:24), reading `docker-compose.yml`.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | openmrs-module-bahmniapps/ui | separate | separate | `/bahmni` (bahmni-proxy/resources/bahmni-proxy.conf:40-41); port 8091 of service `bahmni-web` (openmrs-module-bahmniapps/package/docker/httpd.conf:53) | No | openmrs-module-bahmniapps/ui/package.json:117 (`grunt build`); openmrs-module-bahmniapps/ui/Gruntfile.js:600-620 (tasks `bundle` and `build`, output in `dist`); openmrs-module-bahmniapps/package/docker/Dockerfile:1-13 (Apache image with `ui/dist/` in `htdocs/bahmni`); docker-compose.yml:366-377 (service `bahmni-web`, local image `bahmni-web-drc:latest`, volume of `ui/app/`); start.sh:6-8 (image build of `bahmni-web-drc`); bahmni-proxy/resources/bahmni-proxy.conf:40-41 (`ProxyPass /bahmni`) |

## Observations

**1. openmrs-module-bahmniapps/ui.** Build `separate`: Grunt of `ui` generates its own artifact in `dist` (openmrs-module-bahmniapps/ui/Gruntfile.js:9-10, :600-620). Bridge `micro-frontends` bundles enter this artifact (openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, :77-79), but bridge is not an application in the structural review, instead part of the same host; remote IPD does not come from this build. Deploy `separate`: application has its own image and service (`bahmni-web`, docker-compose.yml:366-371; openmrs-module-bahmniapps/package/docker/Dockerfile:13), apart from the external image serving remote IPD (docker-compose.yml:586-594). The `ui/app/` volume (docker-compose.yml:376) changes what service serves, source code instead of `dist`, but does not change that application publication is its own. Bahmni Web Helm chart (openmrs-module-bahmniapps/package/helm/values.yaml:12-15) also deploys it separately, but using upstream’s published image, not this snapshot’s. Versioning `No`: `ui/package.json` declares `"version": "1.1.0"` (openmrs-module-bahmniapps/ui/package.json:3), and `.env` has `BAHMNI_WEB_IMAGE_TAG=1.1.0` (.env:109), but line using this tag is commented out (docker-compose.yml:370) and local image is released with `latest` (docker-compose.yml:371; start.sh:8). Chart version `1.0.0` (openmrs-module-bahmniapps/package/helm/Chart.yaml:5) belongs to chart, and its image also uses `tag: latest` (openmrs-module-bahmniapps/package/helm/values.yaml:15).

## Summary

Applications: 1. Build (separate: 1). Deploy (separate: 1). Independent versioning: 0.
