---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Mined constructs

No src-* occurrences in matches.csv.

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 0.

## Notes

- The `matches.csv` has no `src-*` rows, and the structural review’s "Units" table has no rows: the snapshot has no code from any of the five zones. They are submodules with their own repositories (.gitmodules:4-18: `apps/dashboard`, `apps/auth`, `apps/profile`, `apps/study`, `apps/decks`), and the directories do not exist in `files/`. All composition targets are outside the snapshot.
- Multi-zone composition appears only in the nginx gateway, which is deploy configuration rather than unit code: infra/nginx/routing-map.frontend.conf:1-9 maps `/dashboard`, `/auth`, `/profile`, `/study` and `/decks` to each zone’s service. It therefore does not become a manual row.
- The step 4 search found only documentation examples in `.agents/` skills (for example: `lazy(() => import('./HeavyChart'))` at .agents/skills/frontend-patterns/SKILL.md:324-325 and data rows in .agents/skills/ui-ux-pro-max/data/*.csv). These are not unit code and do not become rows.
