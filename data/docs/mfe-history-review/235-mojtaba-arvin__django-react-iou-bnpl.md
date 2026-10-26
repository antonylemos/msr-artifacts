---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
inputs:
  clone: data/samples/mfe-sample-001/repos/mojtaba-arvin__django-react-iou-bnpl
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Repository overview

History up to snapshot has 170 commits, from `8461370` (2025-05-23, "Initial commit") to `bf4da76` (2025-06-14, "docs(readme): add table of contents"). First commits assemble Django backend (e.g. `5ad86a5` 2025-05-24, "chore(backend): scaffold Django “bnpl” project structure"). Entire frontend arrives on last day: 71 commits in `frontend/`, all from 2025-06-14, from `2875005` ("chore(frontend): add dev Dockerfile, extend .gitignore, and update docker-compose") to `a351ac6` ("refactor(frontend/merchant-app-plans): remove redundant formData state and move installment preview logic into FormDataConsumer"). Workspace and application configuration files are created that day, one commit per package: root in `4407d40` ("feat(frontend/setup): initial monorepo configuration"), customer-app in `dba76f7`, merchant-app in `785cc27` and shell in `9b20b3c`. These commits introduce files into this repository, rather than where code was written: arrival with more than 70 commits in one day suggests frontend was developed elsewhere, not shown by history. No file under `frontend/` was removed or renamed up to snapshot.

Previous reviews left only one open point history can clarify: package `@module-federation/typescript`, `Undetermined` in 3.4.2, whose workspace root description 3.4.7 recorded as `contradicted`. Other reviews have no `Undetermined` unit, construct, relationship or deploy, and no other `contradicted` or `partial` claim; claim about "isolated deployments" (3.4.7 #4) is `uncorroborated`, a value not raised as point.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@module-federation/typescript` is declared and listed as compiler plugin in shell `tsconfig`, without build invocation, and workspace root describes it as source of `ModuleFederationPlugin`, obtained by `webpack.config.js` files from `webpack` | 3.4.2 (frontend/package.json:40); 3.4.7 #9 | dependency use | 4407d40 2025-06-14 feat(frontend/setup): initial monorepo configuration; 9b20b3c 2025-06-14 feat(frontend/shell): scaffold shell config; dba76f7 2025-06-14 feat(frontend/customer): scaffold customer-app config; 785cc27 2025-06-14 feat(frontend/merchant): scaffold merchant-app config | clarified |

## Observations

**1. `@module-federation/typescript` without build invocation.** The `frontend/package.json` appears only in `4407d40` and has same object identifier in snapshot as that commit (`349ef53`); readable version at `4407d40` already has declaration in `devDependencies` and description in `dependenciesDocumentation` ("Webpack requires ModuleFederationPlugin to dynamically provide/consume modules at runtime."), plus "@module-federation/typescript requires axios". Both shell `tsconfig` files are created in `9b20b3c` and do not change up to snapshot (`14f2fed` and `709a6e0`); version at `9b20b3c` of `tsconfig.build.json` already has entry in `compilerOptions.plugins` with `configPath: ./webpack.config.js`. Three `webpack.config.js` files each have a single commit in `log`, their creation commit (`9b20b3c`, `dba76f7`, `785cc27`), and same object identifiers in snapshot (`a912b60`, `fafeb9c`, `3db58a4`). Conclusion limited to these files: repository never had a version where build invoked package or obtained `ModuleFederationPlugin` from it, later replaced by native webpack plugin; declaration, `tsconfig` entry and description arrived together with current configuration and did not change. The `Undetermined` is not a remnant of abandoned stage, and contradicted description exists since first observable manifest presence. History does not say whether `tsconfig` entry affects build, or why description attributes plugin to package. Row remains `Undetermined` in 3.4.2, and claim `contradicted` in 3.4.7.

## Commands

```
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl rev-list --count bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/package.json frontend/shell/tsconfig.build.json frontend/shell/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --reverse --format='%h %ad %s' --date=short bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/shell/webpack.config.js frontend/customer-app/webpack.config.js frontend/merchant-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 4407d40 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/package.json frontend/shell/tsconfig.build.json frontend/shell/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 9b20b3c -- frontend/shell/tsconfig.build.json frontend/shell/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl show 4407d40:frontend/package.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl show 9b20b3c:frontend/shell/tsconfig.build.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/pnpm-lock.yaml
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/shell/webpack.config.js frontend/customer-app/webpack.config.js frontend/merchant-app/webpack.config.js frontend/customer-app/tsconfig.json frontend/merchant-app/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 9b20b3c -- frontend/shell/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree dba76f7 -- frontend/customer-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 785cc27 -- frontend/merchant-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status --diff-filter=DR bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend
```

## Summary

Commits up to the snapshot: 170 (2025-05-23 to 2025-06-14). Points: 1 (clarified: 1, inconclusive: 0, resolved by the snapshot: 0).
