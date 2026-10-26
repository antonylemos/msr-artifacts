---
schema: 1
id: 1377516451
full_name: brunotrolo/Salesforce_Journey_Designer
url: https://github.com/brunotrolo/Salesforce_Journey_Designer
commit: 91b85595fafcf47c1bac0dc3e1d3b1a08461a1a1
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 207 — brunotrolo/Salesforce_Journey_Designer

## Context

“Salesforce Journey Designer” (`README.md:1–38`): journey-design studio for Salesforce → Salesforce migration. Set of Claude Code agents and skills (`.claude/agents/`, `.claude/skills/`, `.claude/rules/`, `.claude/hooks/`) with Spec-Driven Development method documentation (`docs/sdd/`).

README and documents describe target architecture where each business domain would be “uma fronteira de micro-frontend independentemente implantável” (English translation: “an independently deployable micro-frontend boundary”) (`README.md:56–59`; `docs/sdd/DOMAINS.md:1–3`). No domain was specified or built in snapshot: `specs/` has only `README.md`, and domain status is “rascunho” (English translation: “draft”) (`docs/sdd/DOMAINS.md:7`).

Sole executable frontend project is `.claude/skills/salesforce-ux/design-system-2-starter-kit/`, an unchanged vendored copy of official Salesforce starter kit (LWC + Vite + SLDS2), used as prototyping environment (`.claude/skills/salesforce-ux/README.md:3–9`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:208` records rank 207, ID 1377516451, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:208` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:37607` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:37639` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:43:47.840Z / 2026-10-08T16:02:30.405Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:13:00.432Z / 2026-10-08T16:10:54.650Z |

Effective queries append `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Hit metadata:
- null description, no topics, JavaScript language, `fork: false`, size 1.084;
- creation at 2026-09-19T18:56:48Z, push at 2026-10-04T01:58:33Z.

README spellings:
- “micro-frontend”: `README.md:57` (“Cada domínio é uma fronteira de micro-frontend independentemente implantável”; English translation: “Each domain is an independently deployable micro-frontend boundary”) and `README.md:181` (“fronteiras de micro-frontend”; English translation: “micro-frontend boundaries”). Phrase search treats hyphen as separator.
- Plural “micro frontends” appears literally in neither README nor description. “micro-frontends” appears only outside README (`specs/README.md:3`). Plural hit depends on unrecorded GitHub search text processing.

Last README change is `61185d0` (2026-09-24), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 394 entries, 393 regular files `100644` and 1 executable `100755` (`.claude/skills/salesforce/design-systems-slds-validate/scripts/analyze-quality.cjs`); zero symlinks and zero gitlinks. 378 entries are in `.claude/` (249 in `skills/salesforce`, 105 in `skills/salesforce-ux`). Remainder: `README.md`, `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `NOTICE.md`, `docs/` (4 files), `specs/README.md`, `scripts/verify-skills.mjs`, `assets/banner.svg`, one `.bat` and CI workflow. | contrary |
| Documentation (intent) | `README.md:56–61` and `docs/sdd/DOMAINS.md:1–17`: seven domains planned as micro-frontend boundaries, to implement as “LWR site/UI Bundle de Experience Cloud, um conjunto de OmniScripts+FlexCards, ou um pacote de LWCs” (English translation: “Experience Cloud LWR site/UI Bundle, a set of OmniScripts+FlexCards, or an LWC package”) (`:3`), with status “rascunho” (English translation: “draft”) (`:7`). Agents repeat premise (`.claude/agents/fsc-journey-ux-designer.md:34`; `fsc-sdd-orchestrator.md:12`). | weak |
| Source code (implementation) | `specs/` contains only `README.md`; no `spec.md`, `prototype/` or domain artifact. No own frontend unit. | contrary |
| Third-party code | `.claude/skills/salesforce-ux/design-system-2-starter-kit/package.json:1–35`: Salesforce UX starter kit (LWC, Vite). One application; “apps” in `src/apps.config.js:1–30` are route groupings in same build, with own navigation. `.claude/skills/salesforce-ux/README.md:5`: “Vendorizado sem alteração de código” (English translation: “Vendored without code changes”). | contrary |
| Search | `git grep -i` at the SHA for `micro.?front`, `federation` and `single.?spa`: only documentation and agent-prompt texts (README, `docs/sdd/DOMAINS.md`, `specs/README.md`, `.claude/agents/*`, `.claude/skills/salesforce-ux/README.md:13`). No composition configuration. Starter-kit `../../../` imports stay within kit itself. | absent |

## Authorship and history

Non-shallow clone; 6 commits, no merge.
- **Root:** `46238a9` (2026-09-19, “Início do histórico público”; English translation: “Beginning of public history”, 391 files), with author `Claude <noreply@anthropic.com>`. Message declares squashing previous history and carries trailers `Co-Authored-By: Claude Sonnet 5` and `Claude-Session`.
- **Owner:** `9ccb5d0` (Bruno Teixeira, through web interface), `eb13ac2` and `61185d0` (`brunotrolo`), from 2026-09-23 to 2026-09-24, with README and CI adjustments.
- **SHA:** `f2cec7e` and `91b8559` (2026-10-04), again with author `Claude <noreply@anthropic.com>`, adjust agents, hooks and documentation.

Pre-squash history is unavailable. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No own frontend unit; domains are only planned (`docs/sdd/DOMAINS.md:7`; empty `specs/`). Vendored starter kit is one third-party application. |
| Q2 | No | Without two units, no independence requires evaluation. |
| Q3 | No | No host, shell or root configuration composes units. |
| Q4 | No | No composition mechanism is configured. Micro-frontends architecture is only described (`README.md:56–59`). |
| Q5 | No | Q1–Q4 are No: agent kit and method documentation mentioning micro-frontends as target architecture. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Starter kit is third-party code vendored as prototyping tool, without composition relationship. Same treatment as 205 (third-party code outside project scope), not 102/074/080 (units’ hosting platform).
- Method/prompt content, as 023/094: repository describes how to design, but contains no composed units.
- `frontend_units: 0` (vendored kit is not project unit), `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`. `repo_type: other`: agent tool for journey design, neither MFE example, template nor library.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “micro-frontend” as target-architecture term in AI-agent kit, with domains still drafts.
- **Protocol (search):** plural hit `"micro frontends"` has no literal README spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (authorship):** three of six commits have author `Claude <noreply@anthropic.com>`, including initial squash and SHA.
