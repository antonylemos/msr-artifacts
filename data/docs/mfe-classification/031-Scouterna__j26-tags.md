---
schema: 1
id: 1313837166
full_name: Scouterna/j26-tags
url: https://github.com/Scouterna/j26-tags
commit: 1e7f7bfd70988433954f285ca160849307048150
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [iframe]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 031 — Scouterna/j26-tags

## Context

- **Implementation approach:** iframe composition in an external shell (`j26-app`), with navigation registration through an HTTP endpoint and communication through `postMessage`
- **Repository type:** production-oriented application (RFID tag registration for the Jamboree26 event, Docker image published by CI)
- **Classification:** MFE-unit (depends on the unresolved decision about iframe composition)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:7-8` "Runs as a micro-frontend in an iframe inside the **j26-app** shell, mounted at `/_services/tags`."; repeated in `CLAUDE.md:13` | moderate |
| Structure | A single TanStack Start app (frontend + server routes + Prisma) | contrary |
| Configuration | `vite.config.ts:8-17`: `BASE = "/_services/tags"` applied in `base`, `nitro({ baseURL })` and `tanstackStart({ router: { basepath } })`; `src/router.tsx:7` `basepath: "/_services/tags"`. The app is mounted under a shell prefix. | moderate |
| Source code (shell registration) | `src/routes/api/app-config.ts:7-11`: "Shell navigation registration. j26-app fetches this and only renders the nav item when it returns 200"; `:24-45`: returns navigation items (`/_services/tags`, `/_services/tags/admin`) by permission (contract with the host) | strong |
| Source code (communication) | `src/lib/use-app-bar-title.ts:3-13`: `window.parent.postMessage({ type: "j26:appBar", title }, origin)`, the messaging protocol with the shell embedding it (contract with the host) | strong |
| Composition | Shell `j26-app` (which fetches `/api/app-config` and embeds the app in an iframe) is not in the repository | absent |
| Build/deploy | `Dockerfile`, `.github/workflows/build-image.yml:41-53`: its own image published to the registry; independent deployment | moderate |
| Documentation (multi-repository ecosystem) | Keycloak authentication shared in the J26 ecosystem (`README.md:182-183`, repository `j26-keycloak`) | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; no composition configuration in the repository references other units |
| Q2 | Yes (for this unit) | Its own build, Docker image and deployment (`build-image.yml`) |
| Q3 | Undetermined | Shell `j26-app`, which embeds the app, is not in the repository |
| Q4 | Undetermined | The unit side is implemented (`app-config`, `postMessage`, basepath); the host mechanism is not observable, and it is iframe (unresolved decision) |
| Q5 | No | The evidence shows a unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No; the MFE-unit exception applies: "a single frontend unit explicitly prepared to be composed by an external host… but the composing host is not observable".
- Preparation is explicit and implemented: basepath under the shell prefix, navigation registration endpoint consumed by the shell and `postMessage` protocol for the title bar.
- Matches "repositories containing only a remote unit, without the composing host", here with iframe instead of MF or single-spa.

## Analysis notes

- **Protocol (multi-repository ecosystem):** the full architecture (shell `j26-app` + services such as this one) is distributed across several repositories in the Scouterna organization; a production multi-repository MFE case.
- **RQ2:** iframe approach with an HTTP + `postMessage` contract, without any MFE dependency.

## Point for joint review

- **Unresolved decision "link-only or iframe composition":** if iframe does not count as a composition mechanism, this repository becomes Non-MFE.
- Argument for counting it: this is not an isolated iframe, but a bidirectional contract with the shell (dynamic permission-based navigation registration + typed `j26:appBar` messages). Suggested rule: "iframe counts when there is an explicit integration contract with the host (registration, messages, routing); an isolated iframe does not count".
