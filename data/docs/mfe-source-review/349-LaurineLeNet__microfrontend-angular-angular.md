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

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | athletes/src/main.ts:5 | athletes | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation()` (athletes/src/main.ts:3-5): carrega o bootstrap local da própria unidade (athletes/src/bootstrap.ts:5). |
| src-async-bootstrap | ranking/src/main.ts:5 | ranking | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation()` (ranking/src/main.ts:3-5): carrega o bootstrap local da própria unidade (ranking/src/bootstrap.ts:5). |
| src-async-bootstrap | shell/src/main.ts:5 | shell | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation('federation.manifest.json')` (shell/src/main.ts:3-5): carrega o bootstrap local da própria unidade (shell/src/bootstrap.ts:5). |
| src-load-remote | athletes/src/main.ts:1 | athletes | remote-resolution | No | Import de `initFederation`, usado só no `initFederation()` sem manifesto da linha 3, que não resolve outra unidade. |
| src-load-remote | athletes/src/main.ts:3 | athletes | remote-resolution | No | `initFederation()` sem manifesto nem remotes; athletes só expõe `./Component` e `./Routes` (athletes/federation.config.js:6-9), que o shell carrega sem executar este main. |
| src-load-remote | ranking/src/main.ts:1 | ranking | remote-resolution | No | Import de `initFederation`, usado só no `initFederation()` sem manifesto da linha 3, que não resolve outra unidade. |
| src-load-remote | ranking/src/main.ts:3 | ranking | remote-resolution | No | `initFederation()` sem manifesto nem remotes; ranking só expõe `./Component` (ranking/federation.config.js:6-8), que o shell carrega sem executar este main. |
| src-load-remote | shell/src/app/app.routes.ts:1 | shell | remote-resolution | Yes | Import de `loadRemoteModule`, usado nas rotas `athletes` e `ranking` (shell/src/app/app.routes.ts:13,18). |
| src-load-remote | shell/src/app/app.routes.ts:13 | shell | remote-resolution | Yes | `loadChildren` da rota `athletes` resolve `loadRemoteModule('athletes', './Routes')` e usa `m.routes` (exposto em athletes/federation.config.js:8 → athletes/src/app/shell.routes.ts:7-17); rotas registradas por shell/src/app/app.config.ts:9, a partir de shell/src/bootstrap.ts:5. Alvo: athletes. |
| src-load-remote | shell/src/app/app.routes.ts:18 | shell | remote-resolution | Yes | `loadComponent` da rota `ranking` resolve `loadRemoteModule('ranking', './Component')` e usa `m.App` (exposto em ranking/federation.config.js:7 → ranking/src/app/app.ts:19); mesma cadeia de ativação da linha 13. Alvo: ranking. |
| src-load-remote | shell/src/app/dashboard/dashboard.ts:10 | shell | remote-resolution | Yes | Import de `loadRemoteModule`, usado em `ngOnInit` do dashboard (shell/src/app/dashboard/dashboard.ts:55-58). |
| src-load-remote | shell/src/app/dashboard/dashboard.ts:56 | shell | remote-resolution | Yes | `loadRemoteModule('athletes', './Component')` no `Promise.all` de `ngOnInit`; usa `RaceComponent` (shell/src/app/dashboard/dashboard.ts:59; exposto em athletes/federation.config.js:7). DashboardComponent é a rota `dashboard` e a rota padrão (shell/src/app/app.routes.ts:6-9,20-23). Alvo: athletes. |
| src-load-remote | shell/src/app/dashboard/dashboard.ts:57 | shell | remote-resolution | Yes | `loadRemoteModule('ranking', './Component')` no mesmo `Promise.all`; usa `App` (shell/src/app/dashboard/dashboard.ts:60; exposto em ranking/federation.config.js:7). Alvo: ranking. |
| src-load-remote | shell/src/main.ts:1 | shell | remote-resolution | Yes | Import de `initFederation`, usado com o manifesto na linha 3. |
| src-load-remote | shell/src/main.ts:3 | shell | remote-resolution | Yes | `initFederation('federation.manifest.json')` antes do bootstrap; o manifesto mapeia `athletes` e `ranking` para `remoteEntry.json` em workers.dev (shell/public/federation.manifest.json:2-3). Alvos: athletes e ranking. |
| src-cross-unit-communication | athletes/src/app/athlete-detail/athlete-detail.ts:75 | athletes | communication | No | Declaração do campo `channel` do AthleteDetailComponent, aberto no canal `athletes-positions` na linha 83; o componente só recebe mensagens, e o único emissor do canal é RaceComponent, da mesma unidade (athletes/src/app/race/race.ts:46,55): comunicação interna a athletes. |
| src-cross-unit-communication | athletes/src/app/athlete-detail/athlete-detail.ts:83 | athletes | communication | No | `new BroadcastChannel('athletes-positions')` com `onmessage` que atualiza a distância do atleta da rota (athletes/src/app/athlete-detail/athlete-detail.ts:83-89); recebe só o que RaceComponent da própria unidade publica (athletes/src/app/race/race.ts:46,55). |
| src-cross-unit-communication | athletes/src/app/race/race.ts:36 | athletes | communication | Yes | `new BroadcastChannel(CHANNEL_NAME)` com `CHANNEL_NAME = 'athletes-positions'` (athletes/src/app/race/race.ts:11), o mesmo canal que ranking escuta (ranking/src/app/app.ts:11,41-48). RaceComponent está ativo na rota raiz de athletes (athletes/src/app/app.routes.ts:7) e é montado no dashboard do shell (shell/src/app/dashboard/dashboard.ts:56,59,70). Alvo: ranking. |
| src-cross-unit-communication | athletes/src/app/race/race.ts:46 | athletes | communication | Yes | `postMessage` com nome, distância e `finished` a cada `advance` (athletes/src/app/race/race.ts:38-50), lido pelo `onmessage` de ranking (ranking/src/app/app.ts:42-48). Alvo: ranking. |
| src-cross-unit-communication | athletes/src/app/race/race.ts:55 | athletes | communication | Yes | `postMessage` de distância zero para cada atleta em `reset` (athletes/src/app/race/race.ts:52-56), lido pelo `onmessage` de ranking (ranking/src/app/app.ts:42-48). Alvo: ranking. |
| src-cross-unit-communication | ranking/src/app/app.ts:38 | ranking | communication | Yes | Declaração do campo `channel` do App de ranking, aberto no canal `athletes-positions` na linha 41 para receber as posições publicadas por athletes (athletes/src/app/race/race.ts:36,46,55). |
| src-cross-unit-communication | ranking/src/app/app.ts:41 | ranking | communication | Yes | `new BroadcastChannel(CHANNEL_NAME)` em `ngOnInit`, com `onmessage` que atualiza o mapa de posições e o ranking (ranking/src/app/app.ts:41-48); App é a raiz de ranking (ranking/src/bootstrap.ts:5) e é carregado pelo shell (shell/src/app/app.routes.ts:18; shell/src/app/dashboard/dashboard.ts:57,60). Emissor: athletes. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/app/app.routes.ts:5 | shell | host-relationship | Yes | Tabela de rotas declara `dashboard` (DashboardComponent, que monta os dois remotes), `athletes` e `ranking` e o redirecionamento inicial para `dashboard` (shell/src/app/app.routes.ts:5-25); registrada por shell/src/app/app.config.ts:9; links de navegação em shell/src/app/app.html:3-5. |
| manual | shell/src/app/dashboard/dashboard.ts:70 | shell | runtime-composition | Yes | `athletesHost.createComponent(this.pendingAthletes)` monta o RaceComponent de athletes no `ng-container #athletesHost` do dashboard (shell/src/app/dashboard/dashboard.ts:25,45,59,69-73). |
| manual | shell/src/app/dashboard/dashboard.ts:75 | shell | runtime-composition | Yes | `rankingHost.createComponent(this.pendingRanking)` monta o App de ranking no `ng-container #rankingHost` do dashboard (shell/src/app/dashboard/dashboard.ts:37,46,60,74-78). |

## Resumo

Construções com composição: 16 (remote-resolution: 8, communication: 5, host-relationship: 1, runtime-composition: 2).

## Notas

- `BroadcastChannel` só entrega mensagens entre contextos da mesma origem. A troca entre athletes e ranking acontece quando os dois são carregados no shell (ex.: o dashboard monta os dois na mesma página, shell/src/app/dashboard/dashboard.ts:56-60,70,75); servidos isoladamente em portas ou hosts diferentes (athletes/angular.json:93, ranking/angular.json:93; shell/public/federation.manifest.json:2-3), cada um fica num canal separado.
- O canal `athletes-positions` tem um emissor (RaceComponent, athletes) e dois receptores: AthleteDetailComponent (athletes, interno) e o App de ranking (entre unidades).
- athletes/src/app/shell.routes.ts envolve as rotas no componente App de athletes para o carregamento pelo shell (athletes/src/app/shell.routes.ts:7-17); a exposição já está em athletes/federation.config.js:8 e não vira linha.
