---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
inputs:
  clone: data/samples/mfe-sample-001/repos/ral-facilities__scigateway
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Leitura do repositório

O histórico alcançável até o snapshot tem 2.957 commits, de 2019-03-12 a 2026-10-07. Começa em `fcc61a6` (2019-03-12, “Initial commit”) e termina no snapshot `fadb600` (2026-10-07, “Merge pull request #1673 from ral-facilities/dependabot/npm_and_yarn/brace-expansion-1.1.21”). As etapas 3.4.2 a 3.4.6 não deixaram dependências, unidades, construções, relações ou deploys indeterminados. Os três pontos vêm das afirmações parciais ou contraditas de 3.4.7; as duas referências a stores no carregador formam uma única dúvida.

O log registra a criação de `src/state/actions/loadMicroFrontends.tsx` em `336bf97` (2019-03-26, “Started adding the ability to load plugins in the parent app, added a tool to host plugins”). Isso estabelece a introdução desse arquivo, mas não a origem dos comentários nem a existência anterior de passagem de stores. A mensagem de `3f0c185` (2024-11-11, “Generate custom admin tabs from plugin routes #1418”) anuncia abas de administração geradas das rotas dos plugins; a de `47bc22e` (2022-03-11, “Fix plugin loading bug by moving where singleSpa.start is called - also add in triggerAppChange call in middleware for if a plugin loads its settings really late”) anuncia a correção de carga tardia. Os conteúdos antigos tentados para esses marcos falharam com `fatal: bad object`, sem busca de objetos. Os metadados não permitem confirmar um desenho anterior com stores, a origem dos comentários ou o comportamento interno dos plugins externos. O snapshot já delimita o funcionamento atual, mas não resolve essas perguntas históricas; os três pontos ficam inconclusivos.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O comentário delega subrotas de administração aos plugins, cujo código não está no snapshot. | 3.4.7 #12 (src/routing/routing.component.tsx:78-81) | estágios em conflito | 3f0c185, 2024-11-11, Generate custom admin tabs from plugin routes #1418; 4dcb3a2, 2026-03-12, Fix admin plugin route routing | inconclusivo |
| 2 | O carregador menciona passagem de store e globalEventDistributor e espera por stores, mas o código atual só carrega scripts e registra plugins. | 3.4.7 #17 e #18 (src/state/actions/loadMicroFrontends.tsx:30, 83) | estágios em conflito | 336bf97, 2019-03-26, Started adding the ability to load plugins in the parent app, added a tool to host plugins; d3eec25, 2019-04-05, Updated how the plugins load as well as the theming | inconclusivo |
| 3 | O comentário atribui o atraso das rotas à leitura de settings dos plugins, sem esse comportamento no bundle de demonstração do snapshot. | 3.4.7 #23 (src/state/middleware/scigateway.middleware.tsx:148) | estágios em conflito | 47bc22e, 2022-03-11, Fix plugin loading bug by moving where singleSpa.start is called - also add in triggerAppChange call in middleware for if a plugin loads its settings really late | inconclusivo |

## Observações

**1. Subrotas de administração.** O snapshot mostra o host guardando o segundo segmento do link e criando contêineres por plugin e aba (src/routing/routing.component.tsx:83-88; src/adminPage/adminPage.component.tsx:25-50, 130-149), sem o código dos plugins que trataria os subcaminhos. O log registra alterações no roteador em `3f0c185` e `4dcb3a2`; as mensagens anunciam geração de abas e correção de roteamento administrativo, respectivamente. A tentativa de ler o roteador em `3f0c185` falhou com `fatal: bad object`. Sem esse conteúdo e sem o código externo, não se sabe se o comentário descreve um estágio anterior, um contrato efetivamente cumprido por plugins ou somente a responsabilidade esperada deles. A afirmação parcial do snapshot permanece sem explicação histórica conclusiva.

**2. Stores e globalEventDistributor.** No snapshot, `registerApplication` recebe só nome, função de carga e função de atividade; `Promise.all` espera as promessas de `loadApp`, e não uma operação explícita de carga de stores (src/state/actions/loadMicroFrontends.tsx:27-49, 56-60, 83-84). Isso confirma a divergência textual já registrada em 3.4.7, mas não diz se houve remoção, cópia ou intenção nunca conectada. O log marca o arquivo como adicionado em `336bf97` e alterado em `d3eec25`; a segunda mensagem anuncia atualização do carregamento e do tema. Ambas as tentativas de ler esses conteúdos falharam com `fatal: bad object`. Não é possível afirmar que o comentário já existia na criação, nem que um store ou distribuidor tenha sido passado em algum momento. As duas afirmações ficam reunidas num ponto inconclusivo, sem inferir abandono.

**3. Settings dos plugins e rotas tardias.** No snapshot, o middleware chama `triggerAppChange` se a rota recebida corresponde à URL atual e o plugin está `NOT_LOADED` (src/state/middleware/scigateway.middleware.tsx:149-157); o bundle de demonstração envia rotas sem ler settings (server/e2e-plugin/main.js:20). A mensagem de `47bc22e` anuncia a adição de `triggerAppChange` para o caso de um plugin carregar settings tarde, e o log marca alterações tanto no middleware quanto no carregador. A leitura do middleware nesse commit falhou com `fatal: bad object`. A mensagem documenta a motivação anunciada para a mudança, mas não comprova que os plugins externos liam configurações, nem que o bundle de demonstração do snapshot substituiu uma versão que o fazia. O histórico consultado não resolve essa parte da afirmação.

## Comandos

Comparações antes e depois das consultas, ambas sem diferenças:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Consultas limitadas ao snapshot ou a commits retornados pelo log desse snapshot:

```sh
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway rev-list --count fadb600e1fa4c8a64daefbf8f2541998e559979c
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --reverse fadb600e1fa4c8a64daefbf8f2541998e559979c | sed -n '1p;$p'
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --name-status --no-renames fadb600e1fa4c8a64daefbf8f2541998e559979c -- src/state/actions/loadMicroFrontends.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --name-status --no-renames fadb600e1fa4c8a64daefbf8f2541998e559979c -- src/routing/routing.component.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway log --format=%h%x09%as%x09%s --name-status --no-renames fadb600e1fa4c8a64daefbf8f2541998e559979c -- src/state/middleware/scigateway.middleware.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show 336bf97:src/state/actions/loadMicroFrontends.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show d3eec25:src/state/actions/loadMicroFrontends.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show 3f0c185:src/routing/routing.component.tsx
docs/mfe-history-review/tools/hist.sh ral-facilities__scigateway show 47bc22e:src/state/middleware/scigateway.middleware.tsx
```

Os quatro `show` falharam com `fatal: bad object <revisão:caminho>` (conteúdo histórico indisponível localmente). A primeira tentativa de `rev-list --count` foi impedida antes da consulta por falta de permissão para gravar `tools/commands.log`; a repetição autorizada retornou a contagem acima. Nenhuma consulta usou outro acesso ao clone.

## Resumo

Commits até o snapshot: 2957 (2019-03-12 a 2026-10-07). Pontos: 3 (esclarecido: 0, inconclusivo: 3, resolvido pelo snapshot: 0).
