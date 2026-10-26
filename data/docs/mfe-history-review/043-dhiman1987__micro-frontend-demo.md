---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
inputs:
  clone: data/samples/mfe-sample-001/repos/dhiman1987__micro-frontend-demo
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Repository overview

History up to snapshot has 3 commits, without merges. Shell, all three applications and README already appear in first observed commit, `8841396` (2025-06-28, "Initial commit"). Second, `54b84a0` (2025-06-28, "Updated readme"), changes only README. Last, `cae0143` (2025-08-25, "remaining changes"), changes `package.json` and lockfile of `app3` and creates `app3/src/MyCounterLitElement.jsx`. Other application and shell files have not changed since first commit.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `lit` and `@lit/react` are declared, and Lit counter variant has no entry point | 3.4.2 (app3/package.json:13, 15); 3.4.4 (app3/src/MyCounterLitElement.jsx:7) | dependency use | cae0143 2025-08-25 remaining changes; 8841396 2025-06-28 Initial commit | clarified |
| 2 | README promises "zero global style bleed", while shell CSS affects app1 and app2 | 3.4.7 #7 | conflicting stages | 8841396 2025-06-28 Initial commit; 54b84a0 2025-06-28 Updated readme | clarified |

## Observations

**1. `lit` and `@lit/react` are declared, and Lit counter variant has no entry point.** The `MyCounterLitElement.jsx` is created in last commit, `cae0143`, with change to `package.json` of `app3`. Previous `package.json` version is unavailable, so whether Lit dependencies entered in same commit cannot be confirmed. However files defining entry and build of `app3` (`vite.config.js`, `index.html`, `src/main.jsx` and `src/MyCounterElement.jsx`) have not changed since first commit, and Lit variant did not exist before `cae0143`. In no historical version was it connected to an entry point. Added without connection, not disconnected afterward.

**2. README promises "zero global style bleed", while shell CSS affects app1 and app2.** The `app1/app.js`, `app2/app.js`, `app-shell/index.html` and `app-shell/style.css` have not changed since first commit. README last changed in `54b84a0`, same day. Promise and contradicting code have coexisted since 2025-06-28: not different stages.

## Commands

```
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo rev-list --count cae01436907388ad75de4a33cfc2c7a5ae256406
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo rev-list --count --merges cae01436907388ad75de4a33cfc2c7a5ae256406
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --reverse --format='%h %ad %s' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show --name-status --no-renames --format='== %h' 8841396
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show --name-status --no-renames --format='== %h' 54b84a0
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show --name-status --no-renames --format='== %h' cae0143
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show 8841396:app3/package.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/vite.config.js
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/index.html
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/src/main.jsx
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/src/MyCounterElement.jsx
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/src/MyCounterLitElement.jsx
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app1/app.js
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app2/app.js
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app-shell/index.html
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app-shell/style.css
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- README.md
```

## Summary

Commits up to the snapshot: 3 (2025-06-28 to 2025-08-25). Points: 2 (clarified: 2, inconclusive: 0, resolved by the snapshot: 0).
