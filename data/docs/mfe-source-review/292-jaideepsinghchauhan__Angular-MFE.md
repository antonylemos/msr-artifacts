---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | appshell/host/src/app/app.routes.ts:7 | appshell/host | dynamic-loading | Yes | `loadChildren: () => import('mfe2/Routes')` carrega as rotas expostas por appshell/mfe2 (`./Routes` em appshell/mfe2/module-federation.config.ts:6) sob o caminho `mfe2`; remote declarado em appshell/host/module-federation.config.ts:17; rotas registradas por `provideRouter(appRoutes)` em appshell/host/src/app/app.config.ts:13, usado em appshell/host/src/bootstrap.ts:5 |
| src-remote-import | appshell/host/src/app/app.routes.ts:11 | appshell/host | dynamic-loading | Yes | `loadChildren: () => import('mfe1/Routes')` carrega as rotas expostas por appshell/mfe1 (`./Routes` em appshell/mfe1/module-federation.config.ts:6) sob o caminho `mfe1`; mesma cadeia de registro da linha 7 |
| src-remote-import | appshell/host/src/app/app.routes.ts:16 | appshell/host | dynamic-loading | Undetermined | `import('mfe1/GreetingRoutes')` sob o caminho `greeting` (appshell/host/src/app/app.routes.ts:13-17), mas appshell/mfe1 não expõe `./GreetingRoutes`: só `./Routes` e `./GreetingComponent` (appshell/mfe1/module-federation.config.ts:5-9); ver Notas |
| src-async-bootstrap | appshell/host/src/main.ts:1 | appshell/host | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (appshell/host/src/bootstrap.ts:1-5); interno à unidade |
| src-async-bootstrap | appshell/mfe1/src/main.ts:1 | appshell/mfe1 | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap; interno à unidade |
| src-async-bootstrap | appshell/mfe2/src/main.ts:1 | appshell/mfe2 | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap; interno à unidade |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | appshell/host/src/app/app.routes.ts:4 | appshell/host | host-relationship | Yes | `appRoutes` declara sob quais caminhos o host usa mfe2, mfe1 e o greeting de mfe1 (appshell/host/src/app/app.routes.ts:4-22); registrado por `provideRouter(appRoutes)` em appshell/host/src/app/app.config.ts:13 e apresentado pelo menu e pelo `router-outlet` em appshell/host/src/app/app.html:1-5 e :17 |
| manual | libs/shared/data/src/lib/user.service.ts:11 | — | communication | Yes | `login()` grava o signal `isLoggenIn` do `UserService` (`providedIn: 'root'`, libs/shared/data/src/lib/user.service.ts:3-7; `logout()` em :14-16), disparado pelos botões do host (appshell/host/src/app/app.ts:18-23, appshell/host/src/app/app.html:6-15); o mesmo serviço é lido em appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877 e exibido em :9, no componente `RemoteEntry` (appshell/mfe1/src/app/remote-entry/entry.ts:6-8) das rotas `./Routes` que o host carrega |

## Resumo

Construções com composição: 4 (dynamic-loading: 2, host-relationship: 1, communication: 1).

## Notas

- `mfe1/GreetingRoutes` (appshell/host/src/app/app.routes.ts:16) está na tabela de rotas ativa e tem tipo declarado em appshell/host/src/remotes.d.ts:8-11, mas o módulo não está nos `exposes` de appshell/mfe1/module-federation.config.ts:5-9. O README.md:171-176 manda acrescentar `'./GreetingRoutes': 'appshell/mfe1/src/app/greeting/greeting.routes.ts'`, e o arquivo exibido logo abaixo (README.md:181-190) já não traz essa linha. Com o snapshot como está, o carregamento falharia em runtime; por isso `Undetermined`, e não `Yes`.
- O `UserService` só funciona como canal entre host e mfe1 se `@angular-monorepo/data` for uma instância compartilhada no runtime. Nenhum `module-federation.config.ts` declara `shared`; o compartilhamento vem do padrão do `withModuleFederation` do Nx (appshell/host/webpack.config.ts:1-9, appshell/mfe1/webpack.config.ts:1-9), que compartilha as bibliotecas do workspace mapeadas em tsconfig.base.json:17-22.
- O `Button` de `@angular-monorepo/button` é usado no host (appshell/host/src/app/app.ts:4) e importado em appshell/mfe1/src/app/remote-entry/entry.ts:4. É uma biblioteca de UI compartilhada, sem mecanismo de comunicação, e não virou linha.
- A busca do passo 4 achou ainda `import()` de arquivos locais em appshell/mfe1/src/app/app.routes.ts:7 e :12, appshell/mfe2/src/app/app.routes.ts:7 e appshell/mfe1/src/app/greeting/greeting.routes.ts:7, todos internos à unidade, e trechos de código no README.md, que não são construções.
- `apps/angular-monorepo` não tem construção de composição.
