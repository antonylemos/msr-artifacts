---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
inputs:
  clone: data/samples/mfe-sample-001/repos/lguilhermecardoso__mfe-react-vite-example
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Repository overview

There are 14 reachable commits up to snapshot, from 2025-07-15 to 2025-07-17. In `6cdaf6f` (2025-07-15, “first commit”), README, five projects and Vite configurations already appear: first observable presence, without revealing where developed before. The `fdf3ccb` (2025-07-17, “feat: finish v1 project”) adds About page and changes manifests and configurations; `980d535` (2025-07-17, “feat: try CD/CI configuration”) adds workflow, build script and both host environment files. Last commit is `ddf4741` (2025-07-17, “trigger deploy”).

Reviews 3.4.3–3.4.6 leave no undetermined unit, construct, relationship or deploy. Points are five unused dependencies in 3.4.2 and two contradicted claims in 3.4.7. Snapshot confirms scoped package usage, Pages remote selection through `IS_LOCAL=false` and React `^19.1.0`; alone it does not explain discrepancy origins. Some historical blobs are missing in partial clone: rejected queries downloaded no objects. This prevents reconstructing old configurations and some manifests. History explains point limits without changing snapshot judgments.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `vite-plugin-federation` declared and unused in `mf-dashboard` | 3.4.2 (mf-dashboard/package.json:31) | dependency use | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project | inconclusive |
| 2 | `vite-plugin-federation` declared and unused in `mf-login` | 3.4.2 (mf-login/package.json:31) | dependency use | 6cdaf6f 2025-07-15 first commit | inconclusive |
| 3 | `vite-plugin-federation` declared and unused in `mf-navbar` | 3.4.2 (mf-navbar/package.json:31) | dependency use | 6cdaf6f 2025-07-15 first commit | inconclusive |
| 4 | `vite-plugin-federation` declared and unused in `mf-personagem-detalhe` | 3.4.2 (mf-personagem-detalhe/package.json:31) | dependency use | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project | inconclusive |
| 5 | `vite-plugin-federation` declared and unused in `root-app` | 3.4.2 (root-app/package.json:33) | dependency use | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project; 980d535 2025-07-17 feat: try CD/CI configuration | inconclusive |
| 6 | README describes local consumption, but active environment selects Pages | 3.4.7 #9; 3.4.4 Notes; 3.4.5 Repository overview; 3.4.6 Repository overview | conflicting stages | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project; 980d535 2025-07-17 feat: try CD/CI configuration | inconclusive |
| 7 | About page says React 18, but manifests declare React 19 | 3.4.7 #16 | conflicting stages | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project | clarified |

## Observations

**1. Dependency in `mf-dashboard`.** Initial manifest and Vite configuration, from `6cdaf6f`, are unavailable as blobs. Manifest at `fdf3ccb` could be read and already contains both packages; it does not change afterward. Vite configuration changes in `fdf3ccb` and `980d535`. Snapshot uses `@originjs/vite-plugin-federation` (`mf-dashboard/vite.config.ts:3`), rather than unscoped package. Unavailable old versions prevent verifying earlier unscoped package usage, replacement or abandonment. Result is inconclusive; intention is not attributed to mere manifest presence.

**2. Dependency in `mf-login`.** Manifest at `6cdaf6f` could be read: already declares both packages, including `vite-plugin-federation: ^0.0.1`. Log records no later manifest change up to snapshot. Initial Vite configuration object is missing; it changes in `980d535`. Snapshot uses `@originjs/vite-plugin-federation` (`mf-login/vite.config.ts:3`), rather than unscoped package. Unavailable old versions prevent verifying earlier unscoped package usage, replacement or abandonment. Result is inconclusive; intention is not attributed to mere manifest presence.

**3. Dependency in `mf-navbar`.** Manifest at `6cdaf6f` could be read: already declares both packages, including `vite-plugin-federation: ^0.0.1`. Log records no later manifest change up to snapshot. Initial Vite configuration object is missing; it changes in `980d535`. Snapshot uses `@originjs/vite-plugin-federation` (`mf-navbar/vite.config.ts:3`), rather than unscoped package. Unavailable old versions prevent verifying earlier unscoped package usage, replacement or abandonment. Result is inconclusive; intention is not attributed to mere manifest presence.

**4. Dependency in `mf-personagem-detalhe`.** Initial manifest and Vite configuration, from `6cdaf6f`, are unavailable as blobs. Manifest at `fdf3ccb` could be read and already contains both packages; it does not change afterward. Vite configuration changes in `fdf3ccb` and `980d535`. Snapshot uses `@originjs/vite-plugin-federation` (`mf-personagem-detalhe/vite.config.ts:3`), rather than unscoped package. Unavailable old versions prevent verifying earlier unscoped package usage, replacement or abandonment. Result is inconclusive; intention is not attributed to mere manifest presence.

**5. Dependency in `root-app`.** Initial manifest and Vite configuration, from `6cdaf6f`, are unavailable as blobs. Manifest also changes in `fdf3ccb` and `980d535`; reading intermediate version failed. Queried old configurations also failed. Snapshot uses `@originjs/vite-plugin-federation` (`root-app/vite.config.ts:3`), rather than unscoped package. Unavailable old versions prevent verifying earlier unscoped package usage, replacement or abandonment. Result is inconclusive; intention is not attributed to mere manifest presence.

**6. Local consumption in README.** README is added in `6cdaf6f` and unchanged afterward. In `980d535`, both environment files are added already with `IS_LOCAL=false` in `root-app/.env` and `IS_LOCAL=true` in `root-app/.env.local.bkp`; these versions could be read and never change afterward. This dates coexistence of values, but Vite configurations at `6cdaf6f`, `fdf3ccb` and `980d535` are unavailable. Whether README accurately described earlier stage or when local/Pages selector arrived could not be verified. Snapshot explains current selection (`root-app/vite.config.ts:7-24`), but discrepancy history remains inconclusive.

**7. React 18 on About page.** Page is added in `fdf3ccb`, already with “React 18”, and unchanged afterward. Contents were read. At same stage, manifests of `mf-dashboard` and `mf-personagem-detalhe` declare `react` and `react-dom` `^19.1.0`; those of `mf-login` and `mf-navbar` already have these versions in `6cdaf6f` and unchanged afterward. Thus claim already conflicts with four manifests since page creation: no later migration need be supposed to explain observable discrepancy. Old host manifest is unavailable, as are initial dashboard and detail manifests; neither React 18 never previously existing nor text copied from another project is asserted. Clarification is limited to proven coexistence of conflicting text and declarations in `fdf3ccb`.

## Commands

All queries below concern reachable snapshot ancestors identified by first log, or snapshot itself. Readings with `bad object` failed due to unavailable historical objects, without network fetching.

```sh
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example log --reverse --format='%h %ad %s' --date=short --name-status --no-renames ddf474192c82d47341b22be009915913c9227eca
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example rev-list --count ddf474192c82d47341b22be009915913c9227eca
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-dashboard/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-dashboard/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-login/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-login/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-navbar/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-navbar/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-personagem-detalhe/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-personagem-detalhe/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:root-app/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:root-app/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:root-app/src/pages/Sobre.tsx
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:root-app/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:mf-dashboard/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:mf-personagem-detalhe/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:root-app/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 980d535:root-app/vite.config.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 980d535:root-app/.env
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 980d535:root-app/.env.local.bkp
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example ls-tree -r 6cdaf6f -- mf-dashboard/package.json mf-dashboard/vite.config.ts mf-login/vite.config.ts mf-navbar/vite.config.ts mf-personagem-detalhe/package.json mf-personagem-detalhe/vite.config.ts root-app/package.json root-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example ls-tree -r fdf3ccb -- mf-dashboard/package.json mf-dashboard/vite.config.ts mf-personagem-detalhe/package.json mf-personagem-detalhe/vite.config.ts root-app/package.json root-app/vite.config.ts
```

Comparison below was performed before and after queries, with empty output and code 0 in both:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 14 (2025-07-15 to 2025-07-17). Points: 7 (clarified: 1, inconclusive: 6, resolved by the snapshot: 0).
