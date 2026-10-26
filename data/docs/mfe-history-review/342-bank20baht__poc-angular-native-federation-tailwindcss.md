---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
inputs:
  clone: data/samples/mfe-sample-001/repos/bank20baht__poc-angular-native-federation-tailwindcss
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Repository overview

Reachable history up to snapshot has 11 commits, from 2025-09-04 to 2025-09-19. First observable presence of both manifests and federation configurations is `bb8b5ac` (2025-09-04, "feat: module federation with native federation in angular 20"), first commit; this does not reveal where artifacts were developed before. Snapshot is `d2f9722` (2025-09-19, "Merge branch 'feature/tailwindcss@4' of github.com:bank20baht/poc-angular-native-federation"). Between them, messages announce style experiments: `f61b3c0` (2025-09-13, "feat: can render style from remote but tailwindcss host must scan remote first (tailwindcss.config.js)") and `bf201ac` (2025-09-17, "feat: using tailwindcss@4 and daysiui@5 in this project"). Messages do not replace reading change contents.

Snapshot confirms no direct usage of `@softarc/native-federation-node` in either package and no consumption of `remote/Styles?inline`; it does not explain remnant origins. Filename and status queries locate changes, but four attempts to read old contents failed with missing objects. Thus neither abandonment of earlier usage nor artifacts only planned or copied can be concluded. No `Undetermined` unit or relationship, `Undetermined` deploy or partial or contradicted documentary claim adds a point. Remote README port detail was already resolved by snapshot and excluded from documentary table; it generates no historical point.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` is declared in both packages without observed direct usage; was there earlier usage? | 3.4.2 (host/package.json:31; remote/package.json:31) | dependency use | bb8b5ac, 2025-09-04, feat: module federation with native federation in angular 20; f61b3c0, 2025-09-13, feat: can render style from remote but tailwindcss host must scan remote first (tailwindcss.config.js); bf201ac, 2025-09-17, feat: using tailwindcss@4 and daysiui@5 in this project | inconclusive |
| 2 | Does unconsumed declaration `remote/Styles?inline` correspond to abandoned style composition? | 3.4.4, Notes (host/src/remote.d.ts:1); 3.4.5, Repository overview (same artifact) | active or abandoned | f61b3c0, 2025-09-13, feat: can render style from remote but tailwindcss host must scan remote first (tailwindcss.config.js); 3c1e13e, 2025-09-14, feat: import remote routes to host, and create fallback components, fallback routes | inconclusive |

## Observations

**1. Dependency without direct usage.** In snapshot, literal search for `@softarc`, excluding lockfiles, returns only host/package.json:31 and remote/package.json:31; entries and configurations use `@angular-architects/native-federation`. Path log shows manifest creation in `bb8b5ac` and changes in `f61b3c0`, `82481eb` (2025-09-13, "feat: use daysiui@4 in project but require import class in safelist") and `bf201ac`. Contents of both manifests at `bb8b5ac` are unavailable: both queries failed. Creation and changes do not demonstrate when dependency arrived or whether ever used. Queried history cannot attribute snapshot `No` to abandonment, intention or copying; result is inconclusive and judgment in 3.4.2 remains explained only by snapshot evidence.

**2. Style declaration without consumer.** Snapshot contains declaration at host/src/remote.d.ts:1, without corresponding import or exposure `./Styles` at remote/federation.config.js:7-10; current style comes from scanning remote code through host/src/styles.css:2-5. Log with `--full-history` shows `f61b3c0` adding declaration file and modifying host route table and remote federation configuration. It records no later declaration change up to snapshot. Commit message announces need for host Tailwind to scan remote; it does not assert usage of `remote/Styles?inline`. Attempts to read routes and remote configuration at this version failed with missing objects. Log also records later changes to these paths, including `3c1e13e`, whose message announces routes and fallbacks. Knowing when declaration appeared proves neither connection nor abandonment. Remnant origin remains inconclusive, without changing active composition interpretation in snapshot.

## Commands

Queries below were limited to snapshot or commits found in its reachable history. Four `show` queries failed with `fatal: bad object` due to missing contents, without fetching objects.

```sh
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss log --format='%h %ad %s' --date=short d2f9722e77b754318c831138d54aebbfd093ee1e
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss log --full-history --reverse --format='%h %ad %s' --date=short --name-status d2f9722e77b754318c831138d54aebbfd093ee1e -- host/package.json remote/package.json host/src/remote.d.ts host/src/main.ts host/src/app/app.routes.ts host/federation.config.js remote/federation.config.js
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show bb8b5ac:host/package.json
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show bb8b5ac:remote/package.json
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show f61b3c0:host/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show f61b3c0:remote/federation.config.js
```

Before and after queries, comparison below ended with code 0, without differences:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 11 (2025-09-04 to 2025-09-19). Points: 2 (clarified: 0, inconclusive: 2, resolved by the snapshot: 0).
