---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Leitura do repositório

Projeto de grupo de disciplina (COMP308) com três aplicações React/Vite unidas por Module Federation (`@originjs/vite-plugin-federation`) e microsserviços GraphQL em `server/`. O `client/shell-app` é o host: declara os remotes `userApp` e `issueApp` (client/shell-app/vite.config.js:39-42) e carrega o `./App` de cada um com `lazy(() => import(...))` (client/shell-app/src/App.jsx:10-11). As três compartilham `react`, `react-dom`, `@apollo/client` e `graphql` (client/shell-app/vite.config.js:44-49).

Não há roteamento entre as unidades: o shell alterna o que mostra pelo estado `isLoggedIn`. Sem login, renderiza a user-app (tela de login e cadastro); com login, renderiza a issue-app e passa o usuário como prop (client/shell-app/src/App.jsx:64, 67). Essa troca é dirigida por eventos em `window`: a user-app dispara `loginSuccess` ao logar e `logout` ao sair (client/user-app/src/UserComponent.jsx:56, 74), a issue-app dispara `logout` pelo cabeçalho (client/issue-app/src/components/Header.jsx:39), e o shell escuta os dois eventos (client/shell-app/src/App.jsx:42-43). O shell nunca envia eventos às unidades; os handlers também refazem a consulta `CurrentUser` ao backend (client/shell-app/src/App.jsx:31-40), de modo que o estado de login depende tanto do evento quanto da sessão no servidor.

Particularidades: `client/shell-app/vite.config.js:1-26` guarda uma versão anterior da configuração, toda comentada, só com `userApp`; a configuração ativa é a de :28-56. As unidades também leem `token` e `user` do `localStorage` (por exemplo client/issue-app/src/components/Header.jsx:26), mas ninguém escuta o evento `storage`, e isso não virou relação. A user-app não fixa porta no `vite.config.js`; a porta 3001 esperada pelo shell vem dos scripts (client/user-app/package.json:7, 10).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | client/shell-app | client/user-app | host → remote | origem → destino | module-federation | Yes | Yes | client/shell-app/vite.config.js:39-40 (remote `userApp` em `http://localhost:3001/assets/remoteEntry.js`); client/user-app/vite.config.js:11-15 (`name: 'userApp'`, `filename: 'remoteEntry.js'`, expõe `./App`); client/user-app/package.json:7, 10 (porta 3001) | client/shell-app/src/App.jsx:10; client/shell-app/src/App.jsx:64 |
| 2 | client/shell-app | client/issue-app | host → remote | origem → destino | module-federation | Yes | Yes | client/shell-app/vite.config.js:39, 41 (remote `issueApp` em `http://localhost:3002/assets/remoteEntry.js`); client/issue-app/vite.config.js:15-19 (`name: 'issueApp'`, `filename: 'remoteEntry.js'`, expõe `./App`); client/issue-app/vite.config.js:8 (porta 3002) | client/shell-app/src/App.jsx:11; client/shell-app/src/App.jsx:67 |
| 3 | client/issue-app | client/shell-app | communication | origem → destino | events | Yes | Yes | — | client/issue-app/src/components/Header.jsx:39 |
| 4 | client/user-app | client/shell-app | communication | origem → destino | events | Yes | Yes | — | client/shell-app/src/App.jsx:42; client/user-app/src/UserComponent.jsx:56; client/user-app/src/UserComponent.jsx:74 |

## Observações

**1. client/shell-app → client/user-app.** O shell importa `userApp/App` (client/shell-app/src/App.jsx:10) e o renderiza dentro de `Suspense` enquanto não há login (client/shell-app/src/App.jsx:61-64). O nome `userApp` e o módulo `./App` correspondem a client/user-app/vite.config.js:11-14; a porta 3001 dos scripts (client/user-app/package.json:7, 10) só corrobora.

**2. client/shell-app → client/issue-app.** Mesmo padrão com `issueApp/App` (client/shell-app/src/App.jsx:11), renderizado depois do login com `currentUser` vindo da query do shell (client/shell-app/src/App.jsx:14-20, 67). O nome e o módulo correspondem a client/issue-app/vite.config.js:15-18; a porta 3002 (client/issue-app/vite.config.js:8) só corrobora.

**3. client/issue-app → client/shell-app.** O `handleLogout` do cabeçalho da issue-app faz a mutação de logout, limpa o `localStorage` e dispara `logout` sem `detail` (client/issue-app/src/components/Header.jsx:32-39). O shell escuta `logout` em client/shell-app/src/App.jsx:43, ponto que a revisão de código-fonte não registrou como linha própria, e volta a mostrar a user-app. O Header entra no App exposto em client/issue-app/src/App.jsx:21, 105. Não há envio no sentido inverso.

**4. client/user-app → client/shell-app.** A user-app dispara `loginSuccess` com `isLoggedIn: true` ao concluir o login (client/user-app/src/UserComponent.jsx:50-56) e `logout` com `isLoggedIn: false` ao concluir a mutação de logout (client/user-app/src/UserComponent.jsx:70-74). O shell escuta `loginSuccess` em client/shell-app/src/App.jsx:42 e `logout` em :43, e remove os dois listeners em :51-52. O handler de `loginSuccess` ignora o `detail` e só marca `isLoggedIn` e refaz a consulta (client/shell-app/src/App.jsx:31-34). Não há envio no sentido inverso.

## Resumo

Relações: 4 (host → remote: 2, communication: 2). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
