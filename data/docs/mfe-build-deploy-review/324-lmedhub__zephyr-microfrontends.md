---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Leitura do repositório

O frontend fica em `frontend/`, com quatro aplicações Rspack em `frontend/apps/`, e o repositório
tem também um backend Go em `backend/`. Não há workspace: o `install:all` da raiz instala cada
aplicação à parte (frontend/package.json:6). Cada aplicação tem `build` próprio,
`NODE_ENV=production rspack build` (frontend/apps/host/package.json:9;
frontend/apps/remote-header/package.json:5; frontend/apps/remote-footer/package.json:5;
frontend/apps/url-shortener/package.json:5), e o `frontend/package.json` só entra no diretório de
cada uma para rodá-lo (`build:host`, `build:header`, `build:footer`, `build:shortener`), com
`build:all` encadeando os quatro, remotes antes do host (frontend/package.json:12-16). O
`clean:build` apaga `apps/*/dist` (frontend/package.json:28), ou seja, cada build sai no `dist` da
própria aplicação, que fica fora do git (.gitignore:85).

A publicação vem do Zephyr Cloud. Os quatro `rspack.config.ts` exportam a configuração envolvida
em `withZephyr()` do `zephyr-webpack-plugin` (frontend/apps/host/rspack.config.ts:5, 7;
frontend/apps/remote-header/rspack.config.ts:5, 7; frontend/apps/remote-footer/rspack.config.ts:5, 7;
frontend/apps/url-shortener/rspack.config.ts:3, 5), plugin de build que envia o resultado de cada
build ao Zephyr Cloud; foi esse o artefato de deploy apontado pela revisão estrutural. Há outros
sinais de uso do serviço: o `.gitignore` ignora a pasta `.zephyr` (.gitignore:118-119), e o host
declara `zephyr:dependencies` com `remote-header@^1.0.0` e `remote-footer@^1.0.0`
(frontend/apps/host/package.json:4-7). O snapshot não tem mais nenhuma configuração da Zephyr
(nem o endereço onde cada aplicação fica publicada), e o host continua apontando os remotes para
`localhost` fixo (frontend/apps/host/rspack.config.ts:84-88). O README só descreve o projeto como
uso de "Zephyr Cloud" e lista as portas locais (frontend/README.md:3, 7-9).

Fora do Zephyr, só há configuração de desenvolvimento: o `devServer` de cada aplicação, com portas
3000 a 3003 (frontend/apps/host/rspack.config.ts:17-18; frontend/apps/remote-header/rspack.config.ts:13-14;
frontend/apps/remote-footer/rspack.config.ts:13-14; frontend/apps/url-shortener/rspack.config.ts:11-12),
e os scripts `serve`/`start` com `rspack serve` (frontend/apps/host/package.json:11-13;
frontend/apps/url-shortener/package.json:7-8), disparados juntos por `serve:all` e `start:all`
(frontend/package.json:21, 26). Os `serve:header` e `serve:footer` da raiz chamam um script `serve`
que essas duas aplicações não têm (frontend/package.json:18-19; frontend/apps/remote-header/package.json:4-8;
frontend/apps/remote-footer/package.json:4-8). As ocorrências `ops-cors` do `matches.csv` são os
cabeçalhos `Access-Control-Allow-Origin: *` desses `devServer` dos três remotes
(frontend/apps/remote-header/rspack.config.ts:17-19; frontend/apps/remote-footer/rspack.config.ts:17-19;
frontend/apps/url-shortener/rspack.config.ts:15-17), e a `cfg-public-path` é o `publicPath: "auto"`
do host (frontend/apps/host/rspack.config.ts:13-15). O host fixa `mode: "development"` na
configuração (frontend/apps/host/rspack.config.ts:12), mesmo no `build` de produção.

Os artefatos `ops-dockerfile`, `ops-compose-service` e `ops-deployment-file` são todos do backend
Go e não cobrem nenhuma aplicação frontend. O `backend/Dockerfile` compila o servidor em duas
etapas (backend/Dockerfile:1, 10, 12), e o `backend/docker-compose.yml` sobe esse serviço na porta
8080 com Postgres e Redis (backend/docker-compose.yml:4-9, 17-18, 27-28). O Dockerfile gera o
binário `url-shortener` (backend/Dockerfile:10), mas copia e executa `backend`
(backend/Dockerfile:16, 18), nome que só o `Makefile` produz (backend/Makefile:8-9). Não há
workflow de CI no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend/apps/host | separado | separado | `http://localhost:3000` em desenvolvimento (frontend/apps/host/rspack.config.ts:18; frontend/apps/host/package.json:12) | No | frontend/apps/host/package.json:9 (`rspack build`); frontend/apps/host/rspack.config.ts:7 (`withZephyr()`, publicação no Zephyr Cloud); frontend/apps/host/rspack.config.ts:82-94 (federation `host`); frontend/package.json:12, :16 (`build:host`, `build:all`) |
| 2 | frontend/apps/remote-footer | separado | separado | `http://localhost:3002` em desenvolvimento (frontend/apps/remote-footer/rspack.config.ts:14; frontend/apps/host/rspack.config.ts:86) | No | frontend/apps/remote-footer/package.json:5 (`rspack build`); frontend/apps/remote-footer/rspack.config.ts:7 (`withZephyr()`, publicação no Zephyr Cloud); frontend/apps/remote-footer/rspack.config.ts:73-79 (federation `remote_footer`, gera `remoteEntry.js`); frontend/package.json:14, :16 (`build:footer`, `build:all`) |
| 3 | frontend/apps/remote-header | separado | separado | `http://localhost:3001` em desenvolvimento (frontend/apps/remote-header/rspack.config.ts:14; frontend/apps/host/rspack.config.ts:85) | No | frontend/apps/remote-header/package.json:5 (`rspack build`); frontend/apps/remote-header/rspack.config.ts:7 (`withZephyr()`, publicação no Zephyr Cloud); frontend/apps/remote-header/rspack.config.ts:73-79 (federation `remote_header`, gera `remoteEntry.js`); frontend/package.json:13, :16 (`build:header`, `build:all`) |
| 4 | frontend/apps/url-shortener | separado | separado | `http://localhost:3003` em desenvolvimento (frontend/apps/url-shortener/rspack.config.ts:12; frontend/apps/host/rspack.config.ts:87) | No | frontend/apps/url-shortener/package.json:5 (`rspack build`); frontend/apps/url-shortener/rspack.config.ts:5 (`withZephyr()`, publicação no Zephyr Cloud); frontend/apps/url-shortener/rspack.config.ts:74-79 (federation `url_shortener`, gera `remoteEntry.js`); frontend/package.json:15, :16 (`build:shortener`, `build:all`) |

## Observações

**1. frontend/apps/host.** Build Rspack próprio, com entrada `src/App.tsx`
(frontend/apps/host/rspack.config.ts:9-10). Os remotes não entram no artefato do host: ele os
carrega em tempo de execução pelas URLs `localhost` de frontend/apps/host/rspack.config.ts:84-88,
que ficam embutidas no build; se o `withZephyr()` as troca na publicação, isso não aparece no
snapshot. Deploy separado pelo `withZephyr()` da própria configuração
(frontend/apps/host/rspack.config.ts:7), o mesmo arranjo das outras aplicações; não há endereço
publicado no snapshot, e o `serve` na porta 3000 (frontend/apps/host/package.json:12) é o servidor
do Rspack, não publicação. A versão `1.0.0` (frontend/apps/host/package.json:3) não aparece em
nenhuma publicação. O `zephyr:dependencies` (frontend/apps/host/package.json:4-7) cita as versões
dos remotes header e footer, não a do host, e não cita o url-shortener.

**2. frontend/apps/remote-footer.** Build próprio, que gera o `remoteEntry.js` do remote
`remote_footer` (frontend/apps/remote-footer/rspack.config.ts:74-75), e deploy separado pelo
`withZephyr()` da sua configuração (frontend/apps/remote-footer/rspack.config.ts:7). Porta 3002 no
`devServer` (frontend/apps/remote-footer/rspack.config.ts:14), a mesma que o host usa
(frontend/apps/host/rspack.config.ts:86). A versão `1.0.0` (frontend/apps/remote-footer/package.json:3)
é a faixa que o host pede em `zephyr:dependencies` (frontend/apps/host/package.json:6), mas o
snapshot não mostra essa versão sendo usada na publicação do footer, por isso `No`.

**3. frontend/apps/remote-header.** Mesmo arranjo do footer, com o remote `remote_header`
(frontend/apps/remote-header/rspack.config.ts:74-75), `withZephyr()` próprio
(frontend/apps/remote-header/rspack.config.ts:7) e porta 3001 (frontend/apps/remote-header/rspack.config.ts:14;
frontend/apps/host/rspack.config.ts:85). A versão `1.0.0` (frontend/apps/remote-header/package.json:3)
casa com a faixa do `zephyr:dependencies` do host (frontend/apps/host/package.json:5), com a mesma
limitação do footer.

**4. frontend/apps/url-shortener.** Remote Vue 3 com build Rspack próprio (com `vue-loader`,
frontend/apps/url-shortener/rspack.config.ts:33-46), que gera o `remoteEntry.js` do remote
`url_shortener` (frontend/apps/url-shortener/rspack.config.ts:75-76), e deploy separado pelo
`withZephyr()` da sua configuração (frontend/apps/url-shortener/rspack.config.ts:5). Porta 3003
(frontend/apps/url-shortener/rspack.config.ts:12; frontend/apps/host/rspack.config.ts:87). É o único
remote com script `serve` (frontend/apps/url-shortener/package.json:8), também `rspack serve`. Não
consta no `zephyr:dependencies` do host, e sua versão `1.0.0`
(frontend/apps/url-shortener/package.json:3) não aparece em publicação. Também fica fora dos scripts
`lint` e `type-check` da raiz (frontend/package.json:29-30), que não fazem parte do build.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
