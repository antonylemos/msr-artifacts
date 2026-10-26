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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Leitura do repositório

Três aplicações Next.js em diretórios irmãos, sem `package.json` na raiz nem declaração de
workspace: cada uma tem `package.json` e `package-lock.json` próprios e é construída à parte. Os
três `package.json` têm os mesmos scripts gerados pelo create-next-app — `build: next build` e
`start: next start` — e diferem só na porta do `dev`: 3000 no `host-shell`, 3001 no
`analytics-dashboard` e 3002 no `workspace-document` (host-shell/package.json:5-10;
analytics-dashboard/package.json:5-10; workspace-document/package.json:5-10). Cada `next build`
gera o `.next` da própria aplicação, que o `.gitignore` de cada uma ignora
(host-shell/.gitignore:17; analytics-dashboard/.gitignore:17; workspace-document/.gitignore:17).
Não há script que dispare os três builds juntos.

Não há artefato de deploy no snapshot: nenhum Dockerfile, compose, workflow de CI, manifesto de
hospedagem (`vercel.json`, `netlify.toml`) nem configuração de proxy. As 12 ocorrências `ops-hosting`
do `matches.csv` são o texto padrão do create-next-app nos READMEs das três aplicações, linhas
21, 30, 32 e 34 de cada um (ex.: host-shell/README.md:32-34, "Deploy on Vercel"); não há
ocorrências `ci-*` nem `cfg-public-path`. Os `.gitignore` ignoram `.vercel`
(host-shell/.gitignore:36-37 e as mesmas linhas nas outras duas), o que também não é configuração
de hospedagem.

A configuração prevê um ambiente de produção sem descrevê-lo: o `host-shell` encaminha as rotas das
zonas para `PRODUCTION_ANALYTICS_URL` e `PRODUCTION_WORKSPACE_URL`, com padrão
`http://localhost:3001` e `http://localhost:3002` (host-shell/next.config.ts:3-6, 10-46). Isso
supõe as zonas publicadas em endereços próprios, mas nenhum artefato do snapshot define esses
endereços nem publica as aplicações. O que se executa no snapshot é local: `next dev` nas portas
fixas, e `next start` sem `--port`, que deixa as três na porta padrão do Next.js se forem subidas
em produção sem outra configuração.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | analytics-dashboard | separado | não observado | `/analytics` e `/analytics-assets` pelo shell (host-shell/next.config.ts:14-33); `PRODUCTION_ANALYTICS_URL`, padrão `http://localhost:3001` (host-shell/next.config.ts:3-4); `http://localhost:3001/analytics` (analytics-dashboard/package.json:6; analytics-dashboard/next.config.ts:5) | No | analytics-dashboard/package.json:7 (`next build`); analytics-dashboard/next.config.ts:3-7 (`basePath: "/analytics"`, `assetPrefix: "/analytics-assets"`) |
| 2 | host-shell | separado | não observado | `http://localhost:3000/` (host-shell/package.json:6) | No | host-shell/package.json:7 (`next build`); host-shell/next.config.ts:8-50 (`rewrites()` para as zonas) |
| 3 | workspace-document | separado | não observado | `/workspace`, `/workspace/:path*` e `/workspace-assets` pelo shell (host-shell/next.config.ts:35-46); `PRODUCTION_WORKSPACE_URL`, padrão `http://localhost:3002` (host-shell/next.config.ts:5-6); `http://localhost:3002/workspace` (workspace-document/package.json:6; workspace-document/next.config.ts:5) | No | workspace-document/package.json:7 (`next build`); workspace-document/next.config.ts:3-8 (`basePath: "/workspace"`, `assetPrefix: "/workspace-assets"`) |

## Observações

**1. analytics-dashboard.** Build próprio por `next build` (analytics-dashboard/package.json:7),
com `basePath: "/analytics"` e `assetPrefix: "/analytics-assets"`
(analytics-dashboard/next.config.ts:5-6), o que permite servi-la sob a origem do shell sem
colidir com os chunks dele. Nenhum artefato a empacota ou publica; só o `dev` na porta 3001 e o
`start` (analytics-dashboard/package.json:6, 8), por isso o deploy é `não observado`. O endereço de
produção existe só como nome de variável no shell (`PRODUCTION_ANALYTICS_URL`,
host-shell/next.config.ts:4). Além das páginas, o shell repassa a rota de API da zona,
`/analytics/api/metrics` (host-shell/next.config.ts:20-23), de modo que o backend SSE dela também é
servido por esse endereço. `version: "0.1.0"` sem uso em publicação, num pacote `private`
(analytics-dashboard/package.json:3-4).

**2. host-shell.** Build próprio por `next build` (host-shell/package.json:7). Os `rewrites()` ficam
na configuração dele (host-shell/next.config.ts:10-46) e, diferente de endereços fixos, leem as URLs
das zonas de variáveis de ambiente (host-shell/next.config.ts:3-6), que nenhum arquivo do snapshot
define (`.env*` está no `.gitignore`, host-shell/.gitignore:34). Sem artefato de deploy; sobe na
porta 3000 por `next dev` (host-shell/package.json:6). `version: "0.1.0"` sem uso
(host-shell/package.json:3-4).

**3. workspace-document.** Build próprio por `next build` (workspace-document/package.json:7), com
`basePath: "/workspace"` e `assetPrefix: "/workspace-assets"` (workspace-document/next.config.ts:5,
7). Sem artefato de deploy; sobe na porta 3002 por `next dev` (workspace-document/package.json:6) e
é alcançada pelo shell em `/workspace` e `/workspace/:path*` (host-shell/next.config.ts:35-42), com
o endereço de produção só nomeado como `PRODUCTION_WORKSPACE_URL` (host-shell/next.config.ts:6).
`version: "0.1.0"` sem uso (workspace-document/package.json:3-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
