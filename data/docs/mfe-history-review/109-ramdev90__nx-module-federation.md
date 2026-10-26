---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
inputs:
  clone: data/samples/mfe-sample-001/repos/ramdev90__nx-module-federation
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Repository overview

History up to snapshot has 4 commits, without merges, from 2026-03-10 to 2026-03-11. First, `a6a38c9` (2026-03-10, "Initial commit"), creates Nx workspace: root files (`package.json`, `package-lock.json`, `nx.json`, `tsconfig.base.json`, `eslint.config.mjs`, `.gitignore`, `README.md` and editor configurations) and initial application `apps/microfrontend-workspace`. Next two, `9a16b67` and `3a01c2f` (2026-03-11, both "initial commit"), change only `README.md`, removed from snapshot by acquisition normalization. Last, `cf42f3f` (2026-03-11, "initial commit"), is snapshot itself: creates four federated applications (`shell`, `products`, `orders`, `customer`), each with `module-federation.config.ts`, `webpack.config.ts`, `webpack.prod.config.ts` and `project.json`, and changes `nx.json`, `package.json`, `package-lock.json` and `tsconfig.base.json`.

Thus, all Module Federation configuration and four composed units are introduced in snapshot commit. The `apps/microfrontend-workspace`, root `eslint.config.mjs` and `.gitignore` have a single commit in `log`, `a6a38c9`, and do not change up to snapshot. No commit removes a file, and none creates a CI workflow, Dockerfile or automation script.

Versions at `a6a38c9` of `package.json`, `nx.json`, `package-lock.json` and `tsconfig.base.json`, four files changed by `cf42f3f`, are unavailable in clone (`show` fails with missing objects). Thus additions or removals by `cf42f3f` in dependencies and Nx configuration cannot be seen.

Of previous reviews, 3.4.2 has three `No` dependencies (`@nx/js`, `@nx/webpack`, `@nx/workspace`) and one `Undetermined` (`nx`), each forming one point. 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct in table, 3.4.5 has no `Undetermined` relationship, 3.4.6 has no `Undetermined` deploy and 3.4.7 has no claims.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@nx/js` declared and unused | 3.4.2 (package.json:28) | dependency use | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusive |
| 2 | `@nx/webpack` declared and unused; builds use `@nx/angular:webpack-browser` | 3.4.2 (package.json:31) | dependency use | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusive |
| 3 | `@nx/workspace` declared and unused | 3.4.2 (package.json:32) | dependency use | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusive |
| 4 | `nx` has `nx.json` and `project.json`, but no invocation: empty `scripts`, no CI or automation script | 3.4.2 (package.json:41) | dependency use | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusive |

## Observations

**1. `@nx/js` declared and unused.** The `package.json` is created in `a6a38c9` and changed only in snapshot `cf42f3f`. Version at `a6a38c9` is unavailable, as is `nx.json` at same commit, where an `@nx/js` plugin could have existed. First-commit files unchanged in snapshot (`apps/microfrontend-workspace`, `eslint.config.mjs`) are those already read by 3.4.2. History does not say when dependency was declared or whether configuration before `cf42f3f` used it. Inconclusive; remains `No`.

**2. `@nx/webpack` declared and unused.** Same situation: `package.json` and `nx.json` at `a6a38c9` are unavailable, and webpack configurations of four federated units exist only from `cf42f3f`, already using executor `@nx/angular:webpack-browser`. Whether dependency arrived in `a6a38c9` or `cf42f3f`, or anything used it between them, cannot be known. Inconclusive; remains `No`.

**3. `@nx/workspace` declared and unused.** Previous versions of `package.json` and `package-lock.json` are unavailable, and no commit creates or removes a script that could invoke it. History does not say when it was declared or whether it was used. Inconclusive; remains `No`.

**4. `nx` without invocation.** Limited to created and removed paths: none of four commits creates or removes a CI workflow, Dockerfile or script file, and no commit removes a file. Thus no automation file invoking `nx` was later deleted. Remaining location, `scripts` in `package.json`, is readable only in snapshot, where it is empty (package.json:5); version at `a6a38c9` is unavailable, so whether it had scripts calling `nx` removed in `cf42f3f` cannot be known. Inconclusive; remains `Undetermined`.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation rev-list --count cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --merges --format=%h cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --format='%h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --name-status --no-renames --format='@@ %h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7   # output read omitting nx-welcome and .spec.ts lines
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --name-status --no-renames --diff-filter=D --format='@@ %h' cf42f3f1506bfe6f25a263d0763cd09cac7e84f7   # empty output: no removal
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation ls-tree a6a38c9 -- package.json nx.json README.md
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation ls-tree cf42f3f1506bfe6f25a263d0763cd09cac7e84f7 -- package.json nx.json
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:nx.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --format='%h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7 -- package.json nx.json package-lock.json tsconfig.base.json
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:package-lock.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:tsconfig.base.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --format='%h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7 -- apps eslint.config.mjs .gitignore
```

## Summary

Commits up to the snapshot: 4 (2026-03-10 to 2026-03-11). Points: 4 (clarified: 0, inconclusive: 4, resolved by the snapshot: 0).
