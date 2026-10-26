---
schema: 1
id: 1156567216
full_name: astitvaveergarg/Vision-Ops
url: https://github.com/astitvaveergarg/Vision-Ops
commit: 6c895999a9c3170907d2259aa207ae02b5bcbaef
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 320 — astitvaveergarg/Vision-Ops

## Contexto

Plataforma de inferência de ML (“VisionOps”: detecção de objetos com YOLOv8) com foco em DevOps/MLOps (descrição do repositório). O repositório tem:
- uma API FastAPI (`api/`);
- um único frontend estático (`frontend/index.html` + `frontend/app.js`, servido por nginx com proxy para a API);
- Helm charts, Terraform para três nuvens, Kubernetes/ArgoCD e workflows.

O termo da busca resulta da justaposição de “…15MB frontend) |” e “| **Orchestration** |” em linhas consecutivas da tabela de stack do README. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:321` registra rank 320, ID 1156567216, status `cloned`, branch `master` (a padrão) e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:321` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24828` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:24835` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q1` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:42:39.094Z / 2026-10-08T16:24:27.627Z |

Metadados do hit (iguais nas duas rodadas): descrição sobre a plataforma de inferência de ML, sem os termos buscados; tópicos `kubernetes`, `mlops`, `observability`, `scalable`; linguagem HCL; `fork: false`; tamanho 2387; criação em 2026-02-12T19:50:13Z; push em 2026-07-20T18:32:04Z.

**Grafia:** o README do SHA não contém a frase “frontend orchestration”.
- A sequência compatível é o fim de `README.md:63` (“| **Containerization** | Docker multi-stage builds | Optimised images (4.5GB backend, 15MB frontend) |”) seguido de `README.md:64` (“| **Orchestration** | Kubernetes, Helm 3, Helmfile | …”): os tokens “frontend” e “Orchestration” ficam adjacentes depois de pontuação e marcação de tabela.
- `README.md:20` (“split frontend/backend Helm charts and Helmfile orchestration”) contém os dois termos, mas não adjacentes.

Não se afirma qual trecho a API casou, porque ela não informa linha.

A última alteração do README é `513947c` (2026-07-20T23:35:40+05:30), e o SHA (2026-07-21T00:02:03+05:30, isto é, 2026-07-20T18:32:03Z) coincide com o `pushed_at`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 125 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Pastas `api/` (FastAPI), `frontend/` (6 arquivos), `charts/` (api, frontend, infrastructure, monitoring), `terraform/` (gcp, aws, azure), `k8s/`, `environments/`, `docker/`, `docs/` e workflows. Não há `package.json`. | contexto |
| Código-fonte (frontend) | `frontend/index.html:7–8`: Tailwind e Font Awesome por CDN; `:292`: `<script src="app.js">`. `frontend/app.js:2`: `API_BASE_URL`; `:115`, `:181`, `:322`, `:354`: `fetch` para `/models`, `/detect`, `/stats`, `/health`. Uma única página que consome a API. | contrária |
| Build/deploy (frontend) | `frontend/Dockerfile:1–19`: imagem nginx com `index.html` e `app.js`. `frontend/nginx.conf:10–12`, `:15–30`: serve os estáticos e faz proxy de `/api/` para `vision-api:8000`. `charts/frontend/` (Chart, deployment, service, ingress): uma release Helm para o frontend. `frontend/server.py:1–15`: servidor alternativo FastAPI para servir o frontend em desenvolvimento. | contrária |
| Documentação | `README.md:20`, `:49–52`, `:79`: separação frontend/backend em charts distintos e proxy nginx; `README.md:62`: frontend “Nginx Alpine, HTML5, Tailwind CSS, Vanilla JS”; `README.md:64`: “Orchestration: Kubernetes, Helm 3, Helmfile”, orquestração de contêineres. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements` e `iframe`: nenhuma ocorrência. | ausente |
| Código-fonte (fronteiras) | O frontend não tem imports (só `app.js` carregado por `<script>`); não há outra unidade frontend para cruzar. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 30 commits alcançáveis a partir do SHA (32 em todos os refs), 10 merges:
- 20 de `astitvaveergarg <av4764@srmist.edu.in>`;
- 10 de `Astitva Veer Garg <91984568+astitvaveergarg@users.noreply.github.com>`, com committer `GitHub` (merges de PR).

Os registros vão de 2026-02-13 (`f5fda02`, “First Commit V1.0.0”) ao SHA (2026-07-21, merge do PR #9). Os branches `feature/…` e `fix/…` não foram considerados. `git rev-list --objects $SHA --missing=print` lista 105 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`frontend/index.html`, `frontend/app.js`); a outra peça é uma API FastAPI. Nenhuma configuração de composição frontend. |
| Q2 | No | Não há duas unidades frontend a avaliar. |
| Q3 | No | Não há host que carregue unidades; o nginx só serve os estáticos e faz proxy da API (`frontend/nginx.conf:10–30`). |
| Q4 | No | Nenhum mecanismo de composição frontend; “orchestration” é Kubernetes/Helm (`README.md:64`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: um front estático com backend separado.
- A separação frontend/backend em releases Helm não é composição de unidades frontend.
- Nem é caso de menção a micro-frontends: o hit resulta de tokens adjacentes de linhas distintas da tabela de stack, como os falsos positivos lexicais de 279 e 312 (rascunhos).
- `frontend_units: 1`, `single-unit`. `ui_technologies: []`: HTML e JavaScript vanilla com Tailwind por CDN, sem framework de UI. `build_tools: []`: sem bundler. `repo_type: production`: domínio próprio (`README.md:173`), Terraform multicloud e GitOps.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** a consulta `"frontend orchestration"` casa a justaposição “frontend) | | **Orchestration**” em uma tabela Markdown (`README.md:63–64`). É o terceiro caso da série com esse padrão (279, 312). As consultas amplas de frase parecem ignorar pontuação e quebras de linha, o que gera ruído em READMEs de infraestrutura.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
