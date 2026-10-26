---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
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

# 327 — samhoooo/module-federation-demo-mf2

## Leitura do repositório

Duas aplicações React/Rspack independentes, `header-app` (remote) e `home-app` (host), cada uma com `package.json` e `rspack.config.js` próprios e sem workspace. A raiz não tem `package.json`, e o `package-lock.json` da raiz não declara pacotes (package-lock.json:1-6). Cada aplicação tem o script `build` com `rspack build` e o `start` com `rspack serve` (header-app/package.json:9-13; home-app/package.json:9-13). O README manda instalar e rodar cada uma com `npm start` no seu diretório, primeiro o `header-app` (README.md:19-25), e abrir o host em `http://localhost:4000` e o remote em `http://localhost:4001` (README.md:27-28).

Tudo o que existe é configuração de desenvolvimento. As duas configurações usam `mode: "development"` (header-app/rspack.config.js:8; home-app/rspack.config.js:7), fixam o `publicPath` em `localhost` (header-app/rspack.config.js:23; home-app/rspack.config.js:12) e definem a porta do servidor de desenvolvimento (header-app/rspack.config.js:9-10; home-app/rspack.config.js:8-9). O host busca o remote em `http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:51-53). A única ocorrência `ops-*` é o cabeçalho `Access-Control-Allow-Origin: *` do servidor de desenvolvimento do `header-app` (header-app/rspack.config.js:11-13), que deixa o host, em outra origem, carregar o remote; o mesmo `devServer` serve o `dist/` como estático para os arquivos de tipos do plugin de `dts` (header-app/rspack.config.js:14-20). Não há Dockerfile, compose, workflow de CI, configuração de hospedagem nem proxy no snapshot, e o `.gitignore` exclui o `dist` (.gitignore:2).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | header-app | separado | não observado | `http://localhost:4001/` (header-app/rspack.config.js:10, 23) | No | header-app/rspack.config.js:6-81 (configuração Rspack própria, remote `HeaderApp`); header-app/package.json:11 (`rspack build`) |
| 2 | home-app | separado | não observado | `http://localhost:4000/` (home-app/rspack.config.js:9, 12) | No | home-app/rspack.config.js:5-72 (configuração Rspack própria, host `HomeApp`); home-app/package.json:11 (`rspack build`) |

## Observações

**1. header-app.** Build próprio (header-app/package.json:11), com saída em `remoteEntry.js` e no manifesto do Module Federation (header-app/rspack.config.js:57-63). O deploy é `não observado`: a aplicação só é servida pelo `rspack serve` (header-app/package.json:10), comando de desenvolvimento, na porta 4001. O cabeçalho CORS e o `static` do `devServer` (header-app/rspack.config.js:11-20) também são de desenvolvimento. A versão `0.1.0` (header-app/package.json:3) não é usada em publicação, e o pacote é `private` (header-app/package.json:4).

**2. home-app.** Build próprio (home-app/package.json:11), separado do remote: o código do `header-app` só chega em runtime pelo manifesto em `localhost:4001` (home-app/rspack.config.js:51-53). O deploy é `não observado` pelo mesmo motivo do header-app: só há `rspack serve` na porta 4000 (home-app/package.json:10; home-app/rspack.config.js:8-9). A versão `0.1.0` (home-app/package.json:3) não é usada em publicação.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
