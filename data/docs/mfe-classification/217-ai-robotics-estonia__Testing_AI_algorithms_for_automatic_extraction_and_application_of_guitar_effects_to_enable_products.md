---
schema: 1
id: 990440505
full_name: ai-robotics-estonia/Testing_AI_algorithms_for_automatic_extraction_and_application_of_guitar_effects_to_enable_products
url: https://github.com/ai-robotics-estonia/Testing_AI_algorithms_for_automatic_extraction_and_application_of_guitar_effects_to_enable_products
commit: 9795d0886221f04366d246c4f66f09e0c12ac55d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [gradio]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 217 — ai-robotics-estonia/Testing_AI_algorithms_for_automatic_extraction_and_application_of_guitar_effects_to_enable_products

## Contexto

“Blind Extraction and Modelling of Guitar Effects” (`README.md:1–9`): projeto de demonstração (empresa Noise Machine OÜ, equipe da TalTech, dez/2024–abr/2025) com um pipeline de IA para áudio em três blocos:
- separação de stems com HT Demucs (`block1/`);
- remoção de efeito (`block2/`);
- modelagem de efeito com GCNTF (`block3/`).

Há uma interface Gradio em Python (`app.py`). Modelos, áudios, PDF e imagens são ponteiros Git LFS (`.gitattributes:1–6`). O acerto da busca vem da frase “serves as the frontend, orchestrating calls to backend Python scripts” (`README.md:138`), não de orquestração de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:218` registra rank 217, ID 990440505, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução, download de LFS ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:218` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14370` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14376` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta / consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q2` / `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-04-01..2025-06-30` | 2026-10-07T23:40:41.203Z / 2026-10-08T16:23:48.452Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem Python, `fork: false`, tamanho 49;
- criação em 2025-05-26T05:55:45Z, push em 2025-06-26T08:59:23Z.

A grafia literal “frontend orchestration” não aparece. O trecho mais próximo é `README.md:138`, “The Gradio application (`app.py`) serves as the frontend, orchestrating calls to backend Python scripts…”, e “orchestrates” aparece em `:113`. O acerto depende do processamento textual da busca do GitHub (stemming e pontuação), que não está registrado.

A última alteração do README é o próprio SHA, `9795d08` (2025-06-26), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 41 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Código Python (`app.py`, `block1/`, `block2/`, `block3/gcntf/`, `utils/`), ambientes conda (`env.yaml`, `env_cuda.yaml`) e ponteiros LFS (`Report.pdf`, `diagram.png`, `.wav`, `.pt`, `.th`, `.onnx`). Não há `package.json`, HTML ou JavaScript. | contrária |
| Código-fonte | `app.py:8`, `14–17`, `279`: uma aplicação `gr.Blocks` que importa os wrappers dos três blocos. É uma única interface Python que chama funções locais. | contrária |
| Documentação | `README.md:113`, `121`, `138`: a aplicação Gradio é “the frontend”, que orquestra chamadas a scripts de backend. Trata-se de orquestração de etapas de processamento, não de unidades frontend. | contrária |
| Busca | `git grep -i` no SHA por `micro.?front`, `federation`, `single.?spa` e `orchestrat`: só as linhas do README citadas. | ausente |

## Autoria e histórico

Clone não raso; 4 commits, nenhum merge:
- `60f7dab` (2025-05-26, “Initial commit”): de DmitriDerevjanko, pela interface web, com `LICENSE` e `README.md`;
- `0c8fc00` e `0096f26` (2025-06-26): de Andrei Gužovski `<anguzo@taltech.ee>`, adicionam gitignore/LFS, relatório, README e o código;
- SHA `9795d08` (2025-06-26, “Update README.md”): de katreeljas, pela interface web.

Nenhum blob histórico foi lido, e os objetos LFS não foram baixados.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única interface (Gradio, `app.py:279`); nenhuma outra unidade frontend é referenciada. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; `app.py` chama funções Python locais. |
| Q4 | No | Nenhum mecanismo de composição; “orchestrating” descreve chamadas a scripts (`README.md:138`). |
| Q5 | No | Q1–Q4 são No: pipeline de IA para áudio com UI Gradio, captado pela consulta ampla. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical, como no rascunho 178 e nos casos anteriores da consulta `"frontend orchestration"`: “frontend” orquestrando chamadas a backend ou ferramentas.
- `frontend_units: 1`, `unit_organization: single-unit` (a interface Gradio), `ui_technologies: [gradio]`, `build_tools: []` (sem bundler), `repo_type: other` (projeto de demonstração de P&D).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta ampla `"frontend orchestration"` capta “serves as the frontend, orchestrating calls” num projeto Python sem frontend web próprio.
- **Protocolo (busca):** a grafia buscada não é literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (snapshot):** artefatos binários em LFS ficam como ponteiros no clone.
