---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 040 — AlanOlimpio/list

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json;webpack.config.js | package.json:1-11 (manifesto da aplicação) | webpack.config.js:5 (entry src/index.js); src/index.js:1 (carrega bootstrap); src/bootstrap.js:7-15 (monta React) | webpack.config.js:4-11 (configuração e saída próprias); package.json:9 (`webpack --mode production`) | — | vercel.json:5-11 (build estático com saída dist) | Yes | Aplicação React da raiz com entrada, build webpack e configuração de hospedagem próprios. |
| public | public/index.html | — | — | — | — | — | No | Diretório de template HTML da aplicação da raiz, referenciado em webpack.config.js:41-43. |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra frontend_units: 2: ListApp e RegisterApp. Só ListApp está no snapshot; RegisterApp é externo (webpack.config.js:52-54) e não vira linha na tabela. Por isso há uma unidade frontend local.
- package.json:5 declara main como index.js, mas a entrada usada pelo build está explicitamente em webpack.config.js:5: src/index.js.
