---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
inputs:
  clone: data/samples/mfe-sample-001/repos/varshinir07__mfe-onehub-shell-app
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Repository overview

History up to snapshot has 2 commits, both from 2025-06-05, without merges. First, `74cbf87` ("Initial commit"), creates only `README.md`. Second is snapshot itself, `1ddddc4` ("Created OneHub Shell App"): changes `README.md` and creates all other 18 files, including `package.json`, `src/webpack.config.js`, with `ModuleFederationPlugin` of host `onehub`, and `src/pages/Dashboard.jsx`, consuming remotes. Composition configuration and code therefore have no first presence before snapshot: they are introduced there. No commit removes a file.

Clone lacks contents of `README.md` version at `74cbf87` (missing object `3c7947b`); snapshot version is another object (`0c364be`). What is known about first commit is file list and message.

Of previous reviews, 3.4.2 has no dependency (plugin comes from `webpack` itself), 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct, 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy (it is `not observed`). 3.4.7 provides `contradicted` claim (#1) and `partial` claim (#5), one per point.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README calls project "MFE Remote App for OnehubShell", and snapshot has only host `onehub` | 3.4.7 #1 | conflicting stages | 74cbf87 2025-06-05 Initial commit; 1ddddc4 2025-06-05 Created OneHub Shell App | clarified |
| 2 | Host shares `react` and `react-dom` as singletons with remotes outside snapshot | 3.4.7 #5 | extraction | 74cbf87 2025-06-05 Initial commit; 1ddddc4 2025-06-05 Created OneHub Shell App | clarified |

## Observations

**1. README calls project "MFE Remote App for OnehubShell", and snapshot has only host `onehub`.** Repository had only two versions. First, `74cbf87`, has only `README.md`, without code. Second, `1ddddc4`, creates all code, already as host (`src/webpack.config.js` and `src/pages/Dashboard.jsx`), and changes README in same commit. Repository never had a version where project was a remote, and label is not a remnant of an earlier stage. History does not show whether line README.md:2 was already in README at `74cbf87` or written in `1ddddc4`, because first version contents are absent from clone. It also does not show whether label was copied from another repository. Conclusion is label and host code coexist since only version containing code.

**2. Host shares `react` and `react-dom` as singletons with remotes outside snapshot.** File lists of both commits show everything repository ever had: `README.md` and 18 host files created in `1ddddc4`. No commit creates or removes code, configuration or directory of remotes `subscription` and `ownership`. They were neither extracted nor removed from this repository: they were never here. History does not show remote locations or whether they declare same `shared`, and claim remains `partial`.

## Commands

```
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app rev-list --count 1ddddc4241157e335c1b6e39372f050aa1705c1d
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app rev-list --count --merges 1ddddc4241157e335c1b6e39372f050aa1705c1d
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 1ddddc4241157e335c1b6e39372f050aa1705c1d
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app ls-tree 74cbf87 -- README.md
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app ls-tree 1ddddc4241157e335c1b6e39372f050aa1705c1d -- README.md
docs/mfe-history-review/tools/hist.sh varshinir07__mfe-onehub-shell-app show 74cbf87:README.md   # failed: missing object (bad object)
```

## Summary

Commits up to the snapshot: 2 (2025-06-05 to 2025-06-05). Points: 2 (clarified: 2, inconclusive: 0, resolved by the snapshot: 0).
