---
schema: 1
id: 1266804567
full_name: olayodeattipoe/Pasmen-POS
url: https://github.com/olayodeattipoe/Pasmen-POS
commit: 8fb7b3a24e5e8b265f7417691ad0629af92dbaf4
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 278 — olayodeattipoe/Pasmen-POS

## Contexto

Sistema de ponto de venda e estoque para restaurante: backend Django + Celery + PostgreSQL + Redis (`backend/`) e três aplicações React/Vite separadas, uma por perfil de usuário:
- `management-frontend` (título “akuzi-ui-recreation”);
- `midnight-vicewave-builder` (“CALABASH POS”);
- `order-runner-pro` (“Kitchen Order Station”).

Cada aplicação é publicada num container nginx próprio, numa porta própria (`docker-compose.yml:67–121`). O README as chama de “Specialized Micro-Frontends” (`README.md:80`). Nenhuma delas é carregada, montada ou roteada por outra; só compartilham a API do backend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:279` registra rank 278, ID 1266804567, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede. Valores de credenciais presentes em arquivos de configuração não são citados.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:279` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31709` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:31717` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:23.431Z / 2026-10-08T16:00:38.564Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:11.673Z / 2026-10-08T16:09:47.363Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Metadados do hit:
- descrição “Production-ready restaurant POS and inventory system used in a live restaurant…”;
- 12 tópicos (entre eles `react`, `django`, `docker`, `pos-system`), linguagem TypeScript, `fork: false`, tamanho 26.305;
- criação em 2026-06-12T01:05:02Z, push em 2026-06-12T20:42:00Z.

A única grafia é “Micro-Frontends”, em `README.md:80` (“**Specialized Micro-Frontends**: Separate React/Vite applications tailored for specific user roles…”). O singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2026-06-12), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 325 entradas, 324 arquivos regulares `100644` e 1 executável `100755` (`backend/manage.py`); zero symlinks e zero gitlinks. Há `backend/` (47 arquivos), `management-frontend/` (53), `midnight-vicewave-builder/` (116), `order-runner-pro/` (99) e `screenshots/` (3), além de `docker-compose.yml`, `ngrok.yml`, `README.md`, `Setup.MD` e `LICENSE` na raiz. Cada frontend tem `package.json`, `vite.config`, `Dockerfile` e `nginx.conf` próprios. | contexto |
| Implantação | `docker-compose.yml:67–121`: `posadminapp` (`management-frontend`, porta 83), `managemnetapp` e `localmanagementapp` (a mesma `midnight-vicewave-builder` com variáveis diferentes, portas 81 e 84) e `serversapp` (`order-runner-pro`, porta 82). Os nginx de cada app só servem a própria SPA (`*/nginx.conf`, `location /`). | contrária |
| Mecanismo | Os `vite.config.*` usam só `@vitejs/plugin-react` ou `plugin-react-swc` (e `lovable-tagger` em dev); nenhum plugin de federação. `git grep` no SHA, sem lockfiles e logs, por `micro.?front`, `federation`, `single-spa`, `iframe`, `remoteEntry` e `import-map`: só `README.md:80`. Não há links entre as apps; os redirecionamentos encontrados são internos (`management-frontend/src/api/features.ts:66` → `/auth`). | ausente |
| Código-fonte (fronteiras) | Não há imports com `../../../` nem por caminho entre pastas de apps. Cada app fala com o backend por `VITE_API_BASE_URL` (por exemplo, `management-frontend/src/lib/utils.ts:12`). | contexto |
| Documentação | `README.md:1`: “Multi-Frontend POS & Inventory System”. `README.md:80`: aplicações separadas por perfil, sem composição descrita. | fraca |

## Autoria e histórico

Clone não raso; 16 commits lineares, nenhum merge, todos em 2026-06-12, de `c346e86` (“initial commit”) ao SHA `8fb7b3a` (“Update README.md”). Seis commits têm autor “Solomon Olayode Mensah - Attipoe”, feitos localmente. Dez têm autor “Mensah - Attipoe Solomon Olayode” e foram feitos na interface do GitHub (README, LICENSE, renomeação). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três aplicações frontend identificáveis (`management-frontend`, `midnight-vicewave-builder`, `order-runner-pro`). |
| Q2 | Yes | Cada uma tem `package.json`, Vite, Dockerfile, nginx e porta próprios, sem imports entre elas. |
| Q3 | No | Nenhum host, shell ou configuração raiz carrega, monta ou roteia as apps; cada uma é servida isoladamente (`docker-compose.yml:67–121`). |
| Q4 | No | Nenhum mecanismo de composição configurado: sem federação, single-spa, import maps, iframe, nem roteamento comum. |
| Q5 | No | Aplicações separadas por perfil que compartilham só o backend. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “multiple frontend applications without explicit composition”: o README chama as apps de “Micro-Frontends”, mas não há host nem mecanismo que as una.
- **Campos:** `frontend_units: 3`, `unit_organization: monorepo` (pastas irmãs sem workspace), `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (sistema descrito como em uso num restaurante real, com Docker e Celery).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “Micro-Frontends” usado para várias SPAs independentes por perfil de usuário, sem composição.
- **Protocolo (busca):** só a grafia plural hifenizada está no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
