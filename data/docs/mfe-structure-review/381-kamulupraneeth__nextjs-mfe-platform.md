---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
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

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| analytics-dashboard | analytics-dashboard/next.config.ts;analytics-dashboard/package.json | analytics-dashboard/package.json | analytics-dashboard/src/app/layout.tsx:9 (`RootLayout`, App Router); analytics-dashboard/src/app/page.tsx (rota `/` sob `basePath`) | analytics-dashboard/next.config.ts:3-7 (`basePath: "/analytics"`, `assetPrefix: "/analytics-assets"`); analytics-dashboard/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios |
| host-shell | host-shell/next.config.ts;host-shell/package.json | host-shell/package.json | host-shell/src/app/layout.tsx:17 (`RootLayout`, App Router); host-shell/src/app/page.tsx (rota `/`) | host-shell/next.config.ts:8-50 (`rewrites()` para as zonas); host-shell/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios |
| workspace-document | workspace-document/next.config.ts;workspace-document/package.json | workspace-document/package.json | workspace-document/src/app/layout.tsx:20 (`RootLayout`, App Router); workspace-document/src/app/page.tsx (rota `/` sob `basePath`) | workspace-document/next.config.ts:3-8 (`basePath: "/workspace"`, `assetPrefix: "/workspace-assets"`); workspace-document/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios |

## Resumo

Aplicações frontend no snapshot: 3 (analytics-dashboard, host-shell, workspace-document).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação.
- Não há `package.json` na raiz nem `pnpm-workspace.yaml`, `turbo.json`, `nx.json` ou `lerna.json`; cada app tem `package-lock.json` próprio. Os `package.json` das apps não têm `workspaces`, e as ocorrências `ws-path-alias` (`<app>/tsconfig.json:21`) são aliases `paths` internos de cada app.
- Não há Dockerfile, CI nem `vercel.json`/`netlify.toml`. As ocorrências `ops-hosting` são o texto padrão do create-next-app em `<app>/README.md:21-34` ("Deploy on Vercel"), não configuração de deploy.
- O `README.md` da raiz (UTF-16) foi removido da aquisição pelo preset `binaries` (`normalization.json`); não afeta as linhas da tabela.
