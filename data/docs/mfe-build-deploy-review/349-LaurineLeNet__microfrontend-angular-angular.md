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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Leitura do repositório

O snapshot tem só três workspaces Angular lado a lado, `athletes`, `ranking` e `shell`, sem
`package.json` nem workspace na raiz (a raiz tem apenas `.gitignore`, .gitignore:1-2). Cada
diretório tem seu próprio `package.json` com `ng build` (athletes/package.json:7;
ranking/package.json:7; shell/package.json:7) e seu próprio `angular.json`, cujo alvo `build` usa
o builder `@angular-architects/native-federation:build` sobre um alvo `esbuild` com
`@angular/build:application`, em produção por padrão (athletes/angular.json:16-29, 43-44; o mesmo
em ranking/angular.json e shell/angular.json). Sem `outputPath`, cada build sai no
`dist/<projeto>` do próprio diretório. Os três arquivos são iguais fora o nome e a porta de
desenvolvimento (4201, 4202 e 4200, athletes/angular.json:93;
ranking/angular.json:93; shell/angular.json:93), que só vale para `ng serve`.

A publicação é por Cloudflare Workers com assets estáticos: cada diretório tem um `wrangler.jsonc`
com um worker próprio (`mf-angular-athletes`, `mf-angular-ranking`, `mf-angular-shell`) que serve
o `./dist/<projeto>/browser` daquele diretório como SPA (athletes/wrangler.jsonc:3, 13-16;
ranking/wrangler.jsonc:3, 13-16; shell/wrangler.jsonc:3, 13-16), e `wrangler` é dependência de
desenvolvimento de cada um (athletes/package.json:39; ranking/package.json:39;
shell/package.json:39). Nenhum script chama `wrangler deploy`, e não há CI, Dockerfile nem
compose; a publicação seria feita à mão com o wrangler. Há indício de que os workers dos remotes
estão em uso: o manifesto do shell aponta para `remoteEntry.json` em
`mf-angular-athletes.lenetlaurine.workers.dev` e `mf-angular-ranking.lenetlaurine.workers.dev`
(shell/public/federation.manifest.json:2-3), hosts que coincidem com os nomes dos workers. O
endereço do worker do shell não aparece no snapshot.

As ocorrências `ops-*` do `matches.csv` são os `_headers` dos dois remotes
(`ops-deployment-file` e `ops-cors`): athletes/public/_headers:1-2 e ranking/public/_headers:1-2
liberam `Access-Control-Allow-Origin: *` para todos os caminhos, o que permite que o shell, em
outro worker, busque o `remoteEntry.json` e os módulos. O `public/` entra nos assets do build
(athletes/angular.json:48-53), e esse formato de `_headers` é o que o Cloudflare lê nos assets
estáticos. O shell não tem `_headers`. Não há ocorrência `ci-*` nem `cfg-public-path`. Os README
de cada diretório são os gerados pelo Angular CLI e só descrevem `ng build` (athletes/README.md:29-37).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | athletes | separado | separado | `https://mf-angular-athletes.lenetlaurine.workers.dev` (shell/public/federation.manifest.json:2; athletes/wrangler.jsonc:3); `http://localhost:4201` em desenvolvimento (athletes/angular.json:93) | No | athletes/angular.json:16-29 (alvo `build` com native federation sobre `esbuild`, athletes/angular.json:43-44); athletes/package.json:7 (`ng build`); athletes/wrangler.jsonc:3-16 (worker `mf-angular-athletes` publicando `./dist/athletes/browser`); athletes/public/_headers:1-2 (CORS `*`) |
| 2 | ranking | separado | separado | `https://mf-angular-ranking.lenetlaurine.workers.dev` (shell/public/federation.manifest.json:3; ranking/wrangler.jsonc:3); `http://localhost:4202` em desenvolvimento (ranking/angular.json:93) | No | ranking/angular.json:16-29 (alvo `build` com native federation sobre `esbuild`, ranking/angular.json:43-44); ranking/package.json:7 (`ng build`); ranking/wrangler.jsonc:3-16 (worker `mf-angular-ranking` publicando `./dist/ranking/browser`); ranking/public/_headers:1-2 (CORS `*`) |
| 3 | shell | separado | separado | worker `mf-angular-shell`, sem endereço no snapshot (shell/wrangler.jsonc:3); `http://localhost:4200` em desenvolvimento (shell/angular.json:93) | No | shell/angular.json:16-29 (alvo `build` com native federation sobre `esbuild`, shell/angular.json:43-44); shell/package.json:7 (`ng build`); shell/wrangler.jsonc:3-16 (worker `mf-angular-shell` publicando `./dist/shell/browser`) |

## Observações

**1. athletes.** O build é próprio: `ng build` no diretório gera o `dist/athletes` só desta
aplicação (athletes/package.json:7; athletes/angular.json:16-29). O deploy também: o worker
`mf-angular-athletes` publica apenas `./dist/athletes/browser` (athletes/wrangler.jsonc:3, 14), e
o shell consome o remote exatamente nesse host (shell/public/federation.manifest.json:2). Os
`_headers` com CORS aberto (athletes/public/_headers:1-2) existem para esse consumo entre origens.
A versão é `0.0.0` num pacote `private` (athletes/package.json:3, 11), sem uso na publicação.

**2. ranking.** Mesmo arranjo de athletes: build próprio (ranking/package.json:7;
ranking/angular.json:16-29), worker próprio `mf-angular-ranking` publicando
`./dist/ranking/browser` (ranking/wrangler.jsonc:3, 14), consumido pelo shell nesse host
(shell/public/federation.manifest.json:3), com CORS aberto (ranking/public/_headers:1-2). Versão
`0.0.0` em pacote `private` (ranking/package.json:3, 11).

**3. shell.** Build próprio (shell/package.json:7; shell/angular.json:16-29), e o
`federation.manifest.json` com as URLs dos remotes vai junto, porque o `public/` entra nos assets
(shell/public/federation.manifest.json:1-4). O deploy é o worker próprio `mf-angular-shell`, que
publica `./dist/shell/browser` (shell/wrangler.jsonc:3, 14); diferente dos remotes, nada no
snapshot dá o endereço desse worker, e o shell não tem `_headers`, porque não é carregado por
outra origem. Versão `0.0.0` em pacote `private` (shell/package.json:3, 11).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (separado: 3). Versionamento independente: 0.
