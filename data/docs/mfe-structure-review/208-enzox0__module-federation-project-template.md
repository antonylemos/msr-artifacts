---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Workspace

`pnpm-workspace.yaml:1-3` (`packages:` com `apps/*` e `packages/*`), orquestrado por `turbo.json:4-19`.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-43 (manifesto da raiz do workspace) | — | — (package.json:12 `turbo run build` só orquestra os membros) | — | — | No | Raiz de coordenação do workspace, sem entrada nem build de UI próprios. |
| apps/admin-mf | apps/admin-mf/module-federation.config.d.ts;apps/admin-mf/module-federation.config.js;apps/admin-mf/module-federation.config.ts;apps/admin-mf/package.json;apps/admin-mf/vite.config.d.ts;apps/admin-mf/vite.config.js;apps/admin-mf/vite.config.ts | apps/admin-mf/package.json:1-29 | apps/admin-mf/index.html:10 (`/src/bootstrap.tsx`); apps/admin-mf/src/bootstrap.tsx:5-9 (monta a UI React) | apps/admin-mf/vite.config.ts:6-18 (config própria, porta 3003); apps/admin-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/admin-mf/Dockerfile:9-10 (imagem nginx com `apps/admin-mf/dist`) | Yes | Aplicação React/Vite com entrada, build e Dockerfile próprios. |
| apps/auth-mf | apps/auth-mf/module-federation.config.d.ts;apps/auth-mf/module-federation.config.js;apps/auth-mf/module-federation.config.ts;apps/auth-mf/package.json;apps/auth-mf/vite.config.d.ts;apps/auth-mf/vite.config.js;apps/auth-mf/vite.config.ts | apps/auth-mf/package.json:1-29 | apps/auth-mf/index.html:10 (`/src/bootstrap.tsx`); apps/auth-mf/src/bootstrap.tsx:5-9 (monta a UI React) | apps/auth-mf/vite.config.ts:6-18 (config própria, porta 3001); apps/auth-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/auth-mf/Dockerfile:9-10 (imagem nginx com `apps/auth-mf/dist`) | Yes | Aplicação React/Vite com entrada, build e Dockerfile próprios. |
| apps/dashboard-mf | apps/dashboard-mf/module-federation.config.d.ts;apps/dashboard-mf/module-federation.config.js;apps/dashboard-mf/module-federation.config.ts;apps/dashboard-mf/package.json;apps/dashboard-mf/vite.config.d.ts;apps/dashboard-mf/vite.config.js;apps/dashboard-mf/vite.config.ts | apps/dashboard-mf/package.json:1-29 | apps/dashboard-mf/index.html:10 (`/src/bootstrap.tsx`); apps/dashboard-mf/src/bootstrap.tsx:5-9 (monta a UI React) | apps/dashboard-mf/vite.config.ts:6-18 (config própria, porta 3002); apps/dashboard-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/dashboard-mf/Dockerfile:9-10 (imagem nginx com `apps/dashboard-mf/dist`) | Yes | Aplicação React/Vite com entrada, build e Dockerfile próprios. |
| apps/messaging-mf | apps/messaging-mf/module-federation.config.d.ts;apps/messaging-mf/module-federation.config.js;apps/messaging-mf/module-federation.config.ts;apps/messaging-mf/package.json;apps/messaging-mf/vite.config.d.ts;apps/messaging-mf/vite.config.js;apps/messaging-mf/vite.config.ts | apps/messaging-mf/package.json:1-29 | apps/messaging-mf/index.html:10 (`/src/bootstrap.tsx`); apps/messaging-mf/src/bootstrap.tsx:5-9 (monta a UI React) | apps/messaging-mf/vite.config.ts:6-18 (config própria, porta 3004); apps/messaging-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/messaging-mf/Dockerfile:9-10 (imagem nginx com `apps/messaging-mf/dist`) | Yes | Aplicação React/Vite com entrada, build e Dockerfile próprios. |
| apps/shell | apps/shell/module-federation.config.d.ts;apps/shell/module-federation.config.js;apps/shell/module-federation.config.ts;apps/shell/package.json;apps/shell/vite.config.d.ts;apps/shell/vite.config.js;apps/shell/vite.config.ts | apps/shell/package.json:1-31 | apps/shell/index.html:10 (`/src/main.tsx`); apps/shell/src/main.tsx:1 (`import('./bootstrap')`); apps/shell/src/bootstrap.tsx:5-9 (monta a UI React) | apps/shell/vite.config.ts:6-18 (config própria, porta 3000); apps/shell/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/shell/Dockerfile:9-10 (imagem nginx com `apps/shell/dist`); infrastructure/docker/production/Dockerfile.shell:9-11 (imagem nginx do shell com `nginx.conf`) | Yes | Aplicação host React/Vite com entrada, build e Dockerfiles próprios. |
| packages/sdk | packages/sdk/package.json | packages/sdk/package.json:1-17 | — (package.json:5 `main: ./src/index.ts` é exportação de biblioteca) | — (scripts só `lint` e `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Pacote compartilhado (cliente HTTP/auth/websocket) sem entrada de aplicação. |
| packages/shared | packages/shared/package.json | packages/shared/package.json:1-14 | — (package.json:5 `main: ./src/index.ts` é exportação de biblioteca) | — (scripts só `lint` e `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Pacote compartilhado de utilitários sem entrada de aplicação. |
| packages/types | packages/types/package.json | packages/types/package.json:1-14 | — (package.json:5 `main: ./src/index.ts` é exportação de biblioteca) | — (scripts só `lint` e `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Pacote de tipos sem entrada de aplicação. |
| packages/ui | packages/ui/package.json | packages/ui/package.json:1-19 | — (package.json:5 `main: ./src/index.ts` é exportação de biblioteca) | — (scripts só `lint` e `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Biblioteca de componentes sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 5 (apps/admin-mf, apps/auth-mf, apps/dashboard-mf, apps/messaging-mf, apps/shell).

## Notas

- N = 5 coincide com `frontend_units: 5` da classificação (shell e quatro remotos); não há unidade externa.
- Cada app versiona `vite.config.ts` e o `vite.config.js` compilado com a mesma configuração; a coluna Build cita o `.ts`.
- Os Dockerfiles dos apps rodam `pnpm build` no workspace inteiro (`apps/*/Dockerfile:7`) e copiam só o `dist` do próprio app. O CD só imprime "Deploying..." (`.github/workflows/cd.yml:14-15`) e os manifestos Kubernetes são placeholders (`infrastructure/kubernetes/shell/index.yaml:1`); o CI (`.github/workflows/ci.yml:25-26`) constrói o workspace inteiro, não um app.
- `packages/config` não está no `units.csv`; só contém `tsconfig/tsconfig.json`, sem `package.json`, e não é unidade.
