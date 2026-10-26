---
schema: 1
id: 1041317348
full_name: MyMicroFrontend/next-home
url: https://github.com/MyMicroFrontend/next-home
commit: 542acbd89f7c5c3a4118f4dfe00c820659b2b8ee
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 199 — MyMicroFrontend/next-home

## Context

Next.js 15 shopping application (home, products, detail, Redux cart), described as “Nextjs micro-frontend home application” (hit metadata) and “Shopping app with micro-frontend” (`src/app/layout.tsx:16`). `next.config.ts` rewrites `/cart` and `/cart/:path+` to `${process.env.CART_DOMAIN}/cart` (`next.config.ts:8–13`), Next.js Multi-Zones pattern: cart page would be served by another application. Header button leads to `/cart` through an ordinary link (`src/components/layout/header/cart-btn.tsx:10`). Cart application is not in the repository, and `CART_DOMAIN` is undefined in the snapshot (`.gitignore:34` ignores `.env*`). README is standard `create-next-app` content. Repository and organization names are not used as evidence.

`data/samples/mfe-sample-001/clones.csv:200` records rank 199, ID 1041317348, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:200` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:17859` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17864` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-08` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:15.889Z / 2026-10-08T15:55:18.725Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:50.710Z / 2026-10-08T16:06:21.351Z |

Effective queries append `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Hit metadata:
- description “Nextjs micro-frontend home application”;
- no topics, language TypeScript, `fork: false`, size 89;
- created at 2025-08-20T10:02:38Z, pushed at 2025-08-24T22:53:50Z;
- homepage `next-home-seven.vercel.app`.

The hit comes from description, containing “micro-frontend”; phrase search treats the hyphen as a separator. README (standard `create-next-app`, `README.md:1–36`) does not mention micro-frontends. Plural “micro frontends” does not appear literally; that hit depends on GitHub search text processing, which is not recorded. README comes from root commit `116f535` (2025-08-20) and never changed afterward.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 45 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Next.js project (App Router: `src/app/(main)`, `src/app/products`, components, containers, Redux stores) and a `Dockerfile` (bun). No cart application. | context |
| Configuration (route composition) | `next.config.ts:8–13`: `rewrites()` with `{ source: '/cart', destination: \`${process.env.CART_DOMAIN}/cart\` }` and `{ source: '/cart/:path+', … }`. Zone composition: host forwards a route prefix to another separately deployed application. | strong |
| Configuration (unit location) | `CART_DOMAIN` has no snapshot value: no versioned `.env*` (`.gitignore:34`), and no other file defines the variable. Searching for `CART_DOMAIN` finds only `next.config.ts`. | ambiguous |
| Source code (navigation) | `src/components/layout/header/cart-btn.tsx:10`: `<a href="/cart">`, full-page navigation to cart zone. Cart state is stored in an `httpOnly` cookie (`src/utils/cookie-storage.ts:5–13`), which would permit sharing with another zone under the same domain, without consumer evidence. | moderate |
| Source code (boundaries) | Imports through alias `@/` inside `src`; searching for `../../` returns nothing. No cart unit code. | context |
| Search | `git grep -i` at the SHA (except lockfile) for `micro.?front`, `federation`, `remoteEntry`, `zones`, `basePath` and `assetPrefix`: only `src/app/layout.tsx:16` and cited `rewrites`. | context |

## Authorship and history

Non-shallow clone; 13 commits, 1 merge, by Yusuf Akkurt (`ysfakkurt@hotmail.com` and noreply), from 2025-08-20 (`116f535`, “Initial commit from Create Next App”) to 2025-08-25 (SHA `542acbd`, PR #1 merge from `dev/1.0.0`). Branch `origin/dev/1.0.0` was not considered. The organization contains only this repository in the sample (`sample.csv`). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units: host and cart application, explicitly referenced by route composition configuration (`next.config.ts:8–13`). |
| Q2 | Yes | Host has its own build (`package.json:5–8`; `Dockerfile`). Cart unit is separately deployed (its own domain in `CART_DOMAIN`), without source code imports. |
| Q3 | Yes | Host routes `/cart` to the unit, participating in the same application under the same path (`next.config.ts:10–11`; `cart-btn.tsx:10`). |
| Q4 | Undetermined | Mechanism (Multi-Zones rewrites) is configured, but unit location depends on `CART_DOMAIN`, absent from repository. Under the criterion, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | No No answer and Q4 Undetermined. |

## Rationale

- `Uncertain` under the rule “No question is No, but at least one is Undetermined”, with `status: review`.
- **Mechanism:** that of 013 (`multi-zones`, `MFE-implemented`/review). There host and zones were in the snapshot; here only host, with external cart zone, as in host referencing external units (008/040/087).
- **Unit location:** the question in 145, where unit URL came only from an undefined environment variable, without default value or documentation.
- **Route mechanism:** rewrites and full-page navigation composition approaches open decision “Link-only or iframe composition”. Unlike an isolated link, however, host reserves prefix `/cart` and forwards requests.
- **Fields:** `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (Next convention), `frontend_units: 2` (host and cart), `unit_organization: multi-repo`, `repo_type: example` (demonstration shop with `fakestoreapi.com` data, `next.config.ts:5–7`).

## Analysis notes

- **RQ2:** Next.js Multi-Zones through `rewrites` to another application, with cart state in a cookie and full-page link navigation.
- **RQ1 (misleading signals):** README is standard `create-next-app`; MFE signal is in description and configuration.
- **Protocol (search):** plural hit has no literal spelling; description has “micro-frontend”. Eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Retained as `Uncertain`. Host implements route composition through Multi-Zones rewrites, but cart zone location depends on `CART_DOMAIN`, neither defined nor documented in the snapshot. Effective use of external configuration therefore remains unverifiable.
