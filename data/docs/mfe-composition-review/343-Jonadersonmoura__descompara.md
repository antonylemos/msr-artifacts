---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
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

# 343 — Jonadersonmoura/descompara

## Leitura do repositório

Prova de conceito de um portal de seguros num workspace Nx com Angular, composto por **Native Federation** (`@angular-architects/native-federation`). O `shell` é o host: antes do bootstrap, ele carrega o manifesto `/federation.manifest.json` (shell/src/main.ts:3-5), que associa os nomes `admin`, `intranet` e `marAberto` às URLs `remoteEntry.json` nas portas 4203, 4202 e 4201 (shell/public/federation.manifest.json:2-4). O shell não importa nada estaticamente dos remotes: a tabela de rotas carrega o `./Routes` de cada um com `loadRemoteModule`, `marAberto` na rota raiz, `intranet` em `intranet` e `admin` em `admin` (shell/src/app/app.routes.ts:4-20), e é registrada por `provideRouter(appRoutes)` (shell/src/app/app.config.ts:9). Cada remote declara o próprio `name` e expõe só `./Routes` (por exemplo admin/federation.config.mjs:4 e :8-10). As URLs são de desenvolvimento local; não há Dockerfile nem configuração de hospedagem.

Os três remotes também rodam sozinhos: o `initFederation` de cada um recebe um mapa só com o próprio nome (por exemplo admin/src/main.ts:3), o que não resolve outra unidade e não virou relação. As bibliotecas de `libs/shared/` (tipos, UI, serviços, guards, tema) não são unidades e entram por alias de `tsconfig.base.json` (tsconfig.base.json:22-29).

A particularidade é o login. O `AuthService` de `libs/shared/data-access` (`providedIn: 'root'`) guarda o usuário num `signal` (libs/shared/data-access/src/lib/auth.service.ts:6-8), alterado por `login` e `logout` (:17-23). Cada remote tem a própria tela de login, que grava um papel diferente: `publico` em marAberto, `gerente` em intranet e `admin` em admin (marAberto/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; admin/src/app/login/login.ts:19). Os headers de intranet e admin mostram o usuário e fazem logout (intranet/src/app/header/header.html:5-6, intranet/src/app/header/header.ts:17; admin/src/app/header/header.html:5-6, admin/src/app/header/header.ts:17), e o `roleGuard` lê o papel (libs/shared/guards/src/lib/role.guard.ts:14-17) para proteger a home de intranet (`gerente` ou `admin`) e a de admin (`admin`) (intranet/src/app/remote-entry/entry.routes.ts:12; admin/src/app/remote-entry/entry.routes.ts:12). Se os remotes montados no shell compartilharem uma instância do serviço, o login feito num remote vale nos outros, por exemplo o login de admin libera a home de intranet. Os `federation.config.mjs` usam `shareAll` com `singleton: true` (shell/federation.config.mjs:7-18; admin/federation.config.mjs:12-23), mas o snapshot não mostra se a biblioteca local `@descompara/shared-data-access` entra nesse compartilhamento, e a revisão de código-fonte deixou a linha `Undetermined`. Isso virou as relações 4 a 6, com Ativa `Undetermined`. O shell não usa o serviço nem o guard. O README descreve uma configuração diferente, sem tela de login e com os guards nas rotas do shell (README.md:56), que não corresponde ao snapshot; o histórico tem um único commit e não confirma que seja uma versão anterior.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | admin | host → remote | origem → destino | native-federation | Yes | Yes | shell/public/federation.manifest.json:2 (`admin` → `http://localhost:4203/remoteEntry.json`); admin/federation.config.mjs:4 (`name: 'admin'`); admin/federation.config.mjs:8-10 (expõe `./Routes`); admin/project.json:131 (porta 4203 do `serve-original`) | shell/src/app/app.routes.ts:2; shell/src/app/app.routes.ts:18; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:4 |
| 2 | shell | intranet | host → remote | origem → destino | native-federation | Yes | Yes | shell/public/federation.manifest.json:3 (`intranet` → `http://localhost:4202/remoteEntry.json`); intranet/federation.config.mjs:4 (`name: 'intranet'`); intranet/federation.config.mjs:8-10 (expõe `./Routes`); intranet/project.json:131 (porta 4202 do `serve-original`) | shell/src/app/app.routes.ts:2; shell/src/app/app.routes.ts:13; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:4 |
| 3 | shell | marAberto | host → remote | origem → destino | native-federation | Yes | Yes | shell/public/federation.manifest.json:4 (`marAberto` → `http://localhost:4201/remoteEntry.json`); marAberto/federation.config.mjs:4 (`name: 'marAberto'`); marAberto/federation.config.mjs:8-10 (expõe `./Routes`); marAberto/project.json:131 (porta 4201 do `serve-original`) | shell/src/app/app.routes.ts:2; shell/src/app/app.routes.ts:8; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:4 |
| 4 | marAberto | admin | communication | origem → destino | events | Yes | Undetermined | shell/federation.config.mjs:7-18 (`shareAll` singleton); marAberto/federation.config.mjs:12-23 (idem); admin/federation.config.mjs:12-23 (idem); tsconfig.base.json:25-27 (alias `@descompara/shared-data-access`) | libs/shared/data-access/src/lib/auth.service.ts:8 |
| 5 | admin | intranet | communication | bidirecional | events | Yes | Undetermined | shell/federation.config.mjs:7-18 (`shareAll` singleton); admin/federation.config.mjs:12-23 (idem); intranet/federation.config.mjs:12-23 (idem); tsconfig.base.json:25-27 (alias `@descompara/shared-data-access`) | libs/shared/data-access/src/lib/auth.service.ts:8 |
| 6 | marAberto | intranet | communication | origem → destino | events | Yes | Undetermined | shell/federation.config.mjs:7-18 (`shareAll` singleton); marAberto/federation.config.mjs:12-23 (idem); intranet/federation.config.mjs:12-23 (idem); tsconfig.base.json:25-27 (alias `@descompara/shared-data-access`) | libs/shared/data-access/src/lib/auth.service.ts:8 |

## Observações

**1. shell → admin.** O nome `admin` pedido em `loadRemoteModule('admin', './Routes')` (shell/src/app/app.routes.ts:18) corresponde ao `name: 'admin'` de admin/federation.config.mjs:4, e o módulo `./Routes` ao `exposes` de admin/federation.config.mjs:8-10, que aponta para `entry.routes.ts` (admin/src/app/remote-entry/entry.routes.ts:7). A URL vem do manifesto do shell (shell/public/federation.manifest.json:2), carregado por `initFederation` (shell/src/main.ts:3); a porta 4203 (admin/project.json:131) só corrobora. As linhas do import de `loadRemoteModule` (shell/src/app/app.routes.ts:2), do `initFederation` (shell/src/main.ts:1, :3) e da tabela `appRoutes` (shell/src/app/app.routes.ts:4) servem às três relações de carga e aparecem nas três. Ativa `Yes`: todas as linhas de código são `Yes` na revisão de código-fonte.

**2. shell → intranet.** Mesma resolução da relação 1: `loadRemoteModule('intranet', './Routes')` (shell/src/app/app.routes.ts:13) corresponde a intranet/federation.config.mjs:4 e :8-10; URL em shell/public/federation.manifest.json:3, porta 4202 em intranet/project.json:131. A rota `intranet` do shell monta as rotas do remote, cuja home é protegida pelo `roleGuard` (intranet/src/app/remote-entry/entry.routes.ts:12).

**3. shell → marAberto.** `loadRemoteModule('marAberto', './Routes')` (shell/src/app/app.routes.ts:8) corresponde a marAberto/federation.config.mjs:4 e :8-10; URL em shell/public/federation.manifest.json:4, porta 4201 em marAberto/project.json:131. É o remote montado na rota raiz `''` do shell (shell/src/app/app.routes.ts:6), ou seja, a página pública que o usuário vê primeiro.

**4. marAberto → admin.** Canal pelo serviço reativo compartilhado `AuthService` (libs/shared/data-access/src/lib/auth.service.ts:6-8). marAberto só escreve: seu login grava o papel `publico` (marAberto/src/app/login/login.ts:19), e nenhum arquivo de marAberto lê o serviço. admin lê o papel pelo `roleGuard('admin')` da sua home (admin/src/app/remote-entry/entry.routes.ts:12; libs/shared/guards/src/lib/role.guard.ts:14-17) e o usuário no header (admin/src/app/header/header.html:5-6). Daí `origem → destino`. O efeito seria trocar um usuário logado em admin por um `publico`, que o guard de admin barra. Mecanismo `events`, como serviço reativo compartilhado. Ativa `Undetermined`, porque a única linha da revisão de código-fonte é `Undetermined`: o canal só existe se o shell e os remotes compartilharem a mesma instância de `@descompara/shared-data-access`, e os `shareAll` citados na Configuração não mostram isso para a biblioteca local.

**5. admin ↔ intranet.** As duas unidades escrevem e leem o mesmo serviço. admin grava o papel `admin` (admin/src/app/login/login.ts:19) e faz logout (admin/src/app/header/header.ts:17); intranet grava `gerente` (intranet/src/app/login/login.ts:19) e faz logout (intranet/src/app/header/header.ts:17). Cada uma lê o papel no próprio guard (intranet/src/app/remote-entry/entry.routes.ts:12; admin/src/app/remote-entry/entry.routes.ts:12) e no header. Com instância única, o login de admin passa no guard de intranet (`roleGuard('gerente', 'admin')`), e o logout de qualquer uma desloga a outra; por isso `bidirecional`, com Origem e Destino em ordem alfabética. Ativa `Undetermined` pelo mesmo motivo da relação 4.

**6. marAberto → intranet.** Como na relação 4: marAberto só escreve o papel `publico` (marAberto/src/app/login/login.ts:19), e intranet o lê no guard da home (intranet/src/app/remote-entry/entry.routes.ts:12) e no header (intranet/src/app/header/header.html:5-6), e também exibe o usuário na home (intranet/src/app/home/home.ts:29). Ativa `Undetermined` pelo mesmo motivo da relação 4.

## Resumo

Relações: 6 (host → remote: 3, communication: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
