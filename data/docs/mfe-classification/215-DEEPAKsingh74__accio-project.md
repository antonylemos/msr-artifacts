---
schema: 1
id: 1027945631
full_name: DEEPAKsingh74/accio-project
url: https://github.com/DEEPAKsingh74/accio-project
commit: f8d0eeee36f1b8ae94ce1c944c56700e5ab14ddb
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 215 — DEEPAKsingh74/accio-project

## Contexto

“Accio - AI-Powered Micro-Frontend Playground” (`README.md:1–3`): chatbot que gera componentes React (JSX + CSS) com um LLM via OpenRouter, mostra uma pré-visualização e salva as sessões. São duas partes:
- `frontend/`: uma única aplicação Next.js 14 (App Router);
- `backend/`: API Express com MongoDB/Redis.

A pré-visualização monta o JSX gerado num HTML com React via unpkg e Babel standalone, cria um `Blob` e o carrega num `<iframe sandbox>` (`frontend/components/CodePreview.tsx:11–66`, `116–121`). A descrição do repositório diz “This is not related to my work it si a test from accio jobs.” O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:216` registra rank 215, ID 1027945631, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:216` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17015` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17019` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:23:54.666Z / 2026-10-08T15:55:10.597Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:39.933Z / 2026-10-08T16:06:16.274Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição “This is not related to my work it si a test from accio jobs.”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 97;
- criação em 2025-07-28T19:19:16Z, push em 2025-07-28T19:22:15Z.

O acerto vem de `README.md:1`, “# 🚀 Accio - AI-Powered Micro-Frontend Playground”. A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README vem do commit-raiz `8a9267a` (2025-07-29) e não foi alterado depois. É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 34 entradas, 33 arquivos regulares `100644` e 1 executável `100755` (`setup.sh`); zero symlinks e zero gitlinks. `frontend/` tem uma aplicação Next.js (`app/`, `components/`, `lib/stores/`, `next.config.js`, `package.json`); `backend/` tem uma API Express (`src/routes`, `models`, `middleware`, `config`). | contrária |
| Código-fonte (frontend) | `frontend/app/page.tsx:1–45`: uma página que importa estaticamente `ChatInterface`, `CodePreview`, `CodeTabs`, `Header` e `LoginModal`. `frontend/next.config.js:6–13`: só `rewrites` de `/api/:path*` para o backend em `localhost:5000`. | contrária |
| Código-fonte (iframe) | `frontend/components/CodePreview.tsx:11–66`: HTML gerado em runtime a partir do JSX do LLM, carregado por `URL.createObjectURL` no iframe sandbox (`:116–121`). O conteúdo do iframe é saída gerada para pré-visualização, não uma unidade frontend com entrada, build ou deploy próprios. | contrária |
| Busca | `git grep -i` no SHA (exceto lockfiles) por `micro.?front`, `federation`, `single.?spa`, `iframe` e `remoteEntry`: só o rótulo “Micro-Frontend Playground” (`README.md:1`; `frontend/app/layout.tsx:8`; `frontend/components/Header.tsx:32`; `backend/package.json:4`; `setup.sh:3`) e o iframe de pré-visualização. Não há import relativo entre `frontend/` e `backend/`. | ausente |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de Deepak singh `<deepakbisht.developer@gmail.com>`, ambos em 2025-07-29 (horário +05:30): `8a9267a` (“first commit”, só `README.md`) e o SHA `f8d0eee` (“updated project”, os demais 33 arquivos). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`frontend/`); o backend não é unidade frontend, e o iframe exibe código gerado em runtime, não outra unidade. |
| Q2 | No | Não há segunda unidade frontend cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; a página monta componentes locais (`frontend/app/page.tsx:7–11`). |
| Q4 | No | Nenhum mecanismo de composição de unidades. O iframe carrega um `Blob` gerado a partir da resposta do LLM (`CodePreview.tsx:59–65`). |
| Q5 | No | Q1–Q4 são No: aplicação de geração e pré-visualização de componentes rotulada como “Micro-Frontend Playground”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”.
- “Micro-frontend” aqui é rótulo de produto para gerar componentes isolados com IA, sem arquitetura correspondente; em 194 o termo também aparecia só no conteúdo da aplicação, sem composição de frontends. O iframe não traz a decisão aberta sobre composição por iframe, porque não carrega unidade frontend implantada, só HTML gerado localmente.
- É um teste técnico de processo seletivo, conforme a descrição; o enquadramento de exercício é o de 023, mas a classificação decorre de Q1–Q4.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react, next]`, `build_tools: []` (Next sem configuração explícita de bundler, como 180/199), `repo_type: other`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “Micro-Frontend Playground” como nome de produto de um gerador de componentes por IA com pré-visualização em iframe.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
