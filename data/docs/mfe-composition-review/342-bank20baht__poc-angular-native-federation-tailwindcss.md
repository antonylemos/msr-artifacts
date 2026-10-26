---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
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

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Leitura do repositório

Prova de conceito em Angular 20 com duas unidades, `host` e `remote`, cada uma com seu próprio workspace Angular, ligadas por **Native Federation** (`@angular-architects/native-federation`). O host registra o remote antes do bootstrap, apontando para `http://localhost:4201/remoteEntry.json` (host/src/main.ts:3-5), e o carrega em duas rotas: a rota vazia monta o componente exposto `./Component` e a rota `flights` monta o conjunto de rotas exposto `./routes` (host/src/app/app.routes.ts:7-29). O remote declara `name: 'remote'` e expõe esses dois módulos (remote/federation.config.js:5-10); o resultado aparece no `<router-outlet>` do host (host/src/app/app.html:2). Cada carga tem um fallback local se o remote não responder (host/src/app/app.routes.ts:13-16, 24-27). É um repositório de demonstração, sem Dockerfile, CI ou configuração de hospedagem; as URLs são de desenvolvimento local.

O assunto declarado do projeto é o estilo: o Tailwind do host varre o código-fonte do remote (host/src/styles.css:4) para gerar as classes que os templates do remote usam quando montados dentro do host. É um acoplamento de build no nível de CSS, não uma relação de composição em tempo de execução, e não virou linha da tabela. O host também declara um módulo `remote/Styles?inline` (host/src/remote.d.ts:1) que nenhum arquivo importa e que o remote não expõe (remote/federation.config.js:7-10). O `initFederation()` do remote (remote/src/main.ts:3) não resolve outra unidade. Não há troca de mensagens entre as unidades.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host | remote | host → remote | origem → destino | native-federation | Yes | Yes | host/src/main.ts:3-5 (`initFederation` com `remote` → `http://localhost:4201/remoteEntry.json`); remote/federation.config.js:5-10 (`name: 'remote'`, expõe `./Component` e `./routes`); remote/angular.json:108 (porta 4201 do remote) | host/src/app/app.routes.ts:1; host/src/app/app.routes.ts:11; host/src/app/app.routes.ts:22; host/src/main.ts:1; host/src/main.ts:3; host/src/app/app.routes.ts:7 |

## Observações

**1. host → remote.** O nome `remote` usado em `initFederation` (host/src/main.ts:4) e em `loadRemoteModule` (host/src/app/app.routes.ts:11, 22) corresponde ao `name: 'remote'` de remote/federation.config.js:5, e os módulos pedidos, `./Component` e `./routes`, aos `exposes` de remote/federation.config.js:8-9, que apontam para o `App` (remote/src/app/app.ts:10) e para `APP_ROUTES` (remote/src/app/modules/home/home.routes.ts:3); a porta 4201 (remote/angular.json:108) só corrobora. As duas cargas dão o mesmo trio e ficam numa linha. Ativa `Yes`: as rotas são registradas por `provideRouter(routes)` (host/src/app/app.config.ts:10), e as linhas da revisão de código-fonte que sustentam a relação são todas `Yes`. Os fallbacks locais não mudam a direção nem o destino.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
