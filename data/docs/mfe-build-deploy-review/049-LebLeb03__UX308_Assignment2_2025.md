---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

# 049 — LebLeb03/UX308_Assignment2_2025

## Repository overview

The repository is a WordPress site assembled from template `cd-wordpress` ("continuous deployment wordpress"; README.md:1-2). The snapshot contains only `wp-content/`; WordPress core, static site generation and development server come from external tool `wp-pwa`, the only root `package.json` dependency (package.json:2-4). All scripts call it: `wp-pwa dev` in `dev` and `start`, `wp-pwa preview` and `wp-pwa build UX308_Assignment2_2025` in `build` (package.json:6-9). Tool configuration is absent from the snapshot, so build artifact contents are not observable. README says build generates a static site in `dist/` (README.md:11), a git-ignored folder (.gitignore:3), as is `.wordpress` (.gitignore:5).

Publication uses a single workflow, `CI`, triggered by push and pull request on `main` and manually (.github/workflows/main.yml:6-14). Its only job, `build`, with repository write permission (.github/workflows/main.yml:19-24), calls action `diy-pwa/npm-build-2-gh-pages@v1.11`, which, according to the workflow’s own comment, runs `npm install`, `npm run build` and publishes to `gh-pages` (.github/workflows/main.yml:29-32). This is production configuration: the whole site outputs as one artifact and goes to the repository’s GitHub Pages. The final address is not recorded in the snapshot. README repeats this deployment form and cites publishing `dist/` to a cloud provider as an alternative (README.md:11); there is no artifact for that alternative.

The other three workflows in `matches.csv` belong to plugin `sqlite-database-integration`, copied into `wp-content/mu-plugins/`, and cover no frontend application: `cs.yml` checks plugin PHP code style (wp-content/mu-plugins/sqlite-database-integration/.github/workflows/cs.yml:5-20, :31-38), and `phpunit-tests.yml` runs plugin PHPUnit tests on several PHP versions through reusable workflow `phpunit-tests-run.yml` (wp-content/mu-plugins/sqlite-database-integration/.github/workflows/phpunit-tests.yml:9-23; wp-content/mu-plugins/sqlite-database-integration/.github/workflows/phpunit-tests-run.yml:3-4). Located inside `wp-content/` rather than root `.github/workflows/`, they are not executed by GitHub in this repository. The `.devcontainer/devcontainer.json` only defines the development environment Node image (.devcontainer/devcontainer.json:2) and is not a deployment artifact.

Compositions recorded in 3.4.5 point to bundles and pages from other origins (`lebleb03.github.io/Assignment_1_UX308/`, `rhildred.github.io/chatter/`, `tools.akismet.com`), all without configuration in the snapshot; build and deployment of those targets are outside this repository.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | separate | repository GitHub Pages, branch `gh-pages`, address not recorded in the snapshot (.github/workflows/main.yml:29-30) | No | package.json:9 (`wp-pwa build UX308_Assignment2_2025`); .github/workflows/main.yml:6-14 (triggers on `main`); .github/workflows/main.yml:29-32 (build and publication to `gh-pages`) |

## Observations

**1. .** The structural review’s only row, `Undetermined` there because no application entry is in the snapshot; this stage does not change that. Build `separate`: script `build` generates the repository’s static site, with no other snapshot application included (package.json:9; README.md:11). The limitation is that tool `wp-pwa` and its configuration are outside the snapshot, so artifact contents cannot be checked. Deploy `separate`: root workflow job `build` runs build and publishes its result to `gh-pages` (.github/workflows/main.yml:19-32); this is the only deployment artifact covering the application, published alone. The relationship with external targets of 3.4.5 happens in the browser through URLs (wp-content/themes/chatbot/functions.php:14-15), and they do not enter this artifact. Versioning `No`: `package.json` has no `version` (package.json:1-11), and no artifact publishes the application with its own version.

## Summary

Applications: 1. Build (separate: 1). Deploy (separate: 1). Independent versioning: 0.
