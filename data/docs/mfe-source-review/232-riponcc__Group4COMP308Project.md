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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | client/shell-app/src/App.jsx:10 | client/shell-app | dynamic-loading | Yes | `lazy(() => import("userApp/App"))` loads at runtime module `./App` of remote `userApp`, declared at client/shell-app/vite.config.js:40 (`http://localhost:3001/assets/remoteEntry.js`); the target is unit client/user-app (`name: 'userApp'`, `'./App': './src/App'` at client/user-app/vite.config.js:11-14). Component rendered at client/shell-app/src/App.jsx:64; active chain client/shell-app/index.html:11 → client/shell-app/src/main.jsx:4,30 → App. |
| src-remote-import | client/shell-app/src/App.jsx:11 | client/shell-app | dynamic-loading | Yes | `lazy(() => import("issueApp/App"))` loads module `./App` of remote `issueApp`, declared at client/shell-app/vite.config.js:41 (`http://localhost:3002/assets/remoteEntry.js`); the target is unit client/issue-app (`name: 'issueApp'`, `'./App': './src/App'` at client/issue-app/vite.config.js:15-18). Component rendered at client/shell-app/src/App.jsx:67; same active chain as line 10. |
| src-cross-unit-communication | client/issue-app/src/components/Header.jsx:39 | client/issue-app | communication | Yes | `window.dispatchEvent(new CustomEvent("logout"))` in the header’s `handleLogout` (client/issue-app/src/components/Header.jsx:32-39), after the logout mutation; shell listens for `logout` at client/shell-app/src/App.jsx:43 and displays client/user-app again. Header is mounted by the exposed App at client/issue-app/src/App.jsx:21,105. |
| src-cross-unit-communication | client/shell-app/src/App.jsx:42 | client/shell-app | communication | Yes | `window.addEventListener("loginSuccess", handleLoginSuccess)` makes shell listen for the event dispatched by client/user-app at client/user-app/src/UserComponent.jsx:56; the handler sets `isLoggedIn` and swaps UserApp for IssueApp (client/shell-app/src/App.jsx:31-34, :64-67). The same effect listens for `logout` at :43 and removes both listeners at :51-52. |
| src-cross-unit-communication | client/user-app/src/UserComponent.jsx:56 | client/user-app | communication | Yes | `window.dispatchEvent(new CustomEvent("loginSuccess", { detail: { isLoggedIn: true } }))` in login `onCompleted` (client/user-app/src/UserComponent.jsx:50-58), after writing `token` and `user` to localStorage; the target is client/shell-app, listening at client/shell-app/src/App.jsx:42. UserComponent is mounted by the exposed App at client/user-app/src/App.jsx:2,31. |
| src-cross-unit-communication | client/user-app/src/UserComponent.jsx:74 | client/user-app | communication | Yes | `window.dispatchEvent(new CustomEvent("logout", { detail: { isLoggedIn: false } }))` in the logout mutation’s `onCompleted` (client/user-app/src/UserComponent.jsx:70-76), triggered by the button at :180; the target is client/shell-app, listening for `logout` at client/shell-app/src/App.jsx:43. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | client/shell-app/src/App.jsx:64 | client/shell-app | runtime-composition | Yes | Renders `<UserApp />`, a component of unit client/user-app, inside `Suspense` (client/shell-app/src/App.jsx:61-69) while not logged in; the component comes from the remote import at client/shell-app/src/App.jsx:10. |
| manual | client/shell-app/src/App.jsx:67 | client/shell-app | runtime-composition | Yes | Renders `<IssueApp currentUser={data?.currentUser} />`, a component of unit client/issue-app, after login (client/shell-app/src/App.jsx:66-67), passing the user obtained through query `CurrentUser` (:14-27); the component comes from the remote import at client/shell-app/src/App.jsx:11. |

## Summary

Constructs participating in composition: 8 (dynamic-loading: 2, communication: 4, runtime-composition: 2).

## Notes

- Inter-unit communication uses two events on `window`: `loginSuccess` (client/user-app → client/shell-app) and `logout` (client/user-app and client/issue-app → client/shell-app). Listening for `logout` at client/shell-app/src/App.jsx:43 is a usage point of the same mechanism and did not become a manual row.
- The `localStorage` (`token`, `user`) is also read by more than one unit (client/user-app/src/UserComponent.jsx:54-55, :101; client/issue-app/src/App.jsx:49, :66; client/issue-app/src/components/Header.jsx:26), but no unit listens for the `storage` event; it was not recorded as a communication mechanism.
- The `currentUser` passed to IssueApp at client/shell-app/src/App.jsx:67 is a prop and remains in the mounting row’s Observation.
