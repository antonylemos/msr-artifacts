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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | host-app/src/App.jsx:2 | host-app | dynamic-loading | Yes | `React.lazy(() => import('todoForm_app/TodoForm'))` loads module `./TodoForm` exposed by todoForm-app (todoForm-app/webpack.prod.js:51-52), resolved by remote `todoForm_app` at host-app/webpack.prod.js:53 and host-app/webpack.dev.js:49; rendered at host-app/src/App.jsx:17 and :20. Active chain: host-app/webpack.prod.js:11 (`./src/bootstrap.js`) → host-app/src/bootstrap.js:1 → host-app/src/index.js:2-10 |
| src-remote-import | host-app/src/App.jsx:3 | host-app | dynamic-loading | Yes | `React.lazy(() => import('todoList_app/todoList'))` loads module `./todoList` exposed by todoList-app (todoList-app/webpack.prod.js:50-51), resolved by remote `todoList_app` at host-app/webpack.prod.js:54 and host-app/webpack.dev.js:50; rendered at host-app/src/App.jsx:14. Same active chain as the preceding row |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | host-app/src/App.jsx:12 | host-app | host-relationship | Yes | `Routes` declares where each remote enters the host UI: `/` → `ToDoList` (todoList-app), `/add` and `/edit/:id` → `TodoForm` (todoForm-app) (host-app/src/App.jsx:12-22); router `BrowserRouter` at host-app/src/index.js:7-9 |
| manual | host-app/src/App.jsx:14 | host-app | runtime-composition | Yes | Renders remote component `ToDoList` inside `Suspense` in route `/` (host-app/src/App.jsx:13-15), resolved through the remote import at host-app/src/App.jsx:3 |
| manual | host-app/src/App.jsx:17 | host-app | runtime-composition | Yes | Renders remote component `TodoForm` inside `Suspense` in route `/add` (host-app/src/App.jsx:16-18), resolved through the remote import at host-app/src/App.jsx:2 |
| manual | host-app/src/App.jsx:20 | host-app | runtime-composition | Yes | Renders remote component `TodoForm` in route `/edit/:id` with prop `type='edit'` (host-app/src/App.jsx:19-21); the remote reads the parameter with `useParams` at todoForm-app/src/components/todoForm.jsx:14 |
| manual | todoForm-app/src/components/todoForm.jsx:29 | todoForm-app | communication | Yes | `localStorage.setItem('todos', ...)` writes the task list when adding (todoForm-app/src/components/todoForm.jsx:27-29) and editing (:33-40); `TodoForm` is exposed module `./TodoForm` (todoForm-app/webpack.prod.js:51-52), mounted by the host at routes `/add` and `/edit/:id` (host-app/src/App.jsx:17, :20). The same key is read by `ToDoList` from todoList-app (todoList-app/src/components/ToDoList.jsx:8; rewritten on deletion, :12), mounted in route `/` (host-app/src/App.jsx:14). Both remotes run in the host page, at the same origin, and share `localStorage`; there is no `storage` event, and the list is reread when `ToDoList` mounts after `navigate('/')` (todoForm-app/src/components/todoForm.jsx:31, :42) |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 3, communication: 1).

## Notes

- The three `bootstrap.js` files (host-app/src/bootstrap.js:1, todoForm-app/src/bootstrap.js:1, todoList-app/src/bootstrap.js:1) perform local `import('./index.js')`; internal to each unit and do not become manual rows.
- Key `todos` in `localStorage`, written by todoForm-app and read by todoList-app, became the manual communication row at todoForm-app/src/components/todoForm.jsx:29. There is no `storage` event or other channel between remotes; navigation between them (`navigate('/add')`, `navigate('/edit/...')`, `navigate('/')`) uses the host router.
- The two `TodoForm` renderings (lines 17 and 20) remain separate rows because they are mounting points in different routes with different props.
- The standalone todoList-app `App.jsx` renders `<ToDoList/>` (todoList-app/src/App.jsx:7); todoForm-app’s only renders `<div>App</div>` (todoForm-app/src/App.jsx:3-7) and does not import or render `TodoForm`. The exposed components are those in `src/components/`.
