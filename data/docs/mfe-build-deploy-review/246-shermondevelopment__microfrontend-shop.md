---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Leitura do repositório

Monorepo de npm workspaces (package.json:4-8) com quatro aplicações React/Vite unidas por Module Federation: o shell `apps/host` e os remotes `apps/header`, `apps/footer` e `apps/products`. Cada aplicação tem `vite.config.ts` próprio, com `outDir` em `dist/<app>` na raiz (apps/host/vite.config.ts:90-96; apps/header/vite.config.ts:63-69; apps/footer/vite.config.ts:47-53; apps/products/vite.config.ts:63-69), e um script `build` no seu `package.json`. O `build` da raiz só encadeia `tsc -b` e os quatro `vite build` (package.json:18-22); os scripts `dev:*` e `preview:*` (package.json:12-17 e :25-29) e os blocos `server`/`preview` das configs, com portas 3000-3003 e CORS aberto (`cors: true`, `Access-Control-Allow-Origin: '*'`, ex.: apps/host/vite.config.ts:67-89), são de desenvolvimento e não contam como deploy.

O deploy de produção está no único workflow, .github/workflows/ci-cd.yml. O job `detect` calcula os apps afetados pelo diff (.github/workflows/ci-cd.yml:30-60) com scripts/ci/affected-workspaces.mjs, que marca cada app por mudanças em `apps/<app>/` (scripts/ci/affected-workspaces.mjs:37-41) e marca os quatro quando muda algo compartilhado (`package.json`, `packages/*`, `.github/` etc.; :4-13 e :43-44). O job `deploy`, só em push na `main`, roda em matriz sobre esses apps (.github/workflows/ci-cd.yml:85-99): constrói o app pelo seu workspace (:116-117) e sincroniza `dist/<app>` num bucket S3 próprio, invalidando uma distribuição CloudFront própria (:125-152), com bucket e distribuição vindos de secrets por app (ex.: `AWS_S3_BUCKET_HEADER`, `AWS_CLOUDFRONT_DISTRIBUTION_HEADER`, :131-132). O job `rollback`, por `workflow_dispatch`, faz o mesmo para um único app escolhido e um ref dado (:9-27, :181-248). As URLs dos remotes usadas no build do host vêm de variáveis do repositório (:102-104), cujos valores não estão no snapshot; também não estão os nomes dos buckets nem os endereços das distribuições. O README lista quatro endereços CloudFront, um por app (README.md:142-162), mas é documentação e não decide a coluna Deploy.

O versionamento é único para o repositório: o job `release` roda `semantic-release` (.github/workflows/ci-cd.yml:154-179; package.json:31), configurado para gerar CHANGELOG.md e versionar só o `package.json` e o `package-lock.json` da raiz (.releaserc.json:18-28), com tags e releases do GitHub (:29). O CHANGELOG.md registra versões do repositório inteiro (CHANGELOG.md:1 e :13). Os `package.json` das aplicações ficam em `0.0.0` e `private` (ex.: apps/host/package.json:3-4), e o job `release` não depende do `deploy` nem publica aplicação alguma. Não há Dockerfile, compose nem outra configuração de hospedagem no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/footer | separado | separado | bucket `AWS_S3_BUCKET_FOOTER` e distribuição `AWS_CLOUDFRONT_DISTRIBUTION_FOOTER`, valores fora do snapshot (.github/workflows/ci-cd.yml:134-137, :151-152); `http://localhost:3002` em desenvolvimento (apps/footer/vite.config.ts:25-27) | No | apps/footer/vite.config.ts:47-53 (build próprio, saída `dist/footer`); apps/footer/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117 (build pelo workspace na matriz); .github/workflows/ci-cd.yml:134-137, :151-152 (S3 e CloudFront próprios); .github/workflows/ci-cd.yml:230-233, :247-248 (rollback próprio) |
| 2 | apps/header | separado | separado | bucket `AWS_S3_BUCKET_HEADER` e distribuição `AWS_CLOUDFRONT_DISTRIBUTION_HEADER`, valores fora do snapshot (.github/workflows/ci-cd.yml:129-132, :151-152); `http://localhost:3001` em desenvolvimento (apps/header/vite.config.ts:41-43) | No | apps/header/vite.config.ts:63-69 (build próprio, saída `dist/header`); apps/header/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:129-132, :151-152 (S3 e CloudFront próprios); .github/workflows/ci-cd.yml:225-228, :247-248 (rollback próprio) |
| 3 | apps/host | separado | separado | bucket `AWS_S3_BUCKET_HOST` e distribuição `AWS_CLOUDFRONT_DISTRIBUTION_HOST`, valores fora do snapshot (.github/workflows/ci-cd.yml:144-147, :151-152); `http://localhost:3000` em desenvolvimento (apps/host/vite.config.ts:68-69) | No | apps/host/vite.config.ts:90-96 (build próprio, saída `dist/host`); apps/host/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:144-147, :151-152 (S3 e CloudFront próprios); .github/workflows/ci-cd.yml:240-243, :247-248 (rollback próprio) |
| 4 | apps/products | separado | separado | bucket `AWS_S3_BUCKET_PRODUCTS` e distribuição `AWS_CLOUDFRONT_DISTRIBUTION_PRODUCTS`, valores fora do snapshot (.github/workflows/ci-cd.yml:139-142, :151-152); `http://localhost:3003` em desenvolvimento (apps/products/vite.config.ts:41-43) | No | apps/products/vite.config.ts:63-69 (build próprio, saída `dist/products`); apps/products/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:139-142, :151-152 (S3 e CloudFront próprios); .github/workflows/ci-cd.yml:235-238, :247-248 (rollback próprio) |

## Observações

**1. apps/footer.** Build próprio: o `vite build` do workspace (apps/footer/package.json:8) usa a config do footer, que gera `remoteEntry.js` com `./Footer` (apps/footer/vite.config.ts:13-19) em `dist/footer` (:49). Deploy separado: no job `deploy`, a entrada `footer` da matriz copia só `dist/footer` para o bucket e invalida a distribuição do footer (.github/workflows/ci-cd.yml:134-137, :151-152), e o footer só entra na matriz quando ele ou algo compartilhado muda (scripts/ci/affected-workspaces.mjs:39, :43-44). O endereço público não se resolve no snapshot: bucket e distribuição são secrets. O host o encontra por `VITE_FOOTER_REMOTE_URL` (.github/workflows/ci-cd.yml:103; apps/host/vite.config.ts:13). A versão `0.0.0` (apps/footer/package.json:4) não é usada na publicação, por isso Versionamento `No`.

**2. apps/header.** Mesmo arranjo do footer: build pela config do header (apps/header/vite.config.ts:13-19, :63-69) e deploy da entrada `header` da matriz para bucket e distribuição próprios (.github/workflows/ci-cd.yml:129-132, :151-152). É o primeiro caso do `case` e também tem rollback isolado (:225-228). O host o carrega por `VITE_HEADER_REMOTE_URL` (.github/workflows/ci-cd.yml:102; apps/host/vite.config.ts:12). Os testes do header rodam antes do deploy (`npm run test --workspace`, .github/workflows/ci-cd.yml:82-83; apps/header/package.json:10). Versão `0.0.0` sem uso (apps/header/package.json:4).

**3. apps/host.** Build próprio (apps/host/vite.config.ts:90-96), mas é o único build que depende das URLs dos remotes: elas entram no build por `loadEnv` e variáveis `VITE_*_REMOTE_URL` (apps/host/vite.config.ts:10-15), preenchidas no job (.github/workflows/ci-cd.yml:102-104). Assim, o host é publicado à parte (bucket e distribuição do host, :144-147, :151-152), mas não é reconstruído quando só um remote muda (scripts/ci/affected-workspaces.mjs:41), e continua apontando para os mesmos endereços dos remotes. Diferente dos remotes, o script `build` do host não roda `tsc -b` (apps/host/package.json:8). Versão `0.0.0` sem uso (apps/host/package.json:4).

**4. apps/products.** Mesmo arranjo dos outros remotes: build pela config do products, que expõe `./ProductsList` (apps/products/vite.config.ts:13-19) em `dist/products` (:65), e deploy para bucket e distribuição próprios (.github/workflows/ci-cd.yml:139-142, :151-152), com rollback isolado (:235-238). O host o carrega por `VITE_PRODUCTS_REMOTE_URL` (.github/workflows/ci-cd.yml:104; apps/host/vite.config.ts:14-15). Também tem testes no job `test` (apps/products/package.json:10). Versão `0.0.0` sem uso (apps/products/package.json:4).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
