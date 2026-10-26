---
schema: 1
id: 1314279064
full_name: dmytromykhailiuk/location-context-resolver
url: https://github.com/dmytromykhailiuk/location-context-resolver
commit: 79f684de41a5b611f6f98cc2ccd5ce9dc30fde16
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 374 — dmytromykhailiuk/location-context-resolver

## Contexto

Biblioteca TypeScript publicada como `@dmytromykhailiuk/location-context-resolver` (`package.json:2–4`, `25–30`). Ela resolve a origem, o pathname relativo ao base path e os query params da aplicação e de sua contraparte remota (`README.md:1–4`, `16–20`). O README a apresenta como útil para “a micro-frontend mounted under `/my-app` on a host shell, mirrored on its own remote origin” (`README.md:10–11`). O repositório contém `src/index.ts`, testes, uma página de documentação (`index.html`) e um playground. Não há aplicação composta. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:375` registra rank 374, ID 1314279064, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:375` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34318` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34324` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:40:01.772Z / 2026-10-08T16:01:15.155Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:10:08.452Z / 2026-10-08T16:10:08.061Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem HTML (a página de documentação), `fork: false`, tamanho 53;
- criação em 2026-07-27T21:07:29Z, push em 2026-08-13T16:28:58Z.

A grafia “micro-frontend” está em `README.md:10`. O plural não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `1bd9de1` (2026-07-28), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 22 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `src/index.ts`, seis testes, `playground/`, `index.html` (documentação) e configs de build (`tsup`, Vite do playground, Vitest, Biome). | contrária |
| Biblioteca | `package.json:2–30`: pacote com `main`/`module`/`types` em `dist/`; `keywords` com `micro-frontend`, `microfrontend` e `module-federation` (`:16–18`). | contrária |
| Documentação | `README.md:10–14`: cenários de uso (micro-frontend sob base path, white-label); a biblioteca não compõe unidades. | contexto |

## Autoria e histórico

Clone não raso; 2 commits lineares de Dmytro Mykhailiuk: `1bd9de1` (2026-07-28, “initial”) e o SHA `79f684d` (2026-08-13, “update homepage url”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; é uma biblioteca utilitária, com página de documentação e playground. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição configurado. |
| Q5 | No | Q1–Q4 são No: biblioteca de apoio. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries”, como os rascunhos 204, 249 e 346.
- **Campos:** `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** biblioteca que cita micro-frontends como cenário de uso casa as consultas terminológicas.
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
