---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
inputs:
  clone: data/samples/mfe-sample-001/repos/vigneshwaran-chandrasekaran__microfrontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Repository overview

History up to snapshot has 15 commits, from 2026-04-09 to 2026-04-14, without merges. First commit is `8be5efd` (2026-04-09, "Initial commit"), containing only `.gitignore`, `LICENSE` and `README.md`; snapshot commit is `28c70f8` (2026-04-14, "redux added in react apps"). All five application directories (`host`, `react-mfe-1`, `react-mfe-2`, `vue-mfe`, `angular-mfe`) are created together by `20b10e1` (2026-04-09, "basic micro frontend apps added"), with each manifest, webpack configuration and source; no commit up to snapshot removes a file, and snapshot root has same five directories.

Milestones relevant to points are all on 2026-04-11 and 2026-04-12, in publication-related commit sequence: `027c8f7` ("vercel app configuration added") creates a `vercel.json` in each of five directories and changes `host/webpack.config.js`; `204f174` ("fix: add root vercel.json to build host app for deployment") creates root `vercel.json`; `50e2db2` ("fix: single-domain deployment - build all MFEs into one dist folder for Vercel") changes root `vercel.json` and `package.json` and all five webpack configurations; `444c709` ("docs: add live Vercel deployment section to README") is last README change; afterward come `87ce05b`, `d99e748`, `2c4e8da`, `2e2f847` and `769c802`, production fixes in host, rewrite and Angular.

Clone reveals messages, files touched per commit and object identifiers of each version (`ls-tree`). Old version contents are absent from clone: all queried previous objects failed (`cat-file -t` and `show`), and only readable README is snapshot’s, object `d2b188c`, identical since `444c709`. When snapshot file has same identifier as an old version, it is known unchanged since then; what it said earlier is unknown.

Of previous reviews, only 3.4.6 and 3.4.7 left points. Review 3.4.2 has no unused dependency (comment citations are notes, not declared dependencies), 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive construct (all six `none` rows are comments describing in prose a construct present on another line) and 3.4.5 has no `Undetermined` relationship. In 3.4.7, claim 3 (`partial`) does not become a point: unconfirmed portion concerns independence of both external applications, with no repository artifact, and no stage, intent or copy needs clarification.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Two Vercel publication paths exist, one `vercel.json` per directory and root file with joint `dist`, while host comment describes a third arrangement through environment variables of each Vercel project. | 3.4.6 #1-#5; 3.4.7 #25, #29 | conflicting stages | 027c8f7 2026-04-11 vercel app configuration added; 204f174 2026-04-11 fix: add root vercel.json to build host app for deployment; 50e2db2 2026-04-11 fix: single-domain deployment - build all MFEs into one dist folder for Vercel; 444c709 2026-04-11 docs: add live Vercel deployment section to README; 87ce05b 2026-04-11 fix: use argv.mode instead of process.env.NODE_ENV in webpack config | clarified |
| 2 | README counts "Six independent apps" and "five child apps", matching neither six host targets nor five local applications. | 3.4.7 #4 | conflicting stages | 20b10e1 2026-04-09 basic micro frontend apps added; 444c709 2026-04-11 docs: add live Vercel deployment section to README | inconclusive |
| 3 | README says every remote uses `publicPath: 'auto'`, but Angular fixes `/angular-mfe/` in production. | 3.4.7 #28 | conflicting stages | 444c709 2026-04-11 docs: add live Vercel deployment section to README; 2e2f847 2026-04-12 fix: set Angular publicPath to /angular-mfe/ in production to fix chunk 404s | clarified |
| 4 | Vue-mfe comment says `vue` is shared to provide a single copy, but no other unit declares `vue`. | 3.4.7 #32 | conflicting stages | 20b10e1 2026-04-09 basic micro frontend apps added; 50e2db2 2026-04-11 fix: single-domain deployment - build all MFEs into one dist folder for Vercel | inconclusive |

## Observations

**1. Two publication paths.** All five per-directory `vercel.json` files are created by `027c8f7` ("vercel app configuration added") and have same objects in snapshot (`e8fc375` in host, `8ce08a2` in angular-mfe and `eb42623`, same file, in other three remotes): never changed afterward. Root `vercel.json` comes later with `204f174`, whose message announces building host for publication, and changes in `50e2db2`, whose message announces single-domain publication with all applications in one `dist`; this commit also changes root `package.json`, host configuration and all four remote configurations. Message of `87ce05b` says corrected error caused "all MFEs to load from localhost URLs in production" when Vercel runs build, and `2c4e8da` again changes only root `vercel.json`. Snapshot README, describing only joint publication, is object recorded by `444c709`, after `50e2db2`. Contents of `host/webpack.config.js` versions at `027c8f7` and `50e2db2` are absent from clone, so commit writing environment variable comment (host/webpack.config.js:8-14) or whether code ever read them is unknown; message of `87ce05b` concerns `process.env.NODE_ENV`, not URLs. Conclusion within consulted files: per-directory `vercel.json` files belong to stage of `027c8f7`, before single-domain arrangement of `50e2db2`, and never changed afterward; joint arrangement is newest and only one adjusted by following commits. Environment variable comment describes per-project arrangement, but its date could not be read. History does not show whether separate Vercel projects remained published; 3.4.6 deploy remains `Undetermined`.

**2. README count.** All five application directories exist since `20b10e1`, and no commit up to snapshot creates another application directory or removes a file, so local application count never changed in history. Snapshot README is object recorded by `444c709`; earlier versions (`2cac130`, from `20b10e1`, and `3fc50ac`, from `68bea5b`) are absent from clone, as are those of `host/src/App.jsx`, so when README.md:6-7 phrase appeared or when both external applications entered host is unknown. Conclusion: disagreement does not result from a stage with another local application count; history cannot answer whether it results from a stage with another external application count.

**3. `publicPath: 'auto'`.** Snapshot README, with README.md:528-529 phrase in publication section, is object recorded by `444c709` ("docs: add live Vercel deployment section to README"), and README never changes afterward. Angular-mfe configuration changes three times: in `50e2db2`, in `2e2f847`, whose message announces "set Angular publicPath to /angular-mfe/ in production to fix chunk 404s", and in `769c802` (zone.js). Old version contents are absent from clone, so value before `2e2f847` could not be read; available evidence is message. Conclusion within these files: README phrase predates `2e2f847`, and fixed Angular path was introduced later, according to message, as production fix; README was not updated after correction.

**4. Vue sharing.** The `vue-mfe/webpack.config.js` appears in `20b10e1` and changes only once, in `50e2db2`; host configuration and manifest change in several commits (`log` of `host/webpack.config.js` and `host/package.json`). No old version of these files is in clone, so whether comment at vue-mfe/webpack.config.js:10 existed since `20b10e1` or host ever declared `vue` is unknown. Conclusion: history does not say whether comment is remnant of another stage, intent or generic pattern explanation.

## Commands

```
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend rev-list --count 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend rev-list --count --merges 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='%h %ad %s' --date=short --reverse --name-status 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 20b10e1 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r f04a4a7 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 68bea5b -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 027c8f7 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 204f174 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 50e2db2 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 444c709 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 87ce05b -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r d99e748 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 2c4e8da -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 2e2f847 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 769c802 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 28c70f8 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='--- %h %ad%n%B' --date=short 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 20c2bb8c17e82fa121d50ebe6f7f3205d1ff710d   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d17c92928a520cf72cbd294df037af46457df793   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 396ce0e5d322304d69269c4c51fa21655bfbf050   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 1248b80290052e2188ef56d46e6cefcea3a33e76   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t db4670f4302d4f377392c286806f6162a9870058   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 3fc50ac2f608a19bec389acd124550440d2ae77b   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 2cac130e5bc136aff619bc44beaf5277894a8466   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d1e4996b488e7454c4e480774fa88f61a89aee43   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 96f7a12650b05570c50db70150466c7457c6472d   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 651362ae28a3cfa1919dbd56b1ee99d2500b125c   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t ac4ee013c5c338e13e0e54241f7e3f540e72790d   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 09fdcc8c7ece727f86005c602276acc6454973ec   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t e4962d8eca3cbbdf5488f8f3d8111b2d3eaaa729   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d6afff55d8a217291d2efb5bf05e4cfd2ae99f4c   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 2910e07af6656c10ab6c47f01a9b9eaddced17d4   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d952b29d16801e24712f108842e19cf5b02c598e   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 7fb007964ef5e5bf7bca851c0fb1c696c117bcb3   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t dd9b2cbdd760a62fd1ad3d345735a69fbc6b9710   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='%h %ad %s' --date=short --diff-filter=D --name-status 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 027c8f7 -- host/vercel.json react-mfe-1/vercel.json react-mfe-2/vercel.json vue-mfe/vercel.json angular-mfe/vercel.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 28c70f8 -- host/vercel.json react-mfe-1/vercel.json react-mfe-2/vercel.json vue-mfe/vercel.json angular-mfe/vercel.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree 20b10e1
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree 28c70f8
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='%h %ad %s' --date=short 28c70f8b2b748f07872a8dd1f56240d8a3415c05 -- vue-mfe/webpack.config.js host/webpack.config.js host/package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend show 444c709:README.md
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend show 50e2db2:angular-mfe/webpack.config.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend show 027c8f7:host/webpack.config.js   # failed: missing object (bad object)
```

## Summary

Commits up to the snapshot: 15 (2026-04-09 to 2026-04-14). Points: 4 (clarified: 2, inconclusive: 2, resolved by the snapshot: 0).
