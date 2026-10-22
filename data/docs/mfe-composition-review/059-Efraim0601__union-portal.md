---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Leitura do repositório

Portal de produção, com textos e comentários em francês, formado por um `shell` Angular e dois remotes, `promote` e `diaspora`, ligados por **Native Federation** (`@angular-architects/native-federation`, build com esbuild). É o único dos 15 repositórios analisados classificado como produção. O shell lê `federation.manifest.json` antes do bootstrap (projects/shell/src/main.ts:3-5) e carrega as rotas expostas de cada remote nas rotas `promote` e `diaspora`; a rota vazia vai para `diaspora/home` (projects/shell/src/app/app.routes.ts:9-20).

Os builds são separados por unidade, cada um com seu `base-href` (Dockerfile:20-22), mas o deploy é conjunto: uma única imagem nginx reúne os três artefatos, com o shell na raiz e cada remote em `/remotes/<nome>/` (Dockerfile:38-41; deploy/nginx.conf:3-4, 31-32); o restante cai no `index.html` do shell (deploy/nginx.conf:125-130). Na imagem, o manifesto de desenvolvimento, com URLs `localhost`, é substituído pelo de produção (Dockerfile:42-43), que aponta para `/remotes/promote/remoteEntry.json` e `/remotes/diaspora/remoteEntry.json` (deploy/federation.manifest.prod.json:2-3). É esse manifesto que liga o deploy ao carregamento dos remotes; a coluna Configuração registra os dois manifestos, o de desenvolvimento e o de produção.

A unidade diaspora embute, por `iframe`, um fluxo legado de abertura de conta, cuja URL vem de uma global configurável ou de um caminho relativo padrão (projects/diaspora/src/app/pages/legacy-onboarding.ts:15-24); a aplicação legada não está no snapshot. Há também uma biblioteca `projects/auth` com um `ClientAuthStore` para sessão compartilhada, que nenhuma aplicação importa, e um servidor Express de OTP, que não é unidade frontend.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/shell | projects/diaspora | host → remote | origem → destino | native-federation | Yes | Yes | projects/shell/public/federation.manifest.json:3 (`diaspora` → `http://localhost:4202/remoteEntry.json`); deploy/federation.manifest.prod.json:3 (`diaspora` → `/remotes/diaspora/remoteEntry.json`); projects/diaspora/federation.config.js:4-10 (`name: 'diaspora'`, expõe `./Routes`); angular.json:391 (porta 4202 do projeto diaspora) | projects/shell/src/app/app.routes.ts:2; projects/shell/src/app/app.routes.ts:18; projects/shell/src/main.ts:1; projects/shell/src/main.ts:3; projects/shell/src/app/app.routes.ts:9 |
| 2 | projects/shell | projects/promote | host → remote | origem → destino | native-federation | Yes | Yes | projects/shell/public/federation.manifest.json:2 (`promote` → `http://localhost:4201/remoteEntry.json`); deploy/federation.manifest.prod.json:2 (`promote` → `/remotes/promote/remoteEntry.json`); projects/promote/federation.config.js:4-10 (`name: 'promote'`, expõe `./Routes`); angular.json:264 (porta 4201 do projeto promote) | projects/shell/src/app/app.routes.ts:2; projects/shell/src/app/app.routes.ts:13; projects/shell/src/main.ts:1; projects/shell/src/main.ts:3; projects/shell/src/app/app.routes.ts:9 |
| 3 | projects/diaspora | /open-account-flow-test | page → embedded-frontend | origem → destino | iframe | Undetermined | Undetermined | — | projects/diaspora/src/app/pages/legacy-onboarding.ts:31 |

## Observações

**1. projects/shell → projects/diaspora.** O shell carrega `./Routes` de `diaspora` (projects/shell/src/app/app.routes.ts:16-18), resolvido pelo manifesto. O nome e o módulo correspondem a projects/diaspora/federation.config.js:4-9; a porta 4202 só corrobora. Em produção, o manifesto aponta para `/remotes/diaspora/`, onde a imagem instala o build da unidade (Dockerfile:41; deploy/federation.manifest.prod.json:3).

**2. projects/shell → projects/promote.** Mesmo fluxo para `promote` (projects/shell/src/app/app.routes.ts:11-13). O nome e o módulo correspondem a projects/promote/federation.config.js:4-9; a porta 4201 só corrobora. Em produção, `/remotes/promote/` (Dockerfile:40; deploy/federation.manifest.prod.json:2).

**3. projects/diaspora → /open-account-flow-test.** O iframe usa `__LEGACY_ONBOARDING_URL__` quando definido, senão o caminho relativo `/open-account-flow-test` (projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 53-54). Não há override nem implementação desse caminho no snapshot, e o nginx o mandaria para o shell (deploy/nginx.conf:128-130). Por isso No snapshot e Ativa ficam Undetermined.

## Resumo

Relações: 3 (host → remote: 2, page → embedded-frontend: 1). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
