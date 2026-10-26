---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inputs:
  clone: data/samples/mfe-sample-001/repos/pmathulan__frontend-coding-exercises
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Repository overview

History up to snapshot has a single commit, `89a3c27` (2025-05-07, "first commit"), snapshot itself. All six exercises arrived at once, and history provides no information beyond snapshot.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Shell route `mfe2` is commented out | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:17) | active or abandoned | 89a3c27 2025-05-07 first commit | inconclusive |
| 2 | Chart `spa-helm/` connects to no application | 3.4.6 (Deploy `Undetermined`) | active or abandoned | 89a3c27 2025-05-07 first commit | inconclusive |
| 3 | Workspace README cites an alias in `tsconfig.base.json`, a nonexistent file | 3.4.7 #10 | conflicting stages | 89a3c27 2025-05-07 first commit | inconclusive |

## Observations

**1. Shell route `mfe2` is commented out.** Routes file arrives with route already commented out in only commit. Whether it worked before first commit or was only planned cannot be known.

**2. Chart `spa-helm/` connects to no application.** Chart arrives with exercises in only commit, and history does not say which it was designed for.

**3. Workspace README cites an alias in `tsconfig.base.json`, a nonexistent file.** README and `tsconfig.json` arrive together in only commit, without any version containing `tsconfig.base.json` in history. Whether README describes organization before first commit cannot be known.

## Commands

```
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises rev-list --count 89a3c271484ece4e37f719db9093c9157721a240
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises rev-list --count --merges 89a3c271484ece4e37f719db9093c9157721a240
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --reverse --format='%h %ad %s' --date=short 89a3c271484ece4e37f719db9093c9157721a240
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- microfrontend-workspace/projects/shell/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- spa-helm
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- microfrontend-workspace/README.md
docs/mfe-history-review/tools/hist.sh pmathulan__frontend-coding-exercises log --format='%h %ad' --date=short 89a3c271484ece4e37f719db9093c9157721a240 -- microfrontend-workspace/tsconfig.json
```

## Summary

Commits up to the snapshot: 1 (2025-05-07 to 2025-05-07). Points: 3 (clarified: 0, inconclusive: 3, resolved by the snapshot: 0).
