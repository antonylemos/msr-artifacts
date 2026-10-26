---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
url: https://github.com/Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 237 — Axiean/micro-store

## Context

“Micro-Frontend E-Commerce Application” (`README.md:1–12`): two independent Next.js 15 applications combined in the Multi-Zones pattern:
- `store-app` (zone 1, port 3000), with the product storefront;
- `cart-app` (zone 2, port 3001, `basePath: "/cart"`), with the cart.

`store-app` rewrites `/cart/:path*` to `cart-app`, and both zones share cart state through `localStorage`. There is a `docker-compose.yml` with one container per zone. The README says the project was created as a frontend technical assessment (`README.md:3`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:238` records rank 237, ID 1031213794, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:238` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:17230` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17234` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-08` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:46.445Z / 2026-10-08T15:55:27.142Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:56:00.831Z / 2026-10-08T16:06:25.259Z |

The effective queries append `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 184;
- created at 2025-08-03T09:04:45Z, pushed at 2025-08-04T06:36:46Z.

Spellings in the README:
- “Micro-Frontend”: `README.md:1`; “micro-frontend”: `README.md:3`;
- “Micro-Frontends”: `README.md:5` (“Architecture: Multi-Zone Micro-Frontends”).

Phrase search treats the hyphen as a separator. The last README change is the SHA itself, `7ed9142` (2025-08-04), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 46 entries, all regular files `100644`; zero symlinks and zero gitlinks. `store-app/` and `cart-app/` each have `package.json`, `package-lock.json`, `next.config.ts`, `Dockerfile` and `src/` (App Router). At the root are `README.md`, `docker-compose.yml` and `.gitignore`. | context |
| Configuration (route composition) | `store-app/next.config.ts:27–42`: `rewrites()` with `{ source: "/cart/:path*", destination: "http://cart-app:3000/cart/:path*" }`, described as “the core of the Multi-Zone micro-frontend architecture”. `cart-app/next.config.ts:4`: `basePath: "/cart"`. | strong |
| Build/deploy | `docker-compose.yml:5–29`: services `store-app` (port 3000) and `cart-app` (3001→3000), each with its own `build.context` and `Dockerfile`. The rewrite hostname `cart-app` is the Compose service name. `store-app/Dockerfile:3–30` (and the cart equivalent) generates a `standalone` image. Their own scripts: `store-app/package.json:5–10`; `cart-app/package.json:5–10` (`-p 3001`). | strong |
| Source code (navigation and state) | `store-app/src/components/Header.tsx:29`: `<a href="/cart">`, full-page navigation to the cart zone. Both zones persist the cart under the same `localStorage` key (`store-app/src/store/cartStore.ts:82–85`; `cart-app/src/store/cartStore.ts:83`), in files duplicated per zone, not imported. | moderate |
| Source code (boundaries) | Search for `../..` and for `../store-app` or `../cart-app`: no occurrences. Each zone uses alias `@/` for its own `src`. | context |

## Authorship and history

Non-shallow clone; 15 linear commits, no merges, all by Axiean `<axieans@gmail.com>`, between 2025-08-03 (`1718d95`, “init”) and 2025-08-04 (SHA `7ed9142`, “update readme”). `ce3eddd` (“docker file setup”) adds containerization. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` shows 52 missing historical objects; the necessary current files were readable and no fetch was attempted.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units in the repository, the cart unit referenced by the composition configuration (`store-app/next.config.ts:36–39`). |
| Q2 | Yes | Each zone has its own `package.json`, lockfile, `next.config.ts`, `Dockerfile` and service, without source code imports between them. |
| Q3 | Yes | `store-app` is the entry point and forwards `/cart` to `cart-app`, which serves under the same domain (`README.md:9–12`; `next.config.ts:32–41`). |
| Q4 | Yes | Route composition with Next.js Multi-Zones (`rewrites` + `basePath`), configured and consistent with Compose. |
| Q5 | Yes | Q1–Q4 are Yes: two Next.js zones composed by route. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, with `status: review`, as in 013 (`multi-zones`, `MFE-implemented`/review). Both zones and the composition configuration are in the snapshot.
- Composition is by route on the server, with full-page navigation between zones. It depends on the same review as 013 and draft 199 (open decision “link-only or iframe composition”, here with the host reserving and forwarding prefix `/cart`). Unlike 199, the zone location is defined (`http://cart-app:3000`, service name in `docker-compose.yml:20–24`).
- `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (Next convention without explicit bundler, as in 199), `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: example` (technical assessment, `README.md:3`).

## Analysis notes

- **RQ2:** Multi-Zones with `rewrites` resolved through the Docker Compose network, `basePath` in the remote zone and cart state shared through `localStorage` under the same key.
- **Protocol (search):** hyphenated spellings match phrase queries. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

1. **Zone composition:** does Multi-Zones through `rewrites` and full-page navigation count as a composition mechanism for Q4? This is the same question pending in 013 and 199.

If the answer is positive, the case remains `MFE-implemented`. If route composition does not count, it becomes `Non-MFE`. No new rule is proposed. Until the decision, preserve `review`.
- **Independent review contribution (Lupa):** agreement with MFE-implemented (Q1–Q5 Yes), `multi-zones`, two units in `monorepo` and `review`, and recommendation to decide in favor of route composition in this case and in 013. Zone composition is implemented: the storefront server reserves `/cart` and forwards it to another present application, whose `basePath` is `/cart`. Field disagreement, not adopted because it contradicts the current convention (CLI flags do not count as bundler configuration): both manifests declare `next dev --turbopack` (`cart-app/package.json:6`, `store-app/package.json:6`), and the reviewer recommends `build_tools: [turbopack]` as an observation of dev mode (build uses `next build` without a bundler flag); `build_tools: []` retained, with the alternative recorded. Precedents 013 (MFE-implemented/`review`) and 199 (`Uncertain`/`review`) are not final; the `CART_DOMAIN` gap in 199 does not exist here, because there is an actual service, target and code. Text search: the README contains hyphenated singular and plural variants (`README.md:1,3,5`); compatibility between query and spelling is observed and is not a demonstrated general property of GitHub. Also record residual alias `../../packages/ui` and the scope of `-p 3001`.
