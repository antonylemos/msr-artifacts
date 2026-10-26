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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Repository overview

The repository is an OpenMRS 3 distribution packaged by Maven and contains no frontend application code. The structural review judges both candidate directories `No`, `.` (Playwright test package) and `docs` (Docsify site), and counts 0 applications; there are therefore no table rows. The 42 ESM modules composed by the distribution are external and appear only as names and versions in assembly configuration, as recorded by classification and composition review.

Build and publication use Maven in CI. Workflow `CI` calls `maven-publish.yml` on pushes to `main` with `-Pazure -Pbundled-docker` (.github/workflows/ci.yml:13-18), and on release with the additional `-Pproduction` profile (.github/workflows/ci.yml:50-55); `maven-publish.yml` runs `mvn clean deploy` (.github/workflows/maven-publish.yml:107-108). Profile `bundled-docker` (distro/pom.xml:742-746, registry account `msfocg`) assembles Docker images with docker-maven-plugin despite comment "Disable builidng and pushing distro docker images" (distro/pom.xml:885): executions `build` in phase `package` and `push` in phase `deploy` are active (distro/pom.xml:958-971). Images include a single `%a-openmrs-frontend` (distro/pom.xml:901-909), alongside backend, proxy, databases and OpenFn (distro/pom.xml:892-899; distro/pom.xml:910-954). That frontend image’s Dockerfile is absent from the snapshot: `scripts/bundled-docker/` only contains `openfn-web`, `openfn-worker` and `openmrs`, and the rest comes from `target/openmrs/bundled-docker`, generated from parent Ozone (distro/pom.xml:777-795). From what can be read here, external modules would be published together in that frontend image, but none is a snapshot application, and image contents cannot be inspected.

The other workflows publish no frontend application. `build-all.yml`, `build-all-vm.yml` and job `build` in `configuration-build-test.yml` only run `mvnw clean package` (.github/workflows/build-all.yml:50-51; .github/workflows/build-all-vm.yml:36-37; .github/workflows/configuration-build-test.yml:33-34), and that last workflow’s `release-*` jobs only print that ZIP publication was discontinued in favor of Docker Hub images (.github/workflows/configuration-build-test.yml:73-74). `deploy.yml` connects over SSH to `lime-mosul-dev.madiro.org` or `lime-mosul-uat.madiro.org` and runs `start-bundled-docker.sh`, downloaded from another repository (.github/workflows/deploy.yml:33-38; .github/workflows/deploy.yml:54-74); its only call, in `ci.yml`, is commented out (.github/workflows/ci.yml:25-28). `playwright.yml` and `run-e2e-tests.yml` install dependencies and run Playwright tests from directory `.` (.github/workflows/playwright.yml:14-19; .github/workflows/run-e2e-tests.yml:81-98), and `cleanup-artifacts.yml` deletes old GitHub Actions artifacts (.github/workflows/cleanup-artifacts.yml:20-21).

The `ops-*` occurrences in `matches.csv` cover no frontend application. Dockerfiles in `scripts/bundled-docker/` extend OpenFn images (scripts/bundled-docker/openfn-web/Dockerfile:2; scripts/bundled-docker/openfn-worker/Dockerfile:2-17). `docker-compose-openfn.yml` starts Postgres, migrations, OpenFn `web` and `worker` (scripts/docker-compose-openfn.yml:68; scripts/docker-compose-openfn.yml:86; scripts/docker-compose-openfn.yml:99-101; scripts/docker-compose-openfn.yml:139-141). `docker-compose-openmrs-override.yml` fixes OpenMRS core and MariaDB images and only adds a locale variable to service `frontend` defined outside the snapshot (scripts/docker-compose-openmrs-override.yml:2-3; scripts/docker-compose-openmrs-override.yml:10-11; scripts/docker-compose-openmrs-override.yml:16-18). `docker-compose-traefik.yml` starts the Traefik proxy and a certificate download helper (scripts/docker-compose-traefik.yml:6-11; scripts/docker-compose-traefik.yml:31-35). Site `docs` has a `docs/.nojekyll`, but no snapshot workflow builds or publishes it.

## Applications

No frontend applications in the structural review.

## Observations

No frontend applications in the structural review.

## Summary

Applications: 0.
