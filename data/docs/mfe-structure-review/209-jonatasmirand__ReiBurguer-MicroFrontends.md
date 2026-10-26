---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| cardapio | cardapio/next.config.js;cardapio/next.config.mjs;cardapio/package.json | cardapio/package.json | cardapio/src/pages/_app.js:3 (`export default function App`, Pages Router); cardapio/src/pages/index.js:14 (rota `/`) | cardapio/next.config.js:3-21 (config com `NextFederationPlugin`, precedente no Next 14); cardapio/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios; remote `cardapio` |
| container | container/next.config.mjs;container/package.json | container/package.json | container/src/pages/_app.js:3 (`export default function App`, Pages Router); container/src/pages/index.js:8 (rota `/`) | container/next.config.mjs:4-32 (`nextConfig` com `NextFederationPlugin`); container/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios; host |
| pedido | pedido/next.config.mjs;pedido/package.json | pedido/package.json | pedido/src/pages/_app.js:3 (`export default function App`, Pages Router); pedido/src/pages/index.js:15 (rota `/`) | pedido/next.config.mjs:4-31 (`nextConfig` com `NextFederationPlugin`); pedido/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios; remote `pedido` |

## Resumo

Aplicações frontend no snapshot: 3 (cardapio, container, pedido).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação.
- Não há `workspaces` nos `package.json`, nem `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, `nx.json` ou `rush.json`. A raiz não tem `package.json`; o `package-lock.json` da raiz não tem pacotes (`package-lock.json:1-6`). A marca `workspace-config` dos três `package.json` no `artifacts.csv` não corresponde a declaração de workspace, e o `matches.csv` não tem ocorrências `ws-*`.
- A entrada das três apps segue a convenção do Pages Router (`src/pages/_app.js` + páginas), invocada por `next build`, sem declaração em configuração.
- `cardapio` tem dois `next.config`: `next.config.mjs:13` expõe `./src/_components/Cardapio.jsx`, ausente do snapshot, enquanto `next.config.js:11` expõe `./src/components/Cardapio.jsx`, que existe. Como `next.config.js` é o carregado pelo Next 14, a referência ausente fica num arquivo que não é usado pelo build, e a linha ficou `Yes`, não `Undetermined`.
- Deploy: sem Dockerfile, `vercel.json`, `netlify.toml` ou workflow de CI no snapshot. As ocorrências `ops-hosting` são `README.md:94` (sugestão de hospedar na Vercel) e o texto padrão do create-next-app em `cardapio/README.md:25-38`. A homepage na Vercel citada pela classificação é metadado, não artefato do snapshot.
