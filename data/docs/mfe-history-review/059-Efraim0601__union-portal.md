---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inputs:
  clone: data/samples/mfe-sample-001/repos/Efraim0601__union-portal
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Repository overview

History up to snapshot has 37 commits over six days, from 2026-07-11 to 2026-07-16, with two feature branch merges.

Native Federation composition is already present in first observed commit, `012b229` (2026-07-11, "Portail unifié Afriland : shell + promote + diaspora (Native Federation)" (English translation: "Unified Afriland portal: shell + promote + diaspora (Native Federation)")). This commit has 103 files in `projects/`, and shell routes already call `loadRemoteModule` for both remotes. Available history shows no earlier preparation. README states promote pages were "migrées de `promoteApp/frontend`" (English translation: "migrated from promoteApp/frontend") (README.md:28), but this history cannot verify application extraction.

Clone reveals messages, dates, files touched per commit and object identifiers of each version. Old version contents can only be read when object is locally available. Here, `012b229:package.json` and `81b1158:deploy/nginx.conf` are not; `cd974b8:package.json` and `1cea70e:projects/diaspora/src/app/core/admin-auth.ts` are.

Opening README "module federation" did not become a point (claim 8 of documentation review). README itself names correct technology on line 17, and uncertainty concerns only naming.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` declared and unused | 3.4.2 (package.json:28) | dependency use | cd974b8 2026-07-14 feat(diaspora): parcours d'ouverture de compte particulier complet (English translation: "feat(diaspora): complete personal account opening flow"); 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) (English translation: "Unified Afriland portal: shell + promote + diaspora (Native Federation)") | inconclusive |
| 2 | Legacy flow iframe relies on a reverse proxy absent from snapshot nginx | 3.4.4 (projects/diaspora/src/app/pages/legacy-onboarding.ts:31); 3.4.5 #3; 3.4.7 #22, #24 | conflicting stages | 1e8d9fb 2026-07-15 feat(diaspora): route optionnelle « onboarding-legacy » (iframe FastAPI) (English translation: "feat(diaspora): optional onboarding-legacy route (FastAPI iframe)"); 81b1158 2026-07-15 feat(deploy): exposer le back-office diaspora via le gateway du portail (English translation: "feat(deploy): expose diaspora back-office through portal gateway"); 092eff1 2026-07-16 fix(gateway): servir /mediapipe à la racine pour la capture selfie en fédération (English translation: "fix(gateway): serve /mediapipe at root for federated selfie capture"); bf7d95d 2026-07-16 merge(deploy): exposer le back-office diaspora via le gateway (feat/backoffice-gateway) (English translation: "merge(deploy): expose diaspora back-office through gateway (feat/backoffice-gateway)") | inconclusive |
| 3 | `@union/auth` exists and no application uses it, despite documented SSO | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71); 3.4.7 #3, #11, #12 | active or abandoned | 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) (English translation: "Unified Afriland portal: shell + promote + diaspora (Native Federation)"); 77c7b4f 2026-07-12 fix(promote): attache le JWT en fédération (403 sur tout l'espace authentifié) (English translation: "fix(promote): attach JWT in federation (403 throughout authenticated area)"); 1cea70e 2026-07-15 Nouveau maj (English translation: "New update") | inconclusive |
| 4 | Design-system components are unused, and README discusses "progressive" adoption | 3.4.7 #18 | active or abandoned | 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) (English translation: "Unified Afriland portal: shell + promote + diaspora (Native Federation)") | inconclusive |
| 5 | Shell "provisionne" (English translation: "provides") `ClientAuthStore` at bootstrap, according to comment, but does not | 3.4.7 #26 | active or abandoned | 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) (English translation: "Unified Afriland portal: shell + promote + diaspora (Native Federation)") | clarified |

## Observations

**1. `@softarc/native-federation-node` declared and unused.** The `package.json` changed only twice: initial commit and `cd974b8`. According to messages and touched files, `cd974b8` also creates server `server/diaspora-otp`. Version at `cd974b8` already declares dependency, but initial commit version is unavailable. Whether it entered initially or with server, or whether any file used it earlier, cannot be known. Dependency remains `No` in snapshot.

**2. Legacy flow iframe relies on a reverse proxy absent from snapshot nginx.** Commit creating iframe, `1e8d9fb`, changed only `projects/diaspora/src/app/app.routes.ts` and created `legacy-onboarding.ts`, without touching deploy. Messages of following commits in `deploy/nginx.conf` announce back-office and MediaPipe. Nginx version at `81b1158` is unavailable, so whether any earlier version routed `/open-account-flow-test` cannot be known. Comment may refer to a proxy outside repository.

**3. `@union/auth` exists and no application uses it, despite documented SSO.** Library (`client-auth-store.ts` and `public-api.ts`) appears in initial commit and never changes up to snapshot. On application side:
- promote `auth.ts` changed in `77c7b4f`, whose message announces a JWT transmission fix in federation;
- diaspora `admin-auth.ts` is created in `1cea70e` (2026-07-15), and that commit’s version, available in clone, already comments that `@union/auth` "n'est branché nulle part" (English translation: "is not connected anywhere").

Initial version of `projects/promote/src/app/core/auth.ts` is unavailable, so earlier application use of library cannot be excluded. History confirms library never changed and was documented as unconnected from 2026-07-15 to snapshot.

**4. Design-system components are unused, and README discusses "progressive" adoption.** Directory `projects/design-system` appears in initial commit and never changes up to snapshot. Available history cannot establish whether an application previously used components then stopped, or never used them. "Progressive" is neither confirmed nor disproved.

**5. Shell "provisionne" (English translation: "provides") `ClientAuthStore` at bootstrap, according to comment, but does not.** Shell `bootstrap.ts`, `main.ts`, `app.config.ts` and `app.ts` appear in initial commit with same object identifiers as snapshot, and no commit changes them. Provisioning announced by comment (projects/shell/src/app/app.ts:7) has been absent from this bootstrap since first observed commit, without removal in these files. History does not say why comment announces something code never did.

## Commands

```
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal rev-list --count b11a3e3aa55aff8195e0cde0026ccbd45245266d
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --merges --format=%h b11a3e3aa55aff8195e0cde0026ccbd45245266d
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal ls-tree -r --name-only 012b229
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 012b229:projects/shell/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- package.json
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 012b229:package.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show cd974b8:package.json
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show --name-status --format='%h %ad %s' --date=short cd974b8
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show --name-status --format='%h %ad %s' 1e8d9fb
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- deploy/nginx.conf docker-compose.yml
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 81b1158:deploy/nginx.conf   # failure: missing object
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/auth/src/lib/client-auth-store.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/auth/src/public-api.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/promote/src/app/core/auth.ts projects/diaspora/src/app/core/admin-auth.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 012b229:projects/promote/src/app/core/auth.ts   # failure: missing object
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show --name-status --format='%h %ad %s' --date=short 1cea70e
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 1cea70e:projects/diaspora/src/app/core/admin-auth.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/design-system
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/main.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/app/app.config.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/app/app.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal ls-tree 012b229 -- projects/shell/src/bootstrap.ts projects/shell/src/main.ts projects/shell/src/app/app.config.ts projects/shell/src/app/app.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal ls-tree b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/bootstrap.ts projects/shell/src/main.ts projects/shell/src/app/app.config.ts projects/shell/src/app/app.ts
```

## Summary

Commits up to the snapshot: 37 (2026-07-11 to 2026-07-16). Points: 5 (clarified: 1, inconclusive: 4, resolved by the snapshot: 0).
