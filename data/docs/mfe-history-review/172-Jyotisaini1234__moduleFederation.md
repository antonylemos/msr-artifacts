---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
inputs:
  clone: data/samples/mfe-sample-001/repos/Jyotisaini1234__moduleFederation
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Leitura do repositório

O histórico até o snapshot tem 6 commits, sem merges, de 2025-08-22 a 2025-09-01. O primeiro,
`da91d51` (2025-08-22, "model federation"), só cria o `README.md`. `a38408a` (2025-08-22, "Add mfe1
and mfe2 folders") cria os dois projetos: `package.json`, `package-lock.json`, `tsconfig.json`,
`webpack.config.ts`, `public/index.html` e `src/` de cada um, e também os diretórios `node_modules/`
e `dist/` das duas unidades, com milhares de arquivos. `6767cd7` (2025-08-22, mesma mensagem) altera só
`mfe2/src/index.tsx` e `mfe2/webpack.config.ts`. `5cf7cbb` (2025-08-27, "save") é o commit que deixa
o código no estado do snapshot: cria o `.gitignore` e `mfe1/src/server/server.ts`; altera
`mfe1/package.json`, `mfe1/package-lock.json`, `mfe1/src/App.tsx`, `mfe1/src/bootstrap.tsx`,
`mfe1/src/index.tsx`, `mfe1/src/types/global.d.ts`, `mfe1/webpack.config.ts`, `mfe2/tsconfig.json` e
`mfe2/webpack.config.ts`; e mexe em 45 arquivos de `mfe1/node_modules/` e em alguns de `dist/`.
`0baa0e7` (2025-08-27, "Remove build and dependency folders from repo") só remove os `node_modules/` e
`dist/` versionados. `8df0f2a` (2025-09-01, "Update README.md"), o snapshot, só altera o `README.md`.

O que o clone permite ver: mensagens, arquivos tocados por commit (com `--no-renames`; sem essa opção o
`log --name-status` falha por objeto ausente) e os identificadores dos objetos de cada versão. As
versões de `a38408a` de `mfe1/package.json`, `mfe1/src/App.tsx` e `mfe1/webpack.config.ts` não estão
disponíveis no clone. Os três arquivos têm em `5cf7cbb` os mesmos identificadores do snapshot, ou seja,
não mudaram depois de `5cf7cbb`. Antes de `5cf7cbb` não havia `.gitignore`, e os `node_modules/`
estavam versionados por inteiro; o `.gitignore` criado em `5cf7cbb` passa a ignorar
`mfe1/node_modules` e `mfe2/node_modules` (.gitignore:5, 8), de modo que pacotes instalados depois
dele não entram mais no histórico.

Das revisões anteriores, a 3.4.2 tem uma dependência `No` (`@module-federation/node`), e a 3.4.4 tem
uma construção comentada (mfe1/src/App.tsx:39); cada uma virou um ponto. A 3.4.3 não tem unidade
`Undetermined`, a 3.4.5 não tem relação `Undetermined`, a 3.4.6 não tem deploy `Undetermined` e as duas
afirmações da 3.4.7 são `corroborada`. O servidor SSR da `mfe1`, que nenhum script executa, não é
ponto de nenhuma revisão anterior; o histórico só mostra que ele é criado em `5cf7cbb` e não muda até o
snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@module-federation/node` declarada e sem uso | 3.4.2 (mfe1/package.json:15) | uso de dependência | a38408a 2025-08-22 Add mfe1 and mfe2 folders; 5cf7cbb 2025-08-27 save | inconclusivo |
| 2 | Versão alternativa do `App` do host, com import remoto condicional para SSR, toda comentada | 3.4.4 (mfe1/src/App.tsx:39) | ativo ou abandonado | a38408a 2025-08-22 Add mfe1 and mfe2 folders; 5cf7cbb 2025-08-27 save | inconclusivo |

## Observações

**1. `@module-federation/node` declarada e sem uso.** O `mfe1/package.json` é criado em `a38408a` e
alterado só em `5cf7cbb`, junto com o `mfe1/webpack.config.ts` e a criação do servidor SSR
(`mfe1/src/server/server.ts`); depois disso nenhum dos três muda até o snapshot. A versão de `5cf7cbb`
é a do snapshot, em que a dependência está só declarada (3.4.2). As versões de `a38408a` do
`package.json` e do `webpack.config.ts` não estão disponíveis, e não dá para ler se a dependência já
estava declarada ou configurada antes. O que o histórico mostra, delimitado aos caminhos: nenhum commit
grava `mfe1/node_modules/@module-federation`, e em `a38408a`, quando o `node_modules` da `mfe1` estava
versionado por inteiro e ainda não havia `.gitignore`, ele tem `react`, mas não `@module-federation`.
Isso indica que o pacote não estava instalado no estado versionado de `a38408a`, mas não diz o que a
configuração dessa versão continha. A ausência em `5cf7cbb` não informa nada, porque o `.gitignore` do
mesmo commit já ignora o `node_modules`. Inconclusivo; continua `No`.

**2. Versão alternativa do `App` do host, toda comentada.** `mfe1/src/App.tsx` é criado em `a38408a` e
alterado só em `5cf7cbb`; a versão de `5cf7cbb` é a do snapshot, com o bloco comentado em
mfe1/src/App.tsx:35-53 ao lado da versão ativa. A versão de `a38408a` não está disponível, e não dá
para saber se o bloco comentado foi antes a versão ativa do componente (e foi desativado em `5cf7cbb`)
ou se entrou já comentado. A mensagem "save" não descreve a mudança. O bloco e o servidor SSR, a que
o comentário "Conditional import - only load remote module on client side" (mfe1/src/App.tsx:37) se
refere, têm como primeira presença observável o mesmo commit, `5cf7cbb`. Inconclusivo; a construção
continua `No`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation rev-list --count 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation rev-list --count --merges 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation log --format='%h %ad %s' --date=short --name-status 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29   # falhou: objeto ausente (could not fetch d284eed245626dd195399f342ef6453198b8000a from promisor remote); rodado duas vezes
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation log --format='%h %ad %s' --date=short 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation log --format='%h %ad %s' --date=short --name-status --no-renames 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29   # saída filtrada fora do clone: linhas fora de node_modules/ e dist/, contagem por commit e busca por module-federation
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation ls-tree a38408a -- mfe1/package.json mfe1/src/App.tsx mfe1/webpack.config.ts
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation ls-tree 6767cd7 -- mfe1/package.json mfe1/src/App.tsx mfe1/webpack.config.ts
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation ls-tree 5cf7cbb -- mfe1/package.json mfe1/src/App.tsx mfe1/webpack.config.ts
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation ls-tree 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29 -- mfe1/package.json mfe1/src/App.tsx mfe1/webpack.config.ts
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation cat-file -e a38408a:mfe1/package.json   # falhou: objeto ausente (saída 1)
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation cat-file -e a38408a:mfe1/src/App.tsx   # falhou: objeto ausente (saída 1)
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation cat-file -e a38408a:mfe1/webpack.config.ts   # falhou: objeto ausente (saída 1)
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation log --format='%h %ad %s' --date=short 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29 -- mfe1/package.json mfe1/src/App.tsx
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation log --format='%h %ad %s' --date=short 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29 -- mfe1/node_modules/@module-federation   # saída vazia
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation ls-tree a38408a -- mfe1/node_modules/@module-federation mfe1/node_modules/ignore-loader mfe1/node_modules/react
docs/mfe-history-review/tools/hist.sh Jyotisaini1234__moduleFederation ls-tree 5cf7cbb -- mfe1/node_modules/@module-federation mfe1/node_modules/ignore-loader mfe1/node_modules/react
```

## Resumo

Commits até o snapshot: 6 (2025-08-22 a 2025-09-01). Pontos: 2 (esclarecido: 0, inconclusivo: 2, resolvido pelo snapshot: 0).
