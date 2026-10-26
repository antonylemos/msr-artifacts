---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
inputs:
  clone: data/samples/mfe-sample-001/repos/SABHGG__odin-replica
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Repository overview

History up to snapshot has 2 commits, without merges, from 2026-03-11 to 2026-03-16. First, `80616f7` (2026-03-11, "Initialize project using Create React App"), creates the 18 CRA scaffold files: `.gitignore`, `README.md`, `package.json`, `package-lock.json`, `public/` and `src/` files (`App.js`, `App.css`, `App.test.js`, `index.js`, `index.css`, `logo.svg`, `reportWebVitals.js`, `setupTests.js`). Second is snapshot itself, `06ce2bd` (2026-03-16, "feat: update dependencies and implement single-spa for microfrontend architecture"): it changes `package.json`, `package-lock.json`, `src/App.js`, `src/App.css` and `src/index.js` and creates `src/root.app.js`. No commit removes a file. Observable introduction of the single-spa root is therefore `06ce2bd`; its message announces single-spa implementation in this commit.

Clone has trees of both commits (`ls-tree -r` worked for both), but not old contents of files changed by `06ce2bd`: `show` at `80616f7` failed with missing objects for `src/index.js`, `package.json` and `src/App.js`. What is known about `80616f7` is its file list and message. Unchanged files (`README.md`, `.gitignore`, `public/*`, `src/App.test.js`, `src/index.css`, `src/logo.svg`, `src/reportWebVitals.js`, `src/setupTests.js`) have the same object identifier in both commits.

Of previous reviews, 3.4.2 has no unused dependency (both rows are `Yes`), 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct, 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy (it is `not observed`). Of four `partial` or `contradicted` claims in 3.4.7, the two remaining partial because the remote is outside snapshot (#5, #7) became one point; #8 and #9 are separate points. The `uncorroborated` claim (#1) is outside those raised by step 2 and did not become a point.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | The "Angular" remote `leadocs-angular`, expected to publish global `leapdocs`, has no code, `angular.json` or dependency in snapshot | 3.4.7 #5, #7 | extraction | 80616f7 2026-03-11 Initialize project using Create React App; 06ce2bd 2026-03-16 feat: update dependencies and implement single-spa for microfrontend architecture | clarified |
| 2 | Console message requests `libraryName` `leadocs` in `angular.json`, and code reads global `leapdocs` | 3.4.7 #8 | conflicting stages | 80616f7 2026-03-11 Initialize project using Create React App; 06ce2bd 2026-03-16 feat: update dependencies and implement single-spa for microfrontend architecture | clarified |
| 3 | Comment in `src/root.app.js` mentions dynamic import, and sole consumer imports file statically | 3.4.7 #9 | conflicting stages | 06ce2bd 2026-03-16 feat: update dependencies and implement single-spa for microfrontend architecture | clarified |

## Observations

**1. Angular remote outside snapshot.** Complete trees of both commits have only CRA scaffold files and, starting at `06ce2bd`, `src/root.app.js`. Neither has `angular.json`, an Angular project directory, `main.ts` or another remote file, and no commit removes files. Conclusion limited to this repository: remote was never here, so its absence does not result from extraction or versioned removal; since `06ce2bd`, host was written to load an external bundle (src/index.js:7-9). History does not show where remote exists, whether it is Angular or publishes `leapdocs`. Claims remain `partial`.

**2. `leadocs` in message and `leapdocs` in code.** `src/index.js` has only two versions: `80616f7`, whose message announces CRA initialization, and snapshot `06ce2bd`, simultaneously containing message with `leadocs` (src/index.js:83) and access to `globalThis.leapdocs` (src/index.js:69, 78). Version at `80616f7` is unavailable, so absence of single-spa code there comes from both commit messages and `src/root.app.js`, imported by snapshot (src/index.js:4), appearing only in `06ce2bd`. No subsequent commit exists. Conclusion limited to this file: message and accessed global arrive together in the commit introducing single-spa root, and discrepancy does not come from a message lagging behind a later versioned change. History does not show whether any remote bundle was built with `leadocs`. Claim remains `contradicted`.

**3. "Dynamic import" of `src/root.app.js`.** `src/root.app.js` does not exist in `80616f7` and is created in `06ce2bd`, also the only version of `src/index.js` with static `import RootApp from
'./root.app'` (src/index.js:4) and loading function returning that object (src/index.js:58): before `06ce2bd` there was no file to import, and afterward there is no other commit. Conclusion: comment and static import originated in the same commit; comment is not a remnant of a versioned stage where file was imported dynamically. Claim remains `contradicted`.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica rev-list --count 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica log --merges --format='%h' 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica log --name-status --format='@@ %h %ad %s' --date=short 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica show 80616f7:src/index.js      # failed: missing object
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica show 80616f7:package.json      # failed: missing object
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica show 80616f7:src/App.js      # failed: missing object
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica ls-tree -r 80616f7
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica ls-tree -r 06ce2bd578663f88243854f6eef292686660dfce
docs/mfe-history-review/tools/hist.sh SABHGG__odin-replica log --format='%h %ad %s' --date=short 06ce2bd578663f88243854f6eef292686660dfce -- src/index.js src/root.app.js package.json
```

## Summary

Commits up to the snapshot: 2 (2026-03-11 to 2026-03-16). Points: 3 (clarified: 3, inconclusive: 0, resolved by the snapshot: 0).
