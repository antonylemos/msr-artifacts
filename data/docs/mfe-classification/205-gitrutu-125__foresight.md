---
schema: 1
id: 1330863363
full_name: gitrutu-125/foresight
url: https://github.com/gitrutu-125/foresight
commit: e76cbf22c2f7655f6b7de0b71eb7767ddb1bee07
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

# 205 — gitrutu-125/foresight

## Contexto

Projeto Python de previsão de demanda e risco de estoque, sem README. O conteúdo próprio é:
- dados CSV em `data/`;
- notebooks de EDA;
- scripts em `src/` (`features.py`, `forecast_baseline.py`, `forecast_model.py`, `pipeline.py`, `risk_scoring.py`, `generate_data.py`);
- uma API FastAPI em `service/main.py`;
- relatórios Markdown e um painel Power BI (`foresight.pbix`).

O repositório versiona também um ambiente virtual inteiro (`venv/`), que inclui o JupyterLab. Os três `package.json` do JupyterLab dentro de `venv/` são a origem do acerto. Não há código frontend próprio. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:206` registra rank 205, ID 1330863363, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:206` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35164` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35170` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:>=10000` / `"@module-federation" filename:package.json size:>=10000` | `venv/share/jupyter/lab/static/package.json` | 2026-10-07T21:51:14.693Z / 2026-10-08T15:44:35.791Z |
| idem | idem | `venv/Lib/site-packages/jupyterlab/staging/package.json` | 2026-10-07T21:51:19.718Z / 2026-10-08T15:44:41.040Z |
| idem | idem | `venv/Lib/site-packages/jupyterlab/static/package.json` | 2026-10-07T21:51:19.718Z / 2026-10-08T15:44:41.040Z |

Os três arquivos têm 14.693 bytes no SHA, dentro da faixa. São o manifesto `@jupyterlab/application-top` (`:2`) com `"@module-federation/runtime-tools": "^2.0.0"` em `devDependencies` (`:211`), parte do pacote JupyterLab instalado no ambiente virtual. Entraram em `ef3c3ae3` (“clean dataset”, 2026-08-12) e não foram alterados depois.

Os metadados do hit de código trazem só a descrição: “FORESIGHT is an AI-powered demand forecasting and inventory intelligence platform… through an interactive Streamlit dashboard.” Não há tópicos, linguagem nem datas, e a descrição não menciona micro-frontends. Não há README no SHA; a entrada é só por código.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 27.724 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São 27.688 sob `venv/` (pacotes Python instalados, incluindo IPython e JupyterLab) e 36 próprias: `data/`, `notebooks/`, `demo files/` (dois notebooks), `.ipynb_checkpoints/`, `src/`, `service/`, `reports/`, `images/`, `foresight.pbix`, `requirements.txt` e `.gitignore`. Os 18 `package.json` estão todos em `venv/`. | contrária |
| Código-fonte | `service/main.py:1–30`: API FastAPI (“FORESIGHT Scoring Service”); `service/requirements.txt`: `fastapi`, `uvicorn`, `pandas`, `pydantic`. Fora de `venv/` não há arquivo `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` ou `.html`. | contrária |
| Tecnologia (acerto) | `venv/share/jupyter/lab/static/package.json:2`, `211`: dependência de desenvolvimento do build do próprio JupyterLab, código de terceiros vendorizado no ambiente virtual. Não é configuração deste projeto. | contrária |
| Busca | `git grep -i` no SHA, excluindo `venv/` e `data/`, por `streamlit`, `micro.?front` e `federation`: só menções a Streamlit como opção de deploy (`reports/deployment_guide.md:4`; `service/main.py:15`) e o `.pyc` correspondente. Nenhum dashboard Streamlit no código. | ausente |

## Autoria e histórico

Clone não raso; 6 commits lineares, nenhum merge, todos de Raksha `<biradarrutuja125@gmail.com>`, de 2026-08-12 (`ef3c3ae3`, “clean dataset”, que adiciona 27.092 arquivos de `venv/`) a 2026-08-17. O SHA `e76cbf22` (“Initial commit: FORESIGHT project”) é o último commit, apesar da mensagem, e só adiciona `.gitignore`, que passa a ignorar `venv/` sem removê-lo do índice. `e879fb61` (“Dashboard Created”) adiciona `foresight.pbix`, `service/` e mais 585 arquivos de `venv/`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend própria; o código é Python (scripts, notebooks, API FastAPI). |
| Q2 | No | Sem unidades, não há entradas ou builds frontend a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | O único sinal é uma dependência declarada no manifesto do JupyterLab vendorizado (`venv/…/package.json:211`). Pelo critério, “a declared dependency alone is No”, e ela nem pertence ao projeto. |
| Q5 | No | Q1–Q4 são No: projeto de ciência de dados com ambiente virtual versionado. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto vem de código de terceiros (JupyterLab) dentro de `venv/` versionado por engano, não de uso do projeto.
- Difere de 102/074/080, em que o código de terceiros era a plataforma hospedeira das unidades. Aqui é só um pacote instalado, sem relação com a aplicação.
- `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []` (não há UI web própria; o painel é um arquivo Power BI). `repo_type: other`: projeto de análise com API, nem exemplo de MFE, nem template, nem biblioteca.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** dependência `@module-federation/runtime-tools` do JupyterLab em `venv/` versionado casa a busca de código por `package.json`. Os três caminhos são cópias do mesmo manifesto.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002). O repositório não tem README, então não há grafia a citar.
