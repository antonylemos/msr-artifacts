---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
inputs:
  clone: data/samples/mfe-sample-001/repos/dmalancioiu__SOA-project
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Repository overview

History up to snapshot has 3 commits, no merge, all from 2026-01-14. The `497d666` ("Initial
commit: Food Delivery Platform - Complete SOA Implementation") creates entire repository: backend, infrastructure, four applications in `frontend/` and all documentation. Message lists "4 React
micro frontends with Module Federation". Thus, for almost everything, visible evidence is first observable presence in first commit, rather than introduction: history does not say where code was developed before. The `3638c74` ("Add driver dashboard and delivery tracking features") creates `frontend/user-dashboard/src/components/DriverDashboard.js` and `frontend/user-dashboard/src/services/deliveryService.js` and changes, among others, `frontend/restaurant-catalog/src/components/MenuView.js`, `MenuItemCard.js`, `frontend/user-dashboard/webpack.config.js` and `frontend/user-dashboard/package.json`. According to message, commit also "enhances module federation and dependency management for user-dashboard". The `a00d643` ("Change user and driver IDs from Long to String"), snapshot commit, creates `frontend/shell-app/src/pages/CartPage.js` and changes `frontend/shell-app/src/App.js` and `frontend/shell-app/src/components/Header.js`. Message announces "Updated frontend to add CartPage,
route to /cart, and cart icon navigation in Header". No commit removes a file, and no document changes after first commit: `FRONTEND_IMPLEMENTATION.md`, `docs/ARCHITECTURE.md` and `frontend/README.md` have same object in three commits.

Clone reveals messages, touched files per commit (with `--no-renames`) and object identifiers. Versions at `497d666` of files changed afterward are unavailable: `cat-file -e` failed with missing objects for `MenuView.js`, `frontend/shell-app/src/App.js`, `Header.js`, `frontend/user-dashboard/webpack.config.js` and `frontend/user-dashboard/package.json`, and also `3638c74:frontend/shell-app/src/App.js`. Only objects identical to snapshot are available. In files never changed, contents of all versions match snapshot. For others, points rely on messages, paths and identifiers.

The `Undetermined` constructs in 3.4.4 (event `addToCart`, MenuView.js:56-57), `Undetermined` relationship in 3.4.5 (#4) and `contradicted` claims in 3.4.7 (#5, #10, #15, #24, #26) become points. Event, relationship and claims #10 and #24 concern same uncertainty and become one point. 3.4.2 has all three dependencies `Yes`, 3.4.3 has no `Undetermined` unit, and 3.4.6 has no `Undetermined` deploy. Lockfile absence noted in 3.4.6 is already explained by application `.gitignore` files and was not treated as ambiguity in reviews.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Catalog dispatches event `addToCart` to shell cart, but nothing in snapshot listens for event, and documentation says item reaches `CartContext`. | 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:56); 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:57); 3.4.5 #4; 3.4.7 #10; 3.4.7 #24 | active or abandoned | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation; 3638c74 2026-01-14 Add driver dashboard and delivery tracking features; a00d643 2026-01-14 Change user and driver IDs from Long to String | inconclusive |
| 2 | Documentation says shell exposes `AuthContext`, `CartContext` and API and WebSocket services, but shell configuration lacks `exposes`. | 3.4.7 #5 | conflicting stages | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation | clarified |
| 3 | Documentation attributes cart management and order placement to catalog, but in snapshot they are in shell. | 3.4.7 #15 | conflicting stages | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation; 3638c74 2026-01-14 Add driver dashboard and delivery tracking features; a00d643 2026-01-14 Change user and driver IDs from Long to String | clarified |
| 4 | Comment in `user-dashboard` says sharing `sockjs-client` and `@stomp/stompjs` avoids duplicate connections, but driver dashboard opens its own connection and no other unit shares these packages. | 3.4.7 #26 | conflicting stages | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation; 3638c74 2026-01-14 Add driver dashboard and delivery tracking features | clarified |

## Observations

**1. Event `addToCart` without listener.** The `frontend/shell-app/src/context/CartContext.js` has same object (`9349ad3`) in three commits. Since snapshot version registers no listener, cart context never listened for event in any commit. The `MenuView.js` changes in `3638c74` (`1ac7895` → `cdaf199`, snapshot object), but version at `497d666` is unavailable. Thus history does not show whether dispatch and comment "For now, we'll use window events" (MenuView.js:54-55) already existed in first commit or arrived afterward. Message of `3638c74` does not mention cart. On shell side, `App.js` and `Header.js` change in `a00d643`, and earlier versions are unavailable. Message announces cart page, route `/cart` and header icon, without mentioning event. History does not exclude a listener existing in one of these files and later removed. Conclusion limited to paths: `CartContext` was never a listener, and no frontend file was removed. Whether channel ever had a receiver remains open, meaning whether it was planned and never connected or abandoned. Inconclusive. Constructs remain `Undetermined`, and claims remain `contradicted`.

**2. Shell "Exposed Services".** The `frontend/shell-app/webpack.config.js` has same object (`f3567ea`) in three commits, as does `FRONTEND_IMPLEMENTATION.md` (`0f2973f`). Both come from `497d666` and never change. Since snapshot configuration lacks `exposes` (frontend/shell-app/webpack.config.js:48-63), shell exposed no modules in any commit. Conclusion limited to these files: exposed service list (FRONTEND_IMPLEMENTATION.md:56-60) and configuration without `exposes` are from same stage. Discrepancy is neither a remnant of earlier configuration nor documentation outdated by later change. History does not say whether list was a plan. Claim remains `contradicted`.

**3. Cart and order attributed to catalog.** The `docs/ARCHITECTURE.md` has same object (`44e9aea`) in three commits. Shell cart, `CartContext.js`, also exists since `497d666` and never changes (observation 1). Thus attribution of cart management to catalog (docs/ARCHITECTURE.md:267-274) and cart in shell are from same stage. Order placement differs. Page submitting order, `frontend/shell-app/src/pages/CartPage.js`, is created in snapshot commit `a00d643`, together with `App.js` and `Header.js` changes. In `497d666` and `3638c74`, shell pages are only `HomePage.js`, `LoginPage.js` and `RegisterPage.js`. No catalog file was created with cart or order name, and none was removed. The `MenuView.js` and `MenuItemCard.js` change in `3638c74`, and versions at `497d666` are unavailable, so history does not show whether catalog previously had any order logic. Conclusion limited to these files: cart part is a conflict within same stage, and order part opposes first-commit document to a shell page created afterward in last commit, without document updated. Claim remains `contradicted`.

**4. Shared `sockjs-client` and `@stomp/stompjs`.** The `frontend/user-dashboard/webpack.config.js` changes in `3638c74` (`8786694` → `f22c2e0`, snapshot object, containing comment at frontend/user-dashboard/webpack.config.js:63). Same commit creates `DriverDashboard.js` (`934bf5a`, snapshot object) and changes unit `package.json` (`6f746e3` → `828b075`). Message announces "real-time updates via WebSocket" and "enhances module federation and dependency management for
user-dashboard". Configuration version at `497d666` is unavailable, so history does not say whether comment already existed. But comment and dashboard opening own connection coexist since `3638c74` and do not change up to snapshot. Shell configuration (`f3567ea`) and `order-tracking` configuration do not change after `497d666`, and neither shares these packages in snapshot, so they never shared them. Conclusion limited to these files: comment and contradicting code are from same stage (`3638c74`), and other units never adopted sharing. Discrepancy does not come from a later change leaving comment behind. Claim remains `contradicted`.

## Commands

```
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project rev-list --count a00d6436b4a6c4f28287e7e90ded084c1241fcf1
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project rev-list --count --merges a00d6436b4a6c4f28287e7e90ded084c1241fcf1
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project log --format='%h %ad %s' --date=short --reverse --name-status --no-renames a00d6436b4a6c4f28287e7e90ded084c1241fcf1   # output filtered outside clone: omitting tmpclaude-* lines
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project ls-tree -r 497d666 -- frontend/restaurant-catalog/src/components/MenuView.js frontend/restaurant-catalog/src/components/MenuItemCard.js frontend/shell-app/src/context/CartContext.js frontend/shell-app/src/App.js frontend/shell-app/src/components/Header.js frontend/shell-app/src/pages frontend/shell-app/webpack.config.js frontend/user-dashboard/webpack.config.js frontend/user-dashboard/package.json frontend/user-dashboard/src/components/DriverDashboard.js FRONTEND_IMPLEMENTATION.md docs/ARCHITECTURE.md frontend/README.md
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project ls-tree -r 3638c74 -- (same paths)
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project ls-tree -r a00d6436b4a6c4f28287e7e90ded084c1241fcf1 -- (same paths)
# three ls-tree commands were run twice: first, paths reached git as a single argument and produced no output
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/restaurant-catalog/src/components/MenuView.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/user-dashboard/webpack.config.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/shell-app/src/App.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/shell-app/src/components/Header.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 3638c74:frontend/shell-app/src/App.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/user-dashboard/package.json   # failed: missing object
# six cat-file commands above were run twice, with same result
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e a00d6436b4a6c4f28287e7e90ded084c1241fcf1ontend/shell-app/src/App.js   # rejected by script (invalid revision, typo); not recorded
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e a00d6436b4a6c4f28287e7e90ded084c1241fcf1:frontend/shell-app/src/App.js   # object present (control)
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 3638c74:frontend/user-dashboard/src/components/DriverDashboard.js   # object present (same object as snapshot)
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project log --format='%h %ad [%B]' --date=short a00d6436b4a6c4f28287e7e90ded084c1241fcf1
```

## Summary

Commits up to the snapshot: 3 (2026-01-14 to 2026-01-14). Points: 4 (clarified: 3, inconclusive: 1, resolved by the snapshot: 0).
