---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
inputs:
  clone: data/samples/mfe-sample-001/repos/Sara-hkm__creamati-micro-web
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Repository overview

History up to snapshot has 7 linear commits, from 2025-09-21 to 2025-09-22, without merges. First, `4f941bb` ("Initial commit: Micro-frontend architecture with container app and 4 micro-frontends"), is first observable presence of documents (`README.md`, `STATUS.md`, `implementation-plan.md`, `implementation-plan-mui-microservices.md`, `micro-web-golden-sample.md`), root `package.json`, `.cursor/` and versioned root `node_modules/`. Six documents and `package.json` have same object identifier in first commit and snapshot (`ls-tree 4f941bb` and `ls-tree 541f8ed`), and path `log` lists only `4f941bb`: their version throughout history matches snapshot. First commit does not say where these texts were written before.

In `4f941bb`, five `frontend/` directories (`analytics-app`, `container`, `data-grid-app`, `settings-app`, `user-management-app`) have no files: they are submodule entries (mode `160000`) pointing to commits outside this repository, without `.gitmodules`. These commits are absent from clone (`cat-file -e` fails for all five), and entries remain identical up to `1f789f7` (`ls-tree 1f789f7`). Five-application code arrives only in snapshot `541f8ed` ("Recreate complete micro-frontend applications"), removing five submodule entries and creating each application files; message announces "Fixed submodule issues and properly tracked all source files" and "Container app configured to embed micro-frontends via GitHub Pages URLs". This therefore introduces container `<iframe>` (`frontend/container/src/App.tsx` appears only in `541f8ed`).

Between them, five commits concern deploy: `81f06d6` ("Add GitHub Actions workflows for automated deployment") creates six workflows and `DEPLOYMENT.md`; `c6d475b` ("Update workflows for GitHub Pages deployment"), `5148e21` ("Fix GitHub Actions workflows - remove cache-dependency-path") and `1f789f7` ("Fix GitHub Actions workflow - install dependencies for each app individually") change workflows; `ea81537` ("Trigger GitHub Actions deployment after creating gh-pages branch") changes no files. Clone is partial: old workflow version contents are unavailable locally (`show 81f06d6:.github/workflows/deploy-analytics.yml` fails; `cat-file -e` fails for `deploy-analytics.yml` and `deploy-all.yml` blobs at `81f06d6`). Visible evidence consists of messages, changed file lists and object identifiers.

The `<iframe>` URLs to GitHub Pages of account `olivium-dev`, recorded in reviews 3.4.4, 3.4.5 and 3.4.6, have first presence in `541f8ed`. Message of `c6d475b` also announces "Update container app to use GitHub Pages URLs", but this commit changes only six workflows: entry `frontend/container` does not change between `4f941bb` and `541f8ed` (`log -- frontend` lists only these two). History does not say why URLs point to another account; since previous reviews did not leave this relationship `Undetermined`, this remains context without table row.

Reviews 3.4.2 to 3.4.6 leave no open points: no technology dependency, no `Undetermined` unit, only construct is active, four relationships are `Yes` and deploy of five applications is `separate`. Points come from `contradicted` and `partial` claims in 3.4.7, grouped by uncertainty. The `uncorroborated` claims (3.4.7 #10, #22, #23) are excluded under step 2.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | The `DEPLOYMENT.md` describes Vercel deploy, and workflows publish to GitHub Pages | 3.4.7 #1 | conflicting stages | 81f06d6 2025-09-21 Add GitHub Actions workflows for automated deployment; c6d475b 2025-09-21 Update workflows for GitHub Pages deployment; 5148e21 2025-09-21 Fix GitHub Actions workflows - remove cache-dependency-path; 1f789f7 2025-09-21 Fix GitHub Actions workflow - install dependencies for each app individually | clarified |
| 2 | Plans and guide describe other units (auth, dashboard, profile, shared library, backend), and snapshot has container, user-management, data-grid, analytics and settings | 3.4.7 #11, #12, #16 | conflicting stages | 4f941bb 2025-09-21 Initial commit: Micro-frontend architecture with container app and 4 micro-frontends; 541f8ed 2025-09-22 Recreate complete micro-frontend applications | clarified |
| 3 | Guide and `package.json` description claim Module Federation (remote modules, shared React, shared state and authentication, lazy loading, `remoteEntry.js` URLs, Material-UI), and composition uses iframe among CRA applications | 3.4.7 #13, #14, #17, #18, #19, #20, #21, #24, #25, #26 | conflicting stages | 4f941bb 2025-09-21 Initial commit: Micro-frontend architecture with container app and 4 micro-frontends; 541f8ed 2025-09-22 Recreate complete micro-frontend applications | inconclusive |

## Observations

**1. Vercel deploy in `DEPLOYMENT.md`.** The `DEPLOYMENT.md` was created in `81f06d6`, together with six workflows, and unchanged afterward (`log -- DEPLOYMENT.md` lists only `81f06d6`; same object in `81f06d6` and snapshot). Workflows changed three times afterward (`c6d475b`, `5148e21`, `1f789f7`). Message of `81f06d6` announces "Vercel integration with production deployment" and "Comprehensive deployment documentation"; `c6d475b` announces "Replace Vercel deployment with GitHub Pages" and "Configure workflows to deploy to gh-pages branch". Old workflow version contents are unavailable, so Vercel-to-Pages replacement is announced by messages rather than inspected. Conclusion limited to these files: `DEPLOYMENT.md` belongs to workflow stage at `81f06d6` and was not updated when workflows changed; discrepancy with snapshot workflows concerns different stages.

**2. Units in plans and guide.** The `implementation-plan.md`, `implementation-plan-mui-microservices.md` and `micro-web-golden-sample.md` exist in first commit with snapshot contents and did not change afterward. No commit up to snapshot has directory `auth-app`, `dashboard-app`, `profile-app`, `ui-lib`, `shared-ui-lib`, `backend` or `docker`: file lists per commit (`log --name-status`) and first-commit tree show only five entries with current names in `frontend/` since `4f941bb`. Names auth, dashboard and profile appear only in `.cursor/prompts/` prompts (e.g. `02-setup-auth-remote.md`), also from first commit. History does not show five-application contents before `541f8ed` (external submodules absent from clone), or events before first commit. Conclusion limited to repository history: planned unit split never existed in tree; current applications have same names since first commit, and documents remained unchanged.

**3. Module Federation in guide and `package.json`.** Guide `micro-web-golden-sample.md` and root `package.json` (with description "React + Webpack Module Federation + Material-UI") exist in first commit with snapshot contents and did not change. Outside `.cursor/templates/` (`webpack.config.template.js`, `RemoteComponent.template.tsx`, `mui-theme.template.ts`, created in `4f941bb`), no commit creates webpack or federation configuration file in this repository tree. Container `<iframe>` arrives in `541f8ed`, whose message announces embedding "via GitHub Pages URLs". History does not show five-application contents from `4f941bb` to `1f789f7`: submodules pointed to commits outside clone, so whether any had federation before recreation in `541f8ed` is unknown. Thus whether guide claims are remnants of federated stage or intention never implemented cannot be said. Conclusion: inconclusive.

## Commands

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # before: identical
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web rev-list --count 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --reverse --date=short --format='%h %ad %s' --name-status 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --reverse --date=short --format='== %h %ad%n%B' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 4f941bb -- frontend/
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 4f941bb
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 541f8ed
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 1f789f7 -- frontend/
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 81f06d6 -- .github/workflows/ DEPLOYMENT.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 541f8ed -- .github/workflows/
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web show 81f06d6:.github/workflows/deploy-analytics.yml   # failed: missing object
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- DEPLOYMENT.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- README.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- STATUS.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- implementation-plan.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- implementation-plan-mui-microservices.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- micro-web-golden-sample.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- package.json
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- .github/workflows
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- frontend/container/src/App.tsx
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- frontend
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e 7c2603a0db331de54e2158feb9b1d616b754d745   # missing (submodule frontend/analytics-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e e88c23e5f5f772104770f18ecb2e3a3bcf5d0acf   # missing (submodule frontend/container)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e 3a97a78ef3b0e06366c8318751fcc3c5db646667   # missing (submodule frontend/data-grid-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e dd4fb9fb2fafa002f7331baf7fef14d688aec863   # missing (submodule frontend/settings-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e bf99b47aec8ae53d25b4d19480ee341fff7c3937   # missing (submodule frontend/user-management-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e a900b4340f82b4c995edc833315f6ead2f3cbb8f   # missing (deploy-analytics.yml at 81f06d6)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e 5b5b063f8b673c6eff17dca609d45e37f8d0b8d3   # missing (deploy-all.yml at 81f06d6)
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # after: identical
```

## Summary

Commits up to the snapshot: 7 (2025-09-21 to 2025-09-22). Points: 3 (clarified: 2, inconclusive: 1, resolved by the snapshot: 0).
