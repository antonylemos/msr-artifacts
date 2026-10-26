---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | root-app/src/App.tsx:5 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_navbar/Navbar"))` carrega o `./Navbar` exposto por mf-navbar (mf-navbar/vite.config.ts:13-14); remote `mf_navbar` declarado em root-app/vite.config.ts:21-23 e passado ao `federation` em root-app/vite.config.ts:31-33; renderizado em root-app/src/App.tsx:59; App montado em root-app/src/main.tsx:7-10 |
| src-remote-import | root-app/src/App.tsx:6 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_login/Login"))` carrega o `./Login` exposto por mf-login (mf-login/vite.config.ts:13-14); remote `mf_login` em root-app/vite.config.ts:12-14; renderizado na rota `/login` em root-app/src/App.tsx:67 |
| src-remote-import | root-app/src/App.tsx:7 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_dashboard/Dashboard"))` carrega o `./Dashboard` exposto por mf-dashboard (mf-dashboard/vite.config.ts:13-14); remote `mf_dashboard` em root-app/vite.config.ts:15-17; renderizado na rota `/dashboard` em root-app/src/App.tsx:73 |
| src-remote-import | root-app/src/App.tsx:8 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_personagem_detalhe/PersonagemDetalhe"))` carrega o `./PersonagemDetalhe` exposto por mf-personagem-detalhe (mf-personagem-detalhe/vite.config.ts:13-14); remote `mf_personagem_detalhe` em root-app/vite.config.ts:18-20; renderizado em root-app/src/App.tsx:24 |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | root-app/src/App.tsx:24 | root-app | runtime-composition | Yes | Renderiza o componente remoto `PersonagemDetalheMFE` (resolvido em root-app/src/App.tsx:8) com `id`, `user` e `onBack` (root-app/src/App.tsx:24-28); o wrapper é usado na rota `/personagem/:id` em root-app/src/App.tsx:81-84 |
| manual | root-app/src/App.tsx:59 | root-app | runtime-composition | Yes | Renderiza a `Navbar` remota (resolvida em root-app/src/App.tsx:5) quando há usuário, com `user` e `onLogout` (root-app/src/App.tsx:58-60) |
| manual | root-app/src/App.tsx:63 | root-app | host-relationship | Yes | `Routes` declara onde os remotes entram: `/login` → `LoginMFE`, `/dashboard` → `DashboardMFE`, `/personagem/:id` → `PersonagemDetalheWrapper` (root-app/src/App.tsx:63-96); App sob `HashRouter` em root-app/src/main.tsx:9-11 |
| manual | root-app/src/App.tsx:67 | root-app | runtime-composition | Yes | Renderiza `LoginMFE` (resolvido em root-app/src/App.tsx:6) na rota `/login`, com o callback `onAuthSuccess={handleLogin}` (root-app/src/App.tsx:36-40) |
| manual | root-app/src/App.tsx:73 | root-app | runtime-composition | Yes | Renderiza `DashboardMFE` (resolvido em root-app/src/App.tsx:7) na rota `/dashboard`, com `user`, `token` e `onCharacterClick` (root-app/src/App.tsx:73-77) |

## Resumo

Construções com composição: 9 (dynamic-loading: 4, runtime-composition: 4, host-relationship: 1).

## Notas

- As URLs dos remotes dependem de `IS_LOCAL` (root-app/vite.config.ts:9-24): `root-app/.env:1` tem `IS_LOCAL=false` (URLs do GitHub Pages) e `root-app/.env.local.bkp:1` tem `IS_LOCAL=true` (localhost). Nos dois casos os alvos são as unidades mf-login, mf-dashboard, mf-personagem-detalhe e mf-navbar do snapshot.
- O `window.addEventListener("storage", ...)` de root-app/src/App.tsx:52 não virou linha: o evento `storage` só chega a outros documentos, e aqui todas as unidades rodam no documento do root-app; ele ressincroniza o `user` entre abas do próprio root-app. O `localStorage` também é escrito por mf-login (mf-login/src/LoginForm.tsx:22, chave `token`), mas o root-app grava a mesma chave em root-app/src/App.tsx:37; a troca de dados entre host e remotes é feita por props e callbacks.
- mf-navbar/src/App.tsx:4-12 é só um mock de desenvolvimento local (`alert("Logout!")`); o módulo exposto é `./src/Navbar.tsx`.
