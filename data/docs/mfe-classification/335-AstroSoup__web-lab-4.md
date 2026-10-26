---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
url: https://github.com/AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 335 — AstroSoup/web-lab-4

## Contexto

Trabalho de laboratório de uma disciplina web (o primeiro serviço é “mostly refactored code from third lab”, commit `d4f78cf`): três microsserviços Java (`backend/authService`, `backend/geometryService`, `backend/authMessageBroker`) e um frontend Vue/Vite dividido em host (`frontend/vite/host/`) e dois remotes (`remote-inputs/`, `remote-results/`) com `@module-federation/vite`, servidos por um nginx que publica tudo sob `https://localhost`. O README só tem o título (`README.md:1`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:336` registra rank 335, ID 1105927418, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:336` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21584` (`technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:21590` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, todos do endpoint `code` e da consulta `technology-module-federation-package-code` (`"@module-federation" filename:package.json`):

| Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `…#size:300..399` | `frontend/vite/remote-inputs/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| `…#size:300..399` | `frontend/vite/remote-results/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| `…#size:400..499` | `frontend/vite/host/package.json` | 2026-10-07T18:19:19.038Z / 2026-10-08T15:34:58.705Z |

Os arquivos casados declaram `"@module-federation/vite": "latest"` (`frontend/vite/host/package.json:17`; `frontend/vite/remote-inputs/package.json:16`; `frontend/vite/remote-results/package.json:16`) e têm 413, 385 e 385 bytes no SHA, dentro das faixas. Os metadados do candidato registram apenas `description: null` e `fork: false`. O acerto não depende do README, que só contém o título; o README vem do commit-raiz `4441231` (2025-11-28) e não é posterior às buscas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 152 entradas, 148 arquivos regulares `100644` e 4 executáveis `100755` (`gradlew` e `config/prometheus/prometheus.yml`); zero symlinks e zero gitlinks. Três projetos frontend com `package.json`, `vite.config.js`, `index.html` e `src/` próprios, três serviços Gradle e `config/` (compose, nginx, Dockerfiles). `config/frontend/Dockerfile` está vazio (0 bytes). | forte |
| Configuração (host) | `frontend/vite/host/vite.config.js:13–38`: `federation` com `name: 'host'`, `remotes` `remote_inputs` → `https://localhost/remote-inputs/remoteEntry.js` e `remote_results` → `https://localhost/remote-results/remoteEntry.js` (`type: "module"`), `exposes` de três stores Pinia e de `PopupWindow`, e `shared` Vue/Pinia singleton. | forte |
| Configuração (remotes) | `frontend/vite/remote-inputs/vite.config.js:6–30`: `base: '/remote-inputs/'`, porta 3001, `name: 'remote_inputs'`, `exposes: { "./InputsContainer" }` e remote `host` → `https://localhost/remoteEntry.js`. `frontend/vite/remote-results/vite.config.js:6–30`: mesmo padrão com `/remote-results/`, porta 3002, `name: 'remote_results'`, `exposes: { "./ResultsContainer" }`. | forte |
| Código-fonte (composição) | `frontend/vite/host/src/pages/MainPage.vue:6–7`, `11`, `23–24`: importa `remote_inputs/InputsContainer` e `remote_results/ResultsContainer` e os renderiza na rota `/app` (`frontend/vite/host/src/main.js:14`). Os remotes consomem os stores expostos pelo host: `remote-inputs/src/InputsContainer.vue:5–6`, `remote-inputs/src/elements/GraphCanvas.vue:2–3`, `remote-results/src/elements/GroupInput.vue:3–4`, `remote-results/src/elements/Table.vue:2` (`host/HistoryStore`, `host/ErrorStore`, `host/PopupWindow`). | forte |
| Build/deploy | `config/nginx/nginx.conf:18–71`: um servidor por unidade (3000 host, 3001 e 3002 remotes) com CORS; `:73–103`: servidor TLS que publica o host em `/` e os remotes em `/remote-inputs/` e `/remote-results/`, coerente com as URLs dos `remotes` e com os `base` dos remotes. `config/nginx/Dockerfile:5–7`: copia os três `dist` separados. `config/docker-compose.yaml:38–52`: um único contêiner nginx. | moderada |
| Código-fonte (fronteiras) | Busca por `../` em `*.js` e `*.vue` do frontend: só imports internos do host (`host/src/common/Header.vue:3–4`, `host/src/pages/MainPage.vue:3–4`, `host/src/pages/StartPage.vue:2–3`) e um asset (`host/src/common/Footer.vue:38`). Nenhum import de código-fonte entre `host`, `remote-inputs` e `remote-results`; a dependência mútua passa só por módulos federados. | forte |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 29 commits alcançáveis (29 em todos os refs), 1 merge, de 2025-11-28 (`4441231`, “Initial commit”) a 2025-12-08 (SHA `2214561`, “cleanup x2.”); o ref remoto `feat/authMessageBrocker` não foi considerado à parte. Autoria: `Semyon <1234snsks@gmail.com>` em todos os commits (27 locais, 2 pela interface web). A configuração federada dos remotes surge em `53e46c0` (2025-12-05, “working frontend build.”) e o deploy em `f5cb3ef` (2025-12-08, “Deploy configs for frontend.”). `git rev-list --objects $SHA --missing=print` identifica 79 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `host`, `remote-inputs` e `remote-results`, referenciados pela configuração de composição (`frontend/vite/host/vite.config.js:22–33`). |
| Q2 | Yes | Entrada, `vite.config.js`, porta e `dist` próprios por unidade (`config/nginx/Dockerfile:5–7`); nenhum import de código-fonte entre elas, só especificadores federados. |
| Q3 | Yes | O host monta os dois remotes na página `/app` (`MainPage.vue:23–24`; `main.js:14`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nomes, chaves expostas e URLs coerentes com o roteamento do nginx (`host/vite.config.js:22–33` × `remote-*/vite.config.js:6`, `14–18`; `nginx.conf:90–103`), e consumido por import federado. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units” (`repo_type: example`, trabalho de laboratório).
- A cadeia é completa e conectável nos dois sentidos, sem divergência de nome, rota ou chave exposta (contraste com 097/103/104); comparável aos casos de cadeia completa (076/084/096/106/109).
- Os remotes expõem painéis de tela (entrada de dados com canvas e tabela de resultados), não utilitários; o compartilhamento dos stores Pinia do host é parte do contrato, não o único uso de federação (contraste com 089/100).
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `@module-federation/vite` com federação bidirecional: o host consome os remotes e também expõe seus stores Pinia e um componente, que os remotes importam como `host/...`; Vue e Pinia compartilhados como singleton.
- **RQ3:** acoplamento de estado pelo store Pinia do host compartilhado entre as três unidades; os `src/main.js` dos remotes estão vazios (0 bytes), de modo que os remotes não executam isolados e dependem do host em runtime.
- **Protocolo:** o repositório versiona uma chave privada em `backend/authService/src/main/resources/META-INF/private_key.pem`, não reproduzida aqui; os metadados do candidato nas rodadas têm só `description` e `fork`.
