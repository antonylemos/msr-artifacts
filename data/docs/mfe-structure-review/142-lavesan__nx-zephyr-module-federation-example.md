---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Workspace

pnpm-workspace.yaml:1-3 (inclui `packages/*` e `apps/*`); nx.json:1-24 e `project.json` do Nx em apps/shell, apps/courses e apps/profile.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-21 (manifesto coordenador, scripts `nx run-many`) | — | — | — | — | No | Raiz de orquestração pnpm/Nx, sem entrada de UI ou build de aplicação próprios. |
| apps/courses | apps/courses/module-federation.config.ts;apps/courses/package.json;apps/courses/project.json;apps/courses/rsbuild.config.ts | apps/courses/package.json:1-27 (manifesto próprio) | apps/courses/src/index.tsx:1 (entrada convencional Rsbuild); apps/courses/src/bootstrap.tsx:5-13 (monta React) | apps/courses/rsbuild.config.ts:6-34 (configuração própria); apps/courses/package.json:7 (`rsbuild build`); apps/courses/project.json:7-13 (target `build`) | pnpm-workspace.yaml:3 (`apps/*`) | apps/courses/vercel.json:2-3 (deploy Vercel próprio, `npx nx build courses`) | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| apps/profile | apps/profile/module-federation.config.ts;apps/profile/package.json;apps/profile/project.json;apps/profile/rsbuild.config.ts | apps/profile/package.json:1-27 (manifesto próprio) | apps/profile/src/index.tsx:1 (entrada convencional Rsbuild); apps/profile/src/bootstrap.tsx:5-13 (monta React) | apps/profile/rsbuild.config.ts:6-34 (configuração própria); apps/profile/package.json:7 (`rsbuild build`); apps/profile/project.json:7-13 (target `build`) | pnpm-workspace.yaml:3 (`apps/*`) | apps/profile/vercel.json:2-3 (deploy Vercel próprio, `npx nx build profile`) | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| apps/shell | apps/shell/module-federation.config.ts;apps/shell/package.json;apps/shell/project.json;apps/shell/rsbuild.config.ts | apps/shell/package.json:1-29 (manifesto próprio) | apps/shell/src/index.tsx:1 (entrada convencional Rsbuild); apps/shell/src/bootstrap.tsx:5-13 (monta React) | apps/shell/rsbuild.config.ts:6-34 (configuração própria); apps/shell/package.json:7 (`rsbuild build`); apps/shell/project.json:7-13 (target `build`) | pnpm-workspace.yaml:3 (`apps/*`) | vercel.json:2-3 (deploy Vercel da raiz constrói só o shell, `npx nx build shell`, saída `apps/shell/dist`) | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| packages/zephyr-rsbuild-plugin | packages/zephyr-rsbuild-plugin/package.json | packages/zephyr-rsbuild-plugin/package.json:1-39 (pacote exportado) | — | packages/zephyr-rsbuild-plugin/rslib.config.ts:4-21 (build de biblioteca ESM); packages/zephyr-rsbuild-plugin/package.json:17 (`rslib build`) | pnpm-workspace.yaml:2 (`packages/*`) | — | No | Plugin de build Rsbuild (envolve `withZephyr`), sem entrada que inicie UI. |

## Resumo

Aplicações frontend no snapshot: 3 (apps/courses, apps/profile, apps/shell).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação.
- apps/profile/index.html:1-12 existe, mas nenhum `rsbuild.config.ts` o referencia (`html.template`); não foi usado como entrada.
- O plugin packages/zephyr-rsbuild-plugin é importado pelos três `rsbuild.config.ts` (linha 3 e `:29`); faz parte do build das aplicações, não é uma aplicação.
