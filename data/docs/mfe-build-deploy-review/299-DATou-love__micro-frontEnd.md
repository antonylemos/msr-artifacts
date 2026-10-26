---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
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

# 299 — DATou-love/micro-frontEnd

## Leitura do repositório

Exemplo de qiankun com dois projetos independentes, sem `package.json` na raiz e sem workspace: o host Vue 3/Vite `main-vue3` e a sub-aplicação Vue 2/Vue CLI `sub-vue2`. Cada um tem o seu `package.json`, o seu `package-lock.json` e o seu script de build: `vue-tsc -b && vite build` no host (main-vue3/package.json:8) e `vue-cli-service build` na sub-app (sub-vue2/package.json:7). Não há script que dispare os dois builds juntos.

Tudo o que existe é configuração de desenvolvimento. O host roda o servidor do Vite na porta 7100 com `cors: true` (main-vue3/vite.config.ts:8-11), a única ocorrência `ops-*` do `matches.csv` (`ops-cors` em main-vue3/vite.config.ts:10), que não é artefato de deploy. A sub-app roda o dev server do Vue CLI na porta 8081 com `Access-Control-Allow-Origin: *` (sub-vue2/vue.config.js:5-10) e gera um bundle UMD `subVue2` (sub-vue2/vue.config.js:12-20); o `publicPath: '/sub-vue2/'` está comentado (sub-vue2/vue.config.js:22). O host aponta para as sub-apps só por endereços `localhost` (main-vue3/src/main.ts:11-22). Não há Dockerfile, compose, workflow de CI, proxy nem configuração de hospedagem no snapshot, e o `matches.csv` não tem ocorrências `ci-*` nem `cfg-public-path`.

A terceira unidade registrada pelo host, `sub-react16` (`//localhost:3000`, main-vue3/src/main.ts:17-22), não tem código no snapshot e não é linha da revisão estrutural.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | main-vue3 | separado | não observado | — | No | main-vue3/package.json:8 (`vue-tsc -b && vite build`); main-vue3/vite.config.ts:6-17 (configuração Vite própria) |
| 2 | sub-vue2 | separado | não observado | — | No | sub-vue2/package.json:7 (`vue-cli-service build`); sub-vue2/vue.config.js:12-20 (bundle UMD `subVue2`) |

## Observações

**1. main-vue3.** O host tem build Vite próprio, que gera um artefato só dele (main-vue3/package.json:8, main-vue3/vite.config.ts:6-17). Nenhum artefato do snapshot empacota ou publica esse build; os scripts `dev` e `preview` (main-vue3/package.json:7, main-vue3/package.json:9) e o servidor na porta 7100 (main-vue3/vite.config.ts:9) são de desenvolvimento, por isso o Deploy é `não observado` e não há endereço de publicação. O `version: "0.0.0"` (main-vue3/package.json:4) não é usado em publicação, e o pacote é `private` (main-vue3/package.json:3).

**2. sub-vue2.** A sub-app tem build próprio com `vue-cli-service build` (sub-vue2/package.json:7), configurado para sair como biblioteca UMD `subVue2` com `chunkLoadingGlobal` próprio (sub-vue2/vue.config.js:15-18), como o qiankun espera. A porta 8081 (sub-vue2/vue.config.js:6), que corresponde ao `entry: '//localhost:8081'` do host (main-vue3/src/main.ts:13), é do dev server (`serve`, sub-vue2/package.json:6), por isso não conta como deploy nem como endereço de publicação. O `version: "0.1.0"` (sub-vue2/package.json:3) não tem uso em publicação, e o pacote é `private` (sub-vue2/package.json:4).

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
