---
schema: 1
id: 1056098649
full_name: p-nox/ventinso
url: https://github.com/p-nox/ventinso
commit: 5e03324efb236701b0342cf1a2c0c56bb980ad99
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

# 287 — p-nox/ventinso

## Contexto

Marketplace de itens usados com backend em microsserviços Spring Boot (gateway, Eureka, Kafka, MySQL/MongoDB) e um único frontend React + Vite (`ReadMe.md:12–13`, `34–37`). A decomposição em serviços é só do backend; o frontend é uma SPA com roteamento interno que consome a API pelo gateway. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:288` registra rank 287, ID 1056098649, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:288` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18753` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:18759` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-09-30` | 2026-10-07T23:40:56.106Z / 2026-10-08T16:23:53.186Z |

Metadados do hit:
- descrição “Multi-service marketplace platform for buying and selling used items (Java Spring Boot + React)”, sem a frase pesquisada;
- sem tópicos, linguagem Java, licença MIT, `fork: false`, tamanho 23136;
- criação em 2025-09-13T11:39:02Z, push em 2026-02-09T21:12:37Z.

A grafia “frontend orchestration” não aparece literalmente no README. A única ocorrência de “orchestrat” no README é `ReadMe.md:13`: “**React + Vite (frontend)**, orchestrated via an **API Gateway**”, em que “frontend” e “orchestrated” são adjacentes separados por pontuação. O acerto depende do processamento textual da busca do GitHub (pontuação e flexão), que não está registrado; a frase descreve o backend orquestrado pelo gateway, não composição de frontend.

A última alteração do README alcançável é o próprio SHA `5e03324` (2026-02-09T23:12:37+02:00, “Update ReadMe.md”), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 531 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Dez módulos Maven em `backend/` (`api-gateway`, `auth-service`, `chat-service`, `discovery-service`, `inventory-preview-service`, `inventory-service`, `notification-service`, `order-service`, `payment-service`, `user-service`, agregados em `backend/pom.xml:13–24`), `docker/` (três compose), `config/` (MySQL, Prometheus) e um único projeto frontend em `frontend/`. Só há um `package.json` no SHA (`frontend/package.json`). | contrária |
| Configuração (frontend) | `frontend/package.json:6–11`: scripts `dev`/`build`/`preview` com Vite; `:29–32`: React 19 e `react-router-dom`. `frontend/vite.config.js:6–23`: só `@vitejs/plugin-react` e aliases para pastas de `./src`; nenhum plugin de federação, `remotes`, `exposes` ou saída SystemJS. | contrária |
| Código-fonte (entrada e roteamento) | `frontend/index.html:10–11`: um `#root` e um script `/src/main.jsx`. `frontend/src/main.jsx:10–22`: um `createRoot` com `BrowserRouter` e provedores de contexto. `frontend/src/App.jsx:3–19`, `69–135`: todas as páginas importadas estaticamente de `@pages`/`@components` e roteadas em um único `<Routes>`. | contrária |
| Código-fonte (fronteiras) | Busca por imports relativos `../../` em `frontend/src`: única ocorrência `frontend/src/components/Layout/index.js:3` (reexporta `Breadcrumbs` de `../../pages/ItemPage/...`), interna ao mesmo projeto; nenhum import sai de `frontend/` (`backend/`, `config/`). Mostra acoplamento interno de uma só aplicação, não fronteira entre unidades. | contexto |
| Configuração (backend) | `frontend/src/config/Config.js:1–37`: todos os endpoints passam por `API_BASE_URL` (`http://localhost:8083`), o gateway. Decomposição em microsserviços somente no backend (`ReadMe.md:43–46`, `109–163`). | contexto |
| Build/deploy | `frontend/dockerfile:1–29`: um build Vite servido por Nginx; `frontend/nginx.conf:9–11`: fallback SPA para `index.html`. `docker/docker-compose.core.yml:13–28`: um único serviço `frontend` (porta 5173→80), dependente de `gateway-service`. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` em todo o SHA, exceto `frontend/package-lock.json`, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `systemjs`, `loadRemote`, `registerApplication` e `postMessage`: nenhuma ocorrência. No lockfile, `federation|single-spa|qiankun|wujie|systemjs`: nenhuma ocorrência. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 9 commits alcançáveis a partir do SHA (9 em todos os refs), nenhum merge, raiz `b862ed0` (2025-09-13, “Initial commit”, 432 arquivos adicionados). Refs: `main`, `origin/main` e `origin/HEAD` no SHA; tag `v1.0.0` em `f081156`, não ancestral considerado. Autoria: um único titular com duas identidades, `Panagiotis <139992839+p-nox@users.noreply.github.com>` (5 commits, 2 via interface web) e `p-nox <noskop@protonmail.com>` (4 commits). Por `git diff-tree --no-renames --name-status`:
- 2025-09-13: commit inicial e dois commits de screenshots/README;
- `17e955e` (2026-01-22, “Fix UI issues, optimize backend, and add chat service feature”), `efc5de9` (2026-01-27, Prometheus/Grafana) e `d2c860c` (2026-02-09, “Update core systems, UI, and refactor components”) alteram `backend/` e `frontend/` em bloco;
- `0761a15` remove `uploads/`; `c170087` adiciona `architecture.png`; o SHA altera só `ReadMe.md`.

Os metadados não separam autoria intelectual por arquivo. O frontend permaneceu um só projeto em toda a sequência (nenhum commit adiciona segundo `package.json`). Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 360 objetos históricos ausentes; `git log --shortstat` falha por blob promisor indisponível, e o histórico foi lido só por `--name-status` sem detecção de renames. Todos os blobs da árvore do SHA estão presentes (`git cat-file -e` em cada entrada de `ls-tree`).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`frontend/`, um `package.json`, um `index.html`, um `main.jsx`); nenhuma configuração de composição referencia outras unidades (`frontend/vite.config.js:6–23`; busca registrada). Os serviços de `backend/` não são unidades frontend. |
| Q2 | No | Não há duas unidades frontend a avaliar; as páginas compartilham entrada e build (`frontend/src/App.jsx:4–13`; `frontend/dockerfile:15`). |
| Q3 | No | O roteamento de `App.jsx:69–135` é interno a uma SPA; não há host que carregue, monte ou roteie unidades distintas. |
| Q4 | No | Nenhum mecanismo de composição frontend configurado (busca registrada); o gateway compõe chamadas de API do backend (`Config.js:1–37`), não UI. |
| Q5 | No | Q1–Q4 convergem: SPA monolítica sobre backend em microsserviços. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma SPA React/Vite com roteamento interno, sobre microsserviços de backend.
- Não é `MFE-unit`: o projeto frontend não exporta contrato de integração para host externo (sem `exposes`, lifecycles ou bundle SystemJS em `vite.config.js:6–23` e `main.jsx:10–22`).
- Diferentemente de 097/103/104, não há cadeia de composição incompleta ou não conectável; diferentemente de 089/100, não há federação usada para code sharing; diferentemente de 102/074/080, não há unidade ou plataforma de terceiros. Também não se assemelha a 076/084/096/106/109 (cadeia completa). A palavra “microservices” no README refere-se ao backend.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]` (`frontend/package.json:29–32`, `47`; `vite.config.js:1–7`). O README cita Tailwind/MUI (`ReadMe.md:35`); só MUI aparece no `package.json` (`:18`), e nenhum dos dois altera a contagem.
- `repo_type: example`: o README apresenta o repositório como projeto de portfólio que “demonstrates” a arquitetura (`ReadMe.md:264–273`, “portfolio-grade project”), apesar de Dockerfiles e compose completos.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** arquitetura de microsserviços no backend com frontend único; a consulta ampla `"frontend orchestration"` casa a adjacência “(frontend)**, orchestrated via an API Gateway” (`ReadMe.md:13`), que descreve orquestração de serviços pelo gateway.
- **Protocolo (busca):** a grafia pesquisada não ocorre literalmente; o hit depende de tokenização/flexão da busca do GitHub. A elegibilidade muda de `unknown` (001, `activity_incomplete`) para `pass` (002).
- **Protocolo (tipo de repositório):** a escolha entre `example` (portfólio declarado) e `production` (deploy em contêineres, tag `v1.0.0`) não altera a classe.
