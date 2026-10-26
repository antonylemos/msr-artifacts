---
schema: 1
id: 1099555541
full_name: Nidhi812/mfe-personal-loan-app
url: https://github.com/Nidhi812/mfe-personal-loan-app
commit: 245d2d1aec6172c5dcec223b1f55097bf626bc2e
classification: Non-MFE
checklist: { q1: no, q2: undetermined, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: null
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 072 — Nidhi812/mfe-personal-loan-app

## Context

- **Implementation approach (declared):** Module Federation (Angular), host + remote
- **Repository type:** example/proof of concept ("Module Federation Demo - Host & Remote Applications", `README.md:1`)
- **Classification:** Non-MFE (unit code inaccessible; alternative: Uncertain)
- **Assessed commit:** `245d2d1` (default branch `master`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Only 6 entries: `README.md`, `.gitignore`, `.github/workflows/{deploy,main}.yml` and two **gitlinks** (`host-app` and `personal-loan-app`, mode `160000`, commits `314812e` and `b02e940`) without `.gitmodules`. These are nested repositories added by mistake (`8aff2f8` "initial import of host-app and personal-loan-app"); app contents are not in the repository, nor is there a URL to retrieve them | absent |
| Documentation | `README.md:1-35`: host (4200) and remote "Personal Loan App" (4201); `:100` `"personalLoanApp": "http://localhost:4201/remoteEntry.js"`; `:112-113` `exposes` excerpt (uncorroborated) | weak |
| Build/deploy | `.github/workflows/deploy.yml:24-59`: `npm install` and `npm run build --prod` at the root, which has no `package.json`; the workflow would have nothing to build (broken workflow) | context |
| Configuration / Source code | Nonexistent in the repository (inside gitlinks) | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No accessible frontend unit in the repository; units appear only in the README, not in tracked composition configuration |
| Q2 | Undetermined | No way to verify the units |
| Q3 | Undetermined | The host is not observable |
| Q4 | Undetermined | MF configuration exists only as a README excerpt |
| Q5 | No | Documentation without artifact corroboration (protocol 3.4.7) |

## Rationale

- Q1 is No under the operational criterion ("identifiable in the repository or explicitly referenced by its composition configuration"): code is in gitlinks without content or origin. The MFE-unit exception does not apply because no unit is observable.
- In automatic filtering (protocol section 3.2), it fits "repositories with no accessible source or configuration artifacts". The README describes an MFE that the repository does not contain.

## Analysis notes

- **RQ1 (unusual artifact):** gitlinks without `.gitmodules` (nested repositories committed by mistake) leave the repository effectively empty; a file search would find nothing beyond the README.

## Point for joint review

- Alternative: **Uncertain**, for consistency with repository 038 (code outside the repository). Difference: 038 had orchestration (compose, gateway) referencing units; here there is only a README and broken workflows, and gitlinks do not point to any recoverable repository.
