---
schema: 1
id: 586861464
full_name: navikt/tms-mikrofrontend-selector
url: https://github.com/navikt/tms-mikrofrontend-selector
commit: f08e5555fda303c2243e8deea73030db1434cb38
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: no, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 048 — navikt/tms-mikrofrontend-selector

## Context

- **Repository type:** production-oriented (service from NAV, the Norwegian Labour and Welfare Administration, for the "Min side" portal; 320 commits, NAIS development/production deployment)
- **Classification:** Non-MFE (backend component of a real production MFE architecture; retained by the researchers, with interpretation still unresolved)

The repository is a **Kotlin backend service** ("Tjeneste som holder oversikt over hvilke mikrofrontends som skal vises på min side" [English translation: "Service that keeps track of which micro-frontends should be displayed on Min side"], `README.md:2`). It acts as a registry and selector: stores which micro-frontends each user should see and returns the JS bundle URLs for the portal to load. The micro-frontends (created from `navikt/tms-microfrontend-template-ssr`, `howto.md:5`) and the Min side portal (host) are in other repositories.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Backend only: `app/` (Ktor + Postgres + Kafka/Rapids, `app/src/main/kotlin/…`), `lib/` (message builder for producers, `lib/src/main/kotlin/no/nav/tms/microfrontend/Actions.kt`), `nais/{dev,prod}-gcp/nais.yaml`, `Dockerfile` | contrary |
| Source code (registration API) | `README.md:15-31`: `GET /microfrontends` returns `[{ microfrontend_id, url: "https://cdn…/mk1….js" }]` + `offerStepup`; `app/src/main/kotlin/…/SelectorApi.kt:30` (role in composition) | strong |
| Configuration (manifest) | `update-manifests-v2.py:3-21`: registers each MFE in `manifests-v2.json` with `url`, `appname`, `namespace`, `fallback`, `ssr`; `versions/ManifestsStorage.kt:8-24`: reads the manifest from a GCS bucket at runtime (role in composition) | strong |
| Source code (selection) | `EnableSubscriber.kt`/`DisableSubscriber.kt`: enable/disable MFEs per user through messages; `collector/regelmotor/ContentRules.kt` + `app/src/main/resources/contentrules.yaml`: display rules; `database/Microfrontend.kt` | moderate |
| Documentation | `howto.md:1-30`: guide for micro-frontend producer teams (SSR template, `nais.yaml`, deployment workflow, manifest update, channel `#minside-microfrontends`) | moderate |
| Build/deploy | `.github/workflows/update-manifest*.yaml`, `manual-manifest-update.yaml`: MFE manifest updates as part of producers' deployment | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the repository; MFEs appear only as runtime manifest/registry entries (GCS bucket, database), not as configuration tracked here |
| Q2 | Yes (external) | MFEs are deployed separately (CDN, NAIS), according to `howto.md` |
| Q3 | No | The host (Min side portal) is not in the repository; this service does not mount, load or route units: it only reports which URLs to load |
| Q4 | Undetermined | It is part of the composition mechanism (dynamic registry), but loading/mounting occurs in the absent host |
| Q5 | No | The repository contains no frontend; it is a composition support service |

## Rationale

- Q1 and Q3 are No; the MFE-unit exception does not apply (there is no frontend unit). In automatic filtering (protocol section 3.2), it fits "repositories containing no relevant frontend implementation".
- Nevertheless, this is **strong evidence of a real production MFE architecture** (NAV Min side), distributed across several repositories: per-user MFE registry, manifest with URL/SSR/fallback, guide for producer teams.

## Analysis notes

- **RQ3:** host → remote relationship mediated by a **runtime registry service** (frontend service discovery) with per-user rules, sensitivity level (`offerStepup`) and SSR, a layer absent from instructional examples.

## Point for joint review

- **Alternative — Uncertain**, for consistency with repository 038 (a meta-repository describing an MFE whose code is external). Difference: 038 describes the entire system (host + sub-apps); this repository is a specific backend component.
- **Suggested rule:** "backend MFE registry/selection services (frontend service discovery) without a frontend unit in the repository are Non-MFE, but recorded as ecosystem evidence".
- For mining, it might be useful to seek the host repository (Min side portal) and a producer MFE outside the sample, if the study accepts snowball expansion; the current protocol does not provide for it.
