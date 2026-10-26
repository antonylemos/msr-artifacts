---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
inputs:
  clone: data/samples/mfe-sample-001/repos/raiane-honorato__software-eng-mba
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Leitura do repositório

O histórico até o snapshot tem 29 commits, sem merges, de 2026-05-23 a 2026-09-10. O primeiro,
`0d870b5` (2026-05-23, "init: MyGym TCC — monolith e turborepo PoCs"), já traz o monolito, a versão
Turborepo, as maquetes de `UX/`, `.gitignore` raiz e `apps/turborepo/ARCHITECTURE.md`. A versão
Re.Pack chega um mês depois: a spike `apps/repack-poc/` em `22fcdfc` (2026-06-24, "first repack poc
commit"), que já cria os `rspack.config.mjs` do host e do remote, e `79cf054` (2026-06-29, "add repack
poc"), que acrescenta a `HelloScreen`, o `ErrorBoundary`, o `README.md` e `poc-evidence.png`. Entre
`2260101` (2026-06-29, "repack: esqueleto do workspace (Passo 2.A)") e `0bca05d` (2026-07-09), uma série
de commits numerados por "Parte" monta `apps/repack/`: host, mini-apps, troca de Expo para bare,
orquestração, os dois experimentos de singleton (`6128533`, `8a1abae`) e a remoção de cada um
(`6b05695`, `747393f`), `ARCHITECTURE.md` (`8232ce1`, Parte 9) e as medições (Parte 10). Depois vêm só
dois commits de documentação: `333ebcc` (2026-07-18) e o snapshot `c569ccc` (2026-09-10, "doc: explain
mf-manifest").

O clone só tem localmente os objetos iguais aos do snapshot: `show` de versões antigas de
`sharedDeps.mjs`, `pnpm-workspace.yaml`, `apps/repack/ARCHITECTURE.md` e do `package.json` do host
falhou por objeto ausente sempre que a versão diferia da do snapshot. O que se vê do passado são
mensagens, datas e quais arquivos cada commit criou ou alterou.

O `ls-tree` do commit do snapshot mostra dois arquivos que as revisões trataram como ausentes:
`apps/repack-poc/poc-evidence.png` (desde `79cf054`) e as quatro fontes
`apps/repack/packages/host/assets/fonts/Inter-*.ttf` (desde `fd0332b`, 2026-07-04, "repack: fontes Inter
em bare (fix visual, swap D3)"). Os dois estão no commit e foram tirados só da cópia normalizada do
snapshot, pelo preset `binaries` (`data/acquisitions/mfe-corpus-001/corpus/raiane-honorato__software-eng-mba/normalization.json:86`).
O conteúdo da imagem não foi inspecionado.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A queda de ~10 MB no download ao mover `phosphor-react-native` para o `shared` não tem medição de antes/depois no snapshot | 3.4.7 #12 | estágios em conflito | 5097f5f 2026-07-09 repack: phosphor no shared + libs pesadas no ARCHITECTURE (Parte 10); e5a77a1 2026-07-09 repack: medição de build isolado (Parte 10) | inconclusivo |
| 2 | A captura `poc-evidence.png`, citada como evidência da spike, não está no snapshot, e o download do bundle pelo `ScriptManager` não tem artefato | 3.4.7 #13 | ativo ou abandonado | 79cf054 2026-06-29 add repack poc | esclarecido |
| 3 | O README diz que o remote da spike não roda sozinho, e ele tem entrada própria com o `App` do template | 3.4.7 #15 | estágios em conflito | 22fcdfc 2026-06-24 first repack poc commit; 79cf054 2026-06-29 add repack poc | esclarecido |
| 4 | O `ARCHITECTURE.md` chama o `pnpm catalog` de fonte única de versões, e `react`, `react-native` e `phosphor-react-native` têm versão escrita em cada pacote | 3.4.7 #23 | estágios em conflito | 16317fb 2026-06-29 repack: swap Expo->bare + mini-getSharedDependencies (Parte 5c); 3d31f97 2026-07-04 repack: orquestracao no host — tabs + lazy remotes (Parte 6, codigo); d505d6c 2026-07-09 repack: mprocs — subir os 3 dev servers num comando (Parte 8); 8232ce1 2026-07-09 repack: ARCHITECTURE.md (Parte 9); 5097f5f 2026-07-09 repack: phosphor no shared + libs pesadas no ARCHITECTURE (Parte 10) | esclarecido |
| 5 | Não há projeto nativo `android/`/`ios/` que mostre o host como único binário | 3.4.7 #25 | ativo ou abandonado | — | resolvido pelo snapshot |
| 6 | A tabela comparativa do Turborepo descreve o Re.Pack como "webpack + MF", e os artefatos usam Rspack | 3.4.7 #31 | estágios em conflito | 0d870b5 2026-05-23 init: MyGym TCC — monolith e turborepo PoCs; 22fcdfc 2026-06-24 first repack poc commit | esclarecido |

## Observações

**1. Medição de antes/depois do `phosphor-react-native`.** A mensagem de `5097f5f` (2026-07-09)
anuncia "phosphor no shared + libs pesadas no ARCHITECTURE", e o commit altera só
`apps/repack/packages/shared-deps/sharedDeps.mjs` e `apps/repack/ARCHITECTURE.md`; a versão do helper
nesse commit já tem `'phosphor-react-native'` (linha 45). A versão anterior (`58df5eb`) não está
disponível, então o clone não mostra o helper sem a lib. Nenhum commit até o snapshot grava uma medição
de chunks: os únicos arquivos de medição são os de `scripts/`, criados em `22fcdfc` (monolito e
Turborepo) e em `e5a77a1` (`measure-repack.sh` e `repack_build_isolated.csv`, build isolado, não
download por aba). O histórico confirma que a correção é um passo próprio, posterior aos mini-apps, mas
não mostra o estado anterior nem os números. `inconclusivo`.

**2. `poc-evidence.png` e o download pelo `ScriptManager`.** A captura entra em `79cf054`
(2026-06-29), no mesmo commit que cria o `apps/repack-poc/README.md` que a cita, nunca é removida
(`log --diff-filter=D` vazio) e está na árvore do commit do snapshot (`ls-tree`, blob `a321bb1`,
disponível no clone). A ausência vem da normalização da aquisição (preset `binaries`), não do
repositório. O histórico não responde à outra metade: qual camada baixa o bundle do remote é
comportamento em execução, e nenhum commit da spike configura o `ScriptManager`. `esclarecido` quanto à
captura, que existe no commit; não li o conteúdo dela.

**3. O remote da spike "não roda sozinho".** `apps/repack-poc/remote/App.tsx`, `index.js` e
`package.json` são criados em `22fcdfc` (2026-06-24) e não mudam até o snapshot. `79cf054`
(2026-06-29) acrescenta a `HelloScreen` e altera o `rspack.config.mjs` do remote, sem tocar nesses três
arquivos, e cria o README com a frase. A entrada própria do remote, com o `App` do template, é portanto
o que veio na criação do projeto e nunca foi adaptada; a frase do README foi escrita depois, sobre o uso
na spike. O histórico não mostra se o remote foi executado sozinho. `esclarecido` para os arquivos
consultados.

**4. `pnpm catalog` como fonte única.** `apps/repack/pnpm-workspace.yaml` muda pela última vez em
`16317fb` (2026-06-29), e essa versão, disponível no clone, é a do snapshot: já tem o comentário "Fonte
única das versões das libs compartilhadas" e já não tem `react`, `react-native` nem
`phosphor-react-native` no catalog. As versões anteriores (`2260101`, `4dc0716`) não estão disponíveis.
O `package.json` do host muda pela última vez em `3d31f97` (2026-07-04), e essa versão já declara
`phosphor-react-native`, `react` e `react-native` com versão literal (linhas 25-27); os de check-in e
dashboard mudam pela última vez em `d505d6c` (2026-07-09), antes de `8232ce1`, que cria
`apps/repack/ARCHITECTURE.md`. `phosphor-react-native` entra no `shared` só em `5097f5f`, depois disso,
sem entrar no catalog. Quando o `ARCHITECTURE.md` passou a existir, o catalog e os manifestos já
estavam como no snapshot: a divergência não é resto de um estágio anterior observável. Não se sabe se o
catalog das duas primeiras versões tinha `react`. `esclarecido` para as versões disponíveis.

**5. Projeto nativo ausente.** O próprio snapshot explica a ausência: o `.gitignore` raiz ignora
`ios/` e `android/` (`.gitignore:18-19`, sob o comentário "Native (gerado por expo prebuild)"), e
`apps/repack/README.md:83` diz que o `ios/` não é versionado. Uma busca por caminhos `*/ios/*` e
`*/android/*` em todo o histórico até o snapshot não encontra nada. Se o host é o único binário
instalado continua sendo comportamento de build nativo, que nem o snapshot nem o histórico registram.
`resolvido pelo snapshot`.

**6. "webpack + MF" na tabela do Turborepo.** `apps/turborepo/ARCHITECTURE.md` é criado em `0d870b5`
(2026-05-23) e nunca muda: o blob é o mesmo nesse commit e no snapshot (`ae6818f`). Ele é um mês
anterior ao primeiro arquivo Re.Pack (`22fcdfc`, 2026-06-24), que já cria `rspack.config.mjs` para host
e remote, e nenhum arquivo com `webpack` no nome existe em qualquer commit. A linha 267 descreve,
portanto, uma versão Re.Pack que ainda não existia no repositório, e não foi revista depois que a
implementação usou Rspack. `esclarecido`: o texto é anterior à implementação; o histórico não diz se
houve uma configuração webpack fora do repositório.

## Comandos

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # antes: igual
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba rev-list --count c569ccc6582475495a637d44ceed33c62c0f6e86
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/shared-deps/sharedDeps.mjs
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status 5097f5f
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status e5a77a1
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/remote/App.tsx apps/repack-poc/remote/index.js apps/repack-poc/remote/package.json apps/repack-poc/README.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/poc-evidence.png '*.png'
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --diff-filter=D c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/poc-evidence.png   # saída vazia
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/pnpm-workspace.yaml
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/ARCHITECTURE.md apps/repack/packages/host/package.json apps/repack/packages/check-in/package.json apps/repack/packages/dashboard/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/turborepo/ARCHITECTURE.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- '*webpack*'   # saída vazia
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- '*/ios/*' '*/android/*'   # saída vazia
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/host/assets/fonts/
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/host/assets/fonts .gitignore
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status --full-history c569ccc6582475495a637d44ceed33c62c0f6e86 -- scripts docs Docs
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status 22fcdfc
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %p' 5097f5f -1   # recusado pelo script (opção -1 não permitida); não chegou ao git
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba rev-list --merges --count c569ccc6582475495a637d44ceed33c62c0f6e86
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %p' 5097f5f
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree 0d870b5 -- apps/turborepo/ARCHITECTURE.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba ls-tree c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/turborepo/ARCHITECTURE.md
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 58df5eb:apps/repack/packages/shared-deps/sharedDeps.mjs   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 5097f5f:apps/repack/packages/shared-deps/sharedDeps.mjs
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 2260101:apps/repack/pnpm-workspace.yaml   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 4dc0716:apps/repack/pnpm-workspace.yaml   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 16317fb:apps/repack/pnpm-workspace.yaml
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 8232ce1:apps/repack/ARCHITECTURE.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 0147b09:apps/repack/ARCHITECTURE.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 58df5eb:apps/repack/ARCHITECTURE.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 5097f5f:apps/repack/ARCHITECTURE.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/host/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/check-in/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack/packages/dashboard/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 16317fb:apps/repack/packages/host/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 3d31f97:apps/repack/packages/host/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show 5097f5f:apps/repack/packages/host/package.json
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba cat-file -t a321bb1366c925c6c91fdfde11f2a8d89ce75156
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba show --format='%h %ad %s' --date=short --name-status 79cf054
docs/mfe-history-review/tools/hist.sh raiane-honorato__software-eng-mba log --format='%h %ad %s' --date=short --name-status c569ccc6582475495a637d44ceed33c62c0f6e86 -- apps/repack-poc/remote apps/repack-poc/host
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # depois: igual
```

Cinco chamadas `show` com `<hash>:<caminho>` (as de `58df5eb` e `5097f5f` em `sharedDeps.mjs` e as
três de `pnpm-workspace.yaml`) foram recusadas pelo script antes de chegar ao git, por um erro de
expansão do shell na revisão, e repetidas com a revisão entre aspas (as linhas acima).

## Resumo

Commits até o snapshot: 29 (2026-05-23 a 2026-09-10). Pontos: 6 (esclarecido: 4, inconclusivo: 1, resolvido pelo snapshot: 1).
