---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | client/shell-app/src/App.jsx:5 | client/shell-app | dynamic-loading | Yes | Imports authApp/App at client/shell-app/src/App.jsx:5, mounted by the /login route at client/shell-app/src/App.jsx:45; App started by client/shell-app/src/main.jsx:5-20. |
| src-remote-import | client/shell-app/src/App.jsx:6 | client/shell-app | dynamic-loading | Yes | Imports communityApp/App at client/shell-app/src/App.jsx:6, mounted by the /community route at client/shell-app/src/App.jsx:46; App started by client/shell-app/src/main.jsx:5-20. |
| src-cross-unit-communication | client/auth-app/src/subcomponents/Login.jsx:37 | client/auth-app | communication | Yes | The auth unit’s login dispatches loginSuccess with isLoggedIn (client/auth-app/src/subcomponents/Login.jsx:31-38); the shell listens for the event at client/shell-app/src/App.jsx:24-28. Login is connected to the remote component through client/auth-app/src/AuthComponent.jsx:4 and client/auth-app/src/AuthComponent.jsx:27. |
| src-cross-unit-communication | client/shell-app/src/App.jsx:28 | client/shell-app | communication | Yes | The shell registers a listener for loginSuccess and updates its state from event.detail (client/shell-app/src/App.jsx:23-28); event emitted by the other unit at client/auth-app/src/subcomponents/Login.jsx:37. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | client/shell-app/src/App.jsx:43 | client/shell-app | host-relationship | Yes | Routes declares /login and /community for the two remote applications (client/shell-app/src/App.jsx:43-47); BrowserRouter installed at client/shell-app/src/main.jsx:18-22. |
| manual | client/shell-app/src/App.jsx:45 | client/shell-app | runtime-composition | Yes | Renders AuthApp in the /login route after resolution through the remote import at client/shell-app/src/App.jsx:5; the host App is used at client/shell-app/src/main.jsx:20. |
| manual | client/shell-app/src/App.jsx:46 | client/shell-app | runtime-composition | Yes | Renders CommunityApp in the /community route after resolution through the remote import at client/shell-app/src/App.jsx:6; the host App is used at client/shell-app/src/main.jsx:20. |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 2, communication: 2, host-relationship: 1, runtime-composition: 2).

## Notes

- The loginSuccess communication is between the auth unit and shell rather than an isolated internal event: active emission and listener were found on both sides. The payload is read at client/shell-app/src/App.jsx:24-25.
- After emitting the event, Login navigates to / at client/auth-app/src/subcomponents/Login.jsx:38. The shell also queries the backend session at client/shell-app/src/App.jsx:19-21; this HTTP query was not counted as communication between frontends.
- Sender chain: remote component client/auth-app/src/App.jsx:5-22 → client/auth-app/src/AuthComponent.jsx:4-27 → Login. Receiver chain: client/shell-app/src/main.jsx:5-20 → client/shell-app/src/App.jsx:23-37. No point of doubt.
- Under the criteria for constructs outside mining (method step 4), removal of the `loginSuccess` listener at client/shell-app/src/App.jsx:35 (a usage point of the event recorded at :28) and exports of the exposed components at client/auth-app/src/App.jsx:27 and client/community-app/src/App.jsx:23 remain outside the table.
