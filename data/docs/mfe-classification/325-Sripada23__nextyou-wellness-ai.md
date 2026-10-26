---
schema: 1
id: 1130483744
full_name: Sripada23/nextyou-wellness-ai
url: https://github.com/Sripada23/nextyou-wellness-ai
commit: 23108c30c490989a10a0b6a4ce64e3c0f70771b4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [streamlit]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 325 — Sripada23/nextyou-wellness-ai

## Contexto

Aplicação Python de RAG sobre yoga, feita para o “NextYou Wellness RAG Micro-App Challenge” (`README.md:4–10`). Tem um backend FastAPI com recuperação semântica e log em MongoDB, e uma interface Streamlit de uma página (`frontend/app.py`). “Micro-app” designa o escopo pequeno da aplicação no desafio, não micro-frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:326` registra rank 325, ID 1130483744, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:326` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23043` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:23050` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q1` | `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:49:35.928Z / 2026-10-08T16:27:00.472Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem Python, `fork: false`, tamanho 11, criação em 2026-01-08T15:15:40Z, push em 2026-01-11T17:53:20Z.

Sem descrição, o acerto vem do README:
- **“micro app”:** só no singular hifenizado, “Micro-App” em `README.md:5` e “micro-app” em `:8` e `:80`. A frase plural “micro apps” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub (por exemplo, normalização de plural), que não está registrado.
- **“frontend”:** `README.md:10`, `:14`, `:15`, `:24`, `:29`.

O README foi alterado pela última vez no SHA (2026-01-11T23:23:18+05:30, isto é, 17:53:18Z), igual ao `pushed_at` e anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 16 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `backend/` (FastAPI, RAG, segurança, MongoDB), `frontend/app.py`, `data/yoga_articles.json`, `.env.example`, `.gitignore`, `README.md` e um `requirements.txt` vazio. Não há código JavaScript. | contrária |
| Código-fonte (frontend) | `frontend/app.py:1–42`: uma página Streamlit que envia a pergunta por `requests.post` para `http://127.0.0.1:8000/ask` (`:4`, `:22`) e exibe resposta e fontes. | contrária |
| Código-fonte (backend) | `backend/main.py:1–15`: FastAPI com rota `/ask`, que usa os módulos do próprio backend (`backend.rag`, `backend.safety`, `backend.db`). | contexto |
| Documentação | `README.md:5`, `:8`, `:80`: “micro-app” como rótulo do desafio e do escopo; `README.md:10–45`: arquitetura frontend → backend → RAG → MongoDB. | fraca |
| Tecnologia / Configuração / Composição | Nenhuma configuração ou código de composição frontend; o frontend é um único script que chama uma API. | ausente |
| Código-fonte (fronteiras) | `frontend/app.py` importa só `streamlit` e `requests`; não há imports entre frontend e backend, nem outra unidade frontend. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 9 commits (9 em todos os refs), nenhum merge, todos de `Sripada23 <samudralasripada@gmail.com>` como autor e committer, de 2026-01-09 (`8e3bb63`, “Initial project structure for NextYou Wellness RAG”) a 2026-01-11 (o SHA, “Add demo video link to README”). `git rev-list --objects $SHA --missing=print` lista 8 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única interface Streamlit (`frontend/app.py:1–42`) e um backend FastAPI; nenhuma configuração de composição. |
| Q2 | No | Não há duas unidades frontend. |
| Q3 | No | Não há host que carregue unidades. |
| Q4 | No | Nenhum mecanismo de composição; a interface só chama a API (`frontend/app.py:22`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma interface Streamlit com backend separado.
- “Micro-app” é rótulo do desafio, não uma unidade composta, como em 146 (rascunho) e no falso positivo da consulta ampla em 289 (rascunho).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [streamlit]` (mesma convenção de 312, rascunho), `build_tools: []`. `repo_type: example` (entrega para um desafio, com dados de exemplo).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** a consulta ampla `"micro apps" frontend` casa projetos que chamam a si mesmos de “micro-app” (escopo pequeno), sem relação com micro-frontends. Aqui só há grafia singular (`README.md:5`, `:8`, `:80`).
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
