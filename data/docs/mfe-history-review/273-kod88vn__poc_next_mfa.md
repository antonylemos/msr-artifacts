---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
inputs:
  clone: data/samples/mfe-sample-001/repos/kod88vn__poc_next_mfa
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Leitura do repositório

5 commits até o snapshot, de 2026-04-11 a 2026-04-24. `9afe190` (2026-04-11, "Initial commit") só
cria o `README.md`. `18d620e` (2026-04-12, "init") introduz a estrutura de duas zonas: `package.json`,
`turbo.json`, `.gitignore`, `apps/shell`, `apps/shop` e `packages/ui` (com `Button.tsx`, `Header.tsx`,
`index.ts` e `package.json`), e altera o `README.md`. `e001413` (2026-04-12, "ready for deploy")
altera os `tsconfig.json` do shell e do shop e cria o `yarn.lock`. `3e95170` (2026-04-24, "feat:
unified brand theme pipeline, ADA normalization, URL routing policy") introduz a terceira zona,
`apps/duda` inteira (com `ARCHITECTURE.md`), cria `apps/shell/app/not-found/page.tsx`,
`load-root-env.js`, `package-lock.json`, `test-duda-themes.js` e os testes, e altera
`package.json`, `turbo.json`, os `next.config.js` e layouts do shell e do shop, a página inicial
do shell e `packages/ui` (`Button.tsx`, `Header.tsx`, `index.ts`). O commit do snapshot, `d20db82`
(2026-04-24, "feat: simplify header navigation and accessibility logic"), só toca
`packages/ui/src/Header.tsx`, `packages/ui/src/headerThemeAccessibility.ts` e o teste
correspondente. Nenhum commit até o snapshot remove arquivo (`--diff-filter=D` vazio).

O `README.md` não muda depois de `18d620e`: o objeto é o mesmo nesse commit e no snapshot
(`f5abd49`). Ele é, portanto, anterior a `3e95170`, que cria a zona duda, o que explica por que o
README fala em duas zonas, como a revisão de documentação supôs. O mesmo vale para
`packages/ui/package.json` (objeto `fc2aabf` em `18d620e` e no snapshot).

O clone permite ver mensagens, datas, os arquivos criados ou alterados por commit e os
identificadores dos objetos. O conteúdo das versões antigas dos arquivos alterados não está no
clone: `show 18d620e:packages/ui/src/index.ts` e `show 18d620e:apps/shop/app/layout.tsx` falharam
por objeto ausente. Só se leem versões antigas cujo objeto é o mesmo do snapshot, como o
`README.md`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `turbo` tem `turbo.json`, mas só os scripts do `package.json` o invocam | 3.4.2 (package.json:18) | uso de dependência | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | esclarecido |
| 2 | "Independent deployability" sem artefato de deploy no snapshot | 3.4.7 #2 | ativo ou abandonado | 18d620e 2026-04-12 init; e001413 2026-04-12 ready for deploy; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | esclarecido |
| 3 | `Button` descrito como parte do design system compartilhado, mas nenhuma app o importa | 3.4.7 #9 | ativo ou abandonado | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | inconclusivo |
| 4 | README diz que os links entre zonas usam só `<a>`, mas a página `not-found` do shell usa `<Link>` para `/shop` e `/duda` | 3.4.7 #13 | estágios em conflito | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | esclarecido |
| 5 | README diz que o `turbo.json` constrói `packages/ui` antes das apps, mas o pacote não tem script `build` | 3.4.7 #14 | estágios em conflito | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | esclarecido |
| 6 | Comentário do layout do shop diz que, pelo rewrite, a página usa o layout do shell como moldura | 3.4.7 #19 | estágios em conflito | 18d620e 2026-04-12 init; 3e95170 2026-04-24 feat: unified brand theme pipeline, ADA normalization, URL routing policy | inconclusivo |

## Observações

**1. `turbo` sem invocação fora dos scripts.** O `package.json` e o `turbo.json` da raiz aparecem
em `18d620e` e são alterados uma vez, em `3e95170`. Nenhum commit até o snapshot cria ou remove um
workflow de CI, Dockerfile ou outro arquivo de automação: a árvore do snapshot não tem nenhum, e não
há remoção no histórico. Os únicos scripts soltos, `load-root-env.js` e `test-duda-themes.js`,
entram em `3e95170` e continuam no snapshot. O histórico esclarece que não houve invocação de
`turbo` fora dos scripts que depois tenha sido apagada; não mostra o conteúdo das versões antigas
dos scripts do `package.json`. A dependência continua `Undetermined`.

**2. "Independent deployability".** A mensagem de `e001413` anuncia "ready for deploy", mas o
commit só altera `apps/shell/tsconfig.json` e `apps/shop/tsconfig.json` e cria `yarn.lock`. Nenhum
dos cinco commits cria ou remove Dockerfile, compose, workflow, manifesto de hospedagem ou
configuração de proxy. O histórico esclarece que a ausência de artefato de deploy não é abandono:
em nenhuma versão até o snapshot houve um. Não mostra se o projeto foi publicado por um caminho
externo ao repositório (o `.gitignore` ignora `.vercel`, mas isso não é artefato).

**3. `Button` sem uso.** `packages/ui/src/Button.tsx` e `packages/ui/src/index.ts` aparecem em
`18d620e`, junto com as apps shell e shop, e são alterados em `3e95170`, o mesmo commit que altera
a página inicial e os layouts do shell e do shop. O `README.md`, que cita `Button`, é o mesmo desde
`18d620e`. Para saber se alguma app importava o `Button` em `18d620e` seria preciso ler o conteúdo
dessas versões, que não está no clone (`show 18d620e:packages/ui/src/index.ts` falhou por objeto
ausente). O histórico não diz se o `Button` foi usado e deixou de ser, ou se nunca foi.
Inconclusivo.

**4. `<a>` contra `<Link>`.** A afirmação "Cross-zone links use plain `<a>` tags (not `<Link>`)"
está no `README.md` desde `18d620e` (mesmo objeto `f5abd49` no snapshot; a linha foi lida na versão
desse commit). A página `apps/shell/app/not-found/page.tsx`, que usa `Link` para `/shop` e `/duda`,
é criada depois, em `3e95170`, junto com a zona duda. O histórico esclarece que a afirmação e a
página pertencem a estágios diferentes: o README foi escrito antes de a página existir e não foi
atualizado quando ela entrou. Não mostra se o uso de `Link` nessa página foi intencional.

**5. `packages/ui` construído antes das apps.** O `packages/ui/package.json` é criado em `18d620e`
e nunca alterado (objeto `fc2aabf` em `18d620e` e no snapshot), e a frase do README
(README.md:84) também é a mesma desde `18d620e`. Em nenhuma versão até o snapshot o pacote teve
outro manifesto, portanto nunca teve script `build` para o `^build` rodar. O `turbo.json` foi
alterado em `3e95170`, e o conteúdo da versão anterior não está no clone, mas a ausência do
script está no manifesto do pacote, não no `turbo.json`. O histórico esclarece que a contradição
não é resto de um estágio em que `packages/ui` tinha build próprio: ela existe desde que a frase foi
escrita.

**6. Layout do shell como moldura.** `apps/shop/app/layout.tsx` aparece em `18d620e` e é alterado
em `3e95170`, o mesmo commit que altera `apps/shell/next.config.js`. O conteúdo da versão de
`18d620e` não está no clone (`show 18d620e:apps/shop/app/layout.tsx` falhou por objeto ausente), e
o mesmo vale para a versão antiga do `next.config.js` do shell. O histórico não mostra se o
comentário já existia na primeira versão nem se o comportamento descrito correspondia a uma
configuração anterior. Inconclusivo.

## Comandos

```
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa rev-list --count d20db8260825dc17ad4c68ac6df0595c1c59df23
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short --name-status d20db8260825dc17ad4c68ac6df0595c1c59df23
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- 'package.json turbo.json'
  # sem saída: os dois caminhos foram passados como um só (repetido abaixo, separado)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- README.md
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- packages/ui/package.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- apps/shop/app/layout.tsx
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- 'packages/ui/src/Button.tsx packages/ui/src/index.ts'
  # sem saída: os dois caminhos foram passados como um só (repetido abaixo, separado)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- apps/shell/app/not-found/page.tsx
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree 18d620e -- packages/ui/package.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree d20db8260825dc17ad4c68ac6df0595c1c59df23 -- packages/ui/package.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree 18d620e -- README.md
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree d20db8260825dc17ad4c68ac6df0595c1c59df23 -- README.md
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- package.json turbo.json
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short d20db8260825dc17ad4c68ac6df0595c1c59df23 -- packages/ui/src/Button.tsx packages/ui/src/index.ts
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa show 18d620e:packages/ui/src/index.ts
  # falhou: fatal: bad object 18d620e:packages/ui/src/index.ts (objeto ausente no clone --filter=blob:none)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa show 18d620e:apps/shop/app/layout.tsx
  # falhou: fatal: bad object 18d620e:apps/shop/app/layout.tsx (objeto ausente no clone --filter=blob:none)
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa log --format='%h %ad %s' --date=short --diff-filter=D --name-status d20db8260825dc17ad4c68ac6df0595c1c59df23
  # sem saída: nenhuma remoção até o snapshot
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa ls-tree -r --name-only d20db8260825dc17ad4c68ac6df0595c1c59df23
docs/mfe-history-review/tools/hist.sh kod88vn__poc_next_mfa show 18d620e:README.md
```

## Resumo

Commits até o snapshot: 5 (2026-04-11 a 2026-04-24). Pontos: 6 (esclarecido: 4, inconclusivo: 2, resolvido pelo snapshot: 0).
