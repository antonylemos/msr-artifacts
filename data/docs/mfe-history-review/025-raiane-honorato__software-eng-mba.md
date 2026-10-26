---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
inputs:
  clone: data/samples/mfe-sample-001/repos/raiane-honorato__software-eng-mba
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Repository overview

History up to snapshot has 29 commits, without merges, from 2026-05-23 to 2026-09-10. First, `0d870b5` (2026-05-23, "init: MyGym TCC — monolith e turborepo PoCs" (English translation: "init: MyGym TCC — monolith and turborepo PoCs")), already contains monolith, Turborepo version, `UX/` mockups, root `.gitignore` and `apps/turborepo/ARCHITECTURE.md`. Re.Pack version arrives a month later: spike `apps/repack-poc/` in `22fcdfc` (2026-06-24, "first repack poc
commit"), already creating host and remote `rspack.config.mjs` files, and `79cf054` (2026-06-29, "add repack
poc"), adding `HelloScreen`, `ErrorBoundary`, `README.md` and `poc-evidence.png`. Between `2260101` (2026-06-29, "repack: esqueleto do workspace (Passo 2.A)" (English translation: "repack: workspace skeleton (Step 2.A)")) and `0bca05d` (2026-07-09), a series of commits numbered by "Parte" (English translation: "Part") assembles `apps/repack/`: host, mini-apps, switch from Expo to bare, orchestration, both singleton experiments (`6128533`, `8a1abae`) and removal of each (`6b05695`, `747393f`), `ARCHITECTURE.md` (`8232ce1`, Part 9) and measurements (Part 10). Afterward only two documentation commits follow: `333ebcc` (2026-07-18) and snapshot `c569ccc` (2026-09-10, "doc: explain
mf-manifest").

Clone locally contains only objects identical to snapshot: `show` of old versions of `sharedDeps.mjs`, `pnpm-workspace.yaml`, `apps/repack/ARCHITECTURE.md` and host `package.json` failed because of missing objects whenever version differed from snapshot. Past reveals messages, dates and files each commit created or modified.

The `ls-tree` of snapshot commit shows two files previous reviews treated as missing: `apps/repack-poc/poc-evidence.png` (since `79cf054`) and all four fonts `apps/repack/packages/host/assets/fonts/Inter-*.ttf` (since `fd0332b`, 2026-07-04, "repack: fontes Inter
em bare (fix visual, swap D3)" (English translation: "repack: Inter fonts in bare (visual fix, swap D3)"))). Both are in commit and were removed only from normalized snapshot copy by preset `binaries` (`data/acquisitions/mfe-corpus-001/corpus/raiane-honorato__software-eng-mba/normalization.json:86`). Image contents were not inspected.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | The ~10 MB download reduction when moving `phosphor-react-native` to `shared` has no before/after measurement in snapshot | 3.4.7 #12 | conflicting stages | 5097f5f 2026-07-09 repack: phosphor no shared + libs pesadas no ARCHITECTURE (Parte 10) (English translation: "repack: phosphor in shared + heavy libraries in ARCHITECTURE (Part 10)"); e5a77a1 2026-07-09 repack: medição de build isolado (Parte 10) (English translation: "repack: isolated build measurement (Part 10)") | inconclusive |
| 2 | Screenshot `poc-evidence.png`, cited as spike evidence, is absent from snapshot, and bundle download through `ScriptManager` has no artifact | 3.4.7 #13 | active or abandoned | 79cf054 2026-06-29 add repack poc | clarified |
| 3 | README says spike remote does not run alone, while it has own entry with template `App` | 3.4.7 #15 | conflicting stages | 22fcdfc 2026-06-24 first repack poc commit; 79cf054 2026-06-29 add repack poc | clarified |
| 4 | The `ARCHITECTURE.md` calls `pnpm catalog` single source of versions, while `react`, `react-native` and `phosphor-react-native` have versions written in each package | 3.4.7 #23 | conflicting stages | 16317fb 2026-06-29 repack: swap Expo->bare + mini-getSharedDependencies (Parte 5c) (English translation: "repack: swap Expo to bare + mini-getSharedDependencies (Part 5c)"); 3d31f97 2026-07-04 repack: orquestracao no host — tabs + lazy remotes (Parte 6, codigo) (English translation: "repack: host orchestration — tabs + lazy remotes (Part 6, code)"); d505d6c 2026-07-09 repack: mprocs — subir os 3 dev servers num comando (Parte 8) (English translation: "repack: mprocs — start all 3 dev servers in one command (Part 8)"); 8232ce1 2026-07-09 repack: ARCHITECTURE.md (Parte 9) (English translation: "repack: ARCHITECTURE.md (Part 9)"); 5097f5f 2026-07-09 repack: phosphor no shared + libs pesadas no ARCHITECTURE (Parte 10) (English translation: "repack: phosphor in shared + heavy libraries in ARCHITECTURE (Part 10)") | clarified |
| 5 | No native project `android/`/`ios/` shows host as sole binary | 3.4.7 #25 | active or abandoned | — | resolved by the snapshot |
| 6 | Turborepo comparison table describes Re.Pack as "webpack + MF", while artifacts use Rspack | 3.4.7 #31 | conflicting stages | 0d870b5 2026-05-23 init: MyGym TCC — monolith e turborepo PoCs (English translation: "init: MyGym TCC — monolith and turborepo PoCs"); 22fcdfc 2026-06-24 first repack poc commit | clarified |

## Observations

**1. Before/after measurement of `phosphor-react-native`.** Message of `5097f5f` (2026-07-09) announces "phosphor no shared + libs pesadas no ARCHITECTURE" (English translation: "phosphor in shared + heavy libraries in ARCHITECTURE"), and commit changes only `apps/repack/packages/shared-deps/sharedDeps.mjs` and `apps/repack/ARCHITECTURE.md`; helper version at this commit already has `'phosphor-react-native'` (line 45). Previous version (`58df5eb`) is unavailable, so clone does not show helper without library. No commit up to snapshot records chunk measurements: only measurement files are in `scripts/`, created in `22fcdfc` (monolith and Turborepo) and `e5a77a1` (`measure-repack.sh` and `repack_build_isolated.csv`, isolated build, not per-tab download). History confirms correction is its own step after mini-apps, but shows neither previous state nor numbers. `inconclusive`.

**2. `poc-evidence.png` and download through `ScriptManager`.** Screenshot enters in `79cf054` (2026-06-29), same commit creating `apps/repack-poc/README.md` citing it, is never removed (empty `log --diff-filter=D`) and is in snapshot commit tree (`ls-tree`, blob `a321bb1`, available in clone). Absence results from acquisition normalization (preset `binaries`), not repository. History does not answer other half: which layer downloads remote bundle is runtime behavior, and no spike commit configures `ScriptManager`. `clarified` regarding screenshot, present in commit; I did not read its contents.

**3. Spike remote "não roda sozinho" (English translation: "does not run alone").** The `apps/repack-poc/remote/App.tsx`, `index.js` and `package.json` are created in `22fcdfc` (2026-06-24) and never change up to snapshot. The `79cf054` (2026-06-29) adds `HelloScreen` and changes remote `rspack.config.mjs`, without touching these three files, and creates README containing phrase. Remote’s own entry, with template `App`, therefore came with project creation and was never adapted; README phrase was written afterward about spike usage. History does not show whether remote ran alone. `clarified` for consulted files.

**4. `pnpm catalog` as single source.** The `apps/repack/pnpm-workspace.yaml` last changes in `16317fb` (2026-06-29), and this locally available version is snapshot’s: already contains comment "Fonte
única das versões das libs compartilhadas" (English translation: "Single source of shared library versions") and already lacks `react`, `react-native` and `phosphor-react-native` in catalog. Previous versions (`2260101`, `4dc0716`) are unavailable. Host `package.json` last changes in `3d31f97` (2026-07-04), and this version already declares `phosphor-react-native`, `react` and `react-native` with literal versions (lines 25-27); check-in and dashboard manifests last change in `d505d6c` (2026-07-09), before `8232ce1`, creating `apps/repack/ARCHITECTURE.md`. The `phosphor-react-native` enters `shared` only in `5097f5f`, afterward, without entering catalog. When `ARCHITECTURE.md` first existed, catalog and manifests already matched snapshot: disagreement is not a remnant of an observable earlier stage. Whether first two catalog versions had `react` is unknown. `clarified` for available versions.

**5. Missing native project.** Snapshot itself explains absence: root `.gitignore` ignores `ios/` and `android/` (`.gitignore:18-19`, under comment "Native (gerado por expo prebuild)" (English translation: "Native (generated by expo prebuild)")), and `apps/repack/README.md:83` says `ios/` is not versioned. A search for paths `*/ios/*` and `*/android/*` across all history up to snapshot finds nothing. Whether host is sole installed binary remains native build behavior recorded by neither snapshot nor history. `resolved by the snapshot`.

**6. "webpack + MF" in Turborepo table.** The `apps/turborepo/ARCHITECTURE.md` is created in `0d870b5` (2026-05-23) and never changes: blob is identical in that commit and snapshot (`ae6818f`). It predates first Re.Pack file by one month (`22fcdfc`, 2026-06-24), already creating `rspack.config.mjs` for host and remote, and no file with `webpack` in name exists in any commit. Line 267 therefore describes a Re.Pack version not yet existing in repository, and was not revised after implementation used Rspack. `clarified`: text predates implementation; history does not say whether a webpack configuration existed outside repository.

## Commands

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # before: identical
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba rev-list --count c569ccc6582475495a637d44ceed33c62c0f6e86
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/shared-deps/sharedDeps.mjs
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status 5097f5f
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status e5a77a1
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/remote/App.tsx apps/repack-poc/remote/index.js apps/repack-poc/remote/package.json apps/repack-poc/README.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/poc-evidence.png '*.png'
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --diff-filter=D c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/poc-evidence.png   # empty output
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/pnpm-workspace.yaml
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/ARCHITECTURE.md apps/repack/packages/host/package.json apps/repack/packages/check-in/package.json apps/repack/packages/dashboard/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/turborepo/ARCHITECTURE.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- '*webpack*'   # empty output
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- '*/ios/*' '*/android/*'   # empty output
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/host/assets/fonts/
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/host/assets/fonts .gitignore
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- scripts docs Docs
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status 22fcdfc
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %p' 5097f5f -1   # rejected by script (option -1 not allowed); did not reach git
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba rev-list --merges --count c569ccc6582475495a637d44ceed33c62c0f6e86
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %p' 5097f5f
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree 0d870b5 -- apps/turborepo/ARCHITECTURE.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/turborepo/ARCHITECTURE.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 58df5eb:apps/repack/packages/shared-deps/sharedDeps.mjs   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 5097f5f:apps/repack/packages/shared-deps/sharedDeps.mjs
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 2260101:apps/repack/pnpm-workspace.yaml   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 4dc0716:apps/repack/pnpm-workspace.yaml   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 16317fb:apps/repack/pnpm-workspace.yaml
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 8232ce1:apps/repack/ARCHITECTURE.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 0147b09:apps/repack/ARCHITECTURE.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 58df5eb:apps/repack/ARCHITECTURE.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 5097f5f:apps/repack/ARCHITECTURE.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/host/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/check-in/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/dashboard/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 16317fb:apps/repack/packages/host/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 3d31f97:apps/repack/packages/host/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 5097f5f:apps/repack/packages/host/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba cat-file -t a321bb1366c925c6c91fdfde11f2a8d89ce75156
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status 79cf054
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/remote apps/repack-poc/host
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # after: identical
```

Five `show` calls with `<hash>:<caminho>` (those for `58df5eb` and `5097f5f` in `sharedDeps.mjs` and all three for `pnpm-workspace.yaml`) were rejected by script before reaching git because of a shell expansion error during review, and repeated with quoted revision (lines above).

## Summary

Commits up to the snapshot: 29 (2026-05-23 to 2026-09-10). Points: 6 (clarified: 4, inconclusive: 1, resolved by the snapshot: 1).
