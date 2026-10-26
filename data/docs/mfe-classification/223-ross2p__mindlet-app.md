---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
url: https://github.com/ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 5
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 223 — ross2p/mindlet-app

## Contexto

“Mindlet — superproject” (`README.md:1–11`): repositório agregador de cinco micro-frontends Next.js 16 (“`basePath` per zone”: dashboard, auth, profile, study, decks) e de duas bibliotecas (`@ross2p/shared`, `@ross2p/types`). Todos são submódulos Git (`.gitmodules:1–21`). O superprojeto contém só a orquestração local:
- `compose.yml`, com um serviço Docker por zona e um nginx como gateway;
- configurações de nginx (`infra/nginx/`) que roteiam os prefixos `/dashboard/`, `/auth/`, `/profile/`, `/study/` e `/decks/` para cada zona.

Os fontes das zonas não estão no snapshot, porque os submódulos são gitlinks. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:224` registra rank 223, ID 1091389540, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Os submódulos não foram inicializados. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:224` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:20784` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:20790` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-11` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:28:09.204Z / 2026-10-08T15:56:45.972Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:58:13.574Z / 2026-10-08T16:07:13.967Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem Python (pelos scripts em `.agents/`), `fork: false`, tamanho 549;
- criação em 2025-11-07T00:28:37Z, push em 2026-09-22T11:45:46Z.

O acerto vem de `README.md:3`, “Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** (Next.js 16, `basePath` per zone)…”. A busca de frase trata o hífen como separador. O singular “micro frontend” não aparece literalmente no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `91bfed2` (2026-08-29), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 62 entradas, sendo 54 arquivos regulares `100644`, 1 executável `100755` (`.agents/skills/ui-ux-pro-max/scripts/core.py`) e 7 gitlinks `160000` (`apps/auth`, `apps/dashboard`, `apps/decks`, `apps/profile`, `apps/study`, `libs/shared`, `libs/types`); zero symlinks. 38 entradas são skills de agentes de IA em `.agents/`. As outras são `README.md`, `compose.yml`, `start-local-dev.sh`, `.gitmodules`, `config/nginx/` e `infra/nginx/`. | contexto |
| Unidades (submódulos) | `.gitmodules:4–18`: cada zona aponta para um repositório próprio (`mindlet-dashboard`, `mindlet-app-auth`, `mindlet-profile`, `mindlet-study`, `mindlet-decks`). Os fontes não estão no snapshot; framework e `basePath` só são documentados (`README.md:3`; `compose.yml:1`). | ambígua |
| Configuração (composição por rota) | `infra/nginx/nginx.conf:14–18`: upstreams `dashboard:3000`, `auth:3000`, `profile:3000`, `study:3000`, `decks:3000`. `:29–66`: `location /dashboard/ { proxy_pass http://mindlet_dashboard/; }` e análogos, com `/` redirecionando para `/dashboard/`. `infra/nginx/nginx.conf.local:16–68` faz o mesmo para `localhost:3001–3005`. `infra/nginx/routing-map.frontend.conf:1–9` mapeia os prefixos para os serviços. | forte |
| Build/deploy | `compose.yml:14–127`: cada zona com `build.context: apps/<zona>`, `Dockerfile`, `env_file` e porta próprios; o serviço `nginx` monta as configurações e depende das cinco zonas. `README.md:34–35`: gateway em `localhost:8080`, zonas em `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`. | forte |
| Compartilhamento | `README.md:53–74`: `@ross2p/shared` publicado no GitHub Packages; em desenvolvimento local, as apps usam `"@ross2p/shared": "file:../../libs/shared"` (`:74`). É dependência de pacote entre as zonas, não verificável no snapshot. | contexto |
| Busca | `git grep` no SHA interrompeu ao exigir um objeto ausente do clone parcial (`0dfbd9f`, não buscado); a busca foi refeita arquivo a arquivo em `README.md`, `compose.yml`, `start-local-dev.sh`, `config/nginx/*` e `infra/nginx/*`, com `ModuleFederation`, `registerApplication`, `importmap` e `rewrites`, sem ocorrências. Fora dos submódulos não há código de aplicação; não há `ModuleFederationPlugin`, `registerApplication`, import map ou `rewrites` do Next no superprojeto. A composição observável é a do proxy reverso. | contexto |

## Autoria e histórico

Clone não raso; 45 commits, 5 merges, todos de Rostyslav Pasternak: 41 como `ross2p` e 4 como `Rostyslav` (noreply, merges de PR).
- **Raiz:** `9a1af72` (2026-01-29, “feat: initialize main app with Next.js…”), quando o repositório ainda era uma aplicação única.
- **Virada:** `404dce1` (2026-05-03, “feat: micro-frontends — submodules, nginx compose, @ross2p/shared”) converte o repositório em superprojeto.
- **SHA:** `868bf9c` (2026-09-22, “chore: update submodules to latest main hashes”).

Os branches `origin/feature/auth` e `origin/feature/auth-review-fixes` não foram considerados. Nenhum blob histórico foi lido. Todos os blobs regulares do SHA estão presentes no clone; o objeto `0dfbd9f` pedido pelo `git grep` não pertence à árvore regular do SHA e não foi buscado. Os commits dos gitlinks também não foram buscados.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Cinco unidades frontend referenciadas explicitamente pela configuração de composição (`infra/nginx/nginx.conf:14–18`; `compose.yml:15–108`). |
| Q2 | Yes | Cada zona é repositório próprio (`.gitmodules`), com `Dockerfile`, build, porta e serviço próprios (`compose.yml`); unidades externas implantadas separadamente. O único vínculo declarado é o pacote `@ross2p/shared`. |
| Q3 | Yes | O gateway nginx roteia os prefixos de uma mesma entrada (`localhost:8080`) para as zonas e redireciona `/` para `/dashboard/` (`infra/nginx/nginx.conf:29–66`). |
| Q4 | Yes | O nginx compõe as zonas por prefixos sob uma entrada única, e o `compose.yml` declara os serviços e builds correspondentes. As configurações internas de `basePath` estão nos submódulos, mas o mecanismo de roteamento observável é completo e coerente. |
| Q5 | Yes | Q1–Q4 demonstram zonas independentes compostas por gateway comum. |

## Motivo

- Classificado como `MFE-implemented`: o gateway nginx integra cinco zonas independentes por prefixos, com serviços e builds declarados no compose.
- **Mecanismo:** é composição por zonas, implementada por nginx em vez de `rewrites` do Next. Mantém-se `approaches: [multi-zones]`, como declarado no README (“`basePath` per zone”).
- **Unidades:** as cinco zonas são externas ao snapshot (gitlinks), como no caso de host que referencia unidades externas (087). Não é o caso de 097/103/104, em que faltava cadeia executável: aqui o gateway e o compose estão completos e consistentes entre si (nomes de serviço, portas e prefixos).
- **Campos:** `frontend_units: 5`, `unit_organization: multi-repo` (submódulos), `ui_technologies: [react, next]` (pelo README e pelo compose; os fontes não foram observados), `build_tools: []`, `repo_type: example` (projeto pessoal com stack local).

## Notas para análise

- **RQ2:** superprojeto com submódulos por zona e gateway nginx por prefixo, com biblioteca compartilhada publicada em registro privado e referenciada por `file:` no desenvolvimento local.
- **RQ1 (sinais enganosos):** a linguagem do repositório é “Python” por causa de skills de agentes versionadas em `.agents/`.
- **Protocolo (snapshot):** as unidades estão em gitlinks; sem inicializar os submódulos, `basePath` e a navegação entre zonas não são verificáveis.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Promovido para `MFE-implemented`. O superprojeto compõe cinco zonas Next.js por gateway nginx, com rotas por prefixo, serviços e builds independentes definidos em `compose.yml`. Os fontes internos das zonas estão em submódulos, mas a orquestração observável é suficiente para confirmar a composição.
