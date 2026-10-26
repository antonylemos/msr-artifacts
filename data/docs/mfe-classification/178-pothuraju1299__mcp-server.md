---
schema: 1
id: 1202227358
full_name: pothuraju1299/mcp-server
url: https://github.com/pothuraju1299/mcp-server
commit: bb679818db979ae1857c8b4501b7a26924a74d43
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 178 — pothuraju1299/mcp-server

## Contexto

“MCP Server - Weather & Real Estate Chat” (`README.md:1`): um backend Express/TypeScript que atua como servidor MCP, com ferramentas de clima, imóveis e piadas e um LLM local (Ollama), e um frontend de chat em `frontend/` (`README.md:40–75`). O frontend é um **gitlink** sem `.gitmodules`: o commit apontado não está no clone e seu conteúdo não é observável. “Frontend Orchestration” no README significa que o frontend decide quais ferramentas do backend chamar (`README.md:80`, `275`), não composição de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:179` registra rank 178, ID 1202227358, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:179` registra a estratégia `broader` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:27825` e `data/discovery/mfe-round-002/candidates.csv:27831`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:44:06.475Z / 2026-10-08T16:24:54.752Z |

Metadados do hit:
- descrição “Weather & Real Estate Chat with MCP Server”, sem a frase;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 22.974;
- criação em 2026-04-05T19:08:32Z, push em 2026-04-05T19:12:16Z.

O acerto vem de `README.md:80`, “- **Frontend Orchestration**: Frontend controls tool invocation”, única ocorrência da frase. O README vem do commit-raiz `724f589` (2026-04-05) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 11.095 entradas, sendo 11.043 arquivos regulares `100644`, 29 executáveis `100755`, 22 symlinks `120000` (todos em `backend/node_modules/.bin`) e **1 gitlink `160000`**, `frontend` → `f8e9d40d…`. Não há `.gitmodules` no SHA, e o objeto não existe no clone (`git cat-file` falha). Há 10.968 entradas em `backend/node_modules`, e também `backend/dist`, `backend/.env` e `.idea/` versionados. O código próprio está em `backend/src/` (servidor, rotas, serviços, ferramentas MCP). | contexto |
| Documentação (sentido de “orchestration”) | `README.md:40–46`: frontend (porta 3000), backend MCP (3001) e Ollama (11434), no fluxo “User → Frontend → Backend MCP Server → Ollama”. `README.md:76–81`: “Frontend Orchestration: Frontend controls tool invocation”. `README.md:275`: “Frontend is smart orchestrator (calls tools)”. Trata-se de orquestração de chamadas de ferramentas do LLM. | contrária |
| Código-fonte (backend) | `backend/package.json:1–29`: Express, `langchain`, `axios`, build `tsc`. É backend HTTP sem frontend. | contexto |
| Frontend (não observável) | `README.md:204–209` descreve `frontend/src/app` e `components/ChatInterface.tsx`, e `README.md:187` menciona `.next`. O conteúdo é inacessível no snapshot (gitlink órfão). Não há indício de composição: o README descreve uma única interface de chat que chama o backend por HTTP (`README.md:55–57`). | ambígua |
| Busca | `git grep -i` no SHA (exceto `node_modules`) por `federation`, `single-spa` e `micro.?front`: nenhum resultado no código próprio ou no README. | ausente |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de `pothuraju1299 <user@example.com>` (e-mail genérico) em 2026-04-05: `724f589` (“Initial commit: MCP Server with unified README”) e o SHA `bb67981`, que só adiciona `.gitignore` (`git diff-tree`). O `.gitignore` passou a ignorar `node_modules/`, `dist/` e `.env`, mas os arquivos já versionados permaneceram. Nenhum blob histórico foi lido e não houve objeto ausente além do commit do gitlink, que não foi buscado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | No máximo uma unidade frontend (o chat em `frontend/`, inacessível); nenhuma configuração de composição referencia outras. |
| Q2 | No | Não há segunda unidade frontend cuja independência possa ser avaliada; o backend não é unidade frontend. |
| Q3 | No | Não há host compondo unidades frontend. |
| Q4 | No | Nenhum mecanismo de composição; a “orchestration” é de ferramentas do LLM (`README.md:80`, `275`). |
| Q5 | No | Q1–Q4 são No: aplicação de chat com backend MCP captada por expressão homônima. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical: “Frontend Orchestration” no sentido de orquestração de chamadas de ferramentas. É o mesmo falso positivo da consulta `"frontend orchestration"` registrado em rascunhos anteriores (066, 130, 132, 135, 138).
- **Gitlink:** o frontend existe como gitlink órfão, e por isso não se pode inspecionar sua implementação. Mesmo assim, o README descreve uma única interface e não há nenhum indício de MFE; a classe não depende do conteúdo do gitlink.
- `frontend_units: 1` (o chat documentado em `frontend/`), `single-unit`. `ui_technologies: []` e `build_tools: []`, porque o frontend não é observável; o README sugere Next.js (`.next`, `README.md:187`). `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “Frontend Orchestration” para descrever o frontend chamando ferramentas de um servidor MCP. A consulta ampla `"frontend orchestration"` capta aplicações de agentes e LLMs.
- **Protocolo (inventário):** gitlink sem `.gitmodules` e com objeto ausente, mais `node_modules` versionado com symlinks. Há também `.env` versionado; seu conteúdo não foi copiado para cá.
- **Protocolo (busca/elegibilidade):** elegibilidade `unknown` nas duas rodadas, sem que a razão tenha sido examinada aqui.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem decisão aberta (`draft`). A evidência disponível é uma interface de chat que chama um backend MCP, sem segunda unidade frontend nem mecanismo de composição. O gitlink `frontend` não pode ser inspecionado (fonte e `package.json` ficam fora do clone), o que não transforma o único frontend documentado em composição nem referencia outros frontends. O README dá pistas tecnológicas da interface (React Query/Zustand em `README.md:3`, `.next` em `:187` e TSX em `:207`); `ui_technologies: []` e `build_tools: []` ficam como preenchimento conservador, sem converter pistas documentais não verificáveis em dependências ou build confirmados.
