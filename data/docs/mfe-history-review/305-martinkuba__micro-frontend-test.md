---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
inputs:
  clone: data/samples/mfe-sample-001/repos/martinkuba__micro-frontend-test
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Leitura do repositório

O histórico até o snapshot tem 11 commits, de 2026-01-06 a 2026-01-07. No primeiro, `efec921` (2026-01-06, "init"), já aparecem os fontes do shell, main-content e sidebar. As entradas dos dois remotes apenas reexportam componentes nessa primeira presença observável e não voltam a mudar. Isso delimita a evidência histórica sobre suas entradas; não demonstra execução autônoma nem informa onde o código foi feito antes.

`aaf32b6` (2026-01-06, "run all apps on different ports to guarantee separation") cria os manifestos e configurações webpack dos três pacotes; `364c596` (2026-01-07, "deleted root webpack config") remove a configuração webpack da raiz. A mensagem de `3174dd1` (2026-01-07, "removed side app for now") anuncia a retirada temporária do sidebar e a listagem registra alterações no manifesto da raiz, no App e na configuração do host. O texto de status do sidebar já existia antes dessa mensagem e permanece no snapshot. O último commit, `f629b5b` (2026-01-07, "added readme"), adiciona o README.

Foi possível ler as entradas originais dos remotes e uma versão do componente sidebar anterior à retirada anunciada. Os blobs antigos do App e da configuração do host consultados não estão disponíveis localmente: as consultas falharam sem busca na rede. Assim, a ligação anterior do sidebar não foi confirmada por conteúdo. Nenhum julgamento do snapshot é alterado.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | Main-content tem entrada que só reexporta o componente, sem montagem autônoma demonstrada | 3.4.3 (Unidades: packages/main-content, Undetermined); 3.4.7 #7 | estágios em conflito | efec921 2026-01-06 init | esclarecido |
| 2 | Sidebar tem entrada que só reexporta o componente, sem montagem autônoma demonstrada | 3.4.3 (Unidades: packages/sidebar, Undetermined) | estágios em conflito | efec921 2026-01-06 init | esclarecido |
| 3 | Sidebar está desligado no host, mas preserva texto de carregamento federado | 3.4.4 (packages/shell/src/App.tsx:7,206-214); 3.4.5 (Leitura: sidebar desligado); 3.4.7 #12 | ativo ou abandonado | eb20348 2026-01-07 added buttons to trigger signals in parent shell; 3174dd1 2026-01-07 removed side app for now | inconclusivo |

## Observações

**1. Entrada de main-content.** `show efec921:packages/main-content/src/index.ts` mostra apenas `export { default as MainContent } from './MainContent';`. A listagem completa de alterações até o snapshot registra a criação dessa entrada em `efec921` e nenhuma alteração posterior. O snapshot mantém esse conteúdo (packages/main-content/src/index.ts:1); sua configuração aponta para ele (packages/main-content/webpack.config.js:8). O histórico esclarece, no limite desse arquivo, que a entrada sem montagem não resulta da remoção posterior de um bootstrap autônomo. Não demonstra execução independente passada ou presente, nem esclarece a intenção da frase em packages/main-content/src/MainContent.tsx:160. O Undetermined estrutural e a afirmação sem corroboração permanecem.

**2. Entrada de sidebar.** `show efec921:packages/sidebar/src/index.ts` mostra apenas `export { default as Sidebar } from './Sidebar';`. Essa entrada também só é criada no primeiro commit e não tem alterações posteriores na listagem até o snapshot. Seu conteúdo atual e a referência na configuração (packages/sidebar/src/index.ts:1; packages/sidebar/webpack.config.js:8) coincidem com essa organização. O histórico esclarece que esse arquivo não perdeu uma montagem autônoma ao longo dos commits observados. Isso não comprova uma UI autônoma em outro contexto e não muda o Undetermined da estrutura; a desconexão do host é outro ponto.

**3. Sidebar desligado com texto de carregamento.** A versão de packages/sidebar/src/Sidebar.tsx em `eb20348`, lida por inteiro, já contém “✓ Loaded via Module Federation”. A listagem não registra alterações posteriores nesse arquivo, portanto o texto antecede a retirada anunciada em `3174dd1` e permanece no snapshot (packages/sidebar/src/Sidebar.tsx:158). A mensagem de `3174dd1` anuncia “removed side app for now”; seus caminhos alterados são package.json, packages/shell/src/App.tsx e packages/shell/webpack.config.js. O snapshot confirma import, montagem e remote comentados (packages/shell/src/App.tsx:7,206-214; packages/shell/webpack.config.js:36) e o start da raiz sem sidebar (package.json:7). Porém, as consultas ao App em `61ab9ca` e à configuração do host em `aaf32b6` falharam por objetos ausentes. Não foi possível verificar por conteúdo se a ligação anterior estava ativa, nem atribuir a esse commit todas as linhas comentadas atuais. A mensagem e a permanência do texto não bastam para provar uso anterior ou abandono definitivo. O ponto fica inconclusivo; a construção No e a afirmação contradita do snapshot permanecem.

## Comandos

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test log --reverse --format='%h %ad %s' --date=short --name-status f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test rev-list --count f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show efec921:packages/main-content/src/index.ts
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show efec921:packages/sidebar/src/index.ts
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show 61ab9ca:packages/shell/src/App.tsx
# Falhou: fatal: bad object 61ab9ca:packages/shell/src/App.tsx (objeto ausente, sem busca).
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show aaf32b6:packages/shell/webpack.config.js
# Falhou: fatal: bad object aaf32b6:packages/shell/webpack.config.js (objeto ausente, sem busca).
docs/mfe-history-review/tools/hist.sh martinkuba__micro-frontend-test show eb20348:packages/sidebar/src/Sidebar.tsx
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

As duas comparações de fingerprint, antes e depois das consultas, coincidiram com a referência. Todos os commits de conteúdo consultados aparecem no log limitado ao snapshot.

## Resumo

Commits até o snapshot: 11 (2026-01-06 a 2026-01-07). Pontos: 3 (esclarecido: 2, inconclusivo: 1, resolvido pelo snapshot: 0).
