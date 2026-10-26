---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
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

# 381 — kamulupraneeth/nextjs-mfe-platform

## Leitura do repositório

Plataforma de demonstração com três aplicações Next.js independentes unidas por Next.js
Multi-Zones, sem workspace nem pacote compartilhado. Cada app tem `package.json` e porta próprios:
`host-shell` (3000), com a página inicial e a navegação global; `analytics-dashboard` (3001), um
painel de telemetria; e `workspace-document` (3002), um editor de documentos
(host-shell/package.json:6, analytics-dashboard/package.json:6, workspace-document/package.json:6).

A composição é por rota no servidor, não por montagem na página. O `host-shell` declara em
`rewrites()`, na fase `beforeFiles`, que `/analytics`, `/analytics/api/metrics`, `/analytics/:path`
e os assets `/analytics-assets/_next/:path*` vão para `ANALYTICS_URL`, e que `/workspace`,
`/workspace/:path*` e `/workspace-assets/_next/:path*` vão para `WORKSPACE_URL`
(host-shell/next.config.ts:10-46). As duas URLs valem `PRODUCTION_ANALYTICS_URL` e
`PRODUCTION_WORKSPACE_URL` ou, por padrão, `http://localhost:3001` e `http://localhost:3002`
(host-shell/next.config.ts:3-6). Cada zona responde no caminho declarado pelo seu `basePath` e
serve os chunks sob um `assetPrefix` próprio (analytics-dashboard/next.config.ts:5-6;
workspace-document/next.config.ts:5, 7), para coexistir sob a origem do shell. Cada zona renderiza
a página inteira com layout próprio. Como em 013, 237 e 273, nenhum dos tipos `host → remote`,
`root-config → application`, `application → custom-element` ou `page → embedded-frontend`
descreve essa forma de entrada, por isso as duas relações estão como `other`.

Particularidades do roteamento: o shell repassa também uma rota de API da zona,
`/analytics/api/metrics` (host-shell/next.config.ts:19-23), que é o stream SSE que a página do
painel abre com `new EventSource("/analytics/api/metrics")` (analytics-dashboard/src/app/page.tsx:68),
servido por analytics-dashboard/src/app/api/metrics/route.ts. É a zona falando com o próprio
backend através da origem do shell, não comunicação entre unidades. O padrão `/analytics/:path`
(host-shell/next.config.ts:26) cobre um só segmento, sem o `*` que `/workspace/:path*` tem
(host-shell/next.config.ts:40).

O que não virou relação: a navegação entre zonas é por link de página inteira, com `<a href>`
para `/analytics` e `/workspace` na barra global (host-shell/src/components/GlobalNavbar.tsx:12-13,
41-43; o comentário em :38 diz que `Link` foi trocado por `<a>`) e com `<Link href={app.path}>` nos
cartões da página inicial (host-shell/src/app/page.tsx:11, 19, 74-75); link não é tipo de relação.
Os `postMessage` do analytics-dashboard são entre a página e um Web Worker de filtragem da própria
unidade (analytics-dashboard/src/app/page.tsx:30, 41, 97), e o `indexedDB` do workspace-document
guarda o rascunho da própria unidade (workspace-document/src/utils/indexedDB.ts:11). Não há estado
compartilhado nem troca de mensagens entre as zonas.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host-shell | analytics-dashboard | other | origem → destino | other | Yes | Yes | host-shell/next.config.ts:3-4, 14-33 (`ANALYTICS_URL`, padrão `http://localhost:3001`; `/analytics`, `/analytics/api/metrics`, `/analytics/:path`, `/analytics-assets/_next/:path*`); analytics-dashboard/next.config.ts:5-6 (`basePath: "/analytics"`, `assetPrefix: "/analytics-assets"`); analytics-dashboard/package.json:6 (porta 3001) | host-shell/next.config.ts:10 |
| 2 | host-shell | workspace-document | other | origem → destino | other | Yes | Yes | host-shell/next.config.ts:5-6, 35-46 (`WORKSPACE_URL`, padrão `http://localhost:3002`; `/workspace`, `/workspace/:path*`, `/workspace-assets/_next/:path*`); workspace-document/next.config.ts:5, 7 (`basePath: "/workspace"`, `assetPrefix: "/workspace-assets"`); workspace-document/package.json:6 (porta 3002) | host-shell/next.config.ts:10 |

## Observações

**1. host-shell → analytics-dashboard.** O shell repassa `/analytics`, `/analytics/api/metrics`,
`/analytics/:path` e `/analytics-assets/_next/:path*` para `ANALYTICS_URL`
(host-shell/next.config.ts:14-33). O destino foi resolvido pelo caminho: `/analytics` é o
`basePath` e `/analytics-assets` é o `assetPrefix` de `analytics-dashboard`
(analytics-dashboard/next.config.ts:5-6), e a rota `/api/metrics` existe na zona
(analytics-dashboard/src/app/api/metrics/route.ts). O padrão `http://localhost:3001`
(host-shell/next.config.ts:4) e a porta do script `dev` (analytics-dashboard/package.json:6) só
corroboram. Tipo e mecanismo são `other`: o shell não carrega módulos da zona nem a registra num
orquestrador; encaminha a requisição para outra aplicação, que responde com a página inteira
(Next.js Multi-Zones por `rewrites`). A direção é a do encaminhamento. Ativa `Yes` pela linha
manual `host-relationship` da revisão de código-fonte (host-shell/next.config.ts:10).

**2. host-shell → workspace-document.** Mesmo padrão com `/workspace`, `/workspace/:path*` e
`/workspace-assets/_next/:path*` para `WORKSPACE_URL` (host-shell/next.config.ts:35-46). `/workspace`
é o `basePath` e `/workspace-assets` é o `assetPrefix` de `workspace-document`
(workspace-document/next.config.ts:5, 7); o padrão `http://localhost:3002`
(host-shell/next.config.ts:6) e a porta 3002 (workspace-document/package.json:6) corroboram. A
mesma linha de código sustenta as relações 1 e 2.

## Resumo

Relações: 2 (other: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
