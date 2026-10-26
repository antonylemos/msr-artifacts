---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
inputs:
  clone: data/samples/mfe-sample-001/repos/ramdev90__nx-module-federation
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Leitura do repositório

O histórico até o snapshot tem 4 commits, sem merges, de 2026-03-10 a 2026-03-11. O primeiro,
`a6a38c9` (2026-03-10, "Initial commit"), cria o workspace Nx: os arquivos da raiz (`package.json`,
`package-lock.json`, `nx.json`, `tsconfig.base.json`, `eslint.config.mjs`, `.gitignore`, `README.md`
e configurações de editor) e a aplicação inicial `apps/microfrontend-workspace`. Os dois seguintes,
`9a16b67` e `3a01c2f` (2026-03-11, ambos "initial commit"), só alteram o `README.md`, que a
normalização da aquisição tirou do snapshot. O último, `cf42f3f` (2026-03-11, "initial commit"), é o
próprio snapshot: cria as quatro aplicações federadas (`shell`, `products`, `orders`, `customer`), com
`module-federation.config.ts`, `webpack.config.ts`, `webpack.prod.config.ts` e `project.json` em cada
uma, e altera `nx.json`, `package.json`, `package-lock.json` e `tsconfig.base.json`.

Assim, toda a configuração de Module Federation e as quatro unidades compostas são introduzidas no
commit do snapshot. `apps/microfrontend-workspace`, o `eslint.config.mjs` da raiz e o `.gitignore`
têm um único commit no `log`, `a6a38c9`, e não mudam até o snapshot. Nenhum commit remove arquivo, e
nenhum cria workflow de CI, Dockerfile ou script de automação.

As versões de `a6a38c9` do `package.json`, do `nx.json`, do `package-lock.json` e do
`tsconfig.base.json`, os quatro arquivos que `cf42f3f` altera, não estão disponíveis no clone (o
`show` falha por objeto ausente). Por isso não dá para ver o que `cf42f3f` acrescentou ou tirou das
dependências e da configuração do Nx.

Das revisões anteriores, a 3.4.2 tem três dependências `No` (`@nx/js`, `@nx/webpack`,
`@nx/workspace`) e uma `Undetermined` (`nx`), cada uma um ponto. A 3.4.3 não tem unidade
`Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined` na tabela, a 3.4.5 não
tem relação `Undetermined`, a 3.4.6 não tem deploy `Undetermined` e a 3.4.7 não tem afirmações.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@nx/js` declarada e sem uso | 3.4.2 (package.json:28) | uso de dependência | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusivo |
| 2 | `@nx/webpack` declarada e sem uso; os builds usam `@nx/angular:webpack-browser` | 3.4.2 (package.json:31) | uso de dependência | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusivo |
| 3 | `@nx/workspace` declarada e sem uso | 3.4.2 (package.json:32) | uso de dependência | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusivo |
| 4 | `nx` tem `nx.json` e `project.json`, mas nenhuma invocação: `scripts` vazio, sem CI nem script de automação | 3.4.2 (package.json:41) | uso de dependência | a6a38c9 2026-03-10 Initial commit; cf42f3f 2026-03-11 initial commit | inconclusivo |

## Observações

**1. `@nx/js` declarada e sem uso.** O `package.json` é criado em `a6a38c9` e alterado só em
`cf42f3f`, o snapshot. A versão de `a6a38c9` não está disponível, nem a do `nx.json` do mesmo commit,
onde um plugin `@nx/js` poderia ter estado. Os arquivos do primeiro commit que estão no snapshot sem
mudança (`apps/microfrontend-workspace`, `eslint.config.mjs`) são os que a 3.4.2 já leu. O histórico
não diz quando a dependência foi declarada nem se a configuração anterior a `cf42f3f` a usava.
Inconclusivo; continua `No`.

**2. `@nx/webpack` declarada e sem uso.** Mesma situação: o `package.json` e o `nx.json` de `a6a38c9`
não estão disponíveis, e as configurações webpack das quatro unidades federadas só existem a partir
de `cf42f3f`, já com o executor `@nx/angular:webpack-browser`. Não dá para saber se a dependência
entrou em `a6a38c9` ou em `cf42f3f`, nem se algo a usou entre os dois. Inconclusivo; continua `No`.

**3. `@nx/workspace` declarada e sem uso.** As versões anteriores do `package.json` e do
`package-lock.json` não estão disponíveis, e nenhum commit cria ou remove um script que pudesse
invocá-la. O histórico não diz quando foi declarada nem se foi usada. Inconclusivo; continua `No`.

**4. `nx` sem invocação.** Delimitado aos caminhos criados e removidos: nenhum dos quatro commits cria
ou remove workflow de CI, Dockerfile ou arquivo de script, e nenhum commit remove arquivo. Não houve,
portanto, um arquivo de automação que invocasse `nx` e depois tenha sido apagado. O lugar restante, os
`scripts` do `package.json`, só é legível no snapshot, onde estão vazios (package.json:5); a versão de
`a6a38c9` não está disponível, e não dá para saber se tinha scripts que chamavam `nx` e foram tirados
em `cf42f3f`. Inconclusivo; continua `Undetermined`.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation rev-list --count cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --merges --format=%h cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --format='%h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --name-status --no-renames --format='@@ %h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7   # saída lida sem as linhas de nx-welcome e .spec.ts
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --name-status --no-renames --diff-filter=D --format='@@ %h' cf42f3f1506bfe6f25a263d0763cd09cac7e84f7   # saída vazia: nenhuma remoção
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation ls-tree a6a38c9 -- package.json nx.json README.md
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation ls-tree cf42f3f1506bfe6f25a263d0763cd09cac7e84f7 -- package.json nx.json
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:nx.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --format='%h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7 -- package.json nx.json package-lock.json tsconfig.base.json
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:package-lock.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation show a6a38c9:tsconfig.base.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ramdev90__nx-module-federation log --format='%h %ad %s' --date=short cf42f3f1506bfe6f25a263d0763cd09cac7e84f7 -- apps eslint.config.mjs .gitignore
```

## Resumo

Commits até o snapshot: 4 (2026-03-10 a 2026-03-11). Pontos: 4 (esclarecido: 0, inconclusivo: 4, resolvido pelo snapshot: 0).
