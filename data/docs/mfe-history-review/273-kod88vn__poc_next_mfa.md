---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
inputs:
  clone: data/samples/mfe-sample-001/repos/kod88vn__poc_next_mfa
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Repository overview

5 commits up to snapshot, from 2026-04-11 to 2026-04-24. The `9afe190` (2026-04-11, "Initial commit") creates only `README.md`. The `18d620e` (2026-04-12, "init") introduces two-zone structure: `package.json`, `turbo.json`, `.gitignore`, `apps/shell`, `apps/shop` and `packages/ui` (with `Button.tsx`, `Header.tsx`, `index.ts` and `package.json`), and changes `README.md`. The `e001413` (2026-04-12, "ready for deploy") changes shell and shop `tsconfig.json` files and creates `yarn.lock`. The `3e95170` (2026-04-24, "feat:
unified brand theme pipeline, ADA normalization, URL routing policy") introduces third zone, entire `apps/duda` (with `ARCHITECTURE.md`), creates `apps/shell/app/not-found/page.tsx`, `load-root-env.js`, `package-lock.json`, `test-duda-themes.js` and tests, and changes `package.json`, `turbo.json`, shell and shop `next.config.js` files and layouts, shell homepage and `packages/ui` (`Button.tsx`, `Header.tsx`, `index.ts`). Snapshot commit `d20db82` (2026-04-24, "feat: simplify header navigation and accessibility logic") touches only `packages/ui/src/Header.tsx`, `packages/ui/src/headerThemeAccessibility.ts` and corresponding test. No commit up to snapshot removes a file (`--diff-filter=D` empty).

The `README.md` does not change after `18d620e`: object is identical in this commit and snapshot (`f5abd49`). It therefore predates `3e95170`, creating duda zone, explaining why README mentions two zones, as documentation review supposed. Same applies to `packages/ui/package.json` (object `fc2aabf` in `18d620e` and snapshot).

Clone reveals messages, dates, files created or changed per commit and object identifiers. Old version contents of changed files are absent from clone: `show 18d620e:packages/ui/src/index.ts` and `show 18d620e:apps/shop/app/layout.tsx` failed with missing objects. Only old versions whose object matches snapshot can be read, such as `README.md`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `turbo` has `turbo.json`, but only `package.json` scripts invoke it | 3.4.2 (package.json:18) | dependency use | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | clarified |
| 2 | "Independent deployability" without deploy artifact in snapshot | 3.4.7 #2 | active or abandoned | 18d620e 2026-04-12 init; e001413 2026-04-12 ready for deploy; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | clarified |
| 3 | `Button` described as part of shared design system, but no app imports it | 3.4.7 #9 | active or abandoned | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | inconclusive |
| 4 | README says cross-zone links use only `<a>`, but shell `not-found` page uses `<Link>` to `/shop` and `/duda` | 3.4.7 #13 | conflicting stages | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | clarified |
| 5 | README says `turbo.json` builds `packages/ui` before apps, but package has no `build` script | 3.4.7 #14 | conflicting stages | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | clarified |
| 6 | Shop layout comment says page uses shell layout as frame through rewrite | 3.4.7 #19 | conflicting stages | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | inconclusive |

## Observations

**1. `turbo` without invocation outside scripts.** Root `package.json` and `turbo.json` appear in `18d620e` and change once, in `3e95170`. No commit up to snapshot creates or removes a CI workflow, Dockerfile or other automation file: snapshot tree has none, and history has no removal. Only standalone scripts, `load-root-env.js` and `test-duda-themes.js`, arrive in `3e95170` and remain in snapshot. History clarifies no `turbo` invocation outside scripts was later deleted; it does not show old contents of `package.json` scripts. Dependency remains `Undetermined`.

**2. "Independent deployability".** Message of `e001413` announces "ready for deploy", but commit changes only `apps/shell/tsconfig.json` and `apps/shop/tsconfig.json` and creates `yarn.lock`. None of five commits creates or removes Dockerfile, compose, workflow, hosting manifest or proxy configuration. History clarifies missing deploy artifact is not abandonment: no version up to snapshot had one. It does not show whether project was published through a path outside repository (`.gitignore` ignores `.vercel`, but that is not an artifact).

**3. Unused `Button`.** The `packages/ui/src/Button.tsx` and `packages/ui/src/index.ts` appear in `18d620e`, together with shell and shop apps, and change in `3e95170`, same commit changing shell and shop homepage and layouts. The `README.md`, mentioning `Button`, is identical since `18d620e`. Knowing whether any app imported `Button` at `18d620e` would require reading those version contents, absent from clone (`show 18d620e:packages/ui/src/index.ts` failed with missing object). History does not say whether `Button` was used and stopped being used, or never used. Inconclusive.

**4. `<a>` versus `<Link>`.** Claim "Cross-zone links use plain `<a>` tags (not `<Link>`)" is in `README.md` since `18d620e` (same object `f5abd49` in snapshot; line was read at that commit). Page `apps/shell/app/not-found/page.tsx`, using `Link` to `/shop` and `/duda`, is created afterward in `3e95170`, together with duda zone. History clarifies claim and page belong to different stages: README was written before page existed and was not updated when it arrived. It does not show whether `Link` usage in page was intentional.

**5. `packages/ui` built before apps.** The `packages/ui/package.json` is created in `18d620e` and never changed (object `fc2aabf` in `18d620e` and snapshot), and README sentence (README.md:84) is also identical since `18d620e`. No version up to snapshot had another package manifest, so it never had a `build` script for `^build` to run. The `turbo.json` changed in `3e95170`, and earlier version contents are absent from clone, but missing script is in package manifest, not `turbo.json`. History clarifies contradiction is not a remnant of a stage where `packages/ui` had own build: it exists since sentence was written.

**6. Shell layout as frame.** The `apps/shop/app/layout.tsx` appears in `18d620e` and changes in `3e95170`, same commit changing `apps/shell/next.config.js`. Version contents at `18d620e` are absent from clone (`show 18d620e:apps/shop/app/layout.tsx` failed with missing object), as is old shell `next.config.js` version. History does not show whether comment already existed in first version or described behavior matched earlier configuration. Inconclusive.

## Commands

```
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa rev-list --count d20db8260825dc17ad4c68ac6df0595c1c59df23
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short --name-status d20db8260825dc17ad4c68ac6df0595c1c59df23
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- 'package.json turbo.json'
  # no output: both paths were passed as one (repeated separately below)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- README.md
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- packages/ui/package.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- apps/shop/app/layout.tsx
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- 'packages/ui/src/Button.tsx packages/ui/src/index.ts'
  # no output: both paths were passed as one (repeated separately below)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- apps/shell/app/not-found/page.tsx
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree 18d620e -- packages/ui/package.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree d20db8260825dc17ad4c68ac6df0595c1c59df23 -- packages/ui/package.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree 18d620e -- README.md
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree d20db8260825dc17ad4c68ac6df0595c1c59df23 -- README.md
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- package.json turbo.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- packages/ui/src/Button.tsx packages/ui/src/index.ts
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa show 18d620e:packages/ui/src/index.ts
  # failed: fatal: bad object 18d620e:packages/ui/src/index.ts (missing object in clone --filter=blob:none)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa show 18d620e:apps/shop/app/layout.tsx
  # failed: fatal: bad object 18d620e:apps/shop/app/layout.tsx (missing object in clone --filter=blob:none)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short --diff-filter=D --name-status d20db8260825dc17ad4c68ac6df0595c1c59df23
  # no output: no removal up to the snapshot
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree -r --name-only d20db8260825dc17ad4c68ac6df0595c1c59df23
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa show 18d620e:README.md
```

## Summary

Commits up to the snapshot: 5 (2026-04-11 to 2026-04-24). Points: 6 (clarified: 4, inconclusive: 2, resolved by the snapshot: 0).
