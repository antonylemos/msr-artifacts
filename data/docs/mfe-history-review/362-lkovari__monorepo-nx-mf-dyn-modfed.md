---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
inputs:
  clone: data/samples/mfe-sample-001/repos/lkovari__monorepo-nx-mf-dyn-modfed
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Leitura do repositório

Há 19 commits alcançáveis até o snapshot, de 2026-03-31 a 2026-06-07. O primeiro é `d722c85` (2026-03-31, “Initial commit”), com o README; o workspace aparece depois, em `a04c0bb` (2026-03-31, “steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes”). Essa é a primeira presença observável do workspace neste histórico, sem mostrar onde o código foi produzido antes. A mensagem de `81a1110` (2026-05-10, “Use npm lib @lkovari/microfrontend-platform-communication”) anuncia a adoção da biblioteca de comunicação. `82423e0` (2026-05-17, “Add demo query and demo queue, refactor the usage partially as the example what I wrote.”) adiciona os arquivos de projeto e Jest da biblioteca de contratos. Em `89e1eb6` (2026-06-01, “Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests”) aparece a configuração Vitest. O último commit é `16f0962` (2026-06-07, “update platform comm library, add tests.”).

As revisões 3.4.3–3.4.6 não deixam unidades, construções, relações ou deploy indeterminados. Os pontos vêm das dependências sem uso ou indeterminadas e das afirmações parciais ou contraditas da documentação. Parte dos blobs antigos não está disponível no clone parcial. As falhas não baixaram objetos: mensagens e caminhos alterados permitem datar artefatos, mas não demonstram uso anterior ou abandono de dependências. O README antigo e o cabeçalho do host puderam ser lidos, delimitando as divergências documentais. Nenhum julgamento do snapshot é alterado.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` declarado sem uso | 3.4.2 (nx-mf-df/package.json:91) | uso de dependência | a04c0bb 2026-03-31 steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes | inconclusivo |
| 2 | Configuração Jest permanece junto ao target de testes Vitest | 3.4.2 (nx-mf-df/package.json:44) | ativo ou abandonado | 82423e0 2026-05-17 Add demo query and demo queue, refactor the usage partially as the example what I wrote.; 89e1eb6 2026-06-01 Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests; 16f0962 2026-06-07 update platform comm library, add tests. | inconclusivo |
| 3 | `@nx/workspace` declarado sem uso | 3.4.2 (nx-mf-df/package.json:48) | uso de dependência | a04c0bb 2026-03-31 steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes | inconclusivo |
| 4 | A documentação diz que Native Federation falha sem o patch de exports | 3.4.7 #1 | uso de dependência | 81a1110 2026-05-10 Use npm lib @lkovari/microfrontend-platform-communication; 147d615 2026-05-24 Update to fit to communication lib changes; 89e1eb6 2026-06-01 Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests; 16f0962 2026-06-07 update platform comm library, add tests. | inconclusivo |
| 5 | O diagrama atribui bootstraps aos componentes federados, embora o texto os situe no host | 3.4.7 #12 | estágios em conflito | 147d615 2026-05-24 Update to fit to communication lib changes | esclarecido |
| 6 | A afirmação sobre filtragem por `target` depende do interior do pacote externo | 3.4.7 #14 | uso de dependência | — | resolvido pelo snapshot |
| 7 | Os documentos mantêm `^0.2.1`, enquanto o manifesto e o patch atuais usam 0.3.2 | 3.4.7 #22 | estágios em conflito | 147d615 2026-05-24 Update to fit to communication lib changes; 89e1eb6 2026-06-01 Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests; 16f0962 2026-06-07 update platform comm library, add tests. | esclarecido |
| 8 | O texto nega UI de envio na rota remota, mas o cabeçalho do host contém o compositor | 3.4.7 #23 | estágios em conflito | 82423e0 2026-05-17 Add demo query and demo queue, refactor the usage partially as the example what I wrote.; 147d615 2026-05-24 Update to fit to communication lib changes | esclarecido |

## Observações

**1. Dependência `@softarc/native-federation-node`.** O manifesto é adicionado em `a04c0bb` e alterado em vários commits posteriores, mas sua versão inicial consultada não está disponível. A mensagem desse commit anuncia instalação do plugin Native Federation e configuração de host/remotes; não demonstra uso específico do pacote Node. O snapshot não tem import ou invocação desse pacote, conforme a 3.4.2. Não é possível distinguir uso anterior, instalação auxiliar ou declaração nunca conectada a partir dos conteúdos disponíveis. Resultado inconclusivo, sem inferir abandono.

**2. Jest e Vitest.** `82423e0` adiciona `jest.config.cts` e `project.json` de `contracts-platform-messaging`; a configuração Jest pôde ser lida e já aponta para `../../jest.preset.js`. Ela não muda depois no log consultado. `89e1eb6` adiciona `vitest.config.ts` e altera o projeto; `16f0962` altera ambos novamente. As versões do `project.json` de maio e de 1º de junho não estão disponíveis. O snapshot declara `vitest run` no target `test` (nx-mf-df/libs/contracts-platform-messaging/project.json:18-22), mas preserva o plugin e a configuração Jest. Essa sequência data a coexistência e a chegada do arquivo Vitest; não prova que Jest chegou a ser executado nem que foi abandonado. O ponto continua inconclusivo.

**3. Dependência `@nx/workspace`.** A leitura do manifesto inicial de `a04c0bb` falhou, e o arquivo sofre alterações posteriores. A presença do workspace Nx e as mensagens não identificam uma invocação desse pacote. O snapshot só o declara (3.4.2, nx-mf-df/package.json:48); os objetos consultados não permitem explicar se a declaração remanesce de uso anterior ou se nunca teve uso direto. Resultado inconclusivo.

**4. Necessidade do patch.** O log sem detecção de renames mostra a adição do patch 0.1.4 em `81a1110`, sua remoção e a adição do patch 0.2.1 em `147d615`, seguidas das trocas de caminhos para 0.3.0 em `89e1eb6` e 0.3.2 em `16f0962`. O README de `147d615` foi lido e já explica a troca dos exports `.mjs` por `.js`. Isso confirma que a explicação documental acompanha patches versionados, mas não confirma a falha alegada sem eles. O snapshot contém o patch atual e seu registro em pnpm (nx-mf-df/pnpm-workspace.yaml:3-4), sem tarball ou resultado comparativo de build; as consultas não executam builds. O histórico disponível não resolve a necessidade técnica do patch. Resultado inconclusivo.

**5. Bootstraps no diagrama.** O README lido em `147d615` já contém simultaneamente o diagrama com listener/query bootstrap sob os componentes federados, a explicação de que esses componentes não executam um bootstrap Angular próprio e a ressalva de que o handler remoto roda no processo do host. O log não registra alteração posterior do README até o snapshot. A inconsistência, delimitada a esse documento, já coexistia na mesma versão de maio; não é preciso atribuí-la a estágios separados. Isso não prova que o diagrama descrevesse um código anterior nem que tivesse sido copiado. A execução vigente continua sendo a registrada em 3.4.4 e 3.4.5.

**6. Filtragem interna de `target`.** O snapshot já explica o limite da corroboração: há chamadas, IDs de assinantes e contratos, mas não o fonte adquirido do pacote externo que implementa a entrega (3.4.7, observação 14). A ausência desse conteúdo não é evidência de código local abandonado ou configuração de outro estágio. O ponto fica resolvido pelo snapshot quanto à origem da lacuna; não se confirma a filtragem interna nem se altera a corroboração `parcial`. Não foi necessária consulta histórica específica.

**7. Versão documental antiga.** O README de `147d615`, lido, já afirma `^0.2.1` e não sofre alteração posterior. O manifesto e o registro pnpm mudam em junho, quando os caminhos dos patches passam a 0.3.0 e depois 0.3.2. O snapshot confirma `^0.3.2` (nx-mf-df/package.json:89) e patch 0.3.2. Assim, esclarece-se que a indicação documental foi mantida enquanto os artefatos de dependência evoluíram. O manifesto de `147d615` não pôde ser lido: não se afirma que sua versão declarada era realmente 0.2.1 naquele momento. `nx-mf-comm-info.md`, adicionado em `147d615` e sem alterações posteriores no log, também mantém a referência antiga. A conclusão é documentação não atualizada em relação ao snapshot, não prova de correção histórica de todas as versões mencionadas.

**8. Emissor na rota remota.** O cabeçalho lido em `82423e0` já contém tanto os links para as três rotas remotas quanto `lib-platform-messaging-trigger`, fora de uma condição de rota. Não há alteração posterior desse arquivo até o snapshot. `nx-mf-comm-info.md` é adicionado depois, em `147d615`, sem alteração posterior; seu texto atual nega UI de envio na rota remota (:204), embora descreva o compositor no cabeçalho (:198). Logo, o cabeçalho com emissor já existia quando esse documento entrou. O esclarecimento é a coexistência desses artefatos, não uma remoção posterior do compositor nem uma intenção inferida. A ausência de emissor dentro do componente remoto continua compatível com o código; ampliá-la à página inteira conflita com o cabeçalho.

## Comandos

As revisões curtas abaixo são ancestrais alcançáveis do snapshot no primeiro log. Todas as consultas usaram o wrapper. As leituras anotadas como `bad object` falharam por objeto histórico indisponível. O primeiro log de caminhos falhou ao tentar detectar renames com blobs ausentes; foi repetido com `--no-renames`, sem busca na rede.

```sh
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed log --reverse --format='%h %ad %s' --date=short 16f0962945720a521bac32e4a43913af1494b61b
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed log --reverse --format='%h %ad %s' --date=short --name-status 16f0962945720a521bac32e4a43913af1494b61b -- nx-mf-df/package.json nx-mf-df/nx.json nx-mf-df/libs/contracts-platform-messaging/project.json nx-mf-df/libs/contracts-platform-messaging/jest.config.cts nx-mf-df/libs/contracts-platform-messaging/vitest.config.ts README.md nx-mf-comm-info.md nx-mf-df/apps/main-host/src/app/app.config.ts nx-mf-df/apps/mf_remote_a/src/app/app.ts nx-mf-df/apps/mf_remote_a/src/app/app.config.ts nx-mf-df/apps/main-host/src/app/shared/components/header/header.html nx-mf-df/pnpm-workspace.yaml nx-mf-df/patches # falhou: objeto ausente 099029d41144c92f8b37b8b2b9f4e356f387d842
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed rev-list --count 16f0962945720a521bac32e4a43913af1494b61b
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed log --reverse --no-renames --format='%h %ad %s' --date=short --name-status 16f0962945720a521bac32e4a43913af1494b61b -- nx-mf-df/package.json nx-mf-df/nx.json nx-mf-df/libs/contracts-platform-messaging/project.json nx-mf-df/libs/contracts-platform-messaging/jest.config.cts nx-mf-df/libs/contracts-platform-messaging/vitest.config.ts README.md nx-mf-comm-info.md nx-mf-df/apps/main-host/src/app/app.config.ts nx-mf-df/apps/mf_remote_a/src/app/app.ts nx-mf-df/apps/mf_remote_a/src/app/app.config.ts nx-mf-df/apps/main-host/src/app/shared/components/header/header.html nx-mf-df/pnpm-workspace.yaml nx-mf-df/patches
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show a04c0bb:nx-mf-df/package.json # falhou: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 82423e0:nx-mf-df/libs/contracts-platform-messaging/project.json # falhou: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 147d615:nx-mf-df/package.json # falhou: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 89e1eb6:nx-mf-df/libs/contracts-platform-messaging/project.json # falhou: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 82423e0:nx-mf-df/libs/contracts-platform-messaging/jest.config.cts
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 147d615:README.md
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 82423e0:nx-mf-df/apps/main-host/src/app/shared/components/header/header.html
```

A comparação abaixo foi executada antes e depois das consultas, com saída vazia e código 0 em ambas:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 19 (2026-03-31 a 2026-06-07). Pontos: 8 (esclarecido: 3, inconclusivo: 4, resolvido pelo snapshot: 1).
