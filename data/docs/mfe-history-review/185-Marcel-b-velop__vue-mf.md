---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
inputs:
  clone: data/samples/mfe-sample-001/repos/Marcel-b-velop__vue-mf
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Repository overview

History up to snapshot has 29 commits, 4 merges, from 2025-11-22 (`9ab7627`, "Initial commit", only `LICENSE`) to 2025-11-30 (`ed270d3`, "Merge pull request #3 from Marcel-b-velop/feature/wip", snapshot commit). The `0f527a1` (2025-11-22, "start") creates `app-1/`, `host/` and `lib/` from Vite template; `9a31597` (2025-11-22, "tailwind") creates host router with views `Home.vue` and `About.vue`. Root `README.md` is created in `1cf6fc1` (2025-11-23, "Doku" (English translation: "Documentation")) and changed in `ae88211` (2025-11-23, "Doku ergänzt" (English translation: "Documentation supplemented")) and `312d8f3` (2025-11-23, "API aufgeräumt und Vite Configs optimiert" (English translation: "API cleaned up and Vite configurations optimized")). This is last version, identical to snapshot (object `33e4c0a`). Pnpm workspace arrives in `b36d55e` (2025-11-23, "Scripts und Workspace und client" (English translation: "Scripts and workspace and client")). Entire `app-2/`, IdentityServer, new host routes and `pnpm-workspace.yaml` change all arrive in same commit, `184c4ab` (2025-11-30, "Tests
und Login (English translation: "Tests and login")"), one week after last README change. Afterward, only `26e7bd2` (2025-11-30, "Config") and snapshot merge.

Clone reveals messages, touched files per commit (with `--no-renames`) and object identifiers. No queried old version is available: `cat-file -e` failed with missing objects for all tested earlier versions of README, router, `App.vue`, `main.ts`, `About.vue`, `Navigation.vue`, `vite.config.ts` files and `pnpm-workspace.yaml`. The `show -s` also failed at `312d8f3` and `b09c7eb`. Messages of these two commits came through `log`. Points rely only on messages, paths and identifiers.

Of previous reviews, `No` construct in 3.4.4 becomes a point (`AppTwo` registered and unused, also cited by Overview in 3.4.5). The `contradicted` and `partial` claims in 3.4.7 (#1, #2, #6, #11) also become points. 3.4.2 has all four dependencies `Yes`. 3.4.3 has no `Undetermined` unit, 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy. Other `No` rows in 3.4.4 are false positives or internal app-2 communication. Relationship 3.4.5 #6 (`remote-lib` declared in app-2, `Active = No`) and store host/src/stores/authStore.ts without import are not points under step 2. History only shows `app-2/vite.config.ts` created in `184c4ab` and unchanged up to snapshot (same object `839bc53`). Store is created in `b09c7eb` (2025-11-23, "wip") and changed in `312d8f3`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Host loads and registers app-2 `App2` as `AppTwo`, but no template uses `<AppTwo>`. | 3.4.4 (host/src/main.ts:13); 3.4.5 (Overview) | active or abandoned | 184c4ab 2025-11-30 Tests und Login (English translation: "Tests and login"); 26e7bd2 2025-11-30 Config | inconclusive |
| 2 | README says all pages are remote modules, but route `/about` is a local host page. | 3.4.7 #1 | conflicting stages | 9a31597 2025-11-22 tailwind; 1cf6fc1 2025-11-23 Doku (English translation: "Documentation"); b09c7eb 2025-11-23 wip; 184c4ab 2025-11-30 Tests und Login (English translation: "Tests and login") | inconclusive |
| 3 | README says host has header and footer, and host has neither. | 3.4.7 #2 | active or abandoned | 0f527a1 2025-11-22 start; b09c7eb 2025-11-23 wip; 312d8f3 2025-11-23 API aufgeräumt und Vite Configs optimiert (English translation: "API cleaned up and Vite configurations optimized") | inconclusive |
| 4 | README mentions three parts (Host, App1, Lib), and snapshot has four units, including app-2. | 3.4.7 #6 | conflicting stages | 312d8f3 2025-11-23 API aufgeräumt und Vite Configs optimiert (English translation: "API cleaned up and Vite configurations optimized"); 184c4ab 2025-11-30 Tests und Login (English translation: "Tests and login") | clarified |
| 5 | The `build` block README attributes to Lib and App1 does not match current configurations. | 3.4.7 #11 | conflicting stages | 312d8f3 2025-11-23 API aufgeräumt und Vite Configs optimiert (English translation: "API cleaned up and Vite configurations optimized"); a6a6c0c 2025-11-23 Fehler korrigiert (English translation: "Errors corrected"); a0f3e3b 2025-11-23 optimiert (English translation: "optimized"); 22bb24e 2025-11-24 Update vite.config.ts; 1727c5a 2025-11-24 Update vite.config.ts; 184c4ab 2025-11-30 Tests und Login (English translation: "Tests and login"); 26e7bd2 2025-11-30 Config | clarified |

## Observations

**1. `AppTwo` registered and unused.** Snapshot `host/src/main.ts` (object `12f07a4`) is version at `184c4ab`, same commit creating `app-2/`, with `vite.config.ts` exposing `./App2`. Thus first observable registration presence coincides with app-2 itself. Earlier `main.ts` version (`b09c7eb`) is unavailable. Among host templates, `App.vue`, `Home.vue` and `About.vue` are unchanged since before `184c4ab` (same objects in `312d8f3` and snapshot), so none used `<AppTwo>` and stopped afterward. Only host template changing in `184c4ab` and again in `26e7bd2` ("Config") is `host/src/components/Navigation.vue`, and version at `184c4ab` is unavailable. History does not exclude `<AppTwo>` having been used there and removed in `26e7bd2`. Conclusion: registration originates together with app-2. Whether it was ever used remains open. Inconclusive, and construct remains `No`.

**2. Local `/about` versus "pages are remote".** Host router and `About.vue` are created in `9a31597` (2025-11-22), before README (`1cf6fc1`, 2025-11-23). Router remains identical (object `6642dc1`) until `184c4ab` (2025-11-30), changing it together with app-2 creation. This change introduces snapshot remote routes `/login` and `/register` (host/src/router/index.ts:7-8). The `About.vue` changes in `c2203cd` and `b09c7eb` and remains identical (object `b1fc03b`) up to snapshot. No old router or `About.vue` version is available. History does not show whether page `/about` ever had remote contents, and thus does not say whether it is an earlier stage remnant or a page never converted. Visible evidence is that page file exists in host since before README. Inconclusive.

**3. Host header and footer.** No commit up to snapshot has a filename containing "header" or "footer" under `host/`. Host components were only `HelloWorld.vue` (created in `0f527a1`, removed in `b09c7eb`) and `Navigation.vue` (created in `b09c7eb`). Snapshot `host/src/App.vue` is version at `b09c7eb` (object `f26dbe2`). Earlier versions (`9a31597`, `c2203cd`) are unavailable, so history does not show whether they contained header or footer markup inside `App.vue` itself. Last README version, `312d8f3`, follows `b09c7eb` and says "Es fehlt noch der Footer" (English translation: "Footer is still missing") (README.md:60). Conclusion limited to paths: host never had its own header or footer component. Old `App.vue` version contents cannot be read. Inconclusive.

**4. Three parts instead of four.** README changes for last time in `312d8f3` (2025-11-23); object `33e4c0a` matches snapshot. The `app-2/` does not exist until `184c4ab` (2025-11-30), creating all its files and changing `pnpm-workspace.yaml` (object `a2a9d33` in `b36d55e`, `abb2aaa` in `184c4ab` and snapshot). No commit after `184c4ab` changes README. Conclusion limited to these files: README is from stage before app-2 creation and was not updated afterward. Count "die drei Teile" (English translation: "the three parts") (README.md:22) corresponds to repository before `184c4ab`. Fourth unit is later, rather than an omission in same stage. Claim remains `contradicted`.

**5. Lib and App1 `build` block.** Last README version is from `312d8f3`, whose message announces "Vite Configs optimiert" (English translation: "optimized"). This commit changes `host/vite.config.ts` and `lib/vite.config.ts`, but not `app-1/vite.config.ts`. Afterward up to snapshot, `app-1/vite.config.ts` changes in `a6a6c0c`, `a0f3e3b`, `22bb24e`, `1727c5a` and `26e7bd2`; host configuration in `a0f3e3b` and `184c4ab`; and lib configuration in `184c4ab` and `26e7bd2`. Three snapshot objects (`77ccb82`, `2d83983`, `22b4f27`) differ from those at `312d8f3` (`de448c4`, `363a02c`, `f5af481`). Old versions are unavailable, so history does not show whether README block (README.md:28-34) matched configurations then. Conclusion limited to these files: README and three current configurations are from different stages. All configurations changed after last README edit, several times for app-1. Difference comes from this sequence, rather than configurations that never changed. Claim remains `contradicted`.

## Commands

```
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf rev-list --count ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf rev-list --count --merges ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short --reverse --name-status --no-renames ed270d34b0542cb1a0ce26aafc2aeba4bca994e1   # output filtered outside clone: omitting lib/playwright-report/ lines
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 9a31597 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 1cf6fc1 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r c2203cd -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r ae88211 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r b36d55e -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r b09c7eb -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 312d8f3 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r a0f3e3b -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 184c4ab -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 26e7bd2 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 1cf6fc1:README.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e ae88211:README.md   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 9a31597:host/src/router/index.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 9a31597:host/src/App.vue   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e c2203cd:host/src/App.vue   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e b09c7eb:host/src/main.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 312d8f3:host/vite.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 312d8f3:app-1/vite.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 312d8f3:lib/vite.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e c2203cd:host/src/views/About.vue   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 1cf6fc1
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short ae88211
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 312d8f3   # failed: missing object (could not fetch 8f52beb75760ebe9121b0da31261e5194ded6c44 from promisor remote)
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short a0f3e3b
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 184c4ab
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 26e7bd2
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short b09c7eb   # failed: missing object (could not fetch 0cc9273a1740f8cb4961c43daa917f443c72adc8 from promisor remote)
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- README.md
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host/src/router/index.ts host/src/main.ts host/src/App.vue
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- app-2 pnpm-workspace.yaml
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short --name-status --no-renames ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host   # output filtered outside clone by header|footer: no lines
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad [%B]' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1   # output filtered outside clone: messages of 312d8f3, b09c7eb and 184c4ab
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 184c4ab:host/src/components/Navigation.vue   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 184c4ab:host/src/main.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e b36d55e:pnpm-workspace.yaml   # failed: missing object
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host/src/stores/authStore.ts app-2/vite.config.ts host/src/components/Navigation.vue
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- pnpm-workspace.yaml app-2/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree 184c4ab -- pnpm-workspace.yaml app-2/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree b36d55e -- pnpm-workspace.yaml
```

## Summary

Commits up to the snapshot: 29 (2025-11-22 to 2025-11-30). Points: 5 (clarified: 2, inconclusive: 3, resolved by the snapshot: 0).
