---
schema: 1
id: 1022728663
full_name: adhi982/Tenantflow-multisupport-platform
url: https://github.com/adhi982/Tenantflow-multisupport-platform
commit: db09ffde9eb4df5233bc341838d1e2f162df9d92
classification: Non-MFE
checklist: { q1: yes, q2: undetermined, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 264 — adhi982/Tenantflow-multisupport-platform

## Contexto

Plataforma SaaS multi-tenant de tickets com backend Express/MongoDB, workflows n8n e um frontend React chamado `frontend-shell` (`README.md:1–3`, `:29–50`; `docker-compose.yml:36–118`). O webpack do shell declara Module Federation com um remote `tickets` em `http://localhost:3002/remoteEntry.js` (`frontend-shell/webpack.config.js:45–49`). Porém:
- não há `frontend-tickets` no snapshot nem em nenhum commit, embora o `package.json` da raiz o cite (`package.json:10`, `:69`);
- o shell nunca importa o remote: a rota `/tickets/*` renderiza uma página local (`frontend-shell/src/components/MainLayout.js:9`, `:129`).

O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:265` registra rank 264, ID 1022728663, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:265` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16593` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:16597` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `technology-module-federation-plugin-js-code#size:1800..1999` | `frontend-shell/webpack.config.js` | 2026-10-07T22:32:50.754Z / 2026-10-08T16:13:00.826Z |

A consulta efetiva é `ModuleFederationPlugin remotes extension:js size:1800..1999`. Os metadados do hit de código registram só descrição nula e `fork: false`.

O arquivo casado tem 1.850 bytes no SHA, dentro da faixa, e contém `ModuleFederationPlugin` (`frontend-shell/webpack.config.js:2`, `:45`) e `remotes` (`:47–49`). Ele foi alterado pela última vez em `c1c621f` (2025-07-19). O acerto não depende do README, que não menciona Module Federation nem micro-frontends: as buscas por `micro`, `federation` e `remote` no README só encontram “microservices” (`README.md:346`). A última alteração do README é o SHA (2025-07-20T01:17:58+05:30), anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 81 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Diretórios `backend/` (Express), `frontend-shell/` (React) e `n8n-workflows/`, mais `docker-compose.yml`, `package.json` da raiz e scripts `.bat`. Não há `frontend-tickets/`, e `git log --all -- frontend-tickets` não retorna commits. | contrária |
| Configuração (host) | `frontend-shell/webpack.config.js:45–64`: `ModuleFederationPlugin({ name: 'shell', remotes: { tickets: 'tickets@http://localhost:3002/remoteEntry.js' }, shared: react/react-dom/react-router-dom singleton })`; `:8`: entry `./src/bootstrap.js`, que faz `import('./index.js')` (`frontend-shell/src/bootstrap.js:1`). | fraca |
| Código-fonte (consumo) | Busca `git grep` por `tickets/`, `from 'tickets`, `import('tickets`, `remoteEntry` e `3002`: nenhum import do módulo federado. `frontend-shell/src/components/MainLayout.js:9`: `import TicketsPage from './TicketsPage'`, local; `:129`: `<Route path="/tickets/*" element={<TicketsPage />} />`. `frontend-shell/src/components/TicketsPage.js:1–5`: componente local que chama a API (`:144`). | contrária |
| Configuração (unidade ausente) | `package.json:7–16`, `:49`, `:66–70`: scripts e workspaces para `frontend-tickets`, ausente da árvore. `docker-compose.yml:79–118`: só `frontend-shell` como serviço frontend; `REACT_APP_TICKETS_URL: http://localhost:3002` (`:91`) não é lido pelo código (busca por `TICKETS_URL` só o encontra no compose). | contrária |
| Código-fonte (fronteiras) | Imports relativos em `frontend-shell/src`: os `../App` dos componentes (por exemplo, `MainLayout.js:4`; `TicketsPage.js:3`) ficam no próprio shell. Não há outra unidade frontend para cruzar. | contexto |
| Build/deploy | `frontend-shell/package.json:32–34`: build e serve com webpack; `frontend-shell/Dockerfile` e serviço próprio no compose (`docker-compose.yml:80–88`). | contexto |
| Documentação | `README.md:29–50`: diagrama com um único “Frontend Shell” que inclui “Ticket UI” e se comunica com o backend; `README.md:131`: tabela de serviços com um só frontend; `README.md:219`: `frontend-shell/ # React main application`. `frontend-shell/src/components/LoginPage.js:108` (“Scalable micro-frontend architecture”) e `backend/src/app.js:107` (comentário “Tickets micro-frontend” na lista CORS) são textos isolados. | fraca |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 11 commits (11 em todos os refs), 1 merge (`ead2286`), todos com o e-mail do titular `adithyant982@gmail.com` (nomes `adhi982` e `Adithya N T`, este com committer `GitHub` nas edições de README) ou com o noreply `133945234+adithyaadhi505@users.noreply.github.com` nos dois primeiros:
- `07a7aa0` (“Initial commit”, 2025-07-19T23:02:56+05:30);
- `c1c621f` (“Update 1.0.1”, 2025-07-19T23:10:39+05:30) adiciona todo o projeto em bloco, inclusive o `webpack.config.js` atual;
- os demais commits, até o SHA (2025-07-20), só editam o README.

`git rev-list --objects $SHA --missing=print` lista 7 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Pelo critério literal, a configuração de composição referencia explicitamente uma unidade externa, `remotes: { tickets }` (`frontend-shell/webpack.config.js:47–49`). Somada a `frontend-shell`, são duas unidades. Mesma leitura do rascunho 150. |
| Q2 | Undetermined | `frontend-shell` tem entry e build próprios (`webpack.config.js:8`; `frontend-shell/package.json:32–34`). A unidade `tickets` não existe no repositório nem no histórico (`frontend-tickets` ausente), e nada mostra que seja implantada separadamente. |
| Q3 | No | O shell não carrega, monta nem roteia `tickets`: a rota `/tickets/*` usa um componente local (`MainLayout.js:9`, `:129`). |
| Q4 | No | A única ligação configurada, `remotes: tickets`, não tem consumidor (busca registrada). Pelo critério, “A declared dependency alone is No”. |
| Q5 | No | Q3 e Q4 são No: uma aplicação React única com federação declarada e não usada. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE-related dependencies that are unused or experimental” e, na prática, a “conventional frontend monoliths”: todas as telas, inclusive tickets, estão no shell.
- Não é `MFE-unit`: o shell não tem `exposes` e não está preparado para ser composto por outro host; é um host que declara um remote não consumido.
- Comparação:
  - **150** (rascunho em `review`): o mesmo padrão de `remotes` declarado e nunca consumido (Q1 Yes literal, Q4 No). Lá a questão era a exceção MFE-unit, porque a unidade tinha `exposes`; aqui não há `exposes`, e a classe Non-MFE não depende dessa decisão.
  - **097/103/104:** aqui não há cadeia incompleta a avaliar, pois o código nunca tenta carregar o remote.
  - **076/084/096/106/109:** não há cadeia completa.
- Se a referência não consumida for desconsiderada na contagem (alternativa registrada em 150), ficam Q1 No, `frontend_units: 1` e `single-unit`, e a classe continua Non-MFE.
- `frontend_units: 2` e `unit_organization: multi-repo` seguem a leitura literal de Q1, como em 150. `ui_technologies: [react]`, `build_tools: [webpack]`, `approaches: []`. `repo_type: example`: projeto de submissão ou avaliação (scripts `prepare-git.bat` e `verify-submission.bat`; seções “R4”, “R5” do README, `README.md:186–194`).
- Não há decisão aberta que altere a classe.

## Notas para análise

- **RQ1 (sinais enganosos):** `ModuleFederationPlugin` com `remotes` num webpack ativo, `package.json` com keyword `module-federation` (`package.json:77`), descrição “Frontend Shell with Module Federation” (`frontend-shell/package.json:4`) e o texto “Scalable micro-frontend architecture” na tela de login (`LoginPage.js:108`) sugerem MFE, mas a unidade remota nunca foi versionada e o shell não a consome.
- **Checklist (caso recorrente):** segundo caso de `remotes` declarado sem consumidor (após 150). A leitura de Q1 (contar ou não a referência não consumida) segue pendente em 150; aqui ela não muda a classe.
- **Protocolo (busca):** entrada só pela busca de código no `webpack.config.js` do shell; a elegibilidade muda de `unknown` (001) para `pass` (002).
