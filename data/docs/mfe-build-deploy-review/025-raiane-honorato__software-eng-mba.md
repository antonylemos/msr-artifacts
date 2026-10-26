---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
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

# 025 — raiane-honorato/software-eng-mba

## Leitura do repositório

Repositório de TCC que implementa o mesmo app React Native (MyGym) em três versões, para comparar regimes de modularização: monolito Expo, Turborepo (build-time) e Re.Pack com Module Federation (runtime) (README.md:29-33). Há ainda uma spike anterior em `apps/repack-poc/`, com um host e um remote mínimos. Não há Dockerfile, compose, workflow de CI, configuração de hospedagem nem configuração de publicação nas lojas (nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path` no matches.csv). Os `app.json` do monolito e do app Turborepo só trazem nome, versão, ícones e splash (apps/monolith/app.json:2-29; apps/turborepo/apps/mygym/app.json:2-29), e não há pastas nativas `android/`/`ios/` no snapshot. Todo o arranjo é de desenvolvimento e de medição.

O build existe em três formas. O monolito e o app Turborepo têm script `build` com `expo export --platform android` (apps/monolith/package.json:10; apps/turborepo/apps/mygym/package.json:11); no Turborepo, a raiz dispara `turbo run build` (apps/turborepo/package.json:5) com saída `dist/**` (apps/turborepo/turbo.json:5-8), e as features entram como pacotes do workspace no bundle único do `mygym` (README.md:32). Os pacotes Re.Pack não têm script `build`: cada um tem `rspack.config.mjs` próprio e troca os comandos do React Native pelos do Re.Pack (apps/repack/packages/host/react-native.config.js:2). O script de medição `scripts/measure-repack.sh` gera, à parte para `host`, `check-in` e `dashboard`, um bundle de produção Android com `react-native bundle --dev false` dentro de cada pacote, numa pasta temporária (scripts/measure-repack.sh:25-33, 40-42); os resultados estão em scripts/results/repack_build_isolated.csv:1. O `scripts/measure.sh` faz o mesmo para o monolito e o Turborepo com `expo export` (scripts/measure.sh:75, 100, 132). Nenhum desses scripts publica o que gera.

Para rodar a versão Re.Pack, `apps/repack/package.json:6` chama o `mprocs`, que sobe os três dev servers (apps/repack/mprocs.yaml:4-10): check-in na 9001, dashboard na 9002 (apps/repack/packages/check-in/package.json:9; apps/repack/packages/dashboard/package.json:9) e host na 8081, segundo o comentário em apps/repack/mprocs.yaml:2-3. O host busca os `mf-manifest.json` dos remotes nessas portas, em `localhost` (apps/repack/packages/host/rspack.config.mjs:49-52), e o app é instalado no simulador com `react-native run-ios` (apps/repack/README.md:118). Na spike, o host busca o remote em `localhost:9001` (apps/repack-poc/host/rspack.config.mjs:44-46), porta passada à mão no `start` do remote (apps/repack-poc/README.md:101). O README afirma que o Re.Pack permite deploy independente e OTA (README.md:33, 37), mas nenhum artefato do snapshot publica bundles ou containers; é afirmação de documentação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/monolith | separado | não observado | — | No | apps/monolith/package.json:10 (`expo export --platform android`); apps/monolith/app.json:2-29 (configuração Expo própria); scripts/measure.sh:75 (mede o build do monolito) |
| 2 | apps/repack-poc/host | separado | não observado | — | No | apps/repack-poc/host/rspack.config.mjs:15-54 (configuração Re.Pack/Rspack própria, remote em `localhost:9001`); apps/repack-poc/host/react-native.config.js:2 (comandos rspack do Re.Pack) |
| 3 | apps/repack-poc/remote | separado | não observado | `http://localhost:9001/${platform}/` (apps/repack-poc/host/rspack.config.mjs:45) | No | apps/repack-poc/remote/rspack.config.mjs:15-47 (configuração própria, container `remote.container.bundle`); apps/repack-poc/remote/react-native.config.js:2 (comandos rspack do Re.Pack) |
| 4 | apps/repack/packages/check-in | separado | não observado | `http://localhost:9001/${platform}/` (apps/repack/packages/host/rspack.config.mjs:50; apps/repack/packages/check-in/package.json:9) | No | apps/repack/packages/check-in/rspack.config.mjs:14-51 (configuração própria, container `check-in.container.js.bundle`); apps/repack/packages/check-in/react-native.config.js:2 (comandos rspack do Re.Pack); scripts/measure-repack.sh:29-31, 41 (bundle de produção isolado) |
| 5 | apps/repack/packages/dashboard | separado | não observado | `http://localhost:9002/${platform}/` (apps/repack/packages/host/rspack.config.mjs:51; apps/repack/packages/dashboard/package.json:9) | No | apps/repack/packages/dashboard/rspack.config.mjs:14-49 (configuração própria, container `dashboard.container.js.bundle`); apps/repack/packages/dashboard/react-native.config.js:2 (comandos rspack do Re.Pack); scripts/measure-repack.sh:29-31, 42 (bundle de produção isolado) |
| 6 | apps/repack/packages/host | separado | não observado | porta 8081 do dev server (apps/repack/mprocs.yaml:2-3) | No | apps/repack/packages/host/rspack.config.mjs:16-58 (configuração própria, remotes externos); apps/repack/packages/host/react-native.config.js:2 (comandos rspack do Re.Pack); scripts/measure-repack.sh:29-31, 40 (bundle de produção isolado) |
| 7 | apps/turborepo/apps/mygym | separado | não observado | — | No | apps/turborepo/apps/mygym/package.json:11 (`expo export --platform android`); apps/turborepo/package.json:5 (`turbo run build`); apps/turborepo/turbo.json:5-8 (task `build`, saída `dist/**`); scripts/measure.sh:100, 132 (mede o build) |

## Observações

**1. apps/monolith.** Build próprio por `expo export` (apps/monolith/package.json:10), fora de qualquer workspace e sem compartilhar artefato com as outras versões. O resto dos scripts é `expo start` de desenvolvimento (apps/monolith/package.json:6-9). Deploy `não observado`: nada empacota ou publica o export. A `version` `1.0.0` (apps/monolith/package.json:3; apps/monolith/app.json:5) não é usada em nenhuma publicação.

**2. apps/repack-poc/host.** Build próprio pelo `rspack.config.mjs` da spike, que declara o remote como externo (apps/repack-poc/host/rspack.config.mjs:41-46), de modo que o código do remote não entra no bundle do host. Não há script `build`; o bundle sai pelo `react-native start` ou pelo `run-ios`/`run-android` (apps/repack-poc/host/package.json:6-9). A porta 8081 do host só aparece no README (apps/repack-poc/README.md:19, 103), por isso a coluna fica `—`. Deploy `não observado`.

**3. apps/repack-poc/remote.** Build próprio, que gera o container `remote.container.bundle` (apps/repack-poc/remote/rspack.config.mjs:37-40). É servido só pelo dev server: o `start` não fixa porta (apps/repack-poc/remote/package.json:9), e a 9001 vem da URL do host e do comando do README (apps/repack-poc/README.md:101). Deploy `não observado`.

**4. apps/repack/packages/check-in.** Build próprio, com container `check-in.container.js.bundle` (apps/repack/packages/check-in/rspack.config.mjs:42-46), e é o único caso em que o snapshot também traz um bundle de produção gerado à parte, ainda que para medição e numa pasta temporária (scripts/measure-repack.sh:25-33, 41). Compartilha com host e dashboard o helper `sharedDeps` (apps/repack/packages/check-in/rspack.config.mjs:4, 48) e os pacotes `@mygym/*` do workspace (apps/repack/packages/check-in/package.json:14-19), o que não muda o artefato próprio. Servido pelo dev server na 9001 (apps/repack/packages/check-in/package.json:9). Deploy `não observado`: o README fala em deploy independente/OTA (README.md:37), mas nenhum artefato publica o container.

**5. apps/repack/packages/dashboard.** Mesma situação do check-in: container `dashboard.container.js.bundle` próprio (apps/repack/packages/dashboard/rspack.config.mjs:39-44), bundle de produção isolado no script de medição (scripts/measure-repack.sh:42), dev server na 9002 (apps/repack/packages/dashboard/package.json:9). Deploy `não observado`.

**6. apps/repack/packages/host.** Build próprio; os dois mini-apps são remotes carregados pela rede e não entram no bundle do host (apps/repack/packages/host/rspack.config.mjs:49-52). Segundo o README, é a casca instalável, montada com `react-native run-ios` (apps/repack/README.md:118), mas não há projeto nativo no snapshot nem configuração de publicação. A porta 8081 está só em comentário do `mprocs` (apps/repack/mprocs.yaml:2-3) e no README (apps/repack/README.md:104); o `start` não a fixa (apps/repack/packages/host/package.json:9). Deploy `não observado`.

**7. apps/turborepo/apps/mygym.** Build próprio por `expo export` (apps/turborepo/apps/mygym/package.json:11), disparado pela raiz com `turbo run build` (apps/turborepo/package.json:5). As features `feature-check-in` e `feature-dashboard` são pacotes do workspace, não unidades, e saem dentro deste mesmo bundle (README.md:32); por isso o build é `separado` em relação às outras aplicações do snapshot. Deploy `não observado`. A versão `0.0.0` (apps/turborepo/apps/mygym/package.json:3) não é usada.

## Resumo

Aplicações: 7. Build (separado: 7). Deploy (não observado: 7). Versionamento independente: 0.
