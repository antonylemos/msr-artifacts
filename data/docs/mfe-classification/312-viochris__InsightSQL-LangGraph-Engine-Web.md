---
schema: 1
id: 1146461909
full_name: viochris/InsightSQL-LangGraph-Engine-Web
url: https://github.com/viochris/InsightSQL-LangGraph-Engine-Web
commit: afbcb50604cc36c71417e45ff3e0c99be56857ba
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

# 312 — viochris/InsightSQL-LangGraph-Engine-Web

## Contexto

Aplicação Python/Streamlit de um agente SQL com LangGraph e Gemini (“InsightSQL”, `README.md:1–12`). Tem um único script `app.py` com funções auxiliares em `function.py` e um banco SQLite de exemplo, publicada no Streamlit Cloud (homepage dos metadados). Não há código JavaScript nem frontend composto. O termo da busca resulta da justaposição de “(Frontend).” e “**Orchestration:**” em linhas consecutivas do README. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:313` registra rank 312, ID 1146461909, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:313` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24186` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:24193` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q1` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:42:21.826Z / 2026-10-08T16:24:22.926Z |

Metadados do hit (iguais nas duas rodadas): descrição sobre o agente SQL com LangGraph e Gemini 2.5, sem os termos buscados; tópicos `database-analysis`, `gemini-api`, `generative-ai`, `glass-box-ai`, `langgraph`, `llm-reasoning`, `python`, `react-architecture`, `sql-agent`, `streamlit`; linguagem Python; licença MIT; `fork: false`; tamanho 296; criação em 2026-01-31T06:03:24Z; push em 2026-01-31T07:30:14Z.

**Grafia:** o README do SHA não contém a frase “frontend orchestration”. A única sequência compatível é o fim de `README.md:38` (“* **Framework:** Streamlit (Frontend).”) seguido de `README.md:39` (“* **Orchestration:** LangGraph (Cyclic ReAct Agent).”): os tokens “Frontend” e “Orchestration” ficam adjacentes depois de pontuação, quebra de linha e marcação. O tópico `react-architecture` refere-se ao padrão ReAct de agentes, não ao React. Não se afirma qual trecho a API casou, porque ela não informa linha.

A última alteração do README é o SHA (2026-01-31T14:30:14+07:00, isto é, 07:30:14Z), igual ao `pushed_at` e anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 10 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `app.py`, `function.py`, `requirements.txt`, `dresses.db` (SQLite), quatro imagens em `assets/`, `README.md` e `LICENSE`. Não há `package.json`, HTML ou código JavaScript. | contrária |
| Configuração | `requirements.txt`: `streamlit`, `langchain`, `langchain-community`, `langchain-google-genai`, `langchain-core`, `langgraph` e `sqlalchemy`. | contrária |
| Código-fonte | `app.py:1–33`: importa Streamlit, LangChain e LangGraph (`create_react_agent`, `:15`) e as funções de `function.py` (`:19`), e configura a página (`st.set_page_config`, `:33`). `function.py:3`, `:23`, `:43`, `:64`, `:80`: funções de estado da sessão Streamlit (`init_state`, `change_on_api_key`, `reset_state`, `reset_chat_display`, `change_on_lan`). Uma única aplicação. | contrária |
| Documentação | `README.md:38–39`: “Framework: Streamlit (Frontend)” e “Orchestration: LangGraph (Cyclic ReAct Agent)”, onde “orchestration” designa a orquestração do agente LLM. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` em `app.py` e `function.py` por `iframe`, `components.v1`, `st.components`, `html(`, `federation`, `single.?spa`, `import.?map`, `customElements` e `micro`: nenhuma ocorrência. A única importação local é `from function import …` (`app.py:19`), na mesma aplicação. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 6 commits (6 em todos os refs), nenhum merge, todos de `Silvio Christian, Joe <140993389+viochris@users.noreply.github.com>` com committer `GitHub` (uploads e edições pela interface web), em 2026-01-31, de `736b5a3` (“Initial commit”) ao SHA (“Update README.md”). `git rev-list --objects $SHA --missing=print` lista 4 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação Streamlit (`app.py:1–33`; `requirements.txt`); nenhuma configuração de composição. |
| Q2 | No | Não há duas unidades. |
| Q3 | No | Não há host que carregue unidades. |
| Q4 | No | Nenhum mecanismo de composição frontend; a “orquestração” do README é o grafo LangGraph do agente (`README.md:39`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: aplicação Python/Streamlit única.
- Nem é caso de menção a micro-frontends: o hit resulta de tokens adjacentes de linhas distintas (“(Frontend).” / “**Orchestration:**”), como o falso positivo lexical de 279 (rascunho).
- `frontend_units: 1`, `single-unit`. `ui_technologies: [streamlit]`, o framework de UI observado (`requirements.txt`; `app.py:1`). `build_tools: []`: não há bundler. `repo_type: example` (demonstração de agente com banco SQLite de exemplo, `dresses.db`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** a consulta ampla `"frontend orchestration"` casou a justaposição de dois rótulos de lista (`README.md:38–39`) num projeto de agente LLM, em que “orchestration” significa orquestração de agentes. Assim como em 279, a busca de frase parece ignorar pontuação e quebras de linha entre tokens.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
