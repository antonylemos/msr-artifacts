---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
inputs:
  clone: data/samples/mfe-sample-001/repos/Marcel-b-velop__vue-mf
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Leitura do repositório

O histórico até o snapshot tem 29 commits, 4 deles merges, de 2025-11-22 (`9ab7627`, "Initial commit",
só o `LICENSE`) a 2025-11-30 (`ed270d3`, "Merge pull request #3 from Marcel-b-velop/feature/wip", o
commit do snapshot). `0f527a1` (2025-11-22, "start") cria `app-1/`, `host/` e `lib/` a partir do
template do Vite; `9a31597` (2025-11-22, "tailwind") cria o router do host com as views `Home.vue` e
`About.vue`. O `README.md` da raiz é criado em `1cf6fc1` (2025-11-23, "Doku") e alterado em `ae88211`
(2025-11-23, "Doku ergänzt") e `312d8f3` (2025-11-23, "API aufgeräumt und Vite Configs optimiert"). Esta
é a última versão, igual à do snapshot (objeto `33e4c0a`). O workspace pnpm entra em `b36d55e`
(2025-11-23, "Scripts und Workspace und client"). `app-2/` inteira, o IdentityServer, as rotas novas
do host e a mudança do `pnpm-workspace.yaml` vêm todos num mesmo commit, `184c4ab` (2025-11-30, "Tests
und Login"), uma semana depois da última mudança do README. Depois dele, só `26e7bd2` (2025-11-30,
"Config") e o merge do snapshot.

O clone permite ver mensagens, arquivos tocados por commit (com `--no-renames`) e identificadores de
objetos. Nenhuma versão antiga consultada está disponível: `cat-file -e` falhou por objeto ausente em
todas as versões anteriores testadas do README, do router, do `App.vue`, do `main.ts`, da `About.vue`,
da `Navigation.vue`, dos `vite.config.ts` e do `pnpm-workspace.yaml`. `show -s` também falhou em
`312d8f3` e `b09c7eb`. As mensagens desses dois commits saíram pelo `log`. Os pontos se apoiam só em
mensagens, caminhos e identificadores.

Das revisões anteriores, vira ponto a construção `No` da 3.4.4 (`AppTwo` registrado e sem uso, que a
Leitura da 3.4.5 também cita). Viram pontos também as afirmações `contradita` e `parcial` da 3.4.7 (#1,
#2, #6, #11). A 3.4.2 tem as quatro dependências `Yes`. A 3.4.3 não tem unidade `Undetermined`, a 3.4.5
não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. As outras linhas `No` da 3.4.4
são falsos positivos ou comunicação interna de app-2. A relação 3.4.5 #6 (`remote-lib` declarado em
app-2, `Ativa = No`) e o store host/src/stores/authStore.ts, sem import, não são pontos pelo passo 2. O
histórico só mostra que `app-2/vite.config.ts` é criado em `184c4ab` e não muda até o snapshot (mesmo
objeto `839bc53`). O store é criado em `b09c7eb` (2025-11-23, "wip") e alterado em `312d8f3`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O host carrega e registra o `App2` de app-2 como `AppTwo`, mas nenhum template usa `<AppTwo>`. | 3.4.4 (host/src/main.ts:13); 3.4.5 (Leitura) | ativo ou abandonado | 184c4ab 2025-11-30 Tests und Login; 26e7bd2 2025-11-30 Config | inconclusivo |
| 2 | O README diz que todas as páginas são módulos remotos, mas a rota `/about` é uma página local do host. | 3.4.7 #1 | estágios em conflito | 9a31597 2025-11-22 tailwind; 1cf6fc1 2025-11-23 Doku; b09c7eb 2025-11-23 wip; 184c4ab 2025-11-30 Tests und Login | inconclusivo |
| 3 | O README diz que o host tem cabeçalho e rodapé, e o host não tem nenhum dos dois. | 3.4.7 #2 | ativo ou abandonado | 0f527a1 2025-11-22 start; b09c7eb 2025-11-23 wip; 312d8f3 2025-11-23 API aufgeräumt und Vite Configs optimiert | inconclusivo |
| 4 | O README fala em três partes (Host, App1, Lib), e o snapshot tem quatro unidades, com app-2. | 3.4.7 #6 | estágios em conflito | 312d8f3 2025-11-23 API aufgeräumt und Vite Configs optimiert; 184c4ab 2025-11-30 Tests und Login | esclarecido |
| 5 | O bloco `build` que o README atribui a Lib e App1 não corresponde às configurações atuais. | 3.4.7 #11 | estágios em conflito | 312d8f3 2025-11-23 API aufgeräumt und Vite Configs optimiert; a6a6c0c 2025-11-23 Fehler korrigiert; a0f3e3b 2025-11-23 optimiert; 22bb24e 2025-11-24 Update vite.config.ts; 1727c5a 2025-11-24 Update vite.config.ts; 184c4ab 2025-11-30 Tests und Login; 26e7bd2 2025-11-30 Config | esclarecido |

## Observações

**1. `AppTwo` registrado e sem uso.** O `host/src/main.ts` do snapshot (objeto `12f07a4`) é a versão de
`184c4ab`, o mesmo commit que cria `app-2/`, com o `vite.config.ts` que expõe `./App2`. Logo, a
primeira presença observável do registro é a da própria app-2. A versão anterior do `main.ts`
(`b09c7eb`) não está disponível. Dos templates do host, `App.vue`, `Home.vue` e `About.vue` não mudam
desde antes de `184c4ab` (mesmos objetos em `312d8f3` e no snapshot), então nenhum deles usou
`<AppTwo>` e deixou de usar depois. O único template do host que muda em `184c4ab` e outra vez em
`26e7bd2` ("Config") é `host/src/components/Navigation.vue`, e a versão de `184c4ab` não está
disponível. O histórico não exclui que `<AppTwo>` tenha sido usado ali e retirado em `26e7bd2`.
Conclusão: o registro nasce junto com app-2. Fica em aberto se foi usado em algum momento. Inconclusivo,
e a construção continua `No`.

**2. `/about` local, contra "as páginas são remotas".** O router do host e a `About.vue` são criados em
`9a31597` (2025-11-22), antes do README (`1cf6fc1`, 2025-11-23). O router fica igual (objeto `6642dc1`)
até `184c4ab` (2025-11-30), que o altera junto com a criação de app-2. É a mudança em que entram as rotas
remotas `/login` e `/register` do snapshot (host/src/router/index.ts:7-8). A `About.vue` muda em `c2203cd`
e `b09c7eb` e fica igual (objeto `b1fc03b`) até o snapshot. Nenhuma versão antiga do router nem da
`About.vue` está disponível. O histórico não mostra se a página `/about` chegou a ter conteúdo remoto, e
portanto não diz se ela é resto de um estágio anterior ou uma página que nunca foi convertida. O que se
vê é que o arquivo da página existe no host desde antes do README. Inconclusivo.

**3. Cabeçalho e rodapé do host.** Em nenhum commit até o snapshot há arquivo com "header" ou "footer"
no nome sob `host/`. Os componentes do host foram só `HelloWorld.vue` (criado em `0f527a1`, removido em
`b09c7eb`) e `Navigation.vue` (criado em `b09c7eb`). O `host/src/App.vue` do snapshot é a versão de
`b09c7eb` (objeto `f26dbe2`). As anteriores (`9a31597`, `c2203cd`) não estão disponíveis, então o
histórico não mostra se elas tinham marcação de cabeçalho ou rodapé dentro do próprio `App.vue`. A
última versão do README, `312d8f3`, é posterior a `b09c7eb` e é a que diz "Es fehlt noch der Footer"
(README.md:60). Conclusão, delimitada aos caminhos: o host nunca teve componente próprio de cabeçalho ou
rodapé. O conteúdo das versões antigas do `App.vue` não pode ser lido. Inconclusivo.

**4. Três partes em vez de quatro.** O README é alterado pela última vez em `312d8f3` (2025-11-23); o
objeto `33e4c0a` é o mesmo do snapshot. `app-2/` não existe até `184c4ab` (2025-11-30), que cria
todos os seus arquivos e altera o `pnpm-workspace.yaml` (objeto `a2a9d33` em `b36d55e`, `abb2aaa` em
`184c4ab` e no snapshot). Nenhum commit depois de `184c4ab` altera o README. Conclusão, delimitada a
esses arquivos: o README é de um estágio anterior à criação de app-2 e não foi atualizado depois. A
contagem "die drei Teile" (README.md:22) corresponde ao repositório de antes de `184c4ab`. A quarta
unidade é posterior, e não é uma omissão do mesmo estágio. A afirmação continua `contradita`.

**5. Bloco `build` de Lib e App1.** A última versão do README é a de `312d8f3`, cuja mensagem
anuncia "Vite Configs optimiert". Esse commit altera `host/vite.config.ts` e `lib/vite.config.ts`, mas
não `app-1/vite.config.ts`. Depois dele, até o snapshot, o `app-1/vite.config.ts` muda em `a6a6c0c`,
`a0f3e3b`, `22bb24e`, `1727c5a` e `26e7bd2`; o do host em `a0f3e3b` e `184c4ab`; e o de lib em `184c4ab` e
`26e7bd2`. Os três objetos do snapshot (`77ccb82`, `2d83983`, `22b4f27`) diferem dos que existiam em
`312d8f3` (`de448c4`, `363a02c`, `f5af481`). As versões antigas não estão disponíveis, então o histórico
não mostra se o bloco do README (README.md:28-34) coincidia com as configurações daquele momento.
Conclusão, delimitada a esses arquivos: o README e as três configurações atuais são de estágios
diferentes. Todas as configurações mudaram depois da última edição do README, várias vezes no caso de
app-1. A diferença vem dessa sequência, e não de configurações que nunca mudaram. A afirmação continua
`contradita`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf rev-list --count ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf rev-list --count --merges ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short --reverse --name-status --no-renames ed270d34b0542cb1a0ce26aafc2aeba4bca994e1   # saída filtrada fora do clone: sem linhas de lib/playwright-report/
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 9a31597 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 1cf6fc1 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r c2203cd -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r ae88211 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r b36d55e -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r b09c7eb -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 312d8f3 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r a0f3e3b -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 184c4ab -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r 26e7bd2 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree -r ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- README.md host/src/App.vue host/src/main.ts host/src/router/index.ts host/src/views host/src/components host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 1cf6fc1:README.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e ae88211:README.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 9a31597:host/src/router/index.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 9a31597:host/src/App.vue   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e c2203cd:host/src/App.vue   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e b09c7eb:host/src/main.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 312d8f3:host/vite.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 312d8f3:app-1/vite.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 312d8f3:lib/vite.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e c2203cd:host/src/views/About.vue   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 1cf6fc1
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short ae88211
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 312d8f3   # falhou: objeto ausente (could not fetch 8f52beb75760ebe9121b0da31261e5194ded6c44 from promisor remote)
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short a0f3e3b
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 184c4ab
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short 26e7bd2
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf show -s --format='%h %ad%n%B' --date=short b09c7eb   # falhou: objeto ausente (could not fetch 0cc9273a1740f8cb4961c43daa917f443c72adc8 from promisor remote)
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- README.md
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host/src/router/index.ts host/src/main.ts host/src/App.vue
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- app-2 pnpm-workspace.yaml
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host/vite.config.ts app-1/vite.config.ts lib/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short --name-status --no-renames ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host   # saída filtrada fora do clone por header|footer: nenhuma linha
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad [%B]' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1   # saída filtrada fora do clone: mensagens de 312d8f3, b09c7eb e 184c4ab
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 184c4ab:host/src/components/Navigation.vue   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e 184c4ab:host/src/main.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf cat-file -e b36d55e:pnpm-workspace.yaml   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf log --format='%h %ad %s' --date=short ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- host/src/stores/authStore.ts app-2/vite.config.ts host/src/components/Navigation.vue
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree ed270d34b0542cb1a0ce26aafc2aeba4bca994e1 -- pnpm-workspace.yaml app-2/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree 184c4ab -- pnpm-workspace.yaml app-2/vite.config.ts
docs/mfe-history-review/tools/hist.sh Marcel-b-velop__vue-mf ls-tree b36d55e -- pnpm-workspace.yaml
```

## Resumo

Commits até o snapshot: 29 (2025-11-22 a 2025-11-30). Pontos: 5 (esclarecido: 2, inconclusivo: 3, resolvido pelo snapshot: 0).
