---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
inputs:
  clone: data/samples/mfe-sample-001/repos/LaurineLeNet__microfrontend-angular-angular
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Repository overview

History up to snapshot has 4 commits, from 2026-05-14 to 2026-06-08. First observable presence of three directories, manifests and federation configurations is initial commit `73c274c` (2026-05-14, “working”); this does not reveal where code was produced before. Two intermediate commits, `3e43cf2` (2026-05-26, “routing in athlete”) and `686b898` (2026-05-29, “routing”), change athletes and shell files, but not manifests. Last, `342c92d` (2026-06-08, “feat: deployment”), modifies three package.json files, replaces package-lock.json files with bun.lock, adds wrangler.jsonc files and remote _headers, and modifies shell remote manifest. Operations were observed in name and status listing; old package.json version contents could not be read.

Reviews 3.4.2 to 3.4.7 leave three points about same package, declared separately in each application. No Undetermined unit or relationship, inactive construct or partial or contradicted documentary claim adds points. Literal snapshot search excluding bun.lock finds `@softarc/native-federation-node` only at line 22 of three package.json files. This confirms uncertainty scope but does not explain declaration origins. Three initial manifests exist in historical tree, but reading them fails with `bad object`: blobs are unavailable locally. Accessible history cannot distinguish earlier usage, abandonment, copying or declaration never connected. The No judgments in 3.4.2 remain those of snapshot.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` is declared and unused in athletes | 3.4.2 (athletes/package.json:22) | dependency use | 73c274c 2026-05-14 working; 342c92d 2026-06-08 feat: deployment | inconclusive |
| 2 | `@softarc/native-federation-node` is declared and unused in ranking | 3.4.2 (ranking/package.json:22) | dependency use | 73c274c 2026-05-14 working; 342c92d 2026-06-08 feat: deployment | inconclusive |
| 3 | `@softarc/native-federation-node` is declared and unused in shell | 3.4.2 (shell/package.json:22) | dependency use | 73c274c 2026-05-14 working; 342c92d 2026-06-08 feat: deployment | inconclusive |

## Observations

**1. Unused dependency in athletes.** The `athletes/package.json` appears in initial commit and is modified again only in snapshot. Initial version is listed by `ls-tree`, but reading attempt fails with missing object. Thus whether package was already declared before snapshot or final change adds or only retains it could not be verified. Athletes code files also change in intermediate commits; path listing does not demonstrate earlier package usage. Result is inconclusive, without sufficient evidence to attribute abandonment or intention to declaration.

**2. Unused dependency in ranking.** The `ranking/package.json` has same sequence of creation in initial commit and modification in snapshot. Initial blob is also missing. Complete change listing records no ranking code or configuration file changes after first observable presence, but this reveals neither old manifest contents nor declaration explanation. Abandonment, copying or planning cannot be concluded; point remains inconclusive.

**3. Unused dependency in shell.** The `shell/package.json` is created in initial commit and modified in snapshot, with initial version unavailable for reading. Routes and dashboard change in `3e43cf2`, and remote manifest changes in `342c92d`; these path records do not demonstrate usage of `@softarc/native-federation-node`. Last commit message announces deployment without explaining dependency. No basis decides whether it was previously used or why remained declared, so result is inconclusive.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular log --reverse --format='%H %ad %s' --date=short --name-status --no-renames 342c92dff482f1ee0a4bcc05f9302361a7354352
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular show 73c274ce47d5ca0572844ecbfbbf89593089f6be:athletes/package.json
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular show 73c274ce47d5ca0572844ecbfbbf89593089f6be:ranking/package.json
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular show 73c274ce47d5ca0572844ecbfbbf89593089f6be:shell/package.json
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular rev-list --count 342c92dff482f1ee0a4bcc05f9302361a7354352
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular ls-tree -r 73c274ce47d5ca0572844ecbfbbf89593089f6be
```

Three `show` queries failed with `fatal: bad object <revisão>:<caminho>` due to missing historical blobs; no objects were fetched. All queried revisions are snapshot or ancestors identified in its log.

Before and after queries, comparison below ended with code 0, without differences:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 4 (2026-05-14 to 2026-06-08). Points: 3 (clarified: 0, inconclusive: 3, resolved by the snapshot: 0).
