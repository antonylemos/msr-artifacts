---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 039 — coolsamson7/novx

## Workspace

pnpm-workspace.yaml:1-3 (`packages: ["apps/*", "libs/*"]`); nx.json:18-44 (plugins, `release` e `targetDefaults` do Nx), com um `project.json` por projeto em `apps/*`, `libs/*` e `tools/metadata`.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-78 (manifesto da raiz do workspace) | — | — | — | — | No | Raiz de coordenação do workspace; os scripts só delegam ao nx (package.json:8-10), sem entrada ou build de UI próprios. |
| apps/app | apps/app/package.json;apps/app/project.json;apps/app/webpack.config.js | apps/app/package.json:1-18 (manifesto próprio) | apps/app/project.json:18-20 (`main: apps/app/src/main.tsx` e `index` próprios); apps/app/webpack.config.js:14 (`entry: "./apps/app/src/main.tsx"`); apps/app/src/main.tsx:27-32 (`createRoot(...).render(<App />)`) | apps/app/project.json:14-38 (target `build` com `@nx/webpack:webpack` e `webpackConfig: apps/app/webpack.config.js`); apps/app/webpack.config.js:96-98 (`HtmlWebpackPlugin` com `apps/app/index.html`); apps/app/package.json:6 (`nx build app`) | pnpm-workspace.yaml:2 (`apps/*`); apps/app/project.json:1-6 (projeto Nx `app`) | .github/workflows/docs.yml:34-35 (`pnpm nx build app --configuration=production`); .github/workflows/docs.yml:48-57 (copia `dist/apps/app` para o artefato do Pages); .github/workflows/docs.yml:59-69 (`deploy-pages`) | Yes | Aplicação React com entrada que monta a UI e target de build webpack próprios. |
| apps/microfrontend | apps/microfrontend/package.json;apps/microfrontend/project.json;apps/microfrontend/webpack.config.js | apps/microfrontend/package.json:1-14 (manifesto próprio) | apps/microfrontend/project.json:18-20 (`main: apps/microfrontend/src/main.tsx` e `index`); apps/microfrontend/webpack.config.js:13-14 (entrada `main.tsx` comentada; `entry: './apps/microfrontend/src/bootstrap.ts'`); apps/microfrontend/src/bootstrap.ts:1 (`export {};`); apps/microfrontend/src/main.tsx:1-7 (só imports para registrar decorators, sem render) | apps/microfrontend/project.json:14-23 (target `build` com `@nx/webpack:webpack` e `webpackConfig` próprio); apps/microfrontend/webpack.config.js:52-73 (`ModuleFederationPlugin` com `exposes`; `HtmlWebpackPlugin` comentado em :70-72); apps/microfrontend/package.json:6 (`nx build microfrontend`) | pnpm-workspace.yaml:2 (`apps/*`); apps/microfrontend/project.json:1-6 (projeto Nx `microfrontend`) | — | Undetermined | Build próprio declarado, mas a entrada usada pelo webpack é um módulo vazio e nada no diretório inicia a UI sozinho. |
| libs/communication | libs/communication/package.json;libs/communication/project.json;libs/communication/rollup.config.json | libs/communication/package.json:1-4 (`@novx/communication`, "Communication library") | — | libs/communication/project.json:8-9 (target `build` com `@nx/rollup:rollup`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 e release.sh:25 (`nx build $LIB` e `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Biblioteca publicada no npm, sem entrada de aplicação. |
| libs/core | libs/core/package.json;libs/core/project.json;libs/core/rollup.config.json | libs/core/package.json:1-4 (`@novx/core`, "DI and AOP library") | — | libs/core/project.json:8-9 (target `build` com `@nx/rollup:rollup`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 e release.sh:25 (`nx build $LIB` e `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Biblioteca publicada no npm, sem entrada de aplicação. |
| libs/i18n | libs/i18n/package.json;libs/i18n/project.json;libs/i18n/rollup.config.json | libs/i18n/package.json:1-4 (`@novx/i18n`, "i18n library") | — | libs/i18n/project.json:8-9 (target `build` com `@nx/rollup:rollup`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 e release.sh:25 (`nx build $LIB` e `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Biblioteca publicada no npm, sem entrada de aplicação. |
| libs/portal | libs/portal/package.json;libs/portal/project.json;libs/portal/rollup.config.json | libs/portal/package.json:1-4 (`@novx/portal`, "Portal library") | — | libs/portal/project.json:8-31 (target `build` com `@nx/rollup:rollup`, `main: libs/portal/src/index.ts`) | pnpm-workspace.yaml:3 (`libs/*`) | release.sh:5 e release.sh:25 (`nx build $LIB` e `pnpm publish dist/libs/$LIB`); nx.json:23-24 (`release.projects: ["libs/*"]`) | No | Biblioteca do framework de portal, sem entrada de aplicação. |
| tools/metadata | tools/metadata/package.json;tools/metadata/project.json | tools/metadata/package.json:1-8 (`@tools/metadata`, `bin: build-metadata`) | — | tools/metadata/project.json:6-11 (target `build` com `tsc`); tools/metadata/project.json:12-16 (target `scan` com `tsx`) | tools/metadata/project.json:1-4 (projeto Nx `metadata`) | — | No | Ferramenta de build (scan de metadata para os manifestos), não é frontend. |
| ui | ui/package.json;ui/rollup.config.json | ui/package.json:1-4 (`@novx/ui`, "ui library") | — | ui/rollup.config.json:1-13 (config de biblioteca, `main: src/index.ts`); ui/package.json:35 (`nx build ui`, sem `project.json` ativo: só `ui/project.json.txt`) | — | — | No | Biblioteca de UI fora do workspace pnpm e sem projeto Nx ativo; sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 1 (apps/app).

## Notas

- A classificação registra `frontend_units: 2` (shell `apps/app` e remote `apps/microfrontend`). Esta revisão conta uma linha Yes; `apps/microfrontend` ficou Undetermined porque a entrada não inicia a UI sozinha. A classificação não foi alterada.
- Em `apps/microfrontend`, o `main` de project.json:18 (`main.tsx`) e o `entry` de webpack.config.js:14 (`bootstrap.ts`) divergem, e nenhum dos dois renderiza nada; o `index.html` do diretório não é usado, porque o `HtmlWebpackPlugin` está comentado (webpack.config.js:70-72). O diretório produz só o `remoteEntry.js` com `./Module` e `./MicrofrontendFeature` (webpack.config.js:53-59). O Undetermined se refere a rodar `apps/microfrontend` sozinho, não ao seu papel de remote, que é assunto da revisão de composição (seção 3.4.5 do protocolo).
- `apps/microfrontend` não tem deploy separado: só o build conjunto de .github/workflows/ci.yml:33 (`nx run-many -t lint test build`). O workflow de docs publica apenas `apps/app`.
- `ui/` parece um projeto desativado: `ui/project.json.txt` declara `root: libs/ui`, caminho que não existe no snapshot.
