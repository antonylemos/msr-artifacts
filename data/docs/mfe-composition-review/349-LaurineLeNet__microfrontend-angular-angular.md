---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
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

# 349 — LaurineLeNet/microfrontend-angular-angular

## Leitura do repositório

Exemplo em Angular com três workspaces independentes ligados por **Native Federation**
(`@angular-architects/native-federation`): o host `shell` e os remotes `athletes` (uma corrida
simulada entre dois atletas, com lista e detalhe) e `ranking` (a classificação em tempo real). O
shell lê `federation.manifest.json` antes do bootstrap (shell/src/main.ts:3-5); o manifesto aponta
cada remote para um `remoteEntry.json` num Cloudflare Worker próprio
(shell/public/federation.manifest.json:2-3), e o nome de cada worker coincide com o host da URL
(athletes/wrangler.jsonc:3; ranking/wrangler.jsonc:3). O próprio shell não expõe nada
(shell/federation.config.js:3-8).

O shell consome cada remote de duas formas. Pelas rotas: `athletes` entra como rotas filhas
(`./Routes`, shell/src/app/app.routes.ts:10-14) e `ranking` como componente de rota
(`./Component`, shell/src/app/app.routes.ts:15-19). Pelo dashboard, que é a rota padrão
(shell/src/app/app.routes.ts:6-9, 20-24): o `DashboardComponent` carrega os dois `./Component` em
paralelo e os monta com `createComponent` em dois painéis lado a lado
(shell/src/app/dashboard/dashboard.ts:54-79). A barra de navegação do shell liga as três rotas
(shell/src/app/app.html:3-5). Para ser carregado como rotas, athletes envolve suas telas no próprio
componente `App` (athletes/src/app/shell.routes.ts:7-17), em paralelo às rotas que usa quando roda
sozinho (athletes/src/app/app.routes.ts:6-10).

Os dois remotes conversam sem passar pelo shell: o `RaceComponent` de athletes publica as posições
num `BroadcastChannel` chamado `athletes-positions` (athletes/src/app/race/race.ts:11, 36, 46, 55),
e o `App` de ranking escuta o mesmo canal (ranking/src/app/app.ts:11, 41-48). Como o
`BroadcastChannel` só entrega mensagens na mesma origem, a troca acontece quando os dois estão
carregados no shell, como no dashboard. O mesmo canal tem um receptor interno a athletes
(athletes/src/app/athlete-detail/athlete-detail.ts:83-89), que não vira relação. Os `main.ts` dos
remotes chamam `initFederation()` sem manifesto (athletes/src/main.ts:3), só para rodarem sozinhos.
Não há outro mecanismo de composição.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | athletes | host → remote | origem → destino | native-federation | Yes | Yes | shell/public/federation.manifest.json:2 (`athletes` → `https://mf-angular-athletes.lenetlaurine.workers.dev/remoteEntry.json`); athletes/federation.config.js:4-9 (`name: 'athletes'`, expõe `./Component` e `./Routes`); athletes/wrangler.jsonc:3 (worker `mf-angular-athletes`) | shell/src/app/app.routes.ts:1; shell/src/app/app.routes.ts:13; shell/src/app/dashboard/dashboard.ts:10; shell/src/app/dashboard/dashboard.ts:56; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:5; shell/src/app/dashboard/dashboard.ts:70 |
| 2 | shell | ranking | host → remote | origem → destino | native-federation | Yes | Yes | shell/public/federation.manifest.json:3 (`ranking` → `https://mf-angular-ranking.lenetlaurine.workers.dev/remoteEntry.json`); ranking/federation.config.js:4-8 (`name: 'ranking'`, expõe `./Component`); ranking/wrangler.jsonc:3 (worker `mf-angular-ranking`) | shell/src/app/app.routes.ts:1; shell/src/app/app.routes.ts:18; shell/src/app/dashboard/dashboard.ts:10; shell/src/app/dashboard/dashboard.ts:57; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:5; shell/src/app/dashboard/dashboard.ts:75 |
| 3 | athletes | ranking | communication | origem → destino | events | Yes | Yes | — | athletes/src/app/race/race.ts:36; athletes/src/app/race/race.ts:46; athletes/src/app/race/race.ts:55; ranking/src/app/app.ts:38; ranking/src/app/app.ts:41 |

## Observações

**1. shell → athletes.** O shell carrega `./Routes` de `athletes` na rota `athletes` e usa
`m.routes` (shell/src/app/app.routes.ts:11-13), e carrega `./Component` no dashboard, montando o
`RaceComponent` (shell/src/app/dashboard/dashboard.ts:56, 59, 70). O nome e as duas chaves
correspondem a athletes/federation.config.js:4-9, e os nomes exportados existem no destino
(athletes/src/app/shell.routes.ts:7; athletes/src/app/race/race.ts:19). A URL do manifesto
(shell/public/federation.manifest.json:2) aponta para o worker `mf-angular-athletes`, que publica
`./dist/athletes/browser` (athletes/wrangler.jsonc:3, 14). A tabela de rotas (shell/src/app/app.routes.ts:5)
sustenta as duas relações do shell, porque declara o dashboard e as rotas dos dois remotes.

**2. shell → ranking.** Mesmo fluxo para `ranking`: `./Component` com `m.App` na rota `ranking`
(shell/src/app/app.routes.ts:16-18) e no dashboard (shell/src/app/dashboard/dashboard.ts:57, 60,
75). O nome e a chave correspondem a ranking/federation.config.js:4-7, e `App` é exportado em
ranking/src/app/app.ts:19. A URL do manifesto (shell/public/federation.manifest.json:3) aponta para
o worker `mf-angular-ranking`, que publica `./dist/ranking/browser` (ranking/wrangler.jsonc:3, 14).

**3. athletes → ranking.** O `RaceComponent` abre o canal `athletes-positions`
(athletes/src/app/race/race.ts:11, 36) e envia nome, distância e `finished` a cada avanço e em
cada reinício (athletes/src/app/race/race.ts:46, 55); o `App` de ranking abre o mesmo canal e
atualiza o mapa de posições a cada mensagem (ranking/src/app/app.ts:11, 38, 41-48). Ranking só
recebe e nunca envia, por isso a direção é `origem → destino`. O mecanismo é `events`, como troca
de mensagens por `BroadcastChannel`, sem estado compartilhado. Não há configuração que declare o
canal: o nome é uma constante repetida nas duas unidades. A troca depende de as duas unidades
estarem na mesma origem, o que acontece quando o shell carrega as duas (relações 1 e 2).

## Resumo

Relações: 3 (host → remote: 2, communication: 1). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
