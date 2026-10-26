---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 216 — fi-x64/mfe

## Repository overview

Repository has no documentation. `artifacts.csv` lists no `documentation` files, no README/other `.md` in snapshot, `matches.csv` no `doc-*` occurrences. Four packages' `package.json` files lack `description` (packages/auth/package.json:1-29; packages/container/package.json:1-30; packages/dashboard/package.json:1-33; packages/marketing/package.json:1-30); workflow `name` values `deploy-container`/`deploy-marketing` (.github/workflows/container.yml:1; .github/workflows/marketing.yml:1) only name jobs.

Sole architectural text: marketing bootstrap comments (packages/marketing/src/bootstrap.js:10-11, 20-21), both table rows. Describe two unit modes: isolated development mounts itself; container loading only exports `mount`. Both match previous reviews, `packages/marketing` own entry (3.4.3), remote mounted through `mount` by container (3.4.5 #1). "Mount function to start up the app" (packages/marketing/src/bootstrap.js:5) only internal function, no row.

Comments read in all previously cited artifacts: two workflows, container/marketing webpack configurations, `package.json`, `index.html`, `packages/container/src/`/`packages/marketing/src/` code. Webpack configurations/workflows/container code have no comments. Marketing component comments solely layout (packages/marketing/src/components/Landing.js:53, 72, 115, 148, 163; packages/marketing/src/components/Pricing.js:147, 169, 173). `packages/auth`/`packages/dashboard` only `package.json`/lockfile, no descriptive text.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | packages/marketing/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (marketing mounts itself when isolated) | independence | corroborated | 3.4.3 (packages/marketing `Yes`); packages/marketing/src/bootstrap.js:12-17; packages/marketing/public/index.html:5 |
| 2 | packages/marketing/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (marketing mounted by container) | composition | corroborated | 3.4.5 #1; packages/marketing/src/bootstrap.js:22; packages/marketing/config/webpack.prod.js:16-18; packages/container/src/components/MarketingApp.js:1, 8 |

## Observations

**1. packages/marketing/src/bootstrap.js:10-11.** Development bootstrap seeks `#_marketing-dev-root`, calling `mount` when found (packages/marketing/src/bootstrap.js:12-17). Element only in own marketing `index.html` (packages/marketing/public/index.html:5), served on development port 8081 (packages/marketing/config/webpack.dev.js:10, 24-26), absent from container page with only `#root` (packages/container/public/index.html:5). Condition therefore only true on isolated marketing page. Production build generates no `index.html` (3.4.6 #2), automatic mounting limited to development as comment states.

**2. packages/marketing/src/bootstrap.js:20-21.** Bootstrap exports `mount` (packages/marketing/src/bootstrap.js:22), exposed as `./MarketingApp` (packages/marketing/config/webpack.prod.js:16-18; packages/marketing/config/webpack.dev.js:19-21). Container imports `mount` from `marketing/MarketingApp`, calls on own `div` (packages/container/src/components/MarketingApp.js:1, 8), active composition relationship (3.4.5 #1). Comment says "container", host unit has that name (packages/container/package.json:2).

## Summary

Claims: 2 (corroborated: 2, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (composition: 1, independence: 1).
