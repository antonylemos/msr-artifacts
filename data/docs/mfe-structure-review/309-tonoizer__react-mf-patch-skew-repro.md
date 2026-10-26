---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Workspace

`pnpm-workspace.yaml:1-5` (`packages`: `host`, `remote_a`, `remote_b`, `remote_c`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-17 (manifesto da raiz; só scripts de orquestração e `playwright-core`) | — | — | — | — | No | Raiz do workspace pnpm, sem entrada nem build próprio; os scripts só delegam aos pacotes (`package.json:6-11`). |
| host | host/index.html;host/package.json;host/vite.config.js | host/package.json:1-19 (manifesto próprio) | host/index.html:8-9 (`#root` e entrada `/src/main.jsx`); host/src/main.jsx:5-9 (monta React) | host/vite.config.js:13-39 (configuração própria); host/package.json:6 (`vite build`) | pnpm-workspace.yaml:2 (`'host'`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| remote_a | remote_a/index.html;remote_a/package.json;remote_a/vite.config.js | remote_a/package.json:1-19 (manifesto próprio) | remote_a/index.html:8-9 (`#root` e entrada `/src/main.jsx`); remote_a/src/main.jsx:5 (monta React) | remote_a/vite.config.js:13-38 (configuração própria); remote_a/package.json:6 (`vite build`) | pnpm-workspace.yaml:3 (`'remote_a'`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| remote_b | remote_b/index.html;remote_b/package.json;remote_b/vite.config.js | remote_b/package.json:1-19 (manifesto próprio) | remote_b/index.html:8-9 (`#root` e entrada `/src/main.jsx`); remote_b/src/main.jsx:5 (monta React) | remote_b/vite.config.js:13-31 (configuração própria); remote_b/package.json:6 (`vite build`) | pnpm-workspace.yaml:4 (`'remote_b'`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| remote_c | remote_c/index.html;remote_c/package.json;remote_c/vite.config.js | remote_c/package.json:1-19 (manifesto próprio) | remote_c/index.html:8-9 (`#root` e entrada `/src/main.jsx`); remote_c/src/main.jsx:5 (monta React) | remote_c/vite.config.js:13-31 (configuração própria); remote_c/package.json:6 (`vite build`) | pnpm-workspace.yaml:5 (`'remote_c'`) | — | Yes | Aplicação React com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 4 (host, remote_a, remote_b, remote_c).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação; não há unidade externa.
- Não há Dockerfile, CI nem configuração de hospedagem (nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv`). Cada app tem porta própria de `preview` (`*/vite.config.js:15`), e a raiz tem um script de preview por pacote (`package.json:8-11`), mas isso é execução local, não deploy separado.
- `scripts/` (Playwright, `scripts/capture.mjs`) e `evidence/` não estão no `units.csv` e não são frontend.
