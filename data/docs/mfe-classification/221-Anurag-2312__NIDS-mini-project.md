---
schema: 1
id: 1199584113
full_name: Anurag-2312/NIDS-mini-project
url: https://github.com/Anurag-2312/NIDS-mini-project
commit: a7e65c9712388866c5b7ba3ff1c865a0e967e963
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

# 221 — Anurag-2312/NIDS-mini-project

## Contexto

“Deep Learning Based Intrusion Detection System” (`README.md:1–3`): sistema de detecção de intrusão em rede com CNN 2D e OpenMax. A arquitetura (`README.md:7–17`) tem:
- um frontend React (`frontend/`, porta 5173);
- um “Orchestrator” FastAPI (porta 8080), que é um gateway de API (`README.md:70`);
- quatro serviços de backend: CICFlowMeter em Docker, pré-processador, serviço de modelo e motor de decisão.

Há também notebooks de treino, modelos treinados, gráficos de relatório e PCAPs de exemplo. O acerto da busca vem da proximidade entre “Frontend” e “Orchestrator” no diagrama do README, não de orquestração de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:222` registra rank 221, ID 1199584113, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:222` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:27677` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:27684` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta / consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` / `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:43:23.958Z / 2026-10-08T16:24:39.269Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem Jupyter Notebook, `fork: false`, tamanho 26.315;
- criação em 2026-04-02T13:51:02Z, push em 2026-04-07T09:46:45Z.

A grafia literal “frontend orchestration” não aparece. No diagrama, `README.md:8` diz “Frontend (React, :5173)” e `README.md:11` diz “Orchestrator (FastAPI, :8080)”, separados por linhas de setas (`:9–10`). O acerto depende do processamento textual da busca do GitHub (stemming e pontuação), que não está registrado.

O `README.md` vem de `68df833` (2025-12-23 pela data de autoria) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 176 entradas, 173 arquivos regulares `100644` e 3 executáveis `100755` (`start_all.sh`, `stop_all.sh`, `decision_engine/test_requests.sh`); zero symlinks e zero gitlinks. Um único projeto frontend (`frontend/`, com `index.html`, `package.json`, `vite.config.js` e `src/`), cinco serviços Python, `training_scripts/`, `trained_models/`, `report_charts/` e `sample_pcaps/`. | contrária |
| Configuração (frontend) | `frontend/vite.config.js:5–15`: plugins React e Tailwind e proxy de `/api` para o orquestrador em `localhost:8080`. `frontend/package.json:12–18`: React 19, React Router, JSZip, uuid; nenhuma dependência de composição. | contrária |
| Arquitetura | `README.md:7–17`, `70`: o “Orchestrator” é um gateway de API FastAPI que coordena serviços de backend; o frontend é um só cliente desse gateway. São microsserviços de backend, não unidades frontend. | contrária |
| Busca | `git grep -i` em `*.md` e `frontend/` por `orchestrat`, `micro.?front`, `federation` e `single.?spa`: só menções ao orquestrador de backend (`README.md:11`, `70`, `86`; `frontend/src/hooks/useServiceHealth.jsx:34–37`; `frontend/src/components/testing/FullPipelineTest.jsx:46`) e “container orchestration” (`decision_engine/ARCHITECTURE.md:241`). Os imports do frontend ficam dentro de `frontend/src`. | ausente |

## Autoria e histórico

Clone não raso; 72 commits lineares, nenhum merge, de sete autores: KingsukNandi (17), Suhani Sinha (12), Aranya Dutta (12), Pritha Sutradhar (11), Anurag Kumar (10, noreply), oishik-biswas (9) e Anurag-2312 (1).
- **Raiz:** `68df833` (“Initial project setup with README and gitignore”, autoria 2025-12-23).
- **SHA:** `a7e65c9` (2026-04-07, “Updated package-lock.json for local environment”).

As datas de autoria começam antes da criação do repositório (2026-04-02) e muitas têm horários redondos (`10:00:00`, `14:00:00`), o que indica histórico reconstruído antes da publicação. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`frontend/`); os demais componentes são serviços de backend. |
| Q2 | No | Não há segunda unidade frontend cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades frontend; o orquestrador é um gateway de API (`README.md:70`). |
| Q4 | No | Nenhum mecanismo de composição de frontends (`frontend/vite.config.js:5–15`; busca registrada). |
| Q5 | No | Q1–Q4 são No: sistema de ML com frontend único e microsserviços de backend. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical, como em 178 e 217 e nos casos anteriores da consulta `"frontend orchestration"`: “Frontend” e “Orchestrator” (gateway de backend) próximos no README.
- Microsserviços de backend com um frontend único correspondem a “conventional frontend monoliths” do lado da UI.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other` (projeto acadêmico em equipe).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** diagrama com “Frontend” acima de “Orchestrator” de backend casa a consulta ampla `"frontend orchestration"`.
- **Protocolo (busca):** a grafia buscada não é literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (histórico):** datas de autoria anteriores à criação do repositório, com horários redondos.
