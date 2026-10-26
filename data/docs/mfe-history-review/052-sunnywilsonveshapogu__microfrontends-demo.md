---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
inputs:
  clone: data/samples/mfe-sample-001/repos/sunnywilsonveshapogu__microfrontends-demo
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Repository overview

History up to snapshot has 3 commits, all on 2025-09-27, with one merge.
- **`31e1ab9` ("Initial commit"):** creates only `.gitignore`, README and root `package.json`, matching state described by README as "already exists".
- **`5e5227d` ("Add complete microfrontend architecture with Module Federation"):** creates all three applications.
- **`f56f903`:** merge of this branch and snapshot commit.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | All three applications require a `public/index.html` absent from snapshot | 3.4.3 (header-mf, products-mf and shell `Undetermined`); 3.4.7 #1, #3, #8 | active or abandoned | 31e1ab9 2025-09-27 Initial commit; 5e5227d 2025-09-27 Add complete microfrontend architecture with Module Federation | resolved by the snapshot |

## Observations

**1. All three applications require a `public/index.html` absent from snapshot.** Snapshot itself bounds point: root `.gitignore` ignores `public` (.gitignore:79), a rule compatible with missing templates. History agrees: `.gitignore` comes from first commit, and no observed historical tree contains a path with `public/`. Templates were never versioned, not deleted. Whether they were ever created locally cannot be confirmed. This covers portion of "complete" and "production-ready" claims depending on templates. Missing deploy and remotes at `localhost`, also cited against "production-ready", are unrelated to this rule.

## Commands

```
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo rev-list --count f56f903190312e938d0ad5a9a146ad4dbe333589
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo rev-list --count --merges f56f903190312e938d0ad5a9a146ad4dbe333589
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo log --format='%h %ad %s' --date=short f56f903190312e938d0ad5a9a146ad4dbe333589
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo show --name-status --no-renames --format='== %h' 31e1ab9
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo show --name-status --no-renames --format='== %h' 5e5227d
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo log --format='%h %ad' --date=short f56f903190312e938d0ad5a9a146ad4dbe333589 -- .gitignore
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo ls-tree -r --name-only 31e1ab9
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo ls-tree -r --name-only 5e5227d
docs/mfe-history-review/tools/hist.sh sunnywilsonveshapogu__microfrontends-demo ls-tree -r --name-only f56f903190312e938d0ad5a9a146ad4dbe333589
```

## Summary

Commits up to the snapshot: 3 (2025-09-27 to 2025-09-27). Points: 1 (clarified: 0, inconclusive: 0, resolved by the snapshot: 1).
