---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
inputs:
  clone: data/samples/mfe-sample-001/repos/MSF-OCG__LIME-EMR
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Leitura do repositório

O histórico até o snapshot tem 1036 commits, 28 deles merges, de 2024-04-11 a 2026-10-06. O
primeiro é `c60c10b` (2024-04-11, "Initial setup for distro, iraq and mosul"). Ele já traz
`distro/configs/openmrs/frontend_assembly/spa-assemble-config.json` e
`distro/configs/openmrs/frontend_config/msf-frontend-config.json`: a separação entre a lista de
módulos e a configuração de UI é uma primeira presença observável, não uma introdução. O último é o
próprio snapshot, `4de9e41` (2026-10-06, "(feat) Add a Matsapha User Administrator role (#472)").

As revisões 3.4.2 a 3.4.6 não deixaram nada em aberto para o histórico: não há dependência das
tecnologias inspecionadas, as duas pastas candidatas são `No`, não há construção de composição,
relação nem aplicação com deploy. Todos os pontos vêm da 3.4.7. Viraram ponto as afirmações
`contradita` e as `parcial` em que a diferença pode ser resto de um estágio anterior. As demais
`parcial` (#1, #4, #9, #12, #17, #22, #23, #28) e a `sem corroboração` (#29) dependem de artefatos
externos ou de comportamento do app-shell em runtime, que o histórico deste repositório não mostra.

Os marcos que importam são estes:

- `README.md` mudou pela última vez em `c852c54` (2026-07-20, "(feat) LIME2-1269 Enable RDE
  feature flag and bump frontend module versions (#444)"): o objeto desse commit é o mesmo do
  snapshot. `spa-assemble-config.json` mudou outras seis vezes depois disso, de `886cd9b`
  (2026-08-21) a `c8fb59c` (2026-09-19).
- A cadeia de deploy do CI vem de `758d373` (2025-12-16) e `7d6db6b` (2026-01-08), que criou
  `deploy.yml` e `run-e2e-tests.yml`.
- O override de frontend (`openmrs-esm-patient-banner-app.zip`) existiu de `792c607` (2025-05-08)
  a `3bdf66f` (2025-12-04).

O clone mostra mensagens, datas, arquivos tocados e identificadores de objeto. O conteúdo das
versões antigas que diferem do snapshot não está disponível (`ci.yml`, `README.md`,
`spa-assemble-config.json` e `distro/pom.xml` antigos: `show` e `cat-file` falham). Por isso o
histórico diz quando cada arquivo mudou, mas não o que mudou dentro dele, e vários resultados se
apoiam só nas mensagens.

Uma diferença entre o commit e o snapshot apareceu na consulta: no commit existe
`distro/configs/openmrs/overrides/modules/drools-1.1.0-SNAPSHOT.omod`, que a aquisição tirou do
snapshot por tamanho (`normalization.json:61`, motivo `max-file-bytes`, 26178920 bytes). A pasta
`overrides/frontend` não existe no commit.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README descreve deploy automático para dev e UAT pelo CI, e a única chamada a `deploy.yml` está comentada | 3.4.7 #3 | ativo ou abandonado | 758d373 2025-12-16 Add ability to auto deploy LIME-MOSUL on LIME Azure DEV instance (#327); 7d6db6b 2026-01-08 Add ability to auto deploy LIME-MOSUL on LIME Azure UAT instance  (#329); c08eeee 2026-01-10 Allow release to be Triggered manually and also add UAT port to ssh (#337); a590846 2026-02-12 (chore) fix failing builds; 1c1b728 2026-03-21 (chore) Deprecate upload artifact action (#391); 7312d4c 2026-03-21 (fix) Failing ci condition; 90bdc3a 2026-07-03 (chore) Fix nodejs 20 deprecation notice | esclarecido |
| 2 | O README fala em 41 módulos mais dois Madiro e em Core UI 8.0.1, e a configuração tem 42 módulos e `coreVersion` 10.0.1-pre | 3.4.7 #5, #13 | estágios em conflito | 6abb17e 2026-06-22 LIME2-1241 Fixes to dependency resolutions and migrate to using @madiro/esm-home-app (#437); c852c54 2026-07-20 (feat) LIME2-1269 Enable RDE feature flag and bump frontend module versions (#444); 886cd9b 2026-08-21 (chore) Update openmrs frontend package versions; eb80724 2026-09-03 (chore) Update @madiro scoped packages with openmrs framework 10x; c8fb59c 2026-09-19 (fix) Stop the registration form crashing on the address hierarchy (#468) | inconclusivo |
| 3 | O mecanismo de override de módulos frontend está no build da distro, mas não há override de frontend, e o comentário diz que ele carregou um banner próprio | 3.4.7 #7, #25 | ativo ou abandonado | 792c607 2025-05-08 Use patient Identifier Report Template in LIME (#159); 2b6b9e6 2025-05-09 Rebase the custom banner (#164); a48c566 2025-05-15 (fix) LIME2-739: Patient ID not fully visible in patient banner (#168); 3bdf66f 2025-12-04 LIME2-1001 Add Patient Identifier Sticker from OMRS product to LIME (#317); 8324e11 2026-02-14 Patient flags based on "Flags in 2025" specification (#355) | esclarecido |
| 4 | O README diz que o follow-up table é herdado por todos os sites, e os três sites o removem | 3.4.7 #16 | estágios em conflito | 9af9025 2026-03-09 Adds follow up table demo and adds missing demo configurations; c852c54 2026-07-20 (feat) LIME2-1269 Enable RDE feature flag and bump frontend module versions (#444); f71c4f5 2026-09-09 LIME2-1292 Hide the follow-up demo table from the Results tab (#456) | esclarecido |
| 5 | O README diz que as tarefas são herdadas por todos os sites, e Mosul tira o app de tarefas do import map | 3.4.7 #19 | estágios em conflito | d63ea0e 2026-02-13 (feat) Support for task management (#350); e88d16f 2026-03-24 (fix) Exclude task-list from mosul, bunia and matsapha + CHANGELOG (#394); e36c0c4 2026-04-22 LIME2-1195 Bunia - enable task lists (#406); c852c54 2026-07-20 (feat) LIME2-1269 Enable RDE feature flag and bump frontend module versions (#444); 3862541 2026-08-12 (fix) Re-enable patient task list app for Matsapha | inconclusivo |
| 6 | O comentário diz que a construção e o envio das imagens da distro estão desativados, e as execuções estão ativas | 3.4.7 #26 | ativo ou abandonado | 272b488 2025-11-17 (BREAKING) Build docker images using Bundled-docker and CLI (#197); 7de2fbe 2026-02-24 Enable building and deploying of Distro images using bundled docker (#364); 185e757 2026-02-26 Fix pushing distro docker images dev tags on snapshot build workflow; c8fb59c 2026-09-19 (fix) Stop the registration form crashing on the address hierarchy (#468) | inconclusivo |
| 7 | `docs/README.md` põe os módulos frontend em `frontend_config/`, e a lista de módulos está em `frontend_assembly/` | 3.4.7 #27 | estágios em conflito | c60c10b 2024-04-11 Initial setup for distro, iraq and mosul; d29d101 2024-05-16 deletes spa-assemble-config.json overrides; b2e8d52 2024-05-26 Adds spa-assemble-config to pull latest frontend packages; 5e8bc05 2025-05-20 (docs) LIME2-653 LIME Documentation (#145); 9de5ce9 2026-05-14 Docs and readme update (#395) | esclarecido |

## Observações

**1. O README descreve deploy automático para dev e UAT pelo CI, e a única chamada a `deploy.yml`
está comentada.** A mensagem de `758d373` (2025-12-16) anuncia "Add ability to auto deploy
LIME-MOSUL on LIME Azure DEV instance", e o commit altera `ci.yml`. `7d6db6b` (2026-01-08) cria
`deploy.yml` e `run-e2e-tests.yml` e altera `ci.yml`. Sua mensagem anuncia o deploy em UAT e
termina com "Uncomment conditions for deployment jobs in CI". Os dois workflows criados ali chegam
ao snapshot. `deploy.yml` mudou por último em `5aa015c` (2026-01-22). Depois de `7d6db6b`, `ci.yml`
mudou em cinco commits (`c08eeee`, `a590846`, `1c1b728`, `7312d4c`, `90bdc3a`). As versões
anteriores de `ci.yml` não estão disponíveis (`cat-file` falha), então não dá para saber qual deles
comentou a chamada, nem se ela chegou a rodar. Conclusão, delimitada a esses workflows: a cadeia
que o README descreve foi introduzida, segundo as mensagens, em dezembro de 2025 e janeiro de 2026,
e a chamada comentada no snapshot é resto dela, não um plano que nunca foi ligado. O histórico não
diz quando nem por que foi desligada.

**2. O README fala em 41 módulos mais dois Madiro e em Core UI 8.0.1, e a configuração tem 42
módulos e `coreVersion` 10.0.1-pre.** O `README.md` do snapshot é o objeto de `c852c54`
(2026-07-20), cuja mensagem anuncia "bump frontend module versions". Depois dele,
`spa-assemble-config.json` mudou mais seis vezes, de `886cd9b` (2026-08-21) a `c8fb59c`
(2026-09-19), e a mensagem de `eb80724` (2026-09-03) anuncia "Update @madiro scoped packages with
openmrs framework 10x". O módulo que o README deixa de fora, `@madiro/esm-home-app`, entra segundo
a mensagem de `6abb17e` (2026-06-22, "migrate to using @madiro/esm-home-app"). Isso é anterior a
`c852c54`, mas posterior a `9de5ce9` (2026-05-14, "Docs and readme update (#395)"). As versões
antigas do README e da configuração não estão disponíveis (`show c852c54:…spa-assemble-config.json`
e `cat-file 9de5ce9:README.md` falham). Não dá para saber em que commit os números foram escritos
nem se eles conferiam com a configuração daquele momento. Inconclusivo.

**3. O mecanismo de override de módulos frontend está no build da distro, mas não há override de
frontend, e o comentário diz que ele carregou um banner próprio.** `792c607` (2025-05-08) cria
`scripts/apply-overrides.groovy`, altera `distro/pom.xml` e acrescenta
`distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip` e um módulo backend
de override. O corpo da mensagem anuncia "Add patient Banner common-reports module overrides". O ZIP
do banner é alterado em `2b6b9e6` (2025-05-09, "Rebase the custom banner (#164)") e em `a48c566`
(2025-05-15), e é apagado em `3bdf66f` (2025-12-04, "Add Patient Identifier Sticker from OMRS
product to LIME"). No mesmo commit são apagados o `patientdocuments-1.0.0-SNAPSHOT.omod` e o
`reporting-1.27.0.omod`, e são alterados `spa-assemble-config.json` e `distro/pom.xml`. Nenhum
outro arquivo é criado em `overrides/frontend` até o snapshot. A pasta `overrides/modules` continua:
`8324e11` (2026-02-14) acrescenta `drools-1.1.0-SNAPSHOT.omod`, que está no commit do snapshot e
foi tirado do snapshot só pela aquisição (ver Leitura). Conclusão, delimitada a esses arquivos: o
override de frontend existiu entre maio e dezembro de 2025 e foi abandonado em `3bdf66f`, quando o
banner próprio e o módulo de documentos saíram juntos, como o comentário de `distro/pom.xml:641-642`
relata. O script continua ligado ao build e, no commit, ainda tem um módulo backend para substituir.
A mudança das etiquetas para o `esm-patient-label-printing-app` é anunciada só pela mensagem de
`3bdf66f`; o conteúdo da configuração antiga não está disponível.

**4. O README diz que o follow-up table é herdado por todos os sites, e os três sites o removem.**
`9af9025` (2026-03-09, "Adds follow up table demo and adds missing demo configurations") altera só
a configuração da distro. O README que diz "Enabled at distro level and inherited by all sites"
não muda depois de `c852c54` (2026-07-20). As três configurações de site são alteradas juntas em
`f71c4f5` (2026-09-09, "Hide the follow-up demo table from the Results tab"). A mensagem explica:
a distro põe o widget no slot, "so every site inherits it", e "the widget is only meant to be
visible on demo/distro", então ele é removido em cada site. Conclusão: a afirmação do README é do
estágio anterior a `f71c4f5`, em que todos os sites herdavam o widget, e a remoção nos sites veio
depois da última mudança do README. Nada disso muda o `contradita` da 3.4.7.

**5. O README diz que as tarefas são herdadas por todos os sites, e Mosul tira o app de tarefas do
import map.** A mensagem de `d63ea0e` (2026-02-13, "Support for task management") anuncia o módulo
de tarefas, e o commit altera `spa-assemble-config.json`. `e88d16f` (2026-03-24, "Exclude
task-list from mosul, bunia and matsapha") altera os `pom.xml` dos três sites. Depois, segundo as
mensagens, o app volta a Bunia em `e36c0c4` (2026-04-22, "Bunia - enable task lists") e a Matsapha
em `3862541` (2026-08-12, "Re-enable patient task list app for Matsapha"). O `pom.xml` de Mosul não
tem commit que o reative. Pelas mensagens, houve um estágio, de 2026-02-13 a 2026-03-24, em que
todos os sites herdavam o app. O texto do README, porém, não pode ser datado. Ele mudou antes,
dentro e depois desse intervalo (`cf192b2` 2026-03-13, `903783b` 2026-03-24, `9de5ce9` 2026-05-14,
`c852c54` 2026-07-20), e as versões antigas não estão disponíveis. Não dá para saber se a frase é
resto daquele estágio. Inconclusivo.

**6. O comentário diz que a construção e o envio das imagens da distro estão desativados, e as
execuções estão ativas.** As imagens passam a ser construídas com bundled docker em `272b488`
(2025-11-17), segundo a mensagem. A mensagem de `7de2fbe` (2026-02-24) anuncia "Enable building and
deploying of Distro images using bundled docker", e a de `185e757` (2026-02-26) corrige o envio das
tags. Isso sugere que houve um estágio em que as imagens da distro não eram construídas. Mas
`distro/pom.xml` mudou em 84 commits, e as versões anteriores não estão disponíveis (`cat-file
176b378:distro/pom.xml` falha). Não dá para saber quando o comentário foi escrito nem se ele
descrevia um estágio anterior a `7de2fbe`. Inconclusivo.

**7. `docs/README.md` põe os módulos frontend em `frontend_config/`, e a lista de módulos está em
`frontend_assembly/`.** `spa-assemble-config.json` está em `distro/configs/openmrs/frontend_assembly/`
desde o primeiro commit (`c60c10b`). Ele foi apagado em `d29d101` (2024-05-16) e recriado no mesmo
lugar em `b2e8d52` (2024-05-26). Os únicos JSON criados em pastas `frontend_config/` até o snapshot
são as configurações de UI (`msf-frontend-config.json` e as de cada site) e a de traduções
(`6bb0e1a`, 2026-04-02). `docs/README.md` é criado em `5e8bc05` (2025-05-20) e alterado em
`adda4f4` (2025-05-22) e `9de5ce9` (2026-05-14), sempre num momento em que a lista de módulos já
estava em `frontend_assembly/`. Conclusão, delimitada aos nomes e locais desses arquivos: a tabela
não é resto de uma organização anterior do repositório. Os módulos nunca foram definidos em
`frontend_config/`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count --merges 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --reverse --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/deploy.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/run-e2e-tests.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 90bdc3a -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 7312d4c -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 1c1b728 -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree a590846 -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree c08eeee -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 7d6db6b -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 758d373 -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 7312d4c:.github/workflows/ci.yml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 1c1b728:.github/workflows/ci.yml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t a590846:.github/workflows/ci.yml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t c08eeee:.github/workflows/ci.yml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 7d6db6b:.github/workflows/ci.yml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 758d373:.github/workflows/ci.yml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 90bdc3a   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 7312d4c   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 1c1b728   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short a590846   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short c08eeee   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 7d6db6b   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 758d373   # falha: -s e --name-status incompatíveis
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 90bdc3a
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 7312d4c
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 1c1b728
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short a590846
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short c08eeee
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 7d6db6b
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 758d373
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/frontend_assembly/spa-assemble-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree c852c54 -- README.md distro/configs/openmrs/frontend_assembly/spa-assemble-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/frontend_assembly/spa-assemble-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show c852c54:distro/configs/openmrs/frontend_assembly/spa-assemble-config.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short c852c54
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short 886cd9b
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short 23dbe73
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short eb80724
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short c3a7e96
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short 17d1b1f
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short c8fb59c
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 9de5ce9 -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 9de5ce9:README.md   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 9de5ce9
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 6abb17e
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- scripts/apply-overrides.groovy
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- '*configs/openmrs/overrides*'
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --full-history --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/overrides/modules/drools-1.1.0-SNAPSHOT.omod
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree -r 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/overrides
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 3bdf66f
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 792c607
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad %s' --date=short 8324e11 -- distro scripts
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/frontend_config/msf-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short f71c4f5
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 9af9025
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/mosul/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- scripts/remove-importmap-entries.groovy
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short e88d16f
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short e36c0c4
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 16603b7
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short d63ea0e
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/bunia/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/matsapha/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree c8fb59c -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 176b378:distro/pom.xml   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 7de2fbe
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 185e757
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 272b488
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --full-history --name-status --no-renames --diff-filter=AD --format='@@ %h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- '*spa-assemble-config*' '*spa-build*' '*frontend_config/*.json'
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- docs/README.md documentation/README.md
```

## Resumo

Commits até o snapshot: 1036 (2024-04-11 a 2026-10-06). Pontos: 7 (esclarecido: 4, inconclusivo: 3, resolvido pelo snapshot: 0).
