---
schema: 1
id: 1227454539
full_name: LaurAndreea10/brief-studio
url: https://github.com/LaurAndreea10/brief-studio
commit: 6dff88db1ab0aeb85582a8e10807c277f5491c83
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 200 — LaurAndreea10/brief-studio

## Contexto

“Brief Studio” (`README.md:1–8`): aplicação React + Vite de ferramentas de marketing (gerador de briefs, mood boards e análise de concorrentes) sobre APIs públicas gratuitas, publicada no GitHub Pages. É uma única aplicação com navegação por estado (`src/App.jsx:14–30`). O acerto da busca `"single-spa"` vem da expressão “The app is a single SPA with view-based routing” (`README.md:137`), não da biblioteca single-spa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:201` registra rank 200, ID 1227454539, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:201` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29409` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:29415` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q2` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:35:29.231Z / 2026-10-08T16:21:38.477Z |

Metadados do hit:
- descrição “A free marketing studio”, sem o termo;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 91;
- criação em 2026-05-02T17:52:20Z, push em 2026-05-02T18:12:50Z;
- homepage `laurandreea10.github.io/brief-studio/`.

O acerto vem de `README.md:137`, “The app is a single SPA with view-based routing managed entirely by `useState` in `App.jsx`.”. A grafia é “single SPA”, com espaço; a busca de frase do GitHub trata o hífen de `"single-spa"` como separador. Nenhum arquivo do SHA contém `single-spa`.

O README vem do commit-raiz `13d1011` (2026-05-02) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 31 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite (`index.html`, `src/` com componentes, views, “engines” e i18n), `CASE_STUDY.md` e um workflow de deploy no GitHub Pages. | contrária |
| Código-fonte | `src/App.jsx:14–30`: um único componente raiz alterna as views (`home`, `brief`, `mood`, `competitor`) por `useState`; as views são importadas estaticamente (`:4–9`). | contrária |
| Configuração / Build | `vite.config.js:4–11`: `react()` e `base: '/brief-studio/'`. `package.json:7–24`: React, framer-motion e Vite, sem dependência MFE. | contrária |
| Busca | `git grep -i` no SHA por `single.?spa`, `micro.?front` e `federation`: só `README.md:137`. | ausente |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de `LaurAndreea10` (noreply) pela interface web: `13d1011` (2026-05-02, “Add files via upload”) e o SHA `6dff88d` (2026-05-02, “Add GitHub Actions workflow for deployment to Pages”). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; `App.jsx` alterna views internas. |
| Q4 | No | Nenhum mecanismo de composição (`vite.config.js:4–11`; busca registrada). |
| Q5 | No | Q1–Q4 são No: SPA única captada pela expressão “single SPA”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical: “single SPA” no sentido de uma única aplicação de página única. É o mesmo falso positivo de 131, 144, 187 e 196.
- Há uma aplicação real, por isso `frontend_units: 1` e `single-unit`. `ui_technologies: [react]`, `build_tools: [vite]`. `repo_type: other`: ferramenta pessoal publicada, sem caráter de exemplo de MFE, template ou biblioteca.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** mais um caso de “single SPA” captado pela consulta de tecnologia `"single-spa"`; fica registrada a recorrência, sem proposta de regra.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
