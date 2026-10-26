---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
inputs:
  clone: data/samples/mfe-sample-001/repos/jaideepsinghchauhan__Angular-MFE
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Leitura do repositório

Há quatro commits até o snapshot, de 2025-06-17 a 2025-06-29. A árvore de `f716548` (2025-06-17, “Initial commit”) já contém o workspace Nx, a aplicação `apps/angular-monorepo` e seus testes, mas não contém `appshell/`. Portanto, esse primeiro commit é a primeira presença observável do workspace, não a introdução de todo o código a partir de uma árvore vazia inspecionada. `6a85acf` (2025-06-29, “Initial commit”) adiciona os artefatos de host, mfe1 e greeting consultados, além de alterar package.json e nx.json. Os dois commits seguintes, `0a0848e` e `7648339` (ambos 2025-06-29, “Update README.md”), alteram somente o README entre os caminhos consultados.

O histórico dos arquivos de greeting e do project.json de mfe1 permite delimitar os conflitos: suas primeiras versões já têm a exposição divergente e a dependência de execução do host, e esses arquivos não mudam até o snapshot. Isso não demonstra abandono nem intenção. O conteúdo de package.json do primeiro commit e do README intermediário não está disponível localmente; as consultas falharam sem buscar objetos. Os julgamentos das etapas anteriores permanecem os do snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@nx/js` está declarado sem uso observado | 3.4.2 (package.json:33) | uso de dependência | f716548 2025-06-17 Initial commit; 6a85acf 2025-06-29 Initial commit | inconclusivo |
| 2 | `@nx/webpack` está declarado sem uso observado | 3.4.2 (package.json:37) | uso de dependência | f716548 2025-06-17 Initial commit; 6a85acf 2025-06-29 Initial commit | inconclusivo |
| 3 | `@nx/workspace` está declarado sem uso observado | 3.4.2 (package.json:38) | uso de dependência | f716548 2025-06-17 Initial commit; 6a85acf 2025-06-29 Initial commit | inconclusivo |
| 4 | O host importa `mfe1/GreetingRoutes`, mas mfe1 expõe `./GreetingComponent` | 3.4.4 (appshell/host/src/app/app.routes.ts:16); 3.4.5 #2 e Leitura (exposição sem consumidor); 3.4.7 #3 | estágios em conflito | 6a85acf 2025-06-29 Initial commit; 0a0848e 2025-06-29 Update README.md; 7648339 2025-06-29 Update README.md | esclarecido |
| 5 | O README afirma independência de mfe1, mas seu `serve` depende do host | 3.4.7 #7; 3.4.6 #3 (appshell/mfe1/project.json:75) | estágios em conflito | 6a85acf 2025-06-29 Initial commit; 0a0848e 2025-06-29 Update README.md; 7648339 2025-06-29 Update README.md | esclarecido |

## Observações

**1. `@nx/js` sem uso observado.** package.json existe em `f716548`, muda em `6a85acf` e não muda depois. A versão de `6a85acf` contém `@nx/js: 21.2.0`, como package.json:33 do snapshot. A consulta do manifesto inicial falhou com `bad object`; não foi possível estabelecer se a declaração já existia naquele estágio nem esclarecer um eventual uso anterior. O histórico consultado não distingue dependência herdada do scaffold, planejada ou abandonada. Permanece inconclusivo, sem alterar `No` na 3.4.2.

**2. `@nx/webpack` sem uso observado.** O mesmo histórico do manifesto vale para package.json:37: a declaração `21.2.0` está presente em `6a85acf` e permanece até o snapshot. Como o conteúdo do manifesto inicial não está disponível e a presença da declaração não demonstra uso, não é possível explicar se houve abandono ou apenas inclusão sem configuração. Permanece inconclusivo; os builds do snapshot continuam sendo os de `@nx/angular:webpack-browser` registrados na 3.4.2.

**3. `@nx/workspace` sem uso observado.** A declaração de package.json:38 também está na versão de `6a85acf`, sem mudança posterior no manifesto. A versão inicial indisponível impede comparar a declaração antes da adição de `appshell/`; os caminhos da árvore inicial não respondem ao uso do pacote. Não há base para atribuir intenção, cópia ou abandono. Permanece inconclusivo, preservando o julgamento da 3.4.2.

**4. Divergência de greeting.** O log registra a adição de appshell/host/src/app/app.routes.ts, appshell/host/src/remotes.d.ts, appshell/mfe1/module-federation.config.ts e dos dois arquivos de greeting em `6a85acf`, sem mudanças posteriores nesses caminhos. O conteúdo lido nessa versão já importa `mfe1/GreetingRoutes` no host e expõe `./GreetingComponent` em mfe1. Assim, nos arquivos consultados, não há uma versão anterior com as chaves correspondentes que tenha sido desativada depois: a divergência acompanha a introdução desses artefatos no histórico. No snapshot, README.md:171-190 instrui acrescentar `./GreetingRoutes`, mas reproduz a exposição de `./GreetingComponent`; o README intermediário de `0a0848e` não pôde ser lido. Os commits de documentação não permitem atribuir intenção ou verificar a evolução desse trecho. O resultado é esclarecido quanto à coexistência das duas chaves desde a primeira versão dos arquivos de código e configuração, sem afirmar abandono ou corrigir o `Undetermined` da 3.4.4.

**5. Independência de mfe1.** appshell/mfe1/project.json é adicionado em `6a85acf` e não muda depois. Sua versão inicial já tem `dependsOn: ["host:serve"]` no target `serve`, igual a appshell/mfe1/project.json:75 do snapshot. Portanto, nesse arquivo não existe um estágio de execução por esse target sem a dependência do host que explique a afirmação de README.md:250 como descrição de uma configuração anterior. A discrepância de greeting da mesma afirmação está no ponto 4. A indisponibilidade do README intermediário impede datar a frase ou interpretar sua intenção, mas não impede esclarecer a estabilidade da configuração de execução. A conclusão fica limitada a esse target e não altera a corroboração da 3.4.7.

## Comandos

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE log --reverse --format='%H %cs %s' 7648339ce74e8c78f86680e8ef8011e1010cc3e3
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE log --reverse --format='%h %cs %s' --name-status 7648339ce74e8c78f86680e8ef8011e1010cc3e3 -- package.json nx.json appshell/host/src/app/app.routes.ts appshell/host/src/remotes.d.ts appshell/mfe1/module-federation.config.ts appshell/mfe1/src/app/greeting appshell/mfe1/project.json README.md
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE show f71654816d2654051d37c02b37652415b94e0801:package.json
# Falhou: fatal: bad object f71654816d2654051d37c02b37652415b94e0801:package.json
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE show 6a85acf2eb2afa1b087896f5e809585f93e51f03:appshell/mfe1/module-federation.config.ts
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE show 6a85acf2eb2afa1b087896f5e809585f93e51f03:appshell/host/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE show 6a85acf2eb2afa1b087896f5e809585f93e51f03:appshell/mfe1/project.json
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE ls-tree -r --name-only f71654816d2654051d37c02b37652415b94e0801
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE show 6a85acf2eb2afa1b087896f5e809585f93e51f03:package.json
docs/mfe-history-review/tools/hist.sh jaideepsinghchauhan__Angular-MFE show 0a0848ecad852c36fc0be650517396d458a79f53:README.md
# Falhou: fatal: bad object 0a0848ecad852c36fc0be650517396d458a79f53:README.md
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

A primeira tentativa do comando `log` foi bloqueada antes da consulta por falta de permissão para gravar tools/commands.log; a repetição com permissão concluiu normalmente. As comparações de fingerprint antes e depois das consultas terminaram sem diferenças.

## Resumo

Commits até o snapshot: 4 (2025-06-17 a 2025-06-29). Pontos: 5 (esclarecido: 2, inconclusivo: 3, resolvido pelo snapshot: 0).
