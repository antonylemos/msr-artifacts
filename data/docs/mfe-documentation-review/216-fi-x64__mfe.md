---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Leitura do repositório

O repositório não tem documentação. O `artifacts.csv` não lista nenhum arquivo do tipo `documentation`, não há README nem outro `.md` no snapshot, e o `matches.csv` não tem ocorrências `doc-*`. Os `package.json` dos quatro pacotes não têm `description` (packages/auth/package.json:1-29; packages/container/package.json:1-30; packages/dashboard/package.json:1-33; packages/marketing/package.json:1-30), e os `name` dos workflows, `deploy-container` e `deploy-marketing` (.github/workflows/container.yml:1; .github/workflows/marketing.yml:1), só nomeiam o job.

O único texto com afirmação arquitetural são os comentários do bootstrap do marketing (packages/marketing/src/bootstrap.js:10-11, 20-21), que viram as duas linhas da tabela. Eles descrevem os dois modos da unidade: em desenvolvimento e isolada, ela monta a si mesma; carregada pelo container, só exporta `mount`. Os dois conferem com as revisões anteriores, que registram `packages/marketing` como unidade com entrada própria (3.4.3) e como remote montado pelo container por `mount` (3.4.5 #1). O comentário "Mount function to start up the app" (packages/marketing/src/bootstrap.js:5) descreve só a função interna e não vira linha.

Foram lidos os comentários de todos os artefatos citados pelas revisões anteriores: os dois workflows, as configurações webpack do container e do marketing, os `package.json`, os `index.html` e o código de `packages/container/src/` e `packages/marketing/src/`. As configurações webpack, os workflows e o código do container não têm comentários. Os comentários dos componentes do marketing tratam só de layout (packages/marketing/src/components/Landing.js:53, 72, 115, 148, 163; packages/marketing/src/components/Pricing.js:147, 169, 173). `packages/auth` e `packages/dashboard` só têm `package.json` e lockfile, sem texto descritivo.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | packages/marketing/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (o marketing monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (packages/marketing `Yes`); packages/marketing/src/bootstrap.js:12-17; packages/marketing/public/index.html:5 |
| 2 | packages/marketing/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (o marketing é montado pelo container) | composição | corroborada | 3.4.5 #1; packages/marketing/src/bootstrap.js:22; packages/marketing/config/webpack.prod.js:16-18; packages/container/src/components/MarketingApp.js:1, 8 |

## Observações

**1. packages/marketing/src/bootstrap.js:10-11.** Em desenvolvimento, o bootstrap procura `#_marketing-dev-root` e, se o encontra, chama `mount` sobre ele (packages/marketing/src/bootstrap.js:12-17). Esse elemento só existe no `index.html` do próprio marketing (packages/marketing/public/index.html:5), servido pelo servidor de desenvolvimento na porta 8081 (packages/marketing/config/webpack.dev.js:10, 24-26), e não no do container, que tem só `#root` (packages/container/public/index.html:5). A condição só vale, portanto, quando o marketing roda pela sua página isolada. Em produção o build do marketing não gera `index.html` (3.4.6 #2), e a auto-montagem fica só no desenvolvimento, como o comentário diz.

**2. packages/marketing/src/bootstrap.js:20-21.** O bootstrap exporta `mount` (packages/marketing/src/bootstrap.js:22) e é exposto como `./MarketingApp` (packages/marketing/config/webpack.prod.js:16-18; packages/marketing/config/webpack.dev.js:19-21). O container importa `mount` de `marketing/MarketingApp` e o chama sobre um `div` próprio (packages/container/src/components/MarketingApp.js:1, 8), relação registrada como ativa na revisão de composição (3.4.5 #1). O comentário fala em "container", e a unidade host tem esse nome (packages/container/package.json:2).

## Resumo

Afirmações: 2 (corroborada: 2, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (composição: 1, independência: 1).
