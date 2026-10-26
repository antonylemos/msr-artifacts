---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
inputs:
  clone: data/samples/mfe-sample-001/repos/angelantilantil-web__micro-frontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Repository overview

History up to snapshot has 12 commits, one merge, from 2026-05-03 to 2026-07-10. First commit, `c7a7aa3` (2026-05-03, "Initial commit: HDFC micro-frontend project with host-app and remote modules"), already includes host and nine remotes at that time (accounts, business-reports, cards, incoming-api-logs, loans, maker-requests, model-portfolio-configuration, outgoing-api-logs, vro-uploads), with `DOCUMENTATION.md`, `README.md`, `webpack.config.js`, `src/` and start-all-modules.bat: first observable presence of these artifacts, rather than introduction. The `89278d2` (2026-05-03, "Revise project title and description in README") changes only README. The `a1d2264` (2026-05-25, "testing") is only commit changing host after first: creates `ai-agent-module/` and `ai-agent-backend/`, changes host-app/src/App.js, host-app/webpack.config.js, start-all-modules.bat, README and outgoing-api-logs and vro-uploads code and CSS; `fd2169b` (2026-05-25) merges this commit with `89278d2`. Following commits concern backend model files and Git LFS (`56e2c5c`, `1e6cca3`, `0ea24ad`, 2026-05-27) and uploading and deleting openapi-mcp-server.zip (`6a5dd52` to `a5b4cae`, 2026-07-09 and 2026-07-10).

Clone lacks queried old version contents: versions at `c7a7aa3` of host-app/webpack.config.js, host-app/src/App.js, start-all-modules.bat and README.md, and README at `89278d2`, are unavailable locally. Versions of host-app/src/App.js, host-app/webpack.config.js and start-all-modules.bat at `a1d2264` have same objects as snapshot. Points below therefore have file lists per commit and object identifiers, rather than host contents before `a1d2264`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Host defines and publishes global event bus without publishing anything on it, and only subscribers, also seeking shared store (`getAccounts`/`getCards`/`getLoans`) absent from bus, are three modules host does not load | 3.4.4 (host-app/src/App.js:6); 3.4.7 #17, #23, #24, #34, #35, #45, #46 | active or abandoned | c7a7aa3 2026-05-03 Initial commit: HDFC micro-frontend project with host-app and remote modules; a1d2264 2026-05-25 testing | inconclusive |
| 2 | Documentation and start-all-modules.bat say host loads all modules, including accounts, cards and loans, and host declares only seven remotes, excluding these three | 3.4.7 #11, #22, #33, #44, #55 | conflicting stages | c7a7aa3 2026-05-03 Initial commit: HDFC micro-frontend project with host-app and remote modules; a1d2264 2026-05-25 testing | inconclusive |
| 3 | Remote `DOCUMENTATION.md` files promise isolated styles, and stylesheets use global selectors loaded by `style-loader`/`css-loader` without scope | 3.4.7 #21, #28, #32, #43, #48, #51, #54, #57 | conflicting stages | c7a7aa3 2026-05-03 Initial commit: HDFC micro-frontend project with host-app and remote modules; a1d2264 2026-05-25 testing | clarified |

## Observations

**1. Event bus without publisher and missing shared store.** Three subscribers (accounts-module/src/App.js, cards-module/src/App.js, loans-module/src/App.js) exist in first commit and do not change up to snapshot: no commit touches accounts-module, cards-module or loans-module after `c7a7aa3`, and objects of these `App.js` files at `c7a7aa3` match snapshot. Host side, host-app/src/App.js, changes once in `a1d2264` ("testing"), and version at `c7a7aa3` is unavailable in clone. Thus history does not show whether first-commit bus had publisher or methods `getAccounts`/`getCards`/`getLoans`, or host previously loaded subscribers; message "testing" does not say what changed. README, containing claim #17 (README.md:135), changes in `89278d2` and `a1d2264`, and its old versions are also unavailable. Conclusion: whether bus is a remnant of a stage where it communicated or was never connected is unknown.

**2. "Each module" loaded by host, without accounts, cards and loans.** Root DOCUMENTATION.md (#11) and `DOCUMENTATION.md` files of accounts, cards and loans (#22, #33, #44) exist in first commit and never change up to snapshot, as does all three-module content. Loading side changes: host-app/webpack.config.js, host-app/src/App.js and start-all-modules.bat (#55) change only in `a1d2264`, same commit creating ai-agent-module, loaded by host in snapshot (host-app/webpack.config.js:54). Versions at `c7a7aa3` of these three files are unavailable (`show` and `cat-file -e` fail), and objects differ from `a1d2264`. History therefore shows documentation naming all three as loaded is from first commit and host changed afterward, but not whether host at `c7a7aa3` declared accounts, cards and loans and lost them in `a1d2264`, or never declared them. Conclusion: inconclusive.

**3. "Isolated" styles with global selectors.** The `DOCUMENTATION.md` files with eight claims exist in first commit and never change up to snapshot. Remote `webpack.config.js` files, containing rule `use: ['style-loader', 'css-loader']` (line 39 of each in snapshot), also exist in first commit and do not change: only `webpack.config.js` changed afterward is host file, in `a1d2264`. Stylesheets of accounts, business-reports, cards, loans, maker-requests and model-portfolio-configuration are unchanged since `c7a7aa3`; those of outgoing-api-logs (#54) and vro-uploads (#57) change in `a1d2264`, without old contents, but their loading configuration dates from first commit. Thus queried artifacts have isolation promise and unscoped CSS configuration coexisting since first observable presence: no commit creates or removes a scoping mechanism in remote configurations. History does not show both stylesheet contents before `a1d2264` or text origins, possibly written before first commit.

## Commands

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # before: no difference
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend rev-list --count a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short --reverse a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short --name-status --reverse a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- host-app/webpack.config.js host-app/src/App.js
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- accounts-module cards-module loans-module
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- DOCUMENTATION.md accounts-module/DOCUMENTATION.md cards-module/DOCUMENTATION.md loans-module/DOCUMENTATION.md start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree c7a7aa3 -- host-app/webpack.config.js host-app/src/App.js start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree a1d2264 -- host-app/webpack.config.js host-app/src/App.js start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree a5b4cae18e6c3266d737894bba07c24b0959805b -- host-app/webpack.config.js host-app/src/App.js start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend cat-file -e d3278f6204d681d4e62c21a55b7929932820d9e6   # failed: missing object (exit 1)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:host-app/webpack.config.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:host-app/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:start-all-modules.bat   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- '*/DOCUMENTATION.md' DOCUMENTATION.md
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short --name-status a5b4cae18e6c3266d737894bba07c24b0959805b -- '*/src/styles.css' '*/webpack.config.js'
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s%n%b' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- README.md
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%H %ad %s%n%b' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- host-app
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend rev-list --count --merges a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %p %ad %s' --date=short --merges a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show 89278d2:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend cat-file -e 0f6c5625743b470f43aabed32cd921d5f8b42de9   # failed: missing object (exit 1)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree c7a7aa3 -- loans-module/src/App.js accounts-module/src/App.js cards-module/src/App.js
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree a5b4cae18e6c3266d737894bba07c24b0959805b -- loans-module/src/App.js accounts-module/src/App.js cards-module/src/App.js
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- ai-agent-module/src/App.js
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # after: no difference
```

## Summary

Commits up to the snapshot: 12 (2026-05-03 to 2026-07-10). Points: 3 (clarified: 1, inconclusive: 2, resolved by the snapshot: 0).
