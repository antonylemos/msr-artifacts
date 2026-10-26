---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-html-external-script | users-service/src/identity/api/openapi.ts:188 | — | none | No | `<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js">` inside the service’s Swagger UI HTML (`swaggerHtml`, users-service/src/identity/api/openapi.ts:179-191, served at the `/swagger` route at users-service/src/identity/api/openapi.ts:200-203); loads a CDN library rather than another unit’s bundle. `users-service` is `No` in the structural review, as is `.`, so the unit is `—` |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/next.config.ts:6 | shell | host-relationship | Yes | `async rewrites()` declares which applications the shell uses and under which paths: `/catalog` and `/catalog/:path+` to `CATALOG_URL`, `/builds` to `BUILDS_URL`, `/auth` to `AUTH_URL`, plus each zone’s `/<zona>-static/_next/:path+` assets (shell/next.config.ts:6-30); the targets are the `catalog-mfe`, `builds-mfe` and `auth-mfe` apps, connected through `CATALOG_URL`, `BUILDS_URL` and `AUTH_URL` at docker-compose.yml:209-211, and each zone responds at the path declared by its `assetPrefix` (catalog-mfe/next.config.ts:6, builds-mfe/next.config.ts:6, auth-mfe/next.config.ts:6). Config exported as `nextConfig` at shell/next.config.ts:33 |
| manual | auth-mfe/src/lib/auth-client.ts:20 | auth-mfe | communication | Yes | `setJwtCookie` writes the `jwt` cookie with `path=/` (auth-mfe/src/lib/auth-client.ts:22; name at auth-mfe/src/lib/jwt.ts:7), sharing the session with the other zones under the same shell origin; triggered after login and registration (auth-mfe/src/app/auth/login/page.tsx:41, auth-mfe/src/app/auth/register/page.tsx:46) and read by the other units at shell/src/components/Header.tsx:12, catalog-mfe/src/components/Header.tsx:12 and builds-mfe/src/components/Header.tsx:12 (`readJwtFromDocument`), as well as builds-mfe/src/app/builds/new/new-build-form.tsx:59 |

## Summary

Constructs participating in composition: 2 (host-relationship: 1, communication: 1).

## Notes

- The `matches.csv` has a single `src-*` row, from a backend service: no `src-*` pattern matched the four frontend apps. Composition in this repository uses server routes (Next.js Multi-Zones), which mining captured through `cfg-*` patterns (`cfg-route-rewrites` at shell/next.config.ts:6; `cfg-zone-path` at auth-mfe/next.config.ts:6, builds-mfe/next.config.ts:6 and catalog-mfe/next.config.ts:6).
- Researcher decision (23/10/2026), valid only for this repository: the step 4 exclusion ("construct not in `matches.csv`") applies only to `src-*` occurrences, so shell/next.config.ts:6 was included as a manual `host-relationship` / `Yes` row, even though it is a `cfg-route-rewrites` occurrence in `matches.csv`.
- The step 4 search (`import(`, `React.lazy`, `loadRemote*`, `customElements`, `registerApplication`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`) returned nothing in shell, auth-mfe, catalog-mfe and builds-mfe: there is no loading, resolution, mounting or embedding of one unit within another in the source code.
- Navigation between zones uses full-page links (`<a href="/catalog">`, `<a href="/builds">`, `<a href="/auth/login">` at shell/src/components/Header.tsx:32,35,51 and the `sections` list at shell/src/app/page.tsx:10-32). Navigation links are not among the types in step 4 and have no category in the vocabulary, so they did not become rows.
- Header, Footer and `src/lib/{auth,auth-client,bff,jwt}.ts` are identical copies in each app (e.g., auth-client.ts is identical in all four, lines 1-28); no app imports another’s code. The `jwt` cookie is the only exchange mechanism between units in the source code.
- `src/lib/bff.ts` and `src/lib/auth.ts` talk to the BFFs (`web-bff`, `mobile-bff`), which the structural review judged `No`; backend communication, rather than communication between frontend units.
