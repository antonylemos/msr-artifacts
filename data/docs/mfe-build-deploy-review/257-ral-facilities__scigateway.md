---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
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

# 257 — ral-facilities/scigateway

## Repository overview

The repository contains only parent application (`.`), a React + Vite application built by `yarn build`, running `tsc` and `vite build` (package.json:57; vite.config.ts:35-54) and generating `dist/`. Plugins it loads through single-spa are built and published in other repositories; host knows them only through `src` of each entry in `plugins` list of runtime-loaded `settings.json` (public/settings.example.json:15-22). Thus no snapshot artifact builds or publishes a plugin.

Production form is a two-stage Docker image: a `node` stage installs dependencies and runs `yarn build` (Dockerfile:4, 12-23), and an `httpd` stage copies `dist/` to Apache `htdocs` (Dockerfile:26-31), with rewriting of every unknown route to `index.html`, compression and `no-cache` for `.json` and `.html` (Dockerfile:33-54), on port 80 (Dockerfile:77). Entrypoint generates `settings.json` from `settings.example.json` with `AUTH_PROVIDER` and `AUTH_URL` when none is mounted, and changes title if `SCIGATEWAY_TITLE` is supplied (docker/docker-entrypoint.sh:3-17, 19-30; Dockerfile:70-74). This mounted or generated `settings.json` tells installation which plugins to load; `.dockerignore` excludes every `settings*.json` in `public/` from image except example (.dockerignore:26-27).

Three GitHub Actions CI workflows and one Jenkinsfile exist. The `docker-release-build.yml` builds image with `Dockerfile` and sends it to Harbor registry as `scigateway`, with semver tags derived from Git tag and branch tags, on every push to `main`, `develop` or tag (.github/workflows/docker-release-build.yml:2-9, 30-39, 42-52). The `release-build.yml` runs `yarn build`, packages `dist/` as `scigateway-<tag>.tar.gz` and publishes it in a GitHub release, named `snapshot`/`snapshot-develop` on branches and tag name on tags (.github/workflows/release-build.yml:28-29, 31-46, 56-65). The `ci-build.yml` runs lint, unit and e2e tests, then builds image without sending it (.github/workflows/ci-build.yml:11-35, 37-71). The `Jenkinsfile` only installs and runs unit and e2e tests (Jenkinsfile:5-20). Both publication workflows cover same application in two forms, image and tarball, without contradiction.

Rest is development and testing. The `yarn dev` starts Vite on port 3000, mock authentication server and `serve-plugins.js`, serving local plugin builds on their own ports (package.json:56, 63; vite.config.ts:45-47; micro-frontend-tools/serve-plugins.js:42-43). The `yarn e2e` builds application, starts Express test server on port 3000, serving `dist/`, `e2e-settings.json` and compiled demonstration plugin bundle at `/plugins/` (package.json:64-67; server/e2e-test-server.js:8-10, 16-25, 42), mock authentication server on port 8000 (server/auth-server.js:13, 407) and a Keycloak through `docker compose` (server/keycloak/docker-compose.yml:1-12). This compose and authentication server cover no frontend application. The `server/e2e-plugin/` is only build copied from demonstration plugin repository (server/README.md:3-9), not a plugin deploy.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | separate | port 80 of image `httpd`, at `/` (Dockerfile:28-31, 77); image `<HARBOR_URL>/scigateway` (.github/workflows/docker-release-build.yml:34); release `scigateway-<tag>.tar.gz` on GitHub (.github/workflows/release-build.yml:43-46, 60); `http://localhost:3000` in e2e server (server/e2e-test-server.js:22-25, 42) and in development (vite.config.ts:45-47) | Yes | package.json:57 (`tsc` + `vite build`); vite.config.ts:35-54 (build configuration); Dockerfile:4-23 (stage `builder`, `yarn build`); Dockerfile:26-31 (copy of `dist/` to httpd); docker/docker-entrypoint.sh:3-17 (generates `settings.json`); .github/workflows/docker-release-build.yml:30-52 (semver tags and push of image `scigateway` to Harbor); .github/workflows/release-build.yml:28-65 (tarball of `dist/` published in release named after tag); .github/workflows/ci-build.yml:62-71 (image build without push) |

## Observations

**1. ..** Build `separate`: application has its own build, generating only its own `dist/` (package.json:57; Dockerfile:23). Deploy `separate`: image packages only host `dist/` (Dockerfile:31) and is sent to Harbor as `scigateway` (.github/workflows/docker-release-build.yml:34, 42-48), and release tarball also contains only this `dist/` (.github/workflows/release-build.yml:45-46); plugins enter neither, because loaded through addresses in `settings.json` (public/settings.example.json:18). Versioning `Yes`: both publications carry application version, derived from Git tag, in image semver tags (.github/workflows/docker-release-build.yml:35-38) and tarball and release names (.github/workflows/release-build.yml:40, 46, 61-62). Field `version` of `package.json` (`4.1.1`, package.json:3) is read by neither workflow; version used comes from tag. Because application is repository’s only one, repository tag is its version. Ports 3000 (e2e and Vite) and 5001 (`vite preview`, vite.config.ts:48-50) are for development and testing.

## Summary

Applications: 1. Build (separate: 1). Deploy (separate: 1). Independent versioning: 1.
