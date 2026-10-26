---
schema: 1
id: 1272572423
full_name: saulm96/mercury-environment
url: https://github.com/saulm96/mercury-environment
commit: 9d3e809b157d97725375ed36049fa192428bfaa0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 281 — saulm96/mercury-environment

## Contexto

Aplicação de finanças pessoais num monorepo npm workspaces + Turborepo (`package.json:5–13`):
- `apps/web`: uma única SPA React + Vite;
- `apps/api`: backend com Sequelize e MySQL;
- `packages/shared`: só tipos TypeScript.

Também há configurações de agentes de IA em `.opencode/`. A seção “### Frontend Orchestration” do README (`README.md:170–186`) descreve um provider React que sincroniza dados antes de renderizar páginas da mesma SPA. Não trata de composição de unidades frontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:282` registra rank 281, ID 1272572423, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:282` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:32059` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:32067` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `broader-frontend-orchestration` (`"frontend orchestration" in:name,description,readme`), subconsulta `…#created:2026-Q2`, com `path` vazio. As coletas são 2026-10-07T23:44:06.475Z (001) e 2026-10-08T16:24:54.752Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2026-04-01..2026-06-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 604;
- criação em 2026-06-17T18:34:31Z, push em 2026-08-24T14:10:28Z.

A grafia literal está em `README.md:170` (“### Frontend Orchestration”). A última alteração do README até o SHA é `b4315a9` (2026-07-12), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 238 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `apps/web` (116 arquivos), `apps/api` (47), `packages/shared` (9, tipos), `.opencode/` (51, agentes e skills), `docker/` (Dockerfiles de api e web, `nginx.conf`), `design-system/mercury/MASTER.md`, um workflow e, na raiz, `docker-compose*.yml`, `turbo.json` e `README.md`. | contrária |
| Frontend | `apps/web/vite.config.ts:1–28`: só `@vitejs/plugin-react`, alias `@` e proxy de `/api` e `/auth` para o backend. `apps/web/index.html:12`: um único `<script type="module" src="/src/main.tsx">`. `apps/web/package.json:2`, `13`: `@mercury/web`, que depende de `@mercury/shared`. | contrária |
| Documentação | `README.md:170–186`: “Frontend Orchestration” descreve o `RecurringSyncProvider`, um gate de dados dentro de `AuthGuard`/`ToolsLayout` para páginas Dashboard, Transactions e Recurring da mesma aplicação. | contrária |
| Busca de mecanismos | `git grep` no SHA, sem `package-lock.json`, por `orchestrat`, `micro.?front`, `federation`, `single-spa`, `iframe`, `remoteEntry` e `import-map`: só `README.md:170`. Não há imports com `../../../` entre pastas. | ausente |

## Autoria e histórico

Clone não raso; 26 commits em todos os refs, 8 merges. Até o SHA, o histórico tem 20 commits e 7 merges, de 2026-06-17 (`7b04166`, “Initial commit”) a 2026-07-12 (SHA `9d3e809`, “Merge pull request #7 from saulm96/DEV”). Todos os commits são de `saulm96`; os merges de PR foram feitos pela interface do GitHub. Há commits posteriores ao SHA em outros branches (`DEV`, `hotfix/async-handlers` e duas `feature/*`, até 2026-08-24), que não foram considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (`apps/web`); `apps/api` é backend e `packages/shared` contém só tipos. |
| Q2 | No | Sem duas unidades frontend, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de composição. |
| Q4 | No | Nenhum mecanismo de composição: Vite só com o plugin React e um único entry (`apps/web/index.html:12`). |
| Q5 | No | Q1–Q4 são No: SPA convencional com backend num monorepo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”.
- Mesmo enquadramento de 217, 221 e 277, que entraram pela consulta ampla `"frontend orchestration"` por uso não relacionado do termo. Aqui o termo é título de seção sobre sincronização de dados.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: example` (projeto pessoal; nada indica uso em produção, embora haja `docker-compose.prod.yml`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “Frontend Orchestration” como título de seção sobre ordem de efeitos React casa a consulta ampla.
- **Protocolo (busca):** grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
