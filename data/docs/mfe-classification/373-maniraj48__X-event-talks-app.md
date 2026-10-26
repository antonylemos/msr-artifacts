---
schema: 1
id: 1271056104
full_name: maniraj48/X-event-talks-app
url: https://github.com/maniraj48/X-event-talks-app
commit: 702f6a3130c71489af67f746e9b9ee6e33b1cf0e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 373 — maniraj48/X-event-talks-app

## Contexto

Aplicação “BigQuery Release Pulse”. Um servidor Flask lê o feed Atom de release notes do BigQuery e expõe uma API (`README.md:1–3`, `:76–85`; `app.py:7–13`, `:111–150`). Uma página única (`templates/index.html`) com CSS e JavaScript puros lista as notas e oferece um compositor de posts para o X (`README.md:47–51`). “Frontend orchestration” no README descreve o papel de `static/js/app.js` (estado, cliente `fetch`, busca e compositor), não composição de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:374` registra rank 373, ID 1271056104, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:374` registra a estratégia `broader` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31956` e `data/discovery/mfe-round-002/candidates.csv:31964`, ambos com `broader` e `unknown`. Na rodada 002, `recent-push` é `pass` e `recent-human-commit` é `unknown` (`activity_incomplete`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | 2026-10-07T23:43:42.907Z / 2026-10-08T16:24:44.223Z |

A consulta efetiva acrescenta `pushed:>=2025-04-01` e o intervalo de criação do trimestre.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem CSS, sem licença, `fork: false`, tamanho 17, criação em 2026-06-16T09:41:54Z, push em 2026-06-16T09:49:22Z.

**Grafia:** `README.md:64` (“`app.js               # Frontend orchestration, fetch client, search and composer code`”), no diagrama da estrutura de diretórios. É a única ocorrência da frase.

O README foi adicionado no próprio SHA (2026-06-16T15:19:12+05:30, isto é, 09:49:12Z), que coincide com o `pushed_at` e antecede as coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 7 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `.gitignore`, `README.md`, `app.py`, `requirements.txt`, `static/css/style.css`, `static/js/app.js` e `templates/index.html`. Não há `package.json` nem ferramenta de build. | contrária |
| Código-fonte (backend) | `app.py:111–113`: `/` renderiza `index.html`; `:115–150`: rotas `/api/releases`, `/api/tweet` e `/api/tweets`; `:153`: servidor na porta 5000. `requirements.txt:1–3`: Flask, requests e beautifulsoup4. | contexto |
| Código-fonte (frontend) | `templates/index.html:18`, `:172`: carrega `/static/css/style.css` e `/static/js/app.js`; os outros `<link>` são fontes e ícones externos (`:10–15`). `static/js/app.js:1–12`, `:44–50`: estado global e manipulação do DOM; `:123`, `:358`, `:394`: `fetch` para a API Flask. Uma única página com um script. | contrária |
| Tecnologia / Configuração / Composição (busca) | Os `<script>`/`<link>` de `templates/index.html` e as chamadas `fetch`/`import` de `static/js/app.js` não mostram `iframe`, import dinâmico nem carregamento de outra aplicação. | ausente |

## Autoria e histórico

Clone não raso. Há 2 commits (2 em todos os refs), sem merges, ambos de `maniraj48 <manirajkyatham@gmail.com>` (autor e committer):
- `c5d0f7a` (2026-06-16T15:08:56+05:30, “Initial commit of BigQuery Release Pulse application”): adiciona `app.py`, `requirements.txt`, `static/` e `templates/`;
- `702f6a3` (2026-06-16T15:19:12+05:30, “docs: add project README.md”), o SHA.

`git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única página servida pelo Flask (`app.py:111–113`; `templates/index.html:172`); nenhuma configuração de composição. |
| Q2 | No | Não há duas unidades frontend. |
| Q3 | No | Não há host que carregue unidades; o Flask só renderiza o template e serve a API. |
| Q4 | No | Nenhum mecanismo de composição; a “orquestração” do README é a lógica de um único script (`README.md:64`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma página com JavaScript puro sobre um backend Flask.
- O hit vem de vocabulário de orquestração não relacionado a micro-frontends, como os falsos positivos da consulta `"frontend orchestration"` em 279, 312, 320, 336 e 350 (rascunhos).
- `frontend_units: 1`, `single-unit`, `ui_technologies: []` (HTML, CSS e JavaScript sem framework), `build_tools: []`. `repo_type: example`: aplicação de demonstração com publicação simulada em memória (`app.py:9–10`, `:143–144`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** a frase casada está num comentário do diagrama de diretórios do README (`README.md:64`). É o sexto falso positivo da consulta `"frontend orchestration"` na série.
- **Protocolo (elegibilidade):** a elegibilidade fica `unknown` nas duas rodadas (`recent-human-commit` com `activity_incomplete`), e o candidato entrou na amostra assim.
