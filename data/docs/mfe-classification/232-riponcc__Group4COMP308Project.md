---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
url: https://github.com/riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 232 — riponcc/Group4COMP308Project

## Contexto

“Municipal Issue Management System” (`README.md:1–27`): projeto full-stack de equipe com três microsserviços de backend (auth, gestão de ocorrências e analytics/IA com GraphQL e Socket.io) e três aplicações React/Vite com `@originjs/vite-plugin-federation`:
- `client/shell-app`, host na porta 3000;
- `client/user-app`, login e cadastro na porta 3001;
- `client/issue-app`, gestão de ocorrências e chat de IA na porta 3002.

O shell mostra `UserApp` antes do login e `IssueApp` depois, e a troca é sinalizada por eventos `loginSuccess`/`logout` em `window` (`client/shell-app/src/App.jsx:22–72`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:233` registra rank 232, ID 1104733457, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:233` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21524` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21530` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta / consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-11` / `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T23:21:09.536Z / 2026-10-08T16:16:19.379Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 432;
- criação em 2025-11-26T16:01:44Z, push em 2025-12-10T16:04:25Z.

Grafia “Module Federation” em `README.md:3` (“built with microservices architecture and React Module Federation”), `12`, `25`, `41` e `234`. A última alteração do README é `0df228d` (2025-12-10), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 89 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `client/` tem três projetos Vite independentes, cada um com `package.json`, lockfile, `vite.config.js`, `index.html` e `src/`. `server/` tem três microsserviços Node; há também `architecture-diagram.puml`. | contexto |
| Configuração (host) | `client/shell-app/vite.config.js:36–50`: `federation({ name: 'shellApp', remotes: { userApp: 'http://localhost:3001/assets/remoteEntry.js', issueApp: 'http://localhost:3002/assets/remoteEntry.js' }, shared: react, react-dom, @apollo/client, graphql })`. As linhas `1–26` são uma versão anterior comentada, só com `userApp`. | forte |
| Configuração (remotos) | `client/user-app/vite.config.js:10–17`: `name: 'userApp'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/App' }`. `client/issue-app/vite.config.js:14–26`: `name: 'issueApp'`, `exposes: { './App': './src/App' }`. Os scripts (`client/user-app/package.json:7`, `10`; `client/issue-app/package.json:7`, `10`) usam as portas 3001/3002 do host. | forte |
| Código-fonte (composição) | `client/shell-app/src/App.jsx:10–11`: `lazy(() => import("userApp/App"))` e `lazy(() => import("issueApp/App"))`. `:59–70`: renderiza um ou outro conforme o login, dentro de `Suspense`, e passa `currentUser` ao `IssueApp`. `:42–43`: escuta `loginSuccess` e `logout` em `window`. | forte |
| Código-fonte (fronteiras) | Busca por `../..` em `client`: só `client/issue-app/src/components/ai/AIChatbot.jsx:3` → `../../api/aiClient`, interno ao `issue-app`. Não há imports entre os projetos de `client/`. | contexto |

## Autoria e histórico

Clone não raso; 9 commits, 1 merge (o SHA `59db8c8`, “Merge pull request #1 from riponcc/ahmadsbranch”, 2025-12-10). Nos nove commits de todas as refs há três e-mails de autor (Md Ripon Hossain, com 6 e mais 1 como Ripon, Keta Patel e Ahmad Qaher); isso não demonstra quatro pessoas. O commit `c1ee799`, de Keta Patel, está só em `origin/keta-branch` e fora da ancestralidade do SHA, e não foi usado para atribuir arquivos do snapshot; `origin/ahmadsbranch` está incorporada pelo merge `59db8c8`. A raiz é `934af61` (2025-11-26, auth microservice); depois vêm `9983a55` (user-app), `94eaf5d` (“Added shell app to handle microservices”) e `8c2b4f9` (issue microservice e frontend). Dos branches, `origin/keta-branch` tem 1 commit fora de `main`, e os demais não têm commits além de `main`; nenhum foi considerado. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` encontra 38 objetos históricos ausentes, sem tentativa de buscá-los; os arquivos do snapshot usados estavam disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório, duas referenciadas pela configuração de composição do host (`client/shell-app/vite.config.js:39–42`). |
| Q2 | Yes | Cada aplicação tem `package.json`, lockfile, `vite.config.js`, scripts e porta próprios, sem imports de código-fonte entre elas. |
| Q3 | Yes | O shell monta os remotos conforme o estado de autenticação (`client/shell-app/src/App.jsx:59–70`). |
| Q4 | Yes | Module Federation com `remotes` no host e `exposes` nos remotos, consumido por `import("userApp/App")` e `import("issueApp/App")`. |
| Q5 | Yes | Q1–Q4 são Yes: shell e dois remotos compostos em runtime. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- Os remotos expõem aplicações inteiras (login e gestão de ocorrências), não componentes compartilhados (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (projeto de disciplina: `README.md:259–263` declara o curso COMP308-001 do Centennial College e "course project", base direta melhor do que os e-mails institucionais e as URLs `localhost`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `@originjs/vite-plugin-federation` com troca de remoto por estado de autenticação e eventos em `window`; backend em microsserviços GraphQL ao lado dos micro-frontends.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância arquitetural com MFE-implemented, Q1–Q5 Yes, três unidades, `monorepo`, React/Vite e `module-federation`; sem decisão aberta (`draft`). O shell configura `userApp` (`localhost:3001`) e `issueApp` (`localhost:3002`) em `remoteEntry.js`, os remotos expõem `./App`, e o shell importa e monta os dois (montagem após autenticação, como o final 033; 052 registra lacuna operacional sem negar o mecanismo). Correções adotadas: a contagem e a autoria acima; os objetos ausentes; e o contrato `currentUser`, que o shell passa a `IssueApp` (`client/shell-app/src/App.jsx:67`), mas que o remoto não consome (`client/issue-app/src/App.jsx:97–98` declara `App` sem props; o usuário vem de `getUser`/`localStorage`, `:64–69`): o produtor efetivo é `client/user-app/src/UserComponent.jsx:50–56`, que grava token e usuário e dispara `loginSuccess` (logout em `:70–75`, e `Header.jsx:32–39`), e o shell escuta esses eventos em `App.jsx:42–43`, de modo que `currentUser` não é contrato de dados consumido pelo remoto. Complementar as ressalvas de execução e as referências das células.
