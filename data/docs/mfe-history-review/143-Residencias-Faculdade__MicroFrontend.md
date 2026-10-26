---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
inputs:
  clone: data/samples/mfe-sample-001/repos/Residencias-Faculdade__MicroFrontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Repository overview

History up to snapshot has 11 commits, without merges, from 2026-09-09 to 2026-09-30. First, `c296e85` (2026-09-09, "feat: NGX shell + posts-crud + docs"), creates 22 files: entire shell (`index.html`, `src/`, `vite.config.ts`, `package.json`, lockfile), `public/microfrontends.json`, `public/silent-check-sso.html`, `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `keycloak/realm.json` and `README.md`. Next eight commits, all from 2026-09-30, change only dependencies (`0a03502`) and Keycloak: `7de7c8c` creates `Dockerfile.keycloak`, and others change this file and `keycloak/realm.json`. Last two change only registry: `d48027b` ("feat: registra member-manager da equipe 2 na shell" (English translation: "feat: registers team 2 member-manager in shell")) and snapshot itself, `5726e54` ("fix: Exclusão do localhost project" (English translation: "fix: removal of localhost project")). No commit removes a file, and snapshot tree has same 22 files as first commit plus `Dockerfile.keycloak`.

The `README.md`, `docker-compose.yml`, `src/main.ts`, `public/silent-check-sso.html` and `src/tokens.css` have only one commit, `c296e85`, and same object identifier in `c296e85`, `d48027b` and `5726e54`: for them, first commit is first observable presence, and there is no earlier or later version. Clone lacks contents of two old versions of `public/microfrontends.json` (`show` at `c296e85` and `d48027b` failed with missing objects); known evidence comprises their identifiers (`56083e5…` and `5e1abe5…`, differing from snapshot `e24f7d7…`) and commit messages.

Of previous reviews, 3.4.2 has no dependency, 3.4.3 has no `Undetermined` unit, 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy. In 3.4.4, row `src-custom-element` (src/main.ts:218) is comment prose describing contract, rather than commented-out code, and did not become a point; row `src-cross-unit-communication` of silent SSO page, referenced by no file, became point 1, together with part of claim #13 in 3.4.7 about that page. Of claims in 3.4.7, `contradicted` claim (#5) is point 2; `partial` claims depending on external frontend side (#9, #10, #12, #13, #14, #16) became one point, 3; #15 about `posts-crud` is point 4. The `uncorroborated` claim (#11) is outside those raised by step 2. Documents `CONEXAO-MICROFRONTEND.md`, `Requisitos-Microfrontend.md` and `Arquitetura-Visual.md`, recorded by 3.4.7 as missing from snapshot (README.md:212-214), appear in no history commit; and outdated README line references to src/main.ts do not result from a later change to either file, which have only version at `c296e85`. Neither case is a claim in 3.4.7 table, and they did not become points.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Page `public/silent-check-sso.html` is not referenced by shell, which starts Keycloak without `silentCheckSsoRedirectUri`, and README calls it mandatory for frontend | 3.4.4 (public/silent-check-sso.html:3); 3.4.7 #13 | active or abandoned | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs | clarified |
| 2 | README says `posts-crud` starts "se existir" (English translation: "if it exists"), and compose declares it unconditionally | 3.4.7 #5 | conflicting stages | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs | clarified |
| 3 | Claims about connected frontends (cache and CORS of `main.js`, tokens, authentication, autonomy, "equipe 2" (English translation: "team 2")) remain partial because no external frontend is in snapshot | 3.4.7 #9, #10, #12, #13, #14, #16 | extraction | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs; 7de7c8c 2026-09-30 feat: Keycloak no Render com redirecionamento ao Vercel (English translation: "feat: Keycloak on Render with redirect to Vercel"); 5726e54 2026-09-30 fix: Exclusão do localhost project (English translation: "fix: removal of localhost project") | clarified |
| 4 | The `posts-crud` appears in README, compose and a comment in `src/main.ts`, and snapshot registry has only `member-manager` | 3.4.7 #15 | conflicting stages | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs; d48027b 2026-09-30 feat: registra member-manager da equipe 2 na shell (English translation: "feat: registers team 2 member-manager in shell"); 5726e54 2026-09-30 fix: Exclusão do localhost project (English translation: "fix: removal of localhost project") | clarified |

## Observations

**1. Unreferenced silent SSO page.** The `public/silent-check-sso.html` and `src/main.ts` are created in `c296e85` and do not change afterward: both have same object identifier in three listed commits, and each `log` shows only `c296e85`. Only version of `src/main.ts` in history is snapshot version, with `keycloak.init` without `silentCheckSsoRedirectUri` (3.4.4, src/main.ts:74-78). Conclusion limited to these files: page was never used by a versioned shell version; it was added together with shell and never connected, rather than disconnected afterward. README, calling it mandatory (README.md:129), also exists only at `c296e85`. History does not show whether any external frontend uses it. Row in 3.4.4 remains `none` and `No`, and claim #13 remains `partial`.

**2. "se existir" (English translation: "if it exists") in README and unconditional compose service.** The `README.md` and `docker-compose.yml` have only version at `c296e85`, with same object identifier in all queried commits. Promise at README.md:8 and :72 and declaration without profile or condition at docker-compose.yml:19-30 arrive together in first commit and coexist up to snapshot: they are not different stages, and discrepancy does not come from README lagging behind a versioned compose change. History does not show whether compose differed before first commit. Claim remains `contradicted`.

**3. Connected frontends outside snapshot.** No history commit removes a file, and first-commit tree (22 files) and snapshot tree (same files plus `Dockerfile.keycloak`, created in `7de7c8c`) have only shell, Keycloak and documentation: no version has code, manifest or `Dockerfile` of `member-manager`, `posts-crud` or another frontend. Conclusion limited to this repository: frontends were never here, and their absence does not result from extraction or versioned removal; since `c296e85`, shell was designed to load bundles from other origins. History does not show where these frontends exist, whether they meet contract (cache, CORS, tokens, authentication, communication), or whether `member-manager` belongs to "equipe 2" (English translation: "team 2"); message of `d48027b` repeats this attribution. Claims remain `partial`.

**4. `posts-crud` in examples and `member-manager` in registry.** README (README.md:8, :64, :72, :186), compose (docker-compose.yml:17-30) and comment at src/main.ts:165 have only version at `c296e85`, whose message announces "posts-crud". Registry `public/microfrontends.json` is only one of these files changed afterward, twice: `d48027b`, whose message announces registration of `member-manager`, and `5726e54`, whose message announces "Exclusão do localhost project" (English translation: "removal of localhost project"). Contents of both earlier registry versions are unavailable, so whether `c296e85` had entry `posts-crud` at `localhost:4200` from README example, or `d48027b` had both entries, cannot be seen; this comes only from messages. Conclusion limited to these files: examples with `posts-crud` date from first-commit stage and did not change, and snapshot registry comes from two later changes made without changing README, compose or comment. These are different stages. History does not show whether `posts-crud` is Angular. Claim remains `partial`.

## Commands

```
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend rev-list --count 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend rev-list --count --merges 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --reverse --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --reverse --name-status --no-renames --format='== %h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree c296e85 public/microfrontends.json   # rejected by script: path outside review format
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree d48027b public/microfrontends.json   # rejected by script: path outside review format
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree 5726e54 public/microfrontends.json   # rejected by script: path outside review format
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend show c296e85:public/microfrontends.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend show d48027b:public/microfrontends.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- README.md
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- src/main.ts
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- public/silent-check-sso.html
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- src/tokens.css
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- keycloak/realm.json
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r c296e85
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r d48027b
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r 5726e54
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r --name-only 5726e54de24e6b6a1ff1fd004b82db909314640c
```

## Summary

Commits up to the snapshot: 11 (2026-09-09 to 2026-09-30). Points: 4 (clarified: 4, inconclusive: 0, resolved by the snapshot: 0).
