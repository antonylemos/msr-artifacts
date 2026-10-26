---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
inputs:
  clone: data/samples/mfe-sample-001/repos/anish0714__devpulse-mfe
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Repository overview

History up to snapshot has 20 commits, from 2026-09-01 to 2026-09-07, with 7 pull request merges. First commit is `310dc85` (2026-09-01, "Initial commit: DevPulse micro-frontend showcase"), and snapshot commit is `6a2348d` (2026-09-07, "Merge pull request #11 from anish0714/redesign/terminal-theme"). All commits except last two are from same day.

Milestones relevant to points: first commit message announces shell with two demonstration remotes (`analytics-remote` and `notes-remote`) and CI/CD that "assembles a single GitHub Pages deployment". The `d31bfed` (2026-09-01, "Split CI/CD into per-package CI checks and a main-only deploy pipeline (#1)") creates `ci.yml` and modifies `deploy.yml`; `f4321e2` (2026-09-01, "Consolidate remotes into pdf-conversion and pdf-manipulation tools (#2)") replaces demonstration remotes with two PDF remotes and adjusts both workflows. Other three remotes appear afterward, one per commit: `25e6a9b` (dev-utils), `5062d12` (PDF forms) and `fcca491` (OCR), all on 2026-09-01.

Clone reveals messages, files touched per commit and object identifiers of each version. Old content is only partly available: workflow versions at `f4321e2` (same as snapshot) and `25e6a9b` could be read; those of first commit and `d31bfed`, and all previous `README.md` versions, are absent from clone. Thus commit introducing README phrases discussed below is unknown.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README says units are "independently deployed", but only deploy workflow publishes everything in one site. | 3.4.7 #2 | conflicting stages | 310dc85 2026-09-01 Initial commit: DevPulse micro-frontend showcase; f4321e2 2026-09-01 Consolidate remotes into pdf-conversion and pdf-manipulation tools (#2); 25e6a9b 2026-09-01 Add Dev Utils remote: JSON, Base64/URL, UUID/hash, and a regex tester | clarified |
| 2 | README describes CI and site with all six packages, but workflows cover only shell and PDF conversion and manipulation remotes. | 3.4.7 #7, #15, #17 | conflicting stages | f4321e2 2026-09-01 Consolidate remotes into pdf-conversion and pdf-manipulation tools (#2); 25e6a9b 2026-09-01 Add Dev Utils remote: JSON, Base64/URL, UUID/hash, and a regex tester; d0b0a84 2026-09-01 Revert workflow-file edits (push blocked without workflow OAuth scope); 5062d12 2026-09-01 Add PDF Form Filler remote: fill real interactive AcroForm fields; fcca491 2026-09-01 Add OCR remote: extract text from images or scanned PDFs (tesseract.js) | clarified |

## Observations

**1. Deploy "independently deployed".** First commit message (`310dc85`) already announces CI/CD building everything and "assembles a single GitHub Pages deployment (shell at the root, remotes under /remotes/<name>/)". Both readable `deploy.yml` versions, at `f4321e2` (same as snapshot, object `ea6a2e7`) and `25e6a9b`, assemble one directory `site` and publish it as one Pages artifact; version at `25e6a9b` only adds copying dev-utils `dist`. Message of `d31bfed` discusses separating deploy from pull request validation ("deploy.yml is now deploy-only"), not per-package deploy. Contents of `deploy.yml` at first commit and `d31bfed` are absent from clone, and no old README version could be read, so phrase’s appearance cannot be dated. Conclusion within what was read: neither observable versions nor messages show a per-unit deploy stage; README phrase describes intended architecture, not an earlier repository state later abandoned.

**2. Packages outside CI and site.** The `25e6a9b` changes `ci.yml`, `deploy.yml` and `README.md`; readable workflow version at this commit adds `dev-utils-remote` to CI matrix and copies its `dist` to `site/remotes/dev-utils/`. Following commit, `d0b0a84`, returns both workflows to objects at `f4321e2` (`65ce162` for `ci.yml`, `ea6a2e7` for `deploy.yml`), and message explains: "push blocked without workflow OAuth scope" and "ci.yml and deploy.yml still need the dev-utils-remote matrix entry and deploy path added manually". Messages of `5062d12` and `fcca491` announce these commits update README but do not touch workflows due to same limitation, calling PDF forms and OCR second and third remotes "pending that follow-up". No later commit up to snapshot touches `.github/`, and both snapshot workflow objects match `f4321e2`. Old README contents are absent from clone; knowledge of them comes from messages. Conclusion: snapshot workflows belong to stage with shell and two remotes, while README describes next stage with six packages; connecting three remotes to CI and deploy was planned but not completed by snapshot because of a push permission block, not abandonment.

## Commands

```
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe rev-list --count 6a2348d162b34030505554ab0ef954577627999a
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe log --format='%h %ad %s' --date=short --reverse 6a2348d162b34030505554ab0ef954577627999a
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe log --format='%h %ad %s' --date=short --name-status 6a2348d162b34030505554ab0ef954577627999a -- .github README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short d0b0a84
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short 25e6a9b
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short d31bfed
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short f4321e2   # failed: missing object (could not fetch 613b75b…)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short 310dc85
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short 5062d12
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short fcca491
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 310dc85 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r d31bfed -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r f4321e2 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r ec611f4 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 25e6a9b -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r d0b0a84 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 16ca753 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 6a2348d -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe log --format='--- %h %ad%n%B' --date=short f4321e2
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 25e6a9b:.github/workflows/deploy.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 25e6a9b:.github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 310dc85:.github/workflows/deploy.yml   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 310dc85:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:.github/workflows/deploy.yml   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show f4321e2:.github/workflows/deploy.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show f4321e2:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show ec611f4:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 25e6a9b:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 5062d12:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show fcca491:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 6a2348d:README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:.github/workflows/deploy.yml   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:.github/workflows/ci.yml   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show f4321e2:.github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe rev-list --count --merges 6a2348d162b34030505554ab0ef954577627999a
```

## Summary

Commits up to the snapshot: 20 (2026-09-01 to 2026-09-07). Points: 2 (clarified: 2, inconclusive: 0, resolved by the snapshot: 0).
