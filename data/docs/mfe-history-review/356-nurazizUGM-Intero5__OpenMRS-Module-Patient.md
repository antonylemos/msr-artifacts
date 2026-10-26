---
schema: 1
id: 997746951
full_name: nurazizUGM-Intero5/OpenMRS-Module-Patient
commit: c490ce752bac4d0772f28778fe81434dd6c57a00
inputs:
  clone: data/samples/mfe-sample-001/repos/nurazizUGM-Intero5__OpenMRS-Module-Patient
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Leitura do repositório

São 2.380 commits alcançáveis até o snapshot, de 2019-10-08 a 2025-06-07. O log inclui dois commits chamados “Initial commit”, `1bebbfd1` e `14775079`, ambos de 2019-10-08; eles delimitam a primeira presença observável neste histórico, sem revelar onde o código foi desenvolvido antes. O último é `c490ce75` (2025-06-07, “Integrasi Katalog API”). O conjunto é o monorepo de módulos do OpenMRS descrito nas revisões anteriores; esta etapa consulta somente ambiguidades desses artefatos, sem construir uma trajetória de adoção.

Há cinco declarações de dependência sem uso na 3.4.2, duas dúvidas sobre eventos e doze sobre slots/workspaces na 3.4.4–3.4.5, além das afirmações parciais ou contraditas da 3.4.7. Não há unidade indeterminada na 3.4.3 nem deploy indeterminado na 3.4.6. As duas ocorrências do slot de laboratório, e as duas afirmações sobre Biometrics, foram reunidas por tratarem da mesma dúvida. A afirmação sobre distribuições externas foi reunida ao workspace de appointments no mesmo componente.

O snapshot foi considerado primeiro: ele mostra os contratos locais, os papéis de biblioteca e app, os scripts e a ausência de contrapartes locais. Isso não resolve a origem das divergências nem o uso externo. O histórico confirma a remoção do pacote Biometrics e a coexistência de duas divergências do script e2e já em junho de 2024. Os demais pontos ficam inconclusivos: faltam blobs antigos ou a contraparte pertence ao shell, às distribuições ou a bibliotecas externas. As mensagens de commits são diferenciadas de conteúdo efetivamente lido; a ausência de objetos não desencadeou busca na rede. Os logs por caminho atual não acompanham automaticamente renomeações e não demonstram introdução original de cada construção.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@angular-extensions/elements` declarado sem uso em `packages/esm-form-entry-app` | 3.4.2 (packages/esm-form-entry-app/package.json:38) | uso de dependência | b50eb9b3 2021-08-08 Moved form entry | inconclusivo |
| 2 | `systemjs-webpack-interop` declarado sem uso em `packages/esm-form-entry-app` | 3.4.2 (packages/esm-form-entry-app/package.json:61) | uso de dependência | b50eb9b3 2021-08-08 Moved form entry; 3d1e771d 2023-05-22 (fix) Setup `esm-form-entry` to use webpack module federation (#1168) | inconclusivo |
| 3 | `single-spa` declarado sem uso em `packages/esm-patient-chart-app` | 3.4.2 (packages/esm-patient-chart-app/package.json:53) | uso de dependência | 28f77b89 2021-03-04 Migrated to monorepo | inconclusivo |
| 4 | `single-spa-react` declarado sem uso em `packages/esm-patient-chart-app` | 3.4.2 (packages/esm-patient-chart-app/package.json:54) | uso de dependência | 28f77b89 2021-03-04 Migrated to monorepo | inconclusivo |
| 5 | `single-spa` declarado sem uso em `packages/esm-patient-common-lib` | 3.4.2 (packages/esm-patient-common-lib/package.json:39) | uso de dependência | ddb858ef 2021-04-27 Common lib (#228) | inconclusivo |
| 6 | Emissor de `openmrs:form-view-embedded` não identificado | 3.4.4 (form-collapse-toggle.component.tsx:15); 3.4.5 #4 | ativo ou abandonado | ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (#1814) | inconclusivo |
| 7 | Receptor de `openmrs:form-collapse-toggle` não identificado | 3.4.4 (form-collapse-toggle.component.tsx:23-24); 3.4.5 #5 | ativo ou abandonado | ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (#1814) | inconclusivo |
| 8 | `config.interpretationSlot` sem extensão identificada | 3.4.4 (obs-graph.component.tsx:113); 3.4.5 #9 | ativo ou abandonado | 6af19736 2022-11-17 Possibility to add an ExtensionSlot under graph (#848) | inconclusivo |
| 9 | `top-of-all-patient-dashboards-slot` sem fornecedor | 3.4.4 (dashboard-view.component.tsx:66); 3.4.5 #20 | ativo ou abandonado | 8a8f19cb 2022-09-08 fix: Adjust `top-of-all-patient-dashboard-slot` appears before dashboard title (#800) | inconclusivo |
| 10 | `visit-form-top-slot` sem fornecedor | 3.4.4 (visit-form.workspace.tsx:452); 3.4.5 #23 | ativo ou abandonado | 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (#2169) | inconclusivo |
| 11 | `extra-visit-attribute-slot` sem fornecedor | 3.4.4 (visit-form.workspace.tsx:547); 3.4.5 #24 | ativo ou abandonado | 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (#2169) | inconclusivo |
| 12 | `visit-form-bottom-slot` sem fornecedor | 3.4.4 (visit-form.workspace.tsx:562); 3.4.5 #25 | ativo ou abandonado | 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (#2169) | inconclusivo |
| 13 | `appointments-form-workspace` e uso em distribuições externas sem confirmação | 3.4.4 (active-visit-buttons.tsx:24); 3.4.5 #26; 3.4.7 #17 | ativo ou abandonado | 71a16388 2024-03-05 O3-2857 Add visit actions extension in visits (#1692) | inconclusivo |
| 14 | `visit-summary-panels` sem fornecedor | 3.4.4 (visit-summary.component.tsx:159); 3.4.5 #28 | ativo ou abandonado | 57a6db1b 2023-07-24 (feat) Add an extension slot for additional visit summary items (#1286) | inconclusivo |
| 15 | `slotName ?? title` sem fornecedor identificado | 3.4.4 (DashboardGroupExtension.tsx:24); 3.4.5 #35 | ativo ou abandonado | 449a6faa 2022-03-09 (feat) O3-1108  Left nav should support groupings (#595) | inconclusivo |
| 16 | `medication-info-slot` sem fornecedor | 3.4.4 (drug-order-form.component.tsx:213); 3.4.5 #47 | ativo ou abandonado | a371ea27 2024-05-13 (feat) O3 3128: Add extension slots to lab and drug order forms (#1818) | inconclusivo |
| 17 | `${matchingOrder.type}-action-menu-items-slot` sem fornecedor | 3.4.4 (order-details-table.component.tsx:534); 3.4.5 #52 | ativo ou abandonado | 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (#2385) | inconclusivo |
| 18 | `${matchingOrder.type}-detail-slot` sem fornecedor | 3.4.4 (order-details-table.component.tsx:561); 3.4.5 #53 | ativo ou abandonado | 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (#2385) | inconclusivo |
| 19 | `top-of-lab-order-form-slot` sem fornecedor nos dois formulários | 3.4.4 (general-order-form.component.tsx:169; test-order-form.component.tsx:193); 3.4.5 #54 e #56 | ativo ou abandonado | 14c1f1ff 2024-12-06 (feat) O3-4223: Allow adding different order types in the order basket (#2109) | inconclusivo |
| 20 | README mantém Biometrics como app separado e exemplo de composição com Vitals | 3.4.7 #2 e #6 | estágios em conflito | e87b8ace 2023-11-08 BREAKING: Merge vitals and biometrics apps (#1429) | esclarecido |
| 21 | README chama Common lib de microfrontend | 3.4.7 #3 | estágios em conflito | ddb858ef 2021-04-27 Common lib (#228); 04e7221e 2021-07-28 Rewrite the README, removing most of it (#311) | inconclusivo |
| 22 | Execução conjunta por `openmrs develop` só parcialmente observável | 3.4.7 #5 | ativo ou abandonado | 04e7221e 2021-07-28 Rewrite the README, removing most of it (#311) | inconclusivo |
| 23 | Import map overrides documentados sem implementação local | 3.4.7 #7 | ativo ou abandonado | 04e7221e 2021-07-28 Rewrite the README, removing most of it (#311) | inconclusivo |
| 24 | Comentário e2e promete todos os apps, mas exclui form-entry | 3.4.7 #10 | estágios em conflito | ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (#1859) | esclarecido |
| 25 | Comentário e2e anuncia login, mas prefixa home e navegação | 3.4.7 #11 | estágios em conflito | ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (#1859) | esclarecido |
| 26 | Consumo externo da biblioteca exposta em window não confirmado | 3.4.7 #15 | ativo ou abandonado | 93fcb73a 2023-10-25 (feat) Supporting O3-2510: Expose patient-common-lib on window (#1430) | inconclusivo |
| 27 | Compartilhamento de current visit com patient search externo não confirmado | 3.4.7 #16 | ativo ou abandonado | e20f1c9a 2022-03-07 (refactor) esm-patient-chart to organize by functionality; eslint ts files (#594) | inconclusivo |
| 28 | HFE-UI externo emitiria mensagem ao salvar ou cancelar | 3.4.7 #23 | ativo ou abandonado | 30f4782c 2024-08-26 (feat) O3-3799: Open HTML Form Entry Forms within Form Workspace (#1963) | inconclusivo |

## Observações

**1. `@angular-extensions/elements` declarado sem uso em `packages/esm-form-entry-app`.** O log do manifesto começa em b50eb9b3 (2021-08-08, “Moved form entry”), mas seu blob está ausente. A mensagem de 3d1e771d (2023-05-22, “(fix) Setup `esm-form-entry` to use webpack module federation (#1168)”) anuncia uma configuração do wrapper; o webpack desse estágio também não pôde ser lido. Não se confirma uso anterior, substituição ou abandono de elements.

**2. `systemjs-webpack-interop` declarado sem uso em `packages/esm-form-entry-app`.** Os blobs do manifesto em b50eb9b3 e do webpack em 3d1e771d estão ausentes. O anúncio de Module Federation não demonstra o destino de systemjs-webpack-interop, nem que tenha existido uma chamada removida. A declaração sem uso do snapshot permanece sem explicação histórica.

**3. `single-spa` declarado sem uso em `packages/esm-patient-chart-app`.** O log do manifesto e da entrada do chart alcança 28f77b89 (2021-03-04, “Migrated to monorepo”); ambos os conteúdos desse estágio estão ausentes. Não se pode distinguir peer contract mantido para tooling externo de um import que teria sido retirado. O uso atual via framework não comprova uso direto deste pacote no passado.

**4. `single-spa-react` declarado sem uso em `packages/esm-patient-chart-app`.** A mesma lacuna do manifesto e da entrada em 28f77b89 impede verificar se single-spa-react foi usado diretamente antes da delegação ao framework observável no snapshot. Nenhuma intenção ou remoção de uso é inferida da dependência declarada.

**5. `single-spa` declarado sem uso em `packages/esm-patient-common-lib`.** O log do manifesto da biblioteca chega a ddb858ef (2021-04-27, “Common lib (#228)”), mas o blob está ausente. A mensagem não informa o papel de single-spa. Não há base para afirmar uso anterior nem abandono dessa declaração.

**6. Emissor de `openmrs:form-view-embedded` não identificado.** A mensagem de ef475921 anuncia a adição do toggle; o conteúdo desse commit está ausente. O log registra depois dc7b090e (2024-06-05, “(fix) Change the form collapse toggle color on tablet (#1857)”), sem esclarecer por mensagem quem emite o evento. Não se identifica uma unidade emissora nem se prova abandono.

**7. Receptor de `openmrs:form-collapse-toggle` não identificado.** O mesmo arquivo concentra o envio do segundo evento. Seu conteúdo em ef475921 está indisponível. Saber quando o toggle aparece não identifica o ouvinte externo, nem demonstra que o canal tenha sido desconectado.

**8. `config.interpretationSlot` sem extensão identificada.** A mensagem de 6af19736 anuncia um ExtensionSlot sob o gráfico, mas seu conteúdo e o primeiro conteúdo do caminho atual (dddc1457) estão ausentes. O padrão vazio no snapshot (config-schema.ts:19-23) explica a condição local de renderização, sem identificar configuração externa ou uso anterior.

**9. `top-of-all-patient-dashboards-slot` sem fornecedor.** A mensagem de 8a8f19cb anuncia ajuste de posição de um slot de dashboard; não demonstra qual unidade o preenchia. O conteúdo inicial do caminho atual em e20f1c9a está ausente. Não se conclui se o slot perdeu consumidor ou permanece como ponto de extensão externo.

**10. `visit-form-top-slot` sem fornecedor.** O log do caminho atual começa em 164cd3f8, cujo blob está ausente. As alterações do arquivo não bastam para datar esse slot específico ou mostrar um fornecedor removido. Não se reconstrói o caminho anterior a eventuais reorganizações.

**11. `extra-visit-attribute-slot` sem fornecedor.** A indisponibilidade do conteúdo em 164cd3f8 impede comparar o slot com esse estágio. A chamada atual sem registro local não demonstra abandono; o log de mudanças do arquivo não identifica consumidores.

**12. `visit-form-bottom-slot` sem fornecedor.** O mesmo limite de conteúdo em 164cd3f8 impede estabelecer a história desse segundo ponto de extensão do formulário. Não se infere uma unidade destino por proximidade com os demais slots.

**13. `appointments-form-workspace` e uso em distribuições externas sem confirmação.** O conteúdo em 71a16388 está ausente. A mensagem anuncia ações de visita, sem identificar um registro de appointments ou os manifests de outras distribuições. O snapshot contém o botão e o comentário sobre distribuições externas (active-visit-buttons.tsx:15), mas nenhum deles comprova a integração externa ou abandono.

**14. `visit-summary-panels` sem fornecedor.** A mensagem de 57a6db1b anuncia um slot para itens adicionais de resumo; não foi inspecionado o conteúdo dessa mudança. O primeiro blob consultado do caminho, em 9970d8a5, está ausente. A mensagem não resolve quem preenche o slot nem se houve remoção de consumidor.

**15. `slotName ?? title` sem fornecedor identificado.** O log chega a 449a6faa, cuja mensagem anuncia agrupamentos da navegação. O blob desse estágio está ausente; não se determina quando a expressão atual surgiu nem que unidades configurariam os grupos. A existência do helper não prova conexão externa.

**16. `medication-info-slot` sem fornecedor.** A mensagem de a371ea27 anuncia slots nos formulários de pedidos. O conteúdo inicial consultado em 64389b35 está ausente; não foi lido o conteúdo do commit anunciado. A mensagem não identifica extensões fornecedoras nem prova abandono.

**17. `${matchingOrder.type}-action-menu-items-slot` sem fornecedor.** O conteúdo de 24cd98cc pôde ser lido e já contém este slot dinâmico; o log do caminho atual registra só esse commit até o snapshot. Isso estabelece presença nesse caminho e estabilidade posterior, mas não introdução original: o arquivo pode ter vindo de outro caminho. O consumidor continua não identificado.

**18. `${matchingOrder.type}-detail-slot` sem fornecedor.** O mesmo conteúdo de 24cd98cc já contém o segundo slot dinâmico e não há alteração posterior desse caminho no log. Isso não mostra se uma extensão externa já o preenchia ou se foi desconectada. Não se confunde estabilidade do arquivo com esclarecimento do uso.

**19. `top-of-lab-order-form-slot` sem fornecedor nos dois formulários.** Os dois caminhos atuais aparecem no log em 14c1f1ff, cuja mensagem anuncia diferentes tipos de pedido no carrinho; ambos os blobs estão ausentes. A mesma dúvida foi reunida num ponto porque os dois formulários montam o mesmo slot. Não se comprova introdução do slot, fornecedor removido ou abandono.

**20. README mantém Biometrics como app separado e exemplo de composição com Vitals.** O name-status de e87b8ace confirma a remoção do README, manifesto, entrada e routes.json de esm-patient-biometrics-app, com adições de arquivos de biometria no app vitals. Isso sustenta a mudança entre estágios anunciada pela mensagem de fusão, sem afirmar identidade do conteúdo movido, pois os blobs antigos não foram lidos. O README desse commit está ausente, mas o snapshot ainda aponta ao diretório removido e o usa no comando de desenvolvimento (README.md:11, :50-53). A divergência refere-se a uma unidade que existiu antes; não se data a criação original dos exemplos.

**21. README chama Common lib de microfrontend.** O snapshot resolve o papel atual como biblioteca, mas não a origem de sua inclusão na lista de microfrontends. A mensagem de ddb858ef anuncia Common lib e a de 04e7221e uma reescrita do README. Os blobs do manifesto da biblioteca e desse README estão ausentes, impedindo verificar se a expressão descreveu outra organização ou sempre foi imprecisa.

**22. Execução conjunta por `openmrs develop` só parcialmente observável.** O snapshot mostra o script e a documentação, mas o tooling que executa --sources é externo. O README antigo consultado em 04e7221e está ausente; o log não fornece a implementação externa nem esclarece eventual mudança do contrato. Não se transforma a limitação do corpus em evidência de abandono.

**23. Import map overrides documentados sem implementação local.** Os scripts serve estão presentes no snapshot; os overrides pertencem ao ambiente externo descrito pelo README. Seu conteúdo antigo em 04e7221e não está disponível. A documentação e o log do arquivo não mostram se o shell externo mantém esse recurso nem se alguma configuração local foi retirada.

**24. Comentário e2e promete todos os apps, mas exclui form-entry.** O script de ac9ae85e foi lido: já contém o comentário “all the apps” e o filtro que exclui form-entry-app. Não há alteração posterior desse caminho no log até o snapshot. A mensagem anuncia uso do React Form Engine nos testes. Assim, comentário e exclusão coexistem comprovadamente desde esse estágio; não se deve atribuir a divergência a uma mudança posterior. O conteúdo inicial de 07069195 está ausente, portanto não se data a primeira ocorrência da divergência.

**25. Comentário e2e anuncia login, mas prefixa home e navegação.** O mesmo script de ac9ae85e já tem o comentário sobre login e o objeto que só prefixa esm-primary-navigation-app e esm-home-app. O arquivo não muda depois até o snapshot. A divergência já coexistia nesse estágio, sem ser possível reconstruir seu nascimento: o script de 07069195 está ausente. Não se afirma que login nunca foi montado em outro estágio ou pelo shell externo.

**26. Consumo externo da biblioteca exposta em window não confirmado.** A mensagem de 93fcb73a anuncia a exposição de patient-common-lib em window, mas seu src/index.ts está ausente. O snapshot confirma a atribuição e o import de ngx-formentry, sem mostrar o consumidor do global. A mensagem não comprova o consumo alegado, sua duração ou abandono.

**27. Compartilhamento de current visit com patient search externo não confirmado.** O conteúdo inicial consultado do componente em e20f1c9a está ausente. O snapshot mostra a limpeza com setCurrentVisit, mas não o Active Visit Tag externo citado no comentário. O log local não permite verificar esse consumidor nem concluir se o comentário descreve integração atual ou um estágio anterior.

**28. HFE-UI externo emitiria mensagem ao salvar ou cancelar.** A mensagem de 30f4782c anuncia a abertura dos formulários HTML num workspace; o conteúdo desse estágio está ausente. A URL e o receptor local estão no snapshot, mas o emissor HFE-UI é externo. Não se confirma historicamente a emissão nos eventos de salvar/cancelar nem se infere abandono do contrato.

## Comandos

Todos os hashes históricos usados nas leituras aparecem nos logs limitados ao snapshot abaixo; são seus ancestrais. Os `show hash:caminho` leem conteúdo, e o último `show --name-status` lê somente metadados das mudanças. As falhas indicadas são de objetos ausentes, sem download.

```sh
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient rev-list --count c490ce752bac4d0772f28778fe81434dd6c57a00
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- README.md packages/esm-patient-biometrics-app
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-form-entry-app/package.json packages/esm-form-entry-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- e2e/support/github/run-e2e-docker-env.sh
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/package.json
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-common-lib/package.json
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-orders-app/src/components/order-details-table.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/index.ts
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 28f77b89:packages/esm-patient-chart-app/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show ddb858ef:packages/esm-patient-common-lib/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show ef475921:packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show dddc1457:packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show e20f1c9a:packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 164cd3f8:packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 71a16388:packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 9970d8a5:packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 449a6faa:packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 64389b35:packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 24cd98cc:packages/esm-patient-orders-app/src/components/order-details-table.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 14c1f1ff:packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 14c1f1ff:packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 28f77b89:packages/esm-patient-chart-app/src/index.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show e20f1c9a:packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 30f4782c:packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show b50eb9b3:packages/esm-form-entry-app/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 3d1e771d:packages/esm-form-entry-app/webpack.config.js # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 6af19736:packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 93fcb73a:packages/esm-patient-chart-app/src/index.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 07069195:e2e/support/github/run-e2e-docker-env.sh # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show ac9ae85e:e2e/support/github/run-e2e-docker-env.sh
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 04e7221e:README.md # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show e87b8ace:README.md # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show --format=%h%x09%cs%x09%s --name-status --no-renames e87b8ace -- packages/esm-patient-biometrics-app packages/esm-patient-vitals-app
```

A comparação foi executada antes e depois das consultas, com saída vazia e código 0 em ambas:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 2380 (2019-10-08 a 2025-06-07). Pontos: 28 (esclarecido: 3, inconclusivo: 25, resolvido pelo snapshot: 0).
