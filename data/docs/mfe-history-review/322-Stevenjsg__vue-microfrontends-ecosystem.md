---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inputs:
  clone: data/samples/mfe-sample-001/repos/Stevenjsg__vue-microfrontends-ecosystem
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Repository overview

There are 11 commits up to snapshot, over two days (2025-11-28 to 2025-11-29). First, `e3cc334` (2025-11-28, "first commit"), already includes four applications in `apps/`, `packages/ui-kit` (only `package.json` and an `index.ts` at package root), `turbo.json`, `pnpm-workspace.yaml` and directory `.turbo/` (cookies and daemon log dated 2025-11-27). This is first observable presence of pieces: commit does not say where developed before. Four `vite.config.ts` files are same object (`bbcf80c`), as are cms, dashboard and kanban `App.vue` files (`58b0f21`), four app `main.ts` files (`2425c0f`) and `HelloWorld.vue` files (`b58e52b`); shell `App.vue` is separate object (`9ea8fb4`).

README (`README.mkd`) arrives immediately afterward in `5244640` (2025-11-28, "Agregar README inicial para
el ecosistema de microfrontends en Vue 3 (English translation: "Add initial README for Vue 3 microfrontend ecosystem")"), and changes only once, in `94399d2` (2025-11-28, "corregir codigo mermaid" (English translation: "correct mermaid code")). All composition code comes afterward, on 2025-11-29: `13859fe` ("fix: update pnpm workspace configuration…") changes four `vite.config.ts` files and creates `apps/shell/src/vite-env.d.ts`; `280cc20` ("feat: agregar soporte para Tailwind CSS y mejorar
scripts en los paquetes (English translation: "feat: add Tailwind CSS support and improve package scripts")") changes manifests; `ea611b1` ("feat: actualizar componentes de la
aplicación y agregar WidgetDinero (English translation: "feat: update application components and add WidgetDinero")") creates `WidgetDinero.vue` and `MyButton.vue` and changes four `App.vue` files; `4e0237f` creates `packages/ui-kit/src/index.ts`. Thus README describes ecosystem before code exists and was not revised afterward. The `.turbo/` leaves in `816fe78` (one cookie) and `80a16ce` ("Delete .turbo directory"); root `packages/ui-kit/index.ts` leaves in `816fe78`, explaining `"main": "index.ts"` without file noted in 3.4.3 as remnant of first package arrangement.

Clone lacks every queried old version content: `show` and `cat-file` failed with missing objects for all attempted first-commit objects. Visible evidence consists of messages, dates, file lists per commit and object identifiers (`ls-tree`). No commit had CI workflow, Dockerfile, store, router or authentication file, or package in `packages/` besides `ui-kit`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `turbo` declared and configured, without usage outside root scripts. | 3.4.2 (package.json:18) | dependency use | e3cc334 2025-11-28 first commit; 816fe78 2025-11-29 Eliminar componentes HelloWorld y archivo de configuración de cookies (English translation: "Remove HelloWorld components and cookie configuration file"); 80a16ce 2025-11-29 Delete .turbo directory | clarified |
| 2 | Remotes `cms` and `kanban` declared in shell without loading code, and README announcing remote loading of all three and complete integration. | 3.4.5 #2, #3; 3.4.7 #8, #9, #20 | active or abandoned | e3cc334 2025-11-28 first commit; 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3 (English translation: "Add initial README for Vue 3 microfrontend ecosystem"); 13859fe 2025-11-29 fix: update pnpm workspace configuration to simplify package paths and ignore esbuild; ea611b1 2025-11-29 feat: actualizar componentes de la aplicación y agregar WidgetDinero (English translation: "feat: update application components and add WidgetDinero") | clarified |
| 3 | Shared state and logic with Pinia, JWT authentication and root routing described in README without code. | 3.4.7 #3, #18, #21, #22 | conflicting stages | e3cc334 2025-11-28 first commit; 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3 (English translation: "Add initial README for Vue 3 microfrontend ecosystem"); 280cc20 2025-11-29 feat: agregar soporte para Tailwind CSS y mejorar scripts en los paquetes (English translation: "feat: add Tailwind CSS support and improve package scripts") | clarified |
| 4 | UI Kit consumption by three remotes and kit HMR in four apps announced in README; only shell consumes kit. | 3.4.7 #11, #12, #13, #24 | conflicting stages | e3cc334 2025-11-28 first commit; ea611b1 2025-11-29 feat: actualizar componentes de la aplicación y agregar WidgetDinero (English translation: "feat: update application components and add WidgetDinero"); 29967bf 2025-11-29 feat: simplificar estilos en aplicaciones y agregar archivo de estilos para ui-kit (English translation: "feat: simplify application styles and add ui-kit stylesheet"); 280cc20 2025-11-29 feat: agregar soporte para Tailwind CSS y mejorar scripts en los paquetes (English translation: "feat: add Tailwind CSS support and improve package scripts") | clarified |
| 5 | Libraries `@repo/utils` and TS configuration listed in README, absent from snapshot. | 3.4.7 #16 | active or abandoned | 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3 (English translation: "Add initial README for Vue 3 microfrontend ecosystem") | clarified |
| 6 | README says Vite 6; manifests declare `vite ^7.2.4`. | 3.4.7 #17 | conflicting stages | e3cc334 2025-11-28 first commit; 5244640 2025-11-28 Agregar README inicial para el ecosistema de microfrontends en Vue 3 (English translation: "Add initial README for Vue 3 microfrontend ecosystem"); 280cc20 2025-11-29 feat: agregar soporte para Tailwind CSS y mejorar scripts en los paquetes (English translation: "feat: add Tailwind CSS support and improve package scripts") | inconclusive |

## Observations

**1. `turbo` without usage outside scripts.** The `turbo.json` is same object (`d730b72`) from first commit to snapshot. First commit `e3cc334` includes `.turbo/cookies/1.cookie`, `.turbo/cookies/2.cookie` and `.turbo/daemon/ed873b9e6803e60c-turbo.log.2025-11-27`, all with identifier `e69de29`, empty Git contents. Directory is generated by Turbo itself when run; log name indicates daemon execution on 2025-11-27, before first commit. It leaves in `816fe78` (one cookie) and `80a16ce` ("Delete .turbo directory"). No commit created CI workflow, Dockerfile or other automation file. Conclusion limited to these artifacts: Turbo ran in project local environment, and no historical stage had automation calling it beyond scripts. History does not show which script ran, and `Undetermined` in 3.4.2 remains unchanged.

**2. Remotes `cms` and `kanban` without consumer.** In first commit four `vite.config.ts` files are same object (`bbcf80c`), so differentiated snapshot configuration (shell with `remotes`, each remote with its `exposes`) did not yet exist. It appears in `13859fe`, changing all four configurations and creating `apps/shell/src/vite-env.d.ts`; none changes afterward, and `vite-env.d.ts` at this commit matches snapshot, declaring only module `dashboard/Widget` (apps/shell/src/vite-env.d.ts:3-7). Shell `App.vue` has only two versions: first commit (`9ea8fb4`, contents absent from clone, before remote declaration) and `ea611b1`, matching snapshot and loading only dashboard widget. Shell `main.ts` is unchanged since first commit (`2425c0f`), and only removed shell file was `HelloWorld.vue`, same object (`b58e52b`) in four apps. Arrows "Carga Remota" (English translation: "Remote Loading") to CMS and Kanban and "integração
completa (English translation: "complete integration")" come from README at `5244640`/`94399d2`, written before configuration and code. Conclusion: after remote declaration, no commit added or removed loading code for `cms` or `kanban`; no abandoned connection exists in observable history. Relationships 2 and 3 remain declared and never connected up to snapshot.

**3. Shared state, Pinia, JWT and root routing.** No commit created store, router or authentication file: besides configurations, only code files ever in `apps/*/src` were `App.vue`, `main.ts`, `HelloWorld.vue`, `WidgetDinero.vue` and shell `vite-env.d.ts`. Four `main.ts` files, creating apps, are same object (`2425c0f`) from first commit to snapshot, only performing `createApp(App).mount('#app')` (apps/shell/src/main.ts:1-5). README describing these functions is from `5244640`, before any component beyond template. History does not show manifest contents before `280cc20`, so does not say whether Pinia or router were ever declared as dependencies. Conclusion limited to these files: no observable stage implemented shared state, authentication or routing; claims describe a plan preceding code, rather than removed stage remnant.

**4. UI Kit in remotes.** Kit components start existing only in `ea611b1` (`MyButton.vue`) and `4e0237f` (`src/index.ts`); previously package had only root `index.ts`, removed in `816fe78`, with contents absent from clone. The `App.vue` files of cms, dashboard and kanban have two versions: first commit, same object in all three (`58b0f21`), and `ea611b1`, matching snapshot, without kit import; `WidgetDinero.vue` has only one version, snapshot. Remote stylesheets last changed in `29967bf`, whose message announces "agregar archivo de estilos para
ui-kit (English translation: "add ui-kit stylesheet")", and are same object in snapshot as shell stylesheet (`35edbd2`). Remote manifests changed only in `280cc20`, and earlier contents are unavailable. Conclusion limited to components: no remote code version after kit component creation differs from snapshot, so remotes never consumed these components; historical remote connection to kit is limited to stylesheets.

**5. `@repo/utils` and TS configuration.** List of all paths appearing in any commit up to snapshot contains, under `packages/`, only files of `packages/ui-kit`. Diagram citing other two libraries comes from README at `5244640`. Conclusion: libraries existed in no commit; they were only announced, never removed.

**6. Vite 6.** README saying "Vite 6" is from `5244640` and does not change version in `94399d2` (message announces only mermaid correction). Application manifests have two versions, first commit and `280cc20`, and first contents are unavailable (object of `apps/dashboard/package.json`, `642e960`, failed due to absence). History does not say whether Vite version was 6 when README was written and changed afterward. Inconclusive.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem rev-list --count 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --reverse --format='%h %ad %s' --date=short --name-status 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:.turbo/daemon/ed873b9e6803e60c-turbo.log.2025-11-27   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/shell/src/App.vue   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/shell/vite.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:packages/ui-kit/index.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/shell/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:apps/dashboard/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem show e3cc334:package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%H %h' 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem ls-tree -r e3cc334
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t e69de29bb2d1d6434b8b29ae775ad8c2e48c5391   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 9ea8fb4074ae333e68c456b72a126125a9f75ad7   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 58b0f21b1647b34ed23f23fc6488eb4f811c405e   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t bbcf80cca93e72ac5583c66d220957216a001f94   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t d3d1eec1c5855c1e5537d153c7e1f779b4121af4   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 642e960fe13458a5b295bea34e98f9c6caf91667   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem cat-file -t 64dc1bd42892c5cf45a1b34d7c6358ad0f71529a   # failed: missing object
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/src/App.vue
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/vite.config.ts
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/src/vite-env.d.ts
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/cms/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/dashboard/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/kanban/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/shell/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- packages/ui-kit/package.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- turbo.json
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- .github   # no output
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format= --name-only 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem ls-tree -r 8501b8bd6e1d2491eb7838ae38b264a826f4c453
docs/mfe-history-review/tools/hist.sh Stevenjsg__vue-microfrontends-ecosystem log --format='%h %ad %s' --date=short 8501b8bd6e1d2491eb7838ae38b264a826f4c453 -- apps/cms/src/style.css apps/dashboard/src/style.css apps/kanban/src/style.css README.mkd apps/cms/src/App.vue apps/kanban/src/App.vue apps/dashboard/src/App.vue
```

## Summary

Commits up to the snapshot: 11 (2025-11-28 to 2025-11-29). Points: 6 (clarified: 5, inconclusive: 1, resolved by the snapshot: 0).
