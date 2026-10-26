---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-16 (manifesto coordenador) | — | — | — | — | No | Raiz de orquestração dos comandos das três aplicações, sem entrada própria. |
| header-mf | header-mf/package.json;header-mf/webpack.config.js | header-mf/package.json:1-7 (manifesto próprio) | header-mf/src/index.js:1 (entrada convencional webpack); header-mf/src/bootstrap.js:1-6 (monta React, mas depende do HTML ausente) | header-mf/webpack.config.js:4-19 (configuração própria); header-mf/webpack.config.js:46 (referencia template ausente); header-mf/package.json:6 (`webpack --mode production`) | — | — | Undetermined | Entrada e build próprios declarados, mas o template HTML exigido pelo build não existe no snapshot. |
| products-mf | products-mf/package.json;products-mf/webpack.config.js | products-mf/package.json:1-7 (manifesto próprio) | products-mf/src/index.js:1 (entrada convencional webpack); products-mf/src/bootstrap.js:1-6 (monta React, mas depende do HTML ausente) | products-mf/webpack.config.js:4-19 (configuração própria); products-mf/webpack.config.js:46 (referencia template ausente); products-mf/package.json:6 (`webpack --mode production`) | — | — | Undetermined | Entrada e build próprios declarados, mas o template HTML exigido pelo build não existe no snapshot. |
| shell | shell/package.json;shell/webpack.config.js | shell/package.json:1-7 (manifesto próprio) | shell/src/index.js:1 (entrada convencional webpack); shell/src/bootstrap.js:1-6 (monta React, mas depende do HTML ausente) | shell/webpack.config.js:4-19 (configuração própria); shell/webpack.config.js:40 (referencia template ausente); shell/package.json:6 (`webpack --mode production`) | — | — | Undetermined | Entrada e build próprios declarados, mas o template HTML exigido pelo build não existe no snapshot. |

## Resumo

Aplicações frontend no snapshot: 0.

## Notas

- A classificação registra frontend_units: 3. As três fronteiras pretendidas são observáveis, mas o critério estrutural exige poder construir a aplicação sozinha: header-mf/webpack.config.js:46, products-mf/webpack.config.js:46 e shell/webpack.config.js:40 referenciam public/index.html, ausente nos três diretórios. Por essa contradição, as três linhas receberam Undetermined e o resumo tem zero Yes.
- Os scripts de coordenação da raiz não são uma declaração de workspace nem um build de aplicação próprio.
- Não há ocorrências ops-* ou ci-* em matches.csv que demonstrem deploy separado.
