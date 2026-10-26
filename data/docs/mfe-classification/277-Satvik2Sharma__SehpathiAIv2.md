---
schema: 1
id: 1193454798
full_name: Satvik2Sharma/SehpathiAIv2
url: https://github.com/Satvik2Sharma/SehpathiAIv2
commit: 91cdccb514329056fbd4e147261d06785667a4b0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 277 — Satvik2Sharma/SehpathiAIv2

## Contexto

Aplicação full-stack de análise educacional: frontend React + Vite (`frontend/`) e backend FastAPI com NLP (`backend/`). Um `package.json` na raiz sobe os dois em paralelo com `concurrently` (`package.json:6–8`). O README diz que “The frontend orchestrates interactive client views while the backend executes NLP similarities…” (`README.md:45`). A palavra descreve o papel do frontend numa arquitetura cliente/servidor, não composição de unidades frontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:278` registra rank 277, ID 1193454798, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede. Os arquivos `frontend/.env` e `frontend/.env.production` estão versionados, mas não foram lidos nem são citados.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:278` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:27318` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:27324` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `broader-frontend-orchestration` (`"frontend orchestration" in:name,description,readme`), subconsulta `…#created:2026-Q1`, com `path` vazio. As coletas são 2026-10-07T23:42:39.094Z (001) e 2026-10-08T16:24:27.627Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2026-01-01..2026-03-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 4.377;
- criação em 2026-03-27T08:40:12Z, push em 2026-05-28T06:22:30Z.

A frase exata “frontend orchestration” não aparece. O acerto vem de `README.md:45`, “The frontend orchestrates interactive client views…”, e depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `cc7e9ab` (2026-05-28), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 62 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `frontend/` (uma aplicação Vite com 25 arquivos em `src/`), `backend/` (FastAPI: `main.py`, `api/`, `ml/`, `services/`, `data/`), `output_screenshots/` (7 PNG) e `package.json`, `package-lock.json` e `README.md` na raiz. | contrária |
| Frontend | `frontend/vite.config.js:1–16`: só `@vitejs/plugin-react` e alias `@`. `frontend/index.html:12`: um único `<script type="module" src="/src/main.jsx">`. `frontend/src/main.jsx:1–10`: monta `App` local. Os componentes ficam todos em `frontend/src/components/`. | contrária |
| Busca de mecanismos | `git grep` no SHA, sem lockfiles, por `orchestrat`, `micro.?front`, `federation`, `single-spa`, `iframe`, `import-map` e `remoteEntry`: só `README.md:45`. | ausente |
| Documentação | `README.md:43–70`: diagrama cliente React → API FastAPI; os “dashboards” e o chat são componentes do mesmo cliente. | contrária |

## Autoria e histórico

Clone não raso; 12 commits lineares, nenhum merge, de 2026-03-28 (`408888d`) a 2026-05-28 (SHA `91cdccb`, “Added real screenshots.”). Dez commits têm autor `Satvik2Sharma`. Dois têm autor “Satvik sharma” e foram criados na interface do GitHub, entre eles `66a8882` (“Deleted my friend's uploaded node_modules directory”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`frontend/`); o backend não é unidade frontend. |
| Q2 | No | Sem duas unidades frontend, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de composição; `main.jsx` monta um `App` local. |
| Q4 | No | Nenhum mecanismo de composição: Vite sem plugin de federação, um único entry (`frontend/index.html:12`). |
| Q5 | No | Q1–Q4 são No: aplicação full-stack convencional. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” num projeto cliente/servidor.
- Mesmo enquadramento dos rascunhos 217 e 221, que também entraram pela consulta ampla `"frontend orchestration"` por uso lexical de “orchestrate”.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (aplicação implantada, segundo os selos de Vercel e Render em `README.md:3–4`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “The frontend orchestrates…” num README de arquitetura cliente/servidor casa a consulta `"frontend orchestration"`.
- **Protocolo (busca):** a frase exata não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
