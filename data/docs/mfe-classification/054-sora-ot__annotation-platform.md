---
schema: 1
id: 1240812323
full_name: sora-ot/annotation-platform
url: https://github.com/sora-ot/annotation-platform
commit: 51ee5b4f90475153e71c1496cdb8f17622a06312
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: production
approaches: [iframe]
ui_technologies: [vue, react]
build_tools: []
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 054 — sora-ot/annotation-platform

## Context

- **Implementation approach:** Vue portal (`baseApp`) integrating third-party annotation tools (Xtreme1 and Label Studio) through **iframe** with authentication handoff; qiankun configured but disabled and without a compatible sub-app
- **Repository type:** production-oriented / proof of concept (2D/3D annotation platform aggregating vendored open-source tools; 8,068 files in a single commit)
- **Classification:** Uncertain (depends on the iframe decision; under the rule suggested in 031, becomes MFE-implemented)
- **Assessed commit:** `51ee5b4` (only commit, "first_commit")

The repository brings together: `baseApp/` (project-authored Vue 3 + Vite portal), `baseApp-backend/`, vendored copies of `xtreme1-main/` (Xtreme1, 3D annotation tool) and `ls-test/` (Label Studio), plus Python ML projects (`OpenPCDet/`, `3d-detection/`, `label-studio-ml-backend/`, `sam2/`, `yolo_test/`).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `baseApp/package.json:16`: `qiankun` ^2.10.16 | weak |
| Configuration (qiankun) | `baseApp/src/main.ts:8-56`: `registerMicroApps([{ name: 'xtreme1', entry: '//localhost:3100', container: '#subapp-container', activeRule: '/xtreme' }])` + `start()`, **only if** `VITE_ENABLE_QIANKUN === 'true'` (`:8-9`); no tracked `.env` enables the flag; container `#subapp-container` does not exist in any template; `xtreme1-main/` has neither qiankun lifecycles nor `__POWERED_BY_QIANKUN__` (inactive configuration) | ambiguous |
| Composition (iframe) | `baseApp/src/components/XtremeHostPanel.vue:15-18` and `baseApp/src/views/XtremeStandalone.vue:3,19`: `<iframe :src="xtremeFrameUrl">`, URL computed from the route (`xtremePath` and query forwarded, `XtremeHostPanel.vue:34-50`); `baseApp/src/router/index.ts:61-75`: routes `/xtreme`, `/xtreme1-main` and `/labelstudio` | moderate |
| Source code (contract with units) | `baseApp/src/utils/xtremeAuth.ts:1-3,80-100`: writes/clears the Xtreme1 token in a cookie (`baseapp_xtreme_token`, legacy keys), authentication handoff; `baseApp/src/utils/labelStudioUrl.ts:62-115`: builds Label Studio URLs through a proxy (`VITE_LABEL_STUDIO_BASE_PATH`) from task "jumps" (integration contract) | moderate |
| Structure | Three frontends: `baseApp/` (project-authored), `xtreme1-main/` (its own frontend) and `ls-test/web/` (Label Studio, monorepo with `libs/editor`, `libs/datamanager`, etc.); each with its own build; no source code imports between them (independent units) | strong |
| Build/deploy | `baseApp/docker-compose.yml:1-3`: nginx; Xtreme1 and Label Studio run as their own services (port 3100, Label Studio proxy) | moderate |
| Documentation | `baseApp/README.md`: Vue/Vite boilerplate; no architecture description | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `baseApp` (portal) + Xtreme1 and Label Studio (their own frontends, in the repository and served separately) |
| Q2 | Yes | Separate builds and services; no source code imports between portal and tools |
| Q3 | Yes | The portal routes `/xtreme` and `/labelstudio` to views embedding the tools (`router/index.ts:61-75`) |
| Q4 | **Undetermined** | The effective mechanism is iframe with a contract (token in a cookie, forwarded route/query): unresolved decision. qiankun is configured but inactive (flag off, nonexistent container, sub-app without lifecycles), which under the operational criterion is "configuration whose actual use is unclear" or "unused or experimental" |
| Q5 | Undetermined | Depends on the iframe decision |

## Rationale

- No answer is No and Q4 is Undetermined, leading to **Uncertain**.
- Under the rule suggested in repository 031 ("iframe counts when there is an explicit host contract"), Q4 would become Yes: there is authentication handoff (`xtremeAuth.ts`), route/query forwarding to the embedded tool and a proxy configured for Label Studio. In that case, **MFE-implemented**.
- qiankun is technology evidence without effective use: probably an integration attempt abandoned in favor of iframe (Xtreme1 was not adapted as a sub-app).

## Analysis notes

- **RQ1 (misleading signals):** qiankun dependency + `registerMicroApps` in code, but inactive; real composition is iframe. A dependency-only analysis would misclassify it.
- **Protocol (corpus):** if included, restrict mining to `baseApp/` and integration points; the rest (8 thousand ML and vendored-tool files) is noise.

## Recorded decision

Retain **Uncertain**. Although the portal integrates Xtreme1 and Label Studio through iframe with authentication handoff, Qiankun integration is disabled and the protocol decision about iframe as an MFE composition mechanism has not been resolved for this case. Integrated tools are also vendored third-party products, preserving ambiguity between MFE composition and application integration.
