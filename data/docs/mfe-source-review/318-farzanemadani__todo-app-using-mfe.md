---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 318 — farzanemadani/todo-app-using-mfe

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | host-app/src/App.jsx:2 | host-app | dynamic-loading | Yes | `React.lazy(() => import('todoForm_app/TodoForm'))` carrega o módulo `./TodoForm` exposto por todoForm-app (todoForm-app/webpack.prod.js:51-52), resolvido pelo remote `todoForm_app` em host-app/webpack.prod.js:53 e host-app/webpack.dev.js:49; renderizado em host-app/src/App.jsx:17 e :20. Cadeia ativa: host-app/webpack.prod.js:11 (`./src/bootstrap.js`) → host-app/src/bootstrap.js:1 → host-app/src/index.js:2-10 |
| src-remote-import | host-app/src/App.jsx:3 | host-app | dynamic-loading | Yes | `React.lazy(() => import('todoList_app/todoList'))` carrega o módulo `./todoList` exposto por todoList-app (todoList-app/webpack.prod.js:50-51), resolvido pelo remote `todoList_app` em host-app/webpack.prod.js:54 e host-app/webpack.dev.js:50; renderizado em host-app/src/App.jsx:14. Mesma cadeia ativa da linha anterior |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | host-app/src/App.jsx:12 | host-app | host-relationship | Yes | `Routes` declara onde cada remote entra na UI do host: `/` → `ToDoList` (todoList-app), `/add` e `/edit/:id` → `TodoForm` (todoForm-app) (host-app/src/App.jsx:12-22); roteador `BrowserRouter` em host-app/src/index.js:7-9 |
| manual | host-app/src/App.jsx:14 | host-app | runtime-composition | Yes | Renderiza o componente remoto `ToDoList` dentro de `Suspense` na rota `/` (host-app/src/App.jsx:13-15), resolvido pelo import remoto em host-app/src/App.jsx:3 |
| manual | host-app/src/App.jsx:17 | host-app | runtime-composition | Yes | Renderiza o componente remoto `TodoForm` dentro de `Suspense` na rota `/add` (host-app/src/App.jsx:16-18), resolvido pelo import remoto em host-app/src/App.jsx:2 |
| manual | host-app/src/App.jsx:20 | host-app | runtime-composition | Yes | Renderiza o componente remoto `TodoForm` na rota `/edit/:id` com a prop `type='edit'` (host-app/src/App.jsx:19-21); o remote lê o parâmetro com `useParams` em todoForm-app/src/components/todoForm.jsx:14 |
| manual | todoForm-app/src/components/todoForm.jsx:29 | todoForm-app | communication | Yes | `localStorage.setItem('todos', ...)` grava a lista de tarefas ao adicionar (todoForm-app/src/components/todoForm.jsx:27-29) e ao editar (:33-40); `TodoForm` é o módulo exposto `./TodoForm` (todoForm-app/webpack.prod.js:51-52), montado pelo host nas rotas `/add` e `/edit/:id` (host-app/src/App.jsx:17, :20). A mesma chave é lida por `ToDoList` de todoList-app (todoList-app/src/components/ToDoList.jsx:8; regravada na exclusão, :12), montado na rota `/` (host-app/src/App.jsx:14). Os dois remotes rodam na página do host, na mesma origem, e compartilham o `localStorage`; não há evento `storage`, a lista é relida quando `ToDoList` monta após `navigate('/')` (todoForm-app/src/components/todoForm.jsx:31, :42) |

## Resumo

Construções com composição: 7 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 3, communication: 1).

## Notas

- Os três `bootstrap.js` (host-app/src/bootstrap.js:1, todoForm-app/src/bootstrap.js:1, todoList-app/src/bootstrap.js:1) fazem `import('./index.js')` local; são internos a cada unidade e não viram linha manual.
- A chave `todos` do `localStorage`, gravada por todoForm-app e lida por todoList-app, virou a linha manual communication de todoForm-app/src/components/todoForm.jsx:29. Não há evento `storage` nem outro canal entre os remotes; a navegação entre eles (`navigate('/add')`, `navigate('/edit/...')`, `navigate('/')`) usa o roteador do host.
- As duas renderizações de `TodoForm` (linhas 17 e 20) ficaram em linhas separadas porque são pontos de montagem em rotas diferentes, com props diferentes.
- O `App.jsx` standalone de todoList-app renderiza `<ToDoList/>` (todoList-app/src/App.jsx:7); o de todoForm-app só renderiza `<div>App</div>` (todoForm-app/src/App.jsx:3-7) e não importa nem renderiza `TodoForm`. Os componentes expostos são os de `src/components/`.
