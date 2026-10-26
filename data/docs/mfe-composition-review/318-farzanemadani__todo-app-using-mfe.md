---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
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

# 318 — farzanemadani/todo-app-using-mfe

## Repository overview

A small Module Federation example with webpack 5 and React, with three side-by-side projects and no `package.json` at the root. `host-app` is the host (port 3000, host-app/webpack.dev.js:13-16) and declares two remotes, `todoForm_app` on port 3001 and `todoList_app` on port 3002, in both development configuration (host-app/webpack.dev.js:48-51) and production configuration (host-app/webpack.prod.js:52-55, with URLs in constants at :7-8, still on `localhost`). Each remote exposes a single screen: todoForm-app exposes `./TodoForm` (todoForm-app/webpack.dev.js:49-52; todoForm-app/webpack.prod.js:49-52), and todoList-app exposes `./todoList` (todoList-app/webpack.dev.js:48-51; todoList-app/webpack.prod.js:48-51). All three configurations share all `dependencies` from their own `package.json`, without `singleton` (for example host-app/webpack.prod.js:56-58).

The host loads both screens with `React.lazy` and federated `import()` (host-app/src/App.jsx:2-3) and mounts them as routes inside `Suspense`: `/` shows the list, `/add` and `/edit/:id` show the form, the latter with `type='edit'` (host-app/src/App.jsx:12-22). The router is the host's `BrowserRouter` (host-app/src/index.js:7-9); remotes use that context to navigate between them (`navigate('/add')` and `navigate(`/edit/${todo.id}`)` in todoList-app/src/components/ToDoList.jsx:21, :48; `navigate('/')` in todoForm-app/src/components/todoForm.jsx:31, :42, :91) and to read the route parameter (todoForm-app/src/components/todoForm.jsx:14). Both screens exchange data through key `todos` in `localStorage`, read and written by both, without a `storage` event or another channel.

What did not become a relationship: `import('./index.js')` calls in the three `bootstrap.js` files (for example host-app/src/bootstrap.js:1), internal to each unit, or navigation between remotes, which passes through the host router and declares no separate connection. Remotes' `App.jsx` files serve only independent execution: todoList-app's renders `<ToDoList/>` (todoList-app/src/App.jsx:7), and todoForm-app's only a `<div>App</div>` (todoForm-app/src/App.jsx:3-7). Title "Monolyth -
TodoApp" in the host header (host-app/src/components/header.jsx:7) is only interface text. Every `Yes` unit in the structural review participates in at least one relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host-app | todoForm-app | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.dev.js:49 (remote `todoForm_app@http://localhost:3001/remoteEntry.js`); host-app/webpack.prod.js:53 (remote `todoForm_app@${todoformAppurl}/remoteEntry.js`, URL at :7); todoForm-app/webpack.dev.js:49 (`name:'todoForm_app'`); todoForm-app/webpack.dev.js:51-52 (exposes `./TodoForm`); todoForm-app/webpack.prod.js:49 (`name:'todoForm_app'`); todoForm-app/webpack.prod.js:51-52 (exposes `./TodoForm`); todoForm-app/webpack.dev.js:16 (port 3001) | host-app/src/App.jsx:2; host-app/src/App.jsx:12; host-app/src/App.jsx:17; host-app/src/App.jsx:20 |
| 2 | host-app | todoList-app | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.dev.js:50 (remote `todoList_app@http://localhost:3002/remoteEntry.js`); host-app/webpack.prod.js:54 (remote `todoList_app@${todolistAppurl}/remoteEntry.js`, URL at :8); todoList-app/webpack.dev.js:48 (`name:'todoList_app'`); todoList-app/webpack.dev.js:50-51 (exposes `./todoList`); todoList-app/webpack.prod.js:48 (`name:'todoList_app'`); todoList-app/webpack.prod.js:50-51 (exposes `./todoList`); todoList-app/webpack.dev.js:15 (port 3002) | host-app/src/App.jsx:3; host-app/src/App.jsx:12; host-app/src/App.jsx:14 |
| 3 | todoForm-app | todoList-app | communication | bidirectional | other | Yes | Yes | — | todoForm-app/src/components/todoForm.jsx:29 |

## Observations

**1. host-app → todoForm-app.** `import('todoForm_app/TodoForm')` (host-app/src/App.jsx:2) uses the remote key declared in host-app/webpack.dev.js:49 and host-app/webpack.prod.js:53, matching todoForm-app's `name: 'todoForm_app'` (todoForm-app/webpack.dev.js:49; todoForm-app/webpack.prod.js:49), and path `TodoForm` matches exposure `./TodoForm`, pointing to `./src/components/todoForm.jsx` (todoForm-app/webpack.dev.js:51-52; todoForm-app/webpack.prod.js:51-52). Port 3001 (todoForm-app/webpack.dev.js:16) only corroborates; in the remote's `webpack.prod.js`, the port is commented out (todoForm-app/webpack.prod.js:16). The host mounts the form at two routes, `/add` (host-app/src/App.jsx:16-18) and `/edit/:id` with `type='edit'` (host-app/src/App.jsx:19-21), and the manual `Routes` line (host-app/src/App.jsx:12) enters this relationship and 2. The chain is active: the host entry point (host-app/webpack.prod.js:11) passes through host-app/src/bootstrap.js:1 and host-app/src/index.js:5-10 to `App`.

**2. host-app → todoList-app.** `import('todoList_app/todoList')` (host-app/src/App.jsx:3) uses the remote in host-app/webpack.dev.js:50 and host-app/webpack.prod.js:54, matching `name: 'todoList_app'` (todoList-app/webpack.dev.js:48; todoList-app/webpack.prod.js:48) and exposure `./todoList`, lowercase as in the specifier, pointing to `./src/components/ToDoList.jsx` (todoList-app/webpack.dev.js:50-51; todoList-app/webpack.prod.js:50-51). Port 3002 (todoList-app/webpack.dev.js:15) only corroborates. The list is mounted at route `/` (host-app/src/App.jsx:13-15), where the form returns after saving.

**3. todoForm-app ↔ todoList-app.** Exchange occurs through shared state in key `todos` in `localStorage`, rather than events, hence mechanism `other`; there is no event channel to combine. The form writes the list when adding (todoForm-app/src/components/todoForm.jsx:27-29) and editing (:33-40), and the list reads the key on mounting (todoList-app/src/components/ToDoList.jsx:8). The reverse direction also exists: deleting from the list rewrites the key (todoList-app/src/components/ToDoList.jsx:12), and the form reads it when opening for editing and before each write (todoForm-app/src/components/todoForm.jsx:16, :27, :33), hence `bidirectional`, with units in alphabetical order. Nobody listens to event `storage`: the list only sees the form's write because it is mounted again after `navigate('/')` (todoForm-app/src/components/todoForm.jsx:31, :42). The key is only the same when both screens run on the host page, under a single origin; independently, on ports 3001 and 3002, each has its own `localStorage`. The source code review recorded the channel in one todoForm-app line (todoForm-app/src/components/todoForm.jsx:29), the only one in column Code. No configuration declaration connects units through that channel, and Configuration remains `—`.

## Summary

Relationships: 3 (host → remote: 2, communication: 1). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

