---
schema: 1
id: 1048736095
full_name: lucasspanholo/micro-frontend-whale
url: https://github.com/lucasspanholo/micro-frontend-whale
commit: b4decbb258cbc5108da343c2f757678dc232b1e0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 220 — lucasspanholo/micro-frontend-whale

## Context

One React/Vite application, “Gerenciador de Criptomoedas” (English translation: “Cryptocurrency Manager”), in folder `Gerenciador de Criptomoedas/`, exported from Figma Make. Internal README says “This is a code bundle for Gerenciador de Criptomoedas. The original project is available at https://www.figma.com/design/…” (`Gerenciador de Criptomoedas/README.md:2–4`), and `src/Attributions.md:1` says “This Figma Make file includes components from shadcn/ui”. Application switches two pages (market and portfolio) through state (`src/App.tsx:8–23`), with fictitious data.

Root `README.md` has one line, `# micro-frontend-whale` (`README.md:1`), repeating repository name. No other file mentions micro-frontends. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:221` records rank 220, ID 1048736095, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:221` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:18323` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:18328` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2025-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:25:35.331Z / 2026-10-08T15:55:44.505Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:56:44.152Z / 2026-10-08T16:06:40.848Z |

Effective queries append `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Hit metadata:
- null description, no topics, TypeScript language, `fork: false`, size 73;
- creation at 2025-09-02T00:18:41Z, push at 2025-09-02T00:28:33Z.

Retrieval comes from repository name and README title, `README.md:1`, “# micro-frontend-whale”, repeating name. Phrase search treats hyphen as separator. Plural “micro frontends” does not appear literally; this hit depends on unrecorded GitHub search text processing.

Root `README.md` comes from root commit `b7f499c` (2025-09-01) and was unchanged afterward. It predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 75 entries, all regular files `100644`; zero symlinks and zero gitlinks. Only `README.md` at root. One project in `Gerenciador de Criptomoedas/` (`index.html`, `package.json`, `vite.config.ts`, `src/` with 11 domain components, 48 shadcn/ui files in `src/components/ui/`, fictitious data and styles), plus two `.DS_Store`. | contrary |
| Source code | `Gerenciador de Criptomoedas/src/App.tsx:1–23`: root component with static imports and `useState` page switching. `src/main.tsx:2–6`: `createRoot(...).render(<App />)`. | contrary |
| Configuration / Build | `Gerenciador de Criptomoedas/vite.config.ts:2–7`: only `@vitejs/plugin-react-swc` and version aliases. `package.json:6–45`: Radix UI, React and related packages, without composition dependency. | contrary |
| Search | `git grep -i` at the SHA for `micro.?front`, `federation`, `single.?spa` and `remoteEntry`: only `README.md:1`. | absent |

## Authorship and history

Non-shallow clone; 2 commits, no merge, by lucas.spanholo `<lucasspanholo@gmail.com>`, on 2025-09-01 (-03:00): `b7f499c` (“first commit”, only `README.md`) and SHA `b4decbb` (“add project”, application’s 74 files). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend application; no configuration references another unit. |
| Q2 | No | No second unit exists whose independence could be evaluated. |
| Q3 | No | No host composes units; pages are local components (`src/App.tsx:18`). |
| Q4 | No | No composition mechanism (`vite.config.ts:2–7`; recorded search). |
| Q5 | No | Q1–Q4 are No: single Figma Make-generated application in repository whose title repeats name. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”.
- Code came from generator (Figma Make), as generator cases 075/081/094/105. Classification, however, follows absence of composition.
- Sole micro-frontend signal is README title matching repository name.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** README title repeating repository name matches terminology queries, without any other term use.
- **Protocol (search):** plural hit `"micro frontends"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
