---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
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

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Leitura do repositório

Monorepo pnpm (pnpm-workspace.yaml:1-3) orquestrado por Turborepo. O script `build` da raiz é `turbo run build` (package.json:19-20), que dispara o `build` de cada pacote do workspace; a task `build` do Turborepo declara as saídas `.output/**`, `.nuxt/**` e `dist/**` (turbo.json:8-11), ignoradas pelo git (.gitignore:5-13). Cada remote Vue tem o seu `webpack --config webpack.config.js --mode production` (por exemplo apps/mfe-vue2-checkout/package.json:7), que gera um `dist/` próprio com o `remoteEntry.js` (apps/mfe-vue2-checkout/webpack.config.js:11-16, :66-69). O shell Nuxt tem `nuxt build` e `start: node .output/server/index.mjs` (apps/shell/package.json:7-8). Os quatro `webpack.config.js` importam aliases de scripts/webpack.aliases.js:13-17, que apontam `@mfe/shared` para o código-fonte de `packages/shared`; esse pacote não tem build próprio e entra no bundle de cada aplicação que o usa.

Não há artefato de deploy no snapshot: nem Dockerfile, compose, workflow de CI, manifesto de deploy ou configuração de hospedagem ou proxy. O que existe é para execução local. scripts/start-local.sh:18-22 sobe os cinco servidores de desenvolvimento em paralelo, com os endereços `localhost:3000` a `3004` listados em scripts/start-local.sh:9-13. Os scripts `dev:remote:*` (package.json:26-30) servem o `dist/` já construído de cada remote numa porta própria por um servidor estático com CORS (scripts/dev-remote-server.js:32-53), descrito como útil para rodar o shell em desenvolvimento contra remotes pré-construídos (scripts/dev-remote-server.js:4-6). scripts/health-check.js:14-19 consulta o `remoteEntry.js` de cada remote, com URLs trocáveis por variáveis de ambiente, e o comentário diz que deve rodar antes de iniciar o shell "in production/CI" (scripts/health-check.js:5), mas nenhum artefato do snapshot o chama nem publica as aplicações. O README só registra `pnpm build:all` (README.md:99-103).

As ocorrências do `matches.csv` são todas da configuração webpack dos remotes: as quatro `cfg-public-path` são o `output.publicPath` fixo em `http://localhost:300x/` (apps/mfe-vue2-admin/webpack.config.js:14; apps/mfe-vue2-checkout/webpack.config.js:14; apps/mfe-vue3-dashboard/webpack.config.js:13; apps/mfe-vue3-profile/webpack.config.js:13), e as quatro `ops-cors` são o cabeçalho `Access-Control-Allow-Origin` do `devServer` (apps/mfe-vue2-admin/webpack.config.js:77; apps/mfe-vue2-checkout/webpack.config.js:79; apps/mfe-vue3-dashboard/webpack.config.js:67; apps/mfe-vue3-profile/webpack.config.js:67). Não há ocorrência `ci-*`. O `publicPath` fixo em `localhost` entra no build de produção, enquanto o registro do shell só deixa trocar a URL do `remoteEntry.js` por variável de ambiente (packages/shared/src/registry.ts:3-9), como já registrado na revisão de composição. O conjunto é uma configuração de demonstração e desenvolvimento, sem publicação no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/mfe-vue2-admin | separado | não observado | `http://localhost:3002/` (apps/mfe-vue2-admin/webpack.config.js:14, :75; package.json:27) | No | apps/mfe-vue2-admin/webpack.config.js:8-79 (configuração webpack própria, saída `dist`, `ModuleFederationPlugin` `mfe_admin` com `remoteEntry.js`); apps/mfe-vue2-admin/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 2 | apps/mfe-vue2-checkout | separado | não observado | `http://localhost:3001/` (apps/mfe-vue2-checkout/webpack.config.js:14, :77; package.json:26) | No | apps/mfe-vue2-checkout/webpack.config.js:8-81 (configuração webpack própria, saída `dist`, `ModuleFederationPlugin` `mfe_checkout` com `remoteEntry.js`); apps/mfe-vue2-checkout/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 3 | apps/mfe-vue3-dashboard | separado | não observado | `http://localhost:3004/` (apps/mfe-vue3-dashboard/webpack.config.js:13, :65; package.json:29) | No | apps/mfe-vue3-dashboard/webpack.config.js:7-69 (configuração webpack própria, saída `dist`, `ModuleFederationPlugin` `mfe_dashboard` com `remoteEntry.js`); apps/mfe-vue3-dashboard/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 4 | apps/mfe-vue3-profile | separado | não observado | `http://localhost:3003/` (apps/mfe-vue3-profile/webpack.config.js:13, :65; package.json:28) | No | apps/mfe-vue3-profile/webpack.config.js:7-69 (configuração webpack própria, saída `dist`, `ModuleFederationPlugin` `mfe_profile` com `remoteEntry.js`); apps/mfe-vue3-profile/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 5 | apps/shell | separado | não observado | `http://localhost:3000` em desenvolvimento (apps/shell/package.json:6; scripts/start-local.sh:9) | No | apps/shell/nuxt.config.ts:58-91 (configuração Nuxt própria, `ssr: true`); apps/shell/package.json:7-8 (`nuxt build`, `start` do servidor `.output`); turbo.json:8-11 (saídas `.output/**`, `.nuxt/**`); package.json:19 (`turbo run build`) |

## Observações

**1. apps/mfe-vue2-admin.** Build `separado`: o `webpack --mode production` próprio (apps/mfe-vue2-admin/package.json:7) usa a configuração da aplicação, com saída em `apps/mfe-vue2-admin/dist` (apps/mfe-vue2-admin/webpack.config.js:11-16) e o container `mfe_admin` em `remoteEntry.js` (apps/mfe-vue2-admin/webpack.config.js:64-71); o `turbo run build` da raiz só dispara esse build. O código de `packages/shared` entra no bundle pelos aliases (apps/mfe-vue2-admin/webpack.config.js:4), mas não é aplicação. Deploy `não observado`: o único servidor do `dist` é o `dev:remote:admin` na porta 3002 (package.json:27), script de desenvolvimento, e a porta 3002 do `devServer` (apps/mfe-vue2-admin/webpack.config.js:74-78) também é de desenvolvimento. O endereço `http://localhost:3002/` vem do `publicPath` fixo (apps/mfe-vue2-admin/webpack.config.js:14), que coincide com a URL padrão do registro do shell. Versão `1.0.0` num pacote `private` (apps/mfe-vue2-admin/package.json:3-4), sem uso em publicação: Versionamento `No`.

**2. apps/mfe-vue2-checkout.** Mesma forma da aplicação 1: build próprio (apps/mfe-vue2-checkout/package.json:7) com saída `dist` e container `mfe_checkout` (apps/mfe-vue2-checkout/webpack.config.js:11-16, :66-73), servido localmente pelo `dev:remote:checkout` na porta 3001 (package.json:26) ou pelo `devServer` (apps/mfe-vue2-checkout/webpack.config.js:76-80). Nenhum artefato publica o `dist`. Versão `1.0.0` de pacote `private` sem uso (apps/mfe-vue2-checkout/package.json:3-4).

**3. apps/mfe-vue3-dashboard.** Remote Vue 3 com a mesma estrutura: build próprio (apps/mfe-vue3-dashboard/package.json:7), saída `dist` e container `mfe_dashboard` (apps/mfe-vue3-dashboard/webpack.config.js:10-15, :53-61), servido localmente na porta 3004 pelo `dev:remote:dashboard` (package.json:29) ou pelo `devServer` (apps/mfe-vue3-dashboard/webpack.config.js:64-68). Deploy `não observado`; versão `1.0.0` de pacote `private` sem uso (apps/mfe-vue3-dashboard/package.json:3-4).

**4. apps/mfe-vue3-profile.** Igual à aplicação 3: build próprio (apps/mfe-vue3-profile/package.json:7), saída `dist` e container `mfe_profile` (apps/mfe-vue3-profile/webpack.config.js:10-15, :53-56), servido localmente na porta 3003 pelo `dev:remote:profile` (package.json:28) ou pelo `devServer` (apps/mfe-vue3-profile/webpack.config.js:64-68). Deploy `não observado`; versão `1.0.0` de pacote `private` sem uso (apps/mfe-vue3-profile/package.json:3-4).

**5. apps/shell.** Build `separado`: `nuxt build` (apps/shell/package.json:7) gera a saída `.output` só do shell (turbo.json:10); nenhum remote entra nela, porque o shell não importa os remotes e os carrega em execução pelo `remoteEntry.js` (apps/shell/nuxt.config.ts:64-66). Com `ssr: true` (apps/shell/nuxt.config.ts:59), o shell é um servidor Node, iniciado por `start` (apps/shell/package.json:8; package.json:21). Esse script executa o servidor construído, mas não empacota nem publica a aplicação, e nenhum artefato do snapshot o usa num deploy: Deploy `não observado`. O único endereço no snapshot é a porta 3000 do `nuxt dev` (apps/shell/package.json:6), repetida em scripts/start-local.sh:9. Versão `1.0.0` de pacote `private` sem uso (apps/shell/package.json:3-4).

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
