---
schema: 1
id: 1072488371
full_name: TheSSSAI/DicomFlow
url: https://github.com/TheSSSAI/DicomFlow
commit: 30ad97a63074ba9ac78de0cfb68d3f176849dc02
classification: Uncertain
checklist: { q1: yes, q2: undetermined, q3: yes, q4: undetermined, q5: undetermined }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 103 — TheSSSAI/DicomFlow

## Contexto

Projeto de plataforma PACS multi-tenant, com serviços .NET, documentação extensa, um shell React e módulos clínico/administrativo. `repo_type: production` registra a orientação a um sistema de imagem médica, descrita como objetivo em `README.md:114–134`, não implantação ou prontidão verificadas. Os módulos contêm fontes React e configurações fora dos documentos, mas a composição tem falhas de contrato, entradas ausentes e configurações não carregáveis como escritas. Não se considera o nome ou a dependência de federação confirmação de implementação.

Clone confirmado: `TheSSSAI__DicomFlow`; SHA conforme `data/samples/mfe-sample-001/clones.csv:104`. Inventário integral por `git ls-tree -r` no SHA: **1.923 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. Não há `node_modules/`, lockfile npm/yarn/pnpm ou submódulos. As quatro pastas com package.json são shell (92 arquivos), admin (103), clinical (99) e dicom-viewer-component (77); todas são subpastas do snapshot, não repositórios externos implicitamente acessíveis.

`frontend_units: 3` registra os alvos de aplicação identificados por fontes/configuração: `pacs-webapp-shell`, `pacs-webapp-admin-portal` e `pacs-webapp-clinical-workspace`. Não afirma entradas/builds completos, dúvida tratada em Q2/Q4. `pacs-dicom-viewer-component` é biblioteca ES/UMD, não quarta aplicação federada demonstrada: o alias viewer do host não tem produtor de federação correspondente no snapshot. Não se conta uma quarta unidade só pela URL declarada, como o remote genérico não implementado de 083. Os serviços backend, documentos, biblioteca e páginas individuais não aumentam a contagem.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:104`: rank 103, id 1072488371, `strategies: technology`, elegibilidade `pass`. O run de origem é `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:19696` e `data/discovery/mfe-round-002/candidates.csv:19702` registram estratégia `technology`, descrição “DicomFlow” e `fork: false`. O `metadata_json` dessas linhas não fornece tópicos, linguagem, licença ou datas; ausência de campo não foi reescrita como lista vazia ou informação confirmada. `fork: false` não prova autoria original de arquivos.
- Consulta `sqlite3 -readonly` aos dois bancos discovery.sqlite, unindo `hits`/`queries` por `query_id` e filtrando `hits.repository_id = 1072488371`: em cada rodada há somente `technology-vite-federation-package-code`, endpoint `code`, consulta `"@originjs/vite-plugin-federation" filename:package.json`, caminho `pacs-webapp-shell/package.json`.
- **Campos e localização:** não é um hit por nome/descrição/tópicos/README, e não foi inventada eliminação textual para uma consulta de código. O artefato atingido declara o plugin em `pacs-webapp-shell/package.json:25`. Nome e descrição não demonstram MFE; o README é um índice documental e requisitos. A configuração consumidora e os demais contratos foram inspecionados separadamente, pois a dependência isolada não basta.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Configuração (host) | `pacs-webapp-shell/vite.config.ts:1–22` importa o plugin, configura aliases clinical/admin/viewer e lê suas URLs do ambiente. `pacs-webapp-shell/.env.development:13–16` define portas 3001–3003 com `remoteEntry.js`. Os pacotes Vite, React plugin e federation estão declarados (`pacs-webapp-shell/package.json:25`, `:34`, `:50`), e o build usa Vite (`:6–10`). Há configuração explícita de bundler/composição, além da dependência. | moderada |
| Configuração (admin) | `pacs-webapp-admin-portal/webpack.config.js:28–33` expõe `./AdminRoutes` → `./src/routes/AdminRoutes`; `:1–7` usa CommonJS e entrada `./src/index.tsx`, enquanto o pacote declara `type: module` (`pacs-webapp-admin-portal/package.json:5`). Webpack/Babel/plugins estão declarados (`:27–30`, `:39–56`), e há script específico de federação (`:9`), mas a forma CommonJS em `.js` no pacote ESM não é carregável normalmente como escrita. A entrada e o template `./index.html` (`pacs-webapp-admin-portal/webpack.config.js:50–53`) não existem no inventário. | ambígua |
| Configuração (clinical) | `pacs-webapp-clinical-workspace/config/webpack.config.js:43–49` expõe `./routes` → arquivo presente `src/routes/index.tsx`. O config CommonJS (`:5–11`) está sob pacote ESM (`pacs-webapp-clinical-workspace/package.json:5`) e o script o usa diretamente (`:9`). A entrada `./src/index.ts` (`pacs-webapp-clinical-workspace/config/webpack.config.js:11`) e o template `./public/index.html` (`:70–72`) estão ausentes. As regras CSS requerem style-loader/css-loader (`:32–35`), não declarados no manifesto completo (`pacs-webapp-clinical-workspace/package.json:16–61`); não há lockfile que resolva essa ausência. | ambígua |
| Código-fonte (rotas do host) | `pacs-webapp-shell/src/routes/index.tsx:90–118` associa estudos, admin e viewer a MicroFrontendLoader. Entretanto, importa-o como default (`:12`) e passa `moduleName`, enquanto o arquivo só exporta as versões nomeadas e sua interface exige `scope`/`module` (`pacs-webapp-shell/src/routes/MicroFrontendLoader.tsx:29–32`, `:53–66`, `:70–80`). Não há um par concreto alias/chave exposta sendo entregue ao loader como escrito. | ambígua |
| Código-fonte (loader) | `pacs-webapp-shell/src/routes/MicroFrontendLoader.tsx:43–57` chama sua implementação de placeholder/exemplo e usa `import(`${scope}/${module}`)` inteiramente dinâmico. `:59–64` tenta renderizar o resultado como componente. A implementação alternativa (`:5–26`, `:70–80`) presume globais Webpack e container já disponível, sem que o shell Vite configure ou carregue esses globais. A inspeção não demonstrou transformação do import variável nem caminho operacional que obtenha e adapte os exports. | ambígua |
| Código-fonte (contratos expostos) | Admin exporta função nomeada `getAdminRoutes(): RouteDefinition[]`, com páginas lazy locais (`pacs-webapp-admin-portal/src/routes/AdminRoutes.tsx:1–21`, `:38–56`); o barrel reexporta a função (`pacs-webapp-admin-portal/src/routes/index.ts:12–13`). Clinical exporta função nomeada `getRoutes(): RouteObject[]` (`pacs-webapp-clinical-workspace/src/routes/index.tsx:44–64`). Esses contratos são tabelas/fábricas de rotas, não componentes default para React.lazy; o loader não chama as funções nem incorpora seus arrays no router. | ambígua |
| Código-fonte (UI real nos módulos) | O módulo clínico contém StudyListPage com componentes/hooks de domínio (`pacs-webapp-clinical-workspace/src/features/studies/pages/StudyListPage.tsx:1–15`), e AdminRoutes referencia páginas de tenants, usuários, credenciais, GDPR e auditoria (`pacs-webapp-admin-portal/src/routes/AdminRoutes.tsx:4–21`). Não se trata apenas de dois controles genéricos ou hook compartilhado como 089/100, nem de código MFE somente mostrado em Markdown. A existência da UI não corrige os elos faltantes da composição. | contexto |
| Estrutura / Código-fonte (entradas ausentes) | Inventário de todos os arquivos: não há index.html nem bootstrap ReactDOM/main.tsx de aplicação. Em particular, não existem as entradas/templates referidas nos dois configs Webpack. O shell tem AppRouter exportado (`pacs-webapp-shell/src/routes/index.tsx:137–141`), mas não uma entrada que o monte. Não se substituiu o arquivo ausente por documentação ou por conteúdo de outro branch. | ausente |
| Configuração / Biblioteca (viewer) | `pacs-dicom-viewer-component/vite.config.ts:15–25` configura biblioteca ES/UMD com entry `src/index.ts`, que exporta DicomViewer (`pacs-dicom-viewer-component/src/index.ts:17–30`). `pacs-dicom-viewer-component/package.json:5–15` descreve componente reutilizável e exports de pacote. Não há plugin/exposes/remoteEntry para satisfazer o alias viewer do host, nem consumo demonstrado do pacote pela composição. | contrária |
| Documentação de arquitetura | `docs/architecture/Repository-Architecture-Design.md:11–21` descreve stack React/.NET e decomposição de serviços. Os desenhos específicos falam de federação e carregamento lazy (`pacs-webapp-shell/docs/Code Design117.md:1006–1007`, `pacs-webapp-clinical-workspace/docs/Code Design118.md:70–74`, `:903`), mas são especificações; não corrigem o contrato real. Não foi encontrado ADR separado por nome/caminho no inventário. | contexto |
| Configuração / Estrutura (resolução e metadados de ferramentas) | Vite/configs React são imports de pacotes declarados nos manifestos; não há lockfiles para versões resolvidas nem node_modules para inspecionar exports instalados. Os configs Webpack têm pacotes principais declarados, mas as incompatibilidades de formato/entradas e loaders acima impedem contá-los como builds resolvidos. `build_tools: [vite]` registra o config do host e o builder explícito da biblioteca; não acrescenta Webpack como build funcional confirmado apenas pela existência dos arquivos. Webpack permanece tentativa/configuração descrita nas evidências de Q2/Q4. | contexto |

## Autoria e histórico

Todos os comandos Git do clone usaram `GIT_NO_LAZY_FETCH=1`. Histórico analisado por metadados, incluindo `git log --name-status` por pasta; não foram pedidos blobs antigos, diffs históricos ou conteúdo de outros branches.

- Clone não raso; **3 commits alcançáveis**, **0 merges**, **1 commit-raiz**, `a46e4dc7fe6f3845896ff845acc5e179cbcde8bd`. As contagens vieram de `git rev-list --count`, `--count --merges` e `--max-parents=0`.
- A raiz contém somente um arquivo segundo `git ls-tree -r`. O commit `6cf8bd590742dd8bace5382a36a3331fa595d62b` adiciona o conjunto de arquivos; as árvores dele e do SHA fixado têm 1.923 entradas. O último commit modifica somente README.md, conforme `git log -1 --name-status`.
- `git log --name-status --format=... <SHA> -- pacs-webapp-shell` retorna uma única alteração nessa pasta: **92 adições**, no commit `6cf8bd5`. Para admin são **103 adições**, clinical **99** e viewer **77**, todas no mesmo commit e sem modificações posteriores nessas pastas. Portanto o código relevante entrou em bloco; não há evolução incremental local das partes de federação nesses três commits.
- As três entradas de log atribuem autoria à identidade textual **The SSS AI Agent 007**. Essa também é a identidade de committer nos dois commits de adição/revisão, enquanto a raiz tem committer **GitHub**. Os dois commits posteriores têm assunto “Files added by https://TheSSS.AI”. Isso demonstra a proveniência declarada no Git e o modo de adição, não identidade autenticada do titular, escrita manual nem origem em um upstream externo. Não há histórico de autores anteriores preservado nessas pastas.
- Não foi encontrada declaração de cópia de projeto terceiro para esses módulos nas evidências lidas; bibliotecas como React/Cornerstone são dependências declaradas. **Adição em bloco não prova vendorização de terceiros**, assim como uma identidade que coincide com o ecossistema do titular não prova autoria original. Não se inventou upstream ou filiação. O código em fontes normais foi tratado como código do candidato, com esse limite de proveniência explícito; não como snippet gerado apenas exibido ao usuário.
- Metadados de data: a raiz registra `2025-10-09T01:08:37+05:30`, equivalente a 2025-10-08 em UTC; `6cf8bd5` registra `2025-10-08T19:39:06Z`, e o SHA avaliado `2025-10-08T19:39:41Z`. Não há inversão cronológica ao considerar os fusos.

## Buscas negativas e limites

- Inventariados todos os caminhos, procurando entradas HTML/ReactDOM, main/index de aplicação, templates referidos, lockfiles e node_modules: ausentes nos casos descritos. Foram encontrados somente índices de módulos/biblioteca, não bootstraps equivalentes.
- Procurados produtores do alias viewer e configurações de federação: há um host Vite e os dois configs Webpack de rotas; o viewer só tem build de biblioteca. Não se atribuiu um quarto remote a esse nome sem produtor ou contrato correspondente.
- A auditoria dos imports relevantes observados não encontrou caminho relativo atravessando para fontes de outra aplicação. Os imports lazy dentro dos remotes são páginas locais; o consumidor pretendido do host usa scope/module variáveis. Não se encontrou chamada a getRoutes/getAdminRoutes pelo loader ou router do shell.
- Os documentos de arquitetura e Code Design foram tratados como especificação, não como bootstrap/exposes/consumo resolvidos. Não há mecanismo de plugin de plataforma clínica de terceiros identificado: as dependências de imagem médica não tornam o sistema um plugin OpenMRS/Bahmni.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell, admin e clinical são alvos identificáveis com fontes e relação explícita pretendida de composição (`pacs-webapp-shell/vite.config.ts:14–20`, `pacs-webapp-admin-portal/webpack.config.js:28–33`, `pacs-webapp-clinical-workspace/config/webpack.config.js:43–49`). A biblioteca viewer não é somada como unidade. |
| Q2 | Undetermined | Manifestos/builds separados existem (`pacs-webapp-shell/package.json:6–10`, `pacs-webapp-admin-portal/package.json:6–9`, `pacs-webapp-clinical-workspace/package.json:7–11`), mas entradas/templates estão ausentes e os configs de produção CommonJS estão em pacotes ESM. Há unidades pretendidas e exports de rotas, mas não entradas/builds relativamente independentes suficientemente demonstrados como escritos. |
| Q3 | Yes | O router do shell reserva estudos/admin/viewer sob seu layout (`pacs-webapp-shell/src/routes/index.tsx:73–118`), e os módulos clínico/administrativo definem rotas funcionais do mesmo domínio (`pacs-webapp-admin-portal/src/routes/AdminRoutes.tsx:38–56`, `pacs-webapp-clinical-workspace/src/routes/index.tsx:44–64`). Registra a relação explícita pretendida, sem afirmar conexão funcional. |
| Q4 | Undetermined | Configs e consumidores existem, mas os elos não correspondem: default/named export, moduleName versus scope/module e componente lazy versus funções de rotas (`pacs-webapp-shell/src/routes/index.tsx:12`, `:93–115`, `pacs-webapp-shell/src/routes/MicroFrontendLoader.tsx:29–32`, `:53–64`). Somam-se os problemas dos builds e as entradas ausentes. Não há base para confirmar a conexão efetiva, nem para decidir por regra nova que toda imperfeição torna o caso No. |
| Q5 | Undetermined | O conjunto sugere arquitetura MFE, com UI/configs implementados, mas Q2/Q4 permanecem abertos pelos elos acima. Não há override de Q5. |

## Motivo

- Proposta `Uncertain`: nenhuma resposta No; Q2/Q4/Q5 Undetermined; status `review`. O código de configuração não é isolado de consumidores, mas estes não completam a cadeia como escrita.
- Não é MFE-unit: o host está no snapshot e dois remotes pretendidos também; não se substitui um host inconsistente por hipótese de host externo funcional.
- Não se aplica automaticamente a exclusão de code sharing de 089/100: os exports são interfaces de rotas clínicas/administrativas, não somente utilitários de apresentação. Também não se converte o projeto em conteúdo didático apenas pelo aspecto de geração em bloco do histórico: há arquivos de fonte/config próprios, diferentemente de 075/081/023.
- A autoria limitada foi investigada sem concluir que adição em bloco é vendorização. Não há fundamento para aplicar automaticamente a regra de plugins de plataforma de 037 ou transportar a dúvida Bahmni de 102 para este candidato.

## Notas para análise

- **RQ1:** a descoberta atingiu somente a dependência de federation no manifesto do shell. As configurações e fontes adicionais revelam contratos incompatíveis que a busca por pacote não distingue de uma implementação completa.
- **RQ3:** URLs → aliases do shell → chamadas do loader → módulos expostos é a cadeia a conferir. As URLs existem, mas loader/props/exports e entradas de build não correspondem; o produtor viewer nem produz federação. A existência de páginas clínicas reais não fecha esses elos.
- **Protocolo (comparadores):** 076/084/096 apresentam host e remotes com consumidor correspondente; aqui a mesma conclusão não pode ser transferida pela presença do plugin. 083 é o paralelo de decisão sobre imperfeições de execução, mas aqui são múltiplas ausências e contratos, não somente diferença de caixa de um arquivo. 089/100 discutem code sharing, problema distinto do observado. 074/102 exigem avaliar proveniência/distribuição de plataforma externa; 080 distingue código terceiro vendorizado de alvos próprios. A análise de name-status deste candidato mostra importação em bloco, mas não identifica um upstream terceiro: essa diferença foi preservada.
- **Protocolo (famílias):** buscas por `TheSSSAI` e `DicomFlow` nas anotações existentes não encontraram irmão. Os próprios nomes/links do README (`README.md:88–94`) organizam pastas do mesmo snapshot; não demonstram clones de terceiros ou repositórios independentes externos. Não foi acessada a plataforma TheSSS.AI nem qualquer upstream para suprir evidência ausente.
- **Protocolo (branches e execução):** somente `main`, `origin/main` e `origin/HEAD`, todos no SHA fixado. Nenhum acesso à rede/submódulos, instalação, execução de configs, build ou aplicação. Não se tentou reparar os problemas para classificar outra versão do projeto. Nenhum arquivo fora deste rascunho foi alterado.

## Decisão registrada

Manter **Uncertain**. O snapshot contém uma arquitetura de federação especificada e fontes para shell/remotes, mas os contratos de carregamento, exports e entradas de build não correspondem entre si. Essa evidência não confirma uma composição funcional e também não permite determinar com segurança se o conjunto é apenas scaffold ou uma implementação incompleta.
