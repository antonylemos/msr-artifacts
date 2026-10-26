---
schema: 1
id: 1231899916
full_name: Alexssandren/Chatbot_UFSC
url: https://github.com/Alexssandren/Chatbot_UFSC
commit: 170bb0b9448fb20beda16b7bb02f8f06b11afe1d
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

# 288 — Alexssandren/Chatbot_UFSC

## Contexto

Sistema de recebimento e análise de submissões de atividades complementares (requerimento + certificados em PDF), com painel web para o orientador (`README.md:1–3`). Há um backend Fastify + Prisma (`backend/`) e um único frontend React + Vite (`frontend/`). Micro-frontends aparecem só numa lista de itens fora do escopo: “Itens explicitamente **fora** do escopo atual (evitar sem decisão): OCR, anotação em PDF, react-pdf/pdf.js pesado, microfrontends.” (`README.md:97`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:289` registra rank 288, ID 1231899916, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:289` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29702` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:29708` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-05` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T21:51:29.129Z / 2026-10-08T15:42:48.382Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:58.622Z / 2026-10-08T15:49:57.059Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 575;
- criação em 2026-05-07T11:51:32Z, push em 2026-07-02T12:28:22Z.

A grafia “microfrontends” está em `README.md:97`. O singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `5bd8725` (2026-06-07), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 129 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `backend/` (Fastify, Prisma, testes), `frontend/` (uma aplicação Vite com 33 arquivos em `src/`), `docs/` (3 documentos), `scripts/`, `docker-compose.yml`, scripts `.bat` e um log em `.cursor/`. | contrária |
| Frontend | `frontend/vite.config.ts:1–15`: só `@vitejs/plugin-react` e proxy `/api` para o backend. `frontend/index.html:11`: um único `<script type="module" src="/src/main.tsx">`. | contrária |
| iframe | `frontend/src/components/PdfViewerModal.tsx:199–206`: `<iframe src={url}>` para exibir PDFs enviados (`README.md:60`). É visualização de documento, não composição de unidade frontend. | contexto |
| Busca de mecanismos | `git grep` no SHA, sem lockfiles e logs, por `micro.?front`, `federation`, `single-spa`, `remoteEntry`, `import-map`, `web component` e `customElements`: só `README.md:97`. | ausente |
| Documentação | `README.md:97`: micro-frontends listados como fora do escopo. `docs/INTEGRACAO-CHATBOT.md:1–15`: a integração com o chatbot é por API (`POST /api/submissions`), não por frontend. | contrária |

## Autoria e histórico

Clone não raso; 18 commits lineares, nenhum merge, todos de `Alexssandren`, de 2026-05-07 a 2026-07-02 (SHA `170bb0b`). Só há o branch `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`frontend/`); o backend não é unidade frontend. |
| Q2 | No | Sem duas unidades frontend, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de composição. |
| Q4 | No | Nenhum mecanismo de composição; o único `iframe` exibe PDFs. |
| Q5 | No | Q1–Q4 são No: aplicação full-stack convencional que declara micro-frontends fora do escopo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”: aqui a menção é justamente uma exclusão.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (checklist de deploy, script de VPS e integração com sistema institucional, `docs/DEPLOY-CHECKLIST.md`, `scripts/vps-deploy.sh`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a menção a “microfrontends” como item fora do escopo casa as consultas terminológicas.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
