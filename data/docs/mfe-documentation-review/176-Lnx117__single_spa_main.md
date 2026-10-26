---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
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

# 176 — Lnx117/single_spa_main

## Repository overview

Repository has no README or other `.md`: `artifacts.csv` lists no `documentation` files, and mining has no `doc-*` occurrences. All documentation is Russian comments in three of six snapshot files: `.envtest`, `src/main.ts` and `vite.config.ts`. They describe single-spa root config registering, loading through `import()` and mounting two external microfrontends, `menu` (navigation menu) and `base` (main page content), each served by own Vite development server. This matches previous reviews: sole snapshot unit, root (3.4.3), with two `root-config → application` relationships targeting outside snapshot (3.4.5 #1, #2). Claims not fully supported depend on absent microfrontends or unversioned environment: each microfrontend's Vite server, `.env`/`.env.local` files, development/production switching, CDN builds and CSS isolation effect.

Comments read without rows: title "URL микрофронтендов." (English translation: "Microfrontend URLs") (.envtest:1), merely naming variable block covered by rows 1, 2, 4 and 5; explanation of `@vite-ignore` suppressing Vite variable-`import()` warning (src/main.ts:11-12), tool directive; `server` comments on port and `host: true` for network access (vite.config.ts:19-20), infrastructure detail; alias `@` to `src/` comment (vite.config.ts:25-26), internal unit detail. Descriptive fields: `package.json` has `name: "main"` and empty `description` (package.json:2, 14); `index.html` has no comments and title "MyBreez" (index.html:6). `package-lock.json` only repeats package name. GitHub repository description cited in classification is outside snapshot, without row.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | .envtest:2 | "В dev-режиме каждый микрофронт — отдельный Vite dev-сервер на своём порту." (English translation: In development, each microfrontend is separate Vite development server on own port) | independence | partial | 3.4.5 #1, #2; .envtest:8, 11; vite.config.ts:18 |
| 2 | .envtest:3-4 | "main.ts делает import() по этим URL, чтобы загрузить lifecycle-хуки (bootstrap, mount, unmount) каждого микрофронта." (English translation: main.ts imports these URLs to load lifecycle hooks for each microfrontend) | composition | corroborated | 3.4.4 (src/main.ts:15, :23, `dynamic-loading`); 3.4.5 #1, #2; src/main.ts:13-25 |
| 3 | .envtest:5 | "А потом уже можно использовать билды по типу VITE_MENU_URL=https://test-cdn.breez.ru/bt/menu/index.js" (English translation: Later builds can be used from a CDN as in example) | build-deploy | uncorroborated | — |
| 4 | .envtest:7 | "Навигационное меню" (English translation: Navigation menu) | structure | corroborated | 3.4.5 #1; src/main.ts:13-17; index.html:11-12 |
| 5 | .envtest:10 | "Основной контент страниц" (English translation: Main page content) | structure | corroborated | 3.4.5 #2; src/main.ts:21-25; index.html:16-17 |
| 6 | src/main.ts:1-2 | "Root config single-spa — точка входа, которая регистрирует и запускает все микрофронтенды приложения." (English translation: Single-spa root config is entry registering and starting all application microfrontends) | structure | corroborated | 3.4.3 (unit `.`, Entry column); 3.4.4 (src/main.ts:13, :21, :29); 3.4.5 #1, #2; index.html:20 |
| 7 | src/main.ts:5-6 | "URL-адреса микрофронтендов берутся из переменных окружения Vite (файл .env / .env.local), чтобы легко переключать адреса между dev/prod." (As URLs dos microfrontends vêm das variáveis de ambiente do Vite (English translation: Microfrontend URLs come from Vite environment files for easy development/production address switching) | composition | partial | 3.4.4 (Notes); src/main.ts:7, 15, 23; .envtest:8, 11 |
| 8 | src/main.ts:10 | "activeWhen: '/' — монтируется на всех маршрутах (всегда виден)." (activeWhen: '/' — é montado em todas as rotas (English translation: Root activation mounts on every route, always visible) | composition | corroborated | 3.4.5 #1; src/main.ts:16 |
| 9 | src/main.ts:20 | "Тоже активен на '/', т.е. отображается параллельно с menu." (English translation: Also active at root, displayed alongside menu) | composition | corroborated | 3.4.5 #2; src/main.ts:16, 24; index.html:12, 17 |
| 10 | src/main.ts:27-28 | "Запуск single-spa: начинает слушать изменения URL и монтировать/размонтировать зарегистрированные микрофронтенды." (English translation: Start single-spa, listening for URL changes and mounting/unmounting registered microfrontends) | composition | corroborated | 3.4.4 (src/main.ts:29, `runtime-composition`); src/main.ts:3, 29 |
| 11 | vite.config.ts:7 | "Интеграция с single-spa — микрофронтендовым оркестратором." (English translation: Integration with single-spa microfrontend orchestrator) | composition | corroborated | 3.4.2 (vite-plugin-single-spa, Configured `Yes`); vite.config.ts:3, 12-15 |
| 12 | vite.config.ts:8-9 | "type: 'root' — этот проект является корневым (root config), т.е. он загружает и монтирует дочерние микрофронтенды." (type: 'root' — este projeto é o raiz (English translation: Root type means this project loads and mounts child microfrontends) | structure | corroborated | 3.4.5 #1, #2; vite.config.ts:13 |
| 13 | vite.config.ts:10-11 | "cssStrategy: 'multiMife' — изоляция CSS между микрофронтендами, чтобы стили одного приложения не ломали другое." (English translation: CSS strategy isolates microfrontend styles so one application does not break another) | composition | partial | 3.4.2 (vite-plugin-single-spa, Configured `Yes`); vite.config.ts:14 |

## Observations

**1. .envtest:2.** Says each microfrontend runs independently in separate Vite development server on own port. Ports match: both file URLs point to `localhost:9083` and `localhost:9081` (.envtest:8, 11), differing from each other and root-config port 9080 (vite.config.ts:18), treated as distinct targets by composition review (3.4.5 #1, #2). Vite server identity lacks artifact because projects `menu` and `base` are outside snapshot. URL path `/src/index.ts` fits Vite development server without proving tool. Hence `partial`.

**2. .envtest:3-4.** URL `import()` appears at src/main.ts:15 and :23, as function `app` of each `registerApplication` (src/main.ts:13-25), both loads recorded as `dynamic-loading` by source-code review (3.4.4). Lifecycles `bootstrap`, `mount` and `unmount` are expected by single-spa from function return. Comment describes what `main.ts` does, entirely present in snapshot. Modules exporting hooks are outside, as 3.4.5 #1 and #2 record.

**3. .envtest:5.** Future step: use CDN-published builds, with example URL. No snapshot artifact builds microfrontends or points there; build and deployment review records comment as intention without using it to decide Deploy column (3.4.6, Repository overview). Example variable `VITE_MENU_URL` differs from code-read `VITE_MENU` (src/main.ts:15). Since comment addresses future use, this does not refute it.

**4. .envtest:7.** Label says `VITE_MENU` URL is navigation menu. Repeated at src/main.ts:9, "Микрофронтенд «menu» — навигационное меню." (English translation: "Microfrontend menu is navigation menu"), naming registration. Code registers application `menu` with URL (src/main.ts:13-17), page mounts it in container `single-spa-application:menu` inside `<nav>` within `<header>` (index.html:10-14), as 3.4.5 #1 shows. Menu content outside snapshot; page role confirmed by mount point.

**5. .envtest:10.** Label says `VITE_BASE` URL is main page content. Repeated at src/main.ts:19, "Микрофронтенд «base» — основное содержимое страниц." (English translation: "Microfrontend base is main page content"). Registration `base` uses URL (src/main.ts:21-25), mounts in container `single-spa-application:base` inside `<main>` (index.html:16-18; 3.4.5 #2). As row 4, content outside snapshot, page role holds.

**6. src/main.ts:1-2.** Comment presents file as root config and entry registering/starting microfrontends. File is sole snapshot unit's entry (index.html:20; 3.4.3), registering `menu` and `base`, calling `start()` (src/main.ts:13, 21, 29; 3.4.4). "Todos" (English translation: "all") applies to both existing registrations; 3.4.5 #1 and #2 are unit's sole relationships. Row 12 assigns same project role through plugin configuration; here subject is entry file and mechanism registration.

**7. src/main.ts:5-6.** Says URLs come from Vite environment variables in `.env`/`.env.local`, for development/production address switching. `import.meta.env` read at src/main.ts:7, 15 and 23. Files absent: sole variable file is `.envtest` (.envtest:8, 11), not loaded by Vite by default, caveat recorded in 3.4.4 (Notes) and Repository overview of 3.4.5. No production address configured; switching lacks artifact. Environment-variable connection holds, hence `partial`.

**8. src/main.ts:10.** `activeWhen: '/'` on `menu` registration (src/main.ts:16) makes single-spa mount it on all routes, as comment and 3.4.5 #1 state.

**9. src/main.ts:20.** Registration `base` also has `activeWhen: '/'` (src/main.ts:24), same as `menu` (src/main.ts:16), both applications with own containers on same page (index.html:12, 17). Thus displayed together, as comment states (3.4.5 #2).

**10. src/main.ts:27-28.** Describes single-spa `start()` (src/main.ts:29, imported at src/main.ts:3), starting routing and registration mounting. Source-code review records call as `runtime-composition`, noting registrations do not mount without it (3.4.4).

**11. vite.config.ts:7.** Comment accompanies `vitePluginSingleSpa` in plugin list (vite.config.ts:3, 12-15), recorded as configured by dependency review (3.4.2). Named technology matches dependencies and composition.

**12. vite.config.ts:8-9.** Says project is root config, loading/mounting child microfrontends. Option `type: 'root'` at vite.config.ts:13, loading/mounting relationships 3.4.5 #1 and #2. Differs from row 6: subject is project, mechanism plugin configuration.

**13. vite.config.ts:10-11.** Option `cssStrategy: 'multiMife'` configured in root-config plugin (vite.config.ts:14; 3.4.2). Announced effect, isolating `menu` and `base` styles from each other, depends on absent microfrontends and unshown plugin action (no `node_modules` or CSS in repository). Configuration holds; isolation lacks artifact.

## Summary

Claims: 13 (corroborated: 9, partial: 3, contradicted: 0, uncorroborated: 1). Themes: (structure: 4, composition: 7, build-deploy: 1, independence: 1).
