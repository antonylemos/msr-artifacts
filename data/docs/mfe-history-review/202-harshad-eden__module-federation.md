---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
inputs:
  clone: data/samples/mfe-sample-001/repos/harshad-eden__module-federation
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Repository overview

History up to snapshot has 2 commits, both from 2025-07-07, without merges:

- `ac5fbbc` (2025-07-07, "mono repo with single deployement"), first, creates entire repository at once: four applications in `apps/` (shell, sales-portal, underwriter-portal and product-config, with `vite.config.ts`, sources and wrappers), packages `packages/shared-types` and `packages/shared-ui`, root `package.json` and `pnpm-workspace.yaml`, `.gitignore` and six Markdown documents (`ARCHITECTURE_DOCUMENTATION.md`, `DEPLOYMENT_GUIDE.md`, `NAVIGATION_AND_EMBEDDING.md`, `README.md`, `TODO.md` and `context.md`);
- `dde74e6` (2025-07-07, "first commit"), snapshot commit, changes only `README.md`. Earlier README version (object `f6de22a`, listed by `ls-tree ac5fbbc`) is absent from clone, so changes cannot be seen.

No commit removes a file. Everything cited by previous reviews except README has first observable presence in `ac5fbbc` and does not change afterward. Since first commit already includes entire project, history does not show how or where code and documentation were developed before. It also does not distinguish order in which each artifact was written.

Reviews 3.4.2 to 3.4.6 left no ambiguous point: federation dependencies are all configured, four units are `Yes`, constructs and relationships are all active and deploy is `not observed`, without `Undetermined`. Points come from `partial` and `contradicted` claims in 3.4.7.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Documentation describes independent deploy per application and production domains, but snapshot has no deploy artifact and remote URLs use `localhost`. | 3.4.7 #2; 3.4.7 #4; 3.4.7 #20 | active or abandoned | ac5fbbc 2025-07-07 mono repo with single deployement; dde74e6 2025-07-07 first commit | clarified |
| 2 | Four applications declare `@insurance/shared-types`, but only sales-portal imports it. | 3.4.7 #11 | active or abandoned | ac5fbbc 2025-07-07 mono repo with single deployement | clarified |
| 3 | Documentation gives remote at `http://localhost:3001/remoteEntry.js`, and shell configuration uses `/dist/assets/remoteEntry.js`. | 3.4.7 #26 | conflicting stages | ac5fbbc 2025-07-07 mono repo with single deployement | clarified |
| 4 | Documentation describes login in shell with shared session, implemented by no unit. | 3.4.7 #29 | active or abandoned | — | resolved by the snapshot |
| 5 | Documentation describes six applications, including `employer-portal` and `service-provider`, absent from snapshot. | 3.4.7 #32; 3.4.7 #33 | conflicting stages | ac5fbbc 2025-07-07 mono repo with single deployement; dde74e6 2025-07-07 first commit | clarified |

## Observations

**1. Independent deploy without deploy artifact.** Neither commit creates or removes `vercel.json`, workflow, Dockerfile or other deploy file, and no commit removes a file. The `DEPLOYMENT_GUIDE.md`, `ARCHITECTURE_DOCUMENTATION.md`, `NAVIGATION_AND_EMBEDDING.md` and `apps/shell/vite.config.ts` appear together in `ac5fbbc` and do not change afterward. History therefore records no stage with configured deploy later abandoned: in repository, `localhost` URLs and Vercel publication plans coexist since first observable presence. Message of `ac5fbbc` announces a "single deployement", without corresponding artifact. Snapshot `.gitignore` ignores `.vercel` (`.gitignore:223-224`), tool local directory, rather than deploy configuration files; history does not show whether publication occurred outside repository.

**2. `shared-types` imported only by sales-portal.** The `package.json` files of four applications, `apps/` sources and `packages/shared-types/src/index.ts` are created in `ac5fbbc` and do not change afterward. History has no import of `@insurance/shared-types` removed from other three applications: declaration without import is already in first observable presence. History does not show whether package was intended for all four, or code state before first commit.

**3. `remoteEntry.js` address.** The `NAVIGATION_AND_EMBEDDING.md` and `apps/shell/vite.config.ts` are created in same commit, `ac5fbbc`, and neither changes afterward. History has no configuration version with path cited by document: both paths coexist since first observable presence. History does not show source of document path.

**4. Login with shared session.** Snapshot itself answers: `TODO.md:8-13` lists JWT authentication and "Token sharing across microfrontends" as to-do items (`- [ ]`), situating shared session as a plan, rather than something implemented and later removed. History was not consulted for this point beyond context, also recording no file removal.

**5. Six documented applications, four in snapshot.** No commit creates or removes a file in `apps/employer-portal` or `apps/service-provider`: only applications recorded by history are four created in `ac5fbbc`. The `context.md`, listing six (`context.md:10-16`) and five remotes (`context.md:48-57`), is also created in `ac5fbbc` and does not change. The `README.md`, source of claims (`README.md:7`, `119-120`), changes in `dde74e6`, and earlier version is absent from clone (`cat-file` failed with missing object). Thus whether these lines were already in first commit cannot be known. Conclusion does not depend on this: both applications never existed in repository history, and no stage with six applications was reduced to four. History does not show whether they existed outside repository.

## Commands

```
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation rev-list --count dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation rev-list --count --merges dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation log --format='%h %ad %s' --date=short --name-status --no-renames dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation log --format='%h %ad %s' --date=short --name-status --no-renames --diff-filter=D dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation ls-tree ac5fbbc -- README.md
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation ls-tree dde74e678a749ccbf3951e173bf980649034c5d4 -- README.md
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation cat-file -t f6de22abc14059ae6679d4a342f762acf5a9a00d   # failed: missing object ("could not get object info")
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation cat-file -s bb87069080c489d5d790b0679cd02d645b913a78
```

## Summary

Commits up to the snapshot: 2 (2025-07-07 to 2025-07-07). Points: 5 (clarified: 4, inconclusive: 0, resolved by the snapshot: 1).
