---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
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

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Leitura do repositório

Monorepo pnpm + Turborepo com quatro aplicações Vue 3 + Vite em `apps/*` e uma biblioteca em
`packages/*` (pnpm-workspace.yaml:1-3). O `build` da raiz é `turbo build` (package.json:8), que
só delega à task `build` de cada pacote, com saída em `dist/**` (turbo.json:8-11). Cada aplicação
tem `build` próprio, `vue-tsc -b && vite build` (apps/cms/package.json:8;
apps/dashboard/package.json:8; apps/kanban/package.json:8; apps/shell/package.json:8), e
`vite.config.ts` próprio com o plugin `@originjs/vite-plugin-federation`: os três remotes geram
cada um o seu `remoteEntry.js` (apps/cms/vite.config.ts:16-23; apps/dashboard/vite.config.ts:18-25;
apps/kanban/vite.config.ts:16-23), e o shell declara os remotes (apps/shell/vite.config.ts:19-27).
Os `dist` ficam fora do git (.gitignore:2; apps/*/.gitignore:11).

Não há workflow de CI, Dockerfile, compose, manifesto de deploy nem configuração de hospedagem no
snapshot. O que existe para servir as aplicações é local. O shell busca os remotes em endereços
`localhost` fixos, portas 5001, 5002 e 5003 (apps/shell/vite.config.ts:22-24), que são as portas
do `server` e do `preview` de cada remote (apps/dashboard/vite.config.ts:8, :14;
apps/cms/vite.config.ts:8, :12; apps/kanban/vite.config.ts:8, :12). Os remotes têm um script
`serve:prod`, `vite build && vite preview` (apps/cms/package.json:10; apps/dashboard/package.json:10;
apps/kanban/package.json:10), e a raiz tem `dev:hybrid`, que sobe o shell em modo `dev` e os três
remotes com `serve:prod` via `concurrently` (package.json:10). Apesar do nome, `vite preview` é
servidor local, não publicação. O README fala em "Independencia de Despliegue" (README.mkd:150) e
em `pnpm build` + `pnpm preview` para "simular el entorno real de producción" (README.mkd:106-111),
mas a raiz não tem script `preview` (package.json:6-11); de todo modo, documentação não decide a
coluna Deploy. O README também lista portas 5173-5176 (README.mkd:99-102), diferentes das fixadas
nas configurações.

A única ocorrência `ops-*` do `matches.csv` é `ops-cors` em apps/dashboard/vite.config.ts:10
(`cors: true` do `server` de desenvolvimento, ao lado de `origin: "http://localhost:5000"` em :11),
que não é artefato de deploy. Não há ocorrências `ci-*` nem `cfg-public-path`. A biblioteca
`packages/ui-kit` não tem build (só o script `lint`) e não é aplicação; a versão `1.0.0` de
`@repo/ui-kit` (packages/ui-kit/package.json:2-3) não é usada em publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/cms | separado | não observado | `http://localhost:5002` em desenvolvimento (apps/cms/vite.config.ts:8, :12; apps/shell/vite.config.ts:23) | No | apps/cms/package.json:8 (`vue-tsc -b && vite build`); apps/cms/vite.config.ts:16-23 (federation `cms_app`, gera `remoteEntry.js`); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, saída `dist/**`) |
| 2 | apps/dashboard | separado | não observado | `http://localhost:5001` em desenvolvimento (apps/dashboard/vite.config.ts:8, :14; apps/shell/vite.config.ts:22) | No | apps/dashboard/package.json:8 (`vue-tsc -b && vite build`); apps/dashboard/vite.config.ts:18-25 (federation `dashboard_app`, gera `remoteEntry.js`); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, saída `dist/**`) |
| 3 | apps/kanban | separado | não observado | `http://localhost:5003` em desenvolvimento (apps/kanban/vite.config.ts:8, :12; apps/shell/vite.config.ts:24) | No | apps/kanban/package.json:8 (`vue-tsc -b && vite build`); apps/kanban/vite.config.ts:16-23 (federation `kanban_app`, gera `remoteEntry.js`); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, saída `dist/**`) |
| 4 | apps/shell | separado | não observado | `http://localhost:5000` em desenvolvimento (apps/shell/vite.config.ts:9, :13) | No | apps/shell/package.json:8 (`vue-tsc -b && vite build`); apps/shell/vite.config.ts:19-27 (federation `shell` com os três remotes); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, saída `dist/**`) |

## Observações

**1. apps/cms.** Build próprio, que gera o `dist` do cms com o `remoteEntry.js` do remote `cms_app`
(apps/cms/vite.config.ts:17-18); o `turbo build` da raiz dispara esse build junto com os demais,
mas cada um sai no seu `dist` (turbo.json:10). Nenhum artefato publica esse `dist`: o endereço
`localhost:5002` que o shell usa (apps/shell/vite.config.ts:23) é o do `vite preview` local
(apps/cms/vite.config.ts:11-14), acionado por `serve:prod` (apps/cms/package.json:10). A versão
`0.0.0` não é usada em publicação, e o pacote é `private` (apps/cms/package.json:3-4).

**2. apps/dashboard.** Mesmo arranjo, com o remote `dashboard_app` (apps/dashboard/vite.config.ts:19-20).
É o único remote cujo `server` de desenvolvimento liga `cors` e fixa `origin` no endereço do shell
(apps/dashboard/vite.config.ts:10-11), a ocorrência `ops-cors` do `matches.csv`; isso vale para o
servidor de desenvolvimento, não para um deploy. Porta 5001 no `server` e no `preview`
(apps/dashboard/vite.config.ts:8, :14), a mesma que o shell usa (apps/shell/vite.config.ts:22).
Versão `0.0.0`, `private`, sem uso na publicação (apps/dashboard/package.json:3-4).

**3. apps/kanban.** Mesmo arranjo do cms, com o remote `kanban_app` (apps/kanban/vite.config.ts:17-18),
porta 5003 no `server` e no `preview` (apps/kanban/vite.config.ts:8, :12) e `serve:prod` local
(apps/kanban/package.json:10). Versão `0.0.0`, `private`, sem uso na publicação
(apps/kanban/package.json:3-4).

**4. apps/shell.** Build próprio, que embute as URLs `localhost` dos três remotes
(apps/shell/vite.config.ts:22-24): o `dist` do shell só funciona com os remotes servidos nessas
portas locais. Porta 5000 no `server` e no `preview` (apps/shell/vite.config.ts:9, :13). Diferente
dos remotes, não tem `serve:prod` (apps/shell/package.json:6-10); no `dev:hybrid` da raiz ele roda
em modo `dev` (package.json:10). Consome `@repo/ui-kit` como dependência de workspace
(apps/shell/package.json:12), que entra no build do próprio shell. Versão `0.0.0`, `private`, sem
uso na publicação (apps/shell/package.json:3-4).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
