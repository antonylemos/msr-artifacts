---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
inputs:
  clone: data/samples/mfe-sample-001/repos/enzox0__module-federation-project-template
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Repository overview

History up to snapshot has 60 commits, all from 2026-05-29, without merges. First is `d503356` ("chore: initialize project with root package configuration") and snapshot is `b3c96cb` ("docs: add Quick Start and Running guides for module federation setup"). Project arrives file by file, by directory: root configuration is followed by `README.md` (`76d4857`, "docs: add comprehensive README with architecture and setup guide", 7th commit from first), monorepo configuration (`73d3333`), five applications (admin-mf, auth-mf, dashboard-mf, messaging-mf and shell, from `4c4be4f` to `cd99281`), infrastructure (`de055a2` to `ed07d0d`), `packages/` packages (`2521e23` to `cc32c75`), scripts (`785290a`), workflows (`4db3303`) and finally both guides in `.docs/` (`b3c96cb`).

In all history, only one file changes after creation: `.gitignore`, in `94411bf` ("chore(.gitignore): add VS Code configuration directory to ignore list"). No file is removed or renamed (`log --diff-filter=MDR`). Each snapshot file therefore has a single version, from its creation commit, and that version is what reviews read. Each artifact has an introduction commit, but everything arrives on same day, and history does not show where or in what order code was written before versioning. Commit order only says order files were added to repository.

Reviews 3.4.2 to 3.4.6 left no unused dependency or `Undetermined` unit, construct, relationship or deploy. Points come from obsolete shell `module-federation.config.js`, cited in 3.4.5, and six `contradicted` claims in 3.4.7.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Shell `module-federation.config.js` points remotes to ports 3004 to 3007 without prefix `/dist`, and guide gives `remoteEntry.js` without `/dist`, while `.ts` uses 3001 to 3004 with `/dist` | 3.4.5 (Overview); 3.4.7 #6 | conflicting stages | 7e00cd3 2026-05-29 chore(shell): add module federation configuration; b3c96cb 2026-05-29 docs: add Quick Start and Running guides for module federation setup | clarified |
| 2 | README calls template "production-ready", and CD, Kubernetes and Terraform are placeholders, with `localhost` URLs in shell | 3.4.7 #8 | conflicting stages | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 7e00cd3 2026-05-29 chore(shell): add module federation configuration; a158918 2026-05-29 chore(kubernetes): add placeholder Kubernetes configurations for module federation apps; 599d40d 2026-05-29 chore(kubernetes): add shell Kubernetes configuration placeholder; ed07d0d 2026-05-29 chore(infrastructure): add Terraform configuration placeholders; 785290a 2026-05-29 chore(scripts): add project automation scripts; 4db3303 2026-05-29 ci: add GitHub Actions workflows for CI/CD and linting | clarified |
| 3 | README describes shared packages imported by applications, which declare but do not import them | 3.4.7 #9 | dependency use | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 23b3cd7 2026-05-29 feat(admin-mf): add build and TypeScript configuration; b51dc85 2026-05-29 feat(auth-mf): add build and TypeScript configuration; 5c843e2 2026-05-29 feat(dashboard-mf): add Vite configuration and TypeScript setup; 4187380 2026-05-29 chore(messaging-mf): add Docker and configuration setup; 31ac7bf 2026-05-29 chore(shell): add build configuration and dependencies; cefcdba 2026-05-29 chore(sdk): add package configuration and TypeScript setup; 6437f4e 2026-05-29 chore(shared): add package configuration and TypeScript setup; 40908b4 2026-05-29 chore(types): add package configuration and TypeScript setup; b5a45f8 2026-05-29 chore(ui): add package configuration and TypeScript setup | clarified |
| 4 | README diagram places an Nginx reverse proxy in front of shell, and `nginx.conf` serves only static files | 3.4.7 #10 | conflicting stages | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; de055a2 2026-05-29 chore(shell): add Docker configuration for development and production; 4da0ea3 2026-05-29 chore(infrastructure): add nginx configuration for module federation app | clarified |
| 5 | README promises deploy without rebuilding entire application, and each Dockerfile builds entire workspace | 3.4.7 #14 | conflicting stages | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 4c4be4f 2026-05-29 chore(admin-mf): add Docker and HTML entry point configuration; 264b5f2 2026-05-29 chore(auth-mf): add Docker and HTML entry point configuration; 452d4f3 2026-05-29 chore(dashboard-mf): add Docker and HTML entry point configuration; 4187380 2026-05-29 chore(messaging-mf): add Docker and configuration setup; adc6f0f 2026-05-29 chore(shell): add Docker and configuration setup | clarified |
| 6 | README says build builds shared packages first, which have no `build` script | 3.4.7 #17 | conflicting stages | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 73d3333 2026-05-29 chore: add build and monorepo configuration; cefcdba 2026-05-29 chore(sdk): add package configuration and TypeScript setup; 6437f4e 2026-05-29 chore(shared): add package configuration and TypeScript setup; 40908b4 2026-05-29 chore(types): add package configuration and TypeScript setup; b5a45f8 2026-05-29 chore(ui): add package configuration and TypeScript setup | clarified |

## Observations

**1. Obsolete shell `.js` configuration and path without `/dist`.** The `apps/shell/module-federation.config.js` and `apps/shell/module-federation.config.ts` arrive together in `7e00cd3` and never change up to snapshot. The `.js`, with ports 3004 to 3007 and no `/dist`, and `.ts`, with 3001 to 3004 and `/dist`, already diverge in commit where they appear: repository history has no stage where `.js` was only configuration or both matched. The `.docs/RUNNING.md`, with example `http://localhost:3001/assets/remoteEntry.js`, is created in last commit `b3c96cb`, after both configurations, and also does not change. History does not show which configuration file was generated first outside repository, or source of guide path. Conclusion for queried files: discrepancy is not a remnant of an earlier observable repository stage; all three versions coexist since addition.

**2. "production-ready" and placeholder infrastructure.** README arrives in `76d4857`, before any application or infrastructure file, and never changes. Kubernetes manifests (`a158918`, `599d40d`), Terraform (`ed07d0d`), scripts including `scripts/deploy.sh` (`785290a`), and workflows including `cd.yml` (`4db3303`) arrive afterward, with messages already announcing them as "placeholder" for Kubernetes and Terraform. None changes or is removed, so placeholder contents and CD `echo` are from creation. Shell `localhost` URLs are in `module-federation.config.ts` since `7e00cd3`, also unchanged. Repository had no production infrastructure later removed. History does not show whether one existed outside it. Conclusion: claim and scaffold coexist since creation; in commit order claim precedes contradicting artifacts, and they were never completed.

**3. Shared packages declared and not imported.** The `package.json` files of five applications, declaring `@mf/ui`, `@mf/shared`, `@mf/types` and `@mf/sdk`, arrive in `23b3cd7`, `b51dc85`, `5c843e2`, `4187380` and `31ac7bf` and do not change. Files in `apps/*/src` arrive in each application bootstrap and "barrel export" commits (for example `bca7121`, `2137978`, `89b3016`, `03d38b4`, `2817bb1`) and are also never changed or removed. Since no file besides `.gitignore` changes in all history, each `apps/*/src` version read in 3.4.4, without import from `packages/*`, is only version that existed: no commit up to snapshot had an application importing a shared package. Packages arrive after applications (`cefcdba`, `6437f4e`, `40908b4`, `b5a45f8`). Conclusion: workspace dependencies were declared since application creation and never connected; no later disconnection occurred.

**4. Nginx as reverse proxy.** The `infrastructure/nginx/nginx.conf` arrives in `4da0ea3` and never changes, so it never had a version other than static files with fallback read in 3.4.6. Production shell Dockerfile using it arrives in `de055a2`, also unchanged. Diagram with "Reverse Proxy" is in README since `76d4857`, before these two files. Conclusion: described reverse proxy never existed in repository; description precedes configuration and was not revised.

**5. Deploy without rebuilding remainder.** Five application Dockerfiles arrive in `4c4be4f`, `264b5f2`, `452d4f3`, `4187380` and `adc6f0f` and never change. Version running `pnpm build` on entire workspace is only version that existed: repository never had a Dockerfile building only its own application. README with promise is in `76d4857`, before them. Conclusion: promise and entire-workspace build coexist since creation; they are not different stages.

**6. Building shared packages first.** The `package.json` files of `packages/sdk`, `packages/shared`, `packages/types` and `packages/ui` arrive in `cefcdba`, `6437f4e`, `40908b4` and `b5a45f8` and never change: no commit had them with script `build`. The `turbo.json`, with dependency `^build`, arrives in `73d3333` and also does not change. README with "Builds all shared packages first" is in `76d4857`, before packages. Conclusion: described step never had corresponding script in repository; text precedes packages and was not adjusted to them.

## Commands

```
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template rev-list --count b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status --diff-filter=MDR b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --merges --format=%h b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- apps/shell/module-federation.config.js apps/shell/module-federation.config.ts .docs/RUNNING.md apps/auth-mf/package.json packages/ui/package.json infrastructure/nginx/nginx.conf README.md
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- apps/admin-mf/package.json apps/dashboard-mf/package.json apps/messaging-mf/package.json apps/shell/package.json apps/auth-mf/src apps/admin-mf/src apps/dashboard-mf/src apps/messaging-mf/src apps/shell/src
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- packages/sdk/package.json packages/shared/package.json packages/types/package.json packages/ui/package.json
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- apps/admin-mf/Dockerfile apps/auth-mf/Dockerfile apps/dashboard-mf/Dockerfile apps/messaging-mf/Dockerfile apps/shell/Dockerfile infrastructure .github scripts turbo.json package.json .docs
```

## Summary

Commits up to the snapshot: 60 (2026-05-29 to 2026-05-29). Points: 6 (clarified: 6, inconclusive: 0, resolved by the snapshot: 0).
