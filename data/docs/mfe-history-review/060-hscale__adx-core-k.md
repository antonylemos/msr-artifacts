---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
inputs:
  clone: data/samples/mfe-sample-001/repos/hscale__adx-core-k
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Repository overview

History up to snapshot has 24 commits, without merges, from 2025-08-07 to 2025-08-28. First is `eca11df` (2025-08-07, "Initial commit: ADX CORE K platform with Temporal-first architecture"). Frontend artifacts are absent from this commit. Introduced in three commits:

- `7fac338` (2025-08-13) creates `apps/shell`, `packages/design-system`, `packages/event-bus`, `packages/shared-context` and `package-workspace.json`;
- `1705eaf` (2025-08-13) creates `apps/auth` and `apps/tenant`;
- `1920432` (2025-08-16, "feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum)") creates `apps/file`, `apps/module`, `apps/user`, `apps/workflow` and all six `bff-services/*`.

Shortly afterward, `d4d1897` (2025-08-16, "🎉 ADX Core Project Complete - Final GitHub Sync") creates `packages/i18n`, documents in `docs/` and workflows `deploy-microfrontends.yml`, `deploy-production.yml` and `automated-rollback.yml`. At this stage, applications, packages and BFFs resided at root.

Milestone relevant to almost all points is snapshot commit itself, `683dec7` (2025-08-28, "feat: Complete Task 44 Production Deployment and Monitoring"). Deletes 227 files in `apps/` and creates 59 files in `adx-core/apps/`. Also deletes `packages/`, `bff-services/` and `docs/` and recreates them under `adx-core/`. Not a simple directory move. Comparing object identifiers of previous commit (`31a57a1`) to snapshot, of 227 old application files, 48 have equivalents in `adx-core/apps/`, and only four have same content: `tsconfig.node.json` files of auth, module and shell, and module `index.html`. Other 44 changed, and 179 were not recreated. BFFs and documents, in contrast, were largely copied unchanged. The `adx-core/` already existed with Rust services.

Clone shows messages, dates, touched files and object identifiers. Old version contents differing from snapshot are unavailable (`31a57a1:package.json`, package `index.ts` files, old `App.tsx` and `vite.config.ts`). Thus history says which files existed and when, but not their contents.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Five remotes without `index.html` or with exposes and imports targeting missing files | 3.4.3 (adx-core/apps/file, module, tenant, user, workflow `Undetermined`); 3.4.7 #3 | conflicting stages | 1705eaf 2025-08-13 feat: comprehensive ADX Core task sync with GitHub integration; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | clarified |
| 2 | Event bus DOM event channel is reached by no unit | 3.4.4 (adx-core/packages/event-bus/src/EventBus.tsx:49); 3.4.7 #13 | active or abandoned | 7fac338 2025-08-13 feat: comprehensive ADX Core task analysis and GitHub sync readiness; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusive |
| 3 | i18n `changeLanguage`, which would notify other units, is neither exported nor used | 3.4.4 (adx-core/packages/i18n/src/hooks.ts:19); 3.4.7 #25 | active or abandoned | d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusive |
| 4 | Shared-context theme and tenant stores, which would synchronize through DOM events, are not reached | 3.4.4 (adx-core/packages/shared-context/src/tenant-store.ts:77; theme-store.ts:33, :142, :162); 3.4.7 #22 | active or abandoned | 7fac338 2025-08-13 feat: comprehensive ADX Core task analysis and GitHub sync readiness; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusive |
| 5 | Deploy workflows build and publish `apps/<app>`, a path absent from snapshot | 3.4.6 #1-#7 (Deploy `Undetermined`); 3.4.7 #9 | conflicting stages | 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | clarified |
| 6 | BFF READMEs describe connection with micro-frontends, while remotes do not use BFFs | 3.4.7 #4, #16, #17, #18, #19 | conflicting stages | 1705eaf 2025-08-13 feat: comprehensive ADX Core task sync with GitHub integration; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); 978acbf 2025-08-16 ADX DONE Tasks; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | clarified |
| 7 | Guide promises per-application failure isolation, while shell has a single `ErrorBoundary` | 3.4.7 #20 | conflicting stages | 7fac338 2025-08-13 feat: comprehensive ADX Core task analysis and GitHub sync readiness; 1920432 2025-08-16 feat: Complete Task 33 - User and Workflow BFF Services (Rust/Axum); d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync; 683dec7 2025-08-28 feat: Complete Task 44 Production Deployment and Monitoring | inconclusive |
| 8 | Autonomy guide describes one repository per team (`team-workspace/`), while snapshot is a monorepo by layer | 3.4.7 #23 | conflicting stages | d4d1897 2025-08-16 🎉 ADX Core Project Complete - Final GitHub Sync | clarified |

## Observations

**1. Five remotes without `index.html` or with exposes and imports targeting missing files.** Until commit before snapshot (`31a57a1`), each application resided in `apps/<app>` and had own `index.html`. Tenant and auth files arrived in `1705eaf`; file, user, workflow and module files in `1920432`. Snapshot commit, `683dec7`, deletes this tree and creates `adx-core/apps/` without `index.html` in file, tenant, user and workflow. Some files targeted by snapshot exposes and imports existed in `31a57a1`, at equivalent paths under `apps/`: `FileUpload.tsx` and `FileBrowser.tsx` (file), `TenantSwitcher.tsx` (tenant), `UserProfile.tsx` and `UserSettings.tsx` (user), `WorkflowHistory.tsx` (workflow), `ModuleSettings.tsx`, `ModuleDeveloper.tsx` and `src/index.css` (module). All are deleted in `683dec7` without recreation. Five other names appear in no commit up to snapshot: `FileViewer`, `UserList`, `WorkflowList`, `WorkflowStatus` and `ModuleInstaller`. Old `vite.config.ts` versions are unavailable, so whether old exposes were same cannot be known. Conclusion within these files: gaps are not remnants of gradual abandonment. Most result from application recreation in snapshot commit, omitting files existing in previous stage. Five targets never existed in any version. None changes 3.4.3 `Undetermined`.

**2. Event bus DOM event channel is reached by no unit.** The `packages/event-bus/src/EventBus.tsx` and `hooks.ts` are created in `7fac338` and reach snapshot with same object identifier. Only moved directory in `683dec7`. In same commit, package entry, `src/index.ts`, was rewritten, and `providers/EventBusProvider.tsx` received by units was created. Old `index.ts` version is unavailable (`show` fails). Thus whether entry exported `EventBus.tsx` between `7fac338` and `683dec7` cannot be known. Whether old-tree applications imported it also cannot be known because their contents are unavailable. History shows file never changed and layer excluding it belongs to snapshot commit. Does not show whether it was ever used.

**3. i18n `changeLanguage`, which would notify other units, is neither exported nor used.** The `packages/i18n/src/hooks.ts` is created in `d4d1897` and reaches snapshot unchanged. However, `src/index.ts` changed in `683dec7`, and previous version is unavailable. Up to `31a57a1`, shell also had own i18n (`apps/shell/src/i18n/index.ts`, with four `locales`), deleted in `683dec7`. Whether old package entry exported hook or any application used it cannot be known. Inconclusive.

**4. Shared-context theme and tenant stores, which would synchronize through DOM events, are not reached.** The `tenant-store.ts` is created in `7fac338` and never changes up to snapshot. The `theme-store.ts` is created in same commit and changed in `1920432`, whose message announces user and workflow BFFs. Afterward it also reaches snapshot unchanged. Package `index.ts` was rewritten in `683dec7`, also creating four providers (`SharedContextProvider`, `AuthProvider`, `UserProvider`, `TenantProvider`) mounted by units. Old `index.ts` version is unavailable. Like point 2, layer excluding stores belongs to snapshot commit. Whether stores were previously exported or used cannot be known.

**5. Deploy workflows build and publish `apps/<app>`, a path absent from snapshot.** The `deploy-microfrontends.yml` and `deploy-production.yml` are created in `d4d1897` and never change up to snapshot. At that date, all seven applications resided in root `apps/<app>` (created in `7fac338`, `1705eaf` and `1920432`). Snapshot commit, `683dec7`, removed them and recreated them in `adx-core/apps/`, without touching workflows. Same applies to root workspace. The `package.json` changed in `683dec7`, but previous version is unavailable. Thus whether patterns `apps/*` and `packages/*` were already present cannot be known. Path conflict is clarified: workflows belong to stage with root-level applications, and directory change came later. History does not show whether workflows ever ran successfully. Also does not explain `npm run build:<app>` of `deploy-production.yml` or shell addresses at `localhost`. Deploy remains `Undetermined`.

**6. BFF READMEs describe connection with micro-frontends, while remotes do not use BFFs.** READMEs of `auth-bff`, `file-bff`, `module-bff` and `tenant-bff` are created in `1920432`. Auth README changes in `978acbf`, whose message only says "ADX DONE Tasks". All four reach `adx-core/bff-services/` in `683dec7` with same object identifier. When written, each application had own BFF client: `apps/<app>/src/services/<app>BFFClient.ts` (auth and tenant in `1705eaf`; file, module, user and workflow in `1920432`; auth with own test). Snapshot commit deletes all six clients and creates shared package `packages/bff-client`, absent from any earlier commit. The `useBFFClient` imported by module but not exported by package belongs to same commit. Conclusion within these files: READMEs belong to stage with one BFF client per application, and snapshot replaced clients with a package not imported by remotes. Old client contents are unavailable. Thus history does not show applications called them.

**7. Guide promises per-application failure isolation, while shell has a single `ErrorBoundary`.** The `docs/README.md` and `docs/developer-guide/module-federation.md` are created in `d4d1897` and reach `adx-core/docs/` in `683dec7` with same object identifier. Shell `App.tsx` is created in `7fac338`, changed in `1920432` and `d4d1897` and rewritten in `683dec7`. Shell `ErrorBoundary.tsx` and `MicroFrontendLoader.tsx` originate in `7fac338` and change only in `683dec7`. Previous versions of these three files are unavailable. Whether shell had one `ErrorBoundary` per route at guide stage cannot be known. Inconclusive.

**8. Autonomy guide describes one repository per team (`team-workspace/`), while snapshot is a monorepo by layer.** The `docs/developer-guide/team-autonomy.md` is created in `d4d1897` and reaches snapshot without content change. No commit up to snapshot has path containing `team-workspace`, `frontend-app` or `auth-frontend`. Conclusion limited to these names: per-team structure does not belong to an earlier repository stage. History does not say whether it describes other repositories, such as `auth-team.git` guide instructs cloning, or only intent.

## Commands

```
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k rev-list --count 683dec7ebc233c685f97166a135032d5668070c1
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --merges --format=%h 683dec7ebc233c685f97166a135032d5668070c1
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- adx-core/apps
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- .github/workflows/deploy-microfrontends.yml .github/workflows/deploy-production.yml
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --format='%h %ad %s' --date=short 683dec7   # failure: missing object (25bfbf5), requested by rename detection
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --no-renames --format='%h %ad %s' --date=short 683dec7
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%H %P' 683dec7ebc233c685f97166a135032d5668070c1 --
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 31a57a1 -- apps packages bff-services
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 683dec7ebc233c685f97166a135032d5668070c1 -- adx-core/apps adx-core/packages adx-core/bff-services
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/event-bus/src/index.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/shared-context/src/index.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/i18n/src/index.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/src/App.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/vite.config.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/file/vite.config.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/auth/src/App.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --name-status --no-renames --format='@@ %h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps packages bff-services .github/workflows package.json package-workspace.json docs
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree 31a57a1 -- apps/file/index.html apps/tenant/index.html apps/user/index.html apps/workflow/index.html apps/file/src/components/FileUpload.tsx apps/file/src/components/FileBrowser.tsx apps/file/src/components/FileViewer.tsx apps/tenant/src/components/TenantSwitcher.tsx apps/user/src/components/UserProfile.tsx apps/user/src/components/UserList.tsx apps/user/src/components/UserSettings.tsx apps/workflow/src/components/WorkflowList.tsx apps/workflow/src/components/WorkflowStatus.tsx apps/workflow/src/components/WorkflowHistory.tsx apps/module/src/components/ModuleInstaller.tsx apps/module/src/components/ModuleSettings.tsx apps/module/src/components/ModuleDeveloper.tsx apps/module/src/index.css
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*FileViewer*' '*UserList*' '*WorkflowList*' '*WorkflowStatus*' '*ModuleInstaller*'   # no output
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format=%h 683dec7ebc233c685f97166a135032d5668070c1 -- '*FileUpload*'   # pattern control
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/event-bus/src/EventBus.tsx adx-core/packages/event-bus/src/EventBus.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/event-bus/src/index.ts adx-core/packages/event-bus/src/index.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/i18n/src/hooks.ts adx-core/packages/i18n/src/hooks.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/i18n/src/index.ts adx-core/packages/i18n/src/index.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/shared-context/src/theme-store.ts adx-core/packages/shared-context/src/theme-store.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/shared-context/src/tenant-store.ts adx-core/packages/shared-context/src/tenant-store.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- packages/shared-context/src/index.ts adx-core/packages/shared-context/src/index.ts
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --no-renames --format=%h 1920432 -- packages/shared-context
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r --name-only 31a57a1 -- apps
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*bff-client*'
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- docs/developer-guide/module-federation.md adx-core/docs/developer-guide/module-federation.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- docs/developer-guide/team-autonomy.md adx-core/docs/developer-guide/team-autonomy.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- docs/README.md adx-core/docs/README.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 31a57a1 -- docs
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k ls-tree -r 683dec7ebc233c685f97166a135032d5668070c1 -- adx-core/docs/developer-guide adx-core/docs/README.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- bff-services/auth-bff/README.md bff-services/file-bff/README.md bff-services/module-bff/README.md bff-services/tenant-bff/README.md
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*BFFClient.ts'
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/App.tsx adx-core/apps/shell/src/App.tsx apps/shell/src/components/ErrorBoundary.tsx adx-core/apps/shell/src/components/ErrorBoundary.tsx apps/shell/src/components/MicroFrontendLoader.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --full-history --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- '*team-workspace*' '*auth-frontend*' '*frontend-app*'   # no output
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/App.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/components/ErrorBoundary.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- apps/shell/src/components/MicroFrontendLoader.tsx
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/src/components/ErrorBoundary.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:apps/shell/src/components/MicroFrontendLoader.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show --name-status --no-renames --format='%h %ad %s' --date=short 978acbf -- bff-services
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:packages/shared-context/src/index.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k show 31a57a1:package.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- package.json
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- .github/workflows/deploy-microfrontends.yml
docs/mfe-history-review/tools/hist.sh hscale__adx-core-k log --format='%h %ad %s' --date=short 683dec7ebc233c685f97166a135032d5668070c1 -- .github/workflows/deploy-production.yml
```

## Summary

Commits up to the snapshot: 24 (2025-08-07 to 2025-08-28). Points: 8 (clarified: 4, inconclusive: 4, resolved by the snapshot: 0).
