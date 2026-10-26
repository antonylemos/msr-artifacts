---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
url: https://github.com/LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [wordpress]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Context

- **Implementation approach:** Web Components: remote custom element (`<x-subscriberform>`) loaded through `<script type="module">` from another origin and embedded in a WordPress page
- **Repository type:** example/proof of concept (UX308 course assignment, based on template `cd-wordpress`/`wp-pwa`)
- **Classification:** MFE-implemented (requires review: composition in CMS content, trivial external unit)

The repository is a WordPress site (Playground + SQLite) exported as a static site to GitHub Pages through `wp-pwa` (`package.json`, `.github/workflows/main.yml:30`). The template declares explicit intent: "The idea of this is as a consumer of microfrontends… Have fun composing work from autonomous teams" (`README.md:12-16`). Composition is not in code files, but in **page content**, stored in the tracked SQLite database (`wp-content/database/.ht.sqlite`).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:12-16`: "a consumer of microfrontends… example microfrontend for paypal standard… composing work from autonomous teams" | context |
| Structure | WordPress site (`wp-content/themes/*`, `wp-content/plugins/*`, `mu-plugins`) as the host unit; no code for the consumed MFE in the repository | context |
| Composition (content) | `wp-content/database/.ht.sqlite` (page content): `<link rel="stylesheet" href="https://lebleb03.github.io/Contact_form_UX308/x-form.css">`, `<script src="https://lebleb03.github.io/Contact_form_UX308/x-form.js" type="module">` and element `<x-subscriberform></x-subscriberform>` in the "Subscriber Form" section (3 occurrences, probably revisions) (runtime composition) | strong |
| Composition (external unit) | `Contact_form_UX308`: another repository from the same author, published on GitHub Pages (`lebleb03.github.io`) and outside the sample; element definition not observable | absent |
| Build/deploy | `.github/workflows/main.yml:30`: `diy-pwa/npm-build-2-gh-pages` publishes the site; external unit has its own deployment (another origin) (independent deployments) | moderate |
| Source code (noise) | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1-7`: trivial custom element `x-year` from a Playground plugin (not used as a unit) (misleading signal) | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The WordPress site (host) + external unit `x-form`/`x-subscriberform`, referenced by composition in the page (script + element) |
| Q2 | Yes | The external unit is deployed separately (another origin, `lebleb03.github.io/Contact_form_UX308/`); none of its code is in the repository |
| Q3 | Yes | The host page mounts the element in the form section |
| Q4 | Yes, with caveat | Remote `<script type="module">` + custom element used in content; that `x-form.js` defines `<x-subscriberform>` is an inference (remote code is not in the sample) |
| Q5 | Yes, with caveat | See review point |

## Rationale

- Q1–Q5 are Yes, leading to MFE-implemented, following the pattern of repository 043 (Web Components loaded from another origin at runtime) and 008 (only the host in the repository, referencing an external unit).
- Architectural intent is explicit ("consumer of microfrontends" template), and the author created the external unit in a separate repository with its own deployment.

## Analysis notes

- **RQ1:** unusual composition artifact: page content in a tracked database. A search for code/configuration files would not find composition.
- **Protocol (family):** `cd-wordpress` template from organization `diy-pwa` (UX308 course); other assignments from the same course may appear in the sample.

## Point for joint review

- **Composition in CMS content:** evidence is in a tracked binary SQLite database, not code or configuration. This is difficult to mine and may be viewed as a widget "embed snippet" rather than architecture.
- **Scale:** the external unit is a subscription form; composition is a single embed. If the study requires the host to be a frontend application (not a CMS page) or composition to be in a code artifact, the case becomes **Non-MFE**.
- **Difference from platform plugins (010, 022, 035, 037):** here the author created and composes both units; the platform (WordPress) only hosts content and is not the composition mechanism.
