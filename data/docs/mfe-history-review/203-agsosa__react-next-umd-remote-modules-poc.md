---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
inputs:
  clone: data/samples/mfe-sample-001/repos/agsosa__react-next-umd-remote-modules-poc
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Repository overview

History up to snapshot has 17 commits, all from 2025-07-28, without merges. First, `6d2fa15` ("Initial commit"), creates only `.gitattributes`; both applications, `mf-1` and `shell`, appear together in `b50998d` ("Init"). Most messages are "wip".

Milestones used in points:
- **`b50998d` to `397b98c`:** bundle of `mf-1` first resides at `mf-1/public/remote-components/bundle.js` (`b50998d`); `0f9ffc9` ("wip") creates `mf-1/public/remote-modules/bundle.js` and directory `mf-1/src/RemoteModules/`, and `397b98c` ("wip") removes old bundle.
- **`ff692cd` ("WIP"):** creates hook `shell/src/hooks/useRemoteModule.ts` and both type files, one per application. Hook changes afterward in `a5bb370` and `6ff5738` ("Update useRemoteModule.ts"), and version at `6ff5738` matches snapshot (same object).
- **`77ded93` ("Add env var for remote urls") and `d7937f8` ("Update next config"):** create and adjust `shell/next.config.js`, with snapshot version since `d7937f8`.
- **`faabb25` ("Update vite.mf.ts"):** last change to `mf-1/vite.mf.ts` up to snapshot.
- **`03aa81d` ("Create README.md") and `ed8c864` ("Add styled components theme, update readme, cleanup"):** create and change root `README.md`, with snapshot version since `ed8c864`. README is last artifact to arrive: after hook, shell configuration and last `vite.mf.ts` version.

No commit up to snapshot creates `vercel.json`, Dockerfile, CI workflow or Kubernetes manifest. Of old versions, clone has only those matching snapshot: `vite.mf.ts` at `faabb25`, `README.md` at `ed8c864` and `useRemoteModule.ts` at `6ff5738`. Versions of `vite.mf.ts` at `b50998d`, `406ac86` and `0f9ffc9`, `README.md` at `03aa81d` and hook at `ff692cd` and `a5bb370` are missing from clone.

Reviews 3.4.2 to 3.4.6 left no open point: no integration dependency, no `Undetermined` or inactive unit or construct, active relationship and `not observed` deploy (not `Undetermined`). Points come from `contradicted` and `partial` claims in 3.4.7. Claim 2 (Vercel, `uncorroborated`) is neither `contradicted` nor `partial` and does not become a point.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README says shell "only needs a `<script>` tag", and shell also exposes `window.React`/`window.ReactDOM` and reads `MF1_BASE_URL` | 3.4.7 #16 | conflicting stages | 6ff5738 2025-07-28 Update useRemoteModule.ts; d7937f8 2025-07-28 Update next config; faabb25 2025-07-28 Update vite.mf.ts; 03aa81d 2025-07-28 Create README.md; ed8c864 2025-07-28 Add styled components theme, update readme, cleanup | clarified |
| 2 | README mentions "shared interfaces", and types are two identical copies, one in each unit | 3.4.7 #18 | extraction | ff692cd 2025-07-28 WIP; 397b98c 2025-07-28 wip | clarified |
| 3 | Comment at `vite.mf.ts:28` says bundle could be published elsewhere, and no artifact publishes it outside `mf-1` | 3.4.7 #22 | active or abandoned | b50998d 2025-07-28 Init; 0f9ffc9 2025-07-28 wip; 397b98c 2025-07-28 wip; faabb25 2025-07-28 Update vite.mf.ts | clarified |

## Observations

**1. README says shell "only needs a `<script>` tag", and shell also exposes `window.React`/`window.ReactDOM` and reads `MF1_BASE_URL`.** Hook matches snapshot version since `6ff5738`, `shell/next.config.js` since `d7937f8` and `mf-1/vite.mf.ts` (with externals `react`/`react-dom`) since `faabb25`. All three commits precede `03aa81d`, creating README, and `ed8c864`, giving it snapshot version. README version at `03aa81d` is missing from clone, so whether sentence was already there cannot be known; in version at `ed8c864` it coexists with hook, configuration and build as in snapshot. Sentence is not a remnant of an earlier code stage: it was written or retained when shell already did what contradicts it. History does not say why README simplifies.

**2. README mentions "shared interfaces", and types are two identical copies, one in each unit.** The `mf-1/src/types/remote-components.d.ts` and `shell/src/types/mf1-remote-components.d.ts` originate in same commit, `ff692cd`, with same object, and change together in `397b98c`, again to same object, matching snapshot. No other commit touches both, and no commit creates a type file at a location common to units. Interfaces were duplicated since first presence and kept identical through copying, never in a shared module. History does not say in which unit file was written first.

**3. Comment at `vite.mf.ts:28` says bundle could be published elsewhere, and no artifact publishes it outside `mf-1`.** Bundle was always within `mf-1/public`: in `remote-components/` since `b50998d` and `remote-modules/` since `0f9ffc9`, with old bundle removed in `397b98c`. None of 17 commits creates a publication artifact (`vercel.json`, Dockerfile, workflow or Kubernetes manifest). Comment is in version at `faabb25`, snapshot version; earlier `vite.mf.ts` versions are missing from clone, so when it appeared cannot be known. Possibility never became an artifact up to snapshot: it is a noted alternative, rather than abandoned stage.

## Commands

```
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc rev-list --count 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc rev-list --count --merges 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --reverse --name-status --no-renames --format='== %h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree -r ff692cd -- mf-1/src/types/remote-components.d.ts shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree -r 397b98c -- mf-1/src/types/remote-components.d.ts shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree -r 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/src/types/remote-components.d.ts shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/src/types/remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- README.md
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- shell/next.config.js
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree b50998d -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t b50998d:mf-1/vite.mf.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 406ac86 -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 406ac86:mf-1/vite.mf.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 0f9ffc9 -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 0f9ffc9:mf-1/vite.mf.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree faabb25 -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t faabb25:mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 03aa81d:README.md   # failure: missing object
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t ed8c864:README.md
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t ff692cd   # shell quoting error: path was lost; only shows object is a commit
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t a5bb370   # same
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 6ff5738   # same
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/vite.mf.ts README.md shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree ff692cd -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t ff692cd:shell/src/hooks/useRemoteModule.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree a5bb370 -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t a5bb370:shell/src/hooks/useRemoteModule.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 6ff5738 -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 6ff5738:shell/src/hooks/useRemoteModule.ts
```

## Summary

Commits up to the snapshot: 17 (2025-07-28 to 2025-07-28). Points: 3 (clarified: 3, inconclusive: 0, resolved by the snapshot: 0).
