---
schema: 1
id: 1371990391
full_name: krish-027/PulseIQ
url: https://github.com/krish-027/PulseIQ
commit: 96e83a6fad723dd2a1fe09c23f6ceddd6a1466d8
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

# 350 — krish-027/PulseIQ

## Contexto

Aplicação Python (“PulseIQ”) que analisa feedback de clientes com RAG (LangChain, FAISS, Gemini): backend FastAPI, interface Streamlit multipágina e dados de avaliação (`README.md:7`, `:51–53`, `:470`; descrição do repositório). Há uma única interface (`frontend/app.py`) com páginas registradas por `st.Page`/`st.navigation`. “Orquestração” no README se refere ao fluxo de análise em lote e à cadeia RAG, não a composição de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:351` registra rank 350, ID 1371990391, status `cloned`, branch `master` (a padrão) e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:351` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37350` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:37374` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:45:57.379Z / 2026-10-08T16:25:31.230Z |

Metadados do hit (iguais nas duas rodadas): descrição sobre a aplicação de IA para feedback de clientes, sem os termos buscados; sem tópicos; linguagem Python; `fork: false`; tamanho 3507; criação em 2026-09-15T19:09:18Z; push em 2026-09-22T04:24:45Z.

**Grafia:** o README do SHA não contém a frase “frontend orchestration”.
- A sequência mais próxima é `README.md:264` (“When multiple PDFs are selected, the Streamlit frontend orchestrates the existing single-document workflow once per PDF.”), sob o título “Batch analysis orchestration” (`:262`). Casar “orchestrates” com “orchestration” dependeria de normalização morfológica da busca do GitHub, que não está registrada.
- Também aparecem “orchestrated by the Streamlit frontend” (`README.md:620`) e “RAG orchestration” (`:53`, `:578`, `:1056`, `:1430`).

Não se afirma qual trecho a API casou, porque ela não informa linha.

A última alteração do README é `1ab4a2b` (2026-09-21T15:32:16+05:30), e o SHA (2026-09-22T09:54:34+05:30, isto é, 04:24:34Z) coincide com o `pushed_at`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 242 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `backend/` (FastAPI, serviços RAG e avaliação, inclusive `__pycache__` versionado), `frontend/` (13 arquivos), `Sample_Data/` (100 PDFs de exemplo e scripts), `docs/` (capturas de tela), `requirements.txt` e `pytest.ini`. Não há código JavaScript nem `package.json`. | contrária |
| Código-fonte (frontend) | `frontend/app.py:3`, `:10`: Streamlit e `st.set_page_config`; `:276–316`: páginas `home`, `dashboard`, `analysis`, `search`, `evaluation` e `system_status` como `st.Page` de `frontend/pages/*.py`; `:416`: `st.navigation`. Uma única aplicação Streamlit multipágina. | contrária |
| Código-fonte (integração) | `frontend/services/api_client.py:22`: cliente HTTP com `base_url` `http://127.0.0.1:8000` para a API FastAPI. `README.md:1135`, `:1419`: as páginas chamam o backend pelo cliente, sem replicar lógica. | contexto |
| Documentação | `README.md:262–264`, `:620`: o frontend chama o endpoint de upload uma vez por PDF (“orchestrates”), ou seja, orquestração de requisições ao backend. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` em `frontend`, `backend` e Markdown por `iframe`, `components.v1`, `federation` e `micro.?front`: nenhuma ocorrência. | ausente |
| Código-fonte (fronteiras) | Uma única unidade frontend; o frontend não importa módulos do backend (comunicação só por HTTP via `api_client.py`). | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 17 commits (17 em todos os refs), 1 merge:
- 13 de `Krish Pathak <krishpathak027@gmail.com>`;
- 4 de `Hrishabh Raj <hrishabhraj1725@gmail.com>` (estrutura e implementação FastAPI).

Os registros vão de 2026-09-16 (`7000719`, “Initial commit”) ao SHA (2026-09-22, “Cleaned Folder Structure”). O merge `364a886` cita o repositório `krish-027/AI-Feedback-Intelligence`, nome anterior ou origem do projeto. O branch `feature/multi-pdf-upload` não foi considerado. `git rev-list --objects $SHA --missing=print` lista 117 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação Streamlit (`frontend/app.py:276–316`, `:416`); nenhuma configuração de composição. |
| Q2 | No | Não há duas unidades frontend. |
| Q3 | No | Não há host que carregue unidades; `st.navigation` alterna páginas da mesma aplicação. |
| Q4 | No | Nenhum mecanismo de composição; a “orquestração” do README é de chamadas à API e da cadeia RAG (`README.md:264`, `:53`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma interface Streamlit com backend separado.
- O hit vem de vocabulário de orquestração não relacionado a micro-frontends, como os falsos positivos da consulta `"frontend orchestration"` em 279, 312, 320 e 336 (rascunhos).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [streamlit]` (convenção de 312 e 325), `build_tools: []`. `repo_type: example`: aplicação de demonstração com dados sintéticos e avaliação de RAG.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** a consulta ampla `"frontend orchestration"` casa textos em que o frontend “orchestrates” chamadas a um backend (`README.md:264`). É o quinto falso positivo dessa consulta na série, sugerindo baixa precisão para o protocolo.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
