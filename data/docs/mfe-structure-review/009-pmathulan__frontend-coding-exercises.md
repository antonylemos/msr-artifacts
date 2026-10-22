---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Workspace

microfrontend-workspace/angular.json:5-14 (projeto shell); microfrontend-workspace/angular.json:114-122 (projeto mfe1); microfrontend-workspace/angular.json:222-225 (biblioteca shared).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| angular-frontend-practical | angular-frontend-practical/angular.json;angular-frontend-practical/package.json | angular-frontend-practical/package.json:1-11 (pacote próprio) | angular-frontend-practical/angular.json:21-22 (index e browser); angular-frontend-practical/src/main.ts:1-6 (bootstrap da UI) | angular-frontend-practical/angular.json:17-22 (target build application); angular-frontend-practical/package.json:7 (`ng build`) | — | — | Yes | Aplicação Angular independente com entrada e build próprios. |
| microfrontend-workspace | microfrontend-workspace/angular.json;microfrontend-workspace/package.json | microfrontend-workspace/package.json:1-12 (manifesto do workspace) | — | — | — | — | No | Raiz de coordenação dos projetos shell, mfe1 e shared, sem UI própria. |
| microfrontend-workspace/projects/mfe1 | microfrontend-workspace/projects/mfe1/webpack.config.js;microfrontend-workspace/projects/mfe1/webpack.prod.config.js | — | microfrontend-workspace/angular.json:132 e microfrontend-workspace/angular.json:149 (index e main); microfrontend-workspace/projects/mfe1/src/bootstrap.ts:1-6 (bootstrap da UI) | microfrontend-workspace/angular.json:125-131 (target build mfe1); microfrontend-workspace/angular.json:150 (webpack próprio); microfrontend-workspace/package.json:7 (`ng build`) | microfrontend-workspace/angular.json:114-122 (projeto mfe1) | — | Yes | Projeto Angular com entrada e target de build próprios, mesmo sem manifesto local. |
| microfrontend-workspace/projects/shared | microfrontend-workspace/projects/shared/package.json | microfrontend-workspace/projects/shared/package.json:1-12 (biblioteca) | — | microfrontend-workspace/angular.json:222-241 (target de biblioteca ng-packagr) | microfrontend-workspace/angular.json:222-225 (projeto shared) | — | No | Biblioteca compartilhada sem entrada de aplicação. |
| microfrontend-workspace/projects/shell | microfrontend-workspace/projects/shell/webpack.config.js;microfrontend-workspace/projects/shell/webpack.prod.config.js | — | microfrontend-workspace/angular.json:24 e microfrontend-workspace/angular.json:41 (index e main); microfrontend-workspace/projects/shell/src/bootstrap.ts:1-6 (bootstrap da UI) | microfrontend-workspace/angular.json:17-23 (target build shell); microfrontend-workspace/angular.json:42 (webpack próprio); microfrontend-workspace/package.json:7 (`ng build`) | microfrontend-workspace/angular.json:6-14 (projeto shell) | — | Yes | Projeto Angular com entrada e target de build próprios, mesmo sem manifesto local. |
| rate-limited-scheduler | rate-limited-scheduler/package.json | rate-limited-scheduler/package.json:1-9 (utilitário TypeScript) | — | rate-limited-scheduler/package.json:7 (`tsc`); rate-limited-scheduler/tsconfig.json:2-13 (compila src para dist) | — | — | No | Utilitário de agendamento e tipos, sem UI ou entrada frontend. |
| react-performance-practical | react-performance-practical/index.html;react-performance-practical/package.json;react-performance-practical/vite.config.ts | react-performance-practical/package.json:1-11 (pacote próprio) | react-performance-practical/index.html:10-11 (entrada main.tsx); react-performance-practical/src/main.tsx:6-10 (monta React) | react-performance-practical/vite.config.ts:6-11 (configuração Vite); react-performance-practical/package.json:8 (`tsc -b` e `vite build`) | — | — | Yes | Aplicação React independente com entrada e build próprios. |
| ssr-app | ssr-app/angular.json;ssr-app/package.json | ssr-app/package.json:1-11 (pacote próprio) | ssr-app/angular.json:21-22 (index e browser); ssr-app/src/main.ts:1-6 (bootstrap da UI) | ssr-app/angular.json:17-22 (target build application); ssr-app/package.json:7 (`ng build`) | — | — | Yes | Aplicação Angular com entrada de navegador e build próprios, incluindo SSR. |

## Resumo

Aplicações frontend no snapshot: 5 (angular-frontend-practical, microfrontend-workspace/projects/mfe1, microfrontend-workspace/projects/shell, react-performance-practical, ssr-app).

## Notas

- A classificação registra frontend_units: 2 para shell e mfe1. Esta revisão segue todas as linhas de units.csv e também encontra três aplicações de outros exercícios (angular-frontend-practical, react-performance-practical e ssr-app), totalizando cinco unidades frontend no snapshot, sem avaliar sua composição.
- angular-frontend-practical/angular.json e ssr-app/angular.json declaram um único projeto cada; não configuram um workspace com várias aplicações. A declaração multi-projeto está em microfrontend-workspace/angular.json.
- spa-helm não consta de units.csv e não foi acrescentado à tabela. Desde a revisão da configuração da mineração de 2026-10-21 (registrada no documento do projeto original `docs/mfe-config-revisions.md`, que não está incluído neste pacote), o chart tem ocorrências ops-* em matches.csv, mas é genérico e não nomeia nem constrói nenhuma das unidades; por isso a coluna Deploy continua "—". Não há ocorrência ci-*.
