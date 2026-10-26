---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
url: https://github.com/MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [import-maps]
ui_technologies: [react]
build_tools: []
frontend_units: 42
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 074 — MSF-OCG/LIME-EMR

## Contexto

Distribuição OpenMRS 3 para atendimento humanitário, com configurações e empacotamento para diferentes locais (`README.md:3–5`, `pom.xml:11–16`). A organização em `distro` e `sites` representa variantes da distribuição, não quatro unidades frontend. O código das aplicações frontend é externo: este candidato configura quais módulos entram na distribuição e como suas extensões aparecem na aplicação.

Clone conferido em `data/samples/mfe-sample-001/repos/MSF-OCG__LIME-EMR/`. Rank, ID e SHA correspondem à linha `cloned` em `data/samples/mfe-sample-001/clones.csv:75`; `git rev-parse HEAD` retornou o SHA do front matter e `git cat-file -t` confirmou um commit. Inspeção somente por `git ls-tree`, `git show` e `git grep` no SHA fixado, sem executar builds ou acessar ambientes externos.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:3–5` descreve uma distribuição OpenMRS 3/Ozone HIS; `README.md:85–91` enumera implantações e informa produção em Mosul. O workflow `.github/workflows/build-all.yml:31–51` configura checkout e empacotamento Maven. Sustenta o contexto de aplicação destinada à produção, sem provar sozinho a arquitetura frontend ou sucesso de execução. | contexto |
| Estrutura / Configuração | `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:2–45` fixa a versão do core e 42 entradas de `frontendModules`, incluindo home, login, patient chart, nutrição e saúde mental. `:48–54` exclui seis outros módulos. Há unidades externas explicitamente referenciadas por uma configuração de montagem, não somente dependências genéricas. | moderada |
| Configuração / Composição | `distro/configs/openmrs/frontend_config/msf-frontend-config.json:2–20` configura home e app-shell; `:27–39` configura patient chart e adiciona/ordena extensões em um slot. `:146–158` adiciona `patient-flags-list` a slots do resumo e das medicações. São relações explícitas de UI na mesma aplicação. | moderada |
| Build/deploy / Configuração | `distro/pom.xml:438–447` substitui o nome da configuração frontend em `.env`; `:452–463` acrescenta configuração à variável `SPA_CONFIG_URLS`. `sites/mosul/pom.xml:171–182` acrescenta também a configuração específica do local. Há uso configurado das configurações de UI no empacotamento, além de sua mera presença na árvore. | moderada |
| Build/deploy / Composição | `sites/mosul/pom.xml:220–234` vincula `remove-importmap-entries.groovy` à fase `process-resources`, passando dois módulos a remover. `scripts/remove-importmap-entries.groovy:30–39` seleciona o frontend empacotado; `:71–100` lê `importmap.json` e `routes.registry.json`, remove entradas correspondentes e regrava os arquivos; `:111–123` verifica rotas sem entrada no mapa quando ambos os arquivos existem. É código operacional ligado ao build, corroborando o mecanismo por mapas e registros de rotas; não é uma execução observada. | moderada |
| Build/deploy / Composição | O mesmo script é executado nos três sites, não só em Mosul: `sites/bunia/pom.xml:318–331` e `sites/matsapha/pom.xml:273–286`, além de `sites/mosul/pom.xml:220–234`. Cada módulo removido é uma entrada própria do import map, retirada por site sem tocar nas demais. Revisão independente registrou no histórico os commits b4642b8 (2026-02-16, "Remove Mental health and nutrition from matsapha frontend (#352)") e 16603b7 (2026-09-07, "Stop the patient chart crashing…(#451)"), indicando uso operacional recorrente (histórico lido somente leitura; não foi reconferido por esta anotação). | moderada |
| Documentação / Composição | `README.md:189` descreve "OpenMRS 3 ESM microfrontend architecture"; `README.md:1063–1065` e `:1102` dizem que a opção C remove os módulos do import map no build para que não sejam carregados no site. É documentação: corrobora que o import map é o que o shell usa para carregar cada unidade, mas não comprova o carregador. O README está desatualizado em relação à configuração ("41 modules" em `README.md:189` contra 42 em `spa-assemble-config.json:3–46`), por isso `frontend_units` segue a configuração. | fraca |
| Código-fonte / Composição | `scripts/remove-importmap-entries.groovy:7–16` explica que o shell resolve bundles pelo import map e páginas/extensões pelo registro de rotas. Essa descrição é coerente com a edição efetiva dos dois mapas (`:71–100`) e com os slots configurados. O carregador do shell e os mapas resultantes não estão versionados neste commit; os comentários não bastam para comprovar a conexão em runtime. | ambígua |
| Build/deploy / Estrutura | `distro/pom.xml:7–11` herda um parent Maven externo (`com.ozonehis:maven-parent:1.0.0-alpha.15`); `:492–494` altera um script de montagem em `target/openmrs/frontend_assembly/` que lê `coreVersion` de `target/openmrs_frontend/spa-assemble-config.json`. `distro/assembly.xml:14–18` empacota a distribuição; `sites/mosul/pom.xml:22–28`, `:39–48` e `:59–70` recebe e copia o ZIP da distribuição base. Isso mostra montagem/entrega conjunta de artefatos, sem demonstrar entradas, builds ou implantação independente de cada unidade externa. | ambígua |
| Estrutura / Código-fonte / Configuração | Inventário completo por `git ls-tree -r --name-only` no SHA: 486 arquivos. Procurados manifestos de unidades, fontes de UI, configuração de bundlers e artefatos do carregador. O único `package.json` contém scripts/dependências de testes (`package.json:6–18`); os arquivos TypeScript listados ficam em `e2e/`. Não há `importmap.json`, `routes.registry.json`, `build-openmrs-frontend.groovy` nem caminhos contendo `webpack`, `rspack` ou `vite`. Esses arquivos gerados são referidos por `scripts/remove-importmap-entries.groovy:71–75` e `distro/pom.xml:493–494`, mas seu conteúdo não é inspecionável no commit. | ausente |
| Tecnologia / Configuração / Código-fonte | Busca textual com `git grep -n -i -E` por `module.?federation`, `registerApplication`, `single-spa`, `remoteEntry`, `customElements[.]define`, `System[.]import` e `<iframe` não teve ocorrências. Escopo: árvore do commit, exceto `.yarn/`, `yarn.lock`, arquivos terminados em `projectState.json`, `staging_config.json` e `adaptor_registry_cache.json`. Não se atribui single-spa, Module Federation ou Web Components apenas pelo conhecimento do ecossistema OpenMRS. A evidência positiva observada é o tratamento dos import maps em `scripts/remove-importmap-entries.groovy:71–100`. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | A configuração de montagem referencia explicitamente 42 módulos frontend externos (`distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:3–45`). Unidades externas referenciadas por configuração de composição satisfazem o critério; não é necessário que suas fontes estejam neste repositório. |
| Q2 | Yes | As unidades são módulos ESM externos versionados individualmente na configuração de montagem (`distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:4–45`); a distribuição seleciona quais compor sem importar suas fontes. |
| Q3 | Yes | Home, shell e patient chart têm configuração na mesma distribuição (`distro/configs/openmrs/frontend_config/msf-frontend-config.json:2–39`), com extensões adicionadas em slots (`:146–158`). O build configura seu consumo via `.env` e `SPA_CONFIG_URLS` (`distro/pom.xml:438–463`); o código de manutenção dos mapas relaciona módulos a rotas (`scripts/remove-importmap-entries.groovy:71–100`). As unidades participam da mesma aplicação configurada. |
| Q4 | Yes | O mecanismo por import maps e registro de rotas é manipulado por código operacional vinculado ao build (`sites/mosul/pom.xml:220–234`; `scripts/remove-importmap-entries.groovy:71–100`), que remove unidades por site e verifica a coerência entre rotas e mapa. |
| Q5 | Yes | As configurações de montagem, os slots de UI e a manutenção operacional dos import maps estabelecem uma composição MFE concreta. |

## Motivo

- Aplica-se a regra `MFE-implemented`: Q1–Q5 são Yes após a revisão conjunta.
- Não se aplica `MFE-unit`: o candidato configura várias unidades externas e a distribuição que as reúne; não contém apenas uma unidade preparada para host externo.
- Há evidência de aplicação composta mais forte que uma menção ou dependência isolada, mas o fato de listar pacotes versionados não prova a independência operacional das unidades. A montagem por Maven tampouco prova, sozinha, que os módulos são fundidos em um único bundle: os scripts indicam mapas usados por um shell.
- `frontend_units: 42` conta as entradas explicitamente referenciadas em `frontendModules`, antes das remoções específicas de cada local; não afirma 42 unidades ativas em todas as implantações. Não inclui o core como unidade adicional nem os módulos excluídos. `unit_organization: multi-repo` registra as unidades externas referenciadas, e não os módulos Maven como aplicações.
- `approaches: [import-maps]` registra o mecanismo observado no código de configuração/manutenção, cuja conexão efetiva segue em avaliação. `ui_technologies: [react]` registra a UI React da plataforma OpenMRS 3 distribuída pelos módulos referenciados; as fontes desses módulos não estão neste repositório. O campo de bundler fica vazio: não há fontes/builds das unidades para atribuir webpack ou outro bundler. Maven é observado como orquestrador/empacotador da distribuição.

## Notas para análise

- **RQ3:** configuração de versões → configuração de slots/rotas → ajustes Maven em `SPA_CONFIG_URLS` → manutenção de import map/registro de rotas. A geração e o carregamento dos bundles são os elos externos ainda não verificados.
- **Protocolo:** análise no commit fixado; nenhuma execução de build, acesso ao ambiente clínico ou aquisição foi realizada. A configuração versionada não comprova sucesso de implantação.

## Decisão registrada

Promover para **MFE-implemented**. A distribuição configura a montagem de módulos ESM externos e seu carregamento por import maps, define como as extensões ocupam slots da aplicação e contém código de build que mantém os mapas e as rotas coerentes por implantação.
