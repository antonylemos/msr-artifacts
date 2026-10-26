---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | athletes/src/main.ts:5 | athletes | dynamic-loading | No | `import('./bootstrap')` after `initFederation()` (athletes/src/main.ts:3-5): loads the unit’s own local bootstrap (athletes/src/bootstrap.ts:5). |
| src-async-bootstrap | ranking/src/main.ts:5 | ranking | dynamic-loading | No | `import('./bootstrap')` after `initFederation()` (ranking/src/main.ts:3-5): loads the unit’s own local bootstrap (ranking/src/bootstrap.ts:5). |
| src-async-bootstrap | shell/src/main.ts:5 | shell | dynamic-loading | No | `import('./bootstrap')` after `initFederation('federation.manifest.json')` (shell/src/main.ts:3-5): loads the unit’s own local bootstrap (shell/src/bootstrap.ts:5). |
| src-load-remote | athletes/src/main.ts:1 | athletes | remote-resolution | No | Import of `initFederation`, used only in the `initFederation()` without a manifest on line 3, which does not resolve another unit. |
| src-load-remote | athletes/src/main.ts:3 | athletes | remote-resolution | No | `initFederation()` without a manifest or remotes; athletes only exposes `./Component` and `./Routes` (athletes/federation.config.js:6-9), loaded by shell without executing this main. |
| src-load-remote | ranking/src/main.ts:1 | ranking | remote-resolution | No | Import of `initFederation`, used only in the `initFederation()` without a manifest on line 3, which does not resolve another unit. |
| src-load-remote | ranking/src/main.ts:3 | ranking | remote-resolution | No | `initFederation()` without a manifest or remotes; ranking only exposes `./Component` (ranking/federation.config.js:6-8), loaded by shell without executing this main. |
| src-load-remote | shell/src/app/app.routes.ts:1 | shell | remote-resolution | Yes | Import of `loadRemoteModule`, used in routes `athletes` and `ranking` (shell/src/app/app.routes.ts:13,18). |
| src-load-remote | shell/src/app/app.routes.ts:13 | shell | remote-resolution | Yes | `loadChildren` of route `athletes` resolves `loadRemoteModule('athletes', './Routes')` and uses `m.routes` (exposed at athletes/federation.config.js:8 → athletes/src/app/shell.routes.ts:7-17); routes registered by shell/src/app/app.config.ts:9, from shell/src/bootstrap.ts:5. Target: athletes. |
| src-load-remote | shell/src/app/app.routes.ts:18 | shell | remote-resolution | Yes | `loadComponent` of route `ranking` resolves `loadRemoteModule('ranking', './Component')` and uses `m.App` (exposed at ranking/federation.config.js:7 → ranking/src/app/app.ts:19); same activation chain as line 13. Target: ranking. |
| src-load-remote | shell/src/app/dashboard/dashboard.ts:10 | shell | remote-resolution | Yes | Import of `loadRemoteModule`, used in dashboard `ngOnInit` (shell/src/app/dashboard/dashboard.ts:55-58). |
| src-load-remote | shell/src/app/dashboard/dashboard.ts:56 | shell | remote-resolution | Yes | `loadRemoteModule('athletes', './Component')` in the `Promise.all` of `ngOnInit`; uses `RaceComponent` (shell/src/app/dashboard/dashboard.ts:59; exposed at athletes/federation.config.js:7). DashboardComponent is route `dashboard` and the default route (shell/src/app/app.routes.ts:6-9,20-23). Target: athletes. |
| src-load-remote | shell/src/app/dashboard/dashboard.ts:57 | shell | remote-resolution | Yes | `loadRemoteModule('ranking', './Component')` in the same `Promise.all`; uses `App` (shell/src/app/dashboard/dashboard.ts:60; exposed at ranking/federation.config.js:7). Target: ranking. |
| src-load-remote | shell/src/main.ts:1 | shell | remote-resolution | Yes | Import of `initFederation`, used with the manifest on line 3. |
| src-load-remote | shell/src/main.ts:3 | shell | remote-resolution | Yes | `initFederation('federation.manifest.json')` before bootstrap; the manifest maps `athletes` and `ranking` to `remoteEntry.json` on workers.dev (shell/public/federation.manifest.json:2-3). Targets: athletes and ranking. |
| src-cross-unit-communication | athletes/src/app/athlete-detail/athlete-detail.ts:75 | athletes | communication | No | Declaration of AthleteDetailComponent field `channel`, opened on channel `athletes-positions` on line 83; the component only receives messages, and the channel’s only sender is RaceComponent from the same unit (athletes/src/app/race/race.ts:46,55): communication internal to athletes. |
| src-cross-unit-communication | athletes/src/app/athlete-detail/athlete-detail.ts:83 | athletes | communication | No | `new BroadcastChannel('athletes-positions')` with `onmessage` updating the route athlete’s distance (athletes/src/app/athlete-detail/athlete-detail.ts:83-89); receives only what RaceComponent from the unit itself publishes (athletes/src/app/race/race.ts:46,55). |
| src-cross-unit-communication | athletes/src/app/race/race.ts:36 | athletes | communication | Yes | `new BroadcastChannel(CHANNEL_NAME)` with `CHANNEL_NAME = 'athletes-positions'` (athletes/src/app/race/race.ts:11), the same channel listened to by ranking (ranking/src/app/app.ts:11,41-48). RaceComponent is active in athletes’ root route (athletes/src/app/app.routes.ts:7) and mounted in the shell dashboard (shell/src/app/dashboard/dashboard.ts:56,59,70). Target: ranking. |
| src-cross-unit-communication | athletes/src/app/race/race.ts:46 | athletes | communication | Yes | `postMessage` with name, distance and `finished` on every `advance` (athletes/src/app/race/race.ts:38-50), read by ranking’s `onmessage` (ranking/src/app/app.ts:42-48). Target: ranking. |
| src-cross-unit-communication | athletes/src/app/race/race.ts:55 | athletes | communication | Yes | `postMessage` of zero distance for each athlete in `reset` (athletes/src/app/race/race.ts:52-56), read by ranking’s `onmessage` (ranking/src/app/app.ts:42-48). Target: ranking. |
| src-cross-unit-communication | ranking/src/app/app.ts:38 | ranking | communication | Yes | Declaration of ranking App field `channel`, opened on channel `athletes-positions` on line 41 to receive positions published by athletes (athletes/src/app/race/race.ts:36,46,55). |
| src-cross-unit-communication | ranking/src/app/app.ts:41 | ranking | communication | Yes | `new BroadcastChannel(CHANNEL_NAME)` in `ngOnInit`, with `onmessage` updating the position map and ranking (ranking/src/app/app.ts:41-48); App is ranking’s root (ranking/src/bootstrap.ts:5) and loaded by shell (shell/src/app/app.routes.ts:18; shell/src/app/dashboard/dashboard.ts:57,60). Sender: athletes. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/app/app.routes.ts:5 | shell | host-relationship | Yes | Route table declares `dashboard` (DashboardComponent, mounting both remotes), `athletes` and `ranking` and the initial redirect to `dashboard` (shell/src/app/app.routes.ts:5-25); registered by shell/src/app/app.config.ts:9; navigation links at shell/src/app/app.html:3-5. |
| manual | shell/src/app/dashboard/dashboard.ts:70 | shell | runtime-composition | Yes | `athletesHost.createComponent(this.pendingAthletes)` mounts athletes’ RaceComponent in the dashboard’s `ng-container #athletesHost` (shell/src/app/dashboard/dashboard.ts:25,45,59,69-73). |
| manual | shell/src/app/dashboard/dashboard.ts:75 | shell | runtime-composition | Yes | `rankingHost.createComponent(this.pendingRanking)` mounts ranking’s App in the dashboard’s `ng-container #rankingHost` (shell/src/app/dashboard/dashboard.ts:37,46,60,74-78). |

## Summary

Constructs participating in composition: 16 (remote-resolution: 8, communication: 5, host-relationship: 1, runtime-composition: 2).

## Notes

- `BroadcastChannel` delivers messages only between contexts with the same origin. Exchange between athletes and ranking happens when both are loaded in shell (for example: dashboard mounts both on the same page, shell/src/app/dashboard/dashboard.ts:56-60,70,75); served in isolation on different ports or hosts (athletes/angular.json:93, ranking/angular.json:93; shell/public/federation.manifest.json:2-3), each is in a separate channel.
- Channel `athletes-positions` has one sender (RaceComponent, athletes) and two receivers: AthleteDetailComponent (athletes, internal) and ranking’s App (inter-unit).
- athletes/src/app/shell.routes.ts wraps routes in athletes’ App component for loading by shell (athletes/src/app/shell.routes.ts:7-17); exposure is already at athletes/federation.config.js:8 and does not become a row.
