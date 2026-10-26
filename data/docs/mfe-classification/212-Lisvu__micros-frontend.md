---
schema: 1
id: 1160906326
full_name: Lisvu/micros-frontend
url: https://github.com/Lisvu/micros-frontend
commit: fa92a02ba519797b6a018fd6e93515695d94bf40
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 212 — Lisvu/micros-frontend

## Contexto

Frontend React (Create React App ejetado, Ant Design, React Router) de uma plataforma de cursos on-line: login, cursos, módulos, quizzes, exercícios de programação, provas, notas e fórum. Consome uma API em `http://localhost:8000` (`src/api/request.js:3–7`). É uma única aplicação com rotas internas (`src/App.jsx:1–25`). O README é o padrão do CRA, e nenhum arquivo do snapshot menciona micro-frontends, Module Federation ou single-spa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:213` registra rank 212, ID 1160906326, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:213` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25082` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:25089` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta / consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-02` / `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:31:23.418Z / 2026-10-08T15:57:49.131Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 666;
- criação em 2026-02-18T14:09:19Z, push em 2026-03-31T10:12:28Z.

O README (`README.md:1–30`, padrão do CRA) não contém “micro frontend” nem variantes, e a descrição é nula. O único campo restante da consulta `in:name,description,readme` é o nome do repositório, que deve ser a origem do acerto pela tokenização da busca. Isso explica a entrada na amostra, mas não é evidência de classificação.

O README vem de `422da70` (2026-02-18) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 71 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto CRA ejetado: `config/` (Webpack, Jest, dev server), `scripts/` (`start.js`, `build.js`, `test.js`), `public/` e `src/` com `pages/` (20 arquivos, um deles vazio), `components/`, `api/` e `styles/`. | contrária |
| Código-fonte | `src/App.jsx:1–25`: um `BrowserRouter` que importa estaticamente todas as páginas locais. `src/api/request.js:3–7`: cliente Axios para o backend local. | contrária |
| Configuração / Build | `package.json:66–67`: `start`/`build` chamam `scripts/start.js`/`build.js` do CRA ejetado, que usam `config/webpack.config.js`. A busca no SHA (exceto lockfile) por `ModuleFederationPlugin`, `remoteEntry`, `federation`, `single-spa` e `micro.?front` não retorna nada. | contrária |
| Documentação | `README.md:1–30`: README padrão do Create React App, sem menção a micro-frontends. | ausente |

## Autoria e histórico

Clone não raso; 20 commits, 1 merge. Todos são de Lisvu: 19 como `Lisvu_chen <23301031@bjtu.edu.cn>` e o `88ef70a` inicial (2026-02-18, noreply, interface web). Há um merge `d6d0703` (“Merge remote content”, 2026-02-18) e depois commits de funcionalidades, com mensagens em chinês, até o SHA `fa92a02` (2026-03-19, ajuste do fórum). O e-mail institucional e as mensagens indicam trabalho acadêmico. O `pushed_at` (2026-03-31) é posterior ao SHA, sem outro branch no clone. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`src/App.jsx:1–25`); nenhuma configuração referencia outra unidade. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; as páginas são módulos internos do mesmo build. |
| Q4 | No | Nenhum mecanismo de composição (busca registrada; `config/webpack.config.js` sem federação). |
| Q5 | No | Q1–Q4 são No: monólito frontend React sem referência a micro-frontends no conteúdo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”.
- O acerto vem só do nome do repositório; o conteúdo não usa o termo.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`. `build_tools: [webpack]`, pois o CRA ejetado expõe `config/webpack.config.js` usado pelos scripts, como 019 e ao contrário do CRA não ejetado de 087. `repo_type: other`: trabalho acadêmico de aplicação, não exemplo de MFE.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** nome de repositório com “micros-frontend” num monólito CRA; a busca de frase casa só o nome.
- **Protocolo (busca):** o acerto depende só do campo nome. A elegibilidade muda de `unknown` (001) para `pass` (002).
