---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
inputs:
  clone: data/samples/mfe-sample-001/repos/Lnx117__single_spa_main
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Repository overview

History up to snapshot has a single commit, `112c73b` (2026-03-14, "init commit"), snapshot itself, without merges. It adds six repository files (`.envtest`, `index.html`, `package-lock.json`, `package.json`, `src/main.ts`, `vite.config.ts`), with their first observable presence there; there is no introduction commit or earlier version. History provides no information beyond snapshot: it shows no earlier stages, abandonment or where code was developed before first commit. Post-snapshot commits on other branches are excluded.

Of previous reviews, only 3.4.7 left a point, revisiting a note from 3.4.4. 3.4.2 has no unused dependency, 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct, 3.4.5 has no `Undetermined` relationship and deploy in 3.4.6 is `not observed`, rather than `Undetermined`. In 3.4.7, claims 1 and 13 (`partial`) do not become points: unconfirmed part depends on microfrontends `menu` and `base`, in other repositories (each Vite server, CSS isolation effect), and no stage, intention or copying can be clarified in this history. Claim 3, `uncorroborated`, is outside those raised by step 2 and did not become a point. Snapshot does not resolve remaining point: no `.gitignore` or other file explains absence of `.env`/`.env.local`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Comment in `src/main.ts` instructs defining URLs in `.env`/`.env.local`, but only versioned file containing them is `.envtest`, which Vite does not load by default | 3.4.4 (Notes); 3.4.7 #7 | conflicting stages | 112c73b 2026-03-14 init commit | inconclusive |

## Observations

**1. `.env`/`.env.local` in comment and `.envtest` in repository.** The `src/main.ts`, with comment at lines 5 and 6, and `.envtest`, with values of `VITE_MENU` and `VITE_BASE`, arrive together in sole commit and have no other version up to snapshot. No `.env` or `.env.local` appears in history up to snapshot, even as a removed file. History does not say whether file was named `.env` before first commit and renamed for versioning, or whether `.envtest` is an example copy of an `.env` maintained outside repository. Caveat in 3.4.4 and `partial` corroboration in 3.4.7 remain unchanged.

## Commands

```
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main rev-list --count 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main rev-list --count --merges 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --reverse --format='%h %ad %s' --date=short 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short --name-status 112c73b7d0bc4739bcab53de03b404ce2fbde05a
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short 112c73b7d0bc4739bcab53de03b404ce2fbde05a -- .envtest
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short 112c73b7d0bc4739bcab53de03b404ce2fbde05a -- src/main.ts
docs/mfe-history-review/tools/hist.sh Lnx117__single_spa_main log --format='%h %ad' --date=short --full-history 112c73b7d0bc4739bcab53de03b404ce2fbde05a -- .env .env.local   # empty output
```

## Summary

Commits up to the snapshot: 1 (2026-03-14 to 2026-03-14). Points: 1 (clarified: 0, inconclusive: 1, resolved by the snapshot: 0).
