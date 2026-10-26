---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
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

# 292 — jaideepsinghchauhan/Angular-MFE

## Leitura do repositório

Exemplo de tutorial (README.md) num workspace Nx com Angular, em boa parte gerado pelo scaffold da ferramenta (telas NxWelcome, comentários de exemplo nas configurações). `appshell/host` é o host e `appshell/mfe1` e `appshell/mfe2` são remotes de Module Federation. O host declara os dois pelo nome (appshell/host/module-federation.config.ts:17) e cada remote expõe a chave `./Routes`, que aponta para o seu `entry.routes.ts` (appshell/mfe1/module-federation.config.ts:4-6; appshell/mfe2/module-federation.config.ts:4-6). As três configurações são passadas a `withModuleFederation` de `@nx/module-federation/angular` (appshell/host/webpack.config.ts:1-2, 9, com arquivo idêntico nos dois remotes), e os builds as leem por `customWebpackConfig` (appshell/host/project.json:25-26). Não há URL de remote: o Nx resolve cada nome para o projeto do mesmo workspace, e o host sobe os remotes com o executor `@nx/angular:module-federation-dev-server` (appshell/host/project.json:61-64).

A composição é por rotas. O host carrega `mfe2/Routes` e `mfe1/Routes` em `loadChildren` e usa o `remoteRoutes` de cada um (appshell/host/src/app/app.routes.ts:4-12); as rotas são registradas por `provideRouter(appRoutes)` (appshell/host/src/app/app.config.ts:13) e apresentadas por um menu com `router-outlet` (appshell/host/src/app/app.html:1-5, 17). A rota `greeting` tenta carregar `mfe1/GreetingRoutes` (appshell/host/src/app/app.routes.ts:13-17), que tem tipo declarado em appshell/host/src/remotes.d.ts:8-11 mas não está entre os `exposes` de mfe1 (appshell/mfe1/module-federation.config.ts:5-9). O README.md:171-176 manda acrescentar essa chave, e o arquivo exibido logo abaixo (README.md:181-190) já não a traz; o tutorial ficou incompleto nesse ponto. Em sentido inverso, mfe1 expõe `./GreetingComponent` (appshell/mfe1/module-federation.config.ts:7-8), e nenhuma unidade o consome: é exposição sem consumidor e não virou relação.

A particularidade é o estado de login compartilhado. O `UserService` da biblioteca `libs/shared/data` guarda um signal (libs/shared/data/src/lib/user.service.ts:3-20); o host o altera pelos botões Login/Logout (appshell/host/src/app/app.ts:18-23; appshell/host/src/app/app.html:6-15) e o NxWelcome de mfe1 o lê e exibe (appshell/mfe1/src/app/remote-entry/nx-welcome.ts:9, 875-877). mfe2 não usa o serviço. Isso virou a relação 3. A biblioteca de UI `libs/shared/ui` (o botão) é usada pelo host e importada por mfe1, mas não troca mensagens e não é relação. A aplicação padrão `apps/angular-monorepo` é uma unidade isolada, sem construção de composição (revisão de código-fonte, Notas). O remote externo em appshell/host/module-federation.config.ts:9 é exemplo comentado do scaffold e não entrou como relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | appshell/host | appshell/mfe2 | host → remote | origem → destino | module-federation | Yes | Yes | appshell/host/module-federation.config.ts:17 (remote `mfe2`); appshell/mfe2/module-federation.config.ts:4-6 (`name: 'mfe2'`, expõe `./Routes`); appshell/host/webpack.config.ts:1-2, 9 e appshell/mfe2/webpack.config.ts:1-2, 9 (`withModuleFederation`); appshell/host/project.json:25-26 e appshell/mfe2/project.json:25-26 (`customWebpackConfig`) | appshell/host/src/app/app.routes.ts:7; appshell/host/src/app/app.routes.ts:4 |
| 2 | appshell/host | appshell/mfe1 | host → remote | origem → destino | module-federation | Yes | Yes | appshell/host/module-federation.config.ts:17 (remote `mfe1`); appshell/mfe1/module-federation.config.ts:4-9 (`name: 'mfe1'`, expõe `./Routes` e `./GreetingComponent`); appshell/host/webpack.config.ts:1-2, 9 e appshell/mfe1/webpack.config.ts:1-2, 9 (`withModuleFederation`); appshell/host/project.json:25-26 e appshell/mfe1/project.json:25-26 (`customWebpackConfig`) | appshell/host/src/app/app.routes.ts:11; appshell/host/src/app/app.routes.ts:16; appshell/host/src/app/app.routes.ts:4 |
| 3 | appshell/host | appshell/mfe1 | communication | origem → destino | events | Yes | Yes | appshell/host/webpack.config.ts:1-2, 9 e appshell/mfe1/webpack.config.ts:1-2, 9 (`withModuleFederation`, sem `shared` declarado); tsconfig.base.json:19 (alias `@angular-monorepo/data`) | libs/shared/data/src/lib/user.service.ts:11 |

## Observações

**1. appshell/host → appshell/mfe2.** O remote `mfe2` do host (appshell/host/module-federation.config.ts:17) corresponde à unidade appshell/mfe2 pelo `name: 'mfe2'` e pela chave `./Routes` (appshell/mfe2/module-federation.config.ts:4-6), que é o especificador importado em appshell/host/src/app/app.routes.ts:7; o arquivo exposto exporta `remoteRoutes` (appshell/mfe2/src/app/remote-entry/entry.routes.ts:4), que é o que o host lê. Não há URL nem `publicPath` declarados; a porta 4202 (appshell/mfe2/project.json:63) só corrobora. Ativa porque as duas linhas de código são `Yes` e `appRoutes` é registrado por appshell/host/src/app/app.config.ts:13. A linha appshell/host/src/app/app.routes.ts:4 (`appRoutes`) sustenta também a relação 2. A rota exposta mostra só o NxWelcome de mfe2 (appshell/mfe2/src/app/remote-entry/entry.ts:5-8).

**2. appshell/host → appshell/mfe1.** Mesma resolução: remote `mfe1` (appshell/host/module-federation.config.ts:17), `name: 'mfe1'` e `./Routes` (appshell/mfe1/module-federation.config.ts:4-6), import em appshell/host/src/app/app.routes.ts:11 e `remoteRoutes` em appshell/mfe1/src/app/remote-entry/entry.routes.ts:4; porta 4201 (appshell/mfe1/project.json:63). A linha appshell/host/src/app/app.routes.ts:16 (`mfe1/GreetingRoutes`, `Undetermined` na revisão de código-fonte) tem o mesmo trio e entrou nesta linha: o especificador nomeia o remote mfe1, mas a chave `./GreetingRoutes` não está em appshell/mfe1/module-federation.config.ts:5-9, e o módulo que ela deveria expor existe (appshell/mfe1/src/app/greeting/greeting.routes.ts:3-9). A relação segue `Ativa: Yes` pela linha :11; só o carregamento da rota `greeting` fica sem sustentação no snapshot. Os aliases `mfe1/Routes` e `mfe2/Routes` em tsconfig.base.json:20-21 servem à tipagem dos especificadores federados.

**3. appshell/host → appshell/mfe1 (communication).** Canal por serviço reativo compartilhado: `login()` e `logout()` gravam o signal `isLoggenIn` do `UserService` (`providedIn: 'root'`, libs/shared/data/src/lib/user.service.ts:3-16), chamados pelos botões do host (appshell/host/src/app/app.ts:18-23; appshell/host/src/app/app.html:6-15); o NxWelcome de mfe1 injeta o mesmo serviço e lê o signal (appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877), exibindo-o no template (:9). Esse componente está na rota `./Routes` que o host carrega (appshell/mfe1/src/app/remote-entry/entry.ts:3-8), então o estado de login do host aparece dentro de mfe1. Só o host escreve e só mfe1 lê, daí `origem → destino`. O mecanismo é `events`, como serviço reativo compartilhado da tabela de tipos. A configuração não declara `shared`; o canal depende do compartilhamento padrão das bibliotecas do workspace feito por `withModuleFederation` (appshell/host/webpack.config.ts:9; appshell/mfe1/webpack.config.ts:9), a partir do alias de tsconfig.base.json:19, como a revisão de código-fonte registra nas Notas. Ativa porque a linha libs/shared/data/src/lib/user.service.ts:11 é `Yes`.

## Resumo

Relações: 3 (host → remote: 2, communication: 1). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: apps/angular-monorepo.
