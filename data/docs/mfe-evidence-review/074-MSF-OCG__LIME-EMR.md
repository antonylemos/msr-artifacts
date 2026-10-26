---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Leitura do repositório

O repositório é uma distribuição OpenMRS 3 empacotada por Maven para três locais (Mosul, Matsapha e Bunia). Ele não contém o código de nenhuma aplicação frontend. A revisão de dependências não tem dependência das tecnologias inspecionadas, a revisão de código-fonte não tem construção, e as revisões de composição e de build e deploy não têm linhas. Por isso não há observações nas dimensões 1, 3, 5 e 6. Os dois diretórios candidatos são `No`: o pacote de testes Playwright da raiz e o site Docsify (#14, #15).

A arquitetura aparece só na configuração, numa cadeia que termina fora do snapshot:
- **Montagem:** `spa-assemble-config.json` fixa a versão do app-shell e lista 42 módulos externos com versão, além de seis exclusões (#1). É a declaração mais forte do repositório: nomeia as unidades que a distribuição compõe.
- **Import map por site:** cada site tira módulos do import map e do registro de rotas no build (#2 a #4).
- **Extensões em slots:** a configuração de UI da distro põe a extensão `patient-flags-list` e o follow-up table em slots do patient chart (#5). As outras configurações tiram extensões de slots de outros módulos (#6 a #13).

O host que compõe tudo isso, o `@openmrs/esm-app-shell`, é externo. Os mapas gerados no build (`importmap.json`, `routes.registry.json`) não estão no snapshot. Nenhuma das observações liga duas unidades do snapshot. Elas configuram uma composição cujas partes estão todas em outros repositórios, como a classificação registra (`multi-repo`, 42 unidades).

Foram tratados como registro declarado num arquivo de configuração os blocos `extensionSlots` com `add` ou `remove`, que põem ou tiram a extensão de um módulo no slot de outro. Ficaram de fora os blocos que só ajustam opções, feature flags ou `Display conditions` (ex.: distro/configs/openmrs/frontend_config/msf-frontend-config.json:222-231, 273-283). Também ficaram de fora a lista `SPA_CONFIG_URLS` e as execuções que a montam, porque indicam arquivos de configuração, não remotes. Pelo mesmo motivo ficaram de fora a linha do `distro/pom.xml` que aponta o script de montagem para a configuração (distro/pom.xml:493-494), o empacotamento e as imagens Docker, e os scripts Groovy, que são código de build.

A documentação tem 29 afirmações, todas fracas pelo critério do protocolo: 11 corroboradas, 10 parciais, 7 contraditas e 1 sem corroboração. Ela confirma o mecanismo de configuração (#21, #29, #30, #33, #35, #36, #39), mas engana em alguns pontos:
- os números de módulos e a versão do core (#20, #28; o histórico não esclarece, #46);
- a herança por todos os sites do follow-up table e do app de tarefas (#31, #34);
- o lugar onde os módulos são definidos (#42);
- o deploy automático pelo CI e as imagens "desativadas" (#18, #41; o histórico explica o primeiro, #45).

O que depende do app-shell em runtime não tem artefato: o carregamento pelo import map, a precedência das configurações e o efeito de uma rota órfã (#24, #38, #43, #44). Ficam como contexto a infraestrutura de contêineres, o pipeline de publicação e as imagens (#16, #18, #19, #25, #26, #41).

Nenhuma observação é ambígua. Os três pontos inconclusivos do histórico tratam só do passado (#46, #49, #50), e o snapshot é claro em cada um.

## Observações

### 1. distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:2-55

**Observação:** `coreVersion` é `10.0.1-pre.5320` (:2). `frontendModules` lista 42 pacotes com versão, 39 `@openmrs/` e 3 `@madiro/` (:3-46). `frontendModuleExcludes` lista seis módulos padrão, precedidos do `__comment` "Excluding modules some default modules to ensure we are using the specified versions." (:47-55).

**Interpretação:** No nível da distro, o arquivo declara a versão do app-shell e as unidades frontend externas que compõem a aplicação. O build o passa ao script de montagem herdado da Ozone (distro/pom.xml:493-494). Segundo a 3.4.5, o app-shell carrega os bundles por um import map gerado nesse build. Nem o app-shell, nem os módulos, nem o mapa estão no snapshot.

### 2. sites/bunia/pom.xml:318-331

**Observação:** A execução `remove-importmap-entries`, na fase `process-resources`, passa `modulesToRemove` = `@madiro/esm-mental-health-app,@madiro/esm-nutrition-app` (:326-327) a `scripts/remove-importmap-entries.groovy` (:331).

**Interpretação:** Bunia tira dois módulos da composição herdada da distro, apagando as entradas no import map e no registro de rotas montados no build.

**Nota:** Força `moderada`. O bloco nomeia unidades de outra parte, mas para excluí-las, sem ligá-las a nenhuma unidade. Ele configura o mecanismo de import map da distribuição de um site.

### 3. sites/matsapha/pom.xml:273-286

**Observação:** A execução `remove-importmap-entries`, na fase `process-resources`, passa `modulesToRemove` = `@madiro/esm-mental-health-app,@madiro/esm-nutrition-app,@openmrs/esm-ward-app` (:281-282) a `scripts/remove-importmap-entries.groovy` (:286).

**Interpretação:** Matsapha tira três módulos da composição herdada da distro, no import map e no registro de rotas.

**Nota:** Força `moderada`, pelo mesmo motivo de #2.

### 4. sites/mosul/pom.xml:220-234

**Observação:** A execução `remove-importmap-entries`, na fase `process-resources`, passa `modulesToRemove` = `@openmrs/esm-ward-app,@openmrs/esm-patient-task-list-app` (:228-229) a `scripts/remove-importmap-entries.groovy` (:233).

**Interpretação:** Mosul tira dois módulos da composição herdada da distro, entre eles o app de tarefas.

**Nota:** Força `moderada`, pelo mesmo motivo de #2.

### 5. distro/configs/openmrs/frontend_config/msf-frontend-config.json:27-221

**Observação:** No bloco de `@openmrs/esm-patient-chart-app`, `extensionSlots` acrescenta `patient-flags-list` e `obs-table-horizontal-widget` a `patient-chart-test-results-dashboard-slot` (:37-39). Também acrescenta `patient-flags-list`, com tags diferentes, a `patient-chart-summary-dashboard-slot`, `patient-chart-medications-dashboard-slot`, `conditions-summary-dashboard` e `patient-appointments-summary-dashboard` (:146-176). Os demais slots do bloco só ajustam `Display conditions` de extensões.

**Interpretação:** A configuração de UI da distro põe extensões de outros módulos nos slots do patient chart. `patient-flags-list` vem do módulo de flags, que está na montagem (#1, :13). Essa é uma ligação declarada entre duas unidades externas, e quem a aplica em runtime é o app-shell.

### 6. sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json:18-165

**Observação:** No bloco de `@openmrs/esm-patient-chart-app`, `extensionSlots` tira `obs-table-horizontal-widget` de `patient-chart-test-results-dashboard-slot` (:25-26). Também tira `clinical-view-section`, `patient-mental-health-summary-dashboard` e `patient-nutrition-summary-dashboard` de `patient-chart-dashboard-slot` (:33-38). O bloco não tem `add`.

**Interpretação:** O site desfaz, no patient chart, extensões que a distro põe (#5) e os resumos dos módulos de saúde mental e de nutrição.

**Nota:** Força `moderada`. O bloco nomeia extensões de outras unidades, mas para tirá-las do slot, sem ligar unidades. Ele configura o mecanismo de slots de uma unidade.

### 7. sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json:18-167

**Observação:** No bloco de `@openmrs/esm-patient-chart-app`, `extensionSlots` tira `obs-table-horizontal-widget` de `patient-chart-test-results-dashboard-slot` (:27-28). Também tira `clinical-view-section`, `patient-mental-health-summary-dashboard` e `patient-nutrition-summary-dashboard` de `patient-chart-dashboard-slot` (:35-40). O bloco não tem `add`.

**Interpretação:** Bunia faz no patient chart a mesma remoção que Mosul (#6).

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 8. sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json:18-165

**Observação:** No bloco de `@openmrs/esm-patient-chart-app`, `extensionSlots` tira `obs-table-horizontal-widget` de `patient-chart-test-results-dashboard-slot` (:25-26). Também tira `clinical-view-section`, `patient-mental-health-summary-dashboard` e `patient-nutrition-summary-dashboard` de `patient-chart-dashboard-slot` (:33-38). O bloco não tem `add`.

**Interpretação:** Matsapha faz no patient chart a mesma remoção que Mosul (#6).

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 9. distro/configs/openmrs/frontend_config/msf-frontend-config.json:2-17

**Observação:** No bloco de `@madiro/esm-home-app`, `extensionSlots` tira `service-queues-dashboard-link` de `homepage-dashboard-slot` (:4-5). O outro slot do bloco só ajusta `Display conditions` de `active-visits-widget` (:7-14).

**Interpretação:** A distro tira da página inicial a extensão de link de outro módulo (3.4.7 #18).

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 10. sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json:2-8

**Observação:** No bloco de `@madiro/esm-home-app`, `extensionSlots` tira `service-queues-dashboard-link` de `homepage-dashboard-slot` (:4-5).

**Interpretação:** Bunia repete a remoção da distro (#9).

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 11. sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json:2-8

**Observação:** No bloco de `@madiro/esm-home-app`, `extensionSlots` tira `service-queues-dashboard-link` de `homepage-dashboard-slot` (:4-5).

**Interpretação:** Matsapha repete a remoção da distro (#9).

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 12. sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json:2-8

**Observação:** No bloco de `@madiro/esm-home-app`, `extensionSlots` tira `service-queues-dashboard-link` de `homepage-dashboard-slot` (:4-5).

**Interpretação:** Mosul repete a remoção da distro (#9).

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 13. distro/configs/openmrs/frontend_config/msf-frontend-config.json:249-267

**Observação:** No bloco de `@openmrs/esm-primary-navigation-app`, `extensionSlots` tira `offline-tools-patient-chart-actions-dashboard-link` de `patient-chart-dashboard-slot` (:254-255). O outro slot do bloco só ajusta `Display conditions` de `dispensing-link` (:257-264).

**Interpretação:** A distro tira um link de ferramentas offline do painel do patient chart.

**Nota:** Força `moderada`, pelo mesmo motivo de #6.

### 14. .; package.json:5; package.json:6-9

**Observação:** O `package.json` da raiz declara `main: index.js`, que não está no snapshot (:5), e só tem scripts `playwright test` (:6-9). Não há workspace nem deploy.

**Interpretação:** É o pacote de testes e2e da distribuição, não uma unidade frontend.

### 15. docs; docs/index.html:15-35

**Observação:** `docs/index.html` tem um `<div id="app">` e configura `window.$docsify`, com scripts do CDN (:15-35). Não há build nem workflow que o publique.

**Interpretação:** É um site de documentação Docsify, não uma unidade frontend do sistema.

### 16. README.md:101

**Observação:** "**Containerized** -- Docker Compose orchestration with Traefik SSL".

**Interpretação:** Fala da infraestrutura de contêineres. O snapshot tem o compose do Traefik, um override do serviço `frontend` e a imagem de frontend, mas o compose principal é externo. A afirmação é parcial.

### 17. README.md:129

**Observação:** "**Distro** (`/distro`) -- Organization-wide MSF base configuration. Defines backend modules, frontend modules, […] shared across all MSF sites."

**Interpretação:** Diz que os módulos frontend são definidos uma vez, na distro, e herdados pelos sites. A lista de montagem (#1) e o desempacotamento do ZIP da distro pelos sites confirmam isso. A afirmação é corroborada.

### 18. README.md:149-150

**Observação:** diagrama "GitHub Repository" "Maven build" "ZIP Artifacts + Docker Images" […] "GitHub Actions deploy" "Execution Server".

**Interpretação:** Fala do pipeline de publicação da distribuição. ZIPs e imagens se confirmam, mas a única chamada ao workflow de deploy está comentada. A afirmação é contradita.

### 19. README.md:160-181

**Observação:** diagrama "Runtime Services": "OpenMRS Frontend (ESM)" […] "REST API" […] "OpenMRS Backend (Java 8)"; "Traefik (SSL)" […] "SSL termination" […] "OpenMRS Frontend (ESM)".

**Interpretação:** Põe o frontend como um único serviço ao lado do backend e do proxy. O snapshot tem só os overrides desses serviços e o Traefik sem rota para o frontend. A afirmação é parcial.

### 20. README.md:189

**Observação:** "**Frontend** | OpenMRS 3 ESM microfrontend architecture (41 modules), plus custom Madiro modules (Nutrition, Mental Health)".

**Interpretação:** Descreve o frontend como microfrontends ESM. O tipo de arquitetura confere com a montagem (#1), mas a contagem não: são 42 módulos, e o README deixa de fora `@madiro/esm-home-app`. A afirmação é contradita.

### 21. README.md:262

**Observação:** "frontend_assembly/ # spa-assemble-config.json (frontend module versions)".

**Interpretação:** Localiza a lista de módulos e versões. Confere com #1. A afirmação é corroborada.

### 22. README.md:325

**Observação:** "Configuration types that can be overridden at each level: […] Frontend ESM modules (JS bundles)".

**Interpretação:** Diz que cada nível pode trocar os módulos frontend. Os sites só tiram módulos do import map (#2 a #4). A distro tem o mecanismo de substituição de bundles (distro/pom.xml:641-655), mas sem nenhum override de frontend no snapshot. A afirmação é parcial.

### 23. README.md:326

**Observação:** "Frontend JSON config files (branding, UI widgets, dashboards)" (podem ser sobrescritos em cada nível).

**Interpretação:** Diz que a configuração de UI é sobrescrita por nível. O site acrescenta a sua configuração e desfaz uma extensão da distro (#6 sobre #5). A afirmação é corroborada.

### 24. README.md:332

**Observação:** "**Frontend config inheritance** uses `SPA_CONFIG_URLS` in the Docker `.env` file to load multiple JSON configs in order, with later files overriding earlier ones".

**Interpretação:** Descreve como o app-shell carrega as configurações. A montagem ordenada da lista no build se confirma. A carga em ordem com a última prevalecendo é comportamento do app-shell externo, sem artefato. A afirmação é parcial.

### 25. README.md:391

**Observação:** "**Update** the `.env` file with the site frontend config URL (`maven-antrun-plugin`)".

**Interpretação:** Descreve um passo de build de cada site. As três execuções do `maven-antrun-plugin` confirmam. A afirmação é corroborada.

### 26. README.md:504

**Observação:** "The `bundled-docker` Maven profile builds pre-configured Docker images and pushes them to Docker Hub under the `msfocg` registry."

**Interpretação:** Fala da publicação das imagens da distribuição. O perfil e o CI confirmam. A afirmação é corroborada.

### 27. README.md:516

**Observação:** "`msfocg/<site>-openmrs-frontend` | amd64, arm64 | OpenMRS frontend SPA with all ESM modules".

**Interpretação:** Diz que todos os módulos são publicados juntos numa imagem de frontend por site. A imagem e as plataformas se confirmam, mas o conteúdo não, porque o Dockerfile é gerado fora do snapshot. A afirmação é parcial.

### 28. README.md:585

**Observação:** "**Frontend module versions** are defined in […] `spa-assemble-config.json` (Core UI 8.0.1, 40+ ESM modules plus custom Madiro Nutrition and Mental Health apps)".

**Interpretação:** Localiza a lista de módulos e dá seus números. O local e a contagem conferem com #1, mas a versão do core não (`10.0.1-pre.5320`). A afirmação é contradita.

### 29. README.md:823-831

**Observação:** "Flags are filtered by tag and surface in the relevant patient chart dashboard tab" (Test Results, Summary, Medications, Conditions, Appointments).

**Interpretação:** Diz onde a extensão de flags aparece dentro de outro módulo. Os cinco slots e as tags estão em #5. A afirmação é corroborada.

### 30. README.md:838

**Observação:** "Frontend widget placement: `msf-frontend-config.json` → `patient-flags-list` extension in `@openmrs/esm-patient-chart-app` slots".

**Interpretação:** Nomeia a ligação entre a extensão de flags e os slots do patient chart. #5 a declara, e os dois módulos estão na montagem (#1). A afirmação é corroborada.

### 31. README.md:874-876

**Observação:** "**Status:** Enabled at distro level and inherited by all sites." (follow-up table, `obs-table-horizontal-widget` em `patient-chart-test-results-dashboard-slot`).

**Interpretação:** A distro põe o widget no slot (#5), mas os três sites o tiram (#6 a #8). A herança por todos os sites é desmentida. A afirmação é contradita.

### 32. README.md:897

**Observação:** "Tasks are accessed through the dedicated **Tasks app** in the main navigation."

**Interpretação:** Nomeia o app de tarefas como unidade própria. Ele está na montagem (#1), mas o acesso pela navegação não tem artefato. A afirmação é parcial.

### 33. README.md:897

**Observação:** "The service queues dashboard link is intentionally removed from the homepage across all configurations".

**Interpretação:** Fala da extensão de um módulo tirada do slot de outro. A distro e os três sites fazem a remoção (#9 a #12). A afirmação é corroborada.

### 34. README.md:901

**Observação:** "**Status:** Enabled at distro level and inherited by all sites." (tarefas).

**Interpretação:** Mosul tira o app de tarefas do import map (#4), então a parte de frontend não chega a todos os sites. A afirmação é contradita.

### 35. README.md:1029

**Observação:** "To remove (hide) a frontend app for a specific site without affecting other sites, edit the site's frontend configuration JSON file".

**Interpretação:** Diz que a composição de um site se ajusta pela sua configuração. Mosul tira os resumos de saúde mental e nutrição assim (#6). A afirmação é corroborada.

### 36. README.md:1033

**Observação:** "Use the `\"remove\"` property in an `extensionSlots` configuration to hide the app's UI elements from the page".

**Interpretação:** Nomeia o mecanismo de remoção em slots. Ele está em uso no site e na distro (#6, #9, #13). A afirmação é corroborada.

### 37. README.md:1051

**Observação:** "Set `\"Display conditions\"` with a privilege that no role at the site has, effectively hiding it from all users".

**Interpretação:** Nomeia um mecanismo de visibilidade por privilégio. Ele existe na distro, mas só para restringir. O uso para esconder de todos não aparece no snapshot. A afirmação é parcial.

### 38. README.md:1063-1065

**Observação:** "**Option C: Remove importmap entries via the build (site-level)** […] This strips the specified modules from the importmap at build time so they are never loaded for that site".

**Interpretação:** Descreve a remoção de unidades do import map por site. As execuções dos três sites confirmam a remoção no build (#2 a #4). O "never loaded" é comportamento do app-shell em runtime, sem artefato. A afirmação é parcial.

### 39. README.md:1092

**Observação:** "If the app should be excluded from **all** sites, add it to the `frontendModuleExcludes` array in `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json`".

**Interpretação:** Diz que a exclusão de uma unidade de todos os sites se faz na montagem da distro. A lista existe em #1. A afirmação é corroborada.

### 40. distro/pom.xml:641-642

**Observação:** "Loaded custom patient documents module and ESM patient banner app for stickers functionality. […] Kept for manual override capability if needed."

**Interpretação:** Fala da troca do bundle de uma unidade por uma versão própria. A execução `apply-overrides` continua ativa, mas não há override de frontend no snapshot, e o carregamento do banner próprio é relato do passado. A afirmação é parcial.

### 41. distro/pom.xml:885

**Observação:** "Disable builidng and pushing distro docker images".

**Interpretação:** Fala da publicação das imagens. As execuções `build` e `push` estão ativas, e o CI liga o perfil. A afirmação é contradita.

### 42. docs/README.md:109

**Observação:** "Frontend modules | `frontend_config/` | JSON" (tabela "Configuration types").

**Interpretação:** Põe a definição dos módulos na pasta de configuração de UI. A lista de módulos está em `frontend_assembly/` (#1). A afirmação é contradita.

### 43. scripts/remove-importmap-entries.groovy:7-9

**Observação:** "A module is declared in two places that must stay in sync: importmap.json […] -> where the app-shell loads the bundle from; routes.registry.json […] -> the app's pages and extensions".

**Interpretação:** Descreve como o host externo carrega e registra cada unidade. O script confirma que os dois mapas têm entradas por módulo, mas os mapas são gerados e o app-shell é externo. A afirmação é parcial.

### 44. scripts/remove-importmap-entries.groovy:11-15

**Observação:** "Removing a module from the importmap alone leaves its extensions registered against slots […]. The app-shell then retries resolving a package that the importmap cannot supply […] until the browser tab runs out of memory and crashes."

**Interpretação:** Descreve o comportamento do mecanismo de carga do app-shell em runtime, fora do snapshot. A afirmação fica sem corroboração.

### 45. 758d373 2025-12-16 (.github/workflows/ci.yml, versão ausente); 7d6db6b 2026-01-08 (.github/workflows/deploy.yml, .github/workflows/run-e2e-tests.yml, .github/workflows/ci.yml, versão ausente); c08eeee 2026-01-10 (.github/workflows/ci.yml, versão ausente); a590846 2026-02-12 (.github/workflows/ci.yml, versão ausente); 1c1b728 2026-03-21 (.github/workflows/ci.yml, versão ausente); 7312d4c 2026-03-21 (.github/workflows/ci.yml, versão ausente); 90bdc3a 2026-07-03 (.github/workflows/ci.yml)

**Observação:** As mensagens dos dois commits anunciam o deploy automático em dev e em UAT. O segundo cria os workflows de deploy e de testes, que chegam ao snapshot. `ci.yml` mudou em mais cinco commits, de `c08eeee` a `90bdc3a`, e suas versões anteriores não estão disponíveis.

**Interpretação:** A chamada comentada no snapshot é resto de uma cadeia de deploy que foi introduzida, não um plano nunca ligado. O histórico não diz quando nem por que ela foi desligada.

### 46. 6abb17e 2026-06-22 (mensagem: "migrate to using @madiro/esm-home-app"); 9de5ce9 2026-05-14 (README.md, versão ausente); c852c54 2026-07-20 (README.md); 886cd9b 2026-08-21 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); eb80724 2026-09-03 (mensagem: "Update @madiro scoped packages with openmrs framework 10x"); c8fb59c 2026-09-19 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json)

**Observação:** O README do snapshot é o de `c852c54`. Depois dele, a configuração de montagem mudou seis vezes, de `886cd9b` a `c8fb59c`, e `eb80724` anuncia a atualização dos pacotes `@madiro` para o framework 10. O módulo que o README deixa de fora entra, segundo a mensagem, em `6abb17e`. As versões antigas do README e da configuração não estão disponíveis.

**Interpretação:** Não se sabe quando os números do README foram escritos nem se conferiam com a configuração daquele momento. A dúvida é só sobre o passado: no snapshot, a montagem tem 42 módulos e core `10.0.1-pre.5320`.

### 47. 792c607 2025-05-08 (scripts/apply-overrides.groovy, distro/pom.xml, distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip); 2b6b9e6 2025-05-09 (distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip); a48c566 2025-05-15 (distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip); 3bdf66f 2025-12-04 (distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip, distro/configs/openmrs/frontend_assembly/spa-assemble-config.json, distro/pom.xml); 8324e11 2026-02-14 (distro/configs/openmrs/overrides/modules/drools-1.1.0-SNAPSHOT.omod)

**Observação:** O override do banner entra com o script em `792c607`, é alterado em `2b6b9e6` e `a48c566` e é apagado em `3bdf66f`, junto com módulos backend de override. Nenhum outro arquivo é criado em `overrides/frontend` até o snapshot. Em `overrides/modules`, `8324e11` acrescenta um módulo backend.

**Interpretação:** A troca do bundle de uma unidade existiu de maio a dezembro de 2025 e foi abandonada. O script continua ligado ao build, sem override de frontend.

### 48. 9af9025 2026-03-09 (distro/configs/openmrs/frontend_config/msf-frontend-config.json); c852c54 2026-07-20 (README.md); f71c4f5 2026-09-09 (sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json, sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json, sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json)

**Observação:** O widget entra só na distro em `9af9025`. O README muda pela última vez em `c852c54`. As três configurações de site o removem juntas em `f71c4f5`, cuja mensagem diz que ele "is only meant to be visible on demo/distro".

**Interpretação:** A afirmação do README é do estágio em que todos os sites herdavam o widget. A remoção nos sites veio depois.

### 49. d63ea0e 2026-02-13 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); e88d16f 2026-03-24 (sites/mosul/pom.xml, sites/matsapha/pom.xml, sites/bunia/pom.xml); e36c0c4 2026-04-22 (mensagem: "Bunia - enable task lists"); c852c54 2026-07-20 (README.md); 3862541 2026-08-12 (mensagem: "Re-enable patient task list app for Matsapha")

**Observação:** O app de tarefas entra na montagem em `d63ea0e` e é tirado dos três sites em `e88d16f`. Segundo as mensagens, ele volta a Bunia (`e36c0c4`, 2026-04-22) e a Matsapha (`3862541`, 2026-08-12). O README mudou antes, dentro e depois desse intervalo, e suas versões antigas não estão disponíveis.

**Interpretação:** Não se sabe se a frase do README é resto do estágio em que todos os sites tinham o app. A dúvida é só sobre o passado: no snapshot, Mosul tira o app do import map.

### 50. 272b488 2025-11-17 (mensagem: "Build docker images using Bundled-docker and CLI"); 7de2fbe 2026-02-24 (mensagem: "Enable building and deploying of Distro images using bundled docker"); 185e757 2026-02-26 (mensagem: "Fix pushing distro docker images dev tags on snapshot build workflow"); c8fb59c 2026-09-19 (mensagem: "Stop the registration form crashing on the address hierarchy")

**Observação:** As mensagens sugerem um estágio em que as imagens da distro não eram construídas, até `7de2fbe`. `distro/pom.xml` mudou em 84 commits, e suas versões anteriores não estão disponíveis.

**Interpretação:** Não se sabe quando o comentário foi escrito. A dúvida é só sobre o passado: no snapshot, as execuções estão ativas.

### 51. c60c10b 2024-04-11 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json, distro/configs/openmrs/frontend_config/msf-frontend-config.json); d29d101 2024-05-16 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); b2e8d52 2024-05-26 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); 5e8bc05 2025-05-20 (docs/README.md); 9de5ce9 2026-05-14 (docs/README.md)

**Observação:** A lista de módulos está em `frontend_assembly/` desde o primeiro commit. Ela foi apagada e recriada no mesmo lugar em 2024. `docs/README.md` foi criado e alterado depois disso.

**Interpretação:** A tabela não é resto de uma organização anterior. Os módulos nunca foram definidos em `frontend_config/`.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.7 #2, #5, #6, #13, #15, #17, #19, #24, #27 (Evidência) | 2 configuração | configuração | import-maps | arquitetural | forte | — |
| 2 | 3.4.7 #7, #23 (Evidência) | 2 configuração | configuração | import-maps | arquitetural | moderada | configura scripts/remove-importmap-entries.groovy:71-100 |
| 3 | 3.4.7 #7, #23 (Evidência) | 2 configuração | configuração | import-maps | arquitetural | moderada | configura scripts/remove-importmap-entries.groovy:71-100 |
| 4 | 3.4.7 #7, #19, #23 (Evidência) | 2 configuração | configuração | import-maps | arquitetural | moderada | configura scripts/remove-importmap-entries.groovy:71-100 |
| 5 | 3.4.7 #8, #14, #15, #16, #27 (Evidência) | 2 configuração | configuração | other | arquitetural | forte | — |
| 6 | 3.4.7 #8, #9, #16, #20, #21 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 7 | 3.4.7 #16 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 8 | 3.4.7 #16 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 9 | 3.4.7 #18, #21, #27 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 10 | 3.4.7 #18 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 11 | 3.4.7 #18 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 12 | 3.4.7 #18 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 13 | 3.4.7 #21 (Evidência) | 2 configuração | configuração | other | arquitetural | moderada | — |
| 14 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 15 | 3.4.3 (docs) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.7 #1 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte scripts/docker-compose-traefik.yml:6-11; corrobora em parte scripts/docker-compose-openmrs-override.yml:16-18; corrobora em parte distro/pom.xml:901-909 |
| 17 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora sites/mosul/pom.xml:22-29, 36-48 |
| 18 | 3.4.7 #3 | 7 documentação | documentação | — | contexto | fraca | contradiz .github/workflows/ci.yml:25-48; contradiz .github/workflows/deploy.yml:3-4 |
| 19 | 3.4.7 #4 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte scripts/docker-compose-openmrs-override.yml:2-3, 16-18; corrobora em parte scripts/docker-compose-traefik.yml:6-26 |
| 20 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1 |
| 21 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1 |
| 22 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #2; corrobora em parte #3; corrobora em parte #4; corrobora em parte distro/pom.xml:641-655 |
| 23 | 3.4.7 #8 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #5; corrobora #6; corrobora sites/mosul/pom.xml:171-183 |
| 24 | 3.4.7 #9 | 7 documentação | documentação | — | tecnológica | fraca | corrobora em parte distro/pom.xml:446-447, 459-463; corrobora em parte sites/mosul/pom.xml:179-182; corrobora em parte #6 |
| 25 | 3.4.7 #10 | 7 documentação | documentação | — | contexto | fraca | corrobora sites/mosul/pom.xml:171-183; corrobora sites/matsapha/pom.xml:224-237; corrobora sites/bunia/pom.xml:238-251 |
| 26 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | corrobora distro/pom.xml:742-746, 958-971; corrobora .github/workflows/maven-publish.yml:107-108 |
| 27 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte distro/pom.xml:901-909; corrobora em parte sites/mosul/pom.xml:429-440 |
| 28 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1 |
| 29 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #5 |
| 30 | 3.4.7 #15 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #5; corrobora #1 |
| 31 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #6; contradiz #7; contradiz #8 |
| 32 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #1 |
| 33 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #11; corrobora #12 |
| 34 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #4 |
| 35 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6 |
| 36 | 3.4.7 #21 | 7 documentação | documentação | other | tecnológica | fraca | corrobora #6; corrobora #9; corrobora #13 |
| 37 | 3.4.7 #22 | 7 documentação | documentação | — | tecnológica | fraca | corrobora em parte distro/configs/openmrs/frontend_config/msf-frontend-config.json:222-231, 273-283 |
| 38 | 3.4.7 #23 | 7 documentação | documentação | import-maps | arquitetural | fraca | corrobora em parte #2; corrobora em parte #3; corrobora em parte #4 |
| 39 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1 |
| 40 | 3.4.7 #25 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte distro/pom.xml:643-655 |
| 41 | 3.4.7 #26 | 7 documentação | comentário | — | contexto | fraca | contradiz distro/pom.xml:958-971 |
| 42 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1 |
| 43 | 3.4.7 #28 | 7 documentação | comentário | import-maps | arquitetural | fraca | corrobora em parte scripts/remove-importmap-entries.groovy:71-100, 111-123 |
| 44 | 3.4.7 #29 | 7 documentação | comentário | import-maps | tecnológica | fraca | — |
| 45 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #18 |
| 46 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #20; explica #28 |
| 47 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #22; explica #40 |
| 48 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #31 |
| 49 | 3.4.8 #5 | 8 histórico | histórico | import-maps | arquitetural | fraca | explica #34 |
| 50 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #41 |
| 51 | 3.4.8 #7 | 8 histórico | histórico | — | arquitetural | fraca | explica #42 |

## Resumo

Observações: 51. Dimensões (tecnologia: 0, configuração: 13, código: 0, estrutura: 2, composição: 0, build-deploy: 0, documentação: 29, histórico: 7). Força (forte: 2, moderada: 11, fraca: 38, ambígua: 0). Evidência (tecnológica: 5, arquitetural: 36, contexto: 10).
