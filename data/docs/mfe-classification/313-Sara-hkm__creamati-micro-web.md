---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
url: https://github.com/Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [iframe]
ui_technologies: [react]
build_tools: []
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 313 — Sara-hkm/creamati-micro-web

## Contexto

“Golden sample” de micro-frontends com React (Create React App) e composição por iframe (`README.md:1–3`, `16–21`). Há cinco aplicações CRA em `frontend/`:
- um `container`, com cabeçalho, menu lateral e área principal;
- quatro micro-frontends (`user-management-app`, `data-grid-app`, `analytics-app`, `settings-app`), cada um com página de demonstração própria.

O container mostra cada micro-frontend num `<iframe>` conforme a aba ativa. Module Federation aparece só no README, como melhoria futura (`README.md:58`), na descrição e nos `keywords` do `package.json`; não há configuração de federação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:314` registra rank 313, ID 1082058462, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:314` registra as estratégias `terminology;technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:20219` e `data/discovery/mfe-round-002/candidates.csv:20225`, ambos com `unknown`. Na rodada 002, o motivo é `author_indeterminate`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-10` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:26:30.472Z / 2026-10-08T15:56:06.882Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:57:16.375Z / 2026-10-08T16:06:53.306Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:20:46.338Z / 2026-10-08T16:16:09.053Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-10-01..2025-10-31`.

Metadados do hit:
- descrição “A production-ready golden sample demonstrating micro-frontend architecture with React and Webpack Module Federation…”;
- sem tópicos, linguagem nula, `fork: false`, tamanho 26.179;
- criação em 2025-10-23T17:10:52Z e push em 2025-10-14T20:51:36Z: o push é anterior à criação, o que é compatível com histórico importado.

Grafias no README:
- “micro frontend”: “Micro-Frontend” em `README.md:1` e “micro-frontend” em `README.md:3`;
- “micro frontends”: “Micro-Frontends” em `README.md:8` (“**4 Independent Micro-Frontends**”);
- “Module Federation”: `README.md:58` (“Add Webpack Module Federation for true micro-frontend architecture”), além da descrição.

O README é do commit inicial `4f941bb` (2025-09-21), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 9.729 entradas, 9.703 arquivos regulares `100644`, 23 executáveis `100755` e 3 symlinks `120000`; zero gitlinks. Executáveis e symlinks (`node_modules/.bin/conc`, `concurrently`, `tree-kill`) estão todos em `node_modules/` da raiz, que soma 9.593 entradas versionadas. Fora dele há cinco apps CRA em `frontend/` (21 arquivos cada), seis workflows, `.cursor/` (prompts e templates), `.cursorrules` e documentos de plano e status. | contexto |
| Composição (container) | `frontend/container/src/App.tsx:8–18`: menu com `users`, `data`, `analytics` e `settings`. `:239–252`: `<iframe src={…}>` com URL por aba (`https://olivium-dev.github.io/golden-sample-react-micro-web/user-management/`, `/data-grid/`, `/analytics/`, `/settings/`). | moderada |
| Micro-frontends | `frontend/*-app/src/App.tsx:1–36`: páginas de demonstração (“User Management Micro-Frontend… running independently on port 3001”, e equivalentes nas portas 3002–3004). Cada app tem `package.json` (CRA, `react-scripts start/build`) e `.env` só com `PORT`. | moderada |
| Implantação | `.github/workflows/deploy-all.yml:49–78`: o container vai para `gh-pages` em `container/`. `:80–` (matriz): cada micro-frontend vai para `user-management`, `data-grid`, `analytics` e `settings`, os mesmos subcaminhos usados nas URLs dos iframes. Há também um workflow por app. | moderada |
| Ausência de federação | `git grep` em `frontend/`, sem lockfiles e `node_modules`, por `ModuleFederation`, `remoteEntry`, `exposes`, `remotes` e `single-spa`: nada. O único `import()` é o `web-vitals` do CRA. `package.json:4`, `17–24`: descrição e `keywords` citam Module Federation e MUI, mas sem dependência correspondente. | contrária |
| Código-fonte (fronteiras) | Busca por imports com `../` em `frontend/`: nenhum. Cada app só importa arquivos locais. | contexto |

## Autoria e histórico

Clone não raso; 7 commits lineares, nenhum merge, todos de Ouday Khaled, de 2025-09-21 (`4f941bb`, “Initial commit: Micro-frontend architecture with container app and 4 micro-frontends”) a 2025-09-22 (SHA `541f8ed`, “Recreate complete micro-frontend applications”). Os commits intermediários ajustam os workflows de deploy. As URLs dos iframes apontam para o GitHub Pages de outra conta (`olivium-dev`), e a criação do repositório no GitHub é posterior aos commits. Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Cinco aplicações frontend: o container e quatro micro-frontends, referenciados pelas URLs de iframe (`frontend/container/src/App.tsx:239–252`). |
| Q2 | Yes | Cada app tem `package.json`, build CRA, porta e deploy próprios (`deploy-all.yml`), sem imports entre apps. |
| Q3 | Yes | O container carrega cada micro-frontend na área principal conforme o menu (`App.tsx:93`, `218–253`). |
| Q4 | Yes | O container seleciona e carrega cada micro-frontend por `<iframe>` dentro da área principal (`frontend/container/src/App.tsx:239–252`), realizando composição por runtime. |
| Q5 | Yes | Q1–Q4 demonstram aplicações independentes e integradas por um container comum. |

## Motivo

- Classificado como `MFE-implemented`: o container integra quatro aplicações independentes por iframe, com navegação e área de apresentação comuns.
- Diferentemente do final 078, aqui não há núcleo federado que sustente Q4 independentemente dos iframes.
- **Campos:**
  - `approaches: [iframe]`, `ui_technologies: [react]`, `build_tools: []` (CRA não ejetado, como em 087);
  - `frontend_units: 5`, `unit_organization: monorepo`;
  - `repo_type: example` (“golden sample”; os micro-frontends são páginas de demonstração).

## Notas para análise

- **RQ1 (sinais enganosos):** descrição e `keywords` anunciam Webpack Module Federation e MUI, mas a implementação usa iframe e CRA; a federação está só nos planos (`README.md:58`; `implementation-plan*.md`; `.cursor/templates/webpack.config.template.js`).
- **Protocolo (snapshot):** `node_modules` da raiz foi versionado (9.593 entradas) e responde por todos os executáveis e symlinks do inventário.
- **Protocolo (busca):** as três grafias estão no README; o plural e o singular aparecem hifenizados. Elegibilidade `unknown` nas duas rodadas.

## Decisão registrada

Promovido para `MFE-implemented`. O container compõe quatro aplicações React independentes em uma área comum por iframes e navegação compartilhada. A ausência de Module Federation não invalida esse mecanismo de composição.
