---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | client/shell-app/src/App.jsx:10 | client/shell-app | dynamic-loading | Yes | `lazy(() => import("userApp/App"))` carrega em runtime o módulo `./App` do remote `userApp`, declarado em client/shell-app/vite.config.js:40 (`http://localhost:3001/assets/remoteEntry.js`); o alvo é a unidade client/user-app (`name: 'userApp'`, `'./App': './src/App'` em client/user-app/vite.config.js:11-14). Componente renderizado em client/shell-app/src/App.jsx:64; cadeia ativa client/shell-app/index.html:11 → client/shell-app/src/main.jsx:4,30 → App. |
| src-remote-import | client/shell-app/src/App.jsx:11 | client/shell-app | dynamic-loading | Yes | `lazy(() => import("issueApp/App"))` carrega o módulo `./App` do remote `issueApp`, declarado em client/shell-app/vite.config.js:41 (`http://localhost:3002/assets/remoteEntry.js`); o alvo é a unidade client/issue-app (`name: 'issueApp'`, `'./App': './src/App'` em client/issue-app/vite.config.js:15-18). Componente renderizado em client/shell-app/src/App.jsx:67; mesma cadeia ativa da linha 10. |
| src-cross-unit-communication | client/issue-app/src/components/Header.jsx:39 | client/issue-app | communication | Yes | `window.dispatchEvent(new CustomEvent("logout"))` no `handleLogout` do cabeçalho (client/issue-app/src/components/Header.jsx:32-39), depois da mutação de logout; o shell escuta `logout` em client/shell-app/src/App.jsx:43 e volta a exibir a client/user-app. Header é montado pelo App exposto em client/issue-app/src/App.jsx:21,105. |
| src-cross-unit-communication | client/shell-app/src/App.jsx:42 | client/shell-app | communication | Yes | `window.addEventListener("loginSuccess", handleLoginSuccess)` faz o shell ouvir o evento disparado pela client/user-app em client/user-app/src/UserComponent.jsx:56; o handler marca `isLoggedIn` e troca UserApp por IssueApp (client/shell-app/src/App.jsx:31-34, :64-67). O mesmo efeito escuta `logout` em :43 e remove os dois listeners em :51-52. |
| src-cross-unit-communication | client/user-app/src/UserComponent.jsx:56 | client/user-app | communication | Yes | `window.dispatchEvent(new CustomEvent("loginSuccess", { detail: { isLoggedIn: true } }))` no `onCompleted` do login (client/user-app/src/UserComponent.jsx:50-58), depois de gravar `token` e `user` no localStorage; o alvo é a client/shell-app, que escuta em client/shell-app/src/App.jsx:42. UserComponent é montado pelo App exposto em client/user-app/src/App.jsx:2,31. |
| src-cross-unit-communication | client/user-app/src/UserComponent.jsx:74 | client/user-app | communication | Yes | `window.dispatchEvent(new CustomEvent("logout", { detail: { isLoggedIn: false } }))` no `onCompleted` da mutação de logout (client/user-app/src/UserComponent.jsx:70-76), acionada pelo botão em :180; o alvo é a client/shell-app, que escuta `logout` em client/shell-app/src/App.jsx:43. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | client/shell-app/src/App.jsx:64 | client/shell-app | runtime-composition | Yes | Renderiza `<UserApp />`, componente da unidade client/user-app, dentro de `Suspense` (client/shell-app/src/App.jsx:61-69) enquanto não há login; o componente vem do import remoto em client/shell-app/src/App.jsx:10. |
| manual | client/shell-app/src/App.jsx:67 | client/shell-app | runtime-composition | Yes | Renderiza `<IssueApp currentUser={data?.currentUser} />`, componente da unidade client/issue-app, depois do login (client/shell-app/src/App.jsx:66-67), passando o usuário obtido pela query `CurrentUser` (:14-27); o componente vem do import remoto em client/shell-app/src/App.jsx:11. |

## Resumo

Construções com composição: 8 (dynamic-loading: 2, communication: 4, runtime-composition: 2).

## Notas

- A comunicação entre unidades usa dois eventos em `window`: `loginSuccess` (client/user-app → client/shell-app) e `logout` (client/user-app e client/issue-app → client/shell-app). A escuta de `logout` em client/shell-app/src/App.jsx:43 é ponto de uso do mesmo mecanismo e não virou linha manual.
- O `localStorage` (`token`, `user`) também é lido por mais de uma unidade (client/user-app/src/UserComponent.jsx:54-55, :101; client/issue-app/src/App.jsx:49, :66; client/issue-app/src/components/Header.jsx:26), mas nenhuma unidade escuta o evento `storage`; não foi registrado como mecanismo de comunicação.
- O `currentUser` passado a IssueApp em client/shell-app/src/App.jsx:67 é prop e ficou na Observação da linha de montagem.
