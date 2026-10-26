---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Leitura do repositório

Exemplo de demonstração de micro-frontends com Module Federation num monorepo Nx/pnpm, com três aplicações React construídas com Rsbuild (README.md:1-29). `apps/shell` é o host e `apps/courses` e `apps/profile` são remotes. A federação é declarada pela opção `moduleFederation` do Rsbuild em cada aplicação (apps/shell/rsbuild.config.ts:31-33, idem nas outras duas), que lê o `mfConfig` do `module-federation.config.ts` vizinho. O shell declara os remotes `courses` e `profile` com URL `<nome>@<URL>/remoteEntry.js` (apps/shell/module-federation.config.ts:20-23) e cada remote expõe só a chave `./App`, que aponta para o seu `src/App` (apps/courses/module-federation.config.ts:5-9; apps/profile/module-federation.config.ts:5-9). As URLs são `localhost:3001`/`localhost:3002` em desenvolvimento e, fora dele, as variáveis `VITE_COURSES_URL`/`VITE_PROFILE_URL` ou URLs da Vercel como padrão (apps/shell/module-federation.config.ts:4-15), em linha com o deploy separado de cada aplicação (vercel.json:2-3; apps/courses/vercel.json:2-3).

A composição é por rotas. O shell carrega `courses/App` e `profile/App` com `React.lazy` (apps/shell/src/App.tsx:6-7) e os renderiza em `/courses*` e `/profile*`, dentro de `BrowserRouter` e `Suspense`, com `/` redirecionado para `/courses` (apps/shell/src/App.tsx:13-22); o cabeçalho do shell tem os links para as duas rotas (apps/shell/src/components/Header.tsx:16-43). O contrato é só o componente padrão de cada remote, sem props: os dois `App` expostos mostram dados fixos declarados no próprio arquivo (apps/courses/src/App.tsx:3-12; apps/profile/src/App.tsx:3-10). `react` e `react-dom` são compartilhados como singleton, `eager` no shell (apps/shell/module-federation.config.ts:25-37; apps/courses/module-federation.config.ts:10-20).

O shell também declara `name: "shell"`, `filename: "remoteEntry.js"` e `exposes: {}` (apps/shell/module-federation.config.ts:18-19, 24), sem nada exposto. Não há relação entre os dois remotes nem comunicação entre unidades (revisão de código-fonte, Notas). O pacote `packages/zephyr-rsbuild-plugin` não é unidade: é o plugin de build que envolve a configuração com `withZephyr` (packages/zephyr-rsbuild-plugin/src/index.ts:2, 8) e é usado pelos três `rsbuild.config.ts` (apps/shell/rsbuild.config.ts:3, 29); não virou relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/courses | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:7-10 (URL de courses: `localhost:3001` em dev, `VITE_COURSES_URL` ou Vercel); apps/shell/module-federation.config.ts:21 (remote `courses@${COURSES_URL}/remoteEntry.js`); apps/courses/module-federation.config.ts:5-9 (`name: "courses"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/shell/rsbuild.config.ts:31-33 e apps/courses/rsbuild.config.ts:31-33 (`moduleFederation`) | apps/shell/src/App.tsx:6; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:20 |
| 2 | apps/shell | apps/profile | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:12-15 (URL de profile: `localhost:3002` em dev, `VITE_PROFILE_URL` ou Vercel); apps/shell/module-federation.config.ts:22 (remote `profile@${PROFILE_URL}/remoteEntry.js`); apps/profile/module-federation.config.ts:5-9 (`name: "profile"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/shell/rsbuild.config.ts:31-33 e apps/profile/rsbuild.config.ts:31-33 (`moduleFederation`) | apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:21 |

## Observações

**1. apps/shell → apps/courses.** O remote `courses` do shell (apps/shell/module-federation.config.ts:21) corresponde à unidade apps/courses pelo `name: "courses"`, pelo `filename: "remoteEntry.js"` e pela chave `./App` (apps/courses/module-federation.config.ts:5-9), que é o especificador `courses/App` importado em apps/shell/src/App.tsx:6. A porta 3001 da URL de desenvolvimento (apps/shell/module-federation.config.ts:8) bate com apps/courses/rsbuild.config.ts:8, mas só corrobora. Ativa porque as três linhas de código são `Yes`: o shell é montado por apps/shell/src/index.tsx:1 e apps/shell/src/bootstrap.tsx:10, e `<Courses />` é o element da rota `/courses*` (apps/shell/src/App.tsx:20), que também é o destino do redirecionamento de `/` (apps/shell/src/App.tsx:19). A linha apps/shell/src/App.tsx:18 (`Routes`) sustenta também a relação 2.

**2. apps/shell → apps/profile.** Mesma resolução: remote `profile` (apps/shell/module-federation.config.ts:22), `name: "profile"`, `filename: "remoteEntry.js"` e `./App` (apps/profile/module-federation.config.ts:5-9), import em apps/shell/src/App.tsx:7 e `<Profile />` na rota `/profile*` (apps/shell/src/App.tsx:21). A porta 3002 (apps/shell/module-federation.config.ts:13; apps/profile/rsbuild.config.ts:8) só corrobora. Diferente de courses, a entrada de profile importa o bootstrap de forma estática (apps/profile/src/index.tsx:1), o que diz respeito à execução isolada do remote e não muda a relação.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
