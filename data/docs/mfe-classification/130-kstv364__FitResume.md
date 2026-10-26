---
schema: 1
id: 1037493163
full_name: kstv364/FitResume
url: https://github.com/kstv364/FitResume
commit: 23da349b7d5ae9512f8411dd4daede11112ca165
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 130 — kstv364/FitResume

## Contexto

Aplicação Python para adaptar currículos com LLM: um backend FastAPI com fluxo de agentes LangGraph (`backend/`) e uma única UI Streamlit (`frontend/app.py`), orquestrados por Docker Compose (`README.md:5`; `docker-compose.yml:3–20`). “Orquestração” se refere aos contêineres frontend/backend, não a unidades frontend compostas. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:131` registra rank 130, ID 1037493163, branch `master`, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:131` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17616` (`broader`, elegibilidade `unknown`) e em `data/discovery/mfe-round-002/candidates.csv:17621` (`broader`, elegibilidade `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-09-30` | 2026-10-07T23:40:56.106Z / 2026-10-08T16:23:53.186Z |

Metadados do hit:
- descrição truncada que termina em “… a Python-based backend (FastAPI) and a Streamlit frontend,”;
- sem tópicos, linguagem Python, `fork: false`;
- criação em 2025-08-13T16:51:15Z, push em 2025-11-08T16:05:50Z, homepage `https://kaustavchanda-fitmyresume.hf.space`.

A frase literal “frontend orchestration” não aparece na descrição, no README nem em outro arquivo do SHA (`git grep -i 'orchestrat'`). A ocorrência mais próxima é `README.md:5` (“… and a Streamlit frontend, orchestrated using Docker Compose.”), com “frontend” seguido de vírgula e “orchestrated”. `README.md:20` diz “orchestrating the frontend and backend services”. O casamento depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração de `README.md` alcançável é o próprio SHA, `23da349` (2025-11-08T21:35:50+05:30), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 14 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São dois diretórios de serviço, `backend/` (FastAPI, agentes e utilitários) e `frontend/` (um `app.py`), além de `docker-compose.yml`, `.env.example`, README e LICENSE. Não há `package.json`, JavaScript, HTML ou configuração de bundler. | contrária |
| Código-fonte (UI) | `frontend/app.py:13–17`: uma página Streamlit com duas abas (`st.tabs`) no mesmo script. `frontend/Dockerfile:18`: `streamlit run app.py`. É a única interface do repositório. | contrária |
| Código-fonte (integração) | `frontend/app.py:10`, `53`, `88–96`: a UI chama o backend por HTTP (`requests.post`) em `/tailor_resume/` e `/generate_outreach/`, definidos em `backend/main.py:60` e `135`. É uma integração frontend → API, não composição de UI. | contexto |
| Código-fonte (fronteiras) | Busca por todos os `import`/`from` em `*.py`: `frontend/app.py:1–5` só importa bibliotecas externas. `backend/main.py:10–11` importa `backend.utils` e `backend.agents`, do próprio backend. Não há import relativo nem cruzamento entre `frontend/` e `backend/`. | contexto |
| Configuração / Build/deploy | `docker-compose.yml:3–20`: serviços `backend` (porta 9000→8000) e `frontend` (8501), cada um construído do seu diretório (`backend/Dockerfile:21`; `frontend/Dockerfile:18`). A orquestração é de um backend e uma UI. `README.md:1` aponta uma implantação no Hugging Face Spaces. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` em todo o SHA por `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `iframe`, `components.html`, `st.components`, `remoteEntry`, `import.?map` e `customElements`. Só há os acertos de texto em `README.md:5` e `README.md:20`. Nenhum mecanismo de composição de UI. | ausente |
| Tecnologia | `frontend/requirements.txt:1–3`: `streamlit`, `requests` e `python-dotenv`, sem versões fixadas. `backend/requirements.txt:1–12`: FastAPI, LangChain/LangGraph, Gemini, PyGithub. | contexto |
| Documentação | `frontend/README.md:20–24` descreve a dependência da API via `BACKEND_URL`. `frontend/README.md:51` manda rodar `streamlit run frontend/app.py`. Não há documentação de arquitetura frontend além disso. | contexto |

## Autoria e histórico

Clone não raso; 27 commits, 1 merge, uma raiz `a0b2501` (“initial commit”, 2025-08-13T16:33:43+05:30), que já adiciona `frontend/app.py`. Todos os commits são de Kaustav Chanda: 25 com `kstvkmrchanda2@gmail.com` e 2 com o e-mail noreply do GitHub. `git log --no-renames --name-status` por caminho:
- `frontend`: 9 commits; `frontend/Dockerfile` adicionado em `9688fd3` (2025-08-13) e `frontend/README.md` em `eb0a3aa` (2025-09-13).
- `backend`: ajustes de prompt e de integração com GitHub, de 2025-08-13 a 2025-09-14.
- `docker-compose.yml`: adicionado em `9688fd3`.
- `README.md`: adicionado em `95a6d60` (2025-08-16), alterado em `aeec720` e no SHA.

Os metadados registram um único autor e não indicam código de terceiros. Refs `origin/cover-letter` (`d64e99a`) e `origin/fetch-github-profile` (`067b463`) existem no clone; seu conteúdo não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Só há uma unidade frontend, o script Streamlit `frontend/app.py` (`frontend/app.py:13–17`). O backend FastAPI não é unidade frontend, e não existe configuração de composição que referencie unidades externas (busca registrada). |
| Q2 | No | Sem duas unidades frontend, não há entradas ou builds frontend independentes a comparar; o serviço separado é a API (`docker-compose.yml:4–11`). |
| Q3 | No | Nenhum host ou shell carrega unidades; a UI apenas chama endpoints HTTP (`frontend/app.py:53`, `88–96`). |
| Q4 | No | O Docker Compose orquestra contêineres frontend/backend (`docker-compose.yml:3–20`), não unidades de UI. Nenhum mecanismo de composição foi encontrado. |
| Q5 | No | Q1–Q4 são No: aplicação full-stack convencional com uma UI Streamlit. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma UI e uma API, sem unidades frontend compostas. `MFE-unit` não se aplica.
- Mesmo perfil de 066: UI Streamlit única, com “orchestration” se referindo a backend/serviços, registrada como `ui_technologies: [streamlit]`, `frontend_units: 1` e `single-unit`. `build_tools: []` porque o Streamlit não usa bundler configurado no repositório.
- `repo_type: production`: o README aponta uma aplicação implantada (`README.md:1`) e a licença é proprietária (`README.md:77`). A implantação não foi verificada. Diferentemente de 066 (`example`), aqui o repositório se apresenta como produto em uso, não como demonstração.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta ampla `"frontend orchestration"` casou um repositório em que “frontend, orchestrated” descreve Docker Compose (`README.md:5`), sem a frase literal. Repete o padrão de 066, em que “orchestration” descrevia serviços backend.
- **Protocolo (busca/elegibilidade):** o hit depende do processamento textual do GitHub, que não está registrado. A elegibilidade muda de `unknown` na rodada 001 para `pass` na 002.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `streamlit`, uma unidade e `production`; sem decisão aberta. Ajustes, sem efeito na classe: (1) defeito de configuração verificável: `.env.example:5` define `BACKEND_URL=http://backend:9000/tailor_resume/`, mas dentro da rede Compose o backend escuta em 8000 (`backend/Dockerfile:21`) e 9000 é a porta publicada para o host (`docker-compose.yml:7`, `9000:8000`); `README.md:43` mostra corretamente `backend:8000`; o default `localhost:9000` de `frontend/app.py` serve à UI executada fora dos containers; o deploy não é descrito como validado; (2) o backend importa apenas bibliotecas externas e padrão, além de módulos locais do próprio backend, e a UI usa `requests` sem importar fontes do backend; (3) a origem do acerto é o README por eliminação de nome e descrição, sem casamento lexical exato atribuído ao GitHub; (4) `production` se apoia na apresentação, no uso e no link de deploy declarado, não na licença proprietária.
