---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
url: https://github.com/dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 190 — dmalancioiu/SOA-project

## Contexto

“Food Delivery Platform - SOA Project” (`README.md:1–15`): plataforma de entrega de comida para demonstrar arquitetura orientada a serviços. Tem seis microsserviços Spring Boot em `backend/`, funções OpenFaaS e mensageria (RabbitMQ, Kafka). No frontend, um `shell-app` React (porta 3000) compõe por Module Federation três micro-frontends React: `restaurant-catalog` (3001), `order-tracking` (3002) e `user-dashboard` (3003) (`README.md:27–31`). Tudo é orquestrado por Docker Compose e Nginx. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:191` registra rank 190, ID 1134094230, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:191` registra as estratégias `terminology;technology;broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23347` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23354` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-01` | 2026-10-07T22:30:19.747Z / 2026-10-08T15:57:32.444Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-01` | 2026-10-07T22:59:43.852Z / 2026-10-08T16:07:48.451Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-01` | 2026-10-07T23:22:37.192Z / 2026-10-08T16:16:54.016Z |
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `…#created:2026-Q1` | 2026-10-07T23:42:06.074Z / 2026-10-08T16:24:17.763Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e a faixa de criação correspondente (`2026-01-01..2026-01-31` ou `2026-01-01..2026-03-31`).

Metadados do hit:
- descrição nula, sem tópicos, linguagem Java, `fork: false`, tamanho 269;
- criação em 2026-01-14T08:37:58Z, push em 2026-01-14T10:55:22Z.

Grafias no README:
- “Micro Frontends” e “Module Federation”: `README.md:9` (“3 Micro Frontends (React with Module Federation)”);
- “Micro frontend”: `README.md:30` (“Micro frontend orchestrator”);
- “Module Federation”: `README.md:117`.

A frase “frontend orchestration” não aparece literalmente; só há “frontend orchestrator” em `README.md:30`. Esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README vem do commit-raiz `497d666` (2026-01-14) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 420 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `backend/` (api-gateway, delivery, notification, order, restaurant e user-service), `frontend/` com quatro projetos (`shell-app`, `restaurant-catalog`, `order-tracking`, `user-dashboard`, cada um com `package.json`, `webpack.config.js`, `Dockerfile`, `nginx.conf` e `src/` com `index.js` → `bootstrap.js`), `infrastructure/` (OpenFaaS, MySQL, Nginx) e `docker-compose.yml`. Há também 154 arquivos `tmpclaude-*-cwd` e `.claude/settings.local.json`, resíduos de ferramenta de assistência. | contexto |
| Configuração (host) | `frontend/shell-app/webpack.config.js:48–62`: `ModuleFederationPlugin({ name: 'shellApp', remotes: { restaurantCatalog: '…@http://localhost:3001/remoteEntry.js', orderTracking: '…:3002/…', userDashboard: '…:3003/…' }, shared: react, react-dom, react-router-dom, @mui/material, @emotion/* singleton })`. Porta 3000 (`:10`). | forte |
| Configuração (remotos) | `frontend/restaurant-catalog/webpack.config.js:44–58`: `exposes: { './RestaurantCatalog' }`, porta 3001. `frontend/order-tracking/webpack.config.js:45–59`: `exposes: { './OrderTracking' }`, porta 3002. `frontend/user-dashboard/webpack.config.js:50–64`: `exposes: { './UserDashboard' }`, porta 3003. As portas coincidem com as `remotes` do shell. | forte |
| Código-fonte (consumo) | `frontend/shell-app/src/App.js:21–23`: `lazy(() => import('restaurantCatalog/RestaurantCatalog'))`, `orderTracking/OrderTracking` e `userDashboard/UserDashboard`. `:71–99`: rotas com `Suspense` que renderizam os três remotos (protegidos por `PrivateRoute`). | forte |
| Código-fonte (fronteiras) | A busca por imports `../../` e `../<projeto>` em `frontend` não retorna nada. Os projetos só se ligam pelos módulos federados. | contexto |
| Build/deploy | `docker-compose.yml:301–351`: serviços `restaurant-catalog`, `order-tracking`, `user-dashboard` e `shell-app`, cada um com `build.context` próprio. Há também um `Dockerfile` e um `nginx.conf` por projeto frontend. | forte |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de `danielmalancioiu <dmalancioiu@gmail.com>` em 2026-01-14: `497d666` (“Initial commit: Food Delivery Platform - Complete SOA Implementation”), `3638c74` (“Add driver dashboard and delivery tracking features”) e o SHA `a00d643` (“Change user and driver IDs from Long to String”). O sistema completo entrou num único commit. Os arquivos `tmpclaude-*-cwd`, `.claude/settings.local.json` e os vários documentos `IMPLEMENTATION_*.md` indicam desenvolvimento com assistente de código; os metadados não separam autoria intelectual. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades frontend no repositório, referenciadas pela configuração de composição do shell (`frontend/shell-app/webpack.config.js:50–54`). |
| Q2 | Yes | Cada unidade tem entrada, build, porta, `Dockerfile` e serviço Compose próprios, sem imports de código-fonte entre elas. |
| Q3 | Yes | O shell monta os três remotos por rota (`frontend/shell-app/src/App.js:71–99`). |
| Q4 | Yes | Module Federation configurado no host e nos remotos e consumido por `import()` federado (`frontend/shell-app/src/App.js:21–23`). |
| Q5 | Yes | Q1–Q4 são Yes: shell React com três micro-frontends em Module Federation e deploy por contêiner. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109. Os remotos expõem aplicações de domínio montadas por rota, não componentes compartilhados (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 4`, `unit_organization: monorepo`. `repo_type: example`: projeto acadêmico de demonstração de SOA (“This system demonstrates…”, `README.md:7`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** micro-frontends React com Module Federation em um sistema full stack de microsserviços (gateway, Kafka, RabbitMQ, OpenFaaS), com um contêiner Nginx por micro-frontend.
- **RQ3:** desenvolvimento com assistente de código evidenciado por artefatos versionados (`tmpclaude-*-cwd`, `.claude/`).
- **Protocolo (busca):** quatro consultas casam (terminológicas, de tecnologia e ampla). O hit `"frontend orchestration"` vem de “frontend orchestrator” e depende do processamento textual. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, `webpack`, React, quatro unidades e `monorepo`; sem decisão aberta (`draft`). A cadeia shell → três remotes está configurada e consumida (`frontend/shell-app/webpack.config.js:48–63`; remotes em `:50–54`; porta 3000 em `:9–15`) e os nomes e exposições coincidem (`restaurantCatalog/./RestaurantCatalog`, `orderTracking/./OrderTracking`, `userDashboard/./UserDashboard`). Completar as citações: as portas dos remotes estão em `:9–15` (3001 e 3002 em `:10`) de `frontend/restaurant-catalog/webpack.config.js` e `frontend/order-tracking/webpack.config.js`, e em `:10–17` (3003 em `:11`) de `frontend/user-dashboard/webpack.config.js`; Q2 deve citar as entradas e os scripts de build dos quatro `package.json`, os entries das quatro configurações e os serviços e contextos de `docker-compose.yml:301–367`; a estrutura é inventário por `git ls-tree`, sem linhas. Comparáveis: 076, 084, 096, 106 e 109 estão em `draft` e servem como paralelo técnico, não como decisões finais; a comparação normativa se ancora em 007 e 029 (finais).
