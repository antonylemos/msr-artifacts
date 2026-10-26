---
schema: 1
id: 1342733584
full_name: portable-genai/human-review-console
url: https://github.com/portable-genai/human-review-console
commit: 191cd1f2c3482d50dc3106b3ba5d613f0664beec
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [iframe]
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 156 — portable-genai/human-review-console

## Context

Python service (FastAPI, hexagonal architecture) providing a human review queue and maker-checker for a family of generative AI systems. Includes a Next.js UI in `ui/` (`README.md:3–20`). Documentation presents this UI as “an embeddable Next.js micro-frontend”, inserted into a customer's host application:
- through an iframe, with a `frame-ancestors` allowlist;
- or same-origin under a reverse proxy subpath, with `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_EMBED` mode, which removes the page chrome.

Sources: `README.md:157–162`; `docs/embedding-and-identity.md:1–19`, `76–85`. The host is not in the repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:157` records rank 156, ID 1342733584, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:157` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:35872` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:35877` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-08` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:03.458Z / 2026-10-08T16:01:57.166Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:12.610Z / 2026-10-08T16:10:36.351Z |

Effective queries append `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Hit metadata:
- description about the human review queue, without the terms;
- topics `ai-agents`, `ai-platform`, `generative-ai`, `platform`, `ports-and-adapters` and `vendor-portability`;
- language Python, `fork: false`, size 664;
- created at 2026-08-22T11:12:33Z, pushed at 2026-10-05T08:55:32Z.

The hit comes from `README.md:159`, “`ui/` is an embeddable Next.js micro-frontend”, with hyphenated spelling; phrase search treats the hyphen as a separator. It is the only occurrence in the root README; the signal recurs in `ui/README.md`, `docs/embedding-and-identity.md`, `.agents/skills/README.md` and `.agents/skills/embeddable-secure-ui/SKILL.md`. The plural “micro frontends” does not appear in the README or description; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is `0862d35` (2026-09-04). It and the SHA (2026-10-02) precede October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 188 entries, 187 regular `100644` files and 1 executable `100755` (`scripts/prove-exposure-matrix.sh`); zero symlinks and zero gitlinks. There is a Python backend in `src/review_console/` (domain, ports, local/gcp/onprem adapters, API, CLI), `tests/`, `infra/terraform/`, `eval/` and `.agents/skills/`, and a single frontend project in `ui/` (`ui/package.json`, `ui/next.config.mjs`, `ui/app/`, `ui/components/`, `ui/lib/`). | context |
| Documentation (embedding) | `README.md:157–162` and `ui/README.md:3`: “embeddable Next.js micro-frontend”. `docs/embedding-and-identity.md:7–23`: three deployment forms: local, “Embedded same-origin behind a reverse proxy” (`NEXT_PUBLIC_BASE_PATH=/review`, `NEXT_PUBLIC_EMBED=1` “so … the host owns the frame”) and standalone behind IAP. `docs/embedding-and-identity.md:76–85`: host `frame-ancestors` allowlist. `:122–130`: customer integration checklist. | moderate |
| Configuration (host preparation) | `ui/next.config.mjs:14–16`, `39`: `basePath`/`assetPrefix` from `NEXT_PUBLIC_BASE_PATH`. `ui/app/layout.tsx:18–31`: embed mode without chrome. `ui/app/page.tsx:7`: `IS_EMBEDDED`. `ui/proxy.ts:19–37` with `ui/lib/security-headers.mjs:47–89`: configurable CSP `frame-ancestors` and wildcard rejection. No `exposes`, lifecycles, custom element, `postMessage` or host navigation registration (recorded search). | moderate |
| Source code (boundaries) | The `../` imports in `ui/` stay inside `ui/` (`ui/app/page.tsx:4–5`; `ui/components/ModelPills.tsx:5–6`; `ui/app/layout.tsx:3`). The UI communicates with the backend only through HTTP (`ui/lib/api.ts:1–16`, `NEXT_PUBLIC_REVIEW_API_URL`). `Dockerfile:23–29` packages only the Python backend. | context |
| Technology | `ui/package.json:14–28`: `next` 16.3.8, `react` 19.3.0, `react-dom` 19.2.8 and Tailwind 4. No explicitly configured bundler; Next encapsulates it. | context |
| Negative search | `git grep -i` at the SHA, in `ui`, `src`, `docs` and `README.md`, for `postMessage`, `federation`, `single-spa`, `customElements` and `<iframe`. Finds only `FederationPolicy`/`hex_service_kit.federation`, concerning identity federation (`docs/practices-audit.md:29`; `src/review_console/adapters/gcp/identity.py:24`), unrelated to frontend. | absent |

## Authorship and history

Non-shallow clone.
- **Commits reachable from the SHA:** 57, no merges, all by Ashish Awasthi (noreply and `@gmail.com` identities, 48 commits) and `dependabot[bot]` (9). Root is `f65ee72` (2026-08-22, “Initial commit”); SHA is `191cd1f` (2026-10-02).
- **Assistance tools:** `AGENTS.md:1–12` refers to a shared organization working agreement, and `.agents/skills/` contains playbooks, including `embeddable-secure-ui/SKILL.md:1–30`, describing the embeddable UI pattern applied here. Metadata does not distinguish intellectual authorship.
- **Refs outside the snapshot:** `dependabot/*` branches (with commits from 2026-10-05 and 2026-10-09) were not considered.

No historical blob was read. The clone is partial and `git rev-list --objects --missing=print` at the SHA reports 193 missing promisor blobs; the SHA snapshot was read locally, without network.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`ui/`). The Python backend is not a frontend unit. No composition configuration references other units. |
| Q2 | Yes (for the unit) | `ui/` has its own entry and build (`ui/package.json:7–9`), separate from the backend, with which it communicates only through HTTP. |
| Q3 | Undetermined | The customer's host application is not in the repository; only documentation describes insertion (`docs/embedding-and-identity.md:16–19`, `122–130`). |
| Q4 | Undetermined | The unit is configured for embedding, through iframe (`frame-ancestors`) or same-origin subpath (`basePath`, embed mode), but the host side is not observable. |
| Q5 | No | There is a unit prepared for insertion into an external host, not an MFE instance in the repository. |

## Rationale

- Proposed `MFE-unit` with `status: review`, under the same reasoning as 031 (`MFE-unit`/review, `approaches: [iframe]`): single unit prepared for composition by an unobservable host, through iframe.
- **Difference from 031:** 031 had a bidirectional contract (navigation registration and `postMessage` messages). Here preparation is insertion configuration: `basePath`, mode without chrome and `frame-ancestors` allowlist, without a messaging protocol.
- **Open checklist decision:** “Link-only or iframe composition: does it count as a composition mechanism for Q4?”. If it does not count, the case becomes `Non-MFE`, as a service's “conventional frontend” with an embeddable UI.
- **Inapplicable precedents:**
  - not a third-party platform (102/074/080, 037): the host is the application of any customer adopting the service;
  - not code sharing (089/100);
  - no complete chain (076/084/096/106/109);
  - not content (023): there is a real, functional UI.
- **Fields:**
  - `approaches: [iframe]`, as in 031, because of `frame-ancestors`; the same-origin reverse proxy form is recorded in the Notes.
  - `ui_technologies: [react, next]`; `build_tools: []`, under the Next convention.
  - `frontend_units: 1`, `single-unit`.
  - `repo_type: template`: reference base for institutions to fork (`docs/ADOPTING.md:1–5`, with renaming tool `scripts/rename_fork.py`). `production` would also be defensible.

## Analysis notes

- **RQ2:** micro-frontend through document insertion (iframe with `frame-ancestors`) or same-origin mounting under a reverse proxy subpath, with server-verified identity and no runtime contract with the host. A variant of link or iframe composition.
- **RQ1 (misleading signals):** “micro-frontend” as a label for the embeddable UI of a backend-centric service. “Federation” in code is identity federation.
- **Protocol (search):** entry only through hyphenated spelling `README.md:159`; the plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

Decide whether a UI prepared for insertion into an external host only through iframe (`frame-ancestors`) and same-origin subpath (`basePath`, mode without chrome), without `exposes`, lifecycles, custom element or messages, counts as a “frontend unit explicitly prepared to be composed by an external host”.

- **MFE-unit (proposed):** follows 031, with explicit, documented preparation (`docs/embedding-and-identity.md`) for an unobservable host.
- **Non-MFE:** if the open iframe or link decision is negative, or if the absence of a runtime contract with the host carries weight, as in the contrast with 031.

No new rule is proposed. Until a decision, preserve `MFE-unit`/`review`.
- **Independent review contribution (Lupa):** agreement with MFE-unit, Q1–Q5 No/Yes/Undetermined/Undetermined/No and `review`; preparation for embedding is explicit in code and configuration, the host is absent and the methodological iframe decision remains open (checklist), alongside 031. Adopted corrections, verified in the clone: 193 missing promisor blobs (rather than “no missing objects”) and the terminology occurrence is not unique in repository documentation, as it recurs in the four files above. `repo_type: template` is confirmed by `ADOPTING` and `rename_fork`; `build_tools: []` because the bundler is not declared separately. Dependabot refs later than `main` were not included in snapshot assessment.
