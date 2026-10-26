---
schema: 1
id: 1140089034
full_name: Felliglanz/ioBroker.data-solectrus
url: https://github.com/Felliglanz/ioBroker.data-solectrus
commit: 7243eb07fc240c44da323ce9a4bb60c8cf8e0710
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 037 — Felliglanz/ioBroker.data-solectrus

## Context

- **Repository type:** production-oriented (ioBroker adapter published on npm, `package.json:2`, 101 commits)
- **Classification:** Non-MFE (through Q5, platform plugin rule; confirmed by the researchers)

ioBroker is a home automation platform. An adapter (Node.js backend, `main.js`, `lib/`) can provide custom components for the platform's administration UI (`ioBroker.admin`). In recent versions, Admin loads these components as **Module Federation remotes** declared in `admin/jsonConfig.json`.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Adapter backend (`main.js`, `lib/services/*`) + `src-admin/` (a React/Vite app with the configuration component) + `admin/custom/` (tracked compiled output) | contrary |
| Configuration (remote) | `src-admin/vite.config.ts:11-24`: `federation({ manifest: true, name: 'DataSolectrusItems', filename: 'customComponents.js', exposes: { './Components': './src/Components.tsx' }, remotes: {}, shared: { react, react-dom singletons } })`; `:13` "Must stay in sync with… `admin/jsonConfig.json`"; `:4-8` comment: shares react/react-dom to reuse Admin's instances | moderate |
| Configuration (platform registration) | `admin/jsonConfig.json:16-18`: fields `"type": "custom"`, `"url": "custom/customComponents.js"`, `"name": "DataSolectrusItems/Components/DataSolectrusItemsEditor"`. The platform reads this to load the remote | moderate |
| Build/deploy (artifacts) | `admin/custom/customComponents.js`, `admin/custom/mf-manifest.json` and `admin/custom/assets/*__loadShare__*`, `hostInit-*`, `virtualExposes-*`: tracked MF output | weak |
| Source code | `src-admin/src/DataSolectrusItemsEditor.tsx` (item editor) exposed through `src-admin/src/Components.tsx` | moderate |
| Composition | The host (ioBroker Admin) is the platform, external to the repository | context |
| Technology | `src-admin/package.json:13`: `@module-federation/vite`; `package.json:27`: `@iobroker/adapter-core` | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (the custom Admin component); `remotes: {}` |
| Q2 | Yes (for this unit) | Its own build (`src-admin/vite.config.ts`), output in `admin/custom/` |
| Q3 | Undetermined | The host (ioBroker Admin) is not in the repository |
| Q4 | Undetermined | Remote configured and registered in `jsonConfig.json`; the consumer is the platform |
| Q5 | **No** (override) | MF as a platform plugin mechanism (same rationale as repos 010 and 035) |

## Rationale

- Under a literal reading of the checklist, this would be **MFE-unit**: an MF remote explicitly prepared for an external host.
- But the host is a platform's administration UI (ioBroker Admin), and MF is the official extension mechanism of that UI: the adapter provides a form widget for the platform's configuration screen, not part of an application decomposed by the author.
- Consistent with repository 010 (Qodly, classified Non-MFE by the researchers) and 035 (MEXT).

## Analysis notes

- **Platform plugin rule — fourth case** (010 Qodly, 022 FireCMS Cloud, 035 MEXT, 037 ioBroker Admin). Proposed rule: "units whose only host is a third-party platform using MF/Web Components/iframe as an extension mechanism (plugins, blocks, custom components) are Non-MFE; record the platform".
- **Checklist (difference from 010):** here, federation config is project-authored (`src-admin/vite.config.ts`), not merely a third-party compiled artifact.
- **Checklist (researchers' decision):** retain Non-MFE. The platform plugin rule applies regardless of whether federation config is project-authored or only a compiled artifact.
- **RQ1:** tracked MF build output (`admin/custom/`) produces several technology signals (`mf-manifest.json`, `remoteEntry`) in automatic searches.
