---
schema: 1
id: 1369982810
full_name: leosvelperez/mf-webpack-5-111-repro
url: https://github.com/leosvelperez/mf-webpack-5-111-repro
commit: 5d3a2ea6d7268534b007fa5497cb38a399d92445
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 227 — leosvelperez/mf-webpack-5-111-repro

## Contexto

Reprodução mínima de um defeito de build: “Production build of a module federation remote with `[contenthash]` in `output.filename` fails on webpack 5.111.0” (`README.md:1–20`). São seis arquivos:
- um `webpack.config.js` com `ModuleFederationPlugin` de `@module-federation/enhanced`, que expõe `./Module`;
- `src/mod.js`, que exporta a string `'mod'`;
- `src/index.js`, que só faz `console.log('remote')`.

Não há interface, HTML nem consumidor. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:228` registra rank 227, ID 1369982810, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:228` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37291` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:37300` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta / consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-09` / `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-09-01..2026-09-30` | 2026-10-07T23:31:04.154Z / 2026-10-08T16:19:36.684Z |

Metadados do hit:
- descrição “Module federation production build fails on webpack 5.111.0 with [contenthash] in output.filename”;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 1;
- criação em 2026-09-14T13:45:16Z, push em 2026-09-14T13:45:21Z.

Grafia: “Module federation” em `README.md:1` (“# Module federation build failure on webpack 5.111.0”) e “module federation” em `:3`, além da descrição.

O README vem do único commit, o SHA `5d3a2ea` (2026-09-14), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 6 entradas, todas arquivos regulares `100644` (`.gitignore`, `README.md`, `package.json`, `webpack.config.js`, `src/index.js`, `src/mod.js`); zero symlinks e zero gitlinks. Não há HTML, componentes nem framework de UI. | contrária |
| Configuração | `webpack.config.js:1–13`: `ModuleFederationPlugin({ name: 'remote1', exposes: { './Module': './src/mod.js' } })`, `mode: 'production'` e `output.filename: '[name].[contenthash].js'`. `package.json:7–11`: `@module-federation/enhanced` 2.9.0 e `webpack` 5.111.0. | fraca |
| Código-fonte | `src/mod.js:1`: `export default 'mod';`. `src/index.js:1`: `console.log('remote');`. O módulo exposto é uma string, não uma unidade frontend. | contrária |
| Documentação | `README.md:3–20`: objetivo de reproduzir o erro “Path variable [contenthash] not implemented in this context” e comparar com 5.110.0. | contexto |

## Autoria e histórico

Clone não raso; 1 commit, o SHA `5d3a2ea` (2026-09-14, “Reproduce the module federation build failure on webpack 5.111.0”), de Leosvel Perez Espinosa. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o “remoto” expõe uma string (`src/mod.js:1`) e não referencia outras unidades. |
| Q2 | No | Sem unidades frontend, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou consumidor. |
| Q4 | No | O plugin está configurado só para reproduzir uma falha de build, sem conectar unidades (`webpack.config.js:8–11`). |
| Q5 | No | Q1–Q4 são No: reprodução de defeito de ferramenta de build. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE-related dependencies that are unused or experimental”: o Module Federation está configurado, mas só como caso mínimo para um relatório de defeito.
- Não é MFE-unit: o `exposes` publica uma string, não uma unidade frontend preparada para composição, como no rascunho 213 (função `sum`).
- `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []` (sem unidade frontend a que atribuir o bundler), `repo_type: other`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** repositórios de reprodução de bugs do ecossistema Module Federation casam a consulta de tecnologia sem conter unidades.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
