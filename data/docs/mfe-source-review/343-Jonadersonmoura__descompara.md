---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | admin/src/main.ts:5 | admin | dynamic-loading | No | Importa o bootstrap local de admin depois de initFederation (admin/src/main.ts:3-5); interno à unidade. |
| src-async-bootstrap | intranet/src/main.ts:5 | intranet | dynamic-loading | No | Importa o bootstrap local de intranet depois de initFederation (intranet/src/main.ts:3-5); interno à unidade. |
| src-async-bootstrap | marAberto/src/main.ts:5 | marAberto | dynamic-loading | No | Importa o bootstrap local de marAberto depois de initFederation (marAberto/src/main.ts:3-5); interno à unidade. |
| src-async-bootstrap | shell/src/main.ts:5 | shell | dynamic-loading | No | Importa o bootstrap local do host shell depois de initFederation (shell/src/main.ts:3-5); interno à unidade. |
| src-load-remote | admin/src/main.ts:1 | admin | remote-resolution | No | Importa initFederation para a chamada de admin/src/main.ts:3, que só registra o próprio admin; não resolve outra unidade. |
| src-load-remote | admin/src/main.ts:3 | admin | remote-resolution | No | `initFederation({ admin: './remoteEntry.json' })` mapeia apenas o próprio nome para o próprio remoteEntry (admin/src/main.ts:3); admin só expõe ./Routes (admin/federation.config.mjs:4 e :9) e não declara remotes. Prepara o runtime standalone da unidade. |
| src-load-remote | intranet/src/main.ts:1 | intranet | remote-resolution | No | Importa initFederation para a chamada de intranet/src/main.ts:3, que só registra a própria intranet; não resolve outra unidade. |
| src-load-remote | intranet/src/main.ts:3 | intranet | remote-resolution | No | `initFederation({ intranet: './remoteEntry.json' })` mapeia apenas o próprio nome para o próprio remoteEntry (intranet/src/main.ts:3); intranet só expõe ./Routes (intranet/federation.config.mjs:4 e :9) e não declara remotes. Prepara o runtime standalone da unidade. |
| src-load-remote | marAberto/src/main.ts:1 | marAberto | remote-resolution | No | Importa initFederation para a chamada de marAberto/src/main.ts:3, que só registra o próprio marAberto; não resolve outra unidade. |
| src-load-remote | marAberto/src/main.ts:3 | marAberto | remote-resolution | No | `initFederation({ marAberto: './remoteEntry.json' })` mapeia apenas o próprio nome para o próprio remoteEntry (marAberto/src/main.ts:3); marAberto só expõe ./Routes (marAberto/federation.config.mjs:4 e :9) e não declara remotes. Prepara o runtime standalone da unidade. |
| src-load-remote | shell/src/app/app.routes.ts:2 | shell | remote-resolution | Yes | Importa loadRemoteModule usado nas três rotas de shell/src/app/app.routes.ts:8, :13 e :18. |
| src-load-remote | shell/src/app/app.routes.ts:8 | shell | remote-resolution | Yes | `loadRemoteModule('marAberto', './Routes')` no `loadChildren` da rota `''` (shell/src/app/app.routes.ts:5-9); resolve o ./Routes exposto por marAberto (marAberto/federation.config.mjs:9) pela URL do manifesto (shell/public/federation.manifest.json:4). Rotas registradas por `provideRouter(appRoutes)` em shell/src/app/app.config.ts:9, cadeia shell/src/main.ts:3-5 → shell/src/bootstrap.ts:2-5. |
| src-load-remote | shell/src/app/app.routes.ts:13 | shell | remote-resolution | Yes | `loadRemoteModule('intranet', './Routes')` na rota `intranet` (shell/src/app/app.routes.ts:10-14); alvo intranet (intranet/federation.config.mjs:9; shell/public/federation.manifest.json:3). |
| src-load-remote | shell/src/app/app.routes.ts:18 | shell | remote-resolution | Yes | `loadRemoteModule('admin', './Routes')` na rota `admin` (shell/src/app/app.routes.ts:15-19); alvo admin (admin/federation.config.mjs:9; shell/public/federation.manifest.json:2). |
| src-load-remote | shell/src/main.ts:1 | shell | remote-resolution | Yes | Importa initFederation usado com manifesto em shell/src/main.ts:3. |
| src-load-remote | shell/src/main.ts:3 | shell | remote-resolution | Yes | `initFederation('/federation.manifest.json')` carrega o manifesto que nomeia admin, intranet e marAberto (shell/public/federation.manifest.json:2-4, portas 4203, 4202 e 4201); o bootstrap do shell só roda depois (shell/src/main.ts:5). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/app/app.routes.ts:4 | shell | host-relationship | Yes | A tabela `appRoutes` declara onde cada remote entra no shell: marAberto na raiz `''`, intranet em `intranet` e admin em `admin` (shell/src/app/app.routes.ts:4-20); registrada por `provideRouter(appRoutes)` em shell/src/app/app.config.ts:9. |
| manual | libs/shared/data-access/src/lib/auth.service.ts:8 | — | communication | Undetermined | `AuthService` (`providedIn: 'root'`, libs/shared/data-access/src/lib/auth.service.ts:6-7) guarda o usuário num `signal` (:8), alterado por `login`/`logout`/`setRole` (:17-27). Escrito pelo login de marAberto, intranet e admin (marAberto/src/app/login/login.ts:19, intranet/src/app/login/login.ts:19, admin/src/app/login/login.ts:19) e pelo logout dos headers (intranet/src/app/header/header.ts:17, admin/src/app/header/header.ts:17); lido pelo `roleGuard` (libs/shared/guards/src/lib/role.guard.ts:14-17) que protege as rotas de intranet e admin (intranet/src/app/remote-entry/entry.routes.ts:12, admin/src/app/remote-entry/entry.routes.ts:12). Só seria canal entre unidades se a mesma instância fosse compartilhada entre os builds federados; ver Notas. |

## Resumo

Construções com composição: 7 (remote-resolution: 6, host-relationship: 1).

## Notas

- Os `initFederation` dos três remotes recebem um mapa só com o próprio nome e `./remoteEntry.json`; servem ao fluxo standalone de cada remote, não resolvem outra unidade.
- Os `import('./remote-entry/entry.routes')` de admin/src/app/app.routes.ts:7, intranet/src/app/app.routes.ts:7 e marAberto/src/app/app.routes.ts:7 carregam arquivos locais de cada remote (rotas usadas quando ele roda sozinho) e não viraram linha.
- `AuthService` ficou `Undetermined`: os `federation.config.mjs` usam só `shareAll(...)` sobre os pacotes (ex.: shell/federation.config.mjs:7-18), sem `sharedMappings` explícito, e o README só afirma a instância única para `@angular/core`, `rxjs` etc. (README.md:52). O snapshot não mostra se `@descompara/shared-data-access` (tsconfig.base.json:25-26) vira um singleton compartilhado entre shell e remotes. Cada remote escreve e lê o próprio login dentro das suas rotas; o efeito entre unidades (login em admin liberando o guard de intranet) depende dessa instância única.
- README.md:56 descreve uma configuração diferente da do snapshot (sem tela de login, guards nas rotas do shell; o histórico tem um único commit e não confirma que seja uma versão anterior); no snapshot os guards estão nas rotas expostas pelos remotes e o shell não usa `AuthService` nem `roleGuard`.
- A busca do passo 4 não encontrou `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, injeção de `<script>`, `registerRemotes`, `registerApplication` nem `registerMicroApps` no código das unidades.
