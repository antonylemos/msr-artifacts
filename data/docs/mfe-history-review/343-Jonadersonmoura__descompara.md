---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
inputs:
  clone: data/samples/mfe-sample-001/repos/Jonadersonmoura__descompara
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Repository overview

History up to snapshot contains a single commit, without parents: `3dd5146` (2026-07-29, “inclusão do projeto (English translation: "project inclusion")”). The `log --name-status` records manifest, lockfile, four Angular applications, Native Federation configurations, shared libraries and README as additions. This is first observable presence of artifacts in this history; earlier development cannot be dated or gradual composition introduction or application extraction reconstructed.

Previous review uncertainties already coexist in first version: dependencies declared without usage or with undetermined usage, possible communication through `AuthService` and shell descriptions differing from code. Commit manifest was read through `hist.sh`; to compare README and code, snapshot files in `data/acquisitions/mfe-corpus-001/corpus/Jonadersonmoura__descompara/files/` were read. No earlier revision reachable from snapshot commit explains difference origins. No missing object failure occurred in queries performed.

Claim 7 in documentary review, about name “Module Federation” at README.md:31, does not become a historical point: README.md:3 already names `@angular-architects/native-federation`, and this stage INSTRUCTIONS.md excludes naming inaccuracies resolved by snapshot itself. This does not change corroboration assigned in 3.4.7. No undetermined unit exists in 3.4.3 or undetermined deploy in 3.4.6; latter records deploy not observed. Seven points below remain inconclusive on historical questions without changing snapshot judgments.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Is unused declaration of `@module-federation/enhanced` a remnant of another mechanism or preparation never connected? | 3.4.2 (package.json:18, Configured No) | dependency use | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |
| 2 | Does unused declaration of `@nx/module-federation` correspond to earlier or planned configuration? | 3.4.2 (package.json:23, Configured No) | dependency use | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |
| 3 | Did declaration of `@nx/webpack` and defaults for unused executor come from earlier build? | 3.4.2 (package.json:27, Configured No; Notes, nx.json:67-77) | dependency use | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |
| 4 | Does `@softarc/native-federation-orchestrator` participate in execution path used by project? | 3.4.2 (package.json:31, Configured Undetermined) | dependency use | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |
| 5 | Is `AuthService` instance shared across remotes, making communication channel active? | 3.4.4 (libs/shared/data-access/src/lib/auth.service.ts:8, Undetermined); 3.4.5 #4-#6 | active or abandoned | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |
| 6 | Do navbar and home attributed to shell in README belong to another application stage? | 3.4.7 #4 (README.md:19, repeated at :81) | conflicting stages | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |
| 7 | Did shell route protection described by README precede remote guards and login? | 3.4.7 #4 (guards) and #5 (README.md:27, :56); 3.4.4 (Notes); 3.4.5 (Overview) | conflicting stages | 3dd5146, 2026-07-29, inclusão do projeto (English translation: "project inclusion") | inconclusive |

## Observations

**1. `@module-federation/enhanced`.** Manifest read in sole commit already declares package at package.json:18, and same commit adds Native Federation configurations and shell routes. No earlier manifest change or configuration version distinguishes removed usage, planning or mere excess declaration. Coexistence proves neither abandonment nor intention; remains Configured No in 3.4.2, with inconclusive historical explanation.

**2. `@nx/module-federation`.** Declaration at package.json:23 is in same initial manifest. Addition list includes four `federation.config.mjs` files and `project.json` files, without recorded earlier stage. History does not show whether package ever configured another federation or why remained declared. The No in 3.4.2 does not change.

**3. `@nx/webpack`.** Initial manifest declares package at package.json:27, and sole commit also adds nx.json and each application targets. Dependency review records defaults for `@nx/angular:webpack-browser` at nx.json:67-77, while snapshot builds use Native Federation over `@angular/build:application`. Without earlier version, these defaults cannot be called migration remnants or earlier package usage demonstrated. Historical explanation remains inconclusive, preserving No.

**4. `@softarc/native-federation-orchestrator`.** package.json:31 already declares `^4.2.2` at first observable version. Transitive lockfile connection, recorded in 3.4.2 (package-lock.json:375), does not by itself resolve path actually used by `initFederation`. Sole commit adds manifest, lockfile and application entries together; it offers no change clarifying usage. Neither installed dependency code was queried nor project executed. Remains Undetermined in snapshot and inconclusive in history.

**5. `AuthService` instance.** Commit adds service, logins, headers, guards, aliases and federation configurations together. Snapshot shows `providedIn: 'root'` and signal at libs/shared/data-access/src/lib/auth.service.ts:6-8, but source review could not demonstrate local library sharing across builds through `shareAll` (shell/federation.config.mjs:7-18). History provides no earlier sharing change or another stage answering uncertainty. Three communication relationships in 3.4.5 remain Active Undetermined; no historical basis says channel was abandoned or works across units.

**6. Shell navbar and home.** README.md:19 and :81 attribute these elements to shell. In snapshot, shell/src/app/app.html:1 contains only outlet, and shell/src/app/app.routes.ts:4-20 loads remotes. The `log --name-status` records README and these files as additions in same root commit, together with remote homes and headers. Thus discrepancy already exists at first observable version. No recorded version shows navbar or home in shell, or evidence decides between intention, copying or description of earlier stage outside this history. Historical origin is inconclusive.

**7. Guards and login.** README.md:27 and :56 place guards in shell routes and describe no login screen and initial admin user. Snapshot has unguarded shell routes, guards on admin and intranet homes (admin/src/app/remote-entry/entry.routes.ts:12; intranet/src/app/remote-entry/entry.routes.ts:12), login routes in those files (:13) and initial public user (libs/shared/data-access/src/lib/auth.service.ts:4, :8). All these paths and README appear as additions in sole commit. This proves discrepancy coexistence, rather than guard transfer or two-stage sequence. Expression “versão anterior” (English translation: "earlier version") used in previous-stage overviews cannot be confirmed through this history; temporal explanation remains inconclusive without changing snapshot judgments.

## Commands

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara log --format='%h %ad %s' --date=short --name-status 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara rev-list --count 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara show 3dd51466a7d9eece3bcb46e0663ad5ad614daf32:package.json
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara show -s --format='%h %ad %s | pais: %p' --date=short 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Both fingerprint comparisons ended with code 0, before and after queries.

## Summary

Commits up to the snapshot: 1 (2026-07-29 to 2026-07-29). Points: 7 (clarified: 0, inconclusive: 7, resolved by the snapshot: 0).
