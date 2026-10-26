---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Leitura do repositório

Distribuição OpenMRS 3 da MSF-OCG, montada sobre a Ozone HIS e empacotada por Maven para três locais (`sites/mosul`, `sites/bunia`, `sites/matsapha`). O repositório não contém o código de nenhuma aplicação frontend: ele escolhe quais módulos ESM externos entram na distribuição e como eles se comportam. A configuração de montagem fixa a versão do core e lista 42 `frontendModules` com versão (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:2-46), e exclui seis módulos padrão (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:48-55). A configuração de UI ajusta esses módulos pelo nome do pacote: liga feature flags do `@openmrs/esm-app-shell` (distro/configs/openmrs/frontend_config/msf-frontend-config.json:18-20) e põe a extensão `patient-flags-list` em slots do patient chart (distro/configs/openmrs/frontend_config/msf-frontend-config.json:27-39; distro/configs/openmrs/frontend_config/msf-frontend-config.json:146-158). O build troca a configuração de frontend no `.env` gerado e acrescenta configurações a `SPA_CONFIG_URLS` (distro/pom.xml:446-447; distro/pom.xml:460-461).

O host que compõe esses módulos é o `@openmrs/esm-app-shell`, que é externo. Segundo o próprio script do repositório, o app-shell carrega cada bundle pelo `importmap.json` e registra páginas e extensões pelo `routes.registry.json` (scripts/remove-importmap-entries.groovy:7-16). Os dois mapas são gerados no build e não estão no snapshot. O que está versionado é a manutenção deles: cada site roda `remove-importmap-entries.groovy` na fase `process-resources` para tirar módulos da sua distribuição (sites/mosul/pom.xml:220-234, que remove `@openmrs/esm-ward-app` e `@openmrs/esm-patient-task-list-app` em :229; sites/bunia/pom.xml:327; sites/matsapha/pom.xml:282). O script apaga as entradas nos dois mapas (scripts/remove-importmap-entries.groovy:71-100) e falha o build se uma rota ficar sem entrada no import map (scripts/remove-importmap-entries.groovy:111-123).

Nenhuma relação foi registrada. A revisão estrutural julga `No` os dois diretórios candidatos, `.` (testes Playwright) e `docs` (site Docsify), e conta 0 aplicações frontend no snapshot. A revisão de código-fonte não tem nenhuma construção `Yes` ou `Undetermined`, e a revisão de dependências não tem dependência das tecnologias inspecionadas. Uma relação precisa de uma Origem que seja diretório `Yes` ou `Undetermined` da revisão estrutural, e aqui não há nenhum. A origem real da composição (o app-shell) e os destinos (os 42 módulos) estão todos fora do snapshot, e a ligação entre eles passa por mapas gerados que também não estão nele. As declarações acima mostram quais unidades a distribuição compõe e como o build mantém os mapas, mas não ligam duas unidades do snapshot. Isso não contradiz a classificação (`MFE-implemented`, `approaches: [import-maps]`, 42 unidades `multi-repo`): o repositório configura uma composição cujas partes ficam todas em outros repositórios.

## Relações

Nenhuma relação.

## Observações

Nenhuma relação. A revisão de código-fonte não tem linha `Yes` ou `Undetermined` para distribuir na coluna Código.

## Resumo

Relações: 0. Ativas: 0. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
