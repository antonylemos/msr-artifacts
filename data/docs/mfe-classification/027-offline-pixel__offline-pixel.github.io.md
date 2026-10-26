---
schema: 1
id: 291806694
full_name: offline-pixel/offline-pixel.github.io
url: https://github.com/offline-pixel/offline-pixel.github.io
commit: f4ff3e7ace000b90d07114904545fe4dcf14ab1c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
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

# 027 — offline-pixel/offline-pixel.github.io

## Context

- **Repository type:** production-oriented (consultancy corporate/marketing site, published on GitHub Pages)
- **Assessed commit:** `f4ff3e7a` (default branch `master`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | 1,738 tracked files: static HTML pages (`*.html`, `blogs/*/index.html`, `aiml/`, `hire/`, `locations/`, etc.), standalone scripts (`scripts/*.js`, `inject-*.js`) and already compiled bundles (`assets/*.js`, `index-*.js`); no `package.json`, `vite.config` or `webpack.config` | absent |
| Technology / Configuration | No MFE dependency or config; no occurrences of `federation`, `remoteEntry` or `customElements.define` in the bundles (`index-BixGxctp.js`, `index-D9eggxik.js`) | absent |
| Build/deploy | `.github/pages.yml` (9 lines, only `node_modules` cache); `_config.yml`/`.nojekyll` for GitHub Pages | contrary |
| Documentation | `readme.md:50` "Full-scale migrations from legacy frameworks to lightning-fast, modern microfrontends."; `readme.md:89` "microfrontends" as an offered service; `blogs/microfrontends-vs-monolith-frontend/index.html` (article); bundles contain "microfrontend(s)" only as content text | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No identifiable frontend unit with its own entry and build; the repository is a site's published output |
| Q2 | No | No units to compare |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is a consultancy's marketing site (static pages, blog, hiring landing pages) published on GitHub Pages, with compiled artifacts and no source for the dynamic parts.
- "microfrontends" appears as an offered service (`readme.md:50,89`) and as a blog post topic.
- Matches "repositories mentioning micro-frontends without implementing them". In the protocol's automatic filtering (section 3.2), it would also fit "no accessible source or configuration artifacts" for the JS parts.

## Analysis notes

- **RQ1 (misleading signals):** content/SEO sites with articles about micro-frontends appear through explicit-term searches; the term occurs in HTML and compiled bundles, not project-authored code.
