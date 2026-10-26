---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| mfe1 | mfe1/package.json;mfe1/webpack.config.ts | mfe1/package.json | mfe1/webpack.config.ts:19 (`entry: './src/index.tsx'`); mfe1/webpack.config.ts:90-93 (`HtmlWebpackPlugin` com `template: './public/index.html'`); mfe1/src/bootstrap.tsx:12-19 (`hydrateRoot`/`createRoot(...).render(<App />)`) | mfe1/webpack.config.ts:18-101 + mfe1/package.json:9 (`"build": "node --loader ts-node/esm ./node_modules/webpack/bin/webpack.js --config webpack.config.ts --mode production"`) | — | — | Yes | Aplicação React com entrada própria e build webpack próprio. |
| mfe2 | mfe2/package.json;mfe2/webpack.config.ts | mfe2/package.json | mfe2/webpack.config.ts:13 (`entry: './src/index.tsx'`); mfe2/webpack.config.ts:43 (`HtmlWebpackPlugin` com `template: './public/index.html'`); mfe2/src/bootstrap.tsx:10-11 (`createRoot(container)`, `root.render(<App />)`) | mfe2/webpack.config.ts:12-45 + mfe2/package.json:9 (`"build": "node --loader ts-node/esm ./node_modules/webpack/bin/webpack.js --config webpack.config.ts --mode production"`) | — | — | Yes | Aplicação React com entrada própria e build webpack próprio. |

## Resumo

Aplicações frontend no snapshot: 2 (mfe1, mfe2).

## Notas

- O N coincide com `frontend_units: 2` da classificação: o host `mfe1` e o remoto `mfe2`, ambos no snapshot.
- Os `package.json` e `tsconfig.json` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum `package.json` declara `workspaces` (mfe1/package.json:1-37, mfe2/package.json:1-36) e não há manifesto na raiz. Não há ocorrências `ws-*` nem `ci-*` no `matches.csv`; a única `ops-*` é `ops-cors` em mfe1/webpack.config.ts:31 (cabeçalho CORS do dev server), que não é artefato de deploy.
- Cada projeto tem lockfile próprio e porta própria de desenvolvimento (mfe1/webpack.config.ts:26, mfe2/webpack.config.ts:17: 3001/3002).
- `mfe1/src/server/server.ts` é um servidor SSR dentro de `mfe1`, sem `package.json` próprio, e não vira linha.
