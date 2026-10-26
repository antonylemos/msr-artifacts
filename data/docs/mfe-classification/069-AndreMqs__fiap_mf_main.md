---
schema: 1
id: 976411996
full_name: AndreMqs/fiap_mf_main
url: https://github.com/AndreMqs/fiap_mf_main
commit: 65ac8ce82eb1bc752c0cfafd63660185c2d79c23
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 069 — AndreMqs/fiap_mf_main

## Context

- **Implementation approach:** Module Federation (`@originjs/vite-plugin-federation`)
- **Repository type:** example/proof of concept (FIAP postgraduate assignment: financial management app in three repositories)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:1-12`: "Projeto de Gerenciamento Financeiro com Microfrontends… Module Federation" [English translation: "Financial Management Project with Microfrontends… Module Federation"]; three repositories: `fiap_mf_consumer_root` (container and route orchestrator), `fiap_mf_home` (landing) and `fiap_mf_main` (logged-in area, this repository) | moderate |
| Configuration | `vite.config.ts:9-27`: `federation({ name: 'fiap_mf_main', filename: 'remoteEntry.js', exposes: { './Main': './src/App.tsx' }, shared: [react, react-dom, @mui/*, @emotion/*, lodash, recharts, classnames, zustand] })`; no `remotes` | moderate |
| Source code (contract) | `src/hooks/useParentApp.ts:1-19`: reads and writes the username through `window.global.setUserName/getUserName`, functions provided by the container (contract with the host) | moderate |
| Structure | A single app (logged-in area: statement, transactions, investments, CSV upload) | contrary |
| Composition | Container `fiap_mf_consumer_root` is in another repository, outside the sample | absent |
| Build/deploy | `dockerfile`, `default.conf` (nginx), `docker-compose.yml` (with `db.json`, mock API): its own deployment | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; composition config has only `exposes` (`vite.config.ts:12-14`) |
| Q2 | Yes (for this unit) | Its own build and image (`dockerfile`, `default.conf`) |
| Q3 | Undetermined | Container `fiap_mf_consumer_root` is not in the repository |
| Q4 | Undetermined | Remote side configured and contract with the host (`useParentApp.ts`); the consumer is not observable |
| Q5 | No | A unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No; the MFE-unit exception applies: an MF remote with `exposes` and an explicit contract with the container (`window.global`), unobservable host.
- Matches "repositories containing only a remote unit, without the composing host".

## Analysis notes

- **Protocol (multi-repository ecosystem):** the full architecture (container + home + main) is documented in the README, but only this remote is in the sample.
- **RQ3:** host ↔ remote communication through global functions in `window.global`, a simple and implicit contract.
