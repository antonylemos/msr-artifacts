---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
url: https://github.com/angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 11
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 294 — angelantilantil-web/micro-frontend

## Contexto

Painel bancário de demonstração (“This project is for demonstration purposes”, `README.md:203`) com um shell `host-app` e dez módulos remotos, cada um em sua pasta com `package.json`, `webpack.config.js` e `src/` próprios, todos com Webpack Module Federation. O host consome sete remotos por rota; três módulos (`accounts-module`, `cards-module`, `loans-module`) estão preparados como remotos, mas o host não os referencia. Há ainda um backend Python (`ai-agent-backend/`) usado pelo módulo de chat e um `openapi-mcp-server.zip` não inspecionado. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:295` registra rank 294, ID 1228275100, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução, acesso à rede nem descompactação do `.zip`.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:295` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29472` (`terminology;technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:29478` (`terminology;technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `code` | `…#size:2000..2249` | `host-app/webpack.config.js` | 2026-10-07T22:34:13.455Z / 2026-10-08T16:14:00.863Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` | `…#created:2026-05` | vazio | 2026-10-07T22:35:41.883Z / 2026-10-08T15:59:28.928Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` | `…#created:2026-05` | vazio | 2026-10-07T23:04:12.402Z / 2026-10-08T16:09:04.849Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` | `…#created:2026-05` | vazio | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

As consultas de repositório acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`; a de código, `size:2000..2249`.

Metadados do hit: descrição nula, sem tópicos, linguagem JavaScript, sem licença, `fork: false`, tamanho 4620, criação em 2026-05-03T20:26:09Z, push em 2026-07-10T07:04:40Z.

Correspondência textual:
- O arquivo do hit de código tem 2198 bytes no SHA, dentro da faixa, e contém `ModuleFederationPlugin` (`host-app/webpack.config.js:2`, `44`) e `remotes` (`:47`).
- “micro frontend”: `README.md:1` (“Micro Frontend Project”); a forma hifenizada ocorre em `README.md:3`, `21` e `132`.
- “module federation”: `README.md:21`, `134` e `156`.
- O plural “micro frontends” não aparece literalmente no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração alcançável do README é `fd2169b` (2026-05-25), e a de `host-app/webpack.config.js` é `a1d2264` (2026-05-25). Ambas antecedem as coletas de 7 e 8 de outubro de 2026; os artefatos do SHA não são posteriores às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 128 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks; nenhum `node_modules` ou `dist`. Onze projetos frontend com `package.json`, `webpack.config.js`, `src/index.html`, `src/index.js` e `src/App.js` próprios: `host-app` e os remotos `business-reports`, `model-portfolio-configuration`, `outgoing-api-logs`, `incoming-api-logs`, `maker-requests`, `vro-uploads`, `ai-agent-module`, `accounts-module`, `cards-module` e `loans-module`. Os seis arquivos de `ai-agent-backend/models/` são ponteiros Git LFS (`.gitattributes:1`). | forte |
| Configuração (host) | `host-app/webpack.config.js:44–68`: `ModuleFederationPlugin` com `name: 'hdfcHostApp'` e sete `remotes`: `businessReports@…:3010`, `modelPortfolio@…:3011`, `outgoingApiLogs@…:3012`, `incomingApiLogs@…:3013`, `makerRequests@…:3014`, `vroUploads@…:3015` e `aiAgent@…:3016`, todos `/remoteEntry.js` (`:47–55`); `shared` react/react-dom singleton e `eager` (`:56–67`). | forte |
| Configuração (remotos) | Cada um dos sete remotos referenciados declara o `name`, a porta e o módulo exposto que o host consome, por exemplo `business-reports/webpack.config.js:15`, `44–49` (`port: 3010`, `name: 'businessReports'`, `exposes: { './BusinessReportsApp': './src/App.js' }`). As configurações equivalentes estão nas mesmas linhas de `model-portfolio-configuration` (3011, `./ModelPortfolioApp`), `outgoing-api-logs` (3012), `incoming-api-logs` (3013), `maker-requests` (3014), `vro-uploads` (3015) e `ai-agent-module` (3016, `./AIAgentApp`). Os `package.json` repetem a porta no script `start`. | forte |
| Código-fonte (composição) | `host-app/src/App.js:30–57`: sete `React.lazy(() => import('<remote>/<Módulo>'))` com os mesmos pares remoto/módulo exposto; `:230–240`: rotas `/business-reports`, `/model-portfolio`, `/outgoing-api`, `/incoming-api`, `/maker-requests`, `/vro-uploads` e `/ai-agent` dentro de `ModuleErrorBoundary` + `Suspense`; `:212–221`: navegação lateral por `Link`. `/http-access-logs` é um placeholder do próprio host (`:235`). | forte |
| Código-fonte (estado compartilhado) | `host-app/src/App.js:5–27`: event bus publicado em `window.EventBus`. Só os três remotos não referenciados o leem (`accounts-module/src/App.js:5`, `38–46`; idem `cards-module` e `loans-module`), chamando `getAccounts`/`getCards`/`getLoans`, que o host não define. | contexto |
| Código-fonte (conteúdo) | `business-reports/src/App.js:4–11`, `maker-requests/src/App.js:4–11` e `model-portfolio-configuration/src/App.js:4–11` só renderizam “… module content will appear here.”; os demais remotos referenciados têm telas próprias (por exemplo, `ai-agent-module/src/App.js:87` chama o backend em `localhost:8000`). | contexto |
| Código-fonte (fronteiras) | Busca por todos os `import`/`require` em `*.js` (exceto configs) e por `../` em JS, CSS, HTML e JSON: cada unidade só importa `react`, `react-dom/client`, `react-router-dom` (host), `./App` e `./styles.css`; não há nenhum `../`. O host só alcança os remotos por especificadores federados (`App.js:30–54`). | forte |
| Build/deploy | Scripts `start`/`build` por unidade (`host-app/package.json:4–6`, `business-reports/package.json`); `start-all-modules.bat:4–12` sobe o host, seis remotos, o backend Python e o módulo de IA em terminais separados. Todas as configs usam `mode: 'development'` e URLs `localhost` (`host-app/webpack.config.js:7`, `48–54`); não há pipeline ou deploy. | moderada |
| Documentação | `README.md:3`, `21–30`: host shell e “independent remote modules” por Module Federation; `DOCUMENTATION.md:7–16` lista também `accounts-module`, `cards-module` e `loans-module`, ausentes da config do host. | moderada |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 12 commits alcançáveis a partir do SHA (13 em todos os refs; `origin/dev` em `6bf6396` não foi considerado), 1 merge. Autoria por metadados: duas identidades, `angelantilantil-web <angelantil.antil@gmail.com>` (6 commits, todos pela interface web, committer GitHub) e o placeholder `Your Name <your-email@example.com>` (6 commits locais), que não identifica o autor; não se atribui a uma pessoa. Por `git diff-tree --no-renames --name-status`:
- a raiz `c7a7aa3` (2026-05-03, “Initial commit: HDFC micro-frontend project with host-app and remote modules”) adiciona de uma vez o host e os dez remotos, o README e o `.bat`;
- `a1d2264` (2026-05-25) adiciona `ai-agent-module` e `ai-agent-backend` e altera host, README e `.bat`;
- os commits de 2026-05-27 configuram LFS para o backend; os de 2026-07-09/10, inclusive o SHA, só adicionam e removem `openapi-mcp-server.zip`.

A estrutura federada já existia no commit-raiz; os metadados não permitem separar autoria intelectual nem identificar origem de terceiros. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 12 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host e dez remotos no repositório; sete remotos são referenciados pela configuração de composição (`host-app/webpack.config.js:47–55`). |
| Q2 | Yes | Cada unidade tem entry (`src/index.js`), `webpack.config.js`, porta e scripts próprios (`business-reports/webpack.config.js:8`, `15`; `host-app/package.json:4–6`), e não há import de código-fonte entre unidades (nenhum `../`; o host usa só especificadores federados). |
| Q3 | Yes | O host roteia e carrega os sete remotos (`host-app/src/App.js:30–57`, `230–240`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nome, porta e chave exposta coincidentes para os sete pares (`host-app/webpack.config.js:47–55` × `<remoto>/webpack.config.js:15`, `44–49`), e consumido por `import()` federado (`App.js:30–54`). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units” (`repo_type: example`, `README.md:203`).
- A cadeia está completa e conectável: diferentemente de 097/103/104, não há divergência de nome, porta ou chave exposta entre host e remotos; é comparável aos casos de cadeia completa (076/084/096/106/109).
- Não é code sharing (089/100): cada remoto expõe a tela inteira do módulo, montada como rota do shell, não um utilitário ou componente genérico.
- `frontend_units: 11` conta o host e os dez remotos próprios; oito participam da composição (host + sete). `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `unit_organization: monorepo`.
- Não há decisão aberta que mude a classe.

## Notas para análise

- **RQ1:** três dos sete remotos conectados são placeholders (“module content will appear here”); a composição está configurada e usada, mas parte do conteúdo é vazio. Três remotos (`accounts-module`, `cards-module`, `loans-module`) estão prontos como remotos (`exposes` de app e de serviço) e documentados (`DOCUMENTATION.md:8–12`), mas não são consumidos pelo host e dependem de métodos do event bus que o host não fornece.
- **RQ2:** Webpack 5 `ModuleFederationPlugin` com `shared` `eager: true` nos dois lados e carregamento por `React.lazy` com fallback por módulo (`host-app/src/App.js:30–76`).
- **RQ3:** comunicação entre módulos por event bus global (`window.EventBus`, `host-app/src/App.js:5–27`), usada só pelos remotos não conectados.
- **Protocolo (busca):** entrada por busca de código e terminologia; o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contagem de unidades:** se o critério for contar só as unidades referenciadas pela composição, o valor seria 8; a classe não muda.
