---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
inputs:
  clone: data/samples/mfe-sample-001/repos/lmedhub__zephyr-microfrontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Leitura do repositório

O histórico até o snapshot tem 16 commits, de 2025-05-26 a 2025-06-04, dos quais 5 são merges de
pull requests (`51414d3`, `5d3cba4`, `b860c50`, `7e4bc22` e o próprio snapshot `c6e6a9f`). O
primeiro, `35e664c` (2025-05-26, "Initial commit"), só cria o `README.md`. O segundo, `87ab32c`
(2025-05-26, "zephyr config"), cria uma aplicação única na raiz: `package.json`, `rspack.config.ts`,
`module-federation.config.ts`, `index.html`, `tsconfig.json` e `src/`. `dc92890` (2025-05-27,
"integration done") remove `module-federation.config.ts`, `rspack.config.ts` e `src/` da raiz e cria
`apps/host`, `apps/remote-header` e `apps/remote-footer`, cada uma com `package.json` e
`rspack.config.ts`; essa é a introdução observável das três aplicações e da federação entre elas.
`8dc93d9` (2025-05-27, "package json changes") e `a9f8005` (2025-05-27, "deleted files") alteram o
`package.json` da raiz, e o segundo também remove os `tsconfig.json` das aplicações. `8b5da15`
(2025-06-02, "golang monorepo config") move tudo para `frontend/` e cria o backend Go: o
`frontend/package.json` desse commit é o mesmo objeto (`364ec6b`) do `package.json` da raiz em
`a9f8005`, ou seja, foi movido sem mudança. `a9a4033` (2025-06-04, "url shortener implemented") cria
`frontend/apps/url-shortener`, e `be7d3bc` (2025-06-04, "vue app functional") troca seus arquivos
React por Vue, cria o `VueShortener.tsx` do host e altera pela última vez o `frontend/package.json`
(o objeto `1223d14` é o mesmo no snapshot). Os commits seguintes tocam só o backend.

O clone não tem o conteúdo das versões antigas dos manifestos e das configurações: o `show` do
`package.json`, do `rspack.config.ts` e do `module-federation.config.ts` de `87ab32c`, do
`package.json` da raiz em `a9f8005`, do `frontend/package.json` em `8b5da15` e `a9a4033` e do
`package.json` e do `rspack.config.ts` do host em `dc92890` falha por objeto ausente. O que se vê
são mensagens, datas, caminhos criados, alterados e removidos e os identificadores dos objetos de
cada versão.

Das revisões anteriores, a 3.4.2 tem uma dependência sem uso, `@module-federation/enhanced`, que
virou o ponto 1. A 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa,
comentada ou `Undetermined`, a 3.4.5 não tem relação `Undetermined`, a 3.4.6 não tem deploy
`Undetermined` e a 3.4.7 não tem afirmação `contradita` ou `parcial`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@module-federation/enhanced` está declarado no `frontend/package.json` sem import ou require, e as quatro aplicações usam o `ModuleFederationPlugin` do Rspack | 3.4.2 (frontend/package.json:59) | uso de dependência | 87ab32c 2025-05-26 zephyr config; dc92890 2025-05-27 integration done; a9f8005 2025-05-27 deleted files; 8b5da15 2025-06-02 golang monorepo config; be7d3bc 2025-06-04 vue app functional | inconclusivo |

## Observações

**1. `@module-federation/enhanced` declarado sem uso.** O histórico mostra a linhagem do manifesto:
o `frontend/package.json` do snapshot descende do `package.json` da raiz criado em `87ab32c`, quando
o repositório era uma aplicação única com um `module-federation.config.ts` na raiz; esse arquivo foi
removido em `dc92890`, quando as aplicações passaram para `apps/` com um `rspack.config.ts` cada.
O manifesto foi alterado em `8dc93d9` e `a9f8005`, movido sem mudança para `frontend/` em `8b5da15`
e alterado depois em `a9a4033` e `be7d3bc`, a última versão antes do snapshot. O histórico não
mostra em que versão a dependência entrou no manifesto nem se o `module-federation.config.ts` da
raiz ou as primeiras configurações das aplicações a importavam, porque esses objetos não estão
disponíveis. Saber que houve uma configuração de federação removida não prova, sozinho, que ela
usava o pacote. Conclusão: inconclusivo; a dependência continua `No`.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends rev-list --count c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --merges --format=%h c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --format='%h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --name-status --no-renames --format='@@ %h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:module-federation.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:rspack.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree 87ab32c -- package.json module-federation.config.ts rspack.config.ts
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --format='%h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --format='%h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree dc92890 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree 8dc93d9 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree a9f8005 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree 8b5da15 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree a9a4033 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree be7d3bc -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree c6e6a9f7d59a3b422002af26c57617d6c486a532 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 8b5da15:frontend/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show a9a4033:frontend/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show a9f8005:package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show dc92890:apps/host/rspack.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show dc92890:apps/host/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:src/index.ts
```

## Resumo

Commits até o snapshot: 16 (2025-05-26 a 2025-06-04). Pontos: 1 (esclarecido: 0, inconclusivo: 1, resolvido pelo snapshot: 0).
