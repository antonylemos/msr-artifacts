---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
inputs:
  clone: data/samples/mfe-sample-001/repos/irfanswr__react-microfrontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Repository overview

History up to snapshot has a single commit, `00ca0bf` (2025-08-21, "initial"), snapshot itself, without merges. Three projects, `parent-app`, `react-child-app` and `vue-child-app`, arrived together: every queried file has its first observable presence there, and there is no introduction commit or earlier version. History provides no information beyond snapshot: it shows no earlier stages, abandonment or where code was developed before first commit, and thus does not distinguish generator output (create-single-spa, Vue CLI) from code written for project.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@types/systemjs` declared and unused | 3.4.2 (parent-app/package.json:41) | dependency use | 00ca0bf 2025-08-21 initial | inconclusive |
| 2 | `vue-cli-plugin-single-spa` declared without import, invocation or configuration, and Vue bundle format depends on it | 3.4.2 (vue-child-app/package.json:24); 3.4.4 (Notes) | dependency use | 00ca0bf 2025-08-21 initial | inconclusive |
| 3 | Meta `import-map-overrides-domains` and its instructions are commented out | 3.4.4 (parent-app/src/index.ejs:10, 11, 12) | active or abandoned | 00ca0bf 2025-08-21 initial | inconclusive |
| 4 | Production import map is commented out, and only local mode connects applications | 3.4.4 (Notes; parent-app/src/index.ejs:30) | active or abandoned | 00ca0bf 2025-08-21 initial | inconclusive |

## Observations

**1. `@types/systemjs` declared and unused.** The `parent-app/package.json` arrives with declaration in sole commit and has no other version. History does not say whether package was ever used before first commit or came only from generator; it remains unused in snapshot.

**2. `vue-cli-plugin-single-spa` declared without import, invocation or configuration.** The `vue-child-app/package.json`, with plugin in devDependencies, and `vue-child-app/vue.config.js`, without output options, arrive together in sole commit. Neither has an earlier version showing plugin configured. History does not answer whether Vue CLI loads plugin or what bundle format is; uncertainty in dependency and source reviews remains unchanged.

**3. Meta `import-map-overrides-domains` is commented out.** The `parent-app/src/index.ejs` arrives with lines 10 to 12 already commented out in sole commit. Whether meta was active before first commit or never uncommented cannot be known.

**4. Production import map is commented out.** Same `parent-app/src/index.ejs` arrives in sole commit with production map commented out and placeholder `src="/importmap.json"`, alongside local map. There is no version where production map was active or commit commenting it out. History does not say whether it was planned and never connected or is only generator text.

## Commands

```
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend rev-list --count 00ca0bf8640b7015f760f377f76c971b11fdc95c
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend rev-list --count --merges 00ca0bf8640b7015f760f377f76c971b11fdc95c
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --reverse --format='%h %ad %s' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- parent-app/package.json
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- vue-child-app/package.json
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- vue-child-app/vue.config.js
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- parent-app/src/index.ejs
```

## Summary

Commits up to the snapshot: 1 (2025-08-21 to 2025-08-21). Points: 4 (clarified: 0, inconclusive: 4, resolved by the snapshot: 0).
